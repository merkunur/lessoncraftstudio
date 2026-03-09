export interface IdeaContent {
  seo: {
    primaryKeyword?: string;
    secondaryKeywords?: string[];
    lsiKeywords?: string[];
    titleTag: string;
    metaDescription: string;
  };
  hero: { title: string; description: string };
  marketOverview?: string;
  productIdeas?: { title: string; description: string; appId: string }[];
  platformTips?: { platform: string; title: string; description: string }[];
  faq?: { question: string; answer: string }[];
  internalLinks?: { pageType: string; slug: string; anchorText: string }[];
  themeImages?: { src: string; alt: string; caption?: string }[];
  youtubeId?: string;
  videoTitle?: string;
}
