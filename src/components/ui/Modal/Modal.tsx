"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Content */}
      <div
        className="
          relative z-10
          w-full max-w-2xl
          max-h-[90vh]
          rounded-3xl
          bg-white
          shadow-2xl
          overflow-hidden
        "
      >
        <div
          className="
            max-h-[90vh]
            overflow-y-auto
            custom-scrollbar-thin
            p-10
          "
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}