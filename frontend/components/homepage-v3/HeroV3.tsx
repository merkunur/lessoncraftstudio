/* Hero — the flagship moment.
   Composition concept: bold dual-clause headline left, floating activity-card
   preview right. Coral primary CTA + teal outlined secondary CTA. Subtle
   coral + teal blob accents behind the card for depth. The two clauses of
   the headline ARE the dual-audience read — parent reads "plays like a game,"
   teacher reads "built like the curriculum," same line. */

import Link from 'next/link';
import ActivityCardPreview from './ActivityCardPreview';

interface HeroV3Props {
  locale: string;
}

export default function HeroV3({ locale }: HeroV3Props) {
  return (
    <section className="hv3-grain relative overflow-hidden">
      {/* Decorative background blobs — non-interactive, behind content */}
      <div
        aria-hidden="true"
        className="hv3-blob-teal absolute top-[10%] -left-[8%] w-[420px] h-[420px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="hv3-blob-coral absolute -bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-4 max-w-7xl pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-36 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy column */}
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <p className="hv3-eyebrow hv3-anim-fade-up hv3-anim-d1">
              K-3 Common Core · Eleven languages
            </p>

            {/* Headline — dual clause, generous size, line-break-controlled */}
            <h1 className="hv3-anim-fade-up hv3-anim-d2 mt-5 md:mt-7 font-lcsDisplay font-bold text-lcs-teal leading-[1.02] tracking-tight text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]">
              <span className="block">
                Plays like a <span className="hv3-underline-coral">game</span>.
              </span>
              <span className="block text-lcs-teal-deep">
                Built like the curriculum.
              </span>
            </h1>

            {/* Subhead */}
            <p className="hv3-anim-fade-up hv3-anim-d3 mt-7 md:mt-9 font-lcsBody text-lg md:text-xl text-lcs-teal/85 leading-relaxed">
              Common Core–aligned K-3 phonics and math, in eleven languages —
              designed so a child can pick one up and learn, and built to the
              standard so a teacher trusts every screen.
            </p>

            {/* CTAs */}
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
                className="hv3-cta-teal-outline inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg md:text-xl px-7 md:px-8 py-3 md:py-3.5 whitespace-nowrap"
              >
                Browse the catalog
              </Link>
            </div>

            {/* Trust strip — small fact list under CTAs */}
            <ul className="hv3-anim-fade-up hv3-anim-d5 mt-10 md:mt-12 flex flex-wrap gap-x-5 gap-y-2 font-lcsBody text-sm md:text-base text-lcs-teal/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
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

          {/* RIGHT — visual anchor column. The locale-chip strip sits ABOVE
              the card as a separate element (not absolute-positioned), so
              it never gets clipped by parent overflow.  Flex column on the
              right side stacks: chip strip → card. */}
          <div className="relative flex flex-col items-center justify-center gap-5 md:gap-6 pt-2 lg:pt-0">
            {/* Locale-chip strip — multilingual signal sits in-flow above
                the activity card. Crisp pill with shadow. */}
            <div className="hv3-anim-fade-up hv3-anim-d3 inline-flex items-center gap-1.5 px-4 py-2 bg-lcs-cream rounded-full shadow-[0_8px_20px_-6px_rgba(20,107,94,0.18)] border border-lcs-teal/8 z-10">
              <span className="hv3-locale-chip">EN</span>
              <span className="hv3-locale-chip">ES</span>
              <span className="hv3-locale-chip hv3-locale-chip-active">FR</span>
              <span className="hv3-locale-chip">PT</span>
              <span className="hv3-locale-chip">IT</span>
              <span className="hv3-locale-chip">FI</span>
              <span className="font-lcsBody text-xs text-lcs-teal/60 pl-1 font-semibold">+5</span>
            </div>

            {/* Card stack wrapper — provides positioning context for the
                tilted background card behind the main card. Sits below the
                locale chip strip in the flex column. */}
            <div className="relative w-full max-w-md">
              {/* Floating background card (rotated, behind main) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="hv3-card w-[92%] h-[88%] rounded-3xl opacity-50"
                  style={{ transform: 'rotate(-4deg) translate(-6%, 4%)' }}
                />
              </div>

              {/* Main activity card */}
              <div className="hv3-anim-fade-up hv3-anim-d4 relative z-10 w-full">
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
                tilt={2}
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
