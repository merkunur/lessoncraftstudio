import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import {
  Axis,
  getAxisName,
  getAxisSlug,
  getExerciseModeName,
  listAxisKeys,
  resolveTopicSlug,
} from '@/lib/taxonomy';
import {
  fetchDecksForIntersection,
  countDecksForIntersection,
  fetchDecksForTopicWithFilters,
  getExerciseModeCountsForType,
  getFacetCounts,
  listAllNonEmptyThemesWithCounts,
  TopicDeckSummary,
  TOPIC_PAGE_SIZE,
  TopicSortKey,
} from '@/lib/topic-decks';
import { landingSlugForDeck } from '@/lib/seo/landing-content';
import Breadcrumbs from '@/components/catalog/Breadcrumbs';
import CrossAxisPivots from '@/components/catalog/CrossAxisPivots';
import TopicProseContainer, { intentForAxis } from '@/components/catalog/TopicProseContainer';
import PageUsageBlock from '@/components/catalog/PageUsageBlock';
import TopicFaq from '@/components/catalog/TopicFaq';
import ResultCount from '@/components/catalog/ResultCount';
import FilterSidebar, { FacetGroup } from '@/components/catalog/FilterSidebar';
import MobileFilterDrawer from '@/components/catalog/MobileFilterDrawer';
import SortDropdown from '@/components/catalog/SortDropdown';
import ActiveFilterChips from '@/components/catalog/ActiveFilterChips';
import EmptyDecksState from '@/components/catalog/EmptyDecksState';
import Pagination from '@/components/catalog/Pagination';
import { buildFilterUrl } from '@/components/catalog/filterUrl';
import DeckGridClient, { TopicDeckCardData } from '../DeckGridClient';
import { buildDeckRichAlt } from '@/lib/deck-seo';

// Arc 6b — searchParams validation. Reused per the [slug]/page.tsx pattern;
// duplicated here rather than imported because the route files are siblings
// under separate App Router segments.

const VALID_SORTS: TopicSortKey[] = ['newest', 'alpha-asc', 'alpha-desc'];
const VALID_LEVEL_KEYS = new Set(listAxisKeys('educational-level'));
const VALID_THEME_KEYS = new Set(listAxisKeys('theme'));
const VALID_TYPE_KEYS = new Set(listAxisKeys('exercise-type'));

interface ParsedFilters {
  sort: TopicSortKey;
  page: number;
  level?: string;
  theme?: string;
  type?: string;
  mode?: string;
}

function parseSearchParams(
  searchParams: { [key: string]: string | string[] | undefined },
  basePath: string,
): { parsed: ParsedFilters; canonicalRedirect: string | null; notFound: boolean } {
  const get = (key: string): string | undefined => {
    const v = searchParams[key];
    if (Array.isArray(v)) return v[0];
    return v;
  };

  const sortRaw = get('sort');
  const pageRaw = get('page');
  const level = get('level');
  const theme = get('theme');
  const type = get('type');
  const mode = get('mode');

  const sort: TopicSortKey =
    sortRaw && (VALID_SORTS as string[]).includes(sortRaw)
      ? (sortRaw as TopicSortKey)
      : 'newest';
  const pageNum = pageRaw ? parseInt(pageRaw, 10) : 1;

  if (level && !VALID_LEVEL_KEYS.has(level)) return { parsed: {} as ParsedFilters, canonicalRedirect: null, notFound: true };
  if (theme && !VALID_THEME_KEYS.has(theme)) return { parsed: {} as ParsedFilters, canonicalRedirect: null, notFound: true };
  if (type && !VALID_TYPE_KEYS.has(type)) return { parsed: {} as ParsedFilters, canonicalRedirect: null, notFound: true };
  if (pageRaw && (!Number.isInteger(pageNum) || pageNum < 1)) {
    return { parsed: {} as ParsedFilters, canonicalRedirect: null, notFound: true };
  }

  const sp = new URLSearchParams();
  if (sort !== 'newest') sp.set('sort', sort);
  if (pageNum !== 1) sp.set('page', String(pageNum));
  if (level) sp.set('level', level);
  if (mode) sp.set('mode', mode);
  if (theme) sp.set('theme', theme);
  if (type) sp.set('type', type);
  // Local name `canonicalForm` avoids shadowing the imported `canonicalUrl`
  // helper from `@/lib/seo/url`. The two have different semantics: this is
  // the canonical filter-URL form (path + sorted query string); the import
  // builds absolute canonical URLs with no trailing slash.
  const canonicalForm = buildFilterUrl(basePath, sp);

  // Detect non-canonical input — see [slug]/page.tsx for rationale.
  const rawCurrentSp = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === 'string') rawCurrentSp.set(key, value);
  }
  const rawCurrentUrl = rawCurrentSp.toString()
    ? `${basePath}?${rawCurrentSp.toString()}`
    : basePath;

  const canonicalRedirect = rawCurrentUrl !== canonicalForm ? canonicalForm : null;

  return {
    parsed: { sort, page: pageNum, level, theme, type, mode },
    canonicalRedirect,
    notFound: false,
  };
}

