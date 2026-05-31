import {
  SURAT_LIST,
  SuratConfig,
} from "../surat-config";

export async function getSuratServer(): Promise<SuratConfig[]> {
  return SURAT_LIST;
}