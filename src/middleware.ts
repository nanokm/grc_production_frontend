import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AUTH_COOKIE_NAME = "grc_auth_token"

// Public routes that don't require authentication
const publicRoutes = ["/login"]

// Static assets and API routes to exclude from middleware
const excludedPaths = ["/_next", "/api", "/favicon.ico", "/static"]

export const middleware = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl

  // Skip middleware for excluded paths
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const isPublicRoute = publicRoutes.includes(pathname)
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME)
  const isAuthenticated = !!authCookie?.value

  // Redirect authenticated users away from login page
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirect unauthenticated users to login page
  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
