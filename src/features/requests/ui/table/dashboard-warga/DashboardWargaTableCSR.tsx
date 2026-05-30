"use client";

import { useEffect, useState } from "react";

import Table from "@/components/ui/Table/Table";

import { dashboardRequestColumns } from "./columns";

import { LetterRequest } from "@/features/requests/types/types";

import { DashboardWargaFilters } from "./DashboardWargaFilters";
import { getRiwayatPengajuanClient } from "@/features/requests/services/riwayat-pengajuan.client.service";

export function DashboardWargaTableCSR() {
  const [data, setData] = useState<LetterRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result =
          await getRiwayatPengajuanClient();

        const filtered = result.filter(
          (item) =>
            item.lifecycle === "IN_PROGRESS"
        );

        setData(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Table<LetterRequest>
      columns={dashboardRequestColumns}
      data={data}
      loading={loading}
      mode="client"
      initialPageSize={10}
      filters={<DashboardWargaFilters />}
    />
  );
}