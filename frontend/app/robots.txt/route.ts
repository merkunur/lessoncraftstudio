/**
 * Custom robots.txt route handler
 * Uses route handler instead of Next.js robots() because:
 * - crawlDelay is not properly serialized by Next.js robots function
 * - Multiple sitemaps array not properly supported
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';

  const robotsTxt = `# LessonCraftStudio Robots.txt
# https://www.lessoncraftstudio.com

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /auth/
Disallow: /_next/
Disallow: /testing/
Disallow: /uploads/

# Block AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

# Bingbot rate limiting
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Yandex rate limiting (deprecated per Yandex since 2018, but harmless to include)
User-agent: Yandex
Allow: /
Crawl-delay: 2

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-images.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
