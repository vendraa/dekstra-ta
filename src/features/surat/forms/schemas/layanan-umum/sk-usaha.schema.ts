import { z } from "zod";

const requiredString = (
  message: string
) =>
  z
    .string()
    .optional()
    .refine(
      (val) =>
        val !== undefined &&
        val.trim() !== "",
      { message }
    );

export const usahaSchema = z.object({
  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap wajib diisi"),

  nik: z
    .string()
    .length(16, "NIK wajib diisi dengan 16 digit angka")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  tempat_lahir: z
    .string()
    .min(1, "Tempat lahir wajib diisi"),

  tanggal_lahir:
    requiredString(
      "Tanggal lahir wajib diisi"
    ),

  jenis_kelamin: z
    .string()
    .min(1, "Jenis kelamin wajib dipilih")
    .refine(
      (val) => ["laki-laki", "perempuan"].includes(val),
      "Jenis kelamin tidak valid"
  ),

  kewarganegaraan: z.enum(
    ["wni", "wna"],
    {
      error: "Kewarganegaraan wajib dipilih",
    }
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

  no_hp: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .max(15, "Nomor HP maksimal 15 digit")
    .regex(/^(08|\+628)\d+$/, "Nomor HP harus diawali 08 atau +628"),

  alamat: z
    .string()
    .min(1, "Alamat wajib diisi"),

  nama_usaha: z
    .string()
    .min(1, "Nama usaha wajib diisi"),

  jenis_usaha: z
    .string()
    .min(1, "Jenis usaha wajib diisi"),

  tujuan_pengajuan: z
    .string()
    .min(1, "Tujuan pengajuan wajib diisi"),
});

export type UsahaFormValues = z.infer<typeof usahaSchema>;