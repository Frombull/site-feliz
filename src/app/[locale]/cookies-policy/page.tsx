'use client';

import { useTranslations } from 'next-intl';

export default function CookiesPolicyPage() {
  const t = useTranslations('CookiesPolicy');

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <main className="container mx-auto p-4 pt-24 md:pt-24 md:px-8">
        <div className="bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{t('title')}</h1>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('introduction')}</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white pt-4">{t('whatAreCookies.title')}</h2>
            <p>{t('whatAreCookies.p1')}</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white pt-4">{t('howWeUseCookies.title')}</h2>
            <p>{t('howWeUseCookies.p1')}</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white pt-4">{t('managingCookies.title')}</h2>
            <p>{t('managingCookies.p1')}</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white pt-4">{t('changesToThisPolicy.title')}</h2>
            <p>{t('changesToThisPolicy.p1')}</p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white pt-4">{t('contactUs.title')}</h2>
            <p>{t('contactUs.p1')}</p>
          </div>
        </div>
      </main>
    </div>
  );
} 