import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getHreflangCode,
  ogLocaleMap,
  generateFAQSchema,
  localizedHomeLabel,
  generateLearningResourceSchema,
  generateEducationalAudienceSchema,
  generateThemeWebPageSchema,
} from '@/lib/schema-generator';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import { getThemeIdFromSlug, getThemeSlug } from '@/config/theme-slugs';
import {
  GRADE_IDS,
  getGradeIdFromSlug,
  getGradeSlug,
  getGradeDisplayName,
  getGradeFilteredApps,
  gradeAgeRanges,
} from '@/config/grade-slugs';
import { getThemePreviewImages, getAppThumbnailMap, getLocalizedAppDisplayName } from '@/lib/theme-images';
import { getRelatedBlogPostsForTheme } from '@/lib/blog-data';
import RelatedBlogPosts from '@/components/product-page/RelatedBlogPosts';
import {
  worksheetsLabel,
  tryNowLabel,
  faqHeading,
  otherGradesLabel,
  otherThemesLabel,
  readMoreLabel,
  viewAllGradeAppsLabel,
} from '@/config/theme-page-labels';
import {
  getThemeContentWithFallback,
  getEnrichedGradeContent,
  isEnrichedContent,
  type ThemePageContent,
} from '@/content/themes/index';
import type { EnrichedThemeContent, GradeId } from '@/content/themes/types';
import { ALL_THEME_IDS } from '@/content/themes/types';
import { getThemeGradeCuratedApps } from '@/config/theme-app-mapping';
import GradeEducationalContent from '@/components/theme-page/GradeEducationalContent';
import ThemeLearningObjectives from '@/components/theme-page/ThemeLearningObjectives';
export const revalidate = 3600;

// ── Static params ─────────────────────────────────────────────────

export function generateStaticParams() {
  const params: { locale: string; theme: string; grade: string }[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const themeId of ALL_THEME_IDS) {
      const themeSlug = getThemeSlug(themeId, locale);
      if (!themeSlug) continue;
      // Enriched content exists for all 50 themes x 11 locales
      for (const gradeId of GRADE_IDS) {
        const gradeSlug = getGradeSlug(gradeId, locale);
        if (gradeSlug) {
          params.push({ locale, theme: themeSlug, grade: gradeSlug });
        }
      }
    }
  }
  return params;
}

// ── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { locale: string; theme: string; grade: string };
}): Promise<Metadata> {
  const locale = params.locale || 'en';
  const themeId = getThemeIdFromSlug(locale, params.theme);
  const gradeId = getGradeIdFromSlug(locale, params.grade);
  const baseUrl = 'https://www.lessoncraftstudio.com';

  const notFoundMeta: Metadata = { title: 'Not Found', robots: { index: false, follow: false } };
  if (!themeId || !gradeId) return notFoundMeta;

  const content = getThemeContentWithFallback(themeId, locale);
  if (!content) return notFoundMeta;

  const gradeName = getGradeDisplayName(gradeId, locale);
  const themeName = content.name;
  const currentThemeSlug = getThemeSlug(themeId, locale) || params.theme;
  const currentGradeSlug = getGradeSlug(gradeId, locale) || params.grade;

  // Check for enriched grade content for better meta description
  const gradeContentMeta = getEnrichedGradeContent(themeId, gradeId, locale);

  // Localized title patterns
  const title = locale === 'en'
    ? `Free ${themeName} Worksheets for ${gradeName} | LessonCraftStudio`
    : `${themeName} ${worksheetsLabel[locale] || 'Worksheets'} ${gradeName} | LessonCraftStudio`;

  // Use grade-specific intro snippet if available
  let description: string;
  if (gradeContentMeta?.intro) {
    const intro = gradeContentMeta.intro;
    const periodIdx = intro.indexOf('.', 140);
    description = periodIdx > 0 && periodIdx < 200 ? intro.slice(0, periodIdx + 1) : intro.slice(0, 160).trim() + '...';
  } else {
    description = locale === 'en'
      ? `Create free printable ${themeName.toLowerCase()}-themed worksheets for ${gradeName}. Age-appropriate math, reading, and puzzle activities. Download and print instantly.`
      : `${themeName} ${worksheetsLabel[locale] || ''} ${gradeName}. ${content.description}`;
  }

  // Build hreflang alternates
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    const tSlug = getThemeSlug(themeId, lang);
    const gSlug = getGradeSlug(gradeId, lang);
    if (tSlug && gSlug) {
      hreflangAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/worksheets/${tSlug}/${gSlug}`;
    }
  }
  const enTSlug = getThemeSlug(themeId, 'en');
  const enGSlug = getGradeSlug(gradeId, 'en');
  if (enTSlug && enGSlug) {
    hreflangAlternates['x-default'] = `${baseUrl}/en/worksheets/${enTSlug}/${enGSlug}`;
  }

  return {
    title,
    description,
    keywords: `${themeName.toLowerCase()} ${gradeName.toLowerCase()} worksheets, ${content.keywords}`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/worksheets/${currentThemeSlug}/${currentGradeSlug}`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/worksheets/${currentThemeSlug}/${currentGradeSlug}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

// ── Page component ────────────────────────────────────────────────

export default async function ThemeGradePage({
  params,
}: {
  params: { locale: string; theme: string; grade: string };
}) {
  const locale = params.locale || 'en';
  const themeId = getThemeIdFromSlug(locale, params.theme);
  const gradeId = getGradeIdFromSlug(locale, params.grade);

  if (!themeId || !gradeId) notFound();

  const content = getThemeContentWithFallback(themeId, locale);
  if (!content) notFound();

  const enriched = isEnrichedContent(content);
  const enrichedContent = enriched ? (content as EnrichedThemeContent) : null;

  const themeName = content.name;
  const gradeName = getGradeDisplayName(gradeId, locale);
  const ageRange = gradeAgeRanges[gradeId]?.[locale] ?? gradeAgeRanges[gradeId]?.en ?? '';
  const currentThemeSlug = getThemeSlug(themeId, locale) || params.theme;
  const currentGradeSlug = getGradeSlug(gradeId, locale) || params.grade;
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const pageUrl = `${baseUrl}/${locale}/worksheets/${currentThemeSlug}/${currentGradeSlug}`;

  const gradeContent = getEnrichedGradeContent(themeId, gradeId, locale);

  // Filter apps: enriched themes use curated list, legacy use grade filter
  const filteredAppIds = enriched
    ? getThemeGradeCuratedApps(themeId, gradeId)
    : getGradeFilteredApps(gradeId, (content as ThemePageContent).appIds);

  // Fetch theme preview images, app thumbnails, and related blog posts in parallel
  const [themeImages, thumbnailMap, relatedBlogPosts] = await Promise.all([
    getThemePreviewImages(themeId, 6),
    getAppThumbnailMap(filteredAppIds, locale),
    getRelatedBlogPostsForTheme(themeId, filteredAppIds, locale, 3),
  ]);

  const apps = filteredAppIds.map(appId => {
    const slug = getSlugForLocale(appId, locale as SupportedLocale) || appId;
    return { appId, slug };
  });

  // Build links to other grades for this theme
  const otherGrades = GRADE_IDS
    .filter(gId => gId !== gradeId)
    .map(gId => {
      const gSlug = getGradeSlug(gId, locale);
      const gName = getGradeDisplayName(gId, locale);
      return gSlug ? { id: gId, slug: gSlug, name: gName } : null;
    })
    .filter(Boolean) as Array<{ id: string; slug: string; name: string }>;

  // Build links to related themes for this grade
  const relatedThemeLinks = content.relatedThemes
    .slice(0, 5)
    .map(rtId => {
      const rtContent = getThemeContentWithFallback(rtId, locale);
      const rtSlug = getThemeSlug(rtId, locale);
      if (!rtContent || !rtSlug) return null;
      return { id: rtId, name: rtContent.name, slug: rtSlug };
    })
    .filter(Boolean) as Array<{ id: string; name: string; slug: string }>;

  // Heading
  const heading = locale === 'en'
    ? `Free ${themeName} Worksheets for ${gradeName}`
    : `${themeName} ${worksheetsLabel[locale] || 'Worksheets'} ${gradeName}`;

  // FAQ items: grade-specific if enriched, otherwise parent theme slice
  const faqItems = gradeContent?.faq ?? content.faq.slice(0, 3);

  // JSON-LD schemas
  const faqSchema = generateFAQSchema(faqItems, locale, pageUrl);

  const themeImageUrls = themeImages.map(img => `${baseUrl}${img}`);

  const collectionSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collectionpage`,
    name: heading,
    description: `${themeName} worksheets for ${gradeName} (${ageRange})`,
    url: pageUrl,
    inLanguage: getHreflangCode(locale),
    audience: gradeContent
      ? generateEducationalAudienceSchema(gradeId, gradeName)
      : {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
          suggestedAge: ageRange,
        },
    isPartOf: {
      '@type': 'WebSite',
      name: 'LessonCraftStudio',
      url: baseUrl,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      '@id': `${baseUrl}/#organization`,
    },
    about: {
      '@type': 'Thing',
      name: themeName,
    },
  };

  if (apps.length > 0) {
    collectionSchema.hasPart = apps.map((app, i) => ({
      '@type': 'SoftwareApplication',
      name: getLocalizedAppDisplayName(app.appId, locale),
      url: `${baseUrl}/${locale}/apps/${app.slug}`,
      position: i + 1,
      applicationCategory: 'EducationalApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }));
  }

  if (themeImageUrls.length > 0) {
    collectionSchema.image = themeImageUrls;
    collectionSchema.thumbnailUrl = themeImageUrls[0];
  }

  // Filter curriculum alignment to grade-relevant apps (overlap with filteredAppIds)
  const gradeCurriculumAlignment = enrichedContent?.curriculumAlignment
    ?.filter((ca) => ca.relatedAppIds.some((id) => filteredAppIds.includes(id)))
    .map((ca) => ({ standard: ca.standard, framework: ca.framework, description: ca.description }));

  // LearningResource schema (enriched only)
  const learningResourceSchema = gradeContent
    ? generateLearningResourceSchema({
        name: heading,
        description: gradeContent.intro.slice(0, 200),
        url: pageUrl,
        locale,
        gradeId,
        gradeName,
        objectives: gradeContent.objectives,
        appEntries: apps.map((app) => ({
          name: getLocalizedAppDisplayName(app.appId, locale),
          url: `${baseUrl}/${locale}/apps/${app.slug}`,
        })),
        imageUrls: themeImageUrls.length > 0 ? themeImageUrls : undefined,
        curriculumAlignment: gradeCurriculumAlignment?.length ? gradeCurriculumAlignment : undefined,
      })
    : null;

  // WebPage schema with E-A-T signals
  const webPageSchema = generateThemeWebPageSchema({
    pageName: heading,
    pageDescription: `${themeName} worksheets for ${gradeName} (${ageRange})`,
    pageUrl,
    locale,
    mainEntityId: learningResourceSchema ? `${pageUrl}#learningresource` : `${pageUrl}#collectionpage`,
  });

  // Hero intro: truncated for enriched, full for legacy
  let heroIntro: string;
  let heroHasReadMore = false;
  if (gradeContent?.intro) {
    // First ~2 sentences
    const text = gradeContent.intro;
    const secondPeriod = text.indexOf('.', text.indexOf('.') + 1);
    if (secondPeriod > 0 && secondPeriod < 300) {
      heroIntro = text.slice(0, secondPeriod + 1);
    } else {
      const firstPeriod = text.indexOf('.');
      heroIntro = firstPeriod > 0 ? text.slice(0, firstPeriod + 1) : text.slice(0, 200) + '...';
    }
    heroHasReadMore = true;
  } else {
    heroIntro = content.intro;
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: localizedHomeLabel[locale] || 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: worksheetsLabel[locale] || 'Worksheets',
        item: `${baseUrl}/${locale}/worksheets`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: themeName,
        item: `${baseUrl}/${locale}/worksheets/${currentThemeSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: gradeName,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {learningResourceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-600 to-teal-700 text-white py-14">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="text-teal-200 text-sm mb-4" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-white">
              {localizedHomeLabel[locale] || 'Home'}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/worksheets`} className="hover:text-white">
              {worksheetsLabel[locale] || 'Worksheets'}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/${locale}/worksheets/${currentThemeSlug}`}
              className="hover:text-white"
            >
              {themeName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{gradeName}</span>
          </nav>
          <div className={themeImages.length > 0 ? 'md:flex md:items-center md:gap-10' : ''}>
            <div className={themeImages.length > 0 ? 'md:flex-1' : ''}>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{heading}</h1>
              <p className="text-sm text-teal-200 mb-4">{ageRange}</p>
              <p className="text-lg text-teal-100 max-w-3xl leading-relaxed">
                {heroIntro}
                {heroHasReadMore && (
                  <>
                    {' '}
                    <a
                      href="#grade-educational-content"
                      className="inline-flex items-center text-white underline underline-offset-2 hover:text-teal-200 font-medium"
                    >
                      {readMoreLabel[locale] || readMoreLabel.en} &darr;
                    </a>
                  </>
                )}
              </p>
            </div>
            {themeImages.length > 0 && (
              <div className="mt-8 md:mt-0 md:flex-shrink-0">
                <div className="grid grid-cols-3 gap-2 w-fit mx-auto md:mx-0">
                  {themeImages.slice(0, 6).map((src, i) => (
                    <div key={i} className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shadow-lg bg-white/10">
                      <img
                        src={src}
                        alt={`${themeName} clipart ${i + 1}`}
                        width={96}
                        height={96}
                        loading="eager"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* App Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {apps.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {apps.map(app => (
                <Link
                  key={app.appId}
                  href={`/${locale}/apps/${app.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  {thumbnailMap[app.appId] ? (
                    <div className="relative aspect-[3/4] bg-gray-50">
                      <Image
                        src={thumbnailMap[app.appId]}
                        alt={getLocalizedAppDisplayName(app.appId, locale)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center p-4">
                      <span className="text-white text-center font-semibold text-lg">
                        {getLocalizedAppDisplayName(app.appId, locale)}
                      </span>
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {getLocalizedAppDisplayName(app.appId, locale)}
                    </h3>
                    <span className="mt-auto inline-flex items-center text-teal-600 text-sm font-medium">
                      {tryNowLabel[locale] || tryNowLabel.en}
                      <span className="ml-1" aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              {locale === 'en'
                ? 'Explore our full collection of apps for this theme.'
                : content.intro.slice(0, 100) + '...'}
            </p>
          )}
        </div>
      </section>

      {/* Grade Educational Content (enriched only) */}
      {gradeContent && (
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
          <GradeEducationalContent
            gradeIntro={gradeContent.intro}
            developmentalNotes={gradeContent.developmentalNotes}
            teachingTips={gradeContent.teachingTips}
            gradeName={gradeName}
            themeName={themeName}
            locale={locale}
          />
        </div>
      )}

      {/* Learning Objectives (enriched only, single-grade mode) */}
      {gradeContent && enrichedContent && (
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
          <ThemeLearningObjectives
            gradeContent={enrichedContent.gradeContent}
            locale={locale}
            activeGrade={gradeId as GradeId}
          />
        </div>
      )}

      {/* FAQ Section */}
      {faqItems.length > 0 && (
        <section className="py-12 bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {faqHeading[locale] || faqHeading.en}
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="group border border-gray-200 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900">
                    {item.question}
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                      &#9660;
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blog Posts */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
        <RelatedBlogPosts locale={locale as SupportedLocale} posts={relatedBlogPosts} />
      </div>

      {/* Grade Hub Bridge Link */}
      <div className="py-8 text-center" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 100px' }}>
        <Link
          href={`/${locale}/apps/grades/${getGradeSlug(gradeId, locale) || gradeId}`}
          className="inline-flex items-center text-lg font-medium text-teal-600 hover:text-teal-800 hover:underline"
        >
          {(viewAllGradeAppsLabel[locale] || viewAllGradeAppsLabel.en).replace('{gradeName}', gradeName)}
          <span className="ml-2" aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Other Grade Levels */}
      {otherGrades.length > 0 && (
        <section className="py-12" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {otherGradesLabel[locale] || otherGradesLabel.en}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherGrades.map(g => (
                <Link
                  key={g.id}
                  href={`/${locale}/worksheets/${currentThemeSlug}/${g.slug}`}
                  className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Themes for this grade */}
      {relatedThemeLinks.length > 0 && (
        <section className="py-12 bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 300px' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {otherThemesLabel[locale] || otherThemesLabel.en}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {relatedThemeLinks.map(rt => (
                <Link
                  key={rt.id}
                  href={`/${locale}/worksheets/${rt.slug}/${currentGradeSlug}`}
                  className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-colors"
                >
                  {rt.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
