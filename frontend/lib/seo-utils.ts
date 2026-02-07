import { MetaTags, SchemaMarkup, SEOAnalysis, SEOIssue, UTMParameters } from '@/types/seo';

// Generate meta tags for a page
export const generateMetaTags = (data: Partial<MetaTags>): MetaTags => {
  const defaults: MetaTags = {
    title: 'LessonCraftStudio - Educational Worksheet Generator',
    description: 'Create custom educational worksheets for students of all ages',
    viewport: 'width=device-width, initial-scale=1',
    charset: 'utf-8',
    robots: 'index, follow',
    ogType: 'website'
  };

  return { ...defaults, ...data };
};

// Generate schema markup for different content types
export const generateSchemaMarkup = (type: string, data: any): SchemaMarkup => {
  const baseSchema: SchemaMarkup = {
    '@context': 'https://schema.org',
    '@type': type
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        name: data.name || 'LessonCraftStudio',
        url: data.url || 'https://www.lessoncraftstudio.com',
        logo: data.logo,
        sameAs: data.socialProfiles || [],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: data.phone,
          contactType: 'customer service'
        }
      };

    case 'Product':
      return {
        ...baseSchema,
        name: data.name,
        description: data.description,
        image: data.images,
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: data.currency || 'USD',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: data.rating ? {
          '@type': 'AggregateRating',
          ratingValue: data.rating.value,
          reviewCount: data.rating.count
        } : undefined
      };

    case 'Article':
      return {
        ...baseSchema,
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Person',
          name: data.authorName
        },
        publisher: {
          '@type': 'Organization',
          name: 'LessonCraftStudio',
          logo: {
            '@type': 'ImageObject',
            url: data.publisherLogo
          }
        },
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: data.questions?.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      };

    default:
      return baseSchema;
  }
};

// Analyze SEO issues on a page
export const analyzeSEO = (page: {
  title: string;
  description: string;
  content: string;
  images: Array<{ alt?: string; src: string }>;
  headings: string[];
  url: string;
}): SEOAnalysis => {
  const issues: SEOIssue[] = [];
  const warnings: any[] = [];
  const improvements: any[] = [];
  const passedChecks: string[] = [];

  // Title checks
  if (!page.title) {
    issues.push({
      id: 'missing-title',
      severity: 'critical',
      category: 'meta',
      title: 'Missing Page Title',
      description: 'The page is missing a title tag',
      impact: 'Search engines won\'t be able to properly index this page',
      recommendation: 'Add a unique, descriptive title between 50-60 characters'
    });
  } else if (page.title.length < 30) {
    issues.push({
      id: 'short-title',
      severity: 'medium',
      category: 'meta',
      title: 'Title Too Short',
      description: `Title is only ${page.title.length} characters`,
      impact: 'May not be descriptive enough for search engines',
      recommendation: 'Expand title to 50-60 characters'
    });
  } else if (page.title.length > 60) {
    warnings.push({
      id: 'long-title',
      category: 'meta',
      message: 'Title may be truncated in search results',
      suggestion: 'Consider shortening to under 60 characters'
    });
  } else {
    passedChecks.push('Title length optimal');
  }

  // Description checks
  if (!page.description) {
    issues.push({
      id: 'missing-description',
      severity: 'high',
      category: 'meta',
      title: 'Missing Meta Description',
      description: 'No meta description found',
      impact: 'Search results will show auto-generated snippets',
      recommendation: 'Add a compelling description between 150-160 characters'
    });
  } else if (page.description.length < 120) {
    improvements.push({
      id: 'expand-description',
      category: 'meta',
      current: `${page.description.length} characters`,
      recommended: '150-160 characters',
      priority: 2
    });
  } else if (page.description.length > 160) {
    warnings.push({
      id: 'long-description',
      category: 'meta',
      message: 'Description may be truncated',
      suggestion: 'Shorten to under 160 characters'
    });
  } else {
    passedChecks.push('Description length optimal');
  }

  // Content checks
  if (page.content.length < 300) {
    issues.push({
      id: 'thin-content',
      severity: 'high',
      category: 'content',
      title: 'Thin Content',
      description: 'Page has very little text content',
      impact: 'May be considered low-quality by search engines',
      recommendation: 'Add more valuable, relevant content (aim for 300+ words)'
    });
  } else {
    passedChecks.push('Sufficient content length');
  }

  // Heading checks
  const h1Count = page.headings.filter(h => h.startsWith('h1')).length;
  if (h1Count === 0) {
    issues.push({
      id: 'missing-h1',
      severity: 'high',
      category: 'content',
      title: 'Missing H1 Tag',
      description: 'No H1 heading found on page',
      impact: 'Search engines may have difficulty understanding page structure',
      recommendation: 'Add one H1 tag with your main keyword'
    });
  } else if (h1Count > 1) {
    warnings.push({
      id: 'multiple-h1',
      category: 'content',
      message: `Found ${h1Count} H1 tags`,
      suggestion: 'Use only one H1 per page'
    });
  } else {
    passedChecks.push('Single H1 tag present');
  }

  // Image checks
  const imagesWithoutAlt = page.images.filter(img => !img.alt).length;
  if (imagesWithoutAlt > 0) {
    issues.push({
      id: 'missing-alt-text',
      severity: 'medium',
      category: 'content',
      title: 'Images Missing Alt Text',
      description: `${imagesWithoutAlt} images lack alt text`,
      impact: 'Reduces accessibility and image SEO',
      recommendation: 'Add descriptive alt text to all images'
    });
  } else if (page.images.length > 0) {
    passedChecks.push('All images have alt text');
  }

  // Calculate score
  const criticalIssues = issues.filter(i => i.severity === 'critical').length;
  const highIssues = issues.filter(i => i.severity === 'high').length;
  const mediumIssues = issues.filter(i => i.severity === 'medium').length;

  const score = Math.max(0, 100 - (criticalIssues * 20) - (highIssues * 10) - (mediumIssues * 5));

  return {
    score,
    issues,
    warnings,
    improvements,
    passedChecks
  };
};

