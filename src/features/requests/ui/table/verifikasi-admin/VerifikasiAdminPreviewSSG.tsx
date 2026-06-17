import {
  getVerifikasiAdminBuild,
} from "@/services/dashboard-admin/verifikasi-admin.static.service";

import {
  VerifikasiAdminPreviewContent,
} from "./VerifikasiAdminPreviewContent";

export async function VerifikasiAdminPreviewSSG() {

  const data =
    await getVerifikasiAdminBuild();

  return (
    <VerifikasiAdminPreviewContent
      data={data.slice(0, 5)}
    />
  );
}