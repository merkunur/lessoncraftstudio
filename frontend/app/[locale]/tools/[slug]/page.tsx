import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getToolConfigBySlug,
  getAllToolPageSlugs,
  getToolAlternateUrls,
  getToolSlugForLocale,
} from '@/config/tool-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap } from '@/lib/schema-generator';
import { ALL_APPS, type AppId } from '@/config/warriorplus-products';
import { getLocalizedAppName } from '@/config/app-translations';
import { getToolContent } from '@/config/tool-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Map tool slug appIds to warriorplus appIds where they differ
const toolToWpApp: Record<string, string> = {
  'word-search': 'wordsearch',
  'image-addition': 'addition',
  'matching-app': 'matching',
  'picture-bingo': 'bingo',
  'big-small-app': 'big-small',
  'chart-count-color': 'chart-count',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'writing-app': 'writing',
};

function getWpAppId(slugAppId: string): AppId | null {
  const wpId = toolToWpApp[slugAppId] || slugAppId;
  if (wpId in ALL_APPS) return wpId as AppId;
  return null;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllToolPageSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;

    const toolConfig = getToolConfigBySlug(slug);
    if (!toolConfig) return {};

    const wpAppId = getWpAppId(toolConfig.appId);
    if (!wpAppId) return {};

    const content = await getToolContent(toolConfig.appId, locale);
    const localizedName = getLocalizedAppName(wpAppId, locale);
    const alternateUrls = getToolAlternateUrls(toolConfig.appId, baseUrl);
    const localeSlug = getToolSlugForLocale(toolConfig.appId, locale);

    const title = content?.seo?.titleTag || `Free ${localizedName} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || `Try ${localizedName} free online. No signup required.`;

    return {
      title,
      description,
      alternates: {
        canonical: `${baseUrl}/${locale}/tools/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${baseUrl}/${locale}/tools/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
      },
      robots: content ? undefined : { index: false },
    };
  } catch {
    return {};
  }
}

export default async function ToolPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const toolConfig = getToolConfigBySlug(slug);
  if (!toolConfig) notFound();

  const wpAppId = getWpAppId(toolConfig.appId);
  if (!wpAppId) notFound();

  const appData = ALL_APPS[wpAppId];
  if (!appData) notFound();

  const content = await getToolContent(toolConfig.appId, locale);
  const localizedName = getLocalizedAppName(wpAppId, locale);
  const localeSlug = getToolSlugForLocale(toolConfig.appId, locale);

  // App launch URL
  const htmlFile = appData.htmlFile || `${wpAppId}.html`;
  const launchUrl = `/worksheet-generators/${htmlFile}`;

  // If enriched content exists, render full page
  if (content) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            <p className="text-indigo-600 font-medium mb-2">{content.hero.tagline}</p>
            <p className="text-lg text-gray-600 mb-8">{content.hero.description}</p>
            <a
              href={launchUrl}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Free Now
            </a>
          </div>
        </section>

        {/* How It Works */}
        {content.tutorial && content.tutorial.steps.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{content.tutorial.title}</h2>
              <div className="space-y-6">
                {content.tutorial.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Product Examples */}
        {content.whatYouCanCreate && content.whatYouCanCreate.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">What You Can Create</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.whatYouCanCreate.map((example, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">{example.title}</h3>
                    <p className="text-gray-600 text-sm">{example.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Business Ideas */}
        {content.businessIdeas && content.businessIdeas.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Business Ideas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.businessIdeas.map((idea, i) => (
                  <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">{idea.title}</h3>
                    <p className="text-gray-600 text-sm">{idea.description}</p>
                    {idea.platform && (
                      <span className="inline-block mt-2 text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                        {idea.platform}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {content.faq.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-lg">
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
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related</h2>
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

        {/* Bottom CTA */}
        <section className="py-12 md:py-16 bg-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{localizedName}</h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">Try it free with watermark. No signup required.</p>
            <a
              href={launchUrl}
              className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Try Free Now
            </a>
          </div>
        </section>
      </div>
    );
  }

  // Fallback: minimal page when content file doesn't exist yet
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Free {localizedName}
          </h1>
          <p className="text-gray-600 mb-8">
            Create professional worksheets instantly. No signup required.
          </p>
          <a
            href={launchUrl}
            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Free with Watermark
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Free version includes a small watermark. Purchase to remove.
          </p>
        </div>
      </section>
    </div>
  );
}
