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
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-persetujuan/list/`,
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const token = req.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-persetujuan/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON from backend", raw: text },
        { status: 500 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Backend error", errors: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}