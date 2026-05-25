"use client";

import Card from "@/components/ui/Card/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { ValidasiAkunTable } from "@/features/requests/ui/table/verifikasi-akun/VerifikasiAkunTable";

export default function ValidasiAkunPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Daftar Akun Baru untuk Diverifikasi
      </h1>

      <Breadcrumb
        homeHref="/admin/dashboard"
        items={[{ label: "Daftar Akun Baru" }]}
      />

      <Card className="p-8">
        <div className="space-y-6">
          <ValidasiAkunTable />
        </div>
      </Card>
    </div>
  );
}