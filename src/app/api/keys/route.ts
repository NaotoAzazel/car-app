import { env } from '@/env'
import { NextResponse } from 'next/server'

import { getAuthToken, validateSession } from '@/features/auth'

export async function GET() {
  const token = await getAuthToken()

  if (!token) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const session = await validateSession(token)

  if (!session) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  return NextResponse.json({
    success: true,
    API_BEARER_TOKEN: env.API_BEARER_TOKEN,
  })
}
