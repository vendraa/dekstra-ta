import {
  mapToLetterRequest,
} from "../types/riwayat-persetujuan.types";

import { LetterRequest } from "../types/types";

type ErrorResponse = {
  message?: string;
};

export async function getRiwayatPengajuan(): Promise<LetterRequest[]> {
  const res = await fetch(`/api/riwayat-pengajuan`, {
    method: "GET",
    cache: "no-store",
  });
  
  const text = await res.text();
  const data: unknown = text ? JSON.parse(text) : [];

  if (!res.ok) {
    const error = data as ErrorResponse;
    throw new Error(
      error?.message || "Gagal mengambil riwayat pengajuan"
    );
  }

  if (!Array.isArray(data)) {
    throw new Error("Format data tidak valid");
  }

  return data.map(mapToLetterRequest);
}