"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../login/services/login.service";
import { setupAutoLogout } from "../../logout/hooks/useLogout";
import { useLogout } from "../../logout/hooks/useLogout";

export function useOTPLogin() {
  const router = useRouter();
  const { logout } = useLogout();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOTP = async (otp: string) => {
    setLoading(true);
    setError(null);

    try {
      const identifier = sessionStorage.getItem("login_identifier") ?? "";
      const password = sessionStorage.getItem("login_password") ?? "";

      if (!identifier || !password) {
        setError("Sesi login tidak ditemukan. Silakan login ulang.");
        router.push("/login");
        return;
      }

      const isEmail = identifier.includes("@");

      const payload = {
        otp,
        password,
        ...(isEmail ? { email: identifier } : { nik: identifier }),
      };

      // 🔥 LOGIN FINAL
      const res = await loginUser(payload);

      // 🧹 bersihkan session
      sessionStorage.removeItem("login_identifier");
      sessionStorage.removeItem("login_password");

      setupAutoLogout(logout);

      // 🔥 redirect berdasarkan role
      const roleRoutes: Record<number, string> = {
        1: "/dashboard",
        2: "/rt/dashboard",
        3: "/rw/dashboard",
        4: "/kades/dashboard",
        5: "/admin/dashboard",
      };

      router.push(roleRoutes[res.role] ?? "/login");

    } catch (err: unknown) {
      if (typeof err === "object" && err !== null) {
        const e = err as { non_field_errors?: string[]; detail?: string };

        setError(
          e.non_field_errors?.[0] ||
          e.detail ||
          "OTP tidak valid atau sudah kedaluwarsa."
        );
      } else {
        setError("Terjadi kesalahan tidak terduga.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { submitOTP, loading, error };
}