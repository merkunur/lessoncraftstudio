/**
 * Phase 1: Backfill Blog Post Keywords
 *
 * Extracts content-derived keywords from blog post titles and content,
 * then appends them to each post's keywords array (additive only).
 *
 * Safety:
 *   - DRY-RUN by default (requires --apply to write)
 *   - Creates JSON backup before any writes
 *   - Additive only -- never removes existing keywords
 *   - Deduplicates via Set
 *   - Transaction wrapping per batch of 10
 *
 * Usage:
 *   node scripts/backfill-blog-keywords.js              # Dry run (default)
 *   node scripts/backfill-blog-keywords.js --apply       # Apply changes
 *   node scripts/backfill-blog-keywords.js --verify      # Verify current state
 *   node scripts/backfill-blog-keywords.js --verbose      # Extra logging
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Parse CLI args
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const DRY_RUN = !APPLY;
const VERIFY = args.includes('--verify');
const VERBOSE = args.includes('--verbose');

// ---------------------------------------------------------------------------
// KEYWORD_PRODUCT_MAP (copied from lib/internal-linking.ts lines 18-69)
// ---------------------------------------------------------------------------

const KEYWORD_PRODUCT_MAP = {
  // Math keywords
  'addition': ['image-addition', 'code-addition', 'math-worksheet'],
  'subtraction': ['subtraction', 'math-worksheet'],
  'math': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
  'counting': ['find-and-count', 'chart-count-color', 'more-less'],
  'numbers': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],

  // Language Arts keywords
  'vocabulary': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
  'words': ['word-search', 'word-scramble', 'word-guess'],
  'alphabet': ['alphabet-train', 'writing-app'],
  'letters': ['alphabet-train', 'writing-app'],
  'writing': ['writing-app', 'story-dice'],
  'handwriting': ['writing-app', 'drawing-lines'],
  'spelling': ['word-search', 'word-scramble', 'image-crossword'],
  'crossword': ['image-crossword'],
  'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],

  // Logic & Patterns keywords
  'pattern': ['pattern-worksheet', 'pattern-train'],
  'sequence': ['pattern-worksheet', 'pattern-train'],
  'logic': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
  'sorting': ['picture-sort', 'big-small-app'],
  'matching': ['matching-app', 'shadow-match', 'grid-match'],

  // Visual & Fine Motor keywords
  'coloring': ['coloring', 'draw-and-color'],
  'drawing': ['coloring', 'draw-and-color', 'drawing-lines'],
  'tracing': ['drawing-lines', 'writing-app'],
  'fine motor': ['drawing-lines', 'coloring', 'draw-and-color'],

  // Games & Activities keywords
  'bingo': ['picture-bingo'],
  'game': ['picture-bingo', 'treasure-hunt', 'story-dice'],
  'maze': ['picture-path'],
  'hidden objects': ['find-objects'],

  // Early Childhood keywords
  'preschool': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  'kindergarten': ['alphabet-train', 'coloring', 'find-and-count', 'matching-app', 'pattern-worksheet'],
  'toddler': ['coloring', 'big-small-app', 'matching-app'],

  // Skill-based keywords
  'visual perception': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
  'critical thinking': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
  'memory': ['matching-app', 'picture-bingo', 'grid-match'],
  'comparison': ['more-less', 'big-small-app'],
  'size': ['big-small-app'],
  'prepositions': ['prepositions'],
  'cryptogram': ['image-cryptogram'],
};

const ALL_KEYWORDS = Object.keys(KEYWORD_PRODUCT_MAP);

// ---------------------------------------------------------------------------
// Keyword extraction (replicates internal-linking.ts:1073-1087)
// ---------------------------------------------------------------------------

/**
 * Strip HTML tags and return lowercase plain text.
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').toLowerCase();
}

/**
 * Extract matching keywords from text content.
 * Uses Unicode-safe word boundaries (same regex as internal-linking.ts).
 */
function extractKeywords(text) {
  const found = [];
  for (const keyword of ALL_KEYWORDS) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      `(?:^|[\\s,;.!?()\\[\\]])${escaped}(?=[\\s,;.!?()\\[\\]]|$)`,
      'i'
    );
    if (regex.test(text)) {
      found.push(keyword);
    }
  }
  return found;
}

// ---------------------------------------------------------------------------
// Backup helpers
// ---------------------------------------------------------------------------

function ensureBackupDir() {
  const dir = path.join(__dirname, 'backups');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function createBackup(posts) {
  const dir = ensureBackupDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(dir, `keywords-backup-${timestamp}.json`);
  const data = posts.map(p => ({
    id: p.id,
    slug: p.translations?.en?.slug || 'unknown',
    keywords: p.keywords || [],
  }));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`\nBackup saved to: ${filePath}`);
  console.log(`Backed up ${data.length} posts`);
  return filePath;
}

// ---------------------------------------------------------------------------
// Verify mode
// ---------------------------------------------------------------------------

