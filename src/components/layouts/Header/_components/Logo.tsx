import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/dashboard">
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src="/images/logo/white-logo.png"
          alt="DEKSTRA Logo"
          width={196}
          height={32}
        />
      </div>
    </Link>
  );
}
