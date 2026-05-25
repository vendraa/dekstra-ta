"use client"

import { useState } from "react"
import { useRegister } from "../../context/RegisterContext"
import FileUploadField from "@/components/ui/File-upload/FileUploadField"
import Button from "@/components/ui/Button/Button"
import {
  validateDocumentUpload,
  type DocumentUploadErrors,
} from "../../validations/step-document-upload.validation"

export default function RegisterStepDocumentUpload() {

  const { state, dispatch } = useRegister()
  const [errors, setErrors] = useState<DocumentUploadErrors>({})

  function handleNext() {

    const validationErrors = validateDocumentUpload({
      kkFile: state.kkFile,
      ktpFile: state.ktpFile,
    })

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    dispatch({ type: "NEXT_STEP" })
  }

  return (
    <div className="flex flex-col gap-10">

      <div className="grid grid-cols-1 gap-6">

        <FileUploadField
          label="Foto Kartu Keluarga (KK)"
          title="Unggah Dokumen Kartu Keluarga (KK)"
          value={state.kkFile}
          onChange={(value) =>
            dispatch({
              type: "SET_FIELD",
              field: "kkFile",
              value,
            })
          }
          accept={["image/jpeg","image/png","application/pdf"]}
          displayFormats={["Unggah dokumen dengan format JPG, JPEG, PNG"]}
          maxSize={2}
          error={errors.kkFile}
        />

        <FileUploadField
          label="Foto Kartu Tanda Penduduk (KTP)"
          title="Unggah Dokumen Kartu Tanda Penduduk (KTP)"
          value={state.ktpFile}
          onChange={(value) =>
            dispatch({
              type: "SET_FIELD",
              field: "ktpFile",
              value,
            })
          }
          accept={["image/jpeg","image/png","application/pdf"]}
          displayFormats={["Unggah dokumen dengan format JPG, JPEG, PNG"]}
          maxSize={2}
          error={errors.ktpFile}
        />

      </div>

      <div className="flex gap-4 pt-4">

        <Button
          onClick={() => dispatch({ type: "PREV_STEP" })}
          className="flex-1 bg-muted text-foreground hover:bg-surface"
        >
          KEMBALI
        </Button>

        <Button
          onClick={handleNext}
          className="flex-2 bg-primary text-white"
        >
          LANJUT
        </Button>

      </div>

    </div>
  )
}