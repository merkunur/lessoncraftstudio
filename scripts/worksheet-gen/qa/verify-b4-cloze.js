#!/usr/bin/env node
/**
 * verify-b4-cloze.js — the G1-350 `cloze` gate (design file
 * docs/worksheet-gen/b4-designs/G1-350-cloze.md §5; brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b4-cloze.js [--quick]
 *
 * 1. BANK — every locale block of data/b4/cloze.js against the §5 validator
 *    rules 1-16 (the `tools/validate-b4-draft.js` cloze block, folded in here
 *    and exported as `validateBank(block, loc, opts)`; tools/b4-probe-child.js
 *    calls it with (block, loc)):
 *    (1) every frames[] / plural[] / stories[].text[] sentence carries EXACTLY
 *        one {gap} (`___` refused), <= 2 sentences with the gap in the LAST,
 *        gap-removed text <= 48 (stories 42), no `{…}` but {gap} / {name};
 *    (2) noun / every fits member / foil / story noun = a vocab key with a
 *        colour picture (hasPicture, B2_EXCLUDE honoured) AND an objForms
 *        entry, not in excludeKeys; pic / pics are pictureIndex() candidates
 *        (no localized B&W marker); picOpened:true; signedExclusive:true;
 *        predicateKind ∈ {verb, place, copula};
 *    (3) form ∈ the locale's set (de: `unique` FORBIDDEN — the accusative
 *        phrase; sv/da/no: `unique` refused, `def` is the definite; fi: def /
 *        defPl / a2 forbidden; non-fi: part / gen forbidden); answerFor
 *        non-empty; `case` on every de frame;
 *    (4) the answer literal is not in the text (word boundary
 *        (?<!\p{L})…(?!\p{L}), NFD, case-insensitive), nor the noun's OTHER
 *        number; no text equals a SENTENCES[loc].frames literal;
 *    (5) the token before {gap} (punctuation stripped) is either not an article
 *        or equals articleTable[case || default][gender(noun)]; fr / it: a
 *        definite article before an elision noun refused; en: a / an against
 *        ARTICLES.en.keyFor, over an EN_AMBIGUOUS noun refused;
 *    (6) the token before the article is not in `agreeingAdjectives`; {name}
 *        only where nameSlot;
 *    (7) fits contains noun; foil ∉ fits, foil !== noun, same gender code, same
 *        number, en a/an keyFor equality, foil has objForms + a picture, never
 *        the confusable partner; a foil on a `unique` frame = WARN;
 *    (8) >= 16 frames with >= 12 F1-eligible and >= 10 F2-eligible; >= 12
 *        plural unless refuse.plural; >= 6 stories; answers + nouns distinct
 *        within each list; pictures per list from >= 3 strongThemes; twins
 *        WARN;
 *    (9) plural: answerFor(pl) !== answerFor(sg) + countable; clones ∈ {null,
 *        2, 3} and equal to a number word / digit in the text; fi plural frames
 *        carry no number and use `pl` only; def / defPl only in sv / da / no,
 *        only with defWhy, REFUSED when the definite literal equals another
 *        vocab key's singular / plural (the real sv case: cow.def "kon" ===
 *        cone "Kon");
 *    (10) stories: 3 sentences, 3 distinct pictured nouns, fits[i] ∋ nouns[i],
 *        the three fits pairwise disjoint, the six stories' 18 nouns distinct,
 *        every sentence's fits disjoint from the other five stories' nouns,
 *        sentences <= 42, answers <= 9 glyphs;
 *    (11) fi: no `sg` after a numeral (part / gen only where the form exists);
 *    (12) copula requires exclusiveWhy; confusable pairs are pool nouns;
 *    (13) strings: 6 titles <= 70 without the worksheet word, distinct, base
 *        === the head (en; WARN elsewhere until the panel rules), 6
 *        instructions <= 120, the letters instruction (only) carries boxWord,
 *        the plural title is off the `singular-plural` name, the letters title
 *        off the `write-the-word` name, the fr story title carries "texte à
 *        trous" and no other, fi base / plural / story titles <= 3 lines
 *        (opts.titleLines), no free claim, no "with answers";
 *    (14) refuse.plural === true for da, and a da block with plural frames FAILS;
 *    (15) EN: strings.base === the spec's i18n.en;
 *    (16) the taxonomy slug of the locale === TABLE_B (en `cloze` — the
 *        taxonomy invariant slug.en === key, the G1-352 precedent), collides
 *        with no other axis slug; the de near-miss `exercise-mode.fillin.slug.de
 *        = luckentext` is asserted to be a MODE key.
 *    The gate MAY read the vocab / taxonomy / SENTENCES / objForms; the spec
 *    reads objForms + vocab through answerFor only.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1 / d2 / d3 en at the default chrome; d2 under the README 722
 *    chrome (a 3-line title + a 3-line instruction: MEASURED 710); d2 under a
 *    4-line title (677 / 700: the base must FAIL — PR13, why rule 13 exists); a
 *    de-length long-frame page (50-char frames, the two-line row) at 710.
 *    Asserts verify() empty, qa/lints.js clean, the G1 floors ITSELF (every
 *    picture >= 56 on the base, text >= 16, gap boxes >= 150 and uniform,
 *    bank <= 2 pill rows, sentences <= 64), nothing under the footer, the bank
 *    height + the two-line row PRINTED, and the NODE cross-check: every
 *    stamped (frame, key, form) is a bank frame, answer === answerFor, the
 *    picture src === the pinned pic, fits disjoint over the page keys, the
 *    article token, <= 1 key per twin group, no confusable pair, <= 2 per
 *    theme, bank set === answers, bank deranged.
 *    Plus a COMPONENT smoke: letterGap, choiceGap, cloneGapRow, storyBlock,
 *    sentenceMatch rendered through the pipeline in a throwaway type — lints
 *    clean + the design's row heights (77 / 100 / 78 / 192 / 92) measured
 *    and printed for the faces; and the component throws.
 * 3. SWEEP — 20 seeds × d1 / d2 (build only): rows + bank order vary, the
 *    bank is never the row order, every page re-derived (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct
 *    EN bank / render is the control; synthetic de / fr / es / sv / da / fi
 *    blocks are their own controls. Design §5:
 *      P1  'The cow gives milk. The {gap} …'            → rule 4
 *      P2  fits:['goat'] on the cow frame                 → rule 7
 *      P3  de 'Der {gap} gibt uns Milch.' over cow (f)    → rule 5
 *      P4  fr 'Le {gap} vole.' over airplane, form sg     → rule 5
 *      P5  de form:'unique'                               → rule 3
 *      P6  foil:'cow' on the cow frame; foil Ziege (f) on Pferd (n) → rule 7
 *      P7  foil:'goat' where fits lists goat              → rule 7
 *      P8  fi plural 'Kaksi {gap} syö heinää.'            → rule 9
 *      P9  two gaps; '___'                                → rule 1
 *      P10 a 2-sentence story / nouns cow,cow / unpictured park / a noun shared with another story → rule 10 / 2
 *      P11 pic theme 'animals bw'; picOpened absent; noun 'glass' → rule 2
 *      P12 {name} in an es frame                          → rule 6
 *      P13 a base instruction with boxWord; da plural frames; sv plural title "Singular och plural"; pt letters title "Escreva o nome da figura" → rule 13 / 14
 *      P14 sv form:'def' on cow ("kon" === cone); sv def without defWhy → rule 9
 *      P15 copula without exclusiveWhy                    → rule 12
 *      P16 a draft with 11 F1-eligible frames             → rule 8
 *    Render poisons (the validator bypassed):
 *      PR1  a stamped answer edited ("cows" on a sg lane) → node cross-check
 *      PR2  two frames with overlapping fits through the _buildWith seam → the composer REFUSES
 *      PR8  per-row gap widths                            → "not uniform"
 *      PR9  the base at .ws-lane's default padding at 710 → footer lint
 *      PR10 a 3-row bank (9 x 14-glyph pills)             → gapBank refuses / "> 2 rows"
 *      PR12 apple + cherry as the only frames             → the composer REFUSES (twin)
 *      PR13 the base under a 4-line title                 → footer lint
 *      PRa  the answer printed in its sentence · PRb the bank in row order · PRc a starter glyph · PRd a hint chip · PRe a picture swapped
 * 5. FACES (Phase 2; design §3; record _work/G1-350-faces.md) — for each of
 *    letters G1-366 / choice G1-367 / plural G2-349 / story G2-350 / match
 *    G1-368: the row (tools/b4var-rows/cloze.js) ≡ the emitted spec ≡ the
 *    bank's strings.<mode> (one source); rendered through the real pipeline at
 *    the default en chrome, the 3+3 chrome (710) and the 4-line-title chrome
 *    (677: letters / choice / match must hold it; plural / story are capped at
 *    a 3-line fi title by rule 13 and must FAIL it — PR13b / PR13c); verify()
 *    (the VERIFY_FACE branch: floors, the answer never printed, the stage
 *    top-anchored + filling the body, the SPARSE band inside every lane /
 *    block / between match items <= 44) empty, lints clean, the node
 *    cross-check (faceCross: answerFor on every stamp, pinned pictures, fits
 *    disjoint, foils by gender + off the page, clone counts, strip orders,
 *    derangements, twins, themes); every pinned picture on disk as
 *    <theme>/<noun>@2x.webp; a 20-seed sweep per face; the face poisons:
 *      PR3 a bank on letters · PF1 a box-count stamp edited · PF1b a starter at d2 · PF1c box 26 (the spec refuses) · PF1d 8 rows at 710 · PS1 fixed rows
 *      PR11 a wrapped choice sentence · PF2 the answer chip re-labelled · PF2b answer-first on every row · PF2c a chip pre-marked · PF2d a foil on the page · PF2e wrong-gender foils (de, refuses) · PS2
 *      PR4 a hint chip on plural · PF3 a clone stamp edited · PF3b the singular printed · PF3c a bank on plural · PF3d da refuses · PF3e hint:true refuses · PS3
 *      PR5 a strip in sentence order · PF4 the bank in line order · PF4b an answer printed · PF4c two names in one story · PF4d sentences:4 refuses · PS4
 *      PR6 a picture straight across · PR7 the noun printed · PF5 a picture in a sentence item · PS5 fixed 92 items flex-start (slack pools)
 *      PR15 sv unauthored refuses on every face · PR16 strings.match missing refuses · PF6 overlapping fits on match (the composer refuses)
 *    Final line: PASS (N assertions, M/M poisons killed) or FAIL.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b4-common.js');
const { bank: b3Bank } = require('../lib/b3-common.js');
const { fileUri, vocab, countable, displayWord } = require('../lib/b2-common.js');
const { pictureIndex, hasPicture } = require('../lib/b3-picture-index.js');
const { SENTENCES } = require('../data/b2/sentences.js');
const { ARTICLES, EN_AMBIGUOUS } = require('../data/b2/articles.js');
// data/b2/articles.js defines itKey but exports only { ARTICLES, EN_EXCEPTIONS, EN_AMBIGUOUS }, so the
// old `itKey` destructure was undefined and validateBank THREW on the Italian path alone — the it rule 5
// (a definite article before an l' / lo noun) was dead and no it block could be validated at all.
// The it entry's own keyFor IS itKey (articles.js:63), so the gate reads it from the shipped table.
const itKey = ARTICLES.it.keyFor;
if (typeof itKey !== 'function') throw new Error('verify-b4-cloze: ARTICLES.it.keyFor is not a function — the it article rule cannot run');
const { numberWord } = require('../lib/number-words.js');
const freeClaim = require('../../lib/free-claim.js');
const C4 = require('../templates/components-b4.js');

const TYPE = require('../types/g1/G1-350-cloze.js');
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
const BASE_PIC = 56;                                // the base's shipped picture size (design §2)
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä|tehtäväpaperi/i;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med facitliste|med fasit|vastauksineen/i;
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
// design §1 table B; en = `cloze` (the taxonomy invariant slug.en === key, Phase 0.1) — the DECK slug of the spec stays `fill-in-the-blank-sentences`
const TABLE_B = { en: 'cloze', de: 'lueckentext', es: 'completa-las-oraciones', pt: 'complete-as-frases', fr: 'phrases-a-trous', it: 'completa-le-frasi', nl: 'zinnen-aanvullen', sv: 'fyll-i-ratt-ord', da: 'indsaet-det-rigtige-ord', no: 'sett-inn-riktig-ord', fi: 'taydenna-lauseet' };
const HEADS = { en: 'Fill in the Blank Sentences', de: 'Lückentext', es: 'Completa las oraciones', pt: 'Complete as frases', fr: 'Phrases à trous', it: 'Completa le frasi', nl: 'Zinnen aanvullen', sv: 'Fyll i rätt ord', da: 'Indsæt det rigtige ord', no: 'Sett inn riktig ord', fi: 'Täydennä lauseet' };
const SINGULAR_PLURAL_NAME = { sv: 'singular och plural', da: 'ental og flertal', de: 'einzahl und mehrzahl' };
const WRITE_THE_WORD_NAME = { pt: 'escreva o nome da figura', fr: 'dictée muette', de: 'bilder beschriften', it: 'dettato muto' };
const FACES = ['base', 'letters', 'choice', 'plural', 'story', 'match'];
const FORMS_BY_LOC = (loc) => (loc === 'fi' ? ['sg', 'pl', 'unique', 'part', 'gen'] : loc === 'de' ? ['sg', 'pl', 'def', 'defPl', 'a2'] : ['sv', 'da', 'no'].includes(loc) ? ['sg', 'pl', 'def', 'defPl'] : ['sg', 'pl', 'unique', 'def', 'defPl', 'a2']);
const D2 = TYPE.difficulty[2];

let fails = 0, asserts = 0, killed = 0, poisonTotal = 0;
function ok(cond, msg) { asserts++; if (!cond) { fails++; console.log('  FAIL ' + msg); } return !!cond; }
function fold(s) { return String(s || '').trim().toLocaleLowerCase(); }
function nfd(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function hasWord(text, word) { if (!word) return false; const w = nfd(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); return new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu').test(nfd(text)); }
function graphemes(s) { return [...String(s).normalize('NFC')].length; }
function fileExists(theme, noun) { try { return fs.existsSync(url.fileURLToPath(fileUri(theme, noun))); } catch (e) { return false; } }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function longestName(loc) { return ((SENTENCES[loc] && SENTENCES[loc].names) || ['Emma']).slice().sort((a, b) => graphemes(b) - graphemes(a))[0]; }
function bare(text, loc) { return String(text).replace('{gap}', '').replace(/\{name\}/g, longestName(loc)); }
function sentencesOf(text) { return String(text).split(/(?<=[.!?])\s+/).filter((s) => s.trim()); }

/** The gate's own answer reader: opts.objForms overrides the b3 bank (poison seam); otherwise === the spec's answerFor. */
function answerOf(loc, noun, form, opts) {
  if (opts && opts.objForms) {
    if (form === 'sg') { const e = vocab()[noun] && vocab()[noun][loc]; if (!e || !e[0]) throw new Error('no sg'); return displayWord(e[0], loc); }
    const f = opts.objForms[noun]; const v = f && f[form]; if (typeof v !== 'string' || !v.trim()) throw new Error('missing form'); return v;
  }
  return TYPE.answerFor(loc, noun, form);
}
function tryAnswer(loc, noun, form, opts) { try { return answerOf(loc, noun, form, opts); } catch (e) { return null; } }
function objFormsOf(loc, opts) { return (opts && opts.objForms) || b3Bank('instructions', loc).objForms || {}; }
function entryOf(loc, key) { const e = vocab()[key] && vocab()[key][loc]; return e ? { key, singular: e[0], plural: e[1] || '', gender: e[2] || null } : null; }
function isPoolNoun(loc, key, opts) { return !!(entryOf(loc, key) && hasPicture(key, loc) && objFormsOf(loc, opts)[key]); }

