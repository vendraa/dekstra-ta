import {
  getSuratServer,
} from "@/features/surat/services/surat.server.service";

import {
  MainSectionContent,
} from "./MainSectionContent";

export async function MainSectionSSR() {
  const data =
    await getSuratServer();

  return (
    <MainSectionContent
      suratData={data}
      basePath="/pengajuan-baru-ssr"
    />
  );
}