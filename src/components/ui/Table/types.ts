import { ColumnFiltersState } from "@tanstack/react-table";

export interface TableQuery {
  pageIndex: number;
  pageSize: number;
  search?: string;
  filters?: ColumnFiltersState;
}

export interface TableResult<T> {
  data: T[];
  totalRows: number;
}

export type FetchDataFn<T> = (
  params: TableQuery
) => Promise<TableResult<T>>;