// Arc 6c — path-based 2-axis intersection topic pages.
//
// Route shape: /<locale>/topic/<axis-1-slug>/<axis-2-slug>/
//   Examples:  /it/topic/animali/grado-2/      (theme × educational-level)
//              /en/topic/animals/wordsearch/   (theme × exercise-type)
//              /de/topic/kindergarten/sudoku/  (educational-level × exercise-type)
//
// Axis-ordering convention (locked): theme → educational-level → exercise-type
// (most-concrete to most-abstract). The route emits a 301 canonical redirect
// when slugs are passed in the wrong order — protects SEO signal against
// external links written in either order.

// Topic-page locales — single source of truth at frontend/config/topic-locales.ts.
// Mirrors single-axis topic page locale set.
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';
const TOPIC_LOCALES = TOPIC_ENABLED_LOCALES;
type TopicLocale = TopicEnabledLocale;

// SEO URLs go through `canonicalUrl()` / `localePath()` from `@/lib/seo/url`
// to enforce the no-trailing-slash invariant. `BASE_URL` retained as alias of
// `CANONICAL_HOST` for non-URL string usage (schema @id refs, etc.).
const BASE_URL = CANONICAL_HOST;

// Per-axis canonical-order rank; lower wins primary slot.
const AXIS_ORDER_RANK: Record<Axis, number> = {
  theme: 1,
  'educational-level': 2,
  'exercise-type': 3,
};

export const revalidate = 3600;

interface IntersectionParams {
  locale: string;
  slug: string; // axis-1 slug
  secondary: string; // axis-2 slug
}

interface IntersectionResolution {
  axis1: Axis;
  axisKey1: string;
  axis2: Axis;
  axisKey2: string;
  locale: TopicLocale;
}

function isTopicLocale(l: string): l is TopicLocale {
  return (TOPIC_LOCALES as readonly string[]).includes(l);
}

/**
 * Resolves both slugs to their (axis, axisKey) tuples. Returns null when
 * either slug doesn't resolve, when the two slugs map to the same axis, or
 * when the resolved order is non-canonical (caller redirects in that case).
 *
 * The return shape always presents the canonical ordering — i.e. axis1 has
 * lower AXIS_ORDER_RANK than axis2.
 */
function resolveIntersection(
  primarySlug: string,
  secondarySlug: string,
  locale: string
):
  | { kind: 'ok'; resolved: Omit<IntersectionResolution, 'locale'> }
  | { kind: 'redirect'; canonicalPrimarySlug: string; canonicalSecondarySlug: string }
  | { kind: 'notfound' } {
  const a = resolveTopicSlug(primarySlug, locale);
  const b = resolveTopicSlug(secondarySlug, locale);
  if (!a || !b) return { kind: 'notfound' };
  if (a.axis === b.axis) return { kind: 'notfound' };

  const rankA = AXIS_ORDER_RANK[a.axis];
  const rankB = AXIS_ORDER_RANK[b.axis];

  if (rankA <= rankB) {
    return {
      kind: 'ok',
      resolved: {
        axis1: a.axis,
        axisKey1: a.axisKey,
        axis2: b.axis,
        axisKey2: b.axisKey,
      },
    };
  }
  // Non-canonical ordering — caller responds with a 301 redirect.
  return {
    kind: 'redirect',
    canonicalPrimarySlug: secondarySlug,
    canonicalSecondarySlug: primarySlug,
  };
}

