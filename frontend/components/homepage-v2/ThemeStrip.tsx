import { getTranslations } from 'next-intl/server';
import topicsTaxonomy from '@/config/topics-taxonomy.json';

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
 * Arc 1 substrate: scaffold-only. Real thumbnail assets + visual-design
 * polish land in Arc 2. This component renders structural placeholder
 * tiles so the surface exists for layout testing.
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
  const themeKeys = Object.keys(themeAxis);
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
        className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory"
        role="list"
        aria-label={t('listLabel')}
      >
        {themeKeys.map((themeKey) => {
          const slug = themeAxis[themeKey].slug[locale] || themeKey;
          const name = nameFor(themeKey);
          return (
            <a
              key={themeKey}
              href={`/${locale}/topic/${slug}/`}
              role="listitem"
              className="group flex flex-col items-center flex-shrink-0 snap-start w-24 md:w-28"
              aria-label={name}
            >
              {/* Arc 1 substrate: placeholder tile. Arc 2 replaces with
                  real theme-thumbnail asset from image_themes table. */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg border border-cream-300 bg-cream-100 group-hover:border-ink-700 group-hover:shadow-md transition-all flex items-center justify-center text-3xl text-ink-500" aria-hidden="true">
                {themeKey.charAt(0).toUpperCase()}
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
