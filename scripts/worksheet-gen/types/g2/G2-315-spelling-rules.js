/**
 * G2-315 — Spelling Rules (nt20-C; family key `spelling-rules`, G2, en base
 * L.2.2.d + RF.2.3.a; the national framework NAME elsewhere). Design:
 * docs/worksheet-gen/b3-designs/G2-315-spelling-rules.md §2/§5.
 *
 * "Read the rule, look at the picture, write the rule letters in the gap."
 * A rule box on top (one coral chip per rule grapheme + MODEL words with
 * their rule letters in coral) and cream cards (2×N): a picture above the
 * word printed in EQUAL LETTER CELLS with one dashed coral box per gap where
 * the rule grapheme belongs; the child writes the grapheme (1-3 letters). The
 * answer is never printed. Distinct from K-224 (one arbitrary CVC letter at
 * K), G1-244 d2 (whole word, no rule), G1-305 (a syllable, no rule), K-317 F5
 * (a sound unit traced + circled), K-318 (no letters printed).
 *
 * THEMELESS (README ruling; per theme every rule reaches 0-4 words): the
 * page draws from a cross-theme per-rule `items[]` pool in
 * data/b3/spelling-rules.js (panel-opened pictures pinned per item); the RULE
 * is the unit axis (lib/unit-axis.js; the design file's `ruleAxis`):
 * `build()` renders `unit || bank.exemplar`, a wave fans rules with
 * unitsPerType / unitOverrides, `{UNIT}` in the title resolves to `rule.head`.
 *
 * Difficulty is a CONFIG; guards key on the resolved config, never the level:
 *   cards/cols/rows   cards on the page
 *   pic               picture px (shrinks to ≥ minPic under a long chrome)
 *   cellMax           the letter cell (px) at short words; cells shrink to
 *                     hold longer words, never below CELL_MIN (font 22 = the
 *                     G2 answer floor) — a word needing more than
 *                     floor(296 / CELL_MIN) cells is not eligible
 *   minLetters/maxLetters   word length window
 *   models            model pills in the rule box (0 = chips only)
 *   gapCells          'len' (a box as wide as its grapheme) | N (fixed width,
 *                     so the box no longer shows the grapheme length)
 *   minPool           the face-pool floor (≥ this many eligible words, else
 *                     the (rule, locale, level) is REFUSED — never a filler)
 * build() reads ONLY data/b3/spelling-rules.js (lib/b3-common.js bank) and
 * the picture index guard; never image-vocabulary.js.
 *
 * Answer hiding: each stage stamps data-lcs-word / -vocab / -gap ("from:len[,
 * from:len]") / -side / -cell; the root stamps the rule id, its regex and
 * cands; verify() re-derives g from the stamps (word minus the visible
 * letters), asserts g ∈ cands and that the gap sits where the rule regex
 * fires, every box `gapCells·cell − 2` wide, the printed letters === the word
 * minus the gap letters, no model word on a card, no duplicate, every
 * picture loaded and inside its card, the rule box chips + models re-derived.
 * Single-solution (frame uniqueness) is node-side: the bank validator in
 * qa/verify-b3-spelling-rules.js.
 *
 * PHASE 2 (2026-09-14) — the FIVE faces (design §3), each an ADDITIVE knob in
 * the resolved config that `_buildWith` dispatches on BEFORE the base path
 * (the base's three configs carry none → byte-identical, tools/b3-baseline.js):
 *   choice:{sides,minSide,rowMax,pic,chipPx}   G2-324 Which One? — half the cards
 *          are the CONTRAST side; two letterChips under each word; every gap box
 *          max(pair lengths) wide (the G1-305 leak rule); the child circles + writes
 *   detective:{foils}                          G2-325 Rule Detective — the whole
 *          word printed (gapWord 'full'), the child circles the rule letters and
 *          copies them into an EMPTY box
 *   bins:{n,items,rows,split,minSide,...}      G2-326 Sort by rule — a picture
 *          bank (nothing printed) + two chip-labelled bins of empty rulings; the
 *          child spells AND sorts; the line count never states the split
 *   anchor:{at:'rule'}                         G2-327 Write the word — only the
 *          rule letters printed (coral), every other cell a dashed box (gapWord
 *          'scaffold')
 *   form:{of:'plural',rows,gapCells,...}       G2-328 The plural changes the
 *          spelling — a `gap.kind:'plural'` rule (en y→ies / f→ves): singular
 *          printed in cells + three "many" clones + the plural as a gapWord with
 *          the box at the changed grapheme
 * Rows in tools/b3var-rows/spelling-rules.js set the knob (detective, anchor);
 * choice / bins / plural are HANDWRITTEN specs because their EXEMPLAR differs:
 * the en exemplar magic e has no letter pair (split rule) and no plural form,
 * so those faces resolve `exemplarFor(bank, face)` = the first rule in bank
 * order that does not refuse the face (`unitAxisFor(face)` builds the axis;
 * `{UNIT}` = `rule.pairHead` on the pair faces, `rule.head` elsewhere). A rule
 * with `gap.kind:'plural'` REFUSES the base and every gap face.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { gapWord, ruleBox, pictureBank, ruleBins, ruleCopyBox, letterChips } = require('../../templates/components-b3.js');
const { displayWord, distinctByWord, sampleEntries, fileUri } = require('../../lib/b2-common.js');
const { candidates } = require('../../lib/b3-picture-index.js');
const { bank: loadBank } = require('../../lib/b3-common.js');
const { esc } = require('../../primitives/_svg.js');

const KEY = 'spelling-rules';
const ID = 'G2-315';
const CELL_ROW_MAX = 296;   // cells never exceed this (3 px each side inside the 302 stage)
const CELL_MIN = 24;        // font 22 = the G2 answer floor (design §2)
const MIN_PIC = 36;         // the G2 element floor

function ruleOf(bank, id) {
  const r = bank.rules && bank.rules[id];
  if (!r) throw new Error(`${ID}: rule "${id}" is not in the bank (rules: ${Object.keys(bank.rules || {}).join(',')})`);
  return r;
}
/** Cells per gap for a resolved config: 'len' → each gap's own length; N → N for every gap. */
function gapCellsFor(gaps, cfg) { return gaps.map((g) => (cfg === 'len' ? g.len : cfg)); }
function cellCount(n, gaps, gc) { return n - gaps.reduce((s, g) => s + g.len, 0) + gc.reduce((s, c) => s + c, 0); }
function cellFor(cells, cellMax, rowMax) { return Math.min(cellMax, Math.floor((rowMax || CELL_ROW_MAX) / cells)); }
function onceRe(re) { return new RegExp(re, 'gu'); }

/**
 * The eligible items of (rule, loc) for a resolved config — PURE, no rng.
 * Order: bank items → displayWord (bank.capital) → letters only → not in the
 * bank's excluded family → letters in range → the rule grapheme occurs
 * EXACTLY once → cells ≤ floor(rowMax/CELL_MIN) (rowMax 296, the choice face
 * passes 246) under the config's gapCells → not a model word → distinct by word.
 * @returns {Array<{theme, noun, vocabKey, word, gaps, g, side, cells, gapCells}>}
 */
function eligible(loc, ruleId, opts) {
  const l = String(loc || 'en').slice(0, 2);
  const o = Object.assign({ minLetters: 3, maxLetters: 12, gapCells: 'len' }, opts || {});
  const b = o.bank || loadBank(KEY, l);
  const rule = ruleOf(b, ruleId);
  if (rule.gap.kind === 'plural') return [];
  const notFace = o.face ? (it) => !(Array.isArray(it.not) && it.not.includes(o.face)) : () => true;   // an item kept off a named face   // a plural-form rule has no gap page (eligiblePlural is its pool)
  const models = new Set((rule.models || []).map((m) => m.word));
  const maxCells = Math.floor((o.rowMax || CELL_ROW_MAX) / CELL_MIN);
  const re = onceRe(rule.gap.re);
  const exclRe = b.exclude && b.exclude.re ? new RegExp(b.exclude.re, 'u') : null;   // an item family the locale refuses
  const pool = (rule.items || [])
    .filter(notFace)
    .map((it) => ({ ...it, word: displayWord(it.word, l, b.capital) }))
    .filter((it) => /^\p{L}+$/u.test(it.word))
    .filter((it) => !(exclRe && exclRe.test(it.word.toLocaleLowerCase(l))))
    .filter((it) => { const n = [...it.word].length; return n >= o.minLetters && n <= o.maxLetters; })
    .filter((it) => rule.gap.kind !== 'regex' || [...it.word.toLocaleLowerCase(l).matchAll(re)].length === 1)
    .map((it) => { const gc = gapCellsFor(it.gaps, o.gapCells); return { ...it, gapCells: gc, cells: cellCount([...it.word].length, it.gaps, gc) }; })
    .filter((it) => it.cells <= maxCells)
    .filter((it) => !models.has(it.word));
  return distinctByWord(pool, (it) => it.word);
}

/** The pinned picture must be a colour-index candidate for the key (BW dirs, blocked, excluded, uncached all refuse). */
function pictureOf(p, loc) {
  const ok = candidates(p.vocabKey, loc).some((c) => c.theme === p.theme && c.noun === p.noun);
  if (!ok) throw new Error(`${ID}: picture ${p.theme}/${p.noun} is not a colour-index candidate for "${p.vocabKey}" in ${loc} — refuse`);
  return fileUri(p.theme, p.noun);
}

/* ------------------------------------------------------------------ Phase 2: the five faces */
const FACES = ['choice', 'detective', 'bins', 'anchor', 'plural'];

/** Which face a resolved config asks for (null = the base). Guards key on the config, never the level. */
function faceOf(d) {
  if (d.choice) return 'choice';
  if (d.detective) return 'detective';
  if (d.bins) return 'bins';
  if (d.anchor) return 'anchor';
  if (d.form && d.form.of === 'plural') return 'plural';
  return null;
}

