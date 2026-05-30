import FilterSection from "@/components/ui/Table/TableFilters/FilterSection";
import { TableFilterButton } from "@/components/ui/Table/TableFilters/TableFilterButton";
import { TableSelectFilter } from "@/components/ui/Table/TableFilters/TableSelectFilter";
import { TableDateRangeFilter } from "@/components/ui/Table/TableFilters/TableDateRangeFilter";

export function DashboardWargaFilters() {
    return (
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
    )
}