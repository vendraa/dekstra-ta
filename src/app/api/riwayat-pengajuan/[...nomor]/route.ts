import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ nomor: string[] }> }
) {
  try {
    const token = req.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { nomor: nomorArray } = await context.params;

    const nomor = nomorArray.join("/");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-pengajuan/${nomor}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("NON JSON:", text);
      return NextResponse.json(
        { message: "Invalid response dari backend" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    console.error("ERROR:", err);

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}