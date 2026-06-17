import { cookies } from "next/headers";

import { DetailPermohonan } from "@/features/requests/types/detail-persetujuan.types";

export async function getDetailPermohonanServer(
  id: string,
  cache: RequestCache = "no-store"
): Promise<DetailPermohonan> {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "access_token"
    )?.value;

  if (!token) {
    throw new Error(
      "Unauthorized"
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/riwayat-persetujuan/${id}/`,
    {
      cache,

      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message ??
      "Gagal mengambil detail"
    );
  }

  return {
    ...data,

    riwayat_aksi: Number(
      data.riwayat_aksi ?? 1
    ),
  };
}