'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import {
  buildCategories,
  type CategoryKey,
} from '@/lib/category-nav-data';

// Mobile-drawer category accordion.
//
// Renders the same 6 categories CategoryNav (desktop) renders, in the same
// order, with the same per-locale labels and the same availability-filtered
// sub-items — but as a vertical accordion that lives inside the existing
// mobile drawer in Navigation.tsx. Each category row collapses by default;
// tapping it expands to reveal up to 6 items + a "Browse all" link.
//
// Tapping any link closes the drawer via the parent-supplied onItemClick.
//
// Read-from-SoT: data + builder both come from
// `frontend/lib/category-nav-data.ts`. This component does NOT duplicate
// any of the anchor-array / label / taxonomy logic — see the shared module.

interface MobileCategoryAccordionProps {
  locale: string;
  availableExerciseTypes?: string[];
  availableActivities?: Array<{ id: string; slug: string; title: string; code: string }>;
  availableThemes?: string[];
  // Called whenever the user taps an item or browse-all link inside the
  // accordion. Parent (Navigation) uses this to close the surrounding
  // drawer so the page navigation is unobstructed.
  onItemClick: () => void;
}

export function MobileCategoryAccordion({
  locale,
  availableExerciseTypes = [],
  availableActivities = [],
  availableThemes = [],
  onItemClick,
}: MobileCategoryAccordionProps) {
  const t = useTranslations('nav.categories');
  const [openKey, setOpenKey] = useState<CategoryKey | null>(null);

  const dropdowns = buildCategories({
    locale,
    availableExerciseTypes,
    availableActivities,
    availableThemes,
    t,
  });

  return (
    <nav aria-label={t('worksheets')} className="space-y-1">
      {dropdowns.map(d => {
        const isOpen = openKey === d.key;
        const panelId = `mobile-category-panel-${d.key}`;
        return (
          <div key={d.key} className="border-b border-cream-200 last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenKey(isOpen ? null : d.key)}
              className={`w-full flex items-center justify-between py-3 px-1 text-left text-base font-medium transition-colors ${
                isOpen ? 'text-ink-900' : 'text-ink-700 hover:text-ink-900'
              }`}
            >
              <span>{d.label}</span>
              <ChevronDown
                size={18}
                strokeWidth={2}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <ul id={panelId} className="pb-2 pl-3 space-y-0.5">
                {d.items.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2 px-2 text-sm text-ink-700 hover:bg-cream-200 hover:text-ink-900 rounded transition-colors"
                      onClick={onItemClick}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="border-t border-cream-300 mt-1 pt-1">
                  <Link
                    href={d.browseAllHref}
                    className="block py-2 px-2 text-sm font-medium text-terracotta-500 hover:bg-cream-200 hover:text-terracotta-600 rounded transition-colors"
                    onClick={onItemClick}
                  >
                    {d.browseAllLabel} →
                  </Link>
                </li>
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
