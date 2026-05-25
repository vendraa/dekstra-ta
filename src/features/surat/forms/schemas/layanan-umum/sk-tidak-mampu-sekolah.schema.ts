import { z } from "zod";

export const tidakMampuSekolahSchema = z.object({
  // Data Orang Tua
  nama_orang_tua: z
    .string()
    .min(1, "Nama orang tua wajib diisi"),

  tempat_lahir: z
    .string()
    .min(1, "Tempat lahir wajib diisi"),

  tanggal_lahir: z
    .string()
    .min(1, "Tanggal lahir wajib diisi"),

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

  penghasilan: z
    .number({ error: "Penghasilan wajib diisi" })
    .min(0, "Penghasilan tidak valid"),

  keperluan: z
    .string()
    .min(1, "Keperluan wajib diisi"),

  // Data Anak
  nama_anak: z
    .string()
    .min(1, "Nama anak wajib diisi"),

  tempat_lahir_anak: z
    .string()
    .min(1, "Tempat lahir anak wajib diisi"),

  tanggal_lahir_anak: z
    .string()
    .min(1, "Tanggal lahir anak wajib diisi"),

  asal_sekolah: z
    .string()
    .min(1, "Asal sekolah wajib diisi"),

  kelas: z
    .string()
    .min(1, "Kelas wajib diisi"),
});

export type TidakMampuSekolahFormValues = z.infer<typeof tidakMampuSekolahSchema>;