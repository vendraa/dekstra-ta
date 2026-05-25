'use client';

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function PasswordInput({
  label,
  value,
  placeholder,
  onChange,
  error,
  required = false,
  disabled = false,
}: PasswordInputProps) {
  const inputId = useId();
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full rounded-lg border px-4 py-2 pr-10 text-sm outline-none transition
            bg-surface text-foreground
            ${
              error
                ? "border-danger focus:ring-2 focus:ring-danger/30"
                : "border-border focus:ring-2 focus:ring-primary/30"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          `}
        />

        <button
          type="button"
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible(!visible)}
          className={`
            absolute right-3 top-1/2 -translate-y-1/2
            text-muted-foreground hover:text-foreground
            opacity-30 transition
          `}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <span className="text-xs text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
