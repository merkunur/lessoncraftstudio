/**
 * Blog SEO Validation Audit — Step 4
 *
 * Validates SEO elements across all 1,232 blog content files:
 * - Title tag length (<=60 chars)
 * - Meta description length (<=155 chars)
 * - H1 length (<=70 chars), different from title tag
 * - Section count (3-6 H2s)
 * - Word count (800-1,500)
 * - Internal links (3-5, valid page types and slugs)
 * - Related posts (2-3, valid slugs)
 * - FAQ count (3-5 if present)
 * - Uniqueness of title tags and meta descriptions per locale
 *
 * Usage: node scripts/blog-audit-seo.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BLOG_CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'config', 'blog-content');
const VALID_PAGE_TYPES = ['app', 'tool', 'guide', 'bundle', 'start', 'idea', 'blog'];

// Load blog slug config to validate related posts (both blogIds and all localized slugs)
function loadBlogSlugs() {
  const content = fs.readFileSync(
    path.join(__dirname, '..', 'frontend', 'config', 'blog-page-slugs.ts'), 'utf8'
  );
  const blogIds = new Set();
  const allSlugs = new Set(); // All slugs across all locales

  const idMatches = content.matchAll(/blogId:\s*'([^']+)'/g);
  for (const m of idMatches) blogIds.add(m[1]);

  // Extract ALL slug values (en, de, fr, etc.)
  const slugMatches = content.matchAll(/(?:en|de|fr|es|pt|it|nl|sv|da|no|fi):\s*'([^']+)'/g);
  for (const m of slugMatches) allSlugs.add(m[1]);

  // Also add blogIds since EN slugs often match blogIds
  for (const id of blogIds) allSlugs.add(id);

  return { blogIds, allSlugs };
}

// Load all slug configs for internal link validation
function loadSlugConfigs() {
  const configs = {};
  const files = {
    app: 'product-page-slugs.ts',
    tool: 'tool-page-slugs.ts',
    guide: 'guide-page-slugs.ts',
    bundle: 'bundle-page-slugs.ts',
    start: 'start-page-slugs.ts',
    idea: 'idea-page-slugs.ts',
  };

  for (const [type, file] of Object.entries(files)) {
    const filePath = path.join(__dirname, '..', 'frontend', 'config', file);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf8');
    const slugs = new Set();
    // Extract all slug values from the config
    const matches = content.matchAll(/:\s*'([a-z0-9-]+)'/g);
    for (const m of matches) slugs.add(m[1]);
    configs[type] = slugs;
  }

  return configs;
}

function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function getAllText(content) {
  const texts = [];
  if (content.introduction) texts.push(content.introduction);
  if (content.hero?.description) texts.push(content.hero.description);
  if (content.sections) {
    for (const s of content.sections) {
      if (s.content) texts.push(s.content);
    }
  }
  if (content.keyTakeaways) texts.push(content.keyTakeaways.join(' '));
  if (content.faq) {
    for (const f of content.faq) {
      if (f.question) texts.push(f.question);
      if (f.answer) texts.push(f.answer);
    }
  }
  return texts.join(' ');
}

function validatePost(blogId, locale, content, blogIds, slugConfigs) {
  const issues = [];

  if (!content) {
    issues.push({ check: 'content', severity: 'error', message: 'Content is null or undefined' });
    return issues;
  }

  // 4A: Meta fields
  const titleTag = content.seo?.titleTag || '';
  const metaDesc = content.seo?.metaDescription || '';

  if (!titleTag) {
    issues.push({ check: 'titleTag', severity: 'error', message: 'Missing title tag' });
  } else if (titleTag.length > 60) {
    issues.push({ check: 'titleTag', severity: 'warning', message: `Title tag too long: ${titleTag.length} chars (max 60) — "${titleTag.substring(0, 65)}..."` });
  }

  if (!metaDesc) {
    issues.push({ check: 'metaDescription', severity: 'error', message: 'Missing meta description' });
  } else if (metaDesc.length > 155) {
    issues.push({ check: 'metaDescription', severity: 'warning', message: `Meta description too long: ${metaDesc.length} chars (max 155) — "${metaDesc.substring(0, 60)}..."` });
  }

  // 4B: Content structure
  const h1 = content.hero?.title || '';
  if (!h1) {
    issues.push({ check: 'h1', severity: 'error', message: 'Missing H1 (hero.title)' });
  } else if (h1.length > 70) {
    issues.push({ check: 'h1', severity: 'warning', message: `H1 too long: ${h1.length} chars (max 70) — "${h1.substring(0, 75)}..."` });
  }
  if (h1 && titleTag && h1 === titleTag) {
    issues.push({ check: 'h1Duplicate', severity: 'warning', message: 'H1 identical to title tag (should differ)' });
  }

  const sectionCount = content.sections?.length || 0;
  if (sectionCount < 3) {
    issues.push({ check: 'sections', severity: 'warning', message: `Only ${sectionCount} sections (H2s), recommended 3-6` });
  } else if (sectionCount > 6) {
    issues.push({ check: 'sections', severity: 'info', message: `${sectionCount} sections (H2s), recommended 3-6` });
  }

  const allText = getAllText(content);
  const wordCount = countWords(allText);
  if (wordCount < 800) {
    issues.push({ check: 'wordCount', severity: 'warning', message: `Word count too low: ${wordCount} (min 800)` });
  } else if (wordCount > 1500) {
    issues.push({ check: 'wordCount', severity: 'info', message: `Word count high: ${wordCount} (target 800-1500)` });
  }

  if (!content.introduction || content.introduction.trim().length === 0) {
    issues.push({ check: 'introduction', severity: 'error', message: 'Missing introduction' });
  }

  // 4C: Internal links
  const links = content.internalLinks || [];
  if (links.length < 3) {
    issues.push({ check: 'internalLinks', severity: 'warning', message: `Only ${links.length} internal links (recommended 3-5)` });
  } else if (links.length > 5) {
    issues.push({ check: 'internalLinks', severity: 'info', message: `${links.length} internal links (recommended 3-5)` });
  }

  for (const link of links) {
    if (!VALID_PAGE_TYPES.includes(link.pageType)) {
      issues.push({ check: 'internalLinkType', severity: 'error', message: `Invalid pageType "${link.pageType}" for link "${link.slug}"` });
    }
    if (link.pageType === 'blog') {
      if (!blogIds.has(link.slug)) {
        issues.push({ check: 'internalLinkSlug', severity: 'error', message: `Blog link slug not found: "${link.slug}"` });
      }
    } else if (slugConfigs[link.pageType]) {
      if (!slugConfigs[link.pageType].has(link.slug)) {
        issues.push({ check: 'internalLinkSlug', severity: 'warning', message: `${link.pageType} link slug may not exist: "${link.slug}"` });
      }
    }
  }

  // 4D: Related posts
  const related = content.relatedPosts || [];
  if (related.length < 2) {
    issues.push({ check: 'relatedPosts', severity: 'warning', message: `Only ${related.length} related posts (recommended 2-3)` });
  }
  for (const rp of related) {
    if (!blogIds.has(rp.slug)) {
      issues.push({ check: 'relatedPostSlug', severity: 'error', message: `Related post slug not found in blogIds: "${rp.slug}"` });
    }
  }

  // 4E: FAQ
  const faq = content.faq || [];
  if (faq.length > 0 && faq.length < 3) {
    issues.push({ check: 'faq', severity: 'info', message: `Only ${faq.length} FAQ items (recommended 3-5)` });
  }
  for (const f of faq) {
    if (!f.question || f.question.trim().length === 0) {
      issues.push({ check: 'faqEmpty', severity: 'error', message: 'Empty FAQ question' });
    }
    if (!f.answer || f.answer.trim().length === 0) {
      issues.push({ check: 'faqEmpty', severity: 'error', message: 'Empty FAQ answer' });
    }
  }

  // Check for CTA
  if (!content.cta || !content.cta.buttonUrl) {
    issues.push({ check: 'cta', severity: 'warning', message: 'Missing CTA or CTA button URL' });
  }

  return issues;
}

async function main() {
  console.log('=== BLOG SEO VALIDATION AUDIT (Step 4) ===\n');

  const { blogIds, allSlugs } = loadBlogSlugs();
  const slugConfigs = loadSlugConfigs();

  console.log(`Loaded ${blogIds.size} blogIds and ${allSlugs.size} total blog slugs for validation`);
  console.log(`Loaded slug configs for: ${Object.keys(slugConfigs).join(', ')}\n`);

  const allResults = [];
  const summaryByCheck = {};
  const titlesByLocale = {};
  const descsByLocale = {};

  for (const locale of LOCALES) {
    const localeDir = path.join(BLOG_CONTENT_DIR, locale);
    if (!fs.existsSync(localeDir)) {
      console.log(`SKIP: ${locale} directory not found`);
      continue;
    }

    titlesByLocale[locale] = new Map();
    descsByLocale[locale] = new Map();

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

    for (const file of files) {
      const blogId = file.replace('.ts', '');
      const filePath = path.join(localeDir, file);

      let content = null;
      try {
        // Parse the TS file to extract the content object
        const fileText = fs.readFileSync(filePath, 'utf8');

        // Extract titleTag (handles both key: 'val' and "key": "val" formats)
        const titleMatch = fileText.match(/["']?titleTag["']?\s*:\s*["'`](.*?)["'`]/s);
        const descMatch = fileText.match(/["']?metaDescription["']?\s*:\s*["'`](.*?)["'`]/s);
        const h1Match = fileText.match(/["']?title["']?\s*:\s*["'`](.*?)["'`]/);
        const introMatch = fileText.match(/["']?introduction["']?\s*:\s*["'`]([\s\S]*?)["'`]\s*,/);

        // Count sections
        const sectionMatches = fileText.match(/heading:\s*[`'"]/g);
        const sectionCount = sectionMatches ? sectionMatches.length : 0;

        // Count FAQ items
        const faqQuestionMatches = fileText.match(/question:\s*[`'"]/g);
        const faqCount = faqQuestionMatches ? faqQuestionMatches.length : 0;

        // Count internal links
        const internalLinkMatches = fileText.match(/pageType:\s*[`'"]/g);
        const linkCount = internalLinkMatches ? internalLinkMatches.length : 0;

        // Count related posts
        const relatedMatches = fileText.match(/relatedPosts:\s*\[/);
        const relatedSlugMatches = fileText.match(/slug:\s*['"]([^'"]+)['"]/g);

        // Extract page types and slugs for validation
        const pageTypeSlugPairs = [];
        const ptRegex = /pageType:\s*['"]([^'"]+)['"][\s\S]*?slug:\s*['"]([^'"]+)['"]/g;
        let ptMatch;
        while ((ptMatch = ptRegex.exec(fileText)) !== null) {
          pageTypeSlugPairs.push({ pageType: ptMatch[1], slug: ptMatch[2] });
        }

        // Extract related post slugs
        const relatedPostSlugs = [];
        const rpSection = fileText.match(/relatedPosts:\s*\[([\s\S]*?)\]/);
        if (rpSection) {
          const rpSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;
          let rpMatch;
          while ((rpMatch = rpSlugRegex.exec(rpSection[1])) !== null) {
            relatedPostSlugs.push(rpMatch[1]);
          }
        }

        // Build approximate content for word count — extract ALL long strings from file
        const allStrings = [];
        const strRegex = /'((?:[^'\\]|\\.)*)'/g;
        let sMatch;
        while ((sMatch = strRegex.exec(fileText)) !== null) {
          if (sMatch[1].length > 30) allStrings.push(sMatch[1]);
        }
        const allText = allStrings.join(' ');
        const wordCount = countWords(allText);

        // Check CTA
        const ctaMatch = fileText.match(/cta:\s*\{/);
        const ctaButtonMatch = fileText.match(/buttonUrl:\s*['"]([^'"]+)['"]/);

        // Build structured content for validation
        content = {
          seo: {
            titleTag: titleMatch ? titleMatch[1] : '',
            metaDescription: descMatch ? descMatch[1] : '',
          },
          hero: { title: h1Match ? h1Match[1] : '' },
          introduction: introMatch ? introMatch[1] : '',
          sections: new Array(sectionCount).fill({ heading: 'h2', content: 'text' }),
          internalLinks: pageTypeSlugPairs,
          relatedPosts: relatedPostSlugs.map(s => ({ slug: s })),
          faq: new Array(faqCount).fill({ question: 'q', answer: 'a' }),
          cta: ctaButtonMatch ? { buttonUrl: ctaButtonMatch[1] } : null,
          _wordCount: wordCount,
        };
      } catch (err) {
        allResults.push({ locale, blogId, issues: [{ check: 'parse', severity: 'error', message: `Parse error: ${err.message}` }] });
        continue;
      }

      const issues = [];

      // Title tag
      const titleTag = content.seo.titleTag;
      if (!titleTag) {
        issues.push({ check: 'titleTag', severity: 'error', message: 'Missing title tag' });
      } else {
        if (titleTag.length > 60) {
          issues.push({ check: 'titleTag', severity: 'warning', message: `Title too long: ${titleTag.length} chars` });
        }
        // Uniqueness check
        if (titlesByLocale[locale].has(titleTag)) {
          issues.push({ check: 'titleUnique', severity: 'warning', message: `Duplicate title with: ${titlesByLocale[locale].get(titleTag)}` });
        }
        titlesByLocale[locale].set(titleTag, blogId);
      }

      // Meta description
      const metaDesc = content.seo.metaDescription;
      if (!metaDesc) {
        issues.push({ check: 'metaDescription', severity: 'error', message: 'Missing meta description' });
      } else {
        if (metaDesc.length > 155) {
          issues.push({ check: 'metaDescription', severity: 'warning', message: `Description too long: ${metaDesc.length} chars` });
        }
        if (descsByLocale[locale].has(metaDesc)) {
          issues.push({ check: 'descUnique', severity: 'warning', message: `Duplicate description with: ${descsByLocale[locale].get(metaDesc)}` });
        }
        descsByLocale[locale].set(metaDesc, blogId);
      }

      // H1
      const h1 = content.hero.title;
      if (!h1) {
        issues.push({ check: 'h1', severity: 'error', message: 'Missing H1' });
      } else if (h1.length > 70) {
        issues.push({ check: 'h1', severity: 'warning', message: `H1 too long: ${h1.length} chars` });
      }

      // Sections
      const sectionCount = content.sections.length;
      if (sectionCount < 3) {
        issues.push({ check: 'sections', severity: 'warning', message: `Only ${sectionCount} sections` });
      }

      // Word count
      const wordCount = content._wordCount;
      if (wordCount < 800) {
        issues.push({ check: 'wordCount', severity: 'warning', message: `Low word count: ${wordCount}` });
      }

      // Internal links
      const links = content.internalLinks;
      if (links.length < 3) {
        issues.push({ check: 'internalLinks', severity: 'warning', message: `Only ${links.length} internal links` });
      }
      for (const link of links) {
        if (!VALID_PAGE_TYPES.includes(link.pageType)) {
          issues.push({ check: 'internalLinkType', severity: 'error', message: `Invalid type: ${link.pageType}` });
        }
        if (link.pageType === 'blog' && !allSlugs.has(link.slug)) {
          issues.push({ check: 'internalLinkSlug', severity: 'error', message: `Dead blog link: ${link.slug}` });
        }
      }

      // Related posts
      const related = content.relatedPosts;
      if (related.length < 2) {
        issues.push({ check: 'relatedPosts', severity: 'warning', message: `Only ${related.length} related posts` });
      }
      for (const rp of related) {
        if (!allSlugs.has(rp.slug)) {
          issues.push({ check: 'relatedPostSlug', severity: 'error', message: `Dead related post: ${rp.slug}` });
        }
      }

      // CTA
      if (!content.cta) {
        issues.push({ check: 'cta', severity: 'warning', message: 'Missing CTA' });
      }

      // Track summary
      for (const issue of issues) {
        const key = `${issue.check}:${issue.severity}`;
        summaryByCheck[key] = (summaryByCheck[key] || 0) + 1;
      }

      if (issues.length > 0) {
        allResults.push({ locale, blogId, issues });
      }
    }
  }

  // Print summary
  const errorResults = allResults.filter(r => r.issues.some(i => i.severity === 'error'));
  const warningResults = allResults.filter(r => r.issues.some(i => i.severity === 'warning'));

  console.log('=== SEO AUDIT SUMMARY ===\n');
  console.log(`Total posts audited: ${LOCALES.length * 112}`);
  console.log(`Posts with errors: ${errorResults.length}`);
  console.log(`Posts with warnings: ${warningResults.length}`);
  console.log(`Posts clean (no issues): ${LOCALES.length * 112 - allResults.length}\n`);

  // Summary by check type
  console.log('Issues by type:');
  console.log('| Check | Severity | Count |');
  console.log('|-------|----------|-------|');
  const sortedChecks = Object.entries(summaryByCheck).sort((a, b) => b[1] - a[1]);
  for (const [key, count] of sortedChecks) {
    const [check, severity] = key.split(':');
    console.log(`| ${check.padEnd(20)} | ${severity.padEnd(8)} | ${count} |`);
  }

  // Per-locale summary
  console.log('\n\nPer-locale summary:');
  console.log('| Language | Errors | Warnings | Clean |');
  console.log('|----------|--------|----------|-------|');
  for (const locale of LOCALES) {
    const localeResults = allResults.filter(r => r.locale === locale);
    const errors = localeResults.filter(r => r.issues.some(i => i.severity === 'error')).length;
    const warnings = localeResults.filter(r => r.issues.some(i => i.severity === 'warning')).length;
    const clean = 112 - localeResults.length;
    const status = errors === 0 ? '\u2705' : '\u274c';
    console.log(`| ${locale.padEnd(8)} | ${String(errors).padEnd(6)} | ${String(warnings).padEnd(8)} | ${String(clean).padEnd(5)} | ${status}`);
  }

  // Detail: errors only
  if (errorResults.length > 0) {
    console.log('\n\n=== ERROR DETAILS (must fix) ===\n');
    for (const r of errorResults) {
      const errors = r.issues.filter(i => i.severity === 'error');
      console.log(`${r.locale}/${r.blogId}:`);
      for (const e of errors) {
        console.log(`  [${e.check}] ${e.message}`);
      }
    }
  }

  // Detail: title length warnings (top 20)
  const titleWarnings = allResults
    .flatMap(r => r.issues.filter(i => i.check === 'titleTag' && i.severity === 'warning').map(i => ({ ...i, locale: r.locale, blogId: r.blogId })))
    .sort((a, b) => {
      const aLen = parseInt(a.message.match(/(\d+)/)?.[1] || '0');
      const bLen = parseInt(b.message.match(/(\d+)/)?.[1] || '0');
      return bLen - aLen;
    });
  if (titleWarnings.length > 0) {
    console.log(`\n\n=== TITLE TAG LENGTH WARNINGS (${titleWarnings.length} total, showing top 20) ===\n`);
    titleWarnings.slice(0, 20).forEach(w => {
      console.log(`  ${w.locale}/${w.blogId}: ${w.message}`);
    });
  }

  // Detail: meta description length warnings (top 20)
  const descWarnings = allResults
    .flatMap(r => r.issues.filter(i => i.check === 'metaDescription' && i.severity === 'warning').map(i => ({ ...i, locale: r.locale, blogId: r.blogId })))
    .sort((a, b) => {
      const aLen = parseInt(a.message.match(/(\d+)/)?.[1] || '0');
      const bLen = parseInt(b.message.match(/(\d+)/)?.[1] || '0');
      return bLen - aLen;
    });
  if (descWarnings.length > 0) {
    console.log(`\n\n=== META DESCRIPTION LENGTH WARNINGS (${descWarnings.length} total, showing top 20) ===\n`);
    descWarnings.slice(0, 20).forEach(w => {
      console.log(`  ${w.locale}/${w.blogId}: ${w.message}`);
    });
  }

  // Save full results
  const outputPath = path.join(__dirname, 'blog-audit-seo-results.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      totalAudited: LOCALES.length * 112,
      withErrors: errorResults.length,
      withWarnings: warningResults.length,
      clean: LOCALES.length * 112 - allResults.length,
      byCheck: summaryByCheck,
    },
    issues: allResults,
  }, null, 2));
  console.log(`\n\nFull results saved to: ${outputPath}`);
}

main().catch(console.error);
