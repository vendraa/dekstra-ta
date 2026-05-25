export async function downloadBerkas(token: string): Promise<void> {
  const res = await fetch(`/api/berkas/${token}`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  const blob = await res.blob();

  // 🔥 ambil filename dari header (kalau ada)
  const disposition = res.headers.get("content-disposition");
  let filename = "berkas.pdf";

  if (disposition) {
    const match = disposition.match(/filename="?(.+?)"?$/);
    if (match) filename = match[1];
  }

  // 🔥 trigger download
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
}