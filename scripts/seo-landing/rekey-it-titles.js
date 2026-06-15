#!/usr/bin/env node
/**
 * rekey-it-titles.js — re-keyword the SERP title-tag + meta description of Italian (it) SEO landing
 * pages, per the LOCKED it keyword pattern (it ledger-lock + google.it harvest 2026-06-15).
 *
 * Cloned from rekey-fr-titles.js, adapted to RANGE-LED (the de logic): arithmetic types carry
 * "entro il N" derived from the band; everything else is Pattern-B (no range). Two-pass (resolve
 * op/range/noCarry/qual/theme + identity → ordinal-dedup → build + mutate), op-as-string-or-object,
 * themeDisplay "-vs-" split with " e ", --type=/--all/--dry-run. DATA-ONLY: rewrites ONLY `title` +
 * `metaDescription` (the route renders `<title> = l.title || l.h1`, so the existing H1 prose is the
 * fallback — re-keying upgrades the SERP title without touching the on-page H1/body/coordinate).
 *
 * LOCKED it TITLE PATTERNS (google.it harvest CONFIRMED: PianetaBambini/PortaleBambini/Fantavolando):
 *   Numeric/arithmetic (RANGE-LED): `[op] entro il [N] [senza cambio] [qual] – [Tema] | da stampare PDF`
 *   Other (readiness/literacy, Pattern-B): `[op] [qual] – [Tema] | schede da stampare PDF gratis`
 *   - Head noun = "Schede di …" (arithmetic). N from band: infanzia→10 / classe-prima→20 / classe-seconda→100.
 *   - no-carry qual = "senza cambio" (harvest-dominant; NOT "senza riporto") — honest-fit-gated to
 *     within-band no-regroup addition/subtraction direct modes only (not find-addend/find-subtrahend).
 *   - Theme is ALWAYS a bare apposition after " – " (no runtime contraction; it gender lives in it-themes).
 *   - Protected tail "da stampare PDF"; never shrunk; accept overflow. NEVER drop op, range, noCarry, qual, theme.
 *
 * CLI: --type=<type> | --all | --dry-run
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const IT_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'it.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const META_CAP = 170;
const TAIL_NUMERIC = ' | da stampare PDF';
const TAIL_OTHER = ' | schede da stampare PDF gratis';

// RANGE-LED: arithmetic types carry "entro il N" from the band (the de bis-N analog).
const BAND_RANGE = { infanzia: 10, 'classe-prima': 20, 'classe-seconda': 100 };
const NUMERIC_TYPES = new Set(['addition', 'subtraction', 'math-puzzle', 'code-addition', 'math-worksheet']);
// "senza cambio" honest only on within-band (infanzia/classe-prima) no-regroup addition/subtraction direct modes.
const NO_CARRY_TYPES = new Set(['addition', 'subtraction']);
const NO_CARRY_BANDS = new Set(['infanzia', 'classe-prima']);
const NO_CARRY_EXCLUDED_MODES = new Set(['find-addend', 'find-subtrahend']);

// --- per-type op + per-mode qualifier (google.it harvest 2026-06-15; native-SEO agent finalized) ----
const TYPE_MAP = {
  addition: { op: 'Schede di addizioni', qual: { 'image-image': 'con le immagini', 'image-number': 'con immagini e numeri', 'find-addend': 'con il numero mancante', mixed: '' } },
  subtraction: { op: 'Schede di sottrazioni', qual: { 'cross-out': 'da barrare', 'image-number': 'con immagini e numeri', 'find-subtrahend': 'con il numero mancante', mixed: '' } },
  'math-puzzle': { op: 'Schede di puzzle matematici', qual: { addition: 'con le addizioni', subtraction: 'con le sottrazioni', mixed: 'con addizioni e sottrazioni' } },
  'code-addition': { op: 'Schede di addizioni codificate', qual: { 'secret-word': 'con la parola segreta' } },
  'math-worksheet': { op: 'Schede di calcoli', qual: {} }, // Part 2 (standard-bearing)
  'chart-count': { op: 'Conta e completa il diagramma', qual: {} }, // non-arithmetic (no range), K.MD.B.3
  'more-less': { op: 'Di più o di meno', qual: {} },
  'big-small': { op: { findBig: 'Grande o piccolo', orderAsc: 'Ordina dal più piccolo' }, qual: {} },
  'grid-match': { op: 'Abbinamento in griglia', qual: {} },
  'shadow-match': { op: { 'find-shadow': 'Abbina le ombre', 'make-whole': 'Completa la figura' }, qual: {} },
  'missing-pieces': { op: 'Trova il pezzo mancante', qual: { 'two-missing': 'con due pezzi' } },
  'find-objects': { op: 'Trova le figure spaiate', qual: {} }, // DISTINCT from odd-one-out "Trova l'intruso"
  'find-and-count': { op: 'Trova le lettere iniziali', qual: {} },
  'pattern-train': { op: { 'null': 'Il treno dei modelli AB', aab: 'Il treno dei modelli AAB', abb: 'Il treno dei modelli ABB', aabb: 'Il treno dei modelli AABB', abc: 'Il treno dei modelli ABC' }, qual: {} },
  'pattern-worksheet': { op: 'Continua lo schema', qual: {} },
  'picture-path': { op: 'Labirinti', qual: {} },
  'picture-trail': { op: 'Labirinti', qual: {} },
  'picture-sort': { op: 'Ordina le immagini', qual: {} },
  'odd-one-out': { op: "Trova l'intruso", qual: { 'cross-theme': 'a tema misto' } },
  sudoku: { op: 'Sudoku illustrato', qual: { easy: 'facile', medium: 'medio' } },
  'alphabet-train': { op: "Il treno dell'alfabeto", qual: {} },
  matching: { op: 'Abbina le lettere', qual: {} },
  prepositions: { op: { fillin: 'Scrivi le preposizioni', multiplechoice: 'Scegli le preposizioni' }, qual: {} },
  'word-guess': { op: 'Completa le parole', qual: { easy: 'facili', normal: '' } },
  'word-scramble': { op: 'Anagrammi', qual: { easy: 'facili', normal: '' } },
  wordsearch: { op: 'Crucipuzzle', qual: {} },
  crossword: { op: 'Cruciverba', qual: {} },
  bingo: { op: 'Tombola illustrata', qual: {} },        // Part 2
  'treasure-hunt': { op: 'Caccia al tesoro', qual: {} }, // Part 2
};

const META_FLAVOR = {
  addition: 'conta e scrivi il risultato delle addizioni', subtraction: 'conta, barra e scrivi quanti ne restano',
  'math-puzzle': 'risolvi le operazioni e completa il puzzle', 'code-addition': 'risolvi le addizioni e decifra il codice',
  'math-worksheet': 'trova il valore delle immagini e calcola',
  'chart-count': 'conta gli oggetti e completa il diagramma', 'more-less': 'osserva e indica dove ce ne sono di più o di meno',
  'big-small': 'osserva e trova il più grande e il più piccolo', 'grid-match': 'abbina le immagini uguali nella griglia',
  'shadow-match': 'collega ogni immagine alla sua ombra', 'missing-pieces': 'osserva e trova il pezzo che manca',
  'find-objects': "osserva con attenzione e trova le figure spaiate", 'find-and-count': 'trova e cerchia le lettere iniziali giuste',
  'pattern-train': 'osserva la sequenza e completa il treno', 'pattern-worksheet': "continua lo schema disegnando l'immagine giusta",
  'picture-path': "segui il labirinto fino all'uscita", 'picture-trail': "segui il labirinto fino all'uscita",
  'picture-sort': 'osserva e ordina le immagini nei gruppi giusti', 'odd-one-out': "osserva ogni riga e trova l'intruso",
  sudoku: 'completa il sudoku con le immagini giuste', 'alphabet-train': "metti le lettere in ordine e completa l'alfabeto",
  matching: 'collega ogni lettera alla sua immagine', prepositions: 'osserva e scrivi la preposizione giusta',
  'word-guess': "guarda l'immagine e completa la parola", 'word-scramble': 'rimetti in ordine le lettere e scopri la parola',
  wordsearch: 'trova e cerchia tutte le parole nascoste', crossword: 'risolvi il cruciverba con le immagini',
  bingo: 'gioca a tombola e copri le immagini giuste', 'treasure-hunt': 'segui il percorso e trova il tesoro',
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
      return (e && e.name && e.name.it) ? e.name.it : k;
    }).join(' e ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.it) return entry.name.it;
  return themeKey;
}
function resolveOp(map, mode) {
  if (typeof map.op === 'function') return map.op(mode);
  if (typeof map.op === 'object') { const k = (mode === null ? 'null' : mode); return map.op[k] || map.op['null'] || ''; }
  return map.op;
}
function resolveQual(map, mode) { const k = (mode === null ? 'null' : mode); return (map.qual && map.qual[k]) || ''; }

// RANGE-LED: arithmetic types carry "entro il N" from the band; others none.
function rangeFor(type, level) {
  if (!NUMERIC_TYPES.has(type)) return '';
  const n = BAND_RANGE[level];
  return n ? 'entro il ' + n : '';
}
// "senza cambio" (no-carry) — honest only on within-band no-regroup addition/subtraction direct modes.
function noCarryFor(type, mode, level) {
  if (!NO_CARRY_TYPES.has(type)) return '';
  if (!NO_CARRY_BANDS.has(level)) return '';
  if (NO_CARRY_EXCLUDED_MODES.has(mode)) return '';
  return 'senza cambio';
}

function buildTitle(type, op, range, noCarry, qual, theme) {
  const numeric = NUMERIC_TYPES.has(type);
  const head = `${op}${range ? ' ' + range : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''}`;
  return `${head} – ${theme}${numeric ? TAIL_NUMERIC : TAIL_OTHER}`;
}
function buildMeta(op, range, noCarry, qual, theme, flavor) {
  const lead = `${op}${range ? ' ' + range : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Schede gratis da stampare in PDF.';
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
  const data = JSON.parse(fs.readFileSync(IT_JSON, 'utf8'));
  const selected = data.landings.filter((l) => args.all ? true : l.coordinate.type === args.type);
  if (selected.length === 0) { console.error(`No landings matched ${args.all ? '--all' : '--type=' + args.type}.`); process.exit(1); }

  const recs = [];
  for (const l of selected) {
    const c = l.coordinate;
    const type = c.type;
    const map = TYPE_MAP[type];
    if (!map) { console.warn(`WARN: no TYPE_MAP entry for type "${type}" (slug ${l.slug}) — skipped.`); continue; }
    const op = resolveOp(map, c.mode);
    const range = rangeFor(type, c.level);
    const noCarry = noCarryFor(type, c.mode, c.level);
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
    if (samples.length < 10) samples.push({ slug: r.l.slug, type: r.type, oldTitle: r.l.title, newTitle, newMeta });
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
  for (const s of samples.slice(0, args.dryRun ? 8 : 4)) {
    console.log(`[${s.type}] ${s.slug}`);
    console.log(`  TITLE (${s.newTitle.length}): ${s.newTitle}`);
    console.log(`  META  (${s.newMeta.length}): ${s.newMeta}`);
  }
  if (!args.dryRun) {
    fs.writeFileSync(IT_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`\nWROTE ${IT_JSON} (title + metaDescription only).`);
  } else {
    console.log('\nDRY-RUN: nothing written.');
  }
}

main();
