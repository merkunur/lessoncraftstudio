import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getPlan, getPlans, getUnit, getUnitUi, unitSiblings } from '@/lib/units';
import UnitPage from '@/components/units/UnitPage';
import UnitPlanPage from '@/components/units/UnitPlanPage';

/**
 * /<locale>/units/<native-slug> (Daily Teaching System, Parts 3 and 4) is one of two pages:
 *
 *   a UNIT        a 1–3 week block of lessons for one grade and subject, assembled from the content graph
 *   a YEAR PLAN   (scope and sequence, Part 4.4) the units of one grade and subject in teaching order
 *
 * Both come from content/units/units.<loc>.json (scripts/units/assemble.js); a slug is unique across the two lists
 * (scripts/units/gates.js). A unit or plan with status 'pilot' is a preview: `noindex, follow`, in no sitemap.
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
  const plan = unit ? null : await getPlan(locale, slug);
  const page = unit ?? plan;
  // (a missing page answers 404 through notFound() below; noindex here keeps the 404 shell out of any index)
  if (!page) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'units', slug));
  const live = page.status === 'live';
  // hreflang only between real siblings (the same unit, live, in another language); x-default only with an English one.
  // A year plan has no sibling: each country orders its own units.
  const siblings = live && unit ? await unitSiblings(unit.id, TOPIC_ENABLED_LOCALES) : {};
  const languages = Object.keys(siblings).length > 1
    ? buildHreflangAlternates(Object.keys(siblings), (l) => canonicalUrl(localePath(l, 'units', siblings[l])), CANONICAL_HOST)
    : undefined;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title: page.metaTitle, description: page.metaDescription },
    robots: live ? INDEXABLE_ROBOTS : { index: false, follow: true },
  };
}

export default async function UnitRoute({ params }: { params: PageParams }) {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const [unit, ui] = await Promise.all([getUnit(locale, slug), getUnitUi(locale)]);
  if (!ui) notFound();
  if (unit) {
    // the unit's year plan, shown on the unit page only when a visitor may follow the link: a live unit links to a
    // live plan; a pilot unit (reached by its address only) links to whatever plan it has
    const plan = (await getPlans(locale)).find((p) => p.units.some((r) => r.id === unit.id) && (unit.status === 'pilot' || p.status === 'live')) ?? null;
    return <UnitPage locale={locale} unit={unit} ui={ui} plan={plan} />;
  }
  const plan = await getPlan(locale, slug);
  if (!plan) notFound();
  return <UnitPlanPage locale={locale} plan={plan} ui={ui} />;
}
