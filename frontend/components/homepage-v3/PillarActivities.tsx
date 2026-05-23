/* Pillar 1 — Activities. THE MOAT. Largest visual treatment on the page.
   Asymmetric layout: copy left, card showcase right, with a second card
   tilted into negative space below to break the grid. */

import Link from 'next/link';
import ActivityCardPreview from './ActivityCardPreview';
import MascotPlaceholder from './MascotPlaceholder';
import { DoodleBullet, Arrow, Squiggle } from './DoodleAccents';

interface PillarActivitiesProps {
  locale: string;
}

const SUPPORTING_LINES = [
  {
    label: 'Aligned to Common Core',
    body: 'Code by code. K.CC.B.4, RF.K.2.B, K.G.A.2 — visible on every page so any teacher can verify in a glance.',
  },
  {
    label: 'Eleven languages',
    body: 'Same activity, same design, native syllabification. A child reads in their language; the standards stay the same.',
  },
  {
    label: 'No-pressure design',
    body: 'No timers. No scores. No streaks. Paced like a child\'s curiosity, not a leaderboard.',
  },
  {
    label: 'Built to be picked up',
    body: 'A child can run one alone — pick a tile, build a word, hear the answer. Human audio in progress; the rest is live.',
  },
];

export default function PillarActivities({ locale }: PillarActivitiesProps) {
  return (
    <section id="activities" className="hv3-section-cream relative overflow-hidden py-24 md:py-36 lg:py-44">
      {/* Coral transition band along the BOTTOM — softens the jump into
          Pillar 2's full-bleed coral and signals "the warm pillar leads
          into the loud pillar". */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(242,120,75,0.18) 70%, rgba(242,120,75,0.32) 100%)',
        }}
      />
      {/* Subtle teal blob top-right */}
      <div
        aria-hidden="true"
        className="hv3-blob-teal absolute -top-[15%] -right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="hv3-pillar-num-coral">01</span>
              <span className="hv3-eyebrow">Activities</span>
            </div>
            <h2 className="font-lcsDisplay font-bold text-lcs-teal leading-[1.05] tracking-tight text-[2.25rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem]">
              Lessons your kid wants to&nbsp;finish.<br />
              <span className="text-lcs-teal-deep">Standards your teacher trusts.</span>
            </h2>
          </div>
        </div>

        {/* Two-column body: supporting lines (left) + card showcase (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-start">
          {/* LEFT — supporting lines */}
          <div>
            <ul className="space-y-7 md:space-y-9">
              {SUPPORTING_LINES.map((item, i) => {
                const variants: Array<'loop' | 'dot' | 'star'> = ['loop', 'star', 'dot', 'loop'];
                const variant = variants[i % variants.length];
                return (
                  <li key={item.label} className="flex gap-5">
                    {/* Hand-drawn doodle bullet replaces the prior clean
                        coral vertical bar. Each line gets a slightly
                        different mark (loop / star / dot) so the list
                        feels human-drawn, not template-stamped. */}
                    <span className="flex-shrink-0 w-7 h-7 mt-0.5" aria-hidden="true">
                      <DoodleBullet
                        className="text-lcs-coral"
                        size={28}
                        variant={variant}
                      />
                    </span>
                    <div>
                      <h3 className="font-lcsDisplay font-semibold text-xl md:text-2xl text-lcs-teal leading-tight">
                        {/* First supporting line gets the squiggle flourish
                            on "Common Core" — picture-book-style emphasis. */}
                        {i === 0 ? (
                          <>
                            Aligned to <span className="hv3-squiggle-word">Common&nbsp;Core</span>
                          </>
                        ) : (
                          item.label
                        )}
                      </h3>
                      <p className="mt-2 font-lcsBody text-base md:text-lg text-lcs-teal/80 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 md:mt-12">
              <Link
                href={`/${locale}/activities`}
                className="hv3-cta-coral inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg px-7 py-3.5"
              >
                Start an activity
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT — card showcase: large foreground card + smaller offset
              cards. Container grown this pass (min-h 600→720) so the three
              cards have more room to layer and the actual product art reads
              larger. */}
          <div className="relative min-h-[560px] md:min-h-[720px] lg:min-h-[780px]">
            {/* Hand-drawn arrow from copy column → cards. Sits at top-left
                of this column, tilted, suggesting "here are real examples".
                Hidden on phone (the cards stack below copy there). */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -top-2 -left-16 z-30 opacity-80"
              style={{ transform: 'rotate(8deg)' }}
            >
              <Arrow className="text-lcs-teal/55" width={110} height={70} rotate={-20} strokeWidth={2.2} />
            </div>
            {/* Coral atmospheric blob behind */}
            <div
              aria-hidden="true"
              className="hv3-blob-coral absolute top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
            />

            {/* Background tilted card — Italian */}
            <div className="absolute top-[10%] -left-[6%] w-[68%] z-0">
              <ActivityCardPreview
                variant="compact"
                title="Costruttore di sillabe"
                prompt="Tocca le sillabe in ordine per formare la parola."
                subjectImg="https://www.lessoncraftstudio.com/image-library-webp/themes/animals/cat@2x.webp"
                subjectAlt="gatto"
                tiles={['gat', 'to']}
                slotsFilled={false}
                ccCode="RF.K.2.B"
                gradeLabel="Scuola dell'infanzia"
                checkLabel="Verifica"
                langChip="IT"
                tilt={-5}
              />
            </div>

            {/* Foreground main card — English */}
            <div className="absolute top-[2%] right-0 w-[78%] z-10">
              <ActivityCardPreview
                variant="full"
                title="Count to 10"
                prompt="Tap the frame to make 5."
                subjectImg="https://www.lessoncraftstudio.com/image-library-webp/themes/animals/cat@2x.webp"
                subjectAlt="five cats"
                tiles={['+', '−']}
                slotsFilled={false}
                ccCode="K.CC.B.4"
                gradeLabel="Kindergarten"
                checkLabel="Check"
                langChip="EN"
                tilt={3}
                float
              />
            </div>

            {/* Bottom tilted card — Spanish */}
            <div className="absolute bottom-0 left-[4%] w-[64%] z-20">
              <ActivityCardPreview
                variant="compact"
                title="Forma las sílabas"
                prompt="Toca las sílabas en orden para formar la palabra."
                subjectImg="https://www.lessoncraftstudio.com/image-library-webp/themes/animals/horse@2x.webp"
                subjectAlt="caballo"
                tiles={['ca', 'ba', 'llo']}
                slotsFilled={true}
                filledOrder={['ca', 'ba', 'llo']}
                ccCode="RF.K.2.B"
                gradeLabel="Jardín de infancia"
                checkLabel="Comprobar"
                langChip="ES"
                tilt={-3}
              />
            </div>

            {/* Mascot peeking from the bottom-right corner pointing at the
                cards. Real elephant art, "showing-down-left" pose so the
                trunk gestures back toward the card stack. Hidden on small
                screens. */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute -bottom-12 -right-8 z-30 w-[200px] lg:w-[240px] pointer-events-none hv3-float"
              style={{ ['--rot' as string]: '4deg' } as React.CSSProperties}
            >
              <MascotPlaceholder
                size="inline"
                poseHint="showing-down-right"
                alt="Elephant mascot gesturing toward the activity cards"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
