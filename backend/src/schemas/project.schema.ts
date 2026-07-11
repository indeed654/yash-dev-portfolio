import { z } from 'zod'

const projectCategory = z.enum(['AI', 'Cybersecurity', 'IoT', 'Web', 'Other'])

export const projectQuerySchema = z.object({
  query: z.object({
    category: projectCategory.optional(),
    featured: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => (value === undefined ? undefined : value === 'true')),
  }),
})

export const projectIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).max(150),
    description: z.string().trim().min(10).max(3000),
    techStack: z.array(z.string().trim().min(1).max(50)).min(1),
    category: projectCategory,
    liveUrl: z.string().trim().url().optional(),
    githubUrl: z.string().trim().url().optional(),
    imageUrl: z.string().trim().url().optional(),
    featured: z.boolean().optional(),
    order: z.number().int().min(0).optional(),
  }),
})

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: createProjectSchema.shape.body.partial(),
})

export const blogQuerySchema = z.object({
  query: z.object({
    tag: z.string().trim().min(1).max(50).optional(),
  }),
})

export const blogSlugSchema = z.object({
  params: z.object({
    slug: z.string().trim().min(1).max(180),
  }),
})

export const blogIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).max(180),
    slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    excerpt: z.string().trim().max(300).optional(),
    content: z.string().trim().min(20),
    tags: z.array(z.string().trim().min(1).max(50)).default([]),
    published: z.boolean().optional(),
    publishedAt: z.string().datetime().optional(),
  }),
})

export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: createBlogSchema.shape.body.partial(),
})

export const createSkillSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(80),
    category: z.enum(['AI/ML', 'Cybersecurity', 'IoT', 'Languages', 'Tools']),
    level: z.number().int().min(1).max(100),
    order: z.number().int().min(0).optional(),
  }),
})

export const updateSkillSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: createSkillSchema.shape.body.partial(),
})

export const skillIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})
