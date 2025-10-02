import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware will only run on /finance and its subpaths
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  console.log('Middleware running for:', pathname) // Debug

  // Example: check for auth token in cookies
  const token = req.cookies.get('auth_token')?.value

  // If not authenticated, redirect to /auth/login
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Otherwise, allow access
  return NextResponse.next()
}

// Apply middleware only on /finance and its subpaths
export const config = {
  matcher: ['/finance/:path*'], // will match /finance, /finance/anything
}
