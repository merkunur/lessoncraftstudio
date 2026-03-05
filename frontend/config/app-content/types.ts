export interface AppContentSEO {
  primaryKeyword: string;
  secondaryKeywords: string[];
  lsiKeywords: string[];
  titleTag: string;
  metaDescription: string;
}

export interface AppContentHero {
  title: string;
  tagline: string;
  description: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface BusinessUseCase {
  title: string;
  description: string;
  platform?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface InternalLink {
  pageType: 'app' | 'tool' | 'bundle' | 'start' | 'guide' | 'idea';
  slug: string;
  anchorText: string;
}

export interface PageVisuals {
  heroImages: {
    primary: string;
    secondary?: string;
    primaryAlt: string;
    secondaryAlt?: string;
  };
  sampleGallery: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  themeImages?: Array<{
    src: string;
    alt: string;
    theme: string;
  }>;
  youtubeId: string;
  videoTitle: string;
}

export interface AppContent {
  seo: AppContentSEO;
  hero: AppContentHero;
  howItWorks: { title: string; steps: HowItWorksStep[] };
  keyFeatures: { title: string; features: KeyFeature[] };
  businessUseCases: { title: string; cases: BusinessUseCase[] };
  faq: FAQ[];
  internalLinks: InternalLink[];
  visuals: PageVisuals;
}
