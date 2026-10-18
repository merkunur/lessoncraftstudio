/**
 * HubFilters — the worksheets hub's side bar (2026-10-18 redesign) and its
 * mobile drawer. Same view-model, two shells.
 *
 * Three short groups, in the order a teacher decides:
 *   1. Grade — a button grid (five grades, two columns), not five checkbox rows.
 *   2. Exercise type — on the bare hub, one closed disclosure per subject; once
 *      a subject tab is chosen, that subject's types as a flat list; the chosen
 *      type carries its LEVEL SETS nested beneath it as sub-categories (the
 *      operator's ruling: no separate Level Sets page, no Level Sets block on
 *      top of the hub — a set is a sub-category of its worksheet type).
 *   3. Theme — the most-used themes, the rest behind "More themes".
 *
 * SEO: every link is a server-rendered <a href>. Disclosures are native
 * <details>, whose children are in the HTML whether open or not, so the bare
 * hub still carries every ?type=, ?level= and ?theme= link it carried before.
 * Presentational: the page builds every label, count and href.
 */

import type { ReactNode } from 'react';

export interface RailLinkVM {
  key: string;
  label: string;
  href: string;
  count?: number;
  active: boolean;
}

export interface RailTypeVM extends RailLinkVM {
  /** Level Sets of this type — shown only under the chosen type. */
  sets?: RailLinkVM[];
  /** Further sets behind a disclosure, with its summary label ("+12 more sets"). */
  moreSets?: { label: string; items: RailLinkVM[] };
}

export interface RailSubjectVM {
  key: string;
  label: string;
  count: number;
  open: boolean;
  items: RailTypeVM[];
  /** A subject's sum counts Level Set copies the bare grid does not list — shown nowhere (review 2026-10-18). */
  hideCount?: boolean;
}

export interface HubFiltersVM {
  heading: string;
  grade: { heading: string; items: RailLinkVM[] };
  type: { heading: string; subjects?: RailSubjectVM[]; items?: RailTypeVM[] };
  setsHeading: string;
  theme: { heading: string; items: RailLinkVM[]; more?: { label: string; items: RailLinkVM[] } };
  /** Number of active filters (shown on the mobile drawer bar). */
  activeCount: number;
}

const ROW =
  'flex items-center gap-2 min-h-[44px] lg:min-h-[34px] px-2.5 rounded-lg font-lcsBody text-[0.9rem] leading-snug transition-colors';

function Count({ n, active }: { n?: number; active: boolean }) {
  if (n === undefined) return null;
  return (
    <span className={`ml-auto pl-2 text-[0.75rem] tabular-nums ${active ? 'text-lcs-teal/80' : 'text-lcs-teal/45'}`}>{n}</span>
  );
}

function LinkRow({ item }: { item: RailLinkVM }) {
  return (
    <li>
      <a
        href={item.href}
        aria-current={item.active ? 'true' : undefined}
        className={`${ROW} ${item.active ? 'bg-lcs-teal/[0.09] text-lcs-teal font-bold' : 'text-lcs-teal/85 hover:bg-lcs-teal/[0.06] hover:text-lcs-teal'}`}
      >
        <span className="min-w-0 flex-1">{item.label}</span>
        <Count n={item.count} active={item.active} />
      </a>
    </li>
  );
}

function SetRows({ setsHeading, type }: { setsHeading: string; type: RailTypeVM }) {
  if (!type.sets || type.sets.length === 0) return null;
  const row = (s: RailLinkVM) => (
    <li key={s.key}>
      <a
        href={s.href}
        aria-current={s.active ? 'true' : undefined}
        className={`flex items-start gap-2 min-h-[44px] lg:min-h-0 py-1.5 pl-2.5 pr-2 rounded-md font-lcsBody text-[0.82rem] leading-snug transition-colors ${
          s.active ? 'bg-lcs-coral/10 text-lcs-coral-deep font-bold' : 'text-lcs-teal/80 hover:bg-lcs-teal/[0.06] hover:text-lcs-teal'
        }`}
      >
        <span className="min-w-0 flex-1 line-clamp-2">{s.label}</span>
        <Count n={s.count} active={s.active} />
      </a>
    </li>
  );
  return (
    <div className="ml-3 mt-1 mb-2 border-l-2 border-lcs-teal/15 pl-2">
      <p className="px-2.5 pt-0.5 pb-1 font-lcsBody text-[0.68rem] font-bold uppercase tracking-[0.1em] text-lcs-teal/55">{setsHeading}</p>
      <ul className="space-y-px">{type.sets.map(row)}</ul>
      {type.moreSets && type.moreSets.items.length > 0 && (
        <details className="hub-disc">
          <summary className="flex items-center gap-1.5 min-h-[44px] lg:min-h-[30px] px-2.5 cursor-pointer list-none font-lcsBody text-[0.8rem] font-semibold text-lcs-teal/70 hover:text-lcs-teal">
            <Caret />
            {type.moreSets.label}
          </summary>
          <ul className="space-y-px">{type.moreSets.items.map(row)}</ul>
        </details>
      )}
    </div>
  );
}

