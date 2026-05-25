import { z } from "zod";

export const lainnyaSchema = z.object({
  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap wajib diisi"),

  tempat_lahir: z
    .string()
    .min(1, "Tempat lahir wajib diisi"),

  tanggal_lahir: z
    .string()
    .min(1, "Tanggal lahir wajib diisi"),

  jenis_kelamin: z
    .string()
    .min(1, "Jenis kelamin wajib dipilih")
    .refine(
      (val) => ["laki-laki", "perempuan"].includes(val),
      "Jenis kelamin tidak valid"
  ),

  agama: z
    .string()
    .min(1, "Agama wajib dipilih")
    .refine(
      (val) =>
        ["islam", "kristen", "katolik", "hindu", "buddha", "konghucu", "kepercayaan-terhadap-tuhan-yang-maha-esa"].includes(val),
      "Agama tidak valid"
  ),

  pekerjaan: z
    .string()
    .min(1, "Pekerjaan wajib diisi"),

  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  alamat: z
    .string()
    .min(1, "Alamat wajib diisi"),

  tujuan_surat: z
    .string()
    .min(1, "Keperluan surat wajib diisi"),
});

export type LainnyaFormValues = z.infer<typeof lainnyaSchema>;