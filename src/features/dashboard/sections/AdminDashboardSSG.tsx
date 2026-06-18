import VerificationDashboard from "../components/VerificationDashboard";
import { getDashboardBuild } from "../services/dashboard.static.service";
import { mapAdminDashboard } from "../mapper/admin-dashboard.mapper";
import { getVerifikasiAdminBuild } from "@/services/dashboard-admin/verifikasi-admin.static.service";
import { VerifikasiAdminPreviewSSG } from "@/features/requests/ui/table/verifikasi-admin/VerifikasiAdminPreviewSSG";

export default async function AdminDashboardSSG() {
  const data = await getDashboardBuild();
  const verifikasiData = await getVerifikasiAdminBuild();

  if (!data) return <div>Gagal memuat dashboard admin</div>;
  if (!verifikasiData) return <div>Gagal memuat data verifikasi admin</div>;

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
      previewLink="/admin/surat/verifikasi-ssg"
      previewSlot={
        <VerifikasiAdminPreviewSSG data={verifikasiData} />
      }
    />
  );
}