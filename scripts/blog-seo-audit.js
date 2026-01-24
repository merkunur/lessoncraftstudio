/**
 * Blog SEO Audit Script
 * Audits all blog posts for SEO compliance
 *
 * Run with: node scripts/blog-seo-audit.js
 *
 * Checks:
 * - Missing metaTitle (required for SEO)
 * - Missing metaDescription (required for SEO)
 * - Missing focusKeyword (important for SEO)
 * - Short/Long metaTitle (optimal: 50-60 chars)
 * - Short metaDescription (optimal: 120-160 chars)
 * - Missing featuredImage
 * - Content length analysis
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// SEO Guidelines
const SEO_RULES = {
  META_TITLE_MIN: 30,
  META_TITLE_MAX: 70,
  META_TITLE_OPTIMAL_MIN: 50,
  META_TITLE_OPTIMAL_MAX: 60,
  META_DESCRIPTION_MIN: 100,
  META_DESCRIPTION_MAX: 160,
  META_DESCRIPTION_OPTIMAL_MIN: 120,
  META_DESCRIPTION_OPTIMAL_MAX: 155,
  CONTENT_MIN_WORDS: 300,
  CONTENT_OPTIMAL_WORDS: 1000,
};

// Supported locales
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/**
 * Count words in HTML content
 */
function countWords(htmlContent) {
  if (!htmlContent) return 0;
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  return textContent.replace(/\s+/g, ' ').trim().split(' ').filter(word => word.length > 0).length;
}

/**
 * Analyze heading structure in HTML content
 */
function analyzeHeadings(htmlContent) {
  if (!htmlContent) return { hasH1: false, headingCount: 0, issues: [] };

  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    headings.push({ level: parseInt(match[1]), text: match[2].replace(/<[^>]*>/g, '').slice(0, 50) });
  }

  const issues = [];
  const h1Count = headings.filter(h => h.level === 1).length;

  if (h1Count === 0) issues.push('Missing H1 tag');
  if (h1Count > 1) issues.push(`Multiple H1 tags found (${h1Count})`);

  // Check for proper hierarchy
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level > headings[i-1].level + 1) {
      issues.push(`Heading hierarchy skip: H${headings[i-1].level} -> H${headings[i].level}`);
    }
  }

  return {
    hasH1: h1Count >= 1,
    headingCount: headings.length,
    issues,
    structure: headings
  };
}

/**
 * Main audit function
 */
