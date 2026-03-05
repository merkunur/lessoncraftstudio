export interface StartContent {
  seo: { titleTag: string; metaDescription: string };
  hero: { title: string; description: string };
  mainContent?: { heading: string; content: string }[];
  actionSteps?: { step: string; description: string }[];
  toolsRecommended?: { appId: string; title: string; description: string }[];
  faq?: { question: string; answer: string }[];
  internalLinks?: { pageType: string; slug: string; anchorText: string }[];
}
