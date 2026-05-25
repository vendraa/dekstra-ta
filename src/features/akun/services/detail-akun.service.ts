import { cookies } from "next/headers";
import { DetailAkunResponse } from "../types/akun.types";

export async function getDetailAkun(
  id: string
): Promise<DetailAkunResponse> {

  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pendaftaran-akun/${id}/`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {

    console.error("DJANGO ERROR STATUS:", res.status);
    console.error("DJANGO ERROR DATA:", data);

    throw new Error(
      data?.detail ||
      data?.message ||
      "Gagal mengambil detail akun"
    );
  }

  return data;
}