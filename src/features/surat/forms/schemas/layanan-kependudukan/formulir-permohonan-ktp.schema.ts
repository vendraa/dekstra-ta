import { z } from "zod";

export const formulirPermohonanKtpSchema = z.object({

  /* ---- Data Wilayah ---- */
  nama_provinsi: z
    .string()
    .min(1, "Nama provinsi wajib diisi"),

  nama_kabupaten_kota: z
    .string()
    .min(1, "Nama kabupaten/kota wajib diisi"),

  nama_kecamatan: z
    .string()
    .min(1, "Nama kecamatan wajib diisi"),

  nama_kelurahan_desa: z
    .string()
    .min(1, "Nama kelurahan/desa wajib diisi"),

  /* ---- Jenis Permohonan ---- */
  jenis_permohonan_ktp: z
    .enum([
      "baru",
      "perpanjangan",
      "penggantian",
    ],
    {
      message: "Jenis permohonan KTP wajib dipilih",
    }
  ),

  /* ---- Data Pemohon ---- */
  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap wajib diisi"),

  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  nomor_kk: z
    .string()
    .length(16, "Nomor KK harus 16 digit")
    .regex(/^\d+$/, "Nomor KK hanya boleh berisi angka"),

  nomor_telepon:         z.string().min(10, "Nomor telepon wajib diisi").regex(/^\d+$/, "Nomor telepon hanya berisi angka"),

  alamat: z
    .string()
    .min(1, "Alamat wajib diisi"),

  rt: z
    .string()
    .min(1, "RT wajib diisi"),

  rw: z
    .string()
    .min(1, "RW wajib diisi"),

  kode_pos: z
    .string()
    .length(5, "Kode pos harus 5 digit")
    .regex(/^\d+$/, "Kode pos hanya boleh berisi angka"),
});

export type FormulirPermohonanKtpFormValues = z.infer<typeof formulirPermohonanKtpSchema>;