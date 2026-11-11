import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getUnit, getUnitUi, unitSiblings } from '@/lib/units';
import UnitPage from '@/components/units/UnitPage';

/**
 * A unit: /<locale>/units/<native-slug> (Daily Teaching System, Parts 3 and 4). A 2–4 week block of lessons for one
 * grade and subject, assembled from the content graph (scripts/units/assemble.js).
 *
 * A unit with status 'pilot' is a format preview: `noindex, follow`, in no sitemap, linked from nowhere.
 * No searchParams or cookie reads: the page is the same for everyone (the Teacher-only files are links to the gate),
 * so the nginx hub-cache block may cache it.
 */
// The root layout reads headers(), so an on-demand static page dies with "Page changed from static to dynamic" (HTTP 500
// in production only). Same ruling as /worksheets/[slug] and /worksheet-makers/[slug].
export const dynamic = 'force-dynamic';

interface PageParams { locale: string; slug: string }

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) return {};
  const unit = await getUnit(locale, slug);
  // (a missing unit answers 404 through notFound() below; noindex here keeps the 404 shell out of any index)
  if (!unit) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'units', slug));
  const live = unit.status === 'live';
  const siblings = live ? await unitSiblings(unit.id, TOPIC_ENABLED_LOCALES) : {};
  // hreflang only between real siblings (the same unit, live, in another language); x-default only with an English one
  const languages = Object.keys(siblings).length > 1
    ? buildHreflangAlternates(Object.keys(siblings), (l) => canonicalUrl(localePath(l, 'units', siblings[l])), CANONICAL_HOST)
    : undefined;
  return {
    title: { absolute: unit.metaTitle },
    description: unit.metaDescription,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title: unit.metaTitle, description: unit.metaDescription, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title: unit.metaTitle, description: unit.metaDescription },
    robots: live ? INDEXABLE_ROBOTS : { index: false, follow: true },
  };
}

export default async function UnitRoute({ params }: { params: PageParams }) {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const [unit, ui] = await Promise.all([getUnit(locale, slug), getUnitUi(locale)]);
  if (!unit || !ui) notFound();
  return <UnitPage locale={locale} unit={unit} ui={ui} />;
}
