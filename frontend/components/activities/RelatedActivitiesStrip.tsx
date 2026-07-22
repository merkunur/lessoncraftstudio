import Link from 'next/link';
import type { ActivityRow } from '@/lib/activities';

/**
 * Compact, crawl-friendly "Interactive activities to try" link strip for hub
 * pages (educational-level topic hubs, etc.) — passes internal-link authority
 * from these indexed hubs into the activity tier (whose pages were previously
 * linked mostly from other unindexed activities). Server-rendered plain anchors
 * (Next <Link> emits <a href> in SSR HTML) so Googlebot follows them without JS.
 * Self-skips when there are no locale-available activities. Additive + SEO-
 * neutral to the host page (no head/canonical/metadata involvement).
 *
 * One short heading string per locale (utility label; kept inline like
 * TopicLandingLinks' HEADING, to avoid touching the 11 messages/*.json files).
 */
const HEADING: Record<string, string> = {
  en: 'Interactive activities to try',
  de: 'Interaktive Übungen zum Ausprobieren',
  es: 'Actividades interactivas para probar',
  fr: 'Activités interactives à essayer',
  it: 'Attività interattive da provare',
  pt: 'Atividades interativas para experimentar',
  nl: 'Interactieve activiteiten om te proberen',
  sv: 'Interaktiva aktiviteter att prova',
  da: 'Interaktive aktiviteter at prøve',
  no: 'Interaktive aktiviteter å prøve',
  fi: 'Kokeile interaktiivisia tehtäviä',
};

export default function RelatedActivitiesStrip({
  locale,
  activities,
}: {
  locale: string;
  activities: ActivityRow[];
}) {
  const items = activities.filter((a) => a.slug[locale] && a.page_title[locale]);
  if (!items.length) return null;
  const heading = HEADING[locale] || HEADING.en;
  return (
    <section className="mt-12 max-w-5xl">
      <h2 className="font-display font-bold text-lg text-[#146B5E] mb-3">{heading}</h2>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm leading-relaxed">
        {items.map((a) => (
          <li key={a.id}>
            <Link
              href={`/${locale}/activities/${a.slug[locale]}`}
              prefetch={false}
              className="text-ink-600 hover:text-[#146B5E] hover:underline"
            >
              {a.page_title[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
