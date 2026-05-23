/* Acquisition CTA — embed/share flywheel restyled in Direction A.
   Coral on cream, bold confident framing. Keeps the §1 doctrine: every
   public page is shareable; embeds spread the flywheel. */

import Link from 'next/link';

interface Props {
  locale: string;
}

export default function EmbedShareV3({ locale }: Props) {
  return (
    <section className="bg-lcs-cream py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative hv3-card-deep p-10 md:p-14 lg:p-16 overflow-hidden">
          {/* Coral atmospheric blob behind */}
          <div
            aria-hidden="true"
            className="hv3-blob-coral absolute -top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div>
              <p className="hv3-eyebrow">Share</p>
              <h2 className="mt-3 font-lcsDisplay font-bold text-lcs-teal leading-[1.1] tracking-tight text-[1.875rem] md:text-[2.5rem]">
                Embed any worksheet<br />
                <span className="text-lcs-teal-deep">on your blog or your class site.</span>
              </h2>
              <p className="mt-5 font-lcsBody text-base md:text-lg text-lcs-teal/80 leading-relaxed">
                Every interactive worksheet ships with a one-line iframe snippet.
                Paste it anywhere. It plays in place. No accounts. No paywalls.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <Link
                href={`/${locale}/topic/addition/?embed=open`}
                className="hv3-cta-coral inline-flex items-center justify-center font-lcsDisplay font-semibold text-base md:text-lg px-7 py-3.5 whitespace-nowrap"
              >
                See how it embeds
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>

              <div className="px-4 py-2.5 bg-lcs-teal-soft rounded-lg font-mono text-xs text-lcs-teal/85 max-w-full overflow-hidden">
                <code className="block whitespace-nowrap">&lt;iframe src=&quot;…/decks/…/&quot;&gt;&lt;/iframe&gt;</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
