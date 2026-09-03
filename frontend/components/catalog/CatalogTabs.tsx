/**
 * CatalogTabs — the format scope for the worksheets hub (All / Interactive).
 *
 * It replaces the three-way sort control, and deliberately does NOT reuse that
 * control's segmented pill: the pill is exactly what the removed sort looked
 * like, so a viewer would read the new tabs as the old sort, which is the
 * confusion this redesign exists to end. Underline tabs also wrap to two lines
 * at 360px, which a fixed-height pill cannot — `Vuorovaikutteiset` (fi) and
 * `Interaktiv` (de) do not fit one.
 *
 * It spans the full content width, ABOVE the two-column shell rather than
 * inside the results column, because it scopes the filter rail too: the facet
 * counts are computed over the tab-filtered rows, so a worksheet type with no
 * interactive sheets disappears from the rail under Interactive rather than
 * offering a dead end.
 *
 * A tab is a MODE (exactly one is always on); a facet is a FILTER (zero or
 * more). That is why the active tab is marked in coral — the kinetic accent,
 * used once — while the rail's active row keeps its solid-teal treatment, and
 * why the active tab is never mirrored as a removable chip in
 * CatalogActiveChips: one state with two off-switches is a bug, not a
 * convenience.
 *
 * Server-rendered, anchor-only, i18n-context-free: every string is a prop, the
 * same contract as CatalogFilters.
 */

export interface CatalogTabVM {
  value: string;
  label: string;
  href: string;
  active: boolean;
}

export function CatalogTabs({
  ariaLabel,
  tabs,
  resultLabel,
}: {
  ariaLabel: string;
  tabs: CatalogTabVM[];
  resultLabel: string;
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4 border-b border-lcs-teal/15 mb-6 md:mb-7"
    >
      {/* At phone widths each tab owns half the width so a long label wraps
          inside its own column instead of shoving its neighbour off-screen. */}
      <div className="grid grid-cols-2 gap-1 sm:flex sm:gap-2">
        {tabs.map((t) => (
          <a
            key={t.value}
            href={t.href}
            aria-current={t.active ? 'page' : undefined}
            className={`text-center sm:text-left px-1.5 pb-2.5 -mb-px border-b-[3px] font-lcsDisplay text-[0.98rem] md:text-[1.06rem] leading-snug transition-colors ${
              t.active
                ? 'border-lcs-coral text-lcs-teal font-extrabold'
                : 'border-transparent text-lcs-teal/55 hover:text-lcs-teal font-semibold'
            }`}
          >
            {t.label}
          </a>
        ))}
      </div>
      <p className="font-lcsBody text-sm font-semibold text-lcs-teal/65 pb-0 sm:pb-2.5">
        {resultLabel}
      </p>
    </nav>
  );
}

export default CatalogTabs;
