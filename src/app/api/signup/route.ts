import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'


const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()
 // TODO translate
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Nome, email e senha são obrigatórios.' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email já cadastrado.' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10) // 10 salt rounds
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 })
}
