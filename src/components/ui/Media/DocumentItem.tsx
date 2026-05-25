"use client";

import { useState } from "react";
import Image from "next/image";
import ImagePreviewModal from "@/components/ui/Modal/ImagePreviewModal";

interface DocumentItemProps {
  label: string;
  src: string;
  alt: string;
}

export default function DocumentItem({
  label,
  src,
  alt,
}: DocumentItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="text-base font-bold text-foreground">
          {label}
        </p>

        <div
          className="relative w-full aspect-3/2 rounded-2xl overflow-hidden bg-surface cursor-pointer hover:opacity-90 transition"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <ImagePreviewModal
        src={src}
        alt={alt}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}