async function resolveOrThrow(params: IntersectionParams): Promise<IntersectionResolution> {
  if (!isTopicLocale(params.locale)) notFound();
  const r = resolveIntersection(params.slug, params.secondary, params.locale);
  if (r.kind === 'notfound') notFound();
  if (r.kind === 'redirect') {
    redirect(localePath(params.locale, 'topic', r.canonicalPrimarySlug, r.canonicalSecondarySlug));
  }
  // Confirm the intersection has ≥1 published deck (defense-in-depth per
  // §16.6.1 — sitemap pruning prevents most empty hits but external links
  // could land here for stale axis pairs).
  const count = await countDecksForIntersection(
    r.resolved.axis1,
    r.resolved.axisKey1,
    r.resolved.axis2,
    r.resolved.axisKey2,
    params.locale
  );
  if (count === 0) notFound();
  return { ...r.resolved, locale: params.locale };
}

function deckTitleFor(deck: TopicDeckSummary, locale: string): string {
  const t = deck.title;
  if (t && typeof t === 'object') {
    return (t as Record<string, string>)[locale] ?? (t as Record<string, string>).en ?? deck.slug;
  }
  return deck.slug;
}

function deckLinkFor(deck: TopicDeckSummary): string {
  // Conditional repoint: landing IFF published for this deck's coordinate, else /decks/ asset.
  const lp = landingSlugForDeck(deck.language, deck.slug);
  return lp ? `/${deck.language}/worksheets/${lp}` : `/${deck.language}/decks/${deck.slug}/`;
}

/**
 * Resolve intersection prose for the (a1, a2) pair from topicProse namespace.
 * Per §16.7.2 alphabetic-key convention: keys are stored as `<sortedA>__<sortedB>`.
 * Returns null when no prose authored (long-tail intersections per §16.7.3 Path B).
 */
async function getIntersectionProse(locale: string, axisKey1: string, axisKey2: string): Promise<string | null> {
  try {
    const tp = await getTranslations({ locale, namespace: 'topicProse' });
    const sorted = [axisKey1, axisKey2].sort().join('__');
    const v = tp(sorted);
    // Reject both next-intl miss forms — bare-key + namespaced-path.
    if (!v || v === sorted || v === 'topicProse.' + sorted) return null;
    return v;
  } catch {
    return null;
  }
}

/**
 * Resolve purpose-built SEO meta description for the (a1, a2) intersection
 * from the topicMeta namespace. Same alphabetic-key convention as prose.
 * Returns null when no entry — chain falls through to prose first-sentence,
 * then template fallback. Authored per §A.13.48 cadence.
 */
async function getIntersectionMeta(locale: string, axisKey1: string, axisKey2: string): Promise<string | null> {
  try {
    const tm = await getTranslations({ locale, namespace: 'topicMeta' });
    const sorted = [axisKey1, axisKey2].sort().join('__');
    const v = tm(sorted);
    if (!v || v === sorted || v === 'topicMeta.' + sorted) return null;
    return v;
  } catch {
    return null;
  }
}

