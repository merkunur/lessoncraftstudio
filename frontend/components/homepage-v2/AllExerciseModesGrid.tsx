import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  getExerciseModeUniverse,
  groupBySubject,
  SUBJECT_ORDER,
  Subject,
  ExerciseModeTile,
} from '@/lib/exercise-mode-universe';
import { getAxisSlug } from '@/lib/taxonomy';

// Section — "A wide variety of exercises". Server-rendered per the home-page
// ISR window (revalidate=3600 lives on frontend/app/[locale]/page.tsx).
//
// Per operator commission 2026-05-19: each (app, mode) tile links to the
// exercise-type topic page in the VISITOR's locale, not the deck's native
// locale. Operator rationale: most locales currently fall back to EN decks
// while their Track-C catalog is being published; clicking should keep the
// visitor in their selected locale rather than dump them on /en/decks/...
//
// Per CLAUDE.md §16.5: exercise-mode is slug-component-only (NOT a topic-page
// axis), so the link target is the exercise-type topic page with the mode
// passed as a `?mode=` query param (honored by topic route per §16.5.4 /
// §16.8.2). Per §15.7 routing-contract: /[locale]/topic/[slug]/ IS a Next.js
// route (unlike /[locale]/decks/[slug]/ which is nginx-served), so tiles use
// Next.js <Link>.

interface ModeTileProps {
  tile: ExerciseModeTile;
  locale: string;
}

function ModeTile({ tile, locale }: ModeTileProps) {
  const typeSlug = getAxisSlug('exercise-type', tile.exerciseType, locale) ?? tile.exerciseType;
  const topicUrl = tile.exerciseMode
    ? `/${locale}/topic/${typeSlug}/?mode=${tile.exerciseMode}`
    : `/${locale}/topic/${typeSlug}/`;
  const displayLabel = tile.modeLabel ?? tile.appLabel;
  const subLabel = tile.modeLabel ? tile.appLabel : null;

  return (
    <Link
      href={topicUrl}
      className="group block rounded-md overflow-hidden bg-cream-50 border border-cream-300 hover:border-ink-700 hover:shadow-md transition-all"
      aria-label={`${displayLabel}${subLabel ? ` — ${subLabel}` : ''}`}
    >
      <div className="relative aspect-[480/620] bg-cream-50">
        <img
          src={tile.deck.thumbnailUrl}
          alt={tile.deck.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-3 py-2">
        <div className="text-sm font-medium text-ink-900 truncate">
          {displayLabel}
        </div>
        {subLabel && (
          <div className="text-xs text-ink-500 truncate mt-0.5">
            {subLabel}
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function AllExerciseModesGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.allExerciseModes' });

  let tiles: ExerciseModeTile[] = [];
  try {
    tiles = await getExerciseModeUniverse(locale);
  } catch (err) {
    console.warn(
      '[AllExerciseModesGrid] getExerciseModeUniverse failed; rendering empty grid:',
      (err as Error).message
    );
  }

  if (tiles.length === 0) {
    return null;
  }

  const grouped = groupBySubject(tiles);
  const subjectsWithTiles: Subject[] = SUBJECT_ORDER.filter(s => grouped[s].length > 0);

  return (
    <section id="all-exercise-modes" className="container mx-auto px-4 max-w-6xl py-20 md:py-28">
      <div className="max-w-3xl mb-12">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink-900 tracking-tight">
          {t('sectionTitle')}
        </h2>
        <p className="mt-6 text-lg text-ink-600 leading-relaxed">
          {t('intro')}
        </p>
      </div>

      <div className="space-y-12">
        {subjectsWithTiles.map(subject => (
          <div key={subject}>
            <h3 className="font-display font-medium text-xl md:text-2xl text-ink-900 mb-6">
              {t(`subject.${subject}`)}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {grouped[subject].map(tile => (
                <ModeTile
                  key={`${tile.exerciseType}-${tile.exerciseMode ?? 'default'}`}
                  tile={tile}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
