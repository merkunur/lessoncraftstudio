/**
 * seed-topics.js — Pillar 1 Phase 1a substrate.
 *
 * SCHEMA-INTENT-B RESOLUTION (recorded 2026-05-03 at recon halt):
 * Recon flag 4 surfaced a structural mismatch between Topic.slug @id
 * (slug-alone unique) and topics-taxonomy.json's per-locale slug shape (6
 * cross-locale collisions: addition/bingo/code-addition/cryptogram/fruit/
 * kindergarten). Three options surfaced; operator selected Option A:
 *
 * - **A (selected):** Adapt seed to schema's evident intent — locale-agnostic
 *   English-canonical slug = axis-key (e.g., 'sudoku', 'animals',
 *   'kindergarten'); title is full per-locale Json map. 39 Topic rows. NO
 *   schema migration. Aligns with LessonPlan.@@unique([topicSlug, language])
 *   designed semantics (locale-agnostic topicSlug + language differentiates).
 * - B (rejected): schema migration to support intent A (per-locale slugs);
 *   composite PK or cuid id + @@unique([slug, language]); 153 rows; ripple
 *   into LessonPlan FK relation.
 * - C (rejected): drop Topic seed entirely + remove FK relation; loses
 *   substrate for future Mac Studio embedding work.
 *
 * Topic-page consumer responsibility: per-locale slug rendering (e.g.,
 * /nl/topic/foto-sudoku/) maps the URL slug back to the axis-key via
 * topics-taxonomy.json axes.<axis>.<axisKey>.slug.<locale> reverse lookup.
 * The Topic.slug column is the LessonPlan FK target; locale rendering is
 * URL-layer concern.
 *
 * Seeds the `topics` table from `frontend/config/topics-taxonomy.json`.
 * Topic rows are FK target for LessonPlan.topicSlug; this seed must run
 * before any lesson-plan author commits.
 *
 * Schema-intent: per recon-halt operator decision (Option A), Topic.slug is
 * locale-agnostic English-canonical (the axis-KEY itself, e.g., 'addition' /
 * 'sudoku' / 'kindergarten' / 'animals'). Topic.title is the FULL per-locale
 * Json map {en: ..., de: ..., es: ..., nl: ...} from topics-taxonomy.json's
 * name.<locale> values. Topic.language is set to "en" as the canonical primary
 * locale (the slug is the EN slug; description authoring downstream is
 * locale-agnostic per design intent B).
 *
 * Per-locale slug rendering at topic-page consumer time uses the
 * topics-taxonomy.json axes.<axis>.<axisKey>.slug.<locale> map, NOT the
 * Topic.slug column directly. The Topic.slug column is the LessonPlan FK
 * target; locale-rendering happens at the URL/UI layer.
 *
 * Per Topic schema (frontend/prisma/schema.prisma:1212):
 * - slug @id (locale-agnostic English-canonical axis-key)
 * - language String ("en" canonical primary)
 * - title Json (full per-locale map from name.<locale>)
 * - description Json (full per-locale map, empty strings at seed)
 * - subject String (apps.<key>.default_subject for exercise-type; "" else)
 * - ageRange String (apps.<key>.default_age_range for exercise-type;
 *   per-key static map for educational-level; "" for theme)
 * - curriculumTags String[] (default [])
 * - parentSlug String? (null at seed)
 * - isHighPriority Boolean (false at seed)
 * - embedding Bytes? (null at seed; Mac Studio §4.5 deferred)
 *
 * Row count: 38 total (29 exercise-type + 4 theme + 5 educational-level)
 * vs the 153 (axis,key,locale) triples in topics-taxonomy.json.
 *
 * Usage:
 *   node frontend/scripts/seed-topics.js              # dry-run (show planned INSERTs)
 *   node frontend/scripts/seed-topics.js --confirm   # real-mode (INSERT)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const TAXONOMY_PATH = path.join(__dirname, '..', 'config', 'topics-taxonomy.json');

// Educational-level age-range mapping per CLAUDE.md §17.8.6
const EDUCATIONAL_LEVEL_AGE_RANGE = {
  preschool: '3-5',
  kindergarten: '5-7',
  'grade-1': '6-8',
  'grade-2': '7-9',
  'grade-3': '8-10',
};

function buildTopicRows(taxonomy) {
  const rows = [];
  const apps = taxonomy.apps || {};
  const axes = taxonomy.axes || {};

  for (const [axisName, axisKeys] of Object.entries(axes)) {
    for (const [axisKey, entry] of Object.entries(axisKeys)) {
      const names = entry.name || {};

      // Schema intent B: locale-agnostic English-canonical slug = axis-key.
      // One Topic row per axis-key (not per (axis-key, locale) triple).
      // title carries full per-locale name map; description is empty per-locale
      // map at seed (operator-authored content downstream).

      let subject = '';
      let ageRange = '';

      if (axisName === 'exercise-type') {
        const app = apps[axisKey];
        if (app) {
          subject = app.default_subject || '';
          ageRange = app.default_age_range || '';
        }
      } else if (axisName === 'educational-level') {
        ageRange = EDUCATIONAL_LEVEL_AGE_RANGE[axisKey] || '';
      }

      // Build full per-locale title map; empty description map.
      const titleMap = {};
      const descriptionMap = {};
      for (const [locale, name] of Object.entries(names)) {
        if (name) {
          titleMap[locale] = name;
          descriptionMap[locale] = '';
        }
      }

      rows.push({
        slug: axisKey,                  // English-canonical axis-key
        title: titleMap,                // {en: ..., de: ..., es: ..., nl: ...}
        description: descriptionMap,    // empty map; operator authors later
        subject,
        ageRange,
        language: 'en',                 // canonical primary; intent B
        curriculumTags: [],
        parentSlug: null,
        isHighPriority: false,
        // axis info is captured here for human-readable dry-run output;
        // schema has no axis column, so we drop it before INSERT.
        _axis: axisName,
        _axisKey: axisKey,
      });
    }
  }

  return rows;
}

async function main() {
  const realMode = process.argv.includes('--confirm');
  const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf-8'));
  const rows = buildTopicRows(taxonomy);

  // Group by axis for human-readable output
  const byAxis = {};
  for (const row of rows) {
    byAxis[row._axis] = (byAxis[row._axis] || []);
    byAxis[row._axis].push(row);
  }

  console.log(`=== Topic seed plan (${realMode ? 'REAL-MODE' : 'DRY-RUN'}) ===`);
  console.log(`Source: ${TAXONOMY_PATH}`);
  console.log(`Total Topic rows to seed: ${rows.length}`);
  for (const [axis, axisRows] of Object.entries(byAxis)) {
    console.log(`  ${axis}: ${axisRows.length} rows`);
    if (!realMode) {
      // Dry-run: surface a sample row per axis for review
      const sample = axisRows[0];
      console.log(`    sample: slug=${sample.slug}, lang=${sample.language}, subject=${sample.subject || '(empty)'}, ageRange=${sample.ageRange || '(empty)'}, title=${JSON.stringify(sample.title)}`);
    }
  }

  if (!realMode) {
    console.log('');
    console.log('Run again with --confirm to INSERT. Dry-run only; no DB writes.');
    return;
  }

  // Real-mode: INSERT
  const prisma = new PrismaClient();
  try {
    const existing = await prisma.topic.count();
    if (existing > 0) {
      console.error(`ABORT: topics table already has ${existing} rows. Seed expects empty table.`);
      console.error('Either truncate (operator-strategic) or skip seed (already seeded).');
      process.exit(1);
    }

    let inserted = 0;
    for (const row of rows) {
      const { _axis, _axisKey, ...data } = row;
      await prisma.topic.create({ data });
      inserted++;
    }

    console.log('');
    console.log(`OK — inserted ${inserted} Topic rows.`);

    // Post-insert verification
    const finalCount = await prisma.topic.count();
    const byLanguage = await prisma.topic.groupBy({
      by: ['language'],
      _count: { language: true },
    });
    console.log(`Final count: ${finalCount}`);
    console.log('By language:');
    for (const g of byLanguage) {
      console.log(`  ${g.language}: ${g._count.language}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
