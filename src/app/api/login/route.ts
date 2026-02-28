import { env } from '@/env'
import { NextResponse } from 'next/server'

import { AUTH_TOKEN_NAME, createAuthToken } from '@/features/auth'

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password !== env.SITE_PASSWORD) {
    return NextResponse.json({ message: 'INCORRECT_PASSWORD' }, { status: 401 })
  }

  const token = createAuthToken()

  const response = NextResponse.json({ success: true })

  response.cookies.set(AUTH_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return response
}
