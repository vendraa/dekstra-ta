import { processDashboardRequests } from "@/features/requests/utils/process-dashboard-requests";

import { DashboardWargaTableContent } from "./DashboardWargaTableContent";
import { getRiwayatPengajuanStatic } from "@/features/requests/services/riwayat-pengajuan.static.service";

export async function DashboardWargaTableSSG() {
  const allData = await getRiwayatPengajuanStatic();

  const result = processDashboardRequests(
    allData,
    {
      pageIndex: 0,
      pageSize: 100,
      search: "",
      filters: [],
    }
  );

  return (
    <DashboardWargaTableContent
      data={result.data}
    />
  );
}