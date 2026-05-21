import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';

/* Map manifest `alignment.grade` ("K"/"1"/"2"/"3") to the localized
   `seo.educational_level.*` key. Reused across activities of all engines. */
const GRADE_KEY_MAP: Record<string, string> = {
  'K': 'kindergarten',
  '1': 'grade_1',
  '2': 'grade_2',
  '3': 'grade_3',
};
import {
  resolveActivitySlug,
  listActivitySitemapEntries,
  hreflangAlternatesForRow,
  ActivityRow,
} from '@/lib/activities';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { ActivityIframe } from '@/components/activities/ActivityIframe';

// "Activities" section label per locale — used for the middle breadcrumb
// crumb on individual activity landing pages. Same string as the title of
// /<locale>/activities/. Inlined here (not next-intl) since it's read by
// one consumer; promote to a message file when a second consumer appears.
const ACTIVITIES_SECTION_LABEL: Record<string, string> = {
  en: 'Activities',
  de: 'Aufgaben',
  es: 'Actividades',
  fr: 'Activités',
  it: 'Attività',
  pt: 'Atividades',
  nl: 'Activiteiten',
  sv: 'Aktiviteter',
  da: 'Aktiviteter',
  no: 'Aktiviteter',
  fi: 'Tehtävät',
};

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

  /* Teacher-chip grade label: reuse the existing seo.educational_level.*
     table (complete in all 11 locales). The manifest's alignment.grade is
     a literal "K"/"1"/"2"/"3"; lookup the localized phrase via the map.
     Strand + CC code stay English here — strand because CCSS strand names
     are not yet translated in the repo (separate [FIX][I18N] commission);
     code because RF.K.2.B and siblings are CCSS identifiers. */
  const tSeo = await getTranslations({ locale: params.locale, namespace: 'seo' });
  const gradeKey = GRADE_KEY_MAP[row.alignment.grade];
  const localizedGrade = gradeKey
    ? tSeo(`educational_level.${gradeKey}`)
    : `Grade ${row.alignment.grade}`;

  const iframeSrc =
    `/mini-tools/${row.tool}.html` +
    `?activity=${encodeURIComponent(row.id)}` +
    `&lang=${encodeURIComponent(params.locale)}` +
    `&embed=1`;

  const sectionLabel =
    ACTIVITIES_SECTION_LABEL[params.locale] ?? ACTIVITIES_SECTION_LABEL.en;

  return (
    <main className="bg-cream-100 py-2 px-3 md:py-3 md:px-6">
      <article className="mx-auto max-w-5xl">
        <BreadcrumbTrail
          locale={params.locale}
          trail={[
            { href: `/${params.locale}/activities/`, label: sectionLabel },
            { label: row.page_title[params.locale] },
          ]}
        />
        {/* SEO chrome — H1 + intro + standard chip. Very compact so the
            iframe below fits above-the-fold inside the site's global nav
            + footer chrome on viewports down to ~720px tall. */}
        <header className="mb-2 md:mb-3 text-center">
          <h1 className="font-display font-bold text-lg md:text-xl text-teal-800 leading-tight mb-1">
            {row.page_title[params.locale]}
          </h1>
          <p className="hidden lg:block text-xs lg:text-sm text-stone-700 max-w-3xl mx-auto leading-snug mb-1.5">
            {row.page_intro[params.locale]}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">
            <span>{localizedGrade}</span>
            <span className="text-teal-400">·</span>
            <span className="hidden sm:inline">{row.alignment.strand}</span>
            <span className="hidden sm:inline text-teal-400">·</span>
            <span className="font-mono">{row.alignment.code}</span>
          </div>
        </header>

        {/* Activity tool — embedded iframe wrapped in a client component
            that listens for the shell's `lcs-activity-resize` postMessage
            and adjusts iframe height to fit content. Closes the
            "tall card, short content" gap that appeared when a short
            activity (choice-board) shared chrome sized for a tall one
            (ten-frame). Cream backgroundColor matches the tool's inner
            bg so any minor height mismatch looks seamless. */}
        <ActivityIframe src={iframeSrc} title={row.page_title[params.locale]} />

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
