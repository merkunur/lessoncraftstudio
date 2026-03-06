import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getStartConfigBySlug,
  getAllStartPageSlugs,
  getStartAlternateUrls,
  getStartSlugForLocale,
} from '@/config/start-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap } from '@/lib/schema-generator';
import { getStartContent } from '@/config/start-content';
import { getSectionLabel } from '@/config/section-labels';
import VideoFacade from '@/app/[locale]/apps/[slug]/VideoFacade';

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
    const description = content?.seo?.metaDescription || '';

    return {
      title,
      description,
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

  if (content) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href={`/${locale}/start`} className="hover:text-indigo-600">Guides</Link>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.visuals.heroImage.src}
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

        {/* Content Sections */}
        {content.mainContent && content.mainContent.length > 0 && (
          <article className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl prose prose-indigo prose-lg">
              {content.mainContent.map((section, i) => (
                <div key={i} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}

        {/* Sample Gallery */}
        {content.visuals?.samples && content.visuals.samples.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('sampleWorksheets', locale)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.visuals.samples.map((sample, i) => (
                  <figure key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sample.src}
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
                      <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tool Recommendations */}
        {content.toolsRecommended && content.toolsRecommended.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('recommendedTools', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.toolsRecommended.map((tool, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/apps/${tool.appId}`}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all"
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

        {/* Internal Links */}
        {content.internalLinks && content.internalLinks.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('relatedGuides', locale)}</h2>
              <div className="flex flex-wrap gap-3">
                {content.internalLinks.map((link, i) => (
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Guide</h1>
          <p className="text-gray-600 mb-8">This guide is coming soon.</p>
          <Link href={`/${locale}/start`} className="text-indigo-600 hover:text-indigo-700 font-medium">
            Browse All Guides
          </Link>
        </div>
      </section>
    </div>
  );
}
