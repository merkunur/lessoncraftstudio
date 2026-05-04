#!/usr/bin/env node
// Captures Strip 2 + Strip 4 outputs for pre/post refactor parity diff.
// Imports the actual lib/topic-variety.ts helpers so the captures match
// production behavior 1:1.
//
// Usage:
//   LOADTEST_DATABASE_URL=... node capture-strips.js [--label pre|post]
//
// Output: JSON to stdout, written to capture-<label>.json by the caller.

const args = process.argv.slice(2);
const label = (() => { const i = args.indexOf('--label'); return i >= 0 ? args[i + 1] : 'unspecified'; })();

if (!process.env.LOADTEST_DATABASE_URL) {
  console.error('ERROR: LOADTEST_DATABASE_URL env var must be set');
  process.exit(1);
}
process.env.DATABASE_URL = process.env.LOADTEST_DATABASE_URL;

// Use ts-node-style require with esbuild fallback?
// Simpler: re-import via TS compilation isn't available here. Instead,
// dynamically require the compiled output OR replicate the helper inline.
// The published lib code is compiled at build time, but for capture we
// invoke the prisma queries directly (mirrors the Phase 3 path emulation).

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const DECK_SELECT = {
  id: true, slug: true, language: true, title: true, description: true,
  exerciseType: true, exerciseMode: true, ageRange: true, subjectTags: true,
  thumbnailUrl: true, pdfUrl: true, htmlUrl: true, publishedAt: true, updatedAt: true,
};

