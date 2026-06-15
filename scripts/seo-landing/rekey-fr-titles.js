#!/usr/bin/env node
/**
 * rekey-fr-titles.js — re-keyword the SERP title-tag + meta description of French (fr) SEO landing
 * pages, per the LOCKED fr keyword pattern (fr ledger-lock 2026-06-15, google.fr harvest).
 *
 * Cloned from rekey-no-titles.js. GRADE-LED (maternelle = no grade / CP·CE1 = grade). Two-pass
 * (resolve op/grade/noCarry/qual/theme + identity → ordinal-dedup → build + mutate), op-as-
 * function/object, themeDisplay "-vs-" split with " et " + null guard, --type=/--all/--dry-run.
 * DATA-ONLY: rewrites ONLY `title` + `metaDescription`.
 *
 * LOCKED fr TITLE PATTERNS:
 *   Grade-led (standard-bearing CP/CE1):
 *     [Token] [grade] [sans retenue] [qual] – [Thème] | à imprimer PDF gratuit
 *   Readiness (maternelle — NO grade per ledger Pattern B):
 *     [Token] [qual] – [Thème] | fiches à imprimer PDF gratuit
 *   - Head noun = Fiches (print-intent). Elision baked into the static op token (Fiches d'addition);
 *     the theme is ALWAYS a bare apposition after " – " (zero runtime French contraction).
 *   - no-carry qual = "sans retenue" (BOTH addition + subtraction) — honest-fit-gated to the
 *     within-10 no-regroup band + direct modes only.
 *   - Grade label from coordinate.level (cp→CP / ce1→CE1; maternelle→no grade).
 *   - Protected cluster "à imprimer PDF gratuit"; never shrunk past "à imprimer"; accept overflow.
 *   - NEVER drop op, grade, noCarry, qual, or theme.
 *
 * CLI: --type=<type> | --all | --dry-run
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'fr.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const META_CAP = 170;
const TAIL_NUMERIC = ' | à imprimer PDF gratuit';
const TAIL_OTHER = ' | fiches à imprimer PDF gratuit';

const GRADE_LABEL = { cp: 'CP', ce1: 'CE1' }; // maternelle → no grade (Pattern B)

const NUMERIC_TYPES = new Set(['addition', 'subtraction', 'math-puzzle', 'math-worksheet']);
// "sans retenue" honest only on the within-10 no-regroup band + direct modes.
const WITHIN_10_STANDARDS = new Set(['K.OA.A.1', 'K.OA.A.2', 'K.OA.A.4', 'K.CC.B.5', 'K.CC.C.6']);
const NO_CARRY_EXCLUDED_MODES = new Set(['find-addend', 'find-subtrahend']);
const NO_CARRY_EXCLUDED_TYPES = new Set(['math-puzzle', 'math-worksheet']);

// --- per-type op + per-mode qualifier (fr keyword harvest 2026-06-15; google.fr attested) ----
const TYPE_MAP = {
  addition:        { op: "Fiches d'addition", qual: { 'image-image': 'avec images', 'image-number': 'avec images et nombres', 'find-addend': 'à trou', mixed: '' } },
  subtraction:     { op: 'Fiches de soustraction', qual: { 'cross-out': 'à barrer', 'image-number': 'avec images et nombres', 'find-subtrahend': 'à trou', mixed: '' } },
  'math-puzzle':   { op: 'Fiches de calcul', qual: {} },
  'math-worksheet':{ op: 'Fiches de mathématiques', qual: {} },
  'code-addition': { op: { 'null': 'Additions codées', 'secret-word': 'Mot secret en code' }, qual: {} },
  'chart-count':   { op: 'Graphiques', qual: {} }, // operator-chosen (Graphique en barres)
  'more-less':     { op: 'Plus ou moins', qual: { 'check-cross': 'à cocher', 'image-image': 'avec images', 'image-number': 'avec images et nombres' } },
  'find-and-count':{ op: { 'hidden-object': 'Cherche et compte', 'letter-spotting': 'Trouve la lettre' }, qual: {} },
  'big-small':     { op: { findBig: 'Grand ou petit', orderAsc: 'Ranger par taille' }, qual: {} },
  'grid-match':    { op: 'Associer les images', qual: {} },
  'missing-pieces':{ op: 'Pièce manquante', qual: { 'one-missing': 'une pièce manque', 'two-missing': 'deux pièces manquent' } },
  'shadow-match':  { op: { 'find-shadow': 'Les ombres', 'make-whole': "Compléter l'image" }, qual: {} },
  sudoku:          { op: 'Sudoku des images', qual: { easy: 'facile', medium: 'moyen' } },
  'find-objects':  { op: { 'i-spy': 'Cherche et trouve', 'find-odd': 'Trouve la différence' }, qual: {} },
  'odd-one-out':   { op: "L'intrus", qual: {} },
  bingo:           { op: 'Loto des images', qual: {} },
  'pattern-train': { op: { 'null': 'Algorithme AB', aab: 'Algorithme AAB', abb: 'Algorithme ABB', aabb: 'Algorithme AABB', abc: 'Algorithme ABC' }, qual: {} },
  'pattern-worksheet': { op: 'Suites logiques', qual: {} },
  'picture-path':  { op: 'Labyrinthe', qual: { 'choose-path': 'choisis le bon chemin', 'classic-maze': 'labyrinthe classique' } },
  'picture-trail': { op: 'Labyrinthe', qual: {} },
  'picture-sort':  { op: 'Trier les images', qual: {} },
  'alphabet-train':{ op: 'Ordre alphabétique', qual: {} },
  matching:        { op: { letter: 'Le son initial', name: 'Lire le mot' }, qual: {} },
  prepositions:    { op: 'Les positions', qual: { fillin: 'à compléter', multiplechoice: 'à cocher' } },
  'word-guess':    { op: 'Lettres manquantes', qual: { 'null': '', easy: 'mots courts', normal: 'mots longs' } },
  'word-scramble': { op: 'Remettre les lettres', qual: { easy: 'mots courts', normal: 'mots longs' } },
  wordsearch:      { op: 'Mots mêlés', qual: {} },
  crossword:       { op: 'Mots croisés', qual: {} },
  'treasure-hunt': { op: 'Chasse au trésor', qual: { 'cardinal-arrows': 'avec flèches', compass: 'avec boussole' } },
};

const META_FLAVOR = {
  addition: 'compte et écris le résultat des additions', subtraction: 'compte et écris le résultat des soustractions',
  'math-puzzle': 'résous le calcul et écris le bon nombre', 'code-addition': 'déchiffre le code et écris le nombre',
  'math-worksheet': "trouve la valeur des images et calcule",
  'chart-count': 'compte et complète le graphique en barres', 'more-less': 'compare les quantités et choisis le plus ou le moins',
  'find-and-count': 'cherche les objets sur l\'image et compte-les', 'big-small': 'compare les tailles et range-les',
  'grid-match': 'associe chaque image à la bonne place', 'missing-pieces': 'trouve la pièce qui manque',
  'shadow-match': 'relie chaque image à la bonne ombre', sudoku: 'complète la grille avec la bonne image',
  'find-objects': 'cherche les objets cachés dans la grande image', 'odd-one-out': "choisis l'image qui ne va pas avec les autres",
  bingo: 'joue au loto et marque la bonne case', 'pattern-train': "complète l'algorithme avec la bonne image",
  'pattern-worksheet': "complète la suite logique", 'picture-path': 'trouve le chemin dans le labyrinthe',
  'picture-trail': 'trouve le chemin dans le labyrinthe', 'picture-sort': 'trie les images dans le bon groupe',
  'alphabet-train': "remets les lettres dans l'ordre alphabétique", matching: "relie chaque image à la bonne lettre ou au bon mot",
  prepositions: "choisis la bonne position pour l'image", 'word-guess': 'écris les lettres qui manquent et complète le mot',
  'word-scramble': "remets les lettres dans l'ordre pour former le mot", wordsearch: 'trouve les mots cachés parmi les lettres',
  crossword: 'complète les mots croisés à partir des images', 'treasure-hunt': "suis les indices jusqu'au trésor",
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
      return (e && e.name && e.name.fr) ? e.name.fr : k;
    }).join(' et ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.fr) return entry.name.fr;
  return themeKey;
}
function resolveOp(map, mode) {
  if (typeof map.op === 'function') return map.op(mode);
  if (typeof map.op === 'object') { const k = (mode === null ? 'null' : mode); return map.op[k] || map.op['null'] || ''; }
  return map.op;
}
function resolveQual(map, mode) { const k = (mode === null ? 'null' : mode); return (map.qual && map.qual[k]) || ''; }

// GRADE-LED: cp/ce1 carry the grade label (from the per-coordinate re-grade); maternelle (readiness)
// carries NO grade in the title (ledger Pattern B).
function gradeFor(type, level) {
  if (level === 'cp' || level === 'ce1') return GRADE_LABEL[level] || '';
  return '';
}
// "sans retenue" (both operations) — honest only on the within-10 no-regroup band + direct modes.
function noCarryFor(type, mode, standard) {
  if (type !== 'addition' && type !== 'subtraction') return '';
  if (NO_CARRY_EXCLUDED_TYPES.has(type)) return '';
  if (!WITHIN_10_STANDARDS.has(standard)) return '';
  if (NO_CARRY_EXCLUDED_MODES.has(mode)) return '';
  return 'sans retenue';
}

function buildTitle(type, op, grade, noCarry, qual, theme) {
  const numeric = NUMERIC_TYPES.has(type);
  const head = `${op}${grade ? ' ' + grade : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''}`;
  return `${head} – ${theme}${numeric ? TAIL_NUMERIC : TAIL_OTHER}`;
}
function buildMeta(op, grade, noCarry, qual, theme, flavor) {
  const lead = `${op}${grade ? ' ' + grade : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Fiches gratuites à imprimer au format PDF.';
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
  const data = JSON.parse(fs.readFileSync(FR_JSON, 'utf8'));
  const selected = data.landings.filter((l) => args.all ? true : l.coordinate.type === args.type);
  if (selected.length === 0) { console.error(`No landings matched ${args.all ? '--all' : '--type=' + args.type}.`); process.exit(1); }

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
    fs.writeFileSync(FR_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`\nWROTE ${FR_JSON} (title + metaDescription only).`);
  } else {
    console.log('\nDRY-RUN: nothing written.');
  }
}

main();
