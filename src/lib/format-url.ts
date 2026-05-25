export function formatNomorToSlug(nomor: string): string {
  return nomor.replaceAll("/", "-");
}