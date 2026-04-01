// apps/store/proxy.js
import { NextResponse } from "next/server";

export function proxy(request) {
  // ← rename from "middleware" to "proxy"
  const token = request.cookies.get("token");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
