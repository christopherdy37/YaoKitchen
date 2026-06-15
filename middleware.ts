import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("yao_admin_session");
  if (!cookie?.value) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)"],
};
