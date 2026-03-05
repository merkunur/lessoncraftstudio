import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { startPageSlugs, getStartSlugForLocale } from '@/config/start-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Guide display info
const guideInfo: Record<string, { title: string; description: string }> = {
  'start-printable-business': { title: 'How to Start a Printable Business', description: 'Complete guide to launching a profitable printable business from scratch.' },
  'sell-printables-etsy': { title: 'How to Sell Printables on Etsy', description: 'Step-by-step guide to creating and selling printable products on Etsy.' },
  'sell-worksheets-tpt': { title: 'How to Sell on Teachers Pay Teachers', description: 'Guide to building a successful TPT shop with worksheet products.' },
  'amazon-kdp-activity-books': { title: 'Amazon KDP Activity Books', description: 'How to create and publish activity books on Amazon KDP.' },
  'printable-business-tools': { title: 'Essential Printable Business Tools', description: 'The tools and resources you need to run a printable business.' },
  'pricing-printables': { title: 'How to Price Your Printables', description: 'Pricing strategies for digital downloads across different platforms.' },
  'commercial-license-guide': { title: 'Commercial License Guide', description: 'Understanding commercial licenses for printable products.' },
  'printable-niches': { title: 'Most Profitable Printable Niches', description: 'Research-backed guide to the most profitable printable niches.' },
  'worksheet-design-tips': { title: 'Worksheet Design Best Practices', description: 'Design tips for creating professional, sellable worksheets.' },
  'multilingual-printables': { title: 'Selling Multilingual Printables', description: 'How to reach international customers with multi-language products.' },
  'passive-income-printables': { title: 'Passive Income with Printables', description: 'Building passive income streams with digital printable products.' },
  'printable-marketing': { title: 'Marketing Your Printable Business', description: 'Marketing strategies to grow your printable product sales.' },
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const title = 'Printable Business Guides | Start & Grow Your Business | LessonCraftStudio';
  const description = 'Comprehensive guides for starting and growing a printable business. Learn to sell on Etsy, Amazon KDP, TPT. Pricing, marketing, and niche selection strategies.';

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/start`;
  }
  alternates['x-default'] = `${baseUrl}/en/start`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/start`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/start`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default function StartListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Printable Business Guides
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to start and grow a profitable printable business. From choosing a niche to scaling your sales.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {startPageSlugs.map(guide => {
              const info = guideInfo[guide.startId];
              if (!info) return null;
              const slug = getStartSlugForLocale(guide.startId, locale) || guide.slugs.en;

              return (
                <Link
                  key={guide.startId}
                  href={`/${locale}/start/${slug}`}
                  className="p-5 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all"
                >
                  <h2 className="font-bold text-gray-900 mb-2">{info.title}</h2>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Create?</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
            Try all 33 printable generators free with watermark. No signup required.
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Try Free Generators
          </Link>
        </div>
      </section>
    </div>
  );
}
