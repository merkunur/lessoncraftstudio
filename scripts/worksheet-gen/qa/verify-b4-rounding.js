#!/usr/bin/env node
/**
 * verify-b4-rounding.js — the G2-346 `rounding` gate (design file
 * docs/worksheet-gen/b4-designs/G2-346-rounding.md §5; brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b4-rounding.js [--quick]
 *
 * 1. BANK — every locale block of data/b4/rounding.js against the §5 validator
 *    rules 1-11 (the `tools/validate-b4-draft.js` rounding block, folded in here
 *    and exported as `validateBank(block, loc, opts)`; tools/b4-probe-child.js
 *    calls it with (block, loc)):
 *    (1) up[10] up[100] down[10] down[100] non-empty, <= 20 chars, no digit, no
 *        `{`, up[s] !== down[s] (NFD, case-insensitive); the rendered widths
 *        (<= 118 at Nunito 800 12, <= 250 at Baloo 2 700 18) are measured in the
 *        RENDER section (a node validator has no fonts); (2) heads[10] /
 *        heads[100] non-empty, <= 24 chars, distinct, digits only as a whole
 *        `10` / `100`; sv never tiotals / tiotalet / hundratalet; da never
 *        `tiere`; de heads capitalised; (3) relation approx | arrow, and approx
 *        everywhere except en / es / pt; (4) no string carries `d = d`, a
 *        thousands separator, a 4+-digit number, a decimal, U+2248 or U+2192;
 *        (5) no string carries a number-line head, a "nearer" word, a
 *        column-arithmetic head, an absent-apparatus word (chip / tick / hill /
 *        dot …) or an answer-key promise — all `(?<!\p{L})…(?!\p{L})` iu, never
 *        `\b`; (6) titles <= 70, no worksheet word, no free claim, unique
 *        against the locale's shipped G2-221 / G3-323 titles by >= 1 noun /
 *        verb / numeral token on a 5-letter stem (stop words and the locale's
 *        adjectives / adverbs do not count; a digit string is its own token;
 *        symmetric difference), F2 carries the hundred word or 100, F5 both
 *        place words, F3 the locale's estimate word, F4 the target 50;
 *        instructions <= 150 ending in a mark; (7) every face title differs
 *        from every other by the same token rule; (8) refuse entries name a
 *        real mode; strings ids === the six minus the refused; (9) fr: no
 *        field matches /arrondi\s*cp/i; en: no title contains "tenth"; (10)
 *        build probe: the base builds at d2 over the block with 3 seeds; the
 *        DOM carries no data-lcs-mode / data-lcs-prim / .ws-pattern-slot /
 *        <img> / SVG other than [data-lcs-rel]; (11) the taxonomy slug of the
 *        locale equals table B and collides with no other axis slug and no
 *        landing slug. (The draft-vs-module EN equality of the design's rule
 *        11 is the draft tool's.)
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1 / d2 / d3 en at the default chrome, d2 under the README 722
 *    chrome (a 3-line title + a 3-line instruction; measures 710 on this
 *    shell, the G1-352 finding) and under the 4-line fi title chrome (677; d1 /
 *    d2 / d3 all fit — the base is checked at BOTH). Asserts verify() empty,
 *    qa/lints.js clean, the G2-3 floors ITSELF (every numeral >= 22 px computed
 *    font, every box >= 44 high and >= 84 wide for a 3-digit answer / >= 68 for
 *    2 digits, badges 26), the rule box 96 <= h <= 100 with the coral
 *    deciding digit (#F2784B) equal to the example's and the ringed strip
 *    digit equal to it, the ten strip digits in order under the right arrows,
 *    the captions === the bank literals and <= 118 px wide, the relation glyph
 *    an SVG whose optical centre sits within 3 px of the numeral's, the
 *    5-case / up / down / carry / digit-spread quotas, no text node with
 *    U+2248 / U+2192 / `<` / `>` / a 4-digit number, `=` never after a
 *    numeral, no .ws-blankbox with text, no number line, the lowest ink above
 *    the footer at every chrome, badges column-major.
 *    Plus a COMPONENT smoke: the face components (updownBins, estimateRow,
 *    targetPill, numberField, twoTargetRow, placeHeader, placePill, the F3
 *    workedLine) through the pipeline in a throwaway type — lints clean, the
 *    §3 geometry measured (bins 232, estimate row 433, F4 rows <= 639, the F5
 *    box centres 178 / 338 and the header cells within 1 px of them, heads <=
 *    156 at N13, the F1 pills <= 300) and the P3 CONTROL: F3's `[ ] + [ ] = [ ]`
 *    passes the `=`-after-a-numeral scan.
 * 3. SWEEP — 20 seeds × d1 / d2 / d3 (build only): every quota re-derived,
 *    numbers distinct, never the worked number, >= 2 distinct sets AND orders
 *    (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct EN
 *    bank / render is the control. Design §5 (the base-applicable ones; P8-P12
 *    and P15 are FACE poisons for Phase 2):
 *      P1  a pre-filled box (`50` inside a .ws-blankbox)     → verify()
 *      P2  an HTML `≈` text node replacing the SVG           → verify() U+2248 ban
 *      P3  `47 = [ ]` (a text `=` after a numeral)           → verify(); control: F3's row passes
 *      P4  a page with one 5 case                            → verify() fiveMin
 *      P5  a tile `1000`                                     → verify()
 *      P6  a number line injected into the base              → verify()
 *      P7  the worked number 47 also on a line               → verify()
 *      P13 the strip rows `0 1 2 3 4 5` / `6 7 8 9`          → verify()
 *      P14 the ring on the wrong strip digit                 → verify()
 *      P16 row-major badges                                  → verify()
 *      P17 a 400 px rule box under the 4-line fi title       → footer lint / lowest ink
 *      P18 an item `450` (a multiple of the step)            → verify()
 *      P19 de relation 'arrow'                               → rule 3
 *      P20 sv F2 "Avrundning till hundratal" vs G3-323       → rule 6 (stem-equal)
 *      P21 nl base "Afronden op tientallen" vs G2-221        → rule 6 (the plural is not a token)
 *      P22 en F2 "Rounding to the Nearest Tenth"             → rule 9
 *      P23 fr instruction "… arrondi CP"                     → rule 9
 *      P24 en "with answers"                                 → rule 5
 *      P25 fr up[10] of 28 chars                             → rule 1
 *      P26 da heads[10] 'tiere'                              → rule 2
 *      + the worksheet word, a free claim, `47 = 50` in a string, a 4-digit
 *        number, "number line", a config refused by resolveBase (0 items,
 *        20 items, mix 6 + 7 for 14, fiveMin 1 with the rule, min 0, max 1000,
 *        upMin + downMin > items, digitMax 1 for 14, an F5 steps array on the
 *        base path).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b4-common.js');
const freeClaim = require('../../lib/free-claim.js');
const C4 = require('../templates/components-b4.js');

const TYPE = require('../types/g2/G2-346-rounding.js');
const QUICK = process.argv.includes('--quick');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev');
const TAXONOMY = path.join(ROOT, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
const LANDINGS = (loc) => path.join(ROOT, '..', '..', 'frontend', 'content', 'seo-landing', loc + '.json');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const FACES = ['base', 'sort', 'hundred', 'estimate', 'inverse', 'both'];
const MODES = ['sort', 'hundred', 'estimate', 'inverse', 'both'];
const TABLE_B = { en: 'rounding', de: 'zahlen-runden', es: 'redondeo', pt: 'arredondamento-de-numeros', fr: 'arrondir-a-la-dizaine', it: 'arrotondare-i-numeri', nl: 'afronden-op-tientallen', sv: 'avrundning', da: 'afrunding', no: 'avrunding', fi: 'pyoristaminen' };
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä|tehtäväpaperi|atividade|actividad/i;
const ANSWERS = ['with answers', 'answer key', 'answer keys', 'mit Lösungen', 'Lösungen', 'con respuestas', 'com respostas', 'avec corrigé', 'con soluzioni', 'met antwoorden', 'med facit', 'med fasit', 'vastauksineen', 'vastaukset'];
const NUMBER_LINE = ['Zahlenstrahl', 'number line', 'number lines', 'droite numérique', 'recta numérica', 'reta numérica', 'linea dei numeri', 'getallenlijn', 'tallinje', 'tallinjen', 'lukusuora'];
// the G2-221 / G3-323 "nearer" words. DEVIATION (recorded): fr "plus proche" and pt "mais próxima" are ALSO the superlatives the
// design's own §4 puts in the instruction ("la dizaine la plus proche", "a dezena mais próxima"), so for those two the ban is the
// COMPARATIVE construction "closer to" (plus proche de / mais próxima de) — poison-tested in both directions below.
const NEARER = ['nearer', 'closer', 'näher', 'más cerca', 'più vicino', 'dichter bij', 'närmast', 'tættest', 'nærmest', 'lähempänä'];
const NEARER_RE = [/(?<!\p{L})mais\s+pr[óo]xim[ao]s?\s+d[eoa]s?(?!\p{L})/iu, /(?<!\p{L})plus\s+proches?\s+d(?:e|u|es)(?!\p{L})/iu];
const COLUMN = ['schriftlich', 'onder elkaar', 'opstilling', 'allekkain', 'column'];
const ABSENT = ['chip', 'chips', 'tick', 'hill', 'dot', 'dots', 'Punkt', 'stip', 'prick', 'prik', 'piste', 'punto', 'ponto', 'point', 'puntino'];
const ESTIMATE_WORD = { en: 'estimate', de: 'überschlag', sv: 'överslag', no: 'overslag', da: 'overslag', fi: 'arvio', nl: 'schat', fr: 'estim', es: 'estim', pt: 'estim', it: 'stim' };
const HUNDRED_WORD = { en: ['hundred', '100'], de: ['hunderter', '100'], es: ['centena', '100'], pt: ['centena', '100'], fr: ['centaine', '100'], it: ['centinaio', '100'], nl: ['honderdtal', 'honderdtallen', '100'], sv: ['hundratal', '100'], da: ['hundrede', '100'], no: ['hundrer', 'hundre', '100'], fi: ['satojen', 'sadan', 'sataan', '100'] };
const PLACE_ALIASES = { fi: { 10: ['kymmen'], 100: ['sato', 'sada', 'sata'] } };
// function words the token rule ignores (plus every token of <= 2 letters) and the adjectives / adverbs that never count (rule 6 / 7)
const STOP = {
  en: ['the', 'and', 'then', 'with', 'into', 'for', 'which', 'what', 'each', 'every', 'that'], de: ['auf', 'und', 'oder', 'die', 'der', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'mit', 'zum', 'zur', 'bis', 'welche'],
  es: ['los', 'las', 'del', 'más', 'que', 'qué', 'con', 'cuál', 'cuáles', 'hacia', 'para', 'por'], pt: ['dos', 'das', 'para', 'com', 'que', 'quais', 'mais', 'por'],
  fr: ['les', 'des', 'aux', 'puis', 'quels', 'quelles', 'qui', 'que', 'pour', 'avec', 'sur'], it: ['alla', 'allo', 'agli', 'alle', 'con', 'per', 'quali', 'che', 'della', 'dello', 'delle', 'dei'],
  nl: ['het', 'een', 'van', 'met', 'welke', 'naar', 'die', 'dat'], sv: ['och', 'till', 'med', 'för', 'vilka', 'det', 'den', 'att', 'eller'], da: ['til', 'med', 'for', 'hvilke', 'det', 'den', 'eller'], no: ['til', 'med', 'for', 'hvilke', 'det', 'den', 'eller'], fi: ['mitkä', 'vai', 'tai', 'sekä'],
};
const ADJ_ADV = {
  en: ['nearest', 'near', 'closest', 'right', 'own'], de: ['nächste', 'nächsten', 'nächster', 'richtig'], es: ['cercana', 'cercano', 'cercanas', 'cercanos', 'próxima', 'próximo', 'arriba', 'abajo'],
  pt: ['próxima', 'próximo', 'próximas', 'próximos', 'cima', 'baixo'], fr: ['près', 'proche', 'proches', 'plus', 'inférieure', 'supérieure', 'haut', 'bas'], it: ['vicino', 'vicina', 'vicini', 'vicine', 'giù'],
  nl: ['dichtstbijzijnde', 'dichtbij', 'boven', 'beneden'], sv: ['närmaste', 'närmsta', 'uppåt', 'nedåt'], da: ['nærmeste', 'ned'], no: ['nærmeste', 'ned', 'opp'], fi: ['lähin', 'lähimpään', 'lähimmän', 'ylöspäin', 'alaspäin'],
};

let fails = 0, asserts = 0;
function ok(cond, msg) { asserts++; if (!cond) { fails++; console.log('  FAIL ' + msg); } }
function nfd(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function escRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function wordRe(w) { return new RegExp('(?<!\\p{L})' + escRe(w) + '(?!\\p{L})', 'iu'); }
function hasWord(text, w) { return wordRe(w).test(String(text)); }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function graphemes(s) { return Array.from(String(s)).length; }
let _tax = null;
function taxonomy() { if (!_tax) _tax = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8')); return _tax; }
const _landing = new Map();
function landingSlugs(loc) {
  if (!_landing.has(loc)) {
    const f = LANDINGS(loc);
    let set = new Set();
    if (fs.existsSync(f)) { const j = JSON.parse(fs.readFileSync(f, 'utf8')); set = new Set((j.landings || []).map((l) => l.slug)); }
    _landing.set(loc, set);
  }
  return _landing.get(loc);
}
const _strings = new Map();
function localeStrings(loc) {
  if (!_strings.has(loc)) { const f = path.join(ROOT, 'i18n', 'strings.' + loc + '.json'); _strings.set(loc, fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}); }
  return _strings.get(loc);
}
/** The shipped G2-221 / G3-323 titles of a locale (i18n/strings.<loc>.json; en = the specs' i18n) — a validate-time source, never read at render. */
function shippedTitles(loc) {
  const S = localeStrings(loc);
  const out = [];
  for (const id of ['G2-221', 'G3-323']) { const t = S[id] && S[id].title; if (t) out.push([id, t]); }
  return out;
}

