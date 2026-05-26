import { getTranslations } from 'next-intl/server';

// Arc 6a — Breadcrumb header on topic + intersection pages.
//
// 2-level shape (single-axis): Home › <axis-name>
// 3-level shape (intersection): Home › <axis-1-name> › <axis-1> · <axis-2>
//
// Final node is current page (non-link); intermediate nodes link back to
// shallower scope. "Home" links to /<locale>/. Per Arc 6a Phase 2 spec the
// home label is locale-natural (Home / Startseite / Inicio / etc.), authored
// per Q3 across all 11 locales since no canonical nav/footer precedent exists.

interface BreadcrumbsProps {
  locale: string;
  axisName1: string;
  slug1: string;
  axisName2?: string;
  slug2?: string;
}

export default async function Breadcrumbs({
  locale,
  axisName1,
  slug1,
  axisName2,
  slug2,
}: BreadcrumbsProps) {
  const t = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });
  const homeLabel = t('home');

  const isIntersection = !!axisName2 && !!slug2;
  const compositeName = isIntersection ? `${axisName1} · ${axisName2}` : null;

  return (
    <nav className="text-sm text-ink-500 mb-4 flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="Breadcrumb">
      <a href={`/${locale}`} className="hover:text-ink-900 hover:underline">
        {homeLabel}
      </a>
      <span aria-hidden="true">›</span>
      {isIntersection ? (
        <>
          <a
            href={`/${locale}/topic/${slug1}`}
            className="hover:text-ink-900 hover:underline"
          >
            {axisName1}
          </a>
          <span aria-hidden="true">›</span>
          <span className="text-ink-900 font-medium" aria-current="page">
            {compositeName}
          </span>
        </>
      ) : (
        <span className="text-ink-900 font-medium" aria-current="page">
          {axisName1}
        </span>
      )}
    </nav>
  );
}
