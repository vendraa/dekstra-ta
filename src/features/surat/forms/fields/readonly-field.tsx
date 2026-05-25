interface BaseFieldProps {
  label: string;
  className?: string;
}

interface ReadOnlyFieldProps extends BaseFieldProps {
  value: string;
}

export function ReadOnlyField({
  label,
  value,
  className,
}: ReadOnlyFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className={`
        w-146 rounded-lg border border-border 
        bg-surface px-4 py-2 text-foreground/60
        cursor-not-allowed
        `}
      >
        {value}
      </div>
    </div>
  );
}