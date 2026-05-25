import ProfileField from "../ProfileField/ProfileField";

interface FieldItem {
  label: string;
  value: string;
}

interface ProfileSectionProps {
  title:  string;
  fields: FieldItem[];
}

export default function ProfileSection({ title, fields }: ProfileSectionProps) {
  return (
    <div className="px-6 py-5 space-y-5">
      <h3 className="font-heading font-bold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fields.map((field, index) => (
          <ProfileField key={index} label={field.label} value={field.value} />
        ))}
      </div>
    </div>
  );
}