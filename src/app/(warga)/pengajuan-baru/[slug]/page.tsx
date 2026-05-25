import { getSuratBySlug } from "@/features/surat/surat-config";
import { DynamicForm } from "@/features/surat/forms/dynamic-form/dynamic-form";
import { notFound } from "next/navigation";
import Card from "@/components/ui/Card/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SuratFormPage({ params }: Props) {
  const { slug } = await params;

  const surat = getSuratBySlug(slug);

  if (!surat) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">
        {surat.title}
      </h1>

      <Breadcrumb
        homeHref="/dashboard"
        items={[{ label: "Pengajuan Baru", href: "/pengajuan-baru" }, { label: surat.title }]}
      />

      <Card className="p-8">
        <DynamicForm slug={slug} />
      </Card>
    </div>
  );
}

/*
```

---

## Peran masing-masing folder
```
schemas/          → VALIDASI SAJA
                    Zod schema + type inference (UsahaFormValues)
                    Bisa diimpor di server action untuk validasi ulang di server

definitions/      → DEFINISI FIELD SAJA
                    Array FieldDefinition yang menentukan field apa yang dirender
                    Mengimpor schema dari schemas/ lalu meng-export ulang ke registry

form-registry.ts  → PETA SLUG → FORM
                    Satu-satunya file yang diedit saat mendaftarkan surat baru

dynamic-form.tsx  → ENGINE RENDER
                    Tidak perlu disentuh saat menambah surat baru

*/