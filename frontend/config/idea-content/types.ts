export interface IdeaContent {
  seo: { titleTag: string; metaDescription: string };
  hero: { title: string; description: string };
  marketOverview?: string;
  productIdeas?: { title: string; description: string; appId: string }[];
  platformTips?: { platform: string; title: string; description: string }[];
  faq?: { question: string; answer: string }[];
  internalLinks?: { pageType: string; slug: string; anchorText: string }[];
}
