import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

// Error messages in different languages
const errorMessages = {
  en: {
    requiredFields: 'Name, email and password are required.',
    emailAlreadyExists: 'This email is already registered. Please use a different email or try logging in.',
    genericError: 'An error occurred.'
  },
  pt: {
    requiredFields: 'Nome, e-mail e senha são obrigatórios.',
    emailAlreadyExists: 'Este e-mail já está cadastrado. Use um e-mail diferente ou tente fazer login.',
    genericError: 'Ocorreu um erro.'
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, locale = 'pt' } = await req.json()
    const messages = errorMessages[locale as keyof typeof errorMessages] || errorMessages.pt

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: messages.requiredFields }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: messages.requiredFields }, { status: 400 })
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return NextResponse.json({ error: messages.emailAlreadyExists }, { status: 400 })
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    })

    return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    const locale = req.headers.get('accept-language')?.includes('en') ? 'en' : 'pt'
    const messages = errorMessages[locale as keyof typeof errorMessages] || errorMessages.pt
    return NextResponse.json({ error: messages.genericError }, { status: 500 })
  }
}
