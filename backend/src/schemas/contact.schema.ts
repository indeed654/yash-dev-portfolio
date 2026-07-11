import { z } from 'zod'

export const createContactSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(255),
    subject: z.string().trim().max(150).optional(),
    message: z.string().trim().min(10).max(5000),
  }),
})

export const contactIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})
