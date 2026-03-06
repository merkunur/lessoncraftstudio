import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  getGuideConfigBySlug,
  getAllGuidePageSlugs,
  getGuideAlternateUrls,
  getGuideSlugForLocale,
} from '@/config/guide-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap, generateFAQSchema, localizedHomeLabel, getHreflangCode } from '@/lib/schema-generator';
import { getGuideContent } from '@/config/guide-content';
import { getSectionLabel } from '@/config/section-labels';
import VideoFacade from '@/app/[locale]/apps/[slug]/VideoFacade';

const baseUrl = 'https://www.lessoncraftstudio.com';

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllGuidePageSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;

    const config = getGuideConfigBySlug(slug);
    if (!config) return {};

    const content = await getGuideContent(config.guideId, locale);
    const alternateUrls = getGuideAlternateUrls(config.guideId, baseUrl);
    const localeSlug = getGuideSlugForLocale(config.guideId, locale);

    const title = content?.seo?.titleTag || `${config.guideId} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || '';

    return {
      title,
      description,
      alternates: {
        canonical: `${baseUrl}/${locale}/guides/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${baseUrl}/${locale}/guides/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
      },
      robots: content ? undefined : { index: false },
    };
  } catch {
    return {};
  }
}

export default async function GuidePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const config = getGuideConfigBySlug(slug);
  if (!config) notFound();

  const content = await getGuideContent(config.guideId, locale);

  if (content) {
    const localeSlug = getGuideSlugForLocale(config.guideId, locale);
    const pageUrl = `${baseUrl}/${locale}/guides/${localeSlug || slug}`;

    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: content.hero.title,
      description: content.hero.description,
      url: pageUrl,
      inLanguage: getHreflangCode(locale),
      ...(content.tutorial?.length && {
        step: content.tutorial.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.heading,
          text: s.content,
        })),
      }),
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `${baseUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: getSectionLabel('platformGuides', locale), item: `${baseUrl}/${locale}/guides` },
        { '@type': 'ListItem', position: 3, name: content.hero.title },
      ],
    };

    const schemas: object[] = [howToSchema, breadcrumbSchema];
    if (content.faq?.length) {
      schemas.push(generateFAQSchema(content.faq, locale, pageUrl));
    }

    return (
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href={`/${locale}/guides`} className="hover:text-emerald-600">{getSectionLabel('guides', locale)}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{content.hero.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            <p className="text-lg text-gray-600">{content.hero.description}</p>

            {/* Hero Image */}
            {content.visuals?.heroImage?.src && (
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={content.visuals.heroImage.src}
                  alt={content.visuals.heroImage.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
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

        {/* Introduction */}
        {content.introduction && (
          <section className="py-10 md:py-14">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{getSectionLabel('introduction', locale)}</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{content.introduction}</div>
            </div>
          </section>
        )}

        {/* CTA 1 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {getSectionLabel('ctaTryFree', locale)}
            </Link>
            <p className="text-sm text-gray-500 mt-2">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
          </div>
        </section>

        {/* Tutorial Steps */}
        {content.tutorial && content.tutorial.length > 0 && (
          <article className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('tutorial', locale)}</h2>
              <div className="space-y-8">
                {content.tutorial.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{step.heading}</h2>
                      <p className="text-gray-700 leading-relaxed">{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}

        {/* Examples */}
        {content.examples && content.examples.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('examples', locale)}</h2>
              <div className="space-y-6">
                {content.examples.map((example, i) => (
                  <div key={i} className="p-5 bg-white rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">{example.heading}</h3>
                    <p className="text-gray-700 leading-relaxed">{example.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sample Gallery */}
        {content.visuals?.samples && content.visuals.samples.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('sampleWorksheets', locale)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.visuals.samples.map((sample, i) => (
                  <figure key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <Image
                      src={sample.src}
                      alt={sample.alt}
                      width={400}
                      height={300}
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

        {/* Platform Tips */}
        {content.platformTips && content.platformTips.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('platformTips', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.platformTips.map((tip, i) => (
                  <div key={i} className="p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900">{tip.heading}</h3>
                    <p className="text-gray-600 text-sm mt-1">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Monetization Strategies */}
        {content.monetization && content.monetization.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('monetizationStrategies', locale)}</h2>
              <div className="space-y-4">
                {content.monetization.map((strategy, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{strategy.heading}</h3>
                    <p className="text-gray-600 text-sm mt-1">{strategy.content}</p>
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
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {getSectionLabel('ctaBrowseAll', locale)}
            </Link>
          </div>
        </section>

        {/* Tools Recommended */}
        {content.toolsRecommended && content.toolsRecommended.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('recommendedTools', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.toolsRecommended.map((tool, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/apps/${tool.appId}`}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
                    <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
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
                {content.nextSteps.map((ns, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/guides/${ns.slug}`}
                    className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{ns.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{ns.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA 3 - Final */}
        <section className="py-12 md:py-16 bg-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{getSectionLabel('ctaReadyToStart', locale)}</h2>
            <p className="text-emerald-100 mb-8 max-w-lg mx-auto">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
            >
              {getSectionLabel('ctaBrowseAll', locale)}
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        {content.internalLinks && content.internalLinks.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('related', locale)}</h2>
              <div className="flex flex-wrap gap-3">
                {content.internalLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/${link.pageType === 'app' ? 'apps' : link.pageType === 'tool' ? 'tools' : link.pageType === 'bundle' ? 'bundles' : link.pageType === 'start' ? 'start' : link.pageType === 'guide' ? 'guides' : 'ideas'}/${link.slug}`}
                    className="text-sm text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getSectionLabel('guides', locale)}</h1>
          <p className="text-gray-600 mb-8">{getSectionLabel('comingSoon', locale)}</p>
          <Link href={`/${locale}/guides`} className="text-indigo-600 hover:text-indigo-700 font-medium">
            {getSectionLabel('ctaBrowseAll', locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
