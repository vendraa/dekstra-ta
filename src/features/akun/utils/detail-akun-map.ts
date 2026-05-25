import {
  DetailAkunResponse,
  Account,
  AccountStatus,
} from "../types/akun.types";

import { formatDateTime } from "@/lib/date-formatter";

function mapStatus(status: number): AccountStatus {

  switch (status) {

    case 1:
      return AccountStatus.PENDING_VERIFICATION;

    case 2:
      return AccountStatus.REJECTED;

    case 3:
      return AccountStatus.VERIFIED;

    default:
      return AccountStatus.PENDING_VERIFICATION;
  }
}

export function mapDetailAkunToAccount(
  data: DetailAkunResponse
): Account {

  return {
    id: String(data.id),

    nik: data.nik,
    kkNumber: data.nomor_kk,

    fullName: data.nama_lengkap,

    birthPlace: data.tempat_lahir,
    birthDate: data.tanggal_lahir,

    address: data.alamat,

    phone: data.no_hp,
    email: data.email,

    gender: data.jenis_kelamin_display,
    religion: data.agama_display,

    rt: data.rt,
    rw: data.rw,

    // =========================
    // CLOUDINARY URL
    // =========================

    ktpUrl: data.ktp_file_url ?? undefined,

    kkUrl: data.kk_file_url ?? undefined,

    status: mapStatus(data.status_verifikasi),

    createdAt: formatDateTime(data.created_at),

    updatedAt: formatDateTime(data.created_at),
  };
}