"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/ui/Button/Button";
import PasswordInput from "@/components/ui/Input/PasswordInput";
import TextInput from "@/components/ui/Input/TextInput";

import { verifyOTPResetPassword } from "../services/otp-verify.service";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isConfirmMatch = newPassword === confirmPassword;

  const hasMinLength = newPassword.length >= 8;
  const hasStrongFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword);

  const isFormValid =
    otp.length > 0 &&
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    isConfirmMatch &&
    hasMinLength &&
    hasStrongFormat;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!isFormValid) return;

    setLoading(true);

    try {
      await verifyOTPResetPassword({
        email,
        otp,
        new_password: newPassword,
      });

      router.push("/login");
    } catch (err: unknown) {
      let message = "Terjadi kesalahan";

      if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    router.replace("/forgot-password");
    return null;
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Reset Kata Sandi"
        subtitle="Masukkan kode OTP dan buat kata sandi baru"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* OTP */}
        <TextInput
          label="Kode OTP"
          placeholder="Masukkan kode OTP"
          value={otp}
          onChange={setOtp}
          required
        />

        {/* Password Baru */}
        <div className="flex flex-col gap-1.5">
          <PasswordInput
            label="Kata Sandi Baru"
            placeholder="Masukkan Kata Sandi Baru"
            value={newPassword}
            onChange={setNewPassword}
          />

          {/* Helper */}
          <div className="ml-1 mt-1 text-xs space-y-1 opacity-60">
            <p className={hasMinLength ? "text-success" : "text-muted-foreground"}>
              {hasMinLength ? "✓" : "*"} Minimal 8 karakter
            </p>
            <p className={hasStrongFormat ? "text-success" : "text-muted-foreground"}>
              {hasStrongFormat ? "✓" : "*"} Huruf besar, kecil, dan angka
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <PasswordInput
          label="Konfirmasi Kata Sandi Baru"
          placeholder="Masukkan ulang kata sandi baru"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={
            confirmPassword.length > 0 && !isConfirmMatch
              ? "Kata sandi tidak cocok"
              : undefined
          }
        />

        {/* Error */}
        {error && (
          <p className="text-xs text-danger text-center">
            {error}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          disabled={!isFormValid || loading}
          className="bg-primary text-white font-bold tracking-widest uppercase hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
        >
          {loading ? "Memproses..." : "Kirim"}
        </Button>

      </form>
    </AuthCard>
  );
}