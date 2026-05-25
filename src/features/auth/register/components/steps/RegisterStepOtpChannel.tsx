"use client";

import { Mail, ChevronRight } from "lucide-react";
import { useRegister } from "../../context/RegisterContext";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const masked = local[0] + "*".repeat(Math.max(local.length - 1, 4));
  return `${masked}@${domain}`;
}

export default function RegisterStepOtpChannel() {
  const { state, dispatch } = useRegister();

  const handleSelect = () => {
    dispatch({ type: "SET_FIELD", field: "otpChannel", value: "EMAIL" });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleSelect}
        className="
          group
          w-full max-w-md flex items-center gap-4
          bg-white hover:bg-primary
          border border-border rounded-2xl px-5 py-4
          drop-shadow-xl hover:shadow-md
          transition-all duration-200
          cursor-pointer text-left
        "
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-surface group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors duration-200">
          <Mail size={22} className="text-primary group-hover:text-white transition-colors duration-200" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground group-hover:text-white transition-colors duration-200">
            Kirim Melalui Email
          </p>
          <p className="text-sm text-foreground/60 group-hover:text-white/70 mt-0.5 transition-colors duration-200">
            Kirim kode OTP melalui email{" "}
            <span className="text-foreground group-hover:text-white transition-colors duration-200">
              {maskEmail(state.email)}
            </span>
          </p>
        </div>

        {/* Chevron */}
        <ChevronRight size={20} className="text-foreground/40 group-hover:text-white shrink-0 transition-colors duration-200" />
      </button>
    </div>
  );
}