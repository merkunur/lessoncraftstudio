import { getTranslations } from 'next-intl/server';
import { Axis } from '@/lib/taxonomy';
import {
  fetchDecksSameAxisKeyOtherLocales,
  fetchDecksRelatedTopics,
  fetchDecksOtherAges,
  fetchDecksCatalogHighlights,
} from '@/lib/topic-variety';
import { TopicDeckSummary } from '@/lib/topic-decks';
import { buildDeckRichAlt } from '@/lib/deck-seo';
import VarietyStripCard from './VarietyStripCard';

// Catalog variety Arc 1 — below-the-fold variety strips on topic pages
// per CLAUDE.md §1 (variety complements topic-page-as-destination per
// path 2 architectural commitment) + §16.2 (page composition extension)
// + §16.6 (honesty discipline: self-skip when content is thin).
//
// Server component. No client interactivity inside the strip itself.
// All deck links use plain <a> per CLAUDE.md §15.7 nginx-routed convention.
//
// Self-skip threshold: cardinality < 2. Single-tile strips read broken.
// Empty strips render nothing (no "no decks yet" placeholder).
//
// Print-CSS hides variety strips: they're discovery surfaces, not content.
//
// All 4 strips share the same render shape (heading + tile row); kind drives
// the data fetcher + heading translation key.

export type VarietyStripKind =
  | 'same-axis-key-other-locales'
  | 'related-topics'
  | 'other-ages'
  | 'catalog-highlights';

interface VarietyStripProps {
  kind: VarietyStripKind;
  axis: Axis;
  axisKey: string;
  currentLocale: string;
  topicName: string;
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

function intentKey(axis: Axis): 'exerciseType' | 'theme' | 'educationalLevel' {
  if (axis === 'exercise-type') return 'exerciseType';
  if (axis === 'theme') return 'theme';
  return 'educationalLevel';
}

async function loadDecks(props: VarietyStripProps): Promise<TopicDeckSummary[]> {
  const { kind, axis, axisKey, currentLocale } = props;
  if (kind === 'same-axis-key-other-locales') {
    return fetchDecksSameAxisKeyOtherLocales(axis, axisKey, currentLocale);
  }
  if (kind === 'related-topics') {
    return fetchDecksRelatedTopics(axis, axisKey, currentLocale);
  }
  if (kind === 'other-ages') {
    // Caller should not render this on educational-level pages; defensive guard.
    if (axis === 'educational-level') return [];
    return fetchDecksOtherAges(axis, axisKey, currentLocale);
  }
  if (kind === 'catalog-highlights') {
    return fetchDecksCatalogHighlights();
  }
  return [];
}

function headingKey(kind: VarietyStripKind, axis: Axis): string {
  if (kind === 'same-axis-key-other-locales') return 'sameAxisKeyOtherLocales';
  if (kind === 'related-topics') return `relatedTopics.${intentKey(axis)}`;
  if (kind === 'other-ages') return 'otherAges';
  return 'catalogHighlights';
}

function languageLabelFor(language: string): string {
  // Uppercase 2-letter code matching existing breadth-grid convention.
  return language.toUpperCase();
}

export default async function VarietyStrip(props: VarietyStripProps) {
  const decks = await loadDecks(props);

  // Self-skip per §16.6 honesty: cardinality < 2 reads broken; render nothing.
  if (decks.length < 2) return null;

  const t = await getTranslations({ locale: props.currentLocale, namespace: 'topicPage.variety' });
  const tAria = await getTranslations({ locale: props.currentLocale, namespace: 'topicPage.variety.aria' });
  // Cross-locale richAlt composition: for variety strips, decks may have a
  // content language different from the page UI locale (same-axis-key-other-locales
  // strip). Per VarietyStripCard.tsx:14-19 JSDoc, when deck.language !==
  // currentLocale we fall back to bare title — the rich-alt composed in
  // currentLocale would mismatch the displayed (deck-language) title.
  // For same-locale strips (related-topics, catalog-highlights, other-ages),
  // we compose richAlt in the deck's own language (== currentLocale here).
  const tAlt = await getTranslations({ locale: props.currentLocale, namespace: 'seo.deckCardAlt' });

  const heading = t(headingKey(props.kind, props.axis), { topic: props.topicName });

  return (
    <section className="mt-12 print:hidden" aria-labelledby={`variety-${props.kind}-heading`}>
      <h2
        id={`variety-${props.kind}-heading`}
        className="font-display text-xl font-semibold text-ink-900 mb-4"
      >
        {heading}
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {decks.map(deck => {
          const title = deckTitleFor(deck, props.currentLocale);
          const sameLocale = deck.language === props.currentLocale;
          const richAlt = sameLocale
            ? buildDeckRichAlt(
                {
                  exerciseType: deck.exerciseType,
                  subjectTags: deck.subjectTags,
                  ageRange: deck.ageRange,
                  title,
                },
                props.currentLocale,
                (key, params) => tAlt(key, params),
              )
            : undefined;
          return (
            <li
              key={`${deck.language}-${deck.id}`}
              className="border border-cream-300 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition"
            >
              <VarietyStripCard
                deckUrl={deckLinkFor(deck)}
                title={title}
                richAlt={richAlt}
                thumbnailUrl={deck.thumbnailUrl}
                languageLabel={languageLabelFor(deck.language)}
                languageAriaLabel={tAria('languageBadge', { label: languageLabelFor(deck.language) })}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
