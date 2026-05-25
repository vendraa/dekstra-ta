export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    // 🔥 Single return point
    return Response.json(data, { status: res.status });

  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}