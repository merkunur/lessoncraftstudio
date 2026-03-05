export interface ToolContent {
  seo: { titleTag: string; metaDescription: string };
  hero: { title: string; tagline: string; description: string };
  tutorial?: { title: string; steps: { title: string; description: string }[] };
  whatYouCanCreate?: { title: string; description: string }[];
  businessIdeas?: { title: string; description: string; platform?: string }[];
  faq?: { question: string; answer: string }[];
  internalLinks?: { pageType: string; slug: string; anchorText: string }[];
}
