import Card from "@/components/ui/Card/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { DynamicForm } from "@/features/surat/forms/dynamic-form/dynamic-form";

interface Props {
  slug: string;
  title: string;

  dashboardHref: string;
  pengajuanBaruHref: string;
}

export function SuratFormContent({
  slug,
  title,
  dashboardHref,
  pengajuanBaruHref,
}: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">
        {title}
      </h1>

      <Breadcrumb
        homeHref={dashboardHref}
        items={[
          {
            label: "Pengajuan Baru",
            href: pengajuanBaruHref,
          },
          {
            label: title,
          },
        ]}
      />

      <Card className="p-8">
        <DynamicForm slug={slug} />
      </Card>
    </div>
  );
}