import { Account, AccountStatus } from "../types/akun.types";
import { AccountDTO } from "../types/akun.dto";
import { formatDateTime } from "../../../lib/date-formatter";

export function mapAccount(data: AccountDTO): Account {
  return {
    id: String(data.id),

    kkNumber: data.nomor_kk,
    nik: data.nik,

    fullName: data.nama_lengkap,
    gender: data.jenis_kelamin === 1 ? "L" : "P",

    birthPlace: data.tempat_lahir ?? "",
    birthDate: data.tanggal_lahir ?? "",
    address: data.alamat ?? "",

    phone: data.no_hp,
    email: data.email,

    status: data.status_verifikasi as AccountStatus,

    // 🔥 FIX UTAMA DI SINI
    createdAt: formatDateTime(data.created_at),

    updatedAt: data.updated_at
      ? formatDateTime(data.updated_at)
      : formatDateTime(data.created_at),

    ktpUrl: data.ktp_file ?? undefined,
    kkUrl: data.kk_file ?? undefined,
  };
}