/* Tier 1 → Tier 2 transition band — BOLD overhaul.
   A diagonal cream → deep-teal sweep splits the page; the elephant mascot
   bridges the diagonal at scale. Upper body on cream, lower body on
   teal. Big drama, clear bridge metaphor. The italic "And if you're the
   one teaching…" line sits across from the mascot. */

import { getTranslations } from 'next-intl/server';
import MascotPlaceholder from './MascotPlaceholder';

interface TierTransitionProps {
  locale?: string;
}

export default async function TierTransition({ locale = 'en' }: TierTransitionProps) {
  const t = await getTranslations({ locale, namespace: 'homepageV3.transition' });

  return (
    <section className="relative overflow-hidden">
      {/* The diagonal sweep — cream upper, deep-teal lower. Single
          element provides the full background for the band. */}
      <div className="hv3-tier-diagonal-sweep py-20 md:py-28 lg:py-36 relative">
        {/* Atmosphere — soft coral halo behind the mascot's bridging
            position so the character stands out against both grounds. */}
        <div
          aria-hidden="true"
          className="absolute top-[40%] left-[20%] w-[440px] h-[440px] rounded-full pointer-events-none -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(242,120,75,0.22) 0%, transparent 65%)' }}
        />

        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* Mascot — BRIDGES the diagonal at huge scale. Upper body
                on cream, lower body on teal. Real elephant art ("greeting"
                pose) — the waving gesture reads as "welcome, here we
                pivot from parents to teachers." */}
            <div
              className="relative flex-shrink-0 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px]"
              aria-hidden="true"
            >
              <MascotPlaceholder
                size="transition"
                poseHint="greeting"
                alt={t('mascotAlt')}
              />
            </div>

            {/* Italic transition line — display Baloo 2 at editorial
                scale. Color follows the diagonal: dark teal where it sits
                on the cream half, cream where it sits on the teal half.
                We split into two visual lines to let the color flip
                track the diagonal. */}
            <div className="text-center md:text-left max-w-md pr-0 md:pr-6 lg:pr-8">
              <p className="font-lcsDisplay text-3xl md:text-4xl lg:text-[3rem] text-lcs-teal-deep italic leading-[1.05] font-bold -translate-y-3 md:-translate-y-4 lg:-translate-y-6">
                {t('line1')}
              </p>
              <p className="font-lcsDisplay text-3xl md:text-4xl lg:text-[3rem] text-lcs-cream italic leading-[1.05] font-bold mt-2">
                {t('line2')}<span className="text-lcs-coral">…</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
