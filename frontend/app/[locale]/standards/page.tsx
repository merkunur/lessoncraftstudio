import { Metadata } from 'next';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import { localizeStrand } from '@/lib/seo/strand-names';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { codeUrlSegment, listAllCodes } from '@/lib/standards';

/**
 * Curriculum-standards INDEX — `/[locale]/standards/`.
 *
 * WHY (2026-07-31 SEO audit). The per-code pages at /[locale]/standards/[code]
 * are 1,562 URLs across 11 locales, all in sitemap shard 3 — and measured
 * inbound internal links were: `/en` 0, `/en/worksheets` 0, `/en/topic/addition`
 * 0, `/en/worksheet-makers` 0, a tier-3 landing 0, an activity page 1. There was
 * no index page at all: `/en/standards` returned 404, and the locale-less
 * `/standards` 307'd straight into that 404. So the whole class was effectively
 * sitemap-only — discoverable but unlinked, which on a crash-recovering domain is
 * the weakest possible position.
 *
 * COPY POLICY: this page authors NO new prose. Every string is an existing
 * localized atom — `standardsPage.standardsBreadcrumb`, the per-locale framework
 * NAME (§20.10 / §A.13.49), `seo.educational_level.*` for the grade headings, and
 * `localizeStrand()` for the strand headings. Inventing hub copy would need the
 * §21.3 native-expert ensemble per locale; an index page needs links, not
 * marketing, so it is built from atoms instead.
 *
 * Grade ordering is K → 1 → 2 → 3, matching the ladder used everywhere else.
 */

export const revalidate = 3600;

const GRADE_ORDER = ['K', '1', '2', '3'];
const GRADE_KEY_MAP: Record<string, string> = {
  K: 'kindergarten',
  '1': 'grade_1',
  '2': 'grade_2',
  '3': 'grade_3',
};

// Per-locale curriculum-framework NAME — same lexicon as the [code] route and the
// activity route (§20.10). EN = Common Core; non-EN cite the national framework.
// The CCSS code itself stays the machine/SEO anchor and is never localized.
const FRAMEWORK_BY_LOCALE: Record<string, string> = {
  en: 'Common Core State Standards', de: 'Lehrplan', fr: 'Programmes officiels',
  es: 'Planes y programas de estudio (SEP)', pt: 'BNCC', it: 'Indicazioni nazionali',
  nl: 'SLO-kerndoelen', sv: 'Lgr22', da: 'Fælles Mål', no: 'LK20', fi: 'OPS 2014',
};

interface PageParams {
  locale: string;
}

export function generateStaticParams(): PageParams[] {
  return TOPIC_ENABLED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'standardsPage' });
  const framework = FRAMEWORK_BY_LOCALE[locale] || FRAMEWORK_BY_LOCALE.en;

  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[getHreflangCode(l)] = canonicalUrl(localePath(l, 'standards'));
  }
  languages['x-default'] = canonicalUrl(localePath('en', 'standards'));

  const url = canonicalUrl(localePath(locale, 'standards'));
  const title = `${t('standardsBreadcrumb')} — ${framework}`;

  return {
    title,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      type: 'website',
      url,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== locale).map(
        (l) => ogLocaleMap[l] || l,
      ),
    },
    robots: INDEXABLE_ROBOTS,
  };
}

export default async function StandardsIndexPage({
  params,
}: {
  params: PageParams;
}) {
  const locale = params.locale || 'en';
  const [codes, t, tSeo, tBreadcrumb] = await Promise.all([
    listAllCodes(),
    getTranslations({ locale, namespace: 'standardsPage' }),
    getTranslations({ locale, namespace: 'seo' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
  ]);

  const framework = FRAMEWORK_BY_LOCALE[locale] || FRAMEWORK_BY_LOCALE.en;

  // Group: grade → localized strand → codes. Any grade outside the K-3 ladder is
  // appended after it rather than dropped, so a future grade cannot go unlinked.
  const byGrade = new Map<string, Map<string, typeof codes>>();
  for (const c of codes) {
    if (!byGrade.has(c.grade)) byGrade.set(c.grade, new Map());
    const strandKey = localizeStrand(c.strand, locale);
    const strands = byGrade.get(c.grade)!;
    if (!strands.has(strandKey)) strands.set(strandKey, []);
    strands.get(strandKey)!.push(c);
  }
  const grades = [
    ...GRADE_ORDER.filter((g) => byGrade.has(g)),
    ...Array.from(byGrade.keys()).filter((g) => !GRADE_ORDER.includes(g)),
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: t('standardsBreadcrumb'), path: localePath(locale, 'standards') },
  ] as BreadcrumbCrumb[]);

  // ItemList JSON-LD: makes the index machine-readable as a collection of the
  // per-code pages, mirroring the visible link list exactly.
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: codes.length,
    itemListElement: codes.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.code,
      url: `${CANONICAL_HOST}${localePath(locale, 'standards', codeUrlSegment(c.code))}`,
    })),
  };

  return (
    <main className="bg-cream-100 min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <article className="mx-auto max-w-5xl">
        <BreadcrumbTrail
          locale={locale}
          trail={[{ label: t('standardsBreadcrumb') }]}
        />
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-teal-800 leading-tight mb-3">
            {t('standardsBreadcrumb')}
          </h1>
          <p className="text-sm md:text-base text-stone-700 max-w-2xl mx-auto leading-relaxed">
            {framework}
          </p>
        </header>

        {grades.map((grade) => {
          const gradeKey = GRADE_KEY_MAP[grade];
          const localizedGrade = gradeKey
            ? tSeo(`educational_level.${gradeKey}`)
            : `${t('gradeLabel')} ${grade}`;
          const strands = byGrade.get(grade)!;
          return (
            <section key={grade} className="mb-10 md:mb-14">
              <h2 className="font-display font-bold text-xl md:text-2xl text-teal-800 mb-4">
                {localizedGrade}
              </h2>
              {Array.from(strands.entries()).map(([strand, list]) => (
                <div key={strand} className="mb-6">
                  <h3 className="font-display font-semibold text-base md:text-lg text-stone-700 mb-3">
                    {strand}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {list.map((c) => (
                      <li key={c.code}>
                        <Link
                          href={`/${locale}/standards/${codeUrlSegment(c.code)}`}
                          className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-3 py-1.5 text-sm text-teal-800 hover:bg-cream-200 transition-colors"
                        >
                          <span className="font-mono font-medium">{c.code}</span>
                          <span className="text-teal-500 text-xs">
                            {c.activityCount}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}
      </article>
    </main>
  );
}
