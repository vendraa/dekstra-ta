import VerificationDashboard from "../components/VerificationDashboard";
import { VerifikasiAdminPreviewSSR } from "@/features/requests/ui/table/verifikasi-admin/VerifikasiAdminPreviewSSR";
import { getDashboardServer } from "../services/dashboard.server.service";
import { mapAdminDashboard } from "../mapper/admin-dashboard.mapper";
import { getVerifikasiAdminServer } from "@/services/dashboard-admin/verifikasi-admin.server.service";

export default async function AdminDashboardSSR() {
  const data = await getDashboardServer("no-store");
  const verifikasiData = await getVerifikasiAdminServer("no-store");
  const mapped = mapAdminDashboard(data);

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
        <VerifikasiAdminPreviewSSR data={verifikasiData} />
      }
    />
  );
}