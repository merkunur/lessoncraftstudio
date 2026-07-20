#!/usr/bin/env node
/**
 * rekey-pt-titles.js — re-keyword the SERP title-tag + meta description of Brazilian-Portuguese (pt)
 * SEO landing pages, per the LOCKED pt keyword pattern (pt ledger-lock + google.com.br harvest 2026-06-16).
 *
 * Cloned from rekey-it-titles.js, adapted to GRADE-LED (operator-locked; the es/en logic, NOT range):
 * the grade label ("para o 1º ano" / "para o 2º ano") is LEVEL-driven (educação infantil → no grade).
 * Two-pass (resolve op/grade/noCarry/qual/theme + identity → ordinal-dedup → build + mutate),
 * op-as-string-or-object, themeDisplay "-vs-" split with " e ", --type=/--all/--dry-run.
 * DATA-ONLY: rewrites ONLY `title` + `metaDescription` (the route renders `<title> = l.title || l.h1`).
 *
 * LOCKED pt TITLE PATTERNS (google.com.br harvest CONFIRMED: Twinkl Brasil / Toda Matéria / Via Carreira):
 *   Graded (1º/2º ano, standard-bearing): `[op] para o [grade] [sem reserva] [qual] – [Tema] | para imprimir PDF`
 *   Readiness (educação infantil, no grade): `[op] [qual] – [Tema] | atividades para imprimir grátis`
 *   - Head term = "Atividades de …" (harvest-dominant). Print-intent tail "para imprimir PDF" / "grátis".
 *   - no-carry qual = "sem reserva" — honest-fit-gated to 1º-ano no-regroup addition/subtraction direct modes.
 *   - Grade label LEVEL-driven (1o-ano → "para o 1º ano" / 2o-ano → "para o 2º ano"; educacao-infantil → '').
 *     The graded tail ("para imprimir PDF") follows the grade; readiness (educacao-infantil) → "grátis" tail.
 *   - Theme is ALWAYS a bare apposition after " – " (pt gender lives in pt-themes; no runtime contraction here).
 *
 * CLI: --type=<type> | --all | --dry-run
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const PT_JSON = path.join(REPO_ROOT, 'frontend', 'content', 'seo-landing', 'pt.json');
const TAXONOMY = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');

const META_CAP = 170;
const TAIL_GRADED = ' | para imprimir PDF';
const TAIL_READINESS = ' | atividades para imprimir grátis';

const GRADE_LABEL = { '1o-ano': 'para o 1º ano', '2o-ano': 'para o 2º ano' }; // educacao-infantil → no grade
// "sem reserva" honest only on 1º-ano no-regroup addition/subtraction direct modes.
const NO_CARRY_TYPES = new Set(['addition', 'subtraction']);
const NO_CARRY_BANDS = new Set(['1o-ano']);
const NO_CARRY_EXCLUDED_MODES = new Set(['find-addend', 'find-subtrahend']);

// --- per-type op + per-mode qualifier (pt ledger + google.com.br harvest; native-SEO refines at Wave A) ---
const TYPE_MAP = {
  addition: { op: 'Atividades de adição', qual: { 'image-image': 'com imagens', 'image-number': 'com imagens e números', 'find-addend': 'com o número que falta', mixed: '' } },
  subtraction: { op: 'Atividades de subtração', qual: { 'cross-out': 'para riscar', 'image-number': 'com imagens e números', 'find-subtrahend': 'com o número que falta', mixed: '' } },
  'math-puzzle': { op: 'Quebra-cabeça matemático', qual: { addition: 'com adições', subtraction: 'com subtrações', mixed: 'com adições e subtrações' } },
  'code-addition': { op: 'Adição com código', qual: { 'secret-word': 'com palavra secreta' } },
  'math-worksheet': { op: 'Atividades de cálculo', qual: { 'two-symbols-add-sub': 'com duas imagens', 'three-symbols-add-sub': 'com três imagens', 'four-symbols-add-sub': 'com quatro imagens' } },
  'chart-count': { op: 'Gráfico de barras', qual: {} },
  'more-less': { op: 'Mais ou menos', qual: { 'image-image': 'com imagens', 'check-cross': 'marque o grupo', 'image-number': 'com números' } },
  'big-small': { op: { findBig: 'Grande ou pequeno', orderAsc: 'Ordene por tamanho' }, qual: {} },
  'grid-match': { op: 'Ligue as imagens', qual: {} },
  'shadow-match': { op: { 'find-shadow': 'As sombras', 'make-whole': 'Complete a figura' }, qual: {} },
  'missing-pieces': { op: 'A peça que falta', qual: { 'two-missing': 'com duas peças' } },
  'find-objects': { op: { 'i-spy': 'Procure e ache', 'find-odd': 'Ache as diferenças' }, qual: {} },
  'find-and-count': { op: { 'hidden-object': 'Procure e conte', 'letter-spotting': 'Ache a letra' }, qual: {} },
  'pattern-train': { op: { 'null': 'Sequência AB', aab: 'Sequência AAB', abb: 'Sequência ABB', aabb: 'Sequência AABB', abc: 'Sequência ABC' }, qual: {} },
  'pattern-worksheet': { op: 'Sequências lógicas', qual: {} },
  'picture-path': { op: 'Labirinto', qual: { 'choose-path': 'com escolhas', 'classic-maze': 'clássico' } },
  'picture-trail': { op: 'Labirinto', qual: {} },
  'picture-sort': { op: 'Separar e classificar', qual: {} },
  'odd-one-out': { op: 'Ache o intruso', qual: { 'cross-theme': 'temas misturados' } },
  sudoku: { op: 'Sudoku ilustrado', qual: { easy: 'fácil', medium: 'médio', hard: 'difícil' } },
  'treasure-hunt': { op: 'Caça ao tesouro', qual: { 'cardinal-arrows': 'com setas', compass: 'com bússola' } },
  'alphabet-train': { op: 'Ordem alfabética', qual: {} },
  matching: { op: { letter: 'Som inicial', name: 'Leia a palavra' }, qual: {} },
  prepositions: { op: { fillin: 'Escreva a posição', multiplechoice: 'Marque a posição' }, qual: {} },
  'word-guess': { op: 'Complete a palavra', qual: { easy: 'com palavras fáceis', normal: '' } },
  'word-scramble': { op: 'Forme a palavra', qual: { easy: 'com palavras fáceis', normal: '' } },
  wordsearch: { op: 'Caça-palavras', qual: {} },
  crossword: { op: 'Palavras cruzadas', qual: {} },
  bingo: { op: 'Bingo de imagens', qual: {} },
};

const META_FLAVOR = {
  addition: 'conte e escreva o resultado das adições', subtraction: 'conte, risque e escreva quanto resta',
  'math-puzzle': 'resolva as operações e monte o quebra-cabeça', 'code-addition': 'resolva as adições e descubra o código',
  'math-worksheet': 'descubra quanto vale cada imagem e calcule',
  'chart-count': 'conte os objetos e complete o gráfico de barras', 'more-less': 'observe e marque onde há mais ou menos',
  'big-small': 'observe e ache o maior e o menor', 'grid-match': 'ligue as imagens iguais na grade',
  'shadow-match': 'ligue cada imagem à sua sombra', 'missing-pieces': 'observe e ache a peça que falta',
  'find-objects': 'observe com atenção e ache o que pedimos', 'find-and-count': 'procure e marque as letras iniciais certas',
  'pattern-train': 'observe a sequência e complete o trenzinho', 'pattern-worksheet': 'continue a sequência com a imagem certa',
  'picture-path': 'siga o labirinto até a saída', 'picture-trail': 'siga o labirinto até a saída',
  'picture-sort': 'observe e separe as imagens nos grupos certos', 'odd-one-out': 'observe cada fileira e ache o intruso',
  sudoku: 'complete o sudoku com as imagens certas', 'alphabet-train': 'coloque as letras em ordem alfabética',
  matching: 'ligue cada letra à sua imagem', prepositions: 'observe e escreva a posição certa',
  'word-guess': 'olhe a imagem e complete a palavra', 'word-scramble': 'coloque as letras em ordem e forme a palavra',
  wordsearch: 'ache e circule todas as palavras escondidas', crossword: 'resolva as palavras cruzadas com as imagens',
  bingo: 'jogue bingo e marque a imagem certa', 'treasure-hunt': 'siga o caminho e ache o tesouro',
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
      return (e && e.name && e.name.pt) ? e.name.pt : k;
    }).join(' e ');
  }
  const entry = themeAxis[themeKey];
  if (entry && entry.name && entry.name.pt) return entry.name.pt;
  return themeKey;
}
function resolveOp(map, mode) {
  if (typeof map.op === 'function') return map.op(mode);
  if (typeof map.op === 'object') { const k = (mode === null ? 'null' : mode); return map.op[k] || map.op['null'] || ''; }
  return map.op;
}
function resolveQual(map, mode) { const k = (mode === null ? 'null' : mode); return (map.qual && map.qual[k]) || ''; }

// GRADE-LED: the grade label is LEVEL-driven (1o-ano/2o-ano → "para o Nº ano"; educacao-infantil → '').
function gradeFor(level) { return GRADE_LABEL[level] || ''; }
// "sem reserva" (no-carry) — honest only on 1º-ano no-regroup addition/subtraction direct modes.
function noCarryFor(type, mode, level) {
  if (!NO_CARRY_TYPES.has(type)) return '';
  if (!NO_CARRY_BANDS.has(level)) return '';
  if (NO_CARRY_EXCLUDED_MODES.has(mode)) return '';
  return 'sem reserva';
}

function buildTitle(op, grade, noCarry, qual, theme) {
  const tail = grade ? TAIL_GRADED : TAIL_READINESS;
  const head = `${op}${grade ? ' ' + grade : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''}`;
  return `${head} – ${theme}${tail}`;
}
function buildMeta(op, grade, noCarry, qual, theme, flavor) {
  const lead = `${op}${grade ? ' ' + grade : ''}${noCarry ? ' ' + noCarry : ''}${qual ? ' ' + qual : ''} – ${theme}.`;
  const flavorSentence = flavor ? ` ${cap(flavor)}.` : '';
  const closer = ' Atividades grátis para imprimir em PDF.';
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
  const data = JSON.parse(fs.readFileSync(PT_JSON, 'utf8'));
  const selected = data.landings.filter((l) => args.all ? true : l.coordinate.type === args.type);
  if (selected.length === 0) { console.error(`No landings matched ${args.all ? '--all' : '--type=' + args.type}.`); process.exit(1); }

  const recs = [];
  for (const l of selected) {
    const c = l.coordinate;
    const type = c.type;
    const map = TYPE_MAP[type];
    if (!map) { console.warn(`WARN: no TYPE_MAP entry for type "${type}" (slug ${l.slug}) — skipped.`); continue; }
    const op = resolveOp(map, c.mode);
    const grade = gradeFor(c.level);
    const noCarry = noCarryFor(type, c.mode, c.level);
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
    const newTitle = buildTitle(r.op, r.grade, r.noCarry, r.qual, r.theme);
    const newMeta = buildMeta(r.op, r.grade, r.noCarry, r.qual, r.theme, r.flavor);
    if (newTitle.length > maxTitleLen) maxTitleLen = newTitle.length;
    titleCounts[newTitle] = (titleCounts[newTitle] || 0) + 1;
    if (samples.length < 10) samples.push({ slug: r.l.slug, type: r.type, newTitle, newMeta });
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
    fs.writeFileSync(PT_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`\nWROTE ${PT_JSON} (title + metaDescription only).`);
  } else {
    console.log('\nDRY-RUN: nothing written.');
  }
}

// Guarded so compose-title-meta.js can require() this module for its native
// vocabulary WITHOUT executing the CLI (which writes the locale JSON).
if (require.main === module) main();

module.exports = { GRADE_LABEL, META_CAP, META_FLAVOR, NO_CARRY_BANDS, NO_CARRY_EXCLUDED_MODES, NO_CARRY_TYPES, PT_JSON, REPO_ROOT, TAIL_GRADED, TAIL_READINESS, TAXONOMY, TYPE_MAP, buildMeta, buildTitle, cap, gradeFor, loadTaxonomyThemes, noCarryFor, resolveOp, resolveQual, themeDisplay };
