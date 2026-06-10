"use client";

import { useProfile } from "@/features/profile/hooks/useProfile";

import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

import { DashboardWargaTableCSR } from "@/features/requests/ui/table/dashboard-warga/DashboardWargaTableCSR";

export default function DashboardCSRPage() {
  const { profile, loading } = useProfile();

  return (
    <DashboardContent
      name={profile?.name ?? "John Doe"}
      loading={loading}
      dashboardTable={
        <DashboardWargaTableCSR />
      }
      dashboardHref="/dashboard-csr"
      pengajuanBaruHref="/pengajuan-baru-csr"
    />
  );
}