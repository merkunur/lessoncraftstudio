/* Tier 1 → Tier 2 transition band. A single inclusive line + a gentle
   diagonal divider that visually shifts the page from the warm cream
   ground (Tier 1) to the cooler sage ground (Tier 2). */

export default function TierTransition() {
  return (
    <div className="relative">
      {/* The diagonal cream-to-sage divider */}
      <div className="hv3-divider-diagonal" aria-hidden="true" />

      {/* The actual transition message — set on the sage ground that follows */}
      <div className="bg-lcs-sage py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="font-lcsDisplay text-2xl md:text-3xl lg:text-4xl text-lcs-teal-deep italic leading-snug">
            And if you&apos;re the one teaching<span className="text-lcs-coral">…</span>
          </p>
        </div>
      </div>
    </div>
  );
}