/** null when the rule can carry the face, else the refusal reason (design §3 + §4 refusals). */
function faceRefusal(rule, face) {
  const kind = rule.gap && rule.gap.kind;
  const ref = rule.refuse || {};
  if (face === 'plural') {
    if (kind !== 'plural') return 'not a plural-form rule (gap.kind must be "plural")';
    if (ref.plural) return 'refused: ' + ref.plural;
    return null;
  }
  if (kind === 'plural') return 'a plural-form rule has no ' + (face || 'base') + ' page';
  if (!face) return ref.base ? 'refused: ' + ref.base : null;
  if (ref[face]) return 'refused: ' + ref[face];
  if ((face === 'choice' || face === 'bins') && !(Array.isArray(rule.pair) && rule.pair.length === 2)) return 'no letter pair (pair is null)';
  return null;
}
/** The rules of a bank that carry a face, in bank order (the unit-axis order for that face). */
function unitsFor(bank, face) { return Object.keys(bank.rules || {}).filter((id) => !faceRefusal(bank.rules[id], face)); }
/** The face's exemplar: the locale's exemplar when it carries the face, else the first rule that does. */
function exemplarFor(bank, face) {
  const ex = bank.exemplar;
  if (bank.rules && bank.rules[ex] && !faceRefusal(bank.rules[ex], face)) return ex;
  const first = unitsFor(bank, face)[0];
  if (!first) throw new Error(`${ID}: no rule in the bank carries the ${face || 'base'} face — REFUSED`);
  return first;
}
/** The unit axis of one face (the handwritten specs' `unitAxis`; the base's is unitAxisFor(null)). */
function unitAxisFor(face) {
  return {
    applicable: true,
    units: (loc) => unitsFor(loadBank(KEY, loc), face),
    exemplar: (loc) => exemplarFor(loadBank(KEY, loc), face),
    tokens: (unit, loc) => {
      const r = ruleOf(loadBank(KEY, loc), unit);
      const head = (face === 'choice' || face === 'bins') && r.pairHead ? r.pairHead : r.head;
      return { U: head, L: head.toLocaleLowerCase(loc), UNIT: head };
    },
  };
}
/** The chip order of a pair: shorter first, else alphabetical — ONE order per rule, identical on every card. */
function chipOrder(pair) { return pair.slice().sort((a, b) => [...a].length - [...b].length || a.localeCompare(b)); }

/**
 * The eligible items of a `gap.kind:'plural'` rule for the plural face — PURE.
 * Each item's `gaps` sit on the PLURAL (the changed grapheme); `word` is the
 * singular. Order: display forms → letters only → not excluded → singular ≤
 * maxSingular, plural ≤ maxPlural → the rule regex fires EXACTLY once on the
 * plural → the plural's cells fit the lane beside the FIXED singular column
 * (maxSingular × singCell) at ≥ CELL_MIN → not a model → distinct by word.
 */
function eligiblePlural(loc, ruleId, opts) {
  const l = String(loc || 'en').slice(0, 2);
  const o = Object.assign({ maxSingular: 8, maxPlural: 10, gapCells: 3, laneW: 647, padL: 22, pic: 56, clonePx: 32, gap: 10, singCell: 24, plurCellMax: 26 }, opts || {});
  const b = o.bank || loadBank(KEY, l);
  const rule = ruleOf(b, ruleId);
  if (!rule.gap || rule.gap.kind !== 'plural') return [];
  const re = onceRe(rule.gap.re);
  const models = new Set((rule.models || []).map((m) => m.word));
  const exclRe = b.exclude && b.exclude.re ? new RegExp(b.exclude.re, 'u') : null;
  const fixed = o.padL + o.pic + 3 * o.gap + (3 * o.clonePx + 2 * 4) + o.maxSingular * o.singCell;   // the singular column is fixed-width so the rows align
  const pool = (rule.items || [])
    .filter((it) => !(Array.isArray(it.not) && it.not.includes('plural')))
    .filter((it) => it.plural)
    .map((it) => ({ ...it, word: displayWord(it.word, l, b.capital), plural: displayWord(it.plural, l, b.capital) }))
    .filter((it) => /^\p{L}+$/u.test(it.word) && /^\p{L}+$/u.test(it.plural))
    .filter((it) => !(exclRe && (exclRe.test(it.word.toLocaleLowerCase(l)) || exclRe.test(it.plural.toLocaleLowerCase(l)))))
    .filter((it) => [...it.word].length <= o.maxSingular && [...it.plural].length <= o.maxPlural)
    .filter((it) => [...it.plural.toLocaleLowerCase(l).matchAll(re)].length === 1)
    .map((it) => {
      const gc = gapCellsFor(it.gaps, o.gapCells);
      const cells = cellCount([...it.plural].length, it.gaps, gc);
      const avail = o.laneW - fixed;
      return { ...it, gapCells: gc, cells, avail, cell: Math.min(o.plurCellMax, Math.floor(avail / cells)) };
    })
    .filter((it) => it.cell >= CELL_MIN)
    .filter((it) => !models.has(it.word));
  return distinctByWord(pool, (it) => it.word);
}

