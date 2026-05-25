import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../services/dashboard.service";

export const useDashboardRT = () => {
  return useQuery({
    queryKey: ["dashboard-rt"],
    queryFn: DashboardService.getDashboard,
    staleTime: 1000 * 60 * 5, // 5 menit cache
    retry: 1,
  });
};