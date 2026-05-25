"use client";

import { useTable } from "./TableContext";
import Button from "@/components/ui/Button/Button";
import clsx from "clsx";

export function TablePagination() {
  const { table, totalRows, pageCount, pagination } = useTable();

  // FIX: Baca dari `pagination` context, bukan `table.getState()`
  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;

  // FIX: Hitung manual berdasarkan `pagination` dari context (bukan dari table)
  // agar nilai ini ikut re-render ketika state berubah.
  const canPrevious = pageIndex > 0;
  const canNext = pageIndex < pageCount - 1;

  const pages = getPageNumbers(pageIndex, pageCount);

  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end =
    totalRows === 0 ? 0 : Math.min((pageIndex + 1) * pageSize, totalRows);

  if (pageCount <= 1) {
    return (
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="text-sm text-foreground/60">
          Menampilkan {start} hingga {end} dari {totalRows} data
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="text-sm text-foreground/60">
        Menampilkan {start} hingga {end} dari {totalRows} data
      </div>

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          disabled={!canPrevious}
          onClick={() => table.setPageIndex(0)}
        >
          «
        </Button>

        <Button
          size="sm"
          disabled={!canPrevious}
          onClick={() => table.previousPage()}
        >
          ‹
        </Button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => table.setPageIndex(page)}
            className={clsx(
              "px-3 py-1 text-sm rounded-md transition",
              page === pageIndex
                ? "bg-primary text-white"
                : "hover:bg-surface"
            )}
          >
            {page + 1}
          </button>
        ))}

        <Button
          size="sm"
          disabled={!canNext}
          onClick={() => table.nextPage()}
        >
          ›
        </Button>

        <Button
          size="sm"
          disabled={!canNext}
          onClick={() => table.setPageIndex(pageCount - 1)}
        >
          »
        </Button>
      </div>
    </div>
  );
}

function getPageNumbers(current: number, total: number, delta = 2): number[] {
  if (total <= 0) return [0];

  const start = Math.max(0, current - delta);
  const end = Math.min(total - 1, current + delta);
  const range: number[] = [];

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}
