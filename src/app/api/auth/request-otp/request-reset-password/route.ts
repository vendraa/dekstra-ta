import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${BASE_URL}/auth/otp/request/reset-password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { message: "Backend tidak mengembalikan JSON" },
        { status: 500 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          message:
            data?.detail ||
            data?.non_field_errors?.[0] ||
            "Gagal request OTP",
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}