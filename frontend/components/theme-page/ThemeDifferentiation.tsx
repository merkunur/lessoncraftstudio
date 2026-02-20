import { sectionDifferentiation } from '@/config/theme-page-labels';
import type { DifferentiationStrategy } from '@/content/themes/types';

interface ThemeDifferentiationProps {
  strategies: DifferentiationStrategy[];
  locale: string;
}

const borderColors = [
  'border-teal-400',
  'border-emerald-400',
  'border-amber-400',
  'border-purple-400',
];

export default function ThemeDifferentiation({
  strategies,
  locale,
}: ThemeDifferentiationProps) {
  if (!strategies || strategies.length === 0) return null;

  return (
    <section
      className="py-12 bg-emerald-50"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {sectionDifferentiation[locale] || sectionDifferentiation.en}
        </h2>
        <div className="space-y-4">
          {strategies.map((strategy, i) => (
            <div
              key={i}
              className={`bg-white border-l-4 ${borderColors[i % borderColors.length]} rounded-r-xl p-5`}
            >
              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-2">
                {strategy.learnerType}
              </span>
              <p className="text-gray-700 leading-relaxed">{strategy.adaptation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
