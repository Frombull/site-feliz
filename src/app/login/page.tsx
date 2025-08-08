'use client';

import { redirect } from 'next/navigation';

export default function LoginRootRedirect() {
  // Redireciona para o locale padrão 'pt'
  redirect('/pt/login');
}


