import CardWithTabs from "@/components/ui/Card/CardWithTabs";
import { TextSkeleton } from "@/components/ui/Skeleton/TextSkeleton";

import { createMainTabs } from "@/features/navigation/dashboard-warga/navigation-tabs";

interface DashboardContentProps {
  name: string;
  loading?: boolean;

  dashboardHref: string;

  pengajuanBaruHref: string;

  dashboardTable: React.ReactNode;
}

export function DashboardContent({
  name,
  loading = false,
  dashboardTable,
  dashboardHref,
  pengajuanBaruHref,
}: DashboardContentProps) {
  const tabs = createMainTabs({
    dashboardTable,
    dashboardHref,
    pengajuanBaruHref,
  });

  return (
    <div className="px-6">
      <section className="mb-6">
        {loading ? (
          <div className="space-y-3">
            <TextSkeleton
              width="w-72"
              height="h-8"
            />

            <TextSkeleton
              width="w-full max-w-xl"
              height="h-5"
            />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Selamat Datang, {name}
            </h1>

            <p className="mt-1 text-foreground">
              Silahkan buat pengajuan surat yang anda inginkan
              dengan menekan tombol{" "}
              <span className="font-medium">
                “Pengajuan Baru”
              </span>
            </p>
          </>
        )}
      </section>

      <CardWithTabs tabs={tabs} />
    </div>
  );
}