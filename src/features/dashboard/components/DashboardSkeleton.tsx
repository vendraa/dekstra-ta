import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              shadow-card
              p-6
              space-y-4
            "
          >
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-20" />
          </div>
        ))}
      </div>

      {/* Table + Progress */}
      <div className="grid grid-cols-3 gap-5">

        {/* Preview Table */}
        <div className="col-span-2">
          <div
            className="
              bg-white
              rounded-2xl
              shadow-card
              p-6
              space-y-4
            "
          >
            <Skeleton className="h-6 w-48" />

            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-12 w-full"
              />
            ))}
          </div>
        </div>

        {/* Progress */}
        <div>
          <div
            className="
              bg-white
              rounded-2xl
              shadow-card
              p-6
              space-y-5
            "
          >
            <Skeleton className="h-6 w-32" />

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="space-y-2"
              >
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Chart */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-card
          p-6
          space-y-4
        "
      >
        <Skeleton className="h-6 w-64" />

        <Skeleton className="h-80 w-full" />
      </div>

    </div>
  );
}