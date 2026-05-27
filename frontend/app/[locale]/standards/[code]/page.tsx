import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import {
  StandardMetadata,
  codeUrlSegment,
  getCodeMetadata,
  hreflangAlternatesForCode,
  listActivitiesByCode,
  listAllCodes,
  relatedCodesInDomain,
} from '@/lib/standards';
import { ActivityRow } from '@/lib/activities';

/**
 * Curriculum-standards landing page — one URL per (CC code × locale).
 *
 * Built per external SEO audit (2026-05-27, third audit): teachers search
 * for Common Core codes directly on Google (e.g., "K.CC.B.4 worksheets",
 * "RF.K.2.B activities"). Each landing page surfaces:
 *   - localized H1 with the code + intent ("Free K.CC.B.4 Activities & Worksheets")
 *   - localized intro paragraph (pedagogy summary using the strand name)
 *   - activity card grid filtered by the code
 *   - sibling-code list ("Related standards in this domain")
 *   - JSON-LD LearningResource with educationalAlignment AlignmentObject
 *
 * Per CLAUDE.md §20.3, CC code is "NEVER in slug" — that applies to
 * ACTIVITY slugs (kid-facing), not standards-discovery URLs (teacher-facing).
 * Standards pages exist precisely so teachers searching for codes have a
 * SEO landing surface. See plan
 * .claude/plans/heading-structure-audit-critical-eager-dongarra.md for full
 * scope rationale.
 */
export const revalidate = 3600;

const BASE_URL = CANONICAL_HOST;

const GRADE_KEY_MAP: Record<string, string> = {
  K: 'kindergarten',
  '1': 'grade_1',
  '2': 'grade_2',
  '3': 'grade_3',
};

