#!/usr/bin/env node
// Clear synthetic data from isolated load-test DB. Preserves schema; allows
// re-running synthesize.js at a different --target without container teardown.
//
// Truncates in FK-safe order:
//   1. BundleLessonPlan (joins Bundle ↔ LessonPlan)
//   2. BundleDeck (joins Bundle ↔ Deck)
//   3. Bundle
//   4. LessonPlan (FK to Topic.slug)
//   5. Deck (no inbound FK from Topic; Topic.topicSlugs is array soft-FK)
//   6. Topic (last)
//
// Usage:
//   LOADTEST_DATABASE_URL="postgresql://loadtest:loadtest_pw@localhost:5433/lcs_loadtest" \
//     node clear.js

if (!process.env.LOADTEST_DATABASE_URL) {
  console.error('ERROR: LOADTEST_DATABASE_URL env var must be set');
  process.exit(1);
}

process.env.DATABASE_URL = process.env.LOADTEST_DATABASE_URL;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`[clear] DB: ${process.env.LOADTEST_DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`);

  // Use TRUNCATE CASCADE for speed at scale (DELETE is slow on 55K rows)
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE bundle_lesson_plans, bundle_decks, bundles, lesson_plans, decks, topics RESTART IDENTITY CASCADE'
  );

  const counts = {
    decks: await prisma.deck.count(),
    topics: await prisma.topic.count(),
    lessonPlans: await prisma.lessonPlan.count(),
    bundles: await prisma.bundle.count(),
    bundleDecks: await prisma.bundleDeck.count(),
    bundleLessonPlans: await prisma.bundleLessonPlan.count(),
  };

  console.log('Post-truncate counts:');
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k}: ${v}`);
  }
  console.log('[clear] DONE');
}

main()
  .catch(err => {
    console.error('FAILED:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
