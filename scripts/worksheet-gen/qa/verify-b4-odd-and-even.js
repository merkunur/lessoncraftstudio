#!/usr/bin/env node
/**
 * verify-b4-odd-and-even.js — the G1-351 `odd-and-even` gate (design file
 * docs/worksheet-gen/b4-designs/G1-351-odd-and-even.md §5; brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b4-odd-and-even.js [--quick]
 *
 * 1. BANK — every locale block of data/b4/odd-and-even.js against the §5
 *    validator rules 1-12 (the `tools/validate-b4-draft.js` odd-and-even block,
 *    folded in here and exported as `validateBank(block, loc, opts)`;
 *    tools/b4-probe-child.js calls it with (block, loc)):
 *    (1) chips.odd / .even non-empty, distinct, no space, <= 12 chars, and
 *        === K-016's i18n[loc].odd / .even (ONE source; a divergence is a K-016
 *        edit request); (2) de chips lowercase; houseOrder a permutation of
 *        [odd, even]; (3) rule <= 214 chars, every digit 0-9 exactly once, both
 *        chips as whole words (NFD, case-insensitive), no `{`, ends in a mark;
 *        (4) leftover / pairs non-empty, <= 16 chars, distinct, no digit, no `{`,
 *        neither a chip (the widths are measured by the render section: <= 84
 *        / <= 56 at Nunito 800 14); (5) placeHeads = 2 entries of 1-2 letters,
 *        distinct, and === GLOBAL.pvHeaders where lock-given (de Z E · fr d u ·
 *        es D U · nl T E · sv T E · fi K Y); (6) no authored string matches
 *        banRegex(loc) (the doubles / halves tokens as whole words with
 *        `(?<!\p{L})…(?!\p{L})`, flags iu — never `\b`), none carries a
 *        neighbour head (nl Tienraam, sv siffror / vecka, de Hundertertafel,
 *        the locale's number-charts / counting-frames names); en titles never
 *        "Even and Odd"; it titles never equal / start "Pari e dispari"; pt
 *        never start "Pares e ímpares"; (7) titles <= 70, no worksheet word, no
 *        free claim, never "with answers", unique in the face's band against
 *        the locale's strings file; the base title contains the head (table
 *        B); the ones title carries the 100 idiom; instructions <= 150 ending
 *        in a mark; fi question titles " vai " never " tai "; no instruction
 *        names an absent apparatus (base never dots / pictures; proof never
 *        house; ones / sums never "circle the word"; count never friend; share
 *        never pairs); (8) every two face titles differ by a token that is not
 *        a mere inflection of a shared one (Big / Bigger = the same stem);
 *        (9) refuse keys name a real mode; strings ids === {base + the 5 modes}
 *        minus the refused; (10) nameMaxGraphemes leaves >= 2 names in
 *        SENTENCES[loc].names; (11) build probe: the base builds at d2 with 3
 *        seeds (no img, no ten-frame, every data-lcs-answer ''; the faces are
 *        Phase 2 and not probed); (12) en: strings.base === the spec's i18n.en;
 *        the taxonomy slug equals table B and collides with no other axis slug
 *        and no landing slug of the locale.
 *    The gate MAY read K-016 / the taxonomy / SENTENCES; the spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1 / d2 / d3 en at the default chrome, d2 under the README 722
 *    chrome (a 3-line title + a 3-line instruction; measures ~710 on this
 *    shell) and under the 4-line fi title chrome (677) — the base MUST fit
 *    both (stack 538 / 610). Asserts verify() empty, qa/lints.js clean, the
 *    floors ITSELF (chips >= 64 with numerals >= 26 px, boxes >= 62 x 60, cue
 *    dots r >= 4.5 with the single hollow + coral), the strip 92 (164 at d3),
 *    every house 330 x 426 with its sign === the bank's chip word in the bank's
 *    order, <= 260 wide and not overflowing, the lowest ink above the footer,
 *    and the NODE cross-check from the stamps (parity(n) === the house; pairs
 *    / single re-derived; the split; boxes > open and !== open; the order
 *    rule; no banRegex hit and no standalone 0 in the rendered text; no img;
 *    no ten-frame; no parity / correct stamp on a chip).
 *    Plus a COMPONENT smoke: the seven face components (dotRowCard, shareLane,
 *    countLane, placeValueRow, tickPair, ruleStrip, parityTable) rendered
 *    through the pipeline in a throwaway type — lints clean + the design's
 *    heights / widths measured (F1 card 126 est., F2 lane 106 / row 634, F5
 *    lane 106 / row 616, rule strip <= 2 lines, table 92) and the caption
 *    reserves (leftover <= 84, pairs <= 56 at Nunito 800 14).
 * 3. SWEEP — 20 seeds × d1 / d2 / d3 (build only): the split exact, worked
 *    <= 10 with both parities, no numeral twice, the order never ascending
 *    (nor > 4 alternating), >= 2 distinct sets AND >= 2 distinct orders
 *    (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct EN
 *    bank / render is the control; the synthetic de / es / it / pt / sv / fi
 *    blocks are must-pass controls for the non-EN rules. Design §5:
 *      P1  de chips.even 'Gerade'                     → rule 2 (and rule 1)
 *      P2  chips.even 'odd'                           → rule 1
 *      P3  sv chips.even 'jämna'                      → rule 1 (K-016 says jämnt)
 *      P4  rule with the even digits only             → rule 3
 *      P5  leftover 'what is left over now' (21)      → rule 4
 *      P6  placeHeads ['Tens','Ones'] · de ['T','O']  → rule 5
 *      P7  de share title "Gerecht halbieren: …"      → rule 6 (halbieren); controls
 *          "Gerade Zahlen bis 20" / "jämnt" / "dele ligeligt" MUST PASS
 *      P8  en base "Even and Odd Numbers"             → rule 6
 *      P9  fi count title "Parillinen tai pariton?"   → rule 7
 *      P10 ones title without "100"                   → rule 7
 *      P11 "Big Pair Proof" vs "Bigger Pair Proof"    → rule 8
 *      P12 sv instruction with "vecka"                → rule 6
 *      P13 it base "Pari e dispari"                   → rule 6
 *      P14 strings without sums, no refuse.sums       → rule 9
 *      P15 base instruction "Circle the dots …"       → rule 7 (absent apparatus)
 *      P16 it nameMaxGraphemes 3                      → rule 10
 *    Render poisons (the validator bypassed):
 *      PR1  a pre-filled .ws-blankbox                 → answer hiding
 *      PR3  a ten-frame injected into the base        → the ten-frame assertion
 *      PR5  a pairDots beside an open chip            → the ancestor / open-chip assertion
 *      PR6  a house with 4 boxes and 4 open chips     → the leak assertion
 *      PR9  a 0 chip                                  → the zero assertion
 *      PRa  a parity stamp on a chip                  → verify()
 *      PRb  a worked 7 stamped with 4 pairs           → verify() + node cross-check
 *      PRc  a worked even numeral in the odd house    → verify() + node cross-check
 *      PRd  chip numerals at 20 px                    → the numeral floor
 *      PRe  a sign literal wider than 260             → the sign assertion
 *      PRf  the chips re-ordered ascending            → the order rule
 *      PRg  a 560 px house under the 677 chrome       → the footer lint
 *    Config poisons (resolveBase refuses): range [0, 30] · boxes 2 x 2 at d2
 *    (4 = the open count) · worked.split [1, 2] · chips 5 · an even worked in
 *    the odd house (houseBin) · pairDots n 0 / 11 / no host · chipStrip 10 x 64.
 *    PR2 / PR4 / PR7 / PR8 / PR10 of the design are FACE poisons (Phase 2).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b4-common.js');
const { fileUri } = require('../lib/b2-common.js');
const { SENTENCES } = require('../data/b2/sentences.js');
const freeClaim = require('../../lib/free-claim.js');
const C4 = require('../templates/components-b4.js');
const { GLOBAL } = require('../data/b4/odd-and-even.js');
const K016 = require('../types/k/K-016-odd-or-even-pairs.js');

const TYPE = require('../types/g1/G1-351-odd-and-even.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const ROOT = path.join(__dirname, '..');
const TAXONOMY = path.join(ROOT, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
const LANDINGS = (loc) => path.join(ROOT, '..', '..', 'frontend', 'content', 'seo-landing', loc + '.json');
const ALLOC = path.join(ROOT, '..', '..', 'docs', 'worksheet-gen', 'b4-designs', '_records', 'b4var-id-allocation.json');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MODES = GLOBAL.modes;
const FACES = ['base', ...MODES];
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv|atividade/iu;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med facitliste|med fasit|vastauksineen|vastaukset/i;
const FLOOR = 44, CHIP = 64, NUMERAL = 26;
// design §1 table B (the head = the title verbatim; the ASCII slug)
const TABLE_B = { en: 'odd-and-even', de: 'gerade-und-ungerade-zahlen', es: 'numeros-pares-e-impares', pt: 'numeros-pares-e-impares', fr: 'nombres-pairs-et-impairs', it: 'numeri-pari-e-dispari', nl: 'even-en-oneven-getallen', sv: 'udda-och-jamna-tal', da: 'lige-og-ulige-tal', no: 'partall-og-oddetall', fi: 'parilliset-ja-parittomat-luvut' };
const HEAD = { en: 'Odd and Even Numbers', de: 'Gerade und ungerade Zahlen', es: 'Números pares e impares', pt: 'Números pares e ímpares', fr: 'Nombres pairs et impairs', it: 'Numeri pari e dispari', nl: 'Even en oneven getallen', sv: 'Udda och jämna tal', da: 'Lige og ulige tal', no: 'Partall og oddetall', fi: 'Parilliset ja parittomat luvut' };
const FACE_BAND = { base: 'G1', proof: 'G2', share: 'G1', ones: 'G2', sums: 'G3', count: 'G1' };
// neighbour heads no authored string may carry (design §5 rule 6) — the taxonomy names are added at run time
const NEIGHBOUR = { nl: ['Tienraam'], sv: ['siffror', 'vecka'], de: ['Hundertertafel'] };
// absent-apparatus lint per face (design §5 rule 7): the instruction may name only apparatus ON the page
const APPARATUS = {
  base: { en: ['dots', 'dot', 'pictures', 'picture'], de: ['Punkte', 'Bilder'], es: ['puntos', 'dibujos'], pt: ['pontos', 'figuras'], fr: ['points', 'images'], it: ['punti', 'figure'], nl: ['stippen', 'plaatjes'], sv: ['prickar', 'bilder'], da: ['prikker', 'billeder'], no: ['prikker', 'bilder'], fi: ['pisteet', 'kuvat'] },
  proof: { en: ['house', 'houses'], de: ['Haus', 'Häuser'], es: ['casa'], pt: ['casa'], fr: ['maison'], it: ['casa'], nl: ['huis'], sv: ['hus'], da: ['hus'], no: ['hus'], fi: ['talo'] },
  ones: { en: ['circle the word'] }, sums: { en: ['circle the word'] },
  count: { en: ['friend', 'friends'], de: ['Freund', 'Freunde'], es: ['amigo', 'amigos'], pt: ['amigo', 'amigos'], fr: ['ami', 'amis'], it: ['amico', 'amici'], nl: ['vriend', 'vrienden'], sv: ['kompis', 'kompisar'], da: ['ven', 'venner'], no: ['venn', 'venner'], fi: ['kaveri', 'kaverit'] },
  share: { en: ['pairs', 'pair'], de: ['Paare', 'Paar'], es: ['parejas', 'pareja'], pt: ['pares', 'par'], fr: ['paires', 'paire'], it: ['coppie', 'coppia'], nl: ['paren', 'paar'], sv: ['par'], da: ['par'], no: ['par'], fi: ['parit', 'pari'] },
};

let fails = 0, asserts = 0;
function ok(cond, msg) { asserts++; if (!cond) { fails++; console.log('  FAIL ' + msg); } }
function fold(s) { return String(s || '').trim().toLocaleLowerCase(); }
function nfd(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function esc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function wordRe(w) { return new RegExp('(?<!\\p{L})' + esc(w) + '(?!\\p{L})', 'iu'); }
function hasWord(text, w) { return wordRe(w).test(String(text)); }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function graphemes(s) { return Array.from(String(s)).length; }

/** ONE regex of every doublesBan[loc] token as a whole word (flags iu; never \b — ASCII-only). */
function banRegex(loc) {
  const toks = GLOBAL.doublesBan[loc];
  if (!toks || !toks.length) throw new Error('banRegex: no doublesBan tokens for ' + loc);
  return new RegExp('(?<!\\p{L})(?:' + toks.map(esc).join('|') + ')(?!\\p{L})', 'iu');
}
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
let _faceIds = null;
function faceIds() {
  if (!_faceIds) { const a = JSON.parse(fs.readFileSync(ALLOC, 'utf8')).faces.filter((f) => f.family === TYPE.id); _faceIds = new Set([TYPE.id, ...a.map((f) => f.id)]); }
  return _faceIds;
}
/** Two title tokens are the SAME stem when equal, or one is a prefix of the other (big / bigger), or they share 5 letters. */
function sameStem(a, b) { a = nfd(a); b = nfd(b); if (a === b) return true; if (a.length >= 3 && b.length >= 3 && (a.startsWith(b) || b.startsWith(a))) return true; return a.length >= 5 && b.length >= 5 && a.slice(0, 5) === b.slice(0, 5); }
function titleTokens(t) { return fold(t).split(/[^\p{L}\p{N}]+/u).filter((x) => x.length >= 2); }

