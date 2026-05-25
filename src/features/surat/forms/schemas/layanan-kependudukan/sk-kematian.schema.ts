import { z } from "zod";

export const kematianSchema = z.object({

  /* ---- Data Jenazah ---- */
  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap wajib diisi"),

  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya angka"),

  tempat_lahir: z
    .string()
    .min(1, "Tempat lahir wajib diisi"),

  tanggal_lahir: z
    .string()
    .min(1, "Tanggal lahir wajib diisi"),

  agama: z
    .enum(["islam", "kristen", "katolik", "hindu", "buddha", "konghucu", "kepercayaan-terhadap-tuhan-yang-maha-esa"],
      { message: "Agama wajib dipilih" }
    ),

  pekerjaan: z
    .string()
    .min(1, "Pekerjaan wajib diisi"),

  kewarganegaraan: z
    .enum(["wni", "wna"],
      { message: "Kewarganegaraan wajib dipilih" }
    ),

  alamat: z
    .string()
    .min(1, "Alamat wajib diisi"),

  /* ---- Data Kematian ---- */
  tanggal_meninggal: z
    .string()
    .min(1, "Tanggal meninggal wajib diisi"),

  tempat_meninggal: z
    .string()
    .min(1, "Tempat meninggal wajib diisi"),

  /* ---- Data Pengaju (Pelapor) ---- */
  status_hubungan: z
    .enum([
      "suami",
      "istri",
      "anak",
      "menantu",
      "cucu",
      "orang-tua",
      "mertua",
      "famili-lain",
      "lainnya"
    ],
    { message: "Status hubungan dengan jenazah wajib dipilih" }
  ),


  nama_pengaju: z
    .string()
    .min(1, "Nama pengaju wajib diisi"),

  nik_pengaju: z
    .string()
    .length(16, "NIK pengaju harus 16 digit")
    .regex(/^\d+$/, "NIK hanya angka"),

  tempat_lahir_pengaju: z
    .string()
    .min(1, "Tempat lahir pengaju wajib diisi"),

  tanggal_lahir_pengaju: z
    .string()
    .min(1, "Tanggal lahir pengaju wajib diisi"),

  agama_pengaju: z
    .enum(["islam", "kristen", "katolik", "hindu", "buddha", "konghucu", "kepercayaan-terhadap-tuhan-yang-maha-esa"],
      { message: "Agama pengaju wajib dipilih" }
    ),

  pekerjaan_pengaju: z
    .string()
    .min(1, "Pekerjaan pengaju wajib diisi"),

  kewarganegaraan_pengaju: z
    .enum(["wni", "wna"],
      { message: "Kewarganegaraan pengaju wajib dipilih" }
    ),

  alamat_pengaju: z
    .string()
    .min(1, "Alamat pengaju wajib diisi"),
});

export type KematianFormValues = z.infer<typeof kematianSchema>;