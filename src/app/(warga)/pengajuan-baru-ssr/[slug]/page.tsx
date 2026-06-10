import { notFound } from "next/navigation";

import { getSuratBySlug } from "@/features/surat/surat-config";

import { SuratFormContent } from "@/features/surat/components/SuratFormContent";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SuratFormSSRPage({
  params,
}: Props) {
  const { slug } = await params;

  const surat =
    getSuratBySlug(slug);

  if (!surat) {
    notFound();
  }

  return (
    <SuratFormContent
      slug={slug}
      title={surat.title}
      dashboardHref="/dashboard-ssr"
      pengajuanBaruHref="/pengajuan-baru-ssr"
    />
  );
}