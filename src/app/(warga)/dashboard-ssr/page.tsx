import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

import { DashboardWargaTableSSR } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTableSSR";

import { getProfileServer } from "@/features/profile/services/profile.server.service";

export const dynamic = "force-dynamic";

export default async function DashboardSSRPage() {
  const profile = await getProfileServer(
    "no-store"
  );

  return (
    <DashboardContent
      name={profile?.name ?? "John Doe"}
      dashboardTable={
        <DashboardWargaTableSSR />
      }
      dashboardHref="/dashboard-ssr"
      pengajuanBaruHref="/pengajuan-baru-ssr"
    />
  );
}