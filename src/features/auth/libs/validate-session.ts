import { env } from '@/env'
import { jwtVerify } from 'jose'

export async function validateSession(token: string) {
  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET)

    const { payload } = await jwtVerify(token, secret)

    return payload
  } catch (error) {
    return null
  }
}

export function validateUsingBearerToken(token: string) {
  return token === env.API_BEARER_TOKEN
}
