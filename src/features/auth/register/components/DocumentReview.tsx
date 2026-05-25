"use client"

import FilePreview from "@/components/ui/File-upload/FilePreview"
import FileUploadField from "@/components/ui/File-upload/FileUploadField"
import { FileUploadValue } from "@/components/ui/File-upload/upload.types"

interface Props {
  label:           string
  uploadLabel?:    string
  uploadTitle:     string
  displayFormats?: string[]
  value:           FileUploadValue
  onChange:        (value: FileUploadValue) => void
  onRemove:        () => void
}

export default function DocumentReviewRow({
  label,
  uploadTitle,
  displayFormats,
  value,
  onChange,
  onRemove,
}: Props) {

  const hasFile = !!value.file

  return (
    <div className="
      flex flex-col gap-2
      sm:grid sm:grid-cols-[220px_1fr] sm:gap-6 sm:items-start
    ">
      {/* Label — di mobile tampil di atas, di desktop tampil di kiri */}
      <p className="text-sm font-medium text-foreground">
        {label}
      </p>

      {hasFile ? (
        <FilePreview
          src={value.previewUrl ?? ""}
          file={value.file}
          onRemove={onRemove}
          showActions
        />
      ) : (
        <FileUploadField
          label=""
          title={uploadTitle}
          value={value}
          onChange={onChange}
          accept={["image/jpeg", "image/png", "application/pdf"]}
          displayFormats={displayFormats}
          maxSize={2}
        />
      )}
    </div>
  )
}