import { Role } from "@/features/requests/types/types";

import { DetailPengajuanSSRPage } from "@/features/requests/ui/detail-verifikasi/detail-verifikasi-ssr";

export const dynamic =
  "force-dynamic";

interface Props {
  params: Promise<{
    role: string;
    slug: string;
  }>;
}

function extractId(
  slug: string
): string {
  return slug.split("-")[0];
}

function isValidSlug(
  slug: string
) {
  return /^\d+-/.test(slug);
}

export default async function Page({
  params,
}: Props) {
  const {
    role,
    slug,
  } = await params;

  if (!isValidSlug(slug)) {
    throw new Error(
      "Invalid slug format"
    );
  }

  const id =
    extractId(slug);

  return (
    <DetailPengajuanSSRPage
      id={id}
      role={
        role.toUpperCase() as Role
      }
    />
  );
}