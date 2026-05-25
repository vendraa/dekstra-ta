"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { BaseCard } from "./BaseCard";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Root({ children, className }: CardProps) {
  return (
    <BaseCard
      className={clsx(
        "rounded-2xl border border-border p-6",
        className
      )}
    >
      {children}
    </BaseCard>
  );
}

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between mb-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface TitleProps {
  children: ReactNode;
  className?: string;
}

function Title({ children, className }: TitleProps) {
  return (
    <h2
      className={clsx(
        "text-base font-bold text-foreground",
        className
      )}
    >
      {children}
    </h2>
  );
}

interface ContentProps {
  children: ReactNode;
}

function Content({ children }: ContentProps) {
  return <div>{children}</div>;
}

export const PageCard = {
  Root,
  Header,
  Title,
  Content,
};