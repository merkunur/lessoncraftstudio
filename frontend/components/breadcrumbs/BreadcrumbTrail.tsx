import { getTranslations } from "next-intl/server";

/**
 * Generic breadcrumb trail for inner pages.
 *
 * Auto-prepends a "Home" crumb (linked to /<locale>/) from the existing
 * `topicPage.breadcrumb.home` i18n key (11-locale coverage). Caller
 * provides the trail BEYOND home. The last item is rendered as the
 * current page (non-link, semibold, aria-current=page) regardless of
 * whether `href` is set.
 *
 * Counterpart to frontend/components/catalog/Breadcrumbs.tsx which is
 * topic-page-specific (2-axis intersection composite). This one is
 * flat-trail for arbitrary inner pages (tools, activities, etc.).
 *
 * Server component — uses next-intl/server's getTranslations.
 */

export interface BreadcrumbCrumb {
  /** Link target. Final crumb's href is ignored. */
  href?: string;
  /** Visible label, already localized. */
  label: string;
}

export default async function BreadcrumbTrail({
  locale,
  trail,
}: {
  locale: string;
  /** Trail BEYOND the auto-prepended Home crumb. */
  trail: BreadcrumbCrumb[];
}) {
  const t = await getTranslations({ locale, namespace: "topicPage.breadcrumb" });
  const homeLabel = t("home");

  const items: BreadcrumbCrumb[] = [
    { href: `/${locale}/`, label: homeLabel },
    ...trail,
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm text-ink-500 mb-4 flex flex-wrap items-center gap-x-2 gap-y-1"
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-x-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {isLast || !c.href ? (
              <span
                className="text-ink-900 font-medium"
                aria-current={isLast ? "page" : undefined}
              >
                {c.label}
              </span>
            ) : (
              <a href={c.href} className="hover:text-ink-900 hover:underline">
                {c.label}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
