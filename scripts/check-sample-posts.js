const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

(async () => {
  // Check a few posts to see if wrong-language content exists
  const posts = await p.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, translations: true },
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  for (const post of posts) {
    console.log(`\n=== ${post.slug} ===`);
    const t = post.translations;
    for (const locale of ['en', 'de', 'sv']) {
      if (t[locale]) {
        const title = (t[locale].title || '').substring(0, 60);
        const slug = (t[locale].slug || '').substring(0, 60);
        const content = (t[locale].content || '').replace(/<[^>]+>/g, ' ').substring(0, 100);
        console.log(`  [${locale}] title: ${title}`);
        console.log(`  [${locale}] slug:  ${slug}`);
        console.log(`  [${locale}] body:  ${content}`);
      }
    }
  }

  // Also look for German slugs under English key
  const suspicious = await p.$queryRaw`
    SELECT slug,
      translations->'en'->>'slug' as en_slug,
      LEFT(translations->'en'->>'title', 60) as en_title,
      translations->'de'->>'slug' as de_slug,
      LEFT(translations->'de'->>'title', 60) as de_title
    FROM blog_posts
    WHERE status = 'published'
    AND (
      translations->'en'->>'slug' LIKE '%arbeitsbl%'
      OR translations->'en'->>'slug' LIKE '%mathematik%'
      OR translations->'en'->>'slug' LIKE '%kommerzielle%'
      OR translations->'en'->>'slug' LIKE '%uebungen%'
      OR translations->'en'->>'title' LIKE '%Arbeitsbl%'
      OR translations->'en'->>'title' LIKE '%Mathematik%'
      OR translations->'sv'->>'title' LIKE '%Arbeitsbl%'
      OR translations->'sv'->>'slug' LIKE '%arbeitsbl%'
    )
    LIMIT 10
  `;

  console.log('\n=== SUSPICIOUS: German content under en/sv key ===');
  console.log(JSON.stringify(suspicious, null, 2));

  await p.$disconnect();
})();
