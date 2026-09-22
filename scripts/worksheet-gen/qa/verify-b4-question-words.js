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
 *      P18 a base page with 3 who rows (pictureBot 0.43)      → verify   (3/7 on the 3-chip d2 page)
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
 * 5. FACES (Phase 2, tools/b4var-rows/question-words.js; design §3) — the five
 *    emitted specs G1-373 match · G1-374 fill · G1-375 sort · G2-356 write ·
 *    G2-357 ask rendered through the real pipeline at d2 en under the default
 *    chrome, the 3+3 (710) chrome AND the fi four-line 677 chrome (every face
 *    FITS): verify() empty (the type's VERIFY_FACE branch per data-lcs-mode),
 *    qa/lints.js clean, the floors (G1 44 / G2 36; clocks >= 74 with numerals
 *    >= 9; writing glyphH >= 24), the SPARSE measures (match: items 100..120,
 *    band <= 44, slack under <= 50; fill / write: the rows end at the body
 *    bottom, blank inside <= 24; sort: the FIXED 677 stack, slack <= 180, the
 *    last ruled line within 64 px of the bin bottom; ask: stack >= 660, slack
 *    <= 180), the NODE cross-check (every question === questionOf, every literal
 *    === the filled slot, every rest === gapOf, every answer === questionOf,
 *    every tile === the name / displayWord / place literal, every picture ===
 *    the pinned file, every clock h === the time's h, gapW === the formula over
 *    the bank's bankWidths, the F1 picture-bot over the QUESTION side = 0 and
 *    the F2 / F4 pictureBot <= 0.35), the synthetic de / es / fr / sv / fi
 *    blocks through every face (structure; es "¿" prefix, fr NBSP, fi {part}),
 *    a 20-seed sweep per face (sets AND orders vary; F2 bank order != the fixed
 *    order on every seed), and the FACE POISONS (each must FAIL for its own
 *    reason; the correct render is the control): config guards PC1-PC11 (a
 *    thrown refusal), bank rules PB1-PB6 (the title-lists-kinds rule 9, the
 *    bankWidths rule 12, faces.<f>.kinds === the spec), render poisons P15
 *    (two who questions) / P15b (not deranged) / P15c (an answer literal in a
 *    question) / P15d (a picture on the question side) / P15e (a person picture
 *    on a what answer) / P16 (the question word printed in the question line)
 *    / P16b (the bank in the fixed order) / P16c (a per-row gap width) / P16d
 *    (a bank word missing) / P16e (3 who rows: pictureBot 0.43) / P17 (the
 *    canonical question as a starter) / P17b (a bank banner on the write face)
 *    / P17c (the ruling narrowed under need) / PR-sort (a tile pre-placed; a
 *    tile equal to a head; a picture injected; a head swapped) / PR-ask (the
 *    clock hour edited; a starter replaced by howmany), the SPARSE poisons PS1
 *    (F1 items fixed at 100 under a one-line chrome: bands 60) / PS2 (F2 rows
 *    fixed at 84) / PS3 (F3 the design's 350 bins: stack 536) / PS4 (F4 rows
 *    fixed at 78) / PS5 (F5 the design's h 56: stack 572), and the NODE poisons
 *    PN1 (an F1 literal stamp edited) / PN2 (an F2 answer stamp edited) / PN3
 *    (an F3 tile key edited) / PN4 (an F4 answer stamp edited).
 *    Final line: PASS (N assertions, M/M poisons killed).
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
/** The five emitted face specs (tools/gen-b4var-specs.js from tools/b4var-rows/question-words.js). */
const FACE_FILES = { match: 'g1/G1-373-question-words-match-the-question-to-the-answer.js', fill: 'g1/G1-374-question-words-fill-in-the-question-word.js', sort: 'g1/G1-375-question-words-sort-the-answers-who-what-or-where.js', write: 'g2/G2-356-question-words-write-the-question.js', ask: 'g2/G2-357-question-words-ask-about-the-picture-why-and-how.js' };
const SPECS = {};
for (const [f, rel] of Object.entries(FACE_FILES)) { const abs = path.join(__dirname, '..', 'types', rel); if (fs.existsSync(abs)) SPECS[f] = require(abs); }
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const TAXONOMY = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

// nt10-D panel chain: validate-b4-draft.js runs this gate BEFORE apply-b4-locale.js registers the
// locale slug, so it hands the draft's family slugs over as B4_DRAFT_SLUGS (JSON key → slug); a
// missing taxonomy entry is then judged against the draft, never against nothing (measured by the
// de panel: five gates failed every correct non-EN draft with the same message).
function draftSlug(key) {
  try { const m = JSON.parse(process.env.B4_DRAFT_SLUGS || '{}'); return typeof m[key] === 'string' && m[key] ? m[key] : null; } catch (e) { return null; }
}
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
/** Bank-word widths MEASURED 2026-09-21 (Nunito 800 18, the shell woff2 from file://): the F2 gap-box formula input per locale. */
const MEASURED_BANK_W = { Who: 42.3, What: 49, Where: 58.7, When: 52.3, 'How many': 91.2, Wer: 36.3, Was: 37.9, Wo: 29.6, Wann: 50.5, 'Wie viele': 80.8, Qui: 29.8, Que: 34.8, 'Où': 25, Quand: 56.7, Combien: 74.7, 'Quién': 50.4, 'Qué': 34.8, 'Dónde': 56.1, 'Cuándo': 65, 'Cuántos': 70.1, Quem: 50.8, 'O que': 50.8, Onde: 45.9, Quando: 67.3, Quantos: 72.3, Chi: 27.9, 'Che cosa': 75.8, Dove: 43.6, Quanti: 58.1, Wie: 35.7, Wat: 36.3, Waar: 46.5, Wanneer: 77.7, Hoeveel: 69.5, Vem: 37.8, Vad: 33, Var: 29.4, 'När': 31, 'Hur många': 94.9, Hvem: 49.3, Hvad: 44.5, Hvor: 41.5, 'Hvornår': 69.6, 'Hvor mange': 104.2, Hva: 33.5, 'Når': 31, Kuka: 42.8, 'Mitä': 37.9, 'Missä': 48.3, Milloin: 58.6, 'Kuinka monta': 118 };
const TILE_GUARD = 112, PX_PER_GLYPH_18 = 10.2;     // the F3 tile guard (design §3 F3)
const PROBE = { thing: 'x'.repeat(8), pl: 'x'.repeat(6), part: 'x'.repeat(6), dat: 'x'.repeat(8) };   // typical fills for the F1 / F2 / F4 caps (the design's own examples use 5-8 glyph nouns)

let fails = 0, asserts = 0, killed = 0, poisonTotal = 0;
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
  // rule 9 (nt10-D): a title that LISTS question words lists EXACTLY the kinds its d2 page shows (the base was sent back for
  // "Who, What, Where" over a page asking When). base / match / fill / sort / write: the named set is empty or === the face's
  // kind set; ask: the named set is {why, how} (its two extra starters) or the whole six. An instruction may name kinds only
  // from its own page.
  const faceKinds = block.faces || {};
  const namedIn = (t) => {
    // the bins literals (minus their "?") alias their kind: fi's title lists the nominative "mikä" while the chip is the partitive "Mitä"
    const lits = [...QW_KEYS.map((k) => [k, qw[k]]), ...Object.entries(block.bins || {}).map(([k, v]) => [k, String(v || '').replace(/[?¿]/g, '').trim()]), ['why', (block.starters || [])[4]], ['how', (block.starters || [])[5]]].filter(([, l]) => typeof l === 'string' && l);
    lits.sort((a, b) => glyphs(b[1]) - glyphs(a[1]));   // longer literals first ("How many" before "How")
    let rest = String(t), named = new Set();
    for (const [k, l] of lits) { const re = new RegExp('(?<!\\p{L})' + l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu'); if (re.test(rest)) { named.add(k); rest = rest.replace(re, ' '); } }
    return named;
  };
  const setEq = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
  for (const f of FACES) {
    const s2 = S[f];
    if (!s2 || typeof s2.title !== 'string') continue;
    const page = new Set((faceKinds[f] && faceKinds[f].kinds) || []);
    const named = namedIn(s2.title);
    if (named.size) {
      if (f === 'ask') { const extra = new Set(['why', 'how']); if (!setEq(named, extra) && !setEq(named, page)) push(`rule 9: ask title "${s2.title}" names ${[...named].join(',')} — a listing title names why + how (its two extra starters) or all six`); }
      else if (!setEq(named, page)) push(`rule 9: ${f} title "${s2.title}" lists ${[...named].join(',')} but the d2 page shows ${[...page].join(',')} (a title that lists kinds lists EXACTLY the page's)`);
    }
    if (typeof s2.instruction === 'string') { const ni = namedIn(s2.instruction); for (const k of ni) if (!page.has(k)) push(`rule 9: ${f} instruction names "${k}", which is not on its page`); }
  }
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
  if (block.bankWidths != null) { if (typeof block.bankWidths !== 'object') push('rule 12: bankWidths must be an object'); else for (const [k, v] of Object.entries(block.bankWidths)) { if (!qv.includes(k)) push(`rule 12: bankWidths."${k}" is not a qwords literal`); if (typeof v !== 'number' || v < 20 || v > 200) push(`rule 12: bankWidths."${k}" = ${v} (20..200 px)`); } }
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
  // the face kind sets === the emitted specs' d2 configs (one source: the rows module sets the knob, the bank records the set)
  const specKinds = { match: (d) => d.kinds, fill: (d) => QW_KEYS.filter((k) => d.kinds && d.kinds[k]).length === 5 ? QW_KEYS : QW_KEYS.filter((k) => d.kinds && d.kinds[k]), sort: (d) => d.bins, write: (d) => QW_KEYS.filter((k) => d.kinds && d.kinds[k]), ask: (d) => d.starters };
  for (const [f, fn] of Object.entries(specKinds)) { const sp = SPECS[f]; if (!sp || !faces[f]) continue; const want = fn(sp.difficulty[2]) || []; if (faces[f].kinds.join(',') !== want.join(',')) push(`rule 12: faces.${f}.kinds ${faces[f].kinds.join(',')} != the ${sp.id} d2 config ${want.join(',')}`); }
  for (const f of ['match', 'fill', 'sort', 'write', 'ask']) { const sp = SPECS[f]; if (!sp || !S[f]) continue; if (loc === 'en' && (sp.i18n.en.title !== S[f].title || sp.i18n.en.instruction !== S[f].instruction)) push(`rule 12: ${sp.id} i18n.en != strings.${f} (one source)`); }
  if (loc === 'en' && S.base && (S.base.title !== TYPE.i18n.en.title || S.base.instruction !== TYPE.i18n.en.instruction)) push('rule 12: EN strings.base != the spec\'s i18n.en');
  try { TYPE.resolveBase(TYPE.difficulty[2], block); TYPE.resolveBase(TYPE.difficulty[3], block); } catch (e) { push('rule 12: ' + e.message); }

  // rule 13 — fi
  if (isFi && block.whatForm !== 'nominative' && qw.what !== 'Mitä') push(`rule 13: fi qwords.what "${qw.what}" != "Mitä" (declare whatForm:'nominative' for a nominative policy)`);

  // rule 14 — the taxonomy slug
  if (tax) {
    const ax = tax.axes['exercise-type']['question-words'];
    const slug = (ax && ax.slug && ax.slug[loc]) || draftSlug('question-words');
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
  return { ...type, build: (a, c) => { let real; try { real = type._deps(a.locale || 'en'); } catch (e) { if (!bank || !pron || !objForms) throw e; real = {}; }   /* a synthetic locale injects all three: the real bank need not exist */ return type._buildWith(bank || real.bank, d || type.difficulty[a.difficulty], { locale: a.locale, pron: pron || real.pron, objForms: objForms || real.objForms }, c); } };
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
  b.bankWidths = Object.fromEntries(['who', 'what', 'where', 'when', 'howmany'].map((k) => [Q[k], MEASURED_BANK_W[Q[k]]]).filter(([, v]) => v));
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
  if (loc === 'fi') { b.places = b.places.map((p) => ({ ...p, static: true })); b.bins.what = 'Mikä?'; b.binAliases = { what: true }; }   // the design's nominative F3 head over bare-noun tiles
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
  // the module carries GLOBAL keys beside the locale blocks (THING_TWINS — the artwork look-alike fence,
  // the shape cloze already uses), so a locale is a two-letter key, never "every top-level key"
  const locKeys = Object.keys(all).filter((k) => /^[a-z]{2}$/.test(k));
  if (!locKeys.length) throw new Error('verify-b4-question-words: no locale blocks in data/b4/question-words.js');
  console.log(`verify-b4-question-words ${QUICK ? '(--quick) ' : ''}— locales on disk: ${locKeys.join(' ')}`);

  // ---- 1. the bank(s)
  for (const loc of locKeys) {
    const errs = validateBank(all[loc], loc);
    ok(errs.length === 0, `bank ${loc}: ${errs.join(' | ')}`);
    const pool = TYPE.thingPool(loc, all[loc], objFormsOf(loc));
    console.log(`bank ${loc}: ${errs.length ? errs.length + ' fails' : 'clean'} (frames ${all[loc].frames.length}, places ${all[loc].places.filter((p) => p.text).length}, times ${all[loc].times.length}, thing pool ${pool.length})`);
  }
  // the synthetic blocks are themselves clean controls for the non-EN rules (rule 14 is a registrar step; rule 12's pronouns bank exists for en only)
  // OPEN (base + panels, recorded in _work/G1-353-faces.md): the measured sv head lists FOUR words ("vem, vad, var, när") while the
  // base's d2 config ships THREE chips — rule 9's title-lists-kinds check is RIGHT to fire on it; the real sv draft must resolve it
  // (a per-locale d2 chip set read from faces.base.kinds, or a re-targeted head). Filtered on the SYNTHETIC control only, by name.
  const ctrlFilter = (e) => !/^rule 14: axes|^rule 12: the pronouns bank does not load|^rule 9: base title "Frågeord: vem, vad, var, när" lists/.test(e);
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
      poisonTotal++;
      ok(r4.lints.some((l) => /font too small/.test(l)), `P20 a 64 px clock: qa/lints.js must fail the numerals (got ${JSON.stringify(r4.lints)})`);
      if (r4.lints.some((l) => /font too small/.test(l))) { killed++; console.log(`  poison P20 clock 64: killed (${r4.lints[0]})`); }
      // P21 — the F3 tile "auf dem Spielplatz" exceeds the 112 guard at Baloo 20 (measured)
      const r5 = await renderWith(page, fake(C4.qwBins({ tiles: [{ text: 'auf dem Spielplatz', key: 2 }, { text: 'im Garten', key: 2 }, { text: 'Mia', key: 0 }, { text: 'Ball', key: 1 }], heads: [{ kind: 'who', label: 'Wer?' }, { kind: 'what', label: 'Was?' }, { kind: 'where', label: 'Wo?' }], lineCount: 5 }), 'G1-353'), { baseName: 'G1-353-gate-poison-P21' });
      const tw = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-sortword]')].map((t) => [t.textContent, t.getBoundingClientRect().width - 24 - 4]));
      const spiel = tw.find(([t]) => t === 'auf dem Spielplatz'), garten = tw.find(([t]) => t === 'im Garten');
      poisonTotal++; if (spiel && spiel[1] > TILE_GUARD + 12 && garten && garten[1] <= TILE_GUARD + 12) killed++;
      ok(spiel && spiel[1] > TILE_GUARD + 12 && garten && garten[1] <= TILE_GUARD + 12, `P21 tile text widths: "auf dem Spielplatz" ${spiel && spiel[1].toFixed(0)} (> 124 → refused) · "im Garten" ${garten && garten[1].toFixed(0)} (<= 124 → passes)`);
      ok(r5.lints.length === 0, 'P21 sheet lints clean');
      console.log(`  poison P21 tile guard: "auf dem Spielplatz" text ${spiel && spiel[1].toFixed(1)} px > ${TILE_GUARD} (refused); "im Garten" ${garten && garten[1].toFixed(1)} px (passes)`);
      // component throws (contracts)
      const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } poisonTotal++; if (m && re.test(m)) killed++; ok(m && re.test(m), `${what}: ${m || 'did NOT throw'}`); };
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
      poisonTotal++;
      if (!errs.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT (the validator passed the poison)`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${errs.join(' | ')}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0]})`); }
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
    b = clone(en); b.faces.base.kinds = ['who', 'what', 'where', 'when']; poison('P12g faces.base.kinds != the d2 chips', b, 'en', /rule 12: faces\.base\.kinds/);   // the d2 page is who/what/where (reviewer ruling 2026-09-21: the title names exactly the chips)
    // the control: the correct EN bank + every synthetic control are clean (asserted above)

    // ---- render poisons (the validator bypassed)
    const renderPoison = async (name, type, re, { difficulty = 2, strings, cfg } = {}) => {
      const c = cfg || TYPE.resolveBase(TYPE.difficulty[difficulty], en);
      let r;
      try { r = await renderWith(page, type, { difficulty, baseName: `G1-353-gate-poison-${name.split(' ')[0]}`, strings }); } catch (e) { fails++; asserts++; poisonTotal++; console.log(`  FAIL ${name}: threw before verify (${e.message.slice(0, 80)})`); return; }
      const all2 = [...r.verify, ...r.lints, ...crossCheck(r.m.rows, c.chips, en, pronEn, objEn, 'en', c)];
      const hit = all2.filter((f) => re.test(f));
      poisonTotal++;
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ')}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    await renderPoison('P13 a count mark spanning "five lambs"', mutated(TYPE, (h) => h.replace(/(<span data-lcs-mark[^>]*>)([^<]+)(<\/span>)( \p{L}+)\./u, '$1$2$4$3.')), /spans more than the number word|mark ".*" != markOf/, { difficulty: 3 });
    await renderPoison('P14 the chips reordered on one row', mutated(TYPE, (h) => { const i = h.indexOf('<div class="ws-achips"'); const j = h.indexOf('</div>', i); const seg = h.slice(i, j); const chips = seg.match(/<span class="ws-achip"[\s\S]*?<\/span>/g); return h.slice(0, i) + seg.replace(chips.join(''), chips.slice().reverse().join('')) + h.slice(j); }), /position leak/);
    await renderPoison('P18 a base page with 3 who rows', withDeps(TYPE, { d: { ...TYPE.difficulty[2], kinds: { who: 3, what: 2, where: 2 } } }), /pictureBot 0\.43 > 0\.35/);
    { const bad = clone(pronEn); bad.names.forEach((n) => { n.gender = 'f'; }); await renderPoison('P19 the male names tagged f (a girl\'s portrait under "Ben")', withDeps(TYPE, { pron: bad }), /tag mismatch/); }
    await renderPoison('P22 the row grid with column-gap:10px 12px', mutated(TYPE, (h) => h.split('grid-template-columns:30px 10px 56px 12px 1fr').join('grid-template-columns:30px 56px 1fr;column-gap:10px 12px').split('grid-column:3;').join('grid-column:2;').split('grid-column:5;').join('grid-column:3;')), /row geometry|past the lane/);
    await renderPoison('PRa a chip carrying data-lcs-correct', mutated(TYPE, (h) => h.replace('data-lcs-chip="what"', 'data-lcs-chip="what" data-lcs-correct="1"')), /carries a correct marker/);
    await renderPoison('PRb a mark inside a chip strip', mutated(TYPE, (h) => h.replace(/(<span class="ws-achip"[^>]*>)(Who)(<\/span>)/, '$1' + C4.markedSpan('Who') + '$3')), /a mark inside the chip strip|prints ".*" not its label/);
    await renderPoison('PRc a chip label printed in the sentence', mutated(TYPE, (h) => h.replace(/(<p data-lcs-sentence[^>]*>)/, '$1Who ')), /occurs in the sentence|does not open with the name/);
    await renderPoison('PRd a portrait src twice', mutated(TYPE, (h) => { const srcs = [...h.matchAll(/ src="([^"]+)"/g)].map((m) => m[1]); return h.replace(`src="${srcs[1]}"`, `src="${srcs[0]}"`); }), /src twice/);
    await renderPoison('PRe a stamped ask edited (what → who on a thing row)', mutated(TYPE, (h) => h.replace('data-lcs-kind="thing" data-lcs-ask="what"', 'data-lcs-kind="thing" data-lcs-ask="who"')), /a who row marks|mark ".*" != markOf/);
    // P22's geometry check is a positive assertion on the correct render too (d1-d3 above)
    // ================================================================ 5. the faces (Phase 2) ================================================================
    await facesSection(page, { en, pronEn, objEn, ctrlFilter });
  } finally {
    await browser.close();
  }
  console.log(`\nverify-b4-question-words: ${asserts} assertions, ${fails} failures in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${fails ? 'FAIL' : 'PASS'}`);
  console.log(`${fails ? 'FAIL' : 'PASS'} (${asserts} assertions, ${killed}/${poisonTotal} poisons killed${QUICK ? ', --quick: sweeps + synthetic-locale face renders skipped' : ''})`);
  process.exit(fails ? 1 : 0);
}

/* ------------------------------------------------------------------ 5. the faces (Phase 2; design §3; tools/b4var-rows/question-words.js) ------------------------------------------------------------------ */

const FACE_CHROME = {
  // a four-line title of ORDINARY words (the base's `four` fixture carries a 44-char word that overflows the name/date band)
  fourClean: { title: 'Kysymyssanat: ympyröi jokaisen lauseen korostetuille sanoille oikea kysymyssana tästä', instruction: CHROME.four.instruction },
  // the TALLEST en body (a one-line title + a one-line instruction, 814): the F1 sparse poison's fixture
  one: { title: 'Question Words', instruction: 'Draw the line.' },
};

/** The rendered face's stamps + geometry (page side). */
async function extractFace(page) {
  return page.evaluate(() => {
    const r = (el) => el.getBoundingClientRect();
    const text = (el) => (el ? el.textContent.replace(/[ \t\r\n]+/g, ' ').trim() : '');   // ASCII whitespace only: fr's NBSP before "?" is a literal
    const root = document.querySelector('[data-lcs-qw]');
    const body = r(document.querySelector('[data-lcs-body]'));
    const foot = r(document.querySelector('.ws-foot')).top;
    const title = document.querySelector('.ws-title');
    const out = { mode: root ? root.dataset.lcsMode : null, body: { top: body.top, bottom: body.bottom, h: body.height }, foot, rootTop: root ? r(root).top : 0, lines: Math.round(r(title).height / (30 * 1.1)) };
    let lowest = 0;
    document.querySelectorAll('.ws-body *').forEach((el) => { const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
    out.lowest = lowest;
    if (!root) return out;
    const img = (el) => { const i = el.querySelector('img'); return i ? { pic: i.dataset.lcsPic || i.dataset.lcsScenePic, kind: i.dataset.lcsPickind, depicted: i.dataset.lcsDepicted, src: i.src, w: r(i).width } : null; };
    if (out.mode === 'match') {
      const m = root.querySelector('[data-lcs-match]');
      const qs = [...m.querySelectorAll('[data-lcs-q]')], as = [...m.querySelectorAll('[data-lcs-a]')];
      out.order = (m.dataset.lcsOrder || '').split(',').map(Number);
      out.items = qs.map((q) => ({ i: +q.dataset.lcsQ, ask: q.dataset.lcsAsk, frame: q.dataset.lcsFrame, name: q.dataset.lcsName, slots: q.dataset.lcsSlots, text: text(q.querySelector('[data-lcs-match-text]')), h: r(q).height }));
      out.answers = as.map((a, p) => { const c = a.querySelector('[data-lcs-prim="clock"]'); const b = a.querySelector('[data-lcs-count-badge]'); return { p, j: +a.dataset.lcsA, kind: a.dataset.lcsKind, literal: a.dataset.lcsLiteral, pic: img(a), clockH: c ? +c.dataset.lcsH : null, clockW: c ? r(c).width : 0, badge: b ? +b.dataset.lcsCountBadge : null, h: r(a).height }; });
      const bands = (items) => items.slice(1).map((it, i) => r(it).top - r(items[i]).bottom);
      out.bands = [...bands(qs), ...bands(as)];
      out.slackUnder = body.bottom - Math.max(...[...qs, ...as].map((e) => r(e).bottom));
    } else if (out.mode === 'fill') {
      out.gapW = +root.dataset.lcsGapw;
      out.bank = [...root.querySelectorAll('[data-lcs-bank-word]')].map((w) => ({ word: w.dataset.lcsBankWord, w: r(w).width, top: r(w).top }));
      const lanes = [...root.querySelectorAll('[data-lcs-row]')];
      out.rows = lanes.map((ln) => { const q = ln.querySelector('[data-lcs-question]'); const box = ln.querySelector('[data-lcs-gapbox]'); const p = ln.querySelector('[data-lcs-sentence]'); const mk = p && p.querySelector('[data-lcs-mark]'); return { frame: ln.dataset.lcsFrame, kind: ln.dataset.lcsKind, ask: ln.dataset.lcsAsk, name: ln.dataset.lcsName, slots: ln.dataset.lcsSlots, answer: ln.dataset.lcsAnswer, rest: text(q).replace(root.dataset.lcsQprefix || '', '').trim(), text: text(p), span: mk ? mk.textContent.trim() : '', pic: img(ln), gapBoxW: box ? r(box).width : 0, h: r(ln).height }; });
      out.lastBottom = lanes.length ? Math.max(...lanes.map((l) => r(l).bottom)) : 0;
    } else if (out.mode === 'sort') {
      out.heads = [...root.querySelectorAll('[data-lcs-sorthead]')].map((h) => text(h));
      out.kinds = (root.dataset.lcsKinds || '').split(',');
      out.tiles = [...root.querySelectorAll('[data-lcs-sortword]')].map((t) => ({ text: t.dataset.lcsSortword, key: +t.dataset.lcsKey, kind: t.dataset.lcsKind, item: t.dataset.lcsFrame, textW: r(t).width - 28, top: Math.round(r(t).top) }));
      out.bins = [...root.querySelectorAll('[data-lcs-sortbin]')].map((b) => { const bin = b.querySelector('.ws-bin'); const ys = [...bin.querySelectorAll('line')].map((l) => +l.getAttribute('y1')); return { gapY: +b.dataset.lcsGapy, lines: ys.length, w: r(bin).width, h: r(bin).height, lastY: ys.length ? Math.max(...ys) : 0, bottom: r(b).bottom }; });
      const shelf = root.querySelector('[data-lcs-shelf]');
      out.shelfTop = r(shelf).top; out.shelfH = r(shelf).height;
      out.stack = Math.max(...out.bins.map((b) => b.bottom)) - out.shelfTop;
      out.slackUnder = body.bottom - Math.max(...out.bins.map((b) => b.bottom));
    } else if (out.mode === 'write') {
      out.w = +root.dataset.lcsW; out.glyphH = +root.dataset.lcsGlyphh;
      const rows = [...root.querySelectorAll('[data-lcs-row]')];
      out.rows = rows.map((ln) => { const p = ln.querySelector('[data-lcs-sentence]'); const mk = p && p.querySelector('[data-lcs-mark]'); const svg = ln.querySelector('svg[data-lcs-prim="writing-row"]'); return { frame: ln.dataset.lcsFrame, kind: ln.dataset.lcsKind, ask: ln.dataset.lcsAsk, name: ln.dataset.lcsName, slots: ln.dataset.lcsSlots, answer: ln.dataset.lcsAnswer, text: text(p), span: mk ? mk.textContent.trim() : '', pic: img(ln), svgW: svg ? r(svg).width : 0, svgH: svg ? r(svg).height : 0, printed: svg ? svg.querySelectorAll('text').length : 0, h: r(ln).height }; });
      out.lastBottom = rows.length ? Math.max(...rows.map((l) => r(l).bottom)) : 0;
    } else if (out.mode === 'ask') {
      out.time = +root.dataset.lcsTime; out.name = root.dataset.lcsName; out.person = root.dataset.lcsPerson; out.thing = root.dataset.lcsThing; out.place = root.dataset.lcsPlace;
      const scene = root.querySelector('[data-lcs-ask-scene]'), lane = root.querySelector('[data-lcs-starters]');
      out.tiles = [...scene.querySelectorAll('[data-lcs-scene-tile]')].map((t) => ({ tile: t.dataset.lcsSceneTile, pic: img(t), w: r(t).width }));
      const c = scene.querySelector('[data-lcs-prim="clock"]');
      out.clockH = c ? +c.dataset.lcsH : null; out.clockW = c ? r(c).width : 0; out.clockPx = c ? Math.min(...[...c.querySelectorAll('text')].map((t) => parseFloat(getComputedStyle(t).fontSize))) : 0;
      out.starters = [...lane.querySelectorAll('[data-lcs-starter]')].map((t) => text(t));
      out.starterPx = [...lane.querySelectorAll('[data-lcs-starter]')].map((t) => +t.dataset.lcsStarterPx);
      out.rowHs = [...lane.querySelectorAll('svg[data-lcs-prim="writing-row"]')].map((s) => r(s).height);
      out.stack = r(lane).bottom - r(scene).top; out.slackUnder = body.bottom - r(lane).bottom;
    }
    return out;
  });
}

/** Re-derive every face stamp from the banks (node side; page.evaluate cannot require). */
function crossCheckFace(x, bank, pron, objForms, loc) {
  const out = [];
  const byName = new Map(pron.names.map((n) => [n.name, n]));
  const byPic = new Map(pron.people.map((p) => [`${p.pic.theme}/${p.pic.noun}`, p]));
  const byKey = new Map(pron.people.map((p) => [p.key, p]));
  const frames = new Map(bank.frames.map((f) => [f.id, f]));
  const ctxOf = (f, row, L) => {
    let slots = {};
    try { slots = JSON.parse(row.slots || '{}'); } catch (e) { out.push(`${L}: slots json`); return null; }
    const name = byName.get(row.name);
    if (!name) { out.push(`${L}: name "${row.name}" is not in the pronouns bank`); return null; }
    const ctx = { name, loc };
    if (f.kind === 'thing' || f.kind === 'count') { const forms = objForms[slots.key]; if (!forms) { out.push(`${L}: thing "${slots.key}" has no objForms`); return null; } ctx.thing = { key: slots.key, forms, pic: TYPE.pinThing(slots.key, loc, bank) }; }
    if (f.kind === 'place') { const p = bank.places.find((q) => q.key === slots.key); if (!p) { out.push(`${L}: place "${slots.key}"`); return null; } ctx.place = p; }
    if (f.kind === 'time') { const t = bank.times.find((q) => String(q.h) === String(slots.key)); if (!t) { out.push(`${L}: time h "${slots.key}"`); return null; } ctx.time = t; }
    if (f.kind === 'count') { const n = (bank.numbers || [2, 3, 4, 5]).find((q) => numberWord(q, loc) === slots.n); if (!Number.isInteger(n)) { out.push(`${L}: number word "${slots.n}"`); return null; } ctx.n = n; }
    return ctx;
  };
  const portraitOk = (pic, name, L, floor) => {
    if (!pic) { out.push(`${L}: no portrait`); return; }
    const p = byPic.get(pic.pic);
    if (!p) { out.push(`${L}: portrait "${pic.pic}" is not in the pronouns bank`); return; }
    if (p.depicted !== pic.depicted) out.push(`${L}: portrait stamped ${pic.depicted}, the bank says ${p.depicted}`);
    if (name && p.depicted !== name.gender) out.push(`${L}: "${name.name}" (${name.gender}) over "${pic.pic}" depicted ${p.depicted} — tag mismatch`);
    if (decodeURIComponent(pic.src) !== decodeURIComponent(fileUri(p.pic.theme, p.pic.noun))) out.push(`${L}: portrait src is not the bank's file`);
    if (pic.w < Math.max(floor, p.minPx || 0) - 0.6) out.push(`${L}: portrait ${pic.w.toFixed(1)} < ${Math.max(floor, p.minPx || 0)} (its minPx)`);
  };
  if (x.mode === 'match') {
    const byJ = new Map(x.answers.map((a) => [a.j, a]));
    const names = new Set(), lits = [];
    x.items.forEach((it) => {
      const L = `question ${it.i + 1}`;
      const f = frames.get(it.frame);
      if (!f) { out.push(`${L}: frame "${it.frame}"`); return; }
      const ctx = ctxOf(f, it, L);
      if (!ctx) return;
      if (it.ask === 'who' && !['thing', 'place'].includes(f.kind)) out.push(`${L}: the who question sits on a ${f.kind} frame (design: thing | place)`);
      let q;
      try { q = TYPE.questionOf(f, it.ask, ctx); } catch (e) { out.push(`${L}: ${e.message}`); return; }
      if (q !== it.text) out.push(`${L}: rendered "${it.text}" != questionOf "${q}"`);
      const a = byJ.get(it.i);
      if (!a) { out.push(`${L}: no answer item ${it.i}`); return; }
      const A = `answer ${it.i + 1}`;
      const want = it.ask === 'who' ? ctx.name.name : TYPE.markOf(f, it.ask, ctx);
      if (a.literal !== want) out.push(`${A}: literal "${a.literal}" != the filled slot "${want}"`);
      if (a.kind !== it.ask) out.push(`${A}: kind ${a.kind} != the question's ask ${it.ask}`);
      lits.push(want); names.add(it.name);
      if (it.ask === 'who') portraitOk(a.pic, ctx.name, A, 88);
      else if (it.ask === 'what' || it.ask === 'howmany') { const pin = ctx.thing.pic; if (!a.pic || !pin || `${pin.theme}/${pin.noun}` !== a.pic.pic) out.push(`${A}: thing picture "${a.pic && a.pic.pic}" != pinThing ${pin && pin.theme + '/' + pin.noun}`); if (it.ask === 'howmany' && a.badge !== ctx.n) out.push(`${A}: badge ${a.badge} != n ${ctx.n}`); if (a.pic && decodeURIComponent(a.pic.src) !== decodeURIComponent(fileUri(pin.theme, pin.noun))) out.push(`${A}: thing src is not the pinned file`); }
      else if (it.ask === 'where') { const p = ctx.place; if (!a.pic || `${p.pic.theme}/${p.pic.noun}` !== a.pic.pic) out.push(`${A}: place picture "${a.pic && a.pic.pic}" != the bank's`); }
      else if (it.ask === 'when') { if (a.clockH !== ctx.time.h) out.push(`${A}: clock ${a.clockH} != the time's h ${ctx.time.h}`); if (a.clockW < 88 - 0.6) out.push(`${A}: clock ${a.clockW.toFixed(0)} < 88`); }
    });
    // the picture-bot over the QUESTION side (the load-bearing act): no picture -> 0
    const botLeft = 0;
    if (botLeft > 0.35) out.push(`question-side pictureBot ${botLeft}`);
    if (names.size !== x.items.length) out.push('a name twice');
    if (new Set(lits.map(nfd)).size !== lits.length) out.push('an answer literal twice');
    if (x.order.join(',') !== x.answers.map((a) => a.j).join(',')) out.push('order stamp != the rendered order');
  } else if (x.mode === 'fill') {
    const want = TYPE.gapWidthOf(bank, QW_KEYS);
    if (x.gapW !== want) out.push(`gapW ${x.gapW} != the formula ${want} (1.6 x widest bank word + 24, clamped 110..220)`);
    const bankSet = x.bank.map((b) => b.word).sort().join('|');
    if (bankSet !== QW_KEYS.map((k) => bank.qwords[k]).sort().join('|')) out.push(`bank ${bankSet} != the qwords table`);
    if (bank.bankWidths) x.bank.forEach((b) => { const t = bank.bankWidths[b.word]; if (t != null && Math.abs(b.w - 32 - t) > 3) out.push(`bank word "${b.word}" text measures ${(b.w - 32).toFixed(1)}, bankWidths says ${t}`); });
    x.rows.forEach((row, i) => {
      const L = `lane ${i + 1}`;
      const f = frames.get(row.frame);
      if (!f) { out.push(`${L}: frame "${row.frame}"`); return; }
      const ctx = ctxOf(f, row, L);
      if (!ctx) return;
      let text, span, q, rest;
      try { text = TYPE.fillFrame(f, ctx); span = TYPE.markOf(f, row.ask, ctx); q = TYPE.questionOf(f, row.ask, ctx); rest = TYPE.gapOf(bank, q, row.ask); } catch (e) { out.push(`${L}: ${e.message}`); return; }
      if (text !== row.text) out.push(`${L}: rendered "${row.text}" != fillFrame "${text}"`);
      if (span !== row.span) out.push(`${L}: mark "${row.span}" != markOf "${span}"`);
      if (rest !== row.rest) out.push(`${L}: rest "${row.rest}" != gapOf "${rest}"`);
      if (row.answer !== bank.qwords[row.ask]) out.push(`${L}: answer "${row.answer}" != qwords.${row.ask}`);
      if (Math.abs(row.gapBoxW - want) > 1) out.push(`${L}: gap box ${row.gapBoxW.toFixed(1)} != ${want}`);
      portraitOk(row.pic, ctx.name, L, 44);
    });
    const bot = TYPE.pictureBot(x.rows.map((rw) => ({ picKind: rw.pic && rw.pic.kind, ask: rw.ask })));
    if (bot > 0.35 + 1e-9) out.push(`pictureBot ${bot.toFixed(2)} > 0.35`);
  } else if (x.mode === 'sort') {
    x.kinds.forEach((k, i) => { if (x.heads[i] !== bank.bins[k]) out.push(`head ${i + 1} "${x.heads[i]}" != bins.${k} "${bank.bins[k]}"`); });
    const V = vocab();
    x.tiles.forEach((t, i) => {
      const L = `tile ${i + 1} "${t.text}"`;
      const wantKey = x.kinds.indexOf(t.kind);
      if (t.key !== wantKey) out.push(`${L}: key ${t.key} != the ${t.kind} bin ${wantKey}`);
      if (t.kind === 'who') { if (!byName.has(t.text)) out.push(`${L}: a name tile that is not a tagged name`); }
      else if (t.kind === 'what') { const forms = objForms[t.item]; const wantT = forms ? TYPE.tileTextOf({ key: t.item, forms }, loc, bank) : null; if (wantT !== t.text) out.push(`${L}: != the ${bank.sortThingForm || 'bare'} form of "${t.item}" (${wantT})`); if (!V[t.item] || !V[t.item][loc]) out.push(`${L}: "${t.item}" has no vocab entry in ${loc}`); }
      else if (t.kind === 'where') { const p = bank.places.find((q) => q.key === t.item); if (!p || p.text !== t.text) out.push(`${L}: != places.${t.item}.text (${p && p.text})`); }
      else out.push(`${L}: kind "${t.kind}"`);
      if (TYPE.tileEst(t.text) > TYPE.TILE_GUARD) out.push(`${L}: over the authoring tile guard (${TYPE.tileEst(t.text)} > ${TYPE.TILE_GUARD})`);
    });
    if (TYPE.shelfRowsEst(x.tiles.map((t) => t.text)) > 2) out.push('the composer let a 3-row shelf through');
  } else if (x.mode === 'write') {
    x.rows.forEach((row, i) => {
      const L = `row ${i + 1}`;
      const f = frames.get(row.frame);
      if (!f) { out.push(`${L}: frame "${row.frame}"`); return; }
      const ctx = ctxOf(f, row, L);
      if (!ctx) return;
      let text, span, q;
      try { text = TYPE.fillFrame(f, ctx); span = TYPE.markOf(f, row.ask, ctx); q = TYPE.questionOf(f, row.ask, ctx); } catch (e) { out.push(`${L}: ${e.message}`); return; }
      if (text !== row.text) out.push(`${L}: rendered "${row.text}" != fillFrame "${text}"`);
      if (span !== row.span) out.push(`${L}: mark "${row.span}" != markOf "${span}"`);
      if (q !== row.answer) out.push(`${L}: answer stamp "${row.answer}" != questionOf "${q}"`);
      if (TYPE.need(q) > row.svgW + 0.6) out.push(`${L}: the ruling ${row.svgW.toFixed(0)} < need ${TYPE.need(q)}`);
      if (row.printed) out.push(`${L}: ${row.printed} text nodes on the ruling`);
      portraitOk(row.pic, ctx.name, L, 36);
    });
    const bot = TYPE.pictureBot(x.rows.map((rw) => ({ picKind: rw.pic && rw.pic.kind, ask: rw.ask })));
    if (bot > 0.35 + 1e-9) out.push(`pictureBot ${bot.toFixed(2)} > 0.35`);
  } else if (x.mode === 'ask') {
    const name = byName.get(x.name), person = byKey.get(x.person);
    if (!name) out.push(`name "${x.name}" is not in the pronouns bank`);
    if (!person) out.push(`person "${x.person}" is not in the pronouns bank`);
    const tile = (k) => x.tiles.find((t) => t.tile === k);
    if (name && person) { if (person.depicted !== name.gender) out.push(`"${x.name}" (${name.gender}) over ${x.person} depicted ${person.depicted}`); const t = tile('person'); if (!t || !t.pic || t.pic.pic !== `${person.pic.theme}/${person.pic.noun}`) out.push('the portrait tile is not the person\'s file'); }
    const pin = TYPE.pinThing(x.thing, loc, bank); const tt = tile('thing');
    if (!pin || !tt || !tt.pic || tt.pic.pic !== `${pin.theme}/${pin.noun}`) out.push(`the thing tile "${tt && tt.pic && tt.pic.pic}" != pinThing(${x.thing})`);
    const pl = bank.places.find((q) => q.key === x.place); const tp = tile('place');
    if (!pl || !tp || !tp.pic || tp.pic.pic !== `${pl.pic.theme}/${pl.pic.noun}`) out.push(`the place tile != places.${x.place}`);
    if (!bank.times.some((t) => t.h === x.time)) out.push(`time ${x.time} is not a bank time`);
    if (x.clockH !== x.time) out.push(`clock ${x.clockH} != the scene time ${x.time}`);
    if (x.starters.join(',') !== bank.starters.join(',')) out.push(`starters ${x.starters.join(',')} != the bank's ${bank.starters.join(',')}`);
    if (x.starterPx.some((p) => p !== x.starterPx[0])) out.push('starter sizes differ across rows');
  }
  return out;
}

async function facesSection(page, { en, pronEn, objEn, ctrlFilter }) {
  if (Object.keys(SPECS).length !== 5) { ok(false, `faces: ${Object.keys(SPECS).length} of 5 emitted specs on disk (run tools/gen-b4var-specs.js)`); return; }
  console.log('\n---- 5. the faces (Phase 2)');
  const faceIds = Object.fromEntries(Object.entries(SPECS).map(([f, sp]) => [f, sp.id]));
  ok(faceIds.match === 'G1-373' && faceIds.fill === 'G1-374' && faceIds.sort === 'G1-375' && faceIds.write === 'G2-356' && faceIds.ask === 'G2-357', `face ids ${JSON.stringify(faceIds)} (the allocation)`);
  ok(SPECS.write.gradeBand === 'G2' && SPECS.ask.gradeBand === 'G2' && SPECS.match.gradeBand === 'G1' && SPECS.fill.gradeBand === 'G1' && SPECS.sort.gradeBand === 'G1', 'face bands: F4 + F5 G2, F1-F3 G1');
  for (const f of Object.keys(SPECS)) ok(SPECS[f].themeAxis && SPECS[f].themeAxis.applicable === false && SPECS[f].difficulty[2].mode === f, `${SPECS[f].id}: themeless, mode "${f}"`);
  // every picture a face can draw exists on disk (cache/themes-512/<theme>/<noun>@3x.webp, the substrate's path): the 133-key
  // thing pool (F1 answers / F5 scene), the 15 places, the 32 portraits — all OPENED on out/dev/G1-353-faces-pictures.png
  { const pool = TYPE.thingPool('en', en, objEn); const missing = [...pool.filter((p) => !fileExists(p.pic.theme, p.pic.noun)).map((p) => 'thing ' + p.key), ...en.places.filter((p) => !fileExists(p.pic.theme, p.pic.noun)).map((p) => 'place ' + p.key), ...pronEn.people.filter((p) => !fileExists(p.pic.theme, p.pic.noun)).map((p) => 'portrait ' + p.key)]; ok(pool.length >= 100 && missing.length === 0, `faces: ${missing.length} of ${pool.length + en.places.length + pronEn.people.length} pictures missing on disk (${missing.slice(0, 5).join(', ')})`); }
  const lines4 = (await renderWith(page, TYPE, { baseName: 'G1-353-gate-titlelines', strings: { title: FACE_CHROME.fourClean.title, instruction: 'x' } })).m.lines;
  ok(lines4 === 4, `the faces' 677 fixture title wraps to ${lines4} lines, want 4`);

  const faceRender = async (face, { type = SPECS[face], bank = en, pron = pronEn, objForms = objEn, loc = 'en', strings, baseName, expectFail = null, label } = {}) => {
    const r = await renderWith(page, type, { difficulty: 2, baseName: baseName || `${SPECS[face].id}-gate-d2-${loc}`, strings, locale: loc });
    const x = await extractFace(page);
    const cc = crossCheckFace(x, bank, pron, objForms, loc);
    const tag = label || `${SPECS[face].id} ${face} ${loc}${strings ? ' ' + (strings === CHROME.three ? '3+3' : strings === FACE_CHROME.fourClean ? '677' : 'one-line') : ''}`;
    if (expectFail) { const all2 = [...r.verify, ...r.lints, ...cc]; ok(all2.some((m) => expectFail.test(m)), `${tag}: expected ${expectFail}, got ${JSON.stringify(all2)}`); }
    else {
      ok(x.mode === face, `${tag}: mode "${x.mode}"`);
      ok(r.verify.length === 0, `${tag}: verify ${JSON.stringify(r.verify)}`);
      ok(r.lints.length === 0, `${tag}: lints ${JSON.stringify(r.lints)}`);
      ok(cc.length === 0, `${tag}: node cross-check ${cc.join(' | ')}`);
      ok(x.lowest <= x.foot + 0.6, `${tag}: lowest ink ${Math.round(x.lowest)} vs foot ${Math.round(x.foot)}`);
    }
    return { r, x, cc };
  };
  const summary = (x) => {
    if (x.mode === 'match') return `items ${x.items.map((i) => Math.round(i.h)).join('/')} bands ${x.bands.map((b) => Math.round(b)).join('/')} slack-under ${Math.round(x.slackUnder)} order ${x.order.join('')}`;
    if (x.mode === 'fill') return `gapW ${x.gapW} lanes ${x.rows.map((rw) => Math.round(rw.h)).join('/')} bank ${x.bank.map((b) => b.word).join('/')}`;
    if (x.mode === 'sort') return `stack ${Math.round(x.stack)} shelf ${Math.round(x.shelfH)} bins ${x.bins.map((b) => b.lines + '@' + b.gapY + ' ' + Math.round(b.h)).join(' ')} slack-under ${Math.round(x.slackUnder)}`;
    if (x.mode === 'write') return `rows ${x.rows.map((rw) => Math.round(rw.h)).join('/')} ruling ${Math.round(x.rows[0].svgW)} x ${Math.round(x.rows[0].svgH)}`;
    if (x.mode === 'ask') return `stack ${Math.round(x.stack)} rows ${x.rowHs.map((h) => Math.round(h)).join('/')} starter ${x.starterPx[0]} px clock ${x.clockPx} px slack-under ${Math.round(x.slackUnder)}`;
    return '';
  };

  // ---- 5a. every face at d2 en: the default chrome, the 3+3 (710) chrome, the fi four-line 677 chrome (every face FITS)
  for (const face of Object.keys(SPECS)) {
    const a = await faceRender(face);
    const b = await faceRender(face, { strings: CHROME.three, baseName: `${SPECS[face].id}-gate-d2-en-chrome722` });
    ok(b.x.body.h <= 724 && b.x.body.h >= 700, `${face} 3+3 chrome: body ${Math.round(b.x.body.h)} (measured 710)`);
    const c = await faceRender(face, { strings: FACE_CHROME.fourClean, baseName: `${SPECS[face].id}-gate-d2-en-chrome677` });
    ok(c.x.body.h <= 690 && c.x.body.h >= 660, `${face} 677 chrome: body ${Math.round(c.x.body.h)}`);
    console.log(`render ${SPECS[face].id} ${face} en: verify ${a.r.verify.length} lints ${a.r.lints.length} cross ${a.cc.length} body ${Math.round(a.x.body.h)} ${summary(a.x)} · 3+3 body ${Math.round(b.x.body.h)} ${summary(b.x)} · 677 body ${Math.round(c.x.body.h)} ${summary(c.x)}`);
    // the face-specific floors + measured numbers (design §3, re-measured)
    if (face === 'match') {
      for (const y of [a, b, c]) { ok(y.x.items.every((i) => i.h >= 100 - 0.6 && i.h <= 120 + 0.6), `match: items ${y.x.items.map((i) => i.h.toFixed(0)).join('/')} in [100, 120]`); ok(Math.max(...y.x.bands) <= 44.6, `match: bands ${y.x.bands.map((v) => v.toFixed(0)).join('/')} <= 44`); ok(y.x.slackUnder <= 50.6, `match: slack under ${y.x.slackUnder.toFixed(0)} <= 50`); }
      ok(a.x.answers.every((an) => (an.pic ? an.pic.w >= 88 - 0.6 : an.clockW >= 88 - 0.6)), 'match: every answer picture / clock >= 88');
      ok(a.x.answers.filter((an) => an.kind === 'howmany').every((an) => an.badge >= 2 && an.badge <= 5), 'match: the count badge shows n in 2..5');
    }
    if (face === 'fill') {
      for (const y of [a, b, c]) { ok(Math.abs(y.x.body.bottom - y.x.lastBottom) <= 3, `fill: the lanes end ${(y.x.body.bottom - y.x.lastBottom).toFixed(1)} px above the body bottom`); ok(y.x.rows.every((rw) => rw.h >= 84 - 0.6), `fill: lanes ${y.x.rows.map((rw) => rw.h.toFixed(0)).join('/')} >= 84`); }
      ok(a.x.gapW === 170, `fill: en gapW ${a.x.gapW} (the design's 170 from "How many" 91.2)`);
      ok(new Set(a.x.bank.map((w) => Math.round(w.top))).size === 1, 'fill: the 5-pill bank on one row');
      ok(a.x.rows.every((rw) => rw.pic && rw.pic.w >= 56 - 0.6), 'fill: portraits 56');
    }
    if (face === 'sort') {
      for (const y of [a, b, c]) { ok(Math.abs(y.x.stack - 677) <= 4, `sort: stack ${y.x.stack.toFixed(1)} (fixed 677)`); ok(y.x.slackUnder <= 180 && y.x.slackUnder >= -0.6, `sort: slack under the bins ${y.x.slackUnder.toFixed(0)} (<= 180)`); ok(Math.abs(y.x.shelfH - 122) <= 2, `sort: shelf ${y.x.shelfH.toFixed(1)} (2 rows = 122)`); }
      ok(a.x.bins.every((bn) => Math.abs(bn.w - 201) <= 1 && Math.abs(bn.h - 491) <= 1 && bn.lines === 8 && bn.gapY === 55 && bn.h - bn.lastY <= 64), `sort: bins ${a.x.bins.map((bn) => bn.w.toFixed(0) + 'x' + bn.h.toFixed(0) + ' ' + bn.lines + '@' + bn.gapY + ' last ' + (bn.h - bn.lastY).toFixed(0)).join(' | ')} (201 x 491, 8 lines at 55, the last within 64 of the bottom)`);
      ok(a.x.tiles.every((t) => t.textW <= 124.6), `sort: tile texts ${a.x.tiles.map((t) => t.textW.toFixed(0)).join('/')} <= 124`);
      ok(new Set(a.x.tiles.map((t) => t.top)).size === 2, 'sort: the shelf is exactly 2 rows');
    }
    if (face === 'write') {
      for (const y of [a, b, c]) { ok(Math.abs(y.x.body.bottom - y.x.lastBottom) <= 3, `write: the rows end ${(y.x.body.bottom - y.x.lastBottom).toFixed(1)} px above the body bottom`); ok(y.x.rows.every((rw) => rw.h >= 78 - 0.6), `write: rows ${y.x.rows.map((rw) => rw.h.toFixed(0)).join('/')} >= 78`); }
      ok(a.x.rows.every((rw) => Math.abs(rw.svgW - 575) <= 0.6 && Math.abs(rw.svgH - 48) <= 0.6), `write: rulings ${a.x.rows[0].svgW.toFixed(0)} x ${a.x.rows[0].svgH.toFixed(0)} (575 x 48)`);
      ok(a.x.rows.every((rw) => rw.pic && rw.pic.w >= 48 - 0.6), 'write: portraits 48');
    }
    if (face === 'ask') {
      for (const y of [a, b, c]) { ok(y.x.stack >= 660 && y.x.stack <= 677, `ask: stack ${y.x.stack.toFixed(1)} in [660, 677]`); ok(y.x.slackUnder <= 180 && y.x.slackUnder >= -0.6, `ask: slack under ${y.x.slackUnder.toFixed(0)} (<= 180)`); }
      ok(a.x.rowHs.length === 6 && a.x.rowHs.every((h) => Math.abs(h - 72) <= 0.6), `ask: rulings ${a.x.rowHs.map((h) => h.toFixed(0)).join('/')} (72)`);
      ok(a.x.starterPx[0] === 29.5, `ask: starter font ${a.x.starterPx[0]} px (the measured metrics at glyphH 26)`);
      ok(a.x.clockPx >= 13 && a.x.clockW >= 120 - 0.6, `ask: clock ${a.x.clockW.toFixed(0)} px, numerals ${a.x.clockPx} px (120 -> 14)`);
      ok(a.x.tiles.every((t) => Math.abs(t.w - 132) <= 0.6), 'ask: four 132 px tiles');
    }
  }

  // ---- 5b. the synthetic locale blocks through every face (structure; the real blocks are the panels'): es "¿", fr NBSP, fi {part}, sv definite, de acc
  if (!QUICK) {
    for (const loc of ['de', 'es', 'fr', 'sv', 'fi']) {
      const objForms = objFormsOf(loc);
      if (!Object.keys(objForms).length) { console.log(`synthetic ${loc}: no objForms — skipped`); continue; }
      const block = synthetic(loc, en);
      for (const face of Object.keys(SPECS)) {
        const t = withDeps(SPECS[face], { bank: block, pron: pronEn, objForms });
        let a;
        try { a = await faceRender(face, { type: t, bank: block, objForms, loc, baseName: `${SPECS[face].id}-gate-d2-${loc}-synthetic` }); }
        catch (e) { ok(false, `synthetic ${loc} ${face}: threw ${e.message.slice(0, 120)}`); continue; }
        console.log(`render synthetic ${loc} ${face}: verify ${a.r.verify.length} lints ${a.r.lints.length} cross ${a.cc.length} ${summary(a.x)}`);
        if (face === 'fill') ok(a.x.gapW === Math.min(220, Math.max(110, Math.round(1.6 * Math.max(...Object.values(block.bankWidths)) + 24))), `synthetic ${loc} fill: gapW ${a.x.gapW}`);
        if (face === 'match' && loc === 'es') ok(a.x.items.every((it) => it.text.startsWith('¿')), 'synthetic es match: every question opens "¿"');
        if (face === 'fill' && loc === 'es') ok(a.x.rows.every((rw) => !rw.rest.startsWith('¿')), 'synthetic es fill: the rest is printed after the "¿" + box');
        if (face === 'write' && loc === 'fr') ok(a.x.rows.every((rw) => / \?$/.test(rw.answer)), 'synthetic fr write: every answer ends NBSP + "?"');
      }
    }
  }

  // ---- 5c. the 20-seed sweep per face (build only)
  if (!QUICK) {
    for (const face of Object.keys(SPECS)) {
      const sp = SPECS[face];
      const sets = new Set(), orders = new Set();
      let bankFixed = 0;
      const fixed = QW_KEYS.map((k) => en.qwords[k]).join('|');
      for (let s = 1; s <= 20; s++) {
        const rng = makeRng(instanceSeed({ typeId: sp.id, theme: null, difficulty: 2, seedEpoch: 1, variant: s }));
        let b;
        try { b = sp.build({ theme: null, difficulty: 2, locale: 'en' }, { rng }); } catch (e) { ok(false, `sweep ${face} seed ${s}: ${e.message.slice(0, 100)}`); continue; }
        const m = b.meta;
        if (face === 'match') { sets.add(m.rows.map((rw) => rw.frame + ':' + rw.name).sort().join(',')); orders.add(m.rows.map((rw) => rw.ask).join(',') + '#' + m.order.join('')); ok(new Set(m.rows.map((rw) => rw.ask)).size === 5, `sweep match seed ${s}: five distinct kinds`); ok(m.rows.every((rw) => !m.rows.some((o) => hasWord(rw.question, o.answer))), `sweep match seed ${s}: an answer literal inside a question`); }
        if (face === 'fill') { sets.add(m.rows.map((rw) => rw.frame + ':' + rw.name).sort().join(',')); orders.add(m.bankOrder.join('|')); if (m.bankOrder.join('|') === fixed) bankFixed++; const hist = {}; m.rows.forEach((rw) => { hist[rw.ask] = (hist[rw.ask] || 0) + 1; }); ok(QW_KEYS.every((k) => hist[k] >= 1 && hist[k] <= 2), `sweep fill seed ${s}: asks ${JSON.stringify(hist)}`); }
        if (face === 'sort') { sets.add(m.tiles.map((t) => t.text).sort().join(',')); orders.add(m.tiles.map((t) => t.text).join(',')); ok([0, 1, 2].every((k) => m.tiles.filter((t) => t.key === k).length === 3), `sweep sort seed ${s}: 3 per bin`); }
        if (face === 'write') { sets.add(m.rows.map((rw) => rw.frame + ':' + rw.name).sort().join(',')); orders.add(m.rows.map((rw) => rw.frame + ':' + rw.name).join(',')); ok(m.rows.every((rw) => glyphs(rw.answer) <= 31 && TYPE.need(rw.answer) <= 575), `sweep write seed ${s}: an answer over 31 / 575`); }
        if (face === 'ask') { sets.add([m.name, m.thing, m.place, m.time].join(':')); orders.add([m.person, m.time].join(':')); }
        for (const k of ['name', 'person', 'frame']) if (m.rows) { const v = m.rows.map((rw) => rw[k]); ok(new Set(v).size === v.length, `sweep ${face} seed ${s}: a ${k} twice`); }
      }
      ok(sets.size >= 2 && orders.size >= 2, `sweep ${face}: ${sets.size} distinct sets / ${orders.size} orders over 20 seeds`);
      if (face === 'fill') ok(bankFixed === 0, `sweep fill: the bank equals the fixed order on ${bankFixed} seeds (want 0)`);
      console.log(`sweep ${face}: 20 seeds, ${sets.size} distinct sets, ${orders.size} distinct orders${face === 'fill' ? ', bank never in the fixed order' : ''}`);
    }
  }

  // ---- 5d. face poisons — config guards (a thrown refusal), bank rules, render + sparse + node poisons; the correct renders above are the controls
  const D = Object.fromEntries(Object.entries(SPECS).map(([f, sp]) => [f, sp.difficulty[2]]));
  const cfgPoison = (name, fn, re) => { let m = null; try { fn(); } catch (e) { m = e.message; } poisonTotal++; if (m && re.test(m)) { killed++; asserts++; console.log(`  poison ${name}: killed (${m.slice(0, 110)})`); } else { fails++; asserts++; console.log(`  FAIL ${name}: ${m ? 'WRONG REASON — ' + m : 'SILENT (no refusal)'}`); } };
  cfgPoison('PC1 match a kind twice', () => TYPE.resolveMatch({ ...D.match, kinds: ['who', 'who', 'what', 'where', 'when'] }, en), /a kind twice/);
  cfgPoison('PC2 match picPx 64 with a when answer', () => TYPE.resolveMatch({ ...D.match, picPx: 64 }, en), /clock floor/);
  cfgPoison('PC3 match itemMax 200 (> itemH + 44)', () => TYPE.resolveMatch({ ...D.match, itemMax: 200 }, en), /itemMax 200/);
  cfgPoison('PC4 fill bank:false (the unbuilt d3)', () => TYPE.resolveFill({ ...D.fill, bank: false }, en), /bank-less d3/);
  cfgPoison('PC5 fill maxRest 60 (the question line guard)', () => TYPE.resolveFill({ ...D.fill, maxRest: 60 }, en), /maxRest 60/);
  cfgPoison('PC6 sort a when bin', () => TYPE.resolveSort({ ...D.sort, bins: ['who', 'what', 'where', 'when'], perBin: 3, tiles: 12 }, en), /when bin/);
  cfgPoison('PC7 sort stack 600 (< 660)', () => TYPE.resolveSort({ ...D.sort, stack: 600 }, en), /stack 600/);
  cfgPoison('PC8 write bank:true', () => TYPE.resolveWrite({ ...D.write, bank: true }, en), /a bank on the write face/);
  cfgPoison('PC9 write glyphH 20', () => TYPE.resolveWrite({ ...D.write, glyphH: 20 }, en), /glyphH 20/);
  cfgPoison('PC10 ask a howmany starter', () => TYPE.resolveAsk({ ...D.ask, starters: ['who', 'what', 'where', 'when', 'howmany', 'how'] }, en), /starter "howmany"/);
  cfgPoison('PC11 ask h 40 (< glyphH + 20)', () => TYPE.resolveAsk({ ...D.ask, h: 40 }, en), /below the G2 writing floor/);
  // bank rules
  const bankPoison = (name, block, re) => { const errs = validateBank(block, 'en', { pron: pronEn }).filter(ctrlFilter); const hit = errs.filter((e) => re.test(e)); poisonTotal++; if (!errs.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); } else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${errs.join(' | ')}`); } else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0]})`); } };
  let b;
  b = clone(en); b.strings.sort.title = 'Sort the Answers: Who, What or When'; bankPoison('PB1 the sort title lists When (the bins are who/what/where)', b, /rule 9: sort title .* lists .* but the d2 page shows who,what,where/);
  b = clone(en); b.strings.ask.title = 'Ask About the Picture: Why and When'; bankPoison('PB2 the ask title names Why and When', b, /rule 9: ask title .* names/);
  b = clone(en); b.strings.base.title = 'Question Words: Who, What, Where, When'; bankPoison('PB3 the base title lists a 4th chip', b, /rule 9: base title .* lists who,what,where,when|!= the measured head/);
  b = clone(en); b.strings.write.instruction = 'Write the question: Who, What, Where, When or Why.'; bankPoison('PB4 the write instruction names Why (not on its page)', b, /rule 9: write instruction names "why"/);
  b = clone(en); b.bankWidths['How many'] = 5; bankPoison('PB5 bankWidths out of range', b, /rule 12: bankWidths\."How many" = 5/);
  b = clone(en); b.faces.sort.kinds = ['who', 'what', 'where', 'when']; bankPoison('PB6 faces.sort.kinds != the G1-375 config', b, /rule 12: faces\.sort\.kinds .* != the G1-375 d2 config/);
  // render poisons
  const facePoison = async (name, face, mutate, re, { type, bank, pron, objForms, loc = 'en', strings, d } = {}) => {
    let t = type || SPECS[face];
    if (d) t = withDeps(t, { bank, pron, objForms, d: { ...t.difficulty[2], ...d } });
    else if (bank || pron || objForms) t = withDeps(t, { bank, pron, objForms });
    if (mutate) t = mutated(t, mutate);
    let r, x, cc;
    try { r = await renderWith(page, t, { difficulty: 2, baseName: `${SPECS[face].id}-gate-poison-${name.split(' ')[0]}`, strings, locale: loc }); x = await extractFace(page); cc = crossCheckFace(x, bank || en, pronEn, objForms || objEn, loc); }   // the cross-check reads the REAL pronouns bank: a pron poison must disagree with it
    catch (e) { poisonTotal++; if (re.test(e.message)) { killed++; asserts++; console.log(`  poison ${name}: killed at build (${e.message.slice(0, 110)})`); } else { fails++; asserts++; console.log(`  FAIL ${name}: threw for another reason (${e.message.slice(0, 110)})`); } return; }
    const all2 = [...r.verify, ...r.lints, ...cc];
    const hit = all2.filter((m) => re.test(m));
    poisonTotal++;
    if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
    else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ').slice(0, 300)}`); }
    else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0].slice(0, 120)})`); }
  };
  const must = (h, a, bb, tag) => { if (!h.includes(a)) throw new Error(`${tag}: mutation anchor missing (${a.slice(0, 50)})`); return h.replace(a, bb); };
  // F1 match
  await facePoison('P15 F1 two who questions', 'match', (h) => { const m = /data-lcs-q="(\d)" data-lcs-ask="what"/.exec(h); if (!m) throw new Error('P15: no what question'); return h.replace(m[0], `data-lcs-q="${m[1]}" data-lcs-ask="who"`); }, /a kind asked twice|right kinds .* != the left asks/);
  await facePoison('P15b F1 the right column not deranged (the first answer claims question 1)', 'match', (h) => { const m = /<div class="ws-match-item ws-match-item--plain" data-lcs-a="(\d)"/.exec(h); if (!m) throw new Error('P15b'); return h.replace(m[0], () => m[0].replace('data-lcs-a="' + m[1] + '"', 'data-lcs-a="0"')); }, /not deranged|order stamp differs/);
  await facePoison('P15c F1 an answer literal printed in a question', 'match', (h) => { const lit = /data-lcs-kind="who" data-lcs-literal="([^"]+)"/.exec(h); if (!lit) throw new Error('P15c'); return h.replace(/(data-lcs-q="0"[^>]*>\s*<span data-lcs-match-text[^>]*>)/, `$1${lit[1]} `); }, /carries the answer literal|!= questionOf/);
  await facePoison('P15d F1 a picture on the question side', 'match', (h) => { const img = /<img class="ws-icon"[^>]*>/.exec(h); return h.replace(/(data-lcs-q="1"[^>]*>)/, `$1${img[0]}`); }, /a picture on the question side/);
  await facePoison('P15e F1 a person picture on a what answer', 'match', (h) => must(h, 'data-lcs-pickind="thing"', 'data-lcs-pickind="person" data-lcs-depicted="m"', 'P15e'), /a person picture on a (what|howmany) answer/);
  await facePoison('PS1 F1 items fixed at 100 under a one-line chrome (the design\'s space-around: bands 60)', 'match', (h) => h.split('max-height:120px;flex:1 1 auto;').join(''), /px between (question|answer) items .* \(> 44: sparse\)|slack under the last/, { strings: FACE_CHROME.one });
  await facePoison('PN1 F1 a literal stamp edited', 'match', (h) => { const m = /data-lcs-kind="who" data-lcs-literal="([^"]+)"/.exec(h); return h.replace(m[0], `data-lcs-kind="who" data-lcs-literal="Nobody"`); }, /literal "Nobody" != the filled slot|prints ".*" not its literal/);
  // F2 fill
  await facePoison('P16 F2 the question word printed in the question line', 'fill', (h) => { const m = /data-lcs-answer="([^"]+)"[^>]*>[\s\S]*?<p data-lcs-question[^>]*>/.exec(h); if (!m) throw new Error('P16'); return h.replace(m[0], m[0] + m[1] + ' '); }, /is printed in the question line|text before the box/);
  await facePoison('P16b F2 the bank in the fixed order', 'fill', (h) => { const words = [...h.matchAll(/<span class="ws-bankword"[\s\S]*?<\/span><\/span>/g)].map((m) => m[0]); const byWord = new Map(words.map((w) => [/data-lcs-bank-word="([^"]+)"/.exec(w)[1], w])); const fixed = QW_KEYS.map((k) => byWord.get(en.qwords[k])).join(''); return h.replace(words.join(''), fixed); }, /fixed qwords order \(position leak\)/);
  await facePoison('P16c F2 a per-row gap width (one box 120)', 'fill', (h) => h.replace('width:170px;height:40px', 'width:120px;height:40px'), /gap box 120.* != the page gapW 170/);
  await facePoison('P16d F2 a bank word missing', 'fill', (h) => { const w = /<span class="ws-bankword"[\s\S]*?<\/span><\/span>/.exec(h); return h.replace(w[0], ''); }, /bank words .* != the qwords table|bank .* != the qwords table/);
  await facePoison('P16e F2 3 who rows of 7 (pictureBot 0.43)', 'fill', null, /pictureBot 0\.43 > 0\.35/, { d: { rows: 7, kinds: { who: 3, what: 1, where: 1, when: 1, howmany: 1 }, maxPerKind: 3 } });
  await facePoison('PS2 F2 the lanes fixed at 84', 'fill', (h) => must(h, 'repeat(6,minmax(84px,1fr))', 'repeat(6,84px)', 'PS2'), /rows end \d+ px above the body bottom/);
  await facePoison('PN2 F2 an answer stamp edited (What on a who row)', 'fill', (h) => must(h, 'data-lcs-ask="who" data-lcs-name', 'data-lcs-ask="what" data-lcs-name', 'PN2'), /answer stamp .* != qwords\.what|mark ".*" != markOf|a what row marks the name/);
  // F3 sort
  await facePoison('PR-sort-a F3 a tile pre-placed in a bin', 'sort', (h) => { const t = /<span class="ws-tile ws-tile--word"[\s\S]*?<\/span>/.exec(h); return h.replace(t[0], '').replace('<svg width="195"', t[0] + '<svg width="195"'); }, /a tile pre-placed in the bin|not on the shelf/);
  await facePoison('PR-sort-b F3 a tile equal to a head', 'sort', (h) => { const t = /data-lcs-sortword="([^"]+)"/.exec(h); return h.split(`data-lcs-sortword="${t[1]}"`).join('data-lcs-sortword="Who?"').replace(new RegExp('>' + t[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '</span>'), '>Who?</span>'); }, /equals a head/);
  await facePoison('PR-sort-c F3 a picture injected on the shelf', 'sort', (h) => must(h, '<div class="ws-card" data-lcs-shelf', `<div class="ws-card" data-lcs-shelf><img class="ws-icon" src="${fileUri('toys', 'ball')}" alt="" style="width:44px;height:44px"`, 'PR-sort-c'), /a picture on the sort face/);
  await facePoison('PR-sort-d F3 a head swapped to When?', 'sort', (h) => must(h, '>Where?</span>', '>When?</span>', 'PR-sort-d'), /head "When\?" != "Where\?"/);
  await facePoison('PS3 F3 the design\'s 350 bins (stack 536)', 'sort', (h) => h.split('height:491px').join('height:350px').split('height="486"').join('height="345"').split('viewBox="0 0 195 486"').join('viewBox="0 0 195 345"'), /stack \d+ != the fixed 677|stack \d+ < 660|slack \d+ px under the bins/);
  await facePoison('PN3 F3 a name tile keyed what', 'sort', (h) => { const m = /data-lcs-key="0" data-lcs-kind="who"/.exec(h); if (!m) throw new Error('PN3'); return h.replace(m[0], 'data-lcs-key="1" data-lcs-kind="who"'); }, /key 1 != the who bin 0|receives \d tiles, want 3/);
  // F4 write
  await facePoison('P17 F4 the canonical question as a starter', 'write', (h) => { const m = /data-lcs-answer="([^"]+)"/.exec(h); return h.replace('</svg></div></div></div>', `<text x="8" y="34" font-family="Nunito" font-size="27" data-lcs-starter="1">${m[1]}</text></svg></div></div></div>`); }, /a starter on the ruling|text printed on the ruling|is printed on the page/);
  await facePoison('P17b F4 a bank banner on the write face', 'write', (h) => must(h, '<div data-lcs-lanes', C4.qwChips({ kinds: [{ kind: 'who', label: 'Who' }, { kind: 'what', label: 'What' }] }).replace('data-lcs-chips', 'data-lcs-bank-banner data-lcs-chips') + '<div data-lcs-lanes', 'P17b'), /a bank on the write face|a chip on the write face/);
  await facePoison('P17c F4 the ruling narrowed to 300 (< need)', 'write', (h) => h.split('width="575" height="48"').join('width="300" height="48"'), /ruling 300 < 575|< need/);
  await facePoison('PS4 F4 the rows fixed at 78', 'write', (h) => must(h, 'repeat(8,minmax(78px,1fr))', 'repeat(8,78px)', 'PS4'), /rows end \d+ px above the body bottom/);
  await facePoison('PN4 F4 an answer stamp edited', 'write', (h) => { const m = /data-lcs-answer="([^"]+)\?"/.exec(h); return h.replace(m[0], `data-lcs-answer="${m[1]} now?"`); }, /answer stamp .* != questionOf/);
  // F5 ask
  await facePoison('PR-ask-a F5 the clock hour edited', 'ask', (h) => { const m = /data-lcs-time="(\d+)"/.exec(h); const other = m[1] === '3' ? 4 : 3; return h.replace(m[0], `data-lcs-time="${other}"`); }, /clock shows \d+, the scene stamps|clock \d+ != the scene time/);
  await facePoison('PR-ask-b F5 a starter replaced by How many', 'ask', (h) => h.replace('>Why</text>', '>How many</text>'), /prints "How many", starter "Why"|starters .* != the bank/);
  await facePoison('PS5 F5 the design\'s h 56 (stack 572)', 'ask', null, /stack 572 < 660/, { d: { h: 56 } });
  await facePoison('PR-ask-c F5 a portrait tagged f under a boy\'s name', 'ask', null, /depicted|tag mismatch/, { pron: (() => { const bad = clone(pronEn); bad.names.forEach((n) => { n.gender = 'f'; }); return bad; })() });
}


if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, crossCheck, TABLE_B, HEADS, MEASURED_F4, synthetic };
