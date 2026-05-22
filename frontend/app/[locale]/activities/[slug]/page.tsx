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

  // v7.5 cache buster: bump on any mini tools/*-activity.html change so
  // browsers fetch fresh wrapper HTML on every navigation. Defends
  // against iOS Safari + Android WebView page-cache/bfcache quirks that
  // can ignore upstream Cache-Control: max-age=0 under back-forward
  // restoration. Same discipline as §A.13.42 lcs-shell.css?v=N bump
  // applied here to the iframe-loaded wrapper URL (the only un-busted
  // link in the activity-page → mini-tool chain). The wrapper reads
  // only `activity` / `lang` / `embed` params; `v` is harmless to it.
  const ACTIVITY_WRAPPER_VERSION = '7.9';

  const iframeSrc =
    `/mini-tools/${row.tool}.html?v=${ACTIVITY_WRAPPER_VERSION}` +
    `&activity=${encodeURIComponent(row.id)}` +
    `&lang=${encodeURIComponent(params.locale)}` +
    `&embed=1`;

  const sectionLabel =
    ACTIVITIES_SECTION_LABEL[params.locale] ?? ACTIVITIES_SECTION_LABEL.en;

  // v7 cascade (post-K.NBT.A.1 prototype approval): all activities render
  // the operator-locked sage-field layout. The v6.x prototype gate
  // (`isTenFramePrototype` check on alignment.code) was removed once the
  // design was approved. Card height = 2/3 of viewport via the inline
  // <style> below + the iframe-side rules now in lcs-shell.css scoped to
  // .lcs-app.activity. Engine-specific cell/tile scaling stays per-wrapper.
  return (
    <main className="bg-cream-50 pt-4 pb-4 px-4 md:pt-6 md:pb-6 md:px-8 lg:pt-8">
      <article className="mx-auto">
        <BreadcrumbTrail
          locale={params.locale}
          trail={[
            { href: `/${params.locale}/activities/`, label: sectionLabel },
            { label: row.page_title[params.locale] },
          ]}
        />
        <section
          className="lcs-prototype-play-area relative overflow-hidden mt-3 md:mt-4 rounded-2xl md:rounded-3xl bg-[#DBE7DF] px-4 pt-5 pb-12 md:px-8 md:pt-7 md:pb-16 shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_28px_64px_rgba(20,30,28,0.12)]"
          aria-label={row.page_title[params.locale]}
        >
          {/* Adult chrome — tightened, sits ON the sage field. Header
              feels integrated with the play area rather than stacked
              above it. */}
          <header className="relative z-10 mb-4 md:mb-5 text-center">
            <h1 className="font-display font-semibold text-base md:text-lg text-teal-800 leading-tight mb-0.5">
              {row.page_title[params.locale]}
            </h1>
            <p className="hidden lg:block text-xs text-ink-600/70 max-w-2xl mx-auto leading-snug mb-2">
              {row.page_intro[params.locale]}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cream-100/80 text-teal-800 text-xs font-medium backdrop-blur-sm">
              <span>{localizedGrade}</span>
              <span className="text-teal-800/40">·</span>
              <span className="hidden sm:inline">{row.alignment.strand}</span>
              <span className="hidden sm:inline text-teal-800/40">·</span>
              <span className="font-mono">{row.alignment.code}</span>
            </div>
          </header>

          {/* v7.8 — universal min-height 66.67vh floor; no rigid height
              lock. ActivityIframe's postMessage auto-resize (§20.3) grows
              the iframe when card content exceeds 66.67vh (fixes v7.7
              desktop overlap of engine content into Check button area).
              Mobile keeps the v7.5 85vh floor for better content
              breathing room on small phones. */}
          <style dangerouslySetInnerHTML={{ __html:
            '.lcs-prototype-iframe-wrapper iframe { min-height: 66.67vh !important; }' +
            '@media (max-width: 767px) { .lcs-prototype-iframe-wrapper iframe { min-height: 85vh !important; } }'
          }} />
          <div className="lcs-prototype-iframe-wrapper relative z-10">
            <ActivityIframe src={iframeSrc} title={row.page_title[params.locale]} />
          </div>

          {/* Soft cream wave at the base of the field — gentle "foam"
              that gives the field life without becoming a graphic.
              Absolutely positioned over the field's bottom padding;
              pointer-events:none so it never blocks the iframe. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 right-0 w-full h-[60px] md:h-[72px] pointer-events-none"
          >
            <path
              d="M0,50 C200,15 380,75 600,40 C820,5 1000,70 1200,35 L1200,80 L0,80 Z"
              fill="#FCFAF4"
              opacity="0.62"
            />
            <path
              d="M0,60 C220,30 420,80 640,52 C860,24 1040,76 1200,50 L1200,80 L0,80 Z"
              fill="#FCFAF4"
              opacity="0.45"
            />
          </svg>
        </section>

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
