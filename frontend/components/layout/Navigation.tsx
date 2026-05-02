'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import { Menu, X } from 'lucide-react';

// Minimal educator-aligned navigation per HOMEPAGE-IMPLEMENTATION-PROMPT.md §6.10 + T4 option C.
// Drops the seller-era Free Tools / Resources dropdowns and the Apps / Pricing links —
// those routes still exist (orphaned but reachable) and are removed in the broader
// teardown per CLAUDE.md §11 / §17. The home page's Section 5 carries the Subscribe CTA;
// the nav itself stays pared down.

export function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const localizedLanguageLabel: Record<string, string> = {
    en: 'Language:',
    de: 'Sprache:',
    fr: 'Langue:',
    es: 'Idioma:',
    pt: 'Idioma:',
    it: 'Lingua:',
    nl: 'Taal:',
    sv: 'Språk:',
    da: 'Sprog:',
    no: 'Språk:',
    fi: 'Kieli:',
  };

  return (
    <nav className="bg-cream-50 border-b border-cream-300 relative z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 lg:space-x-3 h-full relative z-10">
            <div className="flex items-center justify-center h-10 lg:h-11 w-auto">
              <picture>
                <source srcSet="/logo-lcs.webp" type="image/webp" />
                <img
                  src="/logo-lcs-optimized.png"
                  alt="LessonCraftStudio"
                  loading="eager"
                  fetchPriority="high"
                  width={242}
                  height={313}
                  className="max-h-10 lg:max-h-11 w-auto h-auto object-contain"
                />
              </picture>
            </div>

            <span className="font-display font-semibold text-base lg:text-lg text-ink-900 tracking-tight">
              LessonCraftStudio
            </span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSelector />
            <div className="h-5 w-px bg-cream-300" />
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  {/* Tool 1A — subscriber-only Collections nav entry per Q-d Option II. */}
                  {isLcsSubscriptionActive(user) && (
                    <Link href={`/${locale}/collections`} className="px-3 py-2 text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-cream-200 rounded-md transition-colors">
                      {t('collections')}
                    </Link>
                  )}
                  <Link href="/member" className="px-3 py-2 text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-cream-200 rounded-md transition-colors">
                    {t('memberArea')}
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      localStorage.removeItem('accessToken');
                      localStorage.removeItem('refreshToken');
                      window.location.href = `/${locale}`;
                    }}
                  >
                    {t('signOut')}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" href={`/${locale}/auth/signin`}>
                    {t('signIn')}
                  </Button>
                  <Button variant="primary" size="sm" href={`/${locale}/auth/signup`}>
                    {t('signUp')}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ink-600 hover:text-ink-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${mobileMenuOpen ? 'overflow-visible' : 'overflow-hidden'} transition-[max-height,border-color] duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[500px] border-t border-cream-300' : 'max-h-0 border-t border-transparent'
        } bg-cream-50`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-600">{localizedLanguageLabel[locale] || 'Language:'}</span>
            <LanguageSelector />
          </div>

          {user ? (
            <div className="space-y-2 pt-4 border-t border-cream-300">
              {/* Tool 1A — subscriber-only Collections entry, mobile mirror. */}
              {isLcsSubscriptionActive(user) && (
                <Link
                  href={`/${locale}/collections`}
                  className="block py-2 text-ink-600 hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('collections')}
                </Link>
              )}
              <Link
                href="/member"
                className="block py-2 text-ink-600 hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('memberArea')}
              </Link>
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
            </div>
          ) : (
            <div className="pt-4 border-t border-cream-300 space-y-2">
              <Button variant="ghost" size="sm" href={`/${locale}/auth/signin`} className="w-full">
                {t('signIn')}
              </Button>
              <Button variant="primary" size="sm" href={`/${locale}/auth/signup`} className="w-full">
                {t('signUp')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
