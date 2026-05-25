import { z } from "zod";

export const tempatUsahaSchema = z.object({
  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap wajib diisi"),

  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  nib: z
    .string()
    .length(13, "NIB harus 13 digit")
    .regex(/^\d+$/, "NIB hanya boleh berisi angka"),

  npwp: z
    .string()
    .length(16, "NPWPW harus 16 digit")
    .regex(/^\d+$/, "NPWP hanya boleh berisi angka"),

  alamat: z
    .string()
    .min(1, "Alamat wajib diisi"),

  nama_usaha: z
    .string()
    .min(1, "Nama usaha wajib diisi"),

  jenis_usaha: z
    .string()
    .min(1, "Jenis usaha wajib diisi"),

  alamat_usaha: z
    .string()
    .min(1, "Alamat usaha wajib diisi"),

  tujuan_pengajuan: z
    .string()
    .min(1, "Tujuan pengajuan wajib diisi"),
});

export type UsahaFormValues = z.infer<typeof tempatUsahaSchema>;