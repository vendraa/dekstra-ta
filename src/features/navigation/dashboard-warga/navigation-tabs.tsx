import { Tab } from "@/components/ui/Card/CardWithTabs";

import { RiwayatPengajuanTable } from "@/features/requests/ui/table/riwayat-pengajuan/RiwayatPengajuanTable";

import { MainSection } from "@/app/(warga)/pengajuan-baru/_sections/main-section";

interface CreateMainTabsProps {
  dashboardTable: React.ReactNode;

  dashboardHref: string;
}

export function createMainTabs({
  dashboardTable,
  dashboardHref,
}: CreateMainTabsProps): Tab[] {
  return [
    {
      label: "Daftar Pengajuan",

      href: dashboardHref,

      icon: "home",

      content: (
        <div className="p-3">
          <h2 className="font-heading font-semibold text-foreground mb-5">
            Daftar Pengajuan Aktif
          </h2>

          {dashboardTable}
        </div>
      ),
    },

    {
      label: "Pengajuan Baru",

      href: "/pengajuan-baru",

      icon: "plus",

      content: <MainSection />,
    },

    {
      label: "Riwayat Pengajuan",

      href: "/riwayat-pengajuan",

      icon: "clock",

      content: (
        <div className="p-3">
          <RiwayatPengajuanTable />
        </div>
      ),
    },
  ];
}