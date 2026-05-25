import Card from "@/components/ui/Card/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { VerifikasiAdminTable } from "@/features/requests/ui/table/verifikasi-admin/VerifikasiAdminTable";
import { VerifikasiRTTable } from "@/features/requests/ui/table/verifikasi-rt/VerifikasiRTTable";
import { VerifikasiRWTable } from "@/features/requests/ui/table/verifikasi-rw/VerifikasiRWTable";

const ROLE_DASHBOARD_MAP: Record<string, string> = {
  admin: "/admin/dashboard",
  rt: "/rt/dashboard",
  rw: "/rw/dashboard",
};

export default async function ValidasiSuratPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  const renderTable = () => {
    switch (role) {
      case "admin":
        return <VerifikasiAdminTable />;
      case "rt":
        return <VerifikasiRTTable />;
      case "rw":
        return <VerifikasiRWTable />;
      default:
        return null;
    }
  };

  const homeHref = ROLE_DASHBOARD_MAP[role] ?? "/dashboard";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Daftar Surat Perlu Verifikasi
      </h1>

      <Breadcrumb
        homeHref={homeHref}
        items={[{ label: "Surat Masuk" }]}
      />

      <Card className="p-8">
        <div className="space-y-6">
          {renderTable()}
        </div>
      </Card>
    </div>
  );
}