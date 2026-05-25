"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { LetterRequest } from "@/features/requests/types/types";
import { Eye } from "lucide-react";
import StatusBadge from "@/components/ui/Badge/StatusBadge";
import Button from "@/components/ui/Button/Button";
import { getRequestStatusPresentation } from "@/features/requests/model/status-label";
import { RequestDetailModal } from "../../modal-detail/RequestDetailModal";
import { formatDateTime } from "@/lib/date-formatter";

/* ========================= ACTION CELL ========================= */
// Komponen terpisah agar useState tidak melanggar rules of hooks di dalam cell

function ActionCell({ request }: { request: LetterRequest }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <Button
          size="sm"
          className="bg-primary text-white"
          onClick={() => setOpen(true)}
        >
          <Eye size={14} />
          Lihat Detail
        </Button>
      </div>

      <RequestDetailModal
        open={open}
        onClose={() => setOpen(false)}
        request={request}
      />
    </>
  );
}

/* ========================= COLUMNS ========================= */

export const dashboardRequestColumns: ColumnDef<LetterRequest>[] = [
  {
    accessorKey: "nomorPermohonan",
    header: () => (
      <div className="text-left">Nomor Permohonan</div>
    ),
    enableColumnFilter: true,
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.nomorPermohonan || "-"}
      </span>
    ),
  },
  {
    accessorKey: "letterType",
    header: () => (
      <div className="text-left">Jenis Surat</div>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-left">Tanggal Pengajuan</div>
    ),
    enableColumnFilter: true,
    cell: ({ row }) => {
      const rawDate = row.original.createdAt;

      return (
        <span>
          {rawDate ? formatDateTime(rawDate) : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: true,
    cell: ({ row }) => {
      const presentation = getRequestStatusPresentation(
        row.original,
        "WARGA"
      );

      return (
        <div className="flex justify-center">
          <StatusBadge {...presentation} />
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => <ActionCell request={row.original} />,
  },
];