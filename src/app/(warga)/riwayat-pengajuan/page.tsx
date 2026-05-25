"use client";

import CardWithTabs from "@/components/ui/Card/CardWithTabs";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { mainTabs } from "@/features/navigation/dashboard-warga/navigation-tabs";

export default function RiwayatPengajuan() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Riwayat Permohonan Surat
      </h1>

      <Breadcrumb
        homeHref="/dashboard"
        items={[{ label: "Riwayat Pengajuan" }]}
      />

      <CardWithTabs tabs={mainTabs} />
    </div>
  );
}
