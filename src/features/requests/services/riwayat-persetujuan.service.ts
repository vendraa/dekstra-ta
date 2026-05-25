// src/features/requests/services/riwayat-persetujuan.service.ts

import {
  RiwayatPersetujuanResponse,
  mapToLetterRequest,
} from "../types/riwayat-persetujuan.types";
import { LetterRequest } from "../types/types";

type ErrorResponse = {
  message?: string;
};

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function getRiwayatPersetujuan(): Promise<LetterRequest[]> {
  const res = await fetch(`/api/riwayat-persetujuan`, {
    method: "GET",
    cache: "no-store",
  });

  let data: unknown = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const error = data as ErrorResponse;
    throw new Error(
      error?.message || "Gagal mengambil data riwayat persetujuan"
    );
  }

  let list: RiwayatPersetujuanResponse[] = [];

  if (Array.isArray(data)) {
    list = data;
  } else if (
    data &&
    typeof data === "object" &&
    "results" in data &&
    Array.isArray((data as PaginatedResponse<RiwayatPersetujuanResponse>).results)
  ) {
    list = (data as PaginatedResponse<RiwayatPersetujuanResponse>).results;
  }

  // 🔹 Defensive: remove duplicates by id (just in case)
  const uniqueMap = new Map<number, RiwayatPersetujuanResponse>();

  for (const item of list) {
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  }

  const uniqueList = Array.from(uniqueMap.values());

  // 🔹 Mapping + fallback untuk riwayat_aksi
  return uniqueList.map((item) =>
    mapToLetterRequest({
      ...item,
      riwayat_aksi: item.riwayat_aksi ?? "MENUNGGU",
    })
  );
}



const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

type CreatePersetujuanPayload = {
  nomor_permohonan: string;
  aksi: number;
  catatan?: string;
};

export async function createRiwayatPersetujuan(
  payload: CreatePersetujuanPayload
) {
  const res = await fetch(`${BASE_URL}/api/riwayat-persetujuan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response:", text);
    throw new Error(
      `Response tidak valid (${res.status}): ${text.slice(0, 200)}`
    );
  }

  const data = await res.json();

  // ✅ hanya log kalau error
  if (!res.ok) {
    console.error("ERROR RESPONSE:", data);

    throw new Error(
      data?.message ||
      data?.error_message ||
      "Gagal mengirim persetujuan"
    );
  }

  // ✅ log success optional
  console.log("SUCCESS RESPONSE:", data);

  return data;
}