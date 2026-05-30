import { apiFetch } from "@/lib/api/api-fetch";

import {
  mapToLetterRequest,
  RiwayatPersetujuanResponse,
} from "../types/riwayat-persetujuan.types";

import { LetterRequest } from "../types/types";

type ErrorResponse = {
  message?: string;
};

export async function getRiwayatPengajuanClient(): Promise<LetterRequest[]> {
  try {
    const data = await apiFetch<RiwayatPersetujuanResponse[]>(
      "/api/riwayat-pengajuan",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!Array.isArray(data)) {
      throw new Error("Format data tidak valid");
    }

    return data.map(mapToLetterRequest);
  } catch (error) {
    const err = error as ErrorResponse;

    throw new Error(
      err?.message || "Gagal mengambil riwayat pengajuan"
    );
  }
}