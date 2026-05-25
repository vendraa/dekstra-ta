import Image from "next/image";
import InitialAvatar from "@/components/ui/Avatar/InitialAvatar";

interface ProfileHeaderProps {
  name:     string;
  email:    string;
  role:     string;
  avatar?:  string;
  onEdit?:   () => void;
}

export default function ProfileHeader({
  name,
  email,
  role,
  avatar,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5">

      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          ) : (
            <InitialAvatar name={name} size={56} />
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <p className="font-heading font-bold text-foreground">{name}</p>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <span>{email}</span>
            <span className="text-border">|</span>
            <span>{role}</span>
          </div>
        </div>

      </div>

    </div>
  );
}