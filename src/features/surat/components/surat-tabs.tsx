"use client";

import { SuratCategory, SURAT_CATEGORIES } from "../surat-config";
import clsx from "clsx";

interface SuratTabsProps {
  value: SuratCategory;
  onChange: (value: SuratCategory) => void;
}

export function SuratTabs({ value, onChange }: SuratTabsProps) {
  return (
    <div className="w-full border-b border-border/60">
      <div className="flex items-center w-full">
        {SURAT_CATEGORIES.map((category) => {
          const active = value === category.value;

          return (
            <button
              key={category.value}
              onClick={() => onChange(category.value)}
              className={clsx(
                "relative flex-1 py-4 text-base font-medium text-center transition-colors duration-200",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category.label}

              {active && (
                <span
                  className="absolute left-0 w-full bg-primary"
                  style={{
                    // Turunkan 1px agar menutupi border-b dari parent
                    bottom: "-1px",
                    height: "3px",
                    // Hanya radius pojok atas kiri dan kanan
                    borderRadius: "5px 5px 0 0",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}