import { FileUploadValue } from "@/components/ui/File-upload/upload.types"

export type DocumentUploadErrors = {
  kkFile?: string
  ktpFile?: string
}

export function validateDocumentUpload(data: {
  kkFile: FileUploadValue
  ktpFile: FileUploadValue
}): DocumentUploadErrors {

  const errors: DocumentUploadErrors = {}

  if (!data.kkFile?.file) {
    errors.kkFile = "Dokumen Kartu Keluarga wajib diunggah"
  }

  if (!data.ktpFile?.file) {
    errors.ktpFile = "Dokumen KTP wajib diunggah"
  }

  return errors
}