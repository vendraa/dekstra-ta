import { RiwayatItem } from "./riwayat-persetujuan.types";

export type Berkas = {
  id: number;
  file_url: string;
  diunggah_at: string;
};

export type DetailPermohonan = {
  id: number;
  nomor_permohonan: string;
  jenis_surat: {
    kode: string;
    nama: string;
  };
  pemohon: {
    nik: string;
    nama: string;
  };
  status: number;
  diajukan_at: string;
  riwayat_aksi: number;
  riwayat_tahap: number;
  data: Record<string, unknown>;
  berkas: Berkas[];

  riwayat: RiwayatItem[];
};

