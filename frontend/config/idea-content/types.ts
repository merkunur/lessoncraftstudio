/**
 * Niche/Theme Idea Page Content Types
 *
 * Interfaces for niche idea pages (Page Type 6).
 * 45 pages x 11 locales = 495 content files.
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { SEOFields, PageVisuals, FAQItem, InternalLink } from '../app-content/types';

export type { SEOFields, PageVisuals, FAQItem, InternalLink };

export interface ProductIdea {
  title: string;
  description: string;
  appId: string;
}

export interface PlatformTip {
  platform: string;
  title: string;
  description: string;
}

export interface NicheIdeaContent {
  ideaId: string;
  locale: SupportedLocale;

  seo: SEOFields;
  visuals: PageVisuals;

  hero: {
    title: string;
    description: string;
  };

  marketOverview: string;

  productIdeas: ProductIdea[];

  howToCreate: string;

  platformTips: PlatformTip[];

  pricingIdeas: string;

  faq: FAQItem[];

  internalLinks: InternalLink[];
}
