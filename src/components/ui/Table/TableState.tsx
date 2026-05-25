"use client";

import { useTable } from "./TableContext";
import { TableSkeleton } from "./TableSkeleton";

export function TableState() {
  const { loading, dataLength, table } =
    useTable();

  const columnCount =
    table.getAllLeafColumns().length;

  if (loading) {
    return (
      <TableSkeleton
        rows={table.getState().pagination.pageSize}
        columns={columnCount}
      />
    );
  }

  if (!loading && dataLength === 0) {
    return (
      <tr>
        <td
          colSpan={columnCount}
          className="text-center py-6"
        >
          Tidak ada data
        </td>
      </tr>
    );
  }

  return null;
}

