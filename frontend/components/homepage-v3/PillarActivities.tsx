/* Pillar 1 — Activities. THE MOAT. Largest visual treatment on the page.
   Asymmetric layout: copy left, card showcase right, with a second card
   tilted into negative space below to break the grid. */

import Link from 'next/link';
import ActivityCardPreview from './ActivityCardPreview';

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
    <section id="activities" className="relative overflow-hidden bg-lcs-cream py-24 md:py-36 lg:py-44">
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
              <span className="hv3-pillar-num">01</span>
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
              {SUPPORTING_LINES.map((item) => (
                <li key={item.label} className="flex gap-5">
                  <span className="flex-shrink-0 w-1 self-stretch bg-lcs-coral rounded-full" aria-hidden="true" />
                  <div>
                    <h3 className="font-lcsDisplay font-semibold text-xl md:text-2xl text-lcs-teal leading-tight">
                      {item.label}
                    </h3>
                    <p className="mt-2 font-lcsBody text-base md:text-lg text-lcs-teal/80 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 md:mt-12">
              <Link
                href={`/${locale}/activities/count-to-10-with-animals/`}
                className="hv3-cta-coral inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg px-7 py-3.5"
              >
                Start an activity
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT — card showcase: large foreground card + smaller offset cards */}
          <div className="relative min-h-[520px] md:min-h-[600px]">
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
                subjectEmoji="🐱"
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
                subjectEmoji="🐴"
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
          </div>
        </div>
      </div>
    </section>
  );
}
