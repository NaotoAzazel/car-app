import { cookies } from 'next/headers'

import { AUTH_TOKEN_NAME } from '../constants'

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_TOKEN_NAME)?.value
}
