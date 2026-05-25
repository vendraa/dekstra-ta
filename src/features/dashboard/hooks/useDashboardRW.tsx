import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../services/dashboard.service";

export const useDashboardRW = () => {
  return useQuery({
    queryKey: ["dashboard-rw"],
    queryFn: DashboardService.getDashboard,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};