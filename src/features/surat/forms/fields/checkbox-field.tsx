"use client";

import {
  useController,
  useFormContext,
  useWatch,
} from "react-hook-form";

import clsx from "clsx";

interface CheckboxFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
}

export function CheckboxField({
  name,
  label,
  disabled,
}: CheckboxFieldProps) {
  const { control } = useFormContext();

  const {
    field: { onChange, onBlur, ref },
    fieldState,
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  const value = useWatch({
    control,
    name,
    defaultValue: false,
  });

  return (
    <div className="flex flex-col gap-1">
      <label
        className={clsx(
          "flex items-center gap-3 cursor-pointer group",
          disabled &&
            "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) =>
            onChange(e.target.checked)
          }
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          className={clsx(
            "w-4 h-4 rounded text-primary cursor-pointer",
            "focus:ring-2 focus:ring-offset-0",
            "transition-all duration-200",

            fieldState.error
              ? "border-danger focus:ring-danger/20"
              : "border-border focus:ring-primary/20",

            disabled &&
              "cursor-not-allowed"
          )}
        />

        <span
          className={clsx(
            "text-sm transition-colors duration-200",

            fieldState.error
              ? "text-danger"
              : "text-foreground group-hover:text-primary"
          )}
        >
          {label}
        </span>
      </label>

      {fieldState.error && (
        <p className="text-xs text-danger ml-7">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}