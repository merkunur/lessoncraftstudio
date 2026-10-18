/* /[locale]/worksheets/ — the worksheets hub.
   Public, SSR, ISR. Rebuilt 2026-09-03 from a page that had grown eleven
   stacked blocks into six.

   WHAT CHANGED AND WHY (the short version; the long one is in the commit):
   - The two card strips above the grid are GONE. They existed because the old
     interleave ordered type buckets by descending size, so page 1 was one row
     from each of the 24 largest of 71 types and the newest families could never
     reach it. `orderHubRows` fixes that at the root, so the patch is redundant.
   - The three "Browse by …" chip walls are GONE. Every theme and every level
     link they carried now lives permanently in the filter rail — MORE crawlable
     links than before, since the long-tail themes no longer hide behind a
     `?themes=all` round trip. The one set with nowhere else to go, the
     native-language /topic/ links, keeps a real headed section at the foot.
   - The three-way sort control is replaced by two tabs, All and Interactive.
     Ordering is always variety; there is nothing to choose.
   - Cards tell the truth about format and finally expose their downloads.

   `?sort=` and `?themes=all` are no longer read but MUST keep returning 200 —
   they are indexed URLs. `parseWorksheetFilters` ignores them rather than
   404ing.

   Rate-limit frugality (broken-thumbnails fix 2026-07-06) is unchanged: lazy
   card images beyond the first row, prefetch={false} links, text-only foot
   sections — the page stays well under the nginx per-IP burst that used to 429
   a random subset of thumbnails per refresh. */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getAxisSlug, getAxisName, getExerciseModeName, listSubjectKeys, getSubjectName } from '@/lib/taxonomy';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { wwwImg } from '@/lib/img-host';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import PageUsageBlock from '@/components/catalog/PageUsageBlock';
import Pagination from '@/components/catalog/Pagination';
import { buildFilterUrl, clearFilters } from '@/components/catalog/filterUrl';
import { CatalogActiveChips, CatalogEmptyState } from '@/components/catalog/CatalogFilters';
import HubTopBar, { type HubTabVM } from '@/components/worksheets/hub/HubTopBar';
import { HubSidebar, HubMobileFilters, type HubFiltersVM, type RailLinkVM, type RailSubjectVM, type RailTypeVM } from '@/components/worksheets/hub/HubFilters';
import LevelSetView from '@/components/worksheets/hub/LevelSetView';
import CatalogTypeIndex, { type TypeIndexItem } from '@/components/catalog/CatalogTypeIndex';
import WorksheetCatalogCard from '@/components/worksheets/WorksheetCatalogCard';
import { getMonolingualLandings, deckAssets } from '@/lib/seo/landing-content';
import { collapsedSheetSlugs, expandHubRows, levelSetRows, rowIsPrintOnly, variationCode, type HubRow, type DeckFacts } from '@/lib/worksheets-sheets';
import { isPrintOnlyType } from '@/config/interactive-exercise-types';
import { INTERACTIVE_LEVEL_SET_TYPES, LEVEL_SET_PRINT_ONLY_VARIATIONS } from '@/config/interactive-level-set-types';
import { RUNGS, setHref, type Ladder, type LadderDeckRow } from '@/lib/level-sets';
import { laddersFromRows, teacherSheetExists } from '@/lib/level-sets-db';
import type { LevelSetsT } from '@/lib/level-sets-view';
import { pathwayNeighbours } from '@/lib/level-set-pathways';
import { dlHref as dlHrefShared } from '@/lib/metered-download';
import {
  WORKSHEETS_PAGE_SIZE,
  parseWorksheetFilters,
  applyLandingFilters,
  buildLandingFacets,
  orderHubRows,
  subjectOfType,
  baseTheme,
  displayTypeName,
  levelChip,
  levelOrder,
  themeLabel,
} from '@/lib/worksheets-catalog';
import '@/styles/catalog-cards.css';

const BASE_URL = CANONICAL_HOST;

// Brand-only 1200×630 OG asset shared with the homepage (Direction A palette).
const OG_IMAGE_PATH = '/og-homepage.png';

// Substrate-honesty floor — only locales with genuine catalog depth get the
// "Thousands…" variant. Seed-only locales fall to the safer copy (§19.5).
const HUNDREDS_THRESHOLD = 100;

// One xl row loads eagerly; everything else is lazy.
const EAGER_CARDS = 4;


