import { sectionClassroomScenarios } from '@/config/theme-page-labels';
import type { ClassroomScenario } from '@/content/themes/types';

interface ThemeClassroomScenariosProps {
  scenarios: ClassroomScenario[];
  locale: string;
}

export default function ThemeClassroomScenarios({
  scenarios,
  locale,
}: ThemeClassroomScenariosProps) {
  if (!scenarios || scenarios.length === 0) return null;

  return (
    <section
      className="py-12"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {sectionClassroomScenarios[locale] || sectionClassroomScenarios.en}
        </h2>
        <div className="space-y-6">
          {scenarios.map((scenario, i) => (
            <article key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-l-4 border-amber-400 p-5">
                <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-1">
                  Situation
                </p>
                <p className="text-gray-700 leading-relaxed">{scenario.situation}</p>
              </div>
              <div className="border-l-4 border-green-500 p-5">
                <p className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">
                  Solution
                </p>
                <p className="text-gray-700 leading-relaxed">{scenario.solution}</p>
              </div>
              <div className="border-l-4 border-purple-400 p-5">
                <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide mb-1">
                  Outcome
                </p>
                <p className="text-gray-700 leading-relaxed">{scenario.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
