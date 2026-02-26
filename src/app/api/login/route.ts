import { env } from '@/env'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password !== process.env.SITE_PASSWORD) {
    return NextResponse.json({ message: 'INCORRECT_PASSWORD' }, { status: 401 })
  }

  const token = jwt.sign({ auth: true }, env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  const response = NextResponse.json({ success: true })

  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return response
}
