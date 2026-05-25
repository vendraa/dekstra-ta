import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ token: string }>;
};

export async function GET(
  req: NextRequest,
  context: Context
) {
  try {
    const { token } = await context.params;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/berkas/${token}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const text = await res.text();

      console.error("DJANGO ERROR:", text);

      return NextResponse.json(
        {
          message: "Backend error",
          status: res.status,
          raw: text.slice(0, 300),
        },
        { status: res.status }
      );
    }

    // 🔥 penting: handle file (blob)
    const blob = await res.blob();

    const headers = new Headers();
    headers.set(
      "Content-Type",
      res.headers.get("content-type") || "application/octet-stream"
    );

    // optional: forward filename
    const disposition = res.headers.get("content-disposition");
    if (disposition) {
      headers.set("Content-Disposition", disposition);
    }

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("NEXT API ERROR:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan server",
        error:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}