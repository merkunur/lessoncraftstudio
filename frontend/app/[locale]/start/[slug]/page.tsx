import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getStartConfigBySlug,
  getAllStartPageSlugs,
  getStartAlternateUrls,
  getStartSlugForLocale,
} from '@/config/start-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap, generateFAQSchema, generateVideoSchema, localizedHomeLabel, getHreflangCode, generateShowcaseImageSchemas } from '@/lib/schema-generator';
import { getStartFallbackDescription } from '@/lib/localized-meta-fallback';
import { getStartContent } from '@/config/start-content';
import { getSectionLabel } from '@/config/section-labels';
import { encodeImagePath } from '@/lib/encode-image-path';
import { resolveWpAppIdToSlug } from '@/lib/resolve-app-slug';
import { isValidInternalLink } from '@/lib/resolve-internal-link';
import VideoFacade from '@/app/[locale]/apps/[slug]/VideoFacade';
import ReadMoreText from '@/components/ReadMoreText';
import {
  WorksheetShowcaseSection,
  TieredShowcaseSection,
  SpotlightSection,
  GallerySection,
} from '@/app/[locale]/apps/[slug]/showcase/ShowcaseSections';
import { getPageShowcaseConfig } from '@/config/guide-showcase-configs';
import BuyButton from '@/components/BuyButton';
import { isValidAppId } from '@/config/products';
import type { AppId } from '@/config/products';

const baseUrl = 'https://www.lessoncraftstudio.com';

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllStartPageSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;

    const config = getStartConfigBySlug(slug);
    if (!config) return {};

    const content = await getStartContent(config.startId, locale);
    const alternateUrls = getStartAlternateUrls(config.startId, baseUrl);
    const localeSlug = getStartSlugForLocale(config.startId, locale);

    const title = content?.seo?.titleTag || `${config.startId} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || getStartFallbackDescription(locale);

    const keywords = content?.seo?.primaryKeyword
      ? [content.seo.primaryKeyword, ...(content.seo.secondaryKeywords || []), ...(content.seo.lsiKeywords || [])]
      : undefined;

    // Canonical image: showcase hero first (matching JSON-LD), then content
    const startShowcaseConfig = getPageShowcaseConfig('start', config.startId, locale);
    const canonicalImagePath = startShowcaseConfig?.hero?.images?.[0]?.src
      ? encodeImagePath(startShowcaseConfig.hero.images[0].src)
      : content?.visuals?.heroImage?.src
        ? encodeImagePath(content.visuals.heroImage.src)
        : content?.visuals?.samples?.[0]?.src
          ? encodeImagePath(content.visuals.samples[0].src)
          : null;
    const canonicalImageAlt = startShowcaseConfig?.hero?.images?.[0]?.alt
      || content?.visuals?.heroImage?.alt
      || title;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `${baseUrl}/${locale}/start/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${baseUrl}/${locale}/start/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
        alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
        images: [
          ...(canonicalImagePath ? [{
            url: `${baseUrl}${canonicalImagePath}`,
            width: 2480,
            height: 3508,
            alt: canonicalImageAlt,
          }] : []),
          { url: `${baseUrl}/api/og?locale=${locale}&type=start&title=${encodeURIComponent(title)}`, width: 1200, height: 630, alt: title },
          ...(content?.visuals?.samples?.slice(0, 3).map((img: { src: string; alt: string }) => ({
            url: `${baseUrl}${encodeImagePath(img.src)}`,
            width: 2480,
            height: 3508,
            alt: img.alt,
          })) || []),
        ],
        videos: content?.visuals?.youtubeId ? [{ url: `https://www.youtube.com/watch?v=${content.visuals.youtubeId}`, type: 'text/html', width: 1280, height: 720 }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [canonicalImagePath
          ? `${baseUrl}${canonicalImagePath}`
          : `${baseUrl}/api/og?locale=${locale}&type=start&title=${encodeURIComponent(title)}`],
      },
      robots: content ? undefined : { index: false },
    };
  } catch {
    return {};
  }
}

