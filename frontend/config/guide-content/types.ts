export interface GuideContent {
  seo: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    lsiKeywords: string[];
    titleTag: string;
    metaDescription: string;
  };
  hero: { title: string; tagline: string; description: string };
  introduction: string;
  tutorial: { heading: string; content: string }[];
  platformTips?: { heading: string; content: string }[];
  monetization?: { heading: string; content: string }[];
  examples?: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
  nextSteps?: { slug: string; title: string; description: string }[];
  internalLinks: { pageType: string; slug: string; anchorText: string }[];
  toolsRecommended?: { appId: string; title: string; description: string }[];
  visuals: {
    heroImage: { src: string; alt: string };
    samples: { src: string; alt: string; caption?: string }[];
    youtubeId: string;
    videoTitle: string;
  };
  themeImages?: { src: string; alt: string; caption?: string }[];
}
