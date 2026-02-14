import type { Activity, CurriculumArea } from '@/content/themes/types';
import {
  sectionActivities,
  labelMaterials,
  labelSkills,
  labelDuration,
} from '@/config/theme-page-labels';

interface ThemeActivitiesProps {
  activities: Activity[];
  locale: string;
}

// Skill badge colors per curriculum area (same palette as ThemeLearningObjectives)
const areaBadge: Record<CurriculumArea, { bg: string; text: string }> = {
  math: { bg: 'bg-blue-100', text: 'text-blue-700' },
  literacy: { bg: 'bg-green-100', text: 'text-green-700' },
  motor: { bg: 'bg-orange-100', text: 'text-orange-700' },
  cognitive: { bg: 'bg-purple-100', text: 'text-purple-700' },
  creative: { bg: 'bg-pink-100', text: 'text-pink-700' },
  social: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

// Short display labels per area
const areaLabel: Record<CurriculumArea, string> = {
  math: 'Math',
  literacy: 'Literacy',
  motor: 'Motor',
  cognitive: 'Cognitive',
  creative: 'Creative',
  social: 'Social',
};

// Icon background accent mapped to primary skill area
const areaIconBg: Record<CurriculumArea, string> = {
  math: 'bg-blue-100 text-blue-600',
  literacy: 'bg-green-100 text-green-600',
  motor: 'bg-orange-100 text-orange-600',
  cognitive: 'bg-purple-100 text-purple-600',
  creative: 'bg-pink-100 text-pink-600',
  social: 'bg-amber-100 text-amber-600',
};

export default function ThemeActivities({ activities, locale }: ThemeActivitiesProps) {
  if (activities.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {sectionActivities[locale] || sectionActivities.en}
        </h2>
        <div className="space-y-6">
          {activities.map((act, i) => {
            const primaryArea = act.skillAreas[0] || 'cognitive';
            const iconBg = areaIconBg[primaryArea] || areaIconBg.cognitive;

            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 relative"
              >
                {/* Header: icon + title + duration badge */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon circle */}
                  <div className={`flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${iconBg}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-gray-900 text-lg">{act.title}</h3>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {act.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4">{act.description}</p>

                {/* Footer: materials + skill badges */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 text-sm">
                  {/* Materials */}
                  {act.materials.length > 0 && (
                    <div className="flex items-start gap-2 text-gray-500">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      <span>
                        <strong className="text-gray-700">{labelMaterials[locale] || labelMaterials.en}:</strong>{' '}
                        {act.materials.join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Skill badges */}
                  {act.skillAreas.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-gray-500 font-medium">{labelSkills[locale] || labelSkills.en}:</span>
                      {act.skillAreas.map((area) => {
                        const badge = areaBadge[area] || areaBadge.cognitive;
                        return (
                          <span
                            key={area}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
                          >
                            {areaLabel[area] || area}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
