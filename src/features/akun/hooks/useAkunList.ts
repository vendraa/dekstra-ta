"use client";

import { useCallback } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Account } from "@/features/akun/types/akun.types";
import { getVerifikasiAccounts } from "@/features/akun/services/akun.service";

type FetchParams = {
  pageIndex: number;
  pageSize: number;
  search?: string;
  filters?: ColumnFiltersState;
};

export function useAdminVerifikasiAccounts() {
  return useCallback(
    async ({
      pageIndex,
      pageSize,
      search,
      filters,
    }: FetchParams): Promise<{
      data: Account[];
      totalRows: number;
    }> => {

      const rawStatus = filters?.find(
        (f) => f.id === "status_verifikasi"
      )?.value;

      let statusFilter: number | undefined;

      if (typeof rawStatus === "number") {
        statusFilter = rawStatus;
      } else if (typeof rawStatus === "string" && rawStatus !== "") {
        const parsed = Number(rawStatus);
        statusFilter = isNaN(parsed) ? undefined : parsed;
      }

      const result = await getVerifikasiAccounts({
        page: pageIndex + 1,
        page_size: pageSize,
        search: search || undefined,
        status: statusFilter,
      });

      console.log("STATUS FILTER:", statusFilter);

      return {
        data: result.results,
        totalRows: result.count,
      };
    },
    []
  );
}