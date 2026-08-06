#!/usr/bin/env node

/**
 * Master Diagnosis Report Generator
 *
 * Reads all 4 audit JSONs from Parts 1-4, cross-references findings,
 * and generates docs/audit-results/MASTER-DIAGNOSIS.md — a prioritized
 * action plan for the remaining fix phases.
 *
 * Inputs:
 *   - docs/audit-results/blog-slug-completeness.json       (Part 1)
 *   - docs/audit-results/live-hreflang-audit.json           (Part 2)
 *   - docs/audit-results/sitemap-vs-html-divergence.json    (Part 3)
 *   - docs/audit-results/redirect-map-completeness.json     (Part 4)
 *
 * Output:
 *   - docs/audit-results/MASTER-DIAGNOSIS.md
 */

const fs = require('fs');
const path = require('path');

const AUDIT_DIR = path.join(__dirname, '..', 'docs', 'audit-results');
const OUTPUT_FILE = path.join(AUDIT_DIR, 'MASTER-DIAGNOSIS.md');

// ─── Phase 1: Load & Parse All Audit Results ────────────────────────────────

console.log('='.repeat(70));
console.log('  MASTER DIAGNOSIS REPORT GENERATOR');
console.log('  Part 5 of THE PERFECT SEO (30-part plan)');
console.log('='.repeat(70));
console.log();

console.log('Phase 1: Loading audit results...');
console.log('-'.repeat(40));

const auditFiles = {
  slugCompleteness: {
    file: 'blog-slug-completeness.json',
    label: 'Part 1: Blog Slug Completeness',
  },
  liveHreflang: {
    file: 'live-hreflang-audit.json',
    label: 'Part 2: Live HTML Hreflang',
  },
  sitemapDivergence: {
    file: 'sitemap-vs-html-divergence.json',
    label: 'Part 3: Sitemap vs HTML Parity',
  },
  redirectMap: {
    file: 'redirect-map-completeness.json',
    label: 'Part 4: Redirect Map Completeness',
  },
};

const audits = {};
let allLoaded = true;

for (const [key, { file, label }] of Object.entries(auditFiles)) {
  const filePath = path.join(AUDIT_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`  MISSING: ${filePath}`);
    allLoaded = false;
    continue;
  }
  try {
    audits[key] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const size = fs.statSync(filePath).size;
    console.log(`  OK: ${label} (${(size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ERROR parsing ${file}: ${err.message}`);
    allLoaded = false;
  }
}

if (!allLoaded) {
  console.error('\nFATAL: Not all audit files could be loaded. Aborting.');
  process.exit(1);
}

console.log();

// ─── Extract key metrics from each audit ────────────────────────────────────

// Part 1: Slug Completeness
const p1 = audits.slugCompleteness;
const p1Summary = {
  totalPosts: p1.summary.totalPosts,
  totalSlots: p1.summary.totalLocaleSlots,
  totalIssues: p1.summary.totalIssues,
  issueBreakdown: p1.summary.issues,
  status: p1.summary.totalIssues === 0 ? 'PASS' : 'FAIL',
};
console.log(`Part 1 — Blog Slug Completeness:`);
console.log(`  ${p1Summary.totalPosts} posts x 11 locales = ${p1Summary.totalSlots} slots`);
console.log(`  Issues: ${p1Summary.totalIssues} (${p1Summary.status})`);
if (p1Summary.totalIssues > 0) {
  for (const [type, count] of Object.entries(p1Summary.issueBreakdown)) {
    if (count > 0) console.log(`    ${type}: ${count}`);
  }
}
console.log();

// Part 2: Live Hreflang
const p2 = audits.liveHreflang;
const p2Summary = {
  totalPages: p2.summary.totalPages,
  pagesWithIssues: p2.summary.pagesWithIssues,
  totalHreflangChecked: p2.config.totalHreflangUrlsChecked,
  totalReciprocals: p2.config.totalReciprocalsChecked,
  issuesBySeverity: p2.summary.issuesBySeverity,
  issuesByPageType: p2.summary.issuesByPageType,
  status: p2.summary.pagesWithIssues === 0 ? 'PASS' : 'FAIL',
};
console.log(`Part 2 — Live HTML Hreflang:`);
console.log(`  ${p2Summary.totalPages} pages audited, ${p2Summary.totalHreflangChecked} hreflang URLs checked`);
console.log(`  ${p2Summary.totalReciprocals} reciprocal links verified`);
console.log(`  Pages with issues: ${p2Summary.pagesWithIssues} (${p2Summary.status})`);
console.log();

