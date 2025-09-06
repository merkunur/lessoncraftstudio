'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-display font-semibold text-gray-900 hidden sm:block">
              LessonCraftStudio
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}/apps`} className="text-gray-600 hover:text-primary transition-colors">
              {t('apps')}
            </Link>
            <Link href={`/${locale}/pricing`} className="text-gray-600 hover:text-primary transition-colors">
              {t('pricing')}
            </Link>
            <Link href={`/${locale}/blog`} className="text-gray-600 hover:text-primary transition-colors">
              {t('blog')}
            </Link>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" href={`/${locale}/auth/signin`}>
              {t('signIn')}
            </Button>
            <Button variant="primary" size="sm" href={`/${locale}/auth/signup`}>
              {t('startFree')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}