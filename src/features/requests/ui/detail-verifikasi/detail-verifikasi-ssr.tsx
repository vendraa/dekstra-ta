import { Role } from "../../types/types";

import { getDetailPermohonanServer } from "@/services/detail-persetujuan/detail-persetujuan.server.service";

import { DetailPengajuanContent } from "./components/DetailPengajuanContent";

interface Props {
  id: string;
  role: Role;
}

export async function DetailPengajuanSSRPage({
  id,
  role,
}: Props) {
  const detail =
    await getDetailPermohonanServer(id);

  if (!detail) {
    return (
      <div className="px-6 py-10 text-center">
        Pengajuan tidak ditemukan.
      </div>
    );
  }

  const suratMasukHref =
    role === "KADES"
      ? "/kades/surat/menunggu-persetujuan-ssr"
      : `/${role.toLowerCase()}/surat/verifikasi-ssr`;

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