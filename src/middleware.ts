import { NextResponse, NextRequest } from "next/server";

// this function can be maarked async  if needed to perform asynchronous operations
export function middleware(req: NextRequest) {
  // Get the request path.
  const path = req.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = req.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
// see "matching paths below to learn  more about matching"
export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/profile"],
};
