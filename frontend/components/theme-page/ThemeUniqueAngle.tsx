import { sectionUniqueAngle } from '@/config/theme-page-labels';

interface ThemeUniqueAngleProps {
  uniqueAngle: string;
  researchCitation?: string;
  culturalNotes?: string;
  themeName: string;
  locale: string;
}

export default function ThemeUniqueAngle({
  uniqueAngle,
  researchCitation,
  culturalNotes,
  themeName,
  locale,
}: ThemeUniqueAngleProps) {
  const heading = (
    sectionUniqueAngle[locale] || sectionUniqueAngle.en
  ).replace('{themeName}', themeName);

  return (
    <section
      className="py-12 bg-purple-50"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {heading}
        </h2>

        {/* Unique angle prose */}
        <p className="text-gray-700 leading-relaxed mb-6">{uniqueAngle}</p>

        {/* Research citation callout */}
        {researchCitation && (
          <blockquote className="border-l-4 border-purple-300 bg-white rounded-r-lg p-5 mb-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-sm text-gray-600 italic leading-relaxed">
                {researchCitation}
              </p>
            </div>
          </blockquote>
        )}

        {/* Cultural notes callout (non-EN) */}
        {culturalNotes && (
          <div className="bg-white border border-purple-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-gray-600 leading-relaxed">
                {culturalNotes}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
