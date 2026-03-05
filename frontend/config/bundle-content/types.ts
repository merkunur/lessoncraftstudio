export interface BundleContent {
  seo: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    lsiKeywords: string[];
    titleTag: string;
    metaDescription: string;
  };
  hero: { title: string; tagline: string; description: string };
  appsIncluded: { title: string; description: string }[];
  bundleBenefits: { title: string; description: string }[];
  businessUseCases: { title: string; description: string; platform?: string }[];
  featureComparison: { feature: string; commercial: string; fullAccess: string }[];
  whoIsThisFor: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  internalLinks: { pageType: string; slug: string; anchorText: string }[];
  visuals: {
    heroImages: { primary: string; primaryAlt: string };
    sampleGallery: { src: string; alt: string; caption?: string }[];
    youtubeId: string;
    videoTitle: string;
  };
}
