/* Variety thumbnail (v3) — Direction A restyled.
   Click → routes to the exercise-type topic page in the visitor's locale. */

import Link from 'next/link';
import Image from 'next/image';
import { wwwImg } from '@/lib/img-host';

interface Props {
  title: string;
  languageLabel: string;
  thumbnailUrl: string;
  topicUrl: string;
  /**
   * Optional richer alt text per the alt-text SEO commission 2026-05-27.
   * Caller composes via `buildDeckRichAlt(deck, locale, t)` server-side.
   * Falls back to bare `title` when undefined (e.g. cross-locale strips).
   */
  richAlt?: string;
}

export default function BreadthThumbV3({
  title,
  languageLabel,
  thumbnailUrl,
  topicUrl,
  richAlt,
}: Props) {
  return (
    <Link
      href={topicUrl}
      className="hv3-card group relative block overflow-hidden hover:-translate-y-1 transition-transform duration-300"
      aria-label={richAlt ?? title}
    >
      <div className="relative aspect-[480/620] overflow-hidden rounded-t-3xl">
        <Image
          src={wwwImg(thumbnailUrl)}
          alt={richAlt ?? title}
          fill
          sizes="(max-width:639px) 45vw, (max-width:1023px) 25vw, 180px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 right-2 hv3-locale-chip">{languageLabel}</span>
      </div>
      <div className="px-3 py-2.5">
        <span className="block font-lcsBody text-xs font-semibold text-lcs-teal truncate">{title}</span>
      </div>
    </Link>
  );
}
