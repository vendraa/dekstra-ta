import { ReactNode } from "react";
import clsx from "clsx";
import { BaseCard } from "./BaseCard";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <BaseCard
      className={clsx(
        `
        rounded-[40px]
        shadow-card
        `,
        className
      )}
    >
      {children}
    </BaseCard>
  );
}