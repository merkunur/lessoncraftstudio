import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { comparePageSlugs, getCompareSlugForLocale } from '@/config/compare-page-slugs';
import { getHreflangCode, ogLocaleMap, localizedHomeLabel } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { getCompareContent } from '@/config/compare-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

export const revalidate = 3600;

const compareHubContent: Record<string, {
  heroTitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  en: {
    heroTitle: 'Comparisons',
    heroDescription: 'Side-by-side comparisons of printable business tools. Find the right tool for your workflow.',
    metaTitle: 'Tool Comparisons | Printable Business Software | LessonCraftStudio',
    metaDescription: 'Honest side-by-side comparisons of printable business tools. LessonCraftStudio vs Book Bolt, Canva, and more. Find the right tool for your workflow.',
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const content = compareHubContent[locale] || compareHubContent.en;
  const title = content.metaTitle;
  const description = content.metaDescription;

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/compare`;
  }
  alternates['x-default'] = `${baseUrl}/en/compare`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/compare`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/compare`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

export default async function CompareListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;
  const content = compareHubContent[locale] || compareHubContent.en;

  // Load compare content for localized titles
  const compareContents: Record<string, string> = {};
  for (const compare of comparePageSlugs) {
    const compareContent = await getCompareContent(compare.compareId, locale);
    if (compareContent?.hero?.title) {
      compareContents[compare.compareId] = compareContent.hero.title;
    }
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: content.heroTitle },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.heroTitle}
          </h1>
          <p className="text-lg text-gray-600">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comparePageSlugs.map(compare => {
              const slug = getCompareSlugForLocale(compare.compareId, locale) || compare.slugs.en;
              const fallbackName = compare.compareId
                .replace(/-/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase());
              const displayName = compareContents[compare.compareId] || fallbackName;

              return (
                <Link
                  key={compare.compareId}
                  href={`/${locale}/compare/${slug}`}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium text-gray-900">{displayName}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Guias practicas', pt: 'Guias praticos', it: 'Guide pratiche', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}
            </Link>
            <Link href={`/${locale}/apps`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'All Generators', de: 'Alle Generatoren', fr: 'Tous les generateurs', es: 'Todos los generadores', pt: 'Todos os geradores', it: 'Tutti i generatori', nl: 'Alle generatoren', sv: 'Alla generatorer', da: 'Alle generatorer', no: 'Alle generatorer', fi: 'Kaikki generaattorit' }[locale] || 'All Generators'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
