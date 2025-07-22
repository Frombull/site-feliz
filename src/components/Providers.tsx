'use client';

import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';

type ProvidersProps = {
    children: React.ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
};

export default function Providers({ children, messages, locale }: ProvidersProps) {
    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
    );
} 