function TypeRows({ items, setsHeading }: { items: RailTypeVM[]; setsHeading: string }) {
  return (
    <ul className="space-y-px">
      {items.map((t) => (
        <li key={t.key}>
          <a
            href={t.href}
            aria-current={t.active ? 'true' : undefined}
            className={`${ROW} ${t.active ? 'bg-lcs-teal text-white font-bold' : 'text-lcs-teal/85 hover:bg-lcs-teal/[0.06] hover:text-lcs-teal'}`}
          >
            <span className="min-w-0 flex-1">{t.label}</span>
            {t.count !== undefined && (
              <span className={`ml-auto pl-2 text-[0.75rem] tabular-nums ${t.active ? 'text-white/80' : 'text-lcs-teal/45'}`}>{t.count}</span>
            )}
          </a>
          {t.active && <SetRows setsHeading={setsHeading} type={t} />}
        </li>
      ))}
    </ul>
  );
}

function Caret() {
  return (
    <svg viewBox="0 0 24 24" className="hub-caret flex-shrink-0 w-3 h-3 transition-transform" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function Group({ heading, children, first = false }: { heading: string; children: ReactNode; first?: boolean }) {
  return (
    <section className={first ? '' : 'mt-5 pt-5 border-t border-lcs-teal/12'}>
      <h3 className="mb-2 px-0.5 font-lcsDisplay font-semibold text-[1.02rem] text-lcs-teal">{heading}</h3>
      {children}
    </section>
  );
}

function Groups({ vm }: { vm: HubFiltersVM }) {
  const grades = vm.grade.items;
  return (
    <>
      {grades.length > 0 && (
        <Group heading={vm.grade.heading} first>
          <ul className="grid grid-cols-2 gap-1.5">
            {grades.map((g, i) => (
              <li key={g.key} className={grades.length % 2 === 1 && i === 0 ? 'col-span-2' : ''}>
                <a
                  href={g.href}
                  aria-current={g.active ? 'true' : undefined}
                  className={`flex items-center justify-center text-center min-h-[44px] lg:min-h-[36px] px-2 rounded-lg border font-lcsBody text-[0.85rem] font-semibold leading-tight transition-colors ${
                    g.active
                      ? 'border-lcs-teal bg-lcs-teal text-white'
                      : 'border-lcs-teal/20 bg-white text-lcs-teal hover:border-lcs-teal/50'
                  }`}
                >
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </Group>
      )}

      <Group heading={vm.type.heading} first={grades.length === 0}>
        {vm.type.items && <TypeRows items={vm.type.items} setsHeading={vm.setsHeading} />}
        {vm.type.subjects?.map((sg) => (
          <details key={sg.key} open={sg.open} className="hub-disc">
            <summary className={`${ROW} cursor-pointer list-none font-semibold text-lcs-teal hover:bg-lcs-teal/[0.06]`}>
              <Caret />
              <span className="min-w-0 flex-1">{sg.label}</span>
              {!sg.hideCount && <span className="ml-auto pl-2 text-[0.75rem] tabular-nums text-lcs-teal/45">{sg.count}</span>}
            </summary>
            <div className="pl-3 pb-1">
              <TypeRows items={sg.items} setsHeading={vm.setsHeading} />
            </div>
          </details>
        ))}
      </Group>

      {(vm.theme.items.length > 0 || (vm.theme.more?.items.length ?? 0) > 0) && (
        <Group heading={vm.theme.heading}>
          <ul className="space-y-px">{vm.theme.items.map((t) => <LinkRow key={t.key} item={t} />)}</ul>
          {vm.theme.more && vm.theme.more.items.length > 0 && (
            <details className="hub-disc">
              <summary className={`${ROW} cursor-pointer list-none font-semibold text-lcs-teal/75 hover:text-lcs-teal`}>
                <Caret />
                {vm.theme.more.label}
              </summary>
              <ul className="space-y-px">{vm.theme.more.items.map((t) => <LinkRow key={t.key} item={t} />)}</ul>
            </details>
          )}
        </Group>
      )}
    </>
  );
}

/** Desktop side bar (lg and up). Sticky, scrolls internally when taller than the window. */
export function HubSidebar({ vm }: { vm: HubFiltersVM }) {
  return (
    <aside aria-label={vm.heading} className="hidden lg:block w-[248px] shrink-0">
      <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto overscroll-contain pr-2 pb-6 hub-rail">
        <Groups vm={vm} />
      </div>
    </aside>
  );
}

/** Mobile drawer (below lg): one sticky bar that opens the same groups. Pure <details>, no JS. */
export function HubMobileFilters({ vm }: { vm: HubFiltersVM }) {
  return (
    <details className="hub-disc lg:hidden sticky top-0 z-20 -mx-3 px-3 mb-4 bg-lcs-cream/95 backdrop-blur-sm border-b border-lcs-teal/12">
      <summary className="flex items-center justify-between min-h-[48px] cursor-pointer list-none font-lcsDisplay font-semibold text-lcs-teal">
        <span className="inline-flex items-center gap-2">
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round" />
          </svg>
          {vm.heading}
          {vm.activeCount > 0 && (
            <span className="grid place-items-center min-w-[1.35rem] h-[1.35rem] px-1 rounded-full bg-lcs-coral text-white text-[0.72rem] font-lcsBody font-bold">{vm.activeCount}</span>
          )}
        </span>
        <Caret />
      </summary>
      <div className="max-h-[60vh] overflow-y-auto overscroll-contain pb-4 pt-1">
        <Groups vm={vm} />
      </div>
    </details>
  );
}
