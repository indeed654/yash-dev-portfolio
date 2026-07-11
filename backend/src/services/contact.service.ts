import nodemailer from 'nodemailer'
import { prisma } from '../config/db'

interface CreateContactInput {
  name: string
  email: string
  subject?: string
  message: string
}

export const createContactMessage = async (input: CreateContactInput) => {
  const message = await prisma.contactMessage.create({
    data: input,
  })

  await sendContactNotification(input)
  return message
}

export const listContactMessages = () =>
  prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

export const markContactMessageRead = (id: string) =>
  prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  })

export const deleteContactMessage = (id: string) =>
  prisma.contactMessage.delete({
    where: { id },
  })

const sendContactNotification = async (input: CreateContactInput) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) {
    return
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    replyTo: input.email,
    subject: input.subject || `New portfolio message from ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Subject: ${input.subject || 'No subject'}`,
      '',
      input.message,
    ].join('\n'),
  })
}
