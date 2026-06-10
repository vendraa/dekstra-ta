import { notFound } from "next/navigation";

import {
  getAllSurat,
  getSuratBySlug,
} from "@/features/surat/surat-config";

import { SuratFormContent } from "@/features/surat/components/SuratFormContent";

export function generateStaticParams() {
  return getAllSurat().map(
    (surat) => ({
      slug: surat.slug,
    })
  );
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SuratFormSSGPage({
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
      dashboardHref="/dashboard-ssg"
      pengajuanBaruHref="/pengajuan-baru-ssg"
    />
  );
}