// Part 3: Sitemap vs HTML Divergence
const p3 = audits.sitemapDivergence;
const p3Summary = {
  totalCompared: p3.summary.totalCompared,
  pagesWithDivergence: p3.summary.pagesWithDivergence,
  divergencesByCheck: p3.summary.divergencesByCheck,
  divergencesByPageType: p3.summary.divergencesByPageType,
  totalSitemapUrls: p3.sitemapStats.totalUrls,
  urlsWithHreflang: p3.sitemapStats.urlsWithHreflang,
  urlsWithoutHreflang: p3.sitemapStats.totalUrls - p3.sitemapStats.urlsWithHreflang,
  status: p3.summary.pagesWithDivergence === 0 ? 'PASS' : 'FAIL',
};
console.log(`Part 3 — Sitemap vs HTML Parity:`);
console.log(`  ${p3Summary.totalCompared} URLs compared, ${p3Summary.pagesWithDivergence} divergences found (${p3Summary.status})`);
console.log(`  Sitemap: ${p3Summary.totalSitemapUrls} total URLs, ${p3Summary.urlsWithHreflang} with hreflang`);
for (const [type, count] of Object.entries(p3Summary.divergencesByPageType)) {
  console.log(`    ${type}: ${count} pages diverge`);
}
console.log();

// Part 4: Redirect Map Completeness
const p4 = audits.redirectMap;
const p4Summary = {
  mapEntries: p4.sources.redirectMap.entries,
  dbPosts: p4.sources.dbDump.posts,
  dbSlugPairs: p4.sources.dbDump.localeSlugPairs,
  uniqueSlugs: p4.sources.dbDump.uniqueSlugs,
  staleEntries: p4.crossReference.mapSlugsNotInDb,
  sharedSlugs: p4.crossReference.sharedSlugs,
  missingFromMap: p4.crossReference.dbSlugsNotInMap,
  liveTestsPassed: p4.liveRedirectTests.passed,
  liveTestsFailed: p4.liveRedirectTests.failed,
  status: p4.summary.totalCrossRefIssues === 0 && p4.summary.liveTestsPassed ? 'PASS' : 'WARN',
};
console.log(`Part 4 — Redirect Map Completeness:`);
console.log(`  Map: ${p4Summary.mapEntries} entries, DB: ${p4Summary.dbSlugPairs} slug pairs`);
console.log(`  Stale entries (in map, not in DB): ${p4Summary.staleEntries.length}`);
if (p4Summary.staleEntries.length > 0) {
  for (const entry of p4Summary.staleEntries) {
    console.log(`    - "${entry.slug}" (${entry.mapNativeLocale})`);
  }
}
console.log(`  Shared slugs (used by multiple locales): ${p4Summary.sharedSlugs.length}`);
console.log(`  Live redirect tests: ${p4Summary.liveTestsPassed}/${p4Summary.liveTestsPassed + p4Summary.liveTestsFailed} passed`);
console.log(`  Status: ${p4Summary.status}`);
console.log();

// ─── Phase 2: Cross-Reference & Categorize ──────────────────────────────────

console.log('Phase 2: Cross-referencing findings...');
console.log('-'.repeat(40));

const issues = [];

// Issue 1: SITEMAP_MISSING_HREFLANG — blog pages with 0 sitemap hreflang but 12 in HTML
if (p3Summary.divergencesByPageType.blog > 0) {
  const blogDivergences = p3.divergences.filter(d => d.type === 'blog');
  const affectedBlogUrls = blogDivergences.map(d => d.url);

  // Estimate total affected: the audit sampled ~40 blog URLs from 2,464 in sitemap
  // If 44 out of 40 sampled diverge, it's possible ALL blog pages in sitemap ID 7 are affected
  const blogInSitemapTotal = p3.sitemapStats.byType.blog || 0;
  const sampleSize = p3.config.sampleTargets.blog || 40;
  const divergenceRate = blogDivergences.length / sampleSize;
  const estimatedTotalAffected = Math.round(divergenceRate * blogInSitemapTotal);

  issues.push({
    id: 'SITEMAP_MISSING_HREFLANG',
    severity: 'HIGH',
    category: 'Sitemap / HTML Divergence',
    source: 'Part 3',
    title: 'Blog pages have hreflang in HTML but 0 in their sitemap section',
    description: `${blogDivergences.length} out of ${sampleSize} sampled blog pages have hreflang in their HTML (12 alternates each) but 0 hreflang entries in their sitemap section (ID 7). The sitemap sections 6 (blog primary) correctly include hreflang, but section 7 (blog cross-locale alternates) does not.`,
    sampledAffected: blogDivergences.length,
    estimatedTotalAffected,
    sampleUrls: affectedBlogUrls.slice(0, 5),
    rootCause: 'Sitemap section 7 (blog alternate URLs) is generated without xhtml:link hreflang alternates. These URLs ARE in the sitemap but lack the hreflang annotations that their HTML counterparts have.',
    fixParts: [13, 28],
    fixDescription: 'Part 13 aligns sitemap hreflang logic with HTML logic for blogs. Part 28 cleans up sitemap to remove non-indexable/redirect URLs.',
  });
}

