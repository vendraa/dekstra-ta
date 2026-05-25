export interface FileUploadValue {
  file: File | null
  previewUrl?: string
}

export interface FileUploadFieldProps {
  label?: string
  title: string

  value: FileUploadValue
  onChange: (value: FileUploadValue) => void

  accept?: string[]
  displayFormats?: string[]

  maxSize?: number

  error?: string
  helperText?: string
  disabled?: boolean
}