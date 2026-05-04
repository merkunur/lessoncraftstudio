#!/usr/bin/env node
// Phase 2 — synthesize N synthetic Decks + adjacent rows in the isolated
// load-test DB. Uses LOADTEST_DATABASE_URL env var.
//
// Usage:
//   LOADTEST_DATABASE_URL="postgresql://loadtest:loadtest_pw@localhost:5433/lcs_loadtest" \
//     node synthesize.js --target 55000 [--seed 1] [--batch 1000]
//
// Flags:
//   --target <N>   total Deck row count to generate (required)
//   --seed <N>     RNG seed for reproducibility (default: 1)
//   --batch <N>    INSERT batch size (default: 1000)
//   --skip-bundles skip Bundle/BundleDeck/BundleLessonPlan generation
//
// Generates:
//   - N Deck rows distributed per lib/distribution.js shape
//   - 134 Topic rows (full taxonomy: 29 exercise-type + 100 theme + 5 educational-level)
//   - ~50 LessonPlan rows (in-flight Pillar 1 cap)
//   - ~7 Bundle rows + composition (in-flight Pillar 2 cap)
//
// Halt-surface point: Phase 2 ends when this script completes successfully.
// Phase 3 load-test runs separately via run-loadtest.js (not yet implemented).

const args = process.argv.slice(2);
function getArg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
}
function hasFlag(name) {
  return args.indexOf(name) >= 0;
}

const TARGET = parseInt(getArg('--target', '0'), 10);
const SEED = parseInt(getArg('--seed', '1'), 10);
const BATCH = parseInt(getArg('--batch', '1000'), 10);
const SKIP_BUNDLES = hasFlag('--skip-bundles');

if (!TARGET || TARGET < 1) {
  console.error('ERROR: --target <N> required (positive integer)');
  process.exit(1);
}

if (!process.env.LOADTEST_DATABASE_URL) {
  console.error('ERROR: LOADTEST_DATABASE_URL env var must be set');
  console.error('Example: postgresql://loadtest:loadtest_pw@localhost:5433/lcs_loadtest');
  process.exit(1);
}

// Override Prisma's DATABASE_URL with the loadtest URL
process.env.DATABASE_URL = process.env.LOADTEST_DATABASE_URL;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { mulberry32 } = require('./lib/distribution');
const { generateDecks } = require('./lib/deck-factory');
const { generateTopics } = require('./lib/topic-factory');
const { generateLessonPlans } = require('./lib/lesson-plan-factory');
const { generateBundles } = require('./lib/bundle-factory');

function timestamp() {
  return new Date().toISOString();
}

async function batchInsert(model, rows, batchSize, label) {
  const total = rows.length;
  let inserted = 0;
  const start = Date.now();
  for (let i = 0; i < total; i += batchSize) {
    const slice = rows.slice(i, i + batchSize);
    await model.createMany({ data: slice, skipDuplicates: true });
    inserted += slice.length;
    if (inserted % (batchSize * 10) === 0 || inserted === total) {
      const pct = ((inserted / total) * 100).toFixed(1);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  ${label}: ${inserted}/${total} (${pct}%) in ${elapsed}s`);
    }
  }
  return inserted;
}

async function main() {
  const t0 = Date.now();
  console.log(`[${timestamp()}] synthesize.js — target=${TARGET} seed=${SEED} batch=${BATCH}`);
  console.log(`[${timestamp()}] DB: ${process.env.LOADTEST_DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`);

  const rand = mulberry32(SEED);

  // 1. Topics first — Decks reference topicSlugs (currently empty array per
  //    deck-factory) but other tables reference Topic.slug as FK. Insert
  //    all 134 axis-key Topics up front.
  console.log(`\n[${timestamp()}] Generating Topics (full taxonomy)...`);
  const topics = generateTopics();
  await batchInsert(prisma.topic, topics, BATCH, 'topics');
  console.log(`  ✓ ${topics.length} Topics inserted`);

  // 2. Decks — N rows per --target distribution
  console.log(`\n[${timestamp()}] Generating ${TARGET} synthetic Decks...`);
  const decks = generateDecks(TARGET, rand);
  await batchInsert(prisma.deck, decks, BATCH, 'decks');

  // Verify count
  const deckCount = await prisma.deck.count({ where: { status: 'published' } });
  console.log(`  ✓ ${deckCount} published Decks in DB (target ${TARGET})`);

  // Distribution audit
  const byLanguage = await prisma.deck.groupBy({
    by: ['language'],
    where: { status: 'published' },
    _count: { _all: true },
  });
  console.log(`  Distribution by language:`);
  for (const r of byLanguage.sort((a, b) => b._count._all - a._count._all)) {
    console.log(`    ${r.language}: ${r._count._all}`);
  }

  const byExerciseType = await prisma.deck.groupBy({
    by: ['exerciseType'],
    where: { status: 'published' },
    _count: { _all: true },
  });
  console.log(`  Distribution by exerciseType (top 10):`);
  for (const r of byExerciseType.sort((a, b) => b._count._all - a._count._all).slice(0, 10)) {
    console.log(`    ${r.exerciseType}: ${r._count._all}`);
  }

  const themedCount = await prisma.deck.count({
    where: { status: 'published', subjectTags: { isEmpty: false } },
  });
  const themelessCount = deckCount - themedCount;
  console.log(`  Themed: ${themedCount} (${((themedCount / deckCount) * 100).toFixed(1)}%)`);
  console.log(`  Themeless: ${themelessCount} (${((themelessCount / deckCount) * 100).toFixed(1)}%)`);

  // 3. LessonPlans — pull in-DB topicSlugs for FK satisfaction
  console.log(`\n[${timestamp()}] Generating LessonPlans...`);
  const topicRows = await prisma.topic.findMany({ select: { slug: true } });
  const topicSlugs = topicRows.map(t => t.slug);
  const LESSON_PLAN_TARGET = 50;
  const lessonPlans = generateLessonPlans(topicSlugs, LESSON_PLAN_TARGET, rand);
  await batchInsert(prisma.lessonPlan, lessonPlans, BATCH, 'lessonPlans');
  const lpCount = await prisma.lessonPlan.count();
  console.log(`  ✓ ${lpCount} LessonPlans inserted`);

  // 4. Bundles + BundleDecks + BundleLessonPlans
  if (!SKIP_BUNDLES) {
    console.log(`\n[${timestamp()}] Generating Bundles + composition...`);
    const allDecks = await prisma.deck.findMany({
      select: { id: true, language: true, subjectTags: true },
      where: { status: 'published' },
    });
    const allLessonPlans = await prisma.lessonPlan.findMany({
      select: { id: true, topicSlug: true, language: true },
    });
    const BUNDLE_TARGET = 7;
    const { bundles, bundleDecks, bundleLessonPlans } = generateBundles(
      allDecks,
      allLessonPlans,
      BUNDLE_TARGET,
      rand
    );
    await batchInsert(prisma.bundle, bundles, BATCH, 'bundles');
    await batchInsert(prisma.bundleDeck, bundleDecks, BATCH, 'bundleDecks');
    await batchInsert(prisma.bundleLessonPlan, bundleLessonPlans, BATCH, 'bundleLessonPlans');
    console.log(`  ✓ ${bundles.length} Bundles + ${bundleDecks.length} BundleDecks + ${bundleLessonPlans.length} BundleLessonPlans inserted`);
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\n[${timestamp()}] DONE in ${elapsed}s`);
}

main()
  .catch(err => {
    console.error('\nFAILED:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
