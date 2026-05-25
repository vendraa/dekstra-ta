"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/ui/Button/Button";
import OTPInput from "./components/OTPInput";

import { useOTPLogin } from "./hooks/useOTPLogin";
import { requestLoginOTP } from "../login/services/login.service";

const OTP_DURATION = 5 * 60;
const RESEND_COOLDOWN = 10;
const MAX_RESEND = 3;

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");

  if (!local || !domain) return email;

  const start = local[0];
  const end = local[local.length - 1];

  const masked = "*".repeat(
    Math.max(local.length - 2, 6)
  );

  return `${start}${masked}${end}@${domain}`;
}

function formatCountdown(seconds: number): string {
  const m = String(
    Math.floor(seconds / 60)
  ).padStart(2, "0");

  const s = String(seconds % 60).padStart(2, "0");

  return `${m}.${s}`;
}

export default function OTPForm() {
  const searchParams = useSearchParams();

  const identifier =
    searchParams.get("identifier") || "";

  const type =
    searchParams.get("type") || "email";

  const { submitOTP, loading, error } =
    useOTPLogin();

  const [countdown, setCountdown] =
    useState(OTP_DURATION);

  const [resendTimer, setResendTimer] =
    useState(RESEND_COOLDOWN);

  const [resendCount, setResendCount] =
    useState(0);

  // OTP selalu kosong saat halaman dibuka
  const [otp, setOtp] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Countdown OTP
  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  // Resend cooldown
  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) return;

    await submitOTP(otpValue);
  };

  const handleResend = async () => {
    if (
      resendTimer > 0 ||
      resendCount >= MAX_RESEND
    ) {
      return;
    }

    try {
      const identifier =
        sessionStorage.getItem(
          "login_identifier"
        ) ?? "";

      const password =
        sessionStorage.getItem(
          "login_password"
        ) ?? "";

      if (!identifier || !password) {
        return;
      }

      const isEmail =
        identifier.includes("@");

      const payload = {
        password,
        ...(isEmail
          ? { email: identifier }
          : { nik: identifier }),
      };

      // request OTP baru dari backend
      await requestLoginOTP(payload);

      // reset input OTP
      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      // reset timer
      setCountdown(OTP_DURATION);

      // cooldown resend
      setResendTimer(RESEND_COOLDOWN);

      // increment resend count
      setResendCount((prev) => prev + 1);

    } catch (err) {
      console.error(
        "Resend OTP gagal:",
        err
      );
    }
  };

  const isComplete =
    otp.join("").length === 6;

  const resendExhausted =
    resendCount >= MAX_RESEND;

  const resendOnCooldown =
    resendTimer > 0;

  return (
    <AuthCard>
      <AuthHeader
        title="Masukkan OTP"
        subtitle={
          type === "email"
            ? `Silakan masukkan kode OTP yang telah kami kirim ke email ${maskEmail(
                identifier
              )}`
            : `Silakan masukkan kode OTP yang telah kami kirim untuk NIK ${identifier}`
        }
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {/* ERROR */}
        {error && (
          <p className="text-sm text-danger text-center">
            {error}
          </p>
        )}

        {/* OTP INPUT */}
        <OTPInput
          value={otp}
          onChange={setOtp}
        />

        {/* COUNTDOWN */}
        <p className="text-sm text-foreground/60 text-center">
          Gunakan kode sebelum:{" "}
          <span className="font-bold text-foreground">
            {formatCountdown(countdown)}
          </span>
        </p>

        {/* SUBMIT */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          disabled={!isComplete || loading}
          className="bg-primary text-white font-bold tracking-widest uppercase"
        >
          MASUK
        </Button>

        {/* RESEND */}
        <p className="text-sm text-center text-foreground/60 -mt-2">
          Belum menerima kode OTP?{" "}

          {resendExhausted ? (
            <span className="text-foreground/40">
              Batas kirim ulang tercapai
            </span>

          ) : resendOnCooldown ? (
            <span className="text-foreground/40">
              Kirim Ulang ({resendTimer}s)
            </span>

          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary font-medium"
            >
              Kirim Ulang (
              {MAX_RESEND - resendCount} tersisa)
            </button>
          )}
        </p>
      </form>
    </AuthCard>
  );
}