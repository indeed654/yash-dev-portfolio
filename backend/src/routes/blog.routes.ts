import { Router } from 'express'
import { getBlogPost, getBlogPosts } from '../controllers/blog.controller'
import { validate } from '../middleware/validate.middleware'
import { blogQuerySchema, blogSlugSchema } from '../schemas/project.schema'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.get('/', validate(blogQuerySchema), asyncHandler(getBlogPosts))
router.get('/:slug', validate(blogSlugSchema), asyncHandler(getBlogPost))

export default router