/* ------------------------------------------------------------------ the token rule (rules 6 / 7) */
/** The counting tokens of a title: NFD-lowercased, split on non-letters/digits, <= 2 letters + stop + adjective / adverb dropped, 5-letter stems (digits whole). */
function tokens(title, loc) {
  const stop = new Set([...(STOP[loc] || []), ...(ADJ_ADV[loc] || [])].map(nfd));
  return new Set(nfd(title).split(/[^\p{L}\p{N}]+/u).filter(Boolean).filter((t) => /^\d+$/.test(t) || (t.length > 2 && !stop.has(t))).map((t) => (/^\d+$/.test(t) ? t : t.slice(0, 5))));
}
/** Do two titles differ by >= 1 counting token (symmetric difference non-empty)? */
function tokenDistinct(a, b, loc) {
  const A = tokens(a, loc), B = tokens(b, loc);
  for (const t of A) if (!B.has(t)) return true;
  for (const t of B) if (!A.has(t)) return true;
  return false;
}

/* ------------------------------------------------------------------ 1. the bank validator ------------------------------------------------------------------ */

/**
 * validateBank(block, loc, opts) -> string[] of failures (empty = clean). Pure node (+ a build probe over the block);
 * reads the taxonomy, the landing files and the shipped G2-221 / G3-323 titles (validate-time sources).
 */
function validateBank(block, loc, opts = {}) {
  const out = [];
  const push = (m) => out.push(m);
  if (!block || typeof block !== 'object') return ['no block'];
  const allStrings = [];
  const S = block.strings || {};
  for (const f of Object.keys(S)) for (const k of ['title', 'instruction']) if (S[f] && typeof S[f][k] === 'string') allStrings.push([f + '.' + k, S[f][k]]);
  for (const dir of ['up', 'down']) for (const s of [10, 100]) if (block[dir] && typeof block[dir][s] === 'string') allStrings.push([`${dir}[${s}]`, block[dir][s]]);
  for (const s of [10, 100]) if (block.heads && typeof block.heads[s] === 'string') allStrings.push([`heads[${s}]`, block.heads[s]]);

  // rule 1 — the four direction literals
  for (const dir of ['up', 'down']) {
    if (!block[dir] || typeof block[dir] !== 'object') { push(`rule 1: ${dir} literals missing`); continue; }
    for (const s of [10, 100]) {
      const v = block[dir][s];
      if (typeof v !== 'string' || !v.trim()) { push(`rule 1: ${dir}[${s}] empty`); continue; }
      if (graphemes(v) > 20) push(`rule 1: ${dir}[${s}] "${v}" is ${graphemes(v)} chars > 20`);
      if (/\d/.test(v)) push(`rule 1: ${dir}[${s}] "${v}" carries a digit`);
      if (/\{/.test(v)) push(`rule 1: ${dir}[${s}] "${v}" carries a slot`);
    }
  }
  for (const s of [10, 100]) if (block.up && block.down && typeof block.up[s] === 'string' && typeof block.down[s] === 'string' && nfd(block.up[s]) === nfd(block.down[s])) push(`rule 1: up[${s}] === down[${s}] ("${block.up[s]}")`);

  // rule 2 — the two place heads
  const H = block.heads || {};
  for (const s of [10, 100]) {
    const v = H[s];
    if (typeof v !== 'string' || !v.trim()) { push(`rule 2: heads[${s}] empty`); continue; }
    if (graphemes(v) > 24) push(`rule 2: heads[${s}] "${v}" is ${graphemes(v)} chars > 24`);
    if (/\d/.test(v) && !/^(?:[^\d]*(?<!\d)(?:10|100)(?!\d)[^\d]*)$/.test(v)) push(`rule 2: heads[${s}] "${v}" carries a digit other than a whole 10 / 100`);
    if (loc === 'sv' && /tiotals|tiotalet|hundratalet/i.test(v)) push(`rule 2: sv heads[${s}] "${v}" (never tiotals / tiotalet / hundratalet)`);
    if (loc === 'da' && /(?<!\p{L})tiere(?!\p{L})/iu.test(v)) push(`rule 2: da heads[${s}] "${v}" carries "tiere" (nærmeste tier is the form)`);
    if (loc === 'de' && !/^\p{Lu}/u.test(v)) push(`rule 2: de heads[${s}] "${v}" must start with a capital (Zehner / Hunderter)`);
  }
  if (typeof H[10] === 'string' && typeof H[100] === 'string' && nfd(H[10]) === nfd(H[100])) push('rule 2: heads[10] === heads[100]');

  // rule 3 — the relation glyph kind
  if (block.relation !== 'approx' && block.relation !== 'arrow') push(`rule 3: relation "${block.relation}" is not approx | arrow`);
  else if (!['en', 'es', 'pt'].includes(loc) && block.relation !== 'approx') push(`rule 3: ${loc} relation must be 'approx' (the lock leaves the choice to en / es / pt only)`);

  // rule 4 — no `d = d`, thousands separator, 4-digit number, decimal, U+2248 / U+2192 in any string
  for (const [k, v] of allStrings) {
    if (/\d\s*=\s*\d/.test(v)) push(`rule 4: ${k} "${v}" prints = between two numbers`);
    if (/\d[ .,]\d{3}(?!\d)/.test(v)) push(`rule 4: ${k} "${v}" carries a thousands separator`);
    if (/(?<!\d)\d{4,}/.test(v)) push(`rule 4: ${k} "${v}" carries a number >= 1000`);
    if (/\d[.,]\d/.test(v)) push(`rule 4: ${k} "${v}" carries a decimal`);
    if (/[≈→]/.test(v)) push(`rule 4: ${k} "${v}" carries U+2248 / U+2192 (outside every font range — the SVG glyph draws it)`);
  }

  // rule 5 — the sibling / absent-apparatus / answer-key bans (whole words, iu, never \b)
  for (const [k, v] of allStrings) {
    for (const w of NUMBER_LINE) if (hasWord(v, w)) push(`rule 5: ${k} "${v}" names a number line ("${w}")`);
    for (const w of NEARER) if (hasWord(v, w)) push(`rule 5: ${k} "${v}" carries the G2-221 / G3-323 "nearer" word ("${w}")`);
    for (const re of NEARER_RE) { const m = re.exec(v); if (m) push(`rule 5: ${k} "${v}" carries the G2-221 / G3-323 "nearer" word ("${m[0]}")`); }
    for (const w of COLUMN) if (hasWord(v, w)) push(`rule 5: ${k} "${v}" carries a column-arithmetic head ("${w}")`);
    for (const w of ABSENT) if (hasWord(v, w)) push(`rule 5: ${k} "${v}" names an apparatus the page does not have ("${w}")`);
    for (const w of ANSWERS) if (hasWord(v, w)) push(`rule 5: ${k} "${v}" promises an answer key ("${w}")`);
  }

  // rule 8 — refuse + the face ids
  const refuse = Array.isArray(block.refuse) ? block.refuse : (block.refuse ? Object.keys(block.refuse).filter((k) => block.refuse[k]) : []);
  for (const r of refuse) if (!MODES.includes(r)) push(`rule 8: refuse entry "${r}" is not a face id`);
  const wantIds = FACES.filter((f) => !refuse.includes(f));
  const haveIds = Object.keys(S);
  for (const f of wantIds) if (!haveIds.includes(f)) push(`rule 8: strings.${f} missing`);
  for (const f of haveIds) if (!FACES.includes(f)) push(`rule 8: strings.${f} is not a face id`);
  for (const f of refuse) if (haveIds.includes(f)) push(`rule 8: strings.${f} present on a refused face`);

  // rule 6 / 7 / 9 — titles + instructions
  const shipped = shippedTitles(loc);
  const titles = [];
  for (const f of wantIds) {
    const s = S[f];
    if (!s || typeof s.title !== 'string' || typeof s.instruction !== 'string' || !s.title.trim() || !s.instruction.trim()) { if (s) push(`rule 6: strings.${f} lacks a title / instruction`); continue; }
    titles.push([f, s.title]);
    if (graphemes(s.title) > 70) push(`rule 6: ${f} title ${graphemes(s.title)} chars > 70`);
    if (WORKSHEET_WORD.test(s.title)) push(`rule 6: ${f} title carries the worksheet word`);
    for (const t of [s.title, s.instruction]) { const h = freeClaim.hit(t); if (h) push(`rule 6: ${f} string claims free ("${h}")`); }
    if (graphemes(s.instruction) > 150) push(`rule 6: ${f} instruction ${graphemes(s.instruction)} chars > 150`);
    if (!/[.!?…]\s*$/.test(s.instruction)) push(`rule 6: ${f} instruction does not end in a mark`);
    for (const [id, t] of shipped) if (!tokenDistinct(s.title, t, loc)) push(`rule 6: ${f} title "${s.title}" differs from ${id}'s shipped "${t}" by no noun / verb / numeral token (stem-compared)`);
    if (f === 'hundred' && !(HUNDRED_WORD[loc] || ['100']).some((w) => hasWord(s.title, w) || nfd(s.title).includes(nfd(w)))) push(`rule 6: hundred title "${s.title}" carries neither the hundred word nor 100`);
    if (f === 'both') {
      for (const st of [10, 100]) {
        const head = H[st] || '';
        const stop = new Set([...(STOP[loc] || []), ...(ADJ_ADV[loc] || [])].map(nfd));
        const heads = [String(st), ...nfd(head).split(/[^\p{L}\p{N}]+/u).filter((t) => t.length > 3 && !stop.has(t)).map((t) => t.slice(0, 4)), ...((PLACE_ALIASES[loc] || {})[st] || [])];
        const title = nfd(s.title);
        if (!heads.some((h) => (/^\d+$/.test(h) ? new RegExp('(?<!\\d)' + h + '(?!\\d)').test(title) : title.includes(h)))) push(`rule 6: both title "${s.title}" does not carry the ${st} place word ("${head}")`);
      }
    }
    if (f === 'estimate' && ESTIMATE_WORD[loc] && !nfd(s.title).includes(nfd(ESTIMATE_WORD[loc]))) push(`rule 6: estimate title "${s.title}" lacks the ${loc} estimate word "${ESTIMATE_WORD[loc]}"`);
    if (f === 'inverse' && !/(?<!\d)50(?!\d)/.test(s.title)) push(`rule 6: inverse title "${s.title}" does not name the target 50`);
    if (loc === 'en' && /tenth/i.test(s.title)) push(`rule 9: en ${f} title "${s.title}" says "tenth" (meta only, never a title)`);
  }
  for (let i = 0; i < titles.length; i++) for (let j = i + 1; j < titles.length; j++) if (!tokenDistinct(titles[i][1], titles[j][1], loc)) push(`rule 7: ${titles[i][0]} "${titles[i][1]}" and ${titles[j][0]} "${titles[j][1]}" differ by no noun / verb / numeral token`);
  if (loc === 'fr') for (const [k, v] of allStrings) if (/arrondi\s*cp/i.test(v)) push(`rule 9: fr ${k} "${v}" carries "arrondi CP" (payroll rounding)`);

  // rule 10 — the build probe over THIS block (3 seeds; the base only — the faces are Phase 2)
  if (opts.probe !== false) {
    for (let v = 1; v <= 3; v++) {
      try {
        const rng = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: 2, seedEpoch: 1, variant: v }));
        const b = TYPE._buildWith(block, TYPE.difficulty[2], { locale: loc }, { rng });
        const h = b.bodyHtml;
        if (/data-lcs-mode=/.test(h)) push(`rule 10: the base DOM carries data-lcs-mode (seed ${v})`);
        if (/data-lcs-prim=/.test(h)) push(`rule 10: the base DOM carries a primitive (seed ${v})`);
        if (/ws-pattern-slot|<img/.test(h)) push(`rule 10: the base DOM carries a pattern slot / img (seed ${v})`);
        if ((h.match(/<svg/g) || []).length !== (h.match(/<svg[^>]*data-lcs-rel=/g) || []).length) push(`rule 10: an SVG other than the relation glyph (seed ${v})`);
        if (/[≈→]/.test(h)) push(`rule 10: U+2248 / U+2192 in the DOM (seed ${v})`);
      } catch (e) { push(`rule 10: the base does not build at d2 over the ${loc} block (seed ${v}): ${e.message}`); }
    }
  }

  // rule 11 — the taxonomy slug
  try {
    const tax = taxonomy();
    const ax = tax.axes['exercise-type'].rounding;
    const mine = ax && ax.slug && ax.slug[loc];
    if (!mine) push(`rule 11: axes['exercise-type'].rounding.slug.${loc} is not registered`);
    else {
      if (mine !== TABLE_B[loc]) push(`rule 11: slug.${loc} "${mine}" != table B "${TABLE_B[loc]}"`);
      for (const [axis, entries] of Object.entries(tax.axes)) for (const [k, e] of Object.entries(entries)) if (k !== 'rounding' && e.slug && e.slug[loc] === mine) push(`rule 11: slug.${loc} "${mine}" collides with ${axis}.${k}`);
      if (landingSlugs(loc).has(mine)) push(`rule 11: slug.${loc} "${mine}" is a landing slug`);
    }
    if (!tax.apps.rounding || tax.apps.rounding.exercise_type_axis_key !== 'rounding' || tax.apps.rounding.default_subject !== 'math') push('rule 11: apps.rounding is absent or not {math, rounding}');
  } catch (e) { push('rule 11: taxonomy unreadable — ' + e.message); }

  // EN: strings.base === the spec's i18n.en (the EN is the source)
  if (loc === 'en' && S.base && (S.base.title !== TYPE.i18n.en.title || S.base.instruction !== TYPE.i18n.en.instruction)) push('rule 6: en strings.base != the spec i18n.en');
  return out;
}

