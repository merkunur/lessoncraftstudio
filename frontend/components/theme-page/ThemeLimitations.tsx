import { labelLimitations } from '@/config/theme-page-labels';

interface ThemeLimitationsProps {
  limitations: string;
  locale: string;
}

export default function ThemeLimitations({
  limitations,
  locale,
}: ThemeLimitationsProps) {
  if (!limitations) return null;

  return (
    <section
      className="py-12"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 200px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5">
          <h2 className="font-semibold text-gray-900 text-sm mb-2">
            {labelLimitations[locale] || labelLimitations.en}
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{limitations}</p>
        </div>
      </div>
    </section>
  );
}
