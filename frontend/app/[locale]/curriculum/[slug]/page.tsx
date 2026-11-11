import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getCurriculumPage, getCurriculumUi, listedCurriculumPages } from '@/lib/curriculum-pages';
import { listAllCodes } from '@/lib/standards';
import CurriculumPage from '@/components/curriculum/CurriculumPage';

/**
 * A curriculum page: /<locale>/curriculum/<slug> (Daily Teaching System, Part 6). One framework, one grade, one
 * subject: the objectives by their official codes, with the lessons and worksheets that teach each one
 * (scripts/curriculum-pages/assemble.js).
 *
 * A page with status 'pilot' is a format preview: `noindex, follow`, in no sitemap, linked from nowhere. A page of a
 * country's own framework has no counterpart in another language, so it declares no hreflang.
 * No searchParams or cookie reads: the page is the same for everyone.
 */
// The root layout reads headers(): an on-demand static page is HTTP 500 in production (same ruling as /units/[slug]).
export const dynamic = 'force-dynamic';

interface PageParams { locale: string; slug: string }

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) return {};
  const page = await getCurriculumPage(locale, slug);
  if (!page) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(localePath(locale, 'curriculum', slug));
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url, siteName: 'LessonCraftStudio', locale: ogLocaleMap[locale] || locale, type: 'website' },
    twitter: { card: 'summary', title: page.metaTitle, description: page.metaDescription },
    robots: page.status === 'live' ? INDEXABLE_ROBOTS : { index: false, follow: true },
  };
}

export default async function CurriculumRoute({ params }: { params: PageParams }) {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const [page, ui] = await Promise.all([getCurriculumPage(locale, slug), getCurriculumUi(locale)]);
  if (!page || !ui) notFound();
  // the other pages the hub lists: the grades of the same framework first, then the others
  const listed = await listedCurriculumPages(locale);
  const rest = listed.pages.filter((p) => p.id !== page.id);
  const others = [...rest.filter((p) => p.framework === page.framework), ...rest.filter((p) => p.framework !== page.framework && p.grade === page.grade)];
  // Common Core codes that have a standards hub of their own (the hubs keep their addresses; this page links to them)
  const hubCodes: Record<string, string> = {};
  if (page.framework.startsWith('ccss-')) for (const c of await listAllCodes()) hubCodes[c.code.toLowerCase()] = c.code;
  return <CurriculumPage locale={locale} page={page} ui={ui} others={others} hubCodes={hubCodes} />;
}