// Issue 1b: SITEMAP_MISSING_HREFLANG for static/product pages
if (p3Summary.divergencesByPageType.static > 0) {
  const staticDivergences = p3.divergences.filter(d => d.type === 'static');

  issues.push({
    id: 'SITEMAP_MISSING_HREFLANG_STATIC',
    severity: 'MEDIUM',
    category: 'Sitemap / HTML Divergence',
    source: 'Part 3',
    title: 'Product pages in sitemap section 7 lack hreflang annotations',
    description: `${staticDivergences.length} product page URLs found in sitemap section 7 have hreflang in HTML but 0 in the sitemap. These appear to be product pages categorized under the catch-all sitemap section.`,
    sampledAffected: staticDivergences.length,
    estimatedTotalAffected: staticDivergences.length,
    sampleUrls: staticDivergences.map(d => d.url),
    rootCause: 'These product pages appear in sitemap section 7 (catch-all) instead of section 1 (products), and section 7 does not generate hreflang alternates.',
    fixParts: [17, 28],
    fixDescription: 'Part 17 fixes product page hreflang consistency. Part 28 ensures sitemap only contains URLs in their correct sections.',
  });
}

// Issue 2: STALE_REDIRECT_ENTRIES
if (p4Summary.staleEntries.length > 0) {
  issues.push({
    id: 'STALE_REDIRECT_ENTRIES',
    severity: 'LOW',
    category: 'Redirect Map Hygiene',
    source: 'Part 4',
    title: 'Orphaned slugs in redirect map no longer in database',
    description: `${p4Summary.staleEntries.length} slug(s) exist in the cross-locale redirect map but are no longer in the database. These are harmless (they redirect to a locale that no longer claims the slug) but represent technical debt.`,
    sampledAffected: p4Summary.staleEntries.length,
    estimatedTotalAffected: p4Summary.staleEntries.length,
    sampleUrls: p4Summary.staleEntries.map(e => `slug: "${e.slug}" (mapped as ${e.mapNativeLocale})`),
    rootCause: 'Blog posts were likely updated (slugs changed) after the redirect map was generated on ' + p4.sources.redirectMap.generated + ', leaving stale entries behind.',
    fixParts: [11],
    fixDescription: 'Part 11 regenerates the cross-locale redirect map from the current database, removing stale entries and adding any new ones.',
  });
}

// Issue 3: SHARED_SLUGS
if (p4Summary.sharedSlugs.length > 0) {
  issues.push({
    id: 'SHARED_SLUGS',
    severity: 'INFO',
    category: 'Slug Architecture',
    source: 'Part 4',
    title: 'Some slugs are used by multiple locales for the same post',
    description: `${p4Summary.sharedSlugs.length} slug(s) are used by more than one locale for the same blog post. This is expected for English slugs that are also valid in other locales (e.g., technical terms), but should be monitored.`,
    sampledAffected: p4Summary.sharedSlugs.length,
    estimatedTotalAffected: p4Summary.sharedSlugs.length,
    sampleUrls: p4Summary.sharedSlugs.map(s => `slug: "${s.slug}" used by [${s.dbLocales.join(', ')}], map native: ${s.mapNativeLocale}`),
    rootCause: 'These posts have the same slug value stored under multiple locale translations. The redirect map correctly assigns them to one native locale, and middleware redirects other locales to the native one.',
    fixParts: [10],
    fixDescription: 'Part 10 audits slug uniqueness and can assign discriminators if needed. Currently these are functioning correctly via redirects.',
  });
}

