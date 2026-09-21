#!/usr/bin/env node
/**
 * verify-b4-question-words.js — the G1-353 `question-words` gate (design file
 * docs/worksheet-gen/b4-designs/G1-353-question-words.md §5; brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b4-question-words.js [--quick]
 *
 * 1. BANK — every locale block of data/b4/question-words.js against the §5
 *    validator rules 1-14 (the `tools/validate-b4-draft.js` question-words
 *    block, folded in here and exported as `validateBank(block, loc, opts)`;
 *    tools/b4-probe-child.js calls it with (block, loc)):
 *    (1) qwords = exactly who/what/where/when/howmany, distinct (NFD, ci), each
 *        <= 14 chars, none equal to a tagged name, a place / time literal or any
 *        objForms literal of the locale; starters = qwords who..when in order +
 *        two more (why, how), six distinct, howmany NOT among them; bins keys ⊆
 *        {who, what, where, when}, each `qPrefix + qwords[k] + '?'` unless
 *        binAliases[k]; (2) frames >= 12, >= 3 per kind; text `{name}` FIRST,
 *        one {name}, exactly the complement slots its kind requires, no ___, ends
 *        '.', no qwords literal as a token, filled with the longest tagged name
 *        + a 12-glyph thing <= 40, signed:true, ids distinct; (3) q has exactly
 *        who + <kind>, each opens with qPrefix + qwords[k] (case-sensitive),
 *        carries every slot of text EXCEPT the asked one, ends '?' (fr NBSP + ?),
 *        >= 8 F4-eligible pairs (<= 31) over all five kinds, >= 6 F2-eligible
 *        (rest <= 30) over all five, every pair <= 44 (F1); (4) de thing frames
 *        carry objCase acc | dat (a {thing} slot on a dat frame FAILS); (5) no
 *        literal equals a SENTENCES[loc] frame, none carries {noun} / {color};
 *        (6) places = the EN key list (overlays may null a text, never add a
 *        key), >= 6 non-null, lowercase-initial, >= 6 under the F3 tile guard
 *        (round(glyphs x 10.2) <= 112), every pic a colour candidate + file,
 *        no B&W marker, picOpened:true, every twin member present; (7) times
 *        >= 6, h 1..12 distinct, text distinct; (8) genderFilter.count ∈
 *        {undefined, 'm'}, present for es / pt / it; qPrefix '¿' iff es;
 *        (9) strings x6: titles <= 70, no worksheet word, distinct, base title
 *        === the locale's measured head, no neighbour family name, F4 title =
 *        the measured write-a-question head where one exists, instructions <=
 *        120, the fill instruction (only) carries bankWord AND boxWord, the ask
 *        instruction (only) carries pictureWord, no free claim, no answer
 *        promise; (10) sortThingForm ∈ {bare, unique}; sv / da / no: no
 *        definite-clash key in the thing pool (opts.pool injectable); (11)
 *        nameForms absent unless fi possession:'adessive' (then ade covers every
 *        name and count frames name {name:ade}); (12) overlays keep the EN
 *        qwords keys, frame ids / kinds / slot shapes and place keys; the
 *        pronouns bank loads (names >= 12 with >= 6 f + >= 6 m, people 32);
 *        faces = the six modes, base.kinds === the spec's d2 chips; resolveBase
 *        (d2) does not throw (the chip-strip guard); (13) fi: thing frames name
 *        {part} only unless whatForm:'nominative', qwords.what === 'Mitä', every
 *        non-null place static:true; (14) the taxonomy slug of the locale equals
 *        table B and collides with no other axis slug (unregistered = reported).
 *    The gate MAY read the vocab / taxonomy / SENTENCES; the spec never does
 *    (except the vocab gender code for the sv / da / no clash rule).
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1 / d2 / d3 en at the default chrome, d2 under the README 722
 *    chrome (a 3-line title + a 3-line instruction; measured 710) AND under the
 *    fi four-line 677 chrome (the base must FIT: 664 <= 677). Asserts verify()
 *    empty, qa/lints.js clean, the G1 floors ITSELF (portraits >= 44 → 56
 *    shipped, chips >= 44 high on ONE row, sentence >= 16), the row / stack /
 *    strip geometry (row 88 ± 1, stack <= 677, the 4-chip strip <= 531), the
 *    +8 px mark (a marked sentence measures the plain one + 8, + 0 height),
 *    and the NODE cross-check: every stamped sentence === fillFrame from the
 *    bank, every mark === markOf, every chip index === kinds.indexOf(ask),
 *    every portrait's depicted === the name's gender and its src === the
 *    pronouns bank's file, every thing / place picture === the pinned file, no
 *    name / src / frame twice, pictureBot <= 0.35 on d2 / d3.
 *    Plus a COMPONENT smoke: the six face components (qaMatch, questionFrame,
 *    qwBins, writeRow, askScene, starterLines) rendered through the pipeline in
 *    a throwaway type — lints clean, clock numerals >= 9 px, the design's
 *    stack numbers (F1 560 / F2 84 / F3 <= 586 / F4 78 / F5 160 + 400)
 *    measured and printed for the faces.
 * 3. SWEEP — 20 seeds x d1 / d2 / d3 (build only): every chip appears >= its
 *    kinds count, no name / thing / place / time / portrait twice, every mark
 *    re-derived, pictureBot <= botMax, >= 2 distinct row sets AND orders
 *    (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (no matching message = WRONG
 *    REASON; no fail = SILENT; either exits 1). The correct EN bank / render is
 *    the control. Design §5:
 *      P1  text "Den Ball hat {name}."                        → rule 2
 *      P2  "{name} weiß, wer kommt." (de) / "{name} knows what." → rule 2
 *      P3  q.where "Wo ist {name} {place}?"                   → rule 3
 *      P4  q.who "wer hat {thing}?" (lowercase)               → rule 3
 *      P5  a fr q ending " ?" (plain space) under nbsp:true   → rule 3
 *      P6  a de dative-verb frame carrying {thing}            → rule 4
 *      P7  "Where is the {noun}?"                             → rule 5
 *      P8  an es draft without genderFilter.count; pt with '¿' → rule 8
 *      P9  a places overlay adding zoo; pic 'animals bw'       → rule 6
 *      P10 a sv pool carrying cow (kon === cone)              → rule 10
 *      P11 a fi frame with {thing}                            → rule 13
 *      P12 sv title "Frågeord och skiljetecken"; a base instruction with the
 *          bank word; starters with "How many"                → rule 9 / 1
 *    Render poisons (the validator bypassed, the _buildWith seam):
 *      P13 a count row whose mark spans "five lambs"          → verify + node
 *      P14 the chips reordered on one row                     → verify position leak
 *      P18 a base page with 3 who rows (pictureBot 0.43)      → verify
 *      P19 Ben tagged f in the pronouns bank (a girl's portrait under "Ben") → node
 *      P22 the row grid authored with column-gap:10px 12px    → verify geometry
 *      PRa a chip carrying data-lcs-correct · PRb a mark inside a chip strip ·
 *      PRc a chip label printed in the sentence · PRd a portrait src twice
 *      P20 a clock at 64 px → qa/lints.js (7 px numerals) + qaMatch throws
 *      P21 the F3 tile "auf dem Spielplatz" measured > 112 at Baloo 20
 *    Component throws: markedSpan '' · renderMarked twice / whole · qwChips 6 /
 *    dup / mark / h 40 · qaMatch a non-derangement · questionFrame rest opening
 *    with the answer (P16's shape) · qwBins tile === head · writeRow the answer
 *    printed (P17's shape) · askScene tile 90 · starterLines a duplicate.
 *    P15 / P16 / P17 proper (the F1 / F2 / F4 verify branches) are Phase 2.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule, bank: loadBank } = require('../lib/b4-common.js');
const { bank: loadB3 } = require('../lib/b3-common.js');
const { fileUri, vocab } = require('../lib/b2-common.js');
const { candidates } = require('../lib/b3-picture-index.js');
const { slotsIn } = require('../lib/b3-instructions.js');
const { numberWord } = require('../lib/number-words.js');
const { SENTENCES } = require('../data/b2/sentences.js');
const freeClaim = require('../../lib/free-claim.js');
const clock = require('../primitives/clock.js');
const C4 = require('../templates/components-b4.js');

const TYPE = require('../types/g1/G1-353-question-words.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const TAXONOMY = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
const BW_MARKER = /(^|[\s_])(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const FLOOR = 44;                                   // the G1 element floor
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä|tehtäväpaperi/i;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med facitliste|med fasit|vastauksineen/i;
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const KINDS = ['thing', 'place', 'time', 'count'];
const KIND_ASK = TYPE.KIND_ASK;
const QW_KEYS = ['who', 'what', 'where', 'when', 'howmany'];
const FACES = ['base', 'match', 'fill', 'sort', 'write', 'ask'];
const NEIGHBOURS = ['capitals-punctuation', 'reading-comprehension', 'sentence-building', 'word-classes'];
const TABLE_B = { en: 'question-words', de: 'w-fragen', es: 'preguntas-con-quien-que-y-donde', pt: 'palavras-para-perguntar', fr: 'mots-interrogatifs', it: 'le-domande-della-frase', nl: 'vraagwoorden', sv: 'frageord', da: 'hv-ord', no: 'sporreord', fi: 'kysymyssanat' };
/** The measured genre heads (design §1 table B): the base title IS the head. */
const HEADS = { en: 'Question Words: Who, What, Where', de: 'W-Fragen: wer, was, wo', es: 'Preguntas con quién, qué y dónde', pt: 'Quem, o que, onde: palavras para perguntar', fr: 'Les mots interrogatifs : qui, que, où', it: 'Le domande della frase: chi, che cosa, dove', nl: 'Vraagwoorden: wie, wat, waar', sv: 'Frågeord: vem, vad, var, när', da: 'Hv-ord: hvem, hvad, hvor', no: 'Spørreord: hvem, hva, hvor', fi: 'Kysymyssanat: kuka, mikä, missä' };
/** The measured write-a-question heads (design §3 F4): the F4 title where one was measured. */
const MEASURED_F4 = { nl: 'Vraagzinnen maken', sv: 'Ställ en fråga', da: 'Stil et spørgsmål', no: 'Lag et spørsmål', fi: 'Tee kysymys' };
/** Chip widths MEASURED 2026-09-21 (Baloo 2 700 20 / pad 12, the shell woff2 from file://) — the design §2 table re-measured to the pixel. */
const MEASURED_CHIP_W = { Who: 68.1, What: 75, Where: 86, When: 78.9, 'How many': 121.8, Wer: 63.7, Was: 65.3, Wo: 56.3, Wann: 78.6, 'Wie viele': 108.5, Qui: 59, Que: 64.3, 'Où': 53.5, Quand: 87.2, Combien: 106.9, 'Quién': 81.3, 'Qué': 64.3, 'Dónde': 86.7, 'Cuándo': 96.1, 'Cuántos': 101.9, Quem: 81.1, 'O que': 79.9, Onde: 75.9, Quando: 98.8, Quantos: 104.5, Chi: 56.5, 'Che cosa': 107.4, Dove: 74, Quanti: 88.9, Wie: 61.2, Wat: 63.5, Waar: 74.4, Wanneer: 108.4, Hoeveel: 101.4, Vem: 67.4, Vad: 62.6, Var: 59.1, 'När': 60.2, 'Hur många': 125.7, Hvem: 79.5, Hvad: 74, Hvor: 71.5, 'Hvornår': 101.6, 'Hvor mange': 136.5, Hva: 62.5, 'Når': 60.2, Kuka: 72.9, 'Mitä': 67.8, 'Missä': 79.4, Milloin: 88.8, 'Kuinka monta': 152.2 };
const TILE_GUARD = 112, PX_PER_GLYPH_18 = 10.2;     // the F3 tile guard (design §3 F3)
const PROBE = { thing: 'x'.repeat(8), pl: 'x'.repeat(6), part: 'x'.repeat(6), dat: 'x'.repeat(8) };   // typical fills for the F1 / F2 / F4 caps (the design's own examples use 5-8 glyph nouns)

