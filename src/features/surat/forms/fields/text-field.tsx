"use client";

import {
  useController,
  useFormContext,
} from "react-hook-form";

import clsx from "clsx";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  numericOnly?: boolean;
}

export function TextField({
  name,
  label,
  placeholder,
  required,
  disabled,
  numericOnly,
}: TextFieldProps) {
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
        type="text"
        value={field.value ?? ""}
        placeholder={
          placeholder ??
          `Masukkan ${label.toLowerCase()}`
        }
        inputMode={
          numericOnly ? "numeric" : undefined
        }
        pattern={
          numericOnly ? "[0-9]*" : undefined
        }
        onChange={(e) => {
          let inputValue = e.target.value;

          if (numericOnly) {
            inputValue =
              inputValue.replace(/\D/g, "");
          }

          field.onChange(inputValue);
        }}
        disabled={disabled}
        className={clsx(
          "w-full h-11 rounded-lg border bg-surface px-4 text-sm outline-none transition",
          "placeholder:text-muted-foreground",
          "transition-all duration-200",
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