async function auditBlogPosts() {
  console.log('='.repeat(80));
  console.log('BLOG SEO AUDIT REPORT');
  console.log('Generated:', new Date().toISOString());
  console.log('='.repeat(80));
  console.log('');

  try {
    // Fetch all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      include: {
        _count: {
          select: { pdfs: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Total published posts: ${posts.length}`);
    console.log('');

    // Issue tracking
    const issues = {
      missingMetaTitle: [],
      missingMetaDescription: [],
      missingFocusKeyword: [],
      shortMetaTitle: [],
      longMetaTitle: [],
      shortMetaDescription: [],
      missingFeaturedImage: [],
      shortContent: [],
      headingIssues: [],
      noTranslation: []
    };

    // Per-locale stats
    const localeStats = {};
    LOCALES.forEach(locale => {
      localeStats[locale] = {
        total: 0,
        hasMetaTitle: 0,
        hasMetaDescription: 0,
        hasFocusKeyword: 0,
        hasFeaturedImage: 0,
        avgWordCount: 0,
        totalWords: 0
      };
    });

    // Analyze each post
    for (const post of posts) {
      const translations = post.translations || {};

      for (const locale of LOCALES) {
        const trans = translations[locale];

        // Skip if no translation exists
        if (!trans || !trans.title || !trans.content) {
          issues.noTranslation.push({ slug: post.slug, locale });
          continue;
        }

        localeStats[locale].total++;

        // Check meta title
        if (!trans.metaTitle) {
          issues.missingMetaTitle.push({ slug: post.slug, locale, title: trans.title });
        } else {
          localeStats[locale].hasMetaTitle++;
          if (trans.metaTitle.length < SEO_RULES.META_TITLE_MIN) {
            issues.shortMetaTitle.push({
              slug: post.slug,
              locale,
              length: trans.metaTitle.length,
              value: trans.metaTitle
            });
          } else if (trans.metaTitle.length > SEO_RULES.META_TITLE_MAX) {
            issues.longMetaTitle.push({
              slug: post.slug,
              locale,
              length: trans.metaTitle.length,
              value: trans.metaTitle.slice(0, 50) + '...'
            });
          }
        }

        // Check meta description
        if (!trans.metaDescription) {
          issues.missingMetaDescription.push({ slug: post.slug, locale, title: trans.title });
        } else {
          localeStats[locale].hasMetaDescription++;
          if (trans.metaDescription.length < SEO_RULES.META_DESCRIPTION_MIN) {
            issues.shortMetaDescription.push({
              slug: post.slug,
              locale,
              length: trans.metaDescription.length
            });
          }
        }

        // Check focus keyword
        if (!trans.focusKeyword) {
          issues.missingFocusKeyword.push({ slug: post.slug, locale, title: trans.title });
        } else {
          localeStats[locale].hasFocusKeyword++;
        }

        // Check featured image
        const hasImage = trans.featuredImage || post.featuredImage;
        if (!hasImage) {
          issues.missingFeaturedImage.push({ slug: post.slug, locale, title: trans.title });
        } else {
          localeStats[locale].hasFeaturedImage++;
        }

        // Content analysis
        const wordCount = countWords(trans.content);
        localeStats[locale].totalWords += wordCount;

        if (wordCount < SEO_RULES.CONTENT_MIN_WORDS) {
          issues.shortContent.push({
            slug: post.slug,
            locale,
            wordCount,
            title: trans.title
          });
        }

        // Heading analysis
        const headingAnalysis = analyzeHeadings(trans.content);
        if (headingAnalysis.issues.length > 0) {
          issues.headingIssues.push({
            slug: post.slug,
            locale,
            issues: headingAnalysis.issues
          });
        }
      }
    }

    // Calculate averages
    LOCALES.forEach(locale => {
      if (localeStats[locale].total > 0) {
        localeStats[locale].avgWordCount = Math.round(
          localeStats[locale].totalWords / localeStats[locale].total
        );
      }
    });

    // Print Summary by Locale
    console.log('='.repeat(80));
    console.log('SUMMARY BY LOCALE');
    console.log('='.repeat(80));
    console.log('');
    console.log('Locale | Posts | MetaTitle | MetaDesc | FocusKW | Image | Avg Words');
    console.log('-'.repeat(80));

    for (const locale of LOCALES) {
      const stats = localeStats[locale];
      if (stats.total > 0) {
        const metaTitlePct = Math.round((stats.hasMetaTitle / stats.total) * 100);
        const metaDescPct = Math.round((stats.hasMetaDescription / stats.total) * 100);
        const focusKwPct = Math.round((stats.hasFocusKeyword / stats.total) * 100);
        const imagePct = Math.round((stats.hasFeaturedImage / stats.total) * 100);

        console.log(
          `${locale.padEnd(6)} | ${String(stats.total).padEnd(5)} | ` +
          `${(metaTitlePct + '%').padEnd(9)} | ${(metaDescPct + '%').padEnd(8)} | ` +
          `${(focusKwPct + '%').padEnd(7)} | ${(imagePct + '%').padEnd(5)} | ${stats.avgWordCount}`
        );
      }
    }

    // Print Critical Issues
    console.log('');
    console.log('='.repeat(80));
    console.log('CRITICAL ISSUES');
    console.log('='.repeat(80));

    // Missing Meta Title
    console.log('');
    console.log(`MISSING META TITLE: ${issues.missingMetaTitle.length} issues`);
    if (issues.missingMetaTitle.length > 0 && issues.missingMetaTitle.length <= 20) {
      issues.missingMetaTitle.forEach(issue => {
        console.log(`  - [${issue.locale}] ${issue.slug}: "${issue.title}"`);
      });
    } else if (issues.missingMetaTitle.length > 20) {
      console.log(`  (showing first 20 of ${issues.missingMetaTitle.length})`);
      issues.missingMetaTitle.slice(0, 20).forEach(issue => {
        console.log(`  - [${issue.locale}] ${issue.slug}: "${issue.title}"`);
      });
    }

    // Missing Meta Description
    console.log('');
    console.log(`MISSING META DESCRIPTION: ${issues.missingMetaDescription.length} issues`);
    if (issues.missingMetaDescription.length > 0 && issues.missingMetaDescription.length <= 20) {
      issues.missingMetaDescription.forEach(issue => {
        console.log(`  - [${issue.locale}] ${issue.slug}`);
      });
    } else if (issues.missingMetaDescription.length > 20) {
      console.log(`  (showing first 20 of ${issues.missingMetaDescription.length})`);
      issues.missingMetaDescription.slice(0, 20).forEach(issue => {
        console.log(`  - [${issue.locale}] ${issue.slug}`);
      });
    }

    // Missing Focus Keyword
    console.log('');
    console.log(`MISSING FOCUS KEYWORD: ${issues.missingFocusKeyword.length} issues`);
    if (issues.missingFocusKeyword.length > 0 && issues.missingFocusKeyword.length <= 20) {
      issues.missingFocusKeyword.forEach(issue => {
        console.log(`  - [${issue.locale}] ${issue.slug}`);
      });
    } else if (issues.missingFocusKeyword.length > 20) {
      console.log(`  (showing first 20 of ${issues.missingFocusKeyword.length})`);
      issues.missingFocusKeyword.slice(0, 20).forEach(issue => {
        console.log(`  - [${issue.locale}] ${issue.slug}`);
      });
    }

    // Short/Long Meta Titles
    console.log('');
    console.log(`SHORT META TITLE (<${SEO_RULES.META_TITLE_MIN} chars): ${issues.shortMetaTitle.length} issues`);
    console.log(`LONG META TITLE (>${SEO_RULES.META_TITLE_MAX} chars): ${issues.longMetaTitle.length} issues`);

    // Short Meta Description
    console.log('');
    console.log(`SHORT META DESCRIPTION (<${SEO_RULES.META_DESCRIPTION_MIN} chars): ${issues.shortMetaDescription.length} issues`);

    // Missing Featured Image
    console.log('');
    console.log(`MISSING FEATURED IMAGE: ${issues.missingFeaturedImage.length} issues`);

    // Short Content
    console.log('');
    console.log(`SHORT CONTENT (<${SEO_RULES.CONTENT_MIN_WORDS} words): ${issues.shortContent.length} issues`);
    if (issues.shortContent.length > 0 && issues.shortContent.length <= 10) {
      issues.shortContent.forEach(issue => {
        console.log(`  - [${issue.locale}] ${issue.slug}: ${issue.wordCount} words`);
      });
    }

    // Heading Issues
    console.log('');
    console.log(`HEADING STRUCTURE ISSUES: ${issues.headingIssues.length} issues`);
    if (issues.headingIssues.length > 0 && issues.headingIssues.length <= 10) {
      issues.headingIssues.forEach(issue => {
        console.log(`  - [${issue.locale}] ${issue.slug}: ${issue.issues.join(', ')}`);
      });
    }

    // Calculate overall SEO score
    console.log('');
    console.log('='.repeat(80));
    console.log('SEO SCORE CALCULATION');
    console.log('='.repeat(80));

    const totalTranslations = LOCALES.reduce((sum, locale) => sum + localeStats[locale].total, 0);

    if (totalTranslations > 0) {
      const metaTitleScore = Math.round(
        ((totalTranslations - issues.missingMetaTitle.length) / totalTranslations) * 100
      );
      const metaDescScore = Math.round(
        ((totalTranslations - issues.missingMetaDescription.length) / totalTranslations) * 100
      );
      const focusKwScore = Math.round(
        ((totalTranslations - issues.missingFocusKeyword.length) / totalTranslations) * 100
      );
      const imageScore = Math.round(
        ((totalTranslations - issues.missingFeaturedImage.length) / totalTranslations) * 100
      );
      const headingScore = Math.round(
        ((totalTranslations - issues.headingIssues.length) / totalTranslations) * 100
      );

      // Weighted overall score
      const overallScore = Math.round(
        (metaTitleScore * 0.25) +
        (metaDescScore * 0.25) +
        (focusKwScore * 0.20) +
        (imageScore * 0.15) +
        (headingScore * 0.15)
      );

      console.log('');
      console.log(`Total translations analyzed: ${totalTranslations}`);
      console.log('');
      console.log('Component Scores (weighted):');
      console.log(`  Meta Title (25%):       ${metaTitleScore}%`);
      console.log(`  Meta Description (25%): ${metaDescScore}%`);
      console.log(`  Focus Keyword (20%):    ${focusKwScore}%`);
      console.log(`  Featured Image (15%):   ${imageScore}%`);
      console.log(`  Heading Structure (15%): ${headingScore}%`);
      console.log('');
      console.log(`OVERALL SEO SCORE: ${overallScore}/100`);
      console.log(`Grade: ${overallScore >= 90 ? 'A' : overallScore >= 80 ? 'B' : overallScore >= 70 ? 'C' : overallScore >= 60 ? 'D' : 'F'}`);
    }

    // Export issues to JSON for programmatic use
    const report = {
      generatedAt: new Date().toISOString(),
      totalPosts: posts.length,
      totalTranslations,
      localeStats,
      issues: {
        missingMetaTitle: issues.missingMetaTitle.length,
        missingMetaDescription: issues.missingMetaDescription.length,
        missingFocusKeyword: issues.missingFocusKeyword.length,
        shortMetaTitle: issues.shortMetaTitle.length,
        longMetaTitle: issues.longMetaTitle.length,
        shortMetaDescription: issues.shortMetaDescription.length,
        missingFeaturedImage: issues.missingFeaturedImage.length,
        shortContent: issues.shortContent.length,
        headingIssues: issues.headingIssues.length,
        noTranslation: issues.noTranslation.length
      },
      detailedIssues: issues
    };

    // Write report to file
    const fs = require('fs');
    const reportPath = './seo-audit-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log('');
    console.log(`Detailed report saved to: ${reportPath}`);

    console.log('');
    console.log('='.repeat(80));
    console.log('AUDIT COMPLETE');
    console.log('='.repeat(80));

    return report;

  } catch (error) {
    console.error('Error running SEO audit:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run audit
auditBlogPosts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Audit failed:', error);
    process.exit(1);
  });
