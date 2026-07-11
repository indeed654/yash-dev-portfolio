import type { Request, Response } from 'express'
import {
  createBlogPost,
  deleteBlogPost,
  getPublishedBlogPostBySlug,
  listPublishedBlogPosts,
  updateBlogPost,
} from '../services/blog.service'
import { AppError } from '../utils/AppError'

export const getBlogPosts = async (req: Request, res: Response) => {
  const posts = await listPublishedBlogPosts(req.query.tag as string | undefined)

  res.status(200).json({
    success: true,
    data: posts,
  })
}

export const getBlogPost = async (req: Request, res: Response) => {
  const post = await getPublishedBlogPostBySlug(req.params.slug)

  if (!post) {
    throw new AppError('Blog post not found', 404)
  }

  res.status(200).json({
    success: true,
    data: post,
  })
}

export const createBlogPostAdmin = async (req: Request, res: Response) => {
  const post = await createBlogPost({
    ...req.body,
    publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : undefined,
  })

  res.status(201).json({
    success: true,
    data: post,
  })
}

export const updateBlogPostAdmin = async (req: Request, res: Response) => {
  const post = await updateBlogPost(req.params.id, {
    ...req.body,
    publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : undefined,
  })

  res.status(200).json({
    success: true,
    data: post,
  })
}

export const deleteBlogPostAdmin = async (req: Request, res: Response) => {
  await deleteBlogPost(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Blog post deleted successfully',
  })
}
