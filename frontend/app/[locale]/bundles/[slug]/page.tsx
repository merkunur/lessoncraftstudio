import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getBundleConfigBySlug,
  getAllBundlePageSlugs,
  getBundleAlternateUrls,
  getBundleSlugForLocale,
  bundlePageSlugs,
} from '@/config/bundle-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap } from '@/lib/schema-generator';
import { getBundleContent } from '@/config/bundle-content';
import { getBundleTierComparison } from '@/config/app-content/tier-comparison';
import { getSectionLabel } from '@/config/section-labels';
import VideoFacade from '@/app/[locale]/apps/[slug]/VideoFacade';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Bundle display names (English, localized later via content files)
const bundleNames: Record<string, string> = {
  'math-bundle': 'Math & Number Bundle',
  'literacy-bundle': 'Letters & Words Bundle',
  'visual-bundle': 'Drawing & Art Bundle',
  'matching-bundle': 'Matching & Sorting Bundle',
  'puzzle-bundle': 'Puzzles & Games Bundle',
  'search-bundle': 'Search & Find Bundle',
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllBundlePageSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;

    const bundleConfig = getBundleConfigBySlug(slug);
    if (!bundleConfig) return {};

    const content = await getBundleContent(bundleConfig.bundleId, locale);
    const alternateUrls = getBundleAlternateUrls(bundleConfig.bundleId, baseUrl);
    const localeSlug = getBundleSlugForLocale(bundleConfig.bundleId, locale);
    const name = bundleNames[bundleConfig.bundleId] || bundleConfig.bundleId;

    const title = content?.seo?.titleTag || `${name} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || `Get the ${name} with all generators included.`;

    return {
      title,
      description,
      alternates: {
        canonical: `${baseUrl}/${locale}/bundles/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${baseUrl}/${locale}/bundles/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
      },
      robots: content ? undefined : { index: false },
    };
  } catch {
    return {};
  }
}

export default async function BundlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const bundleConfig = getBundleConfigBySlug(slug);
  if (!bundleConfig) notFound();

  const content = await getBundleContent(bundleConfig.bundleId, locale);
  const tierData = getBundleTierComparison(locale);
  const name = bundleNames[bundleConfig.bundleId] || bundleConfig.bundleId;

  if (content) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{content.hero.description}</p>

            {/* Hero Image */}
            {content.visuals?.heroImages?.primary && (
              <div className="rounded-xl overflow-hidden shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.visuals.heroImages.primary}
                  alt={content.visuals.heroImages.primaryAlt}
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

        {/* Apps Included */}
        {content.appsIncluded && content.appsIncluded.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('whatsIncluded', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.appsIncluded.map((app, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{app.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tier Comparison */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{tierData.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 border-b-2 border-gray-200"></th>
                    <th className="text-center p-3 border-b-2 border-gray-200">
                      <div className="font-bold text-gray-900">{tierData.commercialTitle}</div>
                      <div className="text-lg font-bold text-indigo-600">{tierData.commercialPrice}</div>
                    </th>
                    <th className="text-center p-3 border-b-2 border-indigo-200 bg-indigo-50">
                      <div className="font-bold text-gray-900">{tierData.fullAccessTitle}</div>
                      <div className="text-lg font-bold text-indigo-600">{tierData.fullAccessPrice}</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tierData.features.map((f, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-3 text-sm font-medium text-gray-700">{f.feature}</td>
                      <td className="p-3 text-sm text-center text-gray-600">{f.commercial}</td>
                      <td className="p-3 text-sm text-center text-gray-600 bg-indigo-50/50">{f.fullAccess}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">{tierData.footnote}</p>
          </div>
        </section>

        {/* Benefits */}
        {content.bundleBenefits && content.bundleBenefits.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('whyChooseBundle', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.bundleBenefits.map((benefit, i) => (
                  <div key={i} className="flex gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sample Gallery */}
        {content.visuals?.sampleGallery && content.visuals.sampleGallery.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('sampleWorksheets', locale)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.visuals.sampleGallery.map((sample, i) => (
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

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('faq', locale)}</h2>
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
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>
          <p className="text-gray-600 mb-8">
            Get all generators in this category at a bundled price.
          </p>
          <Link
            href={`/${locale}/apps`}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Browse All Generators
          </Link>
        </div>
      </section>
    </div>
  );
}
