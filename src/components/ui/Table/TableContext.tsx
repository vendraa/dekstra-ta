"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";

import { FetchDataFn } from "./types";

import {
  ColumnDef,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  Table as ReactTableInstance,
} from "@tanstack/react-table";

/* ================= TYPES ================= */

type Mode = "client" | "server";

interface TableContextType<T> {
  table: ReactTableInstance<T>;
  loading: boolean;
  dataLength: number;
  totalRows: number;
  pageCount: number;

  pagination: PaginationState;
  globalFilter: string;
  columnFilters: ColumnFiltersState;
}

/* ================= CONTEXT ================= */

const TableContext =
  createContext<TableContextType<unknown> | null>(
    null
  );

export function useTable<T>() {
  const ctx = useContext(TableContext);

  if (!ctx) {
    throw new Error(
      "Table must be inside <TableProvider />"
    );
  }

  return ctx as TableContextType<T>;
}

/* ================= PROVIDER ================= */

interface ProviderProps<T> {
  children: ReactNode;

  columns: ColumnDef<T, unknown>[];

  data?: T[];

  loading?: boolean;

  fetchData?: FetchDataFn<T>;

  totalRows?: number;

  mode?: Mode;

  initialPageSize?: number;
}

export function TableProvider<T>({
  children,
  columns,
  data = [],
  loading: externalLoading = false,
  fetchData,
  totalRows = 0,
  mode = "client",
  initialPageSize = 10,
}: ProviderProps<T>) {
  const isServerMode = mode === "server";

  /* ================= TABLE STATE ================= */

  const [globalFilter, setGlobalFilter] =
    useState("");

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  const [pagination, setPagination] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: initialPageSize,
    });

  /* ================= SERVER STATE ================= */

  const [serverData, setServerData] = useState<T[]>(
    []
  );

  const [serverTotal, setServerTotal] =
    useState<number>(totalRows);

  const [internalLoading, setInternalLoading] =
    useState<boolean>(isServerMode);

  /* ================= RESET PAGE ================= */

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [globalFilter, columnFilters]);

  /* ================= SERVER FETCH ================= */

  useEffect(() => {
    if (!isServerMode || !fetchData) return;

    const serverFetch = fetchData;

    let cancelled = false;

    async function load() {
      try {
        setInternalLoading(true);

        const result = await serverFetch({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          search: globalFilter,
          filters: columnFilters,
        });

        if (cancelled) return;

        setServerData(result.data ?? []);

        setServerTotal(result.totalRows ?? 0);

      } catch (error) {
        console.error(
          "❌ Table fetch error:",
          error
        );

        if (!cancelled) {
          setServerData([]);
          setServerTotal(0);
        }

      } finally {
        if (!cancelled) {
          setInternalLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };

  }, [
    isServerMode,
    fetchData,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    columnFilters,
  ]);

  /* ================= FINAL DATA ================= */

  const finalData = useMemo(() => {
    return isServerMode ? serverData : data;
  }, [isServerMode, serverData, data]);

  /* ================= PAGE COUNT ================= */

  const pageCount = useMemo(() => {
    if (!isServerMode) return undefined;

    return Math.ceil(
      serverTotal / pagination.pageSize
    );
  }, [
    isServerMode,
    serverTotal,
    pagination.pageSize,
  ]);

  /* ================= TABLE ================= */

  const table = useReactTable<T>({
    data: finalData,

    columns,

    state: {
      pagination,
      globalFilter,
      columnFilters,
    },

    onPaginationChange: setPagination,

    onGlobalFilterChange: setGlobalFilter,

    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),

    ...(isServerMode
      ? {}
      : {
          getFilteredRowModel:
            getFilteredRowModel(),
        }),

    manualPagination: isServerMode,

    manualFiltering: isServerMode,

    ...(isServerMode && pageCount
      ? { pageCount }
      : {}),
  });

  /* ================= TOTAL ROWS ================= */

  const finalTotalRows = isServerMode
    ? serverTotal
    : table.getFilteredRowModel().rows.length;

  /* ================= CONTEXT ================= */

  const value: TableContextType<T> = {
    table,

    loading:
      externalLoading || internalLoading,

    dataLength: finalData.length,

    totalRows: finalTotalRows,

    pageCount: table.getPageCount(),

    pagination,

    globalFilter,

    columnFilters,
  };

  return (
    <TableContext.Provider
      value={
        value as TableContextType<unknown>
      }
    >
      {children}
    </TableContext.Provider>
  );
}