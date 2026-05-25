"use client";

import { SuratConfig } from "../surat-config";
import { SuratCard } from "./surat-card";

interface SuratGridProps {
  items: SuratConfig[];
  onSelect: (slug: string) => void;
}

export function SuratGrid({ items, onSelect }: SuratGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-base">Tidak ada surat yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((surat) => (
        <SuratCard
          key={surat.slug}
          surat={surat}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}