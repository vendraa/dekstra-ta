// src/config/navigation-tabs.tsx

import { Tab } from "@/components/ui/Card/CardWithTabs";
import { Home, Plus, Clock } from "lucide-react";
import { DashboardWargaTable } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTable";
import { RiwayatPengajuanTable } from "@/features/requests/ui/table/riwayat-pengajuan/RiwayatPengajuanTable";
import { MainSection } from "@/app/(warga)/pengajuan-baru/_sections/main-section";

export const mainTabs: Tab[] = [
  {
    label: "Daftar Pengajuan",
    href: "/dashboard",
    icon: Home,
    content: (
      <div className="p-3">
        <h2 className="font-heading font-semibold text-foreground mb-5">
          Daftar Pengajuan Aktif
        </h2>
        <DashboardWargaTable />
      </div>
    ),
  },
  {
    label: "Pengajuan Baru",
    href: "/pengajuan-baru",
    icon: Plus,
    content: <MainSection />,
  },
  {
    label: "Riwayat Pengajuan",
    href: "/riwayat-pengajuan",
    icon: Clock,
    content: (
      <div className="p-3">
        <RiwayatPengajuanTable />
      </div>
    ),
  },
];