/**
 * generate-duplicate-audit.js
 *
 * Audits for duplicate/overlapping content between guide pages and blog posts.
 * Reads TypeScript content files as plain text, extracts SEO keywords via regex,
 * and computes Jaccard similarity to flag potential duplicates.
 *
 * Usage: node frontend/scripts/generate-duplicate-audit.js
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const GUIDE_DIR = path.resolve(__dirname, '../config/guide-content/en');
const BLOG_DIR = path.resolve(__dirname, '../config/blog-content/en');
const OUTPUT_FILE = path.resolve(__dirname, '../data/duplicate-content-audit.ts');

const KEYWORD_OVERLAP_THRESHOLD = 0.3;
const SLUG_OVERLAP_MIN_WORDS = 2;

// Stop words removed when building keyword word-sets
const STOP_WORDS = new Set([
  'to', 'on', 'for', 'the', 'a', 'an', 'and', 'in', 'of', 'with',
  'how', 'your', 'is', 'it', 'as', 'by', 'or', 'be', 'at', 'from',
  'that', 'this', 'are', 'was', 'were', 'been', 'not', 'but', 'can',
  'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may',
  'might', 'shall', 'has', 'have', 'had', 'its', 'my', 'our', 'their',
  '&', '|', '-',
]);

// Common slug words to ignore when comparing slugs
const COMMON_SLUG_WORDS = new Set([
  'printable', 'printables', 'sell', 'selling', 'etsy', 'create',
  'worksheets', 'worksheet', 'business', 'online', 'guide', 'how',
  'to', 'for', 'the', 'a', 'and', 'your', 'best', 'with', 'make',
  'from', 'kdp', 'amazon',
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Read a .ts file as text and extract SEO fields via regex. */
function extractSeoFields(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8');

  // Extract titleTag — handles both single and double quotes, including escaped quotes
  const titleTagMatch = text.match(/titleTag:\s*['"](.+?)['"]/);
  const titleTag = titleTagMatch ? titleTagMatch[1] : '';

  // Extract primaryKeyword
  const primaryMatch = text.match(/primaryKeyword:\s*['"](.+?)['"]/);
  const primaryKeyword = primaryMatch ? primaryMatch[1] : '';

  // Extract secondaryKeywords array
  const secondaryKeywords = [];
  const secBlockMatch = text.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
  if (secBlockMatch) {
    const block = secBlockMatch[1];
    const strings = block.match(/['"](.+?)['"]/g);
    if (strings) {
      for (const s of strings) {
        secondaryKeywords.push(s.slice(1, -1)); // strip quotes
      }
    }
  }

  return { titleTag, primaryKeyword, secondaryKeywords };
}

/** Convert a list of keyword phrases into a set of meaningful words. */
function toWordSet(keywords) {
  const words = new Set();
  for (const phrase of keywords) {
    for (const word of phrase.toLowerCase().split(/[\s,;:.\-\/]+/)) {
      const trimmed = word.replace(/[^a-z0-9]/g, '');
      if (trimmed.length > 1 && !STOP_WORDS.has(trimmed)) {
        words.add(trimmed);
      }
    }
  }
  return words;
}

/** Jaccard similarity between two sets. */
function jaccard(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/** Extract meaningful words from a slug. */
function slugWords(slug) {
  return slug
    .split('-')
    .filter(w => w.length > 1 && !COMMON_SLUG_WORDS.has(w));
}

/** Count shared meaningful words between two slugs. */
function slugOverlap(slugA, slugB) {
  const wordsA = slugWords(slugA);
  const wordsB = new Set(slugWords(slugB));
  const shared = wordsA.filter(w => wordsB.has(w));
  return shared;
}

/** Escape a string for use inside a TypeScript single-quoted string. */
function escapeTS(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  // 1. Read all guide content files
  const guideFiles = fs.readdirSync(GUIDE_DIR)
    .filter(f => f.endsWith('.ts'))
    .sort();

  const guides = guideFiles.map(f => {
    const slug = f.replace('.ts', '');
    const fields = extractSeoFields(path.join(GUIDE_DIR, f));
    const allKeywords = [fields.primaryKeyword, ...fields.secondaryKeywords].filter(Boolean);
    const wordSet = toWordSet(allKeywords);
    return { slug, ...fields, allKeywords, wordSet };
  });

  console.log(`Loaded ${guides.length} guide files from ${GUIDE_DIR}`);

  // 2. Read all blog content files
  const blogFiles = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.ts'))
    .sort();

  const blogs = blogFiles.map(f => {
    const slug = f.replace('.ts', '');
    const fields = extractSeoFields(path.join(BLOG_DIR, f));
    const allKeywords = [fields.primaryKeyword, ...fields.secondaryKeywords].filter(Boolean);
    const wordSet = toWordSet(allKeywords);
    return { slug, ...fields, allKeywords, wordSet };
  });

  console.log(`Loaded ${blogs.length} blog files from ${BLOG_DIR}`);

  // 3. Compare every guide-blog pair
  const flagged = [];

  for (const guide of guides) {
    for (const blog of blogs) {
      const overlapScore = jaccard(guide.wordSet, blog.wordSet);
      const sharedSlugWords = slugOverlap(guide.slug, blog.slug);
      const hasSlugOverlap = sharedSlugWords.length >= SLUG_OVERLAP_MIN_WORDS;

      if (overlapScore > KEYWORD_OVERLAP_THRESHOLD || hasSlugOverlap) {
        // Determine recommendation
        let recommendation;
        let notes = '';

        if (overlapScore > 0.5) {
          recommendation = 'consider-merge';
          notes = `High keyword overlap (${(overlapScore * 100).toFixed(1)}%). These pages likely compete for the same queries.`;
        } else if (overlapScore > KEYWORD_OVERLAP_THRESHOLD) {
          recommendation = 'differentiate-keywords';
          notes = `Moderate keyword overlap (${(overlapScore * 100).toFixed(1)}%). Consider splitting target intent more clearly.`;
        } else {
          recommendation = 'review-manually';
          notes = `Slug words overlap: [${sharedSlugWords.join(', ')}]. Keyword overlap is ${(overlapScore * 100).toFixed(1)}%.`;
        }

        flagged.push({
          guideSlug: guide.slug,
          guideTitleTag: guide.titleTag,
          guideKeywords: guide.allKeywords,
          blogSlug: blog.slug,
          blogTitleTag: blog.titleTag,
          blogKeywords: blog.allKeywords,
          overlapScore: Math.round(overlapScore * 1000) / 1000,
          recommendation,
          notes,
        });
      }
    }
  }

  // Sort by overlapScore descending
  flagged.sort((a, b) => b.overlapScore - a.overlapScore);

  console.log(`\nFlagged ${flagged.length} pairs total`);
  console.log(`  consider-merge:         ${flagged.filter(f => f.recommendation === 'consider-merge').length}`);
  console.log(`  differentiate-keywords: ${flagged.filter(f => f.recommendation === 'differentiate-keywords').length}`);
  console.log(`  review-manually:        ${flagged.filter(f => f.recommendation === 'review-manually').length}`);

  if (flagged.length > 0) {
    console.log(`\nTop 10 highest overlap scores:`);
    for (const entry of flagged.slice(0, 10)) {
      console.log(`  ${(entry.overlapScore * 100).toFixed(1)}% | ${entry.recommendation}`);
      console.log(`    guide: ${entry.guideSlug}`);
      console.log(`    blog:  ${entry.blogSlug}`);
    }
  }

  // 4. Generate the output TypeScript file
  const entries = flagged.map(entry => {
    const guideKw = entry.guideKeywords.map(k => `'${escapeTS(k)}'`).join(', ');
    const blogKw = entry.blogKeywords.map(k => `'${escapeTS(k)}'`).join(', ');
    return `  {
    guideSlug: '${escapeTS(entry.guideSlug)}',
    guideTitleTag: '${escapeTS(entry.guideTitleTag)}',
    guideKeywords: [${guideKw}],
    blogSlug: '${escapeTS(entry.blogSlug)}',
    blogTitleTag: '${escapeTS(entry.blogTitleTag)}',
    blogKeywords: [${blogKw}],
    overlapScore: ${entry.overlapScore},
    recommendation: '${entry.recommendation}',
    notes: '${escapeTS(entry.notes)}',
  }`;
  });

  const output = `// Auto-generated by scripts/generate-duplicate-audit.js
// Run: node frontend/scripts/generate-duplicate-audit.js
// Generated: ${new Date().toISOString().slice(0, 10)}

export interface DuplicateContentEntry {
  guideSlug: string;
  guideTitleTag: string;
  guideKeywords: string[];
  blogSlug: string;
  blogTitleTag: string;
  blogKeywords: string[];
  overlapScore: number;
  recommendation: 'consider-merge' | 'differentiate-keywords' | 'add-canonical' | 'review-manually';
  notes: string;
}

export const duplicateContentAudit: DuplicateContentEntry[] = [
${entries.join(',\n')}
];
`;

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`\nOutput written to: ${OUTPUT_FILE}`);
}

main();
