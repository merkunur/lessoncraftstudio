#!/usr/bin/env node
/**
 * rekey-de-titles.js — re-keyword the SERP title-tag + meta description of
 * German (de) SEO landing pages, per the LOCKED German RANGE-LED keyword pattern.
 *
 * Cloned from rekey-en-titles.js. Architecture is preserved EXACTLY: two-pass
 * structure (pass 1 resolve op/grade/qual/theme + identity; ordinal
 * disambiguation for identity collisions; pass 2 build + mutate), op-as-function
 * support, the length-fallback ladder in buildTitle, the themeDisplay "-vs-"
 * split + null guard, the --type=/--all/--dry-run CLI.
 *
 * DATA-ONLY. Rewrites ONLY the `title` and `metaDescription` fields of
 * frontend/content/seo-landing/de.json. It does NOT touch h1, p1/p2/p3,
 * coordinate, standard, slug, carousel, eyebrow, slotTokens, strand,
 * canonicalDeckSlug, variantShape, or any other field.
 *
 * The Next route renders <title> as `l.title || l.h1` and meta as
 * `l.metaDescription || (first sentence of p1)`. So writing `title` sets the
 * SERP title-tag; `h1` (the on-page heading) MUST stay untouched (theme-warm).
 *
 * LOCKED DE TITLE PATTERN (RANGE-LED, structurally different from en/es):
 *   NUMERIC types (addition, subtraction, math-puzzle):
 *     Arbeitsblätter [op] bis [N] – [Thema] | zum Ausdrucken PDF kostenlos
 *   NON-NUMERIC (everything else):
 *     Arbeitsblätter [op] – [Thema] | zum Ausdrucken PDF kostenlos
 *   - op-led (NOT grade-led); grade is NOT injected into the title by default.
 *   - en-dash " – " before theme.
 *   - suffix ladder: " | zum Ausdrucken PDF kostenlos" → " | zum Ausdrucken PDF"
 *       → " | PDF" → "".
 *   - cap ~65 but ACCEPT overflow (German compounds run long).
 *     NEVER drop the qualifier, bis-N, or theme — only the suffix shrinks.
 *   - bis-N is HONEST-FIT from the standard (must match the deck's band):
 *       K.OA.A.2 → "bis 10", 1.OA.C.6 → "bis 20", 1.OA.D.8 → "bis 20",
 *       2.NBT.B.5 → "bis 100".
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
const DE_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'de.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const TITLE_CAP = 65;
const META_CAP = 170;

// --- grade label from coordinate.level (NOT injected into title by default) -
const GRADE_LABEL = {
  'vorschule': 'Vorschule',
  '1-klasse': '1. Klasse',
  '2-klasse': '2. Klasse',
};

// --- standard → "bis N" band (HONEST-FIT; must match the deck's band) -------
const BIS_BY_STANDARD = {
  'K.OA.A.2': 'bis 10',
  '1.OA.C.6': 'bis 20',
  '1.OA.D.8': 'bis 20',
  '2.NBT.B.5': 'bis 100',
};

// types that carry a "bis N" range (numeric). math-worksheet is NOT here:
// it has no single band → treat as non-numeric (no bis-N).
const NUMERIC_TYPES = new Set(['addition', 'subtraction', 'math-puzzle']);

// --- per-type op + qualifier resolver --------------------------------------
// qualifier is lowercase (a descriptor, not title-case). '' = none.
// Each entry: { op, qual(coord, standard) } — op may be a function for multi-mode types.
const TYPE_MAP = {
  'addition':          { op: 'Addition',                          qual: (c) => ({ 'mixed': 'ohne Zehnerübergang', 'image-image': 'mit Bildern', 'image-number': 'mit Bildern und Zahlen', 'find-addend': 'mit fehlender Zahl' }[c.mode] || '') },
  'subtraction':       { op: 'Subtraktion',                       qual: (c) => ({ 'cross-out': 'zum Durchstreichen', 'image-number': 'mit Bildern und Zahlen', 'find-subtrahend': 'mit fehlender Zahl', 'mixed': '' }[c.mode] || '') },
  'math-puzzle':       { op: (c) => ({ 'addition': 'Zahlenpuzzle zum Addieren', 'subtraction': 'Zahlenpuzzle zum Subtrahieren' }[c.mode] || 'Zahlenpuzzle'), qual: () => '' },
  'math-worksheet':    { op: 'Rechnen mit Symbolen',              qual: () => '' },
  'code-addition':     { op: 'Kodierrätsel',                      qual: (c) => (c.mode === 'secret-word' ? 'Geheimwort' : '') },
  'chart-count':       { op: 'Bilddiagramm',                      qual: () => '' },
  'word-scramble':     { op: 'Buchstabensalat',                   qual: () => '' },
  'wordsearch':        { op: 'Wortsuche',                         qual: () => '' },
  'word-guess':        { op: 'Lückenwörter schreiben',           qual: () => '' },
  'crossword':         { op: 'Bilderkreuzworträtsel',            qual: () => '' },
  'matching':          { op: (c) => (c.mode === 'letter' ? 'Buchstaben zuordnen' : c.mode === 'name' ? 'Wörter zuordnen' : 'Zuordnen'), qual: () => '' },
  'find-and-count':    { op: 'Anlaute suchen',                    qual: () => '' },
  'prepositions':      { op: (c) => (c.mode === 'fillin' ? 'Präpositionen schreiben' : c.mode === 'multiplechoice' ? 'Präpositionen erkennen' : 'Präpositionen'), qual: () => '' },
  'pattern-train':     { op: (c) => ({ 'aab': 'AAB-Muster', 'abb': 'ABB-Muster', 'aabb': 'AABB-Muster', 'abc': 'ABC-Muster' }[c.mode] || 'AB-Muster'), qual: () => '' },
  'pattern-worksheet': { op: 'Muster',                            qual: () => '' },
  'big-small':         { op: (c) => (c.mode === 'findBig' ? 'Das Größte finden' : c.mode === 'orderAsc' ? 'Nach Größe ordnen' : 'Größenvergleich'), qual: () => '' },
  'more-less':         { op: 'Mehr oder weniger',                 qual: () => '' },
  'grid-match':        { op: 'Bildgitter',                        qual: () => '' },
  'missing-pieces':    { op: (c) => (c.mode === 'one-missing' ? 'Fehlendes Teil' : 'Fehlende Teile'), qual: () => '' },
  'shadow-match':      { op: (c) => (c.mode === 'make-whole' ? 'Passendes Ganzes' : 'Schattenbilder'), qual: () => '' },
  'sudoku':            { op: (c) => (c.mode === 'medium' ? 'Bilder-Sudoku (mittel)' : 'Bilder-Sudoku'), qual: () => '' },
  'find-objects':      { op: 'Objekte suchen',                    qual: () => '' },
  'odd-one-out':       { op: 'Was passt nicht?',                  qual: () => '' },
  'bingo':             { op: 'Bilder-Bingo',                      qual: () => '' },
  'alphabet-train':    { op: 'Alphabet-Zug',                      qual: () => '' },
  'picture-path':      { op: 'Bilder-Labyrinth',                  qual: () => '' },
  'picture-trail':     { op: 'Bilder-Labyrinth',                  qual: () => '' },
  'picture-sort':      { op: 'Bilder sortieren',                  qual: () => '' },
  'treasure-hunt':     { op: 'Schatzsuche',                       qual: () => '' },
};

// --- per-type meta flavor clause (woven after the keyword lead) ------------
// Each returns a short German clause (no leading space, no trailing period).
const META_FLAVOR = {
  'addition':          () => 'zähle und schreibe das Ergebnis',
  'subtraction':       () => 'nimm weg und zähle, was übrig bleibt',
  'math-puzzle':       () => 'löse die Zahlenpuzzle',
  'math-worksheet':    () => 'rechne Schritt für Schritt',
  'code-addition':     () => 'knacke den Code und rechne',
  'chart-count':       () => 'zähle die Bilder und vervollständige das Diagramm',
  'word-scramble':     () => 'sortiere die Buchstaben und schreibe das Wort',
  'wordsearch':        () => 'finde die versteckten Wörter',
  'word-guess':        () => 'höre genau hin und schreibe das Wort',
  'crossword':         () => 'fülle das Bilderkreuzworträtsel aus',
  'matching':          () => 'ordne jedes Bild seinem Partner zu',
  'find-and-count':    () => 'finde den Anlaut zu jedem Bild',
  'prepositions':      () => 'übe die Orts- und Lagewörter',
  'pattern-train':     () => 'setze das Muster fort',
  'pattern-worksheet': () => 'vervollständige das Muster',
  'big-small':         () => 'vergleiche groß und klein',
  'more-less':         () => 'vergleiche mehr und weniger',
  'grid-match':        () => 'vervollständige das Bildgitter',
  'missing-pieces':    () => 'finde die fehlenden Teile',
  'shadow-match':      () => 'ordne jedes Bild seinem Schatten zu',
  'find-objects':      () => 'suche die versteckten Objekte',
  'odd-one-out':       () => 'finde, was nicht passt',
  'sudoku':            () => 'vervollständige das Bilder-Sudoku',
  'bingo':             () => 'spiele Bilder-Bingo',
  'alphabet-train':    () => 'bringe das Alphabet in die richtige Reihenfolge',
  'picture-path':      () => 'folge dem Bilder-Labyrinth',
  'picture-trail':     () => 'folge dem Bilder-Labyrinth',
  'picture-sort':      () => 'sortiere die Bilder nach Kategorie',
  'treasure-hunt':     () => 'folge den Hinweisen zum Schatz',
};

// ---------------------------------------------------------------------------
function loadTaxonomyThemes() {
  const t = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
  return (t.axes && t.axes.theme) || {};
}

function themeDisplay(themeKey, themeAxis) {
  if (!themeKey) return '';
  // picture-sort "-vs-" pair → display both component themes joined by " und " (e.g. "Bäckerei und Tiere").
  if (themeKey.includes('-vs-')) {
    return themeKey.split('-vs-').map((k) => {
      const e = themeAxis[k];
      return (e && e.name && e.name.de) ? e.name.de : k;
    }).join(' und ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.de) return entry.name.de;
  return themeKey; // fallback the key
}

function gradeLabel(level) {
  return GRADE_LABEL[level] || level;
}

// Resolve the "bis N" range for a numeric type from its standard. Non-numeric → ''.
function bisRange(type, standard) {
  if (!NUMERIC_TYPES.has(type)) return '';
  return BIS_BY_STANDARD[standard] || '';
}

/**
 * Build the DE title-tag per the locked RANGE-LED pattern with length-aware fallback.
 *   NUMERIC:     Arbeitsblätter [op] bis [N] [qual] – [Thema] | [suffix]
 *   NON-NUMERIC: Arbeitsblätter [op] [qual] – [Thema] | [suffix]
 * Fallback ladder when > TITLE_CAP:
 *   suffix " | zum Ausdrucken PDF kostenlos" → " | zum Ausdrucken PDF" → " | PDF" → "" (no suffix)
 * Never drops the qualifier, bis-N, or theme. Accepts overflow (German compounds run long).
 */
