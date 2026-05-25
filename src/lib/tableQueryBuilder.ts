import { ColumnFiltersState } from "@tanstack/react-table";

type QueryValue =
  | string
  | number
  | boolean
  | string[]
  | { from?: string; to?: string }
  | undefined;

export interface QueryParams {
  page: number;
  limit: number;
  search?: string;
  createdAt?: { from?: string; to?: string };
  [key: string]: QueryValue;
}

export function buildTableQuery(
  pageIndex: number,
  pageSize: number,
  search?: string,
  filters?: ColumnFiltersState
): QueryParams {

  const query: QueryParams = {
    page: pageIndex + 1,
    limit: pageSize,
  };

  if (search) {
    query.search = search;
  }

  if (filters) {
    filters.forEach((filter) => {
      query[filter.id] = filter.value as QueryValue;
    });
  }

  return query;
}