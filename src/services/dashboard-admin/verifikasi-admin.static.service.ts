import {
  mapToLetterRequest,
  RiwayatPersetujuanResponse,
} from "@/features/requests/types/riwayat-persetujuan.types";

import { LetterRequest }
  from "@/features/requests/types/types";

export async function getVerifikasiAdminBuild():
  Promise<LetterRequest[]> {

  try {
    const token =
      process.env.SSG_TOKEN_ADMIN;

    if (!token) {
      return [];
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/verifikasi/`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },

        cache: "force-cache",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data =
      await res.json() as
      RiwayatPersetujuanResponse[];

    return data.map(
      mapToLetterRequest
    );

  } catch {
    return [];
  }
}