import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { ogLocaleMap } from '@/lib/schema-generator';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import {
  getCopyFile,
  hreflangForLanding,
  landingLocales,
  ogUrl,
  resolveLandingSlug,
} from '@/lib/makers/landings';
import MakerProductPage from '@/components/maker-landing/MakerProductPage';

/**
 * A new worksheet maker's landing page: /<locale>/worksheet-makers/<native-slug> (647 pages). Rendered on demand and
 * cached (ISR): the pages are data-driven and the build must stay light (CLAUDE.md §22, the 30k-landing build incident).
 * No searchParams or cookie reads: the nginx hub-cache block assumes the route stays anonymous and cacheable.
 */
export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

interface PageParams { locale: string; slug: string }

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) return {};
  const id = await resolveLandingSlug(slug, locale);
  if (!id) return {};
  const copy = (await getCopyFile(locale))![id];
  const url = canonicalUrl(localePath(locale, 'worksheet-makers', slug));
  const image = `${CANONICAL_HOST}${ogUrl(id, locale)}`;
  const others = (await landingLocales(id)).filter((l) => l !== locale);
  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: { canonical: url, languages: await hreflangForLanding(id, CANONICAL_HOST) },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: others.map((l) => ogLocaleMap[l] || l),
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, type: 'image/jpeg', alt: copy.kw }],
    },
    twitter: { card: 'summary_large_image', title: copy.metaTitle, description: copy.metaDescription, images: [image] },
    robots: INDEXABLE_ROBOTS,
  };
}

export default async function MakerLandingRoute({ params }: { params: PageParams }) {
  const { locale, slug } = params;
  if (!(TOPIC_ENABLED_LOCALES as readonly string[]).includes(locale)) notFound();
  const id = await resolveLandingSlug(slug, locale);
  if (!id) notFound();
  return <MakerProductPage locale={locale} id={id} slug={slug} />;
}
