/* =========================================
   SURAT CONFIG
   Single source of truth untuk semua surat
========================================= */

export type SuratCategory =
  | "umum"
  | "kependudukan";

export interface SuratConfig {
  slug: string;
  kode: string;
  title: string;
  description: string;
  category: SuratCategory;
  isActive?: boolean;
}

/* =========================================
   LIST KATEGORI
========================================= */

export const SURAT_CATEGORIES: {
  label: string;
  value: SuratCategory;
}[] = [
  { label: "Layanan Umum",         value: "umum" },
  { label: "Layanan Kependudukan", value: "kependudukan" },
];

/* =========================================
   LIST SURAT
========================================= */

export const SURAT_LIST: SuratConfig[] = [

  /* ---- Layanan Umum ---- */
  {
    slug: "surat-keterangan-usaha",
    kode: "A01",
    title: "Surat Keterangan Usaha",
    description:
      "Surat yang menerangkan bahwa warga memiliki atau menjalankan suatu usaha di wilayah desa.",
    category: "umum",
  },
  {
    slug: "surat-keterangan-tempat-usaha",
    kode: "A02",
    title: "Surat Keterangan Tempat Usaha",
    description:
      "Surat yang menyatakan lokasi dan keberadaan tempat usaha warga secara resmi.",
    category: "umum",
  },
  {
    slug: "surat-keterangan-pengantar-barang",
    kode: "A03",
    title: "Surat Keterangan Pengantar Barang",
    description:
      "Surat pengantar untuk membawa atau mengirim barang dalam wilayah tertentu.",
    category: "umum",
  },
  {
    slug: "surat-keterangan-tidak-mampu-sekolah",
    kode: "A04",
    title: "Surat Keterangan Tidak Mampu (Sekolah)",
    description:
      "Surat yang menyatakan warga kurang mampu secara ekonomi untuk keperluan pendidikan.",
    category: "umum",
  },
  {
    slug: "permohonan-izin-keramaian",
    kode: "A05",
    title: "Permohonan Izin Keramaian / Pesta",
    description:
      "Surat permohonan izin untuk menyelenggarakan acara atau pesta di wilayah desa.",
    category: "umum",
  },
  {
    slug: "surat-pengantar-skck",
    kode: "A06",
    title: "Surat Pengantar SKCK",
    description:
      "Surat pengantar dari desa sebagai syarat pembuatan Surat Keterangan Catatan Kepolisian (SKCK).",
    category: "umum",
  },
  {
    slug: "surat-keterangan-ahli-waris",
    kode: "A07",
    title: "Surat Keterangan Ahli Waris",
    description:
      "Surat yang menetapkan seseorang atau beberapa orang sebagai ahli waris sah.",
    category: "umum",
  },
  {
    slug: "surat-keterangan-lainnya",
    kode: "A08",
    title: "Surat Keterangan Lainnya",
    description:
      "Surat keterangan umum yang diterbitkan oleh desa untuk keperluan tertentu yang tidak termasuk dalam kategori surat yang telah tersedia.",
    category: "umum",
  },

  /* ---- Layanan Kependudukan ---- */
  {
    slug: "formulir-kartu-keluarga",
    kode: "B01",
    title: "Formulir Kartu Keluarga (F-1.01)",
    description:
      "Formulir pengganti Kartu Keluarga untuk pencatatan data seluruh anggota keluarga dalam satu rumah tangga.",
    category: "kependudukan",
  },
  {
    slug: "formulir-pendaftaran-peristiwa-kependudukan",
    kode: "B02",
    title: "Formulir Pendaftaran Peristiwa Kependudukan (F-1.02)",
    description:
      "Formulir untuk mendaftarkan peristiwa kependudukan seperti perubahan alamat atau status kependudukan.",
    category: "kependudukan",
  },
  {
    slug: "formulir-permohonan-kk-baru",
    kode: "B03",
    title: "Formulir Permohonan KK Baru WNI (F-1.15)",
    description:
      "Formulir permohonan pembuatan Kartu Keluarga baru bagi Warga Negara Indonesia.",
    category: "kependudukan",
  },
  {
    slug: "formulir-perubahan-kk",
    kode: "B04",
    title: "Formulir Permohonan Perubahan KK WNI (F-1.16)",
    description:
      "Formulir permohonan perubahan data pada Kartu Keluarga bagi Warga Negara Indonesia.",
    category: "kependudukan",
  },
  {
    slug: "formulir-permohonan-ktp",
    kode: "B05",
    title: "Formulir Permohonan KTP (F-1.21)",
    description:
      "Formulir permohonan pembuatan atau perpanjangan Kartu Tanda Penduduk.",
    category: "kependudukan",
  },
  {
    slug: "surat-keterangan-domisili",
    kode: "B06",
    title: "Surat Keterangan Domisili",
    description:
      "Surat yang menerangkan tempat tinggal atau domisili warga secara resmi di wilayah desa.",
    category: "kependudukan",
  },
  {
    slug: "surat-keterangan-hilang-kartu-keluarga",
    kode: "B07",
    title: "Surat Keterangan Hilang Kartu Keluarga",
    description:
      "Surat keterangan yang menyatakan bahwa Kartu Keluarga milik warga telah hilang.",
    category: "kependudukan",
  },
  {
    slug: "surat-keterangan-pindah",
    kode: "B08",
    title: "Surat Keterangan Pindah",
    description:
      "Surat yang menerangkan bahwa warga berpindah tempat tinggal dari satu wilayah ke wilayah lain.",
    category: "kependudukan",
  },
  {
    slug: "formulir-pendaftaran-perpindahan-penduduk",
    kode: "B09",
    title: "Formulir Pendaftaran Perpindahan Penduduk (F-1.03)",
    description:
      "Formulir resmi untuk mendaftarkan perpindahan penduduk antar wilayah administrasi.",
    category: "kependudukan",
  },
  {
    slug: "surat-keterangan-kelahiran",
    kode: "B10",
    title: "Surat Keterangan Kelahiran (F-2.01)",
    description:
      "Surat keterangan resmi yang mencatat peristiwa kelahiran warga di wilayah desa.",
    category: "kependudukan",
  },
  {
    slug: "surat-keterangan-kematian",
    kode: "B11",
    title: "Surat Keterangan Kematian (F-2.29)",
    description:
      "Surat keterangan resmi yang mencatat peristiwa kematian warga di wilayah desa.",
    category: "kependudukan",
  },
];

/* =========================================
   UTILITIES
========================================= */

/**
 * Ambil semua surat aktif
 */
export function getAllSurat() {
  return SURAT_LIST.filter((s) => s.isActive !== false);
}

/**
 * Ambil surat berdasarkan kategori
 */
export function getSuratByCategory(category: SuratCategory) {
  return getAllSurat().filter((s) => s.category === category);
}

/**
 * Cari surat berdasarkan slug
 */
export function getSuratBySlug(slug: string) {
  return getAllSurat().find((s) => s.slug === slug);
}

/**
 * Cari surat berdasarkan keyword (untuk search)
 */
export function searchSurat(keyword: string) {
  const lower = keyword.toLowerCase();
  return getAllSurat().filter(
    (s) =>
      s.title.toLowerCase().includes(lower) ||
      s.description.toLowerCase().includes(lower)
  );
}