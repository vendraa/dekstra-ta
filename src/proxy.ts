import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROLE_HOME: Record<string, string> = {
  "1": "/dashboard-csr",
  "2": "/rt/dashboard",
  "3": "/rw/dashboard",
  "4": "/kades/dashboard",
  "5": "/admin/dashboard",
};

const ROLE_PREFIX: Record<string, string[]> = {
  "1": [
    "/dashboard",
    "/dashboard-csr",
    "/dashboard-ssr",
    "/dashboard-ssg",
  ],
  "2": ["/rt"],
  "3": ["/rw"],
  "4": ["/kades"],
  "5": ["/admin"],
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    if (!payload.exp) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);

    return payload.exp < now;
  } catch {
    return true;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token || !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isTokenExpired(token)) {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    response.cookies.delete("access_token");
    response.cookies.delete("role");

    return response;
  }
  
  const homePath = ROLE_HOME[role];
  const allowedPrefixes = ROLE_PREFIX[role];

  const isAllowed = allowedPrefixes.some(
    (prefix) => pathname.startsWith(prefix)
  );

  if (!isAllowed) {
    return NextResponse.redirect(
      new URL(homePath, request.url)
    );
  }

  const isAccessingOtherRole =
    (pathname.startsWith("/admin") && role !== "5") ||
    (pathname.startsWith("/rt") && role !== "2") ||
    (pathname.startsWith("/rw") && role !== "3") ||
    (pathname.startsWith("/kades") && role !== "4");

  if (isAccessingOtherRole) {
    return NextResponse.redirect(new URL(homePath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard-csr",
    "/dashboard-ssr",
    "/dashboard-ssg",
    "/admin/:path*",
    "/rt/:path*",
    "/rw/:path*",
    "/kades/:path*",
  ]
};