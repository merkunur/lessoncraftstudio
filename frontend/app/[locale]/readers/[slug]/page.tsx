import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { ogLocaleMap } from '@/lib/schema-generator';
import { READER_HUB_LOCALES, findReaderGroup, getReaderHubs, getReaderUi, readerThumb } from '@/lib/readers';
import ReaderGroupPage from '@/components/readers/ReaderGroupPage';

/**
 * /<locale>/readers/set-<n> (the decodable readers of one phonics set) and /<locale>/readers/level-<a|b|c> (the
 * picture readers about one level). Daily Teaching System, Part 8.2.
 *
 * A set or level has its page only when it holds at least three books with a live mini-book page (`hasPage` in
 * content/readers/hubs.<loc>.json, scripts/readers/build-hubs.js); every other address under /readers answers 404,
 * as does every language but English. hreflang declares the languages that have the same page (today English alone,
 * with x-default = English).
 * No searchParams or cookie reads: the page is the same for everyone.
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units/[slug]).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string; slug: string }

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = params;
  const [hubs, ui] = await Promise.all([getReaderHubs(locale), getReaderUi(locale)]);
  const group = hubs && ui ? findReaderGroup(hubs, slug) : null;
  if (!group) return { robots: { index: false, follow: false } };
  const page = group.kind === 'set' ? group.set : group.level;
  const url = canonicalUrl(localePath(locale, 'readers', page.slug));
  const languages = buildHreflangAlternates(READER_HUB_LOCALES, (l) => canonicalUrl(localePath(l, 'readers', page.slug)), CANONICAL_HOST);
  const first = page.books[0];
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url, languages },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      type: 'website',
      ...(first ? { images: [{ url: readerThumb(locale, first.pages.book), width: 480, height: 620, alt: first.title }] } : {}),
    },
    twitter: { card: 'summary', title: page.metaTitle, description: page.metaDescription },
    robots: INDEXABLE_ROBOTS,
  };
}

export default async function ReaderGroupRoute({ params }: { params: PageParams }) {
  const { locale, slug } = params;
  const [hubs, ui] = await Promise.all([getReaderHubs(locale), getReaderUi(locale)]);
  const group = hubs && ui ? findReaderGroup(hubs, slug) : null;
  if (!hubs || !ui || !group) notFound();
  setRequestLocale(locale);
  return <ReaderGroupPage locale={locale} hubs={hubs} group={group} ui={ui} />;
}
