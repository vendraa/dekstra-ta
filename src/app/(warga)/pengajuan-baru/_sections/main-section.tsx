"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SuratTabs } from "@/features/surat/components/surat-tabs";
import { SuratSearch } from "@/features/surat/components/surat-search";
import { SuratGrid } from "@/features/surat/components/surat-grid";
import { SuratCategory, getSuratByCategory } from "@/features/surat/surat-config";

export function MainSection() {
  const router = useRouter();
  const [category, setCategory] = useState<SuratCategory>("umum");
  const [search, setSearch] = useState("");

  const suratList = useMemo(() => {
    const byCategory = getSuratByCategory(category);
    if (!search.trim()) return byCategory;

    const keyword = search.toLowerCase();
    return byCategory.filter(
      (surat) =>
        surat.title.toLowerCase().includes(keyword) ||
        surat.description.toLowerCase().includes(keyword)
    );
  }, [category, search]);

  const handleCategoryChange = (value: SuratCategory) => {
    setCategory(value);
    setSearch("");
  };

  const handleSelect = (slug: string) => {
    router.push(`/pengajuan-baru/${slug}`);
  };

  return (
    <div className="space-y-4">
      <SuratTabs value={category} onChange={handleCategoryChange} />
      <SuratSearch value={search} onChange={setSearch} />
      <SuratGrid items={suratList} onSelect={handleSelect} />
    </div>
  );
}