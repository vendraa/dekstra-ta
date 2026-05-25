import Card from "@/components/ui/Card/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import DetailHeader from "@/features/akun/components/DetailHeader";
import RegistrationDataSection from "@/features/akun/components/RegistrationDataSection";
import DocumentSection from "@/features/akun/components/DocumentSection";
import { getDetailAkun } from "@/features/akun/services/detail-akun.service";
import { mapDetailAkunToAccount } from "@/features/akun/utils/detail-akun-map";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DetailValidasiAkunPage({ params }: Props) {
  const { id } = await params;

  let account;

  try {
    const data = await getDetailAkun(id);
    account = mapDetailAkunToAccount(data);
  } catch (err) {
    console.error("DETAIL ERROR:", err);

    return (
      <div className="flex items-center justify-center h-40 text-foreground/50 text-sm">
        Gagal mengambil data akun
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex items-center justify-center h-40 text-foreground/50 text-sm">
        Akun tidak ditemukan
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Detail Verifikasi Akun
      </h1>

      <Breadcrumb
        homeHref="/admin/dashboard"
        items={[
          { label: "Daftar Akun Baru", href: "/admin/manajemen-akun/verifikasi" },
          { label: "Detail Verifikasi Akun" },
        ]}
      />

      <Card>
        <div className="p-6">
          <DetailHeader id={id} />
        </div>

        <div className="border-t border-border" />

        <div className="p-6">
          <RegistrationDataSection account={account} />
        </div>

        <div className="border-t border-border" />

        <div className="p-6">
          <DocumentSection account={account} />
        </div>
      </Card>
    </div>
  );
}