import Image from "next/image";

export default function RegisterHeader() {
  return (
    <header className="w-full bg-white border-b rounded-b-full border-gray-200 shadow-card">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-center">
        {/* Ganti src sesuai logo kamu */}
        <Image
          src="/images/logo/main-logo.png"
          alt="App Logo"
          width={175}
          height={128}
          priority
        />
      </div>
    </header>
  );
}
