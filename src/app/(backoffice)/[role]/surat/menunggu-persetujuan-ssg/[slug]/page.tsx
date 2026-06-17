import { Role } from "@/features/requests/types/types";

import { DetailPengajuanSSGPage } from "@/features/requests/ui/detail-verifikasi/detail-verifikasi-ssg";

export const dynamic =
  "force-static";

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
    <DetailPengajuanSSGPage
      id={id}
      role={
        role.toUpperCase() as Role
      }
    />
  );
}