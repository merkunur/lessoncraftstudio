export interface StartContent {
  seo: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    lsiKeywords: string[];
    titleTag: string;
    metaDescription: string;
  };
  hero: { title: string; tagline: string; description: string };
  introduction: string;
  mainContent?: { heading: string; content: string }[];
  actionSteps?: { step: string; description: string }[];
  toolsRecommended?: { appId: string; title: string; description: string }[];
  faq?: { question: string; answer: string }[];
  nextSteps?: { slug: string; title: string; description: string }[];
  internalLinks?: { pageType: string; slug: string; anchorText: string }[];
  visuals?: {
    heroImage: { src: string; alt: string };
    samples: { src: string; alt: string; caption?: string }[];
    youtubeId: string;
    videoTitle: string;
  };
}
