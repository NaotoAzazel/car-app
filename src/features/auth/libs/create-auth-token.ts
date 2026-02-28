import { env } from '@/env'
import jwt from 'jsonwebtoken'

import { EXPIRATION_DAYS } from '../constants'

export function createAuthToken() {
  return jwt.sign({ auth: true }, env.JWT_SECRET, {
    expiresIn: EXPIRATION_DAYS,
  })
}
