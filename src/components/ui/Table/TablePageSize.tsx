"use client";

import { useTable } from "./TableContext";
import { ChevronDown } from "lucide-react";

export function TablePageSize() {
  const { table, pagination } = useTable();

  // FIX: Baca dari `pagination` context, bukan `table.getState()`
  // `table.getState()` membaca objek mutable yang tidak trigger re-render.
  const pageSize = pagination.pageSize;

  const handlePageSizeChange = (newSize: number) => {
    table.setPageSize(newSize);
    table.setPageIndex(0);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Tampilkan</span>

      <div className="relative">
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="appearance-none border border-gray-300 rounded-lg px-3 py-1.5 pr-8 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
        >
          {[5, 10, 25, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      <span className="text-muted-foreground">data per halaman</span>
    </div>
  );
}