import { DetailPermohonan } from "@/features/requests/types/detail-persetujuan.types";

export async function getDetailPermohonanClient(
  id: string
): Promise<DetailPermohonan> {

  const res = await fetch(
    `/api/riwayat-persetujuan/${id}`,
    {
      cache: "no-store",
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