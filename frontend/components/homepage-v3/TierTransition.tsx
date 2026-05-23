/* Tier 1 → Tier 2 transition band — child-friendly redesign.
   The mascot is the central anchor of the transition moment. It stands
   ACROSS the diagonal cream→sage divider, partially on each ground,
   making the bridge metaphor visual rather than just text. The italic
   "And if you're the one teaching…" line sits next to the mascot on
   desktop; stacks below on phone. Mascot is the largest placeholder of
   the three (320px tall) — this is the strongest "character moment" on
   the page. */

import MascotPlaceholder from './MascotPlaceholder';

export default function TierTransition() {
  return (
    <div className="relative bg-lcs-cream">
      {/* The diagonal cream → sage divider — sets up the bridge ground. */}
      <div className="hv3-divider-diagonal" aria-hidden="true" />

      {/* The sage band that follows. Container is RELATIVE so the mascot
          can stand across the divider (its lower half on sage, upper half
          on cream). */}
      <div className="relative bg-lcs-sage py-16 md:py-24 lg:py-28 overflow-hidden">
        {/* Subtle teal atmospheric — restrained, not a blob gimmick. */}
        <div
          aria-hidden="true"
          className="hv3-blob-teal absolute -top-[20%] -right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
        />

        <div className="container mx-auto px-4 max-w-5xl relative">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 lg:gap-20">
            {/* Mascot — the central anchor. Positioned so the silhouette's
                upper portion overlaps the cream→sage divider above (visible
                via negative margin-top). */}
            <div
              className="relative -mt-20 md:-mt-32 lg:-mt-40 flex-shrink-0"
              aria-hidden="true"
            >
              <MascotPlaceholder
                size="transition"
                fillTone="teal-soft"
                poseHint="bridging"
              />
            </div>

            {/* The italic transition line — sits beside the mascot on
                desktop; below on phone. Slightly larger + more
                hand-illustrated feel than the prior centered band. */}
            <p className="font-lcsDisplay text-2xl md:text-3xl lg:text-[2.5rem] text-lcs-teal-deep italic leading-snug text-center md:text-left max-w-md">
              And if you&apos;re the one teaching<span className="text-lcs-coral">…</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
