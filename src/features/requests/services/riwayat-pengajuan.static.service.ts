import {
  mapToLetterRequest,
  RiwayatPersetujuanResponse,
} from "../types/riwayat-persetujuan.types";
import { LetterRequest } from "../types/types";

export async function getRiwayatPengajuanStatic(): Promise<LetterRequest[]> {
  try {
    // Gunakan token khusus build/testing dari env
    const token = process.env.SSG_STATIC_TOKEN;

    if (!token) {
      console.warn("[SSG] SSG_STATIC_TOKEN tidak ditemukan, returning []");
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
        cache: "force-cache", // SSG: cache saat build
      }
    );

    if (res.status === 204) return [];

    const data = (await res.json()) as RiwayatPersetujuanResponse[];

    if (!res.ok || !Array.isArray(data)) {
      return [];
    }

    return data.map(mapToLetterRequest);

  } catch {
    return []; // Jangan throw — biarkan build tetap sukses
  }
}