/* Acquisition CTA — embed/share flywheel.
   Now ILLUSTRATES the embed paradigm: visitor sees the iframe snippet
   on the left, an arrow + caption in the middle, and on the right a
   faux browser window showing what the embedded worksheet looks like
   inside a teacher's class blog. Concrete demonstration replaces the
   prior empty cream card body. */

import Link from 'next/link';
import ActivityCardPreview from './ActivityCardPreview';
import { Arrow, Pencil, Sparkle } from './DoodleAccents';

interface Props {
  locale: string;
}

/* Inline browser-window mockup. Composed of:
   - chrome bar (3 dots + address pill)
   - blog post header (handwritten Baloo 2 + monospace tagline)
   - one short body paragraph
   - the embedded worksheet wrapped in a dashed coral outline +
     "← embedded here" tag
   Not exported — local to this section. */
function BrowserMockup() {
  return (
    <div
      className="hv3-browser-frame hv3-anim-fade-up hv3-anim-d2 hv3-float"
      style={{ ['--rot' as string]: '-1.5deg' } as React.CSSProperties}
    >
      {/* Chrome bar */}
      <div className="hv3-browser-chrome" aria-hidden="true">
        <span className="hv3-browser-dot" style={{ background: '#F2784B' }} />
        <span className="hv3-browser-dot" style={{ background: '#DCE3D3' }} />
        <span className="hv3-browser-dot" style={{ background: '#146B5E' }} />
        <span className="hv3-browser-address">
          mrs-park-class.blog/this-week-math
        </span>
      </div>

      {/* Blog body interior */}
      <div className="hv3-browser-body">
        <p className="font-lcsBody text-[10px] uppercase tracking-widest text-lcs-coral-deep font-bold mb-1">
          This week · 2026-05-23
        </p>
        <h3 className="font-lcsDisplay font-bold text-lcs-teal text-lg md:text-xl leading-tight">
          Mrs Park&apos;s Class
        </h3>
        <p className="mt-2 font-lcsBody text-sm text-lcs-teal/80 leading-relaxed">
          We&apos;re working on counting to ten this week. Try the activity
          below — no signup needed.
        </p>

        {/* Embedded worksheet — dashed coral outline + tag whispers
            "this is the embed". Uses ActivityCardPreview at compact
            scale; visually identical to a real iframe at this size and
            avoids the iframe-resize complexity for a marketing surface. */}
        <div className="hv3-embed-outline mt-4">
          <span className="hv3-embed-here-tag">embedded here</span>
          <ActivityCardPreview
            variant="compact"
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
            tilt={0}
          />
        </div>
      </div>
    </div>
  );
}

export default function EmbedShareV3({ locale }: Props) {
  return (
    <section className="hv3-section-coral-soft py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative hv3-card-deep hv3-card-on-color p-8 md:p-12 lg:p-14 overflow-hidden">
          {/* Coral atmospheric blob behind the right column */}
          <div
            aria-hidden="true"
            className="hv3-blob-coral absolute -top-[25%] -right-[10%] w-[460px] h-[460px] rounded-full pointer-events-none opacity-70"
          />

          {/* Header block — full width on top */}
          <div className="relative max-w-3xl">
            <p className="hv3-eyebrow">Share</p>
            <h2 className="mt-3 font-lcsDisplay font-bold text-lcs-teal leading-[1.1] tracking-tight text-[1.875rem] md:text-[2.5rem] lg:text-[3rem]">
              Embed any worksheet<br />
              <span className="text-lcs-teal-deep">on your blog or your class site.</span>
            </h2>
            <p className="mt-5 font-lcsBody text-base md:text-lg text-lcs-teal/80 leading-relaxed">
              Every interactive worksheet ships with a one-line iframe snippet.
              Paste it anywhere. It plays in place. No accounts. No paywalls.
            </p>
          </div>

          {/* Body — two columns at md+: snippet/CTA left, mockup right */}
          <div className="relative mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-10 md:gap-12 lg:gap-16 items-start">
            {/* LEFT — the snippet pill, the CTA, and a small "Paste this"
                caption tying it to the right-side mockup. */}
            <div className="relative">
              {/* Pencil doodle suggesting "fill in your own URL" */}
              <div
                aria-hidden="true"
                className="absolute -top-2 -right-3 z-10 opacity-75"
              >
                <Pencil className="text-lcs-coral-deep" size={42} rotate={14} />
              </div>

              <p className="font-lcsBody text-xs uppercase tracking-widest text-lcs-teal/55 font-bold mb-3">
                Paste this snippet{' '}
                <span className="inline md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </p>

              {/* The code snippet — hand-drawn frame, monospace */}
              <div className="hv3-handframe font-mono text-xs md:text-sm text-lcs-teal/85 overflow-x-auto">
                <code className="block whitespace-nowrap">&lt;iframe src=&quot;…/decks/…/&quot;&gt;&lt;/iframe&gt;</code>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={`/${locale}/topic/addition/?embed=open`}
                  className="hv3-cta-coral inline-flex items-center justify-center font-lcsDisplay font-semibold text-base md:text-lg px-6 py-3 whitespace-nowrap"
                >
                  See how it embeds
                  <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 10h10M11 5l5 5-5 5" />
                  </svg>
                </Link>
                <Sparkle className="text-lcs-coral" size={20} rotate={18} />
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

            {/* RIGHT — the browser window mockup with embedded worksheet.
                Visible at md+; stacks below the snippet column at <md. */}
            <div className="relative">
              {/* Hand-drawn arrow from snippet → mockup, only at md+ */}
              <div
                aria-hidden="true"
                className="hidden md:flex absolute top-[18%] -left-12 lg:-left-16 z-20 opacity-85 flex-col items-center gap-1"
              >
                <Arrow className="text-lcs-teal/65" width={70} height={48} rotate={-6} strokeWidth={2.2} />
                <span className="font-lcsDisplay italic text-xs lg:text-sm text-lcs-teal/70 whitespace-nowrap -mt-1">
                  paste it anywhere
                </span>
              </div>

              <BrowserMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
