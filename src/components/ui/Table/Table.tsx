"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import { TableProvider, useTable } from "./TableContext";
import { ReactNode } from "react";
import { FetchDataFn } from "./types";

import {
  TableWrapper,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "./TablePrimitives";

import { TablePagination } from "./TablePagination";
import { TablePageSize } from "./TablePageSize";
import { TableSearch } from "./TableSearch";
import { TableState } from "./TableState";

type Mode = "client" | "server";

interface Props<T> {
  columns: ColumnDef<T>[];
  data?: T[];

  // NEW
  loading?: boolean;

  fetchData?: FetchDataFn<T>;
  totalRows?: number;
  mode?: Mode;
  initialPageSize?: number;

  showPageSize?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;

  filters?: ReactNode;
}

/* ================= INTERNAL CONTENT ================= */

function InternalTable<T>({
  showSearch,
  showPageSize,
  showPagination,
  filters,
}: {
  showSearch: boolean;
  showPageSize: boolean;
  showPagination: boolean;
  filters?: ReactNode;
}) {
  const {
    table,
    loading,
    dataLength,
  } = useTable<T>();

  return (
    <>
      {(showSearch || showPageSize || filters) && (
        <div className="flex justify-between items-center mb-4 gap-4">
          {showPageSize && <TablePageSize />}

          <div className="flex items-center gap-3">
            {filters}
            {showSearch && <TableSearch />}
          </div>
        </div>
      )}

      <TableWrapper>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  as="th"
                  className="font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading || dataLength === 0 ? (
            <TableState />
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </TableWrapper>

      {showPagination && (
        <div>
          <TablePagination />
        </div>
      )}
    </>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function Table<T extends object>({
  showSearch = true,
  showPageSize = true,
  showPagination = true,
  filters,
  loading = false,
  ...props
}: Props<T>) {
  return (
    <TableProvider<T>
      {...props}
      loading={loading}
    >
      <div className="w-full space-y-4">
        <InternalTable
          showSearch={showSearch}
          showPageSize={showPageSize}
          showPagination={showPagination}
          filters={filters}
        />
      </div>
    </TableProvider>
  );
}