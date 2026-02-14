import {
  sectionGradeEducational,
  labelDevelopmentalNotes,
  sectionTeachingTips,
} from '@/config/theme-page-labels';

interface GradeEducationalContentProps {
  gradeIntro: string;
  developmentalNotes: string;
  teachingTips: string[];
  gradeName: string;
  themeName: string;
  locale: string;
}

export default function GradeEducationalContent({
  gradeIntro,
  developmentalNotes,
  teachingTips,
  gradeName,
  themeName,
  locale,
}: GradeEducationalContentProps) {
  const heading = (sectionGradeEducational[locale] || sectionGradeEducational.en)
    .replace('{gradeName}', gradeName)
    .replace('{themeName}', themeName);

  return (
    <section id="grade-educational-content" className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {heading}
        </h2>

        {/* Full intro paragraph */}
        <p className="text-gray-700 leading-relaxed mb-8">{gradeIntro}</p>

        {/* Developmental notes callout */}
        {developmentalNotes && (
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5 mb-8">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">
              {labelDevelopmentalNotes[locale] || labelDevelopmentalNotes.en}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {developmentalNotes}
            </p>
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
