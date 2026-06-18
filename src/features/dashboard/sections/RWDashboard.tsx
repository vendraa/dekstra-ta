"use client";

import VerificationDashboard from "../components/VerificationDashboard";
import { useDashboardRW } from "@/features/dashboard/hooks/useDashboardRW";
import { mapRWDashboard } from "../mapper/rw-dashboard.mapper";
import { ValidasiRWPreview } from "@/features/requests/ui/table/verifikasi-rw/VerifikasiRWPreview";

export default function RWDashboard() {
  const { data, isLoading, error } = useDashboardRW();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Gagal memuat dashboard RW</div>;

  const mapped = mapRWDashboard(data!);

  const statsWithIcon = mapped.stats.map((s) => ({
    label: s.label,
    value: s.value,
    iconKey: s.label.includes("Penduduk")
      ? "users"
      : s.label.includes("Akun")
      ? "userCog"
      : "fileText",
  }));

  return (
    <VerificationDashboard
      stats={statsWithIcon}
      progressItems={mapped.progressItems}
      chartData={mapped.chartData}
      previewTitle="Pengajuan Surat Menunggu Verifikasi RW"
      previewLink="/rw/surat/verifikasi"
      previewSlot={
        <ValidasiRWPreview />
      }
    />
  );
}