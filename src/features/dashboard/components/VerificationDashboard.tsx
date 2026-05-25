"use client";

import { StatsCard } from "@/components/ui/Card/StatsCard";
import { ProgressBar, ProgressItem } from "@/components/ui/Chart/ProgressBar";
import { ChartBar, BarChartDataItem } from "@/components/ui/Chart/BarChart";
import { PageCard } from "@/components/ui/Card/PageCard";
import Table from "@/components/ui/Table/Table";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";
import { FetchDataFn } from "@/components/ui/Table/types";

type StatItem = {
  label: string;
  value: number;
  icon: LucideIcon;
};

type Props<T> = {
  stats: StatItem[];
  progressItems: ProgressItem[];
  chartData: BarChartDataItem[];

  previewTitle: string;
  previewLink: string;

  columns: ColumnDef<T>[];
  fetchPreview: FetchDataFn<T>;
};

export default function VerificationDashboard<T extends object>({
  stats,
  progressItems,
  chartData,
  previewTitle,
  previewLink,
  columns,
  fetchPreview,
}: Props<T>) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-5">
        {stats.map((stat) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 items-start">
        {/* Preview Table */}
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
              <Table<T>
                columns={columns}
                mode="server"
                fetchData={fetchPreview}
                initialPageSize={5}
                showSearch={false}
                showPageSize={false}
                showPagination={false}
              />
            </PageCard.Content>
          </PageCard.Root>
        </div>

        {/* Progress */}
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

      {/* Chart */}
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