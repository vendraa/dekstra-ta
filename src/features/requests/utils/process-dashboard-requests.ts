import { LetterRequest } from "../types/types";
import {
  TableQuery,
  TableResult,
} from "@/components/ui/Table/types";

export function processDashboardRequests(
  allData: LetterRequest[],
  params: TableQuery
): TableResult<LetterRequest> {
  let result = allData.filter(
    (item) => item.lifecycle === "IN_PROGRESS"
  );

  if (params.search) {
    const keyword = params.search.toLowerCase();

    result = result.filter(
      (item) =>
        item.nomorPermohonan.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.letterType.toLowerCase().includes(keyword)
    );
  }

  if (params.filters?.length) {
    params.filters.forEach((filter) => {
      if (filter.id === "status") {
        result = result.filter(
          (item) => item.currentStep === filter.value
        );
      }

      if (filter.id === "letterType") {
        result = result.filter(
          (item) => item.letterType === filter.value
        );
      }

      if (filter.id === "createdAt") {
        const { from, to } = filter.value as {
          from?: string;
          to?: string;
        };

        result = result.filter((item) => {
          const date = new Date(item.createdAt).getTime();

          if (from && date < new Date(from).getTime()) {
            return false;
          }

          if (to && date > new Date(to).getTime()) {
            return false;
          }

          return true;
        });
      }
    });
  }

  const start = params.pageIndex * params.pageSize;
  const end = start + params.pageSize;

  return {
    data: result.slice(start, end),
    totalRows: result.length,
  };
}