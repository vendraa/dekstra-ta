"use client";

import Image from "next/image";

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 mb-8">
      {/* Logo */}
      <Image
        src="/images/logo/main-logo.png"
        alt="Logo Desa"
        width={256}
        height={256}
        priority
      />

      {/* Title */}
      <h1 className="text-2xl font-heading font-bold text-foreground">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}

