import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { email } = await req.json()

    if (!email) {
        return NextResponse.json({ error: 'O e-mail é obrigatório.' }, { status: 400 })
    }


    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        // Não revele que o usuário não existe
        return NextResponse.json({ message: 'Se um usuário com esse e-mail existir, um link de redefinição de senha será enviado.' }, { status: 200 })
    }

    // Gerar token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    await prisma.user.update({
        where: { email },
        data: {
            resetPasswordToken: passwordResetToken,
            resetPasswordTokenExpiry: passwordResetExpires,
        },
    });

    // Enviar e-mail
    try {
        const resetURL = `${req.headers.get('origin')}/reset-password?token=${resetToken}`;

        // Ethereal p teste
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const info = await transporter.sendMail({
            from: '"Site Feliz" <noreply@sitefeliz.com>',
            to: user.email,
            subject: 'Link para Redefinição de Senha',
            text: `Você está recebendo este e-mail porque você solicitou a redefinição da senha da sua conta.\n\n` +
                  `Por favor, clique no seguinte link ou cole-o em seu navegador para concluir o processo:\n\n` +
                  `${resetURL}\n\n` +
                  `Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá inalterada.\n`,
        });

        const message = `Um e-mail foi enviado para ${user.email} com mais instruções. Por favor, verifique seu e-mail. Preview URL: ${nodemailer.getTestMessageUrl(info)}`
        
        return NextResponse.json({ message }, { status: 200 })

    } catch (err) {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: null,
                resetPasswordTokenExpiry: null,
            },
        });
        return NextResponse.json({ error: 'Erro ao enviar o e-mail.' }, { status: 500 })
    }
} 