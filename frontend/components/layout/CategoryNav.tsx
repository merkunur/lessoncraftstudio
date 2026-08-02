'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  buildCategories,
  type CategoryKey,
  type ToolLabel,
  type AxisLabelMap,
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
  availableTargets?: Array<{ iso: string; slug: string; name: string; count: number }>;
  // toolKey → native tool slug for this locale. Server-sourced (the
  // tool-content JSON is far too large to import into a client component);
  // without it every Manipulatives item falls back to the /tools index.
  toolSlugs?: Record<string, string>;
  toolLabels?: ToolLabel[];
  axisLabels?: AxisLabelMap;
  makerSlugs?: Record<string, string>;
}

export function CategoryNav({
  availableExerciseTypes = [],
  availableActivities = [],
  availableThemes = [],
  availableTargets = [],
  toolSlugs = {},
  toolLabels = [],
  axisLabels = {},
  makerSlugs = {},
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
    availableTargets,
    toolSlugs,
    makerSlugs,
    toolLabels,
    axisLabels,
    t,
  });

  return (
    <div
      ref={containerRef}
      className="hidden lg:block bg-[#146B5E]/[0.04] border-b border-[#14322D]/[0.07] relative z-40"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <ul className="flex items-center justify-center gap-1 h-12" role="menubar">
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
                  className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[0.9375rem] font-bold tracking-[0.005em] transition-colors duration-150 after:absolute after:left-3.5 after:right-3.5 after:-bottom-[3px] after:h-[2.5px] after:rounded-full after:bg-[#F2784B] after:origin-left after:transition-transform after:duration-200 ${
                    isOpen
                      ? 'text-[#0E544A] bg-[#146B5E]/[0.08] after:scale-x-100'
                      : 'text-[#14322D]/85 hover:text-[#14322D] after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {d.label}
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className={`text-[#146B5E]/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {/* SSR-crawlable list — always in the DOM so the header-nav
                    topic mesh ships in raw HTML (the popover below is gated on
                    `isOpen`, renders nothing server-side — §A.13.50). sr-only
                    keeps the visual design unchanged. Do NOT remove. */}
                <ul className="sr-only">
                  {d.items.map(item => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href={d.browseAllHref}>{d.browseAllLabel}</Link>
                  </li>
                </ul>

                {isOpen && (
                  <div
                    role="menu"
                    aria-label={d.label}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-64 bg-cream-50 border border-cream-300 rounded-lg shadow-lg py-2 z-50"
                  >
                    {/* VISIBLE popover only — capped by visibleCount so the
                        40-tool Tools menu doesn't unroll into a giant column.
                        The sr-only <ul> above deliberately keeps every item
                        (that is the crawlable mesh, §A.13.50); do NOT move
                        this slice up there. */}
                    <ul className="space-y-0.5">
                      {d.items.slice(0, d.visibleCount ?? d.items.length).map(item => (
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
