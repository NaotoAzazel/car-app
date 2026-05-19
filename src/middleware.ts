import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { AUTH_TOKEN_NAME, validateSession } from '@/features/auth'
import { DEFAULT_LOCALE, LOCALES } from '@/shared/config/i18n'

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
})

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(AUTH_TOKEN_NAME)?.value

  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const isLoginPath =
    pathname.startsWith('/login') ||
    LOCALES.some((locale) => pathname.startsWith(`/${locale}/login`))

  let isValidSession = false
  if (token) {
    try {
      await validateSession(token)
      isValidSession = true
    } catch {
      isValidSession = false
    }
  }

  if (!isValidSession && !isLoginPath) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isValidSession && isLoginPath) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)', '/'],
}
