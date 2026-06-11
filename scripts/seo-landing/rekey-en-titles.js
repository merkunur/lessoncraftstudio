#!/usr/bin/env node
/**
 * rekey-en-titles.js — re-keyword the SERP title-tag + meta description of
 * English (en) SEO landing pages, per the LOCKED grade-led keyword pattern.
 *
 * Cloned from rekey-es-titles.js. Architecture is preserved EXACTLY: two-pass
 * structure (pass 1 resolve op/grade/qual/theme + identity; ordinal
 * disambiguation for identity collisions; pass 2 build + mutate), op-as-function
 * support, the length-fallback ladder in buildTitle, the themeDisplay "-vs-"
 * split + null guard, the --type=/--all/--dry-run CLI.
 *
 * DATA-ONLY. Rewrites ONLY the `title` and `metaDescription` fields of
 * frontend/content/seo-landing/en.json. It does NOT touch h1, p1/p2/p3,
 * coordinate, standard, slug, carousel, eyebrow, slotTokens, strand,
 * canonicalDeckSlug, variantShape, or any other field.
 *
 * The Next route renders <title> as `l.title || l.h1` and meta as
 * `l.metaDescription || (first sentence of p1)`. So writing `title` sets the
 * SERP title-tag; `h1` (the on-page heading) MUST stay untouched (theme-warm).
 *
 * LOCKED TITLE PATTERN:
 *   [op] for [Grade] [qualifier] – [Theme] | Free Printable PDF
 *   - op already ends in "Worksheets"/activity name
 *   - en-dash " – " before theme, " | " before format suffix
 *   - suffix ladder: " | Free Printable PDF" → " | Printable PDF" → " | PDF" → ""
 *   - length-aware (cap ~65 chars). NEVER drop the qualifier (the per-mode
 *     distinguisher) — only the suffix shrinks; accept slight overflow.
 *     Never drop theme or grade.
 *
 * CLI:
 *   --type=<type>  re-key only that coordinate type
 *   --all          re-key every coordinate
 *   --dry-run      print samples, write nothing
 *   (no flag = error)
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const EN_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'en.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const TITLE_CAP = 65;
const META_CAP = 170;

// --- grade label from coordinate.level -------------------------------------
const GRADE_LABEL = {
  'preschool': 'Preschool',
  'kindergarten': 'Kindergarten',
  'grade-1': 'Grade 1',
  'grade-2': 'Grade 2',
};

// --- per-type op + qualifier resolver --------------------------------------
// qualifier is lowercase (a descriptor, not title-case). '' = none.
// Each entry: { op, qual(coord, standard) } — op may be a function for multi-mode types.
const TYPE_MAP = {
  'addition':          { op: 'Addition Worksheets',      qual: (c) => ({ 'find-addend': 'missing number', 'image-image': 'with pictures', 'image-number': 'pictures & numbers', 'mixed': 'without regrouping' }[c.mode] || '') },
  'subtraction':       { op: 'Subtraction Worksheets',   qual: (c) => ({ 'find-subtrahend': 'missing number', 'cross-out': 'cross out and count', 'image-number': 'pictures & numbers', 'mixed': 'without borrowing' }[c.mode] || '') },
  'math-puzzle':       { op: 'Math Puzzles',             qual: (c) => (c.level === 'grade-2' ? 'within 100' : 'within 20') },
  'math-worksheet':    { op: 'Math Worksheets',          qual: () => '' },
  'code-addition':     { op: 'Code Addition Puzzles',    qual: (c) => (c.mode === 'secret-word' ? 'secret word' : '') },
  'chart-count':       { op: 'Picture Graph Worksheets', qual: () => '' },
  'word-scramble':     { op: 'Word Scramble',            qual: () => '' },
  'wordsearch':        { op: 'Word Search',              qual: () => '' },
  'word-guess':        { op: 'Spelling Worksheets',      qual: () => '' },
  'crossword':         { op: 'Picture Crossword',        qual: () => '' },
  'matching':          { op: (c) => (c.mode === 'name' ? 'Picture Word Match' : 'Beginning Letter Match'), qual: () => '' },
  'find-and-count':    { op: 'Find and Count',           qual: () => '' },
  'prepositions':      { op: (c) => (c.mode === 'fillin' ? 'Preposition Worksheets' : 'Position Words'), qual: () => '' },
  'pattern-train':     { op: (c) => ({ 'aab': 'AAB Patterns', 'abb': 'ABB Patterns', 'aabb': 'AABB Patterns', 'abc': 'ABC Patterns' }[c.mode] || 'AB Patterns'), qual: () => '' },
  'pattern-worksheet': { op: 'Pattern Worksheets',       qual: () => '' },
  'big-small':         { op: (c) => (c.mode === 'orderAsc' ? 'Order by Size' : 'Find the Biggest'), qual: () => '' },
  'more-less':         { op: 'More or Fewer',            qual: () => '' },
  'grid-match':        { op: 'Picture Grid Puzzles',     qual: () => '' },
  'missing-pieces':    { op: (c) => (c.mode === 'two-missing' ? 'Missing Pieces Puzzles' : 'Missing Piece Puzzles'), qual: () => '' },
  'shadow-match':      { op: (c) => (c.mode === 'make-whole' ? 'Match the Whole' : 'Shadow Matching'), qual: () => '' },
  'find-objects':      { op: (c) => (c.mode === 'i-spy' ? 'I Spy' : c.mode === 'find-odd' ? 'Find the Odd One' : 'Find the Objects'), qual: () => '' },
  'odd-one-out':       { op: (c) => (c.mode === 'same-theme' ? 'Odd One Out' : c.mode === 'cross-theme' ? "Which Doesn't Belong" : 'Odd One Out'), qual: () => '' },
  'sudoku':            { op: (c) => (c.mode === 'medium' ? 'Picture Sudoku (Medium)' : 'Picture Sudoku'), qual: () => '' },
  'bingo':             { op: 'Picture Bingo',            qual: () => '' },
  'alphabet-train':    { op: 'Alphabet Train',           qual: () => '' },
  'picture-path':      { op: 'Picture Maze',             qual: () => '' },
  'picture-trail':     { op: 'Picture Maze',             qual: () => '' },
  'picture-sort':      { op: 'Picture Sorting',          qual: () => '' },
  'treasure-hunt':     { op: 'Treasure Hunt',            qual: () => '' },
};

// --- per-type meta flavor clause (woven after the keyword lead) ------------
// Each returns a short, type-appropriate clause (no leading space, no trailing period).
const META_FLAVOR = {
  'addition':          () => 'add the pictures and write the sum',
  'subtraction':       () => 'take away and count what is left',
  'math-puzzle':       () => 'solve the addition and subtraction puzzles',
  'math-worksheet':    () => 'work through the equations step by step',
  'code-addition':     () => 'crack the code and add it up',
  'chart-count':       () => 'count the pictures and complete the graph',
  'word-scramble':     () => 'unscramble the letters and spell the word',
  'wordsearch':        () => 'find the hidden words',
  'word-guess':        () => 'sound it out and write the word',
  'crossword':         () => 'fill in the picture crossword',
  'matching':          () => 'match each picture to its pair',
  'find-and-count':    () => 'find and count the objects',
  'prepositions':      () => 'practice position and place words',
  'pattern-train':     () => 'look at what comes next and continue the pattern',
  'pattern-worksheet': () => 'finish the pattern',
  'big-small':         () => 'compare big and small',
  'more-less':         () => 'compare more and fewer',
  'grid-match':        () => 'complete the picture grid',
  'missing-pieces':    () => 'find the missing pieces',
  'shadow-match':      () => 'match each picture to its shadow',
  'find-objects':      () => 'spot the hidden objects',
  'odd-one-out':       () => 'find the one that does not belong',
  'sudoku':            () => 'complete the picture sudoku',
  'bingo':             () => 'play picture bingo',
  'alphabet-train':    () => 'put the alphabet in order',
  'picture-path':      () => 'follow the picture maze',
  'picture-trail':     () => 'follow the picture maze',
  'picture-sort':      () => 'sort the pictures by category',
  'treasure-hunt':     () => 'follow the clues to the treasure',
};

// ---------------------------------------------------------------------------
function loadTaxonomyThemes() {
  const t = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
  return (t.axes && t.axes.theme) || {};
}

function themeDisplay(themeKey, themeAxis) {
  if (!themeKey) return '';
  // picture-sort "-vs-" pair → display both component themes joined by " and " (e.g. "Animals and Birds").
  if (themeKey.includes('-vs-')) {
    return themeKey.split('-vs-').map((k) => {
      const e = themeAxis[k];
      return (e && e.name && e.name.en) ? e.name.en : k;
    }).join(' and ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.en) return entry.name.en;
  return themeKey; // fallback the key
}

function gradeLabel(level) {
  return GRADE_LABEL[level] || level;
}

/**
 * Build the title-tag per the locked pattern with length-aware fallback.
 *   [op] for [Grade] [qual] – [Theme] | [suffix]
 * Fallback ladder when > TITLE_CAP:
 *   suffix " | Free Printable PDF" → " | Printable PDF" → " | PDF" → "" (no suffix)
 * Never drops the qualifier, theme, or grade.
 */
