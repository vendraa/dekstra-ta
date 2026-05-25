"use client";

import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import { CheckCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function VerifyAccountModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">

        {/* ICON */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="text-green-600" size={40} />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Verifikasi Pendaftaran
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground max-w-md">
          Apakah Anda yakin ingin menyetujui pendaftaran akun ini?
          Tindakan ini tidak dapat dibatalkan.
        </p>

        {/* ACTION */}
        <div className="flex gap-4 mt-2">
          <Button
            onClick={onClose}
            size="md"
            className="bg-danger text-white hover:bg-danger/60 cursor-pointer"
          >
            Batal
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            size="md"
            className="bg-primary text-white hover:bg-primary/60 cursor-pointer"
          >
            {loading ? "Memproses..." : "Ya, Verifikasi"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}