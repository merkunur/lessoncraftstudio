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

  // Prototype gate — single live activity for operator review of the
  // warm-but-restrained redesign (dead-space fix + figure-ground play-area
  // + tightened adult chrome). Locale-agnostic alignment.code is the
  // stable signal. When approved, the cascade commission lifts this branch
  // into a shared component for E2/E7/E8.
  const isTenFramePrototype = row.alignment.code === 'K.NBT.A.1';

  if (isTenFramePrototype) {
    // v2 prototype — visible overhaul per operator's failure-mode review of
    // the first attempt. SOLID warm-sage field (#DBE7DF — ~12% teal blended
    // into cream, not aqua) over a cream-50 page; cream wave at the field's
    // base; card lifts off the field with a dual-shadow + the inner card
    // bg comes from lcs-shell.css (#FBF6EE). Three unambiguous layers:
    // cream-50 page → sage field → cream card. Coral stays RESERVED for
    // accent/celebrate; it does not tint the field.
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

            {/* Iframe wrapper: PARENT-side iframe height = 66.67vh of the
                page viewport (operator-locked: card covers 2/3 of screen
                vertically on every device). Tailwind arbitrary descendant
                selector with !important wins over ActivityIframe's
                inline `style="height: <postMessage>px"`. Inside the
                iframe, ten-frame-activity.html's inline <style> makes
                .lcs-app fill the iframe height (height: 100%), so the
                card ends up at 66.67vh of the parent viewport — exactly
                the operator's target. */}
            <div className="relative z-10 [&_iframe]:!h-[66.67vh]">
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

  // Non-prototype path — preserved byte-identical for all other activities
  // until the cascade commission approves rolling the prototype across them.
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
