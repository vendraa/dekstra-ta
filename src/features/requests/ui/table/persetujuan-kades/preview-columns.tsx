"use client";

import { ColumnDef }   from "@tanstack/react-table";

import { LetterRequest }    from "@/features/requests/types/types";
import StatusBadge          from "@/components/ui/Badge/StatusBadge";
import { getRequestStatusPresentation } from "@/features/requests/model/status-label";
import { formatDateTime } from "@/lib/date-formatter";

export const persetujuanKadesPreviewColumns: ColumnDef<LetterRequest>[] = [
  {
    accessorKey: "nomorPermohonan",
    header: () => <div className="text-left">Nomor Permohonan</div>,
    cell: ({ row }) => row.original.nomorPermohonan,
  },
  {
    id: "pemohon",
    header: () => (
      <div className="text-left">Pemohon</div>
    ),
    cell: ({ row }) => {
      const { nik, name } = row.original;
      return `${nik} - ${name}`;
    },
  },
  {
    accessorKey: "letterType",
    header: () => (
      <div className="text-left">Jenis Surat</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-left">Tanggal Pengajuan</div>
    ),
    cell: ({ row }) => formatDateTime(row.original.createdAt)
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const presentation = getRequestStatusPresentation(row.original, "KADES");
      return (
        <div className="w-full text-center">
          <StatusBadge {...presentation} />
        </div>
      );
    },
  },
];