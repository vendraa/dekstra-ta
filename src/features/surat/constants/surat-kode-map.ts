// Mapping slug frontend → kode backend
export const SLUG_TO_KODE: Record<string, string> = {
  "surat-keterangan-usaha":                        "A01",
  "surat-keterangan-tempat-usaha":                 "A02",
  "surat-keterangan-pengantar-barang":             "A03",
  "surat-keterangan-tidak-mampu-sekolah":          "A04",
  "permohonan-izin-keramaian":                     "A05",
  "surat-pengantar-skck":                          "A06",
  "surat-keterangan-ahli-waris":                   "A07",
  "surat-keterangan-lainnya":                      "A08",
  "formulir-kartu-keluarga":                       "B01",
  "formulir-pendaftaran-peristiwa-kependudukan":   "B02",
  "formulir-permohonan-kk-baru":                   "B03",
  "formulir-perubahan-kk":                         "B04",
  "formulir-permohonan-ktp":                       "B05",
  "surat-keterangan-domisili":                     "B06",
  "surat-keterangan-hilang-kartu-keluarga":        "B07",
  "surat-keterangan-pindah":                       "B08",
  "formulir-pendaftaran-perpindahan-penduduk":     "B09",
  "surat-keterangan-kelahiran":                    "B10",
  "surat-keterangan-kematian":                     "B11",
};

export function getKodeFromSlug(slug: string): string | null {
  return SLUG_TO_KODE[slug] ?? null;
}

export function getSlugFromKode(kode: string): string | null {
  const entry = Object.entries(SLUG_TO_KODE).find(
    ([_, value]) => value === kode
  );
  return entry?.[0] ?? null;
}