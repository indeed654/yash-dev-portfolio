import { Router } from 'express'
import { getProject, getProjects } from '../controllers/project.controller'
import { validate } from '../middleware/validate.middleware'
import { projectIdSchema, projectQuerySchema } from '../schemas/project.schema'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.get('/', validate(projectQuerySchema), asyncHandler(getProjects))
router.get('/:id', validate(projectIdSchema), asyncHandler(getProject))

export default router
