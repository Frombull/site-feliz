import { Mail, Lock, LogIn } from 'lucide-react';
import Link from 'next/link';

const SectionCard = ({ title, icon, children }) => (
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

const InputWithIcon = ({ icon, type, placeholder, id }) => (
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-400">
            {icon}
        </div>
        <input 
            type={type} 
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder={placeholder}
        />
    </div>
);


export default function LoginPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans flex items-center justify-center">
      <main className="container mx-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-md">
           <SectionCard title="Login" icon={<LogIn className="text-blue-500" />}>
                <form className="space-y-6">
                    {/* --- Email --- */}
                    <InputWithIcon 
                        icon={<Mail size={16} />}
                        type="email"
                        id="email-input"
                        placeholder="E-mail"
                    />

                    {/* --- Password --- */}
                    <InputWithIcon 
                        icon={<Lock size={16} />}
                        type="password"
                        id="password-input"
                        placeholder="Password"
                    />

                    {/* --- Login button --- */}
                    <button 
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors duration-300"
                    >
                        Entrar
                    </button>

                    {/* --- Links --- */}
                    <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-400">
                        <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                            Esqueceu a senha?
                        </Link>
                        <span className="mx-2">|</span>
                         <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
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