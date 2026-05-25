export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rw = searchParams.get("rw");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wilayah/rt/?rw=${rw}`
  );

  const data = await res.json();

  return Response.json(data, { status: res.status });
}