// Rendered length of a meta-description string as it appears in the HTML
// `<meta content="...">` attribute: apostrophe → &#x27; (+5), & → &amp; (+4),
// " → &quot; (+5), < / > → &lt; / &gt; (+3). Accented chars render literally
// (1 each). Mirrors the C11/C12 single-axis rendered-length discipline.
const INTERSECTION_RENDER_MAX = 170;
function renderedMetaLen(s: string): number {
  let n = s.length;
  n += (s.match(/'/g) || []).length * 5;
  n += (s.match(/&/g) || []).length * 4;
  n += (s.match(/"/g) || []).length * 5;
  n += (s.match(/</g) || []).length * 3;
  n += (s.match(/>/g) || []).length * 3;
  return n;
}

type IntersectionMetaT = (key: string, vars?: Record<string, string>) => string;

/**
 * Compose a pair-aware, axis-name-driven meta description for an intersection
 * page — the universal long-tail fallback per §16.7.3 Path B. Canonical axis
 * ordering (theme=1 → educational-level=2 → exercise-type=3) means only three
 * pairs occur; each gets a per-pair ICU template with NAMED vars so the
 * preposition/article grammar is right (positional primary/secondary would
 * garble it). Picks a SHORT variant when the base exceeds the rendered ceiling
 * (long IT/PT level names + long themes); hard-truncates only in the
 * pathological case where even the short variant overflows.
 */
function composeIntersectionDescription(
  axis1: Axis,
  axis2: Axis,
  name1: string,
  name2: string,
  ti: IntersectionMetaT,
): string {
  let baseKey: string;
  let shortKey: string;
  let vars: Record<string, string>;
  if (axis1 === 'theme' && axis2 === 'educational-level') {
    baseKey = 'themeLevel';
    shortKey = 'themeLevelShort';
    vars = { theme: name1, level: name2 };
  } else if (axis1 === 'theme' && axis2 === 'exercise-type') {
    baseKey = 'themeType';
    shortKey = 'themeTypeShort';
    vars = { theme: name1, type: name2 };
  } else {
    // educational-level × exercise-type (canonical order: level is primary).
    baseKey = 'levelType';
    shortKey = 'levelTypeShort';
    vars = { level: name1, type: name2 };
  }
  const base = ti(baseKey, vars);
  if (renderedMetaLen(base) <= INTERSECTION_RENDER_MAX) return base;
  const short = ti(shortKey, vars);
  if (renderedMetaLen(short) <= INTERSECTION_RENDER_MAX) return short;
  // Pathological: even the short variant overflows. Trim to the ceiling at a
  // word/punctuation boundary and append an ellipsis.
  let trimmed = short.slice(0, INTERSECTION_RENDER_MAX - 3);
  const lastBreak = Math.max(trimmed.lastIndexOf(' '), trimmed.lastIndexOf('·'));
  if (lastBreak > (INTERSECTION_RENDER_MAX - 3) * 0.7) trimmed = trimmed.slice(0, lastBreak);
  return trimmed.replace(/[\s,;:·—-]+$/, '') + '…';
}

/**
 * Extract first sentence from prose for use as meta description (mirrors
 * the single-axis topic page helper for consistency).
 */
function firstSentenceOf(prose: string | null | undefined, maxLen = 155): string | null {
  if (!prose) return null;
  const trimmed = prose.trim();
  if (!trimmed) return null;
  const m = trimmed.match(/^[\s\S]+?[.!?](?=\s|$)/);
  let candidate = m ? m[0].trim() : trimmed;
  if (candidate.length > maxLen) {
    candidate = candidate.slice(0, maxLen);
    const lastSpace = candidate.lastIndexOf(' ');
    if (lastSpace > maxLen * 0.7) candidate = candidate.slice(0, lastSpace);
    candidate = candidate.replace(/[,;:]+$/, '') + '…';
  }
  return candidate;
}

/**
 * Prose-derived intersection meta with a guaranteed 120-char floor (C15).
 *
 * The legacy first-sentence path (firstSentenceOf) returns a single short
 * sentence as-is, which can fall under the 120-char SEO floor for the ~35
 * authored intersection prose entries whose opening sentence is terse
 * ("Animal-themed shadow-match worksheets pair each creature picture with its
 * silhouette." = 85 chars). This wrapper preserves the legacy output VERBATIM
 * when the first sentence already renders ≥120 (zero churn for the passing
 * majority), otherwise accumulates following sentences from the same authored
 * prose until the floor is reached (capped at MULTI_CAP rendered, word-boundary
 * + ellipsis). Returns null when the prose is too short even when fully
 * consumed — the chain then falls through to composeIntersectionDescription,
 * which is proven to always land 120-170.
 *
 * Reuses authored prose; introduces no new copy. Affects only the intersection
 * route (the single-axis route has its own helper and is gated by topicMeta).
 */
function intersectionProseMeta(prose: string | null | undefined): string | null {
  const FLOOR = 120;
  const MULTI_CAP = 168;
  const legacy = firstSentenceOf(prose, 155);
  if (!legacy) return null;
  if (renderedMetaLen(legacy) >= FLOOR) return legacy;
  const sentences = String(prose || '').trim().match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g) || [];
  let acc = '';
  for (const s of sentences) {
    acc = acc ? acc + ' ' + s.trim() : s.trim();
    if (renderedMetaLen(acc) >= FLOOR) break;
  }
  if (renderedMetaLen(acc) < FLOOR) return null;
  if (renderedMetaLen(acc) <= MULTI_CAP) return acc;
  let cut = acc;
  while (renderedMetaLen(cut) > MULTI_CAP - 1 && cut.length > 0) cut = cut.slice(0, -1);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > cut.length * 0.7) cut = cut.slice(0, lastSpace);
  return cut.replace(/[\s,;:·—-]+$/, '') + '…';
}

// Title-segment casing (mirror single-axis page.tsx): uppercase only the first
// char (Unicode-aware), preserving the rest.
function capFirst(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export async function generateMetadata({
  params,
}: {
  params: IntersectionParams;
}): Promise<Metadata> {
  const resolution = await resolveOrThrow(params);
  const { axis1, axisKey1, axis2, axisKey2, locale } = resolution;

  const t = await getTranslations({ locale, namespace: 'topicPage.meta' });
  const name1 = getAxisName(axis1, axisKey1, locale) ?? params.slug;
  const name2 = getAxisName(axis2, axisKey2, locale) ?? params.secondary;

  // Title: type-first, em-dash join (matches the deck-title segment style +
  // disambiguates from the brand "·" the root template appends). The exercise-type
  // axis (always axis2 in the canonical theme→level→type ordering when present) is
  // the primary keyword head and reuses each locale's single-axis "{primary}
  // worksheets" grammar; the other axis is appended as the secondary segment.
  const primaryIsAxis2 = axis2 === 'exercise-type';
  const primaryName = capFirst(primaryIsAxis2 ? name2 : name1);
  const secondaryName = capFirst(primaryIsAxis2 ? name1 : name2);
  const primaryTitle = t('title', { topic: primaryName });
  const withSecondary = `${primaryTitle} — ${secondaryName}`;
  // Keep the full rendered title (incl. root brand " · LessonCraftStudio" ≈ 19 chars)
  // ≤ 70; on overflow drop the secondary segment (rare; long type+theme in a verbose locale).
  const pageTitle = withSecondary.length + 19 <= 70 ? withSecondary : primaryTitle;

  // Hreflang alternates: only the locales where the same intersection exists.
  // Each sibling-locale's slugs differ per §17.4 native-language doctrine.
  const hreflangAlternates: Record<string, string> = {};
  for (const sibLocale of TOPIC_LOCALES) {
    const slug1 = getAxisSlug(axis1, axisKey1, sibLocale);
    const slug2 = getAxisSlug(axis2, axisKey2, sibLocale);
    if (!slug1 || !slug2) continue;
    const sibCount = await countDecksForIntersection(axis1, axisKey1, axis2, axisKey2, sibLocale);
    if (sibCount === 0) continue;
    hreflangAlternates[getHreflangCode(sibLocale)] =
      canonicalUrl(localePath(sibLocale, 'topic', slug1, slug2));
  }
  const enHref = hreflangAlternates[getHreflangCode('en')];
  if (enHref) hreflangAlternates['x-default'] = enHref;

  const canonical = canonicalUrl(localePath(locale, 'topic', params.slug, params.secondary));

  // Description chain (3 levels, most specific to most generic):
  //   1. topicMeta.<a1>__<a2>            — alphabetic-key, purpose-built SEO copy (C15+ top-N)
  //   2. firstSentenceOf(topicProse)     — first sentence of authored prose
  //   3. composeIntersectionDescription  — pair-aware axis-name-composed template (§16.7.3 Path B; C14)
  // Cross-reference single-axis page.tsx comment for arc context. Level 3 was
  // previously the thin single-axis generic (`topicPage.meta.description` with a
  // "·"-joined composite); replaced by the composed per-pair template in C14.
  const ti = await getTranslations({ locale, namespace: 'topicPage.intersection.meta' });
  const intersectionMeta = await getIntersectionMeta(locale, axisKey1, axisKey2);
  const intersectionProse = await getIntersectionProse(locale, axisKey1, axisKey2);
  // C15: prose path now guarantees the 120-char floor (accumulates sentences),
  // returning null when the authored prose is too short — chain then composes.
  const prosePreview = intersectionProseMeta(intersectionProse);
  const description =
    intersectionMeta ?? prosePreview ?? composeIntersectionDescription(axis1, axis2, name1, name2, ti);

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: pageTitle,
      description,
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      images: [
        {
          url: `${CANONICAL_HOST}/og-homepage.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [`${CANONICAL_HOST}/og-homepage.png`],
    },
  };
}

function buildCollectionSchema(
  locale: TopicLocale,
  topicName: string,
  canonical: string,
  decks: TopicDeckSummary[],
  proseDescription?: string | null
) {
  let description: string | undefined;
  if (proseDescription) {
    const trimmed = proseDescription.trim();
    description = trimmed.length > 500
      ? trimmed.slice(0, 497).replace(/[\s,;:]+$/, '') + '…'
      : trimmed;
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': canonical,
    url: canonical,
    name: topicName,
    ...(description ? { description } : {}),
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'LessonCraftStudio',
    },
    hasPart: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: decks.length,
      itemListElement: decks.map((deck, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${BASE_URL}${deckLinkFor(deck)}`,
        item: {
          '@type': 'LearningResource',
          '@id': `${BASE_URL}${deckLinkFor(deck)}`,
          url: `${BASE_URL}${deckLinkFor(deck)}`,
          name: deckTitleFor(deck, locale),
          inLanguage: deck.language,
          learningResourceType: 'Worksheet',
          isAccessibleForFree: true,
        },
      })),
    },
  };
}

