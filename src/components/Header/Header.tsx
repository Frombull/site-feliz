'use client';

import { usePathname, Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from 'next-intl';
import { Moon, Sun, User as UserIcon, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image';

export function Header() {
    const pathname = usePathname();
    const t = useTranslations('Header');
    const [darkMode, setDarkMode] = useState(false);
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Saved theme preference or default to system preference
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

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
                                className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('about')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('experience')}
                                className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('experience')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('projects')}
                                className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('projects')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('skills')}
                                className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('skills')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('education')}
                                className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {t('education')}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('contact')}
                                className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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

                    {session ? (
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Image 
                                    src={session.user?.image || '/profile_picture.png'} 
                                    alt="User profile" 
                                    width={32} 
                                    height={32} 
                                    className="rounded-full"
                                />
                                {session.user?.name && (
                                    <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200 pr-2">
                                        {session.user.name}
                                    </span>
                                )}
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <p className="font-semibold">{session.user?.name || 'User'}</p>
                                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                                    <Link href="/profile" className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <UserIcon size={16} />
                                        {t('profile')}
                                    </Link>
                                    <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <LogOut size={16} />
                                        {t('logout')}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            {t('login')}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}