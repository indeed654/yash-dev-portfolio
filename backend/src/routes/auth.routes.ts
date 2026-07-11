import { Router } from 'express'
import { login, logout } from '../controllers/auth.controller'
import { validate } from '../middleware/validate.middleware'
import { loginSchema } from '../schemas/auth.schema'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.post('/login', validate(loginSchema), asyncHandler(login))
router.post('/logout', asyncHandler(logout))

export default router
