import { NextRequest, NextResponse } from "next/server";

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
      `${process.env.NEXT_PUBLIC_API_URL}/pendaftaran-akun/list/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    let data;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return NextResponse.json(
        data || { message: "Terjadi kesalahan" },
        { status: res.status }
      );
    }

    return NextResponse.json(data ?? [], { status: 200 });

  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}