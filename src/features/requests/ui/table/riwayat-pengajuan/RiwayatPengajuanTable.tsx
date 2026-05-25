"use client";

import { useCallback } from "react";
import Table from "@/components/ui/Table/Table";

import { LetterRequest } from "@/features/requests/types/types";
import { riwayatRequestColumns } from "./columns";

import { TableFilterButton } from "@/components/ui/Table/TableFilters/TableFilterButton";
import FilterSection from "@/components/ui/Table/TableFilters/FilterSection";
import { TableSelectFilter } from "@/components/ui/Table/TableFilters/TableSelectFilter";
import { TableDateRangeFilter } from "@/components/ui/Table/TableFilters/TableDateRangeFilter";

import { TableQuery, TableResult } from "@/components/ui/Table/types";

import { getRiwayatPengajuan } from "@/features/requests/services/riwayat-pengajuan.service";

export function RiwayatPengajuanTable() {
  const fetchRiwayat = useCallback(
    async (params: TableQuery): Promise<TableResult<LetterRequest>> => {
      let allData: LetterRequest[] = [];

      try {
        allData = await getRiwayatPengajuan();
      } catch (error) {
        console.error("Fetch riwayat gagal:", error);
        return {
          data: [],
          totalRows: 0,
        };
      }

      let result = allData.filter(
        (item) =>
          item.lifecycle === "COMPLETED" ||
          item.lifecycle === "REJECTED"
      );

      if (params.search) {
        const keyword = params.search.toLowerCase();

        result = result.filter(
          (item) =>
            item.nomorPermohonan.toLowerCase().includes(keyword) ||
            item.name.toLowerCase().includes(keyword) ||
            item.letterType.toLowerCase().includes(keyword)
        );
      }

      if (params.filters?.length) {
        params.filters.forEach((filter) => {
          if (filter.id === "status") {
            result = result.filter(
              (item) => item.currentStep === filter.value
            );
          }

          if (filter.id === "letterType") {
            result = result.filter(
              (item) => item.letterType === filter.value
            );
          }

          if (filter.id === "createdAt") {
            const { from, to } = filter.value as {
              from?: string;
              to?: string;
            };

            result = result.filter((item) => {
              const date = new Date(item.createdAt).getTime();

              if (from && date < new Date(from).getTime()) return false;
              if (to && date > new Date(to).getTime()) return false;

              return true;
            });
          }
        });
      }

      const start = params.pageIndex * params.pageSize;
      const end = start + params.pageSize;

      return {
        data: result.slice(start, end),
        totalRows: result.length,
      };
    },
    []
  );

  return (
    <Table<LetterRequest>
      columns={riwayatRequestColumns}
      mode="server"
      fetchData={fetchRiwayat}
      initialPageSize={10}
      filters={
        <TableFilterButton>
          {(draftFilters, setDraftFilters) => {
            const getValue = (id: string) =>
              draftFilters.find((f) => f.id === id)?.value as string | undefined;

            const setValue = (id: string, value?: string) => {
              setDraftFilters((prev) => {
                const others = prev.filter((f) => f.id !== id);
                if (!value) return others;
                return [...others, { id, value }];
              });
            };

            const getRangeValue = (id: string) =>
              draftFilters.find((f) => f.id === id)?.value as
                | { from?: string; to?: string }
                | undefined;

            const setRangeValue = (
              id: string,
              value?: { from?: string; to?: string }
            ) => {
              setDraftFilters((prev) => {
                const others = prev.filter((f) => f.id !== id);
                if (!value) return others;
                return [...others, { id, value }];
              });
            };

            return (
              <div className="space-y-6">

                <FilterSection title="Berdasarkan Status Surat">
                  <TableSelectFilter
                    value={getValue("status")}
                    onChange={(v) => setValue("status", v)}
                    options={[
                      { label: "Menynggy Verifikasi RT", value: "RT_REVIEW" },
                      { label: "Menunggu Verifikasi RW", value: "RW_REVIEW" },
                      { label: "Menunggu Verifikasi Admin", value: "ADMIN_REVIEW" },
                      { label: "Menunggu Persetujuan Kades", value: "KADES_SIGN" },
                      { label: "Disetujui", value: "COMPLETED" },
                      { label: "Ditolak", value: "REJECTED" },
                    ]}
                  />
                </FilterSection>

                <FilterSection title="Berdasarkan Jenis Surat">
                  <TableSelectFilter
                    value={getValue("letterType")}
                    onChange={(v) => setValue("letterType", v)}
                    options={[
                      { label: "Surat Keterangan Usaha", value: "Surat Keterangan Usaha" },
                      { label: "Surat Keterangan Tempat Usaha", value: "Surat Keterangan Tempat Usaha" },
                      { label: "Surat Keterangan Pengantar Barang", value: "Surat Keterangan Pengantar Barang" },
                      { label: "Surat Keterangan Tidak Mampu (Sekolah)", value: "Surat Keterangan Tidak Mampu (Sekolah)" },
                      { label: "Permohonan Izin Keramaian/Pesta", value: "Permohonan Izin Keramaian/Pesta" },
                      { label: "Surat Pengantar SKCK", value: "Surat Pengantar SKCK" },
                      { label: "Surat Keterangan Ahli Waris", value: "Surat Keterangan Ahli Waris" },
                      { label: "Surat Keterangan Lainnya", value: "Surat Keterangan Lainnya" },
                      { label: "Formulir Kartu Keluarga (F-1.01)", value: "Formulir Kartu Keluarga (F-1.01)" },
                      { label: "Formulir Pendaftaran Peristiwa Kependudukan (F-1.02)", value: "Formulir Pendaftaran Peristiwa Kependudukan (F-1.02)" },
                      { label: "Formulir Permohonan KK Baru WNI (F-1.15)", value: "Formulir Permohonan KK Baru WNI (F-1.15)" },
                      { label: "Formulir Permohonan Perubahan KK WNA (F-1.16)", value: "Formulir Permohonan Perubahan KK WNA (F-1.16)" },
                      { label: "Formulir Permohonan KTP (F-1.21)", value: "Formulir Permohonan KTP (F-1.21)" },
                      { label: "Surat Keterangan Domisili", value: "Surat Keterangan Domisili" },
                      { label: "Surat Keterangan Hilang Kartu Keluarga", value: "Surat Keterangan Hilang Kartu Keluarga" },
                      { label: "Surat Keterangan Pindah", value: "Surat Keterangan Pindah" },
                      { label: "Formulir Pendaftaran Perpindahan Penduduk (F-1.03)", value: "Formulir Pendaftaran Perpindahan Penduduk (F-1.03)" },
                      { label: "Surat Keterangan Kelahiran (F-2.01)", value: "Surat Keterangan Kelahiran (F-2.01)" },
                      { label: "Surat Keterangan Kematian (F-2.29)", value: "Surat Keterangan Kematian (F-2.29)" },
                    ]}
                  />
                </FilterSection>

                <FilterSection title="Berdasarkan Tanggal Pengajuan">
                  <TableDateRangeFilter
                    value={getRangeValue("createdAt")}
                    onChange={(v) => setRangeValue("createdAt", v)}
                  />
                </FilterSection>

              </div>
            );
          }}
        </TableFilterButton>
      }
    />
  );
}