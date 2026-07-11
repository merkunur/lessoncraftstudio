/* Hero V4 — fork of homepage-v3/HeroV3 for the v4 preview route.
   The H2-tagline / H1-keyword arrangement and the video/poster LCP setup
   are preserved EXACTLY (operator-locked; see HeroV3 comments). V4 adds:
     (a) a magnitude chip row (Free · No login / 33 worksheet makers /
         100+ themes / 11 languages / 45,000+ printables) — the §17.x
         magnitude-via-structural-axes homepage doctrine as scannable chips;
     (b) the decorative locale chip strip becomes REAL <Link> chips for all
         11 locales with native names (crawl-bait + genuine navigation);
     (c) a quiet above-fold embed micro-CTA text link to /worksheets/
         (embed-flywheel doctrine repair — above-fold embed affordance).
   Existing copy reads homepageV3.hero (localized ×11); NEW strings read
   homepageV4.hero (EN-first; the i18n/request.ts EN deep-merge means non-EN
   locales render the EN values, never raw keys, until the native fan-out). */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import MascotPlaceholder from '../homepage-v3/MascotPlaceholder';
import { Sparkle, MarginDoodleStar } from '../homepage-v3/DoodleAccents';
import { NATIVE_LOCALE_NAMES } from './v4-strings';

interface HeroV4Props {
  locale: string;
}

