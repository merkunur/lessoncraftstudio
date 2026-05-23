/* Pillar 4 — Worksheet makers. Tier 2. Sage ground. Smaller scale than
   Tier 1. The "creator power-layer" framing — but inclusive: any adult
   who wants to build something specific can use these.
   Visual: a stylized maker-control panel mock (theme + language dropdowns
   + a small preview) showing the DIY paradigm. */

import Link from 'next/link';

interface PillarMakersProps {
  locale: string;
}

export default function PillarMakers({ locale }: PillarMakersProps) {
  return (
    <section id="worksheet-makers" className="relative overflow-hidden bg-lcs-sage py-20 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="hv3-pillar-num" style={{ color: 'rgba(20, 107, 94, 0.32)' }}>04</span>
              <span className="hv3-eyebrow">Worksheet makers</span>
            </div>
            <h2 className="font-lcsDisplay font-bold text-lcs-teal leading-[1.1] tracking-tight text-[1.875rem] sm:text-[2.25rem] md:text-[2.75rem]">
              Make a worksheet in a minute.<br />
              <span className="text-lcs-teal-deep">In any of eleven languages.</span>
            </h2>

            <p className="mt-6 font-lcsBody text-base md:text-lg text-lcs-teal/85 leading-relaxed max-w-xl">
              A library of generator tools — math, letters, puzzles, patterns —
              each with theme and language controls. Bring your own word list,
              your own image set, your own classroom touches.
            </p>

            <ul className="mt-6 space-y-3 font-lcsBody text-sm md:text-base text-lcs-teal/80">
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-lcs-coral" aria-hidden="true" />
                One setup. Two outputs: interactive HTML and printable PDF.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-lcs-coral" aria-hidden="true" />
                Aimed at the teacher who wants exactly the worksheet they had in mind.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-lcs-coral" aria-hidden="true" />
                Multilingual controls; the worksheet ships in the language you choose.
              </li>
            </ul>

            <div className="mt-8">
              <Link
                href={`/${locale}/worksheet-makers/`}
                className="hv3-cta-coral inline-flex items-center justify-center font-lcsDisplay font-semibold text-base px-6 py-3"
              >
                Open the makers
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT — mock control panel */}
          <div className="relative">
            <div className="hv3-card-deep p-6 md:p-8 max-w-md mx-auto">
              {/* Top label row */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-lcsDisplay font-bold text-lcs-teal text-sm">Addition Generator</span>
                <span className="hv3-code-chip text-xs">Math · K-2</span>
              </div>

              {/* Controls */}
              <div className="space-y-3.5">
                <div>
                  <label className="block font-lcsBody text-xs font-bold text-lcs-teal/70 uppercase tracking-wider mb-1.5">Theme</label>
                  <div className="flex items-center justify-between px-4 py-2.5 bg-lcs-cream border-2 border-lcs-teal/15 rounded-lg">
                    <span className="font-lcsBody text-sm text-lcs-teal font-semibold">🦕 Dinosaurs</span>
                    <svg className="w-4 h-4 text-lcs-teal/60" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 7.5L10 12l4.5-4.5"/></svg>
                  </div>
                </div>
                <div>
                  <label className="block font-lcsBody text-xs font-bold text-lcs-teal/70 uppercase tracking-wider mb-1.5">Language</label>
                  <div className="flex items-center justify-between px-4 py-2.5 bg-lcs-cream border-2 border-lcs-teal/15 rounded-lg">
                    <span className="font-lcsBody text-sm text-lcs-teal font-semibold">🇫🇷 Français</span>
                    <svg className="w-4 h-4 text-lcs-teal/60" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 7.5L10 12l4.5-4.5"/></svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-lcsBody text-xs font-bold text-lcs-teal/70 uppercase tracking-wider mb-1.5">Range</label>
                    <div className="px-3 py-2.5 bg-lcs-cream border-2 border-lcs-teal/15 rounded-lg font-lcsBody text-sm text-lcs-teal font-semibold">0 — 10</div>
                  </div>
                  <div>
                    <label className="block font-lcsBody text-xs font-bold text-lcs-teal/70 uppercase tracking-wider mb-1.5">Items</label>
                    <div className="px-3 py-2.5 bg-lcs-cream border-2 border-lcs-teal/15 rounded-lg font-lcsBody text-sm text-lcs-teal font-semibold">12</div>
                  </div>
                </div>
              </div>

              {/* Generate button */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hv3-cta-coral flex-1 font-lcsDisplay font-semibold text-base px-5 py-3"
                >
                  Generate
                </button>
                <div className="px-3 py-2 bg-lcs-teal/8 rounded-lg font-lcsBody text-xs text-lcs-teal/70 font-semibold">
                  HTML + PDF
                </div>
              </div>
            </div>

            {/* Floating "29 makers" badge — but as a quality signal, not a count we sell on */}
            <div className="absolute -top-5 -right-2 px-3 py-1.5 bg-lcs-cream rounded-full font-lcsBody font-bold text-xs text-lcs-teal shadow-[0_8px_16px_-4px_rgba(20,107,94,0.2)] hv3-float" style={{ ['--rot' as string]: '4deg' }}>
              Math · Letters · Puzzles · Patterns
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