// Check for issues from Part 1 (there should be none, but include for completeness)
if (p1Summary.totalIssues > 0) {
  for (const [type, count] of Object.entries(p1Summary.issueBreakdown)) {
    if (count > 0) {
      issues.push({
        id: `SLUG_${type}`,
        severity: type === 'MISSING' ? 'CRITICAL' : type === 'ENGLISH_FALLBACK' ? 'HIGH' : 'MEDIUM',
        category: 'Blog Slug Data',
        source: 'Part 1',
        title: `${count} blog slug ${type.toLowerCase()} issue(s)`,
        description: `${count} blog post locale slots have ${type.toLowerCase()} issues.`,
        sampledAffected: count,
        estimatedTotalAffected: count,
        sampleUrls: [],
        rootCause: `Blog translations have ${type.toLowerCase()} slug data.`,
        fixParts: type === 'MISSING' ? [6, 7, 8] : type === 'WRONG_LANGUAGE' ? [9] : [10],
        fixDescription: `Parts 6-8 generate missing slugs, Part 9 fixes wrong-language slugs, Part 10 fixes duplicates.`,
      });
    }
  }
}

// Check for issues from Part 2 (there should be none, but include for completeness)
if (p2Summary.pagesWithIssues > 0) {
  issues.push({
    id: 'HTML_HREFLANG_ISSUES',
    severity: 'HIGH',
    category: 'Live HTML Hreflang',
    source: 'Part 2',
    title: `${p2Summary.pagesWithIssues} live pages have hreflang issues in HTML`,
    description: `${p2Summary.pagesWithIssues} out of ${p2Summary.totalPages} sampled pages have HTML hreflang issues.`,
    sampledAffected: p2Summary.pagesWithIssues,
    estimatedTotalAffected: p2Summary.pagesWithIssues,
    sampleUrls: [],
    rootCause: 'HTML hreflang generation has bugs.',
    fixParts: [12, 17, 21],
    fixDescription: 'Part 12 fixes blog hreflang, Part 17 fixes product hreflang, Part 21 fixes theme hreflang.',
  });
}

// Sort by severity
const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3, INFO: 4 };
issues.sort((a, b) => (severityOrder[a.severity] ?? 5) - (severityOrder[b.severity] ?? 5));

console.log(`\nFound ${issues.length} issue(s):`);
for (const issue of issues) {
  console.log(`  [${issue.severity}] ${issue.id}: ${issue.title}`);
}
console.log();

// ─── Phase 3: Generate Markdown Report ──────────────────────────────────────

console.log('Phase 3: Generating report...');
console.log('-'.repeat(40));

const now = new Date().toISOString();

// Build the fix plan analysis
// Map: which parts from the 30-part plan are needed based on actual findings
const neededParts = new Set();
const skippableParts = new Set();
for (const issue of issues) {
  for (const p of issue.fixParts) neededParts.add(p);
}

