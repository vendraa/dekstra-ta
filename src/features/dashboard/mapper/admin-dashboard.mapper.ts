import { PROGRESS_COLORS } from "@/lib/progress.constants";
import { DashboardResponse } from "../services/dashboard.service";

export function mapAdminDashboard(data: DashboardResponse) {
  const cards = data.isi_cards;
  const progress = data.progress;

  return {
    stats: [
      {
        label: "Total Data Penduduk",
        value: cards.total_data_penduduk ?? 0,
      },
      {
        label: "Pendaftaran Akun Memerlukan Verifikasi",
        value: cards.pendaftaran_perlu_verifikasi ?? 0,
      },
      {
        label: "Pengajuan Surat Memerlukan Verifikasi",
        value: cards.surat_perlu_verifikasi ?? 0,
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
      ...(progress.disetujui_admin !== undefined
        ? [
            {
              label: "Disetujui Admin",
              value: progress.disetujui_admin,
              max: 100,
              color: PROGRESS_COLORS.approved,
            },
          ]
        : []),
      ...(progress.ditolak_admin !== undefined
        ? [
            {
              label: "Ditolak Admin",
              value: progress.ditolak_admin,
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