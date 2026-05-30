import { NextRequest, NextResponse } from "next/server";

type ErrorResponse = {
  message: string;
  status?: number;
  raw?: string;
};

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifikasi/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const text = await res.text();

    if (!res.ok) {
      console.error("DJANGO ERROR:", text);

      const errorResponse: ErrorResponse = {
        message: "Backend error",
        status: res.status,
        raw: text.slice(0, 300),
      };

      return NextResponse.json(errorResponse, {
        status: res.status,
      });
    }

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("INVALID JSON:", text);

      const errorResponse: ErrorResponse = {
        message: "API tidak mengembalikan JSON",
        raw: text.slice(0, 300),
      };

      return NextResponse.json(errorResponse, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("NEXT API ERROR:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan server",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}