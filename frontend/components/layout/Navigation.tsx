'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="flex items-center justify-between h-[60px] md:h-[140px]">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 md:space-x-4 h-full relative z-10">
            {/* Display LCS logo - cropped 20% from all edges */}
            <div className="flex items-center justify-center h-[84px] md:h-[189px] w-auto max-w-[135px] md:max-w-[303px]">
              <img
                src={logoImage}
                alt={logoText}
                className="max-h-[84px] md:max-h-[189px] max-w-[135px] md:max-w-[303px] w-auto h-auto object-contain relative -z-10"
                style={{
                  backgroundColor: '#fdfdfd',
                  clipPath: 'inset(20% 20% 20% 20%)'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            </div>

            {/* LessonCraftStudio text - responsive sizing */}
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold text-base sm:text-lg md:text-2xl text-gray-900 tracking-tight leading-none">
                LessonCraftStudio
              </span>
              <span className="hidden sm:block text-[10px] md:text-xs text-gray-500 tracking-wide mt-0.5">
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
          <div className="hidden lg:flex items-center space-x-8">
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <Link
              href={`/${locale}/apps`}
              className="block py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navContent?.menuItems?.apps?.[locale] || t('apps')}
            </Link>
            <Link
              href={`/${locale}/pricing`}
              className="block py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navContent?.menuItems?.pricing?.[locale] || t('pricing')}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="block py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navContent?.menuItems?.blog?.[locale] || t('blog')}
            </Link>
            <Link
              href={`/${locale}/dashboard`}
              className="block py-2 text-gray-600 hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navContent?.menuItems?.dashboard?.[locale] || t('dashboard')}
            </Link>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Language:</span>
                <LanguageSelector />
              </div>

              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = `/${locale}`;
                  }}
                >
                  {t('signOut')}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    href={`/${locale}/auth/signin`}
                    className="w-full"
                  >
                    {navContent?.buttons?.signIn?.[locale] || t('signIn')}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    href={`/${locale}/auth/signup`}
                    className="w-full"
                  >
                    {navContent?.buttons?.startFree?.[locale] || t('startFree')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}