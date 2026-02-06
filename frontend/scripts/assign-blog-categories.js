/**
 * Phase 2: Assign Blog Post Categories via Topic Cluster Scoring
 *
 * Scores each blog post against 10 topic clusters (replicating the proven
 * logic from blog-topic-clusters.ts) and maps the winning cluster to a
 * blog category.
 *
 * Safety:
 *   - DRY-RUN by default (requires --apply to write)
 *   - Creates JSON backup before any writes
 *   - Only reassigns posts currently in 'teaching-resources' (preserves manual overrides)
 *   - Confidence threshold: score >= 10 required for reassignment
 *   - Validates every category against VALID_CATEGORIES whitelist
 *   - Distribution check warns if any category < 5 posts
 *   - Single transaction for atomicity
 *
 * Usage:
 *   node scripts/assign-blog-categories.js              # Dry run (default)
 *   node scripts/assign-blog-categories.js --apply       # Apply changes
 *   node scripts/assign-blog-categories.js --verify      # Verify current state
 *   node scripts/assign-blog-categories.js --verbose      # Extra logging
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

// Minimum score required for category reassignment
const CONFIDENCE_THRESHOLD = 10;

// ---------------------------------------------------------------------------
// VALID_CATEGORIES (from category/[category]/page.tsx:18-26)
// ---------------------------------------------------------------------------

const VALID_CATEGORIES = [
  'teaching-resources',
  'worksheet-tips',
  'educational-activities',
  'learning-strategies',
  'curriculum-guides',
  'parent-resources',
  'seasonal-content',
];

// ---------------------------------------------------------------------------
// TOPIC_CLUSTERS (from blog-topic-clusters.ts:27-88)
// ---------------------------------------------------------------------------

const TOPIC_CLUSTERS = [
  {
    id: 'math-arithmetic',
    primaryKeywords: ['addition', 'subtraction', 'arithmetic', 'cipher', 'calculation', 'math facts', 'number bonds'],
    secondaryKeywords: ['math', 'mathematics', 'compute', 'sum', 'difference', 'equations', 'operations'],
    appIds: ['image-addition', 'subtraction', 'code-addition', 'math-worksheet', 'math-puzzle', 'more-less'],
  },
  {
    id: 'counting-numbers',
    primaryKeywords: ['counting', 'count', 'chart', 'graph', 'tally', 'number sense', 'quantity'],
    secondaryKeywords: ['numbers', 'data', 'compare', 'greater', 'less', 'kindergarten math'],
    appIds: ['find-and-count', 'chart-count-color', 'more-less', 'math-worksheet', 'image-addition'],
  },
  {
    id: 'word-games',
    primaryKeywords: ['word search', 'crossword', 'vocabulary', 'spelling', 'cryptogram', 'word scramble', 'word puzzle'],
    secondaryKeywords: ['words', 'language', 'dictionary', 'phonics', 'decode', 'letters'],
    appIds: ['word-search', 'word-scramble', 'word-guess', 'image-crossword', 'image-cryptogram'],
  },
  {
    id: 'writing-literacy',
    primaryKeywords: ['writing', 'handwriting', 'alphabet', 'literacy', 'letter formation', 'story', 'narrative'],
    secondaryKeywords: ['tracing', 'penmanship', 'creative writing', 'grammar', 'preposition', 'sentence'],
    appIds: ['writing-app', 'alphabet-train', 'story-dice', 'prepositions', 'drawing-lines'],
  },
  {
    id: 'visual-perception',
    primaryKeywords: ['visual perception', 'visual discrimination', 'shadow', 'hidden objects', 'frostig', 'spatial'],
    secondaryKeywords: ['observation', 'perception', 'figure-ground', 'constancy', 'visual memory', 'eye training'],
    appIds: ['shadow-match', 'find-objects', 'missing-pieces', 'odd-one-out', 'picture-path', 'big-small-app'],
  },
  {
    id: 'logic-patterns',
    primaryKeywords: ['sudoku', 'pattern', 'logic', 'sequence', 'sorting', 'critical thinking', 'problem solving'],
    secondaryKeywords: ['puzzle', 'classify', 'categorize', 'reasoning', 'order', 'series'],
    appIds: ['sudoku', 'pattern-worksheet', 'pattern-train', 'picture-sort', 'odd-one-out', 'image-cryptogram'],
  },
  {
    id: 'art-motor-skills',
    primaryKeywords: ['coloring', 'drawing', 'fine motor', 'motor skills', 'tracing', 'art', 'craft'],
    secondaryKeywords: ['color', 'pencil', 'grip', 'dexterity', 'hand-eye', 'coordination', 'creative'],
    appIds: ['coloring', 'draw-and-color', 'drawing-lines', 'picture-path', 'writing-app'],
  },
  {
    id: 'games-activities',
    primaryKeywords: ['bingo', 'treasure hunt', 'game', 'kinesthetic', 'movement', 'scavenger'],
    secondaryKeywords: ['play', 'activity', 'fun', 'interactive', 'engage', 'physical', 'group'],
    appIds: ['picture-bingo', 'treasure-hunt', 'matching-app', 'story-dice', 'grid-match'],
  },
  {
    id: 'early-childhood',
    primaryKeywords: ['pre-k', 'preschool', 'toddler', 'ages 3', 'ages 4', 'early childhood', 'readiness'],
    secondaryKeywords: ['kindergarten', 'foundational', 'beginner', 'introduction', 'first', 'basic skills'],
    appIds: ['alphabet-train', 'coloring', 'matching-app', 'drawing-lines', 'big-small-app', 'find-and-count'],
  },
  {
    id: 'seasonal-thematic',
    primaryKeywords: ['seasonal', 'holiday', 'christmas', 'halloween', 'spring', 'summer', 'winter', 'autumn'],
    secondaryKeywords: ['themed', 'celebration', 'festival', 'year-round', 'occasion', 'thematic'],
    appIds: ['coloring', 'word-search', 'picture-bingo', 'treasure-hunt', 'matching-app'],
  },
];

// ---------------------------------------------------------------------------
// CLUSTER_CATEGORY_MAP (from plan)
// ---------------------------------------------------------------------------

const CLUSTER_CATEGORY_MAP = {
  'math-arithmetic': 'curriculum-guides',
  'counting-numbers': 'curriculum-guides',
  'word-games': 'educational-activities',
  'writing-literacy': 'teaching-resources',
  'visual-perception': 'learning-strategies',
  'logic-patterns': 'learning-strategies',
  'art-motor-skills': 'worksheet-tips',
  'games-activities': 'educational-activities',
  'early-childhood': 'parent-resources',
  'seasonal-thematic': 'seasonal-content',
};

// ---------------------------------------------------------------------------
// NOISE_WORDS (from blog-topic-clusters.ts:225-238)
// ---------------------------------------------------------------------------

const NOISE_WORDS = new Set([
  'free', 'worksheets', 'worksheet', 'complete', 'guide', 'teaching',
  'teachers', 'teacher', 'printable', 'download', 'pdf', 'educational',
  'education', 'classroom', 'school', 'student', 'students', 'children',
  'kids', 'child', 'learning', 'learn', 'the', 'and', 'for', 'with',
  'how', 'to', 'of', 'in', 'on', 'at', 'from', 'by', 'an', 'a',
  'that', 'this', 'your', 'their', 'our', 'are', 'is', 'was', 'were',
  'has', 'have', 'had', 'be', 'been', 'being', 'do', 'does', 'did',
  'will', 'would', 'can', 'could', 'should', 'may', 'might',
  'create', 'creating', 'make', 'making', 'using', 'use', 'best',
  'top', 'ultimate', 'comprehensive', 'essential', 'effective',
  'tools', 'tool', 'resource', 'resources', 'activity', 'activities',
  'generator', 'generators', 'ages',
]);

// ---------------------------------------------------------------------------
// Matching algorithm (replicates blog-topic-clusters.ts:252-361)
// ---------------------------------------------------------------------------

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, ' ')
    .split(/[\s\-]+/)
    .filter(w => w.length > 1 && !NOISE_WORDS.has(w));
}

function keywordMatchesTokens(keyword, tokens) {
  const kwParts = keyword.toLowerCase().split(/[\s\-]+/).filter(w => w.length > 1);
  if (kwParts.length === 0) return false;
  return kwParts.every(part => tokens.some(t => t === part || t.includes(part)));
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ');
}

/**
 * Score a blog post against all topic clusters.
 * Returns the best match above the confidence threshold, or null.
 */
