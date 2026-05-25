// detail-pengajuan-page.tsx

import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import Card from "@/components/ui/Card/Card";
import StatusBadge from "@/components/ui/Badge/StatusBadge";
import { DetailPengajuanSection } from "./detail-pengajuan-section";
import { getFormBySlug } from "@/features/surat/forms/form-registry";
import { Role } from "../../types/types";
import { getRequestStatusPresentation } from "../../model/status-label";
import { DetailPengajuanActions } from "./detail-pengajuan-actions";
import { DetailPengajuanTimeline } from "./detail-pengajuan-timeline";
import { DetailPengajuanBerkasTable } from "./detail-pengajuan-berkas-table";

import { getDetailPermohonan } from "../../services/detail-persetujuan.service";
import { mapDetailToLetterRequest } from "../../types/riwayat-persetujuan.types";
import { generateSectionsFromData } from "./helper/generate-sections";
import { getSlugFromKode } from "@/features/surat/constants/surat-kode-map";
import { formatDateTime } from "@/lib/date-formatter";

interface Props {
  id: string;
  role: Role;
}

export async function DetailPengajuanPage({ id, role }: Props) {
  const detail = await getDetailPermohonan(id);

  if (!detail) {
    return (
      <div className="px-6 py-10 text-center text-muted-foreground text-sm">
        Pengajuan tidak ditemukan.
      </div>
    );
  }

  const request = mapDetailToLetterRequest(detail);

  const slug = detail.jenis_surat?.kode
    ? getSlugFromKode(detail.jenis_surat.kode)
    : null;

  const formConfig = slug ? getFormBySlug(slug) : null;
  const sections =
    formConfig?.sections ?? generateSectionsFromData(detail.data);

    const visibleSections = sections.filter((section) => {
    const hasFields = (section.fields?.length ?? 0) > 0;
    const hasGroups = (section.groups?.length ?? 0) > 0;
    return hasFields || hasGroups;
  });

  const presentation = getRequestStatusPresentation(request, role);

  const suratMasukHref =
    role === "KADES"
      ? "/kades/surat/menunggu-persetujuan"
      : `/${role.toLowerCase()}/surat/verifikasi`;

  console.log({
    step: request.currentStep,
    role,
  });

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
          { label: "Detail Pengajuan" },
        ]}
      />

      <div className="space-y-4">
        <Card className="p-6 space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            
            {/* LEFT */}
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
                <StatusBadge {...presentation} />
              </div>
            </div>

            {/* RIGHT */}
            <DetailPengajuanActions
              nomorPermohonan={request.nomorPermohonan}
              role={role}
            />
          </div>

          {/* TIMELINE */}
          <div className="pt-4 border-t border-border">
            <DetailPengajuanTimeline
              lifecycle={request.lifecycle}
              approvals={request.approvals ?? []}
              createdAt={formatDateTime(request.createdAt)}
            />
          </div>
        </Card>

        {/* FORM DATA */}
        {visibleSections.map((section, index) => (
          <Card key={index} className="p-6">
            <DetailPengajuanSection
              section={section}
              data={detail.data}
            />
          </Card>
        ))}

        {/* BERKAS PERMOHONAN */}
        <DetailPengajuanBerkasTable berkas={detail.berkas} />
      </div>
    </div>
  );
}