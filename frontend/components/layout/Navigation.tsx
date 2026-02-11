'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px] md:h-[140px]">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 md:space-x-4 h-full relative z-10">
            {/* Display LCS logo - size reduced by 20% */}
            <div className="flex items-center justify-center h-[67px] md:h-[151px] w-auto max-w-[108px] md:max-w-[242px]">
              <picture>
                <source srcSet="/logo-lcs.webp" type="image/webp" />
                <img
                  src="/logo-lcs-optimized.png"
                  alt="LessonCraftStudio"
                  loading="eager"
                  fetchPriority="high"
                  width={242}
                  height={313}
                  className="max-h-[67px] md:max-h-[151px] max-w-[108px] md:max-w-[242px] w-auto h-auto object-contain relative -z-10"
                />
              </picture>
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
              {t('apps')}
            </Link>
            <Link href={`/${locale}/pricing`} className="text-gray-600 hover:text-primary transition-colors">
              {t('pricing')}
            </Link>
            <Link href={`/${locale}/blog`} className="text-gray-600 hover:text-primary transition-colors">
              {t('blog')}
            </Link>
            <Link href={`/${locale}/dashboard`} className="text-gray-600 hover:text-primary transition-colors font-medium">
              {t('dashboard')}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center space-x-2 min-w-[200px] justify-end">
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
                    {t('signIn')}
                  </Button>
                  <Button variant="primary" size="sm" href={`/${locale}/auth/signup`}>
                    {t('startFree')}
                  </Button>
                </>
              )}
            </div>
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

      {/* Mobile Menu - CSS transition instead of conditional render to avoid CLS */}
      <div
        className={`md:hidden ${mobileMenuOpen ? 'overflow-visible' : 'overflow-hidden'} transition-[max-height,border-color] duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[500px] border-t border-gray-200' : 'max-h-0 border-t border-transparent'
        } bg-white`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <Link
              href={`/${locale}/apps`}
              className="block py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('apps')}
            </Link>
            <Link
              href={`/${locale}/pricing`}
              className="block py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('pricing')}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="block py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('blog')}
            </Link>
            <Link
              href={`/${locale}/dashboard`}
              className="block py-2 text-gray-600 hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('dashboard')}
            </Link>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{{ en:'Language:', de:'Sprache:', fr:'Langue:', es:'Idioma:', pt:'Idioma:', it:'Lingua:', nl:'Taal:', sv:'Spr\u00e5k:', da:'Sprog:', no:'Spr\u00e5k:', fi:'Kieli:' }[locale] || 'Language:'}</span>
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
                    {t('signIn')}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    href={`/${locale}/auth/signup`}
                    className="w-full"
                  >
                    {t('startFree')}
                  </Button>
                </div>
              )}
            </div>
          </div>
      </div>
    </nav>
  );
}