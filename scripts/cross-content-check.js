/**
 * Check for cross-language content contamination:
 * 1. Two locales with identical <title> tags in content (one has wrong language content)
 * 2. Two locales with identical content (copy-paste error)
 * 3. Content <title> matches a DIFFERENT locale's DB title
 *
 * Run on server: cd /opt/lessoncraftstudio/frontend && node scripts/cross-content-check.js
 */
const { PrismaClient } = require('../node_modules/@prisma/client');
const prisma = new PrismaClient();

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

function extractTitleFromContent(content) {
  if (!content) return null;
  const match = content.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractH1FromContent(content) {
  if (!content) return null;
  const match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : null;
}

async function main() {
  console.log('=== CROSS-LANGUAGE CONTENT CONTAMINATION CHECK ===\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  let issueCount = 0;

  for (const post of posts) {
    // Extract content titles for all locales
    const contentTitles = {};
    for (const locale of ALL_LOCALES) {
      const trans = post.translations[locale];
      if (!trans || !trans.content) continue;
      contentTitles[locale] = extractTitleFromContent(trans.content);
    }

    // Check 1: Do any two locales have the same content <title>?
    for (let i = 0; i < ALL_LOCALES.length; i++) {
      for (let j = i + 1; j < ALL_LOCALES.length; j++) {
        const locA = ALL_LOCALES[i];
        const locB = ALL_LOCALES[j];
        const titleA = contentTitles[locA];
        const titleB = contentTitles[locB];

        if (titleA && titleB && titleA === titleB) {
          issueCount++;
          console.log(`DUPLICATE CONTENT TITLE: ${post.slug}`);
          console.log(`  ${locA} content <title>: "${titleA}"`);
          console.log(`  ${locB} content <title>: "${titleB}"`);
          console.log();
        }
      }
    }

    // Check 2: Does any locale's content <title> match a DIFFERENT locale's DB title?
    for (const locale of ALL_LOCALES) {
      const contentTitle = contentTitles[locale];
      if (!contentTitle) continue;

      for (const otherLocale of ALL_LOCALES) {
        if (otherLocale === locale) continue;
        const otherDbTitle = post.translations[otherLocale]?.title;
        // Also check meta title
        const otherMetaTitle = post.translations[otherLocale]?.metaTitle;

        if (otherDbTitle && contentTitle.includes(otherDbTitle.substring(0, 30))) {
          // Check it's not just matching on the locale's own title
          const ownTitle = post.translations[locale]?.title;
          const ownMetaTitle = post.translations[locale]?.metaTitle;
          if (ownTitle && !contentTitle.includes(ownTitle.substring(0, 30)) &&
              ownMetaTitle && !contentTitle.includes(ownMetaTitle.substring(0, 30))) {
            issueCount++;
            console.log(`WRONG CONTENT FOR LOCALE: ${post.slug} (${locale})`);
            console.log(`  ${locale} content <title>: "${contentTitle}"`);
            console.log(`  ${locale} DB title: "${ownTitle}"`);
            console.log(`  Matches ${otherLocale} DB title: "${otherDbTitle}"`);
            console.log();
          }
        }
      }
    }

    // Check 3: Content hash comparison - two locales with identical content
    for (let i = 0; i < ALL_LOCALES.length; i++) {
      for (let j = i + 1; j < ALL_LOCALES.length; j++) {
        const locA = ALL_LOCALES[i];
        const locB = ALL_LOCALES[j];
        const contentA = post.translations[locA]?.content;
        const contentB = post.translations[locB]?.content;

        if (contentA && contentB && contentA.length > 100) {
          // Compare first 500 chars (enough to detect duplicates)
          if (contentA.substring(0, 500) === contentB.substring(0, 500)) {
            issueCount++;
            console.log(`IDENTICAL CONTENT: ${post.slug}`);
            console.log(`  ${locA} and ${locB} have identical content (first 500 chars match)`);
            console.log(`  Content start: "${contentA.replace(/<[^>]+>/g, '').substring(0, 100)}"`);
            console.log();
          }
        }
      }
    }
  }

  console.log(`\nTotal cross-language issues found: ${issueCount}`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
