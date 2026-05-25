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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-persetujuan/${id}/`,
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

  return NextResponse.json(
    {
      message: "Backend error",
      status: res.status,
      raw: text.slice(0, 300),
    },
    { status: res.status }
  );
}

let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("INVALID JSON:", text);

  return NextResponse.json(
    {
      message: "API tidak mengembalikan JSON",
      raw: text.slice(0, 300),
    },
    { status: 500 }
  );
}
console.log("DETAIL DATA:", data);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("NEXT API ERROR: ", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan server", error },
      { status: 500 }
    );
  }
}