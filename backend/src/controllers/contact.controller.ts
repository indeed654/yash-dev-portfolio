import type { Request, Response } from 'express'
import {
  createContactMessage,
  deleteContactMessage,
  listContactMessages,
  markContactMessageRead,
} from '../services/contact.service'

export const submitContact = async (req: Request, res: Response) => {
  const message = await createContactMessage(req.body)

  res.status(201).json({
    success: true,
    message: 'Contact message submitted successfully',
    data: message,
  })
}

export const getContactMessages = async (_req: Request, res: Response) => {
  const messages = await listContactMessages()

  res.status(200).json({
    success: true,
    data: messages,
  })
}

export const markContactRead = async (req: Request, res: Response) => {
  const message = await markContactMessageRead(req.params.id)

  res.status(200).json({
    success: true,
    data: message,
  })
}

export const removeContactMessage = async (req: Request, res: Response) => {
  await deleteContactMessage(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Contact message deleted successfully',
  })
}
