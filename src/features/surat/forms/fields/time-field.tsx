"use client";

import { useId } from "react";
import { useFormContext, useFormState } from "react-hook-form";

interface TimeFieldProps {
  name:        string;
  label:       string;
  required?:   boolean;
  disabled?:   boolean;
}

export function TimeField({
  name,
  label,
  required  = false,
  disabled  = false,
}: TimeFieldProps) {
  const inputId = useId();

  const { register, control } = useFormContext();

  const { errors } = useFormState({
    control,
    name,
  });

  const error = errors[name];

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
        type="time"
        disabled={disabled}
        {...register(name)}
        className={`
          w-full rounded-lg border px-4 py-2 text-sm outline-none transition
          bg-surface text-foreground
          ${error
            ? "border-danger focus:ring-2 focus:ring-danger/30"
            : "border-border focus:ring-2 focus:ring-primary/30"
          }
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        `}
      />

      {error && (
        <span className="text-xs text-danger">
          {error.message as string}
        </span>
      )}
    </div>
  );
}