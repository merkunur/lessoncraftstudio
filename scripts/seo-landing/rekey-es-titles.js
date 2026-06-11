#!/usr/bin/env node
/**
 * rekey-es-titles.js — re-keyword the SERP title-tag + meta description of
 * Mexican-Spanish (es-MX) SEO landing pages, per the LOCKED keyword pattern.
 *
 * DATA-ONLY. Rewrites ONLY the `title` and `metaDescription` fields of
 * frontend/content/seo-landing/es.json. It does NOT touch h1, p1/p2/p3,
 * coordinate, standard, slug, carousel, eyebrow, slotTokens, strand,
 * canonicalDeckSlug, variantShape, or any other field.
 *
 * The Next route renders <title> as `l.title || l.h1` and meta as
 * `l.metaDescription || (first sentence of p1)`. So writing `title` sets the
 * SERP title-tag; `h1` (the on-page heading) MUST stay untouched (theme-warm).
 *
 * LOCKED TITLE PATTERN:
 *   [operación] para [Grado] [qualifier] – [Tema] | para imprimir PDF
 *   - en-dash " – " before theme, " | " before format suffix
 *   - length-aware (cap ~65 chars): try " | para imprimir PDF" → " | PDF"
 *     → drop suffix → drop qualifier. Never drop theme or grade.
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
const ES_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'es.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const TITLE_CAP = 65;
const META_CAP = 170;

// --- grade label from coordinate.level -------------------------------------
const GRADE_LABEL = {
  'preescolar': 'Preescolar',
  'primer-grado': 'Primer Grado',
  'segundo-grado': 'Segundo Grado',
};

// --- per-type op + qualifier resolver --------------------------------------
// qualifier is lowercase (a descriptor, not title-case). '' = none.
// Each entry: { op, qual(coord, standard) } — qual may depend on standard/level.
const TYPE_MAP = {
  'addition':          { op: 'Sumas',                     qual: (c, s) => ({ 'find-addend': 'con número faltante', 'image-image': 'con dibujos', 'image-number': 'con dibujos y números', 'mixed': 'sin llevar' }[c.mode] || (s === 'K.OA.A.2' ? 'sin llevar' : '')) },
  'subtraction':       { op: 'Restas',                    qual: (c, s) => ({ 'find-subtrahend': 'con número faltante', 'cross-out': 'tacha y cuenta', 'image-number': 'con dibujos y números', 'mixed': 'sin llevar' }[c.mode] || (s === 'K.OA.A.2' ? 'sin llevar' : '')) },
  'math-puzzle':       { op: 'Sumas y Restas',            qual: (c)    => (c.level === 'segundo-grado' ? 'hasta 100' : 'hasta 20') },
  'math-worksheet':    { op: 'Operaciones',               qual: () => '' },
  'chart-count':       { op: 'Contar en Gráfica',         qual: () => '' },
  // literacy: op conveys the activity; "lenguaje y comunicación" (23ch) overflows the title → goes in the meta instead.
  'word-scramble':     { op: 'Letras Revueltas',          qual: () => '' },
  'wordsearch':        { op: 'Sopa de Letras',            qual: () => '' },
  'word-guess':        { op: 'Escribe la Palabra',        qual: () => '' },
  'crossword':         { op: 'Crucigrama',                qual: () => '' },
  'matching':          { op: (c) => (c.mode === 'letter' ? 'Une la Letra Inicial' : 'Une la Palabra'), qual: () => '' },
  'prepositions':      { op: 'Preposiciones',             qual: () => '' },
  'pattern-train':     { op: (c) => 'Patrón ' + ({ 'aab': 'AAB', 'abb': 'ABB', 'aabb': 'AABB', 'abc': 'ABC' }[c.mode] || 'AB'), qual: () => '' },
  'pattern-worksheet': { op: 'Patrones',                  qual: () => 'para imprimir' },
  'big-small':         { op: (c) => (c.mode === 'orderAsc' ? 'Ordena por Tamaño' : '¿Cuál es Más Grande?'), qual: () => '' },
  'more-less':         { op: 'Más y Menos',               qual: () => '' },
  'grid-match':        { op: 'Completa la Cuadrícula',    qual: () => '' },
  'missing-pieces':    { op: 'Piezas que Faltan',         qual: () => '' },
  'shadow-match':      { op: 'Une las Sombras',           qual: () => '' },
  'find-objects':      { op: 'Busca los Objetos',         qual: () => '' },
  'odd-one-out':       { op: '¿Cuál No Pertenece?',       qual: () => '' },
  'sudoku':            { op: 'Sudoku de Imágenes',        qual: () => '' },
  'bingo':             { op: 'Lotería de Imágenes',       qual: () => '' },
  'alphabet-train':    { op: 'Tren del Abecedario',       qual: () => '' },
  'picture-path':      { op: 'Laberinto de Imágenes',     qual: () => '' },
  'picture-sort':      { op: 'Clasifica Imágenes',        qual: () => '' },
  'treasure-hunt':     { op: 'Busca el Tesoro',           qual: () => '' },
};

// --- per-type meta flavor clause (woven after the keyword lead) ------------
// Each returns a short, type-appropriate clause (no leading space).
const META_FLAVOR = {
  'addition':          () => 'completa las sumas paso a paso',
  'subtraction':       () => 'completa las restas paso a paso',
  'math-puzzle':       () => 'resuelve sumas y restas',
  'math-worksheet':    () => 'sustituye los símbolos y resuelve',
  'chart-count':       () => 'cuenta y completa el pictograma',
  'word-scramble':     () => 'lenguaje y comunicación: ordena las letras y forma la palabra',
  'wordsearch':        () => 'lenguaje y comunicación: encuentra las palabras escondidas',
  'word-guess':        () => 'lenguaje y comunicación: escribe la palabra correcta',
  'crossword':         () => 'lenguaje y comunicación: completa el crucigrama',
  'matching':          () => 'une cada imagen con su pareja',
  'prepositions':      () => 'practica las preposiciones de lugar',
  'pattern-train':     () => 'completa la serie y recorta',
  'pattern-worksheet': () => 'completa el patrón',
  'big-small':         () => 'compara grande y pequeño',
  'more-less':         () => 'compara más y menos',
  'grid-match':        () => 'completa la cuadrícula',
  'missing-pieces':    () => 'encuentra las piezas que faltan',
  'shadow-match':      () => 'une cada figura con su sombra',
  'find-objects':      () => 'busca los objetos escondidos',
  'odd-one-out':       () => 'descubre cuál no pertenece',
  'sudoku':            () => 'completa el sudoku de imágenes',
  'bingo':             () => 'juega la lotería de imágenes',
  'alphabet-train':    () => 'ordena el abecedario',
  'picture-path':      () => 'sigue el laberinto de imágenes',
  'picture-sort':      () => 'clasifica las imágenes por categoría',
  'treasure-hunt':     () => 'sigue las pistas hasta el tesoro',
};

// ---------------------------------------------------------------------------
function loadTaxonomyThemes() {
  const t = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
  return (t.axes && t.axes.theme) || {};
}

function themeDisplay(themeKey, themeAxis) {
  if (!themeKey) return '';
  // picture-sort "-vs-" pair → display both component themes joined by " y " (e.g. "Accesorios y Animales").
  if (themeKey.includes('-vs-')) {
    return themeKey.split('-vs-').map((k) => {
      const e = themeAxis[k];
      return (e && e.name && e.name.es) ? e.name.es : k;
    }).join(' y ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.es) return entry.name.es;
  return themeKey; // fallback the key
}

function gradeLabel(level) {
  return GRADE_LABEL[level] || level;
}

/**
 * Build the title-tag per the locked pattern with length-aware fallback.
 *   [op] para [Grado] [qual] – [Tema] | [suffix]
 * Fallback ladder when > TITLE_CAP:
 *   suffix " | para imprimir PDF" → " | PDF" → "" (no suffix) → drop qualifier
 * Never drops theme or grade.
 *
 * Special-case: when qual already contains "para imprimir", start the suffix
 * ladder at " | PDF" to avoid doubling "para imprimir".
 */
