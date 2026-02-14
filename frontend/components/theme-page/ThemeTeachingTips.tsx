import type { TeachingTip } from '@/content/themes/types';
import {
  sectionTeachingTips,
  audienceTeacher,
  audienceParent,
  audienceBoth,
} from '@/config/theme-page-labels';

interface ThemeTeachingTipsProps {
  tips: TeachingTip[];
  locale: string;
}

// Accent color palette that cycles across cards
const accentColors = [
  { bg: 'bg-amber-100', text: 'text-amber-600' },
  { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  { bg: 'bg-rose-100', text: 'text-rose-600' },
  { bg: 'bg-teal-100', text: 'text-teal-600' },
  { bg: 'bg-stone-100', text: 'text-stone-600' },
  { bg: 'bg-purple-100', text: 'text-purple-600' },
];

// Audience badge styling
const audienceBadge: Record<string, { bg: string; text: string }> = {
  teacher: { bg: 'bg-purple-100', text: 'text-purple-700' },
  parent: { bg: 'bg-teal-100', text: 'text-teal-700' },
  both: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

function getAudienceLabel(audience: string, locale: string): string {
  if (audience === 'teacher') return audienceTeacher[locale] || audienceTeacher.en;
  if (audience === 'parent') return audienceParent[locale] || audienceParent.en;
  return audienceBoth[locale] || audienceBoth.en;
}

// Default lightbulb icon SVG
function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || 'w-6 h-6'}
      aria-hidden="true"
    >
      <path d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export default function ThemeTeachingTips({ tips, locale }: ThemeTeachingTipsProps) {
  if (!tips || tips.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {sectionTeachingTips[locale] || sectionTeachingTips.en}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, i) => {
            const accent = accentColors[i % accentColors.length];
            const badge = audienceBadge[tip.audience] || audienceBadge.both;
            return (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 relative">
                {/* Audience badge */}
                <span
                  className={`absolute top-4 right-4 text-xs font-medium px-2 py-0.5 rounded-full ${badge.bg} ${badge.text} whitespace-nowrap`}
                >
                  {getAudienceLabel(tip.audience, locale)}
                </span>
                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-3 pr-20">
                  <span className={`flex-shrink-0 w-10 h-10 rounded-lg ${accent.bg} ${accent.text} flex items-center justify-center`}>
                    {tip.icon ? (
                      <span className="text-lg" role="img">{tip.icon}</span>
                    ) : (
                      <LightbulbIcon className="w-5 h-5" />
                    )}
                  </span>
                  <h3 className="font-bold text-gray-900 leading-snug">{tip.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
