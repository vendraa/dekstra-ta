import {
  SURAT_LIST,
  SuratConfig,
} from "../surat-config";

export async function getSuratClient(): Promise<SuratConfig[]> {
  return [...SURAT_LIST];
}