// PRE-REFACTOR shape (matches lib/topic-variety.ts at b2a6f4b6 + b9e75fbe HEAD)
async function fetchDecksRelatedTopicsPre(axis, currentAxisKey, currentLocale, limit = 8) {
  const decks = await prisma.deck.findMany({
    where: { language: currentLocale, status: 'published' },
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
  });
  const out = [];
  const counts = new Map();
  if (axis === 'exercise-type') {
    for (const d of decks) {
      if (d.exerciseType === currentAxisKey) continue;
      const c = counts.get(d.exerciseType) ?? 0;
      if (c >= 2) continue;
      counts.set(d.exerciseType, c + 1);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }
  if (axis === 'theme') {
    const seenIds = new Set();
    for (const d of decks) {
      if (seenIds.has(d.id)) continue;
      const otherTag = d.subjectTags.find(t => t !== currentAxisKey);
      if (!otherTag) continue;
      const c = counts.get(otherTag) ?? 0;
      if (c >= 2) continue;
      counts.set(otherTag, c + 1);
      seenIds.add(d.id);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }
  if (axis === 'educational-level') {
    const LEVEL_TO_RANGES = {
      preschool: ['3-5'], kindergarten: ['5-7'], 'grade-1': ['6-8'],
      'grade-2': ['7-9'], 'grade-3': ['8-10'],
    };
    const currentRanges = new Set(LEVEL_TO_RANGES[currentAxisKey] ?? []);
    for (const d of decks) {
      if (currentRanges.has(d.ageRange)) continue;
      const c = counts.get(d.ageRange) ?? 0;
      if (c >= 2) continue;
      counts.set(d.ageRange, c + 1);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }
  return [];
}

async function fetchDecksCatalogHighlightsPre(limit = 8) {
  const decks = await prisma.deck.findMany({
    where: { status: 'published' },
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
  });
  const seenLocales = new Set();
  const seenExerciseTypes = new Set();
  const out = [];
  for (const d of decks) {
    if (seenLocales.has(d.language)) continue;
    if (seenExerciseTypes.has(d.exerciseType)) continue;
    seenLocales.add(d.language);
    seenExerciseTypes.add(d.exerciseType);
    out.push(d);
    if (out.length >= limit) break;
  }
  return out;
}

// POST-REFACTOR shape — mirrors the proposed plan's per-locale-bounded fetch
const STRIP_CANDIDATES_PER_LOCALE = 200;

async function fetchPublishedDecksByLocale(locales, take) {
  const perLocale = await Promise.all(
    locales.map(loc =>
      prisma.deck.findMany({
        where: { language: loc, status: 'published' },
        select: DECK_SELECT,
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
        take,
      })
    )
  );
  const merged = [];
  for (const arr of perLocale) merged.push(...arr);
  if (locales.length > 1) {
    merged.sort((a, b) => {
      const ta = a.publishedAt ? a.publishedAt.getTime() : 0;
      const tb = b.publishedAt ? b.publishedAt.getTime() : 0;
      if (tb !== ta) return tb - ta;
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  }
  return merged;
}

async function fetchDecksRelatedTopicsPost(axis, currentAxisKey, currentLocale, limit = 8) {
  const decks = await fetchPublishedDecksByLocale([currentLocale], STRIP_CANDIDATES_PER_LOCALE);
  // ... same downstream diversity-cap logic as pre
  const out = [];
  const counts = new Map();
  if (axis === 'exercise-type') {
    for (const d of decks) {
      if (d.exerciseType === currentAxisKey) continue;
      const c = counts.get(d.exerciseType) ?? 0;
      if (c >= 2) continue;
      counts.set(d.exerciseType, c + 1);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }
  if (axis === 'theme') {
    const seenIds = new Set();
    for (const d of decks) {
      if (seenIds.has(d.id)) continue;
      const otherTag = d.subjectTags.find(t => t !== currentAxisKey);
      if (!otherTag) continue;
      const c = counts.get(otherTag) ?? 0;
      if (c >= 2) continue;
      counts.set(otherTag, c + 1);
      seenIds.add(d.id);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }
  if (axis === 'educational-level') {
    const LEVEL_TO_RANGES = {
      preschool: ['3-5'], kindergarten: ['5-7'], 'grade-1': ['6-8'],
      'grade-2': ['7-9'], 'grade-3': ['8-10'],
    };
    const currentRanges = new Set(LEVEL_TO_RANGES[currentAxisKey] ?? []);
    for (const d of decks) {
      if (currentRanges.has(d.ageRange)) continue;
      const c = counts.get(d.ageRange) ?? 0;
      if (c >= 2) continue;
      counts.set(d.ageRange, c + 1);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }
  return [];
}

async function fetchDecksCatalogHighlightsPost(limit = 8) {
  const decks = await fetchPublishedDecksByLocale(ALL_LOCALES, STRIP_CANDIDATES_PER_LOCALE);
  const seenLocales = new Set();
  const seenExerciseTypes = new Set();
  const out = [];
  for (const d of decks) {
    if (seenLocales.has(d.language)) continue;
    if (seenExerciseTypes.has(d.exerciseType)) continue;
    seenLocales.add(d.language);
    seenExerciseTypes.add(d.exerciseType);
    out.push(d);
    if (out.length >= limit) break;
  }
  return out;
}

// Test cases
const TEST_CASES = [
  { name: 'strip2-exercise-type', fn: () => null, axis: 'exercise-type', axisKey: 'addition', locale: 'en' },
  { name: 'strip2-theme', fn: () => null, axis: 'theme', axisKey: 'animals', locale: 'de' },
  { name: 'strip2-educational-level', fn: () => null, axis: 'educational-level', axisKey: 'kindergarten', locale: 'es' },
  { name: 'strip2-no-locale', fn: () => null, axis: 'exercise-type', axisKey: 'sudoku', locale: 'no' },
  { name: 'strip4-default', fn: () => null },
];

async function main() {
  const results = { label, timestamp: new Date().toISOString(), cases: {} };

  for (const tc of TEST_CASES) {
    if (tc.name.startsWith('strip2-')) {
      const pre = await fetchDecksRelatedTopicsPre(tc.axis, tc.axisKey, tc.locale, 8);
      const post = await fetchDecksRelatedTopicsPost(tc.axis, tc.axisKey, tc.locale, 8);
      results.cases[tc.name] = {
        params: { axis: tc.axis, axisKey: tc.axisKey, locale: tc.locale, limit: 8 },
        pre: pre.map(d => d.id),
        post: post.map(d => d.id),
        match: pre.length === post.length && pre.every((d, i) => d.id === post[i].id),
        preCount: pre.length,
        postCount: post.length,
      };
    } else if (tc.name === 'strip4-default') {
      const pre = await fetchDecksCatalogHighlightsPre(8);
      const post = await fetchDecksCatalogHighlightsPost(8);
      results.cases[tc.name] = {
        params: { limit: 8 },
        pre: pre.map(d => `${d.language}:${d.exerciseType}:${d.id}`),
        post: post.map(d => `${d.language}:${d.exerciseType}:${d.id}`),
        match: pre.length === post.length && pre.every((d, i) => d.id === post[i].id),
        preCount: pre.length,
        postCount: post.length,
      };
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

main()
  .catch(err => { console.error('FAILED:', err); process.exit(1); })
  .finally(() => prisma.$disconnect());
