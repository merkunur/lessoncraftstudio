import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getGuideConfigBySlug,
  getAllGuidePageSlugs,
  getGuideAlternateUrls,
  getGuideSlugForLocale,
} from '@/config/guide-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap } from '@/lib/schema-generator';
import { getGuideContent } from '@/config/guide-content';

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
    return (
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href={`/${locale}/guides`} className="hover:text-emerald-600">Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{content.hero.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            <p className="text-lg text-gray-600">{content.hero.description}</p>
          </div>
        </section>

        {/* Tutorial Steps */}
        {content.tutorial && content.tutorial.steps.length > 0 && (
          <article className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{content.tutorial.title}</h2>
              <div className="space-y-8">
                {content.tutorial.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h2>
                      <p className="text-gray-700 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}

        {/* Platform Tips */}
        {content.platformTips && content.platformTips.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Platform Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.platformTips.map((tip, i) => (
                  <div key={i} className="p-4 bg-white rounded-lg border border-gray-200">
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{tip.platform}</span>
                    <h3 className="font-semibold text-gray-900 mt-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{tip.description}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Monetization Strategies</h2>
              <div className="space-y-4">
                {content.monetization.map((strategy, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{strategy.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{strategy.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related</h2>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Guide</h1>
          <p className="text-gray-600 mb-8">This guide is coming soon.</p>
          <Link href={`/${locale}/guides`} className="text-indigo-600 hover:text-indigo-700 font-medium">
            Browse All Guides
          </Link>
        </div>
      </section>
    </div>
  );
}