export default async function CornerstonePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const config = getStartConfigBySlug(slug);
  if (!config) notFound();

  const content = await getStartContent(config.startId, locale);

  // Look up visual showcase config (EN + DE + FR + ES + PT)
  const showcaseConfig = (locale === 'en' || locale === 'de' || locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'it' || locale === 'nl' || locale === 'sv' || locale === 'da' || locale === 'no' || locale === 'fi')
    ? getPageShowcaseConfig('start', config.startId, locale)
    : null;

  // Override English hero heading with localized content title
  if (showcaseConfig && content) {
    showcaseConfig.hero.heading = content.hero.title;
  }

  if (content) {
    const localeSlug = getStartSlugForLocale(config.startId, locale);
    const pageUrl = `${baseUrl}/${locale}/start/${localeSlug || slug}`;

    const startHeroImage = showcaseConfig?.hero?.images?.[0]?.src;
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: content.hero.title,
      description: content.hero.description,
      url: pageUrl,
      image: startHeroImage
        ? `${baseUrl}${encodeImagePath(startHeroImage)}`
        : content.visuals?.heroImage?.src
          ? `${baseUrl}${encodeImagePath(content.visuals.heroImage.src)}`
          : content.visuals?.samples?.[0]?.src
            ? `${baseUrl}${encodeImagePath(content.visuals.samples[0].src)}`
            : `${baseUrl}/api/og?locale=${locale}&type=start&title=${encodeURIComponent(content.hero.title)}`,
      inLanguage: getHreflangCode(locale),
      publisher: { '@type': 'Organization', name: 'LessonCraftStudio', url: baseUrl },
      author: { '@type': 'Organization', name: 'LessonCraftStudio', url: baseUrl },
      datePublished: '2026-02-27',
      dateModified: '2026-03-20',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-headline', '.speakable-summary'] },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `${baseUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: getSectionLabel('businessStrategyGuides', locale), item: `${baseUrl}/${locale}/start` },
        { '@type': 'ListItem', position: 3, name: content.hero.title },
      ],
    };

    // WebPage schema with primaryImageOfPage — aligns Google's thumbnail signal
    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: content.hero.title,
      description: content.hero.description,
      isPartOf: { '@type': 'WebSite', '@id': `${baseUrl}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: articleSchema.image,
        width: (articleSchema.image as string).includes('/api/og') ? 1200 : 2480,
        height: (articleSchema.image as string).includes('/api/og') ? 630 : 3508,
      },
      mainEntity: { '@id': `${pageUrl}#article` },
      inLanguage: getHreflangCode(locale),
    };

    const schemas: object[] = [webPageSchema, articleSchema, breadcrumbSchema];
    if (content.actionSteps?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        name: content.hero.title,
        description: content.hero.description,
        step: content.actionSteps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.step,
          text: s.description,
        })),
      });
    }
    if (content.faq?.length) {
      schemas.push(generateFAQSchema(content.faq, locale, pageUrl));
    }

    return (
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        {content?.visuals?.youtubeId && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateVideoSchema({
              name: content.visuals.videoTitle || content.hero.title,
              description: content.seo?.metaDescription || content.hero.description,
              youtubeId: content.visuals.youtubeId,
            })) }}
          />
        )}
        {(() => {
          const allImages = [
            ...(content.visuals?.samples || []),
            ...(content.themeImages || []),
          ];
          return allImages.length > 0 ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(
                allImages.slice(0, 6).map(img => ({
                  '@context': 'https://schema.org',
                  '@type': 'ImageObject',
                  contentUrl: `${baseUrl}${encodeImagePath(img.src)}`,
                  name: img.alt,
                  caption: img.caption || img.alt,
                  encodingFormat: 'image/webp',
                  license: `${baseUrl}/${locale}/license`,
                  acquireLicensePage: pageUrl,
                  creditText: 'LessonCraftStudio',
                  creator: { '@type': 'Organization', name: 'LessonCraftStudio' },
                  copyrightHolder: { '@type': 'Organization', name: 'LessonCraftStudio' },
                  copyrightNotice: '© LessonCraftStudio',
                }))
              ) }}
            />
          ) : null;
        })()}
        {/* ImageObject schemas for showcase images (hero, tiered, spotlight, gallery) */}
        {(() => {
          const contentUrls = new Set([...(content.visuals?.samples || []), ...(content.themeImages || [])].slice(0, 6).map(img => `${baseUrl}${encodeImagePath(img.src)}`));
          const showcaseSchemas = generateShowcaseImageSchemas(showcaseConfig, locale, pageUrl, contentUrls);
          return showcaseSchemas.length > 0 ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseSchemas) }} />
          ) : null;
        })()}
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href={`/${locale}/start`} className="hover:text-indigo-600">{getSectionLabel('gettingStarted', locale)}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{content.hero.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            <ReadMoreText text={content.hero.description} locale={locale} className="text-lg text-gray-600" lines={5} />

            {/* Hero Image */}
            {content.visuals?.heroImage?.src && (
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={encodeImagePath(content.visuals.heroImage.src)}
                  alt={content.visuals.heroImage.alt}
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            )}

            {/* YouTube Video */}
            {content.visuals?.youtubeId && (
              <div className="mt-8">
                <VideoFacade
                  videoId={content.visuals.youtubeId}
                  title={content.visuals.videoTitle || content.hero.title}
                />
              </div>
            )}
          </div>
        </section>

        {/* Visual Showcase 1 — Hero */}
        {showcaseConfig && <WorksheetShowcaseSection config={showcaseConfig.hero} />}

        {/* Introduction */}
        {content.introduction && (
          <section className="py-10 md:py-14">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{getSectionLabel('introduction', locale)}</h2>
              <ReadMoreText text={content.introduction} locale={locale} className="text-gray-700 leading-relaxed" preserveWhitespace />
            </div>
          </section>
        )}

        {/* CTA 1 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {getSectionLabel('ctaTryFree', locale)}
            </Link>
            <p className="text-sm text-gray-500 mt-2">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
          </div>
        </section>

        {/* Content Sections */}
        {content.mainContent && content.mainContent.length > 0 && (
          <article className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl prose prose-indigo prose-lg">
              {content.mainContent.map((section, i) => (
                <div key={i} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                  <ReadMoreText text={section.content} locale={locale} className="text-gray-700 leading-relaxed" preserveWhitespace />
                </div>
              ))}
            </div>
          </article>
        )}

        {/* Visual Showcase 3 — Progression */}
        {showcaseConfig && <SpotlightSection config={showcaseConfig.spotlight} />}

        {/* Sample Gallery */}
        {content.visuals?.samples && content.visuals.samples.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('sampleWorksheets', locale)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.visuals.samples.map((sample, i) => (
                  <figure key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src={encodeImagePath(sample.src)}
                      alt={sample.alt}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    {sample.caption && (
                      <figcaption className="p-3 text-sm text-gray-600 text-center">{sample.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Theme Images */}
        {content.themeImages && content.themeImages.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('themeImages', locale)}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {content.themeImages.map((img, i) => (
                  <figure key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src={encodeImagePath(img.src)}
                      alt={img.alt}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    {img.caption && (
                      <figcaption className="p-2 text-xs text-gray-600 text-center">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Action Steps */}
        {content.actionSteps && content.actionSteps.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('actionSteps', locale)}</h2>
              <div className="space-y-4">
                {content.actionSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.step}</h3>
                      <ReadMoreText text={step.description} locale={locale} className="text-gray-600 text-sm mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Visual Showcase 2 — Features */}
        {showcaseConfig && <TieredShowcaseSection config={showcaseConfig.tiered} />}

        {/* Tool Recommendations */}
        {content.toolsRecommended && content.toolsRecommended.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('recommendedTools', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.toolsRecommended.map((tool, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all"
                  >
                    <Link href={`/${locale}/apps/${resolveWpAppIdToSlug(tool.appId, locale)}`}>
                      <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                      <ReadMoreText text={tool.description} locale={locale} className="text-gray-600 text-sm mt-1" />
                    </Link>
                    {isValidAppId(tool.appId) && (
                      <div className="mt-3">
                        <BuyButton appId={tool.appId as AppId} locale={locale} variant="compact" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA 2 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {getSectionLabel('ctaBrowseAll', locale)}
            </Link>
          </div>
        </section>

        {/* Visual Showcase 4 — Fun */}
        {showcaseConfig && <GallerySection config={showcaseConfig.gallery} />}

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('faq', locale)}</h2>
              <div className="space-y-4">
                {content.faq.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-lg bg-white">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900">
                      {faq.question}
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4">
                      <ReadMoreText text={faq.answer} locale={locale} className="text-gray-600" lines={8} />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next Steps */}
        {content.nextSteps && content.nextSteps.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('nextSteps', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.nextSteps.filter(ns => isValidInternalLink('guide', ns.slug) || isValidInternalLink('start', ns.slug)).map((ns, i) => {
                  const prefix = isValidInternalLink('start', ns.slug) ? 'start' : 'guides';
                  return (
                  <Link
                    key={i}
                    href={`/${locale}/${prefix}/${ns.slug}`}
                    className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{ns.title}</h3>
                    <ReadMoreText text={ns.description} locale={locale} className="text-gray-600 text-sm mt-1" />
                  </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA 3 - Final */}
        <section className="py-12 md:py-16 bg-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{getSectionLabel('ctaReadyToStart', locale)}</h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              {getSectionLabel('ctaBrowseAll', locale)}
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        {content.internalLinks && content.internalLinks.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('relatedGuides', locale)}</h2>
              <div className="flex flex-wrap gap-3">
                {content.internalLinks.filter(link => isValidInternalLink(link.pageType, link.slug)).map((link, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/${link.pageType === 'app' ? 'apps' : link.pageType === 'tool' ? 'tools' : link.pageType === 'bundle' ? 'bundles' : link.pageType === 'start' ? 'start' : link.pageType === 'guide' ? 'guides' : 'ideas'}/${link.slug}`}
                    className="text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full"
                  >
                    {link.anchorText}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getSectionLabel('gettingStarted', locale)}</h1>
          <p className="text-gray-600 mb-8">{getSectionLabel('comingSoon', locale)}</p>
          <Link href={`/${locale}/start`} className="text-indigo-600 hover:text-indigo-700 font-medium">
            {getSectionLabel('ctaBrowseAll', locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
