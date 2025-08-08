'use client';

import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SectionCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6 justify-center">
        {icon}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  </div>
);

const InputWithIcon = ({ icon, type, placeholder, id, value, onChange }: { icon: React.ReactNode, type: string, placeholder: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-400">
            {icon}
        </div>
        <input 
            type={type} 
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);


export default function LoginPage() {
    const t = useTranslations('LoginPage');
    const locale = useLocale();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError(t('invalidCredentials'));
            setLoading(false);
        } else {
            // Redirect
            router.push(`/${locale}/dashboard`);
        }
    };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans flex items-center justify-center">
      <main className="container mx-auto p-4 md:p-8 flex justify-center animate-fade-in-up">
        <div className="w-full max-w-md">
           <SectionCard title={t('title')} icon={<LogIn className="text-blue-500" />}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {/* --- Email --- */}
                    <label htmlFor="email-input" className="block mb-1 ml-1 text-sm font-medium text-gray-900 dark:text-white">{t('emailLabel')+"*"}</label>
                    <InputWithIcon 
                        icon={<Mail size={16} />}
                        type="email"
                        id="email-input"
                        placeholder={t('emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* --- Password --- */}
                    <label htmlFor="password-input" className="block mb-1 ml-1 text-sm font-medium text-gray-900 dark:text-white">{t('passwordLabel')+"*"}</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-400">
                            <Lock size={16} />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 pe-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={t('passwordPlaceholder')+"*"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 hover:cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    {/* --- Login button --- */}
                    <button 
                        type="submit"
                        className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors duration-300 disabled:opacity-50 hover:cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? t('loading') : t('loginButton')}
                    </button>

                    {/* --- Divider --- */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">{t('or')}</span>
                        </div>
                    </div>

                    {/* --- Google Login button --- */}
                    <button 
                        type="button"
                        onClick={() => signIn('google', { callbackUrl: `/${locale}/dashboard` })}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 hover:cursor-pointer"
                        disabled={loading}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {t('continueWithGoogle')}
                    </button>

                    {/* --- Links --- */}
                    <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-400">
                        <Link href={`/${locale}/forgot-password`} className="text-blue-600 hover:underline dark:text-blue-400">
                            {t('forgotPassword')}
                        </Link>
                        <span className="mx-2">|</span>
                         <Link href={`/${locale}/signup`} className="text-blue-600 hover:underline dark:text-blue-400">
                            {t('createAccount')}
                        </Link>
                    </div>
                </form>
            </SectionCard>
             <footer className="text-center mt-8">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                   <Link href="/" className="hover:underline">{t('backToHome')}</Link>
                </p>
            </footer>
        </div>
      </main>
    </div>
  );
}