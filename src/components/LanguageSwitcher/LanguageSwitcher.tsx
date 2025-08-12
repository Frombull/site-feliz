'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const locales = [
  {
    code: 'en',
    label: 'English',
    flag: '/flags/flag_us.svg'
  },
  {
    code: 'pt',
    label: 'Português',
    flag: '/flags/flag_br.svg'
  }
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const current = locales.find(l => l.code === locale);

  const handleChangeLocale = (newLocale: string) => {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-cyan-500/30 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all group"
      >
        <Globe size={16} className="group-hover:animate-spin" />
        {current?.flag && (
          <Image
            src={current.flag}
            alt={`${current.code} flag`}
            width={16}
            height={16}
            className="rounded-sm border border-cyan-500/30"
          />
        )}
        <span className="uppercase font-mono">{current?.code}</span>
        <ChevronDown 
          size={14} 
          className={`transform transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 cyber-card border border-cyan-500/30 shadow-2xl">
          <div className="p-2">
            {locales.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => handleChangeLocale(code)}
                className={`flex items-center gap-3 px-3 py-2 w-full text-left text-sm rounded transition-all ${
                  code === locale
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-semibold'
                    : 'cyber-text hover:bg-cyan-500/10 hover:text-cyan-400 border border-transparent'
                }`}
              >
                <Image
                  src={flag}
                  alt={`${code} flag`}
                  width={20}
                  height={20}
                  className="rounded-sm border border-cyan-500/30"
                />
                <span className="font-medium">{label}</span>
                {code === locale && (
                  <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Cyber decoration */}
          <div className="border-t border-cyan-500/20 p-2">
            <div className="text-xs cyber-mono text-cyan-400/50 text-center">
              LANG.PROTOCOL.v2.0
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
