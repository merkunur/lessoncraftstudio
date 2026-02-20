import Link from 'next/link';
import type { WorksheetSuggestion } from '@/content/themes/types';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import {
  sectionGradeEducational,
  labelDevelopmentalNotes,
  sectionTeachingTips,
  labelQuickAnswer,
  labelKeyMilestone,
  labelRecommendedActivities,
} from '@/config/theme-page-labels';
import { getLocalizedAppDisplayName } from '@/lib/theme-images';

interface GradeEducationalContentProps {
  gradeIntro: string;
  developmentalNotes: string;
  teachingTips: string[];
  gradeName: string;
  themeName: string;
  locale: string;
  /** H1 heading override (replaces auto-generated heading) */
  heading?: string;
  /** 50-word unique summary for HCU compliance */
  uniqueSummary?: string;
  /** Direct answer for featured snippet targeting */
  snippetAnswer?: string;
  /** Specific worksheet activity recommendations */
  worksheetSuggestions?: WorksheetSuggestion[];
  /** Research-backed developmental milestone */
  developmentalMilestone?: string;
}

export default function GradeEducationalContent({
  gradeIntro,
  developmentalNotes,
  teachingTips,
  gradeName,
  themeName,
  locale,
  heading: headingOverride,
  uniqueSummary,
  snippetAnswer,
  worksheetSuggestions,
  developmentalMilestone,
}: GradeEducationalContentProps) {
  const autoHeading = (sectionGradeEducational[locale] || sectionGradeEducational.en)
    .replace('{gradeName}', gradeName)
    .replace('{themeName}', themeName);

  const displayHeading = headingOverride || autoHeading;

  return (
    <section id="grade-educational-content" className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {displayHeading}
        </h2>

        {/* Snippet answer callout (placed first for AI extraction) */}
        {snippetAnswer && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
            <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {labelQuickAnswer[locale] || labelQuickAnswer.en}
            </span>
            <p className="text-gray-800 font-medium leading-relaxed">
              {snippetAnswer}
            </p>
          </div>
        )}

        {/* Unique summary or full intro paragraph */}
        {uniqueSummary ? (
          <>
            <p className="text-gray-800 font-medium leading-relaxed mb-4">
              {uniqueSummary}
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">{gradeIntro}</p>
          </>
        ) : (
          <p className="text-gray-700 leading-relaxed mb-8">{gradeIntro}</p>
        )}

        {/* Developmental notes callout */}
        {developmentalNotes && (
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5 mb-8">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">
              {labelDevelopmentalNotes[locale] || labelDevelopmentalNotes.en}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {developmentalNotes}
            </p>
            {developmentalMilestone && (
              <p className="text-gray-700 text-sm leading-relaxed mt-3">
                <strong className="text-amber-800">
                  {labelKeyMilestone[locale] || labelKeyMilestone.en}:
                </strong>{' '}
                {developmentalMilestone}
              </p>
            )}
          </div>
        )}

        {/* Worksheet suggestions */}
        {worksheetSuggestions && worksheetSuggestions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {labelRecommendedActivities[locale] || labelRecommendedActivities.en}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {worksheetSuggestions.map((ws, i) => {
                const appSlug =
                  getSlugForLocale(ws.appId, locale as SupportedLocale) ||
                  ws.appId;
                return (
                  <Link
                    key={i}
                    href={`/${locale}/apps/${appSlug}`}
                    className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:bg-teal-50 transition-colors group"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 mb-1">
                      {ws.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {ws.description}
                    </p>
                    <span className="text-teal-600 text-xs font-medium mt-2 inline-block">
                      {getLocalizedAppDisplayName(ws.appId, locale)} &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Teaching tips numbered list */}
        {teachingTips.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {sectionTeachingTips[locale] || sectionTeachingTips.en}
            </h3>
            <ol className="space-y-3">
              {teachingTips.map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed pt-0.5">{tip}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
