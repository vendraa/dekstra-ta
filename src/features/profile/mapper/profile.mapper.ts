import { Profile, UserProfile } from "../types/profile.types";

function formatDateIndo(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function mapProfileToUserProfile(data: Profile): UserProfile {
  return {
    id: data.nik,
    name: data.nama_lengkap,
    email: data.email,
    role: data.peran,

    nik: data.nik,
    kk: data.nomor_kk ?? "-",

    birthPlace: data.tempat_lahir,
    birthDate: formatDateIndo(data.tanggal_lahir),

    address: data.alamat ?? "-",
    phone: data.nomor_telepon,

    rt: data.rt ? `RT ${data.rt}` : null,
    rw: data.rw ? `RW ${data.rw}` : null,
  };
}