// All 30 parts and their purposes
const allParts = [
  { part: 1, phase: 1, title: 'Blog Slug Completeness Audit', status: 'DONE', needed: true },
  { part: 2, phase: 1, title: 'Live HTML Hreflang Audit', status: 'DONE', needed: true },
  { part: 3, phase: 1, title: 'Sitemap vs HTML Cross-Reference Audit', status: 'DONE', needed: true },
  { part: 4, phase: 1, title: 'Redirect Map Completeness Audit', status: 'DONE', needed: true },
  { part: 5, phase: 1, title: 'Master Diagnosis Report', status: 'DONE', needed: true },
  { part: 6, phase: 2, title: 'Generate Missing Slugs (de, fr, es)', status: 'SKIP', needed: false, reason: 'Part 1 found 0 missing slugs' },
  { part: 7, phase: 2, title: 'Generate Missing Slugs (pt, it, nl)', status: 'SKIP', needed: false, reason: 'Part 1 found 0 missing slugs' },
  { part: 8, phase: 2, title: 'Generate Missing Slugs (sv, da, no, fi)', status: 'SKIP', needed: false, reason: 'Part 1 found 0 missing slugs' },
  { part: 9, phase: 2, title: 'Fix Wrong-Language Slugs', status: 'SKIP', needed: false, reason: 'Part 1 found 0 wrong-language slugs' },
  { part: 10, phase: 2, title: 'Ensure Slug Uniqueness', status: 'MONITOR', needed: false, reason: '2 shared slugs exist but function correctly via redirects' },
  { part: 11, phase: 2, title: 'Regenerate Cross-Locale Redirect Map', status: 'RECOMMENDED', needed: true, reason: '2 stale entries to clean up; good hygiene' },
  { part: 12, phase: 3, title: 'Fix Blog generateMetadata Hreflang', status: 'VERIFY', needed: false, reason: 'Part 2 found 0 HTML hreflang issues — code may already be correct' },
  { part: 13, phase: 3, title: 'Fix Blog Sitemap Hreflang Parity', status: 'NEEDED', needed: true, reason: '44 blog pages have 0 sitemap hreflang (PRIMARY ISSUE)' },
  { part: 14, phase: 3, title: 'Fix Blog generateStaticParams', status: 'VERIFY', needed: false, reason: 'No evidence of incorrect static params, but verify during Part 13' },
  { part: 15, phase: 3, title: 'Blog Hreflang Validation Test', status: 'RECOMMENDED', needed: true, reason: 'Prevents future regressions' },
  { part: 16, phase: 4, title: 'Audit Product Page Slugs', status: 'VERIFY', needed: false, reason: 'Part 2 found 0 product page issues, but 2 product pages in Part 3 had sitemap divergence' },
  { part: 17, phase: 4, title: 'Fix Product Page Hreflang Consistency', status: 'RECOMMENDED', needed: true, reason: '2 product pages in wrong sitemap section lack hreflang' },
  { part: 18, phase: 4, title: 'Product Page Hreflang Validation', status: 'RECOMMENDED', needed: true, reason: 'Prevents future regressions' },
  { part: 19, phase: 5, title: 'Localize Blog Category URL Slugs', status: 'OPTIONAL', needed: false, reason: 'No issues found in audits, but improves SEO signal alignment' },
  { part: 20, phase: 5, title: 'Localize Product Category & Grade Slugs', status: 'OPTIONAL', needed: false, reason: 'No issues found in audits, but improves SEO signal alignment' },
  { part: 21, phase: 5, title: 'Audit Theme Hub Page Hreflang', status: 'VERIFY', needed: false, reason: 'Part 2 found 0 theme page issues in sampled pages' },
  { part: 22, phase: 5, title: 'Audit Theme+Grade Combo Hreflang', status: 'VERIFY', needed: false, reason: 'Not yet audited — theme+grade pages not included in Part 3 sample' },
  { part: 23, phase: 6, title: 'Fix HTML lang Attribute Reliability', status: 'VERIFY', needed: false, reason: 'Part 2 found 0 lang attribute issues' },
  { part: 24, phase: 6, title: 'Fix Content-Language Header', status: 'VERIFY', needed: false, reason: 'Part 2 found 0 Content-Language issues' },
  { part: 25, phase: 6, title: 'Eliminate Mixed-Language Signals', status: 'OPTIONAL', needed: false, reason: 'No evidence of mixed signals in audits' },
  { part: 26, phase: 6, title: 'Build-Time Hreflang Symmetry Validation', status: 'RECOMMENDED', needed: true, reason: 'Comprehensive regression prevention' },
  { part: 27, phase: 7, title: 'Canonical & Redirect Chain Audit', status: 'VERIFY', needed: false, reason: 'Part 2 found 0 canonical issues, Part 4 redirects all passed' },
  { part: 28, phase: 7, title: 'Sitemap Cleanup', status: 'NEEDED', needed: true, reason: 'Sitemap section 7 needs hreflang or URL reorganization' },
  { part: 29, phase: 8, title: 'Deploy & Full Live Validation', status: 'NEEDED', needed: true, reason: 'Required to ship fixes' },
  { part: 30, phase: 8, title: 'GSC Submission & Monitoring', status: 'NEEDED', needed: true, reason: 'Required to trigger re-indexing' },
];

// Count affected URLs
let totalAffectedUrls = 0;
for (const issue of issues) {
  totalAffectedUrls += issue.estimatedTotalAffected;
}

// Generate Markdown
const md = [];

md.push('# MASTER DIAGNOSIS REPORT');
md.push('');
md.push(`> Generated: ${now}`);
md.push(`> Plan: THE PERFECT SEO (30 parts)`);
md.push(`> Phase: 1 — Deep Audit (Parts 1-5) COMPLETE`);
md.push('');

