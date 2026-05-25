import { ReactNode } from "react";
import clsx from "clsx";

export function TableWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <thead className="bg-surface font-heading font-bold text-sm text-foreground">
      {children}
    </thead>
  );
}

export function TableBody({
  children,
}: {
  children: ReactNode;
}) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={clsx(
        "border-b border-border/40 hover:bg-surface transition",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  className,
  as = "td",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
  as?: "td" | "th";
}) {
  const Component = as;

  return (
    <Component
      className={clsx(
        "px-4 py-3 text-sm text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
