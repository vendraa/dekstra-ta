import { Role } from "../../types/types";

import {
  getDetailPermohonanStatic,
  StaticTestRole,
} from "@/services/detail-persetujuan/detail-persetujuan.static.service";

import { DetailPengajuanContent } from "./components/DetailPengajuanContent";

interface Props {
  id: string;
  role: Role;
}

function toStaticTestRole(role: Role): StaticTestRole {
  const mapping: Record<Role, StaticTestRole> = {
    WARGA: "warga",
    RT: "rt",
    RW: "rw",
    ADMIN: "admin",
    KADES: "kades",
  };

  return mapping[role];
}

export async function DetailPengajuanSSGPage({
  id,
  role,
}: Props) {
  const testRole = toStaticTestRole(role);

  const detail = await getDetailPermohonanStatic(id, testRole);

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
      suratMasukHref={suratMasukHref}
    />
  );
}