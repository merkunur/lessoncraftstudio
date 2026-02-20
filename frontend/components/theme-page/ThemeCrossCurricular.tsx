import { sectionCrossCurricular } from '@/config/theme-page-labels';
import type { CrossCurricularLink } from '@/content/themes/types';

interface ThemeCrossCurricularProps {
  links: CrossCurricularLink[];
  locale: string;
}

export default function ThemeCrossCurricular({
  links,
  locale,
}: ThemeCrossCurricularProps) {
  if (!links || links.length === 0) return null;

  return (
    <section
      className="py-12 bg-white"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {sectionCrossCurricular[locale] || sectionCrossCurricular.en}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {links.map((link, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5">
              <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                {link.subject}
              </span>
              <p className="text-gray-700 leading-relaxed mb-3">{link.connection}</p>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">Activity: </span>
                  {link.activity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
