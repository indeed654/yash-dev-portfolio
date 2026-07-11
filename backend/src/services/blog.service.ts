import type { Prisma } from '@prisma/client'
import { prisma } from '../config/db'

export const listPublishedBlogPosts = (tag?: string) =>
  prisma.blogPost.findMany({
    where: {
      published: true,
      tags: tag ? { has: tag } : undefined,
    },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  })

export const getPublishedBlogPostBySlug = (slug: string) =>
  prisma.blogPost.findFirst({
    where: {
      slug,
      published: true,
    },
  })

export const createBlogPost = (data: Prisma.BlogPostCreateInput) =>
  prisma.blogPost.create({
    data,
  })

export const updateBlogPost = (id: string, data: Prisma.BlogPostUpdateInput) =>
  prisma.blogPost.update({
    where: { id },
    data,
  })

export const deleteBlogPost = (id: string) =>
  prisma.blogPost.delete({
    where: { id },
  })
