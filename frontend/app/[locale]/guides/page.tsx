import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { guidePageSlugs, getGuideSlugForLocale } from '@/config/guide-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Subcategories for guides
const guideSubcategories = [
  {
    id: 'platform',
    name: 'Platform Guides',
    description: 'How to create and sell on specific platforms',
    guideIds: new Set([
      'create-etsy-worksheets', 'create-kdp-activity-books', 'create-tpt-resources',
      'create-gumroad-printables', 'create-shopify-printables', 'create-payhip-printables',
      'create-creative-market-printables', 'create-woocommerce-printables', 'create-pinterest-printables',
      'create-canva-printables', 'create-facebook-marketplace-printables', 'create-instagram-printables',
      'create-boom-cards', 'create-teachable-courses', 'create-udemy-courses',
      'create-youtube-content', 'create-tiktok-content', 'create-blog-content',
      'create-newsletter-content', 'create-printable-subscription',
    ]),
  },
  {
    id: 'product',
    name: 'Product Creation Guides',
    description: 'How to create specific types of printable products',
    guideIds: new Set([
      'create-word-search-books', 'create-math-workbooks', 'create-coloring-books',
      'create-crossword-books', 'create-puzzle-books', 'create-activity-packs',
      'create-educational-bundles', 'create-seasonal-printables', 'create-holiday-printables',
      'create-classroom-decor', 'create-homeschool-curriculum', 'create-toddler-activities',
      'create-preschool-printables', 'create-kindergarten-worksheets', 'create-first-grade-worksheets',
      'create-second-grade-worksheets', 'create-third-grade-worksheets', 'create-esl-worksheets',
      'create-special-education-resources', 'create-therapy-worksheets',
      'create-adult-activity-books', 'create-senior-activity-books', 'create-party-games',
      'create-wedding-activities', 'create-baby-shower-games',
    ]),
  },
  {
    id: 'business',
    name: 'Business Strategy Guides',
    description: 'Growing and scaling your printable business',
    guideIds: new Set([
      'printable-seo-strategy', 'printable-keyword-research', 'printable-listing-optimization',
      'printable-photography-tips', 'printable-branding-guide', 'printable-customer-service',
      'printable-analytics-guide', 'printable-scaling-strategy', 'printable-outsourcing-guide',
      'printable-legal-guide', 'printable-tax-guide', 'printable-international-selling',
      'printable-wholesale-guide', 'printable-affiliate-marketing', 'printable-email-marketing',
      'printable-social-media-strategy', 'printable-paid-advertising', 'printable-ab-testing',
      'printable-customer-research', 'printable-competition-analysis',
    ]),
  },
];

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
  const title = 'How-To Guides | Create & Sell Printables | LessonCraftStudio';
  const description = '65 step-by-step guides for creating and selling printable products. Platform guides, product creation tutorials, and business strategies for Etsy, KDP, TPT sellers.';

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/guides`;
  }
  alternates['x-default'] = `${baseUrl}/en/guides`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/guides`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/guides`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default function GuidesListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 md:py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How-To Guides
          </h1>
          <p className="text-lg text-gray-600">
            Step-by-step guides for creating and selling printable products. From platform tutorials to business strategies.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {guideSubcategories.map(subcat => {
            const guides = guidePageSlugs.filter(g => subcat.guideIds.has(g.guideId));
            if (guides.length === 0) return null;

            return (
              <div key={subcat.id} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{subcat.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{subcat.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {guides.map(guide => {
                    const slug = getGuideSlugForLocale(guide.guideId, locale) || guide.slugs.en;
                    const displayName = guide.guideId
                      .replace(/^create-/, '')
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, c => c.toUpperCase());

                    return (
                      <Link
                        key={guide.guideId}
                        href={`/${locale}/guides/${slug}`}
                        className="p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all"
                      >
                        <span className="text-sm font-medium text-gray-900">{displayName}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Start Creating Today</h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Try all 33 printable generators free with watermark. No signup required.
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Try Free Generators
          </Link>
        </div>
      </section>
    </div>
  );
}
