import { Gender, Agama } from "../types/register.types";

export type IdentityErrors = {
  kkNumber?: string;
  nik?: string;
  fullName?: string;
  gender?: string;
  birthPlace?: string;
  birthDate?: string;
  agama?: string;
  address?: string;
  rt?: string;
  rw?: string;
};

function age(dateString: string): boolean {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 17;
}

export function validateIdentity(data: {
  kkNumber: string;
  nik: string;
  fullName: string;
  gender: Gender | null;
  birthPlace: string;
  birthDate: string;
  address: string;
  agama: Agama | null;
  rt: string;
  rw: string;
}): IdentityErrors {
  const errors: IdentityErrors = {};

  if (!data.kkNumber) {
    errors.kkNumber = "Nomor KK wajib diisi";
  } else if (!/^\d{16}$/.test(data.kkNumber)) {
    errors.kkNumber = "Nomor KK harus 16 digit angka";
  }

  if (!data.nik) {
    errors.nik = "NIK wajib diisi";
  } else if (!/^\d{16}$/.test(data.nik)) {
    errors.nik = "NIK harus 16 digit angka";
  }

    if (!data.fullName) {
    errors.fullName = "Nama lengkap wajib diisi";
  }

  if (!data.gender) {
    errors.gender = "Jenis kelamin wajib dipilih";
  }

  if (!data.birthPlace) {
    errors.birthPlace = "Tempat lahir wajib diisi";
  } else if (!age(data.birthDate)) {
    errors.birthDate = "Umur minimal 17 tahun";
  }

  if (!data.birthDate) {
    errors.birthDate = "Tanggal lahir wajib diisi";
  }

  if (!data.agama) {
    errors.agama = "Agama wajib diisi";
  }

  if (!data.address) {
    errors.address = "Alamat wajib diisi";
  }

  if (!data.rt) {
    errors.rt = "RT wajib diisi";
  } else if (!/^\d{1,3}$/.test(data.rt)) {
    errors.rt = "RT harus berupa angka (max 3 digit)";
  }

  if (!data.rw) {
    errors.rw = "RW wajib diisi";
  } else if (!/^\d{1,3}$/.test(data.rw)) {
    errors.rw = "RW harus berupa angka (max 3 digit)";
  }

  return errors;
}
