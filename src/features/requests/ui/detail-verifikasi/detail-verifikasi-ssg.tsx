import { Role } from "../../types/types";

import { getDetailPermohonanStatic } from "@/services/detail-persetujuan/detail-persetujuan.static.service";

import { DetailPengajuanContent } from "./components/DetailPengajuanContent";

interface Props {
  id: string;
  role: Role;
}

export async function DetailPengajuanSSGPage({
  id,
  role,
}: Props) {
  const detail =
    await getDetailPermohonanStatic(id);

  if (!detail) {
    return (
      <div className="px-6 py-10 text-center">
        Pengajuan tidak ditemukan.
      </div>
    );
  }

  const suratMasukHref =
    role === "KADES"
      ? "/kades/surat/menunggu-persetujuan-ssg"
      : `/${role.toLowerCase()}/surat/verifikasi-ssg`;

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