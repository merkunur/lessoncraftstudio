#!/usr/bin/env node
/**
 * rekey-no-titles.js — re-keyword the SERP title-tag + meta description of Norwegian (no, bokmål)
 * SEO landing pages, per the LOCKED no keyword pattern (no ledger-lock 2026-06-15, google.no harvest).
 *
 * Cloned from rekey-da-titles.js but GRADE-LED (da is range-led). Two-pass (resolve
 * op/grade/noCarry/qual/theme + identity → ordinal-dedup → build + mutate), op-as-function/object,
 * themeDisplay "-vs-" split + null guard, --type=/--all/--dry-run. DATA-ONLY: rewrites ONLY
 * `title` + `metaDescription`.
 *
 * LOCKED no TITLE PATTERNS:
 *   NUMERIC (addition, subtraction, math-puzzle, math-worksheet):
 *     [Op] [N]. trinn [uten tierovergang|uten låning] [qual] – [Tema] | til utskrift PDF gratis
 *     (op tokens carry the compound head: Addisjonsoppgaver / Subtraksjonsoppgaver / Tallpuslespill)
 *   NON-NUMERIC (readiness + literacy — NO trinn number per ledger Pattern B):
 *     [Type] [qual] – [Tema] | oppgaver til utskrift PDF gratis
 *   - Head noun = oppgaver (NEVER "regneark" = spreadsheet; "arbeidsark" carried in the meta).
 *   - The genuine NO divergence: TWO operation-distinct no-carry terms (unlike da/sv single-term) —
 *     addition "uten tierovergang", subtraction "uten låning"; HONEST-FIT-GATED to within-10 + direct
 *     modes only (within-10 sums never cross the ten); math-puzzle/math-worksheet excluded.
 *   - +1 GRADE OFFSET: the grade label comes from coordinate.level (1-/2-/3-trinn), already re-graded
 *     per child-seen quantity at enum time — symbolic ≤20 = 2. trinn (NOT 1. trinn).
 *   - Format trio PROTECTED: "til utskrift PDF gratis"; never shrunk; accept title overflow.
 *   - NEVER drop op, grade, noCarry, qual, or theme (dropping re-collapses multi-mode siblings).
 *
 * CLI: --type=<type> | --all | --dry-run
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const NO_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'no.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const META_CAP = 170;
const TAIL_NUMERIC = ' | til utskrift PDF gratis';
const TAIL_OTHER = ' | oppgaver til utskrift PDF gratis';

const GRADE_LABEL = { '1-trinn': '1. trinn', '2-trinn': '2. trinn', '3-trinn': '3. trinn' };

const NUMERIC_TYPES = new Set(['addition', 'subtraction', 'math-puzzle', 'math-worksheet']);
// no-carry honest only on the within-10 band + direct modes (within-10 sums never cross the ten);
// math-puzzle/math-worksheet excluded (the qualifier targets pluss/minus searches, not symbol-math).
const WITHIN_10_STANDARDS = new Set(['K.OA.A.1', 'K.OA.A.2', 'K.OA.A.4', 'K.CC.B.5', 'K.CC.C.6']);
const NO_CARRY_EXCLUDED_MODES = new Set(['find-addend', 'find-subtrahend']);
const NO_CARRY_EXCLUDED_TYPES = new Set(['math-puzzle', 'math-worksheet']);

// --- per-type op + per-mode qualifier (no keyword harvest 2026-06-15; google.no attested) ----
const TYPE_MAP = {
  addition:        { op: 'Addisjonsoppgaver', qual: { 'image-image': 'med bilder', 'image-number': 'med bilder og tall', 'find-addend': 'med manglende tall', mixed: '' } },
  subtraction:     { op: 'Subtraksjonsoppgaver', qual: { 'cross-out': 'med overstreking', 'image-number': 'med bilder og tall', 'find-subtrahend': 'med manglende tall', mixed: '' } },
  'math-puzzle':   { op: { addition: 'Tallpuslespill pluss', subtraction: 'Tallpuslespill minus', mixed: 'Tallpuslespill' }, qual: {} },
  'math-worksheet':{ op: { 'two-symbols-add-sub': 'Regn med bilder', 'three-symbols-add-sub': 'Regn med bilder (tre ledd)' }, qual: {} },
  'code-addition': { op: { 'null': 'Regnekode', 'secret-word': 'Hemmelig ord med regnekode' }, qual: { 'secret-word': 'knekk koden' } },
  'chart-count':   { op: 'Søylediagram', qual: {} },
  'more-less':     { op: 'Flest og færrest', qual: { 'check-cross': 'sett kryss', 'image-image': 'med bilder', 'image-number': 'med bilder og tall' } },
  'find-and-count':{ op: { 'hidden-object': 'Finn og tell', 'letter-spotting': 'Finn bokstaven' }, qual: {} },
  'big-small':     { op: { findBig: 'Størst og minst', orderAsc: 'Sorter etter størrelse' }, qual: {} },
  'grid-match':    { op: 'Bildebrikker', qual: {} },
  'missing-pieces':{ op: 'Den manglende brikken', qual: { 'one-missing': 'én brikke mangler', 'two-missing': 'to brikker mangler' } },
  'shadow-match':  { op: { 'find-shadow': 'Finn skyggen', 'make-whole': 'Gjør bildet helt' }, qual: {} },
  sudoku:          { op: 'Sudoku for barn med bilder', qual: { easy: 'lett', medium: 'middels' } },
  'find-objects':  { op: { 'i-spy': 'Finn tingene', 'find-odd': 'Finn det som er annerledes' }, qual: {} },
  'odd-one-out':   { op: 'Hva passer ikke?', qual: {} },
  bingo:           { op: 'Bildebingo', qual: {} },
  'pattern-train': { op: { 'null': 'AB-mønster', aab: 'AAB-mønster', abb: 'ABB-mønster', aabb: 'AABB-mønster', abc: 'ABC-mønster' }, qual: {} },
  'pattern-worksheet': { op: 'Mønstre', qual: {} },
  'picture-path':  { op: 'Labyrint', qual: { 'choose-path': 'velg riktig vei', 'classic-maze': 'klassisk labyrint' } },
  'picture-trail': { op: 'Labyrint', qual: {} },
  'picture-sort':  { op: 'Sorter bildene', qual: {} },
  'alphabet-train':{ op: 'Alfabetisk rekkefølge', qual: {} },
  matching:        { op: { letter: 'Forlyd og bokstaver', name: 'Les og koble' }, qual: {} },
  prepositions:    { op: 'Preposisjoner', qual: { fillin: 'skriv ordet', multiplechoice: 'sett kryss' } },
  'word-guess':    { op: 'Manglende bokstaver', qual: { 'null': 'blandet øvelse', easy: 'korte ord', normal: 'lengre ord' } },
  'word-scramble': { op: 'Lag ordet', qual: { easy: 'korte ord', normal: 'lengre ord' } },
  wordsearch:      { op: 'Ordsøk', qual: {} },
  crossword:       { op: 'Kryssord for barn', qual: { 'null': 'med bilder' } },
  'treasure-hunt': { op: 'Skattejakt', qual: { 'cardinal-arrows': 'med piler', compass: 'med kompass' } },
};

const META_FLAVOR = {
  addition: 'regn plusstykkene og skriv svaret', subtraction: 'regn minusstykkene og skriv svaret',
  'math-puzzle': 'løs tallpuslespillet og sett inn riktig tall', 'code-addition': 'knekk koden og skriv tallet',
  'math-worksheet': 'finn verdien av bildene og regn ut stykket',
  'chart-count': 'tell og fyll ut søylediagrammet', 'more-less': 'sammenlign mengdene og velg flest eller færrest',
  'find-and-count': 'finn tingene på bildet og tell dem', 'big-small': 'sammenlign størrelsene og sorter dem',
  'grid-match': 'legg bildebrikkene på riktig plass', 'missing-pieces': 'finn brikken som mangler',
  'shadow-match': 'koble bildet til riktig skygge', sudoku: 'fyll ut sudokuen med riktig bilde',
  'find-objects': 'finn tingene i det store bildet', 'odd-one-out': 'velg bildet som ikke passer',
  bingo: 'spill bingo og marker riktig rute', 'pattern-train': 'gjør mønsteret ferdig med riktig bilde',
  'pattern-worksheet': 'gjør mønsteret ferdig', 'picture-path': 'finn veien gjennom labyrinten',
  'picture-trail': 'finn veien gjennom labyrinten', 'picture-sort': 'sorter bildene i riktige grupper',
  'alphabet-train': 'sett bokstavene i alfabetisk rekkefølge', matching: 'trekk en strek mellom bilde og bokstav eller ord',
  prepositions: 'velg riktig preposisjon til bildet', 'word-guess': 'skriv de manglende bokstavene og gjør ordet ferdig',
  'word-scramble': 'lag ordet av de stokkede bokstavene', wordsearch: 'finn ordene blant bokstavene',
  crossword: 'løs kryssordet med ordene fra bildene', 'treasure-hunt': 'følg sporene fram til skatten',
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
      return (e && e.name && e.name.no) ? e.name.no : k;
    }).join(' og ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.no) return entry.name.no;
  return themeKey;
}
function resolveOp(map, mode) {
  if (typeof map.op === 'function') return map.op(mode);
  if (typeof map.op === 'object') { const k = (mode === null ? 'null' : mode); return map.op[k] || map.op['null'] || ''; }
  return map.op;
}
function resolveQual(map, mode) { const k = (mode === null ? 'null' : mode); return (map.qual && map.qual[k]) || ''; }

// GRADE-LED: numeric types carry the [N]. trinn label (from the per-coordinate re-grade); non-numeric
// (readiness + literacy) carry NO trinn number in the title (ledger Pattern B).
function gradeFor(type, level) {
  if (!NUMERIC_TYPES.has(type)) return '';
  return GRADE_LABEL[level] || '';
}
// operation-distinct no-carry, honest only on the within-10 band + direct modes.
function noCarryFor(type, mode, standard) {
  if (!NUMERIC_TYPES.has(type)) return '';
  if (NO_CARRY_EXCLUDED_TYPES.has(type)) return '';
  if (!WITHIN_10_STANDARDS.has(standard)) return '';
  if (NO_CARRY_EXCLUDED_MODES.has(mode)) return '';
  if (type === 'addition') return 'uten tierovergang';
  if (type === 'subtraction') return 'uten låning';
  return '';
}

function buildTitle(type, op, grade, noCarry, qual, theme) {
  const numeric = NUMERIC_TYPES.has(type);
  const head = `${op}${grade ? ' ' + grade : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''}`;
  return `${head} – ${theme}${numeric ? TAIL_NUMERIC : TAIL_OTHER}`;
}
function buildMeta(op, grade, noCarry, qual, theme, flavor) {
  const lead = `${op}${grade ? ' ' + grade : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Gratis arbeidsark til utskrift (PDF).';
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
  const data = JSON.parse(fs.readFileSync(NO_JSON, 'utf8'));
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
    const grade = gradeFor(type, c.level);
    const noCarry = noCarryFor(type, c.mode, standard);
    const theme = themeDisplay(c.theme, themeAxis);
    const qual = resolveQual(map, c.mode);
    const flavor = META_FLAVOR[type] || '';
    recs.push({ l, type, op, grade, noCarry, qual, theme, flavor, identity: [op, grade, noCarry, qual, theme].join('|') });
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
    const newTitle = buildTitle(r.type, r.op, r.grade, r.noCarry, r.qual, r.theme);
    const newMeta = buildMeta(r.op, r.grade, r.noCarry, r.qual, r.theme, r.flavor);
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
    fs.writeFileSync(NO_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`\nWROTE ${NO_JSON} (title + metaDescription only).`);
  } else {
    console.log('\nDRY-RUN: nothing written.');
  }
}

main();
