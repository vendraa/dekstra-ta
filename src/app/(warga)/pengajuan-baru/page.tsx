"use client";

import CardWithTabs  from "@/components/ui/Card/CardWithTabs";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { mainTabs }  from "@/features/navigation/dashboard-warga/navigation-tabs";
import { HeaderSection } from "./_sections/header-section";

export default function SuratPage() {
  return (
    <div className="space-y-6 px-6">
      <HeaderSection />
      <Breadcrumb
        homeHref="/dashboard"
        items={[{ label: "Pengajuan Baru" }]}
      />
      <CardWithTabs tabs={mainTabs} />
    </div>
  );
}