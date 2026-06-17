import { DetailPermohonan } from "@/features/requests/types/detail-persetujuan.types";

export type StaticTestRole = "warga" | "rt" | "rw" | "admin" | "kades";

const TOKEN_MAP: Record<StaticTestRole, string | undefined> = {
  warga: process.env.SSG_TOKEN_WARGA,
  rt: process.env.SSG_TOKEN_RT,
  rw: process.env.SSG_TOKEN_RW,
  admin: process.env.SSG_TOKEN_ADMIN,
  kades: process.env.SSG_TOKEN_KADES,
};

function getTokenForRole(role: StaticTestRole): string {
  const token = TOKEN_MAP[role];

  if (!token) {
    throw new Error(
      `[SSG] Token untuk role "${role}" tidak ditemukan. Pastikan SSG_TOKEN_${role.toUpperCase()} sudah diset di environment variables.`
    );
  }

  return token;
}

export async function getDetailPermohonanStatic(
  id: string,
  role: StaticTestRole   // ← parameter baru
): Promise<DetailPermohonan | null> {
  try {
    const token = getTokenForRole(role);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/riwayat-persetujuan/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    const normalized: DetailPermohonan = {
      ...data,
      riwayat_aksi: Number(data.riwayat_aksi ?? 1),
    };

    return normalized;

  } catch (error) {
    console.error(
      `[SSG] Gagal mengambil detail permohonan untuk role "${role}":`,
      error
    );
    return null;
  }
}