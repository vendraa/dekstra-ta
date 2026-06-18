import { cookies }
  from "next/headers";

import {
  mapToLetterRequest,
  RiwayatPersetujuanResponse,
} from "@/features/requests/types/riwayat-persetujuan.types";

import { LetterRequest }
  from "@/features/requests/types/types";

export async function getVerifikasiAdminServer(
  cache: RequestCache = "no-store"
): Promise<LetterRequest[]> {

  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "access_token"
    )?.value;

  if (!token) {
    return [];
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-persetujuan/list/`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },

        cache,
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