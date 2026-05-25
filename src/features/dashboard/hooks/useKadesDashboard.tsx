import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../services/dashboard.service";

export const useDashboardKades = () => {
  return useQuery({
    queryKey: ["dashboard-kades"],
    queryFn: DashboardService.getDashboard,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};