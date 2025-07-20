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

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Credenciais inválidas.' })

  // Aqui você pode gerar um JWT ou session cookie
  return res.status(200).json({ id: user.id, email: user.email })
}
