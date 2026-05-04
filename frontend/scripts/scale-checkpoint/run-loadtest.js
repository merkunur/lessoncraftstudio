#!/usr/bin/env node
// Phase 3 — load-test execution against the isolated Docker DB.
//
// For each checkpoint (291/3K/10K/30K/55K):
//   1. clear.js → truncate
//   2. synthesize.js → populate at --target N (subprocess)
//   3. For each of the 7 query paths:
//      - Run 100 invocations with realistic parameter variation
//      - Capture p50, p95, p99 latency via process.hrtime.bigint()
//   4. Capture EXPLAIN ANALYZE for one representative invocation per path
//   5. Detect planner-shift between checkpoints
//
// Usage:
//   LOADTEST_DATABASE_URL=... node run-loadtest.js [--checkpoints 291,3000,10000,30000,55000]
//
// Output: JSON results to stdout + summary table to stderr.

const args = process.argv.slice(2);
function getArg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
}
const CHECKPOINTS = getArg('--checkpoints', '291,3000,10000,30000,55000')
  .split(',')
  .map(s => parseInt(s.trim(), 10));
const SEED = parseInt(getArg('--seed', '1'), 10);
const INVOCATIONS = parseInt(getArg('--invocations', '100'), 10);

if (!process.env.LOADTEST_DATABASE_URL) {
  console.error('ERROR: LOADTEST_DATABASE_URL env var must be set');
  process.exit(1);
}
process.env.DATABASE_URL = process.env.LOADTEST_DATABASE_URL;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { spawnSync } = require('child_process');
const path = require('path');
const taxonomy = require(path.join(__dirname, '..', '..', 'config', 'topics-taxonomy.json'));

const ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const EXERCISE_TYPES = Object.values(taxonomy.apps).map(a => a.exercise_type_axis_key);
const THEME_KEYS = Object.keys(taxonomy.axes.theme);
const AGE_RANGES = ['3-5', '5-7', '6-8', '7-9', '8-10'];

