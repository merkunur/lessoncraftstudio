import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getCurriculumUi, listedCurriculumPages } from '@/lib/curriculum-pages';
import CurriculumHub from '@/components/curriculum/CurriculumHub';

/**
 * The curriculum hub: /<locale>/curriculum (Daily Teaching System, Part 6). Every curriculum page of the language by
 * framework, subject and grade. A language with live pages has an indexable hub; a language whose pages are all
 * pilots has a noindex hub that lists the pilots (it is in no sitemap and nothing links to it). hreflang is declared
 * only between the languages whose hub is live.
 * No searchParams or cookie reads: the page is the same for everyone.
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string }

/** the languages whose hub is live, for hreflang */
async function liveHubs(): Promise<string[]> {
  const out: string[] = [];
  for (const l of TOPIC_ENABLED_LOCALES) if ((await listedCurriculumPages(l)).live) out.push(l);
  return out;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) return {};
  const [listed, ui] = await Promise.all([listedCurriculumPages(locale), getCurriculumUi(locale)]);
  if (!listed.pages.length || !ui) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'curriculum'));
  const hubs = listed.live ? await liveHubs() : [];
  const languages = hubs.length > 1 ? buildHreflangAlternates(hubs, (l) => canonicalUrl(localePath(l, 'curriculum')), CANONICAL_HOST) : undefined;
  return {
    title: { absolute: ui.hubMetaTitle },
    description: ui.hubMetaDescription,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title: ui.hubMetaTitle, description: ui.hubMetaDescription, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title: ui.hubMetaTitle, description: ui.hubMetaDescription },
    robots: listed.live ? INDEXABLE_ROBOTS : { index: false, follow: true },
  };
}

export default async function CurriculumHubRoute({ params }: { params: PageParams }) {
  const { locale } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const [listed, ui] = await Promise.all([listedCurriculumPages(locale), getCurriculumUi(locale)]);
  if (!listed.pages.length || !ui) notFound();
  return <CurriculumHub locale={locale} ui={ui} pages={listed.pages} live={listed.live} />;
}
