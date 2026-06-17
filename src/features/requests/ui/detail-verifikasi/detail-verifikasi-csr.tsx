"use client";

import { Role } from "../../types/types";

import { useDetailPermohonan } from "../../hooks/useDetailPermohonan";

import { DetailPengajuanContent } from "./components/DetailPengajuanContent";

import { DetailPengajuanSkeleton } from "./components/DetailPengajuanSkeleton";

interface Props {
  id: string;
  role: Role;
}

export function DetailPengajuanCSRPage({
  id,
  role,
}: Props) {
  const {
    detail,
    loading,
    error,
  } = useDetailPermohonan(id);

  if (loading) {
    return (
      <DetailPengajuanSkeleton />
    );
  }

  if (error) {
    return (
      <div className="px-6 py-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="px-6 py-10 text-center text-muted-foreground">
        Pengajuan tidak ditemukan.
      </div>
    );
  }

  const suratMasukHref =
    role === "KADES"
      ? "/kades/surat/menunggu-persetujuan-csr"
      : `/${role.toLowerCase()}/surat/verifikasi-csr`;

  return (
    <DetailPengajuanContent
      detail={detail}
      role={role}
      suratMasukHref={
        suratMasukHref
      }
    />
  );
}