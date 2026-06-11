#!/usr/bin/env node
/**
 * rekey-sv-titles.js — re-keyword the SERP title-tag + meta description of Swedish (sv)
 * SEO landing pages, per the LOCKED sv RANGE-LED keyword pattern (plan §⑤, operator-ruled).
 *
 * Cloned from rekey-de-titles.js. Two-pass (resolve op/range/qual/theme + identity →
 * ordinal-dedup → build + mutate), op-as-function/object, themeDisplay "-vs-" split + null guard,
 * --type=/--all/--dry-run. DATA-ONLY: rewrites ONLY `title` + `metaDescription` of
 * frontend/content/seo-landing/sv.json. The route renders <title> as `l.title || l.h1`, meta as
 * `l.metaDescription || (first sentence of p1)`, so h1/body stay theme-warm + untouched.
 *
 * LOCKED sv TITLE PATTERN (RANGE-LED):
 *   NUMERIC (addition, subtraction, math-puzzle):
 *     Arbetsblad [op] 0–[N] [utan växling] [qual] – [Tema] | skriva ut PDF gratis
 *   NON-NUMERIC:
 *     Arbetsblad [op] [qual] – [Tema] | skriva ut PDF gratis
 *   - en-dash range "0–N" (U+2013); en-dash " – " before theme.
 *   - "utan växling" = no-carry, HONEST-FIT-GATED to the within-10 band ('0–10') only,
 *     and NEVER on find-addend/find-subtrahend (no carrying concept). (Ruling 2.)
 *   - TAIL " | skriva ut PDF gratis" is the PROTECTED format-trio (Ruling 3) — never shrunk;
 *     accept title overflow (Swedish compounds run long; Google indexes full, truncates display).
 *   - NEVER drop op, range, qual, or theme (dropping re-collapses multi-mode siblings → dup titles).
 *
 * CLI: --type=<type> | --all | --dry-run
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SV_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'sv.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const META_CAP = 170;
const TAIL = ' | skriva ut PDF gratis'; // protected trio (Ruling 3)

// grade label from coordinate.level (NOT injected into the title by default — range-led)
const GRADE_LABEL = { 'forskola': 'Förskola', 'ak-1': 'Åk 1', 'ak-2': 'Åk 2' };

// standard → "0–N" band (HONEST-FIT; must match the deck's band)
const RANGE_BY_STANDARD = {
  'K.OA.A.1': '0–10', 'K.OA.A.2': '0–10', 'K.OA.A.4': '0–10', 'K.CC.B.5': '0–10', 'K.CC.C.6': '0–10',
  '1.OA.C.6': '0–20', '1.OA.D.8': '0–20', '1.OA.A.1': '0–20', '1.OA.D.7': '0–20', '1.NBT.C.4': '0–20',
  '2.OA.B.2': '0–20', '2.NBT.B.5': '0–100', '2.NBT.A.1': '0–100',
};
// fall back to band when no standard (readiness numeric is rare; most numeric carries a standard)
const RANGE_BY_LEVEL = { 'forskola': '0–10', 'ak-1': '0–20', 'ak-2': '0–100' };

// types that carry a "0–N" range (numeric)
const NUMERIC_TYPES = new Set(['addition', 'subtraction', 'math-puzzle']);
// modes that have NO carrying concept → never take "utan växling" (honest-fit floor)
const NO_CARRY_FORBIDDEN_MODES = new Set(['find-addend', 'find-subtrahend']);

// --- per-type op + per-mode qualifier (native sv; authored by the sv keyword ensemble) ----
const TYPE_MAP = {
  addition:        { op: 'Addition', qual: { 'image-image': 'med bilder', 'image-number': 'med bilder och tal', 'find-addend': 'med saknat tal', mixed: '' } },
  subtraction:     { op: 'Subtraktion', qual: { 'cross-out': 'med överstrykning', 'image-number': 'med bilder och tal', 'find-subtrahend': 'med saknat tal', mixed: '' } },
  'math-puzzle':   { op: { addition: 'Talpussel addition', subtraction: 'Talpussel subtraktion', mixed: 'Talpussel' }, qual: {} },
  'code-addition': { op: { 'null': 'Räknekod', 'secret-word': 'Hemligt ord med räknekod' }, qual: { 'secret-word': 'lös koden' } },
  'chart-count':   { op: 'Bilddiagram', qual: {} },
  'more-less':     { op: 'Fler eller färre', qual: { 'check-cross': 'kryssa rätt', 'image-image': 'med bilder', 'image-number': 'med bilder och tal' } },
  'find-and-count':{ op: { 'hidden-object': 'Hitta och räkna', 'letter-spotting': 'Hitta bokstaven' }, qual: {} },
  'big-small':     { op: { findBig: 'Störst och minst', orderAsc: 'Ordna efter storlek' }, qual: {} },
  'grid-match':    { op: 'Bildrutnät', qual: {} },
  'missing-pieces':{ op: 'Saknad bit', qual: { 'one-missing': 'en bit saknas', 'two-missing': 'två bitar saknas' } },
  'shadow-match':  { op: { 'find-shadow': 'Hitta skuggan', 'make-whole': 'Gör helheten' }, qual: {} },
  sudoku:          { op: 'Bildsudoku', qual: { easy: 'lätt', medium: 'medel' } },
  'find-objects':  { op: { 'i-spy': 'Jag ser något', 'find-odd': 'Hitta det udda' }, qual: {} },
  'odd-one-out':   { op: 'Vad passar inte?', qual: {} },
  bingo:           { op: 'Bildbingo', qual: {} },
  'pattern-train': { op: { aab: 'AAB-mönster', abb: 'ABB-mönster', aabb: 'AABB-mönster', abc: 'ABC-mönster' }, qual: {} },
  'pattern-worksheet': { op: 'Mönster', qual: {} },
  'picture-path':  { op: 'Bildlabyrint', qual: { 'choose-path': 'välj rätt väg', 'classic-maze': 'klassisk labyrint' } },
  'picture-trail': { op: 'Bildlabyrint', qual: {} },
  'picture-sort':  { op: 'Sortera bilder', qual: {} },
  'alphabet-train':{ op: 'Alfabetståg', qual: {} },
  matching:        { op: { letter: 'Para ihop bokstäver', name: 'Para ihop ord' }, qual: {} },
  prepositions:    { op: 'Prepositioner', qual: { fillin: 'fyll i', multiplechoice: 'flerval' } },
  'word-guess':    { op: 'Gissa ordet', qual: { easy: 'lätt', normal: 'normal' } },
  'word-scramble': { op: 'Ordpussel', qual: { easy: 'lätt', normal: 'normal' } },
  wordsearch:      { op: 'Ordletare', qual: {} },
  crossword:       { op: 'Bildkorsord', qual: {} },
  'treasure-hunt': { op: 'Skattjakt', qual: { 'cardinal-arrows': 'med pilar', compass: 'med kompass' } },
};

const META_FLAVOR = {
  addition: 'räkna och skriv svaret', subtraction: 'räkna ut differensen och skriv svaret',
  'math-puzzle': 'lös talpusslet och fyll i rätt tal', 'code-addition': 'knäck koden och skriv talet',
  'chart-count': 'räkna och färglägg diagrammet', 'more-less': 'jämför mängderna och välj fler eller färre',
  'find-and-count': 'leta upp bilderna och räkna dem', 'big-small': 'jämför storlekarna och ordna dem',
  'grid-match': 'fyll i bildrutnätet', 'missing-pieces': 'hitta biten som saknas',
  'shadow-match': 'para ihop bilden med rätt skugga', sudoku: 'fyll i sudokurutan med rätt bild',
  'find-objects': 'hitta sakerna i bilden', 'odd-one-out': 'välj bilden som inte passar in',
  bingo: 'spela bildbingo och markera rätt ruta', 'pattern-train': 'fortsätt mönstret med rätt bild',
  'pattern-worksheet': 'rita klart mönstret', 'picture-path': 'följ rätt väg genom labyrinten',
  'picture-trail': 'följ rätt väg genom labyrinten', 'picture-sort': 'sortera bilderna i rätt grupp',
  'alphabet-train': 'sätt bokstäverna i rätt ordning', matching: 'dra streck mellan paren som hör ihop',
  prepositions: 'välj rätt preposition', 'word-guess': 'gissa ordet bokstav för bokstav',
  'word-scramble': 'lägg bokstäverna i rätt ordning', wordsearch: 'leta rätt på orden i rutnätet',
  crossword: 'lös bildkorsordet', 'treasure-hunt': 'följ ledtrådarna till skatten',
};

// ---------------------------------------------------------------------------
function loadTaxonomyThemes() {
  const t = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
  return (t.axes && t.axes.theme) || {};
}
function themeDisplay(themeKey, themeAxis) {
  if (!themeKey) return '';
  if (themeKey.includes('-vs-')) {
    return themeKey.split('-vs-').map((k) => {
      const e = themeAxis[k];
      return (e && e.name && e.name.sv) ? e.name.sv : k;
    }).join(' och ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.sv) return entry.name.sv;
  return themeKey;
}
function resolveOp(map, mode) {
  if (typeof map.op === 'function') return map.op(mode);
  if (typeof map.op === 'object') { const k = (mode === null ? 'null' : mode); return map.op[k] || map.op['null'] || ''; }
  return map.op;
}
function resolveQual(map, mode) { const k = (mode === null ? 'null' : mode); return (map.qual && map.qual[k]) || ''; }

function rangeFor(type, standard, level) {
  if (!NUMERIC_TYPES.has(type)) return '';
  if (standard && RANGE_BY_STANDARD[standard]) return RANGE_BY_STANDARD[standard];
  return RANGE_BY_LEVEL[level] || '';
}
// "utan växling" honest-fit: within-10 band only, never on find-addend/find-subtrahend.
function noCarry(type, mode, range) {
  if (!NUMERIC_TYPES.has(type)) return false;
  if (NO_CARRY_FORBIDDEN_MODES.has(mode)) return false;
  return range === '0–10';
}

function buildTitle(op, range, nc, qual, theme) {
  // Protected trio TAIL (Ruling 3) — never shrunk; accept overflow. Everything else always kept.
  return `Arbetsblad ${op}${range ? ' ' + range : ''}${nc ? ' utan växling' : ''}${qual ? ' ' + qual : ''} – ${theme}${TAIL}`;
}
function buildMeta(op, range, nc, qual, theme, flavor) {
  const lead = `${op}${range ? ' ' + range : ''}${nc ? ' utan växling' : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Gratis arbetsblad att skriva ut (PDF).';
  let meta = lead + flavorSentence + closer;
  if (meta.length <= META_CAP) return meta;
  meta = lead + closer;
  if (meta.length <= META_CAP) return meta;
  return meta.slice(0, META_CAP).trimEnd();
}
function cap(s) { return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function parseArgs(argv) {
  const args = { type: null, all: false, dryRun: false };
  for (const a of argv) {
    if (a === '--all') args.all = true;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a.startsWith('--type=')) args.type = a.slice('--type='.length);
    else { console.error(`Unknown argument: ${a}`); process.exit(1); }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.all && !args.type) { console.error('ERROR: require --type=<type> or --all (use --dry-run to preview).'); process.exit(1); }

  const themeAxis = loadTaxonomyThemes();
  const data = JSON.parse(fs.readFileSync(SV_JSON, 'utf8'));
  const selected = data.landings.filter((l) => args.all ? true : l.coordinate.type === args.type);
  if (selected.length === 0) { console.error(`No landings matched ${args.all ? '--all' : '--type=' + args.type}.`); process.exit(1); }

  // Pass 1: resolve
  const recs = [];
  for (const l of selected) {
    const c = l.coordinate;
    const type = c.type;
    const map = TYPE_MAP[type];
    if (!map) { console.warn(`WARN: no TYPE_MAP entry for type "${type}" (slug ${l.slug}) — skipped.`); continue; }
    const standard = c.standard != null ? c.standard : l.standard;
    const op = resolveOp(map, c.mode);
    const range = rangeFor(type, standard, c.level);
    const nc = noCarry(type, c.mode, range);
    const theme = themeDisplay(c.theme, themeAxis);
    const qual = resolveQual(map, c.mode);
    const flavor = META_FLAVOR[type] || '';
    recs.push({ l, type, op, range, nc, qual, theme, flavor, identity: [op, range, nc, qual, theme].join('|') });
  }

  // Ordinal disambiguation for identity collisions (variant siblings)
  const groups = {};
  for (const r of recs) (groups[r.identity] = groups[r.identity] || []).push(r);
  for (const id of Object.keys(groups)) {
    const g = groups[id];
    if (g.length < 2) continue;
    g.sort((a, b) => (a.l.slug < b.l.slug ? -1 : 1));
    g.forEach((r, idx) => { if (idx > 0) r.theme = `${r.theme} (${idx + 1})`; });
  }

  // Pass 2: build + mutate
  const samples = []; let changed = 0; let maxTitleLen = 0; const titleCounts = {};
  for (const r of recs) {
    const newTitle = buildTitle(r.op, r.range, r.nc, r.qual, r.theme);
    const newMeta = buildMeta(r.op, r.range, r.nc, r.qual, r.theme, r.flavor);
    if (newTitle.length > maxTitleLen) maxTitleLen = newTitle.length;
    titleCounts[newTitle] = (titleCounts[newTitle] || 0) + 1;
    if (samples.length < 8) samples.push({ slug: r.l.slug, type: r.type, oldTitle: r.l.title, newTitle, newMeta });
    if (!args.dryRun) { r.l.title = newTitle; r.l.metaDescription = newMeta; }
    changed++;
  }

  const dupTitles = Object.entries(titleCounts).filter(([, n]) => n > 1);
  const dupCount = dupTitles.reduce((acc, [, n]) => acc + (n - 1), 0);

  console.log('');
  console.log(`Scope: ${args.all ? '--all' : '--type=' + args.type}  |  ${args.dryRun ? 'DRY-RUN' : 'WRITE'}`);
  console.log(`Matched: ${selected.length}  |  ${args.dryRun ? 'Would change' : 'Changed'}: ${changed}  |  Max title: ${maxTitleLen}`);
  console.log(`Duplicate-title collisions: ${dupCount}`);
  if (dupCount > 0) for (const [t, n] of dupTitles.slice(0, 20)) console.log(`    [${n}x] ${t}`);
  console.log('');
  for (const s of samples.slice(0, args.dryRun ? 6 : 4)) {
    console.log(`[${s.type}] ${s.slug}`);
    console.log(`  TITLE (${s.newTitle.length}): ${s.newTitle}`);
    console.log(`  META  (${s.newMeta.length}): ${s.newMeta}`);
  }
  if (!args.dryRun) {
    fs.writeFileSync(SV_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`\nWROTE ${SV_JSON} (title + metaDescription only).`);
  } else {
    console.log('\nDRY-RUN: nothing written.');
  }
}
main();
