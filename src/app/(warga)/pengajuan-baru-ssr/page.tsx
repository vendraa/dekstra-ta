import CardWithTabs from "@/components/ui/Card/CardWithTabs";

import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

import { createMainTabs } from "@/features/navigation/dashboard-warga/navigation-tabs";

import { DashboardWargaTableSSR } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTableSSR";

import { HeaderSection } from "../pengajuan-baru/_sections/header-section";

import { MainSectionSSR } from "@/features/surat/sections/MainSectionSSR";

export const dynamic = "force-dynamic";

export default async function PengajuanBaruSSRPage() {
    const tabs = createMainTabs({
    dashboardTable:
        <DashboardWargaTableSSR />,

    dashboardHref:
        "/dashboard-ssr",

    pengajuanBaruHref:
        "/pengajuan-baru-ssr",

    pengajuanBaruContent:
        <MainSectionSSR />,
    });

  tabs[1].content = (
    <MainSectionSSR />
  );

  return (
    <div className="space-y-6 px-6">
      <HeaderSection />

      <Breadcrumb
        homeHref="/dashboard-ssr"
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