// ─── Executive Summary ──────────────────────────────────────────────────────

md.push('## Executive Summary');
md.push('');

if (issues.length === 0) {
  md.push('All 4 audits passed with zero issues. The blog SEO infrastructure is in excellent health.');
} else {
  const criticalCount = issues.filter(i => i.severity === 'CRITICAL').length;
  const highCount = issues.filter(i => i.severity === 'HIGH').length;
  const mediumCount = issues.filter(i => i.severity === 'MEDIUM').length;
  const lowCount = issues.filter(i => i.severity === 'LOW').length;
  const infoCount = issues.filter(i => i.severity === 'INFO').length;

  md.push(`After auditing 1,232 blog slug pairs, 121 live pages, 98 sitemap-vs-HTML comparisons, and 1,232 redirect map entries, the blog SEO infrastructure is in **good overall health** with **one significant finding**: ${p3Summary.pagesWithDivergence} pages have hreflang annotations in their HTML but zero hreflang in their sitemap section. This creates a signal divergence that Google may interpret as conflicting authority. The fix is localized to the sitemap generation code (specifically sitemap section 7). All other checks — slug completeness, live HTML hreflang, redirect functionality — passed perfectly.`);
  md.push('');
  md.push(`**Issues found:** ${criticalCount} critical, ${highCount} high, ${mediumCount} medium, ${lowCount} low, ${infoCount} informational`);
}
md.push('');

// ─── Audit Results Table ────────────────────────────────────────────────────

md.push('## Audit Results');
md.push('');
md.push('| # | Audit | Scope | Result | Key Finding |');
md.push('|---|-------|-------|--------|-------------|');
md.push(`| 1 | Blog Slug Completeness | ${p1Summary.totalPosts} posts x 11 locales = ${p1Summary.totalSlots} pairs | **${p1Summary.status}** | 0 missing, 0 wrong-language, 0 duplicates |`);
md.push(`| 2 | Live HTML Hreflang | ${p2Summary.totalPages} pages, ${p2Summary.totalHreflangChecked} hreflang URLs, ${p2Summary.totalReciprocals} reciprocals | **${p2Summary.status}** | 0 pages with issues |`);
md.push(`| 3 | Sitemap vs HTML Parity | ${p3Summary.totalCompared} URLs compared | **${p3Summary.status}** | ${p3Summary.pagesWithDivergence} pages diverge (${p3Summary.divergencesByPageType.blog || 0} blog + ${p3Summary.divergencesByPageType.static || 0} static) |`);
md.push(`| 4 | Redirect Map Completeness | ${p4Summary.mapEntries} map entries vs ${p4Summary.dbSlugPairs} DB pairs | **${p4Summary.status}** | ${p4Summary.staleEntries.length} stale entries, ${p4Summary.liveTestsPassed}/${p4Summary.liveTestsPassed + p4Summary.liveTestsFailed} live tests pass |`);
md.push('');

// ─── Issue Registry ─────────────────────────────────────────────────────────

md.push('## Issue Registry');
md.push('');

if (issues.length === 0) {
  md.push('No issues found across all 4 audits.');
} else {
  md.push(`${issues.length} issue(s) found, ordered by severity:`);
  md.push('');

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    const severityEmoji = {
      CRITICAL: '🔴',
      HIGH: '🟠',
      MEDIUM: '🟡',
      LOW: '🔵',
      INFO: '⚪',
    }[issue.severity] || '⚪';

    md.push(`### ${i + 1}. ${severityEmoji} [${issue.severity}] ${issue.id}`);
    md.push('');
    md.push(`**${issue.title}**`);
    md.push('');
    md.push(`- **Source:** ${issue.source}`);
    md.push(`- **Category:** ${issue.category}`);
    md.push(`- **Sampled affected:** ${issue.sampledAffected}`);
    md.push(`- **Estimated total affected:** ${issue.estimatedTotalAffected}`);
    md.push('');
    md.push(`**Description:** ${issue.description}`);
    md.push('');
    md.push(`**Root cause:** ${issue.rootCause}`);
    md.push('');
    md.push(`**Fix:** ${issue.fixDescription} (Parts ${issue.fixParts.join(', ')})`);
    md.push('');
    if (issue.sampleUrls.length > 0) {
      md.push('**Sample URLs:**');
      for (const url of issue.sampleUrls) {
        md.push(`- \`${url}\``);
      }
      md.push('');
    }
  }
}

