import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

import { DashboardWargaTableSSG } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTableSSG";

import { getProfileStatic } from "@/features/profile/services/profile.static.service";

export const revalidate = false;

export default async function DashboardSSGPage() {
  const profile =
    await getProfileStatic();

  return (
    <DashboardContent
      name={profile?.name ?? "John Doe"}
      dashboardTable={
        <DashboardWargaTableSSG />
      }
      dashboardHref="/dashboard-ssg"
    />
  );
}