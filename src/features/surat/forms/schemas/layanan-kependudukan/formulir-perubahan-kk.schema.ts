import { z } from "zod";

const anggotaKeluargaSchema = z.object({
  anggota_nama_lengkap:              z.string().min(1, "Nama lengkap anggota wajib diisi"),
  anggota_nik:                       z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "NIK hanya angka"),
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

export const formulirPerubahanKkSchema = z.object({

  /* ---- Data Wilayah ---- */
  nama_provinsi:        z.string().min(1, "Nama provinsi wajib diisi"),
  nama_kabupaten_kota:  z.string().min(1, "Nama kabupaten/kota wajib diisi"),
  nama_kecamatan:       z.string().min(1, "Nama kecamatan wajib diisi"),
  nama_kelurahan_desa:  z.string().min(1, "Nama kelurahan/desa wajib diisi"),

  /* ---- Data Pemohon (KK Baru) ---- */
  nama_lengkap:          z.string().min(1, "Nama lengkap wajib diisi"),
  nik:                   z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "NIK hanya angka"),
  nama_kepala_keluarga:  z.string().min(1, "Nama kepala keluarga baru wajib diisi"),
  nomor_kk:              z.string().length(16, "Nomor KK harus 16 digit").regex(/^\d+$/, "Nomor KK hanya angka"),
  alamat:                z.string().min(1, "Alamat wajib diisi"),
  rt:                    z.string().min(1, "RT wajib diisi"),
  rw:                    z.string().min(1, "RW wajib diisi"),
  desa_kelurahan:        z.string().min(1, "Desa/kelurahan wajib diisi"),
  kecamatan:             z.string().min(1, "Kecamatan wajib diisi"),
  kabupaten_kota:        z.string().min(1, "Kabupaten/kota wajib diisi"),
  provinsi:              z.string().min(1, "Provinsi wajib diisi"),
  kode_pos:              z.string().length(5, "Kode pos harus 5 digit").regex(/^\d+$/, "Kode pos hanya berisi angka"),
  nomor_telepon:         z.string().min(10, "Nomor telepon waijib diisi").regex(/^\d+$/, "Nomor telepon hanya berisi angka"),

  /* ---- Data Keluarga Lama ---- */
  nama_kepala_keluarga_lama: z.string().min(1, "Nama kepala keluarga lama wajib diisi"),
  nomor_kk_lama:             z.string().length(16, "Nomor KK lama harus 16 digit").regex(/^\d+$/, "Nomor KK hanya angka"),
  alamat_lama:               z.string().min(1, "Alamat lama wajib diisi"),
  rt_lama:                   z.string().min(1, "RT wajib diisi"),
  rw_lama:                   z.string().min(1, "RW wajib diisi"),
  desa_kelurahan_lama:       z.string().min(1, "Desa/kelurahan wajib diisi"),
  kecamatan_lama:            z.string().min(1, "Kecamatan wajib diisi"),
  kabupaten_kota_lama:       z.string().min(1, "Kabupaten/kota wajib diisi"),
  provinsi_lama:             z.string().min(1, "Provinsi wajib diisi"),
  kode_pos_lama:             z.string().length(5, "Kode pos harus 5 digit").regex(/^\d+$/, "Kode pos hanya angka"),

  /* ---- Alasan & Jumlah ---- */
  alasan_permohonan: z.enum([
    "penambahan-anggota-keluarga",
    "pengurangan-anggota-keluarga",
    "lainnya",
  ]),
  jumlah_anggota_keluarga: z
    .number({ error: "Jumlah anggota keluarga wajib diisi" })
    .min(1, "Minimal 1 anggota keluarga"),

  /* ---- Daftar Anggota Keluarga (array) ---- */
  anggota_keluraga: z
    .array(anggotaKeluargaSchema)
    .min(1, "Minimal 1 anggota keluarga wajib diisi"),
});

export type AnggotaKeluargaPerubahanKkValues = z.infer<typeof anggotaKeluargaSchema>;
export type FormulirPerubahanKkFormValues    = z.infer<typeof formulirPerubahanKkSchema>;