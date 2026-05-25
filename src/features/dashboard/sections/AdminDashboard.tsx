"use client";

import { Users, FileText, UserCog } from "lucide-react";
import VerificationDashboard from "../components/VerificationDashboard";
import { validasiAdminPreviewColumns } from "@/features/requests/ui/table/verifikasi-admin/preview-columns";
import { useVerifikasiRequests } from "@/features/requests/hooks/useVerifikasi";
import { useDashboardAdmin } from "../hooks/useAdminDashboard";
import { mapAdminDashboard } from "../mapper/admin-dashboard.mapper";

export default function AdminDashboard() {
  const { data, isLoading, error } = useDashboardAdmin();
  const fetchPreview = useVerifikasiRequests();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Gagal memuat dashboard admin</div>;

  const mapped = mapAdminDashboard(data!);

  const statsWithIcon = mapped.stats.map((s) => ({
    ...s,
    icon:
      s.label.includes("Penduduk")
        ? Users
        : s.label.includes("Akun")
        ? UserCog
        : FileText,
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