"use client";

import Table from "@/components/ui/Table/Table";

import { LetterRequest } from "@/features/requests/types/types";

import { dashboardRequestColumns } from "./columns";

import { DashboardWargaFilters } from "./DashboardWargaFilters";

interface Props {
  data: LetterRequest[];
}

export function DashboardWargaTableContent({
  data,
}: Props) {
  return (
    <Table<LetterRequest>
      columns={dashboardRequestColumns}
      mode="client"
      data={data}
      initialPageSize={10}
      filters={<DashboardWargaFilters />}
    />
  );
}