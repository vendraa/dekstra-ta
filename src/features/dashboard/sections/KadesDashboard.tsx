"use client";

import { Users, FileCheck, FileSignature } from "lucide-react";
import VerificationDashboard from "../components/VerificationDashboard";
import { persetujuanKadesPreviewColumns } from "@/features/requests/ui/table/persetujuan-kades/preview-columns";
import { useVerifikasiRequests } from "@/features/requests/hooks/useVerifikasi";
import { useDashboardKades } from "../hooks/useKadesDashboard";
import { mapKadesDashboard } from "../mapper/kades-dashboard";

export default function KadesDashboard() {
  const { data, isLoading, error } = useDashboardKades();
  const fetchPreview = useVerifikasiRequests();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Gagal memuat dashboard kades</div>;

  const mapped = mapKadesDashboard(data!);

  const statsWithIcon = mapped.stats.map((s) => ({
    ...s,
    icon:
      s.label.includes("Total")
        ? Users
        : s.label.includes("Menunggu")
        ? FileSignature
        : FileCheck,
  }));

  return (
    <VerificationDashboard
      stats={statsWithIcon}
      progressItems={mapped.progressItems}
      chartData={mapped.chartData}
      previewTitle="Pengajuan Surat Menunggu Persetujuan Kades"
      previewLink="/kades/surat/menunggu-persetujuan"
      columns={persetujuanKadesPreviewColumns}
      fetchPreview={fetchPreview}
    />
  );
}