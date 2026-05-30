import { cookies } from "next/headers";

import {
  mapToLetterRequest,
  RiwayatPersetujuanResponse,
} from "../types/riwayat-persetujuan.types";

import { LetterRequest } from "../types/types";

type ErrorResponse = {
  message?: string;
};

export async function getRiwayatPengajuanServer(
  cache: RequestCache = "no-store"
): Promise<LetterRequest[]> {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-pengajuan/`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        cache,
      }
    );

    if (res.status === 204) {
      return [];
    }

    const data =
      (await res.json()) as RiwayatPersetujuanResponse[];

    if (!res.ok) {
      const error = data as ErrorResponse;

      throw new Error(
        error?.message ||
          "Gagal mengambil riwayat pengajuan"
      );
    }

    if (!Array.isArray(data)) {
      throw new Error("Format data tidak valid");
    }

    return data.map(mapToLetterRequest);

  } catch (error) {
    const err = error as ErrorResponse;

    throw new Error(
      err?.message ||
        "Gagal mengambil riwayat pengajuan"
    );
  }
}