"use client";

import { Eye, Trash2 } from "lucide-react";
import { UploadedDocument } from "../../types/document-upload-step.types";

interface Props {
  documents: UploadedDocument[];
  onRemove: (id: string) => void;
}

/**
 * Format file size to human readable
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentFileTable({ documents, onRemove }: Props) {
  if (!documents.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-50 text-sm text-muted-foreground gap-2">
        <p>Belum ada file yang diunggah</p>
        <p className="text-xs">
          Upload file di sebelah kiri lalu klik “Unggah File”
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        {/* HEADER */}
        <thead>
          <tr className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground">
            <th className="px-4 py-3 w-10 text-left">No</th>
            <th className="px-4 py-3 text-left">Nama File</th>
            <th className="px-4 py-3 w-24 text-left">Ukuran</th>
            <th className="px-4 py-3 w-24 text-center">Aksi</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {documents.map((doc, index) => {
            const fileName = doc.file?.name ?? "-";
            const fileSize = doc.file?.size ?? 0;

            return (
              <tr
                key={doc.id}
                className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
              >
                {/* No */}
                <td className="px-4 py-3 text-muted-foreground">
                  {index + 1}
                </td>

                {/* File Name */}
                <td className="px-4 py-3">
                  <span
                    className="block max-w-55 truncate font-medium text-foreground"
                    title={fileName}
                  >
                    {fileName}
                  </span>

                  {doc.error && (
                    <span className="text-xs text-danger">
                      {doc.error}
                    </span>
                  )}
                </td>

                {/* File Size */}
                <td className="px-4 py-3 text-muted-foreground">
                  {formatFileSize(fileSize)}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    {/* Preview */}
                    {doc.previewUrl ? (
                      <a
                        href={doc.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!doc.previewUrl) {
                            e.preventDefault();
                          }
                        }}
                        className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                        title="Lihat file"
                      >
                        <Eye size={15} />
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">Tidak tersedia</span>
                    )}

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onRemove(doc.id)}
                      className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
                      title="Hapus file"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}