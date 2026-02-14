import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const SITE_URL = 'https://www.lessoncraftstudio.com';

const LOCALE_FEED_META: Record<string, { title: string; description: string; language: string }> = {
  en: { title: 'LessonCraftStudio Blog', description: 'Educational resources, teaching tips, and worksheet creation guides for teachers and parents', language: 'en' },
  de: { title: 'LessonCraftStudio Blog \u2013 Deutsch', description: 'Bildungsressourcen, Unterrichtstipps und Arbeitsblatt-Anleitungen f\u00fcr Lehrkr\u00e4fte und Eltern', language: 'de' },
  fr: { title: 'LessonCraftStudio Blog \u2013 Fran\u00e7ais', description: 'Ressources p\u00e9dagogiques, conseils et guides de cr\u00e9ation de fiches pour enseignants et parents', language: 'fr' },
  es: { title: 'LessonCraftStudio Blog \u2013 Espa\u00f1ol', description: 'Recursos educativos, consejos y gu\u00edas de creaci\u00f3n de fichas para maestros y padres', language: 'es' },
  pt: { title: 'LessonCraftStudio Blog \u2013 Portugu\u00eas', description: 'Recursos educacionais, dicas e guias de cria\u00e7\u00e3o de atividades para professores e pais', language: 'pt' },
  it: { title: 'LessonCraftStudio Blog \u2013 Italiano', description: 'Risorse educative, consigli e guide per la creazione di schede per insegnanti e genitori', language: 'it' },
  nl: { title: 'LessonCraftStudio Blog \u2013 Nederlands', description: 'Educatieve bronnen, tips en handleidingen voor het maken van werkbladen voor leerkrachten en ouders', language: 'nl' },
  sv: { title: 'LessonCraftStudio Blog \u2013 Svenska', description: 'Utbildningsresurser, tips och guider f\u00f6r att skapa \u00f6vningsblad f\u00f6r l\u00e4rare och f\u00f6r\u00e4ldrar', language: 'sv' },
  da: { title: 'LessonCraftStudio Blog \u2013 Dansk', description: 'Uddannelsesressourcer, tips og vejledninger til at oprette arbejdsark for l\u00e6rere og for\u00e6ldre', language: 'da' },
  no: { title: 'LessonCraftStudio Blog \u2013 Norsk', description: 'Utdanningsressurser, tips og veiledninger for \u00e5 lage arbeidsark for l\u00e6rere og foreldre', language: 'no' },
  fi: { title: 'LessonCraftStudio Blog \u2013 Suomi', description: 'Opetusresursseja, vinkkej\u00e4 ja oppaita ty\u00f6arkkien luomiseen opettajille ja vanhemmille', language: 'fi' },
};

export async function GET(request: NextRequest) {
  // Support locale query param: /feed.xml?locale=de
  const locale = request.nextUrl.searchParams.get('locale') || 'en';
  const feedMeta = LOCALE_FEED_META[locale] || LOCALE_FEED_META.en;

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: {
        id: true,
        slug: true,
        translations: true,
        category: true,
        featuredImage: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    const rssItems = posts
      .filter(post => {
        const translations = post.translations as any;
        const t = translations?.[locale];
        return t?.title && t?.content && t?.slug;
      })
      .map(post => {
        const translations = post.translations as any;
        const t = translations[locale];
        const slug = t.slug;

        const plainText = (t.excerpt || t.content || '')
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        const description = plainText.length > 500
          ? plainText.substring(0, 497) + '...'
          : plainText;

        const link = `${SITE_URL}/${locale}/blog/${encodeURIComponent(slug)}`;
        const author = t.author || 'LessonCraftStudio';
        const featuredImage = post.featuredImage ? `${SITE_URL}${post.featuredImage}` : null;

        return {
          title: escapeXml(t.title),
          link,
          description: escapeXml(description),
          pubDate: post.createdAt.toUTCString(),
          guid: link,
          category: post.category || 'teaching-resources',
          author: escapeXml(author),
          featuredImage,
        };
      });

    const feedUrl = locale === 'en' ? `${SITE_URL}/feed.xml` : `${SITE_URL}/feed.xml?locale=${locale}`;

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(feedMeta.title)}</title>
    <link>${SITE_URL}/${locale}/blog</link>
    <description>${escapeXml(feedMeta.description)}</description>
    <language>${feedMeta.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/opengraph-image.png</url>
      <title>${escapeXml(feedMeta.title)}</title>
      <link>${SITE_URL}/${locale}/blog</link>
    </image>
${rssItems.map(item => `    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
      <category>${item.category}</category>
      <dc:creator>${item.author}</dc:creator>${item.featuredImage ? `
      <enclosure url="${item.featuredImage}" type="image/png" length="0"/>
      <media:content url="${item.featuredImage}" medium="image"/>
      <media:thumbnail url="${item.featuredImage}"/>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);

    const errorRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(feedMeta.title)}</title>
    <link>${SITE_URL}/${locale}/blog</link>
    <description>${escapeXml(feedMeta.description)}</description>
  </channel>
</rss>`;

    return new Response(errorRss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
