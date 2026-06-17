export type DashboardResponse = {
  peran: string;

  isi_cards: Record<string, number>;

  progress: Record<string, number>;

  pengajuan_7_hari_terakhir: {
    tanggal: string;
    jumlah: number;
  }[];
};

export type IconKey = "users" | "userCog" | "fileText";

export type StatItem = {
  label: string;
  value: number;
  iconKey: IconKey;   // ← string, BUKAN komponen
};