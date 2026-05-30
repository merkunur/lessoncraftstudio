'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronUp } from 'lucide-react';
import { buildCategories } from '@/lib/category-nav-data';

// Footer dropdown row — 3 compact dropdown buttons (byLanguage / byTopic /
// byExerciseType). Panels pop UP from the footer (bottom-full position) so
// they don't get clipped off the viewport edge.
//
// Data sources (reuse existing per operator's "reuse the existing nav
// dropdown component/data if possible rather than building new"):
//   - byLanguage  → 11-locale list (mirrors LanguageSelector.tsx)
//   - byTopic     → buildCategories(...).find(c => c.key === 'topics')
//   - byExType    → buildCategories(...).find(c => c.key === 'worksheets')
//
// Substrate-honesty filtering for byTopic / byExType runs inside
// buildCategories via the availableThemes / availableExerciseTypes props,
// which still flow from the LocaleLayout server component through
// LocaleLayoutClient and into Footer.

// Mirrors frontend/components/LanguageSelector.tsx lines 7-19. Hardcoded
// here too because the footer dropdown is a different surface from the
// header LanguageSelector — keeping the data lookup local avoids cross-
// component coupling for what is ultimately ~11 lines of metadata.
const FOOTER_LANGUAGES: Array<{ code: string; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pt', label: 'Português' },
  { code: 'sv', label: 'Svenska' },
  { code: 'da', label: 'Dansk' },
  { code: 'no', label: 'Norsk' },
  { code: 'fi', label: 'Suomi' },
];

interface FooterCategoryDropdownsProps {
  locale: string;
  availableExerciseTypes?: string[];
  availableThemes?: string[];
}

type DropdownKey = 'languages' | 'topics' | 'worksheets';

interface DropdownConfig {
  key: DropdownKey;
  label: string;
  items: Array<{ href: string; label: string }>;
  browseAllHref?: string;
  browseAllLabel?: string;
}

export function FooterCategoryDropdowns({
  locale,
  availableExerciseTypes = [],
  availableThemes = [],
}: FooterCategoryDropdownsProps) {
  const t = useTranslations('nav.categories');
  const tFooter = useTranslations('footer');
  const [openKey, setOpenKey] = useState<DropdownKey | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click + Esc — same idiom as CategoryNav.
  useEffect(() => {
    if (!openKey) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenKey(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openKey]);

  // Compose the 3 dropdowns. byTopic + byExerciseType come from the same
  // buildCategories() helper CategoryNav + MobileCategoryAccordion use, so
  // the link sets stay in sync across all surfaces.
  const cats = buildCategories({
    locale,
    availableExerciseTypes,
    availableActivities: [],
    availableThemes,
    t,
  });
  const topicsCat = cats.find(c => c.key === 'topics');
  const worksheetsCat = cats.find(c => c.key === 'worksheets');

  const dropdowns: DropdownConfig[] = [
    {
      key: 'languages',
      label: tFooter('byLanguage'),
      items: FOOTER_LANGUAGES.map(l => ({ href: `/${l.code}`, label: l.label })),
    },
    {
      key: 'topics',
      label: tFooter('byTopic'),
      items: topicsCat?.items ?? [],
      browseAllHref: topicsCat?.browseAllHref,
      browseAllLabel: topicsCat?.browseAllLabel,
    },
    {
      key: 'worksheets',
      label: tFooter('byExerciseType'),
      items: worksheetsCat?.items ?? [],
      browseAllHref: worksheetsCat?.browseAllHref,
      browseAllLabel: worksheetsCat?.browseAllLabel,
    },
  ];

  const closeDropdown = () => setOpenKey(null);

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-3 flex-wrap">
      {dropdowns.map(d => {
        const isOpen = openKey === d.key;
        const panelId = `footer-dropdown-panel-${d.key}`;
        if (d.items.length === 0) return null;
        return (
          <div key={d.key} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenKey(isOpen ? null : d.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isOpen
                  ? 'bg-cream-200 text-ink-900'
                  : 'text-ink-700 hover:bg-cream-100 hover:text-ink-900'
              }`}
            >
              {d.label}
              <ChevronUp
                size={14}
                strokeWidth={2}
                className={`transition-transform ${isOpen ? '' : 'rotate-180'}`}
                aria-hidden="true"
              />
            </button>

            {/* SSR-crawlable link list — always in the DOM so the §16.6 footer
                topic mesh exists in raw HTML on every page (the visual popover
                below is gated on `isOpen` and renders nothing server-side, the
                §A.13.50 client-dropdown SSR gotcha). sr-only keeps the visual
                design unchanged; the interactive popover is the enhanced layer.
                Do NOT remove — these are the crawlable internal links. */}
            <ul className="sr-only">
              {d.items.map(item => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              {d.browseAllHref && d.browseAllLabel && (
                <li>
                  <Link href={d.browseAllHref}>{d.browseAllLabel}</Link>
                </li>
              )}
            </ul>

            {isOpen && (
              <div
                id={panelId}
                role="menu"
                aria-label={d.label}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-60 max-h-72 overflow-y-auto bg-cream-50 border border-cream-300 rounded-lg shadow-lg py-2 z-50"
              >
                <ul className="space-y-0.5">
                  {d.items.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="block px-4 py-1.5 text-sm text-ink-700 hover:bg-cream-200 hover:text-ink-900 transition-colors"
                        onClick={closeDropdown}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {d.browseAllHref && d.browseAllLabel && (
                    <li className="border-t border-cream-300 mt-2 pt-2">
                      <Link
                        href={d.browseAllHref}
                        role="menuitem"
                        className="block px-4 py-1.5 text-sm font-medium text-terracotta-500 hover:bg-cream-200 hover:text-terracotta-600 transition-colors"
                        onClick={closeDropdown}
                      >
                        {d.browseAllLabel} →
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
