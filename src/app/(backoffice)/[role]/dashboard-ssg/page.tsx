import AdminDashboardSSG
  from "@/features/dashboard/sections/AdminDashboardSSG";

import RTDashboard
  from "@/features/dashboard/sections/RTDashboard";

import RWDashboard
  from "@/features/dashboard/sections/RWDashboard";

import KadesDashboard
  from "@/features/dashboard/sections/KadesDashboard";

export const dynamic =
  "force-static";

export default async function DashboardSSGPage({
  params,
}: {
  params: Promise<{
    role: string;
  }>;
}) {

  const { role } =
    await params;

  switch (role) {

    case "admin":
      return (
        <AdminDashboardSSG />
      );

    case "rt":
      return (
        <RTDashboard />
      );

    case "rw":
      return (
        <RWDashboard />
      );

    case "kades":
      return (
        <KadesDashboard />
      );

    default:
      return (
        <div>
          Role tidak dikenali
        </div>
      );
  }
}