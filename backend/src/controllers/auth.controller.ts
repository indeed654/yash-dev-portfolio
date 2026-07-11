import type { Request, Response } from 'express'
import { loginAdmin } from '../services/auth.service'

export const login = async (req: Request, res: Response) => {
  const data = await loginAdmin(req.body.email, req.body.password)

  res.status(200).json({
    success: true,
    data,
  })
}

export const logout = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully. Clear the token on the client.',
  })
}
