
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { token, password } = await req.json()

    if (!token || !password) {
        return NextResponse.json({ error: 'Token e nova senha são obrigatórios.' }, { status: 400 })
    }

    // Hash the received token to compare with the one in the database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: hashedToken,
            resetPasswordTokenExpiry: {
                gte: new Date(), // greater than or equal
            },
        },
    });

    if (!user) {
        return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear token
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordTokenExpiry: null,
        },
    });

    return NextResponse.json({ message: 'Senha redefinida com sucesso.' }, { status: 200 })
} 