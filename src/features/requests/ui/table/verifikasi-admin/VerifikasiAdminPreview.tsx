"use client";

import Link from "next/link";
import Table from "@/components/ui/Table/Table";
import { LetterRequest } from "@/features/requests/types/types";
import { validasiAdminPreviewColumns } from "./preview-columns";
import Button from "@/components/ui/Button/Button";
import { useVerifikasiRequests } from "@/features/requests/hooks/useVerifikasi";

export function VerifikasiAdminPreview() {
  const fetchData = useVerifikasiRequests();

  return (
    <div className="col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Surat yang Perlu Diverifikasi
        </h3>

        <Link href="/admin/validasi-administratif">
          <Button size="sm">Lihat Semua</Button>
        </Link>
      </div>

      <Table<LetterRequest>
        columns={validasiAdminPreviewColumns}
        mode="server"
        fetchData={fetchData}
        initialPageSize={5}
        showPagination={false}
        showSearch={false}
        showPageSize={false}
      />
    </div>
  );
}