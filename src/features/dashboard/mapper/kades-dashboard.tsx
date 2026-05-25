import { PROGRESS_COLORS } from "@/lib/progress.constants";
import { DashboardResponse } from "../services/dashboard.service";

export function mapKadesDashboard(data: DashboardResponse) {
  const cards = data.isi_cards;
  const progress = data.progress;

  return {
    stats: [
      {
        label: "Total Warga Desa",
        value: cards.total_warga_desa ?? 0,
      },
      {
        label: "Menunggu Persetujuan Kades",
        value: cards.menunggu_verifikasi_kades ?? 0,
      },
      {
        label: "Disetujui Hari Ini",
        value: cards.disetujui_hari_ini_kades ?? 0,
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
      ...(progress.disetujui_kades !== undefined
        ? [
            {
              label: "Disetujui Kades",
              value: progress.disetujui_kades,
              max: 100,
              color: PROGRESS_COLORS.approved,
            },
          ]
        : []),
      ...(progress.ditolak_kades !== undefined
        ? [
            {
              label: "Ditolak Kades",
              value: progress.ditolak_kades,
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