import { z } from "zod";

const anggotaSchema = z.object({
  anggota_nama_lengkap: z
    .string()
    .min(1, "Nama lengkap anggota wajib diisi"),

  anggota_nik: z
    .string()
    .length(16, "NIK anggota harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  anggota_status_hubungan_keluarga: z.enum(
    [
      "kepala-keluarga",
      "suami",
      "istri",
      "anak",
      "menantu",
      "cucu",
      "orang-tua",
      "mertua",
      "famili-lain",
      "pembantu",
      "lainnya",
    ],
    {
      message:
        "Status hubungan keluarga wajib dipilih",
    }
  ),
});

export const formulirPermohonanKkBaruSchema = z.object({

  /* ---- Data Wilayah ---- */
  nama_provinsi: z
    .string()
    .min(1, "nama provinsi wajib diisi"),

  nama_kabupaten_kota: z
    .string()
    .min(1, "nama kabupaten/kota wajib diisi"),

  nama_kecamatan: z
    .string()
    .min(1, "nama kecamatan wajib diisi"),

  nama_kelurahan_desa: z
    .string()
    .min(1, "nama kelurahan/desa wajib diisi"),

  /* ---- Data Pemohon ---- */
  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap wajib diisi"),

  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  nomor_kk_semula: z
    .string()
    .max(16, "Nomor KK maksimal 16 digit")
    .regex(/^\d*$/, "Nomor KK hanya boleh berisi angka")
    .optional(),

  alamat: z
    .string()
    .min(1, "Alamat wajib diisi"),

  rt: z
    .string()
    .min(1, "RT wajib diisi"),

  rw: z
    .string()
    .min(1, "RW wajib diisi"),

  desa_kelurahan: z
    .string()
    .min(1, "Desa/kelurahan wajib diisi"),

  kecamatan: z
    .string()
    .min(1, "Kecamatan wajib diisi"),

  kabupaten_kota: z
    .string()
    .min(1, "Kabupaten/kota wajib diisi"),

  provinsi: z
    .string()
    .min(1, "Provinsi wajib diisi"),

  nomor_telepon: z
    .string()
    .min(10, "Nomor telepon tidak valid")
    .regex(/^\d+$/, "Nomor telepon hanya boleh berisi angka"),

  kode_pos: z
    .string()
    .length(5, "Kode pos harus 5 digit")
    .regex(/^\d+$/, "Kode pos hanya boleh berisi angka"),

  alasan_permohonan: z
    .enum([
      "rumah-tangga-baru",
      "kk-hilang-rusak",
      "lainnya",
    ])
    .refine((val) => val !== undefined, "Alasan permohonan wajib dipilih"),

  jumlah_anggota_keluarga: z
    .number({ error: "Jumlah anggota keluarga wajib diisi" })
    .min(1, "Jumlah anggota keluarga minimal 1"),

  /* ---- Daftar Anggota Keluarga ---- */
  anggota_keluarga: z
    .array(anggotaSchema)
    .min(1, "Minimal 1 anggota keluarga wajib diisi"),
});

export type FormulirPermohonanKkBaruFormValues = z.infer<typeof formulirPermohonanKkBaruSchema>;