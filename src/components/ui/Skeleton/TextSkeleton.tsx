interface TextSkeletonProps {
  width?: string;
  height?: string;
}

export function TextSkeleton({
  width = "w-64",
  height = "h-6",
}: TextSkeletonProps) {
  return (
    <div
      className={`${width} ${height} bg-muted animate-pulse rounded-md`}
    />
  );
}