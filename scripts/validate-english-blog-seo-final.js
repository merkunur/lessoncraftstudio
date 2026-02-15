#!/usr/bin/env node

/**
 * English Blog SEO Final Validation (Part 98)
 *
 * Queries blog_posts database for all English translations and validates:
 *   - metaTitle (or title) length: 50-60 chars
 *   - metaDescription (or seoDescription) length: 150-160 chars
 *   - focusKeyword presence
 *   - Brand suffix in title (LessonCraftStudio or LCS)
 *   - No duplicate titles
 *   - No duplicate focus keywords
 *
 * Run on server: node scripts/validate-english-blog-seo-final.js
 * Output: console report + JSON to stdout (pipe to file)
 */

const { PrismaClient } = require('@prisma/client');

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

async function main() {
  const prisma = new PrismaClient();

  try {
    console.error('='.repeat(60));
    console.error('  ENGLISH BLOG SEO FINAL VALIDATION (Part 98)');
    console.error('='.repeat(60));

    // Fetch all published blog posts with English translations
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        slug: true,
        translations: true,
      },
      orderBy: { slug: 'asc' },
    });

    console.error(`  Total published posts: ${posts.length}`);

    const results = [];
    let pass = 0;
    let fail = 0;

    for (const post of posts) {
      const tr = post.translations;
      if (!tr) continue;

      // English translation data
      const en = tr.en || tr.EN;
      if (!en) {
        results.push({
          slug: post.slug,
          status: 'SKIP',
          reason: 'No English translation',
        });
        continue;
      }

      const title = en.metaTitle || en.title || null;
      const description = en.metaDescription || en.seoDescription || en.description || null;
      const keyword = en.focusKeyword || null;
      const issues = [];

      // Title checks
      if (!title) {
        issues.push({ check: 'title_missing', msg: 'Title is missing' });
      } else {
        const len = title.length;
        if (len < TITLE_MIN) issues.push({ check: 'title_short', msg: `Title too short: ${len} chars (min ${TITLE_MIN})`, value: len });
        if (len > TITLE_MAX) issues.push({ check: 'title_long', msg: `Title too long: ${len} chars (max ${TITLE_MAX})`, value: len });
        if (!/LessonCraftStudio|LCS/i.test(title)) {
          issues.push({ check: 'no_brand', msg: 'Title missing brand suffix' });
        }
      }

      // Description checks
      if (!description) {
        issues.push({ check: 'desc_missing', msg: 'Description is missing' });
      } else {
        const len = description.length;
        if (len < DESC_MIN) issues.push({ check: 'desc_short', msg: `Description too short: ${len} chars (min ${DESC_MIN})`, value: len });
        if (len > DESC_MAX) issues.push({ check: 'desc_long', msg: `Description too long: ${len} chars (max ${DESC_MAX})`, value: len });
      }

      // Keyword check
      if (!keyword) {
        issues.push({ check: 'keyword_missing', msg: 'Focus keyword is missing' });
      }

      const status = issues.length === 0 ? 'PASS' : 'FAIL';
      if (status === 'PASS') pass++;
      else fail++;

      results.push({
        slug: post.slug,
        url: `/en/blog/${post.slug}`,
        status,
        title,
        titleLength: title ? title.length : 0,
        description: description ? description.substring(0, 80) + '...' : null,
        descriptionLength: description ? description.length : 0,
        keyword: keyword || null,
        issues,
      });
    }

    // Cross-post checks: duplicate titles
    const titleMap = {};
    for (const r of results) {
      if (!r.title) continue;
      const norm = r.title.toLowerCase().trim();
      if (!titleMap[norm]) titleMap[norm] = [];
      titleMap[norm].push(r);
    }
    const duplicateTitles = [];
    for (const [title, group] of Object.entries(titleMap)) {
      if (group.length > 1) {
        duplicateTitles.push({
          title: group[0].title,
          count: group.length,
          slugs: group.map(r => r.slug),
        });
      }
    }

    // Cross-post checks: duplicate focus keywords
    const kwMap = {};
    for (const r of results) {
      if (!r.keyword) continue;
      const norm = r.keyword.toLowerCase().trim();
      if (!kwMap[norm]) kwMap[norm] = [];
      kwMap[norm].push(r);
    }
    const duplicateKeywords = [];
    for (const [kw, group] of Object.entries(kwMap)) {
      if (group.length > 1) {
        duplicateKeywords.push({
          keyword: kw,
          count: group.length,
          slugs: group.map(r => r.slug),
        });
      }
    }

    // Issue breakdown
    const issueCounts = {};
    for (const r of results) {
      for (const iss of (r.issues || [])) {
        issueCounts[iss.check] = (issueCounts[iss.check] || 0) + 1;
      }
    }

    // Print summary to stderr
    console.error(`\n  PASS: ${pass}   FAIL: ${fail}   SKIP: ${results.filter(r => r.status === 'SKIP').length}`);
    console.error('\n  Issue breakdown:');
    for (const [check, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) {
      console.error(`    ${check}: ${count}`);
    }

    if (duplicateTitles.length > 0) {
      console.error(`\n  Duplicate titles: ${duplicateTitles.length} groups`);
      for (const dt of duplicateTitles) {
        console.error(`    "${dt.title}" (${dt.count} posts): ${dt.slugs.join(', ')}`);
      }
    } else {
      console.error('\n  Duplicate titles: NONE');
    }

    if (duplicateKeywords.length > 0) {
      console.error(`\n  Duplicate focus keywords: ${duplicateKeywords.length} groups`);
      for (const dk of duplicateKeywords.slice(0, 10)) {
        console.error(`    "${dk.keyword}" (${dk.count} posts): ${dk.slugs.join(', ')}`);
      }
    } else {
      console.error('  Duplicate focus keywords: NONE');
    }

    // Print failed posts
    const failed = results.filter(r => r.status === 'FAIL');
    if (failed.length > 0) {
      console.error(`\n  Failed posts (${failed.length}):`);
      for (const r of failed) {
        console.error(`    ${r.slug} (title: ${r.titleLength}, desc: ${r.descriptionLength})`);
        for (const iss of r.issues) {
          console.error(`      FAIL: ${iss.msg}`);
        }
      }
    }

    console.error('\n' + '='.repeat(60));

    // Output JSON to stdout for capture
    const report = {
      generatedAt: new Date().toISOString(),
      summary: { total: results.length, pass, fail, skip: results.filter(r => r.status === 'SKIP').length, issueCounts },
      crossChecks: { duplicateTitles, duplicateKeywords },
      posts: results,
    };

    console.log(JSON.stringify(report, null, 2));

  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
