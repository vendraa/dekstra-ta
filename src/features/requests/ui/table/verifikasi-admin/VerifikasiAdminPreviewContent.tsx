import Table
  from "@/components/ui/Table/Table";

import { LetterRequest }
  from "@/features/requests/types/types";

import { validasiAdminPreviewColumns }
  from "./preview-columns";

interface Props {
  data: LetterRequest[];
}

export function VerifikasiAdminPreviewContent({
  data,
}: Props) {
  return (
    <Table<LetterRequest>
      columns={
        validasiAdminPreviewColumns
      }
      data={data}
      mode="client"
      initialPageSize={5}
      showPagination={false}
      showSearch={false}
      showPageSize={false}
    />
  );
}