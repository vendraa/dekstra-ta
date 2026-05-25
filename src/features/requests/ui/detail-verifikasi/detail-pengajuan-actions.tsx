"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle, CheckCircle, Loader2 } from "lucide-react";

import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import TextAreaInput from "@/components/ui/Input/TextAreaInput";

import { Role } from "../../types/types";

import { createRiwayatPersetujuan } from "../../services/riwayat-persetujuan.service";

interface Props {
  nomorPermohonan: string; 
  role: Role;
}

function getRedirectPath(role: Role) {
  const base = `/${role.toLowerCase()}`;

  if (role === "KADES") {
    return `${base}/surat/menunggu-persetujuan`;
  }

  return `${base}/surat/verifikasi`;
}

export function DetailPengajuanActions({ nomorPermohonan, role }: Props) {
  const router = useRouter();
  const [openTolak, setOpenTolak] = useState(false);
  const [openVerifikasi, setOpenVerifikasi] = useState(false);
  const [catatan, setCatatan] = useState("");
  const AKSI = {
    SETUJU: 2,
    TOLAK: 3,
  };

  const verificationTitle =
  role === "KADES"
    ? "Konfirmasi Persetujuan"
    : "Konfirmasi Verifikasi";

const verificationDescription =
  role === "KADES"
    ? "Apakah Anda yakin ingin menyetujui pengajuan ini?"
    : "Apakah Anda yakin ingin memverifikasi dan melanjutkan pengajuan ini?";

  const verifyButtonText =
  role === "KADES"
    ? "Ya, Setujui"
    : "Ya, Verifikasi";

const verifyLoadingText =
  role === "KADES"
    ? "Menyetujui..."
    : "Memverifikasi...";

  // =========================
  // ACTION HANDLER
  // =========================
  const [loading, setLoading] = useState(false);

  const handleSubmitTolak = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await createRiwayatPersetujuan({
        nomor_permohonan: nomorPermohonan,
        aksi: AKSI.TOLAK,
        catatan: catatan,
      });

      setOpenTolak(false);
      setCatatan("");

      const redirectPath =
        getRedirectPath(role);

      router.push(redirectPath);

    } catch (error) {
      console.error("Gagal tolak:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitVerifikasi =
    async () => {

      if (loading) return;

      try {
        setLoading(true);

        await createRiwayatPersetujuan({
          nomor_permohonan:
            nomorPermohonan,
          aksi: AKSI.SETUJU,
        });

        setOpenVerifikasi(false);

        const redirectPath =
          getRedirectPath(role);

        router.push(redirectPath);

      } catch (error) {
        console.error(
          "Gagal verifikasi:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 shrink-0">
        <Button
          type="button"
          onClick={() => setOpenTolak(true)}
          className="flex items-center gap-1.5 bg-danger text-white"
        >
          <XCircle size={15} />
          <span>Tolak Pengajuan</span>
        </Button>

        <Button
          type="button"
          onClick={() => setOpenVerifikasi(true)}
          className="flex items-center gap-1.5 bg-primary text-white"
        >
          <CheckCircle size={15} />
          <span>
            {role === "KADES"
              ? "Setujui & Tandatangani"
              : "Verifikasi & Teruskan"}
          </span>
        </Button>
      </div>

      {/* ========================= */}
      {/* MODAL TOLAK */}
      {/* ========================= */}
      <Modal
        open={openTolak}
        onClose={() => {
          if (!loading) {
            setOpenTolak(false);
          }
        }}
      >
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-center">
            Detail Penolakan
          </h2>

          <TextAreaInput
            label="Catatan Penolakan"
            value={catatan}
            onChange={setCatatan}
            placeholder="Masukkan alasan penolakan..."
            required
          />

          <div className="flex justify-center gap-2 pt-4">
            <Button
              type="button"
              size="md"
              disabled={loading}
              className="hover: cursor-pointer"
              onClick={() => setOpenTolak(false)}
            >
              Batal
            </Button>

            <Button
              type="button"
              size="md"
              onClick={handleSubmitTolak}
              disabled={
                !catatan.trim() || loading
              }
              className="
                bg-danger text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
                enabled:cursor-pointer
              "
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Mengirim...
                </span>
              ) : (
                "Kirim Penolakan"
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* ========================= */}
      {/* MODAL VERIFIKASI */}
      {/* ========================= */}
      <Modal
        open={openVerifikasi}
        onClose={() => {
          if (!loading) {
            setOpenVerifikasi(false);
          }
        }}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* ICON */}
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="text-primary" size={32} />
          </div>

          {/* TEXT */}
          <div className="space-y-2">
            <h2 className="text-xl font-heading font-semibold">
              {verificationTitle}
            </h2>

            <p className="text-sm text-muted-foreground">
              {verificationDescription}
            </p>
          </div>

          {/* ACTION */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              size="md"
              className="hover: cursor-pointer"
              onClick={() => setOpenVerifikasi(false)}
            >
              Batal
            </Button>

            <Button
              type="button"
              size="md"
              onClick={handleSubmitVerifikasi}
              disabled={loading}
              className="
                bg-primary text-white
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  {verifyLoadingText}
                </span>
              ) : (
                verifyButtonText
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}