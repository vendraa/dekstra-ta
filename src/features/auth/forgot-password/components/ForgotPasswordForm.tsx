"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/ui/Button/Button";
import TextInput from "@/components/ui/Input/TextInput";

import { requestResetPasswordOTP } from "../services/otp.service";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan. Silakan coba lagi.";
}

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setGlobalError("");

    // ✅ Validasi email kosong
    if (!email.trim()) {
      setEmailError("Email wajib diisi");
      return;
    }

    setLoading(true);

    try {
      // ✅ HIT API
      await requestResetPasswordOTP({ email });

      // ✅ redirect ke halaman OTP
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
        const message = getErrorMessage(err);

        if (message.toLowerCase().includes("email")) {
          setEmailError(message);
        } else {
          setGlobalError(message);
        }
      } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Lupa Kata Sandi?"
        subtitle="Masukkan email Anda untuk menerima kode verifikasi"
      />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* Global Error */}
        {globalError && (
          <p className="text-sm text-danger text-center">
            {globalError}
          </p>
        )}

        <TextInput
          label="Email"
          type="email"
          placeholder="Masukkan email Anda"
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (emailError) setEmailError("");
          }}
          error={emailError}
          required
        />

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          className="bg-primary text-white hover:opacity-90"
        >
          {loading ? "Mengirim..." : "KIRIM KODE"}
        </Button>
      </form>
    </AuthCard>
  );
}