export default async function HeroV4({ locale }: HeroV4Props) {
  const [t, t4] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV3.hero' }),
    getTranslations({ locale, namespace: 'homepageV4.hero' }),
  ]);
  return (
    <section className="hv3-section-teal hv3-wave-cream-bottom relative overflow-hidden">
      {/* Soft watercolor pools — saturated against the deep teal. */}
      <div
        aria-hidden="true"
        className="hv3-blob-coral absolute top-[-12%] right-[-8%] w-[620px] h-[620px] rounded-full pointer-events-none opacity-85"
      />
      <div
        aria-hidden="true"
        className="hv3-blob-sage absolute bottom-[-15%] left-[-10%] w-[520px] h-[520px] rounded-full pointer-events-none opacity-60"
      />

      {/* Chalk-on-blackboard scattered stars — higher opacity since they
          read against the dark teal. */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[14%] left-[8%] opacity-65">
          <Sparkle className="text-lcs-cream" size={16} rotate={18} />
        </div>
        <div className="absolute top-[8%] left-[44%] opacity-50">
          <MarginDoodleStar className="text-lcs-coral" size={26} rotate={-12} />
        </div>
        <div className="absolute top-[28%] right-[45%] opacity-60">
          <Sparkle className="text-lcs-cream" size={12} rotate={-20} />
        </div>
        <div className="absolute bottom-[28%] left-[3%] opacity-55">
          <Sparkle className="text-lcs-coral" size={18} rotate={32} />
        </div>
        <div className="absolute bottom-[22%] right-[12%] opacity-65">
          <MarginDoodleStar className="text-lcs-cream" size={22} rotate={22} />
        </div>
        <div className="absolute top-[55%] left-[42%] opacity-55">
          <Sparkle className="text-lcs-coral" size={14} rotate={8} />
        </div>
        <div className="absolute top-[42%] right-[3%] opacity-55">
          <Sparkle className="text-lcs-cream" size={15} rotate={-8} />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-32 md:pt-12 md:pb-40 lg:pt-16 lg:pb-48 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy column on the dark ground. Cream type. */}
          <div className="max-w-xl lg:max-w-2xl relative z-10">
            {/* Eyebrow STAMP — coral pill with cream type, slight rotation. */}
            <p className="hv3-anim-fade-up hv3-anim-d1 hv3-eyebrow-stamp">
              {t('eyebrow')}
            </p>

            {/* Brand tagline at editorial billboard scale (H2). Cream on teal.
                H2/H1 arrangement preserved from HeroV3 verbatim (2026-05-27
                SEO-audit lock — the keyword-bearing H1 sits below). */}
            <h2 className="hv3-anim-fade-up hv3-anim-d2 mt-6 md:mt-8 font-lcsDisplay font-bold text-lcs-cream leading-[1.08] tracking-tight text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.75rem] xl:text-[6.5rem]">
              <span className="block">
                {t('h1Line1Before')}<span className="inline-block whitespace-nowrap"><span className="hv3-squiggle-word-on-dark">{t('h1Line1Squiggle')}</span>{t('h1Line1After')}</span>
              </span>
              <span className="block text-lcs-coral mt-3 md:mt-4">
                {t('h1Line2')}
              </span>
            </h2>

            {/* Keyword-bearing H1 — unchanged from HeroV3. */}
            <h1 className="hv3-anim-fade-up hv3-anim-d3 mt-5 md:mt-6 font-lcsDisplay font-semibold text-lcs-cream/90 leading-snug text-xl sm:text-2xl md:text-3xl max-w-xl">
              {t('h1')}
            </h1>

            <p className="hv3-anim-fade-up hv3-anim-d3 mt-5 md:mt-6 font-lcsBody text-lg md:text-xl text-lcs-cream/85 leading-relaxed max-w-xl">
              {t('body')}
            </p>

            {/* V4 (a): magnitude chip row — free-moat clause first (coral
                accent), then the structural-axes magnitude chips. Plain
                text, not links. */}
            <ul aria-label={t4('chipsAria')} className="hv3-anim-fade-up hv3-anim-d4 hv4-magnitude-row">
              <li className="hv4-magnitude-chip hv4-magnitude-chip-accent">{t4('chipFree')}</li>
              <li className="hv4-magnitude-chip">{t4('chipMakers')}</li>
              <li className="hv4-magnitude-chip">{t4('chipThemes')}</li>
              <li className="hv4-magnitude-chip">{t4('chipLanguages')}</li>
              <li className="hv4-magnitude-chip">{t4('chipPrintables')}</li>
            </ul>

            <div className="hv3-anim-fade-up hv3-anim-d4 mt-9 md:mt-11 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href={`/${locale}/activities`}
                className="hv3-cta-coral inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg md:text-xl px-7 md:px-8 py-3.5 md:py-4 whitespace-nowrap"
              >
                {t('ctaPrimary')}
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/worksheets/`}
                className="hv3-cta-cream-outline inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg md:text-xl px-7 md:px-8 py-3 md:py-3.5 whitespace-nowrap"
              >
                {t('ctaSecondary')}
              </Link>
            </div>

            <ul className="hv3-anim-fade-up hv3-anim-d5 mt-10 md:mt-12 flex flex-wrap gap-x-5 gap-y-2 font-lcsBody text-sm md:text-base text-lcs-cream/75">
              <li className="flex items-center gap-2">
                <Sparkle className="text-lcs-coral" size={16} rotate={12} />
                {t('trust1')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                {t('trust2')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                {t('trust3')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                {t('trust4')}
              </li>
            </ul>

            {/* V4 (c): quiet above-fold embed micro-CTA — embed-flywheel
                doctrine repair. One understated text link, no card. */}
            <p className="hv3-anim-fade-up hv3-anim-d5 mt-5">
              <Link href={`/${locale}/worksheets/`} className="hv4-micro-cta">
                {t4('embedCta')} →
              </Link>
            </p>
          </div>

          {/* RIGHT — video demo + mascot stack, unchanged from HeroV3
              except the locale strip above it is now real navigation. */}
          <div className="relative flex flex-col items-center justify-center gap-4 pt-4 lg:pt-0">
            {/* V4 (b): locale-chip strip → real links, all 11 locales,
                native names. Cream pill container preserved; wraps on
                narrow viewports. Current locale highlighted. */}
            <nav
              aria-label={t4('localeNavAria')}
              className="hv3-anim-fade-up hv3-anim-d3 hv4-locale-strip z-20 self-end mr-2"
            >
              {SUPPORTED_LOCALES.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={
                    loc === locale
                      ? 'hv3-locale-chip hv3-locale-chip-active hv4-locale-chip-link'
                      : 'hv3-locale-chip hv4-locale-chip-link'
                  }
                >
                  {NATIVE_LOCALE_NAMES[loc]}
                </Link>
              ))}
            </nav>

            {/* Video + mascot composite — byte-for-byte the HeroV3 setup
                (poster + aspect box = the LCP contract; do not touch). */}
            <div className="relative w-full max-w-xl">
              <div
                className="hv3-anim-fade-up hv3-anim-d3 relative z-10 rounded-3xl overflow-hidden bg-lcs-cream p-2 md:p-3 hv3-card-on-color hv3-float"
                style={{ ['--rot' as string]: '-1.5deg' } as React.CSSProperties}
              >
                <video
                  src="/videos/math-puzzle.mp4"
                  poster="/videos/math-puzzle-poster.webp"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={t('videoAria')}
                  className="w-full block rounded-2xl aspect-[738/940] object-cover"
                />
              </div>

              <div className="hv3-anim-fade-up hv3-anim-d5 absolute -bottom-14 -left-10 md:-bottom-16 md:-left-12 z-20 w-[160px] md:w-[200px] pointer-events-none">
                <MascotPlaceholder
                  size="inline"
                  poseHint="greeting"
                  flip
                  alt={t('mascotAlt')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
