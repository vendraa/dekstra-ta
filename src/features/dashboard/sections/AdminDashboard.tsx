"use client";

import VerificationDashboard from "../components/VerificationDashboard";
import { useDashboardAdmin } from "../hooks/useAdminDashboard";
import { mapAdminDashboard } from "../mapper/admin-dashboard.mapper";
import { VerifikasiAdminPreview } from "@/features/requests/ui/table/verifikasi-admin/VerifikasiAdminPreview";

export default function AdminDashboard() {
  const { data, isLoading, error } = useDashboardAdmin();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Gagal memuat dashboard admin</div>;

  const mapped = mapAdminDashboard(data!);

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
      previewTitle="Surat yang Perlu Diverifikasi"
      previewLink="/admin/surat/verifikasi"
      previewSlot={
        <VerifikasiAdminPreview />
      }
    />
  );
}