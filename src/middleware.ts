import { NextResponse, type NextRequest } from "next/server";

// This deployment is a pure marketing/showcase site. The panel/auth system
// is not exposed publicly — every /panel/* route redirects to the homepage.
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/panel/:path*"],
};
