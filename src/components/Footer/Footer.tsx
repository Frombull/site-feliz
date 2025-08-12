'use client';

import { Github, Linkedin, Terminal, Code, Cpu, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import Link from "next/link";

export function Footer() {
    const t = useTranslations('footer');
    const locale = useLocale();

    return (
        <footer className="relative mt-20 border-t border-cyan-500/30 bg-gradient-to-b from-transparent to-black/50">
            {/* Cyber grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-20"></div>
            
            {/* Top scan line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            
            <div className="relative z-10 container mx-auto px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* System Info */}
                    <div className="cyber-card p-6 group hover:border-cyan-400/50 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <Terminal className="text-cyan-400 group-hover:animate-pulse" size={20} />
                            <h4 className="font-bold cyber-subtitle">SYSTEM.INFO</h4>
                        </div>
                        <div className="space-y-3 text-sm cyber-mono">
                            <div className="flex justify-between items-center">
                                <span className="text-cyan-400">STATUS:</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400">ONLINE</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-400">VERSION:</span>
                                <span className="cyber-text group-hover:text-cyan-300 transition-colors">2025.1.0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-400">UPTIME:</span>
                                <span className="cyber-text group-hover:text-cyan-300 transition-colors">24/7</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-400">LOAD:</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse" style={{width: '75%'}}></div>
                                    </div>
                                    <span className="text-xs cyber-text">75%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="cyber-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Code className="text-cyan-400" size={20} />
                            <h4 className="font-bold cyber-subtitle">{t('navigation')}</h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                            {[
                                { href: "#about", label: t('about') },
                                { href: "#experience", label: t('experience') },
                                { href: "#projects", label: t('projects') },
                                { href: "#contact", label: t('contact') }
                            ].map((item, index) => (
                                <li key={item.href}>
                                    <a href={item.href} className="cyber-text hover:text-cyan-400 transition-colors flex items-center gap-2">
                                        <span className="text-cyan-400/50">[{String(index + 1).padStart(2, '0')}]</span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="cyber-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Cpu className="text-cyan-400" size={20} />
                            <h4 className="font-bold cyber-subtitle">{t('connect')}</h4>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <a href="https://github.com/Frombull" target="_blank" rel="noopener noreferrer" 
                               className="p-3 border border-cyan-500/30 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all group">
                                <Github size={20} className="group-hover:animate-pulse" />
                            </a>
                            <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" 
                               className="p-3 border border-cyan-500/30 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all group">
                                <Linkedin size={20} className="group-hover:animate-pulse" />
                            </a>
                        </div>
                        <div className="text-xs cyber-mono cyber-text">
                            <div>PROTOCOLS: HTTPS, SSH</div>
                            <div>ENCRYPTION: AES-256</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-cyan-500/20 pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <div className="text-center lg:text-left">
                            <p className="cyber-text text-sm mb-2">
                                {t('developedWith')}
                            </p>
                            <p className="text-xs cyber-mono text-cyan-400/70">
                                &copy; {new Date().getFullYear()} MARCO.DI.TORO.EXE - {t('copyright')}
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 text-xs">
                            <Link
                                href="https://github.com/Frombull/site-feliz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cyber-link"
                            >
                                {t('sourceCode')}
                            </Link>
                            <Link href={`/${locale}/privacy-policy`} 
                                className="cyber-link"
                            >
                                {t('privacyPolicy')}
                            </Link>
                            <Link href={`/${locale}/terms-of-service`} 
                                className="cyber-link"
                            >
                                {t('termsOfService')}
                            </Link>
                            <Link href={`/${locale}/cookies-policy`} 
                                className="cyber-link"
                            >
                                {t('cookiesPolicy')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Power indicator with enhanced effects */}
                <div className="flex justify-center mt-8">
                    <div className="relative flex items-center gap-2 px-6 py-3 border border-green-500/30 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-all group cursor-pointer">
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-full border border-green-400/50 opacity-0 group-hover:opacity-100"></div>
                        
                        <Zap className="text-green-400 animate-pulse" size={16} />
                        <span className="text-xs cyber-mono text-green-400 group-hover:text-green-300">
                            SYSTEM OPERATIONAL
                        </span>
                        
                        {/* Status dots */}
                        <div className="flex gap-1 ml-2">
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom scan line */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60"></div>
        </footer>
    );
}