/* ------------------------------------------------------------------ 1. the bank validator ------------------------------------------------------------------ */

/**
 * validateBank(block, loc, opts) -> string[] of failures (empty = clean). opts.en = the EN block (defaults to the
 * module's); opts.skipProbe skips rule 11's build. Pure node; reads K-016 / the taxonomy / SENTENCES / strings.<loc>.
 */
function validateBank(block, loc, opts = {}) {
  const out = [];
  const push = (m) => out.push(m);
  if (!block || typeof block !== 'object') return ['no block'];
  const en = opts.en || bankModule('odd-and-even').en;
  const k = (K016.i18n && K016.i18n[loc]) || null;
  const chips = block.chips || {};
  const S = block.strings || {};
  const refuse = block.refuse || {};
  const authored = [];   // every authored string (rule 6)
  const cLit = [chips.odd, chips.even].filter((x) => typeof x === 'string');

  // rule 1 — chips === K-016
  for (const key of ['odd', 'even']) {
    const c = chips[key];
    if (typeof c !== 'string' || !c.trim()) { push(`rule 1: chips.${key} missing`); continue; }
    if (/\s/.test(c)) push(`rule 1: chips.${key} "${c}" carries a space`);
    if (graphemes(c) > 12) push(`rule 1: chips.${key} "${c}" > 12 chars`);
    if (!k || k[key] !== c) push(`rule 1: chips.${key} "${c}" != K-016.i18n.${loc}.${key} "${k ? k[key] : '(no K-016 block)'}" (one source; a divergence is a K-016 edit request)`);
    authored.push(c);
  }
  if (cLit.length === 2 && fold(cLit[0]) === fold(cLit[1])) push('rule 1: chips.odd === chips.even');

  // rule 2 — de lowercase; houseOrder
  if (loc === 'de') for (const key of ['odd', 'even']) if (typeof chips[key] === 'string' && !/^\p{Ll}/u.test(chips[key])) push(`rule 2: de chips.${key} "${chips[key]}" must be the bare lowercase adjective`);
  if (!Array.isArray(block.houseOrder) || block.houseOrder.length !== 2 || block.houseOrder.slice().sort().join(',') !== 'even,odd') push(`rule 2: houseOrder ${JSON.stringify(block.houseOrder)} is not a permutation of [odd, even]`);

  // rule 3 — the rule sentence
  const rule = block.rule;
  if (typeof rule !== 'string' || !rule.trim()) push('rule 3: rule missing');
  else {
    authored.push(rule);
    if (graphemes(rule) > 214) push(`rule 3: rule is ${graphemes(rule)} > 214 chars`);
    for (let d = 0; d <= 9; d++) { const n = (rule.match(new RegExp('(?<!\\d)' + d + '(?!\\d)', 'g')) || []).length; if (n !== 1) push(`rule 3: digit ${d} appears ${n} times in the rule (want exactly once)`); }
    for (const c of cLit) if (!new RegExp('(?<!\\p{L})' + esc(nfd(c)) + '(?!\\p{L})', 'iu').test(nfd(rule))) push(`rule 3: the rule does not carry the chip "${c}" as a whole word`);
    if (rule.includes('{')) push('rule 3: the rule carries a slot');
    if (!/[.!?]$/.test(rule.trim())) push('rule 3: the rule does not end in a mark');
  }

  // rule 4 — captions
  for (const key of ['leftover', 'pairs']) {
    const c = block[key];
    if (typeof c !== 'string' || !c.trim()) { push(`rule 4: ${key} missing`); continue; }
    authored.push(c);
    if (graphemes(c) > 16) push(`rule 4: ${key} "${c}" is ${graphemes(c)} > 16 chars`);
    if (/\d/.test(c)) push(`rule 4: ${key} "${c}" carries a digit`);
    if (c.includes('{')) push(`rule 4: ${key} carries a slot`);
    if (cLit.some((x) => fold(x) === fold(c))) push(`rule 4: ${key} "${c}" equals a chip`);
  }
  if (typeof block.leftover === 'string' && typeof block.pairs === 'string' && fold(block.leftover) === fold(block.pairs)) push('rule 4: leftover === pairs');

  // rule 5 — placeHeads
  const ph = block.placeHeads;
  if (!Array.isArray(ph) || ph.length !== 2) push(`rule 5: placeHeads ${JSON.stringify(ph)} must be exactly 2 entries`);
  else {
    for (const h of ph) { if (!/^\p{L}{1,2}$/u.test(String(h))) push(`rule 5: placeHead "${h}" is not 1-2 letters`); authored.push(String(h)); }
    if (fold(ph[0]) === fold(ph[1])) push('rule 5: placeHeads are not distinct');
    const lock = GLOBAL.pvHeaders[loc];
    if (lock && (ph[0] !== lock[0] || ph[1] !== lock[1])) push(`rule 5: ${loc} placeHeads [${ph}] != the lock-given [${lock}]`);
  }

  // rule 9 — strings ids / refuse (before 6-8 so the string loops know the set)
  for (const r of Object.keys(refuse)) if (!MODES.includes(r)) push(`rule 9: refuse.${r} names no mode`);
  const wantIds = FACES.filter((f) => !refuse[f]);
  const haveIds = Object.keys(S);
  for (const f of wantIds) if (!S[f]) push(`rule 9: strings.${f} missing (and not refused)`);
  for (const f of haveIds) if (!FACES.includes(f)) push(`rule 9: strings.${f} is not a face`); else if (refuse[f]) push(`rule 9: strings.${f} present on a refused face`);

  // rule 6 + 7 — every authored string
  let ban = null;
  try { ban = banRegex(loc); } catch (e) { push('rule 6: ' + e.message); }
  const neighbour = [...(NEIGHBOUR[loc] || [])];
  try { const tax = taxonomy(); for (const key of ['number-charts', 'counting-frames']) { const n = tax.axes['exercise-type'][key] && tax.axes['exercise-type'][key].name && tax.axes['exercise-type'][key].name[loc]; if (n) neighbour.push(n); } } catch (e) { push('rule 6: taxonomy unreadable'); }
  const titles = [];
  const bandStrings = localeStrings(loc);
  for (const f of wantIds) {
    const s = S[f];
    if (!s) continue;
    if (!s.title || !s.instruction) { push(`rule 7: strings.${f} missing title / instruction`); continue; }
    authored.push(s.title, s.instruction);
    titles.push([f, s.title]);
    if (graphemes(s.title) > 70) push(`rule 7: ${f} title ${graphemes(s.title)} > 70`);
    if (WORKSHEET_WORD.test(s.title)) push(`rule 7: ${f} title carries the worksheet word`);
    for (const t of [s.title, s.instruction]) { if (freeClaim.hit(t)) push(`rule 7: ${f} string claims free ("${t}")`); if (ANSWERS_WORD.test(t)) push(`rule 7: ${f} string promises answers ("${t}")`); }
    if (graphemes(s.instruction) > 150) push(`rule 7: ${f} instruction ${graphemes(s.instruction)} > 150`);
    if (!/[.!?]$/.test(s.instruction.trim())) push(`rule 7: ${f} instruction does not end in a mark`);
    // band uniqueness against the locale's existing strings (own family ids excluded)
    const band = FACE_BAND[f];
    for (const [id, st] of Object.entries(bandStrings)) if (id.startsWith(band + '-') && !faceIds().has(id) && st && fold(st.title) === fold(s.title)) push(`rule 7: ${f} title "${s.title}" equals ${id}'s title in band ${band}`);
    if (f === 'base' && HEAD[loc] && !fold(s.title).includes(fold(HEAD[loc]))) push(`rule 7: the base title "${s.title}" does not contain the head "${HEAD[loc]}"`);
    if (f === 'ones' && !(loc === 'fi' ? /sataan/i.test(s.title) : /(?<!\d)100(?!\d)/.test(s.title))) push(`rule 7: the ones title "${s.title}" lacks the 100 idiom`);
    if (loc === 'fi' && s.title.includes('?')) { const both = cLit.every((c) => nfd(s.title).includes(nfd(c).slice(0, 5))); if (both && !/ vai /.test(s.title)) push(`rule 7: fi question title "${s.title}" lacks " vai "`); if (/ tai /.test(s.title)) push(`rule 7: fi question title "${s.title}" uses " tai "`); }
    const app = (APPARATUS[f] || {})[loc] || [];
    for (const w of app) if (w.includes(' ') ? fold(s.instruction).includes(fold(w)) : hasWord(s.instruction, w)) push(`rule 7: the ${f} instruction names an absent apparatus ("${w}")`);
  }
  for (const t of authored) {
    if (ban && ban.test(t)) push(`rule 6: "${t}" matches the doubles / halves ban (${t.match(ban)[0]})`);
    for (const nh of neighbour) if (fold(t).includes(fold(nh))) push(`rule 6: "${t}" carries the neighbour head "${nh}"`);
  }
  for (const [f, t] of titles) {
    if (loc === 'en' && /even and odd/i.test(t)) push(`rule 6: en ${f} title "${t}" says "Even and Odd"`);
    if (loc === 'it' && /^pari e dispari/i.test(t.trim())) push(`rule 6: it ${f} title "${t}" equals / starts "Pari e dispari" (a 1978 film)`);
    if (loc === 'pt' && /^pares e ímpares/i.test(t.trim())) push(`rule 6: pt ${f} title "${t}" starts "Pares e ímpares" (the lottery intent)`);
  }
  if (new Set(titles.map(([, t]) => fold(t))).size !== titles.length) push('rule 7: two faces share a title');

  // rule 8 — every two face titles differ by a token that is not an inflection of a shared one
  for (let i = 0; i < titles.length; i++) for (let j = i + 1; j < titles.length; j++) {
    const A = titleTokens(titles[i][1]), B = titleTokens(titles[j][1]);
    const onlyA = A.filter((a) => !B.some((b) => sameStem(a, b))), onlyB = B.filter((b) => !A.some((a) => sameStem(a, b)));
    if (!onlyA.length && !onlyB.length) push(`rule 8: ${titles[i][0]} / ${titles[j][0]} titles differ only by an inflection ("${titles[i][1]}" vs "${titles[j][1]}")`);
  }

  // rule 10 — names
  const names = (SENTENCES[loc] && SENTENCES[loc].names) || [];
  const nmax = block.nameMaxGraphemes;
  if (!Number.isInteger(nmax) || nmax < 1) push(`rule 10: nameMaxGraphemes ${nmax}`);
  else { const left = names.filter((n) => graphemes(n) <= nmax).length; if (left < 2) push(`rule 10: nameMaxGraphemes ${nmax} leaves ${left} of ${names.length} names in SENTENCES.${loc} (want >= 2)`); }

  // rule 11 — build probe (the base; the faces are Phase 2)
  if (!opts.skipProbe && out.length === 0) {
    for (let s = 1; s <= 3; s++) {
      try {
        const rng = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: 2, seedEpoch: 1, variant: s }));
        const b = TYPE._buildWith(block, TYPE.difficulty[2], { locale: loc }, { rng });
        if (/<img/i.test(b.bodyHtml)) push(`rule 11: the base DOM carries an <img> (seed ${s})`);
        if (/data-lcs-prim="ten-frame"/.test(b.bodyHtml)) push(`rule 11: the base DOM carries a ten-frame (seed ${s})`);
        for (const m of b.bodyHtml.matchAll(/data-lcs-answer="([^"]*)"/g)) if (m[1] !== '') push(`rule 11: a stamped answer "${m[1]}" (seed ${s})`);
      } catch (e) { push(`rule 11: the base does not build at d2 in ${loc} (seed ${s}): ${e.message}`); }
    }
  }

  // rule 12 — en source; the taxonomy slug
  if (loc === 'en') {
    if (!S.base || S.base.title !== TYPE.i18n.en.title || S.base.instruction !== TYPE.i18n.en.instruction) push('rule 12: en strings.base != the spec i18n.en');
    if (opts.en && JSON.stringify(block.strings) !== JSON.stringify(en.strings)) push('rule 12: the draft EN strings differ from the module EN block (the EN is the source)');
  }
  try {
    const tax = taxonomy();
    const mine = tax.axes['exercise-type']['odd-and-even'] && tax.axes['exercise-type']['odd-and-even'].slug && tax.axes['exercise-type']['odd-and-even'].slug[loc];
    if (!mine) push(`rule 12: axes['exercise-type']['odd-and-even'].slug.${loc} is not registered`);
    else {
      if (mine !== TABLE_B[loc]) push(`rule 12: slug.${loc} "${mine}" != table B "${TABLE_B[loc]}"`);
      for (const [axis, entries] of Object.entries(tax.axes)) for (const [key, e] of Object.entries(entries)) if (key !== 'odd-and-even' && e.slug && e.slug[loc] === mine) push(`rule 12: slug.${loc} "${mine}" collides with ${axis}.${key}`);
      if (landingSlugs(loc).has(mine)) push(`rule 12: slug.${loc} "${mine}" is a landing slug`);
    }
  } catch (e) { push('rule 12: taxonomy unreadable'); }
  return out;
}

