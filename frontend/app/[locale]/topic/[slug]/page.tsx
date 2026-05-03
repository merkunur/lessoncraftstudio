import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import {
  Axis,
  getAxisName,
  getAxisSlug,
  listAxisKeys,
  resolveTopicSlug,
} from '@/lib/taxonomy';
import { fetchDecksForAxis, listNonEmptyAxisKeys, TopicDeckSummary } from '@/lib/topic-decks';
import { fetchLessonPlanSummaryForTopic } from '@/lib/lesson-plans';
import DeckGridClient, { TopicDeckCardData } from './DeckGridClient';

// Tier 1 launch locales per CLAUDE.md §19. Tier 2-4 fold in later; topic
// pages only generate for locales with catalog content (per Footer.tsx
// convention §5.6: don't fabricate links to pages that don't exist yet).
const TOPIC_LOCALES = ['en', 'de', 'es', 'nl', 'it'] as const;
type TopicLocale = (typeof TOPIC_LOCALES)[number];

const BASE_URL = 'https://www.lessoncraftstudio.com';

// Topic pages revalidate hourly to pick up newly-published decks without a
// rebuild. Static at build time + ISR.
export const revalidate = 3600;

interface TopicParams {
  locale: string;
  slug: string;
}

interface TopicResolution {
  axis: Axis;
  axisKey: string;
  locale: TopicLocale;
}

function isTopicLocale(l: string): l is TopicLocale {
  return (TOPIC_LOCALES as readonly string[]).includes(l);
}

function intentKey(axis: Axis): 'exerciseType' | 'theme' | 'educationalLevel' {
  if (axis === 'exercise-type') return 'exerciseType';
  if (axis === 'theme') return 'theme';
  return 'educationalLevel';
}

/**
 * For an axis-key, return all Tier-1 locales where the page actually exists
 * (i.e. has ≥1 published deck and a localized slug). Drives hreflang
 * alternates honestly — only siblings that exist are declared.
 */
async function getTopicSiblings(
  axis: Axis,
  axisKey: string
): Promise<Array<{ locale: TopicLocale; slug: string }>> {
  const out: Array<{ locale: TopicLocale; slug: string }> = [];
  for (const locale of TOPIC_LOCALES) {
    const slug = getAxisSlug(axis, axisKey, locale);
    if (!slug) continue;
    const decks = await fetchDecksForAxis(axis, axisKey, locale);
    if (decks.length > 0) out.push({ locale, slug });
  }
  return out;
}

export async function generateStaticParams(): Promise<TopicParams[]> {
  // Build-time DB unreachability is tolerated: ISR fills the static map on
  // first hit. See SESSION-STATE.md §10 — local Postgres is intentionally
  // not connected during dev builds.
  try {
    const params: TopicParams[] = [];
    const axes: Axis[] = ['exercise-type', 'theme', 'educational-level'];

    for (const locale of TOPIC_LOCALES) {
      for (const axis of axes) {
        const nonEmpty = await listNonEmptyAxisKeys(axis, locale);
        for (const axisKey of nonEmpty) {
          const slug = getAxisSlug(axis, axisKey, locale);
          if (slug) params.push({ locale, slug });
        }
      }
    }
    return params;
  } catch (err) {
    console.warn('[topic/[slug]] generateStaticParams DB unreachable; falling back to ISR:', (err as Error).message);
    return [];
  }
}

