"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordService } from "../services/resetPassword.service";

const PASSWORD_RULES = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export function useResetPassword() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const otp   = searchParams.get("otp")   || "";

  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  const isPasswordValid  = PASSWORD_RULES.test(newPassword);
  const isConfirmMatch   = newPassword === confirmPassword;
  const isFormValid      = isPasswordValid && isConfirmMatch && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    try {
      const result = await resetPasswordService({
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      if (result.success) {
        router.push("/login?reset=success");
      } else {
        setError(result.message);
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    isPasswordValid,
    isConfirmMatch,
    isFormValid,
    handleSubmit,
  };
}