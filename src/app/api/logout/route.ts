import { NextResponse } from 'next/server'

import { AUTH_TOKEN_NAME } from '@/features/auth'

export async function POST() {
  const response = NextResponse.json({ success: true })

  response.cookies.set(AUTH_TOKEN_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })

  return response
}