// Direction A typography pairing (CLAUDE.md §A.13.47) — loaded per route.
const baloo2 = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
});
const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
});

async function countLocaleDecks(locale: string): Promise<number> {
  try {
    return await prisma.deck.count({
      where: { language: locale, status: 'published', contentLanguage: null },
    });
  } catch {
    return 0;
  }
}

// ISR: pick up newly-published decks without a rebuild.
export const revalidate = 3600;

/* generateMetadata is DELIBERATELY UNCHANGED. The <title> and meta description
   are live ranking copy; the operator ruled they stay byte-identical while the
   on-page h1 and intro are rewritten. It also ignores searchParams, so every
   filtered state — `?format=interactive` included — still canonicalises to the
   bare hub and adds no crawl space. */
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const total = await countLocaleDecks(locale);
  const useHundreds = total >= HUNDREDS_THRESHOLD;
  const t = await getTranslations({ locale, namespace: 'worksheetsPage' });

  const title = useHundreds ? t('metaTitle.hundreds') : t('metaTitle.safer');
  const description = useHundreds ? t('metaDescription.hundreds') : t('metaDescription.safer');
  const canonical = canonicalUrl(localePath(locale, 'worksheets'));

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = canonicalUrl(localePath(lang, 'worksheets'));
  }
  hreflangAlternates['x-default'] = canonicalUrl(localePath('en', 'worksheets'));

  return {
    title: `${title}`,
    description,
    alternates: { canonical, languages: hreflangAlternates },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [{
        url: `${CANONICAL_HOST}${OG_IMAGE_PATH}`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: `${CANONICAL_HOST}${OG_IMAGE_PATH}`, alt: 'LessonCraftStudio — K-3 worksheets in 11 languages' }],
    },
    robots: INDEXABLE_ROBOTS,
  };
}

/**
 * The metered download proxy the STATIC landing pages already use. Slug-keyed,
 * so a card can offer its PDF without resolving a database row; the route
 * itself 404s when the requested asset does not exist, 302s subscribers and
 * crawlers straight to the file, meters free accounts and sends anonymous
 * visitors to signup. Works as a plain href — no client JS, which is why the
 * hub can meter downloads at all.
 */
function dlHref(locale: string, deckSlug: string, kind: 'pdf' | 'answer'): string {
  return dlHrefShared(locale, deckSlug, kind);
}

function toSearchParamsString(sp: Record<string, string | string[] | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) v.forEach((x) => p.append(k, x));
    else p.append(k, v);
  }
  return p.toString();
}

