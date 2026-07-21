import Link from 'next/link';

/**
 * Compact, crawl-friendly "More worksheets in this topic" link block for the 2-segment /topic/ pages
 * (Tier-3 crawl-channeling 2026-07-21). Server-rendered plain anchors (Next <Link> emits <a href> in
 * SSR HTML) so Googlebot follows them without JS — the point is to feed the highest-crawl surface
 * (the 6.4k-fetch/10d 2-segment topic pages) into the crawl-starved landing tier, whose links were
 * ~2 per hub while thousands of on-coordinate landings exist.
 *
 * One short heading string per locale (utility label; kept inline like the landing route's UI_STRINGS
 * and subject-hub SUBJECT_COPY, to avoid touching the 11 messages/*.json files for a single label).
 */
const HEADING: Record<string, string> = {
  en: 'More worksheets in this topic',
  de: 'Weitere Arbeitsblätter zu diesem Thema',
  es: 'Más fichas de este tema',
  fr: 'Plus de fiches sur ce thème',
  it: 'Altre schede su questo argomento',
  pt: 'Mais fichas sobre este tema',
  nl: 'Meer werkbladen over dit onderwerp',
  sv: 'Fler arbetsblad i detta ämne',
  da: 'Flere opgaveark om dette emne',
  no: 'Flere arbeidsark om dette emnet',
  fi: 'Lisää tähän aiheeseen liittyviä tehtäviä',
};

export default function TopicLandingLinks({
  locale,
  landings,
}: {
  locale: string;
  landings: { slug: string; h1: string }[];
}) {
  if (!landings.length) return null;
  const heading = HEADING[locale] || HEADING.en;
  return (
    <section className="mt-12 max-w-5xl">
      <h2 className="font-display font-bold text-lg text-[#146B5E] mb-3">{heading}</h2>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm leading-relaxed">
        {landings.map((l) => (
          <li key={l.slug}>
            <Link
              href={`/${locale}/worksheets/${l.slug}`}
              prefetch={false}
              className="text-ink-600 hover:text-[#146B5E] hover:underline"
            >
              {l.h1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