/** Flat list of every article literal a locale's table carries (+ the fr / it elided and d3 forms). */
function articleLiterals(loc, table) {
  const out = new Set();
  const walk = (v) => { if (typeof v === 'string') out.add(fold(v)); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
  walk(table);
  if (loc === 'fr') ['le', 'la', "l'", 'un', 'une'].forEach((a) => out.add(a));
  if (loc === 'it') ['il', 'lo', 'la', "l'", 'un', 'uno', 'una', "un'"].forEach((a) => out.add(a));
  if (loc === 'en') ['a', 'an', 'the'].forEach((a) => out.add(a));
  return out;
}
/** The expected article for (loc, gender, case) from the block's table; null = the table does not decide it. */
function expectedArticle(loc, table, gender, kase) {
  if (!table || !gender) return null;
  if (loc === 'de') { const c = table[kase || 'nom']; return c ? c[gender] || null : null; }
  const v = table[gender];
  return typeof v === 'string' ? v : null;
}
/** The two tokens before {gap}: [article?, before-article?] (punctuation stripped, fr/it elision kept as "l'"). */
function tokensBefore(text) {
  const pre = String(text).split('{gap}')[0];
  const toks = pre.replace(/[.,;:!?«»"“”]/g, ' ').trim().split(/\s+/).filter(Boolean);
  const last = toks[toks.length - 1] || '';
  const m = /^(.*?)(l'|un'|L'|Un')$/u.exec(last);   // "l'{gap}" — the elided article glued to the gap
  if (m && m[2]) return [fold(m[2]), fold(m[1] || toks[toks.length - 2] || '')];
  return [fold(last), fold(toks[toks.length - 2] || '')];
}

/* ------------------------------------------------------------------ 1. the bank validator ------------------------------------------------------------------ */

/**
 * validateBank(block, loc, opts) -> string[] of failures (empty = clean). opts.titleLines(title) -> lines (rule 13);
 * opts.en = the EN block; opts.globals = {twins, excludeKeys, strongThemes}; opts.objForms = an objForms override (poisons).
 * Warnings are returned prefixed "WARN:" and do not fail (the caller filters).
 */
function validateBank(block, loc, opts = {}) {
  const out = [];
  const push = (m) => out.push(m);
  const mod = bankModule('cloze');
  const en = opts.en || mod.en;
  const G = opts.globals || { twins: mod.twins, excludeKeys: mod.excludeKeys, strongThemes: mod.strongThemes };
  if (!block || typeof block !== 'object') return ['no block'];
  const isFi = loc === 'fi', isDe = loc === 'de';
  const frames = Array.isArray(block.frames) ? block.frames : [];
  const plural = Array.isArray(block.plural) ? block.plural : [];
  const stories = Array.isArray(block.stories) ? block.stories : [];
  const table = block.articleTable;
  const artLits = articleLiterals(loc, table);
  const confusable = (block.confusable || []).map((p) => p.slice().sort().join('|'));
  const excluded = new Set(G.excludeKeys || []);
  const idx = pictureIndex();
  const allowed = FORMS_BY_LOC(loc);
  const forms = objFormsOf(loc, opts);
  const V = vocab();
  const otherLits = new Map();   // rule 9: every vocab sg / pl literal of the locale -> keys
  for (const [k, e] of Object.entries(V)) { const x = e[loc]; if (!x) continue; for (const w of [x[0], x[1]]) if (w) { const l = fold(w); if (!otherLits.has(l)) otherLits.set(l, []); otherLits.get(l).push(k); } }
  const sentFrames = ((SENTENCES[loc] && SENTENCES[loc].frames) || []).map((f) => nfd(String(f.text).replace(/\{noun\}/g, '{gap}').replace(/\{(n|name|color)\}/g, '{x}')).replace(/\s+/g, ' ').trim());

  const checkPic = (pic, key, L) => {
    if (!pic || !pic.theme || !pic.noun) { push(`rule 2: ${L} has no pinned pic`); return; }
    if (BW_MARKER.test(pic.theme)) push(`rule 2: ${L} pins a B&W theme "${pic.theme}"`);
    const c = (idx.get(key) || []).find((x) => x.theme === pic.theme && x.noun === pic.noun);
    if (!c) push(`rule 2: ${L} pic ${pic.theme}/${pic.noun} is not a colour candidate for "${key}"`);
    else if (!fileExists(pic.theme, pic.noun)) push(`rule 2: ${L} picture ${pic.theme}/${pic.noun} does not exist`);
  };
  const checkNoun = (key, L) => {
    if (!key || typeof key !== 'string') { push(`rule 2: ${L} has no noun`); return false; }
    if (excluded.has(key)) push(`rule 2: ${L} "${key}" is in excludeKeys`);
    if (!entryOf(loc, key)) { push(`rule 2: ${L} "${key}" has no ${loc} vocab entry`); return false; }
    if (!hasPicture(key, loc)) push(`rule 2: ${L} "${key}" has no colour picture in ${loc}`);
    if (!forms[key]) push(`rule 2: ${L} "${key}" has no ${loc} objForms entry`);
    return true;
  };
  const checkText = (text, L, cap, isStory) => {
    const t = String(text || '');
    const gaps = (t.match(/\{gap\}/g) || []).length;
    if (gaps !== 1) push(`rule 1: ${L} carries ${gaps} {gap} ("${t}")`);
    if (t.includes('___')) push(`rule 1: ${L} carries ___ ("${t}")`);
    const other = (t.match(/\{([a-zA-Z0-9_]+)\}/g) || []).filter((s) => !['{gap}', '{name}'].includes(s));
    if (other.length) push(`rule 1: ${L} carries a slot other than {gap} / {name}: ${other.join(' ')}`);
    const sents = sentencesOf(t);
    if (!isStory) {
      if (sents.length > 2) push(`rule 1: ${L} has ${sents.length} sentences (> 2)`);
      if (sents.length && !/\{gap\}/.test(sents[sents.length - 1])) push(`rule 1: ${L} the {gap} is not in the LAST sentence`);
    } else if (sents.length !== 1) push(`rule 10: ${L} is ${sents.length} sentences (a story line is one)`);
    const len = [...bare(t, loc)].length;
    if (len > cap) push(`rule ${isStory ? 10 : 1}: ${L} is ${len} chars gap-removed (> ${cap})`);
    if (/\{name\}/.test(t) && !block.nameSlot) push(`rule 6: ${L} carries {name} but nameSlot is off`);
  };
  const checkAnswerHidden = (text, key, form, L) => {
    const a = tryAnswer(loc, key, form, opts);
    if (!a) { push(`rule 3: ${L} answerFor(${key}, ${form}) is missing in ${loc}`); return null; }
    if (hasWord(text, a)) push(`rule 4: ${L} prints its answer "${a}"`);
    const otherForm = form === 'pl' || form === 'defPl' ? 'sg' : 'pl';
    const o = tryAnswer(loc, key, otherForm, opts);
    if (o && hasWord(text, o)) push(`rule 4: ${L} prints the noun's other number "${o}"`);
    const norm = nfd(String(text).replace(/\{name\}/g, '{x}')).replace(/\s+/g, ' ').trim();
    if (sentFrames.includes(norm)) push(`rule 4: ${L} equals a SENTENCES.${loc} frame literal`);
    return a;
  };
  const checkArticle = (text, key, form, kase, L) => {
    const e = entryOf(loc, key);
    if (!e) return;
    const [tok, before] = tokensBefore(text);
    if (block.agreeingAdjectives && block.agreeingAdjectives.map(fold).includes(before) && artLits.has(tok)) push(`rule 6: ${L} an agreeing adjective "${before}" before the article`);
    if (block.agreeingAdjectives && block.agreeingAdjectives.map(fold).includes(tok)) push(`rule 6: ${L} an agreeing adjective "${tok}" before the gap`);
    if (!artLits.has(tok)) return;                          // not an article: nothing to check
    if (['unique', 'def', 'defPl', 'a2'].includes(form)) { push(`rule 5: ${L} prints an article "${tok}" before a ${form} form (the article is inside the answer)`); return; }
    if (loc === 'en') {
      if (tok === 'the') return;
      const k = ARTICLES.en.keyFor(e);
      if (k == null) push(`rule 5: ${L} "${tok}" before "${key}" (EN_AMBIGUOUS / undecidable)`);
      else if (['a', 'an'][k] !== tok) push(`rule 5: ${L} "${tok}" before "${e.singular}" (keyFor says ${['a', 'an'][k]})`);
      return;
    }
    if (loc === 'fr') { if (['le', 'la'].includes(tok) && ARTICLES.fr.keyFor(e) == null) push(`rule 5: ${L} "${tok}" before the elision noun "${e.singular}"`); else if (['le', 'la'].includes(tok) && ['le', 'la'][ARTICLES.fr.keyFor(e)] !== tok) push(`rule 5: ${L} "${tok}" before "${e.singular}" (${e.gender})`); return; }
    if (loc === 'it') { const k = itKey(e, { level: 2 }); if (['il', 'la'].includes(tok) && k == null) push(`rule 5: ${L} "${tok}" before the lo / l' noun "${e.singular}"`); else if (['il', 'la'].includes(tok) && k != null && ['il', 'la'][k] !== tok) push(`rule 5: ${L} "${tok}" before "${e.singular}" (${e.gender})`); return; }
    if (isFi) return;
    if (form === 'pl') return;                               // a plural article is the panel's literal (no table for it)
    const want = expectedArticle(loc, table, e.gender, kase);
    if (want == null) push(`rule 5: ${L} the article table does not decide "${tok}" for gender ${e.gender}${kase ? ' case ' + kase : ''}`);
    else if (fold(want) !== tok) push(`rule 5: ${L} "${tok}" before "${e.singular}" (${e.gender}${kase ? ', ' + kase : ''}) — the table says "${want}"`);
  };
  const checkCommon = (f, L, cap) => {
    if (!checkNoun(f.noun, L)) return null;
    checkPic(f.pic, f.noun, L);
    if (f.picOpened !== true) push(`rule 2: ${L} picOpened is not true`);
    if (f.signedExclusive !== true) push(`rule 2: ${L} signedExclusive is not true`);
    if (!['verb', 'place', 'copula'].includes(f.predicateKind)) push(`rule 2: ${L} predicateKind "${f.predicateKind}"`);
    if (f.predicateKind === 'copula' && !(typeof f.exclusiveWhy === 'string' && f.exclusiveWhy.trim())) push(`rule 12: ${L} is a copula frame without exclusiveWhy`);
    if (!allowed.includes(f.form)) push(`rule 3: ${L} form "${f.form}" is not allowed in ${loc}${isDe && f.form === 'unique' ? ' (de unique = the accusative phrase)' : ''}`);
    if (isDe && !f.case) push(`rule 3: ${L} has no case (de)`);
    if (f.case && !['nom', 'acc', 'dat'].includes(f.case)) push(`rule 3: ${L} case "${f.case}"`);
    checkText(f.text, L, cap, false);
    if (!Array.isArray(f.fits) || !f.fits.includes(f.noun)) push(`rule 7: ${L} fits does not contain its noun`);
    for (const x of f.fits || []) if (x !== f.noun && !isPoolNoun(loc, x, opts)) push(`rule 2: ${L} fits member "${x}" is not a pool noun`);
    if (['def', 'defPl'].includes(f.form)) {
      if (!(typeof f.defWhy === 'string' && f.defWhy.trim())) push(`rule 9: ${L} form ${f.form} without defWhy`);
      const lit = tryAnswer(loc, f.noun, f.form, opts);
      const others = lit ? (otherLits.get(fold(lit)) || []).filter((k) => k !== f.noun) : [];
      if (others.length) push(`rule 9: ${L} the definite literal "${lit}" equals the singular / plural of ${others.join(', ')} — REFUSED`);
    }
    const a = checkAnswerHidden(f.text, f.noun, f.form, L);
    checkArticle(f.text, f.noun, f.form, f.case, L);
    if (isFi) { const [tok] = tokensBefore(f.text); const nums = new Set(); for (let n = 1; n <= 9; n++) { try { nums.add(fold(numberWord(n, 'fi'))); } catch (e) { /* none */ } } if (f.form === 'sg' && nums.has(tok)) push(`rule 11: ${L} a nominative sg after the numeral "${tok}" (fi numerals take the partitive)`); }
    return a;
  };

  // ---- frames (16)
  const ids = new Set(), fNouns = new Set(), fAnswers = new Set(), fThemes = new Set();
  let f1 = 0, f2 = 0;
  for (const f of frames) {
    const L = `frame ${f.id}`;
    if (ids.has(f.id)) push(`rule 8: frame id ${f.id} twice`); ids.add(f.id);
    if (fNouns.has(f.noun)) push(`rule 8: noun "${f.noun}" twice in frames`); fNouns.add(f.noun);
    if (f.form && !['sg', 'unique', 'part', 'gen', 'a2', 'def'].includes(f.form)) push(`rule 3: ${L} a singular-list frame with form "${f.form}"`);
    const a = checkCommon(f, L, D2.maxChars);
    if (a) { if (fAnswers.has(fold(a))) push(`rule 8: answer "${a}" twice in frames`); fAnswers.add(fold(a)); }
    if (f.pic) fThemes.add(f.pic.theme);
    // foil (rule 7)
    const e = entryOf(loc, f.noun);
    if (f.foil != null) {
      const L7 = `rule 7: ${L} foil "${f.foil}"`;
      if (f.foil === f.noun) push(`${L7} is the noun`);
      if ((f.fits || []).includes(f.foil)) push(`${L7} is in fits`);
      if (!isPoolNoun(loc, f.foil, opts)) push(`${L7} is not a pool noun (picture + objForms)`);
      const fe = entryOf(loc, f.foil);
      if (e && fe && e.gender && fe.gender && e.gender !== fe.gender) push(`${L7} gender ${fe.gender} != ${e.gender}`);
      if (confusable.includes([f.noun, f.foil].sort().join('|'))) push(`${L7} is the confusable partner`);
      if (loc === 'en' && e && fe) { const [tok] = tokensBefore(f.text); if (['a', 'an'].includes(tok) && ARTICLES.en.keyFor(fe) !== ARTICLES.en.keyFor(e)) push(`${L7} takes a different a / an`); }
      if (f.form === 'unique') push(`WARN: ${L} carries a foil on a unique-form frame (off F2 anyway)`);
    }
    // eligibility (rule 8)
    const [tok] = tokensBefore(f.text);
    const artOutside = !['unique', 'def', 'defPl', 'a2'].includes(f.form);
    const elides = (loc === 'fr' && e && ARTICLES.fr.keyFor(e) == null && ['le', 'la'].includes(tok)) || (loc === 'it' && e && itKey(e, { level: 2 }) == null && ['il', 'la'].includes(tok));
    if (a && f.form === 'sg' && /^\p{L}+$/u.test(a) && graphemes(a) >= 2 && graphemes(a) <= 12 && artOutside && !elides) f1++;
    const lineMax = ['de', 'fi', 'pt'].includes(loc) ? 38 : 40;
    if (a && [...bare(f.text, loc)].length <= lineMax && graphemes(a) <= 9 && artOutside && f.foil != null && !elides) f2++;
  }
  if (frames.length < 16) push(`rule 8: ${frames.length} frames < 16`);
  if (frames.length && f1 < 12) push(`rule 8: only ${f1} F1-eligible frames (want >= 12)`);
  if (frames.length && f2 < 10) push(`rule 8: only ${f2} F2-eligible frames (want >= 10)`);
  if (frames.length && [...fThemes].filter((t) => (G.strongThemes || []).includes(t)).length < 3) push(`rule 8: frames pin pictures from ${[...fThemes].length} strong themes (want >= 3)`);
  // twins across the list: WARN only when a group holds > 2 frames (fewer legal pages)
  for (const g of G.twins || []) { const n = frames.filter((f) => g.includes(f.noun)).length; if (n > 2) push(`WARN: ${n} frames in the twin group ${g.join('/')}`); }

  // ---- plural (12)
  const refusePl = !!(block.refuse && block.refuse.plural);
  if (loc === 'da' && !refusePl) push('rule 14: da must record refuse.plural:true');
  if (refusePl && plural.length) push(`rule 14: ${loc} refuses the plural face but carries ${plural.length} plural frames`);
  if (!refusePl && plural.length < 12) push(`rule 8: ${plural.length} plural frames < 12`);
  const pIds = new Set(), pNouns = new Set(), pAnswers = new Set(), pThemes = new Set();
  const fiNums = new Set(); if (isFi) for (let n = 1; n <= 9; n++) { try { fiNums.add(fold(numberWord(n, 'fi'))); } catch (e) { /* none */ } }
  for (const f of plural) {
    const L = `plural ${f.id}`;
    if (pIds.has(f.id)) push(`rule 8: plural id ${f.id} twice`); pIds.add(f.id);
    if (pNouns.has(f.noun)) push(`rule 8: noun "${f.noun}" twice in plural`); pNouns.add(f.noun);
    if (!['pl', 'defPl'].includes(f.form)) push(`rule 9: ${L} form "${f.form}" (pl | defPl)`);
    if (isFi && f.form !== 'pl') push(`rule 9: ${L} fi plural frames use pl only`);
    const a = checkCommon(f, L, D2.maxChars);
    if (a) { if (pAnswers.has(fold(a))) push(`rule 8: answer "${a}" twice in plural`); pAnswers.add(fold(a)); }
    if (f.pic) pThemes.add(f.pic.theme);
    const e = entryOf(loc, f.noun);
    if (e && !countable(e)) push(`rule 9: ${L} "${f.noun}" is not countable in ${loc}`);
    const sg = tryAnswer(loc, f.noun, 'sg', opts), pl = tryAnswer(loc, f.noun, 'pl', opts);
    if (sg && pl && fold(sg) === fold(pl)) push(`rule 9: ${L} pl === sg ("${pl}")`);
    if (!(f.clones === null || f.clones === 2 || f.clones === 3)) push(`rule 9: ${L} clones ${f.clones} (null | 2 | 3)`);
    const toks = fold(bare(f.text, loc)).replace(/[.,;:!?]/g, ' ').split(/\s+/);
    let named = null;
    for (let n = 2; n <= 9; n++) { let w = null; try { w = fold(numberWord(n, loc)); } catch (err) { w = null; } if ((w && toks.includes(w)) || toks.includes(String(n))) named = n; }
    if (isFi && (named != null || toks.some((t) => fiNums.has(t) || /^\d+$/.test(t)))) push(`rule 9: ${L} a fi plural frame names a number`);
    else if (named != null && f.clones !== named) push(`rule 9: ${L} names ${named} but clones is ${f.clones}`);
  }
  if (plural.length && [...pThemes].filter((t) => (G.strongThemes || []).includes(t)).length < 3) push(`rule 8: plural frames pin pictures from ${[...pThemes].length} strong themes (want >= 3)`);

  // ---- stories (6)
  if (stories.length < 6) push(`rule 8: ${stories.length} stories < 6`);
  const sIds = new Set(), allStoryNouns = new Map();
  stories.forEach((s) => (s.nouns || []).forEach((n) => allStoryNouns.set(n, (allStoryNouns.get(n) || 0) + 1)));
  for (const n of allStoryNouns.keys()) if (allStoryNouns.get(n) > 1) push(`rule 10: story noun "${n}" is used by ${allStoryNouns.get(n)} stories`);
  const sThemes = new Set();
  for (const s of stories) {
    const L = `story ${s.id}`;
    if (sIds.has(s.id)) push(`rule 8: story id ${s.id} twice`); sIds.add(s.id);
    if (!Array.isArray(s.text) || s.text.length !== 3 || !Array.isArray(s.nouns) || s.nouns.length !== 3 || !Array.isArray(s.fits) || s.fits.length !== 3 || !Array.isArray(s.forms) || s.forms.length !== 3 || !Array.isArray(s.pics) || s.pics.length !== 3) { push(`rule 10: ${L} needs 3 sentences / nouns / fits / forms / pics`); continue; }
    if (new Set(s.nouns).size !== 3) push(`rule 10: ${L} nouns are not distinct`);
    if (s.picOpened !== true) push(`rule 2: ${L} picOpened is not true`);
    if (s.signedExclusive !== true) push(`rule 2: ${L} signedExclusive is not true`);
    const others = new Set(stories.filter((o) => o !== s).flatMap((o) => o.nouns || []));
    const names = new Set();
    s.text.forEach((t, i) => {
      const Li = `${L} line ${i + 1}`;
      if (!checkNoun(s.nouns[i], Li)) return;
      checkPic(s.pics[i], s.nouns[i], Li);
      if (s.pics[i]) sThemes.add(s.pics[i].theme);
      if (!allowed.includes(s.forms[i])) push(`rule 3: ${Li} form "${s.forms[i]}" is not allowed in ${loc}`);
      checkText(t, Li, 42, true);
      if (!s.fits[i].includes(s.nouns[i])) push(`rule 10: ${Li} fits does not contain its noun`);
      for (const x of s.fits[i]) { if (x !== s.nouns[i] && !isPoolNoun(loc, x, opts)) push(`rule 2: ${Li} fits member "${x}" is not a pool noun`); if (others.has(x)) push(`rule 10: ${Li} fits "${x}" is another story's noun`); }
      for (let j = 0; j < 3; j++) if (j !== i && s.fits[j].includes(s.nouns[i])) push(`rule 10: ${L} fits of line ${j + 1} contains the noun of line ${i + 1}`);
      const a = checkAnswerHidden(t, s.nouns[i], s.forms[i], Li);
      if (a && graphemes(a) > 9) push(`rule 10: ${Li} answer "${a}" is ${graphemes(a)} glyphs (> 9)`);
      // the other two nouns of the story are on the page too: neither number may be printed on any line
      for (let j = 0; j < 3; j++) if (j !== i) for (const form of ['sg', 'pl']) { const o = tryAnswer(loc, s.nouns[j], form, opts); if (o && hasWord(t, o)) push(`rule 4: ${Li} prints "${o}" (line ${j + 1}'s noun)`); }
      checkArticle(t, s.nouns[i], s.forms[i], s.cases ? s.cases[i] : null, Li);
      (t.match(/\{name\}/g) || []).forEach(() => names.add('name'));
    });
  }
  if (stories.length && [...sThemes].filter((t) => (G.strongThemes || []).includes(t)).length < 3) push(`rule 8: stories pin pictures from ${[...sThemes].length} strong themes (want >= 3)`);

  // ---- confusable (rule 12) + article table shape
  for (const p of block.confusable || []) { if (!Array.isArray(p) || p.length !== 2) push('rule 12: a confusable entry is not a pair'); else for (const x of p) if (!isPoolNoun(loc, x, opts)) push(`rule 12: confusable "${x}" is not a pool noun`); }
  if (isFi && table != null) push('rule 5: fi articleTable must be null');
  if (!isFi && !table) push('rule 5: articleTable missing');
  if (isDe && table && (!table.nom || !table.acc || !table.dat)) push('rule 5: de articleTable needs nom / acc / dat');
  if (typeof block.nameSlot !== 'boolean') push('rule 6: nameSlot must be a boolean');
  if (!(typeof block.boxWord === 'string' && block.boxWord.trim())) push('rule 13: boxWord missing');

  // ---- strings (rule 13)
  const S = block.strings || {};
  const titles = [];
  for (const f of FACES) {
    if (f === 'plural' && refusePl) continue;   // a refused face has no strings (rule 14)
    const s = S[f];
    if (!s || typeof s.title !== 'string' || typeof s.instruction !== 'string') { push(`rule 13: strings.${f} missing`); continue; }
    titles.push(s.title);
    if ([...s.title].length > 70) push(`rule 13: ${f} title is ${[...s.title].length} chars (> 70)`);
    if (WORKSHEET_WORD.test(s.title)) push(`rule 13: ${f} title carries the worksheet word ("${s.title}")`);
    if ([...s.instruction].length > 120) push(`rule 13: ${f} instruction is ${[...s.instruction].length} chars (> 120)`);
    const hasBox = block.boxWord ? hasWord(s.instruction, block.boxWord) || fold(s.instruction).includes(fold(block.boxWord)) : false;
    if (f === 'letters' && !hasBox) push('rule 13: the letters instruction lacks boxWord');
    if (f !== 'letters' && hasBox) push(`rule 13: the ${f} instruction carries boxWord`);
    for (const t of [s.title, s.instruction]) { if (freeClaim.hit(t)) push(`rule 13: ${f} string claims free ("${t}")`); if (ANSWERS_WORD.test(t)) push(`rule 13: ${f} string promises answers ("${t}")`); }
    if (/cloze/i.test(s.title)) push(`rule 13: ${f} title carries "cloze"`);
  }
  if (new Set(titles.map(fold)).size !== titles.length) push('rule 13: two faces share a title');
  if (S.base && HEADS[loc] && fold(S.base.title) !== fold(HEADS[loc])) push(`${loc === 'en' ? 'rule 13' : 'WARN'}: base title "${S.base.title}" != the head "${HEADS[loc]}"`);
  if (S.plural && SINGULAR_PLURAL_NAME[loc] && fold(S.plural.title).includes(SINGULAR_PLURAL_NAME[loc])) push(`rule 13: the plural title carries the singular-plural name "${SINGULAR_PLURAL_NAME[loc]}"`);
  if (S.letters && WRITE_THE_WORD_NAME[loc] && fold(S.letters.title).includes(WRITE_THE_WORD_NAME[loc])) push(`rule 13: the letters title carries the write-the-word name "${WRITE_THE_WORD_NAME[loc]}"`);
  if (loc === 'fr') for (const f of FACES) if (S[f] && (fold(S[f].title).includes('texte à trous') !== (f === 'story'))) push(`rule 13: fr "texte à trous" ${f === 'story' ? 'missing from the story title' : 'on the ' + f + ' title'}`);
  if (isFi && typeof opts.titleLines === 'function') for (const f of ['base', 'plural', 'story']) { const t = S[f] && S[f].title; if (t) { const n = opts.titleLines(t); if (n > 3) push(`rule 13: fi ${f} title wraps to ${n} lines (the 677 stack does not hold the base / plural / story)`); } }
  if (refusePl && S.plural) push('rule 14: a refused plural face still carries strings.plural');

  // ---- rule 15 (en)
  if (loc === 'en' && S.base && (S.base.title !== TYPE.i18n.en.title || S.base.instruction !== TYPE.i18n.en.instruction)) push('rule 15: en strings.base != the spec i18n.en');

  // ---- rule 16 (taxonomy)
  try {
    const tax = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
    const ent = tax.axes['exercise-type'].cloze;
    const mine = (ent && ent.slug && ent.slug[loc]) || draftSlug('cloze');
    if (!mine) push(`rule 16: axes['exercise-type'].cloze.slug.${loc} is not registered`);
    else {
      if (mine !== TABLE_B[loc]) push(`rule 16: slug.${loc} "${mine}" != table B "${TABLE_B[loc]}"`);
      for (const [axis, entries] of Object.entries(tax.axes)) for (const [k, e] of Object.entries(entries)) if (!(axis === 'exercise-type' && k === 'cloze') && e.slug && e.slug[loc] === mine) push(`rule 16: slug.${loc} "${mine}" collides with ${axis}.${k}`);
    }
    for (const [k, e] of Object.entries(tax.axes['exercise-type'])) if (e.slug && ['luckentext', 'lueckentext'].includes(e.slug.de) && k !== 'cloze') push(`rule 16: exercise-type.${k}.slug.de is "${e.slug.de}" (the de near-miss must stay a MODE key)`);
    const fillin = tax.axes['exercise-mode'] && tax.axes['exercise-mode'].fillin;
    if (!fillin || fillin.slug.de !== 'luckentext') push('rule 16: the recorded near-miss exercise-mode.fillin.slug.de = luckentext is not where the design measured it');
  } catch (e) { push('rule 16: taxonomy unreadable'); }
  return out;
}

/* ------------------------------------------------------------------ 2. render helpers ------------------------------------------------------------------ */

async function renderWith(page, type, { difficulty = 2, baseName, strings, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const r = (el) => el.getBoundingClientRect();
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot'), title = document.querySelector('.ws-title');
    const banner = document.querySelector('[data-lcs-bank-banner]');
    const root = document.querySelector('[data-lcs-cloze]');
    const lanes = [...document.querySelectorAll('[data-lcs-row]')].map((ln) => {
      const p = ln.querySelector('[data-lcs-sentence]'), img = ln.querySelector('img[data-lcs-pic]'), box = ln.querySelector('[data-lcs-gapbox]');
      return { frame: ln.dataset.lcsFrame, key: ln.dataset.lcsKey, form: ln.dataset.lcsForm, kase: ln.dataset.lcsCase || null, answer: ln.dataset.lcsAnswer,
        text: p ? p.textContent : '', pH: p ? r(p).height : 0, font: p ? parseFloat(getComputedStyle(p).fontSize) : 0,
        pic: img ? img.dataset.lcsPic : null, src: img ? img.src : null, picW: img ? r(img).width : 0,
        boxW: box ? r(box).width : 0, boxH: box ? r(box).height : 0, h: r(ln).height, inner: ln.clientHeight, scroll: ln.scrollHeight };
    });
    let lowest = 0; document.querySelectorAll('.ws-body *').forEach((el) => { const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
    const pills = [...document.querySelectorAll('[data-lcs-bank-word]')].map((e) => ({ word: e.dataset.lcsBankWord, top: Math.round(r(e).top), w: r(e).width, font: parseFloat(getComputedStyle(e).fontSize) }));
    return { body: { h: r(body).height, top: r(body).top }, foot: r(foot).top, titleH: r(title).height, lines: Math.round(r(title).height / (30 * 1.1)),
      bank: banner ? r(banner).height : 0, gapW: root ? +root.dataset.lcsGapw : 0, rows: root ? +root.dataset.lcsRows : 0, lanes, pills, lowest };
  });
  return { ...out, verify: out.qa.verify, lints: out.qa.lints, m };
}

/** The node cross-check over the rendered stamps: answers / pictures / fits / articles / twins / bank re-derived from the bank + globals. */
function crossCheck(m, bank, loc, globals) {
  const out = [];
  const G = globals || bankModule('cloze');
  const byId = new Map((bank.frames || []).map((f) => [f.id, f]));
  const keys = m.lanes.map((l) => l.key);
  const themes = new Map();
  const groups = new Set();
  const confusable = (bank.confusable || []).map((p) => p.slice().sort().join('|'));
  m.lanes.forEach((l, i) => {
    const L = `lane ${i + 1}`;
    const f = byId.get(l.frame);
    if (!f) { out.push(`${L}: frame "${l.frame}" is not in the bank`); return; }
    if (f.noun !== l.key) out.push(`${L}: stamped key ${l.key}, the frame's noun is ${f.noun}`);
    if (f.form !== l.form) out.push(`${L}: stamped form ${l.form}, the frame says ${f.form}`);
    if ((f.case || null) !== l.kase) out.push(`${L}: stamped case ${l.kase}, the frame says ${f.case || null}`);
    let a = null;
    try { a = TYPE.answerFor(loc, f.noun, f.form); } catch (e) { out.push(`${L}: ${e.message}`); }
    if (a && a !== l.answer) out.push(`${L}: stamped answer "${l.answer}", answerFor says "${a}"`);
    if (a && hasWord(l.text, a)) out.push(`${L}: the answer "${a}" is printed`);
    const other = f.form === 'sg' ? 'pl' : 'sg';
    let o = null; try { o = TYPE.answerFor(loc, f.noun, other); } catch (e) { o = null; }
    if (o && hasWord(l.text, o)) out.push(`${L}: the other number "${o}" is printed`);
    if (l.pic !== f.noun) out.push(`${L}: picture "${l.pic}" != the frame's noun`);
    try { const want = fileUri(f.pic.theme, f.pic.noun); if (l.src !== want) out.push(`${L}: picture src is not the pinned ${f.pic.theme}/${f.pic.noun}`); } catch (e) { out.push(`${L}: ${e.message}`); }
    if (l.picW < BASE_PIC - 0.6) out.push(`${L}: picture ${l.picW.toFixed(1)} < ${BASE_PIC}`);
    // fits disjoint over the page keys (both directions)
    for (const x of f.fits) if (x !== f.noun && keys.includes(x)) out.push(`${L}: fits "${x}" is another lane's key (two answers fit)`);
    for (const k of keys) if (k !== f.noun) { const g = byId.get(m.lanes[keys.indexOf(k)].frame); if (g && g.fits.includes(f.noun)) out.push(`${L}: key "${f.noun}" fits lane ${keys.indexOf(k) + 1}'s frame`); }
    // the article token (the validator's rule 5 on the RENDERED text)
    const [tok] = tokensBefore(f.text);
    const e = entryOf(loc, f.noun);
    if (e && loc === 'en' && ['a', 'an'].includes(tok) && ['a', 'an'][ARTICLES.en.keyFor(e)] !== tok) out.push(`${L}: article "${tok}" before "${e.singular}"`);
    if (e && !['en', 'fi', 'fr', 'it'].includes(loc) && f.form === 'sg' && articleLiterals(loc, bank.articleTable).has(tok)) { const want = expectedArticle(loc, bank.articleTable, e.gender, f.case); if (want && fold(want) !== tok) out.push(`${L}: article "${tok}" before "${e.singular}" (table says ${want})`); }
    // twins / confusable / themes
    const g = TYPE.twinGroupOf(f.noun, G.twins || []);
    if (g >= 0) { if (groups.has(g)) out.push(`${L}: a second key of the twin group ${(G.twins[g] || []).join('/')}`); groups.add(g); }
    for (const k of keys) if (k !== f.noun && confusable.includes([k, f.noun].sort().join('|'))) out.push(`${L}: confusable pair ${k} / ${f.noun} on one page`);
    themes.set(f.pic.theme, (themes.get(f.pic.theme) || 0) + 1);
    if (l.font < 16) out.push(`${L}: font ${l.font} < 16`);
    if (l.pH > 64.5) out.push(`${L}: sentence ${l.pH.toFixed(1)} > 64`);
    if (l.boxW < 150 - 0.6 || Math.abs(l.boxW - m.gapW) > 1) out.push(`${L}: box ${l.boxW.toFixed(1)} vs gapW ${m.gapW}`);
    if (l.scroll > l.inner + 0.6) out.push(`${L}: lane content ${l.scroll} > inner ${l.inner} (clipped)`);
  });
  for (const [t, n] of themes) if (n > 2) out.push(`${n} lanes from the theme "${t}" (> 2)`);
  if (new Set(keys).size !== keys.length) out.push('a key twice on the page');
  // the bank
  const answers = m.lanes.map((l) => fold(l.answer));
  const words = m.pills.map((p) => fold(p.word));
  if (m.pills.length) {
    if (words.length < answers.length) out.push(`${words.length} pills < ${answers.length} lanes`);
    for (const a of answers) if (!words.includes(a)) out.push(`answer "${a}" missing from the bank`);
    if (words.some((w, i) => w === answers[i])) out.push('the bank is not deranged');
    if (new Set(m.pills.map((p) => p.top)).size > 2) out.push('bank > 2 rows');
    if (new Set(words).size !== words.length) out.push('a bank word twice');
    for (const p of m.pills) if (p.font < 16) out.push(`pill font ${p.font} < 16`);
    for (const l of m.lanes) for (const w of words) if (hasWord(l.text, w)) out.push(`the bank word "${w}" is printed in a sentence`);
  }
  if (!m.lanes.length) out.push('non-vacuity: 0 lanes');
  return out;
}

function assertRender(name, r, { rows }) {
  ok(r.verify.length === 0, `${name}: verify ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.lanes.length === rows, `${name}: ${r.m.lanes.length} lanes, want ${rows}`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: lowest ink ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
  ok(r.m.lanes.every((l) => l.scroll <= l.inner + 0.6), `${name}: a lane clips (${r.m.lanes.map((l) => l.scroll + '/' + l.inner).join(' ')})`);
}

/** A type whose bodyHtml is post-processed (render poisons) */
function mutated(type, fn) { return { ...type, build: async (a, c) => { const b = await type.build(a, c); return { ...b, bodyHtml: fn(b.bodyHtml) }; } }; }
/** A type over an injected bank (+ config overrides) that bypasses the validator */
function withBank(type, bank, dOver) { return { ...type, build: (a, c) => type._buildWith(bank, { ...type.difficulty[a.difficulty], ...(dOver || {}) }, { locale: a.locale }, c) }; }

/**
 * Long-chrome fixtures (measured in this gate; the lines are printed). The 722 chrome = a 3-line title + a 3-line
 * instruction (MEASURED 710, the G1-352 finding); the 677 chrome = a 4-line title + the same 3-line instruction.
 */
const I3 = 'Look at each picture carefully and read the whole sentence beside it. Then find the one word from the word bank that fits inside the empty box and write it there neatly.';
const CHROME = {
  three: { title: 'Fill in the Blank Sentences: Read Each Line, Look at the Picture and Write', instruction: I3 },
  four: { title: 'Kuvalliset täydennyslauseet: kirjoita jokaisen kuvan puuttuva sana laatikkoon', instruction: I3 },
  // under lang="fi" the en 3-line fixture wraps to FOUR lines (measured: 132 px, body 677); a Finnish 77-char title measures 3 lines (99 px, body 710)
  threeFi: { title: 'Täydennä lauseet: katso kuvaa, lue lause ja kirjoita puuttuva sana laatikkoon', instruction: I3 },
};

/**
 * Synthetic locale blocks for the validator poisons + controls (no non-EN block exists yet). Generated from the
 * locale's REAL pool (vocab gender + objForms + pictures) so every frame is clean by construction: 16 singular
 * frames "<Art> {gap} <predicate>" over the first pool nouns of the strong themes, a same-gender foil each,
 * fits = [noun]; 12 plural frames (da: none, refused); 6 stories of three <= 9-glyph nouns; the §6 strings.
 * Frame ids are "<noun>-syn" so a poison finds them by noun (FN). NB the NFD fold makes sv "kör" (drives) equal
 * "kor" (cows) — a real sv trap for the panel, recorded in the build report; the synthetic predicates avoid it.
 */
const SYN = {
  de: { art: (t, g) => t.nom[g], pred: 'schläft im Garten.', predPl: 'schlafen im Garten.', artPl: 'Die' },
  fr: { art: (t, g) => t[g], pred: 'dort dans le jardin.', predPl: 'dorment dans le jardin.', artPl: 'Les' },
  es: { art: (t, g) => t[g], pred: 'duerme en el jardín.', predPl: 'duermen en el jardín.', artPl: 'Los' },
  pt: { art: (t, g) => t[g], pred: 'dorme no jardim.', predPl: 'dormem no jardim.', artPl: 'Os' },
  it: { art: (t, g) => t[g], pred: 'dorme in giardino.', predPl: 'dormono in giardino.', artPl: 'I' },
  nl: { art: (t, g) => t[g], pred: 'slaapt in de tuin.', predPl: 'slapen in de tuin.', artPl: 'De' },
  sv: { art: (t, g) => t[g], pred: 'sover i trädgården.', predPl: 'sover i trädgården.', artPl: 'Många' },
  da: { art: (t, g) => t[g], pred: 'sover i haven.', predPl: 'sover i haven.', artPl: 'Mange' },
  no: { art: (t, g) => t[g], pred: 'sover i hagen.', predPl: 'sover i hagen.', artPl: 'Mange' },
  fi: { art: () => '', pred: 'nukkuu puutarhassa.', predPl: 'nukkuvat puutarhassa.', artPl: '' },
};
const SYN_TABLE = { de: { nom: { m: 'der', f: 'die', n: 'das' }, acc: { m: 'den', f: 'die', n: 'das' }, dat: { m: 'dem', f: 'der', n: 'dem' } }, fr: { m: 'le', f: 'la' }, es: { m: 'el', f: 'la' }, pt: { m: 'o', f: 'a' }, it: { m: 'il', f: 'la' }, nl: { d: 'de', h: 'het' }, sv: { n: 'en', t: 'ett' }, da: { n: 'en', t: 'et' }, no: { m: 'en', f: 'ei', n: 'et' }, fi: null };
const SYN_BOX = { de: 'ein Buchstabe in jedes Kästchen', fr: 'une lettre par case', es: 'una letra en cada casilla', pt: 'uma letra em cada quadradinho', it: 'una lettera per casella', nl: 'één letter per hokje', sv: 'en bokstav i varje ruta', da: 'et bogstav i hvert felt', no: 'en bokstav i hver rute', fi: 'yksi kirjain jokaiseen ruutuun' };
function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }
function synthetic(loc, en) {
  const mod = bankModule('cloze');
  const b = clone(en);
  const L = SYN[loc], table = SYN_TABLE[loc];
  const idx = pictureIndex();
  const forms = objFormsOf(loc);
  const strong = mod.strongThemes;
  const excluded = new Set(mod.excludeKeys);
  // the locale pool: every pool noun with a picture in a strong theme, in theme order
  const pool = [];
  const seen = new Set();
  for (const theme of strong) for (const [key, cands] of idx) {
    if (seen.has(key) || excluded.has(key)) continue;
    const c = cands.find((x) => x.theme === theme);
    if (!c || !isPoolNoun(loc, key)) continue;
    const e = entryOf(loc, key);
    if (loc === 'fr' && ARTICLES.fr.keyFor(e) == null) continue;
    if (loc === 'it' && itKey(e, { level: 2 }) == null) continue;
    if (loc !== 'fi' && !(e.gender && ((loc === 'de' && table.nom[e.gender]) || (loc !== 'de' && table[e.gender])))) continue;
    if (!/^\p{L}+$/u.test(e.singular) || graphemes(e.singular) > 12) continue;
    if (!countable(e)) continue;
    seen.add(key); pool.push({ key, theme, e });
  }
  // interleave the themes (round-robin) so every list pins >= 3 strong themes
  const byTheme = new Map(); for (const p of pool) { if (!byTheme.has(p.theme)) byTheme.set(p.theme, []); byTheme.get(p.theme).push(p); }
  pool.length = 0; const lists = [...byTheme.values()]; for (let i = 0; lists.some((l) => l.length > i); i++) for (const l of lists) if (l[i]) pool.push(l[i]);
  const twin = (k) => TYPE.twinGroupOf(k, mod.twins);
  const pick = (n, pred) => { const out = []; const groups = new Set(); for (const p of pool) { if (out.length >= n) break; if (!pred(p)) continue; const g = twin(p.key); if (g >= 0 && groups.has(g)) continue; if (g >= 0) groups.add(g); out.push(p); } return out; };
  const artOf = (p, plural) => (loc === 'fi' ? '' : plural ? L.artPl : cap(L.art(table, p.e.gender)));
  const frameOf = (p) => ({ id: p.key + '-syn', noun: p.key, form: 'sg', text: (artOf(p) ? artOf(p) + ' ' : '') + '{gap} ' + L.pred, fits: [p.key], predicateKind: 'verb', pic: { theme: p.theme, noun: p.key }, picOpened: true, signedExclusive: true });
  const singles = pick(16, () => true);
  b.frames = singles.map(frameOf);
  for (const f of b.frames) { if (loc === 'de') f.case = 'nom'; const g = entryOf(loc, f.noun).gender; const foil = pool.find((p) => p.key !== f.noun && entryOf(loc, p.key).gender === g && !singles.some((x) => x.key === p.key)); if (foil) f.foil = foil.key; }
  const usedS = new Set(singles.map((p) => p.key));
  const plurals = loc === 'da' ? [] : pick(12, (p) => !usedS.has(p.key) && forms[p.key] && forms[p.key].pl && fold(forms[p.key].pl) !== fold(p.e.singular));
  b.plural = plurals.map((p) => ({ id: p.key + '-synpl', noun: p.key, form: 'pl', text: (artOf(p, true) ? artOf(p, true) + ' ' : '') + '{gap} ' + L.predPl, clones: null, fits: [p.key], predicateKind: 'verb', pic: { theme: p.theme, noun: p.key }, picOpened: true, signedExclusive: true }));
  if (loc === 'de') b.plural.forEach((f) => { f.case = 'nom'; });
  const usedP = new Set(plurals.map((p) => p.key));
  const storyNouns = pick(18, (p) => !usedS.has(p.key) && !usedP.has(p.key) && graphemes(p.e.singular) <= 9);
  b.stories = [];
  for (let i = 0; i + 2 < storyNouns.length && b.stories.length < 6; i += 3) {
    const trio = storyNouns.slice(i, i + 3);
    b.stories.push({ id: 'story-syn-' + (i / 3), nouns: trio.map((p) => p.key), forms: ['sg', 'sg', 'sg'], cases: loc === 'de' ? ['nom', 'nom', 'nom'] : undefined,
      text: trio.map((p) => (artOf(p) ? artOf(p) + ' ' : '') + '{gap} ' + L.pred), fits: trio.map((p) => [p.key]), pics: trio.map((p) => ({ theme: p.theme, noun: p.key })), picOpened: true, signedExclusive: true });
  }
  Object.assign(b, { nameSlot: !['es', 'pt', 'it', 'fr'].includes(loc), articleTable: table, boxWord: SYN_BOX[loc], confusable: [], refuse: { plural: loc === 'da' } });
  b.strings = { base: { title: HEADS[loc], instruction: 'Katso kuvaa ja kirjoita sana.' }, letters: { title: HEADS[loc] + ' A', instruction: 'Kirjoita sana: ' + SYN_BOX[loc] + '.' }, choice: { title: HEADS[loc] + ' B', instruction: 'x' }, plural: { title: HEADS[loc] + ' C', instruction: 'x' }, story: { title: loc === 'fr' ? 'Texte à trous' : HEADS[loc] + ' D', instruction: 'x' }, match: { title: HEADS[loc] + ' E', instruction: 'x' } };
  if (loc === 'da') delete b.strings.plural;
  return b;
}
/** A frame of a block by NOUN (the EN ids differ from the synthetic ones). */
function FN(b, noun) { return b.frames.find((f) => f.noun === noun); }
/** The synthetic blocks lack the taxonomy slug (not registered yet) and their frames are not F2-shaped in every case: filter those known non-defects. */
const SYNTH_IGNORE = /^rule 16: axes|^WARN:/;

/* ------------------------------------------------------------------ 5. the faces (Phase 2; design §3; record _work/G1-350-faces.md) ------------------------------------------------------------------ */
const FACE_ROWS = require('../tools/b4var-rows/cloze.js').ROWS;
const WEBP_THEMES = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'image-library-webp', 'themes');   // the served library: every picture a face keeps must exist here as <theme>/<noun>@2x.webp
const FACE_OF = { letters: 'G1-366', choice: 'G1-367', plural: 'G2-349', story: 'G2-350', match: 'G1-368' };
function faceSpec(mode) {
  const row = FACE_ROWS.find((r) => r[5].mode === mode);
  if (!row) throw new Error('no row for mode ' + mode);
  return { row, spec: require(path.join('..', 'types', row[0], `${row[1]}-${row[2]}.js`)) };
}
/** A face over an injected bank (+ config overrides) — the same seam as withBank, keyed on the face's config. */
function faceWithBank(spec, bank, dOver) { return { ...spec, build: (a, c) => spec._buildWith(bank, { ...spec.difficulty[2], ...(dOver || {}) }, { locale: a.locale }, c) }; }

/** Render a face through the real pipeline and measure it: the root stamps, the stage vs the body, every lane / block / item, the pills, the lowest ink. */
async function renderFace(page, spec, { baseName, strings, locale = 'en' }) {
  const out = await renderInstance({ type: spec, theme: null, difficulty: 2, locale, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const r = (el) => { const b = el.getBoundingClientRect(); return { top: b.top, bottom: b.bottom, left: b.left, right: b.right, h: b.height, w: b.width }; };
    const root = document.querySelector('[data-lcs-cloze]');
    const body = r(document.querySelector('[data-lcs-body]')), foot = r(document.querySelector('.ws-foot')).top, title = r(document.querySelector('.ws-title'));
    const stage = root ? r(root.querySelector('[data-lcs-list], [data-lcs-match]') || root) : null;
    const banner = root && root.querySelector('[data-lcs-bank-banner]');
    const pad = (el) => { const cs = getComputedStyle(el); return parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom); };
    const contentH = (el) => Math.max(0, ...[...el.children].map((c) => r(c).h));
    let lowest = 0; document.querySelectorAll('.ws-body *').forEach((el) => { const b = el.getBoundingClientRect(); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
    const lanes = [...document.querySelectorAll('[data-lcs-row]')].map((ln) => {
      const p = ln.querySelector('[data-lcs-sentence]'), imgs = [...ln.querySelectorAll('img[data-lcs-pic]')], box = ln.querySelector('[data-lcs-gapbox]'), lg = ln.querySelector('[data-lcs-lettergap]'), strip = ln.querySelector('[data-lcs-clones]'), chipsEl = ln.querySelector('[data-lcs-chips]');
      return { frame: ln.dataset.lcsFrame, key: ln.dataset.lcsKey, form: ln.dataset.lcsForm, kase: ln.dataset.lcsCase || null, answer: ln.dataset.lcsAnswer, foil: ln.dataset.lcsFoil || null, boxesStamp: ln.dataset.lcsBoxes ? +ln.dataset.lcsBoxes : null,
        text: p ? p.textContent : '', pH: p ? r(p).h : 0, font: p ? parseFloat(getComputedStyle(p).fontSize) : 0,
        pic: imgs[0] ? imgs[0].dataset.lcsPic : null, src: imgs[0] ? imgs[0].src : null, picW: imgs[0] ? r(imgs[0]).w : 0, nImgs: imgs.length, sameSrc: new Set(imgs.map((i) => i.src)).size <= 1,
        boxW: box ? r(box).w : 0, boxH: box ? r(box).h : 0, lgBoxes: lg ? +lg.dataset.lcsBoxes : null, lgRects: lg ? lg.querySelectorAll('rect').length : 0, lgW: lg ? r(lg).w : 0, lgBoxPx: lg ? +(lg.querySelector('rect') || { getAttribute: () => 0 }).getAttribute('width') : 0,
        clones: strip ? +strip.dataset.lcsClones : null, idx: chipsEl ? +chipsEl.dataset.lcsIdx : null,
        chips: [...ln.querySelectorAll('[data-lcs-chip]')].map((c) => ({ word: c.dataset.lcsChip, role: c.dataset.lcsRole, h: r(c).h, w: r(c).w })),
        h: r(ln).h, inner: ln.clientHeight, scroll: ln.scrollHeight, blank: ln.clientHeight - pad(ln) - contentH(ln) };
    });
    const stories = [...document.querySelectorAll('[data-lcs-story]')].map((bk) => {
      const strip = bk.querySelector('[data-lcs-strip-order]');
      return { id: bk.dataset.lcsStoryId, keys: (bk.dataset.lcsKeys || '').split(','), order: strip ? strip.dataset.lcsStripOrder.split(',').map(Number) : [],
        pics: [...bk.querySelectorAll('img[data-lcs-strip-pic]')].map((i) => ({ key: i.dataset.lcsPic, src: i.src, w: r(i).w })),
        lines: [...bk.querySelectorAll('[data-lcs-sentence]')].map((p) => ({ line: +p.dataset.lcsLine, key: p.dataset.lcsKey, form: p.dataset.lcsForm, answer: p.dataset.lcsAnswer, frame: p.dataset.lcsFrame, text: p.textContent, pH: r(p).h, boxW: (p.querySelector('[data-lcs-gapbox]') || { getBoundingClientRect: () => ({ width: 0 }) }).getBoundingClientRect().width })),
        h: r(bk).h, inner: bk.clientHeight, scroll: bk.scrollHeight, blank: bk.clientHeight - pad(bk) - ([...bk.children].reduce((s, c) => s + r(c).h, 0) + 8 * Math.max(0, bk.children.length - 1)) };
    });
    const left = [...document.querySelectorAll('[data-lcs-match-left]')].map((it) => ({ frame: it.dataset.lcsMatchLeft, key: it.dataset.lcsKey, form: it.dataset.lcsForm, answer: it.dataset.lcsAnswer, text: (it.querySelector('[data-lcs-match-text]') || { textContent: '' }).textContent, h: r(it).h, top: r(it).top, bottom: r(it).bottom, imgs: it.querySelectorAll('img').length }));
    const right = [...document.querySelectorAll('[data-lcs-match-right]')].map((it) => { const im = it.querySelector('img'); return { key: it.dataset.lcsMatchRight, src: im ? im.src : null, picW: im ? r(im).w : 0, h: r(it).h, top: r(it).top, bottom: r(it).bottom, text: it.textContent.trim() }; });
    const pills = [...document.querySelectorAll('[data-lcs-bank-word]')].map((e) => ({ word: e.dataset.lcsBankWord, top: Math.round(r(e).top), font: parseFloat(getComputedStyle(e).fontSize) }));
    return { stamps: root ? { ...root.dataset } : null, body, foot, titleH: title.h, lines: Math.round(title.h / (30 * 1.1)), bank: banner ? r(banner).h : 0, stage, lowest, lanes, stories, left, right, pills, gapW: root ? +(root.dataset.lcsGapw || 0) : 0 };
  });
  return { ...out, verify: out.qa.verify, lints: out.qa.lints, m };
}

/** The node cross-check for a face: every stamped literal re-derived from the bank + globals (answerFor / pinned pictures / fits / foils / clones / strip orders / derangements / twins / themes). */
function faceCross(mode, m, bank, loc, globals) {
  const out = [];
  const G = globals || bankModule('cloze');
  const confusable = (bank.confusable || []).map((p) => p.slice().sort().join('|'));
  const twinsOk = (keys, where) => { const gs = keys.map((k) => TYPE.twinGroupOf(k, G.twins || [])).filter((g) => g >= 0); if (new Set(gs).size !== gs.length) out.push(`${where}: two keys of one twin group`); };
  const confOk = (keys, where) => { for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) if (confusable.includes([keys[i], keys[j]].sort().join('|'))) out.push(`${where}: confusable pair ${keys[i]} / ${keys[j]}`); };
  const pinOk = (f, src, L) => { try { const want = fileUri(f.pic.theme, f.pic.noun); if (src !== want) out.push(`${L}: picture src is not the pinned ${f.pic.theme}/${f.pic.noun}`); } catch (e) { out.push(`${L}: ${e.message}`); } };
  if (['letters', 'choice', 'plural'].includes(mode)) {
    const list = mode === 'plural' ? (bank.plural || []) : (bank.frames || []);
    const byId = new Map(list.map((f) => [f.id, f]));
    const keys = m.lanes.map((l) => l.key);
    const themes = new Map();
    const taken = m.lanes.map((l) => byId.get(l.frame)).filter(Boolean);
    m.lanes.forEach((l, i) => {
      const L = `lane ${i + 1}`;
      const f = byId.get(l.frame);
      if (!f) { out.push(`${L}: frame "${l.frame}" is not in the ${mode === 'plural' ? 'plural' : 'frames'} list`); return; }
      if (f.noun !== l.key) out.push(`${L}: stamped key ${l.key}, the frame's noun is ${f.noun}`);
      if (f.form !== l.form) out.push(`${L}: stamped form ${l.form}, the frame says ${f.form}`);
      if ((f.case || null) !== l.kase) out.push(`${L}: stamped case ${l.kase}, the frame says ${f.case || null}`);
      let a = null; try { a = TYPE.answerFor(loc, f.noun, f.form); } catch (e) { out.push(`${L}: ${e.message}`); }
      if (a && a !== l.answer) out.push(`${L}: stamped answer "${l.answer}", answerFor says "${a}"`);
      if (a && hasWord(l.text, a)) out.push(`${L}: the answer "${a}" is printed`);
      const other = ['pl', 'defPl'].includes(f.form) ? 'sg' : 'pl';
      let o = null; try { o = TYPE.answerFor(loc, f.noun, other); } catch (e) { o = null; }
      if (o && hasWord(l.text, o)) out.push(`${L}: the other number "${o}" is printed`);
      if (l.pic !== f.noun) out.push(`${L}: picture "${l.pic}" != the frame's noun`);
      pinOk(f, l.src, L);
      for (const x of f.fits) if (x !== f.noun && keys.includes(x)) out.push(`${L}: fits "${x}" is another lane's key (two answers fit)`);
      for (const t of taken) if (t !== f && t.fits.includes(f.noun)) out.push(`${L}: key "${f.noun}" fits frame ${t.id}`);
      const [tok] = tokensBefore(f.text);
      const e = entryOf(loc, f.noun);
      if (e && loc === 'en' && ['a', 'an'].includes(tok) && ['a', 'an'][ARTICLES.en.keyFor(e)] !== tok) out.push(`${L}: article "${tok}" before "${e.singular}"`);
      if (e && !['en', 'fi', 'fr', 'it'].includes(loc) && f.form === 'sg' && articleLiterals(loc, bank.articleTable).has(tok)) { const want = expectedArticle(loc, bank.articleTable, e.gender, f.case); if (want && fold(want) !== tok) out.push(`${L}: article "${tok}" before "${e.singular}" (table says ${want})`); }
      themes.set(f.pic.theme, (themes.get(f.pic.theme) || 0) + 1);
      if (l.font < 16) out.push(`${L}: font ${l.font} < 16`);
      if (l.scroll > l.inner + 0.6) out.push(`${L}: lane content ${l.scroll} > inner ${l.inner} (clipped)`);
      if (mode === 'letters') {
        if (l.lgBoxes !== graphemes(l.answer) || l.boxesStamp !== graphemes(l.answer)) out.push(`${L}: ${l.lgBoxes} / ${l.boxesStamp} boxes for "${l.answer}" (${graphemes(l.answer)} graphemes)`);
        if (l.lgRects !== l.lgBoxes) out.push(`${L}: ${l.lgRects} rects for ${l.lgBoxes} boxes`);
        if (l.lgBoxPx < 44) out.push(`${L}: letter box ${l.lgBoxPx} px < the G1 floor 44`);
        if (!/^\p{L}+$/u.test(l.answer)) out.push(`${L}: the answer "${l.answer}" is not one word`);
        if (l.boxW) out.push(`${L}: a gap box on the letters face`);
        if (l.picW < 56 - 0.6) out.push(`${L}: picture ${l.picW.toFixed(1)} < 56`);
      }
      if (mode === 'choice') {
        const foil = f.foil;
        if (l.foil !== foil) out.push(`${L}: stamped foil "${l.foil}", the frame says "${foil}"`);
        let fa = null; try { fa = TYPE.answerFor(loc, foil, 'sg'); } catch (e) { out.push(`${L}: foil ${e.message}`); }
        const chipFoil = (l.chips.find((c) => c.role === 'foil') || {}).word, chipAns = (l.chips.find((c) => c.role === 'answer') || {}).word;
        if (fa && chipFoil !== fa) out.push(`${L}: the foil chip prints "${chipFoil}", answerFor(${foil}, sg) is "${fa}"`);
        if (chipAns !== l.answer) out.push(`${L}: the answer chip prints "${chipAns}", the stamp says "${l.answer}"`);
        if (l.chips.length !== 2) out.push(`${L}: ${l.chips.length} chips`);
        if (l.chips.some((c) => c.h < 44 - 0.6)) out.push(`${L}: a chip under 44`);
        if (f.fits.includes(foil)) out.push(`${L}: the foil "${foil}" is in fits`);
        if (keys.includes(foil)) out.push(`${L}: the foil "${foil}" is a picture on the page`);
        const g1 = TYPE.genderOf(loc, f.noun), g2 = TYPE.genderOf(loc, foil);
        if (g1 && g2 && g1 !== g2) out.push(`${L}: foil gender ${g2} != ${g1}`);
        if (confusable.includes([f.noun, foil].sort().join('|'))) out.push(`${L}: the foil is the confusable partner`);
        if (l.pH > 40.5) out.push(`${L}: sentence ${l.pH.toFixed(1)} > 40 (wrapped)`);
        if (l.boxW < 150 - 0.6 || l.boxW > 168.6 || Math.abs(l.boxW - m.gapW) > 1) out.push(`${L}: box ${l.boxW.toFixed(1)} vs gapW ${m.gapW} (150..168)`);
        if (l.picW < 56 - 0.6) out.push(`${L}: picture ${l.picW.toFixed(1)} < 56`);
      }
      if (mode === 'plural') {
        if (f.clones != null && l.clones !== f.clones) out.push(`${L}: ${l.clones} clones, the frame names ${f.clones}`);
        if (l.clones < 2 || l.clones > 3 || l.nImgs !== l.clones || !l.sameSrc) out.push(`${L}: ${l.nImgs} pictures for ${l.clones} clones`);
        if (l.picW < 44 - 0.6) out.push(`${L}: clone ${l.picW.toFixed(1)} < 44`);
        if (l.pH > 64.5) out.push(`${L}: sentence ${l.pH.toFixed(1)} > 64`);
        if (l.boxW < 150 - 0.6 || Math.abs(l.boxW - m.gapW) > 1) out.push(`${L}: box ${l.boxW.toFixed(1)} vs gapW ${m.gapW}`);
        const e2 = entryOf(loc, f.noun); if (e2 && !countable(e2)) out.push(`${L}: "${f.noun}" is not countable`);
      }
    });
    for (const [t, n] of themes) if (n > 2) out.push(`${n} lanes from the theme "${t}" (> 2)`);
    if (new Set(keys).size !== keys.length) out.push('a key twice on the page');
    twinsOk(keys, 'page'); confOk(keys, 'page');
    const answers = m.lanes.map((l) => fold(l.answer));
    if (m.pills.length) { for (const a of answers) if (!m.pills.some((p) => fold(p.word) === a)) out.push(`answer "${a}" missing from the bank`); if (m.pills.some((p, i) => fold(p.word) === answers[i])) out.push('the bank is not deranged'); }
    if (!m.lanes.length) out.push('non-vacuity: 0 lanes');
  } else if (mode === 'story') {
    const byId = new Map((bank.stories || []).map((s) => [s.id, s]));
    const allKeys = m.stories.flatMap((b) => b.keys);
    const taken = m.stories.map((b) => byId.get(b.id)).filter(Boolean);
    m.stories.forEach((b, bi) => {
      const B = `block ${bi + 1}`;
      const s = byId.get(b.id);
      if (!s) { out.push(`${B}: story "${b.id}" is not in the bank`); return; }
      if (b.keys.join(',') !== s.nouns.join(',')) out.push(`${B}: keys ${b.keys.join(',')} != the story's nouns ${s.nouns.join(',')}`);
      if (b.order.join(',') === '0,1,2') out.push(`${B}: the strip is in sentence order`);
      b.pics.forEach((p, j) => { const i = b.order[j]; if (p.key !== s.nouns[i]) out.push(`${B}: strip picture ${j + 1} "${p.key}" != nouns[${i}]`); try { if (p.src !== fileUri(s.pics[i].theme, s.pics[i].noun)) out.push(`${B}: strip picture ${j + 1} is not the pinned ${s.pics[i].theme}/${s.pics[i].noun}`); } catch (e) { out.push(`${B}: ${e.message}`); } if (p.w < 44 - 0.6) out.push(`${B}: strip picture ${p.w.toFixed(1)} < 44`); });
      let name = null;
      b.lines.forEach((l, i) => {
        const L = `${B} line ${i + 1}`;
        let a = null; try { a = TYPE.answerFor(loc, s.nouns[i], s.forms[i]); } catch (e) { out.push(`${L}: ${e.message}`); }
        if (a && a !== l.answer) out.push(`${L}: stamped answer "${l.answer}", answerFor says "${a}"`);
        if (l.key !== s.nouns[i] || l.form !== s.forms[i]) out.push(`${L}: key / form stamp != the story`);
        // the rendered text = the story line with {gap} removed and ONE name in every {name}
        const names = (SENTENCES[loc] && SENTENCES[loc].names) || [];
        const norm = (t) => t.replace(/\s+/g, ' ').trim();
        const want = s.text[i].replace('{gap}', '');
        if (/\{name\}/.test(want)) { const hit = names.find((n) => norm(l.text) === norm(want.replace(/\{name\}/g, n))); if (!hit) out.push(`${L}: the rendered text "${norm(l.text)}" is not the story line with one name`); else if (name && hit !== name) out.push(`${B}: two names (${name} / ${hit}) inside one story`); else name = hit; }
        else if (norm(l.text) !== norm(want)) out.push(`${L}: the rendered text "${norm(l.text)}" != the story line`);
        for (const k of allKeys) for (const form of ['sg', 'pl']) { let o = null; try { o = TYPE.answerFor(loc, k, form); } catch (e) { o = null; } if (o && hasWord(l.text, o)) out.push(`${L}: prints "${o}" (a page noun)`); }
        for (const x of s.fits[i]) if (x !== s.nouns[i] && allKeys.includes(x)) out.push(`${L}: fits "${x}" is another gap's key on the page`);
        if (l.pH > 40.5) out.push(`${L}: line ${l.pH.toFixed(1)} > 40`);
        if (l.boxW < 150 - 0.6 || l.boxW > 168.6 || Math.abs(l.boxW - m.gapW) > 1) out.push(`${L}: box ${l.boxW.toFixed(1)} vs gapW ${m.gapW}`);
      });
      for (const t of taken) if (t !== s) for (const fl of t.fits) for (const x of fl) if (s.nouns.includes(x)) out.push(`${B}: noun "${x}" fits a line of story ${t.id}`);
      if (b.scroll > b.inner + 0.6) out.push(`${B}: block content clipped`);
    });
    if (new Set(allKeys).size !== allKeys.length) out.push('a key twice on the story page');
    twinsOk(allKeys, 'page'); confOk(allKeys, 'page');
    const answers = m.stories.flatMap((b) => b.lines.map((l) => fold(l.answer)));
    if (new Set(answers).size !== answers.length) out.push('an answer twice on the story page');
    if (m.pills.length !== answers.length) out.push(`${m.pills.length} pills for ${answers.length} gaps`);
    for (const a of answers) if (!m.pills.some((p) => fold(p.word) === a)) out.push(`answer "${a}" missing from the bank`);
    if (m.pills.some((p, i) => fold(p.word) === answers[i])) out.push('the bank is not deranged against the line order');
    if (new Set(m.pills.map((p) => p.top)).size > 2) out.push('bank > 2 rows');
    if (!m.stories.length) out.push('non-vacuity: 0 blocks');
  } else if (mode === 'match') {
    const byId = new Map((bank.frames || []).map((f) => [f.id, f]));
    const keys = m.left.map((l) => l.key);
    const taken = m.left.map((l) => byId.get(l.frame)).filter(Boolean);
    m.left.forEach((l, i) => {
      const L = `left ${i + 1}`;
      const f = byId.get(l.frame);
      if (!f) { out.push(`${L}: frame "${l.frame}" is not in the bank`); return; }
      if (f.noun !== l.key || f.form !== l.form) out.push(`${L}: key / form stamp != the frame`);
      let a = null; try { a = TYPE.answerFor(loc, f.noun, f.form); } catch (e) { out.push(`${L}: ${e.message}`); }
      if (a && a !== l.answer) out.push(`${L}: stamped answer "${l.answer}", answerFor says "${a}"`);
      for (const k of keys) for (const form of ['sg', 'pl']) { let o = null; try { o = TYPE.answerFor(loc, k, form); } catch (e) { o = null; } if (o && hasWord(l.text, o)) out.push(`${L}: prints "${o}" (a page noun)`); }
      for (const x of f.fits) if (x !== f.noun && keys.includes(x)) out.push(`${L}: fits "${x}" is another picture on the page (two pictures fit)`);
      for (const t of taken) if (t !== f && t.fits.includes(f.noun)) out.push(`${L}: key "${f.noun}" fits frame ${t.id}`);
      if (l.imgs) out.push(`${L}: a picture inside a sentence item`);
      const r = m.right.find((x) => x.key === l.key);
      if (!r) out.push(`${L}: no picture for "${l.key}" on the right`); else pinOk(f, r.src, L);
    });
    m.right.forEach((rt, i) => { if (rt.key === keys[i]) out.push(`right ${i + 1}: straight across from its sentence`); if (rt.picW < 64 - 0.6) out.push(`right ${i + 1}: picture ${rt.picW.toFixed(1)} < 64`); if (rt.text) out.push(`right ${i + 1}: prints "${rt.text}"`); });
    if (keys.slice().sort().join() !== m.right.map((r) => r.key).sort().join()) out.push('the right keys != the left keys');
    twinsOk(keys, 'page'); confOk(keys, 'page');
    if (m.pills.length) out.push('a bank on the match face');
    if (!m.left.length) out.push('non-vacuity: 0 pairs');
  }
  return out;
}

/** Sparse + fill measures of a face render, printed by the gate. */
function faceMeasures(m) {
  const slackUnder = (items) => (items.length ? Math.round(m.foot - Math.max(...items.map((i) => i.bottom))) : null);
  if (m.lanes.length) return `body ${Math.round(m.body.h)} bank ${m.bank.toFixed(0)} lanes ${m.lanes.map((l) => l.h.toFixed(0)).join('/')} blank<=44 ${Math.max(...m.lanes.map((l) => Math.round(l.blank)))} stage ${Math.round(m.stage.h)} lowest ${Math.round(m.lowest)} vs foot ${Math.round(m.foot)}`;
  if (m.stories.length) return `body ${Math.round(m.body.h)} bank ${m.bank.toFixed(0)} blocks ${m.stories.map((b) => b.h.toFixed(0)).join('/')} blank<=44 ${Math.max(...m.stories.map((b) => Math.round(b.blank)))} lowest ${Math.round(m.lowest)} vs foot ${Math.round(m.foot)}`;
  if (m.left.length) { const bands = []; for (const col of [m.left, m.right]) for (let i = 1; i < col.length; i++) bands.push(col[i].top - col[i - 1].bottom); return `body ${Math.round(m.body.h)} items ${m.left.map((l) => l.h.toFixed(0)).join('/')} band<=44 ${Math.round(Math.max(...bands))} slack-under ${slackUnder(m.left)} lowest ${Math.round(m.lowest)} vs foot ${Math.round(m.foot)}`; }
  return '';
}

/* ------------------------------------------------------------------ main ------------------------------------------------------------------ */

async function main() {
  const all = bankModule('cloze');
  const en = all.en;
  const t0 = Date.now();
  console.log(`verify-b4-cloze ${QUICK ? '(--quick) ' : ''}— locales on disk: ${LOCALES.filter((l) => all[l]).join(' ')}`);

  // ---- 1. the bank(s)
  for (const loc of LOCALES.filter((l) => all[l])) {
    const errs = validateBank(all[loc], loc);
    const hard = errs.filter((e) => !/^WARN:/.test(e));
    ok(hard.length === 0, `bank ${loc}: ${hard.join(' | ')}`);
    errs.filter((e) => /^WARN:/.test(e)).forEach((w) => console.log('  ' + w));
    console.log(`bank ${loc}: ${hard.length ? hard.length + ' fails' : 'clean'} (frames ${all[loc].frames.length}, plural ${all[loc].plural.length}, stories ${all[loc].stories.length})`);
  }
  // the synthetic blocks are themselves clean controls for the non-EN rules
  for (const loc of ['de', 'fr', 'es', 'sv', 'da', 'fi']) {
    const errs = validateBank(synthetic(loc, en), loc).filter((e) => !SYNTH_IGNORE.test(e));
    ok(errs.length === 0, `synthetic ${loc} control: ${errs.join(' | ')}`);
  }
  // pure helpers
  ok(TYPE.answerFor('en', 'cow', 'sg') === 'cow' && TYPE.answerFor('en', 'cow', 'pl') === 'cows' && TYPE.answerFor('de', 'cow', 'sg') === 'Kuh' && TYPE.answerFor('de', 'cow', 'pl') === 'Kühe' && TYPE.answerFor('fi', 'cow', 'part') === 'lehmää' && TYPE.answerFor('sv', 'cow', 'def') === 'kon', 'answerFor reads the reviewed literals');
  { let m = null; try { TYPE.answerFor('en', 'cow', 'part'); } catch (e) { m = e.message; } ok(m && /missing/.test(m), `answerFor refuses a missing form: ${m}`); }
  { let m = null; try { TYPE.answerFor('en', 'cow', 'accusative'); } catch (e) { m = e.message; } ok(m && /not one of/.test(m), `answerFor refuses an unknown form: ${m}`); }
  ok(TYPE.gapWidth(['elephant']) === 152 && TYPE.gapWidth(['Schmetterling']) === 232 && TYPE.gapWidth(['hippopotamus']) === 216 && TYPE.gapWidth(['granaattiomena']) === 248 && TYPE.gapWidth(['owl']) === 150 && TYPE.gapWidth(['a'.repeat(30)]) === 300, 'gapWidth: 152 / 232 / 216 / 248 / floor 150 / cap 300');
  ok(TYPE.twinGroupOf('cherry', all.twins) === 3 && TYPE.twinGroupOf('cow', all.twins) === -1, 'twinGroupOf');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    // rule 13's measurer: a title's rendered line count at the shell width
    const titleLines = async (title) => { const r = await renderWith(page, TYPE, { baseName: 'G1-350-gate-titlelines', strings: { title, instruction: 'x' } }); return r.m.lines; };
    const lines3 = await titleLines(CHROME.three.title), lines4 = await titleLines(CHROME.four.title);
    ok(lines3 === 3, `the 3+3 chrome fixture title wraps to ${lines3} lines, want 3`);
    ok(lines4 === 4, `the 677 chrome fixture title wraps to ${lines4} lines, want 4`);
    const fiBase = await titleLines('Täydennä lauseet');
    ok(fiBase <= 3, `the proposed fi base title wraps to ${fiBase} lines`);
    console.log(`title lines: 722-fixture ${lines3} · 677-fixture ${lines4} · "Täydennä lauseet" ${fiBase}`);

    // ---- 2. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-350-gate-d${d}-en` });
      assertRender(`d${d} en`, r, { rows: TYPE.difficulty[d].rows });
      const cc = crossCheck(r.m, en, 'en', all);
      ok(cc.length === 0, `d${d} en node cross-check: ${cc.join(' | ')}`);
      ok(r.m.lanes.every((l) => l.picW >= (d === 1 ? 64 : BASE_PIC) - 0.6), `d${d}: pictures ${r.m.lanes.map((l) => l.picW.toFixed(0)).join('/')} >= ${d === 1 ? 64 : BASE_PIC}`);
      ok(r.m.pills.length === TYPE.difficulty[d].rows + (TYPE.difficulty[d].extra || 0), `d${d}: ${r.m.pills.length} pills`);
      console.log(`render d${d} en: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} bank ${r.m.bank.toFixed(1)} lanes ${r.m.lanes.map((l) => l.h.toFixed(1)).join('/')} gapW ${r.m.gapW} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // d2 under the 3-line title + 3-line instruction chrome — the README's "722" measures 710
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-350-gate-d2-en-chrome722', strings: CHROME.three });
      assertRender('d2 en 3+3 chrome', r, { rows: 7 });
      ok(r.m.body.h <= 724 && r.m.body.h >= 700, `3+3 chrome fixture gives body ${Math.round(r.m.body.h)} (README 722; measured 710)`);
      ok(r.m.bank >= 100 && r.m.bank <= 116, `two-row bank ${r.m.bank.toFixed(1)} (design est. 109)`);
      const cc = crossCheck(r.m, en, 'en', all);
      ok(cc.length === 0, `d2 3+3 chrome node cross-check: ${cc.join(' | ')}`);
      console.log(`render d2 en 3+3 chrome: body ${r.m.body.h.toFixed(1)} bank ${r.m.bank.toFixed(1)} lanes ${r.m.lanes.map((l) => l.h.toFixed(1)).join('/')} inner ${r.m.lanes[0].inner} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // the long-frame page (de-length frames -> the two-line row) at 710
    {
      const long = clone(en);
      long.frames = long.frames.map((f, i) => ({ ...f, text: i % 2 ? 'Am Morgen frisst the {gap} das grüne Gras auf der Wiese.' : 'Der kleine {gap} schläft in seinem Körbchen im Garten.' }));
      const r = await renderWith(page, withBank(TYPE, long, { maxChars: 60 }), { difficulty: 2, baseName: 'G1-350-gate-d2-long-chrome722', strings: CHROME.three });
      assertRender('d2 long frames 3+3 chrome', r, { rows: 7 });
      ok(r.m.lanes.every((l) => l.pH > 50 && l.pH <= 64.5), `long frames: sentences ${r.m.lanes.map((l) => l.pH.toFixed(1)).join('/')} (two lines, <= 64)`);
      console.log(`render d2 long frames 3+3 chrome: sentences ${r.m.lanes.map((l) => l.pH.toFixed(1)).join('/')} lanes ${r.m.lanes.map((l) => l.h.toFixed(1)).join('/')} inner/scroll ${r.m.lanes.map((l) => l.inner + '/' + l.scroll).join(' ')}`);
    }
    // PR13 — the base under a 4-line title: must FAIL (the footer lint), the reason rule 13 caps the fi title
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-350-gate-d2-en-chrome677', strings: CHROME.four });
      const failed = [...r.verify, ...r.lints];
      ok(r.m.body.h <= 690, `677 chrome fixture gives body ${Math.round(r.m.body.h)} (want 677)`);
      poisonTotal++;
      if (ok(failed.some((f) => /footer overlap|overflow/.test(f)), `PR13 677 chrome: the base must fail (footer / overflow), got ${JSON.stringify(failed)}`)) killed++;
      console.log(`render d2 en 677 chrome (PR13): body ${Math.round(r.m.body.h)} → ${failed.length} fails (${failed[0]})`);
    }

    // ---- component smoke: the five face components through the real pipeline
    {
      const rng = makeRng('G1-350-components');
      const P = (theme, noun) => ({ src: fileUri(theme, noun), key: noun });
      const cow = P('farm animals', 'cow'), owl = P('forest creatures', 'owl'), tractor = P('vehicles', 'tractor');
      const body = [
        `<div style="display:grid;grid-template-rows:auto auto;row-gap:8px;flex:0 0 auto">` +
          C4.gapRow({ n: 1, src: cow.src, key: 'cow', frameId: 'cow-milk', form: 'sg', text: 'The {gap} gives us milk.', answer: 'cow', slot: C4.letterGap({ n: 12 }), attrs: 'data-lcs-boxes="12"' }) +
          C4.gapRow({ n: 2, src: owl.src, key: 'owl', frameId: 'owl-hoot', form: 'sg', text: 'The {gap} hoots in the tree at night.', answer: 'owl', slot: C4.gapBox({ w: 168, h: 36 }), attrs: 'data-lcs-choice="1"' }).replace('</p></div>', '</p>' + C4.choiceGap({ chips: [{ word: 'owl', role: 'answer' }, { word: 'duck', role: 'foil' }], idx: 0 }).replace('style="justify-content:flex-start;padding-top:6px"', 'style="grid-column:3;justify-content:flex-start;padding-top:6px"') + '</div>') +
        `</div>`,
        `<div style="display:grid;grid-template-rows:auto;flex:0 0 auto">` + C4.cloneGapRow({ n: 3, src: cow.src, key: 'cow', clones: 3, text: 'The {gap} sleep in the barn.', answer: 'cows', slot: C4.gapBox({ w: 232 }), frameId: 'cows-barn' }) + `</div>`,
        C4.storyBlock({ n: 4, pics: [P('farm animals', 'rooster'), cow, tractor], order: [2, 0, 1], gapW: 168, storyId: 'farm-morning',
          lines: [{ text: 'Early in the morning the {gap} crows.', key: 'rooster', form: 'sg', answer: 'rooster', frameId: 'farm-morning/0' }, { text: 'Then Mia milks the {gap}.', key: 'cow', form: 'sg', answer: 'cow', frameId: 'farm-morning/1' }, { text: 'Then Mia drives the {gap} to the field.', key: 'tractor', form: 'sg', answer: 'tractor', frameId: 'farm-morning/2' }] }),
      ].join('<div style="height:10px"></div>');
      const matchBody = C4.sentenceMatch({
        left: [['cow-milk', 'cow', 'The {gap} gives us milk.'], ['owl-hoot', 'owl', 'The {gap} hoots in the tree at night.'], ['tractor-plow', 'tractor', 'The {gap} plows the field on the farm.'], ['zebra-stripes', 'zebra', 'The {gap} has black and white stripes.'], ['kite-wind', 'kite', 'Mia flies the {gap} on a windy day.'], ['bee-honey', 'bee', 'The {gap} makes honey in the hive.']].map(([frameId, key, text]) => ({ frameId, key, text, form: 'sg', answer: key })),
        right: [cow, owl, tractor, P('animals', 'zebra'), P('toys', 'kite'), P('Things That Fly', 'bee')], order: [3, 0, 5, 1, 2, 4],
      });
      const fake = (html, id) => ({ ...TYPE, id, build: async () => ({ bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column">${html}</div>`, meta: {} }), verify: async () => [] });
      const r1 = await renderWith(page, fake(body, 'G1-350'), { baseName: 'G1-350-gate-components' });
      ok(r1.lints.length === 0, `components smoke: lints ${JSON.stringify(r1.lints)}`);
      const h = await page.evaluate(() => {
        const r = (el) => el.getBoundingClientRect();
        const rows = [...document.querySelectorAll('[data-lcs-row]')].map((e) => r(e).height);
        const lg = document.querySelector('[data-lcs-lettergap]');
        const chips = [...document.querySelectorAll('[data-lcs-chip]')].map((c) => [r(c).height, r(c).width]);
        const clones = document.querySelectorAll('[data-lcs-clones] img').length;
        const story = document.querySelector('[data-lcs-story]');
        const storyPs = [...story.querySelectorAll('[data-lcs-sentence]')].map((p) => r(p).height);
        return { rows, lg: lg ? [r(lg).width, r(lg).height] : null, boxes: document.querySelectorAll('[data-lcs-lettergap] rect').length, chips, clones, story: r(story).height, storyPs, strip: document.querySelector('[data-lcs-strip-order]').dataset.lcsStripOrder };
      });
      ok(h.lg && Math.abs(h.lg[0] - 358) < 1 && h.boxes === 12, `letterGap 12 boxes = ${h.lg && h.lg[0].toFixed(1)} px wide, ${h.boxes} rects (design 358)`);
      ok(h.chips.length === 2 && h.chips.every(([ch]) => ch >= 44 - 0.6), `choiceGap chips ${JSON.stringify(h.chips.map(([a, b]) => [Math.round(a), Math.round(b)]))} (>= 44 high)`);
      ok(h.clones === 3, `cloneGapRow ${h.clones} clones`);
      ok(h.story >= 186 && h.story <= 200 && h.storyPs.every((x) => x <= 40.5), `storyBlock ${h.story.toFixed(1)} px (design 192), lines ${h.storyPs.map((x) => x.toFixed(1)).join('/')}`);
      ok(h.strip === '2,0,1', `storyBlock strip order stamped ${h.strip}`);
      ok(h.rows[0] <= 77.5 && h.rows[1] <= 125 && h.rows[2] <= 78.5, `face rows at their natural height: letters ${h.rows[0].toFixed(1)} (<= 77) · choice ${h.rows[1].toFixed(1)} (<= 125 as naively stacked here; the F2 row proper is Phase 2's to lay out at the design's 100) · plural ${h.rows[2].toFixed(1)} (<= 78)`);
      console.log(`components: letters row ${h.rows[0].toFixed(1)} (design 77) · choice row ${h.rows[1].toFixed(1)} (design 100) · plural row ${h.rows[2].toFixed(1)} (design 78) · storyBlock ${h.story.toFixed(1)} · letterGap ${h.lg[0].toFixed(1)} x ${h.lg[1].toFixed(1)} · chips ${h.chips.map(([a, b]) => Math.round(a) + 'x' + Math.round(b)).join(' ')}`);
      const r2 = await renderWith(page, fake(`<div data-lcs-matchbox style="height:624px;display:flex;flex-direction:column;flex:0 0 624px">${matchBody}</div>`, 'G1-350'), { baseName: 'G1-350-gate-components-match' });
      ok(r2.lints.length === 0, `sentenceMatch smoke: lints ${JSON.stringify(r2.lints)}`);
      const s = await page.evaluate(() => { const r = (el) => el.getBoundingClientRect(); return { left: [...document.querySelectorAll('[data-lcs-match-left]')].map((e) => [r(e).height, r(e.querySelector('[data-lcs-match-text]')).height]), right: [...document.querySelectorAll('[data-lcs-match-right]')].map((e) => [e.dataset.lcsMatchRight, r(e.querySelector('img')).width]), total: r(document.querySelector('[data-lcs-match]')).height, boxOverflow: document.querySelector('[data-lcs-matchbox]').scrollHeight - document.querySelector('[data-lcs-matchbox]').clientHeight, imgsLeft: document.querySelectorAll('[data-lcs-match-left] img').length }; });
      ok(s.left.length === 6 && s.left.every(([hh, th]) => Math.abs(hh - 92) < 1 && th <= 60), `sentenceMatch left items ${s.left.map(([a, b]) => Math.round(a) + '/' + Math.round(b)).join(' ')} (92; two-line text 53.4 = the 30 px slim-box line + 23.4, design est. 47)`);
      ok(s.right.every(([, w]) => w >= 64 - 0.6) && s.imgsLeft === 0, `sentenceMatch right pictures ${s.right.map(([k, w]) => k + '@' + Math.round(w)).join(' ')} (64), 0 imgs on the left`);
      ok(s.total <= 624.6 && s.boxOverflow <= 0, `sentenceMatch block ${s.total.toFixed(1)} px in a 624 box (overflow ${s.boxOverflow})`);
      console.log(`components: sentenceMatch ${s.total.toFixed(1)} · left ${s.left.map(([a, b]) => Math.round(a) + '/' + Math.round(b)).join(' ')} · right ${s.right.map(([k]) => k).join(',')}`);
      // component throws (contracts)
      const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `${what}: ${m || 'did NOT throw'}`); };
      throws(() => C4.gapBox({ w: 140 }), /outside/, 'gapBox w 140');
      throws(() => C4.gapBox({ w: 320 }), /outside/, 'gapBox w 320');
      throws(() => C4.gapBox({ w: 200, h: 30 }), /outside/, 'gapBox h 30');
      ok(/data-lcs-slim/.test(C4.gapBox({ w: 90, h: 30, slim: true })), 'gapBox slim 90 x 30 renders');
      throws(() => C4.letterGap({ n: 5, box: 24 }), /below 26/, 'letterGap box 24');
      throws(() => C4.gapRow({ n: 1, src: 'x', key: 'cow', frameId: 'f', form: 'sg', text: 'The {gap} and the {gap}.', answer: 'cow', slot: C4.gapBox({ w: 150 }) }), /exactly once/, 'gapRow two gaps (P9)');
      throws(() => C4.gapRow({ n: 1, src: 'x', key: 'cow', frameId: 'f', form: 'sg', text: 'The cow is a {gap}.', answer: 'cow', slot: C4.gapBox({ w: 150 }) }), /prints its answer/, 'gapRow answer in the text');
      throws(() => C4.gapRow({ n: 1, src: 'x', key: 'cow', frameId: 'f', form: 'sg', text: 'The {gap}.', answer: 'cow', slot: C4.gapBox({ w: 150 }), picPx: 40 }), /below the G1 floor/, 'gapRow picPx 40');
      throws(() => C4.choiceGap({ chips: [{ word: 'owl', role: 'answer' }, { word: 'owl', role: 'foil' }], idx: 0 }), /duplicate/, 'choiceGap duplicate chips');
      throws(() => C4.choiceGap({ chips: [{ word: 'owl', role: 'answer' }, { word: 'duck', role: 'foil' }], idx: 2 }), /outside 0..1/, 'choiceGap idx 2');
      throws(() => C4.choiceGap({ chips: [{ word: 'owl', role: 'answer' }, { word: 'duck', role: 'foil' }], idx: 0, h: 40 }), /below the G1 floor/, 'choiceGap h 40');
      throws(() => C4.cloneGapRow({ n: 1, src: cow.src, key: 'cow', clones: 4, text: 'The {gap}.', answer: 'cows', slot: C4.gapBox({ w: 150 }), frameId: 'f' }), /outside 2..3/, 'cloneGapRow 4 clones');
      throws(() => C4.storyBlock({ n: 1, pics: [cow, owl, tractor], order: [0, 1], gapW: 150, lines: [] }), /3 pics \+ 3 lines/, 'storyBlock 2 lines');
      throws(() => C4.storyBlock({ n: 1, pics: [cow, owl, tractor], order: [0, 0, 1], gapW: 150, lines: [{ text: 'a {gap}', key: 'cow', form: 'sg', answer: 'cow' }, { text: 'b {gap}', key: 'owl', form: 'sg', answer: 'owl' }, { text: 'c {gap}', key: 'tractor', form: 'sg', answer: 'tractor' }] }), /permutation/, 'storyBlock order not a permutation');
      throws(() => C4.sentenceMatch({ left: [{ frameId: 'a', key: 'cow', text: 'x {gap}', answer: 'cow' }, { frameId: 'b', key: 'owl', text: 'y {gap}', answer: 'owl' }], right: [cow, owl], order: [0, 1] }), /derangement/, 'sentenceMatch fixed point (PR6)');
      throws(() => C4.sentenceMatch({ left: [{ frameId: 'a', key: 'cow', text: 'the cow {gap}', answer: 'cow' }, { frameId: 'b', key: 'owl', text: 'y {gap}', answer: 'owl' }], right: [cow, owl], order: [1, 0] }), /prints its answer/, 'sentenceMatch answer printed (PR7)');
      throws(() => C4.gapBank({ words: Array.from({ length: 9 }, (_, i) => 'a'.repeat(14) + i), rng }), /third row/, 'gapBank 9 x 14-glyph pills (PR10)');
      throws(() => C4.gapBank({ words: ['owl', 'cow', 'bee'], order: [0, 2, 1] }), /fixed point/, 'gapBank order with a fixed point');
      throws(() => C4.gapBank({ words: ['owl', 'cow', 'bee', 'pig'], order: [3, 2, 1, 0] }), /reverse/, 'gapBank order = the reverse');
      { const d = C4.derange([0, 1, 2, 3, 4, 5, 6], rng); ok(d.every((v, i) => v !== i) && d.join(',') !== '6,5,4,3,2,1,0', `derange: ${d.join(',')}`); }
    }

    // ---- 3. sweep
    if (!QUICK) {
      for (const d of [1, 2]) {
        const sets = new Set(), orders = new Set(), bankOrders = new Set();
        for (let s = 1; s <= 20; s++) {
          const rng = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: d, seedEpoch: 1, variant: s }));
          const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
          const rows = b.meta.rows;
          const keys = rows.map((r) => r[1]);
          ok(new Set(keys).size === keys.length, `sweep d${d} seed ${s}: a key twice`);
          rows.forEach(([id, key, form, answer]) => { const f = en.frames.find((x) => x.id === id); ok(f && f.noun === key && TYPE.answerFor('en', key, form) === answer, `sweep d${d} seed ${s}: ${id} not re-derived`); });
          rows.forEach(([id, key]) => { const f = en.frames.find((x) => x.id === id); ok(!f.fits.some((x) => x !== key && keys.includes(x)), `sweep d${d} seed ${s}: ${id} fits another key on the page`); });
          const groups = keys.map((k) => TYPE.twinGroupOf(k, all.twins)).filter((g) => g >= 0);
          ok(new Set(groups).size === groups.length, `sweep d${d} seed ${s}: two keys of one twin group`);
          const themes = {}; rows.forEach(([, , , , t]) => { themes[t] = (themes[t] || 0) + 1; });
          ok(Object.values(themes).every((n) => n <= 2), `sweep d${d} seed ${s}: themes ${JSON.stringify(themes)}`);
          ok(b.meta.bankOrder.every((v, i) => v !== i), `sweep d${d} seed ${s}: bank order ${b.meta.bankOrder.join(',')} has a fixed point`);
          if (d === 1) ok(rows.every(([, , , , , name]) => !name), `sweep d1 seed ${s}: a {name} frame at nameSlot:false`);
          sets.add(keys.slice().sort().join(',')); orders.add(keys.join(',')); bankOrders.add(b.meta.bankOrder.join(','));
        }
        ok(sets.size >= 2 && orders.size >= 2 && bankOrders.size >= 2, `sweep d${d}: ${sets.size} distinct row sets / ${orders.size} orders / ${bankOrders.size} bank orders over 20 seeds`);
        console.log(`sweep d${d}: 20 seeds, ${sets.size} distinct sets, ${orders.size} distinct orders, ${bankOrders.size} bank orders`);
      }
    }

    // ---- 4. poisons — bank (validator)
    const poison = (name, block, loc, re, opts) => {
      const errs = validateBank(block, loc, opts).filter((e) => !SYNTH_IGNORE.test(e) || re.test(e));
      const hit = errs.filter((e) => re.test(e));
      poisonTotal++;
      if (!errs.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT (the validator passed the poison)`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${errs.join(' | ')}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    const F = (b, id) => b.frames.find((f) => f.id === id);
    let b;
    b = clone(en); F(b, 'cow-milk').text = 'The cow gives milk. The {gap} eats grass.'; poison('P1 the answer in the text', b, 'en', /rule 4: frame cow-milk prints its answer "cow"/);
    b = clone(en); F(b, 'cow-milk').text = 'The cows are here. The {gap} gives milk.'; poison('P1b the other number in the text', b, 'en', /rule 4: frame cow-milk prints the noun's other number "cows"/);
    b = clone(en); F(b, 'cow-milk').fits = ['goat']; poison('P2 fits without the noun', b, 'en', /rule 7: frame cow-milk fits does not contain its noun/);
    b = synthetic('de', en); { const c = FN(b, 'cow') || Object.assign(b.frames[0], { id: 'cow-syn', noun: 'cow', fits: ['cow'], pic: { theme: 'farm animals', noun: 'cow' }, foil: 'goat' }); c.text = 'Der {gap} gibt uns Milch.'; } poison('P3 de "Der {gap}" over cow (f)', b, 'de', /rule 5: frame cow-syn "der" before "Kuh" \(f, nom\)/);
    b = synthetic('fr', en); b.frames = b.frames.filter((f) => f.noun !== 'airplane'); b.frames.push({ id: 'plane-fly', noun: 'airplane', form: 'sg', text: 'Le {gap} vole.', fits: ['airplane'], foil: 'tiger', predicateKind: 'verb', pic: { theme: 'vehicles', noun: 'airplane' }, picOpened: true, signedExclusive: true }); poison('P4 fr "Le {gap}" over the elision noun avion', b, 'fr', /rule 5: frame plane-fly "le" before the elision noun "Avion"/);
    b = synthetic('de', en); b.frames[0].form = 'unique'; b.frames[0].text = 'Ich sehe {gap} auf der Wiese.'; poison('P5 de form unique', b, 'de', /rule 3: frame \S+ form "unique" is not allowed in de/);
    b = clone(en); F(b, 'cow-milk').foil = 'cow'; poison('P6 foil = the noun', b, 'en', /rule 7: frame cow-milk foil "cow" is the noun/);
    b = synthetic('de', en); { const h = FN(b, 'horse') || Object.assign(b.frames[1], { id: 'horse-syn', noun: 'horse', text: 'Das {gap} schläft im Garten.', fits: ['horse'], pic: { theme: 'animals', noun: 'horse' } }); h.foil = 'goat'; } poison('P6b de foil Ziege (f) on Pferd (n)', b, 'de', /rule 7: frame horse-syn foil "goat" gender f != n/);
    b = clone(en); F(b, 'cow-milk').foil = 'goat'; poison('P7 foil in fits', b, 'en', /rule 7: frame cow-milk foil "goat" is in fits/);
    b = synthetic('fi', en); b.plural[0].text = 'Kaksi {gap} syö heinää.'; poison('P8 fi plural after a numeral', b, 'fi', /rule 9: plural \S+ a fi plural frame names a number/);
    b = clone(en); F(b, 'cow-milk').text = 'The {gap} and the {gap} give milk.'; poison('P9 two gaps', b, 'en', /rule 1: frame cow-milk carries 2 \{gap\}/);
    b = clone(en); F(b, 'cow-milk').text = 'The ___ gives us milk.'; poison('P9b ___', b, 'en', /rule 1: frame cow-milk carries ___/);
    b = clone(en); b.stories[0].text = b.stories[0].text.slice(0, 2); poison('P10 a story with 2 sentences', b, 'en', /rule 10: story farm-morning needs 3/);
    b = clone(en); b.stories[0].nouns = ['cow', 'cow', 'tractor']; poison('P10b nouns cow, cow, tractor', b, 'en', /rule 10: story farm-morning nouns are not distinct/);
    b = clone(en); b.stories[0].nouns[0] = 'park'; b.stories[0].fits[0] = ['park']; poison('P10c an unpictured park', b, 'en', /rule 2: story farm-morning line 1 "park" has no/);
    b = clone(en); b.stories[1].nouns[0] = 'cow'; b.stories[1].fits[0] = ['cow']; b.stories[1].pics[0] = { theme: 'farm animals', noun: 'cow' }; poison('P10d a noun shared with another story', b, 'en', /rule 10: story noun "cow" is used by 2 stories/);
    b = clone(en); b.stories[1].fits[0].push('tractor'); poison('P10e fits naming another story\'s noun', b, 'en', /rule 10: story pond-day line 1 fits "tractor" is another story's noun/);
    b = clone(en); F(b, 'cow-milk').pic = { theme: 'animals bw', noun: 'cow' }; poison('P11 pic theme animals bw', b, 'en', /rule 2: frame cow-milk pins a B&W theme/);
    b = clone(en); delete F(b, 'cow-milk').picOpened; poison('P11b picOpened absent', b, 'en', /rule 2: frame cow-milk picOpened/);
    b = clone(en); F(b, 'cow-milk').noun = 'glass'; F(b, 'cow-milk').fits = ['glass']; F(b, 'cow-milk').pic = { theme: 'around the house', noun: 'glass' }; poison('P11c noun glass (excluded)', b, 'en', /rule 2: frame cow-milk "glass" is in excludeKeys/);
    b = clone(en); F(b, 'cow-milk').pic = { theme: 'zoo animals', noun: 'cow' }; poison('P11d a pic that is not a candidate', b, 'en', /rule 2: frame cow-milk pic zoo animals\/cow is not a colour candidate/);
    b = synthetic('es', en); b.frames[0].text = '{name} ve ' + b.frames[0].text.toLowerCase(); poison('P12 {name} in an es frame', b, 'es', /rule 6: frame \S+ carries \{name\} but nameSlot is off/);
    b = clone(en); b.strings.base.instruction = 'Write the word. One letter in each box.'; poison('P13 a base instruction with boxWord', b, 'en', /rule 13: the base instruction carries boxWord/);
    b = synthetic('da', en); b.plural = synthetic('no', en).plural; poison('P13b a da draft with plural frames', b, 'da', /rule 14: da refuses the plural face but carries 12 plural frames/);
    b = synthetic('sv', en); b.strings.plural.title = 'Singular och plural'; poison('P13c sv plural title "Singular och plural"', b, 'sv', /rule 13: the plural title carries the singular-plural name/);
    b = synthetic('pt', en); b.strings.letters.title = 'Escreva o nome da figura'; poison('P13d pt letters title "Escreva o nome da figura"', b, 'pt', /rule 13: the letters title carries the write-the-word name/);
    b = clone(en); b.strings.match.title = 'Match the Sentence to the Picture Worksheet'; poison('P13e worksheet word', b, 'en', /rule 13: match title carries the worksheet word/);
    b = clone(en); b.strings.story.title = 'Fill in the Blank Story with Answers'; poison('P13f answers promised', b, 'en', /rule 13: story string promises answers/);
    b = clone(en); b.strings.base.instruction = 'Free printable: write the word in the box.'; poison('P13g free claim', b, 'en', /rule 13: base string claims free/);
    b = clone(en); b.strings.choice.title = 'Cloze: Choose the Word'; poison('P13h "cloze" in a title', b, 'en', /rule 13: choice title carries "cloze"/);
    b = synthetic('sv', en); { const c = FN(b, 'cow') || Object.assign(b.frames[0], { id: 'cow-syn', noun: 'cow', fits: ['cow'], pic: { theme: 'farm animals', noun: 'cow' }, foil: 'horse' }); c.form = 'def'; c.text = 'Jag ser {gap} på ängen.'; c.defWhy = 'the definite is demanded'; } poison('P14 sv def on cow ("kon" === cone)', b, 'sv', /rule 9: frame cow-syn the definite literal "kon" equals the singular \/ plural of cone/);
    b = synthetic('sv', en); { const h = FN(b, 'horse') || Object.assign(b.frames[1], { id: 'horse-syn', noun: 'horse', fits: ['horse'], pic: { theme: 'animals', noun: 'horse' }, foil: 'cow' }); h.form = 'def'; h.text = 'Jag ser {gap} på ängen.'; delete h.defWhy; } poison('P14b sv def without defWhy', b, 'sv', /rule 9: frame horse-syn form def without defWhy/);
    b = clone(en); F(b, 'cow-milk').predicateKind = 'copula'; F(b, 'cow-milk').text = 'The {gap} is red.'; delete F(b, 'cow-milk').exclusiveWhy; poison('P15 copula without exclusiveWhy', b, 'en', /rule 12: frame cow-milk is a copula frame without exclusiveWhy/);
    b = clone(en); b.frames.slice(0, 7).forEach((f) => { f.form = 'unique'; f.text = '{gap} ' + f.text.replace(/^The {gap} /, ''); }); poison('P16 a draft with 11 F1-eligible frames (7 unique-form)', b, 'en', /rule 8: only 11 F1-eligible frames/);
    b = clone(en); b.frames.forEach((f) => { f.pic = { theme: 'animals', noun: f.noun }; }); poison('P8t frames from one theme', b, 'en', /rule 8: frames pin pictures from 1 strong themes|rule 2: frame .* pic animals/);
    b = clone(en); b.plural[0].clones = 2; poison('P9c "Three {gap}" with clones 2', b, 'en', /rule 9: plural cows-barn names 3 but clones is 2/);
    b = clone(en); b.plural[0].clones = 4; poison('P9d clones 4', b, 'en', /rule 9: plural cows-barn clones 4/);
    b = clone(en); b.stories[0].text[2] = 'Then {name} drives the {gap} all the way to the far field.'; poison('P10f a story line > 42', b, 'en', /rule 10: story farm-morning line 3 is \d+ chars gap-removed \(> 42\)/);
    b = clone(en); b.frames.push({ ...clone(F(en, 'pig-mud')), id: 'pig-2', text: 'The {gap} says oink.' }); poison('P8n a noun twice in frames', b, 'en', /rule 8: noun "pig" twice in frames/);
    b = clone(en); F(b, 'kite-wind').text = 'An {gap} flies high.'; F(b, 'kite-wind').noun = 'kite'; poison('P5e en "An {gap}" over kite', b, 'en', /rule 5: frame kite-wind "an" before "Kite" \(keyFor says a\)/);
    b = clone(en); F(b, 'sailboat-lake').text = 'A {gap} sails across the lake.'; F(b, 'sailboat-lake').noun = 'ship'; F(b, 'sailboat-lake').fits = ['ship']; F(b, 'sailboat-lake').pic = { theme: 'vehicles', noun: 'ship' }; poison('P5f en "A {gap}" over the EN_AMBIGUOUS ship', b, 'en', /rule 5: frame sailboat-lake "a" before "ship" \(EN_AMBIGUOUS/);
    b = clone(en); F(b, 'cow-milk').text = 'The {gap} is next to the box.'; poison('P4s a SENTENCES frame literal', b, 'en', /rule 4: frame cow-milk equals a SENTENCES.en frame literal/);
    b = synthetic('fi', en); b.strings.base.title = 'Kuvalliset täydennyslauseet: kirjoita jokaisen kuvan puuttuva sana laatikkoon'.slice(0, 70); poison('P13i fi 4-line base title', b, 'fi', /rule 13: fi base title wraps to 4 lines/, { titleLines: (t) => (t === b.strings.base.title ? 4 : 1) });
    ok(validateBank(synthetic('fi', en), 'fi', { titleLines: () => 1 }).filter((e) => !SYNTH_IGNORE.test(e)).length === 0, 'control: the synthetic fi block with 1-line titles is clean');

    // ---- render poisons (the validator bypassed)
    const renderPoison = async (name, type, re, { difficulty = 2, strings } = {}) => {
      let r;
      poisonTotal++;
      try { r = await renderWith(page, type, { difficulty, baseName: `G1-350-gate-poison-${name.split(' ')[0]}`, strings }); }
      catch (e) { const hit = re.test(e.message); asserts++; if (!hit) { fails++; console.log(`  FAIL ${name}: WRONG REASON (threw) — ${e.message}`); } else { killed++; console.log(`  poison ${name}: killed (build refused: ${e.message.slice(0, 100)})`); } return; }
      const all2 = [...r.verify, ...r.lints, ...crossCheck(r.m, en, 'en', all)];
      const hit = all2.filter((f) => re.test(f));
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ')}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    await renderPoison('PR1 a stamped answer edited', mutated(TYPE, (h) => h.replace(/data-lcs-answer="(\w+)"/, (m0, a) => `data-lcs-answer="${a}s"`)), /answerFor says|is not in the bank/);
    { const bad = clone(en); bad.frames = bad.frames.slice(0, 8); bad.frames[0].fits = [bad.frames[0].noun, bad.frames[1].noun]; bad.frames[2].fits = [bad.frames[2].noun, bad.frames[3].noun]; await renderPoison('PR2 overlapping fits through the seam (8 frames, two collisions -> 6 compatible)', withBank(TYPE, bad), /REFUSED/); }
    await renderPoison('PR8 per-row gap widths', mutated(TYPE, (h) => h.replace('width:152px;height:40px', 'width:232px;height:40px').replace(/data-lcs-gapw="\d+"/, 'data-lcs-gapw="152"')), /not uniform|!= stamped gapW/);
    { const long = clone(en); long.frames = long.frames.map((f, i) => ({ ...f, text: i % 2 ? 'Am Morgen frisst the {gap} das grüne Gras auf der Wiese.' : 'Der kleine {gap} schläft in seinem Körbchen im Garten.' })); await renderPoison('PR9 two-line rows at .ws-lane default padding at 710', mutated(withBank(TYPE, long, { maxChars: 60 }), (h) => h.replace(/padding:5px 16px;/g, '')), /footer overlap|overflow|clips|clipped/, { strings: CHROME.three }); }
    { await renderPoison('PR10 a 3-row bank (pills forced wide)', mutated(TYPE, (h) => h.replace(/class="ws-bankword" style="font-size:18px"/g, 'class="ws-bankword" style="font-size:18px;min-width:230px"')), /> 2|bank > 2 rows/); }
    { const bad = clone(en); const apple = { ...clone(F(en, 'cow-milk')), id: 'apple-red', noun: 'apple', text: 'The {gap} grows on the tree.', fits: ['apple'], pic: { theme: 'fruits', noun: 'apple' } }; const cherry = { ...apple, id: 'cherry-red', noun: 'cherry', text: 'The {gap} has a long stem.', fits: ['cherry'], pic: { theme: 'fruits', noun: 'cherry' } }; const plum = { ...apple, id: 'plum-purple', noun: 'plum', text: 'The {gap} is small and purple.', fits: ['plum'], predicateKind: 'copula', exclusiveWhy: 'x', pic: { theme: 'fruits', noun: 'plum' } }; bad.frames = bad.frames.slice(0, 5).concat([apple, cherry, plum]); await renderPoison('PR12 apple + cherry + plum as the only fill (twins -> 6 compatible)', withBank(TYPE, bad), /REFUSED/); }
    await renderPoison('PRa the answer printed in its sentence', mutated(TYPE, (h) => h.replace(/(data-lcs-answer="(\w+)"[^>]*>)([\s\S]*?<p data-lcs-sentence[^>]*>)/, (m0, a, ans, p) => a + p + ans + ' ')), /is printed/);
    await renderPoison('PRb the bank in row order', mutated(TYPE, (h) => { const i = h.indexOf('<div data-lcs-bank-order'); const j = h.indexOf('</div></div>', i); const answers = [...h.matchAll(/data-lcs-answer="([^"]+)"/g)].map((m0) => m0[1]); const pills = answers.map((a) => `<span class="ws-bankword" style="font-size:18px" data-lcs-bank-word="${a}"><span>${a}</span></span>`).join(''); return h.slice(0, i) + `<div data-lcs-bank-order="x"><div class="ws-scene-banner ws-bank" data-lcs-bank-banner>${pills}</div></div>` + h.slice(j + '</div></div>'.length); }), /not deranged/);
    await renderPoison('PRc a starter glyph on the base', mutated(TYPE, (h) => h.replace('data-lcs-gapbox', 'data-lcs-gapbox data-lcs-starter="c"')), /starter glyph/);
    await renderPoison('PRd a hint chip on the base', mutated(TYPE, (h) => h.replace('</p></div>', '</p><span class="ws-achip" data-lcs-chip="cow">cow</span></div>')), /a chip on the base/);
    await renderPoison('PRe a picture swapped between two lanes', mutated(TYPE, (h) => { const srcs = [...h.matchAll(/src="([^"]+)"/g)].map((m0) => m0[1]); return h.replace(`src="${srcs[0]}"`, `src="${srcs[1]}"`); }), /src twice|not the pinned/);
    await renderPoison('PRf a key stamp edited', mutated(TYPE, (h) => h.replace(/data-lcs-key="(\w+)"/, 'data-lcs-key="goat"')), /picture "\w+" != key|the frame's noun is/);
    // the control: the untouched page passes every render check
    { const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-350-gate-control' }); ok(!r.verify.length && !r.lints.length && !crossCheck(r.m, en, 'en', all).length, 'control: the untouched d2 page passes verify + lints + the node cross-check'); }

    // ---- 5. the faces (Phase 2): rows ≡ spec ≡ strings; every face rendered at the default en chrome, the 3+3 chrome (710) and the
    //      4-line-title chrome (677): letters / choice / match must hold 677, plural / story are capped at a 3-line fi title (rule 13)
    //      and must FAIL 677 (PR13b / PR13c); floors, the SPARSE measures, the node cross-check; every picture on disk; the sweep; the poisons
    const faceRenders = {};
    for (const mode of Object.keys(FACE_OF)) {
      const { row, spec } = faceSpec(mode);
      const id = row[1];
      ok(id === FACE_OF[mode], `${mode}: row id ${id} is ${FACE_OF[mode]} (the allocation)`);
      ok(spec.id === id && spec.slug === row[2], `${id}: the emitted spec carries id ${spec.id} / slug ${spec.slug}`);
      const want = { ...TYPE.difficulty[row[4]], ...row[5] };
      ok(JSON.stringify(spec.difficulty[2]) === JSON.stringify(want) && JSON.stringify(spec.difficulty[1]) === JSON.stringify(want), `${id}: the emitted d2 config === {...base.d${row[4]}, ...overrides}`);
      ok(spec.i18n.en.title === en.strings[mode].title && spec.i18n.en.instruction === en.strings[mode].instruction && row[6] === en.strings[mode].title && row[7] === en.strings[mode].instruction, `${id}: the row title / instruction === the bank's strings.${mode} (one source)`);
      ok((row[8] && row[8].gradeBand) === (['plural', 'story'].includes(mode) ? 'G2' : undefined) && spec.gradeBand === (['plural', 'story'].includes(mode) ? 'G2' : 'G1'), `${id}: gradeBand ${spec.gradeBand} (${['plural', 'story'].includes(mode) ? 'G2 via extra' : 'the base G1'})`);
      ok(spec.exerciseType === 'cloze' && spec.themeAxis && spec.themeAxis.applicable === false, `${id}: themeless, exerciseType cloze`);
      ok(!/worksheet/i.test(spec.i18n.en.title) && !ANSWERS_WORD.test(spec.i18n.en.title + ' ' + spec.i18n.en.instruction) && !freeClaim.hit(spec.i18n.en.title + ' ' + spec.i18n.en.instruction), `${id}: no worksheet word / answer promise / free claim`);
      // default chrome
      const r1 = await renderFace(page, spec, { baseName: `${id}-gate-d2-en` });
      ok(r1.verify.length === 0, `${id} d2 en: verify ${JSON.stringify(r1.verify)}`);
      ok(r1.lints.length === 0, `${id} d2 en: lints ${JSON.stringify(r1.lints)}`);
      const c1 = faceCross(mode, r1.m, en, 'en', all);
      ok(c1.length === 0, `${id} d2 en node cross-check: ${c1.join(' | ')}`);
      ok(r1.m.lowest <= r1.m.foot + 0.6, `${id} d2 en: lowest ink ${Math.round(r1.m.lowest)} vs foot ${Math.round(r1.m.foot)}`);
      { const top = r1.m.stage.top - r1.m.body.top - (r1.m.bank ? r1.m.bank + 10 : 0);   // the list sits under the bank (+ its 10 px margin) when there is one
        ok(Math.abs(top) <= 2.6 && r1.m.body.bottom - r1.m.stage.bottom <= 2, `${id} d2 en: the stage is top-anchored and fills the body (list top ${Math.round(r1.m.stage.top - r1.m.body.top)} under the body top with a ${Math.round(r1.m.bank)} bank, ends ${Math.round(r1.m.body.bottom - r1.m.stage.bottom)} above the bottom)`); }
      console.log(`render ${id} ${mode}: verify ${r1.verify.length} lints ${r1.lints.length} ${faceMeasures(r1.m)}`);
      faceRenders[mode] = { spec, id, r: r1 };
      // the 3+3 chrome (710)
      const r2 = await renderFace(page, spec, { baseName: `${id}-gate-d2-en-chrome722`, strings: { title: CHROME.three.title, instruction: CHROME.three.instruction } });
      ok(r2.m.body.h >= 700 && r2.m.body.h <= 724, `${id} 3+3 chrome: body ${Math.round(r2.m.body.h)}`);
      ok(r2.verify.length === 0 && r2.lints.length === 0, `${id} 3+3 chrome: verify ${JSON.stringify(r2.verify)} lints ${JSON.stringify(r2.lints)}`);
      const c2 = faceCross(mode, r2.m, en, 'en', all);
      ok(c2.length === 0, `${id} 3+3 chrome node cross-check: ${c2.join(' | ')}`);
      console.log(`render ${id} ${mode} 3+3 chrome: verify ${r2.verify.length} lints ${r2.lints.length} ${faceMeasures(r2.m)}`);
      // the 4-line title chrome (677)
      const r3 = await renderFace(page, spec, { baseName: `${id}-gate-d2-en-chrome677`, strings: { title: CHROME.four.title, instruction: CHROME.four.instruction } });
      ok(r3.m.body.h <= 690 && r3.m.body.h >= 670, `${id} 677 chrome: body ${Math.round(r3.m.body.h)}`);
      const f3 = [...r3.verify, ...r3.lints];
      if (['plural', 'story'].includes(mode)) {
        poisonTotal++;
        if (f3.some((f) => /footer overlap|attribution band|overflow|clipped|overflows/.test(f))) { killed++; console.log(`  poison PR13${mode === 'plural' ? 'b' : 'c'} ${id} under a 4-line title (677): killed (${f3[0]}) — why rule 13 caps the fi ${mode} title at 3 lines`); }
        else { fails++; asserts++; console.log(`  FAIL PR13${mode === 'plural' ? 'b' : 'c'} ${id} at 677: ${f3.length ? 'WRONG REASON — ' + f3.join(' | ') : 'SILENT (the ' + mode + ' face fit 677; the design says it cannot)'}`); }
      } else {
        ok(f3.length === 0, `${id} 677 chrome: ${f3.join(' | ')}`);
        const c3 = faceCross(mode, r3.m, en, 'en', all);
        ok(c3.length === 0, `${id} 677 chrome node cross-check: ${c3.join(' | ')}`);
      }
      console.log(`render ${id} ${mode} 677 chrome: ${['plural', 'story'].includes(mode) ? 'expected FAIL' : 'verify ' + r3.verify.length + ' lints ' + r3.lints.length} ${faceMeasures(r3.m)}`);
    }
    // the face-specific numbers (design §3, measured)
    {
      const L = faceRenders.letters.r.m, C = faceRenders.choice.r.m, P = faceRenders.plural.r.m, S = faceRenders.story.r.m, M = faceRenders.match.r.m;
      ok(L.lanes.every((l) => l.lgBoxPx >= 44 && l.lgRects === graphemes(l.answer)), `letters: boxes ${L.lanes.map((l) => l.lgRects + '@' + l.lgBoxPx).join(' ')} (44 px, one per grapheme)`);
      ok(L.lanes.every((l) => l.pH <= 44 + 2 + 23.4 + 0.5), `letters: sentences ${L.lanes.map((l) => l.pH.toFixed(1)).join('/')} (<= two lines 69.4)`);
      ok(C.lanes.every((l) => l.pH <= 40.5 && l.chips.length === 2 && l.chips.every((c) => c.h >= 43.4)), `choice: one-line sentences ${C.lanes.map((l) => l.pH.toFixed(1)).join('/')} + chips ${C.lanes.map((l) => l.chips.map((c) => Math.round(c.h) + 'x' + Math.round(c.w)).join(',')).join(' ')}`);
      ok(C.lanes.every((l) => l.h >= 100 - 0.6), `choice: rows ${C.lanes.map((l) => l.h.toFixed(1)).join('/')} (>= 100)`);
      { const first = C.lanes.filter((l) => l.idx === 0).length; ok(first >= 2 && first <= 3, `choice: the answer first on ${first} rows (2..3)`); }
      ok(P.lanes.every((l) => l.clones >= 2 && l.clones <= 3 && l.picW >= 48 - 0.6), `plural: clones ${P.lanes.map((l) => l.clones + '@' + Math.round(l.picW)).join(' ')} (2..3 at 48)`);
      ok(P.lanes.every((l) => l.pH <= 64.5 && l.boxH >= 39.4), `plural: sentences ${P.lanes.map((l) => l.pH.toFixed(1)).join('/')} (<= 64, box 40)`);
      ok(S.stories.length === 3 && S.stories.every((b) => b.lines.length === 3 && b.pics.length === 3 && b.order.join(',') !== '0,1,2'), `story: 3 blocks x 3 lines, strips ${S.stories.map((b) => b.order.join('')).join(' ')} (never 012)`);
      ok(S.pills.length === 9 && new Set(S.pills.map((p) => p.top)).size <= 2, `story: a 9-pill bank in ${new Set(S.pills.map((p) => p.top)).size} rows`);
      ok(S.stories.every((b) => b.lines.every((l) => l.pH <= 40.5)), `story: every line one line (${S.stories.map((b) => b.lines.map((l) => l.pH.toFixed(1)).join('/')).join(' ')})`);
      ok(M.left.length === 6 && M.right.length === 6 && M.left.every((l) => !l.imgs) && M.right.every((r) => r.picW >= 63.4), `match: 6 + 6, no picture left, 64 px right`);
      ok(M.right.every((r, i) => r.key !== M.left[i].key), `match: right ${M.right.map((r) => r.key).join(',')} deranged against left ${M.left.map((l) => l.key).join(',')}`);
      console.log(`faces: letters boxes ${L.lanes.map((l) => l.lgRects).join('/')} @ ${L.lanes[0].lgBoxPx} · choice answer-first ${C.lanes.filter((l) => l.idx === 0).length}/6 foils ${C.lanes.map((l) => l.foil).join(',')} · plural clones ${P.lanes.map((l) => l.clones).join('')} gapW ${P.gapW} · story ${S.stories.map((b) => b.id + ':' + b.order.join('')).join(' ')} gapW ${S.gapW} · match ${M.right.map((r) => r.key).join(',')}`);
    }
    // every picture the family pins (frames + plural + stories, all of them face pictures) exists ON DISK in the served library
    {
      const refs = new Set();
      for (const f of en.frames) refs.add(f.pic.theme + '/' + f.pic.noun);
      for (const f of en.plural) refs.add(f.pic.theme + '/' + f.pic.noun);
      for (const s of en.stories) for (const p of s.pics) refs.add(p.theme + '/' + p.noun);
      let missing = 0;
      for (const ref of refs) { const [theme, noun] = ref.split('/'); const p = path.join(WEBP_THEMES, theme, noun + '@2x.webp'); if (!ok(fs.existsSync(p), `picture on disk: ${p} is absent`)) missing++; }
      console.log(`pictures on disk: ${refs.size} refs (18 frames + 12 plural + 18 story pins) checked as <theme>/<noun>@2x.webp under image-library-webp/themes, ${missing} missing`);
    }
    // the face sweep: 20 seeds per face (build only) — the deals, orders, foils, clone counts, strip orders and derangements vary
    if (!QUICK) {
      const seen = { letters: new Set(), choice: new Set(), plural: new Set(), story: new Set(), match: new Set() };
      const extra = { choice: new Set(), plural: new Set(), story: new Set(), match: new Set() };
      for (const mode of Object.keys(FACE_OF)) {
        const { spec } = faceRenders[mode];
        for (let s = 1; s <= 20; s++) {
          const rng = makeRng(instanceSeed({ typeId: spec.id, theme: null, difficulty: 2, seedEpoch: 1, variant: s }));
          const b = spec.build({ theme: null, difficulty: 2, locale: 'en' }, { rng });
          if (mode === 'story') { seen.story.add(b.meta.stories.map((x) => x[0]).sort().join(',')); extra.story.add(b.meta.stories.map((x) => x[2]).join(' ')); ok(b.meta.stories.every((x) => x[2] !== '012'), `sweep story seed ${s}: a strip in order`); ok(b.meta.stories.every((x) => !x[3] || x[3].split('+').every((n, _, arr) => n === arr[0])), `sweep story seed ${s}: one name per story`); continue; }
          const keys = b.meta.rows.map((x) => x[1]);
          ok(new Set(keys).size === keys.length, `sweep ${mode} seed ${s}: a key twice`);
          const list = mode === 'plural' ? en.plural : en.frames;
          b.meta.rows.forEach(([id, key, form, answer]) => { const f = list.find((x) => x.id === id); ok(f && f.noun === key && TYPE.answerFor('en', key, form) === answer, `sweep ${mode} seed ${s}: ${id} not re-derived`); });
          b.meta.rows.forEach(([id, key]) => { const f = list.find((x) => x.id === id); ok(!f.fits.some((x) => x !== key && keys.includes(x)), `sweep ${mode} seed ${s}: ${id} fits another key on the page`); });
          const groups = keys.map((k) => TYPE.twinGroupOf(k, all.twins)).filter((g) => g >= 0);
          ok(new Set(groups).size === groups.length, `sweep ${mode} seed ${s}: two keys of one twin group`);
          seen[mode].add(keys.join(','));
          if (mode === 'choice') { extra.choice.add(b.meta.idx.join('')); const first = b.meta.idx.filter((x) => x === 0).length; ok(first >= 2 && first <= 3, `sweep choice seed ${s}: answer-first ${first}`); ok(b.meta.rows.every((x) => !keys.includes(x[6])), `sweep choice seed ${s}: a foil is a page key`); }
          if (mode === 'plural') { extra.plural.add(b.meta.rows.map((x) => x[6]).join('')); ok(b.meta.rows.every((x) => x[6] >= 2 && x[6] <= 3), `sweep plural seed ${s}: clones`); }
          if (mode === 'match') { extra.match.add(b.meta.order.join('')); ok(b.meta.order.every((v, i) => v !== i), `sweep match seed ${s}: a fixed point`); }
        }
      }
      ok(Object.values(seen).every((st) => st.size >= 2) && Object.values(extra).every((st) => st.size >= 2), `sweep faces: sets letters ${seen.letters.size} choice ${seen.choice.size} plural ${seen.plural.size} story ${seen.story.size} match ${seen.match.size}; chip orders ${extra.choice.size}, clone vectors ${extra.plural.size}, strip orders ${extra.story.size}, derangements ${extra.match.size} (>= 2 each over 20 seeds)`);
      console.log(`sweep faces: letters ${seen.letters.size} deals · choice ${seen.choice.size} deals / ${extra.choice.size} chip orders · plural ${seen.plural.size} deals / ${extra.plural.size} clone vectors · story ${seen.story.size} sets / ${extra.story.size} strip orders · match ${seen.match.size} deals / ${extra.match.size} derangements`);
    }

    // ---- 6. face poisons (each must FAIL for its OWN reason; the untouched face renders above are the controls)
    const facePoison = async (name, mode, type, re, { strings, locale = 'en' } = {}) => {
      poisonTotal++;
      let r;
      try { r = await renderFace(page, type, { baseName: `G1-350-gate-poison-${name.split(' ')[0]}`, strings, locale }); }
      catch (e) { const hit = re.test(e.message); asserts++; if (!hit) { fails++; console.log(`  FAIL ${name}: WRONG REASON (threw) — ${e.message}`); } else { killed++; console.log(`  poison ${name}: killed (build refused: ${e.message.slice(0, 110)})`); } return; }
      const all2 = [...r.verify, ...r.lints, ...faceCross(mode, r.m, en, 'en', all)];
      const hit = all2.filter((f) => re.test(f));
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ')}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    const FS = (mode) => faceRenders[mode].spec;
    const bankHtml = (words) => `<div data-lcs-bank-order="x"><div class="ws-scene-banner ws-bank" data-lcs-bank-banner>${words.map((a) => `<span class="ws-bankword" style="font-size:18px" data-lcs-bank-word="${a}"><span>${a}</span></span>`).join('')}</div></div>`;
    // PR3 — a bank banner injected on the letters face (config bank 0)
    await facePoison('PR3 a bank banner on the letters face', 'letters', mutated(FS('letters'), (h) => h.replace('<div data-lcs-list', bankHtml(['owl', 'cow', 'bee']) + '<div data-lcs-list')), /a bank banner on the letters face/);
    // PF1 — the letters box count stamp edited (7 boxes drawn, the lane says 5)
    await facePoison('PF1 a letters box-count stamp edited', 'letters', mutated(FS('letters'), (h) => h.replace(/data-lcs-boxes="(\d+)"/, (m0, n) => `data-lcs-boxes="${+n + 1}"`)), /lane stamps \d+ boxes|boxes for/);
    // PF1b — a starter glyph inside box 1 at d2 (the answer's first letter printed)
    await facePoison('PF1b a starter glyph at d2', 'letters', mutated(FS('letters'), (h) => h.replace('</svg></span>', '<text x="23" y="30" font-size="28" data-lcs-starter="1">p</text></svg></span>')), /a letter glyph inside a box/);
    // PF1c — a 26 px letter box (the design's number, under the G1 floor): the spec guard refuses at build
    await facePoison('PF1c letters box 26 (under the G1 floor)', 'letters', faceWithBank(FS('letters'), en, { box: 26 }), /below the G1 element floor 44/);
    // PF1d — the letters face with 8 rows of 84 at the 710 chrome overflows (the design's 8-row layout with 44 px boxes)
    await facePoison('PF1d letters 8 rows x 84 under the 3+3 chrome', 'letters', faceWithBank(FS('letters'), en, { rows: 8 }), /footer overlap|attribution band|overflow|clipped|sparse|above the body/, { strings: CHROME.three });
    // PS1 — the letters list as a FIXED grid that does not fill the body (the K-357 sparse class)
    await facePoison('PS1 letters fixed rows, stage not filling', 'letters', mutated(FS('letters'), (h) => h.replace(/style="flex:1 1 auto;display:grid;grid-template-rows:repeat\((\d+),minmax\((\d+)px,1fr\)\)/, 'style="flex:0 0 auto;display:grid;grid-template-rows:repeat($1,$2px)')), /above the body bottom: the stage does not fill the page \(sparse\)/);
    // PR11 — a choice sentence that wraps (a longer text pasted into lane 1)
    await facePoison('PR11 a wrapped choice sentence', 'choice', mutated(FS('choice'), (h) => h.replace(/(<p data-lcs-sentence[^>]*>[\s\S]*?)(<\/p>)/, '$1 and then it walks all the way back home to sleep$2')), /sentence [\d.]+ px high > 40/);
    // PF2 — the answer chip re-labelled (both chips print the foil)
    await facePoison('PF2 the answer chip prints the foil', 'choice', mutated(FS('choice'), (h) => h.replace(/data-lcs-chip="([^"]+)" data-lcs-role="answer"([^>]*)>[^<]+/, (m0, w, rest) => `data-lcs-chip="${w}x" data-lcs-role="answer"${rest}>${w}x`)), /the answer chip "\w+" != the stamped answer/);
    // PF2b — the answer chip first on EVERY row (the chip order re-sorted: answer, foil)
    await facePoison('PF2b the answer chip first on every row', 'choice', mutated(FS('choice'), (h) => h.replace(/data-lcs-idx="1"([^>]*)>(<span class="ws-achip"[^>]*data-lcs-role="foil"[^>]*>[^<]*<\/span>)(<span class="ws-achip"[^>]*data-lcs-role="answer"[^>]*>[^<]*<\/span>)/g, 'data-lcs-idx="0"$1>$3$2')), /the answer chip is first on \d+ rows \(want \[2, 3\]\)/);
    // PF2c — a chip pre-marked (a ring drawn on the answer chip)
    await facePoison('PF2c a chip pre-marked', 'choice', mutated(FS('choice'), (h) => h.replace(/(<span class="ws-achip"[^>]*data-lcs-role="answer"[^>]*)style="/, '$1style="border-color:#F2784B;')), /styled differently \(one pre-marked\)/);
    // PF2d — the foil of lane 1 = another lane's picture (the foil stamp + chip re-pointed at lane 2's key)
    await facePoison('PF2d a foil that is a picture on the page', 'choice', mutated(FS('choice'), (h) => { const keys = [...h.matchAll(/data-lcs-key="([^"]+)"/g)].map((m0) => m0[1]); const ans = [...h.matchAll(/data-lcs-answer="([^"]+)"/g)].map((m0) => m0[1]); return h.replace(/data-lcs-foil="[^"]+"/, `data-lcs-foil="${keys[1]}"`).replace(/data-lcs-chip="([^"]+)" data-lcs-role="foil"([^>]*)>[^<]+/, (m0, w, rest) => `data-lcs-chip="${ans[1]}" data-lcs-role="foil"${rest}>${ans[1]}`); }), /the foil "\w+" is a key on the page|is an answer on the page/);
    // PF2e — foils of the WRONG gender (de synthetic block: every foil re-pointed at a noun of another gender) → the pool empties → REFUSED
    { const de = synthetic('de', en); const byG = {}; de.frames.forEach((f) => { const g = entryOf('de', f.noun).gender; (byG[g] = byG[g] || []).push(f.noun); }); const gs = Object.keys(byG);
      de.frames.forEach((f) => { const g = entryOf('de', f.noun).gender; const other = gs.find((x) => x !== g && byG[x].length); f.foil = other ? byG[other][0] : f.foil; });
      await facePoison('PF2e de foils of another gender through the seam', 'choice', faceWithBank(FS('choice'), de), /REFUSED/, { locale: 'de' }); }
    // PS2 — the choice list as a fixed grid
    await facePoison('PS2 choice fixed rows, stage not filling', 'choice', mutated(FS('choice'), (h) => h.replace(/style="flex:1 1 auto;display:grid;grid-template-rows:repeat\((\d+),minmax\((\d+)px,1fr\)\)/, 'style="flex:0 0 auto;display:grid;grid-template-rows:repeat($1,$2px)')), /above the body bottom: the stage does not fill the page \(sparse\)/);
    // PR4 — a singular hint chip on the plural face (the other number printed)
    await facePoison('PR4 a hint chip on the plural face', 'plural', mutated(FS('plural'), (h) => h.replace(/(data-lcs-answer="[^"]+"[^>]*>[\s\S]*?)<\/p><\/div>/, '$1</p><span class="ws-achip" data-lcs-hint="1">cow</span></div>')), /a hint chip on the plural face/);
    // PF3 — the clone count stamp edited (3 pictures, the strip says 2)
    await facePoison('PF3 a clone stamp edited', 'plural', mutated(FS('plural'), (h) => h.replace('data-lcs-clones="3"', 'data-lcs-clones="2"')), /pictures for 2 clones/);
    // PF3b — the singular printed in a plural sentence (node: the other number)
    await facePoison('PF3b the singular printed on the plural face', 'plural', mutated(FS('plural'), (h) => h.replace(/(<div class="ws-lane" [^>]*data-lcs-key="(\w+)"[^>]*>[\s\S]*?<p data-lcs-sentence[^>]*>)/, (m0, a, key) => a + TYPE.answerFor('en', key, 'sg') + ' ')), /the other number "\w+" is printed/);
    // PF3c — a plural bank at d2 (a bank banner injected on the plural face)
    await facePoison('PF3c a bank on the plural face', 'plural', mutated(FS('plural'), (h) => h.replace('<div data-lcs-list', bankHtml(['cows', 'hens']) + '<div data-lcs-list')), /a bank banner on the plural face/);
    // PF3d — the da block (refuse.plural) through the seam → REFUSED
    await facePoison('PF3d da refuses the plural face', 'plural', faceWithBank(FS('plural'), synthetic('da', en)), /da REFUSES the plural face/, { locale: 'da' });
    // PF3e — a hint config → the spec refuses
    await facePoison('PF3e hint:true config', 'plural', faceWithBank(FS('plural'), en, { hint: true }), /hint chip prints the singular/);
    // PS3 — the plural list as a fixed grid
    await facePoison('PS3 plural fixed rows, stage not filling', 'plural', mutated(FS('plural'), (h) => h.replace(/style="flex:1 1 auto;display:grid;grid-template-rows:repeat\((\d+),minmax\((\d+)px,1fr\)\)/, 'style="flex:0 0 auto;display:grid;grid-template-rows:repeat($1,$2px)')), /above the body bottom: the stage does not fill the page \(sparse\)/);
    // PR5 — the story strip in sentence order (the stamp + the pictures re-ordered to 0,1,2)
    await facePoison('PR5 a story strip in sentence order', 'story', mutated(FS('story'), (h) => h.replace(/data-lcs-strip-order="([012]),([012]),([012])"([^>]*>)(<span data-lcs-badge[\s\S]*?<\/span>)(<img [^>]*>)(<img [^>]*>)(<img [^>]*>)/, (m0, a, b, c, rest, badge, i0, i1, i2) => { const imgs = [i0, i1, i2]; const byPos = {}; [a, b, c].forEach((o, j) => { byPos[o] = imgs[j]; }); return `data-lcs-strip-order="0,1,2"${rest}${badge}${byPos[0]}${byPos[1]}${byPos[2]}`; })), /strip not shuffled/);
    // PF4 — the story bank in the line order
    await facePoison('PF4 the story bank in line order', 'story', mutated(FS('story'), (h) => { const answers = [...h.matchAll(/<p data-lcs-sentence[^>]*data-lcs-answer="([^"]+)"/g)].map((m0) => m0[1]); const i = h.indexOf('<div data-lcs-bank-order'); const j = h.indexOf('</div></div>', i) + '</div></div>'.length; return h.slice(0, i) + bankHtml(answers) + h.slice(j); }), /not deranged/);
    // PF4b — an answer printed in a story line
    await facePoison('PF4b an answer printed in a story line', 'story', mutated(FS('story'), (h) => h.replace(/(<p data-lcs-sentence[^>]*data-lcs-answer="([^"]+)"[^>]*>)/, (m0, a, ans) => a + ans + ' ')), /is printed/);
    // PF4c — two names in one story: a page forced to carry farm-morning (its lines 2 + 3 both say {name}), then the first name swapped for another
    { const two = clone(en); two.stories = two.stories.filter((x) => ['farm-morning', 'zoo-visit', 'beach-day'].includes(x.id));
      await facePoison('PF4c two names inside one story', 'story', mutated(faceWithBank(FS('story'), two), (h) => {
        const names = SENTENCES.en.names; const i0 = h.indexOf('data-lcs-story-id="farm-morning"'); if (i0 < 0) return h;
        const head = h.slice(0, i0); let tail = h.slice(i0); let done = false;
        tail = tail.replace(/(<p data-lcs-sentence[^>]*>)([^<]*)/g, (m0, a, t) => { if (done) return m0; const n = names.find((x) => new RegExp('(?<!\\p{L})' + x + '(?!\\p{L})', 'u').test(t)); if (!n) return m0; done = true; const o = names.find((x) => x !== n); return a + t.replace(n, o); });
        return head + tail; }), /two names \(\w+ \/ \w+\) inside one story/); }
    // PS4 — the story list as a fixed grid
    await facePoison('PS4 story fixed blocks, stage not filling', 'story', mutated(FS('story'), (h) => h.replace(/style="flex:1 1 auto;display:grid;grid-template-rows:repeat\((\d+),minmax\((\d+)px,1fr\)\)/, 'style="flex:0 0 auto;display:grid;grid-template-rows:repeat($1,$2px)')), /above the body bottom: the stage does not fill the page \(sparse\)/);
    // PF4d — a fourth sentence config (d3's no-gap line) → the spec refuses (not built)
    await facePoison('PF4d sentences:4 config', 'story', faceWithBank(FS('story'), en, { sentences: 4 }), /a fourth no-gap sentence is not built/);
    // PR6 — a right item moved straight across (the first two right items swapped so one sits at its left index)
    await facePoison('PR6 a match picture straight across', 'match', mutated(FS('match'), (h) => { const items = [...h.matchAll(/<div class="ws-match-item ws-match-item--plain" data-lcs-match-right="([^"]+)"[\s\S]*?<\/div>/g)]; const lefts = [...h.matchAll(/data-lcs-match-left="[^"]+" data-lcs-key="([^"]+)"/g)].map((m0) => m0[1]); const at = items.findIndex((it) => it[1] === lefts[0]); const sw = items[0][0], tg = items[at][0]; return h.replace(sw, '\u0002').replace(tg, sw).replace('\u0002', tg); }), /straight across/);
    // PR7 — the noun printed in a left sentence
    await facePoison('PR7 the noun printed in a match sentence', 'match', mutated(FS('match'), (h) => h.replace(/(data-lcs-match-left="[^"]+" data-lcs-key="([^"]+)"[^>]*>[\s\S]*?<span data-lcs-match-text[^>]*>)/, (m0, a, key) => a + key + ' ')), /is printed/);
    // PF5 — a picture inside a left item
    await facePoison('PF5 a picture inside a sentence item', 'match', mutated(FS('match'), (h) => h.replace(/(<span data-lcs-match-text[^>]*>)/, `$1<img class="ws-icon" src="${fileUri('farm animals', 'cow')}" alt="" style="width:44px;height:44px">`)), /a picture inside a sentence item/);
    // PS5 — the match columns flex-start with fixed 92 items (the slack pools under the last item)
    await facePoison('PS5 match items fixed at 92, columns flex-start', 'match', mutated(FS('match'), (h) => h.replace(/min-height:92px;max-height:108px;flex:1 1 92px/g, 'height:92px').replace(/<div class="ws-match-col">/g, '<div class="ws-match-col" style="justify-content:flex-start">')), /slack under the last item|between items/);
    // PR15 — a locale with NO block refuses on EVERY face (never an en fallback). It used to name
    // `sv`, which shipped on 2026-09-22 and silently turned the poison into a page that BUILDS -
    // a needle that encoded the current state and expired with it. `zz` is not a project locale
    // and can never be authored, so the poison now tests the behaviour instead of a locale list.
    { poisonTotal++; const refused = []; for (const mode of Object.keys(FACE_OF)) { try { FS(mode).build({ theme: null, difficulty: 2, locale: 'zz' }, { rng: makeRng('pr15') }); refused.push(mode + ': BUILT'); } catch (e) { refused.push(mode + ': ' + e.message); } }
      const allR = refused.length === 5 && refused.every((x) => /has no zz block/.test(x)); asserts++; if (allR) { killed++; console.log('  poison PR15 zz unauthored: killed (5/5 faces refuse: has no zz block)'); } else { fails++; console.log('  FAIL PR15: ' + refused.join(' | ')); } }
    // PR16 — a face string missing (strings.match deleted) → refuse
    await facePoison('PR16 strings.match missing', 'match', faceWithBank(FS('match'), (() => { const b = clone(en); delete b.strings.match; return b; })()), /has no strings\.match/);
    // PF6 — overlapping fits through the seam on the match face (two pictures fit one sentence) → the composer REFUSES
    { const bad = clone(en); bad.frames = bad.frames.slice(0, 8); bad.frames[0].fits = [bad.frames[0].noun, bad.frames[1].noun]; bad.frames[2].fits = [bad.frames[2].noun, bad.frames[3].noun]; bad.frames[4].fits = [bad.frames[4].noun, bad.frames[5].noun]; await facePoison('PF6 overlapping fits on the match face (8 frames, three collisions -> 5 compatible)', 'match', faceWithBank(FS('match'), bad), /cannot compose 6 exclusive match frames[\s\S]*REFUSED/); }
    // the long-locale renders: the synthetic de (9.2 px/char, capitalised nouns, articles by gender) and fi (no articles, long nouns) blocks through
    // the seam, every face under the 3+3 chrome (710) — verify + lints clean, the node cross-check against the synthetic block
    for (const loc of ['de', 'fi']) {
      const b = synthetic(loc, en);
      for (const mode of Object.keys(FACE_OF)) {
        if (mode === 'plural' && b.refuse && b.refuse.plural) continue;
        // fi: plural / story under the 3-line fi title (710, their worst LEGAL chrome by rule 13); letters / choice / match under the 4-line fi title (677)
        const chrome = loc === 'fi' ? (['plural', 'story'].includes(mode) ? CHROME.threeFi : CHROME.four) : CHROME.three;
        const r = await renderFace(page, faceWithBank(FS(mode), b), { baseName: `${FACE_OF[mode]}-gate-d2-${loc}-syn-chrome${chrome === CHROME.four ? 677 : 722}`, strings: chrome, locale: loc });
        ok(chrome === CHROME.four ? (r.m.body.h <= 690) : (r.m.body.h >= 700 && r.m.body.h <= 724), `${FACE_OF[mode]} ${mode} synthetic ${loc}: body ${Math.round(r.m.body.h)} under the ${chrome === CHROME.four ? '677' : '710'} fixture`);
        const c = faceCross(mode, r.m, b, loc, all);
        ok(r.verify.length === 0 && r.lints.length === 0 && c.length === 0, `${FACE_OF[mode]} ${mode} synthetic ${loc} at 710: verify ${JSON.stringify(r.verify)} lints ${JSON.stringify(r.lints)} cross ${c.join(' | ')}`);
        console.log(`render ${FACE_OF[mode]} ${mode} synthetic ${loc} ${chrome === CHROME.four ? '677' : '3+3'} chrome: verify ${r.verify.length} lints ${r.lints.length} cross ${c.length} ${faceMeasures(r.m)}`);
      }
    }
    // the face controls: the synthetic de / fi blocks BUILD every face (de: plural + choice foils by gender; fi: no articles)
    for (const loc of ['de', 'fi']) { const b = synthetic(loc, en); const built = []; for (const mode of Object.keys(FACE_OF)) { try { FS(mode)._buildWith(b, FS(mode).difficulty[2], { locale: loc, globals: all }, { rng: makeRng('ctl-' + loc + mode) }); built.push(mode); } catch (e) { built.push(mode + ' FAILED: ' + e.message); } }
      ok(built.every((x) => !/FAILED/.test(x)), `control: the synthetic ${loc} block builds every face (${built.join(' | ')})`); }

  } finally {
    await browser.close();
  }
  console.log(`\nverify-b4-cloze: ${asserts} assertions, ${fails} failures, ${killed}/${poisonTotal} poisons killed in ${((Date.now() - t0) / 1000).toFixed(0)}s${QUICK ? ' (--quick: sweeps skipped)' : ''}`);
  console.log(fails ? `FAIL (${fails} findings)` : `PASS (${asserts} assertions, ${killed}/${poisonTotal} poisons killed)`);
  process.exit(fails ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, crossCheck, faceCross, TABLE_B, HEADS, synthetic };
