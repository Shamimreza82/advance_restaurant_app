import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
   const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  console.log(req)

  const pathname = new URL(req.url).pathname;

  // Protected routes
  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
