import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getAssessmentUi, listedChecks } from '@/lib/assessments';
import { listedUnits } from '@/lib/units';
import AssessmentsHub from '@/components/assessments/AssessmentsHub';

/**
 * The assessments hub: /<locale>/assessments (Daily Teaching System, Part 7.4). Every unit check of the language by
 * grade and subject, each with what it covers and a link to its unit. A language has the page when it has live
 * checks; hreflang is declared only between the languages whose hub exists.
 * No searchParams or cookie reads: the page is the same for everyone.
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string }

/** the languages that have an assessments hub, for hreflang */
async function liveHubs(): Promise<string[]> {
  const out: string[] = [];
  for (const l of TOPIC_ENABLED_LOCALES) if ((await listedChecks(l)).length && (await getAssessmentUi(l))?.hubTitle) out.push(l);
  return out;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) return {};
  const [checks, ui] = await Promise.all([listedChecks(locale), getAssessmentUi(locale)]);
  if (!checks.length || !ui?.hubTitle) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'assessments'));
  const hubs = await liveHubs();
  const languages = hubs.length > 1 ? buildHreflangAlternates(hubs, (l) => canonicalUrl(localePath(l, 'assessments')), CANONICAL_HOST) : undefined;
  return {
    title: { absolute: ui.hubMetaTitle },
    description: ui.hubMetaDescription,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title: ui.hubMetaTitle, description: ui.hubMetaDescription, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title: ui.hubMetaTitle, description: ui.hubMetaDescription },
    robots: INDEXABLE_ROBOTS,
  };
}

export default async function AssessmentsHubRoute({ params }: { params: PageParams }) {
  const { locale } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const [checks, ui, listed] = await Promise.all([listedChecks(locale), getAssessmentUi(locale), listedUnits(locale)]);
  if (!checks.length || !ui?.hubTitle) notFound();
  return <AssessmentsHub locale={locale} ui={ui} checks={checks} units={listed.units} plans={listed.plans} />;
}
