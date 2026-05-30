"use client";

import CardWithTabs from "@/components/ui/Card/CardWithTabs";

import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

import { createMainTabs } from "@/features/navigation/dashboard-warga/navigation-tabs";

import { DashboardWargaTableCSR } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTableCSR";

export default function RiwayatPengajuanPage() {

  const tabs = createMainTabs({
    dashboardTable: (
      <DashboardWargaTableCSR />
    ),

    dashboardHref: "/dashboard-csr",
  });

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-heading font-bold text-foreground">
        Riwayat Permohonan Surat
      </h1>

      <Breadcrumb
        homeHref="/dashboard-csr"
        items={[{ label: "Riwayat Pengajuan" }]}
      />

      <CardWithTabs tabs={tabs} />

    </div>
  );
}