'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

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
  const { user } = useAuth();
  const [navContent, setNavContent] = useState<NavigationContent>({});
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch navigation content and current logo from API
    fetchNavigationContent();
    fetchCurrentLogo();
  }, [locale]);

  const fetchCurrentLogo = async () => {
    try {
      const response = await fetch('/api/admin/branding/current-logo');
      if (response.ok) {
        const data = await response.json();
        setCustomLogo(data.logoUrl);
      }
    } catch (error) {
      console.error('Failed to fetch current logo:', error);
    }
  };

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

  // Use uploaded logo first, then custom content logo, then default
  const logoImage = customLogo || navContent?.logo?.image || '/logo-lcs.png';
  const logoText = navContent?.logo?.text || 'LessonCraftStudio';

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between" style={{ height: '160px' }}>
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-4 h-full">
            {/* Display LCS logo - scaled to show complete logo */}
            <div
              className="flex items-center justify-center"
              style={{
                height: '140px',
                width: 'auto',
                maxWidth: '200px'
              }}
            >
              <img
                src={logoImage}
                alt={logoText}
                style={{
                  maxHeight: '140px',
                  maxWidth: '200px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  backgroundColor: 'transparent'
                }}
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            </div>

            {/* Always show LessonCraftStudio text next to logo */}
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold text-2xl text-gray-900 tracking-tight leading-none">
                LessonCraftStudio
              </span>
              <span className="text-xs text-gray-500 tracking-wide mt-0.5">
                {locale === 'de' ? 'Pädagogischer Arbeitsblatt-Generator' :
                 locale === 'fr' ? 'Générateur de Fiches Pédagogiques' :
                 locale === 'es' ? 'Generador de Hojas de Trabajo Educativas' :
                 locale === 'it' ? 'Generatore di Schede Didattiche' :
                 locale === 'pt' ? 'Gerador de Fichas de Trabalho Educativas' :
                 locale === 'nl' ? 'Educatieve Werkbladgenerator' :
                 locale === 'sv' ? 'Pedagogisk Arbetsbladsgenerator' :
                 locale === 'da' ? 'Pædagogisk Arbejdsarkgenerator' :
                 locale === 'no' ? 'Pedagogisk Arbeidsarkgenerator' :
                 locale === 'fi' ? 'Opetusmateriaaligeneraattori' :
                 'Educational Worksheet Generator'}
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
            <Link href={`/${locale}/dashboard`} className="text-gray-600 hover:text-primary transition-colors font-medium">
              {navContent?.menuItems?.dashboard?.[locale] || t('dashboard')}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <div className="h-6 w-px bg-gray-300" />
            {user ? (
              <Button variant="ghost" size="sm" onClick={() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = `/${locale}`;
              }}>
                {t('signOut')}
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" href={`/${locale}/auth/signin`}>
                  {navContent?.buttons?.signIn?.[locale] || t('signIn')}
                </Button>
                <Button variant="primary" size="sm" href={`/${locale}/auth/signup`}>
                  {navContent?.buttons?.startFree?.[locale] || t('startFree')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}