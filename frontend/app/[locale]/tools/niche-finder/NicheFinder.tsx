'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AGE_BUCKET_META,
  BUNDLE_POTENTIAL_META,
  CATEGORY_META,
  NICHES,
  NICHES_LAST_UPDATED_LABEL,
  OPPORTUNITY_META,
  PLATFORM_META,
  SEASONALITY_META,
  getAllLanguages,
  getStats,
  type AgeBucket,
  type BundlePotential,
  type NicheCategory,
  type NicheEntry,
  type Platform,
  type Seasonality,
} from './niches-database';

type SortKey = 'opportunity' | 'competition-asc' | 'demand-desc' | 'recent' | 'alpha';

type QuickFilterKey =
  | 'hot'
  | 'low-comp'
  | 'non-english'
  | 'kdp'
  | 'new'
  | 'trending'
  | 'seasonal'
  | 'has-generator';

interface Filters {
  categories: Set<NicheCategory>;
  platforms: Set<Platform>;
  demandMin: number;
  competitionMax: number;
  opportunityMin: number;
  seasonality: Seasonality | 'all';
  ageBucket: AgeBucket | 'all';
  languages: Set<string>;
  bundlePotential: BundlePotential | 'all';
  hasGenerator: boolean;
  quickFilter: QuickFilterKey | null;
}

const EMPTY_FILTERS: Filters = {
  categories: new Set(),
  platforms: new Set(),
  demandMin: 1,
  competitionMax: 5,
  opportunityMin: 1,
  seasonality: 'all',
  ageBucket: 'all',
  languages: new Set(),
  bundlePotential: 'all',
  hasGenerator: false,
  quickFilter: null,
};

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as NicheCategory[];
const ALL_PLATFORMS = Object.keys(PLATFORM_META) as Platform[];
const ALL_SEASONALITIES = Object.keys(SEASONALITY_META) as Seasonality[];
const ALL_AGE_BUCKETS = Object.keys(AGE_BUCKET_META) as AgeBucket[];
const ALL_LANGUAGES = getAllLanguages();
const STATS = getStats();

/* ----------------------------------------------------------------------------
 * Main component
 * -------------------------------------------------------------------------- */

