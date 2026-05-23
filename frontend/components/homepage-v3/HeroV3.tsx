/* Hero — BOLD overhaul: full-bleed deep teal #0E544A ground.
   Cream type on dark teal makes the whole page declare a single
   confident brand color the second a visitor lands. Coral squiggle
   under "game" pops dramatically against the dark.
   Layout: bold headline left, real elephant mascot RIGHT at scale,
   activity card floats below the elephant. */

import Link from 'next/link';
import ActivityCardPreview from './ActivityCardPreview';
import MascotPlaceholder from './MascotPlaceholder';
import { Sparkle, MarginDoodleStar } from './DoodleAccents';

interface HeroV3Props {
  locale: string;
}

export default function HeroV3({ locale }: HeroV3Props) {
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
              K-3 Common Core · Eleven languages
            </p>

            {/* Headline at editorial billboard scale. Cream on teal. */}
            <h1 className="hv3-anim-fade-up hv3-anim-d2 mt-6 md:mt-8 font-lcsDisplay font-bold text-lcs-cream leading-[0.98] tracking-tight text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.75rem] xl:text-[6.5rem]">
              <span className="block">
                Plays like a <span className="hv3-squiggle-word-on-dark">game</span>.
              </span>
              <span className="block text-lcs-coral mt-1">
                Built like the curriculum.
              </span>
            </h1>

            <p className="hv3-anim-fade-up hv3-anim-d3 mt-7 md:mt-9 font-lcsBody text-lg md:text-xl text-lcs-cream/85 leading-relaxed max-w-xl">
              Common Core–aligned K-3 phonics and math, in eleven languages —
              designed so a child can pick one up and learn, and built to the
              standard so a teacher trusts every screen.
            </p>

            <div className="hv3-anim-fade-up hv3-anim-d4 mt-9 md:mt-11 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href={`/${locale}/activities/count-to-10-with-animals/`}
                className="hv3-cta-coral inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg md:text-xl px-7 md:px-8 py-3.5 md:py-4 whitespace-nowrap"
              >
                Start an activity
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/topic/addition/`}
                className="hv3-cta-cream-outline inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg md:text-xl px-7 md:px-8 py-3 md:py-3.5 whitespace-nowrap"
              >
                Browse the catalog
              </Link>
            </div>

            <ul className="hv3-anim-fade-up hv3-anim-d5 mt-10 md:mt-12 flex flex-wrap gap-x-5 gap-y-2 font-lcsBody text-sm md:text-base text-lcs-cream/75">
              <li className="flex items-center gap-2">
                <Sparkle className="text-lcs-coral" size={16} rotate={12} />
                Eleven languages
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                No signup
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                Free to play
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                Kid-runnable
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

            {/* Mascot + card composite */}
            <div className="relative w-full max-w-xl">
              {/* Cream soft circle behind the elephant — gives the dark
                  mascot a stage so it pops against teal without
                  silhouette-disappearing. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="rounded-full"
                  style={{
                    width: '88%',
                    height: '88%',
                    background: 'radial-gradient(circle at 50% 45%, rgba(251,243,228,0.16) 0%, rgba(251,243,228,0.08) 45%, transparent 70%)',
                  }}
                />
              </div>

              {/* Real elephant — greeting / waving pose. Sits centered. */}
              <div className="hv3-anim-fade-up hv3-anim-d3 relative z-10 flex items-center justify-center hv3-float" style={{ ['--rot' as string]: '-2deg' } as React.CSSProperties}>
                <MascotPlaceholder
                  size="hero"
                  poseHint="greeting"
                  alt="Friendly elephant mascot waving hello"
                />
              </div>

              {/* Activity card — floats over the bottom-right of the
                  elephant. Smaller than mascot so character stays the
                  hero; card is the proof. */}
              <div className="hv3-anim-fade-up hv3-anim-d5 absolute -bottom-16 -right-4 md:-bottom-20 md:-right-6 z-20 w-[300px] md:w-[340px]">
                <ActivityCardPreview
                  variant="compact"
                  title="Constructeur de syllabes"
                  prompt="Touche les syllabes dans l'ordre pour former le mot."
                  subjectImg="https://www.lessoncraftstudio.com/image-library-webp/themes/animals/turtle@2x.webp"
                  subjectAlt="tortue"
                  tiles={['tor', 'tue']}
                  slotsFilled={true}
                  filledOrder={['tor', 'tue']}
                  ccCode="RF.K.2.B"
                  gradeLabel="Grande section"
                  checkLabel="Vérifier"
                  tilt={3}
                  float
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
