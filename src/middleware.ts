import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { AUTH_TOKEN_NAME, validateSession } from '@/features/auth'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(AUTH_TOKEN_NAME)?.value
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/login') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    await validateSession(token)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
