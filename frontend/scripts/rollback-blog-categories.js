/**
 * Phase 2 Rollback: Restore Blog Post Categories from Backup
 *
 * Restores categories to their pre-assignment state using a JSON backup file.
 *
 * Usage:
 *   node scripts/rollback-blog-categories.js --file=scripts/backups/categories-backup-TIMESTAMP.json
 *   node scripts/rollback-blog-categories.js --file=scripts/backups/categories-backup-TIMESTAMP.json --apply
 *
 * Alternative instant rollback (resets ALL posts to teaching-resources):
 *   PGPASSWORD='...' psql -U lcs_user -d lessoncraftstudio_prod -c \
 *     "UPDATE blog_posts SET category = 'teaching-resources' WHERE status = 'published';"
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
  console.error('Usage: node scripts/rollback-blog-categories.js --file=scripts/backups/categories-backup-TIMESTAMP.json [--apply]');
  process.exit(1);
}

const backupFile = fileArg.split('=')[1];
const backupPath = path.isAbsolute(backupFile) ? backupFile : path.resolve(backupFile);

async function main() {
  console.log(`=== CATEGORY ROLLBACK ${DRY_RUN ? '(DRY RUN)' : '(APPLYING)'} ===\n`);

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
    select: { id: true, category: true },
  });

  const currentMap = new Map(currentPosts.map(p => [p.id, p.category]));

  // Compute rollback changes
  const changes = [];
  for (const entry of backup) {
    const currentCategory = currentMap.get(entry.id);
    if (currentCategory === undefined) {
      console.log(`  SKIP (post not found): ${entry.slug} (${entry.id})`);
      continue;
    }

    if (currentCategory === entry.category) {
      continue; // Already matches backup
    }

    changes.push({
      id: entry.id,
      slug: entry.slug,
      currentCategory: currentCategory,
      restoreCategory: entry.category,
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
    console.log(`  Current:  ${change.currentCategory}`);
    console.log(`  Restore:  ${change.restoreCategory}`);
    console.log('');
  }

  if (DRY_RUN) {
    console.log('=== DRY RUN COMPLETE ===');
    console.log('Run with --apply to restore categories from backup.');
    return;
  }

  // Apply rollback in a single transaction
  console.log('Applying rollback...\n');

  await prisma.$transaction(
    changes.map(change =>
      prisma.blogPost.update({
        where: { id: change.id },
        data: { category: change.restoreCategory },
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
