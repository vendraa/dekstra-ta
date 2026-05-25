import NotificationMenu from "@/components/ui/Notification/NotificationMenu";
import UserMenu from "./UserMenu/UserMenu";

type UserRole =
  | "WARGA"
  | "RT"
  | "RW"
  | "ADMIN"
  | "KADES";

interface Props {
  role: UserRole;
}

export default function HeaderRight({
  role,
}: Props) {
  return (
    <div className="flex items-center gap-5">
      <NotificationMenu
        role={role}
        buttonClassName="border border-white hover:bg-surface/30"
        iconClassName="text-white"
      />

      <UserMenu />
    </div>
  );
}