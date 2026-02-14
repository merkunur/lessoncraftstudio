import Link from 'next/link';
import type { CurriculumAlignment } from '@/content/themes/types';
import { getLocalizedAppDisplayName } from '@/lib/theme-images';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import { sectionCurriculumAlignment } from '@/config/theme-page-labels';

interface ThemeCurriculumNotesProps {
  alignments: CurriculumAlignment[];
  locale: string;
}

export default function ThemeCurriculumNotes({ alignments, locale }: ThemeCurriculumNotesProps) {
  if (!alignments || alignments.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {sectionCurriculumAlignment[locale] || sectionCurriculumAlignment.en}
        </h2>
        <div className="space-y-4">
          {alignments.map((alignment, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6"
            >
              {/* Standard badge + framework */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 font-bold text-sm">
                  {alignment.standard}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  {alignment.framework}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {alignment.description}
              </p>

              {/* Related apps */}
              {alignment.relatedAppIds.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {alignment.relatedAppIds.map((appId, j) => {
                    const slug = getSlugForLocale(appId, locale as SupportedLocale);
                    const name = getLocalizedAppDisplayName(appId, locale);
                    return (
                      <span key={appId}>
                        {slug ? (
                          <Link
                            href={`/${locale}/apps/${slug}`}
                            className="text-purple-600 hover:text-purple-800 font-medium underline decoration-purple-300 underline-offset-2"
                          >
                            {name}
                          </Link>
                        ) : (
                          <span className="text-gray-700 font-medium">{name}</span>
                        )}
                        {j < alignment.relatedAppIds.length - 1 && (
                          <span className="text-gray-300 mx-1">&middot;</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
