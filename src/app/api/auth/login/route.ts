import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json(
      {
        role: data.peran, // ✅ hanya ini dikirim ke FE
      },
      { status: 200 }
    );

    // ✅ HttpOnly cookie (auth utama)
    response.cookies.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // ✅ Role (boleh dibaca FE & middleware)
    response.cookies.set("role", String(data.peran), {
      httpOnly: false,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { detail: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}