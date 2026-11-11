import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getSchoolsUi } from '@/lib/schools';
import { listedCurriculumPages } from '@/lib/curriculum-pages';
import { listedUnits } from '@/lib/units';
import { listedSubPacks } from '@/lib/sub-plans';
import SchoolsPage from '@/components/schools/SchoolsPage';

/**
 * The "For schools" page: /<locale>/schools (Daily Teaching System, Part 6; PLAN §11 ruling 6). What a school buys
 * and a quote request that reaches the operator by email. A language has the page when it has the strings
 * (content/schools/ui.<loc>.json, status "live" = indexable, anything else = noindex); every other language is 404.
 * No searchParams or cookie reads: the page is the same for everyone.
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string }

/** the languages whose page is live, for hreflang */
async function livePages(): Promise<string[]> {
  const out: string[] = [];
  for (const l of TOPIC_ENABLED_LOCALES) { const ui = await getSchoolsUi(l); if (ui && ui.status === 'live') out.push(l); }
  return out;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) return {};
  const ui = await getSchoolsUi(locale);
  if (!ui) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'schools'));
  const live = ui.status === 'live';
  const pages = live ? await livePages() : [];
  const languages = pages.length > 1 ? buildHreflangAlternates(pages, (l) => canonicalUrl(localePath(l, 'schools')), CANONICAL_HOST) : undefined;
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title: ui.metaTitle, description: ui.metaDescription, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title: ui.metaTitle, description: ui.metaDescription },
    robots: live ? INDEXABLE_ROBOTS : { index: false, follow: true },
  };
}

export default async function SchoolsRoute({ params }: { params: PageParams }) {
  const { locale } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const ui = await getSchoolsUi(locale);
  if (!ui) notFound();
  const [checklists, units, subs] = await Promise.all([listedCurriculumPages(locale), listedUnits(locale), listedSubPacks(locale)]);
  return <SchoolsPage locale={locale} ui={ui} has={{ checklists: checklists.live, units: units.live, subs: subs.live }} />;
}
