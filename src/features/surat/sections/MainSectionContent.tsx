"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  SuratCategory,
  SuratConfig,
} from "@/features/surat/surat-config";

import { SuratTabs } from "@/features/surat/components/surat-tabs";
import { SuratSearch } from "@/features/surat/components/surat-search";
import { SuratGrid } from "@/features/surat/components/surat-grid";

interface Props {
  suratData: SuratConfig[];
  basePath: string;
}

export function MainSectionContent({
  suratData,
  basePath,
}: Props) {
  const router = useRouter();

  const [category, setCategory] =
    useState<SuratCategory>("umum");

  const [search, setSearch] =
    useState("");

  const suratList = useMemo(() => {
    const byCategory =
      suratData.filter(
        (item) =>
          item.category === category
      );

    if (!search.trim()) {
      return byCategory;
    }

    const keyword =
      search.toLowerCase();

    return byCategory.filter(
      (surat) =>
        surat.title
          .toLowerCase()
          .includes(keyword) ||
        surat.description
          .toLowerCase()
          .includes(keyword)
    );
  }, [
    suratData,
    category,
    search,
  ]);

  function handleSelect(
    slug: string
  ) {
    router.push(
      `${basePath}/${slug}`
    );
  }

  return (
    <div className="space-y-4">
      <SuratTabs
        value={category}
        onChange={setCategory}
      />

      <SuratSearch
        value={search}
        onChange={setSearch}
      />

      <SuratGrid
        items={suratList}
        onSelect={handleSelect}
      />
    </div>
  );
}