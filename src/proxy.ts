import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/about',
  '/contact',
  '/resources',
  '/academy', // Make academy public initially
  '/armory',  // Make armory public initially
]

// API routes that are public
const publicApiRoutes = [
  '/api/auth',
  '/api/reports/public',
  '/api/stories/public',
]

export default withAuth(
  function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if it's an API route
    if (pathname.startsWith('/api/')) {
      // Allow public API routes
      if (publicApiRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next()
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow public routes
        if (publicRoutes.some(route => pathname.startsWith(route))) {
          return true
        }

        // Allow public API routes
        if (pathname.startsWith('/api/') && 
            publicApiRoutes.some(route => pathname.startsWith(route))) {
          return true
        }

        // Require token for all other routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}