module.exports = {
  id: ID,
  slug: 'spelling-rules',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: (loc) => unitsFor(loadBank(KEY, loc), null),   // the rules that carry the base (a plural-form rule does not)
    exemplar: (loc) => loadBank(KEY, loc).exemplar,
    tokens: (unit, loc) => { const r = ruleOf(loadBank(KEY, loc), unit); return { U: r.head, L: r.head.toLocaleLowerCase(loc), UNIT: r.head }; },
  },
  difficulty: {
    1: { cards: 6, cols: 2, rows: 3, pic: 120, cellMax: 36, minLetters: 3, maxLetters: 8, models: 3, gapCells: 'len', mode: 'gap', minPool: 10 },
    2: { cards: 8, cols: 2, rows: 4, pic: 88, cellMax: 32, minLetters: 3, maxLetters: 12, models: 2, gapCells: 'len', mode: 'gap', minPool: 10 },
    3: { cards: 8, cols: 2, rows: 4, pic: 80, cellMax: 32, minLetters: 6, maxLetters: 12, models: 0, gapCells: 3, mode: 'gap', minPool: 10 },
  },
  i18n: {
    en: {
      title: 'Spelling Rules: {UNIT}',
      instruction: 'Read the rule in the box. Say each picture word, then write the missing rule letters in the dashed boxes.',
    },
  },
  eligible,
  cellFor,
  cellCount,

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(KEY, loc), { theme, difficulty, locale: loc, unit }, ctx);
  },

  /** The whole build over an INJECTED bank (the gate's poison seam); build() passes the real one. */
  _buildWith(bank, { difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const face = faceOf(d);
    if (face) return this._buildFace(bank, d, face, { locale: loc, unit }, ctx);   // Phase 2 faces; the base path below is untouched
    const ruleId = unit || bank.exemplar;
    const rule = ruleOf(bank, ruleId);
    const refused = faceRefusal(rule, null);
    if (refused) throw new Error(`${ID}: rule ${ruleId}/${loc} cannot carry the base page (${refused}) — REFUSED`);
    if (d.mode !== 'gap') throw new Error(`${ID}: the base renders mode 'gap' only (got ${d.mode})`);
    if ((rule.models || []).length < d.models) throw new Error(`${ID}: rule ${ruleId}/${loc} has ${(rule.models || []).length} models < ${d.models} — REFUSED`);
    const pool = eligible(loc, ruleId, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: d.gapCells, bank });
    const floor = Math.max(d.cards, d.minPool || 0);
    if (pool.length < floor) throw new Error(`${ID}: rule ${ruleId}/${loc} has ${pool.length} eligible words < ${floor} (d${difficulty}) — REFUSED`);
    const picks = rng.shuffle(sampleEntries(rng, pool, d.cards, ID));
    const seenK = new Set();
    for (const p of picks) { if (seenK.has(p.vocabKey)) throw new Error(`${ID}: duplicate vocab key on the page: ${p.vocabKey}`); seenK.add(p.vocabKey); }

    const models = (rule.models || []).slice(0, d.models).map((m) => ({
      src: pictureOf(m, loc), word: displayWord(m.word, loc, bank.capital), gaps: m.gaps,
    }));
    const chips = String(rule.chip || '').split(/\s+/).filter(Boolean);
    const box = ruleBox({ chips, models, w: 675, h: 60 });

    const cards = picks.map((it) => {
      const n = [...it.word].length;
      const cell = cellFor(it.cells, d.cellMax);
      const fontPx = cell - 2;
      const svg = gapWord({ word: it.word, gaps: it.gaps, gapCells: it.gapCells, cell, fontPx, mode: 'gap' });
      const gapStamp = it.gaps.map((g) => g.from + ':' + g.len).join(',');
      return `<div class="ws-card-stage" style="padding:6px 0;flex-direction:column;justify-content:center;gap:0" data-ws-content ` +
        `data-lcs-word="${esc(it.word)}" data-lcs-vocab="${esc(it.vocabKey)}" data-lcs-gap="${esc(gapStamp)}" data-lcs-side="${esc(it.side || 'rule')}" ` +
        `data-lcs-cell="${cell}" data-lcs-cells="${it.cells}" data-lcs-face="base">` +
        `<img class="ws-icon" src="${pictureOf(it, loc)}" alt="" data-lcs-pic="${esc(it.vocabKey)}" style="width:${d.pic}px;height:${d.pic}px;flex:0 1 auto;min-height:${MIN_PIC}px">` +
        `<div style="margin-top:6px;line-height:0" data-lcs-wordrow>${svg}</div></div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-face="base" data-lcs-rule="${esc(ruleId)}" data-lcs-rule-head="${esc(rule.head)}" ` +
      `data-lcs-re="${esc(rule.gap.re)}" data-lcs-boxes="${esc(rule.gap.boxes || 'wide')}" data-lcs-cands="${esc((rule.cands || []).join(','))}" ` +
      `data-lcs-cards="${d.cards}" data-lcs-models="${d.models}" data-lcs-gapcells="${d.gapCells}" data-lcs-cellmax="${d.cellMax}" ` +
      `data-lcs-minletters="${d.minLetters}" data-lcs-maxletters="${d.maxLetters}" data-lcs-pic="${d.pic}" ` +
      `style="flex:1;display:flex;flex-direction:column;min-height:0;gap:14px">` +
      box + cardGrid({ cards, cols: d.cols, rows: d.rows }) + `</div>`;
    return { bodyHtml, meta: { rule: ruleId, words: picks.map((p) => p.word), gaps: picks.map((p) => p.g), models: models.map((m) => m.word), pool: pool.length } };
  },

  /* ---------------------------------------------------------------- Phase 2 face builders */
  faceOf, faceRefusal, unitsFor, exemplarFor, unitAxisFor, eligiblePlural, chipOrder,

  /** Root + rule-box shared by the faces (the base's root stamps + data-lcs-face + data-lcs-spec). */
  _faceRoot(face, d, rule, ruleId, box, inner, extra) {
    return `<div data-ws-content data-lcs-type="${ID}" data-lcs-spec="${esc(this.id)}" data-lcs-face="${face}" data-lcs-rule="${esc(ruleId)}" data-lcs-rule-head="${esc(rule.head)}" ` +
      `data-lcs-re="${esc(rule.gap.re)}" data-lcs-boxes="${esc(rule.gap.boxes || 'wide')}" data-lcs-cands="${esc((rule.cands || []).join(','))}" ` +
      `data-lcs-cards="${d.cards}" data-lcs-models="${d.models}" data-lcs-cellmax="${d.cellMax}" ` +
      `data-lcs-minletters="${d.minLetters}" data-lcs-maxletters="${d.maxLetters}" data-lcs-pic="${d.pic}"${extra || ''} ` +
      `style="flex:1;display:flex;flex-direction:column;min-height:0;gap:14px">` + box + inner + `</div>`;
  },

  _buildFace(bank, d, face, { locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const ruleId = unit || exemplarFor(bank, face);
    const rule = ruleOf(bank, ruleId);
    const why = faceRefusal(rule, face);
    if (why) throw new Error(`${ID}: rule ${ruleId}/${loc} cannot carry the ${face} face (${why}) — REFUSED`);
    const chips = String(rule.chip || '').split(/\s+/).filter(Boolean);
    const models = (rule.models || []).slice(0, d.models);
    if (models.length < d.models) throw new Error(`${ID}: rule ${ruleId}/${loc} has ${models.length} models < ${d.models} — REFUSED`);
    switch (face) {
      case 'choice': return this._buildChoice(bank, d, loc, rule, ruleId, ctx);
      case 'detective': return this._buildDetective(bank, d, loc, rule, ruleId, chips, models, ctx);
      case 'bins': return this._buildBins(bank, d, loc, rule, ruleId, ctx);
      case 'anchor': return this._buildAnchor(bank, d, loc, rule, ruleId, chips, models, ctx);
      case 'plural': return this._buildPlural(bank, d, loc, rule, ruleId, chips, models, ctx);
      default: throw new Error(`${ID}: unknown face "${face}"`);
    }
  },

  /** The two sides of a pair rule from a pool: [rule side (g === pair[0]), contrast side (g === pair[1])], each ≥ minSide or REFUSED. */
  _sides(pool, rule, ruleId, loc, need, minSide, face) {
    const pair = rule.pair;
    const A = pool.filter((it) => it.g === pair[0]);
    const B = pool.filter((it) => it.g === pair[1]);
    const floorA = Math.max(need[0], minSide || 0), floorB = Math.max(need[1], minSide || 0);
    if (A.length < floorA || B.length < floorB) throw new Error(`${ID}: rule ${ruleId}/${loc} ${face}: sides ${A.length}/${B.length} eligible words < ${floorA}/${floorB} — REFUSED`);
    return [A, B];
  },

  _buildChoice(bank, d, loc, rule, ruleId, ctx) {
    const c = d.choice;
    const rng = ctx.rng;
    const pair = rule.pair;
    const order = chipOrder(pair);
    const G = Math.max(...pair.map((p) => [...p].length));   // every gap box max(candidate lengths) wide — the G1-305 leak rule
    const pool = eligible(loc, ruleId, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: G, bank, rowMax: c.rowMax, face: 'choice' });
    const [A, B] = this._sides(pool, rule, ruleId, loc, c.sides, c.minSide, 'choice');
    const picks = rng.shuffle([...sampleEntries(rng, A, c.sides[0], ID), ...sampleEntries(rng, B, c.sides[1], ID)]);
    const seenK = new Set();
    for (const p of picks) { if (seenK.has(p.vocabKey)) throw new Error(`${ID}: duplicate vocab key on the page: ${p.vocabKey}`); seenK.add(p.vocabKey); }
    const box = ruleBox({ chips: order, models: [], w: 675, h: 60 });
    const cards = picks.map((it) => {
      const cell = cellFor(it.cells, d.cellMax, c.rowMax);
      const svg = gapWord({ word: it.word, gaps: it.gaps, gapCells: G, cell, fontPx: cell - 2, mode: 'gap' });
      const gapStamp = it.gaps.map((g) => g.from + ':' + g.len).join(',');
      return `<div class="ws-card-stage" style="padding:6px 0;flex-direction:column;justify-content:center;gap:6px" data-ws-content ` +
        `data-lcs-word="${esc(it.word)}" data-lcs-vocab="${esc(it.vocabKey)}" data-lcs-gap="${esc(gapStamp)}" data-lcs-side="${esc(it.g === pair[0] ? 'rule' : 'contrast')}" ` +
        `data-lcs-cell="${cell}" data-lcs-cells="${it.cells}" data-lcs-face="choice">` +
        `<div data-lcs-choicerow style="display:flex;align-items:center;justify-content:center;gap:8px;line-height:0">` +
        `<img class="ws-icon" src="${pictureOf(it, loc)}" alt="" data-lcs-pic="${esc(it.vocabKey)}" style="width:${c.pic}px;height:${c.pic}px;flex:0 0 auto">${svg}</div>` +
        letterChips({ a: order[0], b: order[1], px: c.chipPx }) + `</div>`;
    });
    const extra = ` data-lcs-pair="${esc(pair.join(','))}" data-lcs-chip-order="${esc(order.join('|'))}" data-lcs-sides="${c.sides.join(',')}" data-lcs-gapcells="${G}" data-lcs-rowmax="${c.rowMax}" data-lcs-chippx="${c.chipPx}"`;
    const bodyHtml = this._faceRoot('choice', d, rule, ruleId, box, cardGrid({ cards, cols: d.cols, rows: d.rows }), extra);
    return { bodyHtml, meta: { face: 'choice', rule: ruleId, pair, words: picks.map((p) => p.word), sides: picks.map((p) => p.g), pool: [A.length, B.length] } };
  },

  _buildDetective(bank, d, loc, rule, ruleId, chips, models, ctx) {
    const c = d.detective;
    const rng = ctx.rng;
    const rowW = 302 - 8 - 56;   // [gapWord full][8][copy box 56]
    const pool = eligible(loc, ruleId, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: 'len', bank, face: 'detective' })
      .filter((it) => cellFor([...it.word].length, d.cellMax, rowW) >= CELL_MIN);
    const floor = Math.max(d.cards, d.minPool || 0);
    if (pool.length < floor) throw new Error(`${ID}: rule ${ruleId}/${loc} detective has ${pool.length} eligible words < ${floor} — REFUSED`);
    const nFoils = c.foils || 0;
    const foils = (rule.foils || []).map((f) => ({ ...f, word: displayWord(f.word, loc, bank.capital) })).filter((f) => /^\p{L}+$/u.test(f.word) && [...f.word].length <= d.maxLetters);
    if (foils.length < nFoils) throw new Error(`${ID}: rule ${ruleId}/${loc} detective has ${foils.length} foils < ${nFoils} — REFUSED`);
    const picks = rng.shuffle([
      ...sampleEntries(rng, pool, d.cards - nFoils, ID),
      ...(nFoils ? sampleEntries(rng, foils, nFoils, ID).map((f) => ({ ...f, foil: true })) : []),
    ]);
    const seenK = new Set();
    for (const p of picks) { if (seenK.has(p.vocabKey)) throw new Error(`${ID}: duplicate vocab key on the page: ${p.vocabKey}`); seenK.add(p.vocabKey); }
    const modelPills = models.map((m) => ({ src: pictureOf(m, loc), word: displayWord(m.word, loc, bank.capital), gaps: m.gaps }));
    const box = ruleBox({ chips, models: modelPills, w: 675, h: 60 });
    const cards = picks.map((it) => {
      const n = [...it.word].length;
      const cell = cellFor(n, d.cellMax, rowW);
      const svg = gapWord({ word: it.word, gaps: [], cell, fontPx: cell - 2, mode: 'full' });
      const at = it.foil ? '' : ` data-lcs-rule-at="${esc(it.gaps.map((g) => g.from + ':' + g.len).join(','))}"`;
      return `<div class="ws-card-stage" style="padding:6px 0;flex-direction:column;justify-content:center;gap:6px" data-ws-content ` +
        `data-lcs-word="${esc(it.word)}" data-lcs-vocab="${esc(it.vocabKey)}"${at} data-lcs-side="${it.foil ? 'foil' : 'rule'}" ` +
        `data-lcs-cell="${cell}" data-lcs-cells="${n}" data-lcs-face="detective">` +
        `<img class="ws-icon" src="${pictureOf(it, loc)}" alt="" data-lcs-pic="${esc(it.vocabKey)}" style="width:${d.pic}px;height:${d.pic}px;flex:0 1 auto;min-height:${MIN_PIC}px">` +
        `<div data-lcs-wordrow style="display:flex;align-items:center;justify-content:center;gap:8px;line-height:0">${svg}${ruleCopyBox({ w: 56, h: 44 })}</div></div>`;
    });
    const extra = ` data-lcs-foils="${nFoils}" data-lcs-gapcells="len"`;
    const bodyHtml = this._faceRoot('detective', d, rule, ruleId, box, cardGrid({ cards, cols: d.cols, rows: d.rows }), extra);
    return { bodyHtml, meta: { face: 'detective', rule: ruleId, words: picks.map((p) => p.word), foils: picks.filter((p) => p.foil).map((p) => p.word), models: modelPills.map((m) => m.word), pool: pool.length } };
  },

  _buildBins(bank, d, loc, rule, ruleId, ctx) {
    const c = d.bins;
    const rng = ctx.rng;
    if (c.n !== 2) throw new Error(`${ID}: bins face ships two bins (got ${c.n})`);
    const pair = rule.pair;
    const order = chipOrder(pair);
    const pool = eligible(loc, ruleId, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: 'len', bank, face: 'bins' });
    const [A, B] = this._sides(pool, rule, ruleId, loc, [c.split[0], c.split[0]], c.minSide, 'bins');
    const nA = rng.int(c.split[0], c.split[1]);
    const nB = c.items - nA;
    if (nB < c.split[0] || nB > c.split[1]) throw new Error(`${ID}: bins split ${nA}/${nB} outside ${c.split.join('-')}`);
    if (A.length < nA || B.length < nB) throw new Error(`${ID}: rule ${ruleId}/${loc} bins: sides ${A.length}/${B.length} < the drawn split ${nA}/${nB} — REFUSED`);
    const picks = rng.shuffle([...sampleEntries(rng, A, nA, ID), ...sampleEntries(rng, B, nB, ID)]);
    const seenK = new Set();
    for (const p of picks) { if (seenK.has(p.vocabKey)) throw new Error(`${ID}: duplicate vocab key on the page: ${p.vocabKey}`); seenK.add(p.vocabKey); }
    const box = ruleBox({ chips: order, models: [], w: 675, h: 60 });
    const bankRow = pictureBank({ items: picks.map((it) => ({ src: pictureOf(it, loc), vocabKey: it.vocabKey, word: it.word })), px: c.pic });
    const bins = ruleBins({ bins: order.map((k) => ({ key: k, chip: k })), w: c.binW, rows: c.rows, rowH: c.rowH, glyphH: c.glyphH });
    const extra = ` data-lcs-pair="${esc(pair.join(','))}" data-lcs-chip-order="${esc(order.join('|'))}" data-lcs-items="${c.items}" data-lcs-rows="${c.rows}" data-lcs-split="${c.split.join(',')}" data-lcs-bankpx="${c.pic}" data-lcs-rowh="${c.rowH}" data-lcs-gapcells="len"`;
    const bodyHtml = this._faceRoot('bins', d, rule, ruleId, box, bankRow + bins, extra);
    return { bodyHtml, meta: { face: 'bins', rule: ruleId, pair, words: picks.map((p) => p.word), split: [nA, nB], pool: [A.length, B.length] } };
  },

  _buildAnchor(bank, d, loc, rule, ruleId, chips, models, ctx) {
    const rng = ctx.rng;
    const pool = eligible(loc, ruleId, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: 'len', bank, face: 'anchor' });
    const floor = Math.max(d.cards, d.minPool || 0);
    if (pool.length < floor) throw new Error(`${ID}: rule ${ruleId}/${loc} anchor has ${pool.length} eligible words < ${floor} — REFUSED`);
    const picks = rng.shuffle(sampleEntries(rng, pool, d.cards, ID));
    const seenK = new Set();
    for (const p of picks) { if (seenK.has(p.vocabKey)) throw new Error(`${ID}: duplicate vocab key on the page: ${p.vocabKey}`); seenK.add(p.vocabKey); }
    const modelPills = models.map((m) => ({ src: pictureOf(m, loc), word: displayWord(m.word, loc, bank.capital), gaps: m.gaps }));
    const box = ruleBox({ chips, models: modelPills, w: 675, h: 60 });
    const cards = picks.map((it) => {
      const n = [...it.word].length;
      const cell = cellFor(n, d.cellMax);
      const svg = gapWord({ word: it.word, gaps: it.gaps, cell, fontPx: cell - 2, mode: 'scaffold' });
      const gapStamp = it.gaps.map((g) => g.from + ':' + g.len).join(',');
      return `<div class="ws-card-stage" style="padding:6px 0;flex-direction:column;justify-content:center;gap:0" data-ws-content ` +
        `data-lcs-word="${esc(it.word)}" data-lcs-vocab="${esc(it.vocabKey)}" data-lcs-gap="${esc(gapStamp)}" data-lcs-side="${esc(it.side || 'rule')}" ` +
        `data-lcs-cell="${cell}" data-lcs-cells="${n}" data-lcs-face="anchor">` +
        `<img class="ws-icon" src="${pictureOf(it, loc)}" alt="" data-lcs-pic="${esc(it.vocabKey)}" style="width:${d.pic}px;height:${d.pic}px;flex:0 1 auto;min-height:${MIN_PIC}px">` +
        `<div style="margin-top:6px;line-height:0" data-lcs-wordrow>${svg}</div></div>`;
    });
    const extra = ` data-lcs-anchor="${esc(d.anchor.at || 'rule')}" data-lcs-gapcells="len"`;
    const bodyHtml = this._faceRoot('anchor', d, rule, ruleId, box, cardGrid({ cards, cols: d.cols, rows: d.rows }), extra);
    return { bodyHtml, meta: { face: 'anchor', rule: ruleId, words: picks.map((p) => p.word), gaps: picks.map((p) => p.g), models: modelPills.map((m) => m.word), pool: pool.length } };
  },

  _buildPlural(bank, d, loc, rule, ruleId, chips, models, ctx) {
    const f = d.form;
    const rng = ctx.rng;
    const geo = { maxSingular: f.maxSingular, maxPlural: f.maxPlural, gapCells: f.gapCells, laneW: 647, padL: 22, pic: f.pic, clonePx: f.clonePx, gap: 10, singCell: f.singCell, plurCellMax: f.plurCellMax, bank };
    const pool = eligiblePlural(loc, ruleId, geo);
    const floor = Math.max(f.rows, d.minPool || 0);
    if (pool.length < floor) throw new Error(`${ID}: rule ${ruleId}/${loc} plural has ${pool.length} eligible pairs < ${floor} — REFUSED`);
    const picks = rng.shuffle(sampleEntries(rng, pool, f.rows, ID));
    const seenK = new Set();
    for (const p of picks) { if (seenK.has(p.vocabKey)) throw new Error(`${ID}: duplicate vocab key on the page: ${p.vocabKey}`); seenK.add(p.vocabKey); }
    // Every plural ending the page asks for must be one of the rule-box chips: es
    // "plural-tilde" authored chip "ones ines" over cands [ones ines enes anes uses], so
    // a page with tucán → tucanes and autobús → autobuses offered no chip a child could
    // copy (read off the es contact sheet, 2026-09-14). A pick whose gapped ending is
    // not a chip is a refusal, never a page.
    // A rule may instead declare `chipsAreExamples: true` — its chips MODEL the pattern
    // (da flertal-dobbelt "tte kker" over sser/pper/kke…, fi astevaihtelu "kat tut put"
    // over kot/kit/tit…) and the child applies the rule; then the endings need not be chips.
    if (!rule.chipsAreExamples) {
      for (const p of picks) {
        const ending = (p.gaps || []).map((g) => [...p.plural].slice(g.from, g.from + g.len).join('')).join('');
        if (ending && !chips.includes(ending)) throw new Error(`${ID}: rule ${ruleId}/${loc} plural "${p.plural}" needs the ending "${ending}" but the rule chips are [${chips.join(' ')}] — REFUSED (author the chip, drop the item, or declare chipsAreExamples)`);
      }
    }
    const modelPills = models.map((m) => {
      if (!m.plural) throw new Error(`${ID}: plural model "${m.word}" has no plural — REFUSED`);
      return { src: pictureOf(m, loc), lead: displayWord(m.word, loc, bank.capital), word: displayWord(m.plural, loc, bank.capital), gaps: m.gaps };
    });
    const box = ruleBox({ chips, models: modelPills, w: 675, h: 60 });
    const cards = picks.map((it) => {
      const nS = [...it.word].length, nP = [...it.plural].length;
      const sing = gapWord({ word: it.word, gaps: [], cell: f.singCell, fontPx: f.singCell - 2, mode: 'full' });
      const plur = gapWord({ word: it.plural, gaps: it.gaps, gapCells: f.gapCells, cell: it.cell, fontPx: it.cell - 2, mode: 'gap' });
      const gapStamp = it.gaps.map((g) => g.from + ':' + g.len).join(',');
      const src = pictureOf(it, loc);
      const clones = `<span data-lcs-clones="3" style="display:inline-flex;gap:4px;flex:0 0 auto;line-height:0">` +
        `<img class="ws-icon" src="${src}" alt="" style="width:${f.clonePx}px;height:${f.clonePx}px">`.repeat(3) + `</span>`;
      return `<div class="ws-card-stage" style="padding:0 0 0 22px;justify-content:flex-start;gap:10px" data-ws-content ` +
        `data-lcs-word="${esc(it.word)}" data-lcs-plural="${esc(it.plural)}" data-lcs-vocab="${esc(it.vocabKey)}" data-lcs-gap="${esc(gapStamp)}" ` +
        `data-lcs-cell="${it.cell}" data-lcs-cells="${it.cells}" data-lcs-singcell="${f.singCell}" data-lcs-nsing="${nS}" data-lcs-nplur="${nP}" data-lcs-face="plural">` +
        `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(it.vocabKey)}" style="width:${f.pic}px;height:${f.pic}px;flex:0 0 auto">` +
        `<div data-lcs-singular style="line-height:0;flex:0 0 ${f.maxSingular * f.singCell}px;width:${f.maxSingular * f.singCell}px">${sing}</div>${clones}` +
        `<div data-lcs-wordrow style="line-height:0;flex:0 0 auto">${plur}</div></div>`;
    });
    const extra = ` data-lcs-rows="${f.rows}" data-lcs-gapcells="${f.gapCells}" data-lcs-clonepx="${f.clonePx}" data-lcs-singcellcfg="${f.singCell}" data-lcs-plurcellmax="${f.plurCellMax}" data-lcs-maxsingular="${f.maxSingular}" data-lcs-maxplural="${f.maxPlural}"`;
    const bodyHtml = this._faceRoot('plural', d, rule, ruleId, box, cardGrid({ cards, cols: 1, rows: f.rows }), extra);
    return { bodyHtml, meta: { face: 'plural', rule: ruleId, words: picks.map((p) => p.word), plurals: picks.map((p) => p.plural), models: modelPills.map((m) => m.lead + '→' + m.word), pool: pool.length } };
  },

  async verify(page) {
    const face = await page.evaluate(() => { const r = document.querySelector('[data-lcs-type="G2-315"]'); return r ? (r.dataset.lcsFace || 'base') : 'base'; });
    if (face !== 'base') return this._verifyFace(page, face);
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const root = document.querySelector('[data-lcs-type="G2-315"]');
      if (!root) return ['no G2-315 root'];
      const rule = root.dataset.lcsRule, cands = (root.dataset.lcsCands || '').split(',').filter(Boolean);
      const want = +root.dataset.lcsCards, wantModels = +root.dataset.lcsModels, cellMax = +root.dataset.lcsCellmax;
      const minL = +root.dataset.lcsMinletters, maxL = +root.dataset.lcsMaxletters;
      const gcCfg = root.dataset.lcsGapcells === 'len' ? 'len' : +root.dataset.lcsGapcells;
      const boxes = root.dataset.lcsBoxes;
      let re = null;
      try { re = new RegExp(root.dataset.lcsRe, 'gu'); } catch (e) { fails.push('rule regex does not compile: ' + root.dataset.lcsRe); }
      if (!rule || !cands.length) fails.push('rule / cands stamp missing');

      // the rule box: chips + models re-derived
      const box = root.querySelector('[data-lcs-rulebox]');
      if (!box) fails.push('no rule box');
      const modelWords = new Set();
      if (box) {
        const chips = [...box.querySelectorAll('[data-lcs-chip]')];
        if (!chips.length) fails.push('rule box has no chip');
        chips.forEach((c) => {
          const t = c.textContent.trim();
          if (!t || t !== c.dataset.lcsChip) fails.push(`chip text "${t}" ≠ stamp`);
          if (!cands.includes(t.replace(/_/g, ''))) fails.push(`chip "${t}" is not a candidate of the rule`);
          const r = c.getBoundingClientRect();
          if (r.width < 36 || r.height < 36) fails.push(`chip "${t}" ${Math.round(r.width)}×${Math.round(r.height)} < 36`);
        });
        const pills = [...box.querySelectorAll('[data-lcs-model]')];
        if (pills.length !== wantModels) fails.push(`${pills.length} model pills, want ${wantModels}`);
        pills.forEach((p) => {
          const w = p.dataset.lcsModel;
          modelWords.add(w.toLocaleLowerCase(lang));
          const txt = [...p.querySelectorAll('span')].filter((s) => s.children.length === 0).map((s) => s.textContent).join('');
          const whole = p.querySelector('span:not([data-lcs-rule-letter])');
          if (!whole || whole.textContent !== w) fails.push(`model "${w}": printed "${whole && whole.textContent}"`);
          const gaps = (p.dataset.lcsModelGaps || '').split(',').filter(Boolean).map((s) => s.split(':').map(Number));
          const coral = [...p.querySelectorAll('[data-lcs-rule-letter]')].map((s) => +s.dataset.lcsRuleLetter);
          const wantIdx = [];
          for (const [from, len] of gaps) for (let k = 0; k < len; k++) wantIdx.push(from + k);
          if (coral.join(',') !== wantIdx.join(',')) fails.push(`model "${w}": rule letters at ${coral.join(',')} want ${wantIdx.join(',')}`);
          const g = wantIdx.map((i) => [...w][i]).join('').toLocaleLowerCase(lang);
          if (!cands.includes(g)) fails.push(`model "${w}": rule letters "${g}" not in cands`);
          if (re) { re.lastIndex = 0; const m = [...w.toLocaleLowerCase(lang).matchAll(re)]; if (m.length !== 1) fails.push(`model "${w}": rule grapheme occurs ${m.length}× (want 1)`); }
          const img = p.querySelector('img');
          if (!img || !img.complete || img.naturalWidth === 0) fails.push(`model "${w}": picture broken`);
          else { const r = img.getBoundingClientRect(); if (r.width < 36 || r.height < 36) fails.push(`model "${w}": picture ${Math.round(r.width)} < 36`); }
          void txt;
        });
        if (box.scrollWidth > box.clientWidth + 1) fails.push(`rule box content ${box.scrollWidth} wider than the box ${box.clientWidth}`);
        const br = box.getBoundingClientRect();
        [...box.querySelectorAll('img, span')].forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width && (r.left < br.left - 0.6 || r.right > br.right + 0.6 || r.top < br.top - 0.6 || r.bottom > br.bottom + 0.6)) fails.push('rule box element outside the box');
        });
      }

      // the cards
      const stages = [...root.querySelectorAll('.ws-card-stage[data-lcs-face="base"]')];
      const cardsEl = [...root.querySelectorAll('.ws-card')];
      if (stages.length !== want) fails.push(`${stages.length} stages, want ${want}`);
      if (cardsEl.length !== want) fails.push(`${cardsEl.length} cards, want ${want}`);
      const seenW = new Set(), seenK = new Set();
      stages.forEach((st, i) => {
        const tag = `card ${i + 1}`;
        const word = st.dataset.lcsWord || '';
        const L = [...word];
        const n = L.length;
        const gaps = (st.dataset.lcsGap || '').split(',').filter(Boolean).map((s) => { const [from, len] = s.split(':').map(Number); return { from, len }; });
        const cell = +st.dataset.lcsCell;
        if (!word || !/^\p{L}+$/u.test(word)) fails.push(`${tag}: word "${word}" is not letters only`);
        if (n < minL || n > maxL) fails.push(`${tag}: ${n} letters outside ${minL}..${maxL}`);
        if (seenW.has(word.toLocaleLowerCase(lang))) fails.push(`${tag}: duplicate word "${word}"`);
        seenW.add(word.toLocaleLowerCase(lang));
        if (seenK.has(st.dataset.lcsVocab)) fails.push(`${tag}: duplicate vocab key`);
        seenK.add(st.dataset.lcsVocab);
        if (modelWords.has(word.toLocaleLowerCase(lang))) fails.push(`${tag}: "${word}" is a model word`);
        if (!gaps.length) { fails.push(`${tag}: no gap stamp`); return; }
        gaps.forEach((g, k) => {
          if (!(g.from >= 0 && g.len >= 1 && g.from + g.len <= n)) fails.push(`${tag}: gap ${g.from}:${g.len} out of range`);
          if (k && g.from < gaps[k - 1].from + gaps[k - 1].len) fails.push(`${tag}: overlapping gaps`);
          if (lang === 'de' && g.from === 0) fails.push(`${tag}: de gap in cell 0 (the capital)`);
        });
        // the case rule: de keeps the capital, everyone else prints lowercase
        if ((lang === 'de') !== /^\p{Lu}/u.test(word)) fails.push(`${tag}: case rule (${lang}) violated for "${word}"`);
        // g re-derived from the stamps
        const gIdx = [];
        for (const g of gaps) for (let k = 0; k < g.len; k++) gIdx.push(g.from + k);
        const g = gIdx.map((k) => L[k]).join('').toLocaleLowerCase(lang);
        if (!cands.includes(g)) fails.push(`${tag}: gap letters "${g}" not in cands [${cands.join(',')}]`);
        // the gap sits where the rule fires, exactly once
        if (re) {
          re.lastIndex = 0;
          const low = word.toLocaleLowerCase(lang);
          const ms = [...low.matchAll(re)];
          if (ms.length !== 1) fails.push(`${tag}: rule grapheme occurs ${ms.length}× in "${word}" (want 1)`);
          else {
            const at = [...low.slice(0, ms[0].index)].length, mlen = [...ms[0][0]].length;
            if (boxes === 'split') {
              if (gaps.length !== 2 || gaps[0].len !== 1 || gaps[1].len !== 1 || gaps[0].from !== at || gaps[1].from !== n - 1) fails.push(`${tag}: split rule needs two one-letter gaps at ${at} and ${n - 1}, got ${st.dataset.lcsGap}`);
            } else if (gaps.length !== 1 || gaps[0].from !== at || gaps[0].len !== mlen) fails.push(`${tag}: gap ${st.dataset.lcsGap} is not at the rule grapheme (${at}:${mlen})`);
          }
        }
        // the word svg: cells, boxes, letters
        const ws = st.querySelector('[data-lcs-prim="gap-word"]');
        if (!ws) { fails.push(`${tag}: no word cells`); return; }
        if (ws.dataset.lcsMode !== 'gap') fails.push(`${tag}: mode ${ws.dataset.lcsMode} (base = gap)`);
        const gc = gaps.map((x) => (gcCfg === 'len' ? x.len : gcCfg));
        const wantCells = n - gaps.reduce((s, x) => s + x.len, 0) + gc.reduce((s, c) => s + c, 0);
        if (+ws.dataset.lcsCells !== wantCells) fails.push(`${tag}: ${ws.dataset.lcsCells} cells, want ${wantCells}`);
        if (+st.dataset.lcsCells !== wantCells) fails.push(`${tag}: stage cells stamp ${st.dataset.lcsCells} ≠ ${wantCells}`);
        if (+ws.dataset.lcsCell !== cell) fails.push(`${tag}: cell stamp mismatch`);
        if (cell > cellMax || cell < 24) fails.push(`${tag}: cell ${cell} outside 24..${cellMax}`);
        if (wantCells * cell > 296) fails.push(`${tag}: cells ${wantCells}×${cell} exceed 296`);
        const boxesEl = [...ws.querySelectorAll('[data-lcs-gapbox]')];
        if (boxesEl.length !== gaps.length) fails.push(`${tag}: ${boxesEl.length} gap boxes, want ${gaps.length}`);
        // expected x layout: letters and boxes in cell order
        const expect = [];   // {kind:'letter', ch, x} | {kind:'box', cells, x}
        let x = 0;
        for (let k = 0; k < n; k++) {
          const gi = gaps.findIndex((q) => q.from === k);
          if (gi >= 0) { expect.push({ kind: 'box', i: gi, cells: gc[gi], x }); x += gc[gi]; k += gaps[gi].len - 1; }
          else { expect.push({ kind: 'letter', ch: L[k], x }); x++; }
        }
        const texts = [...ws.querySelectorAll('text')];
        const wantLetters = expect.filter((e) => e.kind === 'letter');
        if (texts.map((t) => t.textContent).join('') !== wantLetters.map((e) => e.ch).join('')) fails.push(`${tag}: printed letters "${texts.map((t) => t.textContent).join('')}" ≠ word minus gaps "${wantLetters.map((e) => e.ch).join('')}"`);
        texts.forEach((t, k) => {
          const e = wantLetters[k]; if (!e) return;
          if (Math.abs(+t.getAttribute('x') - (e.x + 0.5) * cell) > 0.51) fails.push(`${tag}: letter ${k} at x=${t.getAttribute('x')}, want ${(e.x + 0.5) * cell}`);
          if (+t.getAttribute('font-size') !== cell - 2) fails.push(`${tag}: font ${t.getAttribute('font-size')} ≠ cell−2`);
          if ((t.getAttribute('fill') || '').toUpperCase() === '#F2784B') fails.push(`${tag}: a coral letter on a base card`);
        });
        expect.filter((e) => e.kind === 'box').forEach((e) => {
          const b = boxesEl.find((bx) => +bx.dataset.lcsGapbox === e.i);
          if (!b) { fails.push(`${tag}: gap box ${e.i} missing`); return; }
          const bw = +b.getAttribute('width'), bx = +b.getAttribute('x');
          if (Math.abs(bw - (e.cells * cell - 2)) > 0.51) fails.push(`${tag}: gap box ${e.i} width ${bw}, want ${e.cells * cell - 2} (gap width leaks the answer)`);
          if (Math.abs(bx - (e.x * cell + 1)) > 0.51) fails.push(`${tag}: gap box ${e.i} at x=${bx}, want ${e.x * cell + 1}`);
          if (+b.getAttribute('height') < cell + 8 - 0.5) fails.push(`${tag}: gap box height ${b.getAttribute('height')} < cell+8`);
          if (b.querySelector && b.textContent && b.textContent.trim()) fails.push(`${tag}: text inside a gap box`);
        });
        if (ws.querySelectorAll('rect').length !== gaps.length) fails.push(`${tag}: ${ws.querySelectorAll('rect').length} rects ≠ ${gaps.length} gap boxes`);
        if (ws.getBoundingClientRect().width > 302.6) fails.push(`${tag}: word svg wider than the card`);
        // the visible text of the whole card is the printed letters only (no gap letter, no whole word)
        const card = st.closest('.ws-card');
        const vis = [...card.querySelectorAll('*')].filter((el) => el.children.length === 0 && el.tagName !== 'IMG' && !el.closest('.ws-card-badge'))
          .map((el) => el.textContent.trim()).filter(Boolean).join('');
        if (vis !== wantLetters.map((e) => e.ch).join('')) fails.push(`${tag}: visible text "${vis}" ≠ printed letters`);
        const img = st.querySelector('img');
        if (!img || !img.complete || img.naturalWidth === 0) fails.push(`${tag}: picture broken`);
        else { const r = img.getBoundingClientRect(); if (r.width < 36 || r.height < 36) fails.push(`${tag}: picture ${Math.round(r.width)}×${Math.round(r.height)} < the G2 floor 36`); }
        // containment: the card's overflow:hidden hides clipping from the page lint
        const cr = card.getBoundingClientRect();
        [...st.querySelectorAll('img, svg')].forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.top < cr.top - 0.6 || r.bottom > cr.bottom + 0.6 || r.left < cr.left - 0.6 || r.right > cr.right + 0.6) {
            fails.push(`${tag}: <${el.tagName.toLowerCase()}> clipped by its card (${Math.round(r.bottom)} > ${Math.round(cr.bottom)})`);
          }
        });
      });
      // no text node anywhere in the body prints a card word or its gap letters beside the cells
      const body = document.querySelector('[data-lcs-body]') || root;
      const cardWords = new Set(stages.map((s) => (s.dataset.lcsWord || '').toLocaleLowerCase(lang)));
      const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const t = node.textContent.trim().toLocaleLowerCase(lang);
        if (t && cardWords.has(t)) fails.push(`text node prints a card word: "${t}"`);
      }
      return fails;
    });
  },
  /** verify() for a face page — branches on the root's data-lcs-face; everything re-derived from the stamps. */
  async _verifyFace(page, face) {
    return page.evaluate((face) => {
      const fails = [];
      const CORAL = '#F2784B';
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const root = document.querySelector('[data-lcs-type="G2-315"]');
      if (!root) return ['no G2-315 root'];
      if (root.dataset.lcsFace !== face) fails.push(`root face ${root.dataset.lcsFace} ≠ ${face}`);
      const rule = root.dataset.lcsRule, cands = (root.dataset.lcsCands || '').split(',').filter(Boolean);
      const wantModels = +root.dataset.lcsModels, cellMax = +root.dataset.lcsCellmax;
      const minL = +root.dataset.lcsMinletters, maxL = +root.dataset.lcsMaxletters;
      const boxes = root.dataset.lcsBoxes;
      let re = null;
      try { re = new RegExp(root.dataset.lcsRe, 'gu'); } catch (e) { fails.push('rule regex does not compile: ' + root.dataset.lcsRe); }
      if (!rule || !cands.length) fails.push('rule / cands stamp missing');
      const low = (w) => w.toLocaleLowerCase(lang);
      const inside = (el, box, tag) => {
        const r = el.getBoundingClientRect(), b = box.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.top < b.top - 0.6 || r.bottom > b.bottom + 0.6 || r.left < b.left - 0.6 || r.right > b.right + 0.6) fails.push(`${tag}: <${el.tagName.toLowerCase()}> outside its box (${Math.round(r.bottom)} vs ${Math.round(b.bottom)})`);
      };
      const picOk = (img, floor, tag) => {
        if (!img || !img.complete || img.naturalWidth === 0) { fails.push(`${tag}: picture broken`); return; }
        const r = img.getBoundingClientRect();
        if (r.width < floor || r.height < floor) fails.push(`${tag}: picture ${Math.round(r.width)}×${Math.round(r.height)} < ${floor}`);
      };
      const parseGaps = (s) => (s || '').split(',').filter(Boolean).map((x) => { const [from, len] = x.split(':').map(Number); return { from, len }; });
      const gOf = (L, gaps) => { const idx = []; for (const g of gaps) for (let k = 0; k < g.len; k++) idx.push(g.from + k); return low(idx.map((k) => L[k]).join('')); };
      /** The gap must sit where the rule regex fires exactly once (split rules: two one-letter boxes). */
      const gapAtRule = (word, gaps, tag) => {
        if (!re) return;
        re.lastIndex = 0;
        const lw = low(word), n = [...word].length;
        const ms = [...lw.matchAll(re)];
        if (ms.length !== 1) { fails.push(`${tag}: rule grapheme occurs ${ms.length}× in "${word}" (want 1)`); return; }
        const at = [...lw.slice(0, ms[0].index)].length, mlen = [...ms[0][0]].length;
        if (boxes === 'split') {
          if (gaps.length !== 2 || gaps[0].len !== 1 || gaps[1].len !== 1 || gaps[0].from !== at || gaps[1].from !== n - 1) fails.push(`${tag}: split rule needs two one-letter gaps at ${at} and ${n - 1}, got ${gaps.map((g) => g.from + ':' + g.len).join(',')}`);
        } else if (gaps.length !== 1 || gaps[0].from !== at || gaps[0].len !== mlen) fails.push(`${tag}: gap ${gaps.map((g) => g.from + ':' + g.len).join(',')} is not at the rule grapheme (${at}:${mlen})`);
      };
      const visibleText = (el, skip) => [...el.querySelectorAll('*')].filter((x) => x.children.length === 0 && x.tagName !== 'IMG' && !x.closest('.ws-card-badge') && !(skip && x.closest(skip)))
        .map((x) => x.textContent.trim()).filter(Boolean).join('');
      /** Letters + boxes of a 'gap' svg checked against the stamps; returns the printed letters. */
      const checkGapSvg = (ws, word, gaps, gc, cell, tag, coralForbidden) => {
        const L = [...word], n = L.length;
        const wantCells = n - gaps.reduce((s, x) => s + x.len, 0) + gc.reduce((s, c) => s + c, 0);
        if (+ws.dataset.lcsCells !== wantCells) fails.push(`${tag}: ${ws.dataset.lcsCells} cells, want ${wantCells}`);
        if (+ws.dataset.lcsCell !== cell) fails.push(`${tag}: cell stamp mismatch`);
        if (cell > cellMax || cell < 24) fails.push(`${tag}: cell ${cell} outside 24..${cellMax}`);
        const boxesEl = [...ws.querySelectorAll('[data-lcs-gapbox]')];
        if (boxesEl.length !== gaps.length) fails.push(`${tag}: ${boxesEl.length} gap boxes, want ${gaps.length}`);
        const expect = []; let x = 0;
        for (let k = 0; k < n; k++) {
          const gi = gaps.findIndex((q) => q.from === k);
          if (gi >= 0) { expect.push({ kind: 'box', i: gi, cells: gc[gi], x }); x += gc[gi]; k += gaps[gi].len - 1; }
          else { expect.push({ kind: 'letter', ch: L[k], x }); x++; }
        }
        const texts = [...ws.querySelectorAll('text')];
        const wantLetters = expect.filter((e) => e.kind === 'letter');
        const printed = texts.map((t) => t.textContent).join('');
        if (printed !== wantLetters.map((e) => e.ch).join('')) fails.push(`${tag}: printed letters "${printed}" ≠ word minus gaps "${wantLetters.map((e) => e.ch).join('')}"`);
        texts.forEach((t, k) => {
          const e = wantLetters[k]; if (!e) return;
          if (Math.abs(+t.getAttribute('x') - (e.x + 0.5) * cell) > 0.51) fails.push(`${tag}: letter ${k} at x=${t.getAttribute('x')}, want ${(e.x + 0.5) * cell}`);
          if (+t.getAttribute('font-size') !== cell - 2) fails.push(`${tag}: font ${t.getAttribute('font-size')} ≠ cell−2`);
          if (coralForbidden && (t.getAttribute('fill') || '').toUpperCase() === CORAL) fails.push(`${tag}: a coral letter on a card`);
        });
        expect.filter((e) => e.kind === 'box').forEach((e) => {
          const b = boxesEl.find((bx) => +bx.dataset.lcsGapbox === e.i);
          if (!b) { fails.push(`${tag}: gap box ${e.i} missing`); return; }
          const bw = +b.getAttribute('width'), bx = +b.getAttribute('x');
          if (Math.abs(bw - (e.cells * cell - 2)) > 0.51) fails.push(`${tag}: gap box ${e.i} width ${bw}, want ${e.cells * cell - 2} (gap width leaks the answer)`);
          if (Math.abs(bx - (e.x * cell + 1)) > 0.51) fails.push(`${tag}: gap box ${e.i} at x=${bx}, want ${e.x * cell + 1}`);
          if (+b.getAttribute('height') < cell + 8 - 0.5) fails.push(`${tag}: gap box height < cell+8`);
        });
        if (ws.querySelectorAll('rect').length !== gaps.length) fails.push(`${tag}: ${ws.querySelectorAll('rect').length} rects ≠ ${gaps.length} gap boxes`);
        return printed;
      };

      // ---- the rule box (every face)
      const box = root.querySelector('[data-lcs-rulebox]');
      if (!box) fails.push('no rule box');
      const modelWords = new Set();
      if (box) {
        const chips = [...box.querySelectorAll('[data-lcs-chip]')];
        if (!chips.length) fails.push('rule box has no chip');
        chips.forEach((c) => {
          const t = c.textContent.trim();
          if (!t || t !== c.dataset.lcsChip) fails.push(`chip text "${t}" ≠ stamp`);
          if (!cands.includes(t.replace(/_/g, ''))) fails.push(`chip "${t}" is not a candidate of the rule`);
          const r = c.getBoundingClientRect();
          if (r.width < 36 || r.height < 36) fails.push(`chip "${t}" ${Math.round(r.width)}×${Math.round(r.height)} < 36`);
        });
        if (face === 'choice' || face === 'bins') {
          const order = (root.dataset.lcsChipOrder || '').split('|');
          if (chips.map((c) => c.dataset.lcsChip).join('|') !== order.join('|')) fails.push(`rule box chips ${chips.map((c) => c.dataset.lcsChip).join('|')} ≠ the pair in chip order ${order.join('|')}`);
        }
        const pills = [...box.querySelectorAll('[data-lcs-model]')];
        if (pills.length !== wantModels) fails.push(`${pills.length} model pills, want ${wantModels}`);
        pills.forEach((p) => {
          const w = p.dataset.lcsModel;
          modelWords.add(low(w));
          const gaps = parseGaps(p.dataset.lcsModelGaps);
          const coral = [...p.querySelectorAll('[data-lcs-rule-letter]')].map((s) => +s.dataset.lcsRuleLetter);
          const wantIdx = []; for (const g of gaps) for (let k = 0; k < g.len; k++) wantIdx.push(g.from + k);
          if (coral.join(',') !== wantIdx.join(',')) fails.push(`model "${w}": rule letters at ${coral.join(',')} want ${wantIdx.join(',')}`);
          const g = low(wantIdx.map((i) => [...w][i]).join(''));
          if (!cands.includes(g)) fails.push(`model "${w}": rule letters "${g}" not in cands`);
          if (re) { re.lastIndex = 0; const m = [...low(w).matchAll(re)]; if (m.length !== 1) fails.push(`model "${w}": rule grapheme occurs ${m.length}× (want 1)`); }
          if (face === 'plural') {
            const lead = p.dataset.lcsModelLead, leadEl = p.querySelector('[data-lcs-model-leadword]'), wordEl = p.querySelector('[data-lcs-model-word]');
            if (!lead || !leadEl || leadEl.textContent !== lead) fails.push(`model "${w}": singular lead not printed`);
            if (!wordEl || wordEl.textContent !== w) fails.push(`model "${w}": plural printed "${wordEl && wordEl.textContent}"`);
            if (lead && low(lead) === low(w)) fails.push(`model "${w}": plural equals the singular`);
            modelWords.add(low(lead || ''));
          } else {
            const whole = p.querySelector('span:not([data-lcs-rule-letter])');
            if (!whole || whole.textContent !== w) fails.push(`model "${w}": printed "${whole && whole.textContent}"`);
          }
          picOk(p.querySelector('img'), 36, `model "${w}"`);
        });
        if (box.scrollWidth > box.clientWidth + 1) fails.push(`rule box content ${box.scrollWidth} wider than the box ${box.clientWidth}`);
        [...box.querySelectorAll('img, span')].forEach((el) => inside(el, box, 'rule box'));
      }

      // ---- the cards
      const stages = [...root.querySelectorAll(`.ws-card-stage[data-lcs-face="${face}"]`)];
      const seenW = new Set(), seenK = new Set();
      const cardWords = new Set();
      const common = (st, i) => {
        const tag = `card ${i + 1}`;
        const word = st.dataset.lcsWord || '';
        if (!word || !/^\p{L}+$/u.test(word)) fails.push(`${tag}: word "${word}" is not letters only`);
        const n = [...word].length;
        if (n < minL || n > maxL) fails.push(`${tag}: ${n} letters outside ${minL}..${maxL}`);
        if (seenW.has(low(word))) fails.push(`${tag}: duplicate word "${word}"`);
        seenW.add(low(word)); cardWords.add(low(word));
        if (seenK.has(st.dataset.lcsVocab)) fails.push(`${tag}: duplicate vocab key`);
        seenK.add(st.dataset.lcsVocab);
        if (modelWords.has(low(word))) fails.push(`${tag}: "${word}" is a model word`);
        if ((lang === 'de') !== /^\p{Lu}/u.test(word)) fails.push(`${tag}: case rule (${lang}) violated for "${word}"`);
        const card = st.closest('.ws-card');
        const img = st.querySelector('img');
        picOk(img, 36, tag);
        if (card) [...st.querySelectorAll('img, svg, [data-lcs-copybox], .ws-letter-chip')].forEach((el) => inside(el, card, tag));
        return { tag, word, n, card };
      };

      if (face === 'choice') {
        const pair = (root.dataset.lcsPair || '').split(','), order = (root.dataset.lcsChipOrder || '').split('|');
        const sides = (root.dataset.lcsSides || '').split(',').map(Number), G = +root.dataset.lcsGapcells, chipPx = +root.dataset.lcsChippx;
        if (stages.length !== +root.dataset.lcsCards) fails.push(`${stages.length} stages, want ${root.dataset.lcsCards}`);
        if (pair.length !== 2 || !pair.every((p) => cands.includes(p))) fails.push(`pair ${pair.join(',')} not two candidates`);
        if (order.slice().sort((a, b) => [...a].length - [...b].length || a.localeCompare(b)).join('|') !== order.join('|') || order.slice().sort().join() !== pair.slice().sort().join()) fails.push(`chip order ${order.join('|')} is not "shorter first, else alphabetical" over the pair`);
        if (G !== Math.max(...pair.map((p) => [...p].length))) fails.push(`gapCells ${G} ≠ max(pair lengths)`);
        const count = { rule: 0, contrast: 0 };
        stages.forEach((st, i) => {
          const { tag, word, card } = common(st, i);
          const gaps = parseGaps(st.dataset.lcsGap), cell = +st.dataset.lcsCell;
          if (!gaps.length) { fails.push(`${tag}: no gap stamp`); return; }
          const g = gOf([...word], gaps);
          if (!pair.includes(g)) fails.push(`${tag}: gap letters "${g}" not in the pair`);
          const side = st.dataset.lcsSide;
          if (side !== (g === pair[0] ? 'rule' : 'contrast')) fails.push(`${tag}: side "${side}" disagrees with g "${g}"`);
          count[side] = (count[side] || 0) + 1;
          gapAtRule(word, gaps, tag);
          const ws = st.querySelector('[data-lcs-prim="gap-word"]');
          if (!ws) { fails.push(`${tag}: no word cells`); return; }
          if (ws.dataset.lcsMode !== 'gap') fails.push(`${tag}: mode ${ws.dataset.lcsMode} (choice = gap)`);
          const printed = checkGapSvg(ws, word, gaps, gaps.map(() => G), cell, tag, true);
          if (ws.getBoundingClientRect().width > +root.dataset.lcsRowmax + 0.6) fails.push(`${tag}: word svg wider than the row (${root.dataset.lcsRowmax})`);
          const chips = [...st.querySelectorAll('.ws-letter-chip')];
          if (chips.map((c) => c.textContent.trim()).join('|') !== order.join('|')) fails.push(`${tag}: chips ${chips.map((c) => c.textContent.trim()).join('|')} ≠ ${order.join('|')} (one fixed order on every card)`);
          chips.forEach((c) => { const r = c.getBoundingClientRect(); if (r.width < 36 || r.height < 36 || r.width < chipPx - 0.6) fails.push(`${tag}: chip ${Math.round(r.width)}×${Math.round(r.height)} < ${chipPx}`); });
          const vis = visibleText(card, '.ws-letter-chip');
          if (vis !== printed) fails.push(`${tag}: visible text "${vis}" ≠ printed letters`);
        });
        if (count.rule !== sides[0] || count.contrast !== sides[1]) fails.push(`sides ${count.rule}/${count.contrast}, want ${sides.join('/')}`);
      }

      if (face === 'detective') {
        const nFoils = +root.dataset.lcsFoils;
        if (stages.length !== +root.dataset.lcsCards) fails.push(`${stages.length} stages, want ${root.dataset.lcsCards}`);
        let foils = 0;
        stages.forEach((st, i) => {
          const { tag, word, n, card } = common(st, i);
          const ws = st.querySelector('[data-lcs-prim="gap-word"]');
          if (!ws) { fails.push(`${tag}: no word cells`); return; }
          if (ws.dataset.lcsMode !== 'full') fails.push(`${tag}: mode ${ws.dataset.lcsMode} (detective = full)`);
          if (ws.querySelectorAll('[data-lcs-gapbox], rect').length) fails.push(`${tag}: a gap box on a detective card`);
          const cell = +st.dataset.lcsCell;
          if (+ws.dataset.lcsCells !== n || cell < 24 || cell > cellMax) fails.push(`${tag}: cells ${ws.dataset.lcsCells}/cell ${cell} (want ${n} cells, 24..${cellMax})`);
          const texts = [...ws.querySelectorAll('text')];
          if (texts.map((t) => t.textContent).join('') !== word) fails.push(`${tag}: printed "${texts.map((t) => t.textContent).join('')}" ≠ the whole word`);
          texts.forEach((t, k) => {
            if (Math.abs(+t.getAttribute('x') - (k + 0.5) * cell) > 0.51) fails.push(`${tag}: letter ${k} off its cell`);
            if ((t.getAttribute('fill') || '').toUpperCase() === CORAL) fails.push(`${tag}: a coral letter on a detective card (the rule letters are the child's find)`);
          });
          const cb = st.querySelector('[data-lcs-copybox]');
          if (!cb) fails.push(`${tag}: no copy box`);
          else { if (cb.textContent.trim()) fails.push(`${tag}: copy box not empty`); const r = cb.getBoundingClientRect(); if (r.width < 44 || r.height < 40) fails.push(`${tag}: copy box ${Math.round(r.width)}×${Math.round(r.height)} too small`); }
          if (st.dataset.lcsSide === 'foil') {
            foils++;
            if (st.dataset.lcsRuleAt) fails.push(`${tag}: a foil with a rule-at stamp`);
            re.lastIndex = 0;
            if (re.test(low(word)) || cands.some((c) => low(word).includes(c))) fails.push(`${tag}: foil "${word}" carries the rule grapheme`);
          } else {
            const gaps = parseGaps(st.dataset.lcsRuleAt);
            if (!gaps.length) { fails.push(`${tag}: no rule-at stamp`); return; }
            const g = gOf([...word], gaps);
            if (!cands.includes(g)) fails.push(`${tag}: rule letters "${g}" not in cands`);
            gapAtRule(word, gaps, tag);
          }
          const vis = visibleText(card);
          if (vis !== word) fails.push(`${tag}: visible text "${vis}" ≠ the word`);
        });
        if (foils !== nFoils) fails.push(`${foils} foils, want ${nFoils}`);
      }

      if (face === 'bins') {
        const pair = (root.dataset.lcsPair || '').split(','), order = (root.dataset.lcsChipOrder || '').split('|');
        const items = +root.dataset.lcsItems, rows = +root.dataset.lcsRows, split = (root.dataset.lcsSplit || '').split(',').map(Number), rowH = +root.dataset.lcsRowh;
        if (pair.length !== 2 || !pair.every((p) => cands.includes(p))) fails.push(`pair ${pair.join(',')} not two candidates`);
        const pills = [...root.querySelectorAll('[data-lcs-bank]')];
        if (pills.length !== items) fails.push(`${pills.length} bank pictures, want ${items}`);
        const bankRow = root.querySelector('[data-lcs-bank-row]');
        const member = { [pair[0]]: 0, [pair[1]]: 0 };
        pills.forEach((p, i) => {
          const tag = `picture ${i + 1}`;
          const word = p.dataset.lcsWord || '';
          if (!word || !/^\p{L}+$/u.test(word)) fails.push(`${tag}: word "${word}" not letters only`);
          if (seenW.has(low(word))) fails.push(`${tag}: duplicate word "${word}"`);
          seenW.add(low(word)); cardWords.add(low(word));
          if (seenK.has(p.dataset.lcsBank)) fails.push(`${tag}: duplicate vocab key`);
          seenK.add(p.dataset.lcsBank);
          if (p.textContent.trim()) fails.push(`${tag}: a bank pill prints text "${p.textContent.trim()}"`);
          picOk(p.querySelector('img'), +root.dataset.lcsBankpx, tag);
          if (bankRow) inside(p, bankRow, tag);
          if (re) {
            re.lastIndex = 0;
            const ms = [...low(word).matchAll(re)];
            if (ms.length !== 1) fails.push(`${tag}: rule grapheme occurs ${ms.length}× in "${word}"`);
            else { const g = ms[0][0]; if (!pair.includes(g)) fails.push(`${tag}: "${word}" carries "${g}", not a pair member`); else member[g]++; }
          }
        });
        if (member[pair[0]] + member[pair[1]] !== items) fails.push(`membership ${member[pair[0]]}/${member[pair[1]]} does not sum to ${items}`);
        for (const k of pair) if (member[k] < split[0] || member[k] > split[1]) fails.push(`bin "${k}" holds ${member[k]} words, outside the split ${split.join('-')}`);
        const bins = [...root.querySelectorAll('[data-lcs-bin]')];
        if (bins.length !== 2) fails.push(`${bins.length} bins, want 2`);
        if (bins.map((b) => b.dataset.lcsBin).join('|') !== order.join('|')) fails.push(`bin heads ${bins.map((b) => b.dataset.lcsBin).join('|')} ≠ the pair in chip order ${order.join('|')}`);
        let rowsPerBin = null;
        bins.forEach((b) => {
          const tag = `bin "${b.dataset.lcsBin}"`;
          const lbl = b.querySelector('[data-lcs-bin-label] [data-lcs-chip]');
          if (!lbl || lbl.textContent.trim() !== b.dataset.lcsBin) fails.push(`${tag}: label chip "${lbl && lbl.textContent.trim()}" ≠ the bin key`);
          const rws = [...b.querySelectorAll('[data-lcs-bin-row]')];
          if (+b.querySelector('[data-lcs-bin-lines]').dataset.lcsBinLines !== rws.length) fails.push(`${tag}: rows stamp ≠ ${rws.length} rows`);
          if (rowsPerBin === null) rowsPerBin = rws.length; else if (rowsPerBin !== rws.length) fails.push(`bins carry different line counts (${rowsPerBin} vs ${rws.length}) — the line count states the split`);
          if (rws.length !== rows) fails.push(`${tag}: ${rws.length} rulings, want ${rows}`);
          if (rws.length * 2 <= items) fails.push(`${tag}: ${rws.length} lines for ${items} words in 2 bins — the line count leaks the split`);
          if (rws.length < member[b.dataset.lcsBin]) fails.push(`${tag}: ${rws.length} lines < ${member[b.dataset.lcsBin]} words`);
          let prevBottom = -1;
          rws.forEach((r, k) => {
            const svg = r.querySelector('[data-lcs-prim="writing-row"]');
            if (!svg) { fails.push(`${tag}: row ${k + 1} has no writing row`); return; }
            if (svg.textContent.trim()) fails.push(`${tag}: row ${k + 1} not empty`);
            const rr = svg.getBoundingClientRect();
            if (rr.height < rowH - 0.6) fails.push(`${tag}: row ${k + 1} ${Math.round(rr.height)} < ${rowH}`);
            if (rr.top < prevBottom - 0.6) fails.push(`${tag}: row ${k + 1} overlaps the row above`);
            prevBottom = rr.bottom;
            inside(svg, b, tag);
          });
          if (lbl) { const r = lbl.getBoundingClientRect(); if (r.width < 36 || r.height < 36) fails.push(`${tag}: label chip < 36`); }
        });
        // no visible text anywhere in the root but the chips
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          const t = node.textContent.trim();
          if (t && !node.parentElement.closest('[data-lcs-chip]')) fails.push(`visible text on the bins page: "${t}"`);
        }
      }

      if (face === 'anchor') {
        if (stages.length !== +root.dataset.lcsCards) fails.push(`${stages.length} stages, want ${root.dataset.lcsCards}`);
        stages.forEach((st, i) => {
          const { tag, word, n, card } = common(st, i);
          const gaps = parseGaps(st.dataset.lcsGap), cell = +st.dataset.lcsCell;
          if (!gaps.length) { fails.push(`${tag}: no gap stamp`); return; }
          const L = [...word];
          const g = gOf(L, gaps);
          if (!cands.includes(g)) fails.push(`${tag}: rule letters "${g}" not in cands`);
          if (lang === 'de' && gaps.some((x) => x.from === 0)) fails.push(`${tag}: de gap in cell 0`);
          gapAtRule(word, gaps, tag);
          const ws = st.querySelector('[data-lcs-prim="gap-word"]');
          if (!ws) { fails.push(`${tag}: no word cells`); return; }
          if (ws.dataset.lcsMode !== 'scaffold') fails.push(`${tag}: mode ${ws.dataset.lcsMode} (anchor = scaffold)`);
          if (+ws.dataset.lcsCells !== n || +st.dataset.lcsCells !== n) fails.push(`${tag}: cells ≠ ${n}`);
          if (cell < 24 || cell > cellMax || n * cell > 296) fails.push(`${tag}: cell ${cell} outside 24..${cellMax} or row > 296`);
          const inGap = new Set(); for (const x of gaps) for (let k = 0; k < x.len; k++) inGap.add(x.from + k);
          const texts = [...ws.querySelectorAll('text')];
          const wantIdx = [...inGap].sort((a, b) => a - b);
          if (texts.map((t) => t.textContent).join('') !== wantIdx.map((k) => L[k]).join('')) fails.push(`${tag}: printed "${texts.map((t) => t.textContent).join('')}" ≠ the rule letters "${wantIdx.map((k) => L[k]).join('')}"`);
          texts.forEach((t, k) => {
            const idx = wantIdx[k]; if (idx === undefined) return;
            if (Math.abs(+t.getAttribute('x') - (idx + 0.5) * cell) > 0.51) fails.push(`${tag}: rule letter ${k} off its cell`);
            if ((t.getAttribute('fill') || '').toUpperCase() !== CORAL) fails.push(`${tag}: rule letter "${t.textContent}" not coral`);
            if (+t.getAttribute('font-size') !== cell - 2) fails.push(`${tag}: font ≠ cell−2`);
          });
          const sb = [...ws.querySelectorAll('[data-lcs-scaffoldbox]')];
          if (sb.length !== n - inGap.size) fails.push(`${tag}: ${sb.length} boxes, want ${n - inGap.size} (n − rule letters)`);
          if (ws.querySelectorAll('rect').length !== sb.length) fails.push(`${tag}: a non-scaffold rect`);
          const wantBoxes = []; for (let k = 0; k < n; k++) if (!inGap.has(k)) wantBoxes.push(k);
          wantBoxes.forEach((k) => {
            const b = sb.find((x) => +x.dataset.lcsScaffoldbox === k);
            if (!b) { fails.push(`${tag}: box ${k} missing`); return; }
            if (Math.abs(+b.getAttribute('width') - (cell - 4)) > 0.51 || Math.abs(+b.getAttribute('x') - (k * cell + 2)) > 0.51) fails.push(`${tag}: box ${k} geometry`);
            if (+b.getAttribute('height') < cell + 8 - 0.5) fails.push(`${tag}: box ${k} height`);
          });
          const vis = visibleText(card);
          if (vis !== wantIdx.map((k) => L[k]).join('')) fails.push(`${tag}: visible text "${vis}" ≠ the rule letters`);
        });
      }

      if (face === 'plural') {
        const rows = +root.dataset.lcsRows, G = +root.dataset.lcsGapcells, clonePx = +root.dataset.lcsClonepx, singCell = +root.dataset.lcsSingcellcfg;
        const plurMax = +root.dataset.lcsPlurcellmax, maxS = +root.dataset.lcsMaxsingular, maxP = +root.dataset.lcsMaxplural;
        if (stages.length !== rows) fails.push(`${stages.length} rows, want ${rows}`);
        const plurals = new Set();
        stages.forEach((st, i) => {
          const tag = `row ${i + 1}`;
          const word = st.dataset.lcsWord || '', plural = st.dataset.lcsPlural || '';
          if (!word || !/^\p{L}+$/u.test(word) || !plural || !/^\p{L}+$/u.test(plural)) fails.push(`${tag}: singular/plural not letters only`);
          const nS = [...word].length, nP = [...plural].length;
          if (nS > maxS || nP > maxP) fails.push(`${tag}: ${nS}/${nP} letters over ${maxS}/${maxP}`);
          if (seenW.has(low(word))) fails.push(`${tag}: duplicate word "${word}"`);
          seenW.add(low(word)); cardWords.add(low(plural)); plurals.add(low(plural));
          if (seenK.has(st.dataset.lcsVocab)) fails.push(`${tag}: duplicate vocab key`);
          seenK.add(st.dataset.lcsVocab);
          if (modelWords.has(low(word)) || modelWords.has(low(plural))) fails.push(`${tag}: "${word}" is a model word`);
          if ((lang === 'de') !== /^\p{Lu}/u.test(word)) fails.push(`${tag}: case rule (${lang}) violated`);
          if (low(word) === low(plural)) fails.push(`${tag}: plural equals the singular`);
          const gaps = parseGaps(st.dataset.lcsGap), cell = +st.dataset.lcsCell;
          if (!gaps.length) { fails.push(`${tag}: no gap stamp`); return; }
          const PL = [...plural];
          const g = gOf(PL, gaps);
          if (!cands.includes(g)) fails.push(`${tag}: changed grapheme "${g}" not in cands`);
          gapAtRule(plural, gaps, tag);
          // the gap span DIFFERS from the singular at that position (the plural changes the spelling there)
          const SL = [...word];
          for (const x of gaps) {
            const s = SL.slice(x.from, x.from + x.len).join(''), p = PL.slice(x.from, x.from + x.len).join('');
            if (low(s) === low(p)) fails.push(`${tag}: the gap span "${p}" is unchanged from the singular — the gap does not sit at the change`);
          }
          const card = st.closest('.ws-card');
          const img = st.querySelector('img[data-lcs-pic]');
          picOk(img, 36, tag);
          const clones = [...st.querySelectorAll('[data-lcs-clones] img')];
          if (clones.length !== 3) fails.push(`${tag}: ${clones.length} clones, want 3`);
          clones.forEach((c) => { picOk(c, Math.min(clonePx, 36) - 12, tag + ' clone'); if (img && c.getAttribute('src') !== img.getAttribute('src')) fails.push(`${tag}: a clone shows another picture`); });
          const svgs = [...st.querySelectorAll('[data-lcs-prim="gap-word"]')];
          const sing = st.querySelector('[data-lcs-singular] [data-lcs-prim="gap-word"]'), plur = st.querySelector('[data-lcs-wordrow] [data-lcs-prim="gap-word"]');
          if (svgs.length !== 2 || !sing || !plur) { fails.push(`${tag}: want a singular svg and a plural svg`); return; }
          if (sing.dataset.lcsMode !== 'full' || +sing.dataset.lcsCell !== singCell || +sing.dataset.lcsCells !== nS) fails.push(`${tag}: singular svg mode/cell/cells`);
          if (singCell < 24) fails.push(`${tag}: singular cell ${singCell} < 24`);
          const singTexts = [...sing.querySelectorAll('text')];
          if (singTexts.map((t) => t.textContent).join('') !== word) fails.push(`${tag}: singular printed "${singTexts.map((t) => t.textContent).join('')}" ≠ "${word}"`);
          if (sing.querySelectorAll('rect').length) fails.push(`${tag}: a box on the singular`);
          if (plur.dataset.lcsMode !== 'gap') fails.push(`${tag}: plural svg mode ${plur.dataset.lcsMode}`);
          if (cell > plurMax) fails.push(`${tag}: plural cell ${cell} > ${plurMax}`);
          const printed = checkGapSvg(plur, plural, gaps, gaps.map(() => G), cell, tag, true);
          // order + containment: picture, singular, clones, plural left to right inside the card
          const xs = [img, sing, clones[0], plur].map((el) => el && el.getBoundingClientRect().left);
          if (xs.some((x, k) => k && !(x > xs[k - 1]))) fails.push(`${tag}: elements not in picture → singular → clones → plural order`);
          if (card) [...st.querySelectorAll('img, svg')].forEach((el) => inside(el, card, tag));
          const vis = visibleText(card);
          if (vis !== word + printed) fails.push(`${tag}: visible text "${vis}" ≠ singular + plural-minus-gap`);
        });
        cardWords.clear(); for (const p of plurals) cardWords.add(p);   // the PLURAL is the answer: it must never be printed
      }

      if (!['choice', 'detective', 'bins', 'anchor', 'plural'].includes(face)) fails.push(`unknown face "${face}"`);
      // no text node anywhere prints an answer word
      const body = document.querySelector('[data-lcs-body]') || root;
      const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const t = low(node.textContent.trim());
        if (t && cardWords.has(t)) fails.push(`text node prints an answer word: "${t}"`);
      }
      return fails;
    }, face);
  },
};
