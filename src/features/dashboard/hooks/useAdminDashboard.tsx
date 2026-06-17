import { useQuery } from "@tanstack/react-query";

import { getDashboardClient } from "../services/dashboard.clinet.service";

export function useDashboardAdmin() {
  return useQuery({
    queryKey: ["dashboard-admin"],

    queryFn: getDashboardClient,

    staleTime: 1000 * 60 * 5,

    retry: 1,
  });
}