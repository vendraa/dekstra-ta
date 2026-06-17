import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import Card from "@/components/ui/Card/Card";
import StatusBadge from "@/components/ui/Badge/StatusBadge";

import { DetailPengajuanSection } from "./detail-pengajuan-section";
import { DetailPengajuanActions } from "./detail-pengajuan-actions";
import { DetailPengajuanTimeline } from "./detail-pengajuan-timeline";
import { DetailPengajuanBerkasTable } from "./detail-pengajuan-berkas-table";

import { Role } from "../../../types/types"
import { DetailPermohonan } from "../../../types/detail-persetujuan.types";

import { mapDetailToLetterRequest } from "../../../types/riwayat-persetujuan.types";

import { getFormBySlug } from "@/features/surat/forms/form-registry";

import { getSlugFromKode } from "@/features/surat/constants/surat-kode-map";

import { generateSectionsFromData } from "../helper/generate-sections";

import { getRequestStatusPresentation } from "../../../model/status-label";

import { formatDateTime } from "@/lib/date-formatter";

interface Props {
  detail: DetailPermohonan;
  role: Role;
  suratMasukHref: string;
}

export function DetailPengajuanContent({
  detail,
  role,
  suratMasukHref,
}: Props) {
  const request =
    mapDetailToLetterRequest(detail);

  const slug =
    detail.jenis_surat?.kode
      ? getSlugFromKode(
          detail.jenis_surat.kode
        )
      : null;

  const formConfig = slug
    ? getFormBySlug(slug)
    : null;

  const sections =
    formConfig?.sections ??
    generateSectionsFromData(
      detail.data
    );

  const visibleSections =
    sections.filter((section) => {
      const hasFields =
        (section.fields?.length ?? 0) > 0;

      const hasGroups =
        (section.groups?.length ?? 0) > 0;

      return hasFields || hasGroups;
    });

  const presentation =
    getRequestStatusPresentation(
      request,
      role
    );

  return (
    <div className="space-y-4 px-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Detail Pengajuan Surat
      </h1>

      <Breadcrumb
        items={[
          {
            label: "Surat Masuk",
            href: suratMasukHref,
          },
          {
            label: "Detail Pengajuan",
          },
        ]}
      />

      <div className="space-y-4">
        <Card className="p-6 space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Jenis Surat
                </p>

                <p className="text-base font-heading font-bold text-foreground">
                  {request.letterType}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Status Saat Ini
                </p>

                <StatusBadge
                  {...presentation}
                />
              </div>
            </div>

            <DetailPengajuanActions
              nomorPermohonan={
                request.nomorPermohonan
              }
              role={role}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <DetailPengajuanTimeline
              lifecycle={
                request.lifecycle
              }
              approvals={
                request.approvals ?? []
              }
              createdAt={formatDateTime(
                request.createdAt
              )}
            />
          </div>
        </Card>

        {visibleSections.map(
          (section, index) => (
            <Card
              key={`${section.title}-${index}`}
              className="p-6"
            >
              <DetailPengajuanSection
                section={section}
                data={detail.data}
              />
            </Card>
          )
        )}

        <DetailPengajuanBerkasTable
          berkas={detail.berkas}
        />
      </div>
    </div>
  );
}