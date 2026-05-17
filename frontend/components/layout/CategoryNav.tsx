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

// Operator-curated exercise-type anchor candidates for Worksheets +
// Interactive dropdowns. Filtered at render time against the locale's
// non-empty axis-keys (passed in via `availableExerciseTypes` prop from
// LocaleLayout) per §16.6.1 substrate-honesty — only axis-keys with ≥1
// published deck in the current locale render as dropdown sub-items.
//
// `picture-path` + `sudoku` removed from canonical anchors: en uses
// per-locale aliases `picture-trail` + `picture-sudoku` (per §15.10
// cross-locale-OK + topics-taxonomy.json slug.en), and the canonical
// axis-key topic-pages return 404 because en's decks were archived at
// commit 0ad626cb. The locale-filter handles this correctly by checking
// each candidate against availableExerciseTypes before rendering.
const WORKSHEETS_ANCHOR_CANDIDATES = [
  'addition',
  'subtraction',
  'cryptogram',
  'crossword',
  'wordsearch',
  'matching',
  'word-guess',
  'word-scramble',
  'find-and-count',
] as const;

const INTERACTIVE_ANCHOR_CANDIDATES = [
  'matching',
  'shadow-match',
  'pattern-train',
  'bingo',
  'find-objects',
  'odd-one-out',
  'grid-match',
  'missing-pieces',
  'picture-sort',
] as const;

// Apps anchors — link to /worksheet-makers/#<app-anchor>. Doesn't depend on
// deck-availability per locale (landing-page list is static; not gated on
// published-deck-count). 6 operator-curated subset.
const APPS_ANCHOR_KEYS = [
  'addition',
  'word-guess',
  'crossword',
  'sudoku',
  'matching',
  'big-small',
] as const;

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

type CategoryKey = 'worksheets' | 'apps' | 'interactive';

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

interface CategoryNavProps {
  // Per-locale non-empty exercise-type axis-keys, sourced from
  // listNonEmptyAxisKeys('exercise-type', locale) at the LocaleLayout server
  // component. Used to filter dropdown sub-items so we never link to a
  // 404'ing topic-page per §16.6.1 substrate-honesty.
  availableExerciseTypes?: string[];
}

export function CategoryNav({ availableExerciseTypes = [] }: CategoryNavProps) {
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

  // Per-locale availability filter. Empty `availableExerciseTypes` means
  // either DB unavailable at build time OR locale has no published decks —
  // either way, fall back to candidates as-is so dropdown still renders.
  const availSet = new Set(availableExerciseTypes);
  const filterByAvail = (candidates: readonly string[]): string[] => {
    if (availSet.size === 0) return candidates.slice(0, 6); // fallback
    return candidates.filter(k => availSet.has(k)).slice(0, 6);
  };

  const worksheetsKeys = filterByAvail(WORKSHEETS_ANCHOR_CANDIDATES);
  const interactiveKeys = filterByAvail(INTERACTIVE_ANCHOR_CANDIDATES);

  // Dynamic browse-all destination per locale: first available axis-key.
  // Avoids hardcoded `addition` / `matching` that 404 in locales without
  // those keys (e.g., Tier 3+4 with sparse Track C catalog).
  const firstAvailable = availableExerciseTypes[0] || worksheetsKeys[0] || 'addition';
  const browseAllTopicHref = `/${locale}/topic/${resolveAxisSlug(firstAvailable, locale)}/`;

  // Build dropdown definitions.
  const worksheetsItems: DropdownItem[] = worksheetsKeys.map(key => ({
    href: `/${locale}/topic/${resolveAxisSlug(key, locale)}/`,
    label: resolveAxisName(key, locale),
  }));
  const interactiveItems: DropdownItem[] = interactiveKeys.map(key => ({
    href: `/${locale}/topic/${resolveAxisSlug(key, locale)}/`,
    label: resolveAxisName(key, locale),
  }));
  const appsItems: DropdownItem[] = APPS_ANCHOR_KEYS.map(key => ({
    href: `/${locale}/worksheet-makers/#${key}`,
    label: resolveAxisName(key, locale),
  }));

  const dropdowns: CategoryDropdown[] = [
    {
      key: 'worksheets',
      label: t('worksheets'),
      items: worksheetsItems,
      browseAllHref: browseAllTopicHref,
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
      key: 'interactive',
      label: t('interactive'),
      items: interactiveItems,
      browseAllHref: browseAllTopicHref,
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
