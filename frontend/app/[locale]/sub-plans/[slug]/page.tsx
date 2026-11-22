import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { POSITION_ORDER, getSubPack, getSubUi, listedSubPacks, subPackSiblings, weekNeighbours } from '@/lib/sub-plans';
import SubPlanPage from '@/components/sub-plans/SubPlanPage';

/**
 * A sub pack: /<locale>/sub-plans/<native-slug> (Daily Teaching System, Parts 3 and 5). One school day of review for
 * one grade, printable without preparation, assembled from the published catalogue (scripts/sub-plans/assemble.js).
 *
 * A pack with status 'pilot' is a format preview: `noindex, follow`, in no sitemap, linked from nowhere. A week day
 * (Part 5.4: one day for every week of the grade's plans) is `noindex, follow` even when live: 120 near-identical
 * titles would be thin pages for search, so the days of the year stay the search face; it links to the weeks before
 * and after it.
 * No searchParams or cookie reads: the page is the same for everyone (the Teacher-only files are links to the gate).
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units/[slug]).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string; slug: string }

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) return {};
  const pack = await getSubPack(locale, slug);
  if (!pack) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'sub-plans', slug));
  const live = pack.status === 'live';
  const indexable = live && pack.position !== 'week';
  const siblings = indexable ? await subPackSiblings(pack.id, TOPIC_ENABLED_LOCALES) : {};
  const languages = Object.keys(siblings).length > 1
    ? buildHreflangAlternates(Object.keys(siblings), (l) => canonicalUrl(localePath(l, 'sub-plans', siblings[l])), CANONICAL_HOST)
    : undefined;
  return {
    title: { absolute: pack.metaTitle },
    description: pack.metaDescription,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title: pack.metaTitle, description: pack.metaDescription, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title: pack.metaTitle, description: pack.metaDescription },
    robots: indexable ? INDEXABLE_ROBOTS : { index: false, follow: true },
  };
}

export default async function SubPlanRoute({ params }: { params: PageParams }) {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const [pack, ui] = await Promise.all([getSubPack(locale, slug), getSubUi(locale)]);
  if (!pack || !ui) notFound();
  // a week day links to the weeks before and after it; a day of the year to the other days of its grade that the hub
  // lists, in the order of the year
  if (pack.position === 'week') {
    const { prev, next } = await weekNeighbours(locale, pack);
    return <SubPlanPage locale={locale} pack={pack} ui={ui} prev={prev} next={next} />;
  }
  const listed = await listedSubPacks(locale);
  const others = listed.packs
    .filter((p) => p.grade === pack.grade && p.id !== pack.id)
    .sort((a, b) => POSITION_ORDER.indexOf(a.position as (typeof POSITION_ORDER)[number]) - POSITION_ORDER.indexOf(b.position as (typeof POSITION_ORDER)[number]));
  return <SubPlanPage locale={locale} pack={pack} ui={ui} others={others} />;
}
