export default function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-4 border-t border-border first:border-t-0 first:pt-0 space-y-2">
      <h3 className="text-sm font-semibold text-foreground">
        {title}
      </h3>

      <div>
        {children}
      </div>
    </div>
  );
}