"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { FileUploadFieldProps } from "./upload.types"
import FilePreview from "./FilePreview"

export default function FileUploadField({
  label,
  title,
  value,
  onChange,
  accept = ["image/*"],
  displayFormats,
  maxSize = 1,
  error,
  helperText,
  disabled = false,
}: FileUploadFieldProps) {

  const [dragActive, setDragActive] = useState(false)

  function validateFile(file: File) {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Ukuran file maksimal ${maxSize}MB`)
      return false
    }

    if (accept.length) {
      const valid = accept.some(type =>
        type === "image/*"
          ? file.type.startsWith("image/")
          : file.type === type
      )
      if (!valid) {
        alert("Format file tidak didukung")
        return false
      }
    }

    return true
  }

  function processFile(file: File) {
    if (!validateFile(file)) return
    const previewUrl = URL.createObjectURL(file)
    onChange({ file, previewUrl })
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    processFile(file)
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    processFile(file)
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragActive(true)
  }

  function handleDragLeave() {
    setDragActive(false)
  }

  function removeFile() {
    if (value.previewUrl) URL.revokeObjectURL(value.previewUrl)
    onChange({ file: null, previewUrl: undefined })
  }

  const formatText =
    displayFormats?.join(", ") ??
    accept.map(f => f.replace("image/", "").toUpperCase()).join(", ")

  return (
    <div className="flex flex-col gap-2">

      <label className="font-medium text-sm">
        {label}
      </label>

      {!value.previewUrl ? (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border border-border rounded-xl
            flex flex-col items-center justify-center
            cursor-pointer transition
            bg-surface/40
            gap-1 px-4

            /* Mobile: lebih compact */
            h-36 py-4
            /* Desktop: lebih tinggi */
            sm:h-48 sm:py-6

            ${dragActive ? "border-primary bg-primary/5" : "hover:bg-gray-300/30"}
            ${disabled ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          {/* Icon — lebih kecil di mobile */}
          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-foreground mb-1" />

          {/* Drag & drop hint — sembunyikan di mobile karena tidak relevan */}
          <p className="hidden sm:block text-xs text-muted text-center">
            Drag & drop file atau klik untuk upload
          </p>

          {/* Tap to upload hint — hanya tampil di mobile */}
          <p className="block sm:hidden text-xs text-muted text-center">
            Ketuk untuk upload
          </p>

          {/* Title */}
          <p className="text-xs sm:text-sm font-bold text-center leading-tight">
            {title}
          </p>

          {/* Format info */}
          <p className="text-xs text-foreground text-center">
            {formatText} maks {maxSize} MB
          </p>

          {helperText && (
            <p className="text-xs text-muted text-center">
              {helperText}
            </p>
          )}

          <input
            type="file"
            accept={accept.join(",")}
            onChange={handleFile}
            className="hidden"
            disabled={disabled}
          />
        </label>
      ) : (
        <FilePreview
          src={value.previewUrl}
          file={value.file}
          onRemove={removeFile}
        />
      )}

      {error && (
        <span className="text-danger text-xs">
          {error}
        </span>
      )}

    </div>
  )
}