"use client";

import { ShieldCheck } from "lucide-react";
import Modal  from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";

interface ConfirmRegisterModalProps {
  open:      boolean;
  onClose:   () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ConfirmRegisterModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: ConfirmRegisterModalProps) {
  return (
    <Modal open={open} onClose={onClose} closeOnOverlayClick={!isLoading}>
      <div className="flex flex-col items-center text-center gap-5">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>

        {/* Title & description */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">
            Konfirmasi Pendaftaran
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Pastikan semua data yang Anda masukkan sudah benar.
            Data yang telah dikirim tidak dapat diubah kembali.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <Button
            type="button"
            fullWidth
            onClick={onClose}
            disabled={isLoading}
            className="border border-border text-foreground/70
                       hover:bg-surface disabled:opacity-50"
          >
            Periksa Kembali
          </Button>

          <Button
            type="button"
            fullWidth
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-primary text-white hover:opacity-90
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Mengirim..." : "Ya, Kirim Data"}
          </Button>
        </div>

      </div>
    </Modal>
  );
}