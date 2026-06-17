import AdminDashboardCSR
  from "@/features/dashboard/sections/AdminDashboardCSR";

import RTDashboard
  from "@/features/dashboard/sections/RTDashboard";

import RWDashboard
  from "@/features/dashboard/sections/RWDashboard";

import KadesDashboard
  from "@/features/dashboard/sections/KadesDashboard";

export default async function DashboardCSRPage({
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
        <AdminDashboardCSR />
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