"use client";

import CardWithTabs from "@/components/ui/Card/CardWithTabs";

import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

import { createMainTabs } from "@/features/navigation/dashboard-warga/navigation-tabs";

import { DashboardWargaTableCSR } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTableCSR";

import { HeaderSection } from "./_sections/header-section";

export default function SuratPage() {
  const tabs = createMainTabs({
    dashboardTable: (
      <DashboardWargaTableCSR />
    ),

    dashboardHref: "/dashboard-csr",
  });

  return (
    <div className="space-y-6 px-6">
      <HeaderSection />

      <Breadcrumb
        homeHref="/dashboard-csr"
        items={[{ label: "Pengajuan Baru" }]}
      />

      <CardWithTabs tabs={tabs} />
    </div>
  );
}