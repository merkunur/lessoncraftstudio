const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

(async () => {
  // The 6 posts that showed issues
  const slugs = [
    // 2 with duplicate titles
    'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces',
    'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
    // 4 flagged by language detector
    'dual-mode-preposition-worksheets-fill-in-the-blank-multiple-choice-in-one-tool',
    'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11',
    'early-childhood-prek-k-developmentally-appropriate-worksheet-activities',
    'worksheet-generator-comparison-lessoncraftstudio-vs-competitors',
  ];

  for (const slug of slugs) {
    const post = await p.blogPost.findUnique({
      where: { slug },
      select: { slug: true, translations: true },
    });
    if (!post) { console.log(`NOT FOUND: ${slug}\n`); continue; }

    console.log(`\n========================================`);
    console.log(`POST: ${slug}`);
    console.log(`========================================`);

    const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
    for (const locale of LOCALES) {
      const t = post.translations[locale];
      if (!t) { console.log(`  [${locale}] MISSING`); continue; }

      // Extract body text (skip HTML head, get actual article content)
      const content = (t.content || '');
      const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

      // Find substantive text (skip meta/head section)
      // Look for common article body markers
      let bodyText = text;
      const bodyIdx = text.indexOf('Introduction');
      if (bodyIdx > 0) bodyText = text.substring(bodyIdx);
      else {
        const altIdx = text.indexOf('Table of Contents');
        if (altIdx > 0) bodyText = text.substring(altIdx);
        else bodyText = text.substring(Math.min(300, text.length));
      }

      console.log(`  [${locale}] title: ${(t.title || '').substring(0, 70)}`);
      console.log(`  [${locale}] slug:  ${(t.slug || '').substring(0, 70)}`);
      console.log(`  [${locale}] body:  ${bodyText.substring(0, 120)}`);
    }
  }

  await p.$disconnect();
})();
