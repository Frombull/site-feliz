import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../src/generated/prisma';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ error: 'Token e nova senha são obrigatórios.' });
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
        return res.status(400).json({ error: 'Token inválido ou expirado.' });
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

    return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
} 