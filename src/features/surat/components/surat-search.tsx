"use client";

import { Search } from "lucide-react";
import clsx from "clsx";
import { ChangeEvent } from "react";

interface SuratSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SuratSearch({
  value,
  onChange,
  placeholder = "Cari Surat...",
  className,
}: SuratSearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    // FIX: ml-auto agar search terdorong ke kanan, max-w-sm membatasi lebar ~1/3
    <div className={clsx("ml-auto w-full max-w-sm", className)}>
      <div className="relative">
        {/* FIX: Icon berwarna primary (hijau) sesuai desain */}
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />

        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(
            "w-full h-12 rounded-xl border border-border bg-surface",
            // FIX: pl-12 memberi ruang lebih untuk icon yang lebih besar
            "pl-12 pr-4 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "transition-all duration-200"
          )}
        />
      </div>
    </div>
  );
}