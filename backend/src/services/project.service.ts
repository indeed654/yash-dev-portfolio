import type { Prisma } from '@prisma/client'
import { prisma } from '../config/db'

interface ProjectFilters {
  category?: string
  featured?: boolean
}

export const listProjects = (filters: ProjectFilters) => {
  const where: Prisma.ProjectWhereInput = {
    category: filters.category,
    featured: filters.featured,
  }

  return prisma.project.findMany({
    where,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
}

export const getProjectById = (id: string) =>
  prisma.project.findUnique({
    where: { id },
  })

export const createProject = (data: Prisma.ProjectCreateInput) =>
  prisma.project.create({
    data,
  })

export const updateProject = (id: string, data: Prisma.ProjectUpdateInput) =>
  prisma.project.update({
    where: { id },
    data,
  })

export const deleteProject = (id: string) =>
  prisma.project.delete({
    where: { id },
  })

export const listSkillsGrouped = async () => {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }, { name: 'asc' }],
  })

  return skills.reduce<Record<string, typeof skills>>((groups, skill) => {
    groups[skill.category] = groups[skill.category] || []
    groups[skill.category].push(skill)
    return groups
  }, {})
}

export const createSkill = (data: Prisma.SkillCreateInput) =>
  prisma.skill.create({
    data,
  })

export const updateSkill = (id: string, data: Prisma.SkillUpdateInput) =>
  prisma.skill.update({
    where: { id },
    data,
  })

export const deleteSkill = (id: string) =>
  prisma.skill.delete({
    where: { id },
  })
