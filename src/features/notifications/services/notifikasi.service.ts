export type Notifikasi = {
  id: number;
  tipe: string;
  judul: string;
  pesan: string;
  sudah_dibaca: boolean;
  dibaca_at: string | null;
  created_at: string;
  permohonan: number | null;
  nomor_permohonan?: string; 
};

// 🔹 SERVER (langsung ke Django)
export async function getNotifikasiServer(
  token: string
): Promise<Notifikasi[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notifikasi/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}

// 🔹 CLIENT (via /api)
export async function getNotifikasi(): Promise<Notifikasi[]> {
  const res = await fetch("/api/notifikasi", {
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}

export async function tandaiDibaca(
  id: number
): Promise<{ message: string }> {
  const res = await fetch(`/api/notifikasi/${id}/read`, {
    method: "POST",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}