function buildTitle(op, bis, qual, theme) {
  // qual = per-mode DISTINGUISHER, bis = honest-fit band — NEVER drop either (dropping re-collapses
  // multi-mode siblings into dup titles / hides the band). Only the format suffix shrinks; accept
  // >cap overflow (a title-tag indexes fully; Google truncates display only; German compounds run long).
  const assemble = (suffix) =>
    `Arbeitsblätter ${op}${bis ? ' ' + bis : ''}${qual ? ' ' + qual : ''} – ${theme}${suffix}`;
  const suffixLadder = [' | zum Ausdrucken PDF kostenlos', ' | zum Ausdrucken PDF', ' | PDF', ''];
  for (const suffix of suffixLadder) {
    const candidate = assemble(suffix);
    if (candidate.length <= TITLE_CAP) return candidate;
  }
  return assemble(''); // qual + bis kept; shortest form
}

/**
 * Build the meta description (~120-160, hard ≤ META_CAP), native DE.
 *   <op>[ bis N] mit <Thema>. <flavor>. Kostenlose Arbeitsblätter zum Ausdrucken (PDF).
 * Trimmed to META_CAP if needed (drop the flavor clause first, then truncate).
 *
 * NOTE: the meta uses nominative theme display ("mit Tiere") — a known minor
 * de-grammar imperfection in the meta only; acceptable per the locked spec
 * (the de readiness gen's datN dative handling is for body prose, not this meta).
 */
