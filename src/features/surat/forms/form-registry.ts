import { SectionDefinition } from "./dynamic-form/types/form.types";
import { ZodObject, ZodRawShape } from "zod";

import { usahaSchemaWithSubmit, usahaSections } from "./definitions/layanan-umum/sk-usaha.definiton";
import { tempatUsahaSchemaWithSubmit, tempatUsahaSections } from "./definitions/layanan-umum/sk-tempat-usaha.definition";
import { pengantarBarangSchemaWithSubmit, pengantarBarangSections } from "./definitions/layanan-umum/sk-pengantar-barang.definition";
import { tidakMampuSekolahSections, tidakMampuSekolahSchemaWithSubmit } from "./definitions/layanan-umum/sk-tidak-mampu-sekolah.definition";
import { izinKeramaianSchemaWithSubmit, izinKeramaianSections } from "./definitions/layanan-umum/sk-izin-keramaian.definition";
import { pengantarSkckSchemaWithSubmit, pengantarSkckSections } from "./definitions/layanan-umum/sk-pengantar-skck.definition";
import { ahliWarisSchemaWithSubmit, ahliWarisSections } from "./definitions/layanan-umum/sk-ahli-waris.definition";
import { lainnyaSchemaWithSubmit, lainnyaSections } from "./definitions/layanan-umum/sk-lainnya.definition";

import { formulirKartukeluargaSchemaWithSubmit, formulirKartuKeluargaSections } from "./definitions/layanan-kependudukan/formulir-kartu-keluarga.definition";
import { pendaftaranPeristiwaKependudukanSchemaWithSubmit, pendaftaranPeristiwaKependudukanSections } from "./definitions/layanan-kependudukan/formulir-pendaftaran-peristiwa-kependudukan.definition";
import { formulirPermohonanKkBaruSchemaWithSubmit, formulirPermohonanKkBaruSections } from "./definitions/layanan-kependudukan/formulir-permohonan-kk-baru.definition";
import { formulirPerubahanKkSchemaWithSubmit, formulirPerubahanKkSections } from "./definitions/layanan-kependudukan/formulir-perubahan-kk.definition";
import { formulirPermohonanKtpSchemaWithSubmit, formulirPermohonanKtpSections } from "./definitions/layanan-kependudukan/formulir-permohonan-ktp.definition";
import { domisiliSchemaWithSubmit, domisiliSections } from "./definitions/layanan-kependudukan/sk-domisili.definition";
import { hilangKartuKeluargaSchemaWithSubmit, hilangKartuKeluargaSections } from "./definitions/layanan-kependudukan/sk-hilang-kartu-keluarga.definition";
import { pindahSchemaWithSubmit, pindahSections } from "./definitions/layanan-kependudukan/sk-pindah.definition";
import { pendaftaranPerpindahanPendudukSchemaWithSubmit, pendaftaranPerpindahanPendudukSections } from "./definitions/layanan-kependudukan/formulir-pendaftaran-perpindahan-penduduk.definition";
import { kelahiranSchemaWithSubmit, kelahiranSections } from "./definitions/layanan-kependudukan/sk-kelahiran.definition";
import { kematianSchemaWithSubmit, kematianSections } from "./definitions/layanan-kependudukan/sk-kematian.definition";

export interface FormRegistryEntry {
  title: string;
  sections: SectionDefinition[];
  schema: ZodObject<ZodRawShape>;
}

