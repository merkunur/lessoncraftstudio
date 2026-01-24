import { prisma } from '@/lib/prisma';

const SITE_URL = 'https://www.lessoncraftstudio.com';

export async function GET() {
  try {
    // Fetch the 100 most recent published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: {
        id: true,
        slug: true,
        translations: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    // Get English translations for the RSS feed (primary language)
    const rssItems = posts
      .filter(post => {
        const translations = post.translations as any;
        return translations?.en?.title && translations?.en?.content;
      })
      .map(post => {
        const translations = post.translations as any;
        const en = translations.en;
        const slug = en.slug || post.slug;

        // Strip HTML and truncate for description
        const plainText = (en.excerpt || en.content || '')
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        const description = plainText.length > 500
          ? plainText.substring(0, 497) + '...'
          : plainText;

        return {
          title: escapeXml(en.title),
          link: `${SITE_URL}/en/blog/${encodeURIComponent(slug)}`,
          description: escapeXml(description),
          pubDate: post.createdAt.toUTCString(),
          guid: `${SITE_URL}/en/blog/${encodeURIComponent(slug)}`,
          category: post.category || 'teaching-resources'
        };
      });

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LessonCraftStudio Blog</title>
    <link>${SITE_URL}/en/blog</link>
    <description>Educational resources, teaching tips, and worksheet creation guides for teachers and parents</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/opengraph-image.png</url>
      <title>LessonCraftStudio Blog</title>
      <link>${SITE_URL}/en/blog</link>
    </image>
${rssItems.map(item => `    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
      <category>${item.category}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);

    // Return a minimal valid RSS feed on error
    const errorRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>LessonCraftStudio Blog</title>
    <link>${SITE_URL}/en/blog</link>
    <description>Educational resources for teachers and parents</description>
  </channel>
</rss>`;

    return new Response(errorRss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}

// Helper function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
