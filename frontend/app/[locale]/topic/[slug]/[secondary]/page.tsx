import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import {
  Axis,
  getAxisName,
  getAxisSlug,
  resolveTopicSlug,
} from '@/lib/taxonomy';
import {
  fetchDecksForIntersection,
  countDecksForIntersection,
  TopicDeckSummary,
} from '@/lib/topic-decks';
import Breadcrumbs from '@/components/catalog/Breadcrumbs';
import CrossAxisPivots from '@/components/catalog/CrossAxisPivots';
import TopicProseContainer from '@/components/catalog/TopicProseContainer';
import ResultCount from '@/components/catalog/ResultCount';
import DeckGridClient, { TopicDeckCardData } from '../DeckGridClient';

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

const TOPIC_LOCALES = ['en', 'de', 'es', 'nl', 'it', 'fr', 'pt', 'sv', 'da', 'no', 'fi'] as const;
type TopicLocale = (typeof TOPIC_LOCALES)[number];

const BASE_URL = 'https://www.lessoncraftstudio.com';

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
    redirect(`/${params.locale}/topic/${r.canonicalPrimarySlug}/${r.canonicalSecondarySlug}/`);
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
  return `/${deck.language}/decks/${deck.slug}/`;
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
  const compositeName = `${name1} · ${name2}`;

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
      `${BASE_URL}/${sibLocale}/topic/${slug1}/${slug2}/`;
  }
  const enHref = hreflangAlternates[getHreflangCode('en')];
  if (enHref) hreflangAlternates['x-default'] = enHref;

  const canonical = `${BASE_URL}/${locale}/topic/${params.slug}/${params.secondary}/`;

  return {
    title: t('title', { topic: compositeName }),
    description: t('description', { topic: compositeName }),
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: t('title', { topic: compositeName }),
      description: t('description', { topic: compositeName }),
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
    twitter: {
      card: 'summary',
      title: t('title', { topic: compositeName }),
      description: t('description', { topic: compositeName }),
    },
  };
}

function buildCollectionSchema(
  locale: TopicLocale,
  topicName: string,
  canonical: string,
  decks: TopicDeckSummary[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': canonical,
    url: canonical,
    name: topicName,
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
}: {
  params: IntersectionParams;
}) {
  const resolution = await resolveOrThrow(params);
  const { axis1, axisKey1, axis2, axisKey2, locale } = resolution;

  const t = await getTranslations({ locale, namespace: 'topicPage' });
  const name1 = getAxisName(axis1, axisKey1, locale) ?? params.slug;
  const name2 = getAxisName(axis2, axisKey2, locale) ?? params.secondary;
  const compositeName = `${name1} · ${name2}`;

  const decks = await fetchDecksForIntersection(
    axis1,
    axisKey1,
    axis2,
    axisKey2,
    locale,
    { take: 24 } // page-1 cap; 6b will introduce cursor-pagination on this same shape
  );
  const totalCount = await countDecksForIntersection(axis1, axisKey1, axis2, axisKey2, locale);

  const canonical = `${BASE_URL}/${locale}/topic/${params.slug}/${params.secondary}/`;
  const schema = buildCollectionSchema(locale, compositeName, canonical, decks);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
          axisKey2={axisKey2}
          topicName1={name1}
          topicName2={name2}
        />

        <DeckGridClient
          decks={decks.map<TopicDeckCardData>(deck => ({
            id: deck.id,
            slug: deck.slug,
            language: deck.language,
            title: deckTitleFor(deck, locale),
            href: deckLinkFor(deck),
            thumbnailUrl: deck.thumbnailUrl,
            pdfUrl: deck.pdfUrl,
          }))}
          labels={{
            playLink: t('deckCard.playLink'),
            pdfLink: t('deckCard.pdfLink'),
          }}
        />

        <CrossAxisPivots
          locale={locale}
          currentAxes={[
            { axis: axis1, axisKey: axisKey1 },
            { axis: axis2, axisKey: axisKey2 },
          ]}
        />
      </main>
    </>
  );
}