/* ------------------------------------------------------------------ 2. render helpers ------------------------------------------------------------------ */

async function renderWith(page, type, { difficulty = 2, baseName, strings, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const r = (el) => el.getBoundingClientRect();
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot'), title = document.querySelector('.ws-title');
    const root = document.querySelector('[data-lcs-oae]');
    const strip = document.querySelector('[data-lcs-strip]');
    const chips = [...document.querySelectorAll('[data-lcs-val]')].map((c) => ({ v: +c.dataset.lcsVal, w: r(c).width, h: r(c).height, font: parseFloat(getComputedStyle(c).fontSize), text: c.textContent.trim(), attrs: c.getAttributeNames() }));
    const houses = [...document.querySelectorAll('[data-lcs-house]')].map((h) => {
      const s = h.querySelector('[data-lcs-sign]');
      return {
        parity: h.dataset.lcsHouse, w: r(h).width, h: r(h).height, hStamp: +h.dataset.lcsH, bottom: r(h).bottom, top: r(h).top,
        sign: s ? s.textContent.trim() : '', signW: s ? r(s).width : 0, signOverflow: s ? s.scrollWidth - s.clientWidth : 0, signFont: s ? parseFloat(getComputedStyle(s).fontSize) : 0,
        tiles: [...h.querySelectorAll('[data-lcs-given]')].map((g) => {
          const d = g.querySelector('[data-lcs-pairdots]');
          return { n: +g.dataset.lcsGiven, w: r(g).width, h: r(g).height, pairs: d ? +d.dataset.lcsPairs : null, single: d ? +d.dataset.lcsSingle : null,
            rs: d ? [...d.querySelectorAll('circle')].map((c) => +c.getAttribute('r')) : [], singleFill: d && d.querySelector('[data-lcs-dot="single"]') ? d.querySelector('[data-lcs-dot="single"]').getAttribute('fill') : null,
            singleStroke: d && d.querySelector('[data-lcs-dot="single"]') ? d.querySelector('[data-lcs-dot="single"]').getAttribute('stroke') : null };
        }),
        boxes: [...h.querySelectorAll('.ws-blankbox')].map((b) => ({ w: r(b).width, h: r(b).height, answer: b.getAttribute('data-lcs-answer'), text: b.textContent.trim() })),
      };
    });
    let lowest = 0;
    // the lowest INK: the root grid + the house row are containers that fill the body, so they are skipped
    document.querySelectorAll('.ws-body *:not([data-lcs-oae]):not([data-lcs-houses])').forEach((el) => { const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
    const sb = strip ? r(strip) : null;
    const stage = sb && houses.length ? { band: Math.min(...houses.map((h) => h.top)) - sb.bottom, h: Math.max(...houses.map((h) => h.bottom)) - sb.top, slackUnder: r(foot).top - Math.max(...houses.map((h) => h.bottom)), stripTop: sb.top - r(body).top } : null;
    return {
      body: { h: r(body).height, top: r(body).top }, foot: r(foot).top, titleH: r(title).height, lines: Math.round(r(title).height / (30 * 1.1)),
      stamps: root ? { ...root.dataset } : null, stripH: strip ? r(strip).height : 0, chips, houses, lowest, stage,
      text: (document.querySelector('.ws-body') || document.body).innerText || '',
      imgs: document.querySelectorAll('.ws-body img').length, tenFrames: document.querySelectorAll('[data-lcs-prim="ten-frame"]').length,
      correct: document.querySelectorAll('.ws-body [data-lcs-correct]').length,
    };
  });
  return { ...out, verify: out.qa.verify, lints: out.qa.lints, m };
}

/** The node cross-check over the rendered stamps: parity / pairs / split / leak / order / signs / bans re-derived from the bank. */
function crossCheck(m, bank, loc = 'en') {
  const out = [];
  if (!m.stamps) return ['no root stamps'];
  const split = m.stamps.lcsSplit.split(',').map(Number), nBoxes = +m.stamps.lcsBoxes, maxN = +m.stamps.lcsMaxn;
  const [lo, hi] = m.stamps.lcsRange.split(',').map(Number);
  const vals = m.chips.map((c) => c.v);
  const seen = { odd: 0, even: 0 };
  for (const c of m.chips) {
    if (!Number.isInteger(c.v) || c.v < lo || c.v > hi || c.v === 0) out.push(`chip ${c.v} outside [${lo}, ${hi}] or 0`);
    if (c.text !== String(c.v)) out.push(`chip prints "${c.text}" for ${c.v}`);
    if (c.w < CHIP - 0.6 || c.h < CHIP - 0.6) out.push(`chip ${c.v} is ${c.w.toFixed(1)} x ${c.h.toFixed(1)} < ${CHIP}`);
    if (c.font < NUMERAL) out.push(`chip ${c.v} numeral ${c.font} < ${NUMERAL}`);
    if (c.attrs.some((a) => /parity|odd|even|correct|answer/i.test(a))) out.push(`chip ${c.v} carries a parity stamp`);
    seen[TYPE.parity(c.v)]++;
  }
  if (new Set(vals).size !== vals.length) out.push('a chip value twice');
  if (!TYPE.orderOk(vals)) out.push(`chip order [${vals}] ascends or alternates for > ${TYPE.MAX_RUN}`);
  if (vals.length && vals.every((v, i) => !i || v > vals[i - 1])) out.push('chip order is fully ascending');
  if (m.houses.length !== 2) out.push(`${m.houses.length} houses`);
  const order = m.houses.map((h) => h.parity);
  if (order.join(',') !== bank.houseOrder.join(',')) out.push(`houses ${order} != bank.houseOrder ${bank.houseOrder}`);
  const workedIn = { odd: 0, even: 0 }, allWorked = [];
  for (const h of m.houses) {
    if (h.sign !== bank.chips[h.parity]) out.push(`the ${h.parity} sign reads "${h.sign}", the bank says "${bank.chips[h.parity]}"`);
    if (h.signW > 260.6 || h.signOverflow > 0.6) out.push(`the ${h.parity} sign is ${h.signW.toFixed(1)} wide / overflows ${h.signOverflow}`);
    if (h.signFont < 20) out.push(`the ${h.parity} sign font ${h.signFont} < 20`);
    if (Math.abs(h.w - 330) > 1 || Math.abs(h.h - h.hStamp) > 1 || h.h < 425) out.push(`the ${h.parity} house is ${h.w.toFixed(1)} x ${h.h.toFixed(1)} (stamped ${h.hStamp}, floor 426)`);
    for (const t of h.tiles) {
      allWorked.push(t.n);
      if (TYPE.parity(t.n) !== h.parity) out.push(`worked ${t.n} in the ${h.parity} house`);
      if (t.n < 1 || t.n > maxN) out.push(`worked ${t.n} outside 1..${maxN}`);
      if (t.pairs !== Math.floor(t.n / 2) || t.single !== t.n % 2) out.push(`worked ${t.n}: stamped pairs ${t.pairs} / single ${t.single}`);
      if (t.rs.length !== t.n || t.rs.some((x) => x < 4.5)) out.push(`worked ${t.n}: ${t.rs.length} dots, r ${Math.min(...t.rs)}`);
      if (t.n % 2 && (t.singleFill !== 'none' || !t.singleStroke)) out.push(`worked ${t.n}: the single is not a hollow ring`);
      if (t.w < 135 || t.h < 59) out.push(`worked ${t.n}: tile ${t.w.toFixed(1)} x ${t.h.toFixed(1)}`);
      workedIn[h.parity]++;
    }
    if (h.boxes.length !== nBoxes) out.push(`${h.parity} house: ${h.boxes.length} boxes`);
    if (h.boxes.length === seen[h.parity]) out.push(`${h.parity} house: ${h.boxes.length} boxes = ${seen[h.parity]} open chips (leak)`);
    if (h.boxes.length < seen[h.parity]) out.push(`${h.parity} house: ${h.boxes.length} boxes < ${seen[h.parity]} open chips`);
    for (const b of h.boxes) { if (b.answer !== '' || b.text) out.push(`${h.parity} house: a box with answer "${b.answer}" / text "${b.text}"`); if (b.w < 61.4 || b.h < 59.4) out.push(`${h.parity} house: a box ${b.w.toFixed(1)} x ${b.h.toFixed(1)} < 62 x 60`); }
  }
  if (workedIn.odd < 1 || workedIn.even < 1) out.push(`worked parities odd ${workedIn.odd} / even ${workedIn.even}`);
  if (new Set([...allWorked, ...vals]).size !== allWorked.length + vals.length) out.push('a worked numeral repeats a chip');
  const tot = { odd: seen.odd + workedIn.odd, even: seen.even + workedIn.even };
  if (tot.odd !== split[0] || tot.even !== split[1]) out.push(`split odd ${tot.odd} / even ${tot.even} != ${split}`);
  if (m.stage) {
    const gap = +m.stamps.lcsGap;
    if (Math.abs(m.stage.band - gap) > 1 || m.stage.band > 40) out.push(`the strip -> houses band is ${m.stage.band.toFixed(1)} px (config gap ${gap}, max 40) — sparse`);
    if (m.stage.h < 600) out.push(`the stage is ${m.stage.h.toFixed(1)} px < 600 — sparse`);
    if (m.stage.stripTop > 1) out.push(`the strip sits ${m.stage.stripTop.toFixed(1)} px under the body top (not top-anchored) — sparse`);
  } else out.push('no stage measured');
  if (m.imgs) out.push(`${m.imgs} <img> on the page`);
  if (m.tenFrames) out.push('a ten-frame on the page');
  if (m.correct) out.push('a data-lcs-correct stamp');
  const ban = banRegex(loc);
  if (ban.test(m.text)) out.push(`the rendered text matches the doubles / halves ban (${m.text.match(ban)[0]})`);
  if (/(?<![\d.,])0(?![\d.,])/.test(m.text)) out.push('a standalone 0 in the rendered text');
  return out;
}

function assertRender(name, r, { chips, worked, stripH, stack }) {
  ok(r.verify.length === 0, `${name}: verify ${JSON.stringify(r.verify)}`);
  ok(r.m.stage && r.m.stage.h >= 600 && Math.abs(r.m.stage.h - stack) <= 1.5, `${name}: stage ${r.m.stage && r.m.stage.h.toFixed(1)} (want ${stack}, floor 600)`);
  ok(r.m.stage && r.m.stage.band <= 40 && r.m.stage.stripTop <= 1, `${name}: band ${r.m.stage && r.m.stage.band.toFixed(1)} / strip top ${r.m.stage && r.m.stage.stripTop.toFixed(1)} (top-anchored, band <= 40)`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.chips.length === chips, `${name}: ${r.m.chips.length} chips, want ${chips}`);
  ok(r.m.houses.reduce((s, h) => s + h.tiles.length, 0) === worked, `${name}: worked tiles != ${worked}`);
  ok(Math.abs(r.m.stripH - stripH) <= 1, `${name}: strip ${r.m.stripH.toFixed(1)} (want ${stripH})`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: lowest ink ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
}

/** A type whose bodyHtml is post-processed (render poisons) */
function mutated(type, fn) { return { ...type, build: async (a, c) => { const b = await type.build(a, c); const h = fn(b.bodyHtml); if (h === b.bodyHtml) throw new Error('mutation matched nothing'); return { ...b, bodyHtml: h }; } }; }
/** A type over an injected bank / config (poisons that bypass the validator) */
function withBank(type, bank, cfg) { return { ...type, build: (a, c) => type._buildWith(bank, cfg || type.difficulty[a.difficulty], { locale: a.locale }, c) }; }

/** Long-chrome fixtures (the lines are measured and asserted): 3-line title + 3-line instruction (README 722, measures ~710) · 4-line title (677). */
const CHROME = {
  one: { title: 'Odd and Even Numbers', instruction: 'Write each number in its house.' },
  three: { title: 'Odd and Even Numbers: Sort Every Number Into the Odd or the Even House', instruction: 'Read every number on the doorstep and decide whether it is odd or even by thinking of its pairs. Then write it into an empty box in the odd house or the even house below.' },
  four: { title: 'Parilliset ja parittomat luvut: kirjoita jokainen luku parillisten tai parittomien taloon', instruction: 'Read every number on the doorstep and decide whether it is odd or even by thinking of its pairs. Then write it into an empty box in the odd house or the even house below.' },
};

/** The K-016 pill pair (the faces' pills; order = houseOrder) — the spec builds it in Phase 2, the smoke needs it now. */
function pills(bank, correct) {
  return `<span style="display:inline-flex;flex-direction:column;gap:6px">` + bank.houseOrder.map((p) =>
    `<span class="ws-chip"${p === correct ? ' data-lcs-correct="1"' : ''} data-lcs-pill="${p}" style="width:auto;min-width:64px;height:44px;font-size:17px;border-radius:22px;padding:0 14px">${bank.chips[p]}</span>`).join('') + `</span>`;
}

/** Synthetic locale blocks (the §6 candidates + lock-given letters) — must-pass controls for the non-EN rules. */
function synthetic(loc, en) {
  const b = clone(en);
  b.chips = { odd: K016.i18n[loc].odd, even: K016.i18n[loc].even };
  b.houseOrder = loc === 'sv' ? ['odd', 'even'] : ['even', 'odd'];
  b.placeHeads = GLOBAL.pvHeaders[loc] || ['T', 'E'];
  const T = {
    de: { rule: 'Gerade Zahlen enden auf 0, 2, 4, 6 oder 8. Ungerade Zahlen enden auf 1, 3, 5, 7 oder 9.', leftover: 'bleibt übrig', pairs: 'Paare',
      titles: ['Gerade und ungerade Zahlen bis 20', 'Gerade oder ungerade? Zwei gleiche Summanden', 'Gerecht teilen: gerade oder ungerade?', 'Gerade und ungerade Zahlen bis 100', 'Summe gerade oder ungerade? Ohne zu rechnen', 'Gerade oder ungerade? Bilder paarweise zählen'] },
    es: { rule: 'Un número es par si termina en 0, 2, 4, 6 u 8. Es impar si termina en 1, 3, 5, 7 o 9.', leftover: 'sobra', pairs: 'parejas',
      titles: ['Números pares e impares hasta el 20', '¿Par o impar? Dos sumandos iguales', '¿Se puede repartir entre dos? Par o impar', 'Números pares e impares del 1 al 100', '¿Suma par o impar? Sin sumar', '¿Par o impar? Cuenta los dibujos en parejas'] },
    pt: { rule: 'Um número é par se termina em 0, 2, 4, 6 ou 8. É ímpar se termina em 1, 3, 5, 7 ou 9.', leftover: 'sobra', pairs: 'pares',
      titles: ['Números pares e ímpares até 20', 'Par ou ímpar? Duas parcelas iguais', 'Dá para dividir entre dois? Par ou ímpar', 'Números pares e ímpares de 1 a 100', 'Soma par ou ímpar? Sem somar', 'Par ou ímpar? Conte as figuras aos pares'] },
    it: { rule: 'I numeri pari finiscono con 0, 2, 4, 6 o 8. I numeri dispari finiscono con 1, 3, 5, 7 o 9.', leftover: 'avanza', pairs: 'coppie',
      titles: ['Numeri pari e dispari fino a 20', 'Pari o dispari? Due addendi uguali', 'Si può dividere in due? Pari o dispari', 'Numeri pari e dispari fino a 100', 'Somma pari o dispari? Senza calcolare', 'Pari o dispari? Conta le figure a coppie'] },
    sv: { rule: 'Ett jämnt tal slutar på 0, 2, 4, 6 eller 8. Ett udda tal slutar på 1, 3, 5, 7 eller 9.', leftover: 'blir över', pairs: 'par',
      titles: ['Udda och jämna tal till 20', 'Udda eller jämnt? Två lika delar', 'Kan det delas lika i två?', 'Udda och jämna tal till 100', 'Udda eller jämn summa? Utan att räkna', 'Udda eller jämnt? Räkna bilderna parvis'] },
    da: { rule: 'Lige tal ender på 0, 2, 4, 6 eller 8. Ulige tal ender på 1, 3, 5, 7 eller 9.', leftover: 'tilovers', pairs: 'par',
      titles: ['Lige og ulige tal til 20', 'Lige eller ulige? To lige store dele', 'Kan det deles ligeligt?', 'Lige og ulige tal til 100', 'Lige eller ulige sum? Uden at regne', 'Lige eller ulige? Tæl billederne parvis'] },
    fi: { rule: 'Parilliset luvut päättyvät numeroon 0, 2, 4, 6 tai 8. Parittomat luvut päättyvät numeroon 1, 3, 5, 7 tai 9.', leftover: 'jää yli', pairs: 'parit',
      titles: ['Parilliset ja parittomat luvut 20:een asti', 'Parillinen vai pariton? Kaksi yhtä suurta lukua', 'Voiko jakaa tasan kahdelle?', 'Parilliset ja parittomat luvut sataan asti', 'Parillinen vai pariton summa? Laskematta', 'Parillinen vai pariton? Laske kuvat pareittain'] },
  }[loc];
  if (!T) throw new Error('synthetic: no fixture for ' + loc);
  b.rule = T.rule; b.leftover = T.leftover; b.pairs = T.pairs;
  const instr = { de: 'Entscheide bei jeder Zahl.', es: 'Decide en cada número.', pt: 'Decida em cada número.', it: 'Decidi per ogni numero.', sv: 'Bestäm för varje tal.', da: 'Bestem for hvert tal.', fi: 'Päätä jokaisesta luvusta.' }[loc];
  b.strings = {};
  FACES.forEach((f, i) => { b.strings[f] = { title: T.titles[i], instruction: instr }; });
  b.strand = loc;
  return b;
}
// fi 'pariton' / 'parillinen' as whole words inside 'Parilliset' / 'Parittomat': the rule sentence uses the plural
// nominative; rule 3 wants the CHIP forms as whole words, so the fi fixture appends them the way the fi panel will
// ("… Luku on parillinen tai pariton.") — recorded as an open item for the panel
function fiRuleFix(b) { b.rule = 'Parilliset luvut päättyvät numeroon 0, 2, 4, 6 tai 8 ja parittomat numeroon 1, 3, 5, 7 tai 9: luku on parillinen tai pariton.'; return b; }

/* ------------------------------------------------------------------ main ------------------------------------------------------------------ */

async function main() {
  const all = bankModule('odd-and-even');
  const en = all.en;
  const t0 = Date.now();
  console.log(`verify-b4-odd-and-even ${QUICK ? '(--quick) ' : ''}— locales on disk: ${Object.keys(all).join(' ')}`);

  // ---- 1. the bank(s)
  for (const loc of Object.keys(all)) {
    const errs = validateBank(all[loc], loc);
    ok(errs.length === 0, `bank ${loc}: ${errs.join(' | ')}`);
    console.log(`bank ${loc}: ${errs.length ? errs.length + ' fails' : 'clean'} (chips ${all[loc].chips.odd}/${all[loc].chips.even}, order ${all[loc].houseOrder.join('<')}, faces ${Object.keys(all[loc].strings).length})`);
  }
  const SYN = ['de', 'es', 'pt', 'it', 'sv', 'da', 'fi'];
  const notRegistered = /^rule 12: axes/;
  for (const loc of SYN) {
    const b = loc === 'fi' ? fiRuleFix(synthetic(loc, en)) : synthetic(loc, en);
    const errs = validateBank(b, loc).filter((e) => !notRegistered.test(e));
    ok(errs.length === 0, `synthetic ${loc} control: ${errs.join(' | ')}`);
  }
  // the must-pass ban controls (design §5 P7)
  for (const [loc, t] of [['de', 'Gerade Zahlen bis 20'], ['sv', 'jämnt'], ['da', 'dele ligeligt'], ['de', 'Der Zufallsbeutel'], ['en', 'on behalf of the pairs']]) ok(!banRegex(loc).test(t), `ban control ${loc} "${t}" must PASS`);
  for (const [loc, t] of [['de', 'Gerecht halbieren'], ['sv', 'hälften av talet'], ['en', 'write the double'], ['fi', 'puolet luvusta'], ['nl', 'de helft'], ['da', 'det halve']]) ok(banRegex(loc).test(t), `ban control ${loc} "${t}" must FIRE`);
  ok(banRegex('sv').test('Dubbelt och hälften'), 'the sv doubles-halves head fires the ban');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    // ---- 2. renders
    const d2 = TYPE.resolveBase(TYPE.difficulty[2], GLOBAL), d1 = TYPE.resolveBase(TYPE.difficulty[1], GLOBAL), d3 = TYPE.resolveBase(TYPE.difficulty[3], GLOBAL);
    ok(d1.stack === 638 && d2.stack === 638 && d3.stack === 618, `resolved stacks ${d1.stack} / ${d2.stack} / ${d3.stack} (re-budgeted 638 / 638 / 618; the design's 538 / 538 / 610 was sparse)`);
    ok(d2.houseH === 518 && d2.gap === 28 && d3.houseH === 426, `house ${d2.houseH} gap ${d2.gap} (d3 compact ${d3.houseH})`);
    for (const [d, cfg] of [[1, d1], [2, d2], [3, d3]]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-351-gate-d${d}-en` });
      assertRender(`d${d} en`, r, { chips: cfg.chips, worked: cfg.worked.count, stripH: cfg.stripH, stack: cfg.stack });
      const cc = crossCheck(r.m, en);
      ok(cc.length === 0, `d${d} en node cross-check: ${cc.join(' | ')}`);
      console.log(`render d${d} en: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} strip ${r.m.stripH.toFixed(1)} house ${r.m.houses[0].w.toFixed(0)}x${r.m.houses[0].h.toFixed(0)} signs ${r.m.houses.map((h) => h.sign + '@' + h.signW.toFixed(1)).join(' ')} chips ${r.m.chips.map((c) => c.v).join(',')} stage ${r.m.stage.h.toFixed(0)} band ${r.m.stage.band.toFixed(0)} slack-under ${r.m.stage.slackUnder.toFixed(0)} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // the ONE-LINE chrome (814): the slack under the stage <= 180
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-351-gate-d2-en-chrome814', strings: CHROME.one });
      ok(r.m.lines === 1 && r.m.body.h >= 800, `the one-line chrome fixture gives ${r.m.lines} title lines, body ${Math.round(r.m.body.h)} (README 814)`);
      assertRender('d2 en one-line chrome', r, { chips: 9, worked: 3, stripH: 92, stack: 638 });
      ok(r.m.stage.slackUnder <= 180, `one-line chrome: slack under the stage ${r.m.stage.slackUnder.toFixed(1)} > 180 (sparse)`);
      console.log(`render d2 en one-line chrome: body ${r.m.body.h.toFixed(1)} stage ${r.m.stage.h.toFixed(0)} slack-under ${r.m.stage.slackUnder.toFixed(0)} (<= 180)`);
    }
    // the 722 chrome (3-line title + 3-line instruction) and the 677 chrome (4-line title): the base fits BOTH
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-351-gate-d2-en-chrome722', strings: CHROME.three });
      ok(r.m.lines === 3, `the 3+3 chrome fixture title wraps to ${r.m.lines} lines, want 3`);
      ok(r.m.body.h <= 724 && r.m.body.h >= 700, `3+3 chrome fixture gives body ${Math.round(r.m.body.h)} (README 722; G1-352 measured 710)`);
      assertRender('d2 en 3+3 chrome', r, { chips: 9, worked: 3, stripH: 92, stack: 638 });
      ok(crossCheck(r.m, en).length === 0, 'd2 3+3 chrome node cross-check');
      console.log(`render d2 en 3+3 chrome: body ${r.m.body.h.toFixed(1)} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)} (stack 638, slack ${Math.round(r.m.body.h - 638)})`);
      const r4 = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-351-gate-d2-en-chrome677', strings: CHROME.four });
      ok(r4.m.lines === 4, `the 677 chrome fixture title wraps to ${r4.m.lines} lines, want 4`);
      ok(r4.m.body.h <= 690 && r4.m.body.h >= 660, `677 chrome fixture gives body ${Math.round(r4.m.body.h)} (want ~677)`);
      assertRender('d2 en 677 chrome', r4, { chips: 9, worked: 3, stripH: 92, stack: 638 });
      console.log(`render d2 en 677 chrome: body ${r4.m.body.h.toFixed(1)} lowest ${Math.round(r4.m.lowest)} vs foot ${Math.round(r4.m.foot)} (slack ${Math.round(r4.m.body.h - 638)})`);
      const r3 = await renderWith(page, TYPE, { difficulty: 3, baseName: 'G1-351-gate-d3-en-chrome677', strings: CHROME.four });
      assertRender('d3 en 677 chrome', r3, { chips: 12, worked: 2, stripH: 164, stack: 618 });
      console.log(`render d3 en 677 chrome: body ${r3.m.body.h.toFixed(1)} lowest ${Math.round(r3.m.lowest)} vs foot ${Math.round(r3.m.foot)} (stack 618, slack ${Math.round(r3.m.body.h - 618)})`);
    }

    // ---- component smoke: the seven face components through the real pipeline (+ the caption reserves)
    {
      const src = fileUri('animals', 'cat');
      const body = [
        C4.ruleStrip({ text: en.rule }),
        `<div style="display:grid;grid-template-columns:repeat(2,330px);gap:14px;justify-content:center">` +
          [7, 16].map((n) => `<section class="ws-card" style="padding:12px"><div class="ws-card-stage" data-lcs-f1 style="display:block">${C4.dotRowCard({ n, remLabel: en.leftover })}</div></section>`).join('') + `</div>`,
        C4.shareLane({ n: 9, src, names: ['Mia', 'Ben'], leftoverLabel: en.leftover, pills: pills(en, 'odd') }),
        C4.countLane({ n: 17, src, pairsLabel: en.pairs, pills: pills(en, 'odd') }),
        `<div data-lcs-f3 style="display:flex;gap:16px;align-items:center;justify-content:center">${C4.placeValueRow({ digits: [4, 7] })}${C4.tickPair({ keys: ['even', 'odd'], correct: 'odd' })}</div>`,
        C4.parityTable({ chips: en.chips }),
      ].join('<div style="height:8px"></div>');
      const fake = { ...TYPE, id: 'G1-351', build: async () => ({ bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column">${body}</div>`, meta: {} }), verify: async () => [] };
      const r = await renderWith(page, fake, { baseName: 'G1-351-gate-components' });
      ok(r.lints.length === 0, `components smoke: lints ${JSON.stringify(r.lints)}`);
      const h = await page.evaluate(() => {
        const R = (s) => document.querySelector(s).getBoundingClientRect();
        const lane = (s) => { const l = document.querySelector(s); const kids = [...l.children]; return { h: l.getBoundingClientRect().height, row: kids[kids.length - 1].getBoundingClientRect().right - kids[0].getBoundingClientRect().left }; };
        return {
          rule: R('[data-lcs-rule]').height,
          f1: [...document.querySelectorAll('[data-lcs-proof]')].map((c) => c.getBoundingClientRect().height),
          eqW: [...document.querySelectorAll('[data-lcs-proof] > div:last-child')].map((c) => { const k = [...c.children]; return k[k.length - 1].getBoundingClientRect().right - k[0].getBoundingClientRect().left; }),
          dotsText: [...document.querySelectorAll('[data-lcs-dots]')].map((d) => d.textContent.trim()),
          share: lane('[data-lcs-share]'), count: lane('[data-lcs-count]'),
          captions: [...document.querySelectorAll('[data-lcs-caption]')].map((c) => ({ t: c.textContent.trim(), w: c.getBoundingClientRect().width, fs: parseFloat(getComputedStyle(c).fontSize) })),
          pillsW: [...document.querySelectorAll('[data-lcs-pill]')].map((p) => p.getBoundingClientRect().width), pillsH: [...document.querySelectorAll('[data-lcs-pill]')].map((p) => p.getBoundingClientRect().height),
          pv: R('[data-lcs-pv]').height, hi: getComputedStyle(document.querySelector('[data-lcs-highlight]')).backgroundColor, ticks: [...document.querySelectorAll('[data-lcs-tick]')].map((t) => t.getBoundingClientRect().width + '/' + t.textContent.trim()),
          table: R('[data-lcs-table]').height, tableW: R('[data-lcs-table]').width, rows: [...document.querySelectorAll('[data-lcs-trow]')].map((t) => t.textContent.trim()),
          icons: [...document.querySelectorAll('img.ws-icon')].map((i) => i.naturalWidth > 0 && i.getBoundingClientRect().width >= 44).every(Boolean),
        };
      });
      ok(h.rule <= 44, `ruleStrip en ${h.rule.toFixed(1)} px (one line = 40)`);
      ok(h.f1.every((x) => x >= 118 && x <= 130), `dotRowCard ${h.f1.map((x) => x.toFixed(1)).join('/')} px (design 126)`);
      ok(h.eqW.every((x) => x <= 302), `dotRowCard equation rows ${h.eqW.map((x) => x.toFixed(1)).join('/')} <= 302`);
      ok(h.dotsText.every((t) => t === ''), `dots panels carry text ${JSON.stringify(h.dotsText)}`);
      ok(h.share.h >= 104 && h.share.h <= 108 && h.share.row <= 639, `shareLane ${h.share.h.toFixed(1)} px / row ${h.share.row.toFixed(1)} (design 106 / 634)`);
      ok(h.count.h >= 104 && h.count.h <= 108 && h.count.row <= 639, `countLane ${h.count.h.toFixed(1)} px / row ${h.count.row.toFixed(1)} (design 106 / 616)`);
      const capL = h.captions.filter((c) => c.t === en.leftover && c.fs === 14), capP = h.captions.filter((c) => c.t === en.pairs);
      ok(capL.length && capL.every((c) => c.w <= 84), `leftover caption ${capL.map((c) => c.w.toFixed(1)).join('/')} <= 84`);
      ok(capP.length && capP.every((c) => c.w <= 56), `pairs caption ${capP.map((c) => c.w.toFixed(1)).join('/')} <= 56`);
      ok(h.pillsW.every((w) => w <= 102) && h.pillsH.every((x) => x >= 44), `pills ${h.pillsW.map((w) => w.toFixed(1)).join('/')} wide, ${h.pillsH.join('/')} high`);
      ok(Math.abs(h.pv - 48) <= 1 && /251, 227, 216/.test(h.hi), `placeValueRow ${h.pv.toFixed(1)} high, ones box background ${h.hi} (coralSoft)`);
      ok(h.ticks.length === 2 && h.ticks.every((t) => t.startsWith('44/') && t.endsWith('/')), `tickPair ${h.ticks.join(' ')} (44 px, EMPTY)`);
      ok(Math.abs(h.table - 92) <= 1 && h.tableW <= 250 && h.rows.join('|') === 'even + even = even|odd + odd = even|even + odd = odd', `parityTable ${h.table.toFixed(1)} x ${h.tableW.toFixed(1)} rows ${h.rows.join(' | ')}`);
      ok(h.icons, 'every picture in the smoke lanes loaded at >= 44 px');
      console.log(`components: rule ${h.rule.toFixed(1)} · dotRowCard ${h.f1.map((x) => x.toFixed(1)).join('/')} (eq ${h.eqW.map((x) => x.toFixed(1)).join('/')}) · shareLane ${h.share.h.toFixed(1)}/${h.share.row.toFixed(1)} · countLane ${h.count.h.toFixed(1)}/${h.count.row.toFixed(1)} · captions ${h.captions.map((c) => c.t + '@' + c.w.toFixed(1)).join(' ')} · pills ${h.pillsW.map((w) => w.toFixed(1)).join('/')} · pv ${h.pv.toFixed(1)} · table ${h.table.toFixed(1)}x${h.tableW.toFixed(1)}`);
      // component contracts (throws)
      const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `${what}: ${m || 'did NOT throw'}`); };
      throws(() => C4.pairDots({ n: 7 }), /only a workedTile/, 'pairDots without host');
      throws(() => C4.pairDots({ n: 0, host: 'worked' }), /1\.\.10/, 'pairDots n 0');
      throws(() => C4.pairDots({ n: 11, host: 'worked' }), /1\.\.10/, 'pairDots n 11');
      throws(() => C4.workedTile({ n: 12 }), /1\.\.10/, 'workedTile n 12');
      throws(() => C4.houseBin({ parity: 'odd', label: 'odd', w: 200 }), /< 300/, 'houseBin w 200');
      throws(() => C4.houseBin({ parity: 'odd', label: 'odd', boxes: { cols: 5 } }), /> 284/, 'houseBin 5 columns');
      throws(() => C4.houseBin({ parity: 'odd', label: 'odd', worked: [{ n: 8 }] }), /worked 8 in the odd house/, 'houseBin even worked in the odd house');
      throws(() => C4.houseBin({ parity: 'odd', label: 'odd', worked: [{ n: 1 }, { n: 3 }, { n: 5 }] }), /> 284/, 'houseBin 3 worked tiles');
      throws(() => C4.houseBin({ parity: 'odd', label: ' ' }), /non-empty/, 'houseBin empty sign');
      throws(() => C4.chipStrip({ values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }), /> 639/, 'chipStrip 10 x 64');
      throws(() => C4.chipStrip({ values: [1, 0, 3] }), /positive integer/, 'chipStrip a 0');
      throws(() => C4.tickPair({ keys: ['even', 'even'], correct: 'even' }), /permutation/, 'tickPair keys');
      throws(() => C4.parityTable({ chips: en.chips, order: ['ee', 'ee', 'oo'] }), /permutation/, 'parityTable order');
      throws(() => C4.shareLane({ n: 9, src, names: ['Mia', 'Mia'], leftoverLabel: 'x' }), /DIFFERENT/, 'shareLane same name twice');
      throws(() => C4.placeValueRow({ digits: [0, 7] }), /leading 0/, 'placeValueRow 07');
    }

    // ---- config poisons (resolveBase refuses)
    {
      const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `${what}: ${m || 'did NOT refuse'}`); if (m) console.log(`  poison ${what}: killed (${m.slice(0, 80)})`); };
      const D2 = TYPE.difficulty[2];
      throws(() => TYPE.resolveBase({ ...D2, range: [0, 30] }, GLOBAL), /0 never/, 'config range [0, 30]');
      throws(() => TYPE.resolveBase({ ...D2, boxes: { cols: 2, rows: 2 } }, GLOBAL), /leak/, 'config boxes 2 x 2 at d2 (4 = the open count)');
      throws(() => TYPE.resolveBase({ ...D2, boxes: { cols: 1, rows: 3 } }, GLOBAL), /boxes < /, 'config boxes 1 x 3 at d2 (3 < the open 4)');
      ok((() => { try { TYPE.resolveBase({ ...D2, boxes: { cols: 2, rows: 3 } }, GLOBAL); return true; } catch (e) { return false; } })(), 'control: boxes 2 x 3 (6 > 5, != 4 / 5) resolves');
      throws(() => TYPE.resolveBase({ ...D2, worked: { count: 3, split: [1, 2] } }, GLOBAL), /larger house first/, 'config worked.split [1, 2]');
      throws(() => TYPE.resolveBase({ ...D2, worked: { count: 3, split: [3, 0] } }, GLOBAL), /both parities/, 'config worked.split [3, 0]');
      throws(() => TYPE.resolveBase({ ...D2, chips: 5, splits: [[4, 4]] }, GLOBAL), /window/, 'config chips 5');
      throws(() => TYPE.resolveBase({ ...D2, range: [1, 10] }, GLOBAL), /holds 5 odd numerals/, 'config range [1, 10] for 6 + 6');
      throws(() => TYPE.resolveBase({ ...D2, house: TYPE.difficulty[3].house }, GLOBAL), /< 600 \(sparse/, 'config the compact 426 house at d2 (stack 546)');
      throws(() => TYPE.resolveBase({ ...D2, gap: 60 }, GLOBAL), /gap 60 outside 20\.\.40/, 'config gap 60');
      throws(() => TYPE.resolveBase({ ...D2, gap: 12 }, GLOBAL), /gap 12 outside/, 'config gap 12');
      throws(() => TYPE.resolveBase({ ...D2, house: { boxes: { h: 96 } } }, GLOBAL), /> 677/, 'config boxes 96 high (stack 682 > 677)');
      throws(() => TYPE.resolveBase({ ...TYPE.difficulty[3], house: undefined }, GLOBAL), /> 677/, 'config d3 with the roomy house (164 + 28 + 518 = 710 > 677)');
      ok((() => { try { TYPE.resolveBase(D2, GLOBAL); return true; } catch (e) { return false; } })(), 'control: the shipped d2 config resolves');
    }

    // ---- 3. sweep
    if (!QUICK) {
      for (const d of [1, 2, 3]) {
        const cfg = TYPE.resolveBase(TYPE.difficulty[d], GLOBAL);
        const sets = new Set(), orders = new Set();
        for (let s = 1; s <= 20; s++) {
          const rng = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: d, seedEpoch: 1, variant: s }));
          const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
          const { order, worked, split } = b.meta;
          const allW = [...worked.odd, ...worked.even];
          ok(order.length === cfg.chips && allW.length === cfg.worked.count, `sweep d${d} seed ${s}: ${order.length} chips / ${allW.length} worked`);
          ok(cfg.splits.some((sp) => sp[0] === split.odd && sp[1] === split.even), `sweep d${d} seed ${s}: split ${split.odd}/${split.even}`);
          ok(worked.odd.length >= 1 && worked.even.length >= 1 && allW.every((n) => n <= cfg.maxN && n >= cfg.range[0]), `sweep d${d} seed ${s}: worked ${allW}`);
          ok(new Set([...order, ...allW]).size === order.length + allW.length, `sweep d${d} seed ${s}: a numeral twice`);
          ok(order.every((v) => v >= cfg.range[0] && v <= cfg.range[1] && v !== 0), `sweep d${d} seed ${s}: a chip outside the range`);
          ok(TYPE.orderOk(order) && !order.every((v, i) => !i || v > order[i - 1]), `sweep d${d} seed ${s}: order [${order}] ascends / alternates`);
          const cnt = { odd: 0, even: 0 }; order.forEach((v) => cnt[TYPE.parity(v)]++);
          for (const p of ['odd', 'even']) ok(cfg.boxes.cols * cfg.boxes.rows > cnt[p], `sweep d${d} seed ${s}: ${p} boxes not > ${cnt[p]} open`);
          sets.add(order.slice().sort((a, b) => a - b).join(',')); orders.add(order.join(','));
        }
        ok(sets.size >= 2 && orders.size >= 2, `sweep d${d}: ${sets.size} distinct sets / ${orders.size} orders over 20 seeds`);
        console.log(`sweep d${d}: 20 seeds, ${sets.size} distinct sets, ${orders.size} distinct orders`);
      }
      // the seed is locale-neutral: the same numerals in en and (synthetic) de
      const rngA = makeRng('x'), rngB = makeRng('x');
      const a = TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: rngA }), b = TYPE._buildWith(synthetic('de', en), TYPE.difficulty[2], { locale: 'de' }, { rng: rngB });
      ok(a.meta.order.join() === b.meta.order.join() && JSON.stringify(a.meta.worked) === JSON.stringify(b.meta.worked), 'the deal is locale-neutral (en === de numerals; only the house order and signs differ)');
    }

    // ---- 4. poisons — bank (validator)
    const poison = (name, block, loc, re) => {
      const errs = validateBank(block, loc, { skipProbe: true }).filter((e) => !notRegistered.test(e));
      const hit = errs.filter((e) => re.test(e));
      if (!errs.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT (the validator passed the poison)`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${errs.join(' | ')}`); }
      else { asserts++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    let b;
    b = synthetic('de', en); b.chips.even = 'Gerade'; poison('P1 de chips.even Gerade', b, 'de', /rule 2: de chips\.even "Gerade"/);
    b = clone(en); b.chips.even = 'odd'; poison('P2 chips.even odd', b, 'en', /rule 1: chips\.even "odd" != K-016|rule 1: chips\.odd === chips\.even/);
    b = synthetic('sv', en); b.chips.even = 'jämna'; poison('P3 sv chips.even jämna', b, 'sv', /rule 1: chips\.even "jämna" != K-016/);
    b = clone(en); b.rule = 'Even numbers end in 0, 2, 4, 6 or 8.'; poison('P4 rule with the even digits only', b, 'en', /rule 3: digit 1 appears 0/);
    b = clone(en); b.leftover = 'what is left over now'; poison('P5 leftover 21 chars', b, 'en', /rule 4: leftover .* > 16/);
    b = clone(en); b.placeHeads = ['Tens', 'Ones']; poison('P6 placeHeads Tens/Ones', b, 'en', /rule 5: placeHead "Tens"/);
    b = synthetic('de', en); b.placeHeads = ['T', 'O']; poison('P6 de placeHeads T/O', b, 'de', /rule 5: de placeHeads \[T,O\] != the lock-given/);
    b = synthetic('de', en); b.strings.share.title = 'Gerecht halbieren: gerade oder ungerade?'; poison('P7 de share title halbieren', b, 'de', /rule 6: .* matches the doubles \/ halves ban \(halbieren\)/);
    b = clone(en); b.strings.base.title = 'Even and Odd Numbers: Odd House, Even House'; poison('P8 en base "Even and Odd"', b, 'en', /rule 6: en base title .* "Even and Odd"/);
    b = fiRuleFix(synthetic('fi', en)); b.strings.count.title = 'Parillinen tai pariton? Laske kuvat pareittain'; poison('P9 fi count title tai', b, 'fi', /rule 7: fi question title .* (lacks " vai "|uses " tai ")/);
    b = clone(en); b.strings.ones.title = 'Odd and Even Numbers: Look at the Ones Box'; poison('P10 ones title without 100', b, 'en', /rule 7: the ones title .* lacks the 100 idiom/);
    b = clone(en); b.strings.proof.title = 'Odd and Even Numbers: Big Pair Proof'; b.strings.count.title = 'Odd and Even Numbers: Bigger Pair Proof'; poison('P11 Big vs Bigger', b, 'en', /rule 8: proof \/ count titles differ only by an inflection/);
    b = synthetic('sv', en); b.strings.base.instruction = 'Skriv talet för varje vecka i rätt hus.'; poison('P12 sv instruction vecka', b, 'sv', /rule 6: .* neighbour head "vecka"/);
    b = synthetic('it', en); b.strings.base.title = 'Pari e dispari'; poison('P13 it base Pari e dispari', b, 'it', /rule 6: it base title "Pari e dispari"/);
    b = clone(en); delete b.strings.sums; poison('P14 strings without sums', b, 'en', /rule 9: strings\.sums missing/);
    b = clone(en); b.strings.base.instruction = 'Circle the dots two by two.'; poison('P15 base instruction dots', b, 'en', /rule 7: the base instruction names an absent apparatus \("dots"\)/);
    b = synthetic('it', en); b.nameMaxGraphemes = 3; poison('P16 it nameMaxGraphemes 3', b, 'it', /rule 10: nameMaxGraphemes 3 leaves \d+ of 8 names/);
    b = clone(en); b.strings.base.title = 'Odd and Even Numbers Worksheet: Odd House'; poison('P7b worksheet word', b, 'en', /rule 7: base title carries the worksheet word/);
    b = clone(en); b.strings.share.title = 'Can Two Friends Share Fairly? With Answers'; poison('P7c answers promised', b, 'en', /rule 7: share string promises answers/);
    b = clone(en); b.strings.base.instruction = 'Free printable: write each number in a house.'; poison('P7d free claim', b, 'en', /rule 7: base string claims free/);
    b = clone(en); b.houseOrder = ['odd', 'odd']; poison('P2b houseOrder odd,odd', b, 'en', /rule 2: houseOrder/);
    b = clone(en); b.rule = 'Even numbers end in 0, 2, 4, 6 or 8. The others end in 1, 3, 5, 7 or 9.'; poison('P4b rule without the odd chip', b, 'en', /rule 3: the rule does not carry the chip "odd"/);
    b = clone(en); b.pairs = 'left over'; poison('P5b pairs === leftover', b, 'en', /rule 4: leftover === pairs/);
    b = clone(en); b.strings.base.title = 'Odd House, Even House'; poison('P7e base title without the head', b, 'en', /rule 7: the base title .* does not contain the head/);
    b = clone(en); b.strings.base.title = 'Doubles and Halves: Odd House'; poison('P7f the doubles-halves head in a title', b, 'en', /rule 6: .* ban \(doubles\)|rule 7: the base title/);
    b = clone(en); b.strings.base.title = 'Odd and Even Numbers: Ten Frames'; poison('P6b neighbour head Ten Frames', b, 'en', /rule 6: .* neighbour head "Ten Frames"/);
    b = clone(en); b.strings.base.title = 'Odd or Even?'; poison('P7g the K-016 title in the band', b, 'en', /rule 7: the base title .* does not contain the head|equals K-016/);

    // ---- render poisons (the validator bypassed)
    const renderPoison = async (name, type, re, { difficulty = 2, strings } = {}) => {
      let r;
      try { r = await renderWith(page, type, { difficulty, baseName: `G1-351-gate-poison-${name.split(' ')[0]}`, strings }); }
      catch (e) { fails++; asserts++; console.log(`  FAIL ${name}: threw ${e.message}`); return; }
      const all2 = [...r.verify, ...r.lints, ...crossCheck(r.m, en)];
      const hit = all2.filter((f) => re.test(f));
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ')}`); }
      else { asserts++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    await renderPoison('PR1 a pre-filled blankbox', mutated(TYPE, (h) => h.replace(/(<span class="ws-blankbox"[^>]*>)(<\/span>)/, '$17$2')), /pre-filled|a box with answer|text "7"/);
    await renderPoison('PR3 a ten-frame injected', mutated(TYPE, (h) => h.replace('<div data-lcs-houses', '<svg data-lcs-prim="ten-frame" width="10" height="10"></svg><div data-lcs-houses')), /ten-frame/);
    await renderPoison('PR5 a pairDots beside an open chip', mutated(TYPE, (h) => { const i = h.indexOf('</span>', h.indexOf('data-lcs-val=')) + 7; return h.slice(0, i) + C4.pairDots({ n: 5, host: 'worked' }) + h.slice(i); }), /beside an open chip|no worked-tile ancestor/);
    await renderPoison('PR6 a house with 4 boxes and 4 open chips', mutated(TYPE, (h) => {
      // the house holding TWO worked tiles has 4 open chips at d2 (6 - 2): drop four of its eight boxes
      const houses = [...h.matchAll(/<div data-lcs-house="(odd|even)"[\s\S]*?<\/div><\/div><\/div>/g)];
      const two = houses.find((m) => (m[0].match(/data-lcs-given=/g) || []).length === 2);
      if (!two) throw new Error('PR6: no house with two worked tiles');
      let cut = 0; const fixed = two[0].replace(/<span class="ws-blankbox"[^>]*><\/span>/g, (x) => (cut++ < 4 ? '' : x)).replace('data-lcs-boxes="8"', 'data-lcs-boxes="4"');
      return h.replace(two[0], fixed);
    }), /leak|boxes, config says/);
    await renderPoison('PR9 a 0 chip', mutated(TYPE, (h) => h.replace(/data-lcs-val="(\d+)"([^>]*>)\1</, 'data-lcs-val="0"$20<')), /a 0 chip|a 0 on the page|standalone 0|outside \[/);
    await renderPoison('PRa a parity stamp on a chip', mutated(TYPE, (h) => h.replace('data-lcs-val=', 'data-lcs-parity="odd" data-lcs-val=')), /parity stamp/);
    await renderPoison('PRb a worked numeral with the wrong pairs', mutated(TYPE, (h) => h.replace(/data-lcs-pairs="(\d)"/, (m, p) => `data-lcs-pairs="${+p + 1}"`)), /pairs/);
    await renderPoison('PRc a worked even numeral in the odd house', mutated(TYPE, (h) => {
      const m = /data-lcs-house="odd"[\s\S]*?data-lcs-given="(\d+)"/.exec(h);
      const n = +m[1], even = [2, 4, 6, 8, 10].find((v) => !new RegExp(`data-lcs-(val|given)="${v}"`).test(h));
      const i = m.index + m[0].length - m[1].length - 1;
      return h.slice(0, i) + String(even) + h.slice(i + m[1].length).replace(new RegExp(`(<span style="[^"]*">)${n}(</span>)`), `$1${even}$2`);
    }), /sits in the odd house|worked \d+ in the odd house/);
    await renderPoison('PRd chip numerals at 20 px', mutated(TYPE, (h) => h.replace(/font-size:26px;line-height:1">/g, 'font-size:20px;line-height:1">')), /numeral .* < 26|numeral 20 < 26/);
    { const bad = clone(en); bad.chips.even = 'an even word far too long for the sign'; await renderPoison('PRe a sign literal wider than 260', withBank(TYPE, bad), /overflows its pill|> 260|sign is/); }
    await renderPoison('PRf the chips re-ordered ascending', mutated(TYPE, (h) => { const chips = h.match(/<span class="ws-chip" data-lcs-val="\d+"[^>]*>\d+<\/span>/g); const sorted = chips.slice().sort((a, b) => +a.match(/val="(\d+)"/)[1] - +b.match(/val="(\d+)"/)[1]); return h.replace(chips.join(''), sorted.join('')); }), /ascends|fully ascending/);
    await renderPoison('PRg a 600 px house under the 677 chrome', mutated(TYPE, (h) => h.replace(/height:518px/g, 'height:600px').replace('grid-template-rows:92px 518px', 'grid-template-rows:92px 600px')), /footer overlap|lowest ink|house is/, { strings: CHROME.four });
    // PRs — the design's ORIGINAL build (the 426 house, a 20 px gap, the houses centred in a minmax(426px, 1fr) row):
    // must FAIL as sparse (the reviewer's read of the first d2 render: a ~130 px blank band under the strip)
    {
      // resolveBase refuses that config outright (546 < 600), so the legacy DOM is re-created by mutation of the SHIPPED build
      const legacyDom = mutated(TYPE, (h) => h
        .replace(/grid-template-rows:92px 518px;row-gap:28px;align-content:start/, 'grid-template-rows:92px minmax(426px,1fr);row-gap:20px')
        .replace(/align-items:flex-start/g, 'align-items:center')
        .replace(/data-lcs-gap="28" data-lcs-stack="638"/, 'data-lcs-gap="20" data-lcs-stack="538"')
        .replace(/height:518px/g, 'height:426px').replace(/data-lcs-h="518"/g, 'data-lcs-h="426"').replace(/height="518" viewBox="0 0 330 518"/g, 'height="426" viewBox="0 0 330 426"')
        .replace(/height="396"/g, 'height="304"').replace(/top:152px/g, 'top:140px').replace(/top:220px/g, 'top:196px').replace(/top:314px/g, 'top:270px')
        .replace(/repeat\(4,64px\);gap:24px 8px/g, 'repeat(4,62px);gap:14px 12px').replace(/width:64px;height:74px;flex:0 0 64px/g, 'width:62px;height:60px;flex:0 0 62px'));
      let m = null; try { TYPE.resolveBase({ ...TYPE.difficulty[2], house: TYPE.difficulty[3].house, gap: 20 }, GLOBAL); } catch (e) { m = e.message; }
      ok(m && /sparse/.test(m), `PRs the design's 538 config is refused by resolveBase: ${m || 'NOT refused'}`);
      await renderPoison('PRs the design\'s 538 / centred build (blank band under the strip)', legacyDom, /sparse/);
    }
    await renderPoison('PRt the grid de-anchored (align-content:center)', mutated(TYPE, (h) => h.replace('align-content:start', 'align-content:center')), /not top-anchored/);
    await renderPoison('PRu a 1fr house row (the slack inside the stage)', mutated(TYPE, (h) => h.replace('grid-template-rows:92px 518px', 'grid-template-rows:92px minmax(518px,1fr)').replace(/align-items:flex-start/g, 'align-items:center')), /blank band|band is|sparse/);
    await renderPoison('PRh the sign printing a numeral', mutated(TYPE, (h) => h.replace(/(data-lcs-sign="odd"[^>]*>)odd(<)/, '$17$2')), /sign carries a digit|sign reads "7"/);
    await renderPoison('PRi a stamped answer', mutated(TYPE, (h) => h.replace('data-lcs-answer=""', 'data-lcs-answer="5"')), /data-lcs-answer "5"|a stamped answer|a box with answer "5"/);
  } finally {
    await browser.close();
  }
  console.log(`\nverify-b4-odd-and-even: ${asserts} assertions, ${fails} failures in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${fails ? 'FAIL' : 'PASS'}`);
  process.exit(fails ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, crossCheck, banRegex, TABLE_B, HEAD, synthetic };
