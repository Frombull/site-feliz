'use client';

import { usePathname, Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
    const pathname = usePathname();
    const t = useTranslations('Header');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 md:px-6 py-4">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Site Feliz :)
                </Link>

                {/* Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        <li>
                            <button 
                                onClick={() => scrollToSection('about')}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('about')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('experience')}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('experience')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('projects')}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('projects')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('skills')}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('skills')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('certificates')}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('certificates')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('education')}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('education')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('contact')}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('contact')}
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    )
}