export default async function AllWorksheetsPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const locale = params.locale || 'en';
  const [t, tBrowse, tTopic, tFacets, tActive, tEmpty, tBreadcrumb, tNav, tLs] = await Promise.all([
    getTranslations({ locale, namespace: 'worksheetsPage' }),
    getTranslations({ locale, namespace: 'worksheetsPage.browse' }),
    getTranslations({ locale, namespace: 'topicPage' }),
    getTranslations({ locale, namespace: 'topicPage.facets' }),
    getTranslations({ locale, namespace: 'topicPage.activeFilters' }),
    getTranslations({ locale, namespace: 'topicPage.emptyState' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getTranslations({ locale, namespace: 'nav.categories' }),
    getTranslations({ locale, namespace: 'levelSets' }),
  ]);

  /* ---- ONE deck query, replacing the three the page used to run ----
     It supplies the sheet titles the hub already needed, the deck ids the
     metered download links need, the answer-key fact each card's Answer key
     link is gated on, each sheet's OWN theme (2026-10-18: collapsed sheets were
     filed under their parent's theme), and the distinct exercise types for the
     foot index and the copy threshold. A failure degrades the page (no metered
     links, no answer keys) rather than 500ing. */
  const factsBySlug = new Map<string, DeckFacts>();
  const publishedTypes = new Set<string>();
  let totalCount = 0;
  /* The same rows build the LADDERS (one per worksheet-gen face: easy / core /
     hard pages) — the Level Sets the rail lists under their type. */
  let ladders: Ladder[] = [];
  try {
    const decks = await prisma.deck.findMany({
      where: { language: locale, status: 'published', contentLanguage: null },
      select: { slug: true, title: true, answerKeyUrl: true, exerciseType: true, exerciseMode: true, indexable: true, subjectTags: true },
    });
    totalCount = decks.length;
    ladders = laddersFromRows(locale, decks as LadderDeckRow[]);
    for (const d of decks) {
      publishedTypes.add(d.exerciseType);
      const raw = d.title as Record<string, string> | null;
      const label = raw ? raw[locale] || raw.en || Object.values(raw)[0] : null;
      if (label) factsBySlug.set(d.slug, { title: label, hasAnswerKey: d.answerKeyUrl != null, theme: d.subjectTags[0] || null });
    }
  } catch (err) {
    console.warn('[AllWorksheetsPage] deck query failed:', (err as Error).message);
  }

  const useHundreds = totalCount >= HUNDREDS_THRESHOLD;
  const h1 = useHundreds ? t('h1.hundreds') : t('h1.safer');
  const intro = useHundreds ? t('intro.hundreds') : t('intro.safer');

  /* ---- hub rows: the landing tier expanded into the worksheets it collapses ---- */
  const allLandings = getMonolingualLandings(locale);
  const sheetSlugs = collapsedSheetSlugs(allLandings);
  const sheetFacts = new Map<string, DeckFacts>();
  for (const s of sheetSlugs) {
    const f = factsBySlug.get(s);
    if (f) sheetFacts.set(s, f);
  }
  for (const l of allLandings) {
    const f = factsBySlug.get(l.canonicalDeckSlug);
    if (f) sheetFacts.set(l.canonicalDeckSlug, f);
  }
  const hubRows: HubRow[] = expandHubRows(
    allLandings,
    sheetFacts,
    (slug) => deckAssets(locale, slug).deckDir,
    (themeKey) => themeLabel(baseTheme(themeKey), locale),
  );

  const filters = parseWorksheetFilters(searchParams ?? {});
  const typeLabelOf = (key: string) => displayTypeName(getAxisName('exercise-type', key, locale) || key, locale);
  const basePath = `/${locale}/worksheets`;
  const spString = toSearchParamsString(searchParams ?? {});

  /* ---- the chosen Level Set (a sub-category of its type) ----
     `?set=<code>` names a ladder; its type wins over any `?type=` so a set link
     can never open under the wrong type. An unknown code is simply ignored. */
  const activeLadder = filters.set ? ladders.find((l) => l.code === filters.set) || null : null;
  if (activeLadder) {
    filters.type = activeLadder.type;
    filters.subject = null;
  } else {
    filters.set = null;
  }
  const ladderByCode = new Map(ladders.map((l) => [l.code, l]));

  /* ---- Level Set worksheets (do-not-index marker, no landing). Operator 2026-10-01: the rail must show the REAL
     number of worksheets per type, so the facet counts include every Level Set copy of every type. The result list
     shows them whenever ANY filter is chosen, so a count always matches the list it opens; the unfiltered default
     page keeps exactly its indexed cards (ruling 2026-09-27). Each copy carries its OWN theme (2026-10-18). */
  let levelSetAll: HubRow[] = [];
  try {
    const [rows, tSeo] = await Promise.all([
      prisma.deck.findMany({
        where: { language: locale, status: 'published', contentLanguage: null, indexable: false },
        select: { slug: true, title: true, exerciseMode: true, answerKeyUrl: true, exerciseType: true, subjectTags: true },
        orderBy: { slug: 'asc' },
      }),
      getTranslations({ locale, namespace: 'seo.words' }),
    ]);
    const setWord = tSeo.has('set') ? tSeo('set') : 'Set';
    const byType = new Map<string, typeof rows>();
    for (const d of rows) {
      if (!d.exerciseType) continue;
      if (!byType.has(d.exerciseType)) byType.set(d.exerciseType, []);
      byType.get(d.exerciseType)!.push(d);
    }
    for (const [type, decks] of byType) {
      const typeLandings = allLandings.filter((l) => l.coordinate.type === type);
      const parent = typeLandings[0];
      if (!parent) continue;
      levelSetAll = levelSetAll.concat(levelSetRows(
        typeLandings,
        decks.map((d) => {
          const raw = d.title as Record<string, string> | null;
          return {
            slug: d.slug,
            title: (raw && (raw[locale] || raw.en)) || parent.h1,
            theme: d.subjectTags[0] || null,
            exerciseMode: d.exerciseMode,
            hasAnswerKey: d.answerKeyUrl != null,
            interactive: INTERACTIVE_LEVEL_SET_TYPES.has(type)
              && !(LEVEL_SET_PRINT_ONLY_VARIATIONS[type] || []).includes(variationCode(d.slug) || ''),
          };
        }),
        (slug) => deckAssets(locale, slug).deckDir,
        (mode) => getExerciseModeName(mode, locale),
        setWord,
        (themeKey) => themeLabel(baseTheme(themeKey), locale),
      ));
    }
  } catch (err) {
    console.warn('[AllWorksheetsPage] level-set query failed:', (err as Error).message);
  }
  const hubRowsAll = levelSetAll.length ? [...hubRows, ...levelSetAll] : hubRows;
  const anyFilter = Boolean(filters.subject || filters.type || filters.level || filters.theme);
  const hubRowsForView = anyFilter ? hubRowsAll : hubRows;

  /* The format switch scopes EVERYTHING below it, facet counts included, so a type
     with no interactive sheets disappears from the rail under Interactive
     rather than offering a filter that returns nothing. */
  const interactiveOnly = filters.format === 'interactive';
  const formatScope = (rows: HubRow[]) => (interactiveOnly
    ? rows.filter((l) => !rowIsPrintOnly(l, isPrintOnlyType))
    : rows);
  const scoped = formatScope(hubRowsForView);
  const scopedAll = formatScope(hubRowsAll);

  // the rail counts every worksheet, Level Set copies included (operator 2026-10-01)
  const facets = scopedAll.length > 0 ? buildLandingFacets(scopedAll, filters) : null;

  /* ---- hrefs: one builder, so every control drops what it must ----
     Any change resets the page; any change but the format and the set itself
     leaves the Level Set (a set belongs to one type and one view). */
  const hrefWith = (changes: Record<string, string | null>, keepSet = false) => {
    const next = new URLSearchParams(spString);
    next.delete('page');
    if (!keepSet) next.delete('set');
    for (const [k, v] of Object.entries(changes)) {
      if (v === null) next.delete(k);
      else next.set(k, v);
    }
    return buildFilterUrl(basePath, next);
  };
  const toggle = (key: string, value: string, active: boolean) => hrefWith({ [key]: active ? null : value });

  /* ---- top bar: subject tabs + the Interactive switch ---- */
  const subjectCount = new Map((facets?.subject ?? []).map((o) => [o.value, o.count]));
  // Tabs are the locale's subjects, not the current view's: a tab must not vanish when a theme is chosen.
  const localeSubjects = new Set(hubRowsAll.map((r) => subjectOfType(r.coordinate.type)).filter(Boolean) as string[]);
  const subjectTabs: HubTabVM[] = [
    { key: 'all', label: t('tabs.all'), href: hrefWith({ subject: null, type: null }), active: !filters.subject && !filters.type },
    ...listSubjectKeys()
      .filter((s) => localeSubjects.has(s) || filters.subject === s)
      .map((s) => ({
        key: s,
        label: getSubjectName(s, locale) || s,
        href: hrefWith({ subject: s, type: null }),
        count: subjectCount.get(s),
        active: filters.subject === s || (!filters.subject && Boolean(filters.type) && subjectOfType(filters.type!) === s),
      })),
  ];
  const interactiveSwitch = {
    label: t('tabs.interactive'),
    href: hrefWith({ format: interactiveOnly ? null : 'interactive' }, true),
    on: interactiveOnly,
  };

  /* ---- side bar ---- */
  const levelSetsOfType = (type: string) => ladders
    .filter((l) => l.type === type && (!interactiveOnly || l.interactiveCount > 0))
    .sort((a, b) => levelOrder(a.level || '') - levelOrder(b.level || '') || a.title.localeCompare(b.title, locale));
  const SETS_SHOWN = 8;
  const setLink = (l: Ladder): RailLinkVM => ({
    key: l.code,
    label: l.title,
    href: filters.set === l.code ? hrefWith({}) : hrefWith({ type: l.type, set: l.code, level: null, theme: null }, true),
    count: l.pageCount,
    active: filters.set === l.code,
  });

  let rail: HubFiltersVM | null = null;
  if (facets) {
    const gradeItems: RailLinkVM[] = facets.level
      .slice()
      .sort((a, b) => levelOrder(a.value) - levelOrder(b.value) || levelChip(a.value, locale).localeCompare(levelChip(b.value, locale), locale))
      .map(({ value, count }) => ({
        key: value,
        label: levelChip(value, locale),
        href: toggle('level', value, filters.level === value),
        count,
        active: filters.level === value,
      }));

    const typeItem = (value: string, count: number): RailTypeVM => {
      const active = filters.type === value;
      const item: RailTypeVM = {
        key: value,
        label: typeLabelOf(value),
        // Choosing a type keeps the subject tab; un-choosing it returns to the subject.
        href: toggle('type', value, active),
        count,
        active,
      };
      if (active) {
        const sets = levelSetsOfType(value);
        // The chosen set is always visible, wherever it ranks.
        let head = sets.slice(0, SETS_SHOWN);
        let tail = sets.slice(SETS_SHOWN);
        if (filters.set && !head.some((l) => l.code === filters.set)) {
          const hit = tail.find((l) => l.code === filters.set);
          if (hit) { head = [...head, hit]; tail = tail.filter((l) => l.code !== filters.set); }
        }
        item.sets = head.map(setLink);
        if (tail.length > 0) item.moreSets = { label: tLs('moreSets', { count: tail.length }), items: tail.map(setLink) };
      }
      return item;
    };
    const typeItems = facets.type
      .map(({ value, count }) => typeItem(value, count))
      .sort((a, b) => a.label.localeCompare(b.label, locale));

    const TYPES_SHOWN = 10;
    const capTypes = (items: RailTypeVM[]) => {
      const byCount = items.slice().sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
      const head = new Set(byCount.slice(0, TYPES_SHOWN).map((i) => i.key));
      for (const i of items) if (i.active) head.add(i.key);
      const shown = items.filter((i) => head.has(i.key));
      const rest = items.filter((i) => !head.has(i.key));
      return {
        items: shown,
        more: rest.length > 0 ? { label: tBrowse('moreTypes', { count: rest.length }), items: rest } : undefined,
      };
    };
    let typeGroup: HubFiltersVM['type'];
    if (filters.subject) {
      typeGroup = { heading: tBrowse('filterType'), ...capTypes(typeItems.filter((i) => subjectOfType(i.key) === filters.subject)) };
    } else {
      // Bare hub: one closed disclosure per subject; every ?type= link stays in the HTML.
      const subjects: RailSubjectVM[] = listSubjectKeys()
        .map((s) => {
          const items = typeItems.filter((i) => subjectOfType(i.key) === s);
          return {
            key: s,
            label: getSubjectName(s, locale) || s,
            count: items.reduce((n, i) => n + (i.count ?? 0), 0),
            open: items.some((i) => i.active),
            hideCount: true,
            ...capTypes(items),
          };
        })
        .filter((g) => g.items.length > 0)
        .sort((a, b) => b.count - a.count);
      typeGroup = { heading: tBrowse('filterType'), subjects };
    }

    // Themes: the most-used stay visible, the long tail sits in a disclosure — still in the HTML.
    const TOP_THEMES = 8;
    const themesAll = facets.theme.slice().sort((a, b) => b.count - a.count);
    const themeItem = ({ value, count }: { value: string; count: number }): RailLinkVM => ({
      key: value,
      label: themeLabel(value, locale),
      href: toggle('theme', value, filters.theme === value),
      count,
      active: filters.theme === value,
    });
    let themeHead = themesAll.slice(0, TOP_THEMES);
    let themeTail = themesAll.slice(TOP_THEMES);
    if (filters.theme && !themeHead.some((th) => th.value === filters.theme)) {
      const hit = themeTail.find((th) => th.value === filters.theme);
      if (hit) { themeHead = [...themeHead, hit]; themeTail = themeTail.filter((th) => th.value !== filters.theme); }
    }
    themeTail.sort((a, b) => themeLabel(a.value, locale).localeCompare(themeLabel(b.value, locale), locale));

    rail = {
      heading: tFacets('heading'),
      // Inside a Level Set the grade and theme filters cannot narrow anything (a set is one face).
      grade: { heading: tBrowse('filterLevel'), items: activeLadder ? [] : gradeItems },
      type: typeGroup,
      setsHeading: tLs('heading'),
      theme: activeLadder
        ? { heading: tBrowse('filterTheme'), items: [] }
        : {
            heading: tBrowse('filterTheme'),
            items: themeHead.map(themeItem),
            more: themeTail.length > 0 ? { label: tBrowse('moreThemes', { count: themeTail.length }), items: themeTail.map(themeItem) } : undefined,
          },
      activeCount: [filters.subject, filters.type, filters.set, filters.level, filters.theme].filter(Boolean).length,
      resultsLabel: '', // set once the result count is known (below)
    };
  }

  /* ---- filter → order → paginate ---- */
  const filtered = applyLandingFilters(scoped, {
    subject: filters.subject,
    type: filters.type,
    level: filters.level,
    theme: filters.theme,
  });
  const ordered = orderHubRows(
    filtered,
    Boolean(filters.type),
    (l) => rowIsPrintOnly(l as HubRow, isPrintOnlyType),
  ).rows;

  // A Level Set view lists its own pages (all levels) on one page.
  const total = activeLadder
    ? RUNGS.reduce((n, r) => n + activeLadder.pages[r].filter((p) => !interactiveOnly || p.interactive).length, 0)
    : ordered.length;
  const pageCount = activeLadder ? 1 : Math.max(1, Math.ceil(total / WORKSHEETS_PAGE_SIZE));
  if (rail) rail.resultsLabel = tTopic('decksCount', { count: total });
  // Out-of-range page => 404, not a clamp: clamping made ?page=101 and ?page=999
  // both return 200 with an identical copy of the last real page, i.e. an
  // unbounded crawl space of duplicates.
  if (filters.page > pageCount) notFound();
  const page = filters.page;
  const pageItems = activeLadder ? [] : ordered.slice((page - 1) * WORKSHEETS_PAGE_SIZE, page * WORKSHEETS_PAGE_SIZE);

  /* ---- active chips + clear all ----
     The format switch is deliberately NOT mirrored as a chip: it is a mode with
     exactly one value always on. */
  const chips: { label: string; removeHref: string }[] = [];
  if (filters.subject) chips.push({ label: getSubjectName(filters.subject, locale) || filters.subject, removeHref: hrefWith({ subject: null }) });
  if (filters.level) chips.push({ label: levelChip(filters.level, locale), removeHref: hrefWith({ level: null }, true) });
  if (filters.type && !activeLadder) chips.push({ label: typeLabelOf(filters.type), removeHref: hrefWith({ type: null }) });
  if (activeLadder) chips.push({ label: `${typeLabelOf(activeLadder.type)} · ${activeLadder.title}`, removeHref: hrefWith({}) });
  if (filters.theme) chips.push({ label: themeLabel(filters.theme, locale), removeHref: hrefWith({ theme: null }, true) });
  const clearAllHref = buildFilterUrl(basePath, clearFilters(new URLSearchParams(spString)));

  /* ---- the A–Z type index at the foot ----
     These go to /topic/<slug>/, a different page class from the rail's ?type=
     filter. A failed DB read must not empty it: the landing corpus is the floor. */
  const indexTypes = publishedTypes.size > 0
    ? publishedTypes
    : new Set(hubRows.map((l) => l.coordinate.type));
  const typeIndex: TypeIndexItem[] = [...indexTypes]
    .map((key) => ({
      key,
      label: getAxisName('exercise-type', key, locale) || key,
      href: `/${locale}/topic/${getAxisSlug('exercise-type', key, locale) || key}/`,
    }))
    .filter((x) => Boolean(x.label))
    .sort((a, b) => a.label.localeCompare(b.label, locale));

  /* ---- structured data: CollectionPage + ItemList + BreadcrumbList ---- */
  const canonical = canonicalUrl(localePath(locale, 'worksheets'));
  const collectionSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: h1,
    description: intro,
    inLanguage: locale,
    isAccessibleForFree: true,
    url: canonical,
  };
  if (typeIndex.length > 0) {
    collectionSchema.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: typeIndex.length,
      itemListElement: typeIndex.map((tile, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tile.label,
        url: `${BASE_URL}${tile.href}`,
      })),
    };
  }
  // Bare-state ItemList only (first page, no filters, default format); filtered
  // states emit none, because the canonical is the bare hub.
  const bareState = !filters.subject && !filters.type && !filters.level && !filters.theme && filters.format === 'all' && page === 1;
  if (hubRows.length > 0 && bareState) {
    collectionSchema.hasPart = {
      '@type': 'ItemList',
      numberOfItems: pageItems.length,
      itemListElement: pageItems.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: l.h1,
        // deckHref is already absolute and trailing-slash; canonicalUrl would
        // strip the slash and emit the form that 301s.
        url: l.deckHref || canonicalUrl(localePath(locale, 'worksheets', l.slug)),
      })),
    };
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: tNav('worksheets'), path: localePath(locale, 'worksheets') },
  ]);

  const cardLabels = {
    pdf: t('card.pdf'),
    answerKey: t('card.answerKey'),
    printOnly: t('card.printOnly'),
    pdfAria: (title: string) => t('card.pdfAria', { title }),
    answerKeyAria: (title: string) => t('card.answerKeyAria', { title }),
    interactiveMark: t('card.interactiveMark'),
  };

  /* ---- grid header: where you are + how many ---- */
  const typeName = filters.type ? typeLabelOf(filters.type) : null;
  const scopeTitle = activeLadder
    ? null
    : typeName || (filters.subject ? getSubjectName(filters.subject, locale) || filters.subject : null);
  const typeSets = filters.type && !activeLadder ? levelSetsOfType(filters.type) : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main
        className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-5 px-3 md:py-8 md:px-6`}
      >
        <div className="mx-auto max-w-7xl">
          <BreadcrumbTrail locale={locale} trail={[{ label: tNav('worksheets') }]} />

          <header className="mb-5 md:mb-6 max-w-3xl">
            <h1 className="font-lcsDisplay font-extrabold text-[1.85rem] md:text-[2.25rem] text-lcs-teal leading-tight mb-1.5">
              {h1}
            </h1>
            <p className="font-lcsBody text-sm md:text-[0.98rem] text-lcs-teal/75 leading-relaxed">
              {intro}
            </p>
          </header>

          {hubRows.length === 0 ? (
            <div className="rounded-xl bg-white border border-lcs-teal/[0.13] p-10 md:p-12 text-center max-w-2xl mx-auto">
              <p className="font-lcsDisplay font-bold text-xl text-lcs-teal mb-3">{t('emptyTitle')}</p>
              <p className="font-lcsBody text-lcs-teal/70">{t('emptyBody')}</p>
            </div>
          ) : (
            <>
              <HubTopBar ariaLabel={t('subjectsAria')} tabs={subjectTabs} interactive={interactiveSwitch} />

              <div className="lg:flex lg:gap-8">
                {rail && <HubSidebar vm={rail} />}

                <div className="min-w-0 flex-1">
                  {rail && <HubMobileFilters vm={rail} />}

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
                    {scopeTitle ? (
                      <h2 className="font-lcsDisplay font-bold text-xl md:text-[1.4rem] text-lcs-teal leading-tight">{scopeTitle}</h2>
                    ) : <span />}
                    {/* topicPage.decksCount is ICU-pluralised in all 11 locales ("1 worksheet"). */}
                    <p className="font-lcsBody text-sm font-semibold text-lcs-teal/60 tabular-nums">{tTopic('decksCount', { count: total })}</p>
                  </div>

                  <CatalogActiveChips chips={chips} clearAllHref={clearAllHref} clearAllLabel={tActive('clearAll')} />

                  {/* The chosen type's Level Sets — its sub-categories — right under its name, at every
                      width: a wrapping row on desktop (first 8, the rest behind "+N more sets"), a
                      swipe row on a phone. The rail lists the same sets under the type. */}
                  {typeSets.length > 0 && (
                    <nav aria-label={tLs('heading')} className="mb-5 rounded-xl bg-white border border-lcs-teal/[0.13] px-3 py-2.5 sm:px-4">
                      <p className="mb-2 font-lcsBody text-[0.7rem] font-bold uppercase tracking-[0.1em] text-lcs-teal/60">
                        {tLs('heading')} · {typeSets.length}
                      </p>
                      <ul className="flex gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap -mx-1 px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {typeSets.slice(0, 8).map((l) => (
                          <li key={l.code} className="shrink-0 sm:shrink">
                            <a href={hrefWith({ type: l.type, set: l.code, level: null, theme: null }, true)} className="inline-flex items-center gap-1.5 min-h-[40px] max-w-[16rem] rounded-full bg-lcs-cream/60 ring-1 ring-lcs-teal/20 px-3.5 font-lcsBody text-[0.82rem] font-semibold text-lcs-teal hover:ring-lcs-teal/50">
                              <span className="truncate">{l.title}</span>
                              <span className="text-[0.72rem] font-normal text-lcs-teal/55 tabular-nums">{l.pageCount}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      {typeSets.length > 8 && (
                        <details className="hub-disc mt-2">
                          <summary className="inline-flex items-center gap-1.5 min-h-[40px] cursor-pointer list-none font-lcsBody text-[0.82rem] font-semibold text-lcs-teal/75 hover:text-lcs-teal">
                            <svg viewBox="0 0 24 24" className="hub-caret w-3 h-3 transition-transform" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                            {tLs('moreSets', { count: typeSets.length - 8 })}
                          </summary>
                          <ul className="mt-1.5 flex flex-wrap gap-2">
                            {typeSets.slice(8).map((l) => (
                              <li key={l.code}>
                                <a href={hrefWith({ type: l.type, set: l.code, level: null, theme: null }, true)} className="inline-flex items-center gap-1.5 min-h-[40px] max-w-[16rem] rounded-full bg-lcs-cream/60 ring-1 ring-lcs-teal/20 px-3.5 font-lcsBody text-[0.82rem] font-semibold text-lcs-teal hover:ring-lcs-teal/50">
                                  <span className="truncate">{l.title}</span>
                                  <span className="text-[0.72rem] font-normal text-lcs-teal/55 tabular-nums">{l.pageCount}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </nav>
                  )}
                  <span id="hub-results" className="block scroll-mt-16" aria-hidden="true" />

                  {activeLadder ? (
                    <LevelSetView
                      locale={locale}
                      ladder={activeLadder}
                      typeLabel={typeName || activeLadder.type}
                      t={tLs as unknown as LevelSetsT}
                      cardLabels={cardLabels}
                      neighbours={pathwayNeighbours(locale, ladders, activeLadder.code)}
                      hasTeacherSheet={teacherSheetExists(locale, activeLadder.code)}
                      interactiveOnly={interactiveOnly}
                    />
                  ) : pageItems.length === 0 ? (
                    <CatalogEmptyState
                      title={tEmpty('heading')}
                      body={interactiveOnly ? t('empty.bodyInteractive') : tEmpty('body')}
                      clearAllHref={clearAllHref}
                      clearAllLabel={tEmpty('cta')}
                      primaryAction={
                        interactiveOnly
                          ? { href: hrefWith({ format: null }, true), label: t('empty.showAll') }
                          : undefined
                      }
                    />
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                      {pageItems.map((l, i) => {
                        const assets = deckAssets(locale, l.canonicalDeckSlug);
                        const printOnly = rowIsPrintOnly(l, isPrintOnlyType);
                        // Falls back to the type when the DB read failed: with
                        // zero mixed types catalogue-wide, the type answers this
                        // exactly, so the card degrades truthfully.
                        const hasAnswerKey = l.hasAnswerKey ?? !printOnly;
                        const code = variationCode(l.canonicalDeckSlug);
                        const ladder = code ? ladderByCode.get(code) : undefined;
                        return (
                          <WorksheetCatalogCard
                            key={l.slug}
                            href={l.deckHref || localePath(locale, 'worksheets', l.slug)}
                            external={Boolean(l.deckHref)}
                            thumbnailSrc={wwwImg(assets.thumbnail)}
                            title={l.h1}
                            levelLabel={levelChip(l.coordinate.level, locale)}
                            typeLabel={filters.type ? '' : typeLabelOf(l.coordinate.type)}
                            labels={cardLabels}
                            printOnly={printOnly}
                            pdfHref={dlHref(locale, l.canonicalDeckSlug, 'pdf')}
                            answerKeyHref={hasAnswerKey ? dlHref(locale, l.canonicalDeckSlug, 'answer') : null}
                            eager={page === 1 && i < EAGER_CARDS}
                            setHref={ladder && ladder.rungCount > 1 ? setHref(locale, ladder.type, ladder.code) : undefined}
                            setLabel={ladder && ladder.rungCount > 1 ? tLs('levels', { count: ladder.rungCount }) : undefined}
                          />
                        );
                      })}
                    </div>
                  )}

                  {!activeLadder && (
                    <Pagination
                      locale={locale}
                      currentPage={page}
                      pageCount={pageCount}
                      basePath={basePath}
                      searchParamsString={spString}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          <CatalogTypeIndex heading={t('index.heading')} items={typeIndex} />

          <PageUsageBlock locale={locale} variant="hub" />
        </div>
      </main>
    </>
  );
}
