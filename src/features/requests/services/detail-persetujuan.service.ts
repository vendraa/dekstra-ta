import { cookies } from "next/headers";
import { DetailPermohonan } from "../types/detail-persetujuan.types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function getDetailPermohonan(id: string): Promise<DetailPermohonan> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BASE_URL}/api/riwayat-persetujuan/${id}`, {
    cache: "no-store",
    headers: {
      Cookie: `access_token=${accessToken ?? ""}`,
    },
  });

  const contentType = res.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response:", text);
    throw new Error(`Response tidak valid (${res.status})`);
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? `Gagal mengambil detail`);
  }

  // 🔥 NORMALIZE DI SINI
  const normalized: DetailPermohonan = {
    ...data,
    riwayat_aksi: Number(data.riwayat_aksi ?? 1),
  };

  return normalized;
}