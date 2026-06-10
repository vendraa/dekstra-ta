import {
  getSuratStatic,
} from "@/features/surat/services/surat.static.service";

import {
  MainSectionContent,
} from "./MainSectionContent";

export async function MainSectionSSG() {
  const data =
    await getSuratStatic();

  return (
    <MainSectionContent
      suratData={data}
      basePath="/pengajuan-baru-ssg"
    />
  );
}