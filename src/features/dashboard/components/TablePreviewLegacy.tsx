"use client";

import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/ui/Table/Table";
import { FetchDataFn } from "@/components/ui/Table/types";

interface Props<T extends object> {
  columns: ColumnDef<T>[];
  fetchPreview: FetchDataFn<T>;
}

export default function TablePreviewLegacy<T extends object>({
  columns,
  fetchPreview,
}: Props<T>) {
  return (
    <Table<T>
      columns={columns}
      mode="server"
      fetchData={fetchPreview}
      initialPageSize={5}
      showSearch={false}
      showPageSize={false}
      showPagination={false}
    />
  );
}