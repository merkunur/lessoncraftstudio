import { getTranslations } from 'next-intl/server';
import { CANONICAL_29_EXERCISE_TYPES } from '@/lib/catalog-axes';
import topicsTaxonomy from '@/config/topics-taxonomy.json';
import { ExerciseTypeIcon } from './icons/ExerciseTypeIcon';

/**
 * ExerciseTypeGrid — Alt A above-the-fold structural-axis surface per
 * `docs/homepage-acquisition-arc-2026-05-05.md` Alt A architectural lock.
 *
 * Renders all 29 §14.10 canonical exercise-types as a visible-at-a-glance
 * tile-grid above fold. Magnitude communicated via VISIBLE-VARIETY (29 tiles
 * shown), not via population-count.
 *
 * Each tile click → `/<locale>/topic/<exercise-type-axis-key-slug>/` per
 * §16.5 α-granular axis routing. Tiles are plain <a> per §15.7 routing-
 * contract (deck/topic URLs are nginx-served, not Next.js-routed in the
 * topic-slug-resolution sense; the topic page itself is Next.js but the slug
 * resolution path is direct anchor link).
 *
 * Arc 2 (this revision): real glyphs from `./icons/ExerciseTypeIcon` per
 * Arc 2 A2 operator-locked adjudication (2026-05-06; commit pending). Each
 * tile carries a hand-authored single-color stroke-led SVG glyph sized to
 * read at 32×32; tile retains label below for accessibility + recognition
 * disambiguation when the visitor hasn't yet learned the glyph vocabulary.
 *
 * SSR-rendered to maximize crawler-readability per §17.4 SEO doctrine —
 * ~140 internal links per locale × 11 locales targeted by Alt A's SEO
 * surface design.
 */
export default async function ExerciseTypeGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.exerciseTypeGrid' });

  // Per-axis-key localized labels live at SoT in topics-taxonomy.json
  // (§16.5 + §16.4 schema; populated 11 locales per a47ea021 + 9ea577fe).
  // Read from there rather than re-authoring in messages files; eliminates
  // duplicate-state drift risk per §3.4 adjudicator-forward call at Arc 1.
  const exerciseTypeAxis = (topicsTaxonomy as {
    axes: { 'exercise-type': Record<string, { name: Record<string, string>; slug: Record<string, string> }> };
  }).axes['exercise-type'];
  function labelFor(exerciseType: string): string {
    const entry = exerciseTypeAxis[exerciseType];
    return entry?.name?.[locale] ?? entry?.name?.en ?? exerciseType;
  }
  function slugFor(exerciseType: string): string {
    const entry = exerciseTypeAxis[exerciseType];
    return entry?.slug?.[locale] ?? exerciseType;
  }

  return (
    <section
      id="exercise-type-grid"
      className="container mx-auto px-4 max-w-6xl py-12 md:py-16"
      aria-labelledby="exercise-type-grid-heading"
    >
      <div className="max-w-3xl mb-8">
        <h2
          id="exercise-type-grid-heading"
          className="font-display font-semibold text-2xl md:text-3xl text-ink-900 tracking-tight"
        >
          {t('heading')}
        </h2>
        <p className="mt-3 text-base md:text-lg text-ink-600 leading-relaxed">
          {t('intro')}
        </p>
      </div>

      <div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3"
        role="list"
      >
        {CANONICAL_29_EXERCISE_TYPES.map((exerciseType) => {
          const label = labelFor(exerciseType);
          const slug = slugFor(exerciseType);
          return (
            <a
              key={exerciseType}
              href={`/${locale}/topic/${slug}/`}
              role="listitem"
              className="group flex flex-col items-center justify-center rounded-lg border border-cream-300 bg-cream-50 hover:border-ink-700 hover:shadow-md transition-all p-4 aspect-square text-center text-ink-700 hover:text-ink-900"
              aria-label={label}
            >
              <ExerciseTypeIcon
                name={exerciseType}
                className="w-9 h-9 md:w-10 md:h-10 mb-2"
              />
              <span className="text-xs font-medium text-ink-900 line-clamp-2 leading-tight">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
