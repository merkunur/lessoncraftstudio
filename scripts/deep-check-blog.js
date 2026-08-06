const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

(async () => {
  const posts = await p.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, translations: true },
    orderBy: { createdAt: 'desc' },
  });

  const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

  // Check 1: Find posts where two different locales have identical titles
  console.log('=== CHECK 1: Duplicate titles across locales ===\n');
  let dupCount = 0;
  for (const post of posts) {
    const t = post.translations;
    const titleToLocales = {};
    for (const locale of LOCALES) {
      if (t[locale] && t[locale].title) {
        const title = t[locale].title.trim();
        if (!titleToLocales[title]) titleToLocales[title] = [];
        titleToLocales[title].push(locale);
      }
    }
    const dups = Object.entries(titleToLocales).filter(([, locs]) => locs.length > 1);
    if (dups.length > 0) {
      dupCount++;
      console.log(`Post: ${post.slug}`);
      for (const [title, locs] of dups) {
        console.log(`  "${title.substring(0, 70)}" → [${locs.join(', ')}]`);
      }
    }
  }
  console.log(`\nTotal posts with duplicate titles: ${dupCount}\n`);

  // Check 2: Find posts where the English title contains non-ASCII chars typical of German/French/etc
  console.log('=== CHECK 2: English titles with non-English characters ===\n');
  let nonEngCount = 0;
  for (const post of posts) {
    const en = post.translations.en;
    if (en && en.title) {
      // Check for German umlauts, French accents, etc. in English title
      if (/[äöüßÄÖÜ]/.test(en.title)) {
        nonEngCount++;
        console.log(`[German chars in en] ${post.slug}`);
        console.log(`  en.title: ${en.title.substring(0, 80)}`);
      }
    }
  }
  console.log(`\nEnglish titles with German chars: ${nonEngCount}\n`);

  // Check 3: Find posts where slug appears to be in wrong language
  // (German-looking slugs under English key)
  console.log('=== CHECK 3: German-looking slugs under non-de keys ===\n');
  const germanWords = ['arbeitsblatt', 'arbeitsbl', 'uebung', 'mathematik', 'fuer', 'grundschule',
    'kinder', 'schueler', 'lehrer', 'unterricht', 'anleitung', 'leitfaden', 'editierbar',
    'vorlage', 'kostenlos', 'differenzierung', 'binnendiff'];
  let germanSlugCount = 0;
  for (const post of posts) {
    const t = post.translations;
    for (const locale of LOCALES.filter(l => l !== 'de')) {
      if (t[locale] && t[locale].slug) {
        const slug = t[locale].slug.toLowerCase();
        const matches = germanWords.filter(w => slug.includes(w));
        if (matches.length >= 2) {
          germanSlugCount++;
          console.log(`[${locale}] ${post.slug}`);
          console.log(`  slug: ${t[locale].slug.substring(0, 80)}`);
          console.log(`  title: ${(t[locale].title || '').substring(0, 80)}`);
          console.log(`  matched: ${matches.join(', ')}`);
        }
      }
    }
  }
  console.log(`\nGerman-looking slugs in non-de keys: ${germanSlugCount}\n`);

  // Check 4: Count translations per locale
  console.log('=== CHECK 4: Translations per locale ===\n');
  for (const locale of LOCALES) {
    let count = 0;
    let withTitle = 0;
    let withContent = 0;
    for (const post of posts) {
      if (post.translations[locale]) {
        count++;
        if (post.translations[locale].title) withTitle++;
        if (post.translations[locale].content) withContent++;
      }
    }
    console.log(`${locale}: ${count} total, ${withTitle} with title, ${withContent} with content`);
  }

  // Check 5: Random deeper comparison - pick 3 posts and show first 200 chars of content text
  console.log('\n=== CHECK 5: Content sample for 3 random posts ===\n');
  const sample = [posts[0], posts[Math.floor(posts.length/2)], posts[posts.length - 1]];
  for (const post of sample) {
    console.log(`--- ${post.slug} ---`);
    const t = post.translations;
    for (const locale of ['en', 'de', 'fr']) {
      if (t[locale] && t[locale].content) {
        const text = t[locale].content
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        // Skip past the head section metadata to find actual body text
        const bodyStart = text.indexOf('Table of Contents');
        const snippet = bodyStart > 0
          ? text.substring(bodyStart, bodyStart + 200)
          : text.substring(Math.min(200, text.length), Math.min(400, text.length));
        console.log(`  [${locale}] ${snippet.substring(0, 150)}`);
      }
    }
    console.log('');
  }

  await p.$disconnect();
})();
