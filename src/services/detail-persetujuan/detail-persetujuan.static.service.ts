import { DetailPermohonan } from "@/features/requests/types/detail-persetujuan.types";

export async function getDetailPermohonanStatic(
  id: string
): Promise<DetailPermohonan | null> {
  try {
    const token =
      process.env.SSG_STATIC_TOKEN;

    if (!token) {
      console.warn(
        "[SSG] SSG_STATIC_TOKEN tidak ditemukan"
      );

      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-persetujuan/${id}/`,
      {
        method: "GET",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache: "force-cache",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data =
      await res.json();

    const normalized: DetailPermohonan =
      {
        ...data,

        riwayat_aksi: Number(
          data.riwayat_aksi ?? 1
        ),
      };

    return normalized;

  } catch (error) {
    console.error(
      "[SSG] Gagal mengambil detail permohonan:",
      error
    );

    return null;
  }
}