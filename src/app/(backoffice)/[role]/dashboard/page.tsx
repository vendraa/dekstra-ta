import AdminDashboard from "@/features/dashboard/sections/AdminDashboard";
import KadesDashboard from "@/features/dashboard/sections/KadesDashboard";
import RTDashboard from "@/features/dashboard/sections/RTDashboard";
import RWDashboard from "@/features/dashboard/sections/RWDashboard";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  switch (role) {
    case "admin":
      return <AdminDashboard />;

    case "rt":
      return <RTDashboard />;

    case "rw":
      return <RWDashboard />;

    case "kades":
      return <KadesDashboard />;

    default:
      return <div>Role tidak dikenali</div>;
  }
}