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
  baseUrl?: string;
  /** Set to true when a page already has its own BreadcrumbList JSON-LD (e.g. from schema-generator) */
  suppressSchema?: boolean;
  /** Visual variant: 'blog' renders transparent with white text for dark gradient backgrounds */
  variant?: 'default' | 'blog';
}

// Localized home labels
const HOME_LABELS: Record<string, string> = {
  en: 'Home',
  de: 'Startseite',
  fr: 'Accueil',
  es: 'Inicio',
  pt: 'In\u00edcio',
  it: 'Home',
  nl: 'Home',
  sv: 'Hem',
  da: 'Hjem',
  no: 'Hjem',
  fi: 'Etusivu'
};

export default function Breadcrumb({ items, locale, homeLabel, baseUrl, suppressSchema, variant = 'default' }: BreadcrumbProps) {
  const home = homeLabel || HOME_LABELS[locale] || 'Home';
  const siteUrl = baseUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": home,
        "item": `${siteUrl}/${locale}`
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": `${siteUrl}${item.href}` } : {})
      }))
    ]
  };

  const isBlog = variant === 'blog';

  return (
    <>
      {/* Schema markup \u2014 suppressed when page already has BreadcrumbList from schema-generator */}
      {!suppressSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Visible breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb"
        className={isBlog ? '' : 'bg-gray-50 border-b border-gray-200'}
        style={isBlog ? { paddingTop: '16px', paddingBottom: '8px' } : undefined}
      >
        <div className="container mx-auto px-4">
          <ol className="flex items-center py-3 text-sm overflow-x-auto">
            {/* Home link */}
            <li className="flex items-center">
              <Link
                href={`/${locale}`}
                className={isBlog
                  ? 'transition-colors flex items-center'
                  : 'text-gray-500 hover:text-primary transition-colors flex items-center'
                }
                style={isBlog ? { color: 'rgba(255,255,255,0.7)' } : undefined}
              >
                <Home className="h-4 w-4" style={isBlog ? { color: 'rgba(255,255,255,0.9)' } : undefined} />
                <span className={isBlog ? 'ml-1 hidden sm:inline' : 'ml-1 hidden sm:inline'}>{home}</span>
              </Link>
            </li>

            {/* Breadcrumb items */}
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight
                  className={isBlog ? 'h-4 w-4 mx-2 flex-shrink-0' : 'h-4 w-4 mx-2 text-gray-400 flex-shrink-0'}
                  style={isBlog ? { color: 'rgba(255,255,255,0.4)' } : undefined}
                />
                {item.href ? (
                  <Link
                    href={item.href}
                    className={isBlog
                      ? 'transition-colors whitespace-nowrap'
                      : 'text-gray-500 hover:text-primary transition-colors whitespace-nowrap'
                    }
                    style={isBlog ? { color: 'rgba(255,255,255,0.7)' } : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isBlog
                      ? 'font-medium whitespace-nowrap truncate max-w-[200px] sm:max-w-none'
                      : 'text-gray-900 font-medium whitespace-nowrap truncate max-w-[200px] sm:max-w-none'
                    }
                    style={isBlog ? { color: '#ffffff' } : undefined}
                  >
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
