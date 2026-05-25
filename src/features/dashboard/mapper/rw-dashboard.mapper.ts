import { PROGRESS_COLORS } from "@/lib/progress.constants";
import { DashboardResponse } from "../services/dashboard.service";

export function mapRWDashboard(data: DashboardResponse) {
  const cards = data.isi_cards;
  const progress = data.progress;

  return {
    stats: [
      {
        label: "Total Warga RW",
        value: cards.total_warga_rw ?? 0,
      },
      {
        label: "Menunggu Verifikasi RW",
        value: cards.menunggu_verifikasi_rw ?? 0,
      },
      {
        label: "Disetujui Hari Ini",
        value: cards.disetujui_hari_ini_rw ?? 0,
      },
    ],

    progressItems: [
      {
        label: "Menunggu Verifikasi RT",
        value: progress.menunggu_verifikasi_rt ?? 0,
        max: 100,
        color: PROGRESS_COLORS.pending_rt,
      },
      {
        label: "Menunggu Verifikasi RW",
        value: progress.menunggu_verifikasi_rw ?? 0,
        max: 100,
        color: PROGRESS_COLORS.pending_rw,
      },
      {
        label: "Menunggu Validasi Admin Desa",
        value: progress.menunggu_verifikasi_admin ?? 0,
        max: 100,
        color: PROGRESS_COLORS.pending_admin,
      },
      {
        label: "Menunggu Persetujuan Kades",
        value: progress.menunggu_verifikasi_kades ?? 0,
        max: 100,
        color: PROGRESS_COLORS.pending_kades,
      },
      ...(progress.disetujui_rw !== undefined
        ? [
            {
              label: "Disetujui RW",
              value: progress.disetujui_rw,
              max: 100,
              color: PROGRESS_COLORS.approved,
            },
          ]
        : []),
      ...(progress.ditolak_rw !== undefined
        ? [
            {
              label: "Ditolak RW",
              value: progress.ditolak_rw,
              max: 100,
              color: PROGRESS_COLORS.rejected,
            },
          ]
        : []),
    ],

    chartData: data.pengajuan_7_hari_terakhir.map((item) => ({
      label: item.tanggal,
      value: item.jumlah,
    })),
  };
}