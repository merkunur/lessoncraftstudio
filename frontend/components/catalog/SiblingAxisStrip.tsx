import { getTranslations } from 'next-intl/server';
import { Axis, getAxisName, getAxisSlug } from '@/lib/taxonomy';
import { listSiblingAxisKeysWithCounts } from '@/lib/topic-decks';

// Arc 6a — Sibling-axis discovery rail on single-axis topic pages.
//
// On theme=animals page in en: renders pills for other themes with ≥1
// published deck (vehicles, food, fruits, ...). Capped at 8 per operator
// Q2 lock; deck-count desc + alphabetic-by-localized-name tiebreak.
//
// §16.6 substrate-honesty: only siblings with ≥1 published deck for the
// current locale render. Current axis-key never appears in its own siblings.
//
// Heading reuses existing topicPage.variety.relatedTopics.<intent> per
// Phase 1 i18n precedent (saves duplicate authoring; same labels exist).

const SIBLING_DENSITY_CAP = 8;

interface SiblingAxisStripProps {
  locale: string;
  currentAxis: Axis;
  currentAxisKey: string;
}

function intentKey(axis: Axis): 'exerciseType' | 'theme' | 'educationalLevel' {
  if (axis === 'exercise-type') return 'exerciseType';
  if (axis === 'theme') return 'theme';
  return 'educationalLevel';
}

export default async function SiblingAxisStrip({
  locale,
  currentAxis,
  currentAxisKey,
}: SiblingAxisStripProps) {
  // Reuse existing topicPage.variety.relatedTopics namespace per Phase 1
  // i18n precedent — same axis-kind labels already shipped across all 11
  // locales. Saves 33 duplicate strings.
  const t = await getTranslations({ locale, namespace: 'topicPage.variety.relatedTopics' });
  const heading = t(intentKey(currentAxis));

  const siblings = await listSiblingAxisKeysWithCounts(currentAxis, currentAxisKey, locale);

  // Resolve display names + slugs per locale; drop siblings without a slug
  // for this locale (substrate-honesty).
  const resolved = siblings
    .map(s => ({
      axisKey: s.axisKey,
      count: s.count,
      name: getAxisName(currentAxis, s.axisKey, locale),
      slug: getAxisSlug(currentAxis, s.axisKey, locale),
    }))
    .filter((s): s is { axisKey: string; count: number; name: string; slug: string } =>
      !!s.name && !!s.slug
    );

  // Tiebreak on equal deck-counts: alphabetic by localized name (ICU-default
  // Unicode collation per locale).
  resolved.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, locale);
  });

  const capped = resolved.slice(0, SIBLING_DENSITY_CAP);

  // Self-skip when no siblings render (substrate-sparse case; don't render
  // an empty strip — substrate-honest).
  if (capped.length === 0) return null;

  return (
    <section className="mb-8" aria-labelledby="sibling-axis-heading">
      <h2
        id="sibling-axis-heading"
        className="text-xs font-medium uppercase tracking-wider text-ink-500 mb-3"
      >
        {heading}
      </h2>
      <ul className="flex flex-wrap gap-2 overflow-x-auto snap-x scrollbar-thin">
        {capped.map(s => (
          <li key={s.axisKey} className="snap-start">
            <a
              href={`/${locale}/topic/${s.slug}/`}
              className="inline-flex items-center px-3 py-1 rounded-full bg-cream-100 hover:bg-cream-200 text-sm text-ink-800 transition-colors whitespace-nowrap"
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
