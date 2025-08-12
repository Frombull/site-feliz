'use client';

import { usePathname, Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from 'next-intl';
import { Terminal, Zap, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
    const pathname = usePathname();
    const t = useTranslations('Header');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            isScrolled 
                ? 'bg-black/90 backdrop-blur-xl border-b border-cyan-500/30' 
                : 'bg-transparent'
        }`}>
            {/* Cyber scan line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
            
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 md:px-6 py-4">
                {/* Cyber Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 border border-cyan-500/50 rounded bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                        <Terminal className="text-cyan-400" size={24} />
                    </div>
                    <span className="text-xl font-bold cyber-title">
                        MARCO.EXE
                    </span>
                </Link>

                {/* Cyber Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-2">
                        {[
                            { key: 'about', section: 'about' },
                            { key: 'experience', section: 'experience' },
                            { key: 'projects', section: 'projects' },
                            { key: 'skills', section: 'skills' },
                            { key: 'education', section: 'education' },
                            { key: 'contact', section: 'linkedin' }
                        ].map((item, index) => (
                            <li key={item.key}>
                                <button 
                                    onClick={() => scrollToSection(item.section)}
                                    className="relative px-4 py-2 text-sm font-medium cyber-text border border-transparent hover:border-cyan-500/30 rounded bg-transparent hover:bg-cyan-500/10 transition-all duration-300 group"
                                >
                                    <span className="relative z-10">[{String(index + 1).padStart(2, '0')}] {t(item.key)}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Cyber Controls */}
                <div className="flex items-center gap-4">
                    {/* System Status */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 border border-green-500/30 rounded bg-green-500/10">
                        <Activity className="text-green-400 animate-pulse" size={16} />
                        <span className="text-xs cyber-mono text-green-400">ONLINE</span>
                    </div>

                    {/* Power Button */}
                    <div className="p-2 border border-cyan-500/50 rounded bg-cyan-500/10 hover:bg-cyan-500/20 transition-all cursor-pointer group">
                        <Zap className="text-cyan-400 group-hover:text-cyan-300" size={20} />
                    </div>

                    <LanguageSwitcher />
                </div>
            </div>

            {/* Bottom scan line */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-40"></div>
        </header>
    )
}