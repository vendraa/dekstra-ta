import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 🔥 AMBIL TOKEN DARI COOKIE
    const token = req.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔥 REQUEST KE DJANGO (PROFILE)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profil/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    // 🔥 HANDLE ERROR DARI BACKEND
    if (!res.ok) {
      return NextResponse.json(data, {
        status: res.status,
      });
    }

    // 🔥 SUCCESS
    return NextResponse.json(data, {
      status: 200,
    });

  } catch (error) {
    console.error("PROFILE API ERROR:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}