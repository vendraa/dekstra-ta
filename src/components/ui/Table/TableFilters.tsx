"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function TableFilters({ children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {children}
    </div>
  );
}