export default function NicheFinder() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState<SortKey>('opportunity');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comparisonIds, setComparisonIds] = useState<Set<string>>(new Set());
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [highlightedRandomId, setHighlightedRandomId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Debounce search input -> search query (200ms)
  useEffect(() => {
    const handle = setTimeout(() => setSearchQuery(searchInput.trim().toLowerCase()), 200);
    return () => clearTimeout(handle);
  }, [searchInput]);

  // Lock body scroll when the mobile sidebar drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [sidebarOpen]);

  // Escape closes comparison modal and sidebar
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (comparisonOpen) setComparisonOpen(false);
        else if (sidebarOpen) setSidebarOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [comparisonOpen, sidebarOpen]);

  /* -------- Filter + sort -------- */

  const filtered: NicheEntry[] = useMemo(() => {
    return NICHES.filter((n) => {
      // Search
      if (searchQuery) {
        const haystack = [
          n.name,
          n.description,
          n.tips,
          n.subcategory,
          ...n.tags,
          ...n.targetAudience,
          ...n.languages,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(searchQuery)) return false;
      }

      // Category
      if (filters.categories.size > 0 && !filters.categories.has(n.category)) return false;

      // Platform
      if (filters.platforms.size > 0) {
        if (!n.platforms.some((p) => filters.platforms.has(p))) return false;
      }

      // Demand / competition / opportunity ranges
      if (n.demandLevel < filters.demandMin) return false;
      if (n.competitionLevel > filters.competitionMax) return false;
      if (n.opportunityScore < filters.opportunityMin) return false;

      // Seasonality
      if (filters.seasonality !== 'all' && n.seasonality !== filters.seasonality) return false;

      // Age bucket
      if (filters.ageBucket !== 'all' && n.ageBucket !== filters.ageBucket) return false;

      // Languages
      if (filters.languages.size > 0) {
        if (!n.languages.some((l) => filters.languages.has(l))) return false;
      }

      // Bundle potential
      if (filters.bundlePotential !== 'all' && n.bundlePotential !== filters.bundlePotential) return false;

      // Has generator link
      if (filters.hasGenerator && !n.generatorLink) return false;

      // Quick filter
      if (filters.quickFilter) {
        switch (filters.quickFilter) {
          case 'hot':
            if (n.opportunityScore < 4) return false;
            break;
          case 'low-comp':
            if (n.competitionLevel > 2) return false;
            break;
          case 'non-english':
            if (n.languages.length === 1 && n.languages[0] === 'English') return false;
            break;
          case 'kdp':
            if (!n.platforms.includes('kdp')) return false;
            break;
          case 'new':
            if (!n.newlyAdded) return false;
            break;
          case 'trending':
            if (!n.trending) return false;
            break;
          case 'seasonal':
            if (n.seasonality === 'evergreen') return false;
            break;
          case 'has-generator':
            if (!n.generatorLink) return false;
            break;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  const sorted: NicheEntry[] = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case 'opportunity':
        arr.sort((a, b) => {
          if (b.opportunityScore !== a.opportunityScore) return b.opportunityScore - a.opportunityScore;
          return b.demandLevel - a.demandLevel;
        });
        break;
      case 'competition-asc':
        arr.sort((a, b) => a.competitionLevel - b.competitionLevel);
        break;
      case 'demand-desc':
        arr.sort((a, b) => b.demandLevel - a.demandLevel);
        break;
      case 'recent':
        arr.sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''));
        break;
      case 'alpha':
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return arr;
  }, [filtered, sortBy]);

  /* -------- Callbacks -------- */

  const toggleSetItem = useCallback(function toggleInSet<T>(current: Set<T>, value: T): Set<T> {
    const next = new Set(current);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  }, []);

  const toggleCategory = useCallback(
    (cat: NicheCategory) => setFilters((f) => ({ ...f, categories: toggleSetItem(f.categories, cat) })),
    [toggleSetItem]
  );
  const togglePlatform = useCallback(
    (p: Platform) => setFilters((f) => ({ ...f, platforms: toggleSetItem(f.platforms, p) })),
    [toggleSetItem]
  );
  const toggleLanguage = useCallback(
    (l: string) => setFilters((f) => ({ ...f, languages: toggleSetItem(f.languages, l) })),
    [toggleSetItem]
  );
  const toggleQuickFilter = useCallback((key: QuickFilterKey) => {
    setFilters((f) => ({ ...f, quickFilter: f.quickFilter === key ? null : key }));
  }, []);
  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setSearchInput('');
  }, []);

  const toggleComparison = useCallback((id: string) => {
    setComparisonIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 3) return prev; // cap at 3
        next.add(id);
      }
      return next;
    });
  }, []);

  const surpriseMe = useCallback(() => {
    const pool = sorted.length > 0 ? sorted : NICHES;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;
    setHighlightedRandomId(pick.id);
    setExpandedId(pick.id);
    // Scroll the highlighted card into view
    requestAnimationFrame(() => {
      const el = document.getElementById(`niche-card-${pick.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    setTimeout(() => setHighlightedRandomId(null), 2500);
  }, [sorted]);

  const comparisonNiches = useMemo(
    () => NICHES.filter((n) => comparisonIds.has(n.id)),
    [comparisonIds]
  );

  const activeFilterChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    if (searchQuery) {
      chips.push({
        label: `Search: "${searchQuery}"`,
        onRemove: () => {
          setSearchInput('');
          setSearchQuery('');
        },
      });
    }
    filters.categories.forEach((cat) =>
      chips.push({
        label: CATEGORY_META[cat].label,
        onRemove: () => toggleCategory(cat),
      })
    );
    filters.platforms.forEach((p) =>
      chips.push({
        label: PLATFORM_META[p].label,
        onRemove: () => togglePlatform(p),
      })
    );
    filters.languages.forEach((l) =>
      chips.push({
        label: l,
        onRemove: () => toggleLanguage(l),
      })
    );
    if (filters.demandMin > 1) {
      chips.push({
        label: `Demand ≥ ${filters.demandMin}`,
        onRemove: () => setFilters((f) => ({ ...f, demandMin: 1 })),
      });
    }
    if (filters.competitionMax < 5) {
      chips.push({
        label: `Competition ≤ ${filters.competitionMax}`,
        onRemove: () => setFilters((f) => ({ ...f, competitionMax: 5 })),
      });
    }
    if (filters.opportunityMin > 1) {
      chips.push({
        label: `Opportunity ≥ ${filters.opportunityMin}`,
        onRemove: () => setFilters((f) => ({ ...f, opportunityMin: 1 })),
      });
    }
    if (filters.seasonality !== 'all') {
      chips.push({
        label: SEASONALITY_META[filters.seasonality].label,
        onRemove: () => setFilters((f) => ({ ...f, seasonality: 'all' })),
      });
    }
    if (filters.ageBucket !== 'all') {
      chips.push({
        label: AGE_BUCKET_META[filters.ageBucket].shortLabel,
        onRemove: () => setFilters((f) => ({ ...f, ageBucket: 'all' })),
      });
    }
    if (filters.bundlePotential !== 'all') {
      chips.push({
        label: `Bundle: ${BUNDLE_POTENTIAL_META[filters.bundlePotential].label}`,
        onRemove: () => setFilters((f) => ({ ...f, bundlePotential: 'all' })),
      });
    }
    if (filters.hasGenerator) {
      chips.push({
        label: 'Has generator',
        onRemove: () => setFilters((f) => ({ ...f, hasGenerator: false })),
      });
    }
    if (filters.quickFilter) {
      chips.push({
        label: QUICK_FILTER_META[filters.quickFilter].label,
        onRemove: () => setFilters((f) => ({ ...f, quickFilter: null })),
      });
    }
    return chips;
  }, [filters, searchQuery, toggleCategory, togglePlatform, toggleLanguage]);

  /* -------- Render -------- */

  return (
    <section aria-labelledby="browse-niches-heading" className="mt-8">
      {/* Stats bar */}
      <StatsBar />

      {/* Search + Surprise Me */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <label htmlFor="niche-search" className="sr-only">
            Search niches
          </label>
          <input
            id="niche-search"
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search niches (e.g. 'german', 'sudoku', 'kdp')..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={surpriseMe}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-white ring-1 ring-slate-300 hover:ring-primary hover:text-primary text-slate-700 font-semibold px-5 py-3 transition whitespace-nowrap"
        >
          <span aria-hidden="true">🎲</span>
          Surprise Me
        </button>
      </div>

      {/* Quick filter bar */}
      <QuickFilterBar
        active={filters.quickFilter}
        onToggle={toggleQuickFilter}
      />

      {/* Main H2 */}
      <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
        <h2 id="browse-niches-heading" className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
          Browse Printable Niches
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-slate-500">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="opportunity">Opportunity (high to low)</option>
            <option value="competition-asc">Competition (low to high)</option>
            <option value="demand-desc">Demand (high to low)</option>
            <option value="recent">Recently added</option>
            <option value="alpha">Alphabetical</option>
          </select>
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-lg ring-1 ring-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:ring-primary"
          >
            Filters
            {activeFilterCount(filters) > 0 && (
              <span className="inline-flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5">
                {activeFilterCount(filters)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar + grid layout */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            toggleCategory={toggleCategory}
            togglePlatform={togglePlatform}
            toggleLanguage={toggleLanguage}
          />
        </aside>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 flex"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <button
              type="button"
              className="flex-1 bg-slate-900/50"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close filters"
            />
            <div className="w-80 max-w-[85vw] bg-white p-5 overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="text-slate-500 hover:text-slate-900 text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                toggleCategory={toggleCategory}
                togglePlatform={togglePlatform}
                toggleLanguage={toggleLanguage}
              />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="min-w-0">
          <ResultsSummary
            count={sorted.length}
            total={NICHES.length}
            chips={activeFilterChips}
            onClear={clearFilters}
          />

          {/* Live region for screen readers */}
          <div role="status" aria-live="polite" className="sr-only">
            Showing {sorted.length} of {NICHES.length} niches
          </div>

          {sorted.length === 0 ? (
            <div className="mt-6 rounded-xl bg-white ring-1 ring-slate-200 p-8 text-center">
              <div className="text-4xl mb-2" aria-hidden="true">🔍</div>
              <p className="text-slate-700 font-medium">No niches match your filters.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 text-primary font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {sorted.map((niche) => (
                <NicheCard
                  key={niche.id}
                  niche={niche}
                  expanded={expandedId === niche.id}
                  onExpandToggle={() =>
                    setExpandedId((prev) => (prev === niche.id ? null : niche.id))
                  }
                  selectedForCompare={comparisonIds.has(niche.id)}
                  onToggleCompare={() => toggleComparison(niche.id)}
                  compareDisabled={!comparisonIds.has(niche.id) && comparisonIds.size >= 3}
                  highlighted={highlightedRandomId === niche.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky compare bar */}
      {comparisonIds.size > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white rounded-full shadow-lg ring-1 ring-slate-200 px-4 py-2 flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">
            {comparisonIds.size} selected
          </span>
          <button
            type="button"
            onClick={() => setComparisonOpen(true)}
            disabled={comparisonIds.size < 2}
            className="bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Compare selected
          </button>
          <button
            type="button"
            onClick={() => setComparisonIds(new Set())}
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            Clear
          </button>
        </div>
      )}

      {/* Comparison modal */}
      {comparisonOpen && (
        <ComparisonModal
          niches={comparisonNiches}
          onClose={() => setComparisonOpen(false)}
        />
      )}

      {/* Compare H2 (for SEO outline) */}
      <h2
        id="compare-niches-heading"
        className="mt-14 text-2xl sm:text-3xl font-display font-bold text-slate-900"
      >
        Compare Niches Side by Side
      </h2>
      <p className="mt-2 text-slate-600 max-w-3xl">
        Can&apos;t decide between two niches? Tick the comparison checkbox on up to three niche
        cards above, then click <strong>Compare selected</strong> to see every attribute in a
        side-by-side table — demand, competition, opportunity score, price range, platforms,
        bundle potential and more.
      </p>

      {/* Suggest form */}
      <SuggestForm />
    </section>
  );
}

function activeFilterCount(f: Filters): number {
  let n = 0;
  n += f.categories.size;
  n += f.platforms.size;
  n += f.languages.size;
  if (f.demandMin > 1) n += 1;
  if (f.competitionMax < 5) n += 1;
  if (f.opportunityMin > 1) n += 1;
  if (f.seasonality !== 'all') n += 1;
  if (f.ageBucket !== 'all') n += 1;
  if (f.bundlePotential !== 'all') n += 1;
  if (f.hasGenerator) n += 1;
  if (f.quickFilter) n += 1;
  return n;
}

/* ----------------------------------------------------------------------------
 * Stats bar
 * -------------------------------------------------------------------------- */

function StatsBar() {
  const items = [
    { emoji: '📊', label: `${STATS.total} curated niches` },
    { emoji: '🔥', label: `${STATS.hotOpportunities} hot opportunities` },
    { emoji: '💎', label: `${STATS.lowCompetitionGems} low-competition gems` },
    { emoji: '🌍', label: `${STATS.languageCount} languages covered` },
    { emoji: '🔄', label: `Updated ${NICHES_LAST_UPDATED_LABEL}` },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-slate-200 px-3 py-1.5 text-xs sm:text-sm text-slate-700 font-medium"
        >
          <span aria-hidden="true">{item.emoji}</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Quick filter bar
 * -------------------------------------------------------------------------- */

const QUICK_FILTER_META: Record<QuickFilterKey, { label: string; emoji: string; title: string }> = {
  hot: { label: 'Hot Opportunities', emoji: '🔥', title: 'Opportunity score 4-5' },
  'low-comp': { label: 'Low-Competition Gems', emoji: '💎', title: 'Competition level 1-2' },
  'non-english': { label: 'Non-English Markets', emoji: '🌍', title: 'Niches with non-English language options' },
  kdp: { label: 'KDP Book Niches', emoji: '📚', title: 'Niches sold on Amazon KDP' },
  new: { label: 'Newly Added', emoji: '🆕', title: 'Recently added to the database' },
  trending: { label: 'Trending Now', emoji: '📈', title: 'Currently trending niches' },
  seasonal: { label: 'Seasonal Picks', emoji: '🎄', title: 'Non-evergreen niches' },
  'has-generator': { label: 'Can Create with LCS', emoji: '⭐', title: 'Niches you can build with our generators' },
};

const QUICK_FILTER_ORDER: QuickFilterKey[] = [
  'hot',
  'low-comp',
  'non-english',
  'kdp',
  'new',
  'trending',
  'seasonal',
  'has-generator',
];

function QuickFilterBar({
  active,
  onToggle,
}: {
  active: QuickFilterKey | null;
  onToggle: (key: QuickFilterKey) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Quick filters">
      {QUICK_FILTER_ORDER.map((key) => {
        const meta = QUICK_FILTER_META[key];
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            aria-pressed={isActive}
            title={meta.title}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
              isActive
                ? 'bg-primary text-white ring-1 ring-primary shadow-sm'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-primary hover:text-primary'
            }`}
          >
            <span aria-hidden="true">{meta.emoji}</span>
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Filter sidebar
 * -------------------------------------------------------------------------- */

function FilterSidebar({
  filters,
  setFilters,
  toggleCategory,
  togglePlatform,
  toggleLanguage,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleCategory: (cat: NicheCategory) => void;
  togglePlatform: (p: Platform) => void;
  toggleLanguage: (l: string) => void;
}) {
  const categoryCounts = useMemo(() => {
    const counts = {} as Record<NicheCategory, number>;
    ALL_CATEGORIES.forEach((c) => (counts[c] = 0));
    NICHES.forEach((n) => {
      counts[n.category] = (counts[n.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6 text-sm">
      {/* Category */}
      <FilterGroup title="Category">
        <div className="space-y-1.5">
          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const checked = filters.categories.has(cat);
            return (
              <label
                key={cat}
                className="flex items-center justify-between gap-2 cursor-pointer group"
              >
                <span className="flex items-center gap-2 text-slate-700 group-hover:text-primary">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(cat)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span aria-hidden="true">{meta.emoji}</span>
                  <span>{meta.label}</span>
                </span>
                <span className="text-xs text-slate-400">{categoryCounts[cat] || 0}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* Platform */}
      <FilterGroup title="Platform">
        <div className="space-y-1.5">
          {ALL_PLATFORMS.map((p) => {
            const meta = PLATFORM_META[p];
            const checked = filters.platforms.has(p);
            return (
              <label
                key={p}
                className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-primary"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePlatform(p)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span aria-hidden="true">{meta.emoji}</span>
                <span>{meta.label}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* Demand / competition / opportunity */}
      <FilterGroup title="Demand & Competition">
        <div className="space-y-3">
          <div>
            <label className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Min demand</span>
              <span className="font-semibold text-slate-700">{filters.demandMin}+</span>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={filters.demandMin}
              onChange={(e) => setFilters((f) => ({ ...f, demandMin: Number(e.target.value) }))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Max competition</span>
              <span className="font-semibold text-slate-700">≤ {filters.competitionMax}</span>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={filters.competitionMax}
              onChange={(e) => setFilters((f) => ({ ...f, competitionMax: Number(e.target.value) }))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Min opportunity</span>
              <span className="font-semibold text-slate-700">{filters.opportunityMin}+</span>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={filters.opportunityMin}
              onChange={(e) => setFilters((f) => ({ ...f, opportunityMin: Number(e.target.value) }))}
              className="w-full accent-primary"
            />
          </div>
        </div>
      </FilterGroup>

      {/* Seasonality */}
      <FilterGroup title="Seasonality">
        <select
          value={filters.seasonality}
          onChange={(e) =>
            setFilters((f) => ({ ...f, seasonality: e.target.value as Seasonality | 'all' }))
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All seasons</option>
          {ALL_SEASONALITIES.map((s) => (
            <option key={s} value={s}>
              {SEASONALITY_META[s].emoji} {SEASONALITY_META[s].label}
            </option>
          ))}
        </select>
      </FilterGroup>

      {/* Age group */}
      <FilterGroup title="Age Group">
        <select
          value={filters.ageBucket}
          onChange={(e) =>
            setFilters((f) => ({ ...f, ageBucket: e.target.value as AgeBucket | 'all' }))
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All ages</option>
          {ALL_AGE_BUCKETS.map((a) => (
            <option key={a} value={a}>
              {AGE_BUCKET_META[a].label}
            </option>
          ))}
        </select>
      </FilterGroup>

      {/* Language */}
      <FilterGroup title="Language">
        <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
          {ALL_LANGUAGES.map((l) => {
            const checked = filters.languages.has(l);
            return (
              <label
                key={l}
                className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-primary"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleLanguage(l)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>{l}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* Bundle potential */}
      <FilterGroup title="Bundle Potential">
        <select
          value={filters.bundlePotential}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              bundlePotential: e.target.value as BundlePotential | 'all',
            }))
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">Any</option>
          <option value="high">High 📦</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </FilterGroup>

      {/* Has generator toggle */}
      <FilterGroup title="LessonCraftStudio">
        <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-primary">
          <input
            type="checkbox"
            checked={filters.hasGenerator}
            onChange={(e) => setFilters((f) => ({ ...f, hasGenerator: e.target.checked }))}
            className="rounded text-primary focus:ring-primary"
          />
          <span>Only niches I can create with LCS</span>
        </label>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{title}</h3>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Results summary
 * -------------------------------------------------------------------------- */

function ResultsSummary({
  count,
  total,
  chips,
  onClear,
}: {
  count: number;
  total: number;
  chips: { label: string; onRemove: () => void }[];
  onClear: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-sm text-slate-600 font-medium">
        Showing <span className="text-slate-900 font-bold">{count}</span> of {total} niches
      </p>
      {chips.length > 0 && (
        <>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((chip, i) => (
              <button
                key={i}
                type="button"
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1 rounded-full bg-primary-50 text-primary ring-1 ring-primary/20 px-2.5 py-0.5 text-xs font-medium hover:bg-primary-100"
              >
                {chip.label}
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-slate-500 hover:text-primary underline"
          >
            Clear all
          </button>
        </>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Niche card
 * -------------------------------------------------------------------------- */

function NicheCard({
  niche,
  expanded,
  onExpandToggle,
  selectedForCompare,
  onToggleCompare,
  compareDisabled,
  highlighted,
}: {
  niche: NicheEntry;
  expanded: boolean;
  onExpandToggle: () => void;
  selectedForCompare: boolean;
  onToggleCompare: () => void;
  compareDisabled: boolean;
  highlighted: boolean;
}) {
  const opp = OPPORTUNITY_META[niche.opportunityScore];
  const cat = CATEGORY_META[niche.category];

  return (
    <article
      id={`niche-card-${niche.id}`}
      className={`group relative bg-white rounded-xl ring-1 p-5 min-h-[380px] flex flex-col transition ${
        highlighted
          ? 'ring-2 ring-primary shadow-lg scale-[1.01] animate-pulse'
          : 'ring-slate-200 hover:ring-primary/50 hover:shadow-sm'
      }`}
    >
      {/* Top row: category + badges */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cat.chipClass}`}>
          <span aria-hidden="true">{cat.emoji}</span>
          {cat.label}
        </span>
        <div className="flex items-center gap-1">
          {niche.trending && (
            <span
              className="inline-flex items-center rounded-full bg-pink-50 text-pink-700 ring-1 ring-pink-200 px-1.5 py-0.5 text-[10px] font-bold"
              title="Trending"
            >
              📈 Trending
            </span>
          )}
          {niche.newlyAdded && (
            <span
              className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-1.5 py-0.5 text-[10px] font-bold"
              title="Newly added"
            >
              🆕 New
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-base font-bold text-slate-900 leading-snug">
        {niche.name}
      </h3>

      {/* Opportunity badge */}
      <div className="mt-2 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${opp.badgeClass}`}>
          <span aria-hidden="true">{opp.emoji}</span>
          {opp.label}
        </span>
        <OpportunityDots score={niche.opportunityScore} />
      </div>

      {/* Demand + competition meters */}
      <div className="mt-3 space-y-1.5 text-[11px]">
        <MeterRow label="Demand" value={niche.demandLevel} color="green" />
        <MeterRow label="Competition" value={niche.competitionLevel} color="red" />
      </div>

      {/* Platforms */}
      <div className="mt-3 flex flex-wrap gap-1">
        {niche.platforms.map((p) => (
          <span
            key={p}
            className="inline-flex items-center gap-1 rounded bg-slate-100 text-slate-600 px-1.5 py-0.5 text-[10px] font-medium"
          >
            <span aria-hidden="true">{PLATFORM_META[p].emoji}</span>
            {PLATFORM_META[p].label}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <dl className="mt-3 grid grid-cols-2 gap-y-1 text-[11px] text-slate-500">
        <dt className="sr-only">Seasonality</dt>
        <dd className="col-span-1">
          <span aria-hidden="true">{SEASONALITY_META[niche.seasonality].emoji}</span>{' '}
          {SEASONALITY_META[niche.seasonality].label}
        </dd>
        <dt className="sr-only">Price range</dt>
        <dd className="col-span-1 text-right font-medium text-slate-700">
          {niche.averagePriceRange}
        </dd>
        <dt className="sr-only">Target audience</dt>
        <dd className="col-span-2 truncate" title={niche.targetAudience.join(', ')}>
          👥 {niche.targetAudience.join(', ')}
        </dd>
        <dt className="sr-only">Bundle potential</dt>
        <dd className="col-span-1">
          📦 Bundle: <span className="font-medium text-slate-700">{niche.bundlePotential}</span>
        </dd>
        <dt className="sr-only">Languages</dt>
        <dd className="col-span-1 text-right truncate" title={niche.languages.join(', ')}>
          🌐 {niche.languages.slice(0, 3).join(', ')}
          {niche.languages.length > 3 ? ' +' + (niche.languages.length - 3) : ''}
        </dd>
      </dl>

      {/* Expand / compare row */}
      <div className="mt-auto pt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onExpandToggle}
          className="text-xs font-semibold text-primary hover:underline"
          aria-expanded={expanded}
          aria-controls={`niche-details-${niche.id}`}
        >
          {expanded ? 'Hide details' : 'View details →'}
        </button>
        <label
          className={`inline-flex items-center gap-1.5 text-xs text-slate-500 ${
            compareDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:text-primary'
          }`}
        >
          <input
            type="checkbox"
            checked={selectedForCompare}
            onChange={onToggleCompare}
            disabled={compareDisabled}
            className="rounded text-primary focus:ring-primary"
          />
          Compare
        </label>
      </div>

      {/* Expanded content — always rendered (kept in DOM for SEO) but hidden until toggled */}
      <div
        id={`niche-details-${niche.id}`}
        className={`mt-4 -mx-5 -mb-5 p-5 bg-slate-50 border-t border-slate-200 rounded-b-xl space-y-3 text-sm ${expanded ? '' : 'hidden'}`}
      >
          <p className="text-slate-700">{niche.description}</p>
          <p className="text-slate-700">
            <strong className="text-slate-900">💡 Insider tip:</strong> {niche.tips}
          </p>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            {niche.ageGroup && (
              <div>
                <dt className="font-semibold text-slate-500 uppercase tracking-wide">Age Group</dt>
                <dd className="text-slate-700">{niche.ageGroup}</dd>
              </div>
            )}
            <div>
              <dt className="font-semibold text-slate-500 uppercase tracking-wide">Recurring</dt>
              <dd className="text-slate-700 capitalize">{niche.recurringPotential}</dd>
            </div>
            {niche.peakMonths && niche.peakMonths.length > 0 && (
              <div className="col-span-2">
                <dt className="font-semibold text-slate-500 uppercase tracking-wide">Peak Months</dt>
                <dd className="text-slate-700">{niche.peakMonths.join(', ')}</dd>
              </div>
            )}
            <div className="col-span-2">
              <dt className="font-semibold text-slate-500 uppercase tracking-wide">Subcategory</dt>
              <dd className="text-slate-700">{niche.subcategory}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2 pt-2">
            {niche.generatorLink && niche.generatorName && (
              <Link
                href={niche.generatorLink}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-white text-xs font-semibold px-3 py-2 hover:bg-primary-700 transition"
              >
                Create this with {niche.generatorName} →
              </Link>
            )}
            {!niche.generatorLink && (
              <Link
                href="/en/apps"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-white text-xs font-semibold px-3 py-2 hover:bg-primary-700 transition"
              >
                Browse all 33 generators →
              </Link>
            )}
            {niche.guideLink && niche.guideLabel && (
              <Link
                href={niche.guideLink}
                className="inline-flex items-center gap-1.5 rounded-lg ring-1 ring-slate-300 text-slate-700 text-xs font-semibold px-3 py-2 hover:ring-primary hover:text-primary transition"
              >
                📖 {niche.guideLabel}
              </Link>
            )}
          </div>

          <p className="text-[10px] text-slate-400 pt-1">
            Last updated: <time dateTime={niche.lastUpdated}>{niche.lastUpdated}</time>
          </p>
        </div>
    </article>
  );
}

function OpportunityDots({ score }: { score: 1 | 2 | 3 | 4 | 5 }) {
  const color = OPPORTUNITY_META[score].dotClass;
  return (
    <span className="flex gap-0.5" aria-label={`Opportunity score: ${score} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i <= score ? color : 'bg-slate-200'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function MeterRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: 'green' | 'red';
}) {
  const barColor = color === 'green' ? 'bg-emerald-500' : 'bg-red-400';
  const segs = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 text-slate-500">{label}</span>
      <div className="flex-1 flex gap-0.5">
        {segs.map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-sm ${i <= value ? barColor : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <span className="w-6 text-right font-semibold text-slate-700">{value}</span>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Comparison modal
 * -------------------------------------------------------------------------- */

function ComparisonModal({
  niches,
  onClose,
}: {
  niches: NicheEntry[];
  onClose: () => void;
}) {
  const rows: { label: string; render: (n: NicheEntry) => React.ReactNode }[] = [
    { label: 'Category', render: (n) => CATEGORY_META[n.category].label },
    { label: 'Subcategory', render: (n) => n.subcategory },
    {
      label: 'Opportunity',
      render: (n) => (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${OPPORTUNITY_META[n.opportunityScore].badgeClass}`}>
          {OPPORTUNITY_META[n.opportunityScore].emoji} {n.opportunityScore}/5
        </span>
      ),
    },
    { label: 'Demand', render: (n) => `${n.demandLevel}/5` },
    { label: 'Competition', render: (n) => `${n.competitionLevel}/5` },
    { label: 'Platforms', render: (n) => n.platforms.map((p) => PLATFORM_META[p].label).join(', ') },
    { label: 'Seasonality', render: (n) => SEASONALITY_META[n.seasonality].label },
    { label: 'Peak months', render: (n) => (n.peakMonths?.join(', ') || '—') },
    { label: 'Age group', render: (n) => n.ageGroup || '—' },
    { label: 'Languages', render: (n) => n.languages.join(', ') },
    { label: 'Price range', render: (n) => n.averagePriceRange },
    { label: 'Bundle potential', render: (n) => n.bundlePotential },
    { label: 'Recurring potential', render: (n) => n.recurringPotential },
    { label: 'Target audience', render: (n) => n.targetAudience.join(', ') },
    {
      label: 'Generator',
      render: (n) =>
        n.generatorLink && n.generatorName ? (
          <Link href={n.generatorLink} className="text-primary font-medium hover:underline">
            {n.generatorName} →
          </Link>
        ) : (
          '—'
        ),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-slate-900/60 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Compare niches"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-5xl w-full my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 className="text-xl font-display font-bold text-slate-900">Compare niches</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 text-2xl leading-none"
            aria-label="Close comparison"
          >
            ×
          </button>
        </div>
        <div className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs uppercase tracking-wider text-slate-500 pb-3 w-40">
                  Attribute
                </th>
                {niches.map((n) => (
                  <th
                    key={n.id}
                    className="text-left pb-3 text-slate-900 font-semibold min-w-[180px]"
                  >
                    {n.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="py-2 pr-3 text-xs uppercase tracking-wider text-slate-500 font-semibold align-top">
                    {row.label}
                  </td>
                  {niches.map((n) => (
                    <td key={n.id} className="py-2 pr-4 text-slate-700 align-top">
                      {row.render(n)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Suggest form
 * -------------------------------------------------------------------------- */

function SuggestForm() {
  const [form, setForm] = useState({ name: '', description: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Suggested niche for LessonCraftStudio Niche Finder\n\nName: ${form.name}\nDescription: ${form.description}\nFrom: ${form.email || '(anonymous)'}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setStatus('copied');
          setTimeout(() => setStatus('idle'), 4000);
        })
        .catch(() => {
          // Fallback: open mail client
          const body = encodeURIComponent(text);
          window.location.href = `mailto:hello@lessoncraftstudio.com?subject=Niche%20suggestion&body=${body}`;
          setStatus('copied');
        });
    } else {
      const body = encodeURIComponent(text);
      window.location.href = `mailto:hello@lessoncraftstudio.com?subject=Niche%20suggestion&body=${body}`;
      setStatus('copied');
    }
  };

  return (
    <div className="mt-12 rounded-2xl bg-slate-100 ring-1 ring-slate-200 p-6 sm:p-8">
      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">
        💡 Know a niche we haven&apos;t listed?
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        We update this database monthly. Suggest a niche below and we&apos;ll consider it for the
        next refresh.
      </p>
      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          required
          placeholder="Niche name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          aria-label="Niche name"
        />
        <input
          type="email"
          placeholder="Your email (optional)"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          aria-label="Your email"
        />
        <textarea
          required
          placeholder="1-2 sentence description — who buys it, why it's profitable, competition level"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={3}
          className="sm:col-span-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          aria-label="Niche description"
        />
        <div className="sm:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-primary text-white font-semibold px-5 py-2 hover:bg-primary-700 transition"
          >
            Submit suggestion
          </button>
          {status === 'copied' && (
            <span className="text-sm text-emerald-600 font-medium">
              ✓ Copied to clipboard — thanks!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
