import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Get token
    const token = req.cookies.get("access_token")?.value || 
                  req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/berkas-surat/`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          // Don't set Content-Type for FormData, browser will set it automatically
        },
        body: formData,
      }
    );

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("Upload berkas error:", error);
    return Response.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}