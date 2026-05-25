import {
  LoginOTPRequestPayload,
  LoginOTPRequestResponse,
  LoginPayload,
} from "../types/auth.types";

// Step 1 — validasi kredensial + minta OTP dikirim ke email
export async function requestLoginOTP(
  payload: LoginOTPRequestPayload
): Promise<LoginOTPRequestResponse> {
  const res = await fetch("/api/auth/request-otp", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  if(data.otp) {
    console.log("OTP (DEV):", data.otp)
  }

  return data;
}

// Step 2 — submit OTP + dapatkan JWT token
export async function loginUser(
  payload: LoginPayload
): Promise<{ role: number }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),

    credentials: "include", // 🔥 WAJIB (biar cookie kesimpan)
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data; // { role }
}
