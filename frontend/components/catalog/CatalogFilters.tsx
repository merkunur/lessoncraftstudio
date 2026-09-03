/**
 * CatalogFilters — server-rendered, anchor-based facet UI shared by the
 * faceted catalog hubs (/[locale]/activities/ and /[locale]/worksheets/).
 * No client JS: every filter/sort/clear is a plain <a href> that toggles a
 * query param via the shared filterUrl helpers (SSR, shareable, crawlable).
 * Desktop = a left rail; mobile = a <details> disclosure. Styling is
 * Direction A (cream/teal/coral, Baloo 2 / Nunito; .actcat-* classes from
 * styles/catalog-cards.css).
 *
 * Generalized 2026-07-06 from components/activities/ActivityCatalogFilters
 * (which re-exports from here): paramKey widened to string; FacetGroupVM
 * gained an optional footer link (hosts "Show all themes"); the sort control
 * gained an optional defaultValue whose option strips ?sort= entirely.
 *
 * The page builds the localized view-models (headings, option labels, counts,
 * active flags) and passes them in; these components only render + compute
 * hrefs, so they stay i18n-context-free.
 */
import { buildFilterUrl, withParam, withoutParam } from '@/components/catalog/filterUrl';

export interface FacetItemVM {
  paramKey: string;
  value: string;
  label: string;
  count: number;
  active: boolean;
}
/**
 * A collapsible band of facet rows inside a group — used by the worksheets hub
 * to render 71 exercise types as five subject discs instead of one 71-row wall.
 * `<details>` children are in the SSR DOM whether or not the disc is open, so
 * every link stays crawlable; `open` is a server-rendered attribute, so this
 * costs no client JS.
 */
export interface FacetSubgroupVM {
  key: string;
  label: string;
  count: number;
  open: boolean;
  items: FacetItemVM[];
}
export interface FacetGroupVM {
  key: string;
  heading: string;
  items: FacetItemVM[];
  /** Optional collapsible bands rendered after `items`. */
  subgroups?: FacetSubgroupVM[];
  /** Optional trailing link (e.g. "Show all themes" expander). */
  footer?: { href: string; label: string };
}

function facetHref(
  basePath: string,
  spString: string,
  item: FacetItemVM,
): string {
  const current = new URLSearchParams(spString);
  const next = item.active
    ? withoutParam(current, item.paramKey)
    : withParam(current, item.paramKey, item.value);
  next.delete('page');
  return buildFilterUrl(basePath, next);
}

