"use client";

import { useId } from "react";

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string
}

export default function TextAreaInput({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
}: TextAreaInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </label>

      <textarea
        id={id}
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
          rounded-lg border border-border px-4 py-2 text-sm outline-none transition
          bg-surface text-foreground
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