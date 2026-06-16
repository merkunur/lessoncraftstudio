#!/usr/bin/env node
/**
 * rekey-fi-titles.js — re-keyword the SERP title-tag + meta description of Finnish (fi)
 * SEO landing pages, per the LOCKED fi RANGE-LED keyword pattern. [NSR-FLAG][fi] per §17.5.1.
 *
 * Cloned from rekey-sv-titles.js (the sv "0–N" range-led model). Two-pass (resolve
 * op/range/noCarry/qual/theme + identity → ordinal-dedup → build + mutate), op-as-function/object,
 * themeDisplay "-vs-" split + null guard, --type=/--all/--dry-run. DATA-ONLY: rewrites ONLY
 * `title` + `metaDescription` of frontend/content/seo-landing/fi.json. The route renders <title>
 * as `l.title || l.h1`, meta as `l.metaDescription || (first sentence of p1)`, so h1/body stay
 * theme-warm + untouched.
 *
 * LOCKED fi TITLE PATTERNS:
 *   ARITHMETIC (range-led):
 *     [Op]tehtäviä [0–N] [ilman kymmenylitystä] [qual] – [Tema] | tulostettava PDF
 *     - [Op]tehtäviä is a CLOSED COMPOUND head: Yhteenlaskutehtäviä (addition),
 *       Vähennyslaskutehtäviä (subtraction). Other numeric heads carry their own compound op.
 *     - [0–N] = the lukualue (number range) from the per-coordinate band/standard.
 *     - "ilman kymmenylitystä" = no-carry, HONEST-FIT-GATED to the within-10 band ('0–10') only,
 *       and NEVER on find-addend/find-subtrahend (no carrying concept). addition+subtraction direct.
 *   READINESS / non-arithmetic (Pattern B — NO range):
 *     [Token] [qual] – [Tema] | tulostettavia tehtäviä
 *   - en-dash range "0–N" (U+2013); en-dash " – " before theme.
 *   - TAIL is the protected format cluster (PDF + tulostettava) — never shrunk; accept overflow
 *     (Finnish compounds run long; Google indexes full, truncates display only).
 *   - NEVER drop op, range, noCarry, qual, or theme (dropping re-collapses multi-mode siblings).
 *   - Per-mode qualifiers left minimal/empty where the harvest is not yet locked — they get
 *     refined per wave; this is the working range-led skeleton.
 *
 * CLI: --type=<type> | --all | --dry-run
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FI_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'fi.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const META_CAP = 170;
const TAIL_NUMERIC = ' | tulostettava PDF';            // arithmetic format cluster
const TAIL_OTHER = ' | tulostettavia tehtäviä';        // readiness / non-arithmetic Pattern B

// grade label from coordinate.level (NOT injected into the title by default — range-led)
const GRADE_LABEL = { 'esikoulu': 'Esikoulu', '1-luokka': '1. luokka', '2-luokka': '2. luokka' };

// standard → "0–N" lukualue (HONEST-FIT; must match the deck's band)
const RANGE_BY_STANDARD = {
  'K.OA.A.1': '0–10', 'K.OA.A.2': '0–10', 'K.OA.A.4': '0–10', 'K.CC.B.5': '0–10', 'K.CC.C.6': '0–10',
  '1.OA.C.6': '0–20', '1.OA.D.8': '0–20', '1.OA.A.1': '0–20', '1.OA.D.7': '0–20', '1.NBT.C.4': '0–20',
  '2.OA.B.2': '0–20', '2.NBT.B.5': '0–100', '2.NBT.A.1': '0–100',
};
// fall back to band when no standard (readiness numeric is rare; most numeric carries a standard)
const RANGE_BY_LEVEL = { 'esikoulu': '0–10', '1-luokka': '0–20', '2-luokka': '0–100' };

// types that carry a "0–N" range (numeric / arithmetic)
const NUMERIC_TYPES = new Set(['addition', 'subtraction', 'math-puzzle', 'math-worksheet']);
// modes that have NO carrying concept → never take "ilman kymmenylitystä" (honest-fit floor)
const NO_CARRY_FORBIDDEN_MODES = new Set(['find-addend', 'find-subtrahend']);
// no-carry term only targets pluss/minus searches; symbol-math types excluded
const NO_CARRY_EXCLUDED_TYPES = new Set(['math-puzzle', 'math-worksheet']);

// --- per-type op + per-mode qualifier ----
// Heads sourced from topics-taxonomy.json axes.exercise-type.<key>.name.fi, then folded into the
// arithmetic closed-compound where the locked pattern requires it ([Op]tehtäviä). [NSR-FLAG][fi].
const TYPE_MAP = {
  // arithmetic — closed-compound head [Op]tehtäviä
  addition:        { op: 'Yhteenlaskutehtäviä', qual: {} },
  subtraction:     { op: 'Vähennyslaskutehtäviä', qual: {} },
  'math-puzzle':   { op: { addition: 'Matematiikkapulma yhteenlasku', subtraction: 'Matematiikkapulma vähennyslasku', mixed: 'Matematiikkapulma' }, qual: {} },
  'math-worksheet':{ op: 'Matematiikkatehtävä', qual: {} },
  'code-addition': { op: { 'null': 'Koodattu yhteenlasku', 'secret-word': 'Salasana koodilla' }, qual: {} },
  // numeracy readiness / data
  'chart-count':   { op: 'Laske kaaviossa', qual: {} },
  'more-less':     { op: 'Enemmän vai vähemmän', qual: {} },
  'find-and-count':{ op: { 'hidden-object': 'Etsi ja laske', 'letter-spotting': 'Etsi kirjain' }, qual: {} },
  'big-small':     { op: { findBig: 'Iso vai pieni', orderAsc: 'Järjestä koon mukaan' }, qual: {} },
  // visual / logic readiness
  'grid-match':    { op: 'Ruudukkoyhdistys', qual: {} },
  'missing-pieces':{ op: 'Puuttuvat palat', qual: {} },
  'shadow-match':  { op: 'Yhdistä varjot', qual: {} },
  sudoku:          { op: 'Kuvasudoku', qual: {} },
  'find-objects':  { op: { 'i-spy': 'Etsi esineet', 'find-odd': 'Etsi erilainen' }, qual: {} },
  'odd-one-out':   { op: 'Mikä ei kuulu joukkoon', qual: {} },
  bingo:           { op: 'Kuvabingo', qual: {} },
  'pattern-train': { op: { 'null': 'AB-kuvio', aab: 'AAB-kuvio', abb: 'ABB-kuvio', aabb: 'AABB-kuvio', abc: 'ABC-kuvio' }, qual: {} },
  'pattern-worksheet': { op: 'Kuviotehtävä', qual: {} },
  'picture-path':  { op: 'Kuvapolku', qual: {} },
  'picture-trail': { op: 'Kuvapolku', qual: {} },
  'picture-sort':  { op: 'Lajittele kuvat', qual: {} },
  // literacy
  'alphabet-train':{ op: 'Aakkosjuna', qual: {} },
  matching:        { op: { letter: 'Alkuäänne ja kirjain', name: 'Lue ja yhdistä' }, qual: {} },
  prepositions:    { op: 'Prepositiot', qual: {} },
  'word-guess':    { op: 'Arvaa sana', qual: {} },
  'word-scramble': { op: 'Kirjainsekoitus', qual: {} },
  wordsearch:      { op: 'Sanahaku', qual: {} },
  crossword:       { op: 'Kuvaristikko', qual: {} },
  'treasure-hunt': { op: 'Aarteenetsintä', qual: {} },
};

const META_FLAVOR = {
  addition: 'laske yhteen ja kirjoita vastaus', subtraction: 'laske vähennys ja kirjoita vastaus',
  'math-puzzle': 'ratkaise pulma ja kirjoita oikea luku', 'code-addition': 'ratkaise koodi ja kirjoita luku',
  'math-worksheet': 'laske kuvien arvot ja ratkaise tehtävä',
  'chart-count': 'laske ja täytä kaavio', 'more-less': 'vertaile määriä ja valitse enemmän tai vähemmän',
  'find-and-count': 'etsi esineet kuvasta ja laske ne', 'big-small': 'vertaile kokoja ja järjestä ne',
  'grid-match': 'aseta kuvapalat oikeille paikoille', 'missing-pieces': 'etsi puuttuva pala',
  'shadow-match': 'yhdistä kuva oikeaan varjoon', sudoku: 'täytä sudoku oikealla kuvalla',
  'find-objects': 'etsi esineet isosta kuvasta', 'odd-one-out': 'valitse kuva, joka ei kuulu joukkoon',
  bingo: 'pelaa bingoa ja merkitse oikea ruutu', 'pattern-train': 'jatka kuviota oikealla kuvalla',
  'pattern-worksheet': 'täydennä kuvio', 'picture-path': 'etsi tie sokkelon läpi',
  'picture-trail': 'etsi tie sokkelon läpi', 'picture-sort': 'lajittele kuvat oikeisiin ryhmiin',
  'alphabet-train': 'aseta kirjaimet aakkosjärjestykseen', matching: 'piirrä viiva kuvan ja kirjaimen tai sanan välille',
  prepositions: 'valitse oikea sijaintisana kuvaan', 'word-guess': 'kirjoita puuttuvat kirjaimet ja täydennä sana',
  'word-scramble': 'muodosta sana sekoitetuista kirjaimista', wordsearch: 'etsi sanat kirjainten joukosta',
  crossword: 'ratkaise ristikko kuvien sanoilla', 'treasure-hunt': 'seuraa vihjeitä aarteelle',
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
      return (e && e.name && e.name.fi) ? e.name.fi : k;
    }).join(' ja ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.fi) return entry.name.fi;
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
// "ilman kymmenylitystä" honest-fit: within-10 band only, never on find-addend/find-subtrahend,
// never on symbol-math types (math-puzzle/math-worksheet).
function noCarry(type, mode, range) {
  if (!NUMERIC_TYPES.has(type)) return false;
  if (NO_CARRY_EXCLUDED_TYPES.has(type)) return false;
  if (NO_CARRY_FORBIDDEN_MODES.has(mode)) return false;
  return range === '0–10';
}

function buildTitle(type, op, range, nc, qual, theme) {
  const numeric = NUMERIC_TYPES.has(type);
  const head = `${op}${range ? ' ' + range : ''}${nc ? ' ilman kymmenylitystä' : ''}${qual ? ' ' + qual : ''}`;
  return `${head} – ${theme}${numeric ? TAIL_NUMERIC : TAIL_OTHER}`;
}
function buildMeta(op, range, nc, qual, theme, flavor) {
  const lead = `${op}${range ? ' ' + range : ''}${nc ? ' ilman kymmenylitystä' : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Ilmaisia tulostettavia tehtäviä (PDF).';
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
  const data = JSON.parse(fs.readFileSync(FI_JSON, 'utf8'));
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
    const newTitle = buildTitle(r.type, r.op, r.range, r.nc, r.qual, r.theme);
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
    fs.writeFileSync(FI_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`\nWROTE ${FI_JSON} (title + metaDescription only).`);
  } else {
    console.log('\nDRY-RUN: nothing written.');
  }
}
main();
