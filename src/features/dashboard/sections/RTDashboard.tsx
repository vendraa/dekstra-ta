"use client";

import VerificationDashboard from "../components/VerificationDashboard";
import { useDashboardRT } from "@/features/dashboard/hooks/useDashboardRT";
import { mapRTDashboard } from "../mapper/rt-dashboard.mapper";
import { ValidasiRTPreview } from "@/features/requests/ui/table/verifikasi-rt/VerifikasiRTPreview";

export default function RTDashboard() {
  const { data, isLoading, error } = useDashboardRT();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Gagal memuat dashboard</div>;

  const mapped = mapRTDashboard(data!);

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
      previewTitle="Pengajuan Surat Menunggu Verifikasi RT"
      previewLink="/rt/surat/verifikasi"
      previewSlot={
        <ValidasiRTPreview />
      }
    />
  );
}