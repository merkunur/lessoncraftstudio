/* MakerSamples — server component for the "See what you can make" section on the
 * worksheet-generator (maker) landing pages (/[locale]/tools/<slug>).
 *
 * Renders one playable sample per REAL exercise mode the generator produces (multi-mode
 * makers) or a few theme-varied samples (single-mode makers), plus — for the
 * crossword/wordsearch/matching makers — a small cross-language ("learn a language") strip.
 *
 * Substrate-honesty: the data comes entirely from fetchMakerSamples (catalog-derived).
 * When there are no samples and no cross-language items, the section renders nothing.
 */

import {
  fetchMakerSamples,
  type MakerSamplesResult,
  type MakerSample,
  DEFAULT_MODE_KEY,
} from '@/lib/seo/maker-samples';
import { getExerciseModeName } from '@/lib/taxonomy';
import MakerSampleTile from './MakerSampleTile';
import type { MakerKey } from '@/lib/seo/maker-content';
import { LOCALE_NAMES, SupportedLocale } from '@/config/locales';

function localeDisplayName(loc: string): string {
  return LOCALE_NAMES[loc as SupportedLocale] ?? loc;
}

interface MakerSamplesProps {
  locale: string;
  makerKey: MakerKey;
  labels: {
    samplesHeading?: string;
    samplesIntroDefault?: string;
    playSample?: string;
    crossLangHeading?: string;
    crossLangIntro?: string;
    seeAllLang?: string;
    closeSample?: string;
  };
  modes?: Record<string, string>;       // mode-key -> explanation (may be undefined / partial)
  modeNames?: Record<string, string>;   // mode-key -> friendly name override
  samplesIntro?: string;                 // single-mode maker intro
  /** Pre-fetched samples (so the page can share one fetch with its JSON-LD). Falls back to fetching. */
  data?: MakerSamplesResult;
}

/** 'two-symbols-add-sub' -> 'Two Symbols Add Sub'. Last-resort name. */
function humanize(modeKey: string): string {
  return modeKey
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** lg-column count for the mode grid: 4 modes → 4-up; otherwise 3-up (1-up at base). */
function lgColsFor(n: number): string {
  if (n === 4) return 'sm:grid-cols-2 lg:grid-cols-4';
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
}

/** Screenshots for JSON-LD merging on the page. */
export function makerScreenshots(
  data: MakerSamplesResult,
): Array<{ url: string; caption: string }> {
  return [...data.samples, ...data.crossLanguage.map((c) => c.sample)].map((s) => ({
    url: s.thumbnailUrl,
    caption: s.title,
  }));
}

export default async function MakerSamples({
  locale,
  makerKey,
  labels,
  modes,
  modeNames,
  samplesIntro,
  data: preData,
}: MakerSamplesProps): Promise<JSX.Element | null> {
  const data = preData ?? (await fetchMakerSamples(makerKey, locale));

  // The section needs its localized chrome (heading) — until a locale is translated
  // in the fan-out, render nothing rather than a heading-less grid (substrate-honest).
  if (!labels.samplesHeading) return null;

  const hasSamples = data.kind !== 'none' && data.samples.length > 0;
  const hasCrossLang = data.crossLanguage.length > 0;
  if (!hasSamples && !hasCrossLang) return null;

  const playLabel = labels.playSample ?? 'Play sample';
  const closeLabel = labels.closeSample ?? 'Close';

  // EN-fallback chip: show the SAMPLE's real language name when it differs from the page locale
  // (honest "this preview is in English" on a sparse non-English page).
  const chipFor = (sample: MakerSample): string | undefined =>
    sample.deckLocale !== locale ? localeDisplayName(sample.deckLocale) : undefined;

  const subLine = data.multiMode ? labels.samplesIntroDefault : samplesIntro;
  const gridCols = lgColsFor(data.samples.length);

  return (
    <section className="mx-auto max-w-4xl mt-8 px-1">
      {labels.samplesHeading && (
        <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-1">
          {labels.samplesHeading}
        </h2>
      )}
      {subLine && <p className="text-ink-600 mb-5 text-base">{subLine}</p>}

      {hasSamples && (
        <div className={`grid ${gridCols} gap-4 md:gap-5`}>
          {data.samples.map((sample) => {
            const variant = !sample.deckUrl && sample.pdfUrl ? 'pdf' : 'interactive';

            if (data.multiMode) {
              const modeKey = sample.modeKey ?? DEFAULT_MODE_KEY;
              const name =
                modeNames?.[modeKey] ??
                (modeKey === DEFAULT_MODE_KEY ? null : getExerciseModeName(modeKey, locale)) ??
                humanize(modeKey);
              const explanation = modes?.[modeKey];
              return (
                <div key={`${modeKey}-${sample.deckSlug}`}>
                  <MakerSampleTile
                    variant={variant}
                    title={name}
                    thumbnailUrl={sample.thumbnailUrl}
                    deckUrl={sample.deckUrl}
                    pdfUrl={sample.pdfUrl}
                    chipLabel={chipFor(sample)}
                    playLabel={playLabel}
                    closeLabel={closeLabel}
                    landingHref={sample.landingHref}
                    /* The tile's title here is the MODE name, so label the
                       landing link with the worksheet's own localized title. */
                    landingLabel={sample.title}
                  />
                  <h3 className="font-display font-semibold text-[15px] text-teal-800 mt-3">{name}</h3>
                  {explanation && (
                    <p className="text-sm text-ink-700 leading-snug mt-1 line-clamp-2">{explanation}</p>
                  )}
                </div>
              );
            }

            // Single-mode: theme-varied cards; the deck title carries the card.
            return (
              <div key={sample.deckSlug}>
                <MakerSampleTile
                  variant={variant}
                  title={sample.title}
                  thumbnailUrl={sample.thumbnailUrl}
                  deckUrl={sample.deckUrl}
                  pdfUrl={sample.pdfUrl}
                  chipLabel={chipFor(sample)}
                  playLabel={playLabel}
                  closeLabel={closeLabel}
                  landingHref={sample.landingHref}
                />
              </div>
            );
          })}
        </div>
      )}

      {hasCrossLang && (
        <div className="mt-10">
          {labels.crossLangHeading && (
            <h3 className="font-display text-lg md:text-xl font-semibold text-ink-900 mb-1 flex items-center gap-2">
              <span className="w-9 h-[3px] rounded bg-[#F2784B]" aria-hidden="true" />
              {labels.crossLangHeading}
            </h3>
          )}
          {labels.crossLangIntro && <p className="text-ink-600 mb-4">{labels.crossLangIntro}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.crossLanguage.map((item) => (
              <div key={`${item.targetIso}-${item.sample.deckSlug}`}>
                <MakerSampleTile
                  variant="interactive"
                  title={item.targetName}
                  thumbnailUrl={item.sample.thumbnailUrl}
                  deckUrl={item.sample.deckUrl}
                  chipLabel={item.targetName}
                  playLabel={playLabel}
                  closeLabel={closeLabel}
                  landingHref={item.sample.landingHref}
                  landingLabel={item.sample.title}
                />
                <a
                  href={item.learnHref}
                  className="inline-block mt-2 text-sm font-medium text-[#146B5E] hover:underline"
                >
                  {(labels.seeAllLang ?? '{lang}').replace('{lang}', item.targetName)} →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
