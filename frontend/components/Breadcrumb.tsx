'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: string;
  homeLabel?: string;
}

// Localized home labels
const HOME_LABELS: Record<string, string> = {
  en: 'Home',
  de: 'Startseite',
  fr: 'Accueil',
  es: 'Inicio',
  pt: 'Inicio',
  it: 'Home',
  nl: 'Home',
  sv: 'Hem',
  da: 'Hjem',
  no: 'Hjem',
  fi: 'Etusivu'
};

export default function Breadcrumb({ items, locale, homeLabel }: BreadcrumbProps) {
  const home = homeLabel || HOME_LABELS[locale] || 'Home';

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": home,
        "item": `https://lessoncraftstudio.com/${locale}`
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": `https://lessoncraftstudio.com${item.href}` } : {})
      }))
    ]
  };

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visible breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <ol className="flex items-center py-3 text-sm overflow-x-auto">
            {/* Home link */}
            <li className="flex items-center">
              <Link
                href={`/${locale}`}
                className="text-gray-500 hover:text-primary transition-colors flex items-center"
              >
                <Home className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">{home}</span>
              </Link>
            </li>

            {/* Breadcrumb items */}
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium whitespace-nowrap truncate max-w-[200px] sm:max-w-none">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
