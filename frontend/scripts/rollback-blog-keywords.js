/**
 * Phase 1 Rollback: Restore Blog Post Keywords from Backup
 *
 * Restores keywords to their pre-backfill state using a JSON backup file.
 *
 * Usage:
 *   node scripts/rollback-blog-keywords.js --file=scripts/backups/keywords-backup-TIMESTAMP.json
 *   node scripts/rollback-blog-keywords.js --file=scripts/backups/keywords-backup-TIMESTAMP.json --apply
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Parse CLI args
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const DRY_RUN = !APPLY;
const fileArg = args.find(a => a.startsWith('--file='));

if (!fileArg) {
  console.error('ERROR: --file=<path> is required');
  console.error('Usage: node scripts/rollback-blog-keywords.js --file=scripts/backups/keywords-backup-TIMESTAMP.json [--apply]');
  process.exit(1);
}

const backupFile = fileArg.split('=')[1];
const backupPath = path.isAbsolute(backupFile) ? backupFile : path.resolve(backupFile);

async function main() {
  console.log(`=== KEYWORD ROLLBACK ${DRY_RUN ? '(DRY RUN)' : '(APPLYING)'} ===\n`);

  // Read backup file
  if (!fs.existsSync(backupPath)) {
    console.error(`ERROR: Backup file not found: ${backupPath}`);
    process.exit(1);
  }

  const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  console.log(`Loaded backup with ${backup.length} posts from: ${backupPath}\n`);

  // Fetch current state
  const currentPosts = await prisma.blogPost.findMany({
    where: { id: { in: backup.map(b => b.id) } },
    select: { id: true, keywords: true },
  });

  const currentMap = new Map(currentPosts.map(p => [p.id, p.keywords || []]));

  // Compute rollback changes
  const changes = [];
  for (const entry of backup) {
    const currentKeywords = currentMap.get(entry.id);
    if (!currentKeywords) {
      console.log(`  SKIP (post not found): ${entry.slug} (${entry.id})`);
      continue;
    }

    const backupSorted = [...entry.keywords].sort().join(',');
    const currentSorted = [...currentKeywords].sort().join(',');

    if (backupSorted === currentSorted) {
      continue; // Already matches backup
    }

    changes.push({
      id: entry.id,
      slug: entry.slug,
      currentKeywords: currentKeywords,
      restoreKeywords: entry.keywords,
    });
  }

  console.log(`Posts to rollback: ${changes.length}`);
  console.log(`Posts already matching backup: ${backup.length - changes.length}\n`);

  if (changes.length === 0) {
    console.log('No rollback needed. All posts already match backup.');
    return;
  }

  // Show changes
  for (const change of changes) {
    console.log(`${change.slug}:`);
    console.log(`  Current:  [${change.currentKeywords.join(', ')}]`);
    console.log(`  Restore:  [${change.restoreKeywords.join(', ')}]`);
    console.log('');
  }

  if (DRY_RUN) {
    console.log('=== DRY RUN COMPLETE ===');
    console.log('Run with --apply to restore keywords from backup.');
    return;
  }

  // Apply rollback in a single transaction
  console.log('Applying rollback...\n');

  await prisma.$transaction(
    changes.map(change =>
      prisma.blogPost.update({
        where: { id: change.id },
        data: { keywords: change.restoreKeywords },
      })
    )
  );

  console.log(`=== ROLLBACK COMPLETE: ${changes.length} posts restored ===`);
}

main()
  .catch(e => {
    console.error('ERROR:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
