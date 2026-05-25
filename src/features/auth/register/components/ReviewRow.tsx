interface ReviewRowProps {
  label: string;
  children: React.ReactNode;
}

export default function ReviewRow({
  label,
  children,
}: ReviewRowProps) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12 md:items-center">
      <label className="text-sm font-medium text-foreground md:col-span-4">
        {label}
      </label>

      <div className="md:col-span-8">
        {children}
      </div>
    </div>
  );
}
