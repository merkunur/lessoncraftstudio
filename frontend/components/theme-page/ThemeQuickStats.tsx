import { sectionQuickStats } from '@/config/theme-page-labels';
import type { QuickStat } from '@/content/themes/types';

interface ThemeQuickStatsProps {
  stats: QuickStat[];
  locale: string;
}

export default function ThemeQuickStats({
  stats,
  locale,
}: ThemeQuickStatsProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section
      className="py-12 bg-white"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 300px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {sectionQuickStats[locale] || sectionQuickStats.en}
        </h2>
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-5 text-center"
            >
              <dt className="text-sm text-gray-500 mb-1">{stat.label}</dt>
              <dd className="text-2xl font-bold text-teal-600">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