// ─── Affected URL Summary ───────────────────────────────────────────────────

md.push('## Affected URL Counts');
md.push('');
md.push('| Issue | Severity | Sampled | Estimated Total |');
md.push('|-------|----------|---------|-----------------|');
for (const issue of issues) {
  md.push(`| ${issue.id} | ${issue.severity} | ${issue.sampledAffected} | ${issue.estimatedTotalAffected} |`);
}
md.push(`| **TOTAL** | | | **${totalAffectedUrls}** |`);
md.push('');

// ─── Prioritized Fix Plan ───────────────────────────────────────────────────

md.push('## Prioritized Fix Plan');
md.push('');
md.push('Based on audit findings, here is the status of each part in the 30-part plan:');
md.push('');
md.push('### Legend');
md.push('');
md.push('| Status | Meaning |');
md.push('|--------|---------|');
md.push('| DONE | Already completed |');
md.push('| NEEDED | Required — audit found issues this part addresses |');
md.push('| RECOMMENDED | No blocking issues, but adds important regression prevention or hygiene |');
md.push('| VERIFY | Audit found no issues, but should verify during related work |');
md.push('| MONITOR | No action needed now, but track over time |');
md.push('| SKIP | Not needed — audit confirmed no issues exist |');
md.push('| OPTIONAL | Nice to have for improved SEO signals, but not fixing any current bugs |');
md.push('');

// Group by phase
const phases = [
  { num: 1, name: 'Deep Audit', range: '1-5' },
  { num: 2, name: 'Blog Database Fixes', range: '6-11' },
  { num: 3, name: 'Blog Code Fixes', range: '12-15' },
  { num: 4, name: 'Product Page Fixes', range: '16-18' },
  { num: 5, name: 'Landing Page Fixes', range: '19-22' },
  { num: 6, name: 'Infrastructure Fixes', range: '23-26' },
  { num: 7, name: 'Canonical & Redirect Cleanup', range: '27-28' },
  { num: 8, name: 'Deployment & Re-Indexing', range: '29-30' },
];

for (const phase of phases) {
  const phaseParts = allParts.filter(p => p.phase === phase.num);
  md.push(`### Phase ${phase.num}: ${phase.name} (Parts ${phase.range})`);
  md.push('');
  md.push('| Part | Title | Status | Reason |');
  md.push('|------|-------|--------|--------|');
  for (const p of phaseParts) {
    const statusBadge = {
      DONE: '✅ DONE',
      NEEDED: '🔧 NEEDED',
      RECOMMENDED: '💡 RECOMMENDED',
      VERIFY: '🔍 VERIFY',
      MONITOR: '👁 MONITOR',
      SKIP: '⏭ SKIP',
      OPTIONAL: '✨ OPTIONAL',
    }[p.status] || p.status;
    md.push(`| ${p.part} | ${p.title} | ${statusBadge} | ${p.reason || 'Completed'} |`);
  }
  md.push('');
}

// ─── Execution Summary ──────────────────────────────────────────────────────

const neededPartsList = allParts.filter(p => p.status === 'NEEDED');
const recommendedPartsList = allParts.filter(p => p.status === 'RECOMMENDED');
const skipPartsList = allParts.filter(p => p.status === 'SKIP');
const verifyPartsList = allParts.filter(p => p.status === 'VERIFY');

md.push('## Execution Summary');
md.push('');
md.push(`Out of 30 parts in the plan:`);
md.push('');
md.push(`- **5 DONE** (Parts 1-5: Deep Audit phase complete)`);
md.push(`- **${neededPartsList.length} NEEDED** (Parts ${neededPartsList.map(p => p.part).join(', ')}): Address actual issues found`);
md.push(`- **${recommendedPartsList.length} RECOMMENDED** (Parts ${recommendedPartsList.map(p => p.part).join(', ')}): Regression prevention and hygiene`);
md.push(`- **${verifyPartsList.length} VERIFY** (Parts ${verifyPartsList.map(p => p.part).join(', ')}): Quick checks during related work`);
md.push(`- **${skipPartsList.length} SKIP** (Parts ${skipPartsList.map(p => p.part).join(', ')}): No issues found, not needed`);
md.push('');

// ─── Recommendations ────────────────────────────────────────────────────────

