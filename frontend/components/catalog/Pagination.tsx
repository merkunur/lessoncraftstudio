import { getTranslations } from 'next-intl/server';
import { buildFilterUrl, withParam } from './filterUrl';

// Arc 6b — Pagination component.
//
// Renders prev/next + numbered page links per Q pagination adjudication.
// Page-1 link points to bare path (no ?page=1). Page-N link points to
// ?page=N. Current page non-link aria-current="page". Mobile: prev/next +
// "Page X of Y" text label only; numbered links collapse on narrow viewport.

interface PaginationProps {
  locale: string;
  currentPage: number;
  pageCount: number;
  basePath: string;
  searchParamsString: string; // current searchParams URL-encoded
}

const NUMERIC_WINDOW = 5; // visible numeric pages around current

export default async function Pagination({
  locale,
  currentPage,
  pageCount,
  basePath,
  searchParamsString,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const t = await getTranslations({ locale, namespace: 'topicPage.pagination' });
  const baseParams = new URLSearchParams(searchParamsString);

  function urlFor(page: number): string {
    return buildFilterUrl(basePath, withParam(baseParams, 'page', String(page)));
  }

  // Build numeric window
  const half = Math.floor(NUMERIC_WINDOW / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(pageCount, start + NUMERIC_WINDOW - 1);
  start = Math.max(1, end - NUMERIC_WINDOW + 1);

  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const showFirst = start > 1;
  const showLast = end < pageCount;
  const showFirstEllipsis = start > 2;
  const showLastEllipsis = end < pageCount - 1;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-10" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <a
          href={urlFor(currentPage - 1)}
          className="px-3 py-2 rounded-md text-sm text-ink-700 hover:bg-cream-100 transition-colors"
        >
          ← {t('previous')}
        </a>
      ) : (
        <span className="px-3 py-2 rounded-md text-sm text-ink-300 cursor-not-allowed">
          ← {t('previous')}
        </span>
      )}

      {/* Numbered links: hidden on narrow mobile via sm:flex */}
      <div className="hidden sm:flex items-center gap-1">
        {showFirst && (
          <>
            <a href={urlFor(1)} className="px-3 py-2 rounded-md text-sm text-ink-700 hover:bg-cream-100 transition-colors">
              1
            </a>
            {showFirstEllipsis && <span className="px-2 text-ink-500">…</span>}
          </>
        )}
        {pages.map(p => (
          p === currentPage ? (
            <span key={p} aria-current="page" className="px-3 py-2 rounded-md text-sm text-ink-900 bg-cream-200 font-medium">
              {p}
            </span>
          ) : (
            <a key={p} href={urlFor(p)} className="px-3 py-2 rounded-md text-sm text-ink-700 hover:bg-cream-100 transition-colors">
              {p}
            </a>
          )
        ))}
        {showLast && (
          <>
            {showLastEllipsis && <span className="px-2 text-ink-500">…</span>}
            <a href={urlFor(pageCount)} className="px-3 py-2 rounded-md text-sm text-ink-700 hover:bg-cream-100 transition-colors">
              {pageCount}
            </a>
          </>
        )}
      </div>

      {/* Mobile-only "Page X of Y" text */}
      <span className="sm:hidden px-3 py-2 text-sm text-ink-700">
        {t('pageOf', { current: currentPage, total: pageCount })}
      </span>

      {/* Next */}
      {currentPage < pageCount ? (
        <a
          href={urlFor(currentPage + 1)}
          className="px-3 py-2 rounded-md text-sm text-ink-700 hover:bg-cream-100 transition-colors"
        >
          {t('next')} →
        </a>
      ) : (
        <span className="px-3 py-2 rounded-md text-sm text-ink-300 cursor-not-allowed">
          {t('next')} →
        </span>
      )}
    </nav>
  );
}
