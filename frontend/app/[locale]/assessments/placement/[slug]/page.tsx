import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { PLACEMENT_LOCALES, getAssessmentUi, getPlacement } from '@/lib/assessments';
import { listedUnits } from '@/lib/units';
import PlacementPage from '@/components/assessments/PlacementPage';

/**
 * /<locale>/assessments/placement/<slug> (Daily Teaching System, Part 7.8, Stage C-3): one placement check of a skill path,
 * English only. The page shows the check only when its status is live (content/assessments/placement.<loc>.json); else it
 * is a 404, so building a check never publishes it. hreflang: English and x-default only.
 * No searchParams or cookie reads: the page is the same for everyone.
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string; slug: string }
const placementLocale = (l: string) => (PLACEMENT_LOCALES as readonly string[]).includes(l);

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = params;
  if (!placementLocale(locale)) return { robots: { index: false, follow: false } };
  const [check, ui] = await Promise.all([getPlacement(locale, slug), getAssessmentUi(locale)]);
  if (!check || !ui?.[`placeMetaTitle_${check.path}`]) return { robots: { index: false, follow: false } };
  const title = ui[`placeMetaTitle_${check.path}`];
  const description = ui[`placeMeta_${check.path}`];
  const url = canonicalUrl(localePath(locale, 'assessments', 'placement', slug));
  const languages = buildHreflangAlternates([locale], (l) => canonicalUrl(localePath(l, 'assessments', 'placement', slug)), CANONICAL_HOST);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages },
    openGraph: { title, description, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title, description },
    robots: INDEXABLE_ROBOTS,
  };
}

export default async function PlacementRoute({ params }: { params: PageParams }) {
  const { locale, slug } = params;
  if (!placementLocale(locale)) notFound();
  setRequestLocale(locale);
  const [check, ui, listed] = await Promise.all([getPlacement(locale, slug), getAssessmentUi(locale), listedUnits(locale)]);
  if (!check || !ui?.[`placeMetaTitle_${check.path}`]) notFound();
  return <PlacementPage locale={locale} ui={ui} check={check} units={listed.units} />;
}
