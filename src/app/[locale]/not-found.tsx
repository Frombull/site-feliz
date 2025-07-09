import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="text-yellow-500" size={64} />
          </div>
          <h1 className="text-6xl font-extrabold text-gray-800 dark:text-white">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mt-2">
            Página Não Encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Oops! A página que você está procurando não existe ou foi movida.
          </p>
          <div className="mt-8">
            <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
              <Home size={20} />
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
        <footer className="text-center mt-8 py-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                Desenvolvido com Next.js e Tailwind CSS :)
            </p>
        </footer>
      </div>
    </div>
  );
}
