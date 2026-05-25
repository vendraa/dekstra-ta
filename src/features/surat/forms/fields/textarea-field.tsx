"use client";

import { useFormContext, useFormState } from "react-hook-form";
import clsx from "clsx";

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function TextareaField({
  name,
  label,
  placeholder,
  required,
  disabled,
  rows = 4,
}: TextareaFieldProps) {
  const { register, control } = useFormContext();

  const { errors } = useFormState({
    control,
    name,
  });

  const error = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>

      <textarea
        {...register(name)}
        placeholder={placeholder ?? `Masukkan ${label.toLowerCase()}`}
        disabled={disabled}
        rows={rows}
        className={clsx(
          "w-full rounded-lg border bg-surface px-4 py-3 text-sm",
          "placeholder:text-muted-foreground resize-none",
          "focus:outline-none transition",
          "transition-all duration-200",
          error
            ? "border-danger focus:ring-2 focus:ring-danger/30 "
            : "border-border focus:ring-2 focus:ring-primary/30",
          disabled && "opacity-50 cursor-not-allowed bg-muted"
        )}
      />

      {error && (
        <p className="text-xs text-danger">{error}</p>
      )}
    </div>
  );
}