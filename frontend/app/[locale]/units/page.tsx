import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getUnitUi, listedUnits } from '@/lib/units';
import UnitsHub from '@/components/units/UnitsHub';

/**
 * The units hub: /<locale>/units (Daily Teaching System, Part 4.4). Every unit of the language by grade and subject,
 * with a link to each year plan.
 *
 * A language with no units has no hub (404). A language whose units are all pilots has a `noindex, follow` hub that
 * lists the pilots (it is in no sitemap and nothing links to it). hreflang is declared only between the languages
 * whose hub is live.
 * No searchParams or cookie reads: the page is the same for everyone, so the nginx hub-cache block may cache it.
 */
// (the root layout reads headers(); see units/[slug]/page.tsx)
export const dynamic = 'force-dynamic';

interface PageParams { locale: string }

/** the languages whose hub is live, for hreflang */
async function liveHubLocales(): Promise<string[]> {
  const out: string[] = [];
  for (const l of TOPIC_ENABLED_LOCALES) if ((await listedUnits(l)).live) out.push(l);
  return out;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) return {};
  const [listed, ui] = await Promise.all([listedUnits(locale), getUnitUi(locale)]);
  if (!listed.units.length || !ui) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'units'));
  const hubs = listed.live ? await liveHubLocales() : [];
  const languages = hubs.length > 1 ? buildHreflangAlternates(hubs, (l) => canonicalUrl(localePath(l, 'units')), CANONICAL_HOST) : undefined;
  return {
    title: { absolute: ui.hubMetaTitle },
    description: ui.hubMetaDescription,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title: ui.hubMetaTitle, description: ui.hubMetaDescription, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title: ui.hubMetaTitle, description: ui.hubMetaDescription },
    robots: listed.live ? INDEXABLE_ROBOTS : { index: false, follow: true },
  };
}

export default async function UnitsHubRoute({ params }: { params: PageParams }) {
  const { locale } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const [listed, ui] = await Promise.all([listedUnits(locale), getUnitUi(locale)]);
  if (!listed.units.length || !ui) notFound();
  return <UnitsHub locale={locale} ui={ui} units={listed.units} plans={listed.plans} live={listed.live} />;
}
