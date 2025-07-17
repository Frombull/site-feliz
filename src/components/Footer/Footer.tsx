'use client';

import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
    const t = useTranslations('footer');
    
    return (
        <footer className="bg-gray-50 dark:bg-gray-900/60 border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="container mx-auto px-8 py-8">
            <div className="grid md:grid-cols-2 text-center items-start">

              {/* Coluna */}
              <div className="pl-44">
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Navegação</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><a href="#about" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">Sobre</a></li>
                  <li><a href="#experience" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">Experiência</a></li>
                  <li><a href="#projects" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">Projetos</a></li>
                  <li><a href="#contact" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">Contato</a></li>
                </ul>
              </div>

              {/* Coluna */}
              <div className="pr-44">
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Conecte-se</h4>
                <div className="flex justify-center items-center gap-4 mt-2">
                  <a href="https://github.com/Frombull" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Linha */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm">
              <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left mb-4 sm:mb-0">
                Desenvolvido com Next.js e Tailwind CSS. <br/>
                &copy; {new Date().getFullYear()} Marco Di Toro. Todos os direitos reservados.
              </p>

              <div className="flex gap-4">
                <a
                  href="https://github.com/Frombull/site-feliz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {t('sourceCode')}
                </a>

                <Link href="/privacy-policy" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  {t('privacyPolicy')}
                </Link>

                <Link href="/terms-of-service" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  {t('termsOfService')}
                </Link>

                <Link href="/cookies-policy" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  {t('cookiesPolicy')}
                </Link>
              </div>
            </div>
          </div>
        </footer>
    );
}