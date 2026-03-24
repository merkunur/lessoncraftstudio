export interface CompareContent {
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

  introduction: string;

  comparisonTable: Array<{
    feature: string;
    lcs: string;
    competitor: string;
  }>;

  sections: Array<{
    heading: string;
    content: string;
  }>;

  faq: Array<{
    question: string;
    answer: string;
  }>;

  internalLinks: Array<{
    pageType: 'app' | 'guide' | 'bundle' | 'start' | 'idea' | 'tool' | 'compare';
    slug: string;
    anchorText: string;
  }>;

  visuals: {
    heroImage: {
      src: string;
      alt: string;
    };
  };
}
