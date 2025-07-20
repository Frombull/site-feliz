import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()


  if (!email || !password) {
    return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })

  // Gerar JWT ou session cookie sei lá
  return NextResponse.json({ id: user.id, email: user.email }, { status: 200 })
}
