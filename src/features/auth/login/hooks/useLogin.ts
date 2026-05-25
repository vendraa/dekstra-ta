"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestLoginOTP } from "../services/login.service";
import { useLogout } from "../../logout/hooks/useLogout";
import { setupAutoLogout } from "../../logout/hooks/useLogout";

export function useLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const { logout } = useLogout();

  const submitLogin = async (payload: {
    identifier: string;
    password:   string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const isEmail = payload.identifier.includes("@");

      const mappedPayload = {
        password: payload.password,
        ...(isEmail
          ? { email: payload.identifier }
          : { nik: payload.identifier }),
      };

      // Step 1: request OTP — backend kirim OTP ke email
      await requestLoginOTP(mappedPayload);

      // Simpan credential di sessionStorage untuk dipakai di halaman OTP
      // password disimpan sementara karena dibutuhkan di POST /auth/login/
      sessionStorage.setItem("login_identifier", payload.identifier);
      sessionStorage.setItem("login_password",   payload.password);

      setupAutoLogout(logout);

      // Redirect ke halaman OTP
      router.push(
        `/otp?identifier=${encodeURIComponent(payload.identifier)}&type=${
          isEmail ? "email" : "nik"
        }`
      );

    } catch (err: unknown) {
      if (typeof err === "object" && err !== null) {
        const e = err as {
          non_field_errors?: string[];
          detail?:           string;
        };
        setError(
          e.non_field_errors?.[0] ||
          e.detail ||
          "Login gagal. Periksa kembali data Anda."
        );
      } else {
        setError("Terjadi kesalahan tidak terduga.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { submitLogin, loading, error };
}