"use client";

import { useState }          from "react";
import { Upload }            from "lucide-react";
import { FileUploadValue }   from "@/components/ui/File-upload/upload.types";
import FileUploadField       from "@/components/ui/File-upload/FileUploadField";
import Button                from "@/components/ui/Button/Button";
import { DocumentFileTable } from "./document-file-table";
import { UploadedDocument } from "../../types/document-upload-step.types";

interface Props {
  documents: UploadedDocument[];            
  onChange:  (docs: UploadedDocument[]) => void; 
}

const EMPTY_FILE: FileUploadValue = { file: null, previewUrl: undefined };

const INSTRUCTIONS = [
  "Klik area upload atau seret file ke dalam kotak upload.",
  "Pastikan file dalam format JPG, PNG, atau PDF dengan ukuran maksimal 5 MB.",
  "Klik tombol \"Unggah File\" untuk menambahkan file ke daftar dokumen.",
  "Ulangi langkah di atas jika ingin menambahkan lebih dari satu dokumen.",
  "Klik ikon mata untuk melihat pratinjau atau ikon hapus untuk membatalkan.",
];

export function DocumentUploadStep({ documents, onChange }: Props) {
  const [currentFile, setCurrentFile] = useState<FileUploadValue>(EMPTY_FILE);
  const [error,       setError]       = useState<string>("");

  const MAX_SIZE_MB = 5;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

  const handleUpload = () => {
    const file = currentFile.file;

    if (!file) {
      setError("Pilih file terlebih dahulu sebelum mengunggah.");
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Format file tidak didukung. Gunakan JPG, PNG, atau PDF.");
      return;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      setError("Ukuran file maksimal 5 MB.");
      return;
    }

    const isDuplicate = documents.some(
      (doc) => doc.file.name === file.name
    );
    if (isDuplicate) {
      setError("File dengan nama yang sama sudah diunggah.");
      return;
    }

    const newDoc: UploadedDocument = {
      id: crypto.randomUUID(),
      file,
      previewUrl: currentFile.previewUrl ?? "",
    };

    onChange([...documents, newDoc]);
    setCurrentFile(EMPTY_FILE);
    setError("");
  };

  const handleRemove = (id: string) => {
    const updated = documents.filter((doc) => {
      if (doc.id === id) {
        URL.revokeObjectURL(doc.previewUrl);
        return false;
      }
      return true;
    });
    onChange(updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ── Kiri: Upload area ── */}
      <div className="space-y-4">
        <div className="border-b border-border pb-3 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Unggah Dokumen
          </h3>

          <ul className="space-y-2 rounded-lg bg-primary/5 border border-primary/20 px-4 py-3">
            {INSTRUCTIONS.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/20
                                 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                </span>
                <span className="text-xs text-primary/80 leading-snug">
                  {step}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted-foreground">
            Upload dokumen bersifat opsional. Lewati langkah ini jika tidak ada
            dokumen pendukung yang perlu dilampirkan.
          </p>
        </div>

        <FileUploadField
          title="Pilih Dokumen"
          value={currentFile}
          onChange={(val) => {
            setCurrentFile(val);
            setError("");
          }}
          accept={["image/*", "application/pdf"]}
          displayFormats={["JPG", "PNG", "PDF"]}
          maxSize={5}
          error={error}
          helperText="Foto KTP, KK, atau dokumen pendukung lainnya"
        />

        <Button
          type="button"
          fullWidth
          onClick={handleUpload}
          disabled={!currentFile.file || !!error}
          className="flex items-center justify-center gap-2 bg-primary text-white
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload size={15} />
          Unggah File
        </Button>
      </div>

      {/* ── Kanan: Tabel daftar file ── */}
      <div className="space-y-4">
        <div className="border-b border-border pb-2">
          <h3 className="text-sm font-semibold text-foreground">
            Daftar Dokumen
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {documents.length === 0
              ? "Belum ada dokumen yang diunggah"
              : `${documents.length} dokumen diunggah`}
          </p>
        </div>

        <DocumentFileTable
          documents={documents}
          onRemove={handleRemove}
        />
      </div>

    </div>
  );
}