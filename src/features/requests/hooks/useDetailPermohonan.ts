"use client";

import { useEffect, useState } from "react";

import { DetailPermohonan }
  from "../types/detail-persetujuan.types";

import { getDetailPermohonanClient }
  from "@/services/detail-persetujuan/detail-persetujuan.client.service";

export function useDetailPermohonan(
  id: string
) {
  const [detail, setDetail] =
    useState<DetailPermohonan | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const result =
          await getDetailPermohonanClient(
            id
          );

        setDetail(result);

      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown Error"
        );

      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return {
    detail,
    loading,
    error,
  };
}