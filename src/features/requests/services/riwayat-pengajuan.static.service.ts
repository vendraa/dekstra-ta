import {
  mapToLetterRequest,
  RiwayatPersetujuanResponse,
} from "../types/riwayat-persetujuan.types";
import { LetterRequest } from "../types/types";

export async function getRiwayatPengajuanStatic(): Promise<LetterRequest[]> {
  try {
    const token = process.env.SSG_TOKEN_WARGA;

    if (!token) {
      console.warn("[SSG] SSG_TOKEN_WARGA tidak ditemukan, returning []");
      return [];
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-pengajuan/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "force-cache",
      }
    );

    if (res.status === 204) return [];

    const data = (await res.json()) as RiwayatPersetujuanResponse[];

    if (!res.ok || !Array.isArray(data)) {
      return [];
    }

    return data.map(mapToLetterRequest);

  } catch {
    return []; 
  }
}