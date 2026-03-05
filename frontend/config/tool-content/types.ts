export interface ToolContent {
  seo: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    lsiKeywords: string[];
    titleTag: string;
    metaDescription: string;
  };
  hero: { title: string; tagline: string; description: string };
  tutorial: { title: string; steps: { title: string; description: string }[] };
  whatYouCanCreate: { title: string; description: string }[];
  businessIdeas: { title: string; description: string; platform?: string }[];
  proTips: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  internalLinks: { pageType: string; slug: string; anchorText: string }[];
  visuals: {
    heroImages: { primary: string; primaryAlt: string };
    sampleGallery: { src: string; alt: string; caption?: string }[];
    youtubeId: string;
    videoTitle: string;
  };
}
