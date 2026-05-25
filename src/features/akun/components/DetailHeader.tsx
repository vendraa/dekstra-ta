"use client";

import Button from "@/components/ui/Button/Button";
import { X, Check } from "lucide-react";
import { useState } from "react";
import RejectAccountModal from "./RejectAccountModal";
import VerifyAccountModal from "./VerifyAccountModal";
import { verifyAkun } from "../services/verifikasi-akun.service";
import { useRouter } from "next/navigation";

interface DetailHeaderProps {
  id: string; // 🔥 WAJIB
  onTolak?: (reason: string) => void;
  onVerifikasi?: () => void;
}

export default function DetailHeader({
  id,
  onTolak,
  onVerifikasi,
}: DetailHeaderProps) {
  const router = useRouter();
  const [isRejectOpen, setRejectOpen] = useState(false);
  const [isVerifyOpen, setVerifyOpen] = useState(false);

  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  const handleRejectSubmit = async (reason: string) => {
    if (!id) return;

    try {
      setLoadingReject(true);

      const res = await verifyAkun(id, { aksi: 0 });

      alert(res.message);

      setRejectOpen(false);
      onTolak?.(reason);

      // 🔥 redirect
      router.push("/admin/manajemen-akun/verifikasi");

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Terjadi kesalahan");
      }
    } finally {
      setLoadingReject(false);
    }
  };

  const handleVerifyConfirm = async () => {
    if (!id) return;

    try {
      setLoadingVerify(true);

      const res = await verifyAkun(id, { aksi: 1 });

      alert(res.message);

      setVerifyOpen(false);
      onVerifikasi?.();

      // 🔥 redirect
      router.push("/admin/manajemen-akun/verifikasi");

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Terjadi kesalahan");
      }
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">
          Detail Pendaftaran
        </h1>

        <div className="flex gap-3">
          {/* Tolak */}
          <Button
            size="md"
            onClick={() => setRejectOpen(true)}
            className="flex items-center gap-2 bg-danger text-white hover:bg-red-700"
          >
            <X size={16} />
            Tolak Pendaftaran
          </Button>

          {/* Verifikasi */}
          <Button
            size="md"
            onClick={() => setVerifyOpen(true)}
            className="flex items-center gap-2 bg-primary text-white hover:bg-green-700"
          >
            <Check size={16} />
            Verifikasi Pendaftaran
          </Button>
        </div>
      </div>

      {/* Modal harus dirender di dalam JSX */}
      <RejectAccountModal
        open={isRejectOpen}
        onClose={() => setRejectOpen(false)}
        onSubmit={handleRejectSubmit}
        loading={loadingReject}
      />

      <VerifyAccountModal
        open={isVerifyOpen}
        onClose={() => setVerifyOpen(false)}
        onConfirm={handleVerifyConfirm}
        loading={loadingVerify}
/>
    </>
  );
}