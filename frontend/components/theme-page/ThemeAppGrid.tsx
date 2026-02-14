import Image from 'next/image';
import Link from 'next/link';
import type { AppCategoryGroup, AppCategory } from '@/content/themes/types';
import { getLocalizedAppDisplayName } from '@/lib/theme-images';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import {
  tryNowLabel,
  viewAllAppsLabel,
  categoryMath,
  categoryLiteracy,
  categoryVisual,
  categoryPuzzles,
} from '@/config/theme-page-labels';

interface ThemeAppGridProps {
  appCategories: AppCategoryGroup[];
  thumbnailMap: Record<string, string>;
  locale: string;
}

// Category heading labels keyed by AppCategory
const categoryLabels: Record<AppCategory, Record<string, string>> = {
  math: categoryMath,
  literacy: categoryLiteracy,
  visual: categoryVisual,
  puzzles: categoryPuzzles,
};

// Accent colors per category
const categoryAccent: Record<AppCategory, { bg: string; text: string; iconBg: string }> = {
  math: { bg: 'bg-blue-100', text: 'text-blue-700', iconBg: 'bg-blue-100 text-blue-600' },
  literacy: { bg: 'bg-green-100', text: 'text-green-700', iconBg: 'bg-green-100 text-green-600' },
  visual: { bg: 'bg-pink-100', text: 'text-pink-700', iconBg: 'bg-pink-100 text-pink-600' },
  puzzles: { bg: 'bg-purple-100', text: 'text-purple-700', iconBg: 'bg-purple-100 text-purple-600' },
};

// Inline SVG icons per category
function CategoryIcon({ category }: { category: AppCategory }) {
  switch (category) {
    case 'math':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h4v4H4V5zm0 10h4v4H4v-4zm12-10h4v4h-4V5zm0 10h4v4h-4v-4zm-6-5h4v4h-4v-4z" />
        </svg>
      );
    case 'literacy':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'visual':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    case 'puzzles':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      );
  }
}

export default function ThemeAppGrid({ appCategories, thumbnailMap, locale }: ThemeAppGridProps) {
  // Filter out empty categories
  const nonEmpty = appCategories.filter(g => g.appIds.length > 0);
  if (nonEmpty.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {nonEmpty.map((group) => {
            const accent = categoryAccent[group.category];
            const labels = categoryLabels[group.category];
            const heading = labels[locale] || labels.en;

            return (
              <div key={group.category}>
                {/* Category heading */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${accent.iconBg}`}>
                    <CategoryIcon category={group.category} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{heading}</h3>
                </div>

                {/* App cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {group.appIds.map((appId) => {
                    const slug = getSlugForLocale(appId, locale as SupportedLocale) || appId;
                    const displayName = getLocalizedAppDisplayName(appId, locale);

                    return (
                      <Link
                        key={appId}
                        href={`/${locale}/apps/${slug}`}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                      >
                        {thumbnailMap[appId] ? (
                          <div className="relative aspect-[3/4] bg-gray-50">
                            <Image
                              src={thumbnailMap[appId]}
                              alt={displayName}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="aspect-[3/4] bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center p-4">
                            <span className="text-white text-center font-semibold text-lg">
                              {displayName}
                            </span>
                          </div>
                        )}
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {displayName}
                          </h3>
                          <span className="mt-auto inline-flex items-center text-purple-600 text-sm font-medium">
                            {tryNowLabel[locale] || tryNowLabel.en}
                            <span className="ml-1" aria-hidden="true">&rarr;</span>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Apps button */}
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/apps`}
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            {viewAllAppsLabel[locale] || viewAllAppsLabel.en}
          </Link>
        </div>
      </div>
    </section>
  );
}