function buildTitle(op, grade, qual, theme) {
  const qualHasImprimir = /para imprimir/i.test(qual);
  // qual is the per-mode DISTINGUISHER — NEVER drop it (dropping it re-collapses multi-mode
  // siblings into dup titles). Only the format suffix shrinks; accept slight >cap overflow for
  // long qual+theme combos (a title-tag indexes fully; Google truncates display only).
  const assemble = (suffix) => `${op} para ${grade}${qual ? ' ' + qual : ''} – ${theme}${suffix}`;
  const suffixLadder = qualHasImprimir ? [' | PDF', ''] : [' | para imprimir PDF', ' | PDF', ''];
  for (const suffix of suffixLadder) {
    const candidate = assemble(suffix);
    if (candidate.length <= TITLE_CAP) return candidate;
  }
  return assemble(''); // qual kept; shortest form
}

/**
 * Build the meta description (~120-160, hard ≤ META_CAP), native MX.
 *   <op> para <grado> <qual> con <Tema>. <flavor>. Hojas de trabajo gratis
 *   para imprimir en PDF.
 * Trimmed to META_CAP if needed (drop the flavor clause first, then truncate).
 */
function buildMeta(type, op, grade, qual, theme, flavor) {
  const lead = `${op} para ${grade}${qual ? ' ' + qual : ''} con ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Hojas de trabajo gratis para imprimir en PDF.';

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
  const data = JSON.parse(fs.readFileSync(ES_JSON, 'utf8'));

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

  // Ordinal disambiguation: identity collisions (variant siblings — e.g. 2 math-puzzle decks for
  // animals-segundo) → append " (N)" to theme for the 2nd+ in slug order (§A.13.17 precedent).
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
    fs.writeFileSync(ES_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log('');
    console.log(`WROTE ${ES_JSON} (indent=2, UTF-8). Only title + metaDescription mutated.`);
  } else {
    console.log('');
    console.log('DRY-RUN: nothing written.');
  }
}

main();
