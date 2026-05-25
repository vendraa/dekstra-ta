export interface UploadedDocument {
  id:         string;
  file:       File;
  previewUrl: string;
  error?: string;
}