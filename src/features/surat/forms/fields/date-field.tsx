"use client";

import { useController, useFormContext } from "react-hook-form";
import clsx from "clsx";

interface DateFieldProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export function DateField({
  name,
  label,
  required,
  disabled,
  min,
  max,
}: DateFieldProps) {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}

        {required && (
          <span className="text-danger ml-1">*</span>
        )}
      </label>

      <input
        {...field}
        type="date"
        min={min}
        max={max}
        disabled={disabled}
        value={field.value || ""}
        className={clsx(
          "w-full h-11 rounded-lg border bg-surface px-4 text-sm",
          "focus:outline-none transition",
          "transition-all duration-200",
          "[&::-webkit-calendar-picker-indicator]:opacity-50",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
          error
            ? "border-danger focus:ring-2 focus:ring-danger/30"
            : "border-border focus:ring-2 focus:ring-primary/30",
          disabled &&
            "opacity-50 cursor-not-allowed bg-muted"
        )}
      />

      {error?.message && (
        <p className="text-xs text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
}