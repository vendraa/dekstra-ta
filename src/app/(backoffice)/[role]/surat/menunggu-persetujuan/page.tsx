import Card from "@/components/ui/Card/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { PersetujuanKadesTable } from "@/features/requests/ui/table/persetujuan-kades/PersetujuanKadesTable";

export default function ArsipSuratPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Daftar Surat Perlu Persetujuan
      </h1>

      <Breadcrumb
        homeHref="/kades/dashboard"
        items={[{ label: "Surat Masuk" }]}
      />

      <Card className="p-8">
        <div className="space-y-6">
          <PersetujuanKadesTable />
        </div>
      </Card>
    </div>
  );
}
