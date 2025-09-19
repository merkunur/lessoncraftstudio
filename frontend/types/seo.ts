// SEO and Marketing type definitions

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  viewport?: string;
  charset?: string;
  themeColor?: string;
}

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
  videos?: Array<{
    thumbnail: string;
    title: string;
    description: string;
    contentLoc: string;
    duration?: number;
  }>;
}

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  name?: string;
  description?: string;
  url?: string;
  image?: string | string[];
  author?: {
    '@type': string;
    name: string;
    url?: string;
  };
  datePublished?: string;
  dateModified?: string;
  publisher?: {
    '@type': string;
    name: string;
    logo?: {
      '@type': string;
      url: string;
    };
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    reviewCount: number;
  };
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  [key: string]: any;
}

export interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  warnings: SEOWarning[];
  improvements: SEOImprovement[];
  passedChecks: string[];
}

export interface SEOIssue {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'meta' | 'content' | 'technical' | 'performance' | 'social';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  affectedPages?: string[];
}

export interface SEOWarning {
  id: string;
  category: string;
  message: string;
  suggestion: string;
}

export interface SEOImprovement {
  id: string;
  category: string;
  current: string;
  recommended: string;
  priority: number;
}

export interface PageSEO {
  id: string;
  url: string;
  title: string;
  metaTags: MetaTags;
  schemaMarkup?: SchemaMarkup[];
  lastModified: string;
  indexable: boolean;
  crawlable: boolean;
  score?: number;
  issues?: SEOIssue[];
}

export interface SocialMediaPost {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'pinterest';
  content: string;
  images?: string[];
  link?: string;
  hashtags?: string[];
  scheduledAt?: string;
  publishedAt?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
}

export interface MarketingCampaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'social' | 'content' | 'paid' | 'seo';
  status: 'planning' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  budget?: number;
  goals: CampaignGoal[];
  channels: string[];
  targetAudience?: {
    demographics?: Record<string, any>;
    interests?: string[];
    behaviors?: string[];
  };
  performance?: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    roi: number;
  };
}

export interface CampaignGoal {
  id: string;
  metric: string;
  target: number;
  current: number;
  unit: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader?: string;
  htmlContent: string;
  textContent?: string;
  category: 'newsletter' | 'promotional' | 'transactional' | 'welcome' | 'abandoned';
  variables?: Array<{
    name: string;
    defaultValue?: string;
    required: boolean;
  }>;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UTMParameters {
  source: string;
  medium: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface LinkTracking {
  id: string;
  originalUrl: string;
  shortUrl: string;
  utmParameters?: UTMParameters;
  clicks: number;
  uniqueClicks: number;
  referrers: Record<string, number>;
  devices: Record<string, number>;
  locations: Record<string, number>;
  createdAt: string;
  expiresAt?: string;
}

export interface ContentOptimization {
  keyword: string;
  density: number;
  occurrences: number;
  prominence: number;
  suggestions: string[];
  relatedKeywords: Array<{
    keyword: string;
    searchVolume: number;
    difficulty: number;
  }>;
}

export interface CompetitorAnalysis {
  id: string;
  domain: string;
  lastAnalyzed: string;
  metrics: {
    domainAuthority: number;
    pageAuthority: number;
    backlinks: number;
    organicKeywords: number;
    organicTraffic: number;
    paidKeywords: number;
  };
  topKeywords: Array<{
    keyword: string;
    position: number;
    searchVolume: number;
    url: string;
  }>;
  topPages: Array<{
    url: string;
    traffic: number;
    keywords: number;
  }>;
}

export interface RobotsConfig {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
  sitemap?: string[];
}