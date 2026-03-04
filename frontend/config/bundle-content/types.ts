/**
 * Bundle Sales Page Content Types
 *
 * Interfaces for bundle sales pages (Page Type 3).
 * 6 bundles x 11 locales = 66 content files.
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { SEOFields, PageVisuals, FAQItem, InternalLink } from '../app-content/types';

export type { SEOFields, PageVisuals, FAQItem, InternalLink };

export interface AppSummary {
  appId: string;
  title: string;
  description: string;
}

export interface BundleBenefit {
  title: string;
  description: string;
}

export interface BusinessUseCase {
  title: string;
  description: string;
  appsUsed: string[];
}

export interface BundleContent {
  bundleId: string;
  locale: SupportedLocale;

  seo: SEOFields;
  visuals: PageVisuals;

  hero: {
    title: string;
    tagline: string;
    description: string;
  };

  appsIncluded: AppSummary[];

  bundleBenefits: BundleBenefit[];

  businessUseCases: BusinessUseCase[];

  faq: FAQItem[];

  internalLinks: InternalLink[];
}
