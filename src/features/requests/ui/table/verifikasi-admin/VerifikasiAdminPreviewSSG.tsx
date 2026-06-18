import { LetterRequest } from "@/features/requests/types/types";
import { VerifikasiAdminPreviewContent } from "./VerifikasiAdminPreviewContent";

interface Props {
  data: LetterRequest[];
}

export function VerifikasiAdminPreviewSSG({ data }: Props) {
  return (
    <VerifikasiAdminPreviewContent data={data.slice(0, 5)} />
  );
}