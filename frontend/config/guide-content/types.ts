export interface GuideContent {
  seo: { titleTag: string; metaDescription: string };
  hero: { title: string; description: string };
  tutorial?: { title: string; steps: { title: string; description: string }[] };
  platformTips?: { platform: string; title: string; description: string }[];
  monetization?: { title: string; description: string }[];
  faq?: { question: string; answer: string }[];
  internalLinks?: { pageType: string; slug: string; anchorText: string }[];
}
