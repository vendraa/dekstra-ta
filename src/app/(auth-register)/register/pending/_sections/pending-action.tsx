import Link   from "next/link";
import Button from "@/components/ui/Button/Button";

export function PendingAction() {
  return (
    <Link href="/login" className="w-full">
      <Button
        type="button"
        fullWidth
        className="bg-primary text-white hover:opacity-90"
      >
        Kembali ke Halaman Login
      </Button>
    </Link>
  );
}