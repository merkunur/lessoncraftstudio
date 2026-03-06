import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { guidePageSlugs, getGuideSlugForLocale } from '@/config/guide-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { getSectionLabel } from '@/config/section-labels';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Subcategories for guides
const guideSubcategories = [
  {
    id: 'platform',
    labelKey: 'platformGuides',
    description: 'How to create and sell on specific platforms',
    guideIds: new Set([
      'sell-math-worksheets-etsy', 'sell-word-search-etsy', 'start-etsy-printable-shop',
      'create-etsy-coloring-pages', 'sell-educational-printables-etsy', 'price-etsy-printables',
      'etsy-seo-educational-printables', 'create-etsy-worksheet-bundles',
      'math-activity-books-kdp', 'publish-puzzle-books-kdp', 'word-search-books-kdp',
      'make-money-kdp-activity-books', 'kdp-formatting-worksheets', 'best-kdp-activity-book-niches',
      'sudoku-books-kdp', 'kdp-vs-etsy-printables',
      'create-sell-tpt-resources', 'tpt-store-optimization',
      'sell-printables-gumroad', 'sell-creative-fabrica',
    ]),
  },
  {
    id: 'product',
    labelKey: 'productCreationGuides',
    description: 'How to create specific types of printable products',
    guideIds: new Set([
      'create-addition-worksheets', 'create-subtraction-worksheets', 'create-word-search-puzzles',
      'create-crossword-puzzles', 'create-math-puzzle-worksheets', 'create-handwriting-sheets',
      'create-coloring-pages', 'create-bingo-cards', 'create-matching-worksheets',
      'create-pattern-worksheets', 'create-picture-sudoku', 'create-maze-worksheets',
      'create-hidden-object-worksheets', 'create-size-comparison-worksheets',
      'create-counting-worksheets', 'create-drawing-worksheets', 'create-sorting-worksheets',
      'create-shadow-matching-worksheets', 'create-odd-one-out-puzzles',
      'create-missing-pieces-puzzles', 'create-treasure-hunt-worksheets',
      'create-alphabet-worksheets', 'create-preposition-worksheets',
      'create-cryptogram-puzzles', 'create-chart-count-worksheets',
    ]),
  },
  {
    id: 'business',
    labelKey: 'businessStrategyGuides',
    description: 'Growing and scaling your printable business',
    guideIds: new Set([
      'create-worksheet-bundles', 'niche-selection-printables', 'create-printable-product-line',
      'pricing-educational-printables', 'scale-printable-business-guide', 'passive-income-worksheets',
      'understanding-commercial-licenses', 'research-profitable-niches',
      'multilingual-printable-business', 'worksheets-multiple-languages',
      'copyright-printable-sellers', 'customer-support-digital-products',
      'automate-printable-business', 'social-media-printable-marketing',
      'pinterest-marketing-worksheets', 'email-marketing-printables',
      'get-reviews-printable-products', 'seasonal-marketing-printables',
      'digital-vs-physical-printables', 'quality-standards-worksheets',
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">{getSectionLabel(subcat.labelKey, locale)}</h2>
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

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {{ en: 'Explore More', de: 'Mehr entdecken', fr: 'Explorer plus', es: 'Explorar m\u00e1s', pt: 'Explorar mais', it: 'Esplora di pi\u00f9', nl: 'Ontdek meer', sv: 'Utforska mer', da: 'Udforsk mere', no: 'Utforsk mer', fi: 'Tutustu lis\u00e4\u00e4' }[locale] || 'Explore More'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/tools`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas gr\u00e1tis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis v\u00e6rkt\u00f8jer', no: 'Gratisverkt\u00f8y', fi: 'Ilmaiset ty\u00f6kalut' }[locale] || 'Free Tools'}
            </Link>
            <Link href={`/${locale}/ideas`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Niche Ideas', de: 'Nischen-Ideen', fr: 'Id\u00e9es de niches', es: 'Ideas de nichos', pt: 'Ideias de nichos', it: 'Idee di nicchia', nl: 'Niche-idee\u00ebn', sv: 'Nischid\u00e9er', da: 'Nicheideer', no: 'Nisjeideer', fi: 'Niche-ideat' }[locale] || 'Niche Ideas'}
            </Link>
            <Link href={`/${locale}/start`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Get Started', de: 'Erste Schritte', fr: 'D\u00e9marrer', es: 'Comenzar', pt: 'Come\u00e7ar', it: 'Inizia', nl: 'Aan de slag', sv: 'Kom ig\u00e5ng', da: 'Kom i gang', no: 'Kom i gang', fi: 'Aloita' }[locale] || 'Get Started'}
            </Link>
          </div>
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
