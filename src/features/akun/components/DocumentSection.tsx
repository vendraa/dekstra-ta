"use client";

import { useState } from "react";
import { Account } from "@/features/akun/types/akun.types";
import Card from "@/components/ui/Card/Card";

type FileItem = {
  label: string;
  url: string | undefined;
};

interface Props {
  account: Account;
}

export default function DocumentSection({ account }: Props) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const files: FileItem[] = [
    {
      label: "Foto Kartu Tanda Penduduk (KTP)",
      url: account.ktpUrl,
    },
    {
      label: "Foto Kartu Keluarga (KK)",
      url: account.kkUrl,
    },
  ];

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

  const fileType = selectedFile ? getFileType(selectedFile) : null;

  const validFiles = files.filter((f) => f.url);

  if (validFiles.length === 0) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">
        Tidak ada dokumen yang tersedia.
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Dokumen Pendukung
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-2xl">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-2">Nama Dokumen</th>
                <th className="text-center px-4 py-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {validFiles.map((file, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="px-4 py-2">
                    {file.label}
                  </td>

                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setSelectedFile(file.url!)}
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