function FacetGroups({
  groups,
  basePath,
  spString,
}: {
  groups: FacetGroupVM[];
  basePath: string;
  spString: string;
}) {
  const row = (item: FacetItemVM) => (
    <li key={item.value}>
      <a
        href={facetHref(basePath, spString, item)}
        aria-pressed={item.active}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-lcsBody transition-colors ${
          item.active
            ? 'bg-lcs-teal text-lcs-cream font-semibold'
            : 'text-lcs-teal/90 hover:bg-lcs-teal/8'
        }`}
      >
        <span
          aria-hidden="true"
          className={`flex-shrink-0 w-4 h-4 rounded-[5px] border-2 flex items-center justify-center ${
            item.active ? 'border-lcs-cream bg-lcs-cream' : 'border-lcs-teal/30'
          }`}
        >
          {item.active && (
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-lcs-teal" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M2.5 6.5 L5 9 L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="flex-1">{item.label}</span>
        <span className={`text-xs flex-shrink-0 ${item.active ? 'text-lcs-cream/70' : 'text-lcs-teal/45'}`}>
          {item.count}
        </span>
      </a>
    </li>
  );

  return (
    <>
      {groups
        // A group may carry ONLY subgroups (the worksheets type rail does).
        // Filtering on `items.length` alone dropped such a group silently.
        .filter((g) => g.items.length > 0 || (g.subgroups?.length ?? 0) > 0)
        .map((group) => (
          <div key={group.key} className="mb-6">
            <h3 className="font-lcsBody text-xs font-bold uppercase tracking-[0.12em] text-lcs-teal/60 mb-2.5">
              {group.heading}
            </h3>
            {group.items.length > 0 && <ul className="space-y-0.5">{group.items.map(row)}</ul>}
            {group.subgroups?.map((sg) => (
              <details key={sg.key} open={sg.open} className="mb-0.5">
                <summary className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer list-none text-sm font-lcsBody font-semibold text-lcs-teal hover:bg-lcs-teal/8">
                  {/* Its OWN caret class — `.actcat-caret` is flipped by an
                      unscoped `details[open]` rule, so reusing it here would
                      make every subgroup caret point down whenever the mobile
                      filter drawer that contains them is open. */}
                  <svg
                    viewBox="0 0 24 24"
                    className="actcat-subcaret flex-shrink-0 w-3 h-3 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                  <span className="flex-1">{sg.label}</span>
                  <span className="text-xs flex-shrink-0 text-lcs-teal/45">{sg.count}</span>
                </summary>
                <ul className="space-y-0.5 pl-4 pb-1.5 pt-0.5">{sg.items.map(row)}</ul>
              </details>
            ))}
            {group.footer && (
              <a
                href={group.footer.href}
                className="inline-block mt-2 px-2.5 text-sm font-lcsBody text-lcs-coral-deep hover:underline"
              >
                {group.footer.label}
              </a>
            )}
          </div>
        ))}
    </>
  );
}

/** Desktop left rail. */
export function CatalogSidebar({
  heading,
  groups,
  basePath,
  spString,
}: {
  heading: string;
  groups: FacetGroupVM[];
  basePath: string;
  spString: string;
}) {
  return (
    <aside aria-label={heading} className="hidden lg:block lg:col-span-3">
      <div className="sticky top-6 actcat-card-flat rounded-3xl p-5">
        <h2 className="font-lcsDisplay text-lg font-bold text-lcs-teal mb-4">{heading}</h2>
        <FacetGroups groups={groups} basePath={basePath} spString={spString} />
      </div>
    </aside>
  );
}

/** Mobile disclosure (pure HTML <details>, no JS). */
export function CatalogMobileFilters({
  heading,
  groups,
  basePath,
  spString,
}: {
  heading: string;
  groups: FacetGroupVM[];
  basePath: string;
  spString: string;
}) {
  return (
    <details className="lg:hidden mb-5 rounded-2xl actcat-card-flat overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer list-none px-4 py-3 font-lcsDisplay font-semibold text-lcs-teal">
        <span className="inline-flex items-center gap-2">
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round" />
          </svg>
          {heading}
        </span>
        <span aria-hidden="true" className="actcat-caret transition-transform">▾</span>
      </summary>
      <div className="px-4 pb-4 pt-1">
        <FacetGroups groups={groups} basePath={basePath} spString={spString} />
      </div>
    </details>
  );
}

/** Sort control — anchor links per option. When defaultValue is given, that
    option's href strips ?sort= entirely (default-value canonicalization for
    surfaces whose default is not in filterUrl's DEFAULT_VALUES). */
export function CatalogSortControl({
  heading,
  options,
  current,
  basePath,
  spString,
  defaultValue,
}: {
  heading: string;
  options: { value: string; label: string }[];
  current: string;
  basePath: string;
  spString: string;
  defaultValue?: string;
}) {
  const hrefFor = (value: string) => {
    const base = new URLSearchParams(spString);
    const next =
      defaultValue !== undefined && value === defaultValue
        ? withoutParam(base, 'sort')
        : withParam(base, 'sort', value);
    next.delete('page');
    return buildFilterUrl(basePath, next);
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-lcsBody text-xs font-bold uppercase tracking-[0.12em] text-lcs-teal/55">
        {heading}
      </span>
      <div className="inline-flex rounded-full bg-lcs-teal/8 p-0.5">
        {options.map((o) => (
          <a
            key={o.value}
            href={hrefFor(o.value)}
            aria-current={current === o.value ? 'true' : undefined}
            className={`px-3 py-1 rounded-full text-sm font-lcsBody font-semibold transition-colors ${
              current === o.value ? 'bg-lcs-teal text-lcs-cream' : 'text-lcs-teal/80 hover:text-lcs-teal'
            }`}
          >
            {o.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/** Active-filter chips + Clear all. */
export function CatalogActiveChips({
  chips,
  clearAllHref,
  clearAllLabel,
}: {
  chips: { label: string; removeHref: string }[];
  clearAllHref: string;
  clearAllLabel: string;
}) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      {chips.map((c, i) => (
        <a
          key={i}
          href={c.removeHref}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lcs-coral-soft text-lcs-coral-deep text-sm font-lcsBody font-semibold hover:bg-lcs-coral-soft/70 transition-colors"
        >
          <span>{c.label}</span>
          <span aria-hidden="true" className="text-lcs-coral-deep/70">✕</span>
        </a>
      ))}
      <a
        href={clearAllHref}
        className="px-2.5 py-1 text-sm font-lcsBody text-lcs-teal/70 hover:text-lcs-teal hover:underline"
      >
        {clearAllLabel}
      </a>
    </div>
  );
}

/** Empty state when nothing matches the active filters. */
export function CatalogEmptyState({
  title,
  body,
  clearAllHref,
  clearAllLabel,
  primaryAction,
}: {
  title: string;
  body: string;
  clearAllHref: string;
  clearAllLabel: string;
  /**
   * Optional lead action, shown as the coral button with "clear all" demoted to
   * a text link beneath it. The worksheets hub uses it for "Show all
   * worksheets" on the Interactive tab, where the format — not the facets — is
   * by far the likeliest reason nothing matched.
   *
   * A plain { href, label } rather than a callback, matching the existing
   * `footer` precedent: WorkspaceEmptyState records why a callback prop was
   * rejected for a component two public SSR hubs depend on.
   */
  primaryAction?: { href: string; label: string };
}) {
  return (
    <div className="text-center py-16 px-4 rounded-3xl actcat-card-flat">
      <h3 className="font-lcsDisplay text-lg font-bold text-lcs-teal mb-2">{title}</h3>
      <p className="font-lcsBody text-sm text-lcs-teal/70 mb-6 max-w-md mx-auto">{body}</p>
      {primaryAction ? (
        <>
          <a
            href={primaryAction.href}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-lcs-coral text-lcs-cream font-lcsDisplay font-semibold hover:bg-lcs-coral-deep transition-colors"
          >
            {primaryAction.label}
          </a>
          <p className="mt-4">
            <a href={clearAllHref} className="font-lcsBody text-sm font-semibold text-lcs-teal/70 hover:text-lcs-teal hover:underline">
              {clearAllLabel}
            </a>
          </p>
        </>
      ) : (
        <a
          href={clearAllHref}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-lcs-coral text-lcs-cream font-lcsDisplay font-semibold hover:bg-lcs-coral-deep transition-colors"
        >
          {clearAllLabel}
        </a>
      )}
    </div>
  );
}
