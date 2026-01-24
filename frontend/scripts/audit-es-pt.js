/**
 * Deep audit of Spanish (es) and Portuguese (pt) blog translations
 * Check for issues that might prevent Google indexing
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function audit() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true, createdAt: true }
  });

  console.log('=== SPANISH & PORTUGUESE BLOG AUDIT ===\n');
  console.log(`Total published posts: ${posts.length}\n`);

  const issues = {
    es: {
      missing: [],
      emptySlug: [],
      emptyTitle: [],
      emptyContent: [],
      duplicateSlugs: new Map(),
      slugIssues: []
    },
    pt: {
      missing: [],
      emptySlug: [],
      emptyTitle: [],
      emptyContent: [],
      duplicateSlugs: new Map(),
      slugIssues: []
    }
  };

  const allSlugs = { es: new Map(), pt: new Map() };

  for (const post of posts) {
    const trans = post.translations || {};

    for (const lang of ['es', 'pt']) {
      const t = trans[lang];

      if (!t) {
        issues[lang].missing.push({ postSlug: post.slug, id: post.id });
        continue;
      }

      if (!t.slug) {
        issues[lang].emptySlug.push({ postSlug: post.slug, id: post.id, title: t.title?.substring(0, 50) });
      } else {
        // Check for duplicate slugs
        if (allSlugs[lang].has(t.slug)) {
          issues[lang].duplicateSlugs.set(t.slug, [
            allSlugs[lang].get(t.slug),
            { postSlug: post.slug, id: post.id }
          ]);
        }
        allSlugs[lang].set(t.slug, { postSlug: post.slug, id: post.id });

        // Check slug format issues
        if (t.slug.includes(' ')) {
          issues[lang].slugIssues.push({ postSlug: post.slug, issue: 'contains spaces', slug: t.slug });
        }
        if (t.slug.includes('final-optimized')) {
          issues[lang].slugIssues.push({ postSlug: post.slug, issue: 'contains final-optimized', slug: t.slug });
        }
        if (t.slug.length > 100) {
          issues[lang].slugIssues.push({ postSlug: post.slug, issue: 'very long slug', slug: t.slug.substring(0, 50) + '...' });
        }
      }

      if (!t.title) {
        issues[lang].emptyTitle.push({ postSlug: post.slug, id: post.id });
      }

      if (!t.content || t.content.length < 100) {
        issues[lang].emptyContent.push({ postSlug: post.slug, id: post.id, contentLength: t.content?.length || 0 });
      }
    }
  }

  // Print results
  for (const lang of ['es', 'pt']) {
    const langName = lang === 'es' ? 'SPANISH' : 'PORTUGUESE';
    console.log(`\n${'='.repeat(50)}`);
    console.log(`${langName} (${lang})`);
    console.log('='.repeat(50));

    const i = issues[lang];
    const total = posts.length;
    const withTranslation = total - i.missing.length;

    console.log(`\nCoverage: ${withTranslation}/${total} posts have ${lang} translation (${Math.round(withTranslation/total*100)}%)`);

    if (i.missing.length > 0) {
      console.log(`\n❌ Missing translation: ${i.missing.length} posts`);
      i.missing.slice(0, 5).forEach(p => console.log(`   - ${p.postSlug}`));
      if (i.missing.length > 5) console.log(`   ... and ${i.missing.length - 5} more`);
    }

    if (i.emptySlug.length > 0) {
      console.log(`\n❌ Empty slug: ${i.emptySlug.length} posts`);
      i.emptySlug.forEach(p => console.log(`   - ${p.postSlug} (title: ${p.title || 'none'})`));
    }

    if (i.emptyTitle.length > 0) {
      console.log(`\n❌ Empty title: ${i.emptyTitle.length} posts`);
      i.emptyTitle.forEach(p => console.log(`   - ${p.postSlug}`));
    }

    if (i.emptyContent.length > 0) {
      console.log(`\n❌ Empty/short content: ${i.emptyContent.length} posts`);
      i.emptyContent.slice(0, 5).forEach(p => console.log(`   - ${p.postSlug} (${p.contentLength} chars)`));
      if (i.emptyContent.length > 5) console.log(`   ... and ${i.emptyContent.length - 5} more`);
    }

    if (i.duplicateSlugs.size > 0) {
      console.log(`\n❌ Duplicate slugs: ${i.duplicateSlugs.size}`);
      i.duplicateSlugs.forEach((posts, slug) => {
        console.log(`   - "${slug}" used by multiple posts`);
      });
    }

    if (i.slugIssues.length > 0) {
      console.log(`\n⚠️ Slug issues: ${i.slugIssues.length}`);
      i.slugIssues.forEach(p => console.log(`   - ${p.postSlug}: ${p.issue}`));
    }

    // Show sample good translations
    console.log(`\n✓ Sample ${lang} translations:`);
    let shown = 0;
    for (const post of posts) {
      const t = post.translations?.[lang];
      if (t && t.slug && t.title && t.content?.length > 100 && shown < 3) {
        console.log(`   - ${t.slug}`);
        console.log(`     Title: ${t.title.substring(0, 60)}...`);
        shown++;
      }
    }
  }

  // Check sitemap generation
  console.log('\n\n' + '='.repeat(50));
  console.log('SITEMAP ELIGIBILITY CHECK');
  console.log('='.repeat(50));

  for (const lang of ['es', 'pt']) {
    const langName = lang === 'es' ? 'Spanish' : 'Portuguese';
    let eligible = 0;
    let ineligible = 0;

    for (const post of posts) {
      const t = post.translations?.[lang];
      // Match generateStaticParams logic
      if (t && t.title && t.content) {
        eligible++;
      } else {
        ineligible++;
      }
    }

    console.log(`\n${langName}: ${eligible} posts eligible for sitemap (${ineligible} excluded)`);
  }

  await prisma.$disconnect();
}

audit().catch(e => {
  console.error(e);
  process.exit(1);
});
