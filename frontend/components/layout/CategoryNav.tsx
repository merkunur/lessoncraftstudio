'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  buildCategories,
  type CategoryKey,
} from '@/lib/category-nav-data';

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
//   - Mobile: dropdowns become inline-expand sections in the mobile menu;
//     this component renders the desktop nav row only. Mobile-menu integration
//     lives in Navigation.tsx via MobileCategoryAccordion, which consumes the
//     same buildCategories() output so the two surfaces stay in sync.

interface CategoryNavProps {
  // Per-locale non-empty exercise-type axis-keys, sourced from
  // listNonEmptyAxisKeys('exercise-type', locale) at the LocaleLayout server
  // component. Used to filter dropdown sub-items so we never link to a
  // 404'ing topic-page per §16.6.1 substrate-honesty.
  availableExerciseTypes?: string[];
  // Per-locale activity-row summaries for the Activities dropdown.
  // Server-resolved at LocaleLayout so the manifest fs.read happens once
  // per locale-rendered page, not per CategoryNav mount.
  availableActivities?: Array<{ id: string; slug: string; title: string; code: string }>;
  // Per-locale non-empty theme axis-keys for the Topics dropdown sub-items.
  availableThemes?: string[];
}

export function CategoryNav({
  availableExerciseTypes = [],
  availableActivities = [],
  availableThemes = [],
}: CategoryNavProps) {
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

  const dropdowns = buildCategories({
    locale,
    availableExerciseTypes,
    availableActivities,
    availableThemes,
    t,
  });

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
