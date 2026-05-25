"use client";

import Link from "next/link";

export interface AuthFooterLinkProps {
    text: string;
    linkLabel: string;
    href: string;
}

export default function AuthFooterLink({
  text,
  linkLabel,
  href,
}: AuthFooterLinkProps) {
  return (
    <p className="text-sm text-center text-foreground mt-2">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-primary hover:underline"
      >
        {linkLabel}
      </Link>
    </p>
  );
}