export const FORM_REGISTRY: Record<string, FormRegistryEntry> = {
  /* ---- Layanan Umum ---- */
  
  "surat-keterangan-usaha": {
    title: "SURAT KETERANGAN USAHA",
    sections: usahaSections,
    schema: usahaSchemaWithSubmit,
  },
  "surat-keterangan-tempat-usaha": {
    title: "SURAT KETERANGAN TEMPAT USAHA",
    sections: tempatUsahaSections,
    schema: tempatUsahaSchemaWithSubmit,
  },
  "surat-keterangan-pengantar-barang": {
    title: "SURAT KETERANGAN PENGANTAR BARANG",
    sections: pengantarBarangSections,
    schema: pengantarBarangSchemaWithSubmit,
  },
  "surat-keterangan-tidak-mampu-sekolah": {
    title: "SURAT KETERANGAN TIDAK MAMPU (SEKOLAH)",
    sections: tidakMampuSekolahSections,
    schema: tidakMampuSekolahSchemaWithSubmit,
  },
  "permohonan-izin-keramaian": {
    title: "PERMOHONAN IZIN KERAMAIAN / PESTA",
    sections: izinKeramaianSections,
    schema:   izinKeramaianSchemaWithSubmit,
  },
  "surat-pengantar-skck": {
    title: "SURAT PENGANTAR SKCK",
    sections: pengantarSkckSections,
    schema: pengantarSkckSchemaWithSubmit,
  },
  "surat-keterangan-ahli-waris": {
    title: "SURAT KETERANGAN AHLI WARIS",
    sections: ahliWarisSections,
    schema:   ahliWarisSchemaWithSubmit,
  },
  "surat-keterangan-lainnya": {
    title: "SURAT KETERANGAN LAINNYA",
    sections: lainnyaSections,
    schema: lainnyaSchemaWithSubmit,
  },

  /* ---- Layanan Kependudukan ---- */

  "formulir-kartu-keluarga": {
    title: "FORMULIR KARTU KELUARGA (F.1-01)",
    sections: formulirKartuKeluargaSections,
    schema: formulirKartukeluargaSchemaWithSubmit,
  },
  "formulir-pendaftaran-peristiwa-kependudukan": {
    title: "FORMULIR PENDAFTARAN PERISTIWA KEPENDUDUKAN (F-1.02)",
    sections: pendaftaranPeristiwaKependudukanSections,
    schema:   pendaftaranPeristiwaKependudukanSchemaWithSubmit,
  },
  "formulir-permohonan-kk-baru": {
    title: "FORMULIR PERMOHONAN KK BARU WNI (F-1.15)",
    sections: formulirPermohonanKkBaruSections,
    schema:   formulirPermohonanKkBaruSchemaWithSubmit,
  },
  "formulir-perubahan-kk": {
    title: "FORMULIR PERMOHONAN PERUBAHAN KK WNI (F-1.16)",
    sections: formulirPerubahanKkSections,
    schema:   formulirPerubahanKkSchemaWithSubmit,
  },
  "formulir-permohonan-ktp": {
    title: "FORMULIR PERMOHONAN KTP (F-1.21)",
    sections: formulirPermohonanKtpSections,
    schema: formulirPermohonanKtpSchemaWithSubmit,
  },
  "surat-keterangan-domisili": {
    title: "SURAT KETERANGAN DOMISILI",
    sections: domisiliSections,
    schema: domisiliSchemaWithSubmit,
  },
  "surat-keterangan-hilang-kartu-keluarga": {
    title: "SURAT KETERANGAN HILANG KARTU KELUARGA",
    sections: hilangKartuKeluargaSections,
    schema:   hilangKartuKeluargaSchemaWithSubmit,
  },
   "surat-keterangan-pindah": {
    title: "SURAT KETERANGAN PINDAH",
    sections: pindahSections,
    schema:   pindahSchemaWithSubmit,
  },
  "formulir-pendaftaran-perpindahan-penduduk": {
    title: "FORMULIR PENDAFTARAN PERPINDAHAN PENDUDUK (F-1.03)",
    sections: pendaftaranPerpindahanPendudukSections,
    schema: pendaftaranPerpindahanPendudukSchemaWithSubmit,
  },
    "surat-keterangan-kelahiran": {
    title: "SURAT KETERANGAN KELAHIRAN (F-2.01)",
    sections: kelahiranSections,
    schema: kelahiranSchemaWithSubmit,
  },
  "surat-keterangan-kematian": {
    title: "SURAT KETERANGAN KEMATIAN (F-2.29)",
    sections: kematianSections,
    schema: kematianSchemaWithSubmit,
  },
};

export function getFormBySlug(slug: string): FormRegistryEntry | null {
  return FORM_REGISTRY[slug] ?? null;
}