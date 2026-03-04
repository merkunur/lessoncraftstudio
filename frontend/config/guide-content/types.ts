/**
 * "Create X" Guide Content Types
 *
 * Interfaces for mid-funnel guide pages (Page Type 5).
 * 65 guides x 11 locales = 715 content files.
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { SEOFields, PageVisuals, FAQItem, InternalLink } from '../app-content/types';

export type { SEOFields, PageVisuals, FAQItem, InternalLink };

export interface TutorialStep {
  title: string;
  description: string;
}

export interface PlatformTip {
  platform: string;
  title: string;
  description: string;
}

export interface MonetizationStrategy {
  title: string;
  description: string;
}

export interface CreateXContent {
  guideId: string;
  locale: SupportedLocale;

  seo: SEOFields;
  visuals: PageVisuals;

  hero: {
    title: string;
    description: string;
  };

  introduction: string;

  tutorial: {
    title: string;
    steps: TutorialStep[];
  };

  platformTips: PlatformTip[];

  monetization: MonetizationStrategy[];

  examples: string;

  faq: FAQItem[];

  internalLinks: InternalLink[];
}
