import { Suspense } from "react";

import OTPForm from "@/features/auth/otp/OtpForm";

export default function OTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPForm />
    </Suspense>
  );
}