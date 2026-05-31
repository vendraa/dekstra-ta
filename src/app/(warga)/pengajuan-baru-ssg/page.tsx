import CardWithTabs from "@/components/ui/Card/CardWithTabs";

import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

import { createMainTabs } from "@/features/navigation/dashboard-warga/navigation-tabs";

import { DashboardWargaTableSSG } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTableSSG";

import { HeaderSection } from "../pengajuan-baru/_sections/header-section";

import { MainSectionSSG } from "@/features/surat/sections/MainSectionSSG";

export const revalidate = false;

export default async function PengajuanBaruSSGPage() {
    const tabs = createMainTabs({
    dashboardTable:
        <DashboardWargaTableSSG />,

    dashboardHref:
        "/dashboard-ssg",

    pengajuanBaruHref:
        "/pengajuan-baru-ssg",

    pengajuanBaruContent:
        <MainSectionSSG />,
    });

  return (
    <div className="space-y-6 px-6">
      <HeaderSection />

      <Breadcrumb
        homeHref="/dashboard-ssg"
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