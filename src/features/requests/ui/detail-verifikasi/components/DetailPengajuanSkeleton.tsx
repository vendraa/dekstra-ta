import Card from "@/components/ui/Card/Card";

import { TextSkeleton } from "@/components/ui/Skeleton/TextSkeleton";

export function DetailPengajuanSkeleton() {
  return (
    <div className="space-y-4 px-6">
      <TextSkeleton
        width="w-72"
        height="h-8"
      />

      <Card className="p-6 space-y-4">
        <TextSkeleton
          width="w-48"
          height="h-5"
        />

        <TextSkeleton
          width="w-32"
          height="h-5"
        />

        <TextSkeleton
          width="w-full"
          height="h-24"
        />
      </Card>

      <Card className="p-6">
        <TextSkeleton
          width="w-full"
          height="h-40"
        />
      </Card>
    </div>
  );
}