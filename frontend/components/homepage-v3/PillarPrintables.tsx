/* Pillar 3 — Printables. Tier 1, third in lineup.
   Smaller than Activities + Interactive (they're the headline pair); still
   firmly Tier 1 in warmth and ground color. Paper-stack visual metaphor
   on the right; copy left. */

import Link from 'next/link';
import { Pencil, Sparkle } from './DoodleAccents';

interface PillarPrintablesProps {
  locale: string;
}

export default function PillarPrintables({ locale }: PillarPrintablesProps) {
  return (
    <section id="printables" className="hv3-section-sage relative overflow-hidden py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          {/* LEFT — copy */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="hv3-pillar-num-coral">03</span>
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

          {/* RIGHT — paper-stack visual metaphor. Grown ~25% this pass so
              the worksheet art on the front page reads larger and the
              "real worksheet" feeling comes through. */}
          <div className="relative flex items-center justify-center min-h-[440px] md:min-h-[580px]">
            <div
              aria-hidden="true"
              className="hv3-blob-coral absolute top-[20%] right-[10%] w-[280px] h-[280px] rounded-full pointer-events-none opacity-60"
            />

            {/* Hand-drawn pencil doodle floating beside the paper stack —
                signals "print, then write on it" without needing copy. */}
            <div
              aria-hidden="true"
              className="absolute top-[8%] -right-2 md:right-2 z-30 hv3-float"
              style={{ ['--rot' as string]: '-12deg' } as React.CSSProperties}
            >
              <Pencil className="text-lcs-coral-deep" size={56} rotate={-15} />
            </div>

            {/* Stack of three "pages" — layered offset */}
            <div className="relative w-[320px] md:w-[400px] aspect-[2/2.6]">
              {/* Back page — "Word Search" worksheet (DE chip). Tinted
                  warm + opacity 0.7 so it reads as the deepest in the
                  stack while still being a recognizable worksheet. */}
              <div
                className="absolute inset-0 hv3-card hv3-card-tinted-warm rounded-md border border-lcs-teal/10 overflow-hidden"
                style={{ transform: 'rotate(-6deg) translate(-12px, 12px)' }}
                aria-hidden="true"
              >
                <div className="p-6 opacity-70">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-lcsBody text-[10px] uppercase tracking-widest text-lcs-coral-deep font-bold">PDF · A4</p>
                      <p className="font-lcsDisplay font-bold text-lcs-teal text-lg mt-1 leading-tight">Word Search</p>
                    </div>
                    <span className="hv3-locale-chip text-[10px]">DE</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {['B','A','U','M','E','R','G','A','R','T','E','N','F','I','S','C','H','E','S','O','N','N','E','T','K','I','N','D','E','R','M','A','U','S','E','S']
                      .slice(0, 30)
                      .map((ch, i) => (
                        <span
                          key={i}
                          className="aspect-square flex items-center justify-center font-lcsDisplay font-semibold text-lcs-teal text-xs bg-lcs-cream/60 rounded border border-lcs-teal/15"
                        >
                          {ch}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              {/* Middle page — "Picture Matching" worksheet (EN chip).
                  Tinted sage + opacity 0.8 so it reads as middle-of-stack. */}
              <div
                className="absolute inset-0 hv3-card hv3-card-tinted-sage rounded-md border border-lcs-teal/10 overflow-hidden"
                style={{ transform: 'rotate(3deg) translate(8px, 6px)' }}
                aria-hidden="true"
              >
                <div className="p-6 opacity-80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-lcsBody text-[10px] uppercase tracking-widest text-lcs-coral-deep font-bold">PDF · A4</p>
                      <p className="font-lcsDisplay font-bold text-lcs-teal text-lg mt-1 leading-tight">Picture Matching</p>
                    </div>
                    <span className="hv3-locale-chip text-[10px]">EN</span>
                  </div>
                  <div className="relative" style={{ height: '90px' }}>
                    <svg viewBox="0 0 220 90" className="absolute inset-0 w-full h-full" aria-hidden="true">
                      <path d="M 38 14 Q 110 22 184 28" stroke="#F2784B" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeDasharray="3 3" opacity="0.7" />
                      <path d="M 38 46 Q 110 50 184 60" stroke="#F2784B" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeDasharray="3 3" opacity="0.7" />
                      <path d="M 38 78 Q 110 70 184 76" stroke="#F2784B" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeDasharray="3 3" opacity="0.7" />
                    </svg>
                    {[
                      { y: 0,  emoji: '🐱' },
                      { y: 32, emoji: '🐶' },
                      { y: 64, emoji: '🐰' },
                    ].map((row, i) => (
                      <div key={`l${i}`} className="absolute left-0 flex items-center gap-1.5" style={{ top: `${row.y}px` }}>
                        <span className="w-7 h-7 rounded-full bg-lcs-cream border border-lcs-teal/15 flex items-center justify-center text-sm">{row.emoji}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-lcs-teal/60" />
                      </div>
                    ))}
                    {['Rabbit', 'Cat', 'Dog'].map((word, i) => {
                      const y = [0, 32, 64][i];
                      return (
                        <div key={`r${i}`} className="absolute right-0 flex items-center gap-1.5" style={{ top: `${y}px` }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-lcs-teal/60" />
                          <span className="font-lcsDisplay font-semibold text-xs text-lcs-teal">{word}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Front page — default cream, on top of the stack with paper grain */}
              <div className="absolute inset-0 hv3-card hv3-card-on-color rounded-md border border-lcs-teal/10 overflow-hidden">
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

              {/* Floating "Answer key" tag with a small sparkle accent —
                  signals the badge as an extra delight, not chrome. */}
              <div className="absolute -bottom-6 -right-6 px-4 py-2 bg-lcs-coral text-lcs-cream rounded-full font-lcsBody font-bold text-sm shadow-[0_8px_20px_-4px_rgba(242,120,75,0.5)] rotate-3 inline-flex items-center gap-1.5">
                <Sparkle className="text-lcs-cream" size={14} rotate={-12} />
                + Answer key
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
