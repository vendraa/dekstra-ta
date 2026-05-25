import { z } from "zod";

export const izinKeramaianSchema = z.object({
  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap wajib diisi"),

  umur: z
    .number({ error: "Umur wajib diisi" })
    .min(17, "Umur minimal 17 tahun")
    .max(100, "Umur tidak valid"),

  pekerjaan: z
    .string()
    .min(1, "Pekerjaan wajib diisi"),

  alamat: z
    .string()
    .min(1, "Alamat wajib diisi"),

  hari_acara: z
    .string()
    .min(1, "Hari acara wajib diisi"),

  tanggal_acara: z
    .string()
    .min(1, "Tanggal acara wajib diisi"),

  tempat_acara: z
    .string()
    .min(1, "Tempat acara wajib diisi"),

  keterangan: z
    .string()
    .optional(),
});

export type IzinKeramaianFormValues = z.infer<typeof izinKeramaianSchema>;