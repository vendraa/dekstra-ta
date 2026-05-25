"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Account } from "@/features/akun/types/akun.types";
import { Eye } from "lucide-react";
import Link from "next/link";
import { AkunStatusBadge } from "@/components/ui/Badge/AkunStatusBadge";
import Button from "@/components/ui/Button/Button";

export const validasiAkunColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "nik",
    header: "NIK",
  },
  {
    accessorKey: "fullName",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Daftar",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="text-center">
        <AkunStatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Link href={`/admin/manajemen-akun/verifikasi/${row.original.id}`}>
          <Button
            size="sm"
            className="flex items-center gap-2 bg-primary text-white"
          >
            <Eye size={14} />
            Lihat Detail
          </Button>
        </Link>
      </div>
    ),
  },
];