function buildTitle(op, grade, qual, theme) {
  // qual is the per-mode DISTINGUISHER — NEVER drop it (dropping it re-collapses multi-mode
  // siblings into dup titles). Only the format suffix shrinks; accept slight >cap overflow for
  // long qual+theme combos (a title-tag indexes fully; Google truncates display only).
  const assemble = (suffix) => `${op} for ${grade}${qual ? ' ' + qual : ''} – ${theme}${suffix}`;
  const suffixLadder = [' | Free Printable PDF', ' | Printable PDF', ' | PDF', ''];
  for (const suffix of suffixLadder) {
    const candidate = assemble(suffix);
    if (candidate.length <= TITLE_CAP) return candidate;
  }
  return assemble(''); // qual kept; shortest form
}

/**
 * Build the meta description (~120-160, hard ≤ META_CAP), native EN.
 *   <op> for <grade> <qual> with <Theme>. <flavor>. Free printable PDF
 *   worksheets for kids.
 * Trimmed to META_CAP if needed (drop the flavor clause first, then truncate).
 */
function buildMeta(type, op, grade, qual, theme, flavor) {
  const lead = `${op} for ${grade}${qual ? ' ' + qual : ''} with ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Free printable PDF worksheets for kids.';

  let meta = lead + flavorSentence + closer;
  if (meta.length <= META_CAP) return meta;

  // Drop the flavor clause first.
  meta = lead + closer;
  if (meta.length <= META_CAP) return meta;

  // Hard truncate (preserve a clean ending).
  return meta.slice(0, META_CAP).trimEnd();
}

function cap(s) {
  return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = { type: null, all: false, dryRun: false };
  for (const a of argv) {
    if (a === '--all') args.all = true;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a.startsWith('--type=')) args.type = a.slice('--type='.length);
    else {
      console.error(`Unknown argument: ${a}`);
      process.exit(1);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.all && !args.type) {
    console.error('ERROR: require --type=<type> or --all (use --dry-run to preview).');
    process.exit(1);
  }

  const themeAxis = loadTaxonomyThemes();
  const data = JSON.parse(fs.readFileSync(EN_JSON, 'utf8'));

  const selected = data.landings.filter((l) =>
    args.all ? true : l.coordinate.type === args.type
  );

  if (selected.length === 0) {
    console.error(`No landings matched ${args.all ? '--all' : '--type=' + args.type}.`);
    process.exit(1);
  }

  // Pass 1: resolve op/grade/qual/theme + identity per landing (op may be a function for multi-mode types).
  const recs = [];
  for (const l of selected) {
    const c = l.coordinate;
    const type = c.type;
    const map = TYPE_MAP[type];
    if (!map) {
      console.warn(`WARN: no TYPE_MAP entry for type "${type}" (slug ${l.slug}) — skipped.`);
      continue;
    }
    const standard = c.standard != null ? c.standard : l.standard;
    const op = (typeof map.op === 'function') ? map.op(c, standard) : map.op;
    const grade = gradeLabel(c.level);
    const theme = themeDisplay(c.theme, themeAxis);
    const qual = map.qual(c, standard) || '';
    const flavor = (META_FLAVOR[type] || (() => ''))(c, standard);
    recs.push({ l, type, op, grade, qual, theme, flavor, identity: [op, grade, qual, theme].join('|') });
  }

  // Ordinal disambiguation: identity collisions (variant siblings — e.g. 2 decks for
  // the same op/grade/qual/theme) → append " (N)" to theme for the 2nd+ in slug order (§A.13.17 precedent).
  const groups = {};
  for (const r of recs) (groups[r.identity] = groups[r.identity] || []).push(r);
  for (const id of Object.keys(groups)) {
    const g = groups[id];
    if (g.length < 2) continue;
    g.sort((a, b) => (a.l.slug < b.l.slug ? -1 : 1));
    g.forEach((r, idx) => { if (idx > 0) r.theme = `${r.theme} (${idx + 1})`; });
  }

  // Pass 2: build title + meta; mutate ONLY title + metaDescription.
  const samples = [];
  let changed = 0;
  for (const r of recs) {
    const newTitle = buildTitle(r.op, r.grade, r.qual, r.theme);
    const newMeta = buildMeta(r.type, r.op, r.grade, r.qual, r.theme, r.flavor);
    if (samples.length < 8) {
      samples.push({ slug: r.l.slug, type: r.type, oldTitle: r.l.title, newTitle, oldMeta: r.l.metaDescription, newMeta });
    }
    if (!args.dryRun) {
      r.l.title = newTitle;
      r.l.metaDescription = newMeta;
    }
    changed++;
  }

  // --- report ---------------------------------------------------------------
  console.log('');
  console.log(`Scope: ${args.all ? '--all' : '--type=' + args.type}  |  ${args.dryRun ? 'DRY-RUN (no writes)' : 'WRITE'}`);
  console.log(`Matched landings: ${selected.length}  |  ${args.dryRun ? 'Would change' : 'Changed'}: ${changed}`);
  console.log('');

  const sampleN = args.dryRun ? 6 : 4;
  console.log(`--- ${Math.min(sampleN, samples.length)} before/after samples ---`);
  for (const s of samples.slice(0, sampleN)) {
    console.log('');
    console.log(`[${s.type}] ${s.slug}`);
    console.log(`  TITLE old (${s.oldTitle ? s.oldTitle.length : 0}): ${s.oldTitle || '(none)'}`);
    console.log(`  TITLE new (${s.newTitle.length}): ${s.newTitle}`);
    console.log(`  META  old (${s.oldMeta ? s.oldMeta.length : 0}): ${s.oldMeta || '(none)'}`);
    console.log(`  META  new (${s.newMeta.length}): ${s.newMeta}`);
  }

  if (!args.dryRun) {
    fs.writeFileSync(EN_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log('');
    console.log(`WROTE ${EN_JSON} (indent=2, UTF-8). Only title + metaDescription mutated.`);
  } else {
    console.log('');
    console.log('DRY-RUN: nothing written.');
  }
}

main();
