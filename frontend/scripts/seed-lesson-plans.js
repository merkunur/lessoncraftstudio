/**
 * seed-lesson-plans.js — Pillar 1 Phase 1b authoring pipeline.
 *
 * Reads markdown drafts from `lesson-plan-drafts/{locale}/{topicSlug}.md`
 * (operator-authored content; not in repo at Phase 1b — directory shipped
 * as substrate only). Parses YAML frontmatter + four CLIL section bodies
 * (Warmup / Content-language activity / Language scaffold / Closure).
 * Validates topicSlug against the 39 Topic.slug rows seeded at `1114dedb`.
 * INSERTs LessonPlan rows.
 *
 * Markdown shape:
 *
 *   ---
 *   topicSlug: addition           # English-canonical axis-key (matches Topic.slug)
 *   language: en                  # one of {en, de, es, nl}
 *   title: "Addition for kindergarten"
 *   durationMinutes:
 *     warmup: 5
 *     contentActivity: 15
 *     scaffold: 5
 *     closure: 5
 *   recommendedDeckIds: []        # optional; defaults to []
 *   recommendedPdfDeckIds: []     # optional; defaults to []
 *   ---
 *
 *   ## Warmup
 *
 *   [markdown body for warmup]
 *
 *   ## Content-language activity
 *
 *   [markdown body for content activity]
 *
 *   ## Language scaffold and practice
 *
 *   [markdown body for scaffold]
 *
 *   ## Closure
 *
 *   [markdown body for closure]
 *
 * @@unique([topicSlug, language]) collision behavior: ERROR in both dry-run
 * and real-mode. Operator must explicitly delete + re-insert if overwriting.
 *
 * Usage:
 *   node frontend/scripts/seed-lesson-plans.js                # dry-run
 *   node frontend/scripts/seed-lesson-plans.js --confirm     # real-mode INSERT
 *   node frontend/scripts/seed-lesson-plans.js --file path/to/plan.md   # single file
 *   node frontend/scripts/seed-lesson-plans.js --dir lesson-plan-drafts # all under dir (default)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const REPO_ROOT = path.join(__dirname, '..', '..');
const DEFAULT_DIR = path.join(REPO_ROOT, 'lesson-plan-drafts');
const VALID_LOCALES = new Set(['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi']);
const REQUIRED_SECTIONS = ['warmup', 'contentActivity', 'scaffold', 'closure'];

// CLIL section heading patterns (case-insensitive). Maps H2 heading text to
// the structure key. Per-locale heading match keeps the markdown human-readable
// in any of the eleven target locales while normalizing to a canonical structure.
// Compound CLIL-jargon forms (e.g. "Content-Language Activity" / "Activité
// contenu-langue") match alongside simpler natural-language equivalents
// (e.g. "Activity" / "Activité") via optional non-capturing groups; this
// preserves parser tolerance across operator-NSR-refined draft variants
// without requiring re-parse on phrase choice.
// Note: end-of-pattern uses (?=\s|$) lookahead instead of \b because JS's \b
// is ASCII-only — it does not treat é, à, å, ö, ü, etc. as word characters
// regardless of regex flags, so /activit[ée]\b/.test("Activité") is false in
// pure JavaScript. The whitespace-or-end-of-string lookahead is locale-agnostic
// and matches the natural heading-as-isolated-text shape.
const SECTION_HEADING_PATTERNS = {
  warmup: /^(warmup|aufw[äa]rmung|calentamiento|opwarming|mise en train|riscaldamento|aquecimento|uppv[äa]rmning|opvarmning|alkul[äa]mmittely|oppvarming)(?=\s|$)/i,
  contentActivity: /^(content[\s-]?language activity|inhalt[\s-]?sprache|actividad de contenido|inhoud[\s-]?taal|activit[ée](?:[\s-]?contenu[\s-]?langue)?|attivit[àa](?:[\s-]?contenuto[\s-]?lingua)?|atividade(?:[\s-]?conte[úu]do[\s-]?l[ií]ngua)?|inneh[åa]ll(?:[\s-]?spr[åa]k)?|indhold(?:[\s-]?sprog)?|sis[äa]lt[öo](?:[\s-]?kieli)?|innhold(?:[\s-]?spr[åa]k)?)(?=\s|$)/i,
  scaffold: /^(language scaffold|sprachger[üu]st|andamiaje|taalsteun|[ée]tayage(?:[\s-]?langue)?|impalcatura(?:[\s-]?linguistica)?|andaime(?:[\s-]?lingu[ií]stico)?|spr[åa]kst[öo]d|sprogstilladsering|kieli[\s-]?tuki|spr[åa]kstillas)(?=\s|$)/i,
  closure: /^(closure|abschluss|cierre|afsluiting|cl[ôo]ture|chiusura|encerramento|avslutning|afslutning|p[äa][äa]t[öo]s)(?=\s|$)/i,
};

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) {
    throw new Error('Missing or malformed YAML frontmatter (expected `---\\n...\\n---`).');
  }
  const yaml = m[1];
  const body = m[2];
  const meta = {};

  // Simple YAML parse: top-level scalars + nested 1-level objects.
  // Constrained shape per the documented frontmatter contract.
  let currentKey = null;
  let currentNested = null;
  for (const line of yaml.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const topMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    const nestedMatch = line.match(/^\s+([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (topMatch) {
      const [, key, val] = topMatch;
      if (val === '') {
        currentKey = key;
        currentNested = {};
        meta[key] = currentNested;
      } else {
        currentKey = null;
        currentNested = null;
        meta[key] = parseScalar(val);
      }
    } else if (nestedMatch && currentNested) {
      const [, key, val] = nestedMatch;
      currentNested[key] = parseScalar(val);
    }
  }

  return { meta, body };
}

function parseScalar(raw) {
  const v = raw.trim();
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null' || v === '') return null;
  if (/^-?\d+$/.test(v)) return parseInt(v, 10);
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    if (inner === '') return [];
    return inner.split(',').map(s => parseScalar(s.trim()));
  }
  // Strip surrounding quotes
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  return v;
}

function parseSections(body) {
  const sections = {};
  const lines = body.split('\n');
  let currentKey = null;
  let buffer = [];

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      if (currentKey) sections[currentKey] = buffer.join('\n').trim();
      currentKey = null;
      buffer = [];
      const headingText = headingMatch[1].trim();
      for (const [key, pattern] of Object.entries(SECTION_HEADING_PATTERNS)) {
        if (pattern.test(headingText)) {
          currentKey = key;
          break;
        }
      }
    } else if (currentKey) {
      buffer.push(line);
    }
  }
  if (currentKey) sections[currentKey] = buffer.join('\n').trim();
  return sections;
}

function buildLessonPlanRow(filePath, raw, validTopicSlugs) {
  const { meta, body } = parseFrontmatter(raw);

  if (!meta.topicSlug) throw new Error('Missing frontmatter `topicSlug`.');
  if (!meta.language) throw new Error('Missing frontmatter `language`.');
  if (!VALID_LOCALES.has(meta.language)) {
    throw new Error(`Invalid locale "${meta.language}" — must be one of {en,de,es,nl}.`);
  }
  if (!validTopicSlugs.has(meta.topicSlug)) {
    throw new Error(
      `Unknown topicSlug "${meta.topicSlug}" — must match a Topic.slug row (English-canonical axis-key).`
    );
  }

  const sections = parseSections(body);
  for (const required of REQUIRED_SECTIONS) {
    if (!sections[required]) {
      throw new Error(
        `Missing required CLIL section "${required}" — heading must match one of: ${SECTION_HEADING_PATTERNS[required].source}`
      );
    }
  }

  const durationMinutes = meta.durationMinutes || {};
  const totalDuration =
    (durationMinutes.warmup || 0) +
    (durationMinutes.contentActivity || 0) +
    (durationMinutes.scaffold || 0) +
    (durationMinutes.closure || 0);

  if (totalDuration === 0) {
    throw new Error(
      'Missing or zero `durationMinutes` — at least one section must declare a duration.'
    );
  }

  const structure = {
    title: meta.title || meta.topicSlug,
    warmup: {
      durationMinutes: durationMinutes.warmup || 0,
      body: sections.warmup,
    },
    contentActivity: {
      durationMinutes: durationMinutes.contentActivity || 0,
      body: sections.contentActivity,
    },
    scaffold: {
      durationMinutes: durationMinutes.scaffold || 0,
      body: sections.scaffold,
    },
    closure: {
      durationMinutes: durationMinutes.closure || 0,
      body: sections.closure,
    },
  };

  return {
    topicSlug: meta.topicSlug,
    language: meta.language,
    durationMinutes: totalDuration,
    structure,
    // Prisma 6.x requires { set: [...] } wrap for String[] columns on create()
    // (was a plain array under Prisma 5.x; semantic changed at the major-version bump).
    recommendedDeckIds: { set: meta.recommendedDeckIds || [] },
    recommendedPdfDeckIds: { set: meta.recommendedPdfDeckIds || [] },
    generatedBy: 'manual',
    generationVersion: 1,
    _filePath: filePath,
  };
}

function gatherFiles(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  const out = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir)) {
      const p = path.join(dir, entry);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (p.endsWith('.md')) out.push(p);
    }
  }
  walk(target);
  return out;
}

function parseArgs(argv) {
  const args = { confirm: false, file: null, dir: DEFAULT_DIR };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--confirm') args.confirm = true;
    else if (argv[i] === '--file') args.file = argv[++i];
    else if (argv[i] === '--dir') args.dir = argv[++i];
  }
  return args;
}

function runSelfTest() {
  // Locks parseScalar behavior so the array-literal regression that surfaced
  // at Phase 1c apply (real-mode INSERT failed; dry-run silently passed because
  // dry-run output didn't include the offending field) cannot re-emerge silently.
  let pass = 0;
  function check(actual, expected, label) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a !== e) {
      console.error(`FAIL: ${label} — expected ${e}, got ${a}`);
      process.exit(1);
    }
    pass++;
  }
  check(parseScalar('[]'), [], 'empty array');
  check(parseScalar('["a"]'), ['a'], 'single element');
  check(parseScalar('["a", "b"]'), ['a', 'b'], 'multi-element');
  check(parseScalar('["cmojv4qew0000gxwofgmuudas"]'), ['cmojv4qew0000gxwofgmuudas'], 'cuid array');
  check(parseScalar('"hello"'), 'hello', 'quoted string regression');
  check(parseScalar('42'), 42, 'integer regression');
  check(parseScalar('true'), true, 'boolean regression');
  console.log(`parseScalar self-test: PASS (${pass}/${pass})`);
}

async function main() {
  if (process.argv.includes('--self-test')) {
    runSelfTest();
    return;
  }
  const args = parseArgs(process.argv);
  const target = args.file || args.dir;

  if (!fs.existsSync(target)) {
    if (target === DEFAULT_DIR) {
      console.log(`No drafts directory at ${DEFAULT_DIR}.`);
      console.log('At Phase 1b shipping the pipeline; first plans arrive at Phase 1c.');
      console.log('To author a plan, create lesson-plan-drafts/{locale}/{topicSlug}.md and re-run.');
      return;
    }
    throw new Error(`Path not found: ${target}`);
  }

  const files = gatherFiles(target);
  if (files.length === 0) {
    console.log(`No .md files found under ${target}.`);
    return;
  }

  console.log(`=== Lesson-plan seed plan (${args.confirm ? 'REAL-MODE' : 'DRY-RUN'}) ===`);
  console.log(`Source: ${target}`);
  console.log(`Files: ${files.length}`);

  const prisma = new PrismaClient();
  try {
    // Fetch valid Topic slugs once for whitelist validation.
    const topics = await prisma.topic.findMany({ select: { slug: true } });
    const validTopicSlugs = new Set(topics.map(t => t.slug));
    if (validTopicSlugs.size === 0) {
      throw new Error(
        'Topic table is empty. Run `node scripts/seed-topics.js --confirm` first (Phase 1a substrate).'
      );
    }

    const rows = [];
    const errors = [];
    for (const f of files) {
      try {
        const raw = fs.readFileSync(f, 'utf-8');
        rows.push(buildLessonPlanRow(f, raw, validTopicSlugs));
      } catch (e) {
        errors.push({ file: f, error: e.message });
      }
    }

    if (errors.length) {
      console.log('');
      console.log(`PARSE ERRORS (${errors.length}):`);
      for (const { file, error } of errors) {
        console.log(`  - ${path.relative(REPO_ROOT, file)}: ${error}`);
      }
      console.log('');
      console.log('ABORT: parse errors must be fixed before any rows can be processed.');
      process.exit(1);
    }

    // Pre-flight collision check (dry-run + real-mode both error on collision)
    const existing = await prisma.lessonPlan.findMany({
      where: {
        OR: rows.map(r => ({
          topicSlug: r.topicSlug,
          language: r.language,
        })),
      },
      select: { topicSlug: true, language: true },
    });
    const existingSet = new Set(existing.map(r => `${r.topicSlug}::${r.language}`));
    const collisions = rows.filter(r => existingSet.has(`${r.topicSlug}::${r.language}`));
    if (collisions.length) {
      console.log('');
      console.log(`COLLISIONS (@@unique([topicSlug, language])): ${collisions.length}`);
      for (const c of collisions) {
        console.log(`  - ${path.relative(REPO_ROOT, c._filePath)}: (${c.topicSlug}, ${c.language}) already exists.`);
      }
      console.log('');
      console.log('ABORT: collision behavior is error-only at Phase 1b. Delete + re-insert manually if overwrite is intended.');
      process.exit(1);
    }

    console.log('');
    console.log('Plans to insert:');
    for (const row of rows) {
      console.log(
        `  ${row.topicSlug}/${row.language} — title="${row.structure.title}" — ${row.durationMinutes}min`
      );
    }

    if (!args.confirm) {
      console.log('');
      console.log('Run again with --confirm to INSERT. Dry-run only; no DB writes.');
      return;
    }

    let inserted = 0;
    for (const row of rows) {
      const { _filePath, ...data } = row;
      await prisma.lessonPlan.create({ data });
      inserted++;
    }

    console.log('');
    console.log(`OK — inserted ${inserted} LessonPlan rows.`);

    const finalCount = await prisma.lessonPlan.count();
    const byLanguage = await prisma.lessonPlan.groupBy({
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

main().catch(e => {
  console.error(e);
  process.exit(1);
});
