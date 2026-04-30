import { getTranslations } from 'next-intl/server';

// Section 1 — Hero per HOMEPAGE-COPY.md + HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.1.
// H1 + subhead + interaction line, no CTA, no scroll cue.
// Two-column at md+: text left, autoplay video right (math-puzzle.mp4 demo).
// Single-column at <md: text first (h1 stays the LCP element), video below.
// Server component — no client interactivity in the hero itself; the video
// element handles its own autoplay/loop/mute lifecycle in the browser.

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.hero' });

  return (
    <section className="container mx-auto px-4 max-w-6xl pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left column — text. Source order is text-first so the headline
            (the LCP element) precedes the video in the DOM, which keeps
            mobile-stacked layout text-on-top by default. */}
        <div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-tight tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-600 leading-relaxed">
            {t('subtitle')}
          </p>
          <p className="mt-4 text-base md:text-lg font-light text-ink-500 leading-relaxed">
            {t('interaction')}
          </p>
        </div>

        {/* Right column — autoplay demo video. No card frame, no shadow, no
            border — operator constraint: "the video plays inside its own
            bounds." autoPlay + muted + playsInline are all required for
            cross-browser autoplay (esp. iOS Safari). preload="metadata"
            keeps initial page weight low. */}
        <div>
          <video
            src="/videos/math-puzzle.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Math puzzle worksheet being solved interactively in the browser"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}
