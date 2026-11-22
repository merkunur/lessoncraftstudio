import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { READER_HUB_LOCALES, getReaderHubs, getReaderUi, readerThumb } from '@/lib/readers';
import ReadersHub from '@/components/readers/ReadersHub';

/**
 * The readers hub: /<locale>/readers (Daily Teaching System, Part 8.2). The decodable readers by phonics set and the
 * picture readers by level, with how to print, fold and use a mini-book. English only: every other language, and a
 * language without a book whose mini-book page is live, answers 404. hreflang declares the languages whose hub
 * exists (today English alone, with x-default = English).
 * No searchParams or cookie reads: the page is the same for everyone.
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string }

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale } = params;
  const [hubs, ui] = await Promise.all([getReaderHubs(locale), getReaderUi(locale)]);
  // (a missing page answers 404 through notFound() below; noindex keeps the 404 shell out of any index)
  if (!hubs || !ui) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'readers'));
  const languages = buildHreflangAlternates(READER_HUB_LOCALES, (l) => canonicalUrl(localePath(l, 'readers')), CANONICAL_HOST);
  const first = hubs.sets[0]?.books[0] ?? hubs.levels[0]?.books[0];
  const { metaTitle, metaDescription } = hubs.index;
  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    alternates: { canonical: url, languages },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      type: 'website',
      ...(first ? { images: [{ url: readerThumb(locale, first.pages.book), width: 480, height: 620, alt: first.title }] } : {}),
    },
    twitter: { card: 'summary', title: metaTitle, description: metaDescription },
    robots: INDEXABLE_ROBOTS,
  };
}

export default async function ReadersHubRoute({ params }: { params: PageParams }) {
  const { locale } = params;
  const [hubs, ui] = await Promise.all([getReaderHubs(locale), getReaderUi(locale)]);
  if (!hubs || !ui) notFound();
  setRequestLocale(locale);
  return <ReadersHub locale={locale} hubs={hubs} ui={ui} />;
}
