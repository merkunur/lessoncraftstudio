/**
 * Free Tool Landing Page Content Types
 *
 * Interfaces for free tool landing pages (Page Type 2).
 * 33 tools x 11 locales = 363 content files.
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { SEOFields, PageVisuals, FAQItem, InternalLink } from '../app-content/types';

export type { SEOFields, PageVisuals, FAQItem, InternalLink };

export interface ProductExample {
  title: string;
  description: string;
}

export interface TutorialStep {
  title: string;
  description: string;
}

export interface BusinessIdea {
  title: string;
  description: string;
  platform: string;
}

export interface ProTip {
  title: string;
  tip: string;
}

export interface FreeToolContent {
  appId: string;
  locale: SupportedLocale;

  seo: SEOFields;
  visuals: PageVisuals;

  hero: {
    title: string;
    tagline: string;
    description: string;
  };

  whatYouCanCreate: ProductExample[];

  tutorial: {
    title: string;
    steps: TutorialStep[];
  };

  businessIdeas: BusinessIdea[];

  proTips: ProTip[];

  faq: FAQItem[];

  internalLinks: InternalLink[];
}
