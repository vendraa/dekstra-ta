import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROLE_HOME: Record<string, string> = {
  "1": "/dashboard",   
  "2": "/rt/dashboard",  
  "3": "/rw/dashboard",
  "4": "/kades/dashboard",
  "5": "/admin/dashboard",
};

const ROLE_PREFIX: Record<string, string> = {
  "1": "/dashboard",
  "2": "/rt",
  "3": "/rw",
  "4": "/kades",
  "5": "/admin",
};

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
  
  const homePath = ROLE_HOME[role];
  const allowedPrefix = ROLE_PREFIX[role];

  if (!homePath || !allowedPrefix) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAccessingOtherRole =
    (pathname.startsWith("/admin") && role !== "5") ||
    (pathname.startsWith("/rt") && role !== "2") ||
    (pathname.startsWith("/rw") && role !== "3") ||
    (pathname.startsWith("/kades") && role !== "4");

  if (isAccessingOtherRole) {
    return NextResponse.redirect(new URL(homePath, request.url));
  }

  if (!pathname.startsWith(allowedPrefix)) {
    return NextResponse.redirect(new URL(homePath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/admin/:path*",
    "/rt/:path*",
    "/rw/:path*",
    "/kades/:path*",
  ],
};