// Generate UTM parameters for link tracking
export const generateUTMUrl = (url: string, params: UTMParameters): string => {
  const urlObj = new URL(url);

  if (params.source) urlObj.searchParams.set('utm_source', params.source);
  if (params.medium) urlObj.searchParams.set('utm_medium', params.medium);
  if (params.campaign) urlObj.searchParams.set('utm_campaign', params.campaign);
  if (params.term) urlObj.searchParams.set('utm_term', params.term);
  if (params.content) urlObj.searchParams.set('utm_content', params.content);

  return urlObj.toString();
};

// Generate canonical URL
export const generateCanonicalUrl = (path: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): string => {
  // Remove trailing slashes
  const cleanPath = path.replace(/\/+$/, '');
  const cleanBase = baseUrl.replace(/\/+$/, '');

  // Remove query parameters for canonical
  const pathWithoutQuery = cleanPath.split('?')[0];

  return `${cleanBase}${pathWithoutQuery}`;
};

// Calculate keyword density
export const calculateKeywordDensity = (content: string, keyword: string): number => {
  const words = content.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
  return (keywordCount / words.length) * 100;
};

// Generate sitemap XML
export const generateSitemapXML = (entries: Array<{
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}>): string => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return xml;
};

// Generate robots.txt content
export const generateRobotsTxt = (config: {
  allowAll?: boolean;
  disallow?: string[];
  allow?: string[];
  sitemap?: string;
  crawlDelay?: number;
}): string => {
  let content = 'User-agent: *\n';

  if (config.allowAll) {
    content += 'Allow: /\n';
  } else {
    if (config.disallow) {
      config.disallow.forEach(path => {
        content += `Disallow: ${path}\n`;
      });
    }
    if (config.allow) {
      config.allow.forEach(path => {
        content += `Allow: ${path}\n`;
      });
    }
  }

  if (config.crawlDelay) {
    content += `Crawl-delay: ${config.crawlDelay}\n`;
  }

  if (config.sitemap) {
    content += `\nSitemap: ${config.sitemap}\n`;
  }

  return content;
};

// Check if URL is indexable
export const isIndexable = (url: string, robotsRules: string[]): boolean => {
  const disallowedPatterns = robotsRules
    .filter(rule => rule.startsWith('Disallow:'))
    .map(rule => rule.replace('Disallow:', '').trim());

  return !disallowedPatterns.some(pattern => {
    if (pattern === '/') return true;
    return url.includes(pattern);
  });
};

// Extract keywords from content
export const extractKeywords = (content: string, limit: number = 10): string[] => {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');

  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but',
    'in', 'with', 'to', 'for', 'of', 'as', 'from', 'by', 'that', 'this'
  ]);

  // Extract words and count frequency
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequency: Record<string, number> = {};

  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 3) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([word]) => word);
};