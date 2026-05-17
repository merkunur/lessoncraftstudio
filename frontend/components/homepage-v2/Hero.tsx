import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

// Section 1 — Hero per HOMEPAGE-COPY.md + 2026-05-17 commission §8.1 restructure.
// H1 + subhead + interaction line + primary CTA (education.com pattern).
// Two-column at md+: text left, autoplay video right (math-puzzle.mp4 demo).
// Single-column at <md: text first (h1 stays the LCP element), video below.
// Server component — no client interactivity in the hero itself; the video
// element handles its own autoplay/loop/mute lifecycle in the browser.
//
// Per operator's plan-entry lock: language selection dropdown stays in
// Navigation header (NOT embedded in Hero); only the primary CTA is new.

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.hero' });

  return (
    <section className="container mx-auto px-4 max-w-6xl pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
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
          {/* Primary CTA — education.com "Join for free" pattern. Routes to
              signup; account-creation is free + unlocks favorites + future
              quota-tracked downloads per §8.1 dual-surface monetization. */}
          <Link
            href={`/${locale}/auth/signup`}
            className="mt-10 inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-terracotta-400 text-cream-50 hover:bg-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>

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
