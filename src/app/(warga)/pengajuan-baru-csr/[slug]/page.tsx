"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

import { getSuratBySlug } from "@/features/surat/surat-config";

import { SuratFormContent } from "@/features/surat/components/SuratFormContent";

export default function SuratFormCSRPage() {
  const params = useParams();

  const slug = params.slug as string;

  const surat = getSuratBySlug(slug);

  if (!surat) {
    notFound();
  }

  return (
    <SuratFormContent
      slug={slug}
      title={surat.title}
      dashboardHref="/dashboard-csr"
      pengajuanBaruHref="/pengajuan-baru-csr"
    />
  );
}