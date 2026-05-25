import { z } from "zod";

const anggotaPindahSchema = z.object({
  anggota_nik:          z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "NIK hanya angka"),
  anggota_nama_lengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  anggota_shdk:         z.enum([
      "kepala-keluarga", "suami", "istri", "anak",
      "menantu", "cucu", "orang-tua", "mertua",
      "famili-lain", "pembantu", "lainnya",
    ],
    {
      message: "Status hubungan dalam keluarga wajib dipilih",
    }
),
});

export const pendaftaranPerpindahanPendudukSchema = z.object({

  /* ---- 1. Nomor KK ---- */
  nomor_kk: z
    .string()
    .length(16, "Nomor KK harus 16 digit")
    .regex(/^\d+$/, "Nomor KK hanya angka"),

  /* ---- 2. Nama Lengkap Pemohon ---- */
  nama_lengkap: z.string().min(1, "Nama lengkap pemohon wajib diisi"),

  /* ---- 3. NIK ---- */
  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya angka"),

  /* ---- 4. Jenis Pemohon ---- */
  jenis_pemohon: z.enum([
      "skp-wni",
      "skpln",
      "sktt-orang-asing",
    ],
    {
      message: "Jenis pemohon wajib dipilih",
    }
  ),

  /* ---- 5. Alamat Asal ---- */
  asal_rt:              z.string().min(1, "RT asal wajib diisi"),
  asal_rw:              z.string().min(1, "RW asal wajib diisi"),
  asal_desa_kelurahan:  z.string().min(1, "Desa/kelurahan asal wajib diisi"),
  asal_kecamatan:       z.string().min(1, "Kecamatan asal wajib diisi"),
  asal_kabupaten_kota:  z.string().min(1, "Kabupaten/kota asal wajib diisi"),
  asal_provinsi:        z.string().min(1, "Provinsi asal wajib diisi"),
  asal_kode_pos:        z.string().length(5, "Kode pos harus 5 digit").regex(/^\d+$/, "Kode pos hanya angka"),

  /* ---- 6. Klarifikasi Kepindahan ---- */
  jenis_perpindahan: z.enum([
    "dalam-desa-kelurahan",
    "antar-desa-kelurahan",
    "antar-kecamatan",
    "antar-kabupaten-kota",
    "antar-provinsi",
  ],
  {
    message: "Jenis perpindahan wajib dipilih",
  }),

  /* ---- 7. Alamat Pindah ---- */
  tujuan_rt:             z.string().min(1, "RT tujuan wajib diisi"),
  tujuan_rw:             z.string().min(1, "RW tujuan wajib diisi"),
  tujuan_desa_kelurahan: z.string().min(1, "Desa/kelurahan tujuan wajib diisi"),
  tujuan_kecamatan:      z.string().min(1, "Kecamatan tujuan wajib diisi"),
  tujuan_kabupaten_kota: z.string().min(1, "Kabupaten/kota tujuan wajib diisi"),
  tujuan_provinsi:       z.string().min(1, "Provinsi tujuan wajib diisi"),
  tujuan_kode_pos:       z.string().length(5, "Kode pos harus 5 digit").regex(/^\d+$/, "Kode pos hanya angka"),

  /* ---- 8. Alasan Pindah ---- */
  alasan_pindah: z.enum([
    "pekerjaan", "pendidikan", "keamanan",
    "kesehatan", "perumahan", "keluarga", "lainnya",
  ],
  {
    message: "Alasan pindah wajib dipilih",
  }),
  alasan_pindah_lainnya: z.string().optional(),

  /* ---- 9. Jenis Kepindahan ---- */
  jenis_kepindahan: z.enum([
      "kepala-keluarga",
      "kepala-keluarga-sebagian-anggota",
      "kepala-keluarga-seluruh-anggota",
      "anggota-keluarga",
    ],
    {
      message: "Jenis kepindahan wajib dipilih",
    }
  ),

  /* ---- 10. Status KK yang Tidak Pindah ---- */
  status_kk_tidak_pindah: z.enum(["numpang-kk", "buat-kk-baru"],
    {message: "Status KK anggota keluarga yang tidak pindah wajib dipilih",}
  ),

  /* ---- 11. Status KK yang Pindah ---- */
  status_kk_pindah: z.enum(["numpang-kk", "buat-kk-baru"],
    {message: "Status KK anggota keluarga yang pindah wajib dipilih",}
  ),

  /* ---- 12. Daftar Anggota Keluarga yang Pindah (array) ---- */
  daftar_anggota_pindah: z
    .array(anggotaPindahSchema)
    .min(1, "Minimal 1 anggota keluarga yang pindah wajib diisi"),

  /* ---- 13-15. Data Sponsor (untuk Orang Asing) ---- */
  nama_sponsor:    z.string().optional(),
  tipe_sponsor:    z.enum([
    "organisasi-internasional", "pemerintah",
    "perusahaan", "perorangan", "tanpa-sponsor",
  ],
    {message: "Tipe sponsor wajib dipilih",}
  ).optional(),
  alamat_sponsor:  z.string().optional(),

  /* ---- 16. Nomor & Tanggal KITAS/KITAP ---- */
  nomor_kitas_kitap:          z.string().optional(),
  masa_berlaku_kitas_kitap:   z.string().optional(),

  /* ---- 17-18. Data Pindah ke Luar Negeri (untuk SKPLN) ---- */
  negara_tujuan:              z.string().optional(),
  alamat_tujuan_luar_negeri:  z.string().optional(),

  /* ---- 19. Penanggung Jawab ---- */
  penanggung_jawab: z.string().min(1, "Penanggung jawab wajib diisi"),

  /* ---- 20. Rencana Tanggal Pindah ---- */
  rencana_tanggal_pindah: z.string().min(1, "Rencana tanggal pindah wajib diisi"),

}).superRefine((data, ctx) => {
  if (data.alasan_pindah === "lainnya" && !data.alasan_pindah_lainnya) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["alasan_pindah_lainnya"], message: "Keterangan alasan wajib diisi" });
  }
});

export type AnggotaPindahValues                     = z.infer<typeof anggotaPindahSchema>;
export type PendaftaranPerpindahanPendudukFormValues = z.infer<typeof pendaftaranPerpindahanPendudukSchema>;