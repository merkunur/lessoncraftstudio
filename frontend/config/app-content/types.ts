/**
 * App Detail Page Content Types
 *
 * Interfaces for enriched app detail page content (Page Type 1).
 * 33 apps x 11 locales = 363 content files.
 */

import type { SupportedLocale } from '../product-page-slugs';

// ==========================================
// SHARED BASE INTERFACES
// ==========================================

export interface SEOFields {
  titleTag: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  lsiKeywords: string[];
}

export interface HeroImages {
  primary: string;
  secondary?: string;
  primaryAlt: string;
  secondaryAlt?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ThemeImage {
  src: string;
  alt: string;
  theme: string;
}

export interface PageVisuals {
  heroImages: HeroImages;
  sampleGallery: GalleryImage[];
  themeImages?: ThemeImage[];
  youtubeId: string;
  videoTitle: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLink {
  slug: string;
  pageType: 'app' | 'tool' | 'bundle' | 'start' | 'guide' | 'idea';
  anchorText: string;
}

// ==========================================
// APP DETAIL CONTENT INTERFACE
// ==========================================

export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface BusinessUseCase {
  title: string;
  description: string;
  platform: string;
}

export interface AppDetailContent {
  appId: string;
  locale: SupportedLocale;
  category: string;

  seo: SEOFields;
  visuals: PageVisuals;

  hero: {
    title: string;
    tagline: string;
    description: string;
  };

  howItWorks: {
    title: string;
    steps: HowItWorksStep[];
  };

  features: Feature[];

  businessUseCases: BusinessUseCase[];

  faq: FAQItem[];

  internalLinks: InternalLink[];
}
