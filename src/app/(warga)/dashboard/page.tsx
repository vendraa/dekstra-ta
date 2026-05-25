"use client";

import CardWithTabs from "@/components/ui/Card/CardWithTabs";
import { mainTabs } from "@/features/navigation/dashboard-warga/navigation-tabs";
import { useProfile } from "@/features/profile/hooks/useProfile";

export default function DashboardPage() {
  const { profile, loading } = useProfile();

  const name = profile?.name ?? "John Doe";

  return (
    <div className="px-6">
      <section className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Selamat Datang, {loading ? "..." : name}
        </h1>

        <p className="mt-1 text-foreground">
          Silahkan buat pengajuan surat yang anda inginkan dengan menekan
          tombol <span className="font-medium">“Pengajuan Baru”</span>
        </p>
      </section>

      <CardWithTabs tabs={mainTabs} />
    </div>
  );
}