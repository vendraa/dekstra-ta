import { DashboardWargaTableContent } from "./DashboardWargaTableContent";
import { getRiwayatPengajuanServer } from "@/features/requests/services/riwayat=pengajuan.server.service";

export async function DashboardWargaTableSSR() {
  const allData =
    await getRiwayatPengajuanServer(
      "no-store"
    );

  const activeRequests = allData.filter(
    (item) =>
      item.lifecycle === "IN_PROGRESS"
  );

  return (
    <DashboardWargaTableContent
      data={activeRequests}
    />
  );
}