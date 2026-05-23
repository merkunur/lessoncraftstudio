/* Hero — BOLD overhaul: full-bleed deep teal #0E544A ground.
   Cream type on dark teal makes the whole page declare a single
   confident brand color the second a visitor lands. Coral squiggle
   under "game" pops dramatically against the dark.
   Layout: bold headline left, real elephant mascot RIGHT at scale,
   activity card floats below the elephant. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import MascotPlaceholder from './MascotPlaceholder';
import { Sparkle, MarginDoodleStar } from './DoodleAccents';

interface HeroV3Props {
  locale: string;
}

export default async function HeroV3({ locale }: HeroV3Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV3.hero' });
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

            {/* Headline at editorial billboard scale. Cream on teal. */}
            <h1 className="hv3-anim-fade-up hv3-anim-d2 mt-6 md:mt-8 font-lcsDisplay font-bold text-lcs-cream leading-[1.08] tracking-tight text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.75rem] xl:text-[6.5rem]">
              <span className="block">
                {t('h1Line1Before')}<span className="hv3-squiggle-word-on-dark">{t('h1Line1Squiggle')}</span>{t('h1Line1After')}
              </span>
              <span className="block text-lcs-coral mt-3 md:mt-4">
                {t('h1Line2')}
              </span>
            </h1>

            <p className="hv3-anim-fade-up hv3-anim-d3 mt-7 md:mt-9 font-lcsBody text-lg md:text-xl text-lcs-cream/85 leading-relaxed max-w-xl">
              {t('body')}
            </p>

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
                href={`/${locale}/activities`}
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
          </div>

          {/* RIGHT — mascot + activity card stack.
              Layout: chip strip top-right above mascot, large elephant
              mascot at scale on cream-soft circle backdrop, activity card
              floats over the bottom-right of the mascot. */}
          <div className="relative flex flex-col items-center justify-center gap-4 pt-4 lg:pt-0">
            {/* Locale-chip strip — cream pill on dark teal. */}
            <div className="hv3-anim-fade-up hv3-anim-d3 inline-flex items-center gap-1.5 px-4 py-2 bg-lcs-cream rounded-full shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4)] border border-lcs-teal/8 z-20 self-end mr-2">
              <span className="hv3-locale-chip">EN</span>
              <span className="hv3-locale-chip">ES</span>
              <span className="hv3-locale-chip hv3-locale-chip-active">FR</span>
              <span className="hv3-locale-chip">PT</span>
              <span className="hv3-locale-chip">IT</span>
              <span className="hv3-locale-chip">FI</span>
              <span className="font-lcsBody text-xs text-lcs-teal/60 pl-1 font-semibold">+5</span>
            </div>

            {/* Video + mascot composite. The live homepage's autoplay
                math-puzzle demo (operator-preserved per 2026-05-23
                request) is the proof: visitor sees a real worksheet
                being solved in real time. Framed in a cream card so the
                video pops on the dark teal ground; the elephant mascot
                peeks from the bottom-left corner so the character
                "introduces" the demo. */}
            <div className="relative w-full max-w-xl">
              {/* Cream-framed video card. Strong contact shadow + dual-
                  shadow inset for the "paper on dark table" feel. */}
              <div
                className="hv3-anim-fade-up hv3-anim-d3 relative z-10 rounded-3xl overflow-hidden bg-lcs-cream p-2 md:p-3 hv3-card-on-color hv3-float"
                style={{ ['--rot' as string]: '-1.5deg' } as React.CSSProperties}
              >
                <video
                  src="/videos/math-puzzle.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={t('videoAria')}
                  className="w-full h-auto block rounded-2xl"
                />
              </div>

              {/* Mascot peeks from the bottom-left of the video card —
                  greeting pose, smaller scale so the demo stays the
                  hero of the right column; mascot adds character without
                  competing with the proof. */}
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