/* ------------------------------------------------------------------ 2. render helpers ------------------------------------------------------------------ */

async function renderWith(page, type, { difficulty = 2, baseName, strings, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const r = (el) => el.getBoundingClientRect();
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot'), title = document.querySelector('.ws-title');
    const root = document.querySelector('[data-lcs-round]');
    const box = document.querySelector('[data-lcs-rulebox]');
    const worked = document.querySelector('[data-lcs-worked]');
    const rd = worked && worked.querySelector('[data-lcs-rule-digit]');
    const caps = [...document.querySelectorAll('[data-lcs-caption]')].map((c) => ({ dir: c.dataset.lcsCaption, text: c.textContent.trim(), w: r(c).width, font: parseFloat(getComputedStyle(c).fontSize), overflow: c.scrollWidth - c.clientWidth }));
    const strip = [...document.querySelectorAll('[data-lcs-strip-digit]')].map((d) => ({ d: d.dataset.lcsStripDigit, ring: d.hasAttribute('data-lcs-rule-digit'), w: r(d).width, h: r(d).height, font: parseFloat(getComputedStyle(d).fontSize), border: getComputedStyle(d).borderTopColor }));
    const arrows = [...document.querySelectorAll('[data-lcs-arrow]')].map((a) => ({ dir: a.dataset.lcsArrow, text: a.textContent.trim(), w: r(a).width, font: parseFloat(getComputedStyle(a).fontSize) }));
    const rows = [...document.querySelectorAll('[data-lcs-row]')].map((row) => {
      const num = row.querySelector('[data-lcs-num]'), g = row.querySelector('svg[data-lcs-rel]'), b = row.querySelector('.ws-blankbox'), badge = row.querySelector('[data-lcs-idx]');
      const nr = num ? r(num) : null, gr = g ? r(g) : null;
      // the numeral's INK box (a range over the text node) vs the glyph box: optical centre
      let inkCy = null;
      if (num && num.firstChild) { const range = document.createRange(); range.selectNodeContents(num); const rr = range.getBoundingClientRect(); inkCy = rr.top + rr.height / 2; }
      return {
        n: +row.dataset.lcsN, step: +row.dataset.lcsStep, text: num ? num.textContent.trim() : '', font: num ? parseFloat(getComputedStyle(num).fontSize) : 0,
        numW: nr ? nr.width : 0, numScroll: num ? num.scrollWidth : 0, inkCy, glyphCy: gr ? gr.top + gr.height / 2 : null, glyphW: gr ? gr.width : 0,
        box: b ? { w: r(b).width, h: r(b).height, answer: b.getAttribute('data-lcs-answer'), text: b.textContent.trim() } : null,
        badge: badge ? { idx: +badge.dataset.lcsIdx, w: r(badge).width, h: r(badge).height, x: r(badge).left, y: r(badge).top } : null,
        w: r(row).width, h: r(row).height, top: r(row).top, bottom: r(row).bottom,
      };
    });
    let lowest = 0;
    document.querySelectorAll('.ws-body *:not([data-lcs-round]):not([data-lcs-lines])').forEach((el) => { const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
    const lane = document.querySelector('[data-lcs-lines]');
    return {
      body: { h: r(body).height, top: r(body).top }, foot: r(foot).top, titleH: r(title).height, lines: Math.round(r(title).height / (30 * 1.1)),
      stamps: root ? { ...root.dataset } : null,
      rulebox: box ? { w: r(box).width, h: r(box).height, top: r(box).top, bottom: r(box).bottom, step: box.dataset.lcsStep } : null,
      worked: worked ? { n: worked.dataset.lcsWorked, to: worked.dataset.lcsWorkedTo, w: r(worked).width, h: r(worked).height, digit: rd ? rd.textContent.trim() : null, color: rd ? getComputedStyle(rd).color : null, font: parseFloat(getComputedStyle(worked).fontSize) } : null,
      caps, strip, arrows, rows, lowest, lane: lane ? { w: r(lane).width, h: r(lane).height, top: r(lane).top, bottom: r(lane).bottom } : null,
      text: (document.querySelector('.ws-body') || document.body).innerText || '',
      svgs: document.querySelectorAll('.ws-body svg').length, rels: document.querySelectorAll('.ws-body svg[data-lcs-rel]').length,
      imgs: document.querySelectorAll('.ws-body img').length, lines_: document.querySelectorAll('[data-lcs-prim="number-line"]').length,
    };
  });
  return { ...out, verify: out.qa.verify, lints: out.qa.lints, m };
}

/** The node cross-check over the rendered stamps: every answer / quota re-derived from the bank + the spec's helpers. */
function crossCheck(m, bank, cfg) {
  const out = [];
  const step = cfg.step;
  const ns = m.rows.map((x) => x.n);
  if (m.rows.length !== cfg.items) out.push(`${m.rows.length} rows, config ${cfg.items}`);
  m.rows.forEach((row, i) => {
    const L = `line ${i + 1}`;
    if (row.step !== step) out.push(`${L}: step ${row.step}`);
    if (row.text !== String(row.n)) out.push(`${L}: prints "${row.text}" for ${row.n}`);
    if (!row.box || row.box.answer !== String(TYPE.round(row.n, step))) out.push(`${L}: box ${row.box && row.box.answer} != ${TYPE.round(row.n, step)}`);
    if (row.box && row.box.text) out.push(`${L}: box prints "${row.box.text}"`);
    if (row.font < 22) out.push(`${L}: numeral ${row.font} < 22`);
    if (row.box && (row.box.h < 43.4 || row.box.w < (String(TYPE.round(row.n, step)).length >= 3 ? 83.4 : 67.4))) out.push(`${L}: box ${row.box.w}x${row.box.h} below the floor`);
    if (row.numScroll > 56.6) out.push(`${L}: numeral ${row.numScroll} px overflows the 56 zone`);
    if (row.inkCy != null && row.glyphCy != null && Math.abs(row.inkCy - row.glyphCy) > 3) out.push(`${L}: glyph centre ${row.glyphCy.toFixed(1)} vs numeral ink centre ${row.inkCy.toFixed(1)} (> 3 px)`);
    if (!row.badge || row.badge.idx !== i + 1 || row.badge.w < 25.4 || row.badge.h < 25.4) out.push(`${L}: badge ${JSON.stringify(row.badge)}`);
    if (row.n === cfg.worked) out.push(`${L}: the worked number is an item`);
    if (row.n < cfg.min || row.n > cfg.max || row.n % step === 0 || TYPE.decidingDigit(row.n, step) === 0) out.push(`${L}: ${row.n} outside the pool`);
  });
  if (new Set(ns).size !== ns.length) out.push('a number twice');
  const fives = ns.filter((n) => TYPE.decidingDigit(n, step) === 5).length, ups = ns.filter((n) => TYPE.isUp(n, step)).length, carry = ns.filter((n) => TYPE.carries(n, step)).length;
  if (fives < cfg.fiveMin) out.push(`${fives} fives < ${cfg.fiveMin}`);
  if (ups < cfg.upMin || ns.length - ups < cfg.downMin) out.push(`up ${ups} / down ${ns.length - ups} under the quotas ${cfg.upMin} / ${cfg.downMin}`);
  if (carry > cfg.carryMax || carry < cfg.carryMin) out.push(`carry ${carry} outside ${cfg.carryMin}..${cfg.carryMax}`);
  if (cfg.mix) for (const [k, c] of Object.entries(cfg.mix)) if (ns.filter((n) => String(n).length === +k).length !== c) out.push(`mix ${k}-digit != ${c}`);
  const hist = {};
  ns.forEach((n) => { const d = TYPE.decidingDigit(n, step); hist[d] = (hist[d] || 0) + 1; });
  if (cfg.digitCover) for (let d = 1; d <= 9; d++) if (!hist[d]) out.push(`deciding digit ${d} absent`);
  for (const [d, c] of Object.entries(hist)) if (c > cfg.digitMax) out.push(`deciding digit ${d} x ${c} > ${cfg.digitMax}`);
  // the rule box
  if (cfg.rule) {
    if (!m.rulebox) out.push('no rule box');
    else {
      if (m.rulebox.h < 96 - 0.6 || m.rulebox.h > 100) out.push(`rule box ${m.rulebox.h.toFixed(1)} high (want 96..100)`);
      if (Math.abs(m.rulebox.w - 675) > 0.6) out.push(`rule box ${m.rulebox.w} wide (want 675)`);
      if (!m.worked || +m.worked.n !== cfg.worked || +m.worked.to !== TYPE.round(cfg.worked, step)) out.push(`worked ${JSON.stringify(m.worked)}`);
      if (m.worked && m.worked.digit !== String(TYPE.decidingDigit(cfg.worked, step))) out.push(`worked digit ${m.worked.digit}`);
      if (m.worked && m.worked.color.replace(/\s/g, '') !== 'rgb(242,120,75)') out.push(`worked digit colour ${m.worked.color}`);
      if (m.strip.map((s) => s.d).join('') !== '0123456789') out.push(`strip ${m.strip.map((s) => s.d).join('')}`);
      const ringed = m.strip.filter((s) => s.ring);
      if (ringed.length !== 1 || ringed[0].d !== String(TYPE.decidingDigit(cfg.worked, step))) out.push(`ring on ${ringed.map((s) => s.d).join(',')}`);
      if (ringed[0] && ringed[0].border.replace(/\s/g, '') !== 'rgb(242,120,75)') out.push(`ring colour ${ringed[0].border}`);
      m.strip.forEach((s) => { if (s.font < 20 || s.w < 25.4 || s.h < 25.4) out.push(`strip digit ${s.d} ${s.font}px in ${s.w}x${s.h}`); });
      if (m.arrows.map((a) => a.dir + a.text).join('|') !== 'down↓|up↑') out.push(`arrows ${JSON.stringify(m.arrows)}`);
      m.arrows.forEach((a) => { if (a.w < 8) out.push(`arrow ${a.dir} ${a.w.toFixed(1)} px wide — the glyph did not render from the font`); });
      const want = { down: bank.down[step], up: bank.up[step] };
      for (const c of m.caps) { if (c.text !== want[c.dir]) out.push(`caption ${c.dir} "${c.text}" != "${want[c.dir]}"`); if (c.w > 118) out.push(`caption ${c.dir} ${c.w.toFixed(1)} px > 118 (refuse the literal, never the font)`); if (c.font < 12) out.push(`caption ${c.dir} font ${c.font}`); if (c.overflow > 0) out.push(`caption ${c.dir} overflows`); }
      if (m.caps.length !== 2) out.push(`${m.caps.length} captions`);
    }
  } else if (m.rulebox) out.push('a rule box on a withdrawn-rule page');
  if (m.svgs !== m.rels) out.push(`${m.svgs} SVGs, ${m.rels} relation glyphs`);
  if (m.imgs) out.push('an img');
  if (m.lines_) out.push('a number line');
  if (/[≈→<>]/.test(m.text)) out.push('U+2248 / U+2192 / < / > in the body text');
  if (/(?<!\d)\d{4,}/.test(m.text)) out.push('a 4-digit number in the body text');
  return out;
}

function assertRender(name, r, cfg, bank) {
  ok(r.verify.length === 0, `${name}: verify ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  const cc = crossCheck(r.m, bank, cfg);
  ok(cc.length === 0, `${name}: node cross-check ${cc.join(' | ')}`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: lowest ink ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
  ok(r.m.lane && r.m.lane.bottom <= r.m.body.top + r.m.body.h + 0.6, `${name}: the lane ${Math.round(r.m.lane ? r.m.lane.bottom : 0)} spills past the body ${Math.round(r.m.body.top + r.m.body.h)}`);
}

/** A type whose bodyHtml is post-processed (render poisons); a mutation that matches nothing THROWS (a silent no-op is a hollow poison). */
function mutated(type, fn) { return { ...type, build: async (a, c) => { const b = await type.build(a, c); const h = fn(b.bodyHtml); if (h === b.bodyHtml) throw new Error('mutation matched nothing'); return { ...b, bodyHtml: h }; } }; }
/** A type over an injected bank / config (poisons that bypass the validator) */
function withBank(type, bank, cfg) { return { ...type, build: (a, c) => type._buildWith(bank, cfg || type.difficulty[a.difficulty], { locale: a.locale }, c) }; }

/** Long-chrome fixtures (the lines are measured and asserted): 3-line title + 3-line instruction (README 722, measures ~710) · 4-line title (677). */
const CHROME = {
  three: { title: 'Rounding to the Nearest Ten: Read the Ones Digit of Every Number and Write', instruction: 'Read the ones digit of every number on the page and decide whether it belongs to the round-down group or the round-up group. Then write the nearest ten in the box beside it.' },
  four: { title: 'Pyöristäminen kymmenien tarkkuuteen: lue jokaisen luvun ykkösnumero ja kirjoita lähin kymmenluku', instruction: 'Read the ones digit of every number on the page and decide whether it belongs to the round-down group or the round-up group. Then write the nearest ten in the box beside it.' },
};

/** Synthetic locale blocks (the design's §1 literals + §6 title candidates; the fr F1 title rewritten — see the build record) — must-pass controls for the non-EN rules. */
const SYNTH = {
  de: { up: { 10: 'aufrunden', 100: 'aufrunden' }, down: { 10: 'abrunden', 100: 'abrunden' }, heads: { 10: 'Zehner', 100: 'Hunderter' }, relation: 'approx',
    strings: { base: ['Zahlen runden auf Zehner', 'Runde jede Zahl auf den nächsten Zehner und schreibe sie in das Kästchen.'], sort: ['Aufrunden oder abrunden? Zahlen sortieren', 'Schreibe jede Zahl in das richtige Feld.'], hundred: ['Zahlen runden auf Hunderter', 'Runde jede Zahl auf den nächsten Hunderter und schreibe sie in das Kästchen.'], estimate: ['Runden und überschlagen: Summen schätzen', 'Runde beide Zahlen und addiere die gerundeten Zahlen.'], inverse: ['Welche Zahlen runden auf 50?', 'Kreise jede Zahl ein, die auf den Zehner oben rundet.'], both: ['Runden auf Zehner und Hunderter', 'Runde jede Zahl zweimal: auf den Zehner und auf den Hunderter.'] } },
  es: { up: { 10: 'hacia arriba', 100: 'hacia arriba' }, down: { 10: 'hacia abajo', 100: 'hacia abajo' }, heads: { 10: 'decena', 100: 'centena' }, relation: 'approx',
    strings: { base: ['Redondeo a la decena más cercana', 'Redondea cada número a la decena más cercana y escríbelo en el cuadro.'], sort: ['¿Hacia arriba o hacia abajo? Clasifica los números', 'Escribe cada número en el cajón correcto.'], hundred: ['Redondeo de números a la centena', 'Redondea cada número a la centena más cercana y escríbelo en el cuadro.'], estimate: ['Redondeo y estimación de sumas', 'Redondea los dos números y suma los números redondeados.'], inverse: ['¿Qué números se redondean a 50?', 'Encierra cada número que se redondea a la decena de arriba.'], both: ['Redondeo a la decena y a la centena', 'Redondea cada número dos veces: a la decena y a la centena.'] } },
  pt: { up: { 10: 'para cima', 100: 'para cima' }, down: { 10: 'para baixo', 100: 'para baixo' }, heads: { 10: 'dezena', 100: 'centena' }, relation: 'approx',
    strings: { base: ['Arredondamento de números para a dezena', 'Arredonde cada número para a dezena mais próxima e escreva no quadro.'], sort: ['Arredondar para cima ou para baixo? Classifique os números', 'Escreva cada número na caixa certa.'], hundred: ['Arredondamento de números para a centena', 'Arredonde cada número para a centena mais próxima e escreva no quadro.'], estimate: ['Arredondar e estimar a soma', 'Arredonde os dois números e some os números arredondados.'], inverse: ['Quais números arredondam para 50?', 'Circule cada número que arredonda para a dezena de cima.'], both: ['Arredondamento para a dezena e a centena', 'Arredonde cada número duas vezes: para a dezena e para a centena.'] } },
  fr: { up: { 10: 'dizaine supérieure', 100: 'centaine supérieure' }, down: { 10: 'dizaine inférieure', 100: 'centaine inférieure' }, heads: { 10: 'dizaine', 100: 'centaine' }, relation: 'approx',
    strings: { base: ['Arrondir à la dizaine près', 'Arrondis chaque nombre à la dizaine la plus proche et écris-le dans la case.'], sort: ['Arrondir vers le haut ou vers le bas ? Trie les nombres', 'Écris chaque nombre dans la bonne boîte.'], hundred: ['Arrondir les nombres à la centaine', 'Arrondis chaque nombre à la centaine la plus proche et écris-le dans la case.'], estimate: ['Arrondir puis estimer la somme', 'Arrondis les deux nombres, puis additionne les nombres arrondis.'], inverse: ['Quels nombres s’arrondissent à 50 ?', 'Entoure chaque nombre qui s’arrondit à la dizaine du haut.'], both: ['Arrondir à la dizaine et à la centaine', 'Arrondis chaque nombre deux fois : à la dizaine, puis à la centaine.'] } },
  it: { up: { 10: 'per eccesso', 100: 'per eccesso' }, down: { 10: 'per difetto', 100: 'per difetto' }, heads: { 10: 'decina', 100: 'centinaio' }, relation: 'approx',
    strings: { base: ['Arrotondare i numeri alla decina', 'Arrotonda ogni numero alla decina e scrivilo nel riquadro.'], sort: ['Arrotondare per eccesso o per difetto', 'Scrivi ogni numero nella scatola giusta.'], hundred: ['Arrotondare i numeri al centinaio', 'Arrotonda ogni numero al centinaio e scrivilo nel riquadro.'], estimate: ['Arrotondare e stimare la somma', 'Arrotonda i due numeri e somma i numeri arrotondati.'], inverse: ['Quali numeri si arrotondano a 50?', 'Cerchia ogni numero che si arrotonda alla decina in alto.'], both: ['Arrotondare alla decina e al centinaio', 'Arrotonda ogni numero due volte: alla decina e al centinaio.'] } },
  nl: { up: { 10: 'naar boven', 100: 'naar boven' }, down: { 10: 'naar beneden', 100: 'naar beneden' }, heads: { 10: 'tiental', 100: 'honderdtal' }, relation: 'approx',
    strings: { base: ['Afronden op tientallen: schrijf het tiental', 'Rond elk getal af op het tiental en schrijf het in het vak.'], sort: ['Naar boven of naar beneden afronden? Sorteer de getallen', 'Schrijf elk getal in de juiste bak.'], hundred: ['Afronden op honderdtallen: schrijf het honderdtal', 'Rond elk getal af op het honderdtal en schrijf het in het vak.'], estimate: ['Afronden en schatten: de som', 'Rond beide getallen af en tel de afgeronde getallen op.'], inverse: ['Welke getallen ronden af op 50?', 'Omcirkel elk getal dat afrondt op het tiental bovenaan.'], both: ['Afronden op tientallen en honderdtallen', 'Rond elk getal twee keer af: op het tiental en op het honderdtal.'] } },
  sv: { up: { 10: 'avrunda uppåt', 100: 'avrunda uppåt' }, down: { 10: 'avrunda nedåt', 100: 'avrunda nedåt' }, heads: { 10: 'tiotal', 100: 'hundratal' }, relation: 'approx',
    strings: { base: ['Avrundning till tiotal', 'Avrunda varje tal till tiotal och skriv det i rutan.'], sort: ['Avrunda uppåt eller nedåt? Sortera talen', 'Skriv varje tal i rätt låda.'], hundred: ['Avrundning till hundratal: skriv talet', 'Avrunda varje tal till hundratal och skriv det i rutan.'], estimate: ['Överslagsräkning: avrunda och addera', 'Avrunda båda talen och addera de avrundade talen.'], inverse: ['Vilka tal avrundas till 50?', 'Ringa in varje tal som avrundas till tiotalet överst.'], both: ['Avrunda till tiotal och hundratal', 'Avrunda varje tal två gånger: till tiotal och till hundratal.'] } },
  da: { up: { 10: 'rund op', 100: 'rund op' }, down: { 10: 'rund ned', 100: 'rund ned' }, heads: { 10: 'tier', 100: 'hundrede' }, relation: 'approx',
    strings: { base: ['Afrunding til nærmeste tier', 'Afrund hvert tal til nærmeste tier og skriv det i boksen.'], sort: ['Rund op eller rund ned? Sortér tallene', 'Skriv hvert tal i den rigtige kasse.'], hundred: ['Afrunding til nærmeste 100', 'Afrund hvert tal til nærmeste hundrede og skriv det i boksen.'], estimate: ['Afrunding og overslag: læg sammen', 'Afrund begge tal og læg de afrundede tal sammen.'], inverse: ['Hvilke tal afrundes til 50?', 'Sæt ring om hvert tal, der afrundes til tieren øverst.'], both: ['Afrunding til nærmeste tier og hundrede', 'Afrund hvert tal to gange: til nærmeste tier og til nærmeste hundrede.'] } },
  no: { up: { 10: 'rund opp', 100: 'rund opp' }, down: { 10: 'rund ned', 100: 'rund ned' }, heads: { 10: 'tier', 100: 'hundrer' }, relation: 'approx',
    strings: { base: ['Avrunding til nærmeste tier', 'Rund av hvert tall til nærmeste tier og skriv det i boksen.'], sort: ['Rund opp eller rund ned? Sorter tallene', 'Skriv hvert tall i riktig kasse.'], hundred: ['Avrund tall til nærmeste hundrer', 'Rund av hvert tall til nærmeste hundrer og skriv det i boksen.'], estimate: ['Avrunding og overslag: legg sammen', 'Rund av begge tallene og legg de avrundede tallene sammen.'], inverse: ['Hvilke tall avrundes til 50?', 'Sett ring rundt hvert tall som avrundes til tieren øverst.'], both: ['Avrunding til nærmeste tier og hundrer', 'Rund av hvert tall to ganger: til nærmeste tier og til nærmeste hundrer.'] } },
  fi: { up: { 10: 'ylöspäin', 100: 'ylöspäin' }, down: { 10: 'alaspäin', 100: 'alaspäin' }, heads: { 10: 'kymmenen tarkkuudella', 100: 'sadan tarkkuudella' }, relation: 'approx',
    strings: { base: ['Pyöristäminen kymmenien tarkkuuteen', 'Pyöristä luku lähimpään kymmeneen ja kirjoita se laatikkoon.'], sort: ['Ylöspäin vai alaspäin? Lajittele luvut', 'Kirjoita jokainen luku oikeaan laatikkoon.'], hundred: ['Pyöristäminen satojen tarkkuuteen', 'Pyöristä luku lähimpään sataan ja kirjoita se laatikkoon.'], estimate: ['Pyöristä ja arvioi summa', 'Pyöristä molemmat luvut ja laske pyöristetyt luvut yhteen.'], inverse: ['Mitkä luvut pyöristyvät lukuun 50?', 'Ympyröi jokainen luku, joka pyöristyy ylimpänä olevaan kymmeneen.'], both: ['Pyöristäminen kymmenien ja satojen tarkkuuteen', 'Pyöristä jokainen luku kahdesti: kymmenien ja satojen tarkkuuteen.'] } },
};
function synthetic(loc) {
  const s = SYNTH[loc];
  if (!s) throw new Error('no synthetic block for ' + loc);
  const strings = {};
  for (const [f, [title, instruction]] of Object.entries(s.strings)) strings[f] = { title, instruction };
  return { up: clone(s.up), down: clone(s.down), heads: clone(s.heads), relation: s.relation, strings, refuse: [], strand: 'x' };
}

/* ------------------------------------------------------------------ main ------------------------------------------------------------------ */

async function main() {
  const all = bankModule('rounding');
  const en = all.en;
  const t0 = Date.now();
  console.log(`verify-b4-rounding ${QUICK ? '(--quick) ' : ''}— locales on disk: ${Object.keys(all).join(' ')}`);

  // ---- 1. the bank(s)
  for (const loc of Object.keys(all)) {
    const errs = validateBank(all[loc], loc);
    ok(errs.length === 0, `bank ${loc}: ${errs.join(' | ')}`);
    console.log(`bank ${loc}: ${errs.length ? errs.length + ' fails' : 'clean'} (relation ${all[loc].relation}, faces ${Object.keys(all[loc].strings).length}, refuse ${JSON.stringify(all[loc].refuse)})`);
  }
  // the synthetic blocks are must-pass controls for the non-EN rules (rule 11: the non-en slugs are the registrar's next step)
  const NOT_YET = /^rule 11: axes/;
  for (const loc of LOCALES.filter((l) => l !== 'en')) {
    const errs = validateBank(synthetic(loc), loc).filter((e) => !NOT_YET.test(e));
    ok(errs.length === 0, `synthetic ${loc} control: ${errs.join(' | ')}`);
  }
  // the token rule's own controls (rule 6 / 7 must be able to fire AND to pass)
  ok(tokenDistinct('Rounding to the Nearest 10', 'Round It!', 'en') && tokenDistinct('Rounding to the Nearest 100', 'Round to the Hundred', 'en'), 'token rule: the en base / F2 titles are distinct from G2-221 / G3-323');
  ok(!tokenDistinct('Rounding to the Nearest Ten', 'Round to the Ten', 'en'), 'token rule control: "Rounding to the Nearest Ten" vs "Round to the Ten" is NOT distinct (nearest is an adjective)');
  ok(!tokenDistinct('Afronden op tientallen', 'Afronden op tiental', 'nl'), 'token rule control: nl plural is not a token');
  ok(!tokenDistinct('Avrundning till hundratal', 'Avrunda till hundratal', 'sv'), 'token rule control: sv avrundning ≡ avrunda');
  ok(tokenDistinct('Avrund tall til nærmeste hundrer', 'Avrund til hundre', 'no') && !tokenDistinct('Avrund til nærmeste hundrer', 'Avrund til hundre', 'no'), 'token rule control: no hundrer ≡ hundre, nærmeste does not count, tall does');

  // ---- config poisons (resolveBase refuses) + the control
  const d2 = TYPE.difficulty[2];
  const refuses = (name, cfg, re) => { let m = null; try { TYPE.resolveBase(cfg, en); } catch (e) { m = e.message; } ok(m && re.test(m), `config poison ${name}: ${m || 'resolveBase did NOT refuse'}`); };
  ok((() => { try { TYPE.resolveBase(d2, en); return true; } catch (e) { return false; } })(), 'control: the shipped d2 config resolves');
  refuses('20 items', { ...d2, items: 20, mix: { 2: 10, 3: 10 } }, /outside the G2-3 window/);
  refuses('7 items', { ...d2, items: 7, mix: null }, /outside the G2-3 window|do not fill/);
  refuses('mix 6 + 7 for 14', { ...d2, mix: { 2: 6, 3: 7 } }, /sums to 13/);
  refuses('fiveMin 1 with the rule', { ...d2, fiveMin: 1 }, /fiveMin 1 < 2/);
  refuses('min 0', { ...d2, min: 0 }, /range 0\.\.994/);
  refuses('max 1000', { ...d2, max: 1000 }, /range 11\.\.1000/);
  refuses('upMin + downMin > items', { ...d2, upMin: 8, downMin: 8 }, /> items 14/);
  refuses('digitMax 1 for 14', { ...d2, digitMax: 1 }, /cannot spread over 9 deciding digits/);
  refuses('cols 3', { ...d2, cols: 3 }, /cols 3/);
  refuses('steps [5]', { ...d2, steps: [5] }, /steps must be/);
  refuses('rowH 40', { ...d2, rowH: 40 }, /rowH 40 < 44/);
  { let m = null; try { TYPE.resolveBase(d2, { ...en, relation: 'wave' }); } catch (e) { m = e.message; } ok(m && /relation must be/.test(m), `config poison relation "wave": ${m || 'not refused'}`); }
  { let m = null; try { TYPE._buildWith(en, { ...d2, steps: [10, 100] }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(m && /Phase 2 face/.test(m), `F5 steps on the base path: ${m || 'built silently'}`); }
  { let m = null; try { TYPE._buildWith(en, { ...d2, mode: 'sort' }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(m && /Phase 2 face/.test(m), `mode:'sort' on the base path: ${m || 'built silently'}`); }
  { let m = null; try { TYPE._buildWith({ ...en, down: { 100: 'round down' } }, d2, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(m && /has no down\[10\] literal/.test(m), `a bank without down[10] refuses: ${m || 'built silently'}`); }
  // component throws (contracts)
  const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `${what}: ${m || 'did NOT throw'}`); };
  throws(() => C4.roundRow({ idx: 1, n: 47, step: 10, answer: 40 }), /answer 40 != round/, 'roundRow wrong answer');
  throws(() => C4.roundRow({ idx: 1, n: 50, step: 10, answer: 50 }), /multiple of 10/, 'roundRow n 50');
  throws(() => C4.roundRow({ idx: 1, n: 996, step: 10, answer: 1000 }), />= 1000/, 'roundRow 996');
  throws(() => C4.roundRow({ idx: 1, n: 47, step: 10, answer: 50, boxH: 40 }), /below the 68 x 44 floor/, 'roundRow box 40 high');
  throws(() => C4.workedLine({ n: 47, step: 10, to: 40 }), /to 40 != round/, 'workedLine to 40');
  throws(() => C4.digitStrip({ step: 10, ring: 10, captions: { down: 'a', up: 'b' } }), /ring must be a digit/, 'digitStrip ring 10');
  throws(() => C4.digitStrip({ step: 10, ring: 7, captions: { down: 'a' } }), /captions/, 'digitStrip missing caption');
  throws(() => C4.roundGlyph({ kind: 'tilde' }), /kind must be/, 'roundGlyph kind tilde');
  throws(() => C4.updownBins({ down: { label: 'a' }, up: { label: 'b' }, cellH: 40 }), /cellH 40 < 44/, 'updownBins cell 40');
  throws(() => C4.estimateRow({ idx: 1, a: 20, b: 48 }), /multiple of 10/, 'estimateRow addend 20');
  throws(() => C4.numberField({ target: 50, values: [45, 46, 50, 51] }), /the target/, 'numberField target among the values');
  throws(() => C4.placeHeader({ heads: ['a', 'b'], centres: [178, 306] }), /cells overlap/, 'placeHeader centres 128 apart (the P12 shape)');
  throws(() => C4.twoTargetRow({ idx: 1, n: 472, answers: [470, 400] }), /answers/, 'twoTargetRow wrong answers');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    // ---- 2. renders
    const cfgOf = (d) => TYPE.resolveBase(TYPE.difficulty[d], en);
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G2-346-gate-d${d}-en` });
      assertRender(`d${d} en`, r, cfgOf(d), en);
      const rows = r.m.rows;
      console.log(`render d${d} en: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} rulebox ${r.m.rulebox ? r.m.rulebox.h.toFixed(1) : '-'} worked ${r.m.worked ? r.m.worked.w.toFixed(1) : '-'} caps ${r.m.caps.map((c) => c.text + '@' + c.w.toFixed(1)).join(' ')} rows ${rows.length} x ${rows[0].h} (w ${rows[0].w.toFixed(1)}) glyph-vs-ink ${Math.max(...rows.map((x) => Math.abs(x.inkCy - x.glyphCy))).toFixed(2)}px lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)} items ${rows.map((x) => x.n).join(',')}`);
    }
    // the 722 chrome (3-line title + 3-line instruction) and the 677 chrome (4-line title): d2 fits BOTH; d1 / d3 fit 677
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G2-346-gate-d2-en-chrome722', strings: CHROME.three });
      ok(r.m.lines === 3, `the 722 chrome fixture title wraps to ${r.m.lines} lines, want 3`);
      ok(r.m.body.h <= 724 && r.m.body.h >= 700, `3+3 chrome fixture gives body ${Math.round(r.m.body.h)} (README 722; G1-352 measured 710)`);
      assertRender('d2 en 3+3 chrome', r, cfgOf(2), en);
      console.log(`render d2 en 3+3 chrome: body ${r.m.body.h.toFixed(1)} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)} (stack 636, slack ${Math.round(r.m.body.h - 636)})`);
      const r4 = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G2-346-gate-d2-en-chrome677', strings: CHROME.four });
      ok(r4.m.lines === 4, `the 677 chrome fixture title wraps to ${r4.m.lines} lines, want 4`);
      ok(r4.m.body.h <= 690 && r4.m.body.h >= 660, `677 chrome fixture gives body ${Math.round(r4.m.body.h)} (want ~677)`);
      assertRender('d2 en 677 chrome', r4, cfgOf(2), en);
      console.log(`render d2 en 677 chrome: body ${r4.m.body.h.toFixed(1)} lowest ${Math.round(r4.m.lowest)} vs foot ${Math.round(r4.m.foot)} (slack ${Math.round(r4.m.body.h - 636)})`);
      for (const d of [1, 3]) {
        const rr = await renderWith(page, TYPE, { difficulty: d, baseName: `G2-346-gate-d${d}-en-chrome677`, strings: CHROME.four });
        assertRender(`d${d} en 677 chrome`, rr, cfgOf(d), en);
        console.log(`render d${d} en 677 chrome: body ${rr.m.body.h.toFixed(1)} lowest ${Math.round(rr.m.lowest)} vs foot ${Math.round(rr.m.foot)}`);
      }
      // the sparse-page rule: the d2 stack leaves <= 180 px under the ONE-line chrome (the brief)
      const r1 = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G2-346-gate-d2-en-chrome1', strings: { title: 'Rounding to the Nearest 10', instruction: 'Round each number to the nearest ten.' } });
      ok(r1.m.body.h >= 800, `one-line chrome fixture gives body ${Math.round(r1.m.body.h)} (want ~814)`);
      ok(r1.m.body.h - 636 <= 180, `d2 stack 636 leaves ${Math.round(r1.m.body.h - 636)} px of slack under the one-line chrome (> 180 = sparse)`);
      assertRender('d2 en one-line chrome', r1, cfgOf(2), en);
      console.log(`render d2 en one-line chrome: body ${r1.m.body.h.toFixed(1)} slack ${Math.round(r1.m.body.h - 636)}`);
    }

    // ---- component smoke: the face components through the real pipeline (+ the P3 control)
    {
      const fake = (html, id) => ({ ...TYPE, id, build: async () => ({ bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;gap:12px;min-height:0">${html}</div>`, meta: {} }), verify: async () => [] });
      // page A: the F3 rule box + the F1 bins + an F3 lane; page B: the F4 lane + an F5 lane (one page would overflow 945)
      const bodyA = [
        C4.roundRuleBox({ step: 10, lines: [C4.workedLine({ expr: '23 + 48', a: 23, b: 48, step: 10, px: 26 })], strip: C4.digitStrip({ step: 10, ring: 8, captions: { down: en.down[10], up: en.up[10] } }) }),
        C4.updownBins({ down: { label: en.down[10] }, up: { label: en.up[10] } }),
        `<div class="ws-lane" data-ws-content style="display:grid;grid-auto-rows:48px;row-gap:12px;justify-items:center">` + C4.estimateRow({ idx: 1, a: 23, b: 48 }) + C4.estimateRow({ idx: 2, a: 88, b: 88, step: 10 }) + `</div>`,
      ].join('');
      const bodyB = [
        `<div class="ws-lane" data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:16px">` + C4.targetPill({ target: 50 }) + C4.numberField({ target: 50, values: [45, 31, 55, 62, 49, 44, 38, 67, 51, 33, 58, 46, 41, 69, 52, 36] }) + `</div>`,
        `<div class="ws-lane" data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:6px">` + C4.placeHeader({ heads: [en.heads[10], en.heads[100]] }) + C4.twoTargetRow({ idx: 1, n: 472, answers: [470, 500] }) + `</div>`,
      ].join('');
      const MEASURE = () => {
        const rr = (el) => el.getBoundingClientRect();
        const out = {};
        out.bins = [...document.querySelectorAll('[data-lcs-bin]')].map((b) => ({ dir: b.dataset.lcsBin, w: rr(b).width, h: rr(b).height, cells: b.querySelectorAll('.ws-blankbox').length, pill: rr(b.querySelector('[data-lcs-bin-label]')).width, pillH: rr(b.querySelector('[data-lcs-bin-label]')).height, empty: [...b.querySelectorAll('.ws-blankbox')].every((x) => !x.textContent.trim() && x.getAttribute('data-lcs-answer') === '') }));
        out.est = [...document.querySelectorAll('[data-lcs-a]')].map((row) => ({ w: rr(row).width, expr: row.querySelector('[data-lcs-expr]').scrollWidth, answers: [...row.querySelectorAll('.ws-blankbox')].map((b) => b.getAttribute('data-lcs-answer')) }));
        const field = document.querySelector('[data-lcs-field]');
        if (field) {
          out.fieldRows = [...field.children].map((row) => rr(row).width);
          out.pills = [...field.querySelectorAll('[data-lcs-val]')].map((p) => ({ v: p.dataset.lcsVal, w: rr(p).width, h: rr(p).height, font: parseFloat(getComputedStyle(p).fontSize), attrs: p.getAttributeNames().join(',') }));
          out.gapX = rr(field.querySelectorAll('[data-lcs-val]')[1]).left - rr(field.querySelectorAll('[data-lcs-val]')[0]).right;
          const tp = document.querySelector('[data-lcs-target-pill]');
          out.tp = { w: rr(tp).width, h: rr(tp).height, text: tp.textContent.trim() };
        }
        const row5 = document.querySelector('[data-lcs-steps]');
        if (row5) {
          out.boxes5 = [...row5.querySelectorAll('.ws-blankbox')].map((b) => ({ cx: rr(b).left + rr(b).width / 2 - rr(row5).left, answer: b.getAttribute('data-lcs-answer'), step: b.dataset.lcsStep }));
          out.heads = [...document.querySelectorAll('[data-lcs-head]')].map((c) => { const range = document.createRange(); range.selectNodeContents(c); return { step: c.dataset.lcsHead, cx: rr(c).left + rr(c).width / 2 - rr(row5).left, textW: range.getBoundingClientRect().width, w: rr(c).width, font: parseFloat(getComputedStyle(c).fontSize) }; });
        }
        const worked = document.querySelector('[data-lcs-worked]');
        if (worked) out.worked = { w: rr(worked).width, text: worked.textContent.replace(/s+/g, ' ').trim(), rounded: worked.querySelector('[data-lcs-rounded-expr]') && worked.querySelector('[data-lcs-rounded-expr]').textContent.trim() };
        // the P3 CONTROL: after every [data-lcs-num] / [data-lcs-expr] the next non-blank node is the SVG glyph — F3's `=` follows a BOX, so it passes
        out.eqAfterNumeral = [...document.querySelectorAll('[data-lcs-num], [data-lcs-expr]')].filter((num) => { let n = num.nextSibling; while (n && ((n.nodeType === 3 && !n.textContent.trim()) || (n.nodeType === 1 && n.tagName === 'SPAN' && !n.textContent.trim() && !n.querySelector('svg')))) n = n.nextSibling; return !(n && n.nodeType === 1 && n.tagName.toLowerCase() === 'svg' && n.hasAttribute('data-lcs-rel')); }).length;
        out.eqCount = (document.querySelector('.ws-body').innerText.match(/=/g) || []).length;
        const rb = document.querySelector('[data-lcs-rulebox]');
        out.rulebox = rb ? rr(rb).height : null;
        return out;
      };
      const rA = await renderWith(page, fake(bodyA, 'G2-346'), { baseName: 'G2-346-gate-components-a' });
      ok(rA.lints.length === 0, `components smoke A: lints ${JSON.stringify(rA.lints)}`);
      const h = await page.evaluate(MEASURE);
      const rB = await renderWith(page, fake(bodyB, 'G2-346'), { baseName: 'G2-346-gate-components-b' });
      ok(rB.lints.length === 0, `components smoke B: lints ${JSON.stringify(rB.lints)}`);
      const hB = await page.evaluate(MEASURE);
      for (const k of ['fieldRows', 'pills', 'gapX', 'tp', 'boxes5', 'heads']) h[k] = hB[k];
      ok(h.bins.length === 2 && h.bins[0].dir === 'down' && h.bins[1].dir === 'up', `updownBins order ${h.bins.map((b) => b.dir).join(',')} (down LEFT, up RIGHT)`);
      ok(h.bins.every((b) => Math.abs(b.h - 232) <= 0.6 && Math.abs(b.w - 330) <= 0.6 && b.cells === 9 && b.empty && b.pillH >= 40 && b.pill <= 300), `updownBins ${JSON.stringify(h.bins)} (design 330 x 232, 9 empty cells, pill <= 300)`);
      ok(h.est.length === 2 && h.est.every((e) => e.w <= 639 && Math.abs(e.w - 433) <= 2 && e.expr <= 80), `estimateRow widths ${h.est.map((e) => e.w.toFixed(1) + ' expr ' + e.expr).join(' / ')} (design 433, expr <= 80)`);
      ok(h.est[0].answers.join(',') === '20,50,70' && h.est[1].answers.join(',') === '90,90,180', `estimateRow answers ${h.est.map((e) => e.answers.join(',')).join(' | ')}`);
      ok(h.eqAfterNumeral === 0, `P3 CONTROL: F3's [ ] + [ ] = [ ] passes the =-after-a-numeral scan (${h.eqAfterNumeral} numerals followed by a non-glyph)`);
      ok(h.eqCount === 3, `smoke page A prints exactly 3 legal = (the F3 worked line + two rows), got ${h.eqCount}`);
      ok(h.worked.rounded === '20 + 50 = 70' && Math.abs(h.worked.w - 257) <= 6, `F3 workedLine "${h.worked.text}" ${h.worked.w.toFixed(1)} px (design 257)`);
      ok(h.rulebox >= 95.4 && h.rulebox <= 100, `F3 rule box ${h.rulebox} (want 96)`);
      ok(h.fieldRows.length === 4 && h.fieldRows.every((w) => w <= 639) && Math.abs(h.fieldRows[0] - 456) <= 1, `numberField rows ${h.fieldRows.map((w) => w.toFixed(0)).join('/')} (design 456 + stagger)`);
      ok(h.pills.length === 16 && h.pills.every((p) => p.w >= 95.4 && p.h >= 51.4 && p.font >= 26 && !/correct|member/.test(p.attrs)), `numberField pills ${h.pills.length}, floors ${JSON.stringify(h.pills[0])}`);
      ok(h.gapX >= 20, `numberField pill gap ${h.gapX.toFixed(1)} >= 20 (the pencil-ring reserve)`);
      ok(Math.abs(h.tp.w - 98) <= 6 && h.tp.h >= 51.4 && h.tp.text === '50', `targetPill ${JSON.stringify(h.tp)} (design 98 x 52)`);
      ok(h.boxes5.length === 2 && Math.abs(h.boxes5[0].cx - 178) <= 1 && Math.abs(h.boxes5[1].cx - 338) <= 1 && h.boxes5[0].answer === '470' && h.boxes5[1].answer === '500', `twoTargetRow box centres ${h.boxes5.map((b) => b.cx.toFixed(1)).join(' / ')} answers ${h.boxes5.map((b) => b.answer).join(',')} (design 178 / 338)`);
      ok(h.heads.length === 2 && h.heads.every((c, i) => Math.abs(c.cx - h.boxes5[i].cx) <= 1 && c.textW <= 156 && c.font >= 13 && Math.abs(c.w - 160) <= 0.6), `placeHeader cells ${JSON.stringify(h.heads)} (centres within 1 px of the boxes, text <= 156 at N13)`);
      console.log(`components: bins ${h.bins.map((b) => b.w.toFixed(0) + 'x' + b.h.toFixed(0) + ' pill ' + b.pill.toFixed(1)).join(' / ')} · estimateRow ${h.est.map((e) => e.w.toFixed(1)).join(' / ')} (F3 worked ${h.worked.w.toFixed(1)}, rule box ${h.rulebox}) · field rows ${h.fieldRows.map((w) => w.toFixed(0)).join('/')} gap ${h.gapX.toFixed(1)} · targetPill ${h.tp.w.toFixed(1)}x${h.tp.h.toFixed(1)} · F5 centres ${h.boxes5.map((b) => b.cx.toFixed(1)).join('/')} heads ${h.heads.map((c) => c.cx.toFixed(1) + '@' + c.textW.toFixed(1)).join(' ')}`);
    }

    // ---- 3. sweep
    if (!QUICK) {
      for (const d of [1, 2, 3]) {
        const cfg = cfgOf(d);
        const sets = new Set(), orders = new Set();
        for (let s = 1; s <= 20; s++) {
          const rng = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: d, seedEpoch: 1, variant: s }));
          const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
          const ns = b.meta.items;
          const step = cfg.step;
          ok(ns.length === cfg.items && new Set(ns).size === ns.length, `sweep d${d} seed ${s}: ${ns.length} items, distinct ${new Set(ns).size}`);
          ok(!ns.includes(cfg.worked), `sweep d${d} seed ${s}: the worked number is an item`);
          ok(ns.every((n) => n >= cfg.min && n <= cfg.max && n % step !== 0 && TYPE.round(n, step) <= 999), `sweep d${d} seed ${s}: an item outside the pool`);
          const fives = ns.filter((n) => TYPE.decidingDigit(n, step) === 5).length, ups = ns.filter((n) => TYPE.isUp(n, step)).length, carry = ns.filter((n) => TYPE.carries(n, step)).length;
          ok(fives >= cfg.fiveMin && ups >= cfg.upMin && ns.length - ups >= cfg.downMin && carry <= cfg.carryMax && carry >= cfg.carryMin, `sweep d${d} seed ${s}: fives ${fives} up ${ups} down ${ns.length - ups} carry ${carry}`);
          if (cfg.mix) ok(Object.entries(cfg.mix).every(([k, c]) => ns.filter((n) => String(n).length === +k).length === c), `sweep d${d} seed ${s}: mix`);
          const hist = {};
          ns.forEach((n) => { const dd = TYPE.decidingDigit(n, step); hist[dd] = (hist[dd] || 0) + 1; });
          ok((!cfg.digitCover || [1, 2, 3, 4, 5, 6, 7, 8, 9].every((dd) => hist[dd])) && Object.values(hist).every((c) => c <= cfg.digitMax), `sweep d${d} seed ${s}: deciding digits ${JSON.stringify(hist)}`);
          ok(b.meta.answers.every((a, i) => a === TYPE.round(ns[i], step)), `sweep d${d} seed ${s}: answers`);
          // a locale-neutral seed: the same numbers over a synthetic de block
          const rng2 = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: d, seedEpoch: 1, variant: s }));
          const b2 = TYPE._buildWith(synthetic('de'), TYPE.difficulty[d], { locale: 'de' }, { rng: rng2 });
          ok(b2.meta.items.join(',') === ns.join(','), `sweep d${d} seed ${s}: the de build draws different numbers (locale-neutral seed broken)`);
          sets.add(ns.slice().sort((x, y) => x - y).join(',')); orders.add(ns.join(','));
        }
        ok(sets.size >= 2 && orders.size >= 2, `sweep d${d}: ${sets.size} distinct sets / ${orders.size} orders over 20 seeds`);
        console.log(`sweep d${d}: 20 seeds, ${sets.size} distinct sets, ${orders.size} distinct orders`);
      }
    }

    // ---- 4. poisons — bank (validator)
    const poison = (name, block, loc, re, opts) => {
      const errs = validateBank(block, loc, { probe: false, ...opts }).filter((e) => !NOT_YET.test(e));
      const hit = errs.filter((e) => re.test(e));
      if (!errs.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT (the validator passed the poison)`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${errs.join(' | ')}`); }
      else { asserts++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    let b;
    b = synthetic('de'); b.relation = 'arrow'; poison('P19 de relation arrow', b, 'de', /rule 3: de relation must be 'approx'/);
    b = synthetic('sv'); b.strings.hundred.title = 'Avrundning till hundratal'; poison('P20 sv F2 "Avrundning till hundratal" vs G3-323', b, 'sv', /rule 6: hundred title .* G3-323/);
    b = synthetic('nl'); b.strings.base.title = 'Afronden op tientallen'; poison('P21 nl base "Afronden op tientallen" vs G2-221', b, 'nl', /rule 6: base title .* G2-221/);
    b = clone(en); b.strings.hundred.title = 'Rounding to the Nearest Tenth'; poison('P22 en F2 "Tenth"', b, 'en', /rule 9: en hundred title/);
    b = synthetic('fr'); b.strings.base.instruction = 'Arrondis comme au CP : arrondi CP.'; poison('P23 fr "arrondi CP"', b, 'fr', /rule 9: fr base\.instruction/);
    b = clone(en); b.strings.base.instruction = 'Round each number to the nearest ten. Comes with answers.'; poison('P24 en "with answers"', b, 'en', /rule 5: .* promises an answer key/);
    b = clone(en); b.strings.sort.title = 'Rounding Up or Down? Sort the Numbers (Answer Key)'; poison('P24b en "Answer Key" in a title', b, 'en', /rule 5: .* promises an answer key/);
    b = synthetic('fr'); b.up[10] = 'à la dizaine supérieure près'; poison('P25 fr up[10] 28 chars', b, 'fr', /rule 1: up\[10\] .* 28 chars > 20/);
    b = synthetic('da'); b.heads[10] = 'tiere'; poison('P26 da heads[10] tiere', b, 'da', /rule 2: da heads\[10\] "tiere"/);
    b = clone(en); b.strings.base.title = 'Rounding to the Nearest 10 Worksheet'; poison('Pw worksheet word', b, 'en', /rule 6: base title carries the worksheet word/);
    b = clone(en); b.strings.base.instruction = 'Free printable: round each number.'; poison('Pf free claim', b, 'en', /rule 6: base string claims free/);
    b = clone(en); b.strings.base.instruction = 'Round each number: 47 = 50.'; poison('P= "47 = 50" in a string', b, 'en', /rule 4: .* prints = between two numbers/);
    b = clone(en); b.strings.hundred.instruction = 'Round each number up to 1000.'; poison('P1000 a 4-digit number in a string', b, 'en', /rule 4: .* carries a number >= 1000/);
    b = clone(en); b.strings.base.instruction = 'Use the number line to round each number.'; poison('Pnl "number line"', b, 'en', /rule 5: .* names a number line/);
    b = clone(en); b.strings.base.instruction = 'Circle the ten it is closer to.'; poison('Pnear "closer" (the G2-221 instruction)', b, 'en', /rule 5: .* "nearer" word/);
    b = synthetic('fr'); b.strings.base.instruction = 'Entoure la dizaine plus proche de chaque nombre.'; poison('Pnear-fr "plus proche de" (comparative)', b, 'fr', /rule 5: .* "nearer" word \("plus proche de"\)/);
    b = synthetic('pt'); b.strings.base.instruction = 'Circule a dezena mais próxima de cada número.'; poison('Pnear-pt "mais próxima de" (comparative)', b, 'pt', /rule 5: .* "nearer" word \("mais próxima de"\)/);
    b = clone(en); b.strings.inverse.instruction = 'Tick every chip that rounds to 50.'; poison('Pchip "chip" / "tick"', b, 'en', /rule 5: .* apparatus the page does not have/);
    b = clone(en); b.strings.base.instruction = 'Round each number to 47 ≈ 50.'; poison('Papprox U+2248 in a string', b, 'en', /rule 4: .* U\+2248/);
    b = clone(en); b.down[10] = 'round up'; poison('Pud up[10] === down[10]', b, 'en', /rule 1: up\[10\] === down\[10\]/);
    b = clone(en); b.up[100] = 'round up 100'; poison('Pdigit a digit in a literal', b, 'en', /rule 1: up\[100\] .* carries a digit/);
    b = clone(en); b.heads[100] = 'nearest ten'; poison('Pheads heads equal', b, 'en', /rule 2: heads\[10\] === heads\[100\]/);
    b = clone(en); b.strings.hundred.title = 'Rounding to the Nearest Ten (Bigger)'; poison('Ph F2 without hundred / 100', b, 'en', /rule 6: hundred title .* neither the hundred word nor 100/);
    b = clone(en); b.strings.both.title = 'Rounding to the Nearest 100 Twice'; poison('Pboth F5 without the 10 place word', b, 'en', /rule 6: both title .* 10 place word/);
    b = clone(en); b.strings.estimate.title = 'Round, then Add the Sum'; poison('Pest F3 without estimate', b, 'en', /rule 6: estimate title .* lacks the en estimate word/);
    b = clone(en); b.strings.inverse.title = 'Which Numbers Round to Fifty?'; poison('Pinv F4 without 50', b, 'en', /rule 6: inverse title .* does not name the target 50/);
    b = clone(en); b.strings.sort.title = 'Round to the Nearest 10'; poison('P7r two faces token-equal', b, 'en', /rule 7: base .* and sort .* differ by no/);
    b = clone(en); b.refuse = ['sort']; poison('P8 refused face still has strings', b, 'en', /rule 8: strings\.sort present on a refused face/);
    b = clone(en); b.refuse = ['lines']; poison('P8b refuse names no face', b, 'en', /rule 8: refuse entry "lines"/);
    b = clone(en); delete b.strings.both; poison('P8c strings.both missing', b, 'en', /rule 8: strings\.both missing/);
    b = clone(en); b.strings.base.instruction = 'Round each number to the nearest ten and write it in the box'; poison('Pmark instruction without a mark', b, 'en', /rule 6: base instruction does not end in a mark/);
    b = clone(en); b.strings.base.title = 'Rounding to the Nearest Ten: Read the Ones Digit and Write the Nearest Ten in the Box'; poison('P70 title > 70', b, 'en', /rule 6: base title \d+ chars > 70/);
    b = synthetic('sv'); b.heads[10] = 'tiotalet'; poison('Psv heads tiotalet', b, 'sv', /rule 2: sv heads\[10\]/);
    b = synthetic('de'); b.heads[10] = 'zehner'; poison('Pde heads lower-case', b, 'de', /rule 2: de heads\[10\] .* capital/);
    b = clone(en); b.strings.base.title = 'Round It!'; poison('Pshipped the G2-221 title verbatim', b, 'en', /rule 6: base title "Round It!" differs from G2-221/);
    b = clone(en); b.strings.base.instruction = 'Round each number, then write it in the column.'; poison('Pcol "column"', b, 'en', /rule 5: .* column-arithmetic head/);
    // rule 10 (the probe) fires on a bank whose literal is missing
    { const bad = clone(en); delete bad.down[10]; const errs = validateBank(bad, 'en'); ok(errs.some((e) => /rule 1: down\[10\] empty/.test(e)) && errs.some((e) => /rule 10: the base does not build/.test(e)), `P10 a bank without down[10]: rule 1 + rule 10 fire (${errs.filter((e) => /rule 1|rule 10/.test(e)).length} messages)`); }

    // ---- render poisons (the validator bypassed)
    const renderPoison = async (name, type, re, { difficulty = 2, strings } = {}) => {
      let r;
      try { r = await renderWith(page, type, { difficulty, baseName: `G2-346-gate-poison-${name.split(' ')[0]}`, strings }); }
      catch (e) { fails++; asserts++; console.log(`  FAIL ${name}: the poison did not render — ${e.message}`); return; }
      const all2 = [...r.verify, ...r.lints, ...crossCheck(r.m, en, cfgOf(difficulty))];
      if (r.m.lowest > r.m.foot + 0.6) all2.push(`lowest ink ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
      const hit = all2.filter((f) => re.test(f));
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ')}`); }
      else { asserts++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    const rowRe = (n) => new RegExp(`(<span data-lcs-row data-lcs-n=")${n}(" data-lcs-step="10"[\\s\\S]*?data-lcs-num[^>]*>)${n}(<\\/span>[\\s\\S]*?data-lcs-answer=")${TYPE.round(n, 10)}(")`);
    /** Re-write ONE row (n -> n2, its text and its answer consistently) so verify's other checks stay quiet. */
    const rewriteRow = (h, n, n2) => h.replace(rowRe(n), `$1${n2}$2${n2}$3${TYPE.round(n2, 10)}$4`);
    const itemsAt = (d = 2) => TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: d, seedEpoch: 1 })) }).meta.items;
    const items = itemsAt(2);
    const five = items.find((n) => n % 10 === 5), notFive = items.find((n) => n % 10 !== 5 && n % 10 !== 6);
    await renderPoison('P1 a pre-filled box', mutated(TYPE, (h) => h.replace(/(class="ws-blankbox"[^>]*>)(<\/span>)/, '$150$2')), /the box is not empty|box prints/);
    await renderPoison('P2 an HTML ≈ text node replacing the SVG', mutated(TYPE, (h) => { const i = h.indexOf('data-lcs-lines'); const seg = h.slice(i); return h.slice(0, i) + seg.replace(/<svg[^>]*data-lcs-rel="approx"[^>]*>[\s\S]*?<\/svg>/, '<span style="font-size:24px">≈</span>'); }), /U\+2248/);
    await renderPoison('P3 47 = [ ] (a text = after a numeral)', mutated(TYPE, (h) => { const i = h.indexOf('data-lcs-lines'); const seg = h.slice(i); return h.slice(0, i) + seg.replace(/<svg[^>]*data-lcs-rel="approx"[^>]*>[\s\S]*?<\/svg>/, '<span style="font-size:24px">=</span>'); }), /the node after the numeral is not the SVG relation glyph/);
    await renderPoison('P4 a page with one 5 case', mutated(TYPE, (h) => rewriteRow(h, five, five + 1)), /deciding digit 5 < fiveMin/);
    await renderPoison('P5 a tile 1000', mutated(TYPE, (h) => rewriteRow(h, items[0], 1000)), /1000|outside|>= 1000/);
    await renderPoison('P6 a number line injected', mutated(TYPE, (h) => h.replace(/(<div class="ws-lane"[^>]*>)/, '$1<svg data-lcs-prim="number-line" width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="#146B5E" stroke-width="2"/></svg>')), /a number line is drawn/);
    await renderPoison('P7 the worked number 47 also on a line', mutated(TYPE, (h) => rewriteRow(h, notFive, 47)), /the worked number 47 is an item/);
    await renderPoison('P13 the strip rows 0 1 2 3 4 5 / 6 7 8 9', mutated(TYPE, (h) => { const m = h.match(/<span data-lcs-strip-digit="5"[^>]*>5<\/span>/); const four = h.match(/<span data-lcs-strip-digit="4"[^>]*>4<\/span>/); return h.replace(m[0], '').replace(four[0], four[0] + m[0]); }), /down block holds 012345|up block holds 6789/);
    await renderPoison('P14 the ring on the wrong strip digit', mutated(TYPE, (h) => h.replace('data-lcs-strip-digit="7" data-lcs-rule-digit', 'data-lcs-strip-digit="7"').replace('data-lcs-strip-digit="3"', 'data-lcs-strip-digit="3" data-lcs-rule-digit')), /the ring sits on 3/);
    await renderPoison('P16 row-major badges', mutated(TYPE, (h) => h.replace(/data-lcs-idx="2"([^>]*>)2</, 'data-lcs-idx="8"$18<').replace(/data-lcs-idx="8"([^>]*>)8<(?![\s\S]*data-lcs-idx="8")/, 'data-lcs-idx="2"$12<')), /badge .* != |column-major|next column/);
    await renderPoison('P17 a 400 px rule box under the 4-line fi title', mutated(TYPE, (h) => h.replace('min-height:96px', 'min-height:400px')), /footer overlap|lowest ink|spills past|rule box .* high/, { strings: CHROME.four });
    await renderPoison('P18 an item 450 (a multiple of the step)', mutated(TYPE, (h) => h.replace(rowRe(items[1]), `$1450$2450$3450$4`)), /450 is a multiple of 10/);
    await renderPoison('PRa a direction stamp on an item', mutated(TYPE, (h) => h.replace('<span data-lcs-row ', '<span data-lcs-row data-lcs-dir="up" ')), /direction stamp/);
    await renderPoison('PRb the answer printed beside its line', mutated(TYPE, (h) => h.replace(/(data-lcs-answer="(\d+)"[^>]*>)<\/span>/, '$1</span><span data-lcs-leak style="font-size:20px">$2</span>')), /rounded value \d+ is printed/);
    await renderPoison('PRc numerals at 18 px', mutated(TYPE, (h) => h.replace(/font-size:28px/g, 'font-size:18px')), /numeral 18px < 22|numeral 18 < 22/);
    await renderPoison('PRd a caption that is not the bank literal', mutated(TYPE, (h) => h.replace(/(data-lcs-caption="down"[^>]*>)round down/, '$1round it down')), /caption "round it down" != the bank literal/);
    await renderPoison('PRe the worked digit not coral', mutated(TYPE, (h) => h.replace(/(data-lcs-rule-digit style=")color:#F2784B/, '$1color:#3A3530')), /not coral/);
    await renderPoison('PRf a row-major lane (the column-major check on geometry)', mutated(TYPE, (h) => h.replace('grid-auto-flow:column;', 'grid-auto-flow:row;')), /column-major|next column/);
    await renderPoison('PRg a chip on the base', mutated(TYPE, (h) => h.replace(/(<div class="ws-lane"[^>]*>)/, '$1<span class="ws-chip" style="font-size:20px">7</span>')), /chip/);
    await renderPoison('PRh a thousands separator', mutated(TYPE, (h) => rewriteRow(h, items[3], 47).replace(/data-lcs-num([^>]*)>47</, 'data-lcs-num$1>1,047<')), /thousands separator|prints "1,047"/);
    await renderPoison('PRi an F2-shaped worked line on the base (472 -> 500)', mutated(TYPE, (h) => h.replace('data-lcs-worked="47" data-lcs-worked-to="50"', 'data-lcs-worked="472" data-lcs-worked-to="500"')), /worked line 472 != the stamped worked 47|worked 472 -> 500/);
    // the rule box control: the correct d2 render at the 677 chrome passed above (assertRender) — the P17 poison is the same page with one number changed
  } finally {
    await browser.close();
  }
  console.log(`\nverify-b4-rounding: ${asserts} assertions, ${fails} failures in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${fails ? 'FAIL' : 'PASS'}`);
  process.exit(fails ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, crossCheck, tokens, tokenDistinct, synthetic, TABLE_B, CHROME };