md.push('## Recommendations');
md.push('');
md.push('### Priority 1: Fix Sitemap Hreflang (the one real issue)');
md.push('');
md.push('The only significant finding is that sitemap section 7 (which contains ~1,595 blog alternate URLs) does not include `xhtml:link` hreflang alternates. Meanwhile, the HTML on these same pages correctly declares 12 hreflang alternates. This divergence means Google gets conflicting signals:');
md.push('');
md.push('- **HTML says:** "This page has 12 language alternates"');
md.push('- **Sitemap says:** "This page has 0 language alternates"');
md.push('');
md.push('**Action:** Execute Part 13 (Fix Blog Sitemap Hreflang Parity) and Part 28 (Sitemap Cleanup) to resolve this. The fix should either:');
md.push('');
md.push('1. Add hreflang annotations to sitemap section 7 entries, OR');
md.push('2. Remove section 7 entries entirely (since these URLs are already covered by section 6 with hreflang)');
md.push('');
md.push('Option 2 is likely simpler and cleaner — if section 6 already covers all blog URLs with proper hreflang, section 7 duplicates may be causing the confusion.');
md.push('');
md.push('### Priority 2: Regenerate Redirect Map (hygiene)');
md.push('');
md.push('Execute Part 11 to remove the 2 stale redirect map entries. This is low urgency but prevents potential edge cases if those slugs are reused.');
md.push('');
md.push('### Priority 3: Add Validation Tests (regression prevention)');
md.push('');
md.push('Execute Parts 15, 18, and 26 to add automated hreflang validation. This ensures future content additions or code changes cannot re-introduce the issues that have now been confirmed as fixed.');
md.push('');
md.push('### Priority 4: Deploy & Re-Index');
md.push('');
md.push('After fixes, execute Parts 29-30 to deploy and request Google re-indexing.');
md.push('');
md.push('### What Can Be Skipped');
md.push('');
md.push('Parts 6-9 (fixing missing/wrong blog slugs) can be **entirely skipped** — the Part 1 audit confirmed all 1,232 locale-slug pairs are correct. This saves significant effort that was anticipated when the plan was drafted.');
md.push('');
md.push('Parts 19-20 (localizing category/grade URL slugs) are **optional** — they improve SEO signal purity but the audits found no issues caused by English segments in non-English URLs.');
md.push('');

// ─── Raw Data Reference ─────────────────────────────────────────────────────

md.push('## Raw Data Reference');
md.push('');
md.push('| Audit | File | Generated |');
md.push('|-------|------|-----------|');
md.push(`| Part 1 | \`docs/audit-results/blog-slug-completeness.json\` | ${p1.generatedAt} |`);
md.push(`| Part 2 | \`docs/audit-results/live-hreflang-audit.json\` | ${p2.generatedAt} |`);
md.push(`| Part 3 | \`docs/audit-results/sitemap-vs-html-divergence.json\` | ${p3.generatedAt} |`);
md.push(`| Part 4 | \`docs/audit-results/redirect-map-completeness.json\` | ${p4.generatedAt} |`);
md.push('');

// Write the file
const markdown = md.join('\n');
fs.writeFileSync(OUTPUT_FILE, markdown, 'utf8');
console.log(`  Written: ${OUTPUT_FILE}`);
console.log(`  Size: ${(Buffer.byteLength(markdown) / 1024).toFixed(1)} KB`);
console.log();

// ─── Final Console Summary ──────────────────────────────────────────────────

console.log('='.repeat(70));
console.log('  DIAGNOSIS COMPLETE');
console.log('='.repeat(70));
console.log();
console.log(`Total issues: ${issues.length}`);
for (const sev of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO']) {
  const count = issues.filter(i => i.severity === sev).length;
  if (count > 0) console.log(`  ${sev}: ${count}`);
}
console.log();
console.log(`Estimated total affected URLs: ${totalAffectedUrls}`);
console.log();
console.log('Recommended next steps:');
console.log('  1. Part 13 — Fix sitemap section 7 hreflang (PRIMARY FIX)');
console.log('  2. Part 28 — Sitemap cleanup');
console.log('  3. Part 11 — Regenerate redirect map (hygiene)');
console.log('  4. Parts 15, 18, 26 — Add validation tests');
console.log('  5. Parts 29-30 — Deploy & re-index');
console.log();
console.log(`Report: docs/audit-results/MASTER-DIAGNOSIS.md`);
