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
  // FIX: Ekspos pagination dan globalFilter state langsung ke context
  // agar consumers re-render ketika nilai ini berubah.
  pagination: PaginationState;
  globalFilter: string;
  columnFilters: ColumnFiltersState;
}

/* ================= CONTEXT ================= */

const TableContext = createContext<TableContextType<unknown> | null>(null);

export function useTable<T>() {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error("Table must be inside <TableProvider />");
  return ctx as TableContextType<T>;
}

/* ================= PROVIDER ================= */

interface ProviderProps<T> {
  children: ReactNode;
  columns: ColumnDef<T, unknown>[];
  data?: T[];
  fetchData?: FetchDataFn<T>;
  totalRows?: number;
  mode?: Mode;
  initialPageSize?: number;
}

export function TableProvider<T>({
  children,
  columns,
  data = [],
  fetchData,
  totalRows = 0,
  mode = "client",
  initialPageSize = 10,
}: ProviderProps<T>) {
  const isServerMode = mode === "server";

  // FIX: Kedua state ini sekarang ikut masuk ke context value.
  // Ketika setPageIndex / setPageSize dipanggil, TanStack memanggil
  // onPaginationChange → setPagination → React state berubah →
  // context value baru dibuat → semua consumers otomatis re-render.
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  /* ================= SERVER STATE ================= */

  const [serverData, setServerData] = useState<T[]>([]);
  const [serverTotal, setServerTotal] = useState<number>(totalRows);
  const [loading, setLoading] = useState<boolean>(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  /* ================= FETCH EFFECT ================= */

  useEffect(() => {
    if (!isServerMode || !fetchData) return;

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchData({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          search: globalFilter,
          filters: columnFilters,
        });
        if (cancelled) return;
        setServerData(result.data ?? []);
        setServerTotal(result.totalRows ?? 0);
      } catch (error) {
        console.error("❌ Table fetch error:", error);
        if (!cancelled) {
          setServerData([]);
          setServerTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

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
    columnFilters
  ]);

  useEffect(() => {
  setPagination((prev) => ({
    ...prev,
    pageIndex: 0,
  }));
}, [globalFilter, columnFilters]);

  /* ================= FINAL DATA ================= */

  const finalData = useMemo(
    () => (isServerMode ? serverData : data),
    [isServerMode, serverData, data]
  );

  /* ================= PAGE COUNT ================= */

  const calculatedPageCount = useMemo(() => {
    if (!isServerMode) return -1;
    return Math.ceil(serverTotal / pagination.pageSize);
  }, [isServerMode, serverTotal, pagination.pageSize]);

  /* ================= TABLE INSTANCE ================= */

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
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    manualPagination: isServerMode,
    manualFiltering: isServerMode,

    ...(isServerMode && calculatedPageCount > 0
      ? { pageCount: calculatedPageCount }
      : {}),
  });

  /* ================= CONTEXT VALUE ================= */

  const finalTotalRows = isServerMode
    ? serverTotal
    : table.getFilteredRowModel().rows.length;

  const value: TableContextType<T> = {
    table,
    loading,
    dataLength: finalData.length,
    totalRows: finalTotalRows,
    pageCount: table.getPageCount(),
    // FIX: Sertakan state ini agar perubahan pagination/filter
    // menyebabkan context re-render ke semua consumers.
    pagination,
    globalFilter,
    columnFilters,
  };

  return (
    <TableContext.Provider value={value as TableContextType<unknown>}>
      {children}
    </TableContext.Provider>
  );
}
