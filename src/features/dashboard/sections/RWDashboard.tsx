"use client";

import { Users, FileCheck, FileText } from "lucide-react";
import VerificationDashboard from "../components/VerificationDashboard";
import { validasiRWPreviewColumns } from "@/features/requests/ui/table/verifikasi-rw/preview-columns";
import { useVerifikasiRequests } from "@/features/requests/hooks/useVerifikasi";
import { useDashboardRW } from "@/features/dashboard/hooks/useDashboardRW";
import { mapRWDashboard } from "../mapper/rw-dashboard.mapper";

export default function RWDashboard() {
  const { data, isLoading, error } = useDashboardRW();
  const fetchPreview = useVerifikasiRequests();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Gagal memuat dashboard RW</div>;

  const mapped = mapRWDashboard(data!);

  const statsWithIcon = mapped.stats.map((s) => ({
    ...s,
    icon:
      s.label.includes("Total")
        ? Users
        : s.label.includes("Menunggu")
        ? FileText
        : FileCheck,
  }));

  return (
    <VerificationDashboard
      stats={statsWithIcon}
      progressItems={mapped.progressItems}
      chartData={mapped.chartData}
      previewTitle="Pengajuan Surat Menunggu Verifikasi RW"
      previewLink="/rw/surat/verifikasi"
      columns={validasiRWPreviewColumns}
      fetchPreview={fetchPreview}
    />
  );
}