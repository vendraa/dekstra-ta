import { VerifikasiAdminPreviewContent } from "./VerifikasiAdminPreviewContent";
import { LetterRequest } from "@/features/requests/types/types";

export function VerifikasiAdminPreviewSSR({
  data,
}: {
  data: LetterRequest[];
}) {
  return (
    <VerifikasiAdminPreviewContent data={data.slice(0, 5)} />
  );
}