import {
  sectionAssessment,
  labelEmerging,
  labelProficient,
  labelAdvanced,
} from '@/config/theme-page-labels';
import type { AssessmentIdea, AssessmentRubric } from '@/content/themes/types';

interface ThemeAssessmentProps {
  assessmentIdeas?: AssessmentIdea[];
  assessmentRubric?: AssessmentRubric[];
  locale: string;
}

export default function ThemeAssessment({
  assessmentIdeas,
  assessmentRubric,
  locale,
}: ThemeAssessmentProps) {
  const hasIdeas = assessmentIdeas && assessmentIdeas.length > 0;
  const hasRubric = assessmentRubric && assessmentRubric.length > 0;

  if (!hasIdeas && !hasRubric) return null;

  const emergingLabel = labelEmerging[locale] || labelEmerging.en;
  const proficientLabel = labelProficient[locale] || labelProficient.en;
  const advancedLabel = labelAdvanced[locale] || labelAdvanced.en;

  return (
    <section
      className="py-12"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {sectionAssessment[locale] || sectionAssessment.en}
        </h2>

        {/* Assessment Ideas */}
        {hasIdeas && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {assessmentIdeas!.map((idea, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{idea.method}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{idea.criteria}</p>
                <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {idea.gradeLevel}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Assessment Rubric */}
        {hasRubric && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">
                      Skill
                    </th>
                    <th className="text-left p-3 font-semibold text-amber-700 border-b border-gray-200">
                      {emergingLabel}
                    </th>
                    <th className="text-left p-3 font-semibold text-teal-700 border-b border-gray-200">
                      {proficientLabel}
                    </th>
                    <th className="text-left p-3 font-semibold text-purple-700 border-b border-gray-200">
                      {advancedLabel}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentRubric!.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-medium text-gray-900 border-b border-gray-100">
                        {row.skill}
                      </td>
                      <td className="p-3 text-gray-600 border-b border-gray-100">
                        {row.emerging}
                      </td>
                      <td className="p-3 text-gray-600 border-b border-gray-100">
                        {row.proficient}
                      </td>
                      <td className="p-3 text-gray-600 border-b border-gray-100">
                        {row.advanced}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked cards */}
            <div className="md:hidden space-y-4">
              {assessmentRubric!.map((row, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">{row.skill}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="border-l-4 border-amber-400 pl-3">
                      <span className="font-semibold text-amber-700">{emergingLabel}:</span>{' '}
                      <span className="text-gray-600">{row.emerging}</span>
                    </div>
                    <div className="border-l-4 border-teal-400 pl-3">
                      <span className="font-semibold text-teal-700">{proficientLabel}:</span>{' '}
                      <span className="text-gray-600">{row.proficient}</span>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-3">
                      <span className="font-semibold text-purple-700">{advancedLabel}:</span>{' '}
                      <span className="text-gray-600">{row.advanced}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
