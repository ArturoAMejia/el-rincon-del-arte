import { betterFetch } from "@better-fetch/fetch";
import { type Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { data } = await betterFetch<{
    session: Session;
    user: { role: string };
  }>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      //get the cookie from the request
      cookie: request.headers.get("cookie") || "",
    },
  });

  const pathName = request.nextUrl.pathname;
  const isAdminRoute = pathName.startsWith("/admin");

  if (!data) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const role = data.user.role;
  const roles = Array.isArray(role)
    ? role
    : typeof role === "string"
      ? role.split(",").map((r) => r.trim())
      : [];

  if (isAdminRoute) {
    if (roles.includes("admin") || roles.includes("artist")) {
      return NextResponse.next();
    }
    // Redirect client to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
