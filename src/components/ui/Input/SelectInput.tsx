"use client";

import { useId } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function SelectInput({
  label,
  value,
  options,
  onChange,
  placeholder = "Pilih",
  required,
  error,
}: SelectInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </label>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          rounded-lg border px-4 py-2 text-sm outline-none transition
          bg-surface text-foreground
          ${error ? "border-danger" : "border-border"}
        `}
      >
        {/* Placeholder */}
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
