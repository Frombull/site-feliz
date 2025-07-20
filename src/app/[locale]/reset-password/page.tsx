'use client';

import { useSearchParams } from 'next/navigation';
import { Lock, RefreshCw } from 'lucide-react';
import { useState, Suspense } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

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

function ResetPasswordForm() {
    const locale = useLocale();
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (!token) {
            setError('Token de redefinição não encontrado.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Ocorreu um erro.');
            } else {
                setSuccess('Senha redefinida com sucesso! Você pode fazer login agora.');
            }
        } catch (error) {
            setError('Ocorreu um erro de rede.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
             <SectionCard title="Sucesso!" icon={<RefreshCw className="text-green-500" />}>
                <div className="text-center">
                    <p className="text-green-500">{success}</p>
                    <Link href={`/${locale}/login`} className="text-blue-600 hover:underline dark:text-blue-400 mt-4 inline-block">
                        Ir para o Login
                    </Link>
                </div>
            </SectionCard>
        )
    }

    return (
        <SectionCard title="Redefinir Senha" icon={<RefreshCw className="text-blue-500" />}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <InputWithIcon
                    icon={<Lock size={16} />}
                    type="password"
                    id="password-input"
                    placeholder="Nova Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputWithIcon
                    icon={<Lock size={16} />}
                    type="password"
                    id="confirm-password-input"
                    placeholder="Confirmar Nova Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors duration-300 disabled:opacity-50"
                    disabled={loading || !token}
                >
                    {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                </button>
            </form>
        </SectionCard>
    );
}

export default function ResetPasswordPage() {
  const locale = useLocale();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans flex items-center justify-center">
        <main className="container mx-auto p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-md">
                <Suspense fallback={<div>Carregando...</div>}>
                    <ResetPasswordForm />
                </Suspense>
                 <footer className="text-center mt-8">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                       <Link href={`/${locale}/login`} className="hover:underline">Voltar para o Login</Link>
                    </p>
                </footer>
            </div>
        </main>
    </div>
  );
} 