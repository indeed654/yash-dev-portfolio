import { Router } from 'express'
import { submitContact } from '../controllers/contact.controller'
import { contactRateLimiter } from '../middleware/rateLimit.middleware'
import { validate } from '../middleware/validate.middleware'
import { createContactSchema } from '../schemas/contact.schema'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.post('/', contactRateLimiter, validate(createContactSchema), asyncHandler(submitContact))

export default router
