/**
 * Comprehensive scan: check ALL 1,232 locale content fields for wrong-language content.
 *
 * The DB content field contains full HTML with <title> tags.
 * If a non-English locale has an English <title> tag in its content, that's a confirmed mismatch.
 *
 * Run on server: cd /opt/lessoncraftstudio/frontend && node scripts/scan-all-content-lang.js
 */
const { PrismaClient } = require('../node_modules/@prisma/client');
const prisma = new PrismaClient();

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

// English-only words that would not appear in other language titles
const ENGLISH_TITLE_MARKERS = [
  'worksheet', 'worksheets', 'generators', 'generator', 'teachers',
  'guide', 'complete', 'learning', 'classroom', 'elementary',
  'strategies', 'activities', 'building', 'developing', 'creating',
  'how', 'why', 'the', 'for', 'with', 'your', 'from', 'that',
  'using', 'every', 'through', 'behind'
];

function extractTitleFromContent(content) {
  if (!content) return null;
  const match = content.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? match[1].trim() : null;
}

function looksEnglish(title) {
  if (!title) return false;
  const words = title.toLowerCase().split(/[\s|:,]+/);
  const englishWords = words.filter(w => ENGLISH_TITLE_MARKERS.includes(w));
  return englishWords.length >= 3;
}

async function main() {
  console.log('=== COMPREHENSIVE CONTENT LANGUAGE SCAN ===\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  console.log(`Scanning ${posts.length} posts x ${ALL_LOCALES.length} locales...\n`);

  const issues = [];
  let scanned = 0;

  for (const post of posts) {
    for (const locale of ALL_LOCALES) {
      if (locale === 'en') continue; // English content in en locale is fine

      const trans = post.translations[locale];
      if (!trans || !trans.content) continue;

      scanned++;
      const contentTitle = extractTitleFromContent(trans.content);

      if (contentTitle && looksEnglish(contentTitle)) {
        issues.push({
          postSlug: post.slug,
          postId: post.id,
          locale,
          contentTitle,
          dbTitle: trans.title,
          dbSlug: trans.slug
        });
      }
    }
  }

  console.log(`Scanned: ${scanned} locale translations`);
  console.log(`Issues found: ${issues.length}\n`);

  for (const issue of issues) {
    console.log(`MISMATCH: ${issue.postSlug} (${issue.locale})`);
    console.log(`  Content <title>: "${issue.contentTitle}"`);
    console.log(`  DB title: "${issue.dbTitle}"`);
    console.log(`  DB slug: "${issue.dbSlug}"`);
    console.log();
  }

  // Also check: slugs that are identical to English slug (already known)
  console.log('=== SLUG IDENTICAL TO ENGLISH ===');
  for (const post of posts) {
    const enSlug = post.translations?.en?.slug || post.slug;
    for (const locale of ALL_LOCALES) {
      if (locale === 'en') continue;
      const locSlug = post.translations?.[locale]?.slug;
      if (locSlug && locSlug === enSlug) {
        console.log(`${post.slug} (${locale}): slug identical to English`);
      }
    }
  }

  // Check: titles identical to English title
  console.log('\n=== TITLE IDENTICAL TO ENGLISH ===');
  for (const post of posts) {
    const enTitle = post.translations?.en?.title;
    if (!enTitle) continue;
    for (const locale of ALL_LOCALES) {
      if (locale === 'en') continue;
      const locTitle = post.translations?.[locale]?.title;
      if (locTitle && locTitle.trim() === enTitle.trim()) {
        console.log(`${post.slug} (${locale}): title identical to English`);
      }
    }
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