let fails = 0, asserts = 0;
function ok(cond, msg) { asserts++; if (!cond) { fails++; console.log('  FAIL ' + msg); } }
function fold(s) { return String(s || '').trim().toLocaleLowerCase(); }
function nfd(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function glyphs(s) { return [...String(s || '')].length; }
function reEsc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function hasWord(text, word) { return new RegExp('(?<!\\p{L})' + reEsc(word) + '(?!\\p{L})', 'iu').test(String(text)); }
function fileExists(theme, noun) { try { return fs.existsSync(url.fileURLToPath(fileUri(theme, noun))); } catch (e) { return false; } }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function longestName(names) { return names.map((x) => x.name).sort((a, b) => glyphs(b) - glyphs(a))[0] || 'Emma'; }
function objFormsOf(loc) { try { return loadB3('instructions', loc).objForms || {}; } catch (e) { return {}; } }
function pronOf(loc) { try { return loadBank('pronouns', loc); } catch (e) { return null; } }
/** Fill a literal with probe values: the given name, the PROBE thing forms, a place / time / number word from the block. */
function probeFill(text, { name, place, time, n, loc }) {
  return String(text).replace(/\{name:ade\}/g, name).replace(/\{([a-z]+)\}/g, (w, k) => {
    if (k === 'name') return name;
    if (PROBE[k]) return PROBE[k];
    if (k === 'place') return place;
    if (k === 'time') return time;
    if (k === 'n') return numberWord(n, loc);
    return w;
  });
}

/* ------------------------------------------------------------------ 1. the bank validator ------------------------------------------------------------------ */

/**
 * validateBank(block, loc, opts) -> string[] of failures (empty = clean). opts.en = the EN block (defaults to the
 * module's); opts.pron = the pronouns block (defaults to bank('pronouns', loc)); opts.objForms; opts.pool (rule 10).
 */
function validateBank(block, loc, opts = {}) {
  const out = [];
  const push = (m) => out.push(m);
  if (!block || typeof block !== 'object') return ['no block'];
  const en = opts.en || bankModule('question-words').en;
  const isFi = loc === 'fi', isEs = loc === 'es', isDe = loc === 'de';
  const objForms = opts.objForms || objFormsOf(loc);
  const pron = opts.pron === undefined ? pronOf(loc) : opts.pron;
  const names = (pron && pron.names) || [];
  const qw = block.qwords || {};
  const places = Array.isArray(block.places) ? block.places : [];
  const times = Array.isArray(block.times) ? block.times : [];
  const longest = longestName(names);
  const placeTexts = places.map((p) => p.text).filter((t) => typeof t === 'string' && t);
  const shortestPlace = placeTexts.slice().sort((a, b) => glyphs(a) - glyphs(b))[0] || 'x'.repeat(7);
  const longestPlace = placeTexts.slice().sort((a, b) => glyphs(b) - glyphs(a))[0] || 'x'.repeat(17);
  const timeTexts = times.map((t) => t && t.text).filter((t) => typeof t === 'string' && t);
  const shortestTime = timeTexts.slice().sort((a, b) => glyphs(a) - glyphs(b))[0] || 'x'.repeat(12);
  const longestTime = timeTexts.slice().sort((a, b) => glyphs(b) - glyphs(a))[0] || 'x'.repeat(16);
  const numbers = Array.isArray(block.numbers) ? block.numbers : [2, 3, 4, 5];
  const longestN = numbers.slice().sort((a, b) => glyphs(numberWord(b, loc)) - glyphs(numberWord(a, loc)))[0] || 3;
  const shortestN = numbers.slice().sort((a, b) => glyphs(numberWord(a, loc)) - glyphs(numberWord(b, loc)))[0] || 2;
  const pre = block.qPrefix || '';
  const nbsp = !!block.nbsp;

  // rule 1 — qwords / starters / bins
  const qk = Object.keys(qw);
  if (qk.length !== 5 || QW_KEYS.some((k) => !qk.includes(k))) push(`rule 1: qwords keys ${qk.join(',')} != who,what,where,when,howmany`);
  const qv = QW_KEYS.map((k) => qw[k]).filter((v) => typeof v === 'string');
  if (new Set(qv.map(nfd)).size !== qv.length) push('rule 1: two qwords literals coincide (NFD, ci)');
  const forbidden = new Set([...names.map((n) => nfd(n.name)), ...placeTexts.map(nfd), ...timeTexts.map(nfd)]);
  const objLits = new Set();
  for (const f of Object.values(objForms)) for (const v of Object.values(f || {})) if (typeof v === 'string') objLits.add(nfd(v));
  for (const k of QW_KEYS) {
    const v = qw[k];
    if (typeof v !== 'string' || !v.trim()) { push(`rule 1: qwords.${k} missing`); continue; }
    if (glyphs(v) > 14) push(`rule 1: qwords.${k} "${v}" > 14 chars`);
    if (!/^\p{Lu}/u.test(v)) push(`rule 1: qwords.${k} "${v}" is not capitalised`);
    if (forbidden.has(nfd(v))) push(`rule 1: qwords.${k} "${v}" equals a name / place / time literal`);
    if (objLits.has(nfd(v))) push(`rule 1: qwords.${k} "${v}" equals an objForms literal`);
  }
  const st = Array.isArray(block.starters) ? block.starters : [];
  if (st.length !== 6) push(`rule 1: ${st.length} starters, want 6`);
  ['who', 'what', 'where', 'when'].forEach((k, i) => { if (st[i] !== qw[k]) push(`rule 1: starters[${i}] "${st[i]}" != qwords.${k} "${qw[k]}"`); });
  if (new Set(st.map(nfd)).size !== st.length) push('rule 1: a starter twice');
  if (st.some((s) => nfd(s) === nfd(qw.howmany))) push('rule 1: starters carry the howmany literal (howmany is never a starter)');
  if (st.slice(4).some((s) => !s || QW_KEYS.some((k) => nfd(qw[k]) === nfd(s)))) push('rule 1: starters 5-6 must be why / how (two literals outside qwords)');
  const bins = block.bins || {};
  for (const [k, v] of Object.entries(bins)) {
    if (!['who', 'what', 'where', 'when'].includes(k)) push(`rule 1: bins.${k} is not who|what|where|when`);
    if (typeof v !== 'string' || !v.endsWith('?')) push(`rule 1: bins.${k} "${v}" does not end with "?"`);
    if (isEs && !String(v).startsWith('¿')) push(`rule 1: es bins.${k} "${v}" does not open with ¿`);
    const alias = block.binAliases && block.binAliases[k];
    if (!alias && v !== pre + qw[k] + '?') push(`rule 1: bins.${k} "${v}" != "${pre}${qw[k]}?" (declare binAliases.${k} for a nominative head)`);
  }
  if (Object.keys(bins).length < 3) push('rule 1: bins needs >= 3 heads (who, what, where)');

  // rule 2 — frames
  const frames = Array.isArray(block.frames) ? block.frames : [];
  if (frames.length < 12) push(`rule 2: ${frames.length} frames < 12`);
  for (const k of KINDS) { const n = frames.filter((f) => f.kind === k).length; if (n < 3) push(`rule 2: ${n} ${k} frames < 3`); }
  const ids = new Set();
  const qLits = QW_KEYS.map((k) => qw[k]).filter(Boolean);
  const sentFrames = ((SENTENCES[loc] && SENTENCES[loc].frames) || []).map((f) => nfd(String(f.text).replace(/\{[a-z]+\}/g, ' ')).replace(/\s+/g, ' ').trim());
  const wantSlots = (f) => {
    if (f.kind === 'thing') return { one: ['thing', 'part', 'dat'], extra: [] };
    if (f.kind === 'place') return { one: ['place'], extra: [] };
    if (f.kind === 'time') return { one: ['time'], extra: [] };
    if (f.kind === 'count') return { one: ['pl', 'part'], extra: ['n'] };
    return null;
  };
  const pairs = [];
  for (const f of frames) {
    const L = `frame ${f.id}`;
    if (!f.id) { push('rule 2: a frame without id'); continue; }
    if (ids.has(f.id)) push(`rule 2: ${L} id twice`); ids.add(f.id);
    if (!KINDS.includes(f.kind)) { push(`rule 2: ${L} kind "${f.kind}"`); continue; }
    const t = f.text;
    if (typeof t !== 'string' || !t.startsWith('{name}')) { push(`rule 2: ${L} text does not start with {name} ("${t}")`); continue; }
    const slots = slotsIn(t.replace(/\{name:ade\}/g, ''));
    if (slots.filter((s) => s === 'name').length !== 1) push(`rule 2: ${L} needs exactly one {name}`);
    const w = wantSlots(f);
    const comp = slots.filter((s) => s !== 'name');
    const oneHit = comp.filter((s) => w.one.includes(s));
    const extraOk = w.extra.every((s) => comp.includes(s));
    if (oneHit.length !== 1 || !extraOk || comp.length !== 1 + w.extra.length) push(`rule 2: ${L} (${f.kind}) slots {${comp.join('} {')}} — want one of {${w.one.join('|')}}${w.extra.length ? ' + {' + w.extra.join('} {') + '}' : ''}`);
    if (t.includes('___')) push(`rule 2: ${L} carries ___`);
    if (!t.endsWith('.')) push(`rule 2: ${L} does not end with "."`);
    for (const lit of qLits) if (hasWord(t, lit)) push(`rule 2: ${L} carries the question word "${lit}" as a token`);
    const filled = probeFill(t.replace(/\{(thing|part|dat|pl)\}/g, 'x'.repeat(12)), { name: longest, place: longestPlace, time: longestTime, n: longestN, loc });
    if (glyphs(filled) > 40) push(`rule 2: ${L} filled "${filled}" is ${glyphs(filled)} > 40`);
    if (f.signed !== true) push(`rule 2: ${L} is not signed:true`);
    const body = nfd(t.replace(/\{[a-z:]+\}/g, ' ')).replace(/\s+/g, ' ').trim();
    if (sentFrames.includes(body)) push(`rule 5: ${L} text equals a SENTENCES frame`);
    if (/\{(noun|color)\}/.test(t)) push(`rule 5: ${L} text carries a b2 slot {noun} / {color}`);
    // rule 3 — q
    const q = f.q || {};
    const ask = KIND_ASK[f.kind];
    const qkeys = Object.keys(q).sort().join(',');
    if (qkeys !== ['who', ask].sort().join(',')) push(`rule 3: ${L} q keys ${qkeys} != who,${ask}`);
    for (const [a, lit] of Object.entries(q)) {
      const LL = `${L} q.${a}`;
      if (typeof lit !== 'string') { push(`rule 3: ${LL} is not a string`); continue; }
      const head = pre + (qw[a] || '');
      if (!qw[a] || !lit.startsWith(head)) push(`rule 3: ${LL} "${lit}" does not open with "${head}" (case-sensitive)`);
      if (nbsp ? !lit.endsWith(' ?') : !lit.endsWith('?')) push(`rule 3: ${LL} "${lit}" does not end with ${nbsp ? 'NBSP + ' : ''}"?"`);
      if (nbsp && / \?$/.test(lit)) push(`rule 3: ${LL} ends with a plain space before "?" (nbsp:true)`);
      const qs = slotsIn(lit.replace(/\{name:ade\}/g, '{name}'));
      const textSlots = slotsIn(t.replace(/\{name:ade\}/g, '{name}'));
      const asked = a === 'who' ? ['name'] : (f.kind === 'count' ? ['n'] : comp);
      const want = textSlots.filter((s) => !asked.includes(s)).sort().join(',');
      if (qs.slice().sort().join(',') !== want) push(`rule 3: ${LL} "${lit}" slots {${qs.join('} {')}} != {${want.split(',').join('} {')}} (${asked.some((s) => qs.includes(s)) ? 'asked slot printed' : 'a non-asked slot missing'})`);
      const bodyQ = nfd(lit.replace(/\{[a-z:]+\}/g, ' ')).replace(/\s+/g, ' ').trim();
      if (sentFrames.includes(bodyQ)) push(`rule 5: ${LL} equals a SENTENCES frame`);
      if (/\{(noun|color)\}/.test(lit)) push(`rule 5: ${LL} carries a b2 slot`);
      pairs.push({ frame: f, ask: a, lit });
    }
    if (isDe && f.kind === 'thing') {
      const s = comp[0];
      if (s === 'thing' && f.objCase !== 'acc') push(`rule 4: de ${L} names {thing} and must be signed objCase:'acc' (got "${f.objCase}")`);
      if (s === 'dat' && f.objCase !== 'dat') push(`rule 4: de ${L} names {dat} and must be signed objCase:'dat'`);
      if (f.objCase === 'dat' && s === 'thing') push(`rule 4: de ${L} is signed dat but names {thing} (the accusative phrase) — refuse`);
    }
    if (isFi) {
      const whatNom = block.whatForm === 'nominative';
      if (f.kind === 'thing' && !whatNom && comp[0] !== 'part') push(`rule 13: fi ${L} (thing) names {${comp[0]}}; fi thing frames name {part} only (or declare whatForm:'nominative')`);
      if (f.kind === 'count' && !comp.includes('part')) push(`rule 13: fi ${L} (count) must name {part}`);
    }
  }
  // rule 3 — the face caps over the (frame, ask) pairs
  const f4 = pairs.filter((p) => glyphs(probeFill(p.lit, { name: longest, place: shortestPlace, time: shortestTime, n: shortestN, loc })) <= 31);
  const f4kinds = new Set(f4.map((p) => (p.ask === 'who' ? 'who' : p.ask)));
  if (f4.length < 8 || f4kinds.size < 5) push(`rule 3: ${f4.length} F4-eligible pairs (<= 31 chars) over ${f4kinds.size} kinds — want >= 8 over all five`);
  let f2 = [];
  try { f2 = pairs.filter((p) => glyphs(TYPE.gapOf(block, probeFill(p.lit, { name: longest, place: shortestPlace, time: shortestTime, n: shortestN, loc }), p.ask)) <= 30); } catch (e) { push('rule 3: gapOf: ' + e.message); }
  const f2kinds = new Set(f2.map((p) => p.ask));
  if (f2.length < 6 || f2kinds.size < 5) push(`rule 3: ${f2.length} F2-eligible pairs (rest <= 30) over ${f2kinds.size} kinds — want >= 6 over all five`);
  for (const p of pairs) { const g = glyphs(probeFill(p.lit, { name: longest, place: longestPlace, time: longestTime, n: longestN, loc })); if (g > 44) push(`rule 3: frame ${p.frame.id} q.${p.ask} filled is ${g} > 44 (F1)`); }

  // rule 6 — places
  const enKeys = en.places.map((p) => p.key);
  const keys = places.map((p) => p.key);
  if (keys.slice().sort().join(',') !== enKeys.slice().sort().join(',')) push(`rule 6: places keys [${keys.join(',')}] != the EN key list (an overlay may null a text, never add or drop a key)`);
  const nonNull = places.filter((p) => typeof p.text === 'string' && p.text);
  if (nonNull.length < 6) push(`rule 6: ${nonNull.length} non-null places < 6`);
  for (const p of places) {
    if (p.text === null) continue;
    if (typeof p.text !== 'string' || !p.text.trim()) { push(`rule 6: place ${p.key} text empty`); continue; }
    if (/^\p{Lu}/u.test(p.text)) push(`rule 6: place ${p.key} "${p.text}" starts with a capital`);
    if (!p.pic || !p.pic.theme || !p.pic.noun) { push(`rule 6: place ${p.key} has no pic`); continue; }
    if (BW_MARKER.test(p.pic.theme)) push(`rule 6: place ${p.key} pins a B&W theme "${p.pic.theme}"`);
    if (!candidates(p.pic.noun, loc).some((c) => c.theme === p.pic.theme && c.noun === p.pic.noun)) push(`rule 6: place ${p.key} ${p.pic.theme}/${p.pic.noun} is not a colour-index candidate in ${loc}`);
    if (!fileExists(p.pic.theme, p.pic.noun)) push(`rule 6: place ${p.key} picture ${p.pic.theme}/${p.pic.noun} does not exist`);
    if (p.picOpened !== true) push(`rule 6: place ${p.key} picOpened is not true`);
    if (isFi && p.static !== true) push(`rule 13: fi place ${p.key} is not static:true`);
  }
  const guardOk = nonNull.filter((p) => Math.round(glyphs(p.text) * PX_PER_GLYPH_18) <= TILE_GUARD).length;
  if (guardOk < 6) push(`rule 6: ${guardOk} place literals pass the F3 tile guard (<= ${TILE_GUARD} at 18) < 6`);
  for (const g of block.twins || en.twins || []) for (const k of g) if (!keys.includes(k)) push(`rule 6: twin member "${k}" is not a place key`);

  // rule 7 — times
  if (times.length < 6) push(`rule 7: ${times.length} times < 6`);
  if (new Set(times.map((t) => t && t.h)).size !== times.length) push('rule 7: a clock hour twice');
  if (new Set(times.map((t) => nfd(t && t.text))).size !== times.length) push('rule 7: a time literal twice');
  for (const t of times) if (!t || !Number.isInteger(t.h) || t.h < 1 || t.h > 12 || typeof t.text !== 'string' || !t.text.trim()) push(`rule 7: time ${JSON.stringify(t)} malformed (h 1..12, text)`);

  // rule 8 — genderFilter / qPrefix
  const gf = block.genderFilter || {};
  if (gf.count !== undefined && gf.count !== 'm') push(`rule 8: genderFilter.count "${gf.count}" (undefined | 'm')`);
  if (['es', 'pt', 'it'].includes(loc) && gf.count !== 'm') push(`rule 8: ${loc} must declare genderFilter.count:'m'`);
  if (isEs ? pre !== '¿' : pre !== '') push(`rule 8: ${loc} qPrefix "${pre}" (es '¿', else '')`);

  // rule 9 — strings
  const S = block.strings || {};
  let tax = null;
  try { tax = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8')); } catch (e) { /* reported under rule 14 */ }
  const neighbourNames = tax ? NEIGHBOURS.map((k) => tax.axes['exercise-type'][k] && tax.axes['exercise-type'][k].name && tax.axes['exercise-type'][k].name[loc]).filter(Boolean) : [];
  const titles = [];
  for (const f of FACES) {
    const s = S[f];
    if (!s || typeof s.title !== 'string' || typeof s.instruction !== 'string') { push(`rule 9: strings.${f} missing title / instruction`); continue; }
    titles.push(fold(s.title));
    if (glyphs(s.title) > 70) push(`rule 9: ${f} title ${glyphs(s.title)} > 70`);
    if (WORKSHEET_WORD.test(s.title)) push(`rule 9: ${f} title carries the worksheet word`);
    if (glyphs(s.instruction) > 120) push(`rule 9: ${f} instruction ${glyphs(s.instruction)} > 120`);
    for (const nn of neighbourNames) if (fold(s.title).includes(fold(nn))) push(`rule 9: ${f} title "${s.title}" contains the neighbour family name "${nn}"`);
    for (const v of [s.title, s.instruction]) { if (ANSWERS_WORD.test(v)) push(`rule 9: ${f} string promises answers ("${v}")`); const c = freeClaim.hit(v); if (c) push(`rule 9: ${f} string claims free ("${c}")`); }
  }
  if (new Set(titles).size !== titles.length) push('rule 9: two face titles coincide');
  if (S.base && HEADS[loc] && S.base.title !== HEADS[loc]) push(`rule 9: base title "${S.base.title}" != the measured head "${HEADS[loc]}"`);
  if (S.write && MEASURED_F4[loc] && S.write.title !== MEASURED_F4[loc]) push(`rule 9: F4 title "${S.write.title}" != the measured write-a-question head "${MEASURED_F4[loc]}"`);
  const bw = S.fill && S.fill.bankWord, bx = S.fill && S.fill.boxWord, pw = S.ask && S.ask.pictureWord;
  if (!bw || !bx) push('rule 9: strings.fill must declare bankWord + boxWord');
  if (!pw) push('rule 9: strings.ask must declare pictureWord');
  for (const f of FACES) {
    const ins = S[f] && S[f].instruction;
    if (typeof ins !== 'string') continue;
    if (f === 'fill') { if (bw && !hasWord(ins, bw)) push('rule 9: the fill instruction lacks the bank word'); if (bx && !hasWord(ins, bx)) push('rule 9: the fill instruction lacks the box word'); }
    else { if (bw && hasWord(ins, bw)) push(`rule 9: the ${f} instruction carries the bank word "${bw}" (fill only)`); if (bx && hasWord(ins, bx)) push(`rule 9: the ${f} instruction carries the box word "${bx}" (fill only)`); }
    if (f === 'ask') { if (pw && !hasWord(ins, pw)) push('rule 9: the ask instruction lacks the picture word'); }
    else if (pw && hasWord(ins, pw)) push(`rule 9: the ${f} instruction carries the picture word "${pw}" (ask only)`);
  }

  // rule 10 — sortThingForm + the sv / da / no definite clash
  if (!['bare', 'unique'].includes(block.sortThingForm)) push(`rule 10: sortThingForm "${block.sortThingForm}"`);
  if (!Array.isArray(block.excludeThings)) push('rule 10: excludeThings must be an array');
  if (block.chipWidths != null) { if (typeof block.chipWidths !== 'object') push('rule 12: chipWidths must be an object'); else for (const [k, v] of Object.entries(block.chipWidths)) { if (!qv.includes(k)) push(`rule 12: chipWidths."${k}" is not a qwords literal`); if (typeof v !== 'number' || v < 40 || v > 260) push(`rule 12: chipWidths."${k}" = ${v} (40..260 px)`); } }
  if (['sv', 'da', 'no'].includes(loc) && Object.keys(objForms).length) {
    const clash = TYPE.clashKeys(loc, objForms);
    const pool = opts.pool || TYPE.thingPool(loc, block, objForms);
    for (const th of pool) if (clash.has(th.key)) push(`rule 10: ${loc} pool carries the definite-clash key "${th.key}" ("${th.forms.unique}" is another noun's form)`);
  }

  // rule 11 — nameForms
  if (block.nameForms && !(isFi && block.possession === 'adessive')) push('rule 11: nameForms is present without fi possession:\'adessive\'');
  if (isFi && block.possession === 'adessive') {
    const ade = (block.nameForms && block.nameForms.ade) || {};
    for (const n of names) if (!ade[n.name]) push(`rule 11: nameForms.ade lacks "${n.name}"`);
    for (const f of frames) if (f.kind === 'count' && !String(f.text).includes('{name:ade}')) push(`rule 11: fi count frame ${f.id} must name {name:ade} under adessive possession`);
  }

  // rule 12 — the EN shape + the pronouns bank + faces + the d2 config
  if (loc !== 'en') {
    if (QW_KEYS.some((k) => !(k in qw))) push('rule 12: the overlay lacks an EN qwords key');
    const shape = (fr) => fr.map((f) => `${f.id}:${f.kind}:${slotsIn(String(f.text).replace(/\{name:ade\}/g, '{name}')).map((s) => (['thing', 'part', 'dat', 'pl'].includes(s) ? 'T' : s)).join('+')}`).sort().join('|');
    if (shape(frames) !== shape(en.frames)) push('rule 12: the overlay frames differ from the EN ids / kinds / slot shapes');
  }
  if (!pron) push(`rule 12: the pronouns bank does not load for ${loc} (build G1-352 first)`);
  else {
    if (names.length < 12) push(`rule 12: pronouns names ${names.length} < 12`);
    const nf = names.filter((n) => n.gender === 'f').length, nm = names.filter((n) => n.gender === 'm').length;
    if (nf < 6 || nm < 6 || nf + nm !== names.length) push(`rule 12: pronouns names ${nf} f / ${nm} m (want >= 6 each, every one tagged)`);
    if (!Array.isArray(pron.people) || pron.people.length !== 32) push(`rule 12: pronouns people ${pron.people ? pron.people.length : 0} != 32`);
  }
  const faces = block.faces || {};
  if (Object.keys(faces).sort().join(',') !== FACES.slice().sort().join(',')) push(`rule 12: faces keys ${Object.keys(faces).join(',')} != the six modes`);
  for (const [f, v] of Object.entries(faces)) {
    const ks = (v && v.kinds) || [];
    for (const k of ks) if (!QW_KEYS.includes(k) && !(f === 'ask' && ['why', 'how'].includes(k))) push(`rule 12: faces.${f}.kinds carries "${k}"`);
    if (new Set(ks).size !== ks.length) push(`rule 12: faces.${f}.kinds repeats a kind`);
  }
  if (faces.base && faces.base.kinds.join(',') !== TYPE.difficulty[2].chips.join(',')) push(`rule 12: faces.base.kinds ${faces.base.kinds.join(',')} != the spec's d2 chips ${TYPE.difficulty[2].chips.join(',')}`);
  if (loc === 'en' && S.base && (S.base.title !== TYPE.i18n.en.title || S.base.instruction !== TYPE.i18n.en.instruction)) push('rule 12: EN strings.base != the spec\'s i18n.en');
  try { TYPE.resolveBase(TYPE.difficulty[2], block); TYPE.resolveBase(TYPE.difficulty[3], block); } catch (e) { push('rule 12: ' + e.message); }

  // rule 13 — fi
  if (isFi && block.whatForm !== 'nominative' && qw.what !== 'Mitä') push(`rule 13: fi qwords.what "${qw.what}" != "Mitä" (declare whatForm:'nominative' for a nominative policy)`);

  // rule 14 — the taxonomy slug
  if (tax) {
    const ax = tax.axes['exercise-type']['question-words'];
    const slug = ax && ax.slug && ax.slug[loc];
    if (!slug) push(`rule 14: axes['exercise-type']['question-words'].slug.${loc} not registered`);
    else {
      if (slug !== TABLE_B[loc]) push(`rule 14: ${loc} slug "${slug}" != table B "${TABLE_B[loc]}"`);
      for (const [axis, entries] of Object.entries(tax.axes)) for (const [k, e] of Object.entries(entries)) {
        if (axis === 'exercise-type' && k === 'question-words') continue;
        if (e && e.slug && e.slug[loc] === slug) push(`rule 14: ${loc} slug "${slug}" collides with axes.${axis}.${k}`);
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ 2. render helpers ------------------------------------------------------------------ */

async function renderWith(page, type, { difficulty = 2, baseName, strings, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const r = (el) => el.getBoundingClientRect();
    const body = document.querySelector('.ws-body');
    const foot = document.querySelector('.ws-foot');
    const title = document.querySelector('.ws-title');
    const root = document.querySelector('[data-lcs-qw]');
    const rows = [...document.querySelectorAll('[data-lcs-row]')].map((row) => {
      const p = row.querySelector('[data-lcs-sentence]');
      const mark = p && p.querySelector('[data-lcs-mark]');
      const img = row.querySelector('img[data-lcs-pic]');
      const chips = [...row.querySelectorAll('[data-lcs-chip]')];
      const strip = row.querySelector('[data-lcs-chips]');
      const cs = getComputedStyle(row);
      const laneLeft = r(row).left + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth);
      return {
        frame: row.dataset.lcsFrame, kind: row.dataset.lcsKind, ask: row.dataset.lcsAsk, name: row.dataset.lcsName, slots: row.dataset.lcsSlots,
        text: p ? p.textContent.replace(/\s+/g, ' ').trim() : '', span: mark ? mark.textContent.trim() : '', pH: p ? r(p).height : 0, pW: p ? r(p).width : 0, pFont: p ? parseFloat(getComputedStyle(p).fontSize) : 0,
        pic: img ? img.dataset.lcsPic : null, picKind: img ? img.dataset.lcsPickind : null, depicted: img ? img.dataset.lcsDepicted : null, src: img ? img.src : null, picW: img ? r(img).width : 0,
        picDx: img ? r(img).left - laneLeft : 0, pDx: p ? r(p).left - laneLeft : 0,
        chips: chips.map((c) => ({ kind: c.dataset.lcsChip, idx: +c.dataset.lcsIdx, label: c.dataset.lcsLabel, w: r(c).width, h: r(c).height, top: r(c).top, correct: !!c.dataset.lcsCorrect })),
        stripW: strip ? r(strip).width : 0, stripRight: strip && chips.length ? Math.max(...chips.map((c) => r(c).right)) - laneLeft : 0,
        rowH: r(row).height, overflow: row.scrollHeight - row.clientHeight,
        content: (() => { const cs2 = [...row.children].map((c) => r(c)).filter((b) => b.width && b.height); return cs2.length ? Math.max(...cs2.map((b) => b.bottom)) - Math.min(...cs2.map((b) => b.top)) : 0; })(),
      };
    });
    let lowest = 0;
    document.querySelectorAll('.ws-body *').forEach((el) => { const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
    // the INTRINSIC stack: the grid with every row at its minimum (rows stretch under 1fr; measured, then restored)
    let intrinsic = 0, rowMin = 0;
    if (root) {
      const saved = [root.style.flex, root.style.gridTemplateRows];
      const n = root.children.length;
      root.style.flex = '0 0 auto'; root.style.gridTemplateRows = 'repeat(' + n + ', auto)';
      intrinsic = r(root).height; rowMin = n ? Math.max(...[...root.children].map((c) => r(c).height)) : 0;
      root.style.flex = saved[0]; root.style.gridTemplateRows = saved[1];
    }
    return { body: { h: r(body).height, top: r(body).top }, foot: r(foot).top, titleH: r(title).height, lines: Math.round(r(title).height / (30 * 1.1)),
      root: root ? { kinds: root.dataset.lcsKinds, rows: +root.dataset.lcsRows, botmax: root.dataset.lcsBotmax, h: r(root).height, stack: root.lastElementChild ? r(root.lastElementChild).bottom - r(root.firstElementChild).top : 0, intrinsic, rowMin } : null,
      rows, lowest };
  });
  return { ...out, verify: out.qa.verify, lints: out.qa.lints, m };
}

/** The node cross-check over the rendered stamps: sentence / mark / chip index / portrait tags re-derived from the banks. */
function crossCheck(rows, kinds, bank, pron, objForms, loc, cfg) {
  const out = [];
  const byName = new Map(pron.names.map((n) => [n.name, n]));
  const byPic = new Map(pron.people.map((p) => [`${p.pic.theme}/${p.pic.noun}`, p]));
  const frames = new Map(bank.frames.map((f) => [f.id, f]));
  const srcs = new Set(), names = new Set(), fids = new Set();
  rows.forEach((row, i) => {
    const L = `row ${i + 1}`;
    const f = frames.get(row.frame);
    if (!f) { out.push(`${L}: frame "${row.frame}" is not in the bank`); return; }
    if (fids.has(row.frame)) out.push(`${L}: frame twice`); fids.add(row.frame);
    const name = byName.get(row.name);
    if (!name) { out.push(`${L}: name "${row.name}" is not in the pronouns bank`); return; }
    if (names.has(row.name)) out.push(`${L}: name twice`); names.add(row.name);
    let slots = {};
    try { slots = JSON.parse(row.slots || '{}'); } catch (e) { out.push(`${L}: slots json`); return; }
    const ctx = { name, loc };
    if (f.kind === 'thing' || f.kind === 'count') { const forms = objForms[slots.key]; if (!forms) { out.push(`${L}: thing "${slots.key}" has no objForms`); return; } ctx.thing = { key: slots.key, forms }; }
    if (f.kind === 'place') { const p = bank.places.find((x) => x.key === slots.key); if (!p) { out.push(`${L}: place "${slots.key}"`); return; } ctx.place = p; }
    if (f.kind === 'time') { const t = bank.times.find((x) => String(x.h) === String(slots.key)); if (!t) { out.push(`${L}: time h "${slots.key}"`); return; } ctx.time = t; }
    if (f.kind === 'count') { const n = (bank.numbers || [2, 3, 4, 5]).find((x) => numberWord(x, loc) === slots.n); if (!Number.isInteger(n)) { out.push(`${L}: number word "${slots.n}"`); return; } ctx.n = n; }
    let text, span;
    try { text = TYPE.fillFrame(f, ctx); span = TYPE.markOf(f, row.ask, ctx); } catch (e) { out.push(`${L}: ${e.message}`); return; }
    if (text !== row.text) out.push(`${L}: rendered "${row.text}" != fillFrame "${text}"`);
    if (span !== row.span) out.push(`${L}: mark "${row.span}" != markOf "${span}"`);
    if (row.ask !== 'who' && row.ask !== KIND_ASK[f.kind]) out.push(`${L}: ask ${row.ask} on a ${f.kind} frame`);
    const want = kinds.indexOf(row.ask);
    const hit = row.chips.find((c) => c.kind === row.ask);
    if (!hit || hit.idx !== want) out.push(`${L}: the ${row.ask} chip sits at ${hit ? hit.idx : 'none'}, kinds.indexOf = ${want}`);
    if (row.chips.map((c) => c.label).join('|') !== kinds.map((k) => bank.qwords[k]).join('|')) out.push(`${L}: chip labels ${row.chips.map((c) => c.label).join('|')} != the bank's`);
    // the picture
    if (row.picKind === 'person') {
      const p = byPic.get(row.pic);
      if (!p) out.push(`${L}: portrait "${row.pic}" is not in the pronouns bank`);
      else {
        if (p.depicted !== row.depicted) out.push(`${L}: portrait "${row.pic}" stamped ${row.depicted}, the bank says ${p.depicted}`);
        if (p.depicted !== name.gender) out.push(`${L}: name "${row.name}" (${name.gender}) over a portrait "${row.pic}" depicted ${p.depicted} — tag mismatch`);
        if (decodeURIComponent(row.src) !== decodeURIComponent(fileUri(p.pic.theme, p.pic.noun))) out.push(`${L}: portrait src is not the bank's file`);
        if (row.picW < Math.max(FLOOR, p.minPx || 0) - 0.6) out.push(`${L}: portrait ${row.picW.toFixed(1)} px below ${Math.max(FLOOR, p.minPx || 0)}`);
      }
      if (cfg.picOf === 'subject' || row.ask === 'who') { /* fine */ } else out.push(`${L}: a portrait on a ${row.ask} row under picOf referent`);
    } else if (row.picKind === 'thing') {
      const pin = TYPE.pinThing(slots.key, loc, bank);
      if (!pin || `${pin.theme}/${pin.noun}` !== row.pic) out.push(`${L}: thing picture "${row.pic}" != pinThing ${pin && pin.theme + '/' + pin.noun}`);
      if (cfg.picOf !== 'referent' || row.ask !== 'what') out.push(`${L}: a thing picture on a ${row.ask} row`);
    } else if (row.picKind === 'place') {
      const p = bank.places.find((x) => x.key === slots.key);
      if (!p || `${p.pic.theme}/${p.pic.noun}` !== row.pic) out.push(`${L}: place picture "${row.pic}" != the bank's`);
      if (cfg.picOf !== 'referent' || row.ask !== 'where') out.push(`${L}: a place picture on a ${row.ask} row`);
    } else out.push(`${L}: picture kind "${row.picKind}"`);
    if (srcs.has(row.src)) out.push(`${L}: src twice`); srcs.add(row.src);
    row.chips.forEach((c) => { if (c.h < FLOOR - 0.6) out.push(`${L}: chip ${c.h.toFixed(1)} < ${FLOOR}`); });
    if (row.pFont < 16) out.push(`${L}: sentence font ${row.pFont} < 16`);
  });
  const bot = TYPE.pictureBot(rows.map((r) => ({ picKind: r.picKind, ask: r.ask })));
  if (bot > cfg.botMax + 1e-9) out.push(`pictureBot ${bot.toFixed(2)} > ${cfg.botMax}`);
  return out;
}

function assertRender(name, r, { rows }) {
  ok(r.verify.length === 0, `${name}: verify ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.rows.length === rows, `${name}: ${r.m.rows.length} rows, want ${rows}`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: lowest ink ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
  ok(r.m.rows.every((x) => x.overflow <= 0), `${name}: lane overflow ${JSON.stringify(r.m.rows.map((x) => x.overflow))}`);
  ok(r.m.rows.every((x) => x.chips.length && new Set(x.chips.map((c) => Math.round(c.top))).size === 1), `${name}: a chip strip wraps`);
  ok(r.m.rows.every((x) => x.stripRight <= 108 + 531 + 0.6), `${name}: strip right ${r.m.rows.map((x) => x.stripRight.toFixed(0)).join('/')} past the 531 column`);
  ok(r.m.rows.every((x) => x.pH <= 26.6), `${name}: sentence heights ${r.m.rows.map((x) => x.pH.toFixed(1)).join('/')} (one line <= 26)`);
  ok(r.m.rows.every((x) => x.picW >= FLOOR - 0.6), `${name}: a picture below ${FLOOR}`);
}

/** A type whose bodyHtml is post-processed (render poisons) */
function mutated(type, fn) { return { ...type, build: async (a, c) => { const b = await type.build(a, c); const h = fn(b.bodyHtml); if (h === b.bodyHtml) throw new Error('mutation matched nothing'); return { ...b, bodyHtml: h }; } }; }
/** A type over injected banks / config (poisons that bypass the validator) */
function withDeps(type, { bank, pron, objForms, d }) {
  return { ...type, build: (a, c) => { const real = type._deps(a.locale || 'en'); return type._buildWith(bank || real.bank, d || type.difficulty[a.difficulty], { locale: a.locale, pron: pron || real.pron, objForms: objForms || real.objForms }, c); } };
}

/**
 * Long-chrome fixtures (measured in this gate; the lines are printed). The 722 chrome = a 3-line title + a 3-line
 * instruction (the README floor; measured 710); the 677 chrome = a 4-line title (the fi four-line stack the base FITS).
 */
const CHROME = {
  three: { title: 'Question Words: Read the Sentence, Find the Highlighted Words, Circle', instruction: 'Read each sentence carefully and look at the words that are highlighted in orange. Then circle the one question word underneath that asks for exactly those words.' },
  four: { title: 'Kysymyssanaharjoituksia: ympyröi oikea kysymyssanavaihtoehto korostetuille sanoille', instruction: 'Read each sentence carefully and look at the words that are highlighted in orange. Then circle the one question word underneath that asks for exactly those words.' },
};

/** A synthetic locale block for the validator poisons + controls (the real ones are the panels'). */
function synthetic(loc, en) {
  const b = clone(en);
  const Q = {
    de: { who: 'Wer', what: 'Was', where: 'Wo', when: 'Wann', howmany: 'Wie viele', why: 'Warum', how: 'Wie', head: HEADS.de, f4: 'Fragesätze schreiben' },
    es: { who: 'Quién', what: 'Qué', where: 'Dónde', when: 'Cuándo', howmany: 'Cuántos', why: 'Por qué', how: 'Cómo', head: HEADS.es, f4: 'Escribe la pregunta' },
    pt: { who: 'Quem', what: 'O que', where: 'Onde', when: 'Quando', howmany: 'Quantos', why: 'Por que', how: 'Como', head: HEADS.pt, f4: 'Escreva a pergunta' },
    fr: { who: 'Qui', what: 'Que', where: 'Où', when: 'Quand', howmany: 'Combien', why: 'Pourquoi', how: 'Comment', head: HEADS.fr, f4: 'Écris la question' },
    sv: { who: 'Vem', what: 'Vad', where: 'Var', when: 'När', howmany: 'Hur många', why: 'Varför', how: 'Hur', head: HEADS.sv, f4: MEASURED_F4.sv },
    fi: { who: 'Kuka', what: 'Mitä', where: 'Missä', when: 'Milloin', howmany: 'Kuinka monta', why: 'Miksi', how: 'Miten', head: HEADS.fi, f4: MEASURED_F4.fi },
  }[loc];
  if (!Q) throw new Error('synthetic: ' + loc);
  const pre = loc === 'es' ? '¿' : '';
  b.qwords = { who: Q.who, what: Q.what, where: Q.where, when: Q.when, howmany: Q.howmany };
  b.starters = [Q.who, Q.what, Q.where, Q.when, Q.why, Q.how];
  b.bins = { who: pre + Q.who + '?', what: pre + Q.what + '?', where: pre + Q.where + '?' };
  b.qPrefix = pre;
  b.genderFilter = ['es', 'pt', 'it'].includes(loc) ? { count: 'm' } : {};
  b.chipWidths = Object.fromEntries(['who', 'what', 'where', 'when', 'howmany'].map((k) => [Q[k], MEASURED_CHIP_W[Q[k]]]).filter(([, v]) => v));
  if (loc === 'fr') b.nbsp = true;
  const enQ = en.qwords;
  b.frames = en.frames.map((f) => {
    const nf = clone(f);
    // swap the EN question-word head for the locale's; keep the English body (the validator checks shape, not language)
    for (const a of Object.keys(nf.q)) nf.q[a] = pre + Q[a] + nf.q[a].slice(enQ[a].length) + (loc === 'fr' ? '' : '');
    if (loc === 'fr') for (const a of Object.keys(nf.q)) nf.q[a] = nf.q[a].replace(/\?$/, ' ?');
    if (loc === 'de' && nf.kind === 'thing') nf.objCase = 'acc';
    if (loc === 'fi') { nf.text = nf.text.replace('{thing}', '{part}').replace('{pl}', '{part}'); for (const a of Object.keys(nf.q)) nf.q[a] = nf.q[a].replace('{thing}', '{part}').replace('{pl}', '{part}'); if (nf.kind === 'count') nf.q.howmany = 'Kuinka monta {part} {name} näkee?'; }
    return nf;
  });
  if (loc === 'fi') b.places = b.places.map((p) => ({ ...p, static: true }));
  b.strings.base.title = Q.head;
  b.strings.write.title = Q.f4;
  return b;
}

/* ------------------------------------------------------------------ main ------------------------------------------------------------------ */

async function main() {
  const all = bankModule('question-words');
  const en = all.en;
  const pronEn = loadBank('pronouns', 'en');
  const objEn = objFormsOf('en');
  const t0 = Date.now();
  console.log(`verify-b4-question-words ${QUICK ? '(--quick) ' : ''}— locales on disk: ${Object.keys(all).join(' ')}`);

  // ---- 1. the bank(s)
  for (const loc of Object.keys(all)) {
    const errs = validateBank(all[loc], loc);
    ok(errs.length === 0, `bank ${loc}: ${errs.join(' | ')}`);
    const pool = TYPE.thingPool(loc, all[loc], objFormsOf(loc));
    console.log(`bank ${loc}: ${errs.length ? errs.length + ' fails' : 'clean'} (frames ${all[loc].frames.length}, places ${all[loc].places.filter((p) => p.text).length}, times ${all[loc].times.length}, thing pool ${pool.length})`);
  }
  // the synthetic blocks are themselves clean controls for the non-EN rules (rule 14 is a registrar step; rule 12's pronouns bank exists for en only)
  const ctrlFilter = (e) => !/^rule 14: axes|^rule 12: the pronouns bank does not load/.test(e);
  for (const loc of ['de', 'es', 'fr', 'sv', 'fi']) {
    const errs = validateBank(synthetic(loc, en), loc, { pron: pronEn }).filter(ctrlFilter);
    ok(errs.length === 0, `synthetic ${loc} control: ${errs.join(' | ')}`);
  }
  // the measured pools (design §1): en 133; sv 113 after the cow exclusion
  { const svForms = objFormsOf('sv'); if (Object.keys(svForms).length) { const clash = TYPE.clashKeys('sv', svForms); ok(clash.has('cow'), `sv clash keys ${[...clash].join(',')} (design: cow → "kon" === cone)`); const svPool = TYPE.thingPool('sv', synthetic('sv', en), svForms); ok(!svPool.some((t) => t.key === 'cow'), 'sv pool excludes cow'); console.log(`sv thing pool ${svPool.length} (clash ${[...clash].join(',') || 'none'})`); } }
  ok(TYPE.thingPool('en', en, objEn).length === 133, `en thing pool ${TYPE.thingPool('en', en, objEn).length} (design 133)`);
  ok(TYPE.difficulty[2].botMax === 0.35 && TYPE.difficulty[2].kinds.who / TYPE.difficulty[2].rows <= 0.35, 'd2: botMax 0.35 and who rows / rows <= 0.35');
  ok(TYPE.difficulty[2].picOf === 'subject' && TYPE.difficulty[2].picPx === 56, 'd2: the subject portrait at 56 (critic #1)');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    const titleLines = async (title) => { const r = await renderWith(page, TYPE, { baseName: 'G1-353-gate-titlelines', strings: { title, instruction: 'x' } }); return r.m.lines; };
    const lines3 = await titleLines(CHROME.three.title), lines4 = await titleLines(CHROME.four.title);
    ok(lines3 === 3, `the 3+3 chrome fixture title wraps to ${lines3} lines, want 3`);
    ok(lines4 === 4, `the 677 chrome fixture title wraps to ${lines4} lines, want 4`);
    console.log(`title lines: 722-fixture ${lines3} · 677-fixture ${lines4}`);

    // ---- 2. renders
    const cfg2 = TYPE.resolveBase(TYPE.difficulty[2], en);
    for (const d of [1, 2, 3]) {
      const cfg = TYPE.resolveBase(TYPE.difficulty[d], en);
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-353-gate-d${d}-en` });
      assertRender(`d${d} en`, r, { rows: cfg.rows });
      const cc = crossCheck(r.m.rows, cfg.chips, en, pronEn, objEn, 'en', cfg);
      ok(cc.length === 0, `d${d} en node cross-check: ${cc.join(' | ')}`);
      const bot = TYPE.pictureBot(r.m.rows.map((x) => ({ picKind: x.picKind, ask: x.ask })));
      if (d >= 2) ok(bot <= 0.35, `d${d} pictureBot ${bot.toFixed(2)} (<= 0.35)`);
      ok(r.m.rows.every((x) => Math.abs(x.picDx - 40) <= 0.6 && Math.abs(x.pDx - (40 + cfg.picPx + 12)) <= 0.6), `d${d}: the row geometry (pic at +40, sentence at +${40 + cfg.picPx + 12}) — got ${r.m.rows.map((x) => x.picDx.toFixed(0) + '/' + x.pDx.toFixed(0)).join(' ')}`);
      const strips = r.m.rows.map((x) => x.stripRight - 108);
      if (cfg.chipPx === 20 && cfg.chipPad === 12) r.m.rows[0].chips.forEach((c) => { const t = en.chipWidths && en.chipWidths[c.label]; if (t != null) ok(Math.abs(c.w - t) <= 3, `d${d}: chip "${c.label}" measures ${c.w.toFixed(1)}, the bank's chipWidths says ${t}`); });
      ok(Math.max(...strips) <= 531, `d${d}: the strip ${Math.max(...strips).toFixed(1)} <= 531`);
      console.log(`render d${d} en: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} rows ${r.m.rows.length} row ${r.m.rows[0].rowH.toFixed(1)} stack ${r.m.root.stack.toFixed(1)} strip ${Math.max(...strips).toFixed(1)} bot ${bot.toFixed(2)} chips ${r.m.rows[0].chips.map((c) => c.label + ':' + c.w.toFixed(0)).join(' ')} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // d2 under the 3+3 chrome — the README's "722" measures 710 (the G2-317 finding); 7 x 88 + 48 = 664 fits
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-353-gate-d2-en-chrome722', strings: CHROME.three });
      assertRender('d2 en 3+3 chrome', r, { rows: 7 });
      ok(r.m.body.h <= 724 && r.m.body.h >= 700, `3+3 chrome fixture gives body ${Math.round(r.m.body.h)} (README 722; measured ~710)`);
      const intrinsic = r.m.root.intrinsic, rowMin = r.m.root.rowMin;
      ok(rowMin >= 86.5 && rowMin <= 88.6, `3+3 chrome: row minimum ${rowMin.toFixed(1)} (design 87.4 → the 88 floor; the 1fr rows stretch to ${r.m.rows[0].rowH.toFixed(1)})`);
      ok(intrinsic >= 655 && intrinsic <= 668, `3+3 chrome: intrinsic stack ${intrinsic.toFixed(1)} (design 7 x 87.4 + 48 = 659.8, floored to 664 by minmax(88px))`);
      ok(7 * 88 + 48 <= r.m.body.h, `3+3 chrome: the floored stack 664 fits the body ${r.m.body.h.toFixed(1)}`);
      ok(r.m.root.stack <= r.m.body.h + 0.6, `3+3 chrome: the grid (${r.m.root.stack.toFixed(1)}) inside the body (${r.m.body.h.toFixed(1)})`);
      const cc = crossCheck(r.m.rows, cfg2.chips, en, pronEn, objEn, 'en', cfg2);
      ok(cc.length === 0, `d2 3+3 chrome node cross-check: ${cc.join(' | ')}`);
      console.log(`render d2 en 3+3 chrome: body ${r.m.body.h.toFixed(1)} row min ${rowMin.toFixed(1)} (stretched ${r.m.rows[0].rowH.toFixed(1)}) intrinsic stack ${intrinsic.toFixed(1)} (floored 664) lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // d2 under the fi four-line 677 chrome — the base FITS (design §2: 664 <= 677)
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-353-gate-d2-en-chrome677', strings: CHROME.four });
      assertRender('d2 en 677 chrome', r, { rows: 7 });
      ok(r.m.body.h <= 690 && r.m.body.h >= 660, `677 chrome fixture gives body ${Math.round(r.m.body.h)} (want ~677)`);
      ok(7 * 88 + 48 <= r.m.body.h && r.m.root.intrinsic <= r.m.body.h, `677 chrome: the floored stack 664 / intrinsic ${r.m.root.intrinsic.toFixed(1)} fit the body ${r.m.body.h.toFixed(1)}`);
      console.log(`render d2 en 677 chrome: body ${Math.round(r.m.body.h)} row ${r.m.rows[0].rowH.toFixed(1)} stack ${r.m.root.stack.toFixed(1)} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // the +8 px mark: a marked sentence measures the plain one + 8, + 0 height
    {
      const fake = (html, id) => ({ ...TYPE, id, build: async () => ({ bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;gap:10px">${html}</div>`, meta: {} }), verify: async () => [] });
      const pStyle = `margin:0;font-family:'Nunito',sans-serif;font-weight:800;font-size:18px;line-height:1.3;display:inline-block`;
      const html = `<div data-ws-content style="display:block"><p data-m="plain" style="${pStyle}">Max reads in the garden.</p><br><p data-m="marked" style="${pStyle}">${C4.renderMarked('Max reads in the garden.', 'in the garden')}</p></div>`;
      await renderWith(page, { ...fake(html, 'G1-353'), build: async () => ({ bodyHtml: html, meta: {} }) }, { baseName: 'G1-353-gate-mark' });
      const m = await page.evaluate(() => { const g = (k) => { const b = document.querySelector(`[data-m="${k}"]`).getBoundingClientRect(); return { width: b.width, height: b.height }; }; return { plain: g('plain'), marked: g('marked') }; });
      ok(Math.abs(m.marked.width - m.plain.width - 8) <= 0.6 && Math.abs(m.marked.height - m.plain.height) <= 0.6, `markedSpan adds ${(m.marked.width - m.plain.width).toFixed(1)} px width / ${(m.marked.height - m.plain.height).toFixed(1)} px height (design +8 / +0)`);
      console.log(`mark: plain ${m.plain.width.toFixed(1)} x ${m.plain.height.toFixed(1)} · marked ${m.marked.width.toFixed(1)} x ${m.marked.height.toFixed(1)}`);
    }

    // ---- component smoke: the six face components through the real pipeline
    {
      const rng = makeRng('G1-353-components');
      const person = (k) => { const p = pronEn.people.find((x) => x.key === k); return { src: fileUri(p.pic.theme, p.pic.noun), pic: `${p.pic.theme}/${p.pic.noun}`, depicted: p.depicted }; };
      const place = (k) => { const p = en.places.find((x) => x.key === k); return { src: fileUri(p.pic.theme, p.pic.noun), pic: `${p.pic.theme}/${p.pic.noun}`, text: p.text }; };
      const thing = (k) => { const pin = TYPE.pinThing(k, 'en', en); return { src: fileUri(pin.theme, pin.noun), pic: `${pin.theme}/${pin.noun}` }; };
      const fake = (html, id) => ({ ...TYPE, id, build: async () => ({ bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;gap:12px">${html}</div>`, meta: {} }), verify: async () => [] });
      const F1 = C4.qaMatch({
        left: [{ frame: 'see-thing', ask: 'who', text: 'Who sees the ball?' }, { frame: 'like-thing', ask: 'what', text: 'What does Ben like?' }, { frame: 'be-place', ask: 'where', text: 'Where is Leo?' }, { frame: 'play-time', ask: 'when', text: 'When does Anna play?' }, { frame: 'see-count', ask: 'howmany', text: 'How many apples does Tom see?' }],
        right: [{ kind: 'who', literal: 'Mia', ...person('teacher') }, { kind: 'what', literal: 'the kite', ...thing('kite') }, { kind: 'where', literal: 'in the garden', ...place('garden') }, { kind: 'when', literal: "at eight o'clock", clock: { h: 8 } }, { kind: 'howmany', literal: 'three', ...thing('apple') }],
        order: [1, 2, 3, 4, 0],
      });
      const F2 = `<div style="display:grid;grid-template-rows:repeat(2,minmax(84px,1fr));row-gap:8px">` +
        C4.questionFrame({ n: 1, ...person('teacher'), frame: 'see-thing', ask: 'what', name: 'Mia', slots: { name: 'Mia', thing: 'the ball', pic: 'occupations/teacher' }, question: 'What does Mia see?', qPrefix: '', rest: 'does Mia see?', text: 'Mia sees the ball.', span: 'the ball', gapW: 170, answer: 'What' }) +
        C4.questionFrame({ n: 2, ...person('farmer'), frame: 'be-place', ask: 'who', name: 'Ben', slots: { name: 'Ben', place: 'at home', pic: 'occupations/farmer' }, question: 'Who is at home?', qPrefix: '', rest: 'is at home?', text: 'Ben is at home.', span: 'Ben', gapW: 170, answer: 'Who' }) + `</div>`;
      const F4 = `<div style="display:grid;grid-template-rows:repeat(2,minmax(78px,1fr));row-gap:6px">` +
        C4.writeRow({ n: 1, ...person('judge'), frame: 'see-count', ask: 'howmany', name: 'Tom', slots: { name: 'Tom', n: 'three', pl: 'apples', pic: 'occupations/judge' }, text: 'Tom sees three apples.', span: 'three', answer: 'How many apples does Tom see?' }) +
        C4.writeRow({ n: 2, ...person('nurse'), frame: 'be-place', ask: 'where', name: 'Zoe', slots: { name: 'Zoe', place: 'in the tent', pic: 'occupations/nurse' }, text: 'Zoe is in the tent.', span: 'in the tent', answer: 'Where is Zoe?' }) + `</div>`;
      const r1 = await renderWith(page, fake(F1, 'G1-353'), { baseName: 'G1-353-gate-components-match' });
      ok(r1.lints.length === 0, `components smoke (F1): lints ${JSON.stringify(r1.lints)}`);
      const h1 = await page.evaluate(() => {
        const r = (el) => el.getBoundingClientRect();
        const items = [...document.querySelectorAll('.ws-match-item')].map((e) => r(e).height);
        const clockEl = document.querySelector('[data-lcs-prim="clock"]');
        const clockText = clockEl ? [...clockEl.querySelectorAll('text')].map((t) => parseFloat(getComputedStyle(t).fontSize)) : [];
        const cols = [...document.querySelectorAll('.ws-match-col')].map((c) => { const it = [...c.children]; return it.reduce((sum, e) => sum + r(e).height, 0) + 12 * (it.length - 1); });
        const dots = [...document.querySelectorAll('.ws-match-dot--right')].map((e) => r(e).left), dotsL = [...document.querySelectorAll('.ws-match-dot--left')].map((e) => r(e).left);
        return { items, clockText, matchH: Math.max(...cols) + 12, dotGap: dotsL.length && dots.length ? Math.min(...dotsL) - Math.max(...dots) : 0 };
      });
      const r1b = await renderWith(page, fake(F2 + F4, 'G1-353'), { baseName: 'G1-353-gate-components' });
      ok(r1b.lints.length === 0, `components smoke (F2 + F4): lints ${JSON.stringify(r1b.lints)}`);
      const h = await page.evaluate(() => {
        const r = (el) => el.getBoundingClientRect();
        const qLanes = [...document.querySelectorAll('[data-lcs-question]')].map((e) => r(e.closest('.ws-lane')).height);
        const gaps = [...document.querySelectorAll('[data-lcs-gapbox]')].map((e) => r(e).width);
        const wRows = [...document.querySelectorAll('[data-lcs-ruling-cell]')].map((e) => r(e.closest('[data-lcs-row]')).height);
        return { qLanes, gaps, wRows, printed: [...document.querySelectorAll('[data-lcs-ruling-cell] text')].length };
      });
      Object.assign(h, h1);
      ok(h.items.length === 10 && h.items.every((x) => x >= 100 && x <= 112), `qaMatch items ${h.items.map((x) => x.toFixed(0)).join('/')} (design 100)`);
      ok(h.clockText.length > 0 && h.clockText.every((f) => f >= 9), `qaMatch clock numerals ${h.clockText[0]} px (>= 9; 88 → 10)`);
      ok(h.matchH >= 540 && h.matchH <= 600, `qaMatch intrinsic block ${h.matchH.toFixed(1)} (design 560; space-around absorbs the slack)`);
      ok(h.dotGap >= 70, `qaMatch dot centres ${h.dotGap.toFixed(0)} apart (design 83)`);
      ok(h.qLanes.length === 2 && h.qLanes.every((x) => x >= 83 && x <= 86), `questionFrame lanes ${h.qLanes.map((x) => x.toFixed(1)).join('/')} (design 84)`);
      ok(h.gaps.every((g) => Math.abs(g - 170) <= 0.6), `questionFrame gap boxes ${h.gaps.join('/')} (170)`);
      ok(h.wRows.length === 2 && h.wRows.every((x) => x >= 77 && x <= 80), `writeRow rows ${h.wRows.map((x) => x.toFixed(1)).join('/')} (design 78)`);
      ok(h.printed === 0, `writeRow rulings print ${h.printed} text nodes (want 0 — the answer is a stamp)`);
      console.log(`components: qaMatch ${h.matchH.toFixed(1)} (items ${h.items[0].toFixed(0)}, clock ${h.clockText[0]} px, dots ${h.dotGap.toFixed(0)}) · questionFrame ${h.qLanes.map((x) => x.toFixed(1)).join('/')} · writeRow ${h.wRows.map((x) => x.toFixed(1)).join('/')}`);
      // F3 + F5 on a second sheet
      const tiles = [['Mia', 0], ['Ben', 0], ['Zoe', 0], ['ball', 1], ['kite', 1], ['apple', 1], ['at home', 2], ['in bed', 2], ['at the lake', 2]].map(([text, key]) => ({ text, key, kind: ['who', 'what', 'where'][key], frame: '' }));
      const F3 = C4.qwBins({ tiles, heads: [{ kind: 'who', label: 'Who?' }, { kind: 'what', label: 'What?' }, { kind: 'where', label: 'Where?' }], lineCount: 5 });
      const r2 = await renderWith(page, fake(F3, 'G1-353'), { baseName: 'G1-353-gate-components-sort' });
      ok(r2.lints.length === 0, `qwBins smoke: lints ${JSON.stringify(r2.lints)}`);
      const s = await page.evaluate(() => { const r = (el) => el.getBoundingClientRect(); const bins = [...document.querySelectorAll('[data-lcs-sortbin]')]; return { shelf: r(document.querySelector('[data-lcs-shelf]')).height, bins: bins.map((b) => [b.dataset.lcsGapy, r(b.querySelector('.ws-bin')).width, b.querySelectorAll('line').length]), tiles: [...document.querySelectorAll('[data-lcs-sortword]')].map((t) => r(t).width), total: Math.max(...bins.map((b) => r(b).bottom)) - r(document.querySelector('[data-lcs-shelf]')).top }; });
      ok(s.bins.every(([, w, n]) => Math.abs(w - 201) <= 0.6 && n >= 5), `qwBins bins ${s.bins.map(([g, w, n]) => g + '@' + w.toFixed(0) + 'x' + n).join(' ')} (binW 201, lines >= 5)`);
      ok(s.shelf <= 172 + 1, `qwBins shelf ${s.shelf.toFixed(1)} (<= 3 rows = 172)`);
      ok(s.total <= 586 + 2, `qwBins intrinsic stack ${s.total.toFixed(1)} (design <= 586)`);
      ok(s.tiles.every((w) => w <= 124 + 24 + 4.5), `qwBins tile widths ${s.tiles.map((w) => w.toFixed(0)).join('/')}`);
      console.log(`components: qwBins shelf ${s.shelf.toFixed(1)} · bins ${s.bins.map(([g, w]) => g + '@' + w.toFixed(0)).join(' ')} · stack ${s.total.toFixed(1)}`);
      const F5 = C4.askScene({ portrait: person('teacher'), thing: thing('kite'), place: place('garden'), time: { h: 8 } }) + C4.starterLines({ starters: en.starters });
      const r3 = await renderWith(page, fake(F5, 'G1-353'), { baseName: 'G1-353-gate-components-ask' });
      ok(r3.lints.length === 0, `askScene + starterLines smoke: lints ${JSON.stringify(r3.lints)}`);
      const a = await page.evaluate(() => { const r = (el) => el.getBoundingClientRect(); return { scene: r(document.querySelector('[data-lcs-ask-scene]')).height, lines: r(document.querySelector('[data-lcs-starters]')).height, tiles: [...document.querySelectorAll('[data-lcs-scene-tile]')].map((t) => r(t).width), clockText: [...document.querySelectorAll('[data-lcs-prim="clock"] text')].map((t) => parseFloat(getComputedStyle(t).fontSize)), starters: [...document.querySelectorAll('[data-lcs-starter]')].map((t) => t.textContent), starterPx: [...document.querySelectorAll('[data-lcs-starter]')].map((t) => +t.dataset.lcsStarterPx) }; });
      ok(a.scene >= 158 && a.scene <= 164, `askScene lane ${a.scene.toFixed(1)} (design 160)`);
      ok(a.lines >= 396 && a.lines <= 404, `starterLines lane ${a.lines.toFixed(1)} (design 400)`);
      ok(a.tiles.length === 4 && a.tiles.every((w) => Math.abs(w - 132) <= 0.6), `askScene tiles ${a.tiles.map((w) => w.toFixed(0)).join('/')} (132)`);
      ok(a.clockText.every((f) => f >= 13), `askScene clock numerals ${a.clockText[0]} px (120 → 14)`);
      ok(a.starters.join(',') === en.starters.join(','), `starterLines print ${a.starters.join(',')}`);
      console.log(`components: askScene ${a.scene.toFixed(1)} · starterLines ${a.lines.toFixed(1)} (starter font ${a.starterPx[0]} px, clock ${a.clockText[0]} px)`);
      // P20 — a clock at 64 fails the 9 px lint independently, and qaMatch refuses it
      const r4 = await renderWith(page, fake(`<div style="display:flex;justify-content:center">${clock({ h: 8, m: 0, size: 64 }).svg}</div>`, 'G1-353'), { baseName: 'G1-353-gate-poison-P20' });
      ok(r4.lints.some((l) => /font too small/.test(l)), `P20 a 64 px clock: qa/lints.js must fail the numerals (got ${JSON.stringify(r4.lints)})`);
      if (r4.lints.some((l) => /font too small/.test(l))) console.log(`  poison P20 clock 64: killed (${r4.lints[0]})`);
      // P21 — the F3 tile "auf dem Spielplatz" exceeds the 112 guard at Baloo 20 (measured)
      const r5 = await renderWith(page, fake(C4.qwBins({ tiles: [{ text: 'auf dem Spielplatz', key: 2 }, { text: 'im Garten', key: 2 }, { text: 'Mia', key: 0 }, { text: 'Ball', key: 1 }], heads: [{ kind: 'who', label: 'Wer?' }, { kind: 'what', label: 'Was?' }, { kind: 'where', label: 'Wo?' }], lineCount: 5 }), 'G1-353'), { baseName: 'G1-353-gate-poison-P21' });
      const tw = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-sortword]')].map((t) => [t.textContent, t.getBoundingClientRect().width - 24 - 4]));
      const spiel = tw.find(([t]) => t === 'auf dem Spielplatz'), garten = tw.find(([t]) => t === 'im Garten');
      ok(spiel && spiel[1] > TILE_GUARD + 12 && garten && garten[1] <= TILE_GUARD + 12, `P21 tile text widths: "auf dem Spielplatz" ${spiel && spiel[1].toFixed(0)} (> 124 → refused) · "im Garten" ${garten && garten[1].toFixed(0)} (<= 124 → passes)`);
      ok(r5.lints.length === 0, 'P21 sheet lints clean');
      console.log(`  poison P21 tile guard: "auf dem Spielplatz" text ${spiel && spiel[1].toFixed(1)} px > ${TILE_GUARD} (refused); "im Garten" ${garten && garten[1].toFixed(1)} px (passes)`);
      // component throws (contracts)
      const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `${what}: ${m || 'did NOT throw'}`); };
      throws(() => C4.markedSpan(''), /empty/, 'markedSpan empty');
      throws(() => C4.renderMarked('Mia sees Mia.', 'Mia'), /occurs 2 times/, 'renderMarked span twice');
      throws(() => C4.renderMarked('Mia', 'Mia'), /whole sentence/, 'renderMarked whole sentence');
      throws(() => C4.renderMarked('Mia sees the ball.', 'the balls'), /occurs 0 times/, 'renderMarked no word-bounded hit');
      throws(() => C4.qwChips({ kinds: [1, 2, 3, 4, 5, 6].map((i) => ({ kind: 'k' + i, label: 'L' + i })) }), /6 chips/, 'qwChips 6 chips');
      throws(() => C4.qwChips({ kinds: [{ kind: 'who', label: 'Who' }, { kind: 'what', label: 'who' }] }), /label twice/, 'qwChips duplicate label');
      throws(() => C4.qwChips({ kinds: [{ kind: 'who', label: 'Who' }, { kind: 'what', label: '<span data-lcs-mark>What</span>' }] }), /carries a mark/, 'qwChips a mark in a label');
      throws(() => C4.qwChips({ kinds: [{ kind: 'who', label: 'Who' }, { kind: 'what', label: 'What' }], h: 40 }), /< the G1 floor/, 'qwChips h 40');
      throws(() => C4.qaMatch({ left: [{ ask: 'who', text: 'a' }, { ask: 'what', text: 'b' }], right: [{ kind: 'who', literal: 'x', clock: { h: 1 } }, { kind: 'what', literal: 'y', clock: { h: 2 } }], order: [0, 1] }), /fixed-point-free/, 'qaMatch a non-derangement (P15\'s shape)');
      throws(() => C4.qaMatch({ left: [{ ask: 'who', text: 'a' }, { ask: 'what', text: 'b' }], right: [{ kind: 'who', literal: 'x', clock: { h: 1 } }, { kind: 'what', literal: 'y', clock: { h: 2 } }], order: [1, 0], picPx: 64 }), /clock floor/, 'qaMatch picPx 64 (P20)');
      throws(() => C4.questionFrame({ n: 1, ...person('teacher'), frame: 'x', ask: 'who', name: 'Mia', slots: { pic: 'occupations/teacher' }, qPrefix: '', rest: 'Who has the ball?', text: 'Mia has the ball.', span: 'Mia', gapW: 170, answer: 'Who' }), /opens with the answer/, 'questionFrame the question printed whole (P16\'s shape)');
      throws(() => C4.qwBins({ tiles: [{ text: 'Who?', key: 0 }, { text: 'Mia', key: 0 }], heads: [{ kind: 'who', label: 'Who?' }, { kind: 'what', label: 'What?' }] }), /equals a head label/, 'qwBins a tile equal to a head');
      throws(() => C4.writeRow({ n: 1, ...person('judge'), frame: 'x', ask: 'where', name: 'Zoe', slots: { pic: 'occupations/judge' }, text: 'Where is Zoe? Zoe is in the tent.', span: 'in the tent', answer: 'Where is Zoe?' }), /prints the answer/, 'writeRow the answer printed (P17\'s shape)');
      throws(() => C4.askScene({ portrait: person('teacher'), thing: thing('kite'), place: place('garden'), time: { h: 8 }, tile: 90 }), /< 100/, 'askScene tile 90');
      throws(() => C4.starterLines({ starters: ['Who', 'What', 'Where', 'who'] }), /twice/, 'starterLines a duplicate');
    }

    // ---- 3. sweep
    if (!QUICK) {
      for (const d of [1, 2, 3]) {
        const cfg = TYPE.resolveBase(TYPE.difficulty[d], en);
        const sets = new Set(), orders = new Set();
        for (let s = 1; s <= 20; s++) {
          const rng = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: d, seedEpoch: 1, variant: s }));
          const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
          const rows = b.meta.rows;
          const hist = {};
          rows.forEach((r) => { hist[r.ask] = (hist[r.ask] || 0) + 1; });
          ok(cfg.chips.every((k) => hist[k] === cfg.kinds[k]), `sweep d${d} seed ${s}: asks ${JSON.stringify(hist)} != ${JSON.stringify(cfg.kinds)}`);
          for (const k of ['name', 'person', 'frame']) { const v = rows.map((r) => r[k]); ok(new Set(v).size === v.length, `sweep d${d} seed ${s}: a ${k} twice`); }
          for (const k of ['thing', 'place', 'time']) { const v = rows.map((r) => r[k]).filter((x) => x != null); ok(new Set(v).size === v.length, `sweep d${d} seed ${s}: a ${k} twice`); }
          ok(b.meta.bot <= cfg.botMax + 1e-9, `sweep d${d} seed ${s}: bot ${b.meta.bot}`);
          rows.forEach((r) => { ok(r.text.length <= cfg.maxChars && (r.ask === 'who' ? r.span === r.name : r.span !== r.name) && r.text.includes(r.span), `sweep d${d} seed ${s}: row "${r.text}" mark "${r.span}"`); });
          sets.add(rows.map((r) => r.frame + ':' + r.name).sort().join(',')); orders.add(rows.map((r) => r.frame + ':' + r.name).join(','));
        }
        ok(sets.size >= 2 && orders.size >= 2, `sweep d${d}: ${sets.size} distinct row sets / ${orders.size} orders over 20 seeds`);
        console.log(`sweep d${d}: 20 seeds, ${sets.size} distinct sets, ${orders.size} distinct orders`);
      }
    }

    // ---- 3b. the es genderFilter bites at build (node): every count row draws a masculine plural; the control without it draws feminine ones too
    {
      const esForms = objFormsOf('es');
      if (Object.keys(esForms).length) {
        const esBlock = synthetic('es', en);
        const pool = TYPE.thingPool('es', esBlock, esForms);
        const genderOf = new Map(pool.map((t) => [t.key, t.gender]));
        ok(pool.length === 88 && pool.filter((t) => t.gender === 'm').length === 58, `es thing pool ${pool.length} / masculine ${pool.filter((t) => t.gender === 'm').length} (design 88 / 58)`);
        const draw = (block) => { const out = []; for (let sd = 1; sd <= 30; sd++) { const rng = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: 3, seedEpoch: 1, variant: sd })); const bb = TYPE._buildWith(block, TYPE.difficulty[3], { locale: 'es', pron: pronEn, objForms: esForms }, { rng }); bb.meta.rows.filter((r) => r.kind === 'count').forEach((r) => out.push(genderOf.get(r.thing))); } return out; };
        const withF = draw(esBlock), without = draw({ ...esBlock, genderFilter: {} });
        ok(withF.length >= 30 && withF.every((g) => g === 'm'), `es genderFilter.count: ${withF.filter((g) => g !== 'm').length} of ${withF.length} count rows non-masculine (want 0)`);
        ok(without.some((g) => g === 'f'), `control: without the filter ${without.filter((g) => g === 'f').length} of ${without.length} count rows are feminine (want > 0)`);
        console.log(`es genderFilter: ${withF.length} count rows all masculine · control without the filter: ${without.filter((g) => g === 'f').length}/${without.length} feminine`);
      }
    }

    // ---- 4. poisons — bank (validator)
    const poison = (name, block, loc, re, opts) => {
      const errs = validateBank(block, loc, { pron: pronEn, ...(opts || {}) }).filter(ctrlFilter);
      const hit = errs.filter((e) => re.test(e));
      if (!errs.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT (the validator passed the poison)`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${errs.join(' | ')}`); }
      else { asserts++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    let b;
    b = synthetic('de', en); b.frames[0].text = 'Den Ball hat {name}.'; poison('P1 "Den Ball hat {name}."', b, 'de', /rule 2: frame see-thing text does not start with \{name\}/);
    b = synthetic('de', en); b.frames[1].text = '{name} weiß, wer {thing} kommt.'; poison('P2 "{name} weiß, wer kommt."', b, 'de', /rule 2: frame draw-thing carries the question word "Wer"/);
    b = clone(en); b.frames[2].text = '{name} knows what {thing}.'; poison('P2b "{name} knows what …"', b, 'en', /rule 2: frame like-thing carries the question word "What"/);
    b = synthetic('de', en); b.frames[3].q.where = 'Wo ist {name} {place}?'; poison('P3 q.where "Wo ist {name} {place}?"', b, 'de', /rule 3: frame be-place q\.where .*asked slot printed/);
    b = synthetic('de', en); b.frames[0].q.who = 'wer sees {thing}?'; poison('P4 q.who lowercase "wer …"', b, 'de', /rule 3: frame see-thing q\.who .* does not open with "Wer"/);
    b = synthetic('fr', en); b.frames[0].q.who = b.frames[0].q.who.replace(' ?', ' ?'); poison('P5 fr q ending " ?" under nbsp', b, 'fr', /rule 3: frame see-thing q\.who .* (plain space|NBSP)/);
    b = synthetic('de', en); b.frames[0].objCase = 'dat'; poison('P6 de dat frame carrying {thing}', b, 'de', /rule 4: de frame see-thing is signed dat but names \{thing\}/);
    b = synthetic('de', en); delete b.frames[1].objCase; poison('P6b de thing frame unsigned', b, 'de', /rule 4: de frame draw-thing names \{thing\} and must be signed/);
    b = clone(en); b.frames[3].q.where = 'Where is the {noun}?'; poison('P7 "Where is the {noun}?"', b, 'en', /rule 5: frame be-place q\.where (equals a SENTENCES frame|carries a b2 slot)/);
    b = clone(en); b.frames[3].text = '{name} is here {place}.'; b.frames[3].q.where = 'Where is {name}?';
    b = synthetic('es', en); b.genderFilter = {}; poison('P8 es without genderFilter.count', b, 'es', /rule 8: es must declare genderFilter\.count/);
    b = synthetic('de', en); b.qPrefix = '¿'; poison('P8b a non-es draft with "¿"', b, 'de', /rule 8: de qPrefix/);
    b = clone(en); b.places.push({ key: 'zoo', pic: { theme: 'zoo animals', noun: 'zoo' }, text: 'at the zoo', picOpened: true }); poison('P9 a places overlay adding zoo', b, 'en', /rule 6: places keys .* != the EN key list/);
    b = clone(en); b.places[0].pic.theme = 'animals bw'; poison('P9b pic theme "animals bw"', b, 'en', /rule 6: place house pins a B&W theme/);
    b = clone(en); b.places[1].text = 'In the garden'; poison('P9c a place literal capitalised', b, 'en', /rule 6: place garden .* starts with a capital/);
    { const svForms = objFormsOf('sv'); if (svForms.cow) { b = synthetic('sv', en); poison('P10 a sv pool pinning cow', b, 'sv', /rule 10: sv pool carries the definite-clash key "cow"/, { pool: [{ key: 'cow', forms: svForms.cow }] }); } else { asserts++; console.log('  poison P10: sv objForms has no cow — skipped'); } }
    b = synthetic('fi', en); b.frames[0].text = '{name} sees {thing}.'; poison('P11 a fi frame with {thing}', b, 'fi', /rule 13: fi frame see-thing \(thing\) names \{thing\}/);
    b = synthetic('sv', en); b.strings.base.title = 'Frågeord och skiljetecken'; poison('P12 sv title "Frågeord och skiljetecken"', b, 'sv', /rule 9: base title .* (contains the neighbour family name|!= the measured head)/);
    b = clone(en); b.strings.base.instruction = 'Read the sentence. Circle the word from the bank.'; poison('P12b a base instruction with the bank word', b, 'en', /rule 9: the base instruction carries the bank word/);
    b = clone(en); b.starters[5] = 'How many'; poison('P12c starters with "How many"', b, 'en', /rule 1: starters carry the howmany literal/);
    b = clone(en); b.strings.write.title = 'Write the Question Worksheet'; poison('P12d worksheet word', b, 'en', /rule 9: write title carries the worksheet word/);
    b = clone(en); b.strings.sort.instruction = 'Free printable: sort the tiles.'; poison('P12e a free claim', b, 'en', /rule 9: sort string claims free/);
    b = clone(en); b.strings.match.title = 'Match the Question with Answers'; poison('P12f answers promised', b, 'en', /rule 9: match string promises answers/);
    b = clone(en); b.qwords.who = 'Mia'; poison('P1x a qwords literal equal to a name', b, 'en', /rule 1: qwords\.who "Mia" equals a name/);
    b = clone(en); b.frames[9].text = '{name} sees {n}.'; poison('P2x a count frame without its plural slot', b, 'en', /rule 2: frame see-count \(count\) slots/);
    b = clone(en); b.frames[0].q.what = 'What does {name} see {thing}?'; poison('P3x the asked thing slot printed', b, 'en', /rule 3: frame see-thing q\.what .*asked slot printed/);
    b = clone(en); b.frames[6].q.when = 'When does {name} play {time}?'; poison('P3y the asked time slot printed', b, 'en', /rule 3: frame play-time q\.when .*asked slot printed/);
    b = clone(en); b.times[0].h = 3; poison('P7x a clock hour twice', b, 'en', /rule 7: a clock hour twice/);
    b = clone(en); b.faces.base.kinds = ['who', 'what', 'where']; poison('P12g faces.base.kinds != the d2 chips', b, 'en', /rule 12: faces\.base\.kinds/);
    // the control: the correct EN bank + every synthetic control are clean (asserted above)

    // ---- render poisons (the validator bypassed)
    const renderPoison = async (name, type, re, { difficulty = 2, strings, cfg } = {}) => {
      const c = cfg || TYPE.resolveBase(TYPE.difficulty[difficulty], en);
      let r;
      try { r = await renderWith(page, type, { difficulty, baseName: `G1-353-gate-poison-${name.split(' ')[0]}`, strings }); } catch (e) { fails++; asserts++; console.log(`  FAIL ${name}: threw before verify (${e.message.slice(0, 80)})`); return; }
      const all2 = [...r.verify, ...r.lints, ...crossCheck(r.m.rows, c.chips, en, pronEn, objEn, 'en', c)];
      const hit = all2.filter((f) => re.test(f));
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ')}`); }
      else { asserts++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    await renderPoison('P13 a count mark spanning "five lambs"', mutated(TYPE, (h) => h.replace(/(<span data-lcs-mark[^>]*>)([^<]+)(<\/span>)( \p{L}+)\./u, '$1$2$4$3.')), /spans more than the number word|mark ".*" != markOf/, { difficulty: 3 });
    await renderPoison('P14 the chips reordered on one row', mutated(TYPE, (h) => { const i = h.indexOf('<div class="ws-achips"'); const j = h.indexOf('</div>', i); const seg = h.slice(i, j); const chips = seg.match(/<span class="ws-achip"[\s\S]*?<\/span>/g); return h.slice(0, i) + seg.replace(chips.join(''), chips.slice().reverse().join('')) + h.slice(j); }), /position leak/);
    await renderPoison('P18 a base page with 3 who rows', withDeps(TYPE, { d: { ...TYPE.difficulty[2], kinds: { who: 3, what: 2, where: 1, when: 1 } } }), /pictureBot 0\.43 > 0\.35/);
    { const bad = clone(pronEn); bad.names.forEach((n) => { n.gender = 'f'; }); await renderPoison('P19 the male names tagged f (a girl\'s portrait under "Ben")', withDeps(TYPE, { pron: bad }), /tag mismatch/); }
    await renderPoison('P22 the row grid with column-gap:10px 12px', mutated(TYPE, (h) => h.split('grid-template-columns:30px 10px 56px 12px 1fr').join('grid-template-columns:30px 56px 1fr;column-gap:10px 12px').split('grid-column:3;').join('grid-column:2;').split('grid-column:5;').join('grid-column:3;')), /row geometry|past the lane/);
    await renderPoison('PRa a chip carrying data-lcs-correct', mutated(TYPE, (h) => h.replace('data-lcs-chip="what"', 'data-lcs-chip="what" data-lcs-correct="1"')), /carries a correct marker/);
    await renderPoison('PRb a mark inside a chip strip', mutated(TYPE, (h) => h.replace(/(<span class="ws-achip"[^>]*>)(Who)(<\/span>)/, '$1' + C4.markedSpan('Who') + '$3')), /a mark inside the chip strip|prints ".*" not its label/);
    await renderPoison('PRc a chip label printed in the sentence', mutated(TYPE, (h) => h.replace(/(<p data-lcs-sentence[^>]*>)/, '$1Who ')), /occurs in the sentence|does not open with the name/);
    await renderPoison('PRd a portrait src twice', mutated(TYPE, (h) => { const srcs = [...h.matchAll(/ src="([^"]+)"/g)].map((m) => m[1]); return h.replace(`src="${srcs[1]}"`, `src="${srcs[0]}"`); }), /src twice/);
    await renderPoison('PRe a stamped ask edited (what → who on a thing row)', mutated(TYPE, (h) => h.replace('data-lcs-kind="thing" data-lcs-ask="what"', 'data-lcs-kind="thing" data-lcs-ask="who"')), /a who row marks|mark ".*" != markOf/);
    // P22's geometry check is a positive assertion on the correct render too (d1-d3 above)
  } finally {
    await browser.close();
  }
  console.log(`\nverify-b4-question-words: ${asserts} assertions, ${fails} failures in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${fails ? 'FAIL' : 'PASS'}`);
  process.exit(fails ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, crossCheck, TABLE_B, HEADS, MEASURED_F4, synthetic };
