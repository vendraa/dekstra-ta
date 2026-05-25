"use client";

import { useId } from "react";

export interface TextInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;

  type?: React.HTMLInputTypeAttribute;

  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function TextInput({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  error,
  required = false,
  disabled = false,
}: TextInputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>

      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          rounded-lg border px-4 py-2 text-sm outline-none transition
          bg-surface text-foreground
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          ${
            error
              ? "border-danger focus:ring-2 focus:ring-danger/30"
              : "border-border focus:ring-2 focus:ring-primary/30"
          }
        `}
      />

      {error && (
        <span className="text-xs text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
