'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FacetGroup, FacetGroupSection } from './FilterSidebar';

// Arc 6b — Mobile filter drawer.
//
// Renders a "Filters" trigger button visible only on mobile (lg:hidden);
// click opens a full-screen drawer containing the same FacetGroupSection
// content as the desktop sidebar. Body-scroll lock while open. Close on
// backdrop click or ESC.

interface MobileFilterDrawerProps {
  basePath: string;
  facetGroups: FacetGroup[];
}

export default function MobileFilterDrawer({
  basePath,
  facetGroups,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('topicPage.mobileDrawer');
  const tFacets = useTranslations('topicPage.facets');

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center px-3 py-2 rounded-md bg-cream-100 hover:bg-cream-200 text-sm text-ink-900 transition-colors"
      >
        {t('openTrigger')}
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[100] bg-ink-900/60 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={tFacets('heading')}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm h-full bg-cream-50 overflow-y-auto p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-ink-900">
                {tFacets('heading')}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-ink-500 hover:text-ink-900"
                aria-label={t('close')}
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {facetGroups.map(group => (
              <FacetGroupSection
                key={group.paramKey}
                group={group}
                basePath={basePath}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
