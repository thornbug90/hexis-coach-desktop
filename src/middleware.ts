import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.log({ error });
  }

  // These routes are to be accessible when user is not logged in
  if (
    (!session && (pathname.startsWith("/reset-password") || pathname.startsWith("/create-account"))) ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/privacy-policy") ||
    pathname.startsWith("/terms-and-conditions")
  ) {
    return NextResponse.next();
  }

  // TODO: Map protected routes
  if (process.env.NEXT_PUBLIC_NODE_ENV === "DEVELOPMENT") {
    if (!session && pathname !== "/login") {
      const url = new URL(req.url);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } else {
    if (!session)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_HEXIS_WEB_URL || "https://dev-hexis-web-app.onrender.com"}/account/login?redirect=${req.nextUrl.origin}`,
      );
  }

  if (session && pathname === "/login") {
    const url = new URL(req.url);
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
