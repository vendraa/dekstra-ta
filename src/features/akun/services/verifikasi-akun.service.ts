type VerifyPayload = {
  aksi: 0 | 1; 
};

type VerifyResponse = {
  message: string;
};

export async function verifyAkun(
  id: string,
  payload: VerifyPayload
): Promise<VerifyResponse> {
  const res = await fetch(
    `/api/verifikasi/pendaftaran-akun/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  let data: unknown = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = data as { message?: string };
    throw new Error(err?.message || "Gagal memverifikasi akun");
  }

  return data as VerifyResponse;
}