"use client";

import { FileText } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { SuratConfig } from "../surat-config";

interface SuratCardProps {
  surat: SuratConfig;
  onSelect: (slug: string) => void;
}

export function SuratCard({ surat, onSelect }: SuratCardProps) {
  return (
    <div
      className={`
        flex items-start gap-6
        bg-white border border-border
        rounded-3xl
        px-8 py-6
        shadow-card hover:shadow-md
        transition-all duration-200
        h-full
      `}
    >
      {/* ICON KIRI */}
      <div
        className={`
          w-20 h-20
          flex items-center justify-center
          rounded-full
          bg-gray-50
          shadow-md
          shrink-0
        `}
      >
        <FileText className="w-9 h-9 text-primary" />
      </div>

      {/* KONTEN KANAN */}
      <div className="flex flex-col flex-1 h-full">
        {/* TITLE */}
        <h3 className="text-lg font-heading font-bold text-foreground">
          {surat.title}
        </h3>

        {/* DIVIDER */}
        <hr className="my-2 border-border" />

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground leading-relaxed text-justify">
          {surat.description}
        </p>

        {/* BUTTON SELALU DI BAWAH */}
        <div className="flex justify-end mt-auto pt-6">
          <Button
            onClick={() => onSelect(surat.slug)}
            className={`
              bg-primary text-white
              px-6 rounded-xl
              shadow-sm hover:opacity-90
            `}
            size="md"
          >
            Pilih Surat
          </Button>
        </div>
      </div>
    </div>
  );
}
