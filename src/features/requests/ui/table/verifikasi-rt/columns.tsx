"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

import { LetterRequest } from "@/features/requests/types/types";
import StatusBadge from "@/components/ui/Badge/StatusBadge";
import { getRequestStatusPresentation } from "@/features/requests/model/status-label";
import { formatDateTime } from "@/lib/date-formatter";
import Button from "@/components/ui/Button/Button";
import { formatNomorToSlug } from "@/lib/format-url";

function ActionCell({
  id,
  nomorPermohonan,
}: {
  id: string;
  nomorPermohonan: string;
}) {
  const router = useRouter();

  const slug = `${id}-${formatNomorToSlug(nomorPermohonan)}`;

  return (
    <div className="flex justify-center">
      <Button
        onClick={() => router.push(`/rt/surat/verifikasi/${slug}`)}
        size="sm"
        className="bg-primary text-white"
      >
        <Eye size={16} />
        Lihat Detail
      </Button>
    </div>
  );
}

export const verifikasiRTColumns: ColumnDef<LetterRequest>[] = [
  {
    accessorKey: "nomorPermohonan",
    header: () => <div className="text-left">Nomor Permohonan</div>,
    cell: ({ row }) => row.original.nomorPermohonan,
  },
  {
    id: "pemohon",
    header: () => <div className="text-left">Pemohon</div>,
    cell: ({ row }) => {
      const { nik, name } = row.original;
      return `${nik} - ${name}`;
    },
  },
  {
    accessorKey: "letterType",
    header: () => <div className="text-left">Jenis Surat</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Tanggal Pengajuan</div>,
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const presentation = getRequestStatusPresentation(row.original, "RT");
      return (
        <div className="w-full text-center">
          <StatusBadge {...presentation} />
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <ActionCell
        id={row.original.id}
        nomorPermohonan={row.original.nomorPermohonan}
      />
    ),
  },
];