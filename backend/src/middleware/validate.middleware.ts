import type { NextFunction, Request, Response } from 'express'
import type { ZodSchema } from 'zod'

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    })

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      })
    }

    req.body = result.data.body ?? req.body
    req.params = result.data.params ?? req.params
    req.query = result.data.query ?? req.query
    return next()
  }
