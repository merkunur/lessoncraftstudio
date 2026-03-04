/**
 * Cornerstone Guide Content Types
 *
 * Interfaces for business cornerstone guide pages (Page Type 4).
 * 12 guides x 11 locales = 132 content files.
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { SEOFields, PageVisuals, FAQItem, InternalLink } from '../app-content/types';

export type { SEOFields, PageVisuals, FAQItem, InternalLink };

export interface ContentSection {
  heading: string;
  content: string;
}

export interface ActionStep {
  step: string;
  description: string;
}

export interface ToolRecommendation {
  appId: string;
  title: string;
  description: string;
}

export interface CornerstoneContent {
  guideId: string;
  locale: SupportedLocale;

  seo: SEOFields;
  visuals: PageVisuals;

  hero: {
    title: string;
    subtitle: string;
    readingTime: string;
    description: string;
  };

  introduction: string;

  mainContent: ContentSection[];

  actionSteps: ActionStep[];

  toolsRecommended: ToolRecommendation[];

  faq: FAQItem[];

  internalLinks: InternalLink[];
}
