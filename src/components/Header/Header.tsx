'use client';

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import Link from "next/link";

export function Header() {
    const pathname = usePathname();

    return(
        <header className="flex items-center px-4 md:px-6 py-4 bg-zinc-900 border-b border-zinc-700">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-white tracking-tighter">
                    NextJS
                </Link>

                <LanguageSwitcher />

                {/* Navigation */}
                <nav>
                    <ul className="flex items-center gap-2">
                        <li>
                            <Link 
                                href={'/'} 
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    pathname === '/' 
                                    ? 'bg-zinc-800 text-white' 
                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href={'/dashboard'}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    pathname === '/dashboard' 
                                    ? 'bg-zinc-800 text-white' 
                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href={'/login'}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    pathname === '/login' 
                                    ? 'bg-zinc-800 text-white' 
                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}