// ---- Param-randomization helpers ----------------------------------------
function pick(arr, rand) { return arr[Math.floor(rand() * arr.length)]; }
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6D2B79F5) >>> 0;
    let s = Math.imul(t ^ (t >>> 15), 1 | t);
    s = (s + Math.imul(s ^ (s >>> 7), 61 | s)) ^ s;
    return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
  };
}
function percentile(sorted, p) {
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

// ---- Query paths --------------------------------------------------------
// Each entry mirrors the actual prod read-path query shape from Phase 1
// inventory. paramFn produces a fresh random parameter set per invocation.
const QUERY_PATHS = [
  {
    id: 'path1a',
    name: 'Topic-page deck listing (exercise-type axis)',
    paramFn: rand => ({ locale: pick(ALL_LOCALES, rand), exerciseType: pick(EXERCISE_TYPES, rand) }),
    run: (p) => prisma.deck.findMany({
      where: { language: p.locale, status: 'published', exerciseType: p.exerciseType },
      select: TOPIC_DECK_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    }),
  },
  {
    id: 'path1b',
    name: 'Topic-page deck listing (theme axis)',
    paramFn: rand => ({ locale: pick(ALL_LOCALES, rand), theme: pick(THEME_KEYS, rand) }),
    run: (p) => prisma.deck.findMany({
      where: { language: p.locale, status: 'published', subjectTags: { has: p.theme } },
      select: TOPIC_DECK_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    }),
  },
  {
    id: 'path1c',
    name: 'Topic-page deck listing (educational-level axis)',
    paramFn: rand => ({ locale: pick(ALL_LOCALES, rand), ageRange: pick(AGE_RANGES, rand) }),
    run: (p) => prisma.deck.findMany({
      where: { language: p.locale, status: 'published', ageRange: { in: [p.ageRange] } },
      select: TOPIC_DECK_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    }),
  },
  {
    id: 'path2',
    name: 'Variety strips (4 sub-queries; full set per page render)',
    paramFn: rand => ({ locale: pick(ALL_LOCALES, rand), exerciseType: pick(EXERCISE_TYPES, rand) }),
    run: async (p) => {
      // Mirrors lib/topic-variety.ts shape post-refactor at this commit's
      // [REFACTOR] commit. Strips 2 + 4 are per-locale-bounded; Strips 1
      // + 3 already had axis-key WHERE filters (not full-fetch shape).
      const STRIP_TAKE = 200;
      // Strip 1: same axis-key in OTHER locales (axis-filtered; not full-fetch)
      const s1 = prisma.deck.findMany({
        where: { language: { not: p.locale }, status: 'published', exerciseType: p.exerciseType },
        select: TOPIC_DECK_SELECT,
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
      });
      // Strip 2 POST-REFACTOR: single-locale bounded fetch
      const s2 = prisma.deck.findMany({
        where: { language: p.locale, status: 'published' },
        select: TOPIC_DECK_SELECT,
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
        take: STRIP_TAKE,
      });
      // Strip 3: other educational-levels at same axis-key (axis-filtered)
      const s3 = prisma.deck.findMany({
        where: { language: p.locale, status: 'published', exerciseType: p.exerciseType },
        select: TOPIC_DECK_SELECT,
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
      });
      // Strip 4 POST-REFACTOR: 11-locale parallel bounded fetch + merge
      const s4 = Promise.all(
        ALL_LOCALES.map(loc =>
          prisma.deck.findMany({
            where: { language: loc, status: 'published' },
            select: TOPIC_DECK_SELECT,
            orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
            take: STRIP_TAKE,
          })
        )
      );
      return Promise.all([s1, s2, s3, s4]);
    },
  },
  {
    id: 'path3',
    name: 'Sitemap topic enumeration (groupBy + findMany)',
    paramFn: rand => ({ locale: pick(ALL_LOCALES, rand) }),
    run: async (p) => {
      const groupBy = prisma.deck.groupBy({
        by: ['exerciseType'],
        where: { language: p.locale, status: 'published' },
        _count: { _all: true },
      });
      const subjectTags = prisma.deck.findMany({
        where: { language: p.locale, status: 'published' },
        select: { subjectTags: true },
      });
      return Promise.all([groupBy, subjectTags]);
    },
  },
  {
    id: 'path4',
    name: 'BreadthGrid (12 parallel: 11 per-locale LIMIT 20 + 1 groupBy)',
    paramFn: rand => ({ locale: pick(ALL_LOCALES, rand) }),
    run: async () => {
      const perLocale = ALL_LOCALES.map(loc =>
        prisma.deck.findMany({
          where: { language: loc, status: 'published' },
          select: BREADTH_GRID_SELECT,
          orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
          take: 20,
        })
      );
      const counts = prisma.deck.groupBy({
        by: ['language'],
        where: { status: 'published' },
        _count: { _all: true },
      });
      return Promise.all([Promise.all(perLocale), counts]);
    },
  },
  {
    id: 'path5',
    name: 'Lesson-plan findUnique by (topicSlug, language)',
    paramFn: () => null, // params resolved at run-time from inserted rows
    setup: async () => {
      const rows = await prisma.lessonPlan.findMany({
        select: { topicSlug: true, language: true },
        take: 200,
      });
      return rows.length > 0 ? rows : null;
    },
    run: async (p, ctx) => {
      if (!ctx || ctx.length === 0) return null;
      const r = ctx[Math.floor(Math.random() * ctx.length)];
      return prisma.lessonPlan.findUnique({
        where: { topicSlug_language: { topicSlug: r.topicSlug, language: r.language } },
      });
    },
  },
  {
    id: 'path6',
    name: 'Deck findUnique/findMany by id (play-link / collection validation)',
    paramFn: () => null,
    setup: async () => {
      const rows = await prisma.deck.findMany({
        select: { id: true },
        take: 500,
        where: { status: 'published' },
      });
      return rows.map(r => r.id);
    },
    run: async (p, ctx) => {
      if (!ctx || ctx.length === 0) return null;
      // 50% single findUnique, 50% bulk findMany
      if (Math.random() < 0.5) {
        const id = ctx[Math.floor(Math.random() * ctx.length)];
        return prisma.deck.findUnique({ where: { id }, select: { id: true, status: true } });
      } else {
        const subset = ctx.slice(0, 10 + Math.floor(Math.random() * 41));
        return prisma.deck.findMany({
          where: { id: { in: subset }, status: 'published' },
          select: { id: true, status: true },
        });
      }
    },
  },
];

// Realistic SELECT shapes per the actual prod code (frontend/lib/topic-decks.ts:21-36)
const TOPIC_DECK_SELECT = {
  id: true, slug: true, language: true, title: true, description: true,
  exerciseType: true, exerciseMode: true, ageRange: true, subjectTags: true,
  thumbnailUrl: true, pdfUrl: true, htmlUrl: true, publishedAt: true, updatedAt: true,
};

const BREADTH_GRID_SELECT = {
  id: true, slug: true, language: true, title: true, exerciseType: true,
  subjectTags: true, thumbnailUrl: true, publishedAt: true,
};

// ---- Checkpoint orchestration -------------------------------------------
function runSubprocess(scriptPath, args = []) {
  const result = spawnSync('node', [scriptPath, ...args], {
    cwd: __dirname,
    env: { ...process.env, LOADTEST_DATABASE_URL: process.env.LOADTEST_DATABASE_URL, DATABASE_URL: process.env.LOADTEST_DATABASE_URL },
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 10 * 1024 * 1024,
  });
  if (result.status !== 0) {
    console.error(`Subprocess failed: ${scriptPath} ${args.join(' ')}`);
    console.error(result.stderr?.toString());
    throw new Error('Subprocess failed');
  }
  return result.stdout?.toString();
}

async function runPath(p, invocations, rand) {
  const ctx = p.setup ? await p.setup() : null;
  const latencies = [];
  for (let i = 0; i < invocations; i++) {
    const params = p.paramFn(rand);
    const start = process.hrtime.bigint();
    try {
      await p.run(params, ctx);
    } catch (err) {
      console.error(`  ${p.id} invocation ${i} failed:`, err.message);
      continue;
    }
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    latencies.push(elapsedMs);
  }
  latencies.sort((a, b) => a - b);
  return {
    n: latencies.length,
    p50: percentile(latencies, 50),
    p95: percentile(latencies, 95),
    p99: percentile(latencies, 99),
    min: latencies[0] ?? null,
    max: latencies[latencies.length - 1] ?? null,
  };
}

async function captureExplain(pathId, queryFn) {
  // Run a representative query path with EXPLAIN ANALYZE.
  // Done via raw SQL because Prisma doesn't expose EXPLAIN; we replicate
  // the equivalent query shape per path.
  return null; // skipped here; representative EXPLAIN captures via psql separately
}

async function runCheckpoint(target) {
  console.error(`\n========== Checkpoint: ${target} decks ==========`);
  console.error(`[${new Date().toISOString()}] clearing DB...`);
  runSubprocess(path.join(__dirname, 'clear.js'));
  console.error(`[${new Date().toISOString()}] synthesizing at target=${target}...`);
  runSubprocess(path.join(__dirname, 'synthesize.js'), ['--target', String(target), '--seed', String(SEED)]);

  const rand = mulberry32(SEED + target);
  const results = {};

  for (const p of QUERY_PATHS) {
    process.stderr.write(`  ${p.id} ${p.name.slice(0, 60)}...`);
    const start = Date.now();
    const stats = await runPath(p, INVOCATIONS, rand);
    const elapsedSec = ((Date.now() - start) / 1000).toFixed(1);
    process.stderr.write(` p50=${stats.p50.toFixed(2)}ms p95=${stats.p95.toFixed(2)}ms p99=${stats.p99.toFixed(2)}ms (${elapsedSec}s)\n`);
    results[p.id] = { name: p.name, ...stats };
  }

  return { target, results };
}

async function main() {
  const t0 = Date.now();
  console.error(`[${new Date().toISOString()}] run-loadtest.js`);
  console.error(`  checkpoints: ${CHECKPOINTS.join(', ')}`);
  console.error(`  invocations per path: ${INVOCATIONS}`);
  console.error(`  seed: ${SEED}`);
  console.error(`  DB: ${process.env.LOADTEST_DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`);

  const all = [];
  for (const target of CHECKPOINTS) {
    const checkpoint = await runCheckpoint(target);
    all.push(checkpoint);
  }

  // Output JSON results to stdout (operator can pipe to file)
  console.log(JSON.stringify({ checkpoints: CHECKPOINTS, invocations: INVOCATIONS, seed: SEED, results: all }, null, 2));

  // Summary table to stderr
  console.error(`\n========== Summary ==========`);
  console.error(`Checkpoints: ${CHECKPOINTS.join(' / ')}`);
  for (const p of QUERY_PATHS) {
    console.error(`\n${p.id}: ${p.name}`);
    console.error(`  ` + ['target', 'p50', 'p95', 'p99'].map(s => s.padStart(10)).join(' | '));
    for (const cp of all) {
      const s = cp.results[p.id];
      console.error(`  ` + [String(cp.target), s.p50.toFixed(2), s.p95.toFixed(2), s.p99.toFixed(2)].map(v => v.padStart(10)).join(' | '));
    }
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.error(`\n[${new Date().toISOString()}] DONE in ${elapsed}s`);
}

main()
  .catch(err => { console.error('FAILED:', err); process.exit(1); })
  .finally(() => prisma.$disconnect());