function buildMeta(type, op, bis, qual, theme, flavor) {
  // em-dash before theme (NOT "mit ${theme}") — avoids the dative trap ("mit Tiere" → should be
  // "mit Tieren"); the theme stays nominative after the dash, grammatical for every theme.
  const lead = `${op}${bis ? ' ' + bis : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Kostenlose Arbeitsblätter zum Ausdrucken (PDF).';

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
  const data = JSON.parse(fs.readFileSync(DE_JSON, 'utf8'));

  const selected = data.landings.filter((l) =>
    args.all ? true : l.coordinate.type === args.type
  );

  if (selected.length === 0) {
    console.error(`No landings matched ${args.all ? '--all' : '--type=' + args.type}.`);
    process.exit(1);
  }

  // Pass 1: resolve op/bis/qual/theme + identity per landing (op may be a function for multi-mode types).
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
    const bis = bisRange(type, standard);
    const theme = themeDisplay(c.theme, themeAxis);
    const qual = map.qual(c, standard) || '';
    const flavor = (META_FLAVOR[type] || (() => ''))(c, standard);
    recs.push({ l, type, op, bis, qual, theme, flavor, identity: [op, bis, qual, theme].join('|') });
  }

  // Ordinal disambiguation: identity collisions (variant siblings — e.g. 2 decks for
  // the same op/bis/qual/theme) → append " (N)" to theme for the 2nd+ in slug order (§A.13.17 precedent).
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
  let maxTitleLen = 0;
  const titleCounts = {};
  for (const r of recs) {
    const newTitle = buildTitle(r.op, r.bis, r.qual, r.theme);
    const newMeta = buildMeta(r.type, r.op, r.bis, r.qual, r.theme, r.flavor);
    if (newTitle.length > maxTitleLen) maxTitleLen = newTitle.length;
    titleCounts[newTitle] = (titleCounts[newTitle] || 0) + 1;
    if (samples.length < 8) {
      samples.push({ slug: r.l.slug, type: r.type, oldTitle: r.l.title, newTitle, oldMeta: r.l.metaDescription, newMeta });
    }
    if (!args.dryRun) {
      r.l.title = newTitle;
      r.l.metaDescription = newMeta;
    }
    changed++;
  }

  const dupTitles = Object.entries(titleCounts).filter(([, n]) => n > 1);
  const dupCount = dupTitles.reduce((acc, [, n]) => acc + (n - 1), 0);

  // --- report ---------------------------------------------------------------
  console.log('');
  console.log(`Scope: ${args.all ? '--all' : '--type=' + args.type}  |  ${args.dryRun ? 'DRY-RUN (no writes)' : 'WRITE'}`);
  console.log(`Matched landings: ${selected.length}  |  ${args.dryRun ? 'Would change' : 'Changed'}: ${changed}`);
  console.log(`Max title length: ${maxTitleLen}`);
  console.log(`Duplicate-title count (extra collisions): ${dupCount}`);
  if (dupCount > 0) {
    console.log('  -- colliding titles (first 20) --');
    for (const [t, n] of dupTitles.slice(0, 20)) console.log(`    [${n}x] ${t}`);
  }
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
    fs.writeFileSync(DE_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log('');
    console.log(`WROTE ${DE_JSON} (indent=2, UTF-8). Only title + metaDescription mutated.`);
  } else {
    console.log('');
    console.log('DRY-RUN: nothing written.');
  }
}

main();
