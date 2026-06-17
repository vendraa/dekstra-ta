"use client";

import Table from "@/components/ui/Table/Table";

import { LetterRequest }
  from "@/features/requests/types/types";

import { validasiAdminPreviewColumns }
  from "./preview-columns";

import { useVerifikasiRequests }
  from "@/features/requests/hooks/useVerifikasi";

export function VerifikasiAdminPreviewCSR() {
  const fetchData =
    useVerifikasiRequests();

  return (
    <Table<LetterRequest>
      columns={
        validasiAdminPreviewColumns
      }
      mode="server"
      fetchData={fetchData}
      initialPageSize={5}
      showPagination={false}
      showSearch={false}
      showPageSize={false}
    />
  );
}