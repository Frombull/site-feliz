import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { PrismaClient } from '../../src/generated/prisma'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return res.status(400).json({ error: 'Email já cadastrado.' })
  }

  const hashedPassword = await bcrypt.hash(password, 10) // 10 salt rounds
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return res.status(201).json({ id: user.id, email: user.email })
}
