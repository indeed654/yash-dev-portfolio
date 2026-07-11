import { Router } from 'express'
import {
  markContactRead,
  getContactMessages,
  removeContactMessage,
} from '../controllers/contact.controller'
import {
  createBlogPostAdmin,
  deleteBlogPostAdmin,
  updateBlogPostAdmin,
} from '../controllers/blog.controller'
import {
  createProjectAdmin,
  createSkillAdmin,
  deleteProjectAdmin,
  deleteSkillAdmin,
  updateProjectAdmin,
  updateSkillAdmin,
} from '../controllers/project.controller'
import { requireAuth } from '../middleware/auth.middleware'
import { validate } from '../middleware/validate.middleware'
import { contactIdSchema } from '../schemas/contact.schema'
import {
  blogIdSchema,
  createBlogSchema,
  createProjectSchema,
  createSkillSchema,
  projectIdSchema,
  skillIdSchema,
  updateBlogSchema,
  updateProjectSchema,
  updateSkillSchema,
} from '../schemas/project.schema'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.use(requireAuth)

router.get('/contact', asyncHandler(getContactMessages))
router.patch('/contact/:id', validate(contactIdSchema), asyncHandler(markContactRead))
router.delete('/contact/:id', validate(contactIdSchema), asyncHandler(removeContactMessage))

router.post('/projects', validate(createProjectSchema), asyncHandler(createProjectAdmin))
router.put('/projects/:id', validate(updateProjectSchema), asyncHandler(updateProjectAdmin))
router.delete('/projects/:id', validate(projectIdSchema), asyncHandler(deleteProjectAdmin))

router.post('/blog', validate(createBlogSchema), asyncHandler(createBlogPostAdmin))
router.put('/blog/:id', validate(updateBlogSchema), asyncHandler(updateBlogPostAdmin))
router.delete('/blog/:id', validate(blogIdSchema), asyncHandler(deleteBlogPostAdmin))

router.post('/skills', validate(createSkillSchema), asyncHandler(createSkillAdmin))
router.put('/skills/:id', validate(updateSkillSchema), asyncHandler(updateSkillAdmin))
router.delete('/skills/:id', validate(skillIdSchema), asyncHandler(deleteSkillAdmin))

export default router
