export type OTPVerifyPayload = {
  email: string;
  otp: string;
  new_password: string;
};

export type OTPVerifyResponse = {
  email: string;
  otp: string;
  new_password: string;
};

export async function verifyOTPResetPassword(
  payload: OTPVerifyPayload
): Promise<OTPVerifyResponse> {
  const res = await fetch("/api/auth/request-otp/verify-reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("API tidak mengembalikan JSON");
  }

  if (!res.ok) {
    throw new Error(
      data?.detail ||
      data?.non_field_errors?.[0] ||
      data?.message ||
      "Gagal verifikasi OTP"
    );
  }

  return data;
}