export type DashboardResponse = {
  peran: string;
  isi_cards: Record<string, number>;
  progress: Record<string, number>;
  pengajuan_7_hari_terakhir: {
    tanggal: string;
    jumlah: number;
  }[];
};

export const DashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const res = await fetch("/api/dashboard", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.message || "Failed to fetch dashboard");
    }

    return res.json();
  },
};