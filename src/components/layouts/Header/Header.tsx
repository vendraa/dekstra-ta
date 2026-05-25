import HeaderLeft from "./_components/HeaderLeft";
import HeaderRight from "./_components/HeaderRight";

type UserRole =
  | "WARGA"
  | "RT"
  | "RW"
  | "ADMIN"
  | "KADES";

interface Props {
  role: UserRole;
}

export default function Header({
  role,
}: Props) {
  return (
    <header
      className="
        w-full
        h-16
        bg-primary
        px-6
        flex
        items-center
        rounded-bl-[40px]
        rounded-br-[40px]
        shadow-2xl
        relative
        z-50
      "
    >
      <div className="w-full flex items-center justify-between">
        <HeaderLeft />

        <HeaderRight role={role} />
      </div>
    </header>
  );
}