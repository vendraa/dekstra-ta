import {
  SURAT_LIST,
  SuratConfig,
} from "../surat-config";

export async function getSuratStatic(): Promise<SuratConfig[]> {
  return SURAT_LIST;
}