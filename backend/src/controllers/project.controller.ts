import type { Request, Response } from 'express'
import {
  createProject,
  createSkill,
  deleteProject,
  deleteSkill,
  getProjectById,
  listProjects,
  listSkillsGrouped,
  updateProject,
  updateSkill,
} from '../services/project.service'
import { AppError } from '../utils/AppError'

export const getProjects = async (req: Request, res: Response) => {
  const projects = await listProjects({
    category: req.query.category as string | undefined,
    featured: req.query.featured as boolean | undefined,
  })

  res.status(200).json({
    success: true,
    data: projects,
  })
}

export const getProject = async (req: Request, res: Response) => {
  const project = await getProjectById(req.params.id)

  if (!project) {
    throw new AppError('Project not found', 404)
  }

  res.status(200).json({
    success: true,
    data: project,
  })
}

export const createProjectAdmin = async (req: Request, res: Response) => {
  const project = await createProject(req.body)

  res.status(201).json({
    success: true,
    data: project,
  })
}

export const updateProjectAdmin = async (req: Request, res: Response) => {
  const project = await updateProject(req.params.id, req.body)

  res.status(200).json({
    success: true,
    data: project,
  })
}

export const deleteProjectAdmin = async (req: Request, res: Response) => {
  await deleteProject(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  })
}

export const getSkills = async (_req: Request, res: Response) => {
  const skills = await listSkillsGrouped()

  res.status(200).json({
    success: true,
    data: skills,
  })
}

export const createSkillAdmin = async (req: Request, res: Response) => {
  const skill = await createSkill(req.body)

  res.status(201).json({
    success: true,
    data: skill,
  })
}

export const updateSkillAdmin = async (req: Request, res: Response) => {
  const skill = await updateSkill(req.params.id, req.body)

  res.status(200).json({
    success: true,
    data: skill,
  })
}

export const deleteSkillAdmin = async (req: Request, res: Response) => {
  await deleteSkill(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Skill deleted successfully',
  })
}
