import AdminDashboardSSR
  from "@/features/dashboard/sections/AdminDashboardSSR";

import RTDashboard
  from "@/features/dashboard/sections/RTDashboard";

import RWDashboard
  from "@/features/dashboard/sections/RWDashboard";

import KadesDashboard
  from "@/features/dashboard/sections/KadesDashboard";

export const dynamic = "force-dynamic";

// 🔍 DEBUG — taruh tepat di bawah import, sebelum function
console.log("=== DEBUG IMPORTS [role]/dashboard-ssr/page.tsx ===");
console.log("AdminDashboardSSR:", typeof AdminDashboardSSR, AdminDashboardSSR);
console.log("RTDashboard:", typeof RTDashboard);
console.log("RWDashboard:", typeof RWDashboard);
console.log("KadesDashboard:", typeof KadesDashboard);
console.log("====================================================");

export default async function DashboardSSRPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  console.log("Role yang diakses:", role); // 🔍 DEBUG

  switch (role) {
    case "admin":
      return <AdminDashboardSSR />;
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