"use client";

import CardWithTabs from "@/components/ui/Card/CardWithTabs";

import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

import { createMainTabs } from "@/features/navigation/dashboard-warga/navigation-tabs";

import { DashboardWargaTableCSR } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTableCSR";

import { HeaderSection } from "../pengajuan-baru/_sections/header-section";

import { MainSectionCSR } from "@/features/surat/sections/MainSectionCSR";

export default function PengajuanBaruCSRPage() {
    const tabs = createMainTabs({
    dashboardTable:
        <DashboardWargaTableCSR />,

    dashboardHref:
        "/dashboard-csr",

    pengajuanBaruHref:
        "/pengajuan-baru-csr",

    pengajuanBaruContent:
        <MainSectionCSR />,
    });

  tabs[1].content = <MainSectionCSR />;

  return (
    <div className="space-y-6 px-6">
      <HeaderSection />

      <Breadcrumb
        homeHref="/dashboard-csr"
        items={[
          {
            label: "Pengajuan Baru",
          },
        ]}
      />

      <CardWithTabs tabs={tabs} />
    </div>
  );
}