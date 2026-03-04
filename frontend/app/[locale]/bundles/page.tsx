import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { bundlePageSlugs, getBundleSlugForLocale } from '@/config/bundle-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { APP_CATEGORIES } from '@/config/warriorplus-products';

const baseUrl = 'https://www.lessoncraftstudio.com';

const bundleInfo: Record<string, { name: string; description: string; categoryId: string }> = {
  'math-bundle': { name: 'Math & Number Bundle', description: '6 math generators including addition, subtraction, math puzzles, and more.', categoryId: 'math' },
  'literacy-bundle': { name: 'Letters & Words Bundle', description: '7 language generators including word search, crossword, word scramble, and more.', categoryId: 'literacy' },
  'visual-bundle': { name: 'Drawing & Art Bundle', description: '7 visual generators including coloring pages, drawing exercises, and patterns.', categoryId: 'visual' },
  'matching-bundle': { name: 'Matching & Sorting Bundle', description: '5 matching generators including bingo, grid match, shadow match, and more.', categoryId: 'matching' },
  'puzzle-bundle': { name: 'Puzzles & Games Bundle', description: '4 puzzle generators including sudoku, missing pieces, odd one out, and more.', categoryId: 'puzzle' },
  'search-bundle': { name: 'Search & Find Bundle', description: '4 search generators including crossword, treasure hunt, find objects, and more.', categoryId: 'search' },
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
  const title = 'Printable Generator Bundles | Save with Category Packs | LessonCraftStudio';
  const description = 'Get all generators in a category at a bundled price. 6 bundles covering math, literacy, visual, matching, puzzles, and search. One-time purchase with commercial license.';

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/bundles`;
  }
  alternates['x-default'] = `${baseUrl}/en/bundles`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/bundles`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/bundles`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default function BundlesListingPage({
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
            Generator Bundles
          </h1>
          <p className="text-lg text-gray-600">
            Save with category bundles. Get all generators in a category with a commercial license at a bundled price.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundlePageSlugs.map(bundle => {
              const info = bundleInfo[bundle.bundleId];
              if (!info) return null;
              const slug = getBundleSlugForLocale(bundle.bundleId, locale) || bundle.slugs.en;
              const catData = APP_CATEGORIES[info.categoryId as keyof typeof APP_CATEGORIES];

              return (
                <Link
                  key={bundle.bundleId}
                  href={`/${locale}/bundles/${slug}`}
                  className="p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${catData?.color || '#6366f1'}15` }}>
                      📦
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{info.name}</h2>
                  </div>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-indigo-600 font-medium">From $79</span>
                    <span className="text-sm text-gray-500">One-time purchase</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Try Before You Buy</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
            All generators are free to try with watermark. See the quality before purchasing a bundle.
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
