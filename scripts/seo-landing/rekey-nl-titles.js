#!/usr/bin/env node
/**
 * rekey-nl-titles.js — re-keyword the SERP title-tag + meta description of Dutch (nl)
 * SEO landing pages, per the LOCKED nl RANGE-LED keyword pattern (plan §⑥, operator-ruled 2026-06-12).
 *
 * Cloned from rekey-sv-titles.js. Two-pass (resolve op/range/qual/theme + identity → ordinal-dedup →
 * build + mutate), op-as-function/object, themeDisplay "-vs-" split + null guard, --type=/--all/--dry-run.
 * DATA-ONLY: rewrites ONLY `title` + `metaDescription` of frontend/content/seo-landing/nl.json. The route
 * renders <title> as `l.title || l.h1`, meta as `l.metaDescription || (first sentence of p1)`, so h1/body
 * stay theme-warm + untouched.
 *
 * LOCKED nl TITLE PATTERN (RANGE-LED):
 *   NUMERIC (addition, subtraction, math-puzzle):
 *     Werkbladen [op] tot [N] [qual] – [Thema] | printen PDF gratis
 *   NON-NUMERIC:
 *     Werkbladen [op] [qual] – [Thema] | printen PDF gratis
 *   - "tot N" range = native Dutch ("sommen tot 20"); N from the deck's standard (tot 10/20/100).
 *   - NO no-carry qualifier (fork ① RULED: "zonder tienoverschrijding" is a generator-checkbox label,
 *     NOT a search term → OMITTED; the "tot N" range carries the difficulty signal). The honest-fit
 *     obligation lives in the BODY prose, never the title.
 *   - TAIL " | printen PDF gratis" is the PROTECTED format-trio (native print-verb + PDF + gratis) —
 *     never shrunk; accept title overflow (Dutch compounds run long; Google indexes full, truncates display).
 *   - NEVER drop op, range, qual, or theme (dropping re-collapses multi-mode siblings → dup titles).
 *
 * CLI: --type=<type> | --all | --dry-run
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const NL_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'nl.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const META_CAP = 170;
const TAIL = ' | printen PDF gratis'; // protected trio (fork ①: native print-verb + PDF + gratis)

// grade label from coordinate.level (NOT injected into the title by default — range-led)
const GRADE_LABEL = { 'kleuters': 'Kleuters', 'groep-3': 'Groep 3', 'groep-4': 'Groep 4' };

// standard → "tot N" band (HONEST-FIT; must match the deck's band). nl groep 3 absorbs both
// within-10 (K.OA.*) AND within-20 (1.OA.*); groep 4 = within-100 (2.NBT.*). The title range
// shows the deck's ACTUAL ceiling (tot 10 / tot 20 / tot 100), derived from the standard.
const RANGE_BY_STANDARD = {
  'K.OA.A.1': 'tot 10', 'K.OA.A.2': 'tot 10', 'K.OA.A.4': 'tot 10', 'K.CC.B.5': 'tot 10', 'K.CC.C.6': 'tot 10',
  '1.OA.C.6': 'tot 20', '1.OA.D.8': 'tot 20', '1.OA.A.1': 'tot 20', '1.OA.D.7': 'tot 20', '1.NBT.C.4': 'tot 20',
  '2.OA.B.2': 'tot 20', '2.NBT.B.5': 'tot 100', '2.NBT.A.1': 'tot 100',
};
// fall back to the band ceiling when no standard. groep-3 → tot 20 (band ceiling), groep-4 → tot 100.
const RANGE_BY_LEVEL = { 'kleuters': '', 'groep-3': 'tot 20', 'groep-4': 'tot 100' };

// types that carry a "tot N" range (numeric)
const NUMERIC_TYPES = new Set(['addition', 'subtraction', 'math-puzzle']);

// --- per-type op + per-mode qualifier (native nl; authored by the nl keyword ensemble) ----
const TYPE_MAP = {
  addition:        { op: 'Optellen', qual: { 'image-image': 'met plaatjes', 'image-number': 'met plaatjes en getallen', 'find-addend': 'met ontbrekend getal', mixed: '' } },
  subtraction:     { op: 'Aftrekken', qual: { 'cross-out': 'met doorstrepen', 'image-number': 'met plaatjes en getallen', 'find-subtrahend': 'met ontbrekend getal', mixed: '' } },
  'math-puzzle':   { op: { addition: 'Rekenpuzzel optellen', subtraction: 'Rekenpuzzel aftrekken', mixed: 'Rekenpuzzel' }, qual: {} },
  'code-addition': { op: { 'null': 'Rekencode', 'secret-word': 'Geheim woord met rekencode' }, qual: { 'secret-word': 'kraak de code' } },
  'chart-count':   { op: 'Beelddiagram', qual: {} },
  'more-less':     { op: 'Meer of minder', qual: { 'check-cross': 'kruis aan', 'image-image': 'met plaatjes', 'image-number': 'met plaatjes en getallen' } },
  'find-and-count':{ op: { 'hidden-object': 'Zoek en tel', 'letter-spotting': 'Zoek de letter' }, qual: {} },
  'big-small':     { op: { findBig: 'Groot en klein', orderAsc: 'Ordenen op grootte' }, qual: {} },
  'grid-match':    { op: 'Beeldrooster', qual: {} },
  'missing-pieces':{ op: 'Ontbrekend stukje', qual: { 'one-missing': 'één stukje weg', 'two-missing': 'twee stukjes weg' } },
  'shadow-match':  { op: { 'find-shadow': 'Zoek de schaduw', 'make-whole': 'Maak het geheel' }, qual: {} },
  sudoku:          { op: 'Beeldsudoku', qual: { easy: 'makkelijk', medium: 'gemiddeld' } },
  'find-objects':  { op: { 'i-spy': 'Ik zie, ik zie', 'find-odd': 'Zoek de vreemde eend' }, qual: {} },
  'odd-one-out':   { op: 'Welke past niet?', qual: {} },
  bingo:           { op: 'Beeldbingo', qual: {} },
  'pattern-train': { op: { 'null': 'AB-patroon', aab: 'AAB-patroon', abb: 'ABB-patroon', aabb: 'AABB-patroon', abc: 'ABC-patroon' }, qual: {} },
  'pattern-worksheet': { op: 'Patroon', qual: {} },
  'picture-path':  { op: 'Beelddoolhof', qual: { 'choose-path': 'kies de goede weg', 'classic-maze': 'klassiek doolhof' } },
  'picture-trail': { op: 'Beelddoolhof', qual: {} },
  'picture-sort':  { op: 'Plaatjes sorteren', qual: {} },
  // literacy [X] tokens re-keyed to the 2026-06-12 nl literacy harvest (attested demand;
  // honest-fit gated): Alfabet (Minipret), Beginletters (juf-sites), Woordjes lezen (VLL
  // ecosystem), Ontbrekende letters (taal-oefenen.nl category), Husselwoorden (Wiesewijs/
  // taal-oefenen/Meester Maarten), Kruiswoordpuzzel + honest "met plaatjes" distinguisher.
  'alphabet-train':{ op: 'Alfabet', qual: {} },
  matching:        { op: { letter: 'Beginletters', name: 'Woordjes lezen' }, qual: {} },
  prepositions:    { op: 'Voorzetsels', qual: { fillin: 'invullen', multiplechoice: 'meerkeuze' } },
  'word-guess':    { op: 'Ontbrekende letters', qual: { 'null': 'oefenmix', easy: 'korte woorden', normal: 'langere woorden' } },
  'word-scramble': { op: 'Husselwoorden', qual: { easy: 'korte woorden', normal: 'langere woorden' } },
  wordsearch:      { op: 'Woordzoeker', qual: {} },
  crossword:       { op: 'Kruiswoordpuzzel', qual: { 'null': 'met plaatjes' } },
  'treasure-hunt': { op: 'Schattenjacht', qual: { 'cardinal-arrows': 'met pijlen', compass: 'met kompas' } },
};

const META_FLAVOR = {
  addition: 'reken uit en schrijf het antwoord', subtraction: 'reken het verschil uit en schrijf het antwoord',
  'math-puzzle': 'los de rekenpuzzel op en vul het juiste getal in', 'code-addition': 'kraak de code en schrijf het getal',
  'chart-count': 'tel en kleur het diagram in', 'more-less': 'vergelijk de hoeveelheden en kies meer of minder',
  'find-and-count': 'zoek de plaatjes op en tel ze', 'big-small': 'vergelijk de groottes en orden ze',
  'grid-match': 'vul het beeldrooster in', 'missing-pieces': 'zoek het stukje dat ontbreekt',
  'shadow-match': 'verbind het plaatje met de juiste schaduw', sudoku: 'vul de sudoku in met het juiste plaatje',
  'find-objects': 'zoek de dingen in het plaatje', 'odd-one-out': 'kies het plaatje dat er niet bij hoort',
  bingo: 'speel beeldbingo en markeer het juiste vakje', 'pattern-train': 'maak het patroon af met het juiste plaatje',
  'pattern-worksheet': 'maak het patroon af', 'picture-path': 'volg de goede weg door het doolhof',
  'picture-trail': 'volg de goede weg door het doolhof', 'picture-sort': 'sorteer de plaatjes in de juiste groep',
  'alphabet-train': 'zet de letters van het alfabet in de juiste volgorde', matching: 'trek een lijn tussen het plaatje en de letter of het woord',
  prepositions: 'kies het juiste voorzetsel bij het plaatje', 'word-guess': 'vul de ontbrekende letters in en maak het woord af',
  'word-scramble': 'hussel de letters terug tot het goede woord', wordsearch: 'zoek de woorden in het letterrooster',
  crossword: 'vul de kruiswoordpuzzel in met de woorden bij de plaatjes', 'treasure-hunt': 'volg de aanwijzingen naar de schat',
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
      return (e && e.name && e.name.nl) ? e.name.nl : k;
    }).join(' en ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.nl) return entry.name.nl;
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

function buildTitle(op, range, qual, theme) {
  // Protected trio TAIL — never shrunk; accept overflow. Everything else always kept. No no-carry slot.
  return `Werkbladen ${op}${range ? ' ' + range : ''}${qual ? ' ' + qual : ''} – ${theme}${TAIL}`;
}
function buildMeta(op, range, qual, theme, flavor) {
  const lead = `${op}${range ? ' ' + range : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Gratis werkbladen om te printen (PDF).';
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
  const data = JSON.parse(fs.readFileSync(NL_JSON, 'utf8'));
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
    const theme = themeDisplay(c.theme, themeAxis);
    const qual = resolveQual(map, c.mode);
    const flavor = META_FLAVOR[type] || '';
    recs.push({ l, type, op, range, qual, theme, flavor, identity: [op, range, qual, theme].join('|') });
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
    const newTitle = buildTitle(r.op, r.range, r.qual, r.theme);
    const newMeta = buildMeta(r.op, r.range, r.qual, r.theme, r.flavor);
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
    fs.writeFileSync(NL_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`\nWROTE ${NL_JSON} (title + metaDescription only).`);
  } else {
    console.log('\nDRY-RUN: nothing written.');
  }
}
main();
