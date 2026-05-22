'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { PlatformSearch } from '@/components/PlatformSearch';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Menu, X } from 'lucide-react';
import { CategoryNav } from './CategoryNav';
import { MobileCategoryAccordion } from './MobileCategoryAccordion';

// Minimal educator-aligned navigation per HOMEPAGE-IMPLEMENTATION-PROMPT.md §6.10 + T4 option C.
// Drops the seller-era Free Tools / Resources dropdowns and the Apps / Pricing links —
// those routes still exist (orphaned but reachable) and are removed in the broader
// teardown per CLAUDE.md §11 / §17. The home page's Section 5 carries the Subscribe CTA;
// the nav itself stays pared down.

interface NavigationProps {
  availableExerciseTypes?: string[];
  availableActivities?: Array<{ id: string; slug: string; title: string; code: string }>;
  availableThemes?: string[];
}

export function Navigation({
  availableExerciseTypes = [],
  availableActivities = [],
  availableThemes = [],
}: NavigationProps = {}) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape; move focus into the drawer when it opens so
  // keyboard users land on the first interactive element (the first
  // category accordion toggle) and screen readers announce the new region.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
      'button[aria-controls], a, button:not([aria-hidden])',
    );
    firstFocusable?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

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

  const closeDrawer = () => setMobileMenuOpen(false);

  return (
    <>
    <nav className="bg-cream-50 border-b border-cream-300 relative z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between gap-4 h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 lg:space-x-3 h-full relative z-10 flex-shrink-0">
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

          {/* Platform search — desktop centered. IXL-faithful prominent
              search per Direction A locked 2026-05-21. Scope: activities +
              tools only (decks NOT indexed). */}
          <div className="hidden lg:flex flex-1 max-w-md justify-center">
            <PlatformSearch />
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <LanguageSelector />
            <div className="h-5 w-px bg-cream-300" />
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  {/* Tool 2A — subscriber-only Workspace nav entry per Q-i Option β.
                      Replaces Tool 1A's standalone "Collections" entry; /collections
                      stays reachable via Workspace home's "View all" link. */}
                  {!!user && (
                    <Link href={`/${locale}/workspace`} className="px-3 py-2 text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-cream-200 rounded-md transition-colors">
                      {t('workspace')}
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
            className="lg:hidden p-2 text-ink-600 hover:text-ink-900 flex-shrink-0"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile-only search row, sits beneath the brand row */}
        <div className="lg:hidden pb-3 pt-1">
          <PlatformSearch />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu-drawer"
        ref={drawerRef}
        className={`lg:hidden ${mobileMenuOpen ? 'overflow-y-auto' : 'overflow-hidden'} transition-[max-height,border-color] duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[85vh] border-t border-cream-300' : 'max-h-0 border-t border-transparent'
        } bg-cream-50`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {/* Category nav accordion — first child so the primary navigation
              is the first thing keyboard / screen-reader users hit on open.
              Consumes the same buildCategories() output as the desktop
              CategoryNav so the two surfaces stay in sync. */}
          <MobileCategoryAccordion
            locale={locale}
            availableExerciseTypes={availableExerciseTypes}
            availableActivities={availableActivities}
            availableThemes={availableThemes}
            onItemClick={closeDrawer}
          />

          <div className="flex items-center justify-between pt-2 border-t border-cream-300">
            <span className="text-sm text-ink-600">{localizedLanguageLabel[locale] || 'Language:'}</span>
            <LanguageSelector />
          </div>

          {user ? (
            <div className="space-y-2 pt-4 border-t border-cream-300">
              {/* Tool 2A — subscriber-only Workspace entry, mobile mirror per Q-i β. */}
              {!!user && (
                <Link
                  href={`/${locale}/workspace`}
                  className="block py-2 text-ink-600 hover:text-primary transition-colors font-medium"
                  onClick={closeDrawer}
                >
                  {t('workspace')}
                </Link>
              )}
              <Link
                href="/member"
                className="block py-2 text-ink-600 hover:text-primary transition-colors font-medium"
                onClick={closeDrawer}
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
    {/* Category dropdown nav — second row, desktop-only. Mobile users access
        categories via the accordion inside the mobile drawer above. */}
    <CategoryNav
      availableExerciseTypes={availableExerciseTypes}
      availableActivities={availableActivities}
      availableThemes={availableThemes}
    />
    </>
  );
}
