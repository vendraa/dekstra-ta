"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: IconPosition;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-xl font-bold shadow-button transition-all duration-200";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Button({
  children,
  loading = false,
  disabled,
  fullWidth = false,
  size = "md",
  icon,
  iconPosition = "left",
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={loading}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        {
          "gap-2": !!icon,
          "w-full": fullWidth,
          "opacity-60 cursor-not-allowed": isDisabled,
        },
        className
      )}
    >
      {loading ? (
        "Memproses..."
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
}