async function resolveOrNotFound(params: TopicParams): Promise<TopicResolution> {
  if (!isTopicLocale(params.locale)) notFound();
  const resolved = resolveTopicSlug(params.slug, params.locale);
  if (!resolved) notFound();
  // Confirm the axis actually has decks for this locale — guard against
  // direct hits to a slug that exists in taxonomy but has no catalog content.
  const decks = await fetchDecksForAxis(resolved.axis, resolved.axisKey, params.locale);
  if (decks.length === 0) notFound();
  return { ...resolved, locale: params.locale };
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
  params: TopicParams;
}): Promise<Metadata> {
  const resolution = await resolveOrNotFound(params);
  const { axis, axisKey, locale } = resolution;

  const t = await getTranslations({ locale, namespace: 'topicPage.meta' });
  const topicName = getAxisName(axis, axisKey, locale) ?? params.slug;

  const siblings = await getTopicSiblings(axis, axisKey);
  const hreflangAlternates: Record<string, string> = {};
  for (const sib of siblings) {
    hreflangAlternates[getHreflangCode(sib.locale)] =
      `${BASE_URL}/${sib.locale}/topic/${sib.slug}/`;
  }
  const enSibling = siblings.find(s => s.locale === 'en');
  const xDefault = enSibling ?? siblings[0];
  if (xDefault) {
    hreflangAlternates['x-default'] = `${BASE_URL}/${xDefault.locale}/topic/${xDefault.slug}/`;
  }

  const canonical = `${BASE_URL}/${locale}/topic/${params.slug}/`;
  const otherSiblings = siblings.filter(s => s.locale !== locale);

  return {
    title: t('title', { topic: topicName }),
    description: t('description', { topic: topicName }),
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: t('title', { topic: topicName }),
      description: t('description', { topic: topicName }),
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: otherSiblings.map(s => ogLocaleMap[s.locale] || s.locale),
    },
    twitter: {
      card: 'summary',
      title: t('title', { topic: topicName }),
      description: t('description', { topic: topicName }),
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

export default async function TopicPage({ params }: { params: TopicParams }) {
  const resolution = await resolveOrNotFound(params);
  const { axis, axisKey, locale } = resolution;

  const t = await getTranslations({ locale, namespace: 'topicPage' });
  const topicName = getAxisName(axis, axisKey, locale) ?? params.slug;
  const intent = intentKey(axis);

  const decks = await fetchDecksForAxis(axis, axisKey, locale);
  const canonical = `${BASE_URL}/${locale}/topic/${params.slug}/`;
  const schema = buildCollectionSchema(locale, topicName, canonical, decks);

  // Pillar 1 Phase 1b — axis-driven lesson-plan reference. Silent fall-through
  // when no plan exists for this (axisKey, locale). Renders as preview card
  // above the deck grid when present. Subscriber-gating UI lives in the
  // LessonPlanReader at the standalone reader route; topic-page link is
  // public-facing and the read surface enforces gate.
  const lessonPlanSummary = await fetchLessonPlanSummaryForTopic(axisKey, locale);
  const tLessonPlan = await getTranslations({ locale, namespace: 'lessonPlanReader.topicReference' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="container mx-auto px-4 max-w-6xl py-12">
        <header className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-3">
            {t(`heading.${intent}`, { topic: topicName })}
          </h1>
          <p className="text-base text-ink-700 max-w-2xl">
            {t(`intro.${intent}`, { topic: topicName })}
          </p>
          <p className="text-sm text-ink-500 mt-3">
            {t('decksCount', { count: decks.length })}
          </p>
        </header>

        {lessonPlanSummary && (
          <section className="mb-10 p-6 rounded-lg bg-cream-100 border border-cream-300">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-2">
              {tLessonPlan('heading')}
            </h2>
            <p className="text-base text-ink-800 mb-3">
              <span className="font-medium">{lessonPlanSummary.title}</span>
              {' '}
              <span className="text-sm text-ink-500">
                · {tLessonPlan('duration', { minutes: lessonPlanSummary.durationMinutes })}
              </span>
            </p>
            {lessonPlanSummary.warmupExcerpt && (
              <p className="text-sm text-ink-700 mb-4">
                {lessonPlanSummary.warmupExcerpt}
              </p>
            )}
            <a
              href={`/${locale}/lesson-plans/${params.slug}/`}
              className="inline-flex items-center text-sm font-medium text-terracotta-500 hover:text-terracotta-600"
            >
              {tLessonPlan('readFullCta')} →
            </a>
          </section>
        )}

        {/* Tool 5A — bulk-mode + per-card affordances live in client child.
            Page chrome above (header, JSON-LD, hreflang via generateMetadata)
            stays SSR per §17.4. Deck links inside the client child preserve
            the §15.7 nginx-routed plain-<a> convention. */}
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
      </main>
    </>
  );
}
