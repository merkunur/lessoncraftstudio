import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration
 * Controls how search engines crawl and index the site
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/',
          '/auth/',
          '/_next/',
          '/testing/',
          '/uploads/',
        ],
      },
      {
        userAgent: 'GPTBot', // OpenAI's GPT crawler
        disallow: '/', // Block AI training on content
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google's AI training
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
