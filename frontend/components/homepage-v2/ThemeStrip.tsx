import { getTranslations } from 'next-intl/server';
import topicsTaxonomy from '@/config/topics-taxonomy.json';
import themeThumbnails from '@/lib/theme-thumbnails.json';
import { listNonEmptyAxisKeys } from '@/lib/topic-decks';

/**
 * ThemeStrip — Alt A above-the-fold structural-axis surface per
 * `docs/homepage-acquisition-arc-2026-05-05.md` Alt A architectural lock.
 *
 * Renders 100 theme axis-keys (§16.5.1) as a horizontally-scrollable tile
 * strip. Each tile = thumbnail + theme-name; click → topic destination page
 * `/<locale>/topic/<theme-axis-key-slug-localized>/` per §16.5 routing.
 *
 * Magnitude communicated via theme-tile-density above fold. Per §A.13.4
 * embed-readiness substrate framing: every tile is a server-rendered <a>
 * hreflinking a topic page → SEO crawl-bait surface.
 *
 * Arc 2 (this revision): real theme thumbnails from
 * `frontend/lib/theme-thumbnails.json` (mapping generated mechanically by
 * picking the first alphabetical PNG per theme dir from the image library;
 * paths follow the production `/images/{theme_id}/{filename}` convention
 * per IMAGE LIBRARY.md). Per Arc 2 A3 operator-locked Option C: hand-
 * curated JSON; `next/image`-style runtime serving via plain <img>.
 *
 * Per Arc 2 A3 fallback rule: if a theme lacks a thumbnail entry, render
 * the cream-tile placeholder treatment (no broken-image icon). 100/100
 * resolved at Arc 2 ship; placeholder branch retained for future safety.
 */
export default async function ThemeStrip({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.themeStrip' });

  // Read theme axis-keys from topics-taxonomy.json (§16.5.1 SoT). Per-locale
  // slug + name resolution: each axis-key has both {slug: {<locale>: ...}}
  // and {name: {<locale>: ...}} maps. Using SoT eliminates duplicate-state
  // drift risk per §3.4 adjudicator-forward call at Arc 1.
  const themeAxis = (topicsTaxonomy as {
    axes: { theme: Record<string, { name: Record<string, string>; slug: Record<string, string> }> };
  }).axes.theme;
  const thumbnails = themeThumbnails as Record<string, string>;

  // Content-gate per §16.6.1 substrate-honesty discipline. Only render tiles
  // for theme axis-keys with ≥1 published deck in the current locale.
  // Without this filter, locales with partial catalog (es currently ~50 themes
  // of 100) show 100 tiles where ~50 point at empty topic pages that 404.
  const nonEmptyKeys = await listNonEmptyAxisKeys('theme', locale);
  const nonEmptySet = new Set(nonEmptyKeys);
  const themeKeys = Object.keys(themeAxis).filter((k) => nonEmptySet.has(k));

  if (themeKeys.length === 0) {
    // Substrate-only locale; don't render an empty strip. Future: placeholder copy.
    return null;
  }

  function nameFor(themeKey: string): string {
    const entry = themeAxis[themeKey];
    return entry?.name?.[locale] ?? entry?.name?.en ?? themeKey;
  }

  return (
    <section
      id="theme-strip"
      className="container mx-auto px-4 max-w-6xl py-8 md:py-12"
      aria-labelledby="theme-strip-heading"
    >
      <div className="max-w-3xl mb-6">
        <h2
          id="theme-strip-heading"
          className="font-display font-semibold text-2xl md:text-3xl text-ink-900 tracking-tight"
        >
          {t('heading')}
        </h2>
        <p className="mt-2 text-base text-ink-600 leading-relaxed">
          {t('intro')}
        </p>
      </div>

      <div
        className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory [mask-image:linear-gradient(to_right,black_calc(100%-32px),transparent)]"
        role="list"
        aria-label={t('listLabel')}
      >
        {themeKeys.map((themeKey) => {
          const slug = themeAxis[themeKey].slug[locale] || themeKey;
          const name = nameFor(themeKey);
          const thumbnail = thumbnails[themeKey];
          return (
            <a
              key={themeKey}
              href={`/${locale}/topic/${slug}/`}
              role="listitem"
              className="group flex flex-col items-center flex-shrink-0 snap-start w-24 md:w-28"
              aria-label={name}
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg border border-cream-300 bg-cream-50 overflow-hidden group-hover:border-ink-700 group-hover:shadow-md transition-all flex items-center justify-center">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  /* Placeholder for any theme without an available thumbnail;
                     never reached at Arc 2 ship (100/100 resolved) but retained
                     so future taxonomy additions don't break the strip. */
                  <span aria-hidden="true" className="text-2xl font-medium text-ink-400">
                    {name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="mt-2 text-xs font-medium text-ink-900 text-center line-clamp-1 w-full">
                {name}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
