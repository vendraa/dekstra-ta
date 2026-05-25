"use client";

type Props = {
  rows?: number;
  columns: number;
};

export function TableSkeleton({ rows = 5, columns }: Props) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          {Array.from({ length: columns }).map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-4 w-full rounded bg-muted" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
