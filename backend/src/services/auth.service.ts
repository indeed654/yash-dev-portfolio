import bcrypt from 'bcryptjs'
import jwt, { type SignOptions } from 'jsonwebtoken'
import { prisma } from '../config/db'
import { AppError } from '../utils/AppError'

export const loginAdmin = async (email: string, password: string) => {
  const admin = await prisma.admin.findUnique({
    where: { email },
  })

  if (!admin) {
    throw new AppError('Invalid email or password', 401)
  }

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash)

  if (!passwordMatches) {
    throw new AppError('Invalid email or password', 401)
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new AppError('JWT secret is not configured', 500)
  }

  const signOptions: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
  }

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    jwtSecret,
    signOptions,
  )

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
    },
  }
}
