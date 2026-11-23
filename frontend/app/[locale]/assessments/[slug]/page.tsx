import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { YEAR_LOCALES, getAssessmentUi, getYearPage } from '@/lib/assessments';
import { listedUnits, fill } from '@/lib/units';
import YearChecksPage from '@/components/assessments/YearChecksPage';

/**
 * /<locale>/assessments/<slug> (Daily Teaching System, Part 7.7, Stage C-2): the checks of the year of one grade and
 * subject (beginning, middle and end of the year), English only. The page shows only checks whose status is live
 * (content/assessments/year.<loc>.json); with none live it is a 404, so building a check never publishes it. Any other
 * language: 404. hreflang: English and x-default only (no other language has these checks yet).
 * No searchParams or cookie reads: the page is the same for everyone.
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string; slug: string }

const yearLocale = (l: string) => (YEAR_LOCALES as readonly string[]).includes(l);

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = params;
  if (!yearLocale(locale)) return { robots: { index: false, follow: false } };
  const [page, ui] = await Promise.all([getYearPage(locale, slug), getAssessmentUi(locale)]);
  if (!page || !ui?.yearPageMetaTitle) return { robots: { index: false, follow: false } };
  const words = { grade: ui[`yearGrade_${page.grade}`], subject: ui[`yearSubject_${page.subject}`] };
  const title = fill(ui.yearPageMetaTitle, words);
  const description = ui[`yearMeta_${page.grade}_${page.subject}`];
  const url = canonicalUrl(localePath(locale, 'assessments', slug));
  const languages = buildHreflangAlternates([locale], (l) => canonicalUrl(localePath(l, 'assessments', slug)), CANONICAL_HOST);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages },
    openGraph: { title, description, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title, description },
    robots: INDEXABLE_ROBOTS,
  };
}

export default async function YearChecksRoute({ params }: { params: PageParams }) {
  const { locale, slug } = params;
  if (!yearLocale(locale)) notFound();
  setRequestLocale(locale);
  const [page, ui, listed] = await Promise.all([getYearPage(locale, slug), getAssessmentUi(locale), listedUnits(locale)]);
  if (!page || !ui?.yearPageMetaTitle) notFound();
  return <YearChecksPage locale={locale} ui={ui} page={page} units={listed.units} />;
}
