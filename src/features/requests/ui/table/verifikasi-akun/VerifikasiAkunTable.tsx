"use client";

import Table from "@/components/ui/Table/Table";
import { Account } from "@/features/akun/types/akun.types";
import { validasiAkunColumns } from "./columns";
import { useAdminVerifikasiAccounts } from "@/features/akun/hooks/useAkunList";

export function ValidasiAkunTable() {
  const fetchData = useAdminVerifikasiAccounts();

  return (
    <Table<Account>
      columns={validasiAkunColumns}
      mode="server"
      fetchData={fetchData}
      initialPageSize={10}
    />
  );
}