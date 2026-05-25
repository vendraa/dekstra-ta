"use client";

import {
  useController,
  useFormContext,
} from "react-hook-form";

import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function SelectField({
  name,
  label,
  options,
  placeholder,
  required,
  disabled,
}: SelectFieldProps) {
  const { control } = useFormContext();

  const {
    field: {
      value,
      onChange,
      onBlur,
      name: fieldName,
      ref,
    },
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
          <span className="text-danger ml-1">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <select
          ref={ref}
          name={fieldName}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={clsx(
            "w-full h-11 rounded-lg border bg-surface px-4 pr-10 text-sm appearance-none",
            "focus:outline-none transition",
            "transition-all duration-200",
            error
              ? "border-danger focus:ring-2 focus:ring-danger/30"
              : "border-border focus:ring-2 focus:ring-primary/30",
            disabled &&
              "opacity-50 cursor-not-allowed bg-muted"
          )}
        >
          <option value="" disabled>
            {placeholder ??
              `Pilih ${label.toLowerCase()}`}
          </option>

          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>

      {error?.message && (
        <p className="text-xs text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
}