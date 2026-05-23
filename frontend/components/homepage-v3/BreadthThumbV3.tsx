/* Variety thumbnail (v3) — Direction A restyled.
   Click → routes to the exercise-type topic page in the visitor's locale. */

import Link from 'next/link';

interface Props {
  title: string;
  languageLabel: string;
  thumbnailUrl: string;
  topicUrl: string;
}

export default function BreadthThumbV3({
  title,
  languageLabel,
  thumbnailUrl,
  topicUrl,
}: Props) {
  return (
    <Link
      href={topicUrl}
      className="hv3-card group relative block overflow-hidden hover:-translate-y-1 transition-transform duration-300"
      aria-label={title}
    >
      <div className="relative aspect-[480/620] overflow-hidden rounded-t-3xl">
        <img
          src={thumbnailUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 right-2 hv3-locale-chip">{languageLabel}</span>
      </div>
      <div className="px-3 py-2.5">
        <span className="block font-lcsBody text-xs font-semibold text-lcs-teal truncate">{title}</span>
      </div>
    </Link>
  );
}
