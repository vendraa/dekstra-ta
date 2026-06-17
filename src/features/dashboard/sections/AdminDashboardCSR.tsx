"use client";

import VerificationDashboard from "../components/VerificationDashboard";
import { validasiAdminPreviewColumns } from "@/features/requests/ui/table/verifikasi-admin/preview-columns";
import { useVerifikasiRequests } from "@/features/requests/hooks/useVerifikasi";
import { useDashboardAdmin } from "../hooks/useAdminDashboard";
import { mapAdminDashboard } from "../mapper/admin-dashboard.mapper";
import { DashboardSkeleton } from "../components/DashboardSkeleton";

export default function AdminDashboardCSR() {
  const { data, isLoading, error } = useDashboardAdmin();
  const fetchPreview = useVerifikasiRequests();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        Gagal memuat dashboard admin
      </div>
    );
  }

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
      columns={validasiAdminPreviewColumns}
      fetchPreview={fetchPreview}
    />
  );
}