"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import RegisterHeader from "@/components/auth/RegisterHeader";

import { PendingHeader } from "./_sections/pending-header";

import { PendingInfo } from "./_sections/pending-info";

import { PendingAction } from "./_sections/pending-action";

import Card from "@/components/ui/Card/Card";

import { RegisterProvider } from "@/features/auth/register/context/RegisterContext";

function maskEmail(email: string): string {
  const [local, domain] =
    email.split("@");

  if (!local || !domain)
    return email;

  const visible = local.slice(0, 2);

  const masked = "*".repeat(
    Math.max(local.length - 2, 3)
  );

  return `${visible}${masked}@${domain}`;
}

function PendingContent() {
  const router = useRouter();

  /* =========================
   * SAFE CLIENT CHECK
   * ======================= */

  const isBrowser =
    typeof window !== "undefined";

  const completed = isBrowser
    ? sessionStorage.getItem(
        "register_completed"
      )
    : null;

  const email = isBrowser
    ? sessionStorage.getItem(
        "register_email"
      ) ?? ""
    : "";

  const allowed =
    !!completed && !!email;

  const emailMasked =
    allowed
      ? maskEmail(email)
      : "";

  /* =========================
   * REDIRECT
   * ======================= */

  useEffect(() => {
    if (!allowed) {
      router.replace("/register");

      return;
    }

    sessionStorage.removeItem(
      "register_completed"
    );

    sessionStorage.removeItem(
      "register_email"
    );
  }, [allowed, router]);

  if (!allowed) {
    return null;
  }

  return (
    <main className="flex justify-center px-4 py-10">
      <Card className="w-full max-w-3xl p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          <div className="flex flex-col items-center text-center md:w-64 shrink-0 gap-4">
            <PendingHeader />
          </div>

          <div className="hidden md:block w-px bg-border self-stretch" />

          <div className="flex flex-col gap-5 flex-1">
            <PendingInfo
              maskedEmail={
                emailMasked
              }
            />

            <PendingAction />
          </div>

        </div>
      </Card>
    </main>
  );
}

export default function RegisterPendingPage() {
  return (
    <RegisterProvider>
      <RegisterHeader />

      <PendingContent />
    </RegisterProvider>
  );
}