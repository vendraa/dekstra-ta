"use client";

import { useCallback } from "react";

import { LetterRequest } from "@/features/requests/types/types";

import { getRiwayatPersetujuan } from "@/features/requests/services/riwayat-persetujuan.service";

type TableFilter = {
  id: string;
  value: unknown;
};

type TableQuery = {
  pageIndex: number;
  pageSize: number;
  search?: string;
  filters?: TableFilter[];
};

export function useVerifikasiRequests() {
  return useCallback(
    async ({
      pageIndex,
      pageSize,
      search,
      filters = [],
    }: TableQuery): Promise<{
      data: LetterRequest[];
      totalRows: number;
    }> => {

      const allData =
        await getRiwayatPersetujuan();

      /* =========================
       * DEFAULT FILTER
       * ======================= */

      let filtered = allData.filter(
        (item) =>
          item.lifecycle ===
          "IN_PROGRESS"
      );

      /* =========================
       * SEARCH
       * ======================= */

      if (search) {
        filtered = filtered.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
      }

      /* =========================
      * STATUS FILTER
      * ======================= */

      const statusFilter = filters.find(
        (f) => f.id === "status"
      )?.value as string | undefined;

      if (statusFilter) {
        filtered = filtered.filter(
          (item) =>
            item.currentStep === statusFilter
        );
      }

      /* =========================
       * LETTER TYPE FILTER
       * ======================= */

      const letterTypeFilter =
        filters.find(
          (f) => f.id === "letterType"
        )?.value as string | undefined;

      if (letterTypeFilter) {
        filtered = filtered.filter(
          (item) =>
            item.letterType ===
            letterTypeFilter
        );
      }

      /* =========================
       * DATE RANGE FILTER
       * ======================= */

      const createdAtFilter =
        filters.find(
          (f) => f.id === "createdAt"
        )?.value as
          | {
              from?: string;
              to?: string;
            }
          | undefined;

      if (
        createdAtFilter?.from ||
        createdAtFilter?.to
      ) {
        filtered = filtered.filter(
          (item) => {
            const itemDate = new Date(
              item.createdAt
            );

            const from =
              createdAtFilter.from
                ? new Date(
                    createdAtFilter.from
                  )
                : undefined;

            const to =
              createdAtFilter.to
                ? new Date(
                    createdAtFilter.to
                  )
                : undefined;

            if (
              from &&
              itemDate < from
            ) {
              return false;
            }

            if (to) {
              const endDate =
                new Date(to);

              endDate.setHours(
                23,
                59,
                59,
                999
              );

              if (
                itemDate > endDate
              ) {
                return false;
              }
            }

            return true;
          }
        );
      }

      /* =========================
       * PAGINATION
       * ======================= */

      const start =
        pageIndex * pageSize;

      const end = start + pageSize;

      return {
        data: filtered.slice(start, end),
        totalRows: filtered.length,
      };
    },
    []
  );
}