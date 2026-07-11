import type { JwtPayload } from 'jsonwebtoken'

export interface AdminJwtPayload extends JwtPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminJwtPayload
    }
  }
}
