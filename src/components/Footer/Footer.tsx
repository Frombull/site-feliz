'use client';

import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import Link from "next/link";

export function Footer() {
    const t = useTranslations('footer');
    const locale = useLocale();

    return (
        <footer className="bg-gray-50 dark:bg-gray-900/60 border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="container mx-auto px-8 py-8">
            <div className="grid md:grid-cols-2 text-center items-start">

              {/* Coluna */}
              <div className="pl-44">
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">{t('navigation')}</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><a href="#about" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t('about')}</a></li>
                  <li><a href="#experience" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t('experience')}</a></li>
                  <li><a href="#projects" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t('projects')}</a></li>
                  <li><a href="#contact" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t('contact')}</a></li>
                </ul>
              </div>

              {/* Coluna */}
              <div className="pr-44">
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">{t('connect')}</h4>
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

            {/* Line */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm">
              <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left mb-4 sm:mb-0">
                {t('developedWith')} <br/>
              </p>

              <div className="flex gap-4">
                <Link
                  href="https://github.com/Frombull/site-feliz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t('sourceCode')}
                </Link>

                <Link href={`/${locale}/privacy-policy`} 
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label={t('privacyPolicy')}
                >
                  {t('privacyPolicy')}
                </Link>

                <Link href={`/${locale}/terms-of-service`} 
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label={t('termsOfService')}
                >
                  {t('termsOfService')}
                </Link>

                <Link href={`/${locale}/cookies-policy`} 
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label={t('cookiesPolicy')}
                >
                  {t('cookiesPolicy')}
                </Link>
              </div>
            </div>
          </div>
        </footer>
    );
}