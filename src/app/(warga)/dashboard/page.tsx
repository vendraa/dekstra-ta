"use client";

import { useProfile } from "@/features/profile/hooks/useProfile";

import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

import { DashboardWargaTable } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTable";

export default function DashboardPage() {
  const { profile, loading } = useProfile();

  return (
    <DashboardContent
      name={profile?.name ?? "John Doe"}
      loading={loading}
      dashboardHref="/dashboard"
      pengajuanBaruHref="/pengajuan-baru"
      dashboardTable={
        <DashboardWargaTable />
      }
    />
  );
}