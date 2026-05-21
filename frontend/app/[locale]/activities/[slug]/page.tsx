import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';
import {
  resolveActivitySlug,
  listActivitySitemapEntries,
  hreflangAlternatesForRow,
  ActivityRow,
} from '@/lib/activities';

/**
 * Activity landing page route — one URL per (manifest row × locale).
 *
 * Mirrors the topic-page pattern:
 *   - ISR with revalidate=3600
 *   - generateStaticParams for build-time static generation
 *   - generateMetadata for per-locale title/description/hreflang
 *   - SSR'd content + iframe-embedded mini-tool
 *
 * Common Core code is metadata only — never in the URL slug (native-language
 * slugs across all 11 locales per CLAUDE.md §17.4), never visible to kids.
 * Surfaced in a subtle "Grade K · Counting & Cardinality · K.CC.B.4" chip
 * on the landing page (teacher-facing) and in JSON-LD educationalAlignment
 * for SEO / structured-data search.
 */
export const revalidate = 3600;

const BASE_URL = 'https://www.lessoncraftstudio.com';

interface PageParams {
  locale: string;
  slug: string;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const entries = await listActivitySitemapEntries();
    return entries.map(({ locale, slug }) => ({ locale, slug }));
  } catch (err) {
    console.warn('[activities/[slug]] generateStaticParams failed:', (err as Error).message);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  if (!isTopicLocale(params.locale)) return {};
  const row = await resolveActivitySlug(params.slug, params.locale);
  if (!row) return {};
  const canonical = `${BASE_URL}/${params.locale}/activities/${params.slug}/`;
  return {
    title: row.page_title[params.locale],
    description: row.page_intro[params.locale],
    alternates: {
      canonical,
      languages: hreflangAlternatesForRow(row, BASE_URL),
    },
    openGraph: {
      title: row.page_title[params.locale],
      description: row.page_intro[params.locale],
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: params.locale,
      type: 'article',
    },
    robots: { index: true, follow: true },
  };
}

function jsonLdFor(row: ActivityRow, locale: string): string {
  const canonical = `${BASE_URL}/${locale}/activities/${row.slug[locale]}/`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: row.page_title[locale],
    description: row.page_intro[locale],
    inLanguage: locale,
    learningResourceType: 'Interactive Activity',
    educationalLevel: row.alignment.grade,
    isAccessibleForFree: true,
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: row.alignment.code,
      targetDescription: row.alignment.strand,
      educationalFramework: 'Common Core State Standards',
    },
    url: canonical,
  };
  return JSON.stringify(data);
}

export default async function ActivityPage({ params }: { params: PageParams }) {
  if (!isTopicLocale(params.locale)) notFound();
  const row = await resolveActivitySlug(params.slug, params.locale);
  if (!row) notFound();

  const iframeSrc =
    `/mini-tools/${row.tool}.html` +
    `?activity=${encodeURIComponent(row.id)}` +
    `&lang=${encodeURIComponent(params.locale)}` +
    `&embed=1`;

  return (
    <main className="min-h-screen bg-cream-100 py-8 px-4 md:py-12 md:px-6">
      <article className="mx-auto max-w-5xl">
        {/* SEO chrome — H1 + intro + standard chip. Teacher-facing surface. */}
        <header className="mb-6 md:mb-8 text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-teal-800 leading-tight mb-3">
            {row.page_title[params.locale]}
          </h1>
          <p className="text-base md:text-lg text-stone-700 max-w-3xl mx-auto leading-relaxed mb-4">
            {row.page_intro[params.locale]}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-800 text-sm font-semibold">
            <span>Grade {row.alignment.grade}</span>
            <span className="text-teal-400">·</span>
            <span>{row.alignment.strand}</span>
            <span className="text-teal-400">·</span>
            <span className="font-mono">{row.alignment.code}</span>
          </div>
        </header>

        {/* Activity tool — embedded iframe. Aspect ratio + responsive sizing
            give the tool dominant screen presence (IXL clarity). */}
        <div
          className="rounded-3xl overflow-hidden shadow-xl bg-white"
          style={{
            aspectRatio: '4 / 3',
            maxHeight: 'min(80vh, 700px)',
          }}
        >
          <iframe
            src={iframeSrc}
            title={row.page_title[params.locale]}
            loading="lazy"
            allow="fullscreen; autoplay"
            style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          />
        </div>

        {/* JSON-LD structured data for SEO — educationalAlignment carries the
            CC code so teacher searches like "K.CC.B.4 activity" can find this. */}
        <Script
          type="application/ld+json"
          id={`activity-jsonld-${row.id}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: jsonLdFor(row, params.locale) }}
        />
      </article>
    </main>
  );
}
