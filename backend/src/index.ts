import cors from 'cors'
import dotenv from 'dotenv'
import express, { type NextFunction, type Request, type Response } from 'express'
import { Prisma } from '@prisma/client'
import { prisma } from './config/db'
import adminRoutes from './routes/admin.routes'
import authRoutes from './routes/auth.routes'
import blogRoutes from './routes/blog.routes'
import contactRoutes from './routes/contact.routes'
import projectRoutes from './routes/project.routes'
import { getSkills } from './controllers/project.controller'
import { AppError } from './utils/AppError'
import { asyncHandler } from './utils/asyncHandler'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 4000

app.use(
  cors({
    origin: ['https://yash-dev-chi.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/auth', authRoutes)
app.get('/api/skills', asyncHandler(getSkills))
app.use('/api/admin', adminRoutes)

app.use((_req, _res, next) => {
  next(new AppError('Route not found', 404))
})

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = error instanceof AppError ? error.statusCode : 500
  let message = error.message || 'Internal server error'
  let errors = error instanceof AppError ? error.errors : undefined

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    statusCode = 404
    message = 'Resource not found'
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    statusCode = 409
    message = 'A record with this unique value already exists'
    errors = [error.meta]
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(process.env.NODE_ENV !== 'production' ? { stack: error.stack } : {}),
  })
})

const server = app.listen(port, () => {
  console.log(`Portfolio backend running on port ${port}`)
})

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
