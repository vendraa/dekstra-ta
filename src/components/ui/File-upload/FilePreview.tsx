"use client"

import Image from "next/image"

interface Props {
  src: string
  file: File | null
  onRemove?: () => void
  showActions?: boolean
}

export default function FilePreview({
  src,
  file,
  onRemove,
  showActions = true,
}: Props) {

  const fileName = file?.name ?? ""
  const fileType = file?.type ?? ""

  const isImage = fileType.startsWith("image/")
  const isPdf = fileType === "application/pdf"

  return (
    <div className="relative border border-border rounded-xl overflow-hidden">

      <div className="relative w-full aspect-3/2 bg-surface/60 flex items-center justify-center">

        {isPdf && (
          <iframe
            src={src}
            className="w-full h-full"
          />
        )}

        {isImage && (
          <Image
            src={src}
            alt={fileName}
            fill
            className="object-contain p-2"
            unoptimized
          />
        )}

      </div>

      {showActions && onRemove && (
        <button
          onClick={onRemove}
          className="
          absolute top-2 right-2
          bg-muted text-white
          text-xs px-2 py-1 rounded
          hover:bg-black/30
          "
        >
          Hapus
        </button>
      )}

      <div className="p-3 flex items-center justify-between text-sm border-t border-border">

        <span className="truncate">
          {fileName}
        </span>

        {fileType && (
          <span className="text-xs bg-surface px-2 py-1 rounded">
            {fileType.split("/")[1]?.toUpperCase()}
          </span>
        )}

      </div>
    </div>
  )
}