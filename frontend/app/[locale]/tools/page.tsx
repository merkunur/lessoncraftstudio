import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { toolPageSlugs, getToolSlugForLocale } from '@/config/tool-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ALL_APPS, APP_CATEGORIES, type AppId } from '@/config/warriorplus-products';
import { getLocalizedAppName } from '@/config/app-translations';

const baseUrl = 'https://www.lessoncraftstudio.com';

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
  const title = 'Free Printable Generators | Try All 33 Tools Free | LessonCraftStudio';
  const description = 'Try all 33 printable worksheet generators free online. No signup required. Create word searches, math worksheets, coloring pages, puzzles and more with watermark.';

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/tools`;
  }
  alternates['x-default'] = `${baseUrl}/en/tools`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/tools`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/tools`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default function ToolsListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;

  // Group tools by category
  const toolsByCategory: Record<string, Array<{ appId: string; name: string; slug: string }>> = {};

  for (const tool of toolPageSlugs) {
    const wpId = toolToWpApp[tool.appId] || tool.appId;
    const appData = ALL_APPS[wpId as AppId];
    if (!appData) continue;

    const category = appData.category;
    if (!toolsByCategory[category]) toolsByCategory[category] = [];

    const slug = getToolSlugForLocale(tool.appId, locale) || tool.slugs.en;
    const name = getLocalizedAppName(wpId, locale);

    toolsByCategory[category].push({ appId: tool.appId, name, slug });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free Printable Generators
          </h1>
          <p className="text-lg text-gray-600">
            Try all 33 generators free online. No signup required. Create professional worksheets with watermark.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {Object.entries(APP_CATEGORIES).map(([catId, catData]) => {
            const tools = toolsByCategory[catId];
            if (!tools || tools.length === 0) return null;

            return (
              <div key={catId} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{catData.name}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {tools.map(tool => (
                    <Link
                      key={tool.appId}
                      href={`/${locale}/tools/${tool.slug}`}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all text-center"
                    >
                      <span className="text-sm font-medium text-gray-900">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want More Features?</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
            Upgrade to remove watermarks and unlock all image themes and languages.
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
          >
            View All Generators
          </Link>
        </div>
      </section>
    </div>
  );
}
