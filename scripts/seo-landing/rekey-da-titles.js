#!/usr/bin/env node
/**
 * rekey-da-titles.js — re-keyword the SERP title-tag + meta description of Danish (da)
 * SEO landing pages, per the LOCKED da keyword pattern (da ledger-lock 2026-06-12).
 *
 * Cloned from rekey-nl-titles.js. Two-pass (resolve op/range/qual/theme + identity →
 * ordinal-dedup → build + mutate), op-as-function/object, themeDisplay "-vs-" split + null
 * guard, --type=/--all/--dry-run. DATA-ONLY: rewrites ONLY `title` + `metaDescription`.
 *
 * LOCKED da TITLE PATTERNS:
 *   NUMERIC (addition, subtraction, math-puzzle):
 *     [Op] til [N] [uden tierovergang] [qual] – [Tema] | til print PDF gratis
 *     (op tokens carry the harvest head: Plusopgaver / Minusopgaver / Talpuslespil)
 *   NON-NUMERIC:
 *     [Type] [qual] – [Tema] | opgaver til print PDF gratis
 *   - Head noun = opgaver (NEVER "arbejdsark"-led, NEVER "regneark" = spreadsheet).
 *   - "uden tierovergang" is ATTESTED Danish (Sysform/Anette K/MatematikFessor) and
 *     HONEST-FIT-GATED: within-10 range + direct modes only (within-10 sums never carry).
 *   - Format trios are PROTECTED: "til print PDF gratis" / "opgaver til print PDF gratis";
 *     never shrunk; accept title overflow (keyword lead stays inside display).
 *   - NEVER drop op, range, qual, or theme (dropping re-collapses multi-mode siblings).
 *
 * CLI: --type=<type> | --all | --dry-run
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DA_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'da.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const META_CAP = 170;
const TAIL_NUMERIC = ' | til print PDF gratis';
const TAIL_OTHER = ' | opgaver til print PDF gratis';

const GRADE_LABEL = { 'boernehaveklasse': '0. klasse', '1-klasse': '1. klasse', '2-klasse': '2. klasse' };

// standard → "til N" band (HONEST-FIT; the deck's actual ceiling).
const RANGE_BY_STANDARD = {
  'K.OA.A.1': 'til 10', 'K.OA.A.2': 'til 10', 'K.OA.A.4': 'til 10', 'K.CC.B.5': 'til 10', 'K.CC.C.6': 'til 10',
  '1.OA.C.6': 'til 20', '1.OA.D.8': 'til 20', '1.OA.A.1': 'til 20', '1.OA.D.7': 'til 20', '1.NBT.C.4': 'til 20',
  '2.OA.B.2': 'til 20', '2.NBT.B.5': 'til 100', '2.NBT.A.1': 'til 100',
};
const RANGE_BY_LEVEL = { 'boernehaveklasse': '', '1-klasse': 'til 20', '2-klasse': 'til 100' };

const NUMERIC_TYPES = new Set(['addition', 'subtraction', 'math-puzzle']);
// "uden tierovergang": within-10 + direct modes only (find-addend/find-subtrahend excluded).
const NO_CARRY_EXCLUDED_MODES = new Set(['find-addend', 'find-subtrahend']);

// --- per-type op + per-mode qualifier (da keyword harvest 2026-06-12; attested-led) ----
const TYPE_MAP = {
  addition:        { op: 'Plusopgaver', qual: { 'image-image': 'med billeder', 'image-number': 'med billeder og tal', 'find-addend': 'med manglende tal', mixed: '' } },
  subtraction:     { op: 'Minusopgaver', qual: { 'cross-out': 'med overstregning', 'image-number': 'med billeder og tal', 'find-subtrahend': 'med manglende tal', mixed: '' } },
  'math-puzzle':   { op: { addition: 'Talpuslespil plus', subtraction: 'Talpuslespil minus', mixed: 'Talpuslespil' }, qual: {} },
  'code-addition': { op: { 'null': 'Regnekode', 'secret-word': 'Hemmeligt ord med regnekode' }, qual: { 'secret-word': 'knæk koden' } },
  'chart-count':   { op: 'Søjlediagram', qual: {} },
  'more-less':     { op: 'Flest og færrest', qual: { 'check-cross': 'sæt kryds', 'image-image': 'med billeder', 'image-number': 'med billeder og tal' } },
  'find-and-count':{ op: { 'hidden-object': 'Find og tæl', 'letter-spotting': 'Find bogstavet' }, qual: {} },
  'big-small':     { op: { findBig: 'Størst og mindst', orderAsc: 'Sortér efter størrelse' }, qual: {} },
  'grid-match':    { op: 'Billedbrikker', qual: {} },
  'missing-pieces':{ op: 'Den manglende brik', qual: { 'one-missing': 'én brik mangler', 'two-missing': 'to brikker mangler' } },
  'shadow-match':  { op: { 'find-shadow': 'Find skyggen', 'make-whole': 'Gør billedet helt' }, qual: {} },
  sudoku:          { op: 'Sudoku for børn med billeder', qual: { easy: 'let', medium: 'mellem' } },
  'find-objects':  { op: { 'i-spy': 'Find tingene', 'find-odd': 'Find det, der er anderledes' }, qual: {} },
  'odd-one-out':   { op: 'Hvad passer ikke?', qual: {} },
  bingo:           { op: 'Bankoplader', qual: {} },
  'pattern-train': { op: { 'null': 'AB-mønster', aab: 'AAB-mønster', abb: 'ABB-mønster', aabb: 'AABB-mønster', abc: 'ABC-mønster' }, qual: {} },
  'pattern-worksheet': { op: 'Mønstre', qual: {} },
  'picture-path':  { op: 'Labyrint', qual: { 'choose-path': 'vælg den rigtige vej', 'classic-maze': 'klassisk labyrint' } },
  'picture-trail': { op: 'Labyrint', qual: {} },
  'picture-sort':  { op: 'Sortér billederne', qual: {} },
  'alphabet-train':{ op: 'Alfabetisk rækkefølge', qual: {} },
  matching:        { op: { letter: 'Forlyd og bogstaver', name: 'Forbind ord og billede' }, qual: {} },
  prepositions:    { op: 'Forholdsord', qual: { fillin: 'skriv ordet', multiplechoice: 'sæt kryds' } },
  'word-guess':    { op: 'Manglende bogstaver', qual: { 'null': 'blandet øvelse', easy: 'korte ord', normal: 'længere ord' } },
  'word-scramble': { op: 'Byg et ord', qual: { easy: 'korte ord', normal: 'længere ord' } },
  wordsearch:      { op: 'Ordjagt', qual: {} },
  crossword:       { op: 'Kryds og tværs', qual: { 'null': 'med billeder' } },
  'treasure-hunt': { op: 'Skattejagt', qual: { 'cardinal-arrows': 'med pile', compass: 'med kompas' } },
};

const META_FLAVOR = {
  addition: 'regn plusstykkerne og skriv svaret', subtraction: 'regn minusstykkerne og skriv svaret',
  'math-puzzle': 'løs talpuslespillet og indsæt det rigtige tal', 'code-addition': 'knæk koden og skriv tallet',
  'chart-count': 'tæl og udfyld søjlediagrammet', 'more-less': 'sammenlign mængderne og vælg flest eller færrest',
  'find-and-count': 'find tingene på billedet og tæl dem', 'big-small': 'sammenlign størrelserne og sortér dem',
  'grid-match': 'sæt billedbrikkerne på den rigtige plads', 'missing-pieces': 'find den brik, der mangler',
  'shadow-match': 'forbind billedet med den rigtige skygge', sudoku: 'udfyld sudokuen med det rigtige billede',
  'find-objects': 'find tingene i det store billede', 'odd-one-out': 'vælg det billede, der ikke passer ind',
  bingo: 'spil banko og markér det rigtige felt', 'pattern-train': 'gør mønstret færdigt med det rigtige billede',
  'pattern-worksheet': 'gør mønstret færdigt', 'picture-path': 'find vej gennem labyrinten',
  'picture-trail': 'find vej gennem labyrinten', 'picture-sort': 'sortér billederne i de rigtige grupper',
  'alphabet-train': 'sæt bogstaverne i alfabetisk rækkefølge', matching: 'træk en streg mellem billede og bogstav eller ord',
  prepositions: 'vælg det rigtige forholdsord til billedet', 'word-guess': 'skriv de manglende bogstaver og gør ordet færdigt',
  'word-scramble': 'byg ordet af de blandede bogstaver', wordsearch: 'find ordene mellem bogstaverne',
  crossword: 'løs kryds og tværsen med ordene fra billederne', 'treasure-hunt': 'følg sporene hen til skatten',
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
      return (e && e.name && e.name.da) ? e.name.da : k;
    }).join(' og ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.da) return entry.name.da;
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
// "uden tierovergang": honest only on the within-10 band + direct modes (within-10 sums never carry).
function noCarryFor(type, mode, range) {
  if (!NUMERIC_TYPES.has(type)) return '';
  if (range !== 'til 10') return '';
  if (NO_CARRY_EXCLUDED_MODES.has(mode)) return '';
  return 'uden tierovergang';
}

function buildTitle(type, op, range, noCarry, qual, theme) {
  const numeric = NUMERIC_TYPES.has(type);
  const head = `${op}${range ? ' ' + range : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''}`;
  return `${head} – ${theme}${numeric ? TAIL_NUMERIC : TAIL_OTHER}`;
}
function buildMeta(op, range, noCarry, qual, theme, flavor) {
  const lead = `${op}${range ? ' ' + range : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Gratis opgaver til print (PDF).';
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
  const data = JSON.parse(fs.readFileSync(DA_JSON, 'utf8'));
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
    const noCarry = noCarryFor(type, c.mode, range);
    const theme = themeDisplay(c.theme, themeAxis);
    const qual = resolveQual(map, c.mode);
    const flavor = META_FLAVOR[type] || '';
    recs.push({ l, type, op, range, noCarry, qual, theme, flavor, identity: [op, range, noCarry, qual, theme].join('|') });
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
    const newTitle = buildTitle(r.type, r.op, r.range, r.noCarry, r.qual, r.theme);
    const newMeta = buildMeta(r.op, r.range, r.noCarry, r.qual, r.theme, r.flavor);
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
    fs.writeFileSync(DA_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`\nWROTE ${DA_JSON} (title + metaDescription only).`);
  } else {
    console.log('\nDRY-RUN: nothing written.');
  }
}

main();
