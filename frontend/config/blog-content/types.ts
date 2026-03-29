export type BlogCategory = 'product-guide' | 'platform-strategy' | 'niche-seasonal' | 'how-to';

export interface BlogContent {
  seo: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    lsiKeywords: string[];
    titleTag: string;
    metaDescription: string;
  };
  hero: {
    title: string;
    tagline: string;
    description: string;
  };
  category: BlogCategory;
  introduction: string;
  sections: { heading: string; content: string }[];
  keyTakeaways: string[];
  faq: { question: string; answer: string }[];
  internalLinks: { pageType: string; slug: string; anchorText: string }[];
  relatedPosts: { slug: string; title: string }[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
}
