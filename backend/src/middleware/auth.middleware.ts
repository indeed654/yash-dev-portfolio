import type { NextFunction, Request, Response } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { AppError } from '../utils/AppError'
import type { AdminJwtPayload } from '../types/express'

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Authorization token is required', 401))
  }

  const token = authHeader.split(' ')[1]
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return next(new AppError('JWT secret is not configured', 500))
  }

  try {
    req.admin = jwt.verify(token, jwtSecret) as AdminJwtPayload
    return next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new AppError('Authorization token has expired', 403))
    }

    return next(new AppError('Invalid authorization token', 401))
  }
}
