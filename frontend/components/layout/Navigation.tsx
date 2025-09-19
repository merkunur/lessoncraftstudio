'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useEffect, useState } from 'react';

interface NavigationContent {
  logo?: {
    text?: string;
    image?: string;
  };
  menuItems?: Record<string, Record<string, string>>;
  buttons?: Record<string, Record<string, string>>;
}

export function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [navContent, setNavContent] = useState<NavigationContent>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch navigation content from API
    fetchNavigationContent();
  }, [locale]);

  const fetchNavigationContent = async () => {
    try {
      const response = await fetch(`/api/homepage/content?locale=${locale}`);
      if (response.ok) {
        const data = await response.json();
        if (data.content?.navigation) {
          setNavContent(data.content.navigation);
        }
      }
    } catch (error) {
      console.error('Failed to fetch navigation content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use custom logo if available, otherwise use the new LCS logo
  const logoImage = navContent?.logo?.image || '/logo-lcs.png';
  const logoText = navContent?.logo?.text || 'LessonCraftStudio';

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            {/* Display LCS logo */}
            <img
              src={logoImage}
              alt={logoText}
              className="h-12 w-auto object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />

            {/* Fallback text logo (only shown if image fails) */}
            <div
              className="hidden items-center space-x-3"
              style={{ display: 'none' }}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-display font-semibold text-gray-900">
                LessonCraftStudio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}/apps`} className="text-gray-600 hover:text-primary transition-colors">
              {navContent?.menuItems?.apps?.[locale] || t('apps')}
            </Link>
            <Link href={`/${locale}/pricing`} className="text-gray-600 hover:text-primary transition-colors">
              {navContent?.menuItems?.pricing?.[locale] || t('pricing')}
            </Link>
            <Link href={`/${locale}/blog`} className="text-gray-600 hover:text-primary transition-colors">
              {navContent?.menuItems?.blog?.[locale] || t('blog')}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <div className="h-6 w-px bg-gray-300" />
            <Button variant="ghost" size="sm" href={`/${locale}/auth/signin`}>
              {navContent?.buttons?.signIn?.[locale] || t('signIn')}
            </Button>
            <Button variant="primary" size="sm" href={`/${locale}/auth/signup`}>
              {navContent?.buttons?.startFree?.[locale] || t('startFree')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}