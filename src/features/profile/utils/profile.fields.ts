type Role = "RT" | "RW" | "ADMIN" | "KEPALA_DESA" | "WARGA";

import { UserProfile } from "../types/profile.types";

export function getPersonalFields(profile: UserProfile) {
  const role = profile.role.toUpperCase() as Role;

  const baseFields = [
    { label: "NIK", value: profile.nik },
    { label: "Nama Lengkap", value: profile.name },
    { label: "Tempat Lahir", value: profile.birthPlace },
    { label: "Tanggal Lahir", value: profile.birthDate },
    { label: "Alamat", value: profile.address },
  ];

  if (role === "WARGA") {
    return [
      { label: "Nomor Kartu Keluarga (KK)", value: profile.kk },
      ...baseFields,
      {
        label: "RT",
        value: profile.rt ?? "-",
      },
      {
        label: "RW",
        value: profile.rw ?? "-",
      },
    ];
  }

  if (role === "RT") {
    return [
      { label: "Nomor Kartu Keluarga (KK)", value: profile.kk },
      ...baseFields,
      {
        label: "Wilayah RT",
        value: profile.rt ?? "-",
      },
    ];
  }

  if (role === "RW") {
    return [
      { label: "Nomor Kartu Keluarga (KK)", value: profile.kk },
      ...baseFields,
      {
        label: "Wilayah RW",
        value: profile.rw ?? "-",
      },
    ];
  }

  if (role === "ADMIN" || role === "KEPALA_DESA") {
    return [
      ...baseFields,
      { label: "Jabatan", value: profile.role },
    ];
  }

  return baseFields;
}