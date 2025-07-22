'use client';

import { Mail, Lock, LogIn } from 'lucide-react';
import { useLocale } from 'next-intl';
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
    const locale = useLocale();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            setError('Credenciais inválidas. Verifique seu e-mail e senha.');
            setLoading(false);
        } else {
            // Sucesso, redireciona para o dashboard
            router.push(`/${locale}/dashboard`);
        }
    };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans flex items-center justify-center">
      <main className="container mx-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-md">
           <SectionCard title="Login" icon={<LogIn className="text-blue-500" />}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {/* --- Email --- */}
                    <InputWithIcon 
                        icon={<Mail size={16} />}
                        type="email"
                        id="email-input"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* --- Password --- */}
                    <InputWithIcon 
                        icon={<Lock size={16} />}
                        type="password"
                        id="password-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* --- Login button --- */}
                    <button 
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors duration-300 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>

                    {/* --- Links --- */}
                    <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-400">
                        <Link href={`/${locale}/forgot-password`} className="text-blue-600 hover:underline dark:text-blue-400">
                            Esqueceu a senha?
                        </Link>
                        <span className="mx-2">|</span>
                         <Link href={`/${locale}/signup`} className="text-blue-600 hover:underline dark:text-blue-400">
                            Criar uma conta
                        </Link>
                    </div>
                </form>
            </SectionCard>
             <footer className="text-center mt-8">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                   <Link href="/" className="hover:underline">Voltar para a Home</Link>
                </p>
            </footer>
        </div>
      </main>
    </div>
  );
}