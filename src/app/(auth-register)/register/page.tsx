"use client";

import RegisterHeader from "@/components/auth/RegisterHeader";
import RegisterCard from "@/components/auth/RegisterCard";
import StepIndicator from "@/components/ui/Step/StepIndicator";
import RegisterStepSwitcher from "@/features/auth/register/components/RegisterStepSwitcher";
import { RegisterProvider, useRegister } from "@/features/auth/register/context/RegisterContext";
import { REGISTER_STEPS } from "@/features/auth/register/constans/registerStep";

function RegisterContent() {
  const { state } = useRegister();

  return (
    <>
      <StepIndicator
        steps={REGISTER_STEPS}
        currentStep={state.step}
      />
      <RegisterStepSwitcher />
    </>
  );
}

export default function RegisterPage() {
  return (
    <RegisterProvider>
      <RegisterHeader />

      <main className="flex justify-center px-4 py-10">
        <RegisterCard>
          <h1 className="mb-8 text-center text-2xl font-heading font-extrabold text-foreground">
            Pendaftaran Akun
          </h1>

          <RegisterContent />
        </RegisterCard>
      </main>
    </RegisterProvider>
  );
}