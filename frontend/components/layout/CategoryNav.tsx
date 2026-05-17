'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import topicsTaxonomy from '@/config/topics-taxonomy.json';

// Header dropdown nav per homepage-restructure commission (2026-05-17 strategic
// lock §8.1). Adds a second nav row beneath the existing Navigation row with 4
// category dropdowns matching the FourCardGrid composition.
//
// Per Phase 0 decisions:
//   - Custom Tailwind + CVA + lucide-react (no @radix-ui / @headlessui per §10.3
//     "add new dependencies" guard)
//   - Sub-item content sourced from topics-taxonomy.json (per §16.5) +
//     hardcoded strand list (per §A.13.37). Read-from-SoT precedence per §10.4.
//   - Keyboard a11y: Esc to close; click-outside to close; aria-expanded;
//     aria-haspopup; focus-managed (no full focus-trap to keep scope minimal —
//     dropdowns close on outside click + Esc which covers the keyboard case).
//   - Mobile: dropdowns become inline-expand sections in the mobile menu; this
//     component renders the desktop nav row only. Mobile-menu integration lives
//     in Navigation.tsx mobile section.

// --- Sub-item resolution from topics-taxonomy ---

interface TaxonomySchema {
  axes: {
    'exercise-type': Record<string, { slug: Record<string, string>; name: Record<string, string> }>;
  };
}

// 6 operator-curated exercise-type anchors for Worksheets + Interactive dropdowns.
// Per CLAUDE.md §A.13.37 logic-class + §14.10 canonical 29 apps, these are
// high-engagement category exemplars across math/literacy/logic/spatial.
const WORKSHEETS_ANCHOR_KEYS = [
  'addition',
  'subtraction',
  'cryptogram',
  'crossword',
  'wordsearch',
  'matching',
] as const;

// 6 interactive-suited anchors (different mix; surfaces interactive-strong mechanics).
const INTERACTIVE_ANCHOR_KEYS = [
  'sudoku',
  'picture-path',
  'matching',
  'shadow-match',
  'pattern-train',
  'bingo',
] as const;

// 6 Apps anchors — operator-curated representative subset of the 29 §14.10 apps.
const APPS_ANCHOR_KEYS = [
  'addition',
  'word-guess',
  'sudoku',
  'cryptogram',
  'picture-path',
  'crossword',
] as const;

// 6 §A.13.37 class-conditional strands for Teaching packages dropdown.
// Reads as canonical pedagogical lenses, not exercise-type axis-keys.
type StrandKey = 'numeracy' | 'literacy' | 'vocabulary' | 'worldKnowledge' | 'logic' | 'sel';
const STRANDS: ReadonlyArray<StrandKey> = ['numeracy', 'literacy', 'vocabulary', 'worldKnowledge', 'logic', 'sel'];

function resolveAxisSlug(axisKey: string, locale: string): string {
  const taxonomy = topicsTaxonomy as unknown as TaxonomySchema;
  const entry = taxonomy.axes['exercise-type']?.[axisKey];
  return entry?.slug?.[locale] ?? entry?.slug?.en ?? axisKey;
}

function resolveAxisName(axisKey: string, locale: string): string {
  const taxonomy = topicsTaxonomy as unknown as TaxonomySchema;
  const entry = taxonomy.axes['exercise-type']?.[axisKey];
  return entry?.name?.[locale] ?? entry?.name?.en ?? axisKey;
}

// --- Component ---

type CategoryKey = 'worksheets' | 'apps' | 'teachingPackages' | 'interactive';

interface DropdownItem {
  href: string;
  label: string;
}

interface CategoryDropdown {
  key: CategoryKey;
  label: string;
  items: DropdownItem[];
  browseAllHref: string;
  browseAllLabel: string;
}

export function CategoryNav() {
  const t = useTranslations('nav.categories');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [openKey, setOpenKey] = useState<CategoryKey | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click + Esc.
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

  // Build dropdown definitions from taxonomy + strand list.
  const worksheetsItems: DropdownItem[] = WORKSHEETS_ANCHOR_KEYS.map(key => ({
    href: `/${locale}/topic/${resolveAxisSlug(key, locale)}/`,
    label: resolveAxisName(key, locale),
  }));
  const interactiveItems: DropdownItem[] = INTERACTIVE_ANCHOR_KEYS.map(key => ({
    href: `/${locale}/topic/${resolveAxisSlug(key, locale)}/`,
    label: resolveAxisName(key, locale),
  }));
  const appsItems: DropdownItem[] = APPS_ANCHOR_KEYS.map(key => ({
    href: `/${locale}/worksheet-makers/#${key}`,
    label: resolveAxisName(key, locale),
  }));
  const teachingPackagesItems: DropdownItem[] = STRANDS.map(strand => ({
    href: `/${locale}/teaching-packages/?strand=${strand}`,
    label: t(`strands.${strand}`),
  }));

  const dropdowns: CategoryDropdown[] = [
    {
      key: 'worksheets',
      label: t('worksheets'),
      items: worksheetsItems,
      browseAllHref: `/${locale}/topic/${resolveAxisSlug('addition', locale)}/`,
      browseAllLabel: t('browseAll.worksheets'),
    },
    {
      key: 'apps',
      label: t('apps'),
      items: appsItems,
      browseAllHref: `/${locale}/worksheet-makers/`,
      browseAllLabel: t('browseAll.apps'),
    },
    {
      key: 'teachingPackages',
      label: t('teachingPackages'),
      items: teachingPackagesItems,
      browseAllHref: `/${locale}/teaching-packages/`,
      browseAllLabel: t('browseAll.teachingPackages'),
    },
    {
      key: 'interactive',
      label: t('interactive'),
      items: interactiveItems,
      browseAllHref: `/${locale}/topic/${resolveAxisSlug('matching', locale)}/`,
      browseAllLabel: t('browseAll.interactive'),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="hidden lg:block bg-cream-50 border-b border-cream-300 relative z-40"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <ul className="flex items-center justify-center gap-2 h-12" role="menubar">
          {dropdowns.map(d => {
            const isOpen = openKey === d.key;
            return (
              <li key={d.key} className="relative" role="none">
                <button
                  type="button"
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenKey(isOpen ? null : d.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isOpen
                      ? 'bg-cream-200 text-ink-900'
                      : 'text-ink-700 hover:bg-cream-100 hover:text-ink-900'
                  }`}
                >
                  {d.label}
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    role="menu"
                    aria-label={d.label}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-64 bg-cream-50 border border-cream-300 rounded-lg shadow-lg py-2 z-50"
                  >
                    <ul className="space-y-0.5">
                      {d.items.map(item => (
                        <li key={item.href} role="none">
                          <Link
                            href={item.href}
                            role="menuitem"
                            className="block px-4 py-2 text-sm text-ink-700 hover:bg-cream-200 hover:text-ink-900 transition-colors"
                            onClick={() => setOpenKey(null)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li role="none" className="border-t border-cream-300 mt-2 pt-2">
                        <Link
                          href={d.browseAllHref}
                          role="menuitem"
                          className="block px-4 py-2 text-sm font-medium text-terracotta-500 hover:bg-cream-200 hover:text-terracotta-600 transition-colors"
                          onClick={() => setOpenKey(null)}
                        >
                          {d.browseAllLabel} →
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