async function runVerify() {
  console.log('=== KEYWORD VERIFICATION ===\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, keywords: true, translations: true },
  });

  // Keyword distribution
  const keywordCounts = {};
  let postsWithMapKeywords = 0;

  for (const post of posts) {
    const keywords = post.keywords || [];
    const matchingKeywords = keywords.filter(k => ALL_KEYWORDS.includes(k));
    if (matchingKeywords.length > 0) postsWithMapKeywords++;
    for (const kw of matchingKeywords) {
      keywordCounts[kw] = (keywordCounts[kw] || 0) + 1;
    }
  }

  console.log(`Total published posts: ${posts.length}`);
  console.log(`Posts with KEYWORD_PRODUCT_MAP keywords: ${postsWithMapKeywords}`);
  console.log(`Posts WITHOUT map keywords: ${posts.length - postsWithMapKeywords}\n`);

  console.log('Keyword distribution (top 20):');
  const sorted = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
  for (const [kw, count] of sorted.slice(0, 20)) {
    console.log(`  ${kw}: ${count} posts`);
  }

  // Check for unique coverage per app
  console.log('\nKeywords with zero posts:');
  const zeroKeywords = ALL_KEYWORDS.filter(k => !keywordCounts[k]);
  if (zeroKeywords.length === 0) {
    console.log('  None -- all keywords have at least one post!');
  } else {
    for (const kw of zeroKeywords) {
      console.log(`  ${kw}`);
    }
  }

  console.log('\n=== VERIFICATION COMPLETE ===');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (VERIFY) {
    await runVerify();
    return;
  }

  console.log(`=== BLOG KEYWORD BACKFILL ${DRY_RUN ? '(DRY RUN)' : '(APPLYING)'} ===\n`);

  // Fetch all published posts
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      keywords: true,
      translations: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Found ${posts.length} published posts\n`);

  // Compute changes
  const changes = [];
  let skippedNoNew = 0;
  let skippedNoContent = 0;

  for (const post of posts) {
    const enTranslation = post.translations?.en;
    if (!enTranslation) {
      skippedNoContent++;
      if (VERBOSE) console.log(`  SKIP (no EN translation): ${post.id}`);
      continue;
    }

    const title = enTranslation.title || '';
    const content = enTranslation.content || '';
    const slug = enTranslation.slug || '';

    // Extract keywords from title + content + slug
    const textToScan = `${stripHtml(title)} ${stripHtml(content)} ${slug.replace(/-/g, ' ')}`;
    const extracted = extractKeywords(textToScan);

    // Merge with existing (additive, deduplicated)
    const existing = post.keywords || [];
    const merged = [...new Set([...existing, ...extracted])];

    // Only track if there are new keywords
    const newKeywords = extracted.filter(k => !existing.includes(k));
    if (newKeywords.length === 0) {
      skippedNoNew++;
      if (VERBOSE) console.log(`  SKIP (no new keywords): ${slug}`);
      continue;
    }

    changes.push({
      id: post.id,
      slug: slug,
      existingKeywords: existing,
      newKeywords: newKeywords,
      finalKeywords: merged,
    });
  }

  // Report
  console.log(`Posts to update: ${changes.length}`);
  console.log(`Skipped (no new keywords): ${skippedNoNew}`);
  console.log(`Skipped (no EN translation): ${skippedNoContent}\n`);

  if (changes.length === 0) {
    console.log('No changes needed. All posts already have correct keywords.');
    return;
  }

  // Show changes
  console.log('--- Changes ---\n');
  for (const change of changes) {
    console.log(`${change.slug}:`);
    console.log(`  Existing: [${change.existingKeywords.join(', ')}]`);
    console.log(`  Adding:   [${change.newKeywords.join(', ')}]`);
    console.log(`  Final:    [${change.finalKeywords.join(', ')}]`);
    console.log('');
  }

  // Summary
  const allNewKeywords = {};
  for (const change of changes) {
    for (const kw of change.newKeywords) {
      allNewKeywords[kw] = (allNewKeywords[kw] || 0) + 1;
    }
  }
  console.log('--- New keyword distribution ---\n');
  const sortedNew = Object.entries(allNewKeywords).sort((a, b) => b[1] - a[1]);
  for (const [kw, count] of sortedNew) {
    console.log(`  ${kw}: +${count} posts`);
  }
  console.log('');

  if (DRY_RUN) {
    console.log('=== DRY RUN COMPLETE ===');
    console.log('Run with --apply to write changes to the database.');
    return;
  }

  // Create backup before applying
  const backupPath = createBackup(posts);
  console.log('\nApplying changes...\n');

  // Apply in batches of 10 within transactions
  const BATCH_SIZE = 10;
  let applied = 0;

  for (let i = 0; i < changes.length; i += BATCH_SIZE) {
    const batch = changes.slice(i, i + BATCH_SIZE);

    await prisma.$transaction(
      batch.map(change =>
        prisma.blogPost.update({
          where: { id: change.id },
          data: { keywords: change.finalKeywords },
        })
      )
    );

    applied += batch.length;
    console.log(`  Applied batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} posts (${applied}/${changes.length} total)`);
  }

  console.log(`\n=== APPLY COMPLETE: ${applied} posts updated ===`);
  console.log(`Backup at: ${backupPath}`);
  console.log('Run with --verify to check the result.');
}

main()
  .catch(e => {
    console.error('ERROR:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
