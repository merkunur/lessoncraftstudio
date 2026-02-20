import { sectionHowTo } from '@/config/theme-page-labels';

interface ThemeHowToProps {
  steps: string[];
  themeName: string;
  locale: string;
}

export default function ThemeHowTo({
  steps,
  themeName,
  locale,
}: ThemeHowToProps) {
  if (steps.length === 0) return null;

  const heading = (sectionHowTo[locale] || sectionHowTo.en).replace(
    '{themeName}',
    themeName,
  );

  return (
    <section
      className="py-12 bg-white"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {heading}
        </h2>

        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
