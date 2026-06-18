"use client";

import { ReactNode } from "react";
import { StatsCard } from "@/components/ui/Card/StatsCard";
import { ProgressBar, ProgressItem } from "@/components/ui/Chart/ProgressBar";
import { ChartBar, BarChartDataItem } from "@/components/ui/Chart/BarChart";
import { PageCard } from "@/components/ui/Card/PageCard";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { Users, UserCog, FileText, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  userCog: UserCog,
  fileText: FileText,
};

type StatItem = {
  label: string;
  value: number;
  iconKey: string;
};

type Props = {
  stats: StatItem[];
  progressItems: ProgressItem[];
  chartData: BarChartDataItem[];
  previewTitle: string;
  previewLink: string;
  previewSlot: ReactNode;  // ← terima ReactNode, bukan fetchPreview/previewData
};

export default function VerificationDashboard({
  stats,
  progressItems,
  chartData,
  previewTitle,
  previewLink,
  previewSlot,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = ICON_MAP[stat.iconKey] ?? FileText;
          return (
            <StatsCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={Icon}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-5 items-start">
        <div className="col-span-2">
          <PageCard.Root>
            <PageCard.Header>
              <PageCard.Title>{previewTitle}</PageCard.Title>
              <Link href={previewLink}>
                <Button className="bg-primary text-white text-sm px-4 py-2">
                  Lihat Semua
                </Button>
              </Link>
            </PageCard.Header>

            <PageCard.Content>
              {previewSlot}  {/* ← render slot langsung */}
            </PageCard.Content>
          </PageCard.Root>
        </div>

        <div className="col-span-1">
          <PageCard.Root>
            <PageCard.Header>
              <PageCard.Title>Progress Surat</PageCard.Title>
            </PageCard.Header>
            <PageCard.Content>
              <ProgressBar items={progressItems} spacing="md" />
            </PageCard.Content>
          </PageCard.Root>
        </div>
      </div>

      <PageCard.Root>
        <PageCard.Header>
          <PageCard.Title>
            Jumlah Pengajuan Surat (7 Hari Terakhir)
          </PageCard.Title>
        </PageCard.Header>
        <PageCard.Content>
          <ChartBar data={chartData} />
        </PageCard.Content>
      </PageCard.Root>
    </div>
  );
}