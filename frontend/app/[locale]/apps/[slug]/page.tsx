import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getAppConfigBySlug, getAllProductPageSlugs, getAlternateUrls, getSlugForLocale } from '@/config/product-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import AppContent from './AppContent';

// App display names (keyed by product-page-slugs appId)
const appDisplayNames: Record<string, string> = {
  'word-search': 'Word Search',
  'image-addition': 'Addition',
  'alphabet-train': 'Alphabet Train',
  'coloring': 'Coloring',
  'math-worksheet': 'Math Worksheet',
  'word-scramble': 'Word Scramble',
  'find-and-count': 'Find & Count',
  'matching-app': 'Matching',
  'drawing-lines': 'Drawing Lines',
  'picture-bingo': 'Bingo',
  'sudoku': 'Sudoku',
  'big-small-app': 'Big & Small',
  'chart-count-color': 'Chart Count',
  'code-addition': 'Code Addition',
  'draw-and-color': 'Draw & Color',
  'find-objects': 'Find Objects',
  'grid-match': 'Grid Match',
  'image-crossword': 'Crossword',
  'image-cryptogram': 'Cryptogram',
  'math-puzzle': 'Math Puzzle',
  'missing-pieces': 'Missing Pieces',
  'more-less': 'More or Less',
  'odd-one-out': 'Odd One Out',
  'pattern-train': 'Pattern Train',
  'pattern-worksheet': 'Pattern Worksheet',
  'picture-path': 'Picture Path',
  'picture-sort': 'Picture Sort',
  'prepositions': 'Prepositions',
  'shadow-match': 'Shadow Match',
  'subtraction': 'Subtraction',
  'treasure-hunt': 'Treasure Hunt',
  'word-guess': 'Word Guess',
  'writing-app': 'Writing',
  'story-dice': 'Story Dice',
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const allSlugs = getAllProductPageSlugs();
  return allSlugs.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;
  const baseUrl = 'https://www.lessoncraftstudio.com';

  const appConfig = getAppConfigBySlug(slug);
  if (!appConfig) return {};

  const appName = appDisplayNames[appConfig.appId] || appConfig.appId;
  const title = `${appName} Worksheet Generator | LessonCraftStudio`;
  const description = `Create professional ${appName.toLowerCase()} worksheets with our free generator. Download PDF instantly.`;

  // Generate hreflang alternates
  const alternateUrls = getAlternateUrls(appConfig.appId, baseUrl);

  const localeSlug = getSlugForLocale(appConfig.appId, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/apps/${localeSlug || slug}`,
      languages: alternateUrls,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/apps/${localeSlug || slug}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const appConfig = getAppConfigBySlug(slug);
  if (!appConfig) {
    notFound();
  }

  const appName = appDisplayNames[appConfig.appId] || appConfig.appId;

  return (
    <div className="min-h-screen">
      <AppContent
        appSlug={appConfig.appId}
        locale={locale}
        appName={appName}
        requiredTier="free"
      />
    </div>
  );
}
