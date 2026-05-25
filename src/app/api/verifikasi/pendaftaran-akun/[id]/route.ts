import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const token = req.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const backendUrl =
      `${process.env.NEXT_PUBLIC_API_URL}/pendaftaran-akun/${id}/`;

    console.log("FETCHING:", backendUrl);

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const text = await res.text();

    console.log("DJANGO RAW RESPONSE:", text);

    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      return NextResponse.json(
        {
          message: "Response backend bukan JSON valid",
          raw: text,
        },
        { status: 500 }
      );
    }

    if (!res.ok) {
      console.error("DJANGO ERROR STATUS:", res.status);
      console.error("DJANGO ERROR DATA:", data);

      return NextResponse.json(
        {
          message:
            data?.detail ||
            data?.message ||
            "Backend error",
          raw: data,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("API ROUTE ERROR:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan server",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const token = req.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verifikasi/pendaftaran-akun/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    let data;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      console.error("DJANGO ERROR:", data);

      return NextResponse.json(
        data || { message: "Terjadi kesalahan" },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("API ROUTE ERROR:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}