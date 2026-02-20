import Link from 'next/link';
import type { ThemeComparison, ProductLink } from '@/content/themes/types';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import {
  sectionExpertInsights,
  labelRecommendedApps,
  labelLimitations,
  labelVs,
} from '@/config/theme-page-labels';

interface ThemeComparisonsProps {
  themeComparisons?: ThemeComparison[];
  productLinks?: ProductLink[];
  limitations?: string;
  themeName: string;
  locale: string;
  /** Map of themeId -> localized slug for comparison links */
  themeSlugMap: Record<string, string>;
}

export default function ThemeComparisons({
  themeComparisons,
  productLinks,
  limitations,
  themeName,
  locale,
  themeSlugMap,
}: ThemeComparisonsProps) {
  const hasComparisons = themeComparisons && themeComparisons.length > 0;
  const hasProductLinks = productLinks && productLinks.length > 0;
  const hasLimitations = !!limitations;

  if (!hasComparisons && !hasProductLinks && !hasLimitations) return null;

  return (
    <section
      className="py-12"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {sectionExpertInsights[locale] || sectionExpertInsights.en}
        </h2>

        {/* Theme comparisons */}
        {hasComparisons && (
          <div className="space-y-4 mb-8">
            {themeComparisons!.map((comp, i) => {
              const vsSlug = themeSlugMap[comp.vsThemeId];
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4"
                >
                  <span className="flex-shrink-0 inline-flex items-center justify-center bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    {labelVs[locale] || labelVs.en}
                  </span>
                  <div className="flex-1 min-w-0">
                    {vsSlug ? (
                      <Link
                        href={`/${locale}/worksheets/${vsSlug}`}
                        className="font-semibold text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        {comp.vsThemeId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </Link>
                    ) : (
                      <span className="font-semibold text-gray-900">
                        {comp.vsThemeId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">
                      {comp.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Product links */}
        {hasProductLinks && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {labelRecommendedApps[locale] || labelRecommendedApps.en}
            </h3>
            <div className="space-y-3">
              {productLinks!.map((pl, i) => {
                const appSlug =
                  getSlugForLocale(pl.appId, locale as SupportedLocale) ||
                  pl.appId;
                // Build context with anchorText linked
                const parts = pl.context.split(pl.anchorText);
                return (
                  <p key={i} className="text-gray-700 leading-relaxed">
                    {parts[0]}
                    <Link
                      href={`/${locale}/apps/${appSlug}`}
                      className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
                    >
                      {pl.anchorText}
                    </Link>
                    {parts.slice(1).join(pl.anchorText)}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {/* Limitations callout */}
        {hasLimitations && (
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">
              {labelLimitations[locale] || labelLimitations.en}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {limitations}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
