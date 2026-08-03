'use client';

import { useTranslations } from 'next-intl';

/**
 * Client-side pagination control.
 *
 * A twin of components/catalog/Pagination.tsx, which cannot be reused directly:
 * that one is an async server component (`await getTranslations`) that emits
 * <a href> links driven by ?page= URL state. This one drives in-memory state via
 * a callback and is styled in the Direction A pill vocabulary.
 *
 * The window math (NUMERIC_WINDOW, first/last anchors, ellipses) and the
 * `pageCount <= 1 → null` guard are ported verbatim from that component so the
 * two behave identically.
 *
 * i18n costs nothing: `topicPage.pagination` already carries previous / next /
 * pageOf / firstPage / lastPage in all 11 locales.
 */
export interface ClientPaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** id of the section heading, so the nav is announced in context. */
  labelledBy?: string;
}

const NUMERIC_WINDOW = 5;

const BTN =
  'min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-full font-lcsBody text-sm font-semibold transition-colors';

export default function ClientPagination({
  page,
  pageCount,
  onPageChange,
  labelledBy,
}: ClientPaginationProps) {
  const t = useTranslations('topicPage.pagination');

  if (pageCount <= 1) return null;

  const half = Math.floor(NUMERIC_WINDOW / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(pageCount, start + NUMERIC_WINDOW - 1);
  start = Math.max(1, end - NUMERIC_WINDOW + 1);

  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const showFirst = start > 1;
  const showLast = end < pageCount;
  const showFirstEllipsis = start > 2;
  const showLastEllipsis = end < pageCount - 1;

  return (
    <nav
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : t('pageOf', { current: page, total: pageCount })}
      className="mt-6 flex flex-wrap items-center justify-center gap-1.5"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={`${BTN} text-lcs-teal/80 hover:text-lcs-teal disabled:cursor-not-allowed disabled:opacity-40`}
      >
        ← {t('previous')}
      </button>

      <div className="hidden items-center gap-1 rounded-full bg-lcs-teal/8 p-0.5 sm:inline-flex">
        {showFirst && (
          <>
            <button type="button" onClick={() => onPageChange(1)} className={`${BTN} text-lcs-teal/80 hover:text-lcs-teal`}>
              1
            </button>
            {showFirstEllipsis && <span className="px-1 text-lcs-teal/50">…</span>}
          </>
        )}

        {pages.map((p) =>
          p === page ? (
            <span key={p} aria-current="page" className={`${BTN} inline-flex items-center justify-center bg-lcs-teal text-lcs-cream`}>
              {p}
            </span>
          ) : (
            <button key={p} type="button" onClick={() => onPageChange(p)} className={`${BTN} text-lcs-teal/80 hover:text-lcs-teal`}>
              {p}
            </button>
          )
        )}

        {showLast && (
          <>
            {showLastEllipsis && <span className="px-1 text-lcs-teal/50">…</span>}
            <button type="button" onClick={() => onPageChange(pageCount)} className={`${BTN} text-lcs-teal/80 hover:text-lcs-teal`}>
              {pageCount}
            </button>
          </>
        )}
      </div>

      {/* Numbered pages collapse on narrow viewports; the localized
          "Page X of Y" carries the state there, and stays available to screen
          readers at every width. */}
      <span className="px-2 font-lcsBody text-sm font-semibold text-lcs-teal/70 sm:sr-only">
        {t('pageOf', { current: page, total: pageCount })}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className={`${BTN} text-lcs-teal/80 hover:text-lcs-teal disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {t('next')} →
      </button>
    </nav>
  );
}
