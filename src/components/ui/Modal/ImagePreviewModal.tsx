"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface Props {
  src:     string;
  alt:     string;
  isOpen:  boolean;
  onClose: () => void;
}

export default function ImagePreviewModal({
  src,
  alt,
  isOpen,
  onClose,
}: Props) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-[90%] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`
            absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-white 
            rounded-full p-1.5 shadow-md hover:opacity-80 
            transition-opacity cursor-pointer
          `}
        >
          <X size={20} className="text-foreground" />
        </button>

        <div className="relative w-full h-[80vh]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}