export interface BundleContent {
  seo: { titleTag: string; metaDescription: string };
  hero: { title: string; description: string };
  appsIncluded?: { title: string; description: string }[];
  bundleBenefits?: { title: string; description: string }[];
  faq?: { question: string; answer: string }[];
}
