'use client';

/* LiveToolEmbedV6 — click-to-activate live tool embed for the homepage.

   MUST stay click-gated: ActivityIframe meters interactive play on MOUNT
   (10/day free). Auto- or scroll-mounting it here would burn one play per
   homepage visit for every anonymous visitor and could surface the quota
   wall as homepage content. The preview facade renders a real screenshot;
   the iframe (and its meter) fires only on genuine intent.

   All strings arrive as props (the server parent owns i18n). */

import { useState } from 'react';
import { ActivityIframe } from '@/components/activities/ActivityIframe';

interface Props {
  /** Full mini-tool src incl. version + lang + embed params. */
  src: string;
  name: string;
  previewUrl: string;
  ctaLabel: string;
  note: string;
  liveTag: string;
}

export default function LiveToolEmbedV6({ src, name, previewUrl, ctaLabel, note, liveTag }: Props) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="hv6-stage w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="font-lcsDisplay font-bold text-lg text-lcs-teal">{name}</span>
          <span className="hv6-chip-coral hv6-chip">{liveTag}</span>
        </div>
        <ActivityIframe src={src} title={name} />
      </div>
    );
  }

  return (
    <div className="hv6-stage w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-lcsDisplay font-bold text-lg text-lcs-teal">{name}</span>
        <span className="hv6-chip">{liveTag}</span>
      </div>
      <button
        type="button"
        onClick={() => setActive(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-lcs-teal/10 bg-[#F4F8F6]"
        aria-label={`${ctaLabel} — ${name}`}
      >
        <img src={previewUrl} alt={name} width={480} height={360} loading="lazy" className="block w-full h-auto" />
        <span className="absolute inset-0 flex items-center justify-center bg-lcs-teal/0 group-hover:bg-lcs-teal/20 transition-colors duration-300">
          <span className="hv6-cta hv6-cta-primary px-6 py-3 text-base shadow-lg">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            {ctaLabel}
          </span>
        </span>
      </button>
      <p className="mt-3 font-lcsBody text-sm text-[#3d574f]">{note}</p>
    </div>
  );
}
