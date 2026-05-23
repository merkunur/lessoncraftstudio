/* Pillar 3 — Printables. Tier 1, third in lineup.
   Smaller than Activities + Interactive (they're the headline pair); still
   firmly Tier 1 in warmth and ground color. Paper-stack visual metaphor
   on the right; copy left. */

import Link from 'next/link';

interface PillarPrintablesProps {
  locale: string;
}

export default function PillarPrintables({ locale }: PillarPrintablesProps) {
  return (
    <section id="printables" className="relative overflow-hidden bg-lcs-cream py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          {/* LEFT — copy */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="hv3-pillar-num">03</span>
              <span className="hv3-eyebrow">Printables</span>
            </div>
            <h2 className="font-lcsDisplay font-bold text-lcs-teal leading-[1.05] tracking-tight text-[2rem] sm:text-[2.5rem] md:text-[3rem]">
              Worksheets to print.<br />
              <span className="text-lcs-teal-deep">Answer keys to grade by.</span>
            </h2>

            <ul className="mt-8 space-y-5 font-lcsBody text-base md:text-lg text-lcs-teal/85 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                Every interactive worksheet ships with a printable PDF — same images, same exercises, paper-friendly.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                Answer keys included for every set.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                Plus PDF-only formats for fine-motor practice: coloring, writing, draw-and-color, line tracing.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
                Designed for the classroom printer, the home printer, and the school copier alike.
              </li>
            </ul>

            <div className="mt-10">
              <Link
                href={`/${locale}/topic/addition/`}
                className="hv3-cta-teal-outline inline-flex items-center justify-center font-lcsDisplay font-semibold text-base md:text-lg px-6 py-3"
              >
                See printable worksheets
              </Link>
            </div>
          </div>

          {/* RIGHT — paper-stack visual metaphor */}
          <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            <div
              aria-hidden="true"
              className="hv3-blob-coral absolute top-[20%] right-[10%] w-[280px] h-[280px] rounded-full pointer-events-none"
            />

            {/* Stack of three "pages" — layered offset */}
            <div className="relative w-[260px] md:w-[320px] aspect-[2/2.6]">
              {/* Back page */}
              <div
                className="absolute inset-0 bg-lcs-cream rounded-md shadow-[0_20px_40px_-12px_rgba(20,107,94,0.18),0_8px_16px_-6px_rgba(20,107,94,0.12)] border border-lcs-teal/10"
                style={{ transform: 'rotate(-6deg) translate(-12px, 12px)' }}
                aria-hidden="true"
              >
                <div className="p-6 opacity-70">
                  <div className="h-2 w-1/3 bg-lcs-teal/30 rounded-full mb-3" />
                  <div className="h-1.5 w-2/3 bg-lcs-teal/20 rounded-full mb-1.5" />
                  <div className="h-1.5 w-1/2 bg-lcs-teal/20 rounded-full" />
                </div>
              </div>
              {/* Middle page */}
              <div
                className="absolute inset-0 bg-lcs-cream rounded-md shadow-[0_20px_40px_-12px_rgba(20,107,94,0.18),0_8px_16px_-6px_rgba(20,107,94,0.12)] border border-lcs-teal/10"
                style={{ transform: 'rotate(3deg) translate(8px, 6px)' }}
                aria-hidden="true"
              >
                <div className="p-6 opacity-80">
                  <div className="h-2 w-2/5 bg-lcs-teal/35 rounded-full mb-3" />
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="aspect-square bg-lcs-coral-soft rounded" />
                    <div className="aspect-square bg-lcs-sage rounded" />
                    <div className="aspect-square bg-lcs-coral-soft rounded" />
                  </div>
                </div>
              </div>
              {/* Front page — actual content stand-in */}
              <div className="absolute inset-0 bg-lcs-cream rounded-md shadow-[0_24px_48px_-16px_rgba(20,107,94,0.28),0_12px_24px_-8px_rgba(20,107,94,0.16)] border border-lcs-teal/10 overflow-hidden">
                <div className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="font-lcsBody text-[10px] uppercase tracking-widest text-lcs-coral-deep font-bold">PDF · A4</p>
                      <p className="font-lcsDisplay font-bold text-lcs-teal text-lg mt-1 leading-tight">Addition Practice</p>
                    </div>
                    <span className="hv3-locale-chip hv3-locale-chip-active text-[10px]">FR</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { a: 3, b: 4 },
                      { a: 5, b: 2 },
                      { a: 7, b: 1 },
                      { a: 6, b: 3 },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-2 font-lcsDisplay font-semibold text-lcs-teal text-base">
                        <span>{row.a}</span>
                        <span className="text-lcs-coral">+</span>
                        <span>{row.b}</span>
                        <span className="text-lcs-teal/60">=</span>
                        <span className="inline-block w-10 h-6 border-b-2 border-lcs-teal/40" />
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-3 right-4 font-lcsBody text-[10px] text-lcs-teal/40">
                    LessonCraftStudio
                  </div>
                </div>
              </div>

              {/* Floating "Answer key" tag */}
              <div className="absolute -bottom-6 -right-6 px-4 py-2 bg-lcs-coral text-lcs-cream rounded-full font-lcsBody font-bold text-sm shadow-[0_8px_20px_-4px_rgba(242,120,75,0.5)] rotate-3">
                + Answer key
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
