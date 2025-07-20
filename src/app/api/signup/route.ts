import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'


const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email já cadastrado.' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10) // 10 salt rounds
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
}
