import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { startPageSlugs, getStartSlugForLocale } from '@/config/start-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Guide display info
const guideInfo: Record<string, { title: string; description: string }> = {
  'complete-guide-printable-business': { title: 'Complete Guide to Printable Business', description: 'Everything you need to launch and grow a profitable printable business from scratch.' },
  'create-worksheets-that-sell': { title: 'Create Worksheets That Sell', description: 'Design tips and strategies for creating professional, sellable worksheets.' },
  'printable-business-blueprint': { title: 'Printable Business Blueprint', description: 'Step-by-step blueprint for building a successful printable product business.' },
  'etsy-printable-business': { title: 'Etsy Printable Business', description: 'How to create and sell printable products on Etsy for consistent income.' },
  'amazon-kdp-activity-books': { title: 'Amazon KDP Activity Books', description: 'How to create and publish activity books on Amazon KDP.' },
  'create-multilingual-worksheets': { title: 'Create Multilingual Worksheets', description: 'How to reach international customers with multi-language printable products.' },
  'commercial-license-guide': { title: 'Commercial License Guide', description: 'Understanding commercial licenses for printable products.' },
  'printable-business-income': { title: 'Printable Business Income', description: 'Building reliable income streams with digital printable products.' },
  'tools-for-printable-business': { title: 'Tools for Printable Business', description: 'The essential tools and resources you need to run a printable business.' },
  'marketing-printable-business': { title: 'Marketing Your Printable Business', description: 'Marketing strategies to grow your printable product sales.' },
  'scaling-printable-business': { title: 'Scaling Your Printable Business', description: 'How to scale from side hustle to full-time printable business.' },
  'printable-business-legal': { title: 'Printable Business Legal Guide', description: 'Legal essentials for running a printable business — licenses, taxes, and compliance.' },
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
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Gu\u00edas', pt: 'Guias', it: 'Guide', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}
            </Link>
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