export default async function IntersectionPage({
  params,
  searchParams,
}: {
  params: IntersectionParams;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resolution = await resolveOrThrow(params);
  const { axis1, axisKey1, axis2, axisKey2, locale } = resolution;

  const t = await getTranslations({ locale, namespace: 'topicPage' });
  const tDeckAlt = await getTranslations({ locale, namespace: 'seo.deckCardAlt' });
  const name1 = getAxisName(axis1, axisKey1, locale) ?? params.slug;
  const name2 = getAxisName(axis2, axisKey2, locale) ?? params.secondary;
  const compositeName = `${name1} · ${name2}`;
  // No trailing slash — Next.js routes per `next.config.js: trailingSlash: false`.
  // basePath flows to canonical and to buildFilterUrl; both must emit no-slash.
  const basePath = `/${locale}/topic/${params.slug}/${params.secondary}`;

  // Arc 6b — searchParams parse + canonical-redirect + 404 for invalid input
  const sp = parseSearchParams(searchParams, basePath);
  if (sp.notFound) notFound();
  if (sp.canonicalRedirect) redirect(sp.canonicalRedirect);
  const filters = sp.parsed;

  // Resolve secondary axes from searchParams. Path-bound axes (axis1, axis2)
  // are excluded — only the THIRD unanchored axis can be a filter.
  const secondaryAxes: Array<{ axis: Axis; axisKey: string }> = [];
  const pathAxes = new Set<Axis>([axis1, axis2]);
  if (filters.level && !pathAxes.has('educational-level')) {
    secondaryAxes.push({ axis: 'educational-level', axisKey: filters.level });
  }
  if (filters.theme && !pathAxes.has('theme')) {
    secondaryAxes.push({ axis: 'theme', axisKey: filters.theme });
  }
  if (filters.type && !pathAxes.has('exercise-type')) {
    secondaryAxes.push({ axis: 'exercise-type', axisKey: filters.type });
  }

  const primaryAxes = [
    { axis: axis1, axisKey: axisKey1 },
    { axis: axis2, axisKey: axisKey2 },
  ];

  // Exercise-mode filter — only meaningful when one of the path-bound axes
  // IS exercise-type. Identifies the path-bound exercise-type axis-key so
  // the mode facet can be scoped to that app.
  const pathBoundExerciseTypeKey =
    axis1 === 'exercise-type' ? axisKey1 :
    axis2 === 'exercise-type' ? axisKey2 : null;
  const modeFilter = (pathBoundExerciseTypeKey && filters.mode) ? filters.mode : undefined;

  const { decks, totalCount, pageCount } = await fetchDecksForTopicWithFilters(
    primaryAxes,
    {
      secondaryAxes: secondaryAxes.length > 0 ? secondaryAxes : undefined,
      modeFilter,
      sort: filters.sort,
      page: filters.page,
      pageSize: TOPIC_PAGE_SIZE,
    },
    locale,
  );

  if (filters.page > pageCount && pageCount > 0) notFound();

  const facetCounts = await getFacetCounts(primaryAxes, secondaryAxes, locale, modeFilter);

  // Mode facet — appears only when path bound to exercise-type via axis1 or axis2
  const modeFacetOptions = pathBoundExerciseTypeKey
    ? await getExerciseModeCountsForType(pathBoundExerciseTypeKey, secondaryAxes, locale)
    : [];

  // Build active-filter chip descriptors (only the third unanchored axis can
  // be active on intersection pages — except mode, which is subsidiary to
  // exercise-type and shows when exercise-type is path-bound).
  type ChipKey = 'level' | 'theme' | 'type' | 'mode';
  type Chip = { paramKey: ChipKey; axisKey: string; label: string };
  const activeChips: Chip[] = [];
  if (filters.level && !pathAxes.has('educational-level')) {
    const name = getAxisName('educational-level', filters.level, locale);
    if (name) activeChips.push({ paramKey: 'level', axisKey: filters.level, label: name });
  }
  if (filters.theme && !pathAxes.has('theme')) {
    const name = getAxisName('theme', filters.theme, locale);
    if (name) activeChips.push({ paramKey: 'theme', axisKey: filters.theme, label: name });
  }
  if (filters.type && !pathAxes.has('exercise-type')) {
    const name = getAxisName('exercise-type', filters.type, locale);
    if (name) activeChips.push({ paramKey: 'type', axisKey: filters.type, label: name });
  }
  if (modeFilter) {
    const name = getExerciseModeName(modeFilter, locale);
    if (name) activeChips.push({ paramKey: 'mode', axisKey: modeFilter, label: name });
  }

  // Build facet group(s) — only the unanchored axis renders as a facet
  const tFacets = await getTranslations({ locale, namespace: 'topicPage.facets' });
  const facetGroups: FacetGroup[] = [];
  if (!pathAxes.has('educational-level')) {
    const opts = facetCounts['educational-level'].map(c => ({
      axisKey: c.axisKey,
      label: getAxisName('educational-level', c.axisKey, locale) ?? c.axisKey,
      count: c.count,
    }));
    facetGroups.push({ paramKey: 'level', heading: tFacets('educationalLevel'), options: opts });
  }
  if (!pathAxes.has('theme')) {
    const allThemes = await listAllNonEmptyThemesWithCounts(locale);
    const counts = new Map(facetCounts['theme'].map(c => [c.axisKey, c.count]));
    const opts = allThemes
      .map(t2 => ({
        axisKey: t2.axisKey,
        label: getAxisName('theme', t2.axisKey, locale) ?? t2.axisKey,
        count: counts.get(t2.axisKey) ?? 0,
      }))
      .filter(o => o.count > 0);
    facetGroups.push({
      paramKey: 'theme',
      heading: tFacets('theme.heading'),
      options: opts,
      isThemeWithExpand: true,
      themeTier1Count: 12,
    });
  }
  if (!pathAxes.has('exercise-type')) {
    const opts = facetCounts['exercise-type'].map(c => ({
      axisKey: c.axisKey,
      label: getAxisName('exercise-type', c.axisKey, locale) ?? c.axisKey,
      count: c.count,
    }));
    facetGroups.push({ paramKey: 'type', heading: tFacets('exerciseType'), options: opts });
  }
  // Exercise-mode facet — appears only when one of the path-bound axes is
  // exercise-type (mode is subsidiary to exercise-type per §17.8.5).
  if (pathBoundExerciseTypeKey && modeFacetOptions.length > 0) {
    const opts = modeFacetOptions.map(c => ({
      axisKey: c.axisKey,
      label: getExerciseModeName(c.axisKey, locale) ?? c.axisKey,
      count: c.count,
    }));
    facetGroups.push({ paramKey: 'mode', heading: tFacets('exerciseMode'), options: opts });
  }

  const childSpString = (() => {
    const out = new URLSearchParams();
    if (filters.sort !== 'newest') out.set('sort', filters.sort);
    if (filters.page !== 1) out.set('page', String(filters.page));
    if (filters.level) out.set('level', filters.level);
    if (modeFilter) out.set('mode', modeFilter);
    if (filters.theme) out.set('theme', filters.theme);
    if (filters.type) out.set('type', filters.type);
    return out.toString();
  })();

  const canonical = canonicalUrl(basePath);
  const intersectionProseForSchema = await getIntersectionProse(locale, axisKey1, axisKey2);
  const schema = buildCollectionSchema(locale, compositeName, canonical, decks, intersectionProseForSchema);

  // BreadcrumbList JSON-LD — 3-level shape mirrors visible <Breadcrumbs>:
  //   Home › <axis1-name> › <axis1-name · axis2-name>
  const homeLabel = await (async () => {
    const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });
    return tBreadcrumb('home');
  })();
  const breadcrumbTrail: BreadcrumbCrumb[] = [
    { name: homeLabel, path: localePath(locale) },
    { name: name1, path: localePath(locale, 'topic', params.slug) },
    { name: compositeName, path: localePath(locale, 'topic', params.slug, params.secondary) },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbTrail);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="container mx-auto px-4 max-w-6xl py-12">
        {/* Arc 6a — depth-UI overlay: 3-level breadcrumbs above h1;
            result-count + prose container below h1; cross-axis pivots
            below deck grid. */}
        <Breadcrumbs
          locale={locale}
          axisName1={name1}
          slug1={params.slug}
          axisName2={name2}
          slug2={params.secondary}
        />

        <header className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-3">
            {t('intersection.heading', { primary: name1, secondary: name2 })}
          </h1>
          <ResultCount locale={locale} count={totalCount} />
        </header>

        <TopicProseContainer
          locale={locale}
          axisKey1={axisKey1}
          intent1={intentForAxis(axis1)}
          axisKey2={axisKey2}
          intent2={intentForAxis(axis2)}
          topicName1={name1}
          topicName2={name2}
          count={totalCount}
        />

        <PageUsageBlock
          locale={locale}
          variant="intersection"
          overrideKey={[axisKey1, axisKey2].sort().join('__')}
          primary={name1}
          secondary={name2}
        />

        {/* Arc 6b — Filter sidebar (only the third unanchored axis renders
            as a facet on intersection pages) + main content. */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <FilterSidebar
            basePath={basePath}
            facetGroups={facetGroups}
          />
          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <MobileFilterDrawer basePath={basePath} facetGroups={facetGroups} />
              <SortDropdown basePath={basePath} />
            </div>
            <ActiveFilterChips basePath={basePath} chips={activeChips} />
            {decks.length === 0 ? (
              <EmptyDecksState
                locale={locale}
                basePath={basePath}
                searchParamsString={childSpString}
              />
            ) : (
              <DeckGridClient
                decks={decks.map<TopicDeckCardData>(deck => {
                  const title = deckTitleFor(deck, locale);
                  return {
                    id: deck.id,
                    slug: deck.slug,
                    language: deck.language,
                    title,
                    richAlt: buildDeckRichAlt(
                      {
                        exerciseType: deck.exerciseType,
                        subjectTags: deck.subjectTags,
                        ageRange: deck.ageRange,
                        title,
                      },
                      locale,
                      (key, params) => tDeckAlt(key, params),
                    ),
                    href: deckLinkFor(deck),
                    thumbnailUrl: deck.thumbnailUrl,
                    pdfUrl: deck.pdfUrl,
                    answerKeyUrl: deck.answerKeyUrl,
                  };
                })}
                labels={{
                  playLink: t('deckCard.playLink'),
                  pdfLink: t('deckCard.pdfLink'),
                  answerKeyLink: t('deckCard.answerKeyLink'),
                }}
              />
            )}
            <Pagination
              locale={locale}
              currentPage={filters.page}
              pageCount={pageCount}
              basePath={basePath}
              searchParamsString={childSpString}
            />
          </div>
        </div>

        <CrossAxisPivots
          locale={locale}
          currentAxes={[
            { axis: axis1, axisKey: axisKey1 },
            { axis: axis2, axisKey: axisKey2 },
          ]}
        />

        <TopicFaq
          locale={locale}
          variant="intersection"
          axisKey1={axisKey1}
          axisKey2={axisKey2}
          topicName1={name1}
          topicName2={name2}
          count={totalCount}
          pageUrl={canonical}
        />
      </main>
    </>
  );
}
