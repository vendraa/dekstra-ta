export type OTPRequestPayload = {
  email: string;
};

export type OTPRequestResponse = {
  email: string;
  otp?: string; // 👈 optional (hanya untuk development)
  message: string;
};

export async function requestResetPasswordOTP(
  payload: OTPRequestPayload
): Promise<OTPRequestResponse> {
  const res = await fetch("/api/auth/request-otp/request-reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  let data: OTPRequestResponse;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("API tidak mengembalikan JSON");
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.email || "Gagal request OTP");
  }

  return data;
}