"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  loading?: boolean;
}

export default function RejectAccountModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}: Props) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onSubmit(reason);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-heading font-bold text-center">
          Detail Penolakan
        </h2>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold">
            Catatan Penolakan
          </label>

          <textarea
            placeholder="Isi dengan catatan atau alasan penolakan pendaftaran akun"
            className={`
              w-full min-h-45 resize-none rounded-2xl text-foreground
              border border-border bg-surface p-4 
              focus:outline-none focus:ring-2 focus:ring-primary/30
            `}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={onClose}
            size="md"
            className="bg-danger text-white hover:bg-danger/60 cursor-pointer"
          >
            Batal
          </Button>

        <Button
            onClick={handleSubmit}
            disabled={!reason.trim() || loading}
            className="bg-primary text-white font-medium hover:bg-primary/60 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
            {loading ? "Mengirim..." : "Kirim Penolakan"}
        </Button>
        </div>
      </div>
    </Modal>
  );
}