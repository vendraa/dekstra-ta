import { DashboardResponse } from "../services/dashboard.service";
import { PROGRESS_COLORS } from "@/lib/progress.constants";

export function mapRTDashboard(data: DashboardResponse) {
  const cards = data.isi_cards;
  const progress = data.progress;

  return {
    stats: [
      {
        label: "Total Warga RT",
        value: cards.total_warga_rt ?? 0,
      },
      {
        label: "Menunggu Verifikasi RT",
        value: cards.menunggu_verifikasi_rt ?? 0,
      },
      {
        label: "Disetujui Hari Ini",
        value: cards.disetujui_hari_ini_rt ?? 0,
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
      ...(progress.disetujui_rt !== undefined
        ? [
            {
              label: "Disetujui RT",
              value: progress.disetujui_rt,
              max: 100,
              color: PROGRESS_COLORS.approved,
            },
          ]
        : []),
      ...(progress.ditolak_rt !== undefined
        ? [
            {
              label: "Ditolak RT",
              value: progress.ditolak_rt,
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