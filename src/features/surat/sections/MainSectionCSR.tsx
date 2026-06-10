"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  SuratConfig,
} from "@/features/surat/surat-config";

import {
  getSuratClient,
} from "@/features/surat/services/surat.client.service";

import {
  MainSectionContent,
} from "./MainSectionContent";

export function MainSectionCSR() {
  const [data, setData] =
    useState<SuratConfig[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result =
          await getSuratClient();

      console.log(
        "SURAT DATA:",
        result
      );

        setData(result);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <MainSectionContent
      suratData={data}
      basePath="/pengajuan-baru-csr"
    />
  );
}