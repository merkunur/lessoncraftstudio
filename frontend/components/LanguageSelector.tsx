'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { locales } from '@/i18n/request';

const languageNames: Record<string, string> = {
  da: 'Dansk',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  nl: 'Nederlands',
  no: 'Norsk',
  pt: 'Português',
  fi: 'Suomi',
  sv: 'Svenska'
};

// Locale code → hreflang code per Next.js Metadata API emission (matches
// getHreflangCode at frontend/lib/schema-generator.ts). `pt` emits as `pt-BR`
// (Brazilian Portuguese canonical per §6); other locales map 1:1.
const HREFLANG_CODE_MAP: Record<string, string> = {
  da: 'da', de: 'de', en: 'en', es: 'es', fi: 'fi',
  fr: 'fr', it: 'it', nl: 'nl', no: 'no', pt: 'pt-BR', sv: 'sv'
};

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract current locale from pathname
  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] || 'en';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = async (newLocale: string) => {
    // Native-language slug doctrine (§17.4): topic-page URLs differ per locale
    // (e.g., /es/topic/suma/ vs /de/topic/addition/). Path-segment swap alone
    // produces 404s when the slug doesn't match the target locale's axis-key
    // slug. Consume the Next.js Metadata API's hreflang alternates as the
    // source-of-truth for cross-locale URL equivalents (already emitted on
    // topic pages per frontend/app/[locale]/topic/[slug]/page.tsx:149-168).
    //
    // Fallback chain:
    //   1. hreflang alternate in DOM → use href.pathname
    //   2. deck pages (no cross-locale siblings per §17.8.7) → /${newLocale}
    //   3. homepage + static pages → path-segment swap (locale-only change)
    const code = HREFLANG_CODE_MAP[newLocale] || newLocale;
    const link = document.querySelector(`link[rel="alternate"][hreflang="${code}"]`);
    if (link) {
      const href = link.getAttribute('href');
      if (href) {
        try {
          const url = new URL(href);
          router.push(url.pathname);
          setIsOpen(false);
          return;
        } catch {
          // malformed href; fall through to fallback
        }
      }
    }

    if (pathSegments[2] === 'decks') {
      // Deck pages have no cross-locale siblings (v1 per §17.8.7); locale
      // switch lands at the target locale's homepage.
      router.push(`/${newLocale}`);
    } else {
      // Homepage + static pages: path-segment swap is correct (the page-
      // structure URL is locale-invariant outside the locale prefix).
      const newPathSegments = [...pathSegments];
      newPathSegments[1] = newLocale;
      const newPath = newPathSegments.join('/') || `/${newLocale}`;
      router.push(newPath);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Select language"
      >
        <span className="text-sm font-medium text-gray-700">
          {languageNames[currentLocale]}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {[...locales]
            .sort((a, b) => languageNames[a].localeCompare(languageNames[b]))
            .map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                locale === currentLocale ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span className="text-sm font-medium">{languageNames[locale]}</span>
              {locale === currentLocale && (
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}