function scoreBlogPost(title, slug, focusKeyword, contentFirst500Words) {
  const titleTokens = normalizeText(title);
  const slugTokens = normalizeText(slug);
  const focusTokens = focusKeyword ? normalizeText(focusKeyword) : [];
  const contentTokens = contentFirst500Words ? normalizeText(contentFirst500Words) : [];
  const allTokens = [...titleTokens, ...slugTokens, ...focusTokens];

  let bestMatch = null;

  for (const cluster of TOPIC_CLUSTERS) {
    let score = 0;

    // Score primary keywords (weight: +10 base, +20 if in title)
    for (const kw of cluster.primaryKeywords) {
      if (keywordMatchesTokens(kw, titleTokens)) {
        score += 20; // title match = 2x
      } else if (keywordMatchesTokens(kw, slugTokens)) {
        score += 10;
      } else if (keywordMatchesTokens(kw, focusTokens)) {
        score += 10;
      } else if (keywordMatchesTokens(kw, contentTokens)) {
        score += 5; // content match = lower weight
      }
    }

    // Score secondary keywords (weight: +3 base, +6 if in title)
    for (const kw of cluster.secondaryKeywords) {
      if (keywordMatchesTokens(kw, titleTokens)) {
        score += 6; // title match = 2x
      } else if (keywordMatchesTokens(kw, allTokens)) {
        score += 3;
      } else if (keywordMatchesTokens(kw, contentTokens)) {
        score += 2; // content match = lower weight
      }
    }

    // Bonus: direct app name in slug
    for (const appId of cluster.appIds) {
      if (slug.includes(appId)) {
        score += 25;
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { clusterId: cluster.id, score };
    }
  }

  if (bestMatch && bestMatch.score >= CONFIDENCE_THRESHOLD) {
    return bestMatch;
  }

  return null;
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
  const filePath = path.join(dir, `categories-backup-${timestamp}.json`);
  const data = posts.map(p => ({
    id: p.id,
    slug: p.translations?.en?.slug || 'unknown',
    category: p.category,
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
  console.log('=== CATEGORY VERIFICATION ===\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, category: true, translations: true },
  });

  // Distribution
  const catCounts = {};
  let invalidCount = 0;

  for (const post of posts) {
    const cat = post.category || 'null';
    catCounts[cat] = (catCounts[cat] || 0) + 1;
    if (!VALID_CATEGORIES.includes(post.category)) {
      invalidCount++;
    }
  }

  console.log(`Total published posts: ${posts.length}`);
  console.log(`Invalid categories: ${invalidCount}\n`);

  console.log('Category distribution:');
  const sorted = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sorted) {
    const valid = VALID_CATEGORIES.includes(cat) ? '' : ' [INVALID]';
    console.log(`  ${cat}: ${count} posts${valid}`);
  }

  // Thin categories warning
  console.log('\nThin category check (< 5 posts):');
  let hasThin = false;
  for (const cat of VALID_CATEGORIES) {
    const count = catCounts[cat] || 0;
    if (count < 5 && count > 0) {
      console.log(`  WARNING: ${cat} has only ${count} posts`);
      hasThin = true;
    }
  }
  if (!hasThin) console.log('  All active categories have >= 5 posts');

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

  console.log(`=== BLOG CATEGORY ASSIGNMENT ${DRY_RUN ? '(DRY RUN)' : '(APPLYING)'} ===\n`);

  // Fetch all published posts in teaching-resources
  const posts = await prisma.blogPost.findMany({
    where: {
      status: 'published',
      category: 'teaching-resources', // Only reassign from default category
    },
    select: {
      id: true,
      category: true,
      translations: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Found ${posts.length} published posts in 'teaching-resources'\n`);

  if (posts.length === 0) {
    console.log('No posts to reassign.');
    return;
  }

  // Compute changes
  const changes = [];
  let skippedLowConfidence = 0;
  let skippedNoContent = 0;

  for (const post of posts) {
    const enTranslation = post.translations?.en;
    if (!enTranslation) {
      skippedNoContent++;
      if (VERBOSE) console.log(`  SKIP (no EN translation): ${post.id}`);
      continue;
    }

    const title = enTranslation.title || '';
    const slug = enTranslation.slug || '';
    const focusKeyword = enTranslation.focusKeyword || '';
    const content = enTranslation.content || '';

    // Get first ~500 words of content for body scanning
    const plainContent = stripHtml(content);
    const words = plainContent.split(/\s+/);
    const first500 = words.slice(0, 500).join(' ');

    const match = scoreBlogPost(title, slug, focusKeyword, first500);

    if (!match) {
      skippedLowConfidence++;
      if (VERBOSE) console.log(`  SKIP (low confidence): ${slug}`);
      continue;
    }

    const newCategory = CLUSTER_CATEGORY_MAP[match.clusterId];

    // Validate category
    if (!VALID_CATEGORIES.includes(newCategory)) {
      console.error(`  ERROR: Invalid category '${newCategory}' for cluster '${match.clusterId}'. Skipping.`);
      continue;
    }

    // Skip if already in the target category (shouldn't happen since we filter, but safety check)
    if (newCategory === 'teaching-resources') {
      skippedLowConfidence++; // writing-literacy maps to teaching-resources, no change needed
      if (VERBOSE) console.log(`  SKIP (stays in teaching-resources): ${slug} [${match.clusterId}, score=${match.score}]`);
      continue;
    }

    changes.push({
      id: post.id,
      slug: slug,
      title: title,
      oldCategory: post.category,
      newCategory: newCategory,
      clusterId: match.clusterId,
      score: match.score,
    });
  }

  // Report
  console.log(`Posts to reassign: ${changes.length}`);
  console.log(`Skipped (low confidence / stays teaching-resources): ${skippedLowConfidence}`);
  console.log(`Skipped (no EN translation): ${skippedNoContent}\n`);

  if (changes.length === 0) {
    console.log('No changes needed.');
    return;
  }

  // Show changes grouped by target category
  console.log('--- Changes by target category ---\n');
  const byCategory = {};
  for (const change of changes) {
    if (!byCategory[change.newCategory]) byCategory[change.newCategory] = [];
    byCategory[change.newCategory].push(change);
  }

  for (const [cat, catChanges] of Object.entries(byCategory).sort()) {
    console.log(`${cat} (${catChanges.length} posts):`);
    for (const change of catChanges) {
      console.log(`  ${change.slug} [${change.clusterId}, score=${change.score}]`);
    }
    console.log('');
  }

  // Distribution preview (including posts NOT being reassigned)
  console.log('--- Projected category distribution ---\n');
  const allPosts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, category: true },
  });

  const projectedCounts = {};
  const changeIdSet = new Set(changes.map(c => c.id));

  for (const p of allPosts) {
    let cat = p.category;
    const change = changes.find(c => c.id === p.id);
    if (change) {
      cat = change.newCategory;
    }
    projectedCounts[cat] = (projectedCounts[cat] || 0) + 1;
  }

  for (const cat of VALID_CATEGORIES) {
    const count = projectedCounts[cat] || 0;
    const warning = count < 5 ? ' [WARNING: < 5 posts]' : '';
    console.log(`  ${cat}: ${count} posts${warning}`);
  }
  console.log('');

  // Warn on thin categories
  const thinCategories = VALID_CATEGORIES.filter(c => (projectedCounts[c] || 0) > 0 && (projectedCounts[c] || 0) < 5);
  if (thinCategories.length > 0) {
    console.log('WARNING: The following categories would have < 5 posts:');
    for (const cat of thinCategories) {
      console.log(`  ${cat}: ${projectedCounts[cat]} posts`);
    }
    console.log('Consider adjusting cluster mappings or confidence threshold.\n');
  }

  if (DRY_RUN) {
    console.log('=== DRY RUN COMPLETE ===');
    console.log('Run with --apply to write changes to the database.');
    return;
  }

  // Create backup before applying (backup ALL posts, not just the ones changing)
  const backupPath = createBackup(allPosts);
  console.log('\nApplying changes...\n');

  // Apply in single transaction for atomicity
  await prisma.$transaction(
    changes.map(change =>
      prisma.blogPost.update({
        where: { id: change.id },
        data: { category: change.newCategory },
      })
    )
  );

  console.log(`=== APPLY COMPLETE: ${changes.length} posts reassigned ===`);
  console.log(`Backup at: ${backupPath}`);
  console.log('Run with --verify to check the result.');
}

main()
  .catch(e => {
    console.error('ERROR:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
