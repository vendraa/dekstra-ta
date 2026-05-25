import { z } from "zod";

const ahliWarisItemSchema = z.object({
  nama_lengkap:  z.string().min(1, "Nama wajib diisi"),
  nik:           z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "NIK hanya angka"),
  tempat_lahir:  z.string().min(1, "Tempat lahir wajib diisi"),
  tanggal_lahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  alamat:        z.string().min(1, "Alamat wajib diisi"),
});

export const ahliWarisSchema = z.object({

  // Data Ahli Waris — array maksimal 7 orang sesuai template surat
  daftar_ahli_waris: z
    .array(ahliWarisItemSchema)
    .min(1, "Minimal 1 ahli waris wajib diisi")
    .max(7, "Maksimal 7 ahli waris"),

  // Data Pewaris
  nama_pewaris:  z.string().min(1, "Nama pewaris wajib diisi"),
  nama_warisan:  z.string().min(1, "Nama warisan wajib diisi"),
});

export type AhliWarisItemValues  = z.infer<typeof ahliWarisItemSchema>;
export type AhliWarisFormValues  = z.infer<typeof ahliWarisSchema>;