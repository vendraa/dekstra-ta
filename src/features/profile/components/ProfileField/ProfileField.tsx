interface ProfileFieldProps {
  label: string;
  value: string;
}

export default function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-foreground/50">{label}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}