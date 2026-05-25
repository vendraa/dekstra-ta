"use client";

import { useState } from "react";
import Card from "@/components/ui/Card/Card";
import { formatDateTime } from "@/lib/date-formatter";

type Berkas = {
  id: number;
  file_url: string;
  diunggah_at: string;
};

interface Props {
  berkas: Berkas[];
}

export function DetailPengajuanBerkasTable({ berkas }: Props) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const getFileName = (url: string) => {
    return url.split("/").pop() || "Berkas";
  };

  const getFileType = (url: string) => {

    const lowerUrl = url.toLowerCase();

    // =========================
    // PDF
    // =========================

    if (
      lowerUrl.includes(".pdf")
    ) {
      return "pdf";
    }

    // =========================
    // IMAGE
    // =========================

    if (
      lowerUrl.includes(".jpg") ||
      lowerUrl.includes(".jpeg") ||
      lowerUrl.includes(".png") ||
      lowerUrl.includes(".webp") ||

      // 🔥 CLOUDINARY IMAGE URL
      lowerUrl.includes("/image/upload/")
    ) {
      return "image";
    }

    return "other";
  };

  if (!berkas || berkas.length === 0) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">
        Tidak ada berkas yang diunggah.
      </Card>
    );
  }

  const fileType = selectedFile ? getFileType(selectedFile) : null;

  return (
    <>
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-heading font-semibold">
          Berkas Permohonan
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-2xl">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-2">Nama Berkas</th>
                <th className="text-left px-4 py-2">Tanggal Upload</th>
                <th className="text-center px-4 py-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {berkas.map((file) => (
                <tr key={file.id} className="border-t border-border">
                  <td className="px-4 py-2">
                    {getFileName(file.file_url)}
                  </td>

                  <td className="px-4 py-2">
                    {formatDateTime(file.diunggah_at)}
                  </td>

                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setSelectedFile(file.file_url)}
                      className="text-primary hover:underline"
                    >
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 🔥 MODAL VIEWER */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="w-[90%] h-[90%] bg-white rounded-lg overflow-hidden relative flex flex-col">

            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-border">
              <span className="text-sm font-medium">
                {getFileName(selectedFile)}
              </span>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-sm bg-black text-white px-3 py-1 rounded"
              >
                Tutup
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex items-center justify-center bg-gray-100">

              {/* IMAGE */}
              {fileType === "image" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={selectedFile}
                    alt="preview"
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                />
              )}

              {/* PDF */}
              {fileType === "pdf" && (
                <embed
                  src={selectedFile}
                  type="application/pdf"
                  className="w-full h-full"
                />
              )}

              {/* FALLBACK */}
              {fileType === "other" && (
                <div className="text-center text-sm text-muted-foreground">
                  <p>Preview tidak tersedia untuk file ini.</p>
                  <a
                    href={selectedFile}
                    target="_blank"
                    className="text-primary underline mt-2 inline-block"
                  >
                    Buka di tab baru
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}