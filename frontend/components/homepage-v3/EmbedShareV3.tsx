/* Acquisition CTA — embed/share flywheel.
   ILLUSTRATES the embed paradigm faithfully: depicts the actual product's
   share-modal flow per CLAUDE.md §17.8.15 (lcs-share button → "Embed
   this worksheet on your site" pop-up with Width/Height + iframe
   snippet + Copy code / Close).
   Visitor sees a real LCS deck-page with the Embed pop-up opened over
   it; no CTA — the illustration IS the demonstration. */

import { Arrow, Pencil, Sparkle } from './DoodleAccents';

interface Props {
  locale: string;
}

/* ProductEmbedMockup — faithful illustration of the actual share-modal
   flow. Browser-window frame → deck-page interior (Match Up worksheet
   with action-icon bar) → "Embed this worksheet on your site" pop-up
   overlay (Width/Height inputs + iframe snippet + Copy code/Close).
   Inline SVG worksheet keeps the composition lightweight and matches
   the operator's screenshot. */
function ProductEmbedMockup() {
  return (
    <div
      className="hv3-browser-frame hv3-anim-fade-up hv3-anim-d2 hv3-float relative"
      style={{ ['--rot' as string]: '-1.5deg' } as React.CSSProperties}
    >
      {/* Chrome bar — address matches a real deck URL pattern per §15.7 */}
      <div className="hv3-browser-chrome" aria-hidden="true">
        <span className="hv3-browser-dot" style={{ background: '#F2784B' }} />
        <span className="hv3-browser-dot" style={{ background: '#DCE3D3' }} />
        <span className="hv3-browser-dot" style={{ background: '#146B5E' }} />
        <span className="hv3-browser-address">
          lessoncraftstudio.com/en/decks/match-up-zoo-animals/
        </span>
      </div>

      {/* Deck-page body */}
      <div className="hv3-browser-body !p-0 relative">
        {/* Top action bar — title + 3 small action icons (mute, share,
            embed). Embed icon highlighted because the pop-up below
            comes from clicking it. */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-white border-b border-lcs-teal/10">
          <span className="font-lcsDisplay font-bold text-lcs-teal text-sm">Match Up</span>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {/* Mute */}
            <span className="w-7 h-7 rounded-full bg-lcs-teal/8 flex items-center justify-center text-lcs-teal/70 text-[11px]">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor"><path d="M4 7h3l4-3v12L7 13H4V7z" /></svg>
            </span>
            {/* Share */}
            <span className="w-7 h-7 rounded-full bg-lcs-teal/8 flex items-center justify-center text-lcs-teal/70">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="10" r="2.2" /><circle cx="14" cy="5" r="2.2" /><circle cx="14" cy="15" r="2.2" /><path d="M8 9l4-3M8 11l4 3" /></svg>
            </span>
            {/* Embed — highlighted (active state — the pop-up is open) */}
            <span className="w-7 h-7 rounded-full bg-lcs-coral text-lcs-cream flex items-center justify-center shadow-[0_2px_6px_-1px_rgba(242,120,75,0.55)]">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 6l-4 4 4 4M13 6l4 4-4 4" /></svg>
            </span>
          </div>
        </div>

        {/* Worksheet interior — stylized Match Up Zoo Animals.
            5 image circles left, 5 word labels right, 2 coral
            connection lines drawn between matched pairs. */}
        <div className="px-5 py-4 bg-white">
          <p className="font-lcsDisplay font-bold text-center text-lcs-teal text-base">Zoo Animals</p>
          <p className="text-center text-[10px] text-lcs-teal/60 mb-3">Draw lines to connect the matching pairs.</p>

          <div className="relative" style={{ height: '170px' }}>
            <svg viewBox="0 0 280 170" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              {/* 2 matched connection lines — coral */}
              <path d="M 70 25 Q 140 55 210 70" stroke="#F2784B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M 70 95 Q 140 110 210 130" stroke="#F2784B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </svg>

            {/* LEFT column — 5 image circles */}
            {[
              { y: 6, emoji: '🦁' },
              { y: 40, emoji: '🦒' },
              { y: 74, emoji: '🐅' },
              { y: 108, emoji: '🐘' },
              { y: 142, emoji: '🦓' },
            ].map((row, i) => (
              <div
                key={i}
                className="absolute left-0 flex items-center gap-2"
                style={{ top: `${row.y}px` }}
              >
                <span className="font-lcsDisplay font-bold text-xs text-lcs-teal/70">{i + 1}.</span>
                <span className="w-7 h-7 rounded-full bg-lcs-cream border border-lcs-teal/15 flex items-center justify-center text-base">
                  {row.emoji}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-lcs-teal/60" />
              </div>
            ))}

            {/* RIGHT column — 5 word labels */}
            {['Lion', 'Tiger', 'Giraffe', 'Elephant', 'Zebra'].map((word, i) => {
              const y = [6, 40, 74, 108, 142][i];
              return (
                <div
                  key={word}
                  className="absolute right-0 flex items-center gap-2"
                  style={{ top: `${y}px` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lcs-teal/60" />
                  <span className="font-lcsDisplay font-semibold text-xs text-lcs-teal">{word}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex justify-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-lcs-teal/15 text-lcs-teal/70 font-lcsDisplay font-semibold text-xs">
              Check Answers
            </span>
          </div>
        </div>

        {/* EMBED POP-UP — overlay positioned over the top-right of the
            deck body. Mirrors the actual product's "Embed this
            worksheet on your site" modal. */}
        <div
          className="hv3-embed-popup"
          style={{ top: '38px', right: '14px', width: '220px' }}
          aria-hidden="true"
        >
          <p className="hv3-embed-popup-header">Embed this worksheet on your site</p>

          <div className="hv3-embed-popup-field-row">
            <div>
              <p className="hv3-embed-popup-field-label">Width</p>
              <div className="hv3-embed-popup-field-input">800</div>
            </div>
            <div>
              <p className="hv3-embed-popup-field-label">Height</p>
              <div className="hv3-embed-popup-field-input">1204</div>
            </div>
          </div>

          <pre className="hv3-embed-popup-snippet">{`<div style="max-width: 800px;
  margin: 0 auto;">
  <iframe id="lcs-embed-f614y5pe"
    src="https://www.lessoncraftstudio.com/`}</pre>

          <p className="hv3-embed-popup-paste-caption">
            Paste this into your website&apos;s HTML
          </p>

          <div className="hv3-embed-popup-cta-row">
            <button type="button" tabIndex={-1} className="hv3-embed-popup-cta-copy">Copy code</button>
            <button type="button" tabIndex={-1} className="hv3-embed-popup-cta-close">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmbedShareV3({ locale: _locale }: Props) {
  return (
    <section className="hv3-section-coral-soft py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative hv3-card-deep hv3-card-on-color p-6 md:p-8 lg:p-10 overflow-hidden">
          {/* Atmospheric coral haze behind the mockup — backdrop now,
              not gap-filler. Lower opacity since the mockup carries the
              visual weight. */}
          <div
            aria-hidden="true"
            className="hv3-blob-coral !absolute -top-[25%] -right-[10%] w-[420px] h-[420px] rounded-full pointer-events-none opacity-45"
          />

          {/* Single 2-col grid that spans the full card — no separate
              full-width header on top. Eliminates the prior top gap. */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-10 md:gap-12 lg:gap-16 items-start">
            {/* LEFT — header + snippet + trust bullets (no CTA) */}
            <div className="relative">
              {/* Pencil doodle near the header */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-2 z-10 opacity-70"
              >
                <Pencil className="text-lcs-coral-deep" size={38} rotate={14} />
              </div>

              <p className="hv3-eyebrow">Share</p>
              <h2 className="mt-3 font-lcsDisplay font-bold text-lcs-teal leading-[1.1] tracking-tight text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.875rem]">
                Embed any worksheet<br />
                <span className="text-lcs-teal-deep">on your blog or your class site.</span>
              </h2>
              <p className="mt-5 font-lcsBody text-base md:text-lg text-lcs-teal/80 leading-relaxed">
                Every interactive worksheet ships with a one-line iframe snippet.
                Paste it anywhere. It plays in place. No accounts. No paywalls.
              </p>

              <p className="mt-7 font-lcsBody text-xs uppercase tracking-widest text-lcs-teal/55 font-bold mb-3">
                Paste this snippet{' '}
                <span className="inline md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </p>

              <div className="hv3-handframe font-mono text-xs md:text-sm text-lcs-teal/85 overflow-x-auto">
                <code className="block whitespace-nowrap">&lt;iframe src=&quot;…/decks/…/&quot;&gt;&lt;/iframe&gt;</code>
              </div>

              <ul className="mt-6 space-y-2 font-lcsBody text-sm text-lcs-teal/75">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-lcs-coral" aria-hidden="true" />
                  Plays in place — students don&apos;t leave your site.
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-lcs-coral" aria-hidden="true" />
                  Works in WordPress, Wix, Google Sites, Squarespace, anywhere.
                </li>
              </ul>
            </div>

            {/* RIGHT — the product embed mockup */}
            <div className="relative">
              {/* Hand-drawn arrow from snippet → mockup, only at md+ */}
              <div
                aria-hidden="true"
                className="hidden md:flex absolute top-[42%] -left-12 lg:-left-14 z-20 opacity-85 flex-col items-center gap-1"
              >
                <Arrow className="text-lcs-teal/65" width={70} height={48} rotate={-6} strokeWidth={2.2} />
                <span className="font-lcsDisplay italic text-xs lg:text-sm text-lcs-teal/70 whitespace-nowrap -mt-1">
                  here&apos;s how
                </span>
              </div>

              <ProductEmbedMockup />

              {/* Small sparkle accent floating near the pop-up */}
              <div aria-hidden="true" className="absolute -top-1 -right-2 opacity-70 z-30">
                <Sparkle className="text-lcs-coral" size={18} rotate={28} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

