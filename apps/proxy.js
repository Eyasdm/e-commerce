import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/orders", "/order-confirmed", "/account", "/cart"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/orders/:path*",
    "/order-confirmed/:path*",
    "/account/:path*",
    "/success/:path*",
    "/cancel/:path*",
    "/cart/:path*",
    "/admin/:path*",
  ],
};
