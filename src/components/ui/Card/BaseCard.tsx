import { ReactNode } from "react";
import clsx from "clsx";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
}

export function BaseCard({ children, className }: BaseCardProps) {
  return (
    <div
      className={clsx(
        "bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}