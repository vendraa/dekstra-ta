"use client";

import {
  useController,
  useFormContext,
} from "react-hook-form";

import clsx from "clsx";

interface NumberFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}

export function NumberField({
  name,
  label,
  placeholder,
  required,
  disabled,
  min,
  max,
  prefix,
  suffix,
}: NumberFieldProps) {
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
    defaultValue: undefined,
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

      <div className="flex items-center">
        {/* ================= PREFIX ================= */}

        {prefix && (
          <span className="h-11 px-3 flex items-center border border-r-0 border-border rounded-l-lg bg-muted text-sm text-muted-foreground">
            {prefix}
          </span>
        )}

        {/* ================= INPUT ================= */}

        <input
          type="number"
          placeholder={
            placeholder ??
            `Masukkan ${label.toLowerCase()}`
          }
          disabled={disabled}
          min={min}
          max={max}
          value={value ?? ""}
          onBlur={onBlur}
          name={fieldName}
          ref={ref}
          onChange={(e) => {
            const inputValue = e.target.value;

            if (inputValue === "") {
              onChange(undefined);
              return;
            }

            const parsed = Number(inputValue);

            onChange(
              Number.isNaN(parsed)
                ? undefined
                : parsed
            );
          }}
          className={clsx(
            "w-full h-11 border bg-surface px-4 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none transition",
            "transition-all duration-200",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            error
              ? "border-danger focus:ring-2 focus:ring-danger/30"
              : "border-border focus:ring-2 focus:ring-primary/30",
            disabled &&
              "opacity-50 cursor-not-allowed bg-muted",
            prefix && suffix
              ? "rounded-none"
              : prefix
              ? "rounded-r-lg"
              : suffix
              ? "rounded-l-lg"
              : "rounded-lg"
          )}
        />

        {/* ================= SUFFIX ================= */}

        {suffix && (
          <span className="h-11 px-3 flex items-center border border-l-0 border-border rounded-r-lg bg-muted text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>

      {/* ================= ERROR ================= */}

      {error?.message && (
        <p className="text-xs text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
}