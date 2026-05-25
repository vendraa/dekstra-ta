"use client";

import { useRef } from "react";

interface OTPInputProps {
  value: string[];
  onChange: (otp: string[]) => void;
}

export default function OTPInput({ value, onChange }: OTPInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;

    const newOtp = [...value];
    newOtp[index] = digit;
    onChange(newOtp);

    if (digit && index < value.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // 🔥 HANDLE PASTE (INI KUNCI UTAMA)
  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const newOtp = [...value];

    for (let i = 0; i < pasted.length && index + i < value.length; i++) {
      newOtp[index + i] = pasted[i];
    }

    onChange(newOtp);

    const lastIndex = Math.min(index + pasted.length - 1, value.length - 1);
    inputsRef.current[lastIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="tel"
          autoComplete="one-time-code"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          className="w-12 h-14 rounded-xl border border-border text-center text-lg font-bold outline-none focus:ring-2 focus:ring-primary/30 bg-surface"
        />
      ))}
    </div>
  );
}