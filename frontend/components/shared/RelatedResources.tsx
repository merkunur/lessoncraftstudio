import Link from 'next/link';
import type { PageType } from '@/lib/link-equity-map';

// ── Types ───────────────────────────────────────────────────────────────────

export interface RelatedResource {
  href: string;
  title: string;
  description: string;
  pageType: PageType;
}

// ── Badge styling per page type ─────────────────────────────────────────────

const BADGE_STYLES: Partial<Record<PageType, { bg: string; text: string; label: string }>> = {
  'theme-hub':    { bg: 'bg-teal-100',   text: 'text-teal-700',  label: 'Theme' },
  'grade-page':   { bg: 'bg-blue-100',   text: 'text-blue-700',  label: 'Grade' },
  'product-page': { bg: 'bg-amber-100',  text: 'text-amber-700', label: 'App' },
  'blog-post':    { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Article' },
  'grade-hub':    { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Grade Hub' },
};

// ── Localized section heading ───────────────────────────────────────────────

const SECTION_HEADING: Record<string, string> = {
  en: 'Related Resources',
  de: 'Verwandte Ressourcen',
  fr: 'Ressources associ\u00e9es',
  es: 'Recursos relacionados',
  pt: 'Recursos relacionados',
  it: 'Risorse correlate',
  nl: 'Gerelateerde bronnen',
  sv: 'Relaterade resurser',
  da: 'Relaterede ressourcer',
  no: 'Relaterte ressurser',
  fi: 'Aiheeseen liittyv\u00e4t resurssit',
};

// ── Component ───────────────────────────────────────────────────────────────

interface Props {
  locale: string;
  resources: RelatedResource[];
  heading?: string;
}

export default function RelatedResources({ locale, resources, heading }: Props) {
  if (resources.length === 0) return null;

  const sectionHeading = heading || SECTION_HEADING[locale] || SECTION_HEADING.en;

  return (
    <section
      className="py-12 bg-gray-50"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {sectionHeading}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {resources.map((resource) => {
            const badge = BADGE_STYLES[resource.pageType];
            return (
              <Link
                key={resource.href}
                href={resource.href}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-teal-300 transition-all flex flex-col gap-2"
              >
                {badge && (
                  <span
                    className={`inline-block self-start text-xs font-medium px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}
                  >
                    {badge.label}
                  </span>
                )}
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                  {resource.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
