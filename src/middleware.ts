import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: ['/', '/(pt|en)/:path*'] // Match only internationalized pathnames
  // matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};