interface PageParams {
  locale: string;
  code: string;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const codes = await listAllCodes();
    const out: PageParams[] = [];
    for (const m of codes) {
      for (const loc of TOPIC_ENABLED_LOCALES) {
        out.push({ locale: loc, code: codeUrlSegment(m.code) });
      }
    }
    return out;
  } catch (err) {
    console.warn(
      '[standards/[code]] generateStaticParams failed:',
      (err as Error).message,
    );
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  if (!isTopicLocale(params.locale)) return {};
  const meta = await getCodeMetadata(params.code);
  if (!meta) return {};

  const t = await getTranslations({
    locale: params.locale,
    namespace: 'standardsPage',
  });

  const canonical = canonicalUrl(
    localePath(params.locale, 'standards', codeUrlSegment(meta.code)),
  );

  return {
    title: t('meta.title', { code: meta.code }),
    description: t('meta.description', {
      code: meta.code,
      strand: meta.strand,
    }),
    alternates: {
      canonical,
      languages: hreflangAlternatesForCode(
        meta.code,
        TOPIC_ENABLED_LOCALES,
        BASE_URL,
      ),
    },
    openGraph: {
      title: t('meta.title', { code: meta.code }),
      description: t('meta.description', {
        code: meta.code,
        strand: meta.strand,
      }),
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: params.locale,
      type: 'article',
      images: [
        {
          url: `${CANONICAL_HOST}/og-homepage.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title', { code: meta.code }),
      description: t('meta.description', {
        code: meta.code,
        strand: meta.strand,
      }),
      images: [`${CANONICAL_HOST}/og-homepage.png`],
    },
    robots: { index: true, follow: true },
  };
}

function jsonLdFor(
  meta: StandardMetadata,
  activities: ActivityRow[],
  locale: string,
  title: string,
  description: string,
): string {
  const canonical = canonicalUrl(
    localePath(locale, 'standards', codeUrlSegment(meta.code)),
  );
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description,
    inLanguage: locale,
    learningResourceType: 'Curriculum Standard Landing Page',
    educationalLevel: meta.grade,
    isAccessibleForFree: true,
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: meta.code,
      targetDescription: meta.strand,
      educationalFramework:
        meta.framework === 'CCSS'
          ? 'Common Core State Standards'
          : meta.framework,
    },
    numberOfItems: activities.length,
    url: canonical,
  };
  return JSON.stringify(data);
}

export default async function StandardsPage({
  params,
}: {
  params: PageParams;
}) {
  if (!isTopicLocale(params.locale)) notFound();
  const meta = await getCodeMetadata(params.code);
  if (!meta) notFound();

  const [activities, siblings, t, tSeo] = await Promise.all([
    listActivitiesByCode(meta.code),
    relatedCodesInDomain(meta.code),
    getTranslations({ locale: params.locale, namespace: 'standardsPage' }),
    getTranslations({ locale: params.locale, namespace: 'seo' }),
  ]);

  const gradeKey = GRADE_KEY_MAP[meta.grade];
  const localizedGrade = gradeKey
    ? tSeo(`educational_level.${gradeKey}`)
    : `Grade ${meta.grade}`;

  const pageTitle = t('pageTitle', { code: meta.code });
  const intro = t('intro', {
    code: meta.code,
    strand: meta.strand,
    grade: localizedGrade,
  });

  return (
    <main className="bg-cream-100 min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6">
      <article className="mx-auto max-w-5xl">
        <BreadcrumbTrail
          locale={params.locale}
          trail={[
            {
              href: `/${params.locale}/activities/`,
              label: t('standardsBreadcrumb'),
            },
            { label: meta.code },
          ]}
        />
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-teal-800 leading-tight mb-3">
            {pageTitle}
          </h1>
          <p className="text-sm md:text-base text-stone-700 max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-50 text-teal-800 text-xs font-medium">
            <span>{localizedGrade}</span>
            <span className="text-teal-400">·</span>
            <span>{meta.strand}</span>
            <span className="text-teal-400">·</span>
            <span className="font-mono">{meta.code}</span>
          </div>
        </header>

        <section aria-labelledby="standards-activities-heading">
          <h2
            id="standards-activities-heading"
            className="font-display font-semibold text-xl md:text-2xl text-teal-800 mb-4"
          >
            {t('activitiesHeading')}
          </h2>
          {activities.length === 0 ? (
            <p className="text-sm text-stone-700 mb-10">
              {t('noActivitiesYet')}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
              {activities.map((row) => {
                const title = row.page_title[params.locale];
                const introCard = row.page_intro[params.locale];
                const slug = row.slug[params.locale];
                if (!title || !slug) return null;
                const href = localePath(params.locale, 'activities', slug);
                return (
                  <div
                    key={row.id}
                    className="bg-cream-50 rounded-3xl shadow-md hover:shadow-lg transition-shadow p-5 md:p-6 flex flex-col"
                  >
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2 self-start">
                      <span>
                        {t('gradeLabel')} {row.alignment.grade}
                      </span>
                      <span className="text-teal-400">·</span>
                      <span className="font-mono">{row.alignment.code}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-teal-800 mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-stone-700 leading-relaxed mb-5 flex-grow">
                      {introCard}
                    </p>
                    <Link
                      href={href}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors self-start"
                    >
                      {t('tryItLink')}{' '}
                      <span aria-hidden="true" className="ml-1">
                        →
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {siblings.length > 0 && (
          <section
            aria-labelledby="standards-related-heading"
            className="mt-8"
          >
            <h2
              id="standards-related-heading"
              className="font-display font-semibold text-xl md:text-2xl text-teal-800 mb-4"
            >
              {t('relatedStandardsHeading', { domain: meta.domain })}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {siblings.map((s) => {
                const href = localePath(
                  params.locale,
                  'standards',
                  codeUrlSegment(s.code),
                );
                return (
                  <li key={s.code}>
                    <Link
                      href={href}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-50 hover:bg-teal-50 text-teal-800 text-sm font-mono transition-colors"
                      aria-label={t('relatedCodeLinkAriaLabel', {
                        code: s.code,
                      })}
                    >
                      {s.code}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <Script
          type="application/ld+json"
          id={`standards-jsonld-${meta.code}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: jsonLdFor(
              meta,
              activities,
              params.locale,
              pageTitle,
              intro,
            ),
          }}
        />
      </article>
    </main>
  );
}
