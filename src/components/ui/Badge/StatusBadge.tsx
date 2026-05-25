import clsx from "clsx";

type Props = {
  label: string;
  className: string;
};

export default function StatusBadge({ label, className }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        className
      )}
    >
      {label}
    </span>
  );
}