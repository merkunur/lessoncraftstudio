/**
 * G1-305 — Syllable Division (nt20-C; `syllable-split`, G1, RF.1.3.e).
 * "Read it, clap it, mark the parts." Six cream cards (2×3): a theme picture,
 * the whole word printed large in EQUAL LETTER CELLS, and a blank arc zone
 * (a 1 px shelf) where the child draws one bowl — or bar, per locale — per
 * syllable. No ruling, no digit, no dots at d2/d3; the split is NEVER printed.
 *   d1 — 4 cards, two-syllable words ≤ 8 letters, count-hint dots (evenly
 *        spaced, so they never encode the boundary)
 *   d2 — 6 cards, 2–3 syllables, ≤ 11 letters, ≥ 2 three-syllable cards
 *   d3 — 8 cards, 2–4 syllables, ≤ 12 letters, ≥ 3 long cards
 *
 * DATA DOOR. Words come from the phonics pipeline's gated output ONLY
 * (approved-words-<loc>.json via lib/b3-common.js approvedByKey), joined to
 * `entriesFor(theme, loc)` on vocabKey with the vocab word === the approved
 * word; the locale bank data/b3/syllable-split.js supplies the marking
 * convention, the display case and the refusal rules. `eligible(loc, theme,
 * opts)` is a PURE function exported for the gate (qa/verify-b3-syllable-
 * split.js re-derives every rendered word through it). The base is a
 * count-only face and draws from the FULL approved pool; a face that PRINTS a
 * boundary must pass `pool:'tex'` (README texPool ruling).
 *
 * Why cells: build() has no font metrics. Equal cells make every boundary an
 * exact x (cumulative letters × cell), so printed arcs (Vowel King), the
 * cloze blank and verify() never depend on text measurement. The gate
 * measures Baloo 2's widest glyph advance against cell − 2 (critic OPEN 1).
 *
 * Refusals: a theme whose pool is short THROWS (sampleEntries) — never a
 * filler, never a theme substitution. `minLongCards` takes the long words
 * the pool HAS up to the target and stamps the number (`data-lcs-long`);
 * measured 2026-09-14: nl/da `animals` hold 0 three-syllable words at d2,
 * fr/no 1 — refusing those cells would contradict the design's 11/11 ship
 * table, so the shortfall is recorded on the page, not hidden.
 *
 * FACES (Phase 2, design §3 — five CODE faces, one additive knob each on the
 * resolved difficulty, read by `faceOf`; the base's own d1-d3 carry none and
 * render byte-identically — tools/b3-baseline.js is the proof):
 *   mode:'rewrite'  Write the Word in Syllables — 6 rows: picture · the word
 *                   printed as a proportional MODEL · a hyphen lane (no ticks);
 *                   the child copies the word with a hyphen at every break.
 *                   Count-only face → FULL pool, maxLetters min(12, 17−count).
 *   mode:'cloze'    Missing Syllable — 8 cards 2×4: one syllable replaced by
 *                   ONE dashed coral box exactly 4 cells wide (no length leak);
 *                   the child says the picture and writes the missing syllable.
 *                   Prints a boundary → texPool; blank syllable 2-4 letters.
 *   mode:'scramble' Syllable Scramble — 6 rows: the word's own syllables as
 *                   shuffled tiles (order ≠ identity), a writing row; ≥ min3
 *                   rows with three tiles. Prints boundaries → texPool.
 *   mode:'sort'     Two or Three Syllables? — an 8-word bank (collation order,
 *                   never grouped by count) over two ruled columns headed 2 / 3
 *                   (the panel's sortLabels); 4 words of each count. FULL pool.
 *   kings:true      Vowel King — base geometry with the arcs PRINTED and a
 *                   worked-example banner; the child dots the vowel of every
 *                   syllable inside its bowl. texPool + every syllable holds
 *                   exactly ONE maximal vowel run (vowels[loc] + vowelExtra).
 *                   REFUSED where the locale bank says kings:false (en, fr).
 * Every face keeps the base's data door (eligible) and refusal rules; the
 * gate's seam `_buildWith(bankBlock, …)` lets a face render against an
 * explicit locale block (a synthetic one for locales whose panel has not
 * authored theirs yet) without touching data/.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { syllableWord, syllableArcsForWord, hyphenLane, syllableModel, syllableSortBank, syllableSortColumn, kingsExampleBanner } = require('../../templates/components-b3.js');
const { wordTiles } = require('../../templates/components-b2.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { entriesFor, displayWord, distinctByWord, sampleEntries, fileUri } = require('../../lib/b2-common.js');
const { approvedByKey, texAgreed, daStrict, bank } = require('../../lib/b3-common.js');
const { compare } = require('../../data/b2/collation.js');
const { esc } = require('../../primitives/_svg.js');
const VOWELS = require('../../data/literacy/letter-knowledge.json').vowels;

const KEY = 'syllable-split';
const ID = 'G1-305';
const CELL_ROW_MAX = 296;   // cells never exceed this (3 px each side inside the stage)
const MUTE_E = /[^aeiouyéèêë]e$/u;   // fr final mute-e on the last syllable (design §2 filter step)
// the row faces (rewrite / scramble): cardGrid 1×6 of .ws-card — inner 647 (675 − 24 − 4), the
// numbered badge takes 20 px of left padding (K-318 / G1-309 precedent), picture → apparatus gap 12
const ROW_INNER = 647, ROW_BADGE = 20, ROW_GAP = 12;
const REWRITE_MODEL_W = 196, REWRITE_LANE_W = 339;   // 20 + 64 + 12 + 196 + 12 + 339 = 643 ≤ 647
const SCRAMBLE_TILES_W = 280, SCRAMBLE_LANE_W = 255; // 20 + 64 + 12 + 280 + 12 + 255 = 643 ≤ 647
const SORT_COL_W = 330, SORT_GAP = 15;               // 330 + 15 + 330 = 675 = the page inner
const KINGS_EXAMPLE_CELL = 24, KINGS_EXAMPLE_ARC = 22;

/**
 * The eligible entries of (theme, loc) for a resolved config — PURE, no rng.
 * Order: entriesFor → displayWord(casing) → letters only → approved by
 * vocabKey with word === display word (case-insensitive) → count/letters in
 * range → da strict pool → fr mute-e refusal → panel exclude → texPool when
 * the face prints a boundary → d1 dot/boundary coincidence → face rules
 * (`blankLen:[min,max]` = at least one syllable of that length, the cloze
 * face; `kings:{vowels, extra}` = every syllable holds exactly one maximal
 * vowel run, the Vowel King face) → distinct by word.
 * @returns {Array<{noun, vocabKey, word, split, count, approved}>}
 */
function eligible(loc, theme, opts) {
  const l = String(loc || 'en').slice(0, 2);
  const o = Object.assign({ minCount: 2, maxCount: 3, maxLetters: 11, pool: 'full', dots: false }, opts || {});
  const b = o.bank || bank(KEY, l);
  const ap = approvedByKey(l);
  const excl = new Set(b.exclude || []);
  let pool = entriesFor(theme, l)
    .map((e) => ({ ...e, word: displayWord(e.singular, l, b.casing) }))
    .filter((e) => /^\p{L}+$/u.test(e.word))
    .map((e) => {
      const a = ap.get(e.vocabKey);
      if (!a || !Array.isArray(a.split) || a.word.toLocaleLowerCase(l) !== e.word.toLocaleLowerCase(l)) return null;
      return { noun: e.noun, vocabKey: e.vocabKey, px: e.px, word: e.word, split: a.split.map((s) => s.toLocaleLowerCase(l)), count: a.count, approved: a };
    })
    .filter(Boolean)
    .filter((e) => e.count >= o.minCount && e.count <= o.maxCount && e.split.length === e.count)
    .filter((e) => [...e.word].length <= o.maxLetters && e.split.join('') === e.word.toLocaleLowerCase(l))
    .filter((e) => !excl.has(e.vocabKey));
  if (b.strictPool === 'policy_managed_absent' || l === 'da') pool = pool.filter((e) => daStrict(e.approved));
  if (b.refuse && b.refuse.finalMuteE) pool = pool.filter((e) => !MUTE_E.test(e.split[e.split.length - 1]));
  if (o.pool === 'tex') pool = pool.filter((e) => texAgreed(e.approved));
  if (o.dots) pool = pool.filter((e) => !dotOnBoundary(e));
  if (o.blankLen) pool = pool.filter((e) => e.split.some((syl) => [...syl].length >= o.blankLen[0] && [...syl].length <= o.blankLen[1]));
  if (o.kings) pool = pool.filter((e) => e.split.every((syl) => kingRuns(syl, o.kings.vowels, o.kings.extra).length === 1));
  return distinctByWord(pool, (e) => e.word);
}

/**
 * The maximal vowel runs of one syllable (lowercase) — [{at, len}] in LETTERS
 * from the syllable start. `extra` digraphs (nl 'ij') are one vowel unit of
 * two letters; every other letter is a vowel iff it is in `vowels`. A syllable
 * is king-eligible iff exactly one run comes back (design §3 Face 6).
 */
function kingRuns(syl, vowels, extra) {
  const V = new Set([...String(vowels || '')]);
  const X = (extra || []).map((x) => String(x).toLocaleLowerCase());
  const ch = [...String(syl)];
  const runs = [];
  let i = 0, open = false;
  while (i < ch.length) {
    let len = 1, vowel = V.has(ch[i]);
    for (const x of X) { const xl = [...x].length; if (ch.slice(i, i + xl).join('') === x) { len = xl; vowel = true; break; } }
    if (vowel) { if (open) runs[runs.length - 1].len += len; else runs.push({ at: i, len }); open = true; } else open = false;
    i += len;
  }
  return runs;
}

/** Which face a resolved difficulty declares (none = the base). */
function faceOf(d) {
  if (d.kings) return 'kings';
  if (['rewrite', 'cloze', 'scramble', 'sort'].includes(d.mode)) return d.mode;
  return 'base';
}

/** The face pool options for a resolved config + bank block + locale (shared by build and the gate). */
function faceOpts(face, d, b, loc) {
  const o = { minCount: d.minCount, maxCount: d.maxCount, maxLetters: d.maxLetters, pool: d.pool || 'full', dots: !!d.dots, bank: b };
  if (face === 'cloze') o.blankLen = d.blankLen || [2, 4];
  if (face === 'kings') o.kings = { vowels: VOWELS[loc] || '', extra: b.vowelExtra || [] };
  return o;
}

/** d1 count-hint dots sit at w·(i+0.5)/count; a boundary at k·cell may coincide (n=4 k=1, n=8 k=2 …). */
function dotOnBoundary(e) {
  const n = [...e.word].length;
  let at = 0;
  const bounds = e.split.slice(0, -1).map((s) => (at += [...s].length));
  for (let i = 0; i < e.count; i++) {
    const x = n * (i + 0.5) / e.count;
    if (bounds.some((k) => Math.abs(k - x) < 0.5)) return true;
  }
  return false;
}

function cellFor(n, cellMax) { return Math.min(cellMax, Math.floor(CELL_ROW_MAX / n)); }

module.exports = {
  id: ID,
  slug: 'syllable-division',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, pic: 120, cellMax: 36, arcH: 36, dots: true, minCount: 2, maxCount: 2, minLongCards: 0, maxLetters: 8, minPool: 6 },
    2: { cards: 6, cols: 2, rows: 3, pic: 88, cellMax: 32, arcH: 32, dots: false, minCount: 2, maxCount: 3, minLongCards: 2, maxLetters: 11, minPool: 8 },
    3: { cards: 8, cols: 2, rows: 4, pic: 56, cellMax: 28, arcH: 28, dots: false, minCount: 2, maxCount: 4, minLongCards: 3, maxLetters: 12, minPool: 8 },
  },
  i18n: {
    en: {
      title: 'Syllable Division',
      instruction: 'Say each picture word and clap its parts. Draw one scoop under every syllable you hear.',
    },
  },
  eligible,
  cellFor,
  kingRuns,
  faceOf,
  faceOpts,

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(bank(KEY, loc), { theme, difficulty, locale }, ctx);   // a missing locale block throws (refusal)
  },

  /** The gate's seam: build against an explicit locale block (a synthetic block never touches data/). */
  _buildWith(b, { theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const face = faceOf(d);
    if (face !== 'base') return this._buildFace(face, b, d, { theme, locale: loc }, ctx);
    const rng = ctx.rng;
    const pool = eligible(loc, theme, { minCount: d.minCount, maxCount: d.maxCount, maxLetters: d.maxLetters, pool: 'full', dots: d.dots, bank: b });
    // long words first (count ≥ 3), up to the target the pool can honour, then the rest
    const longs = pool.filter((e) => e.count >= 3);
    const wantLong = Math.min(d.minLongCards || 0, longs.length);
    // REFUSAL floor on the FACE pool (design §1: minNouns is checked on the face
    // pool, never the vocab count): the shipping shape needs themeAxis.minNouns
    // (8) so a wave never publishes the same six words under every seed; the
    // 4-card shape needs 6. A short pool THROWS — never a filler.
    const floor = Math.max(d.cards, d.minPool || 0);
    if (pool.length < floor) throw new Error(`${ID}: theme ${theme}/${loc} has ${pool.length} eligible words < ${floor} (d${difficulty}) — REFUSED`);
    const pickedLong = wantLong ? sampleEntries(rng, longs, wantLong, ID) : [];
    const rest = pool.filter((e) => !pickedLong.includes(e));
    const pickedRest = sampleEntries(rng, rest, d.cards - wantLong, ID);
    const picks = rng.shuffle(pickedLong.concat(pickedRest));
    const cards = picks.map((e) => {
      const n = [...e.word].length;
      const cell = cellFor(n, d.cellMax);
      const fontPx = cell - 2;
      const wordSvg = syllableWord({ word: e.word, cell, fontPx });
      const arcs = syllableArcsForWord({ split: e.split, cell, h: d.arcH, mode: 'blank', dots: d.dots ? e.count : 0 });
      return `<div class="ws-card-stage" style="padding:6px 0;flex-direction:column;justify-content:center;gap:0" data-ws-content ` +
        `data-lcs-word="${esc(e.word)}" data-lcs-vocab="${esc(e.vocabKey)}" data-lcs-split="${esc(e.split.join('|'))}" ` +
        `data-lcs-count="${e.count}" data-lcs-cell="${cell}" data-lcs-face="base" data-lcs-mark="${esc(b.mark)}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${esc(e.vocabKey)}" style="width:${d.pic}px;height:${d.pic}px;flex:0 1 auto;min-height:${Math.max(44, Math.round(d.pic * 0.75))}px">` +
        `<div style="margin-top:8px;line-height:0" data-lcs-wordrow>${wordSvg}</div>` +
        `<div style="margin-top:6px;line-height:0" data-lcs-arczone>${arcs}</div></div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;min-height:0" data-lcs-type="${ID}" data-lcs-face="base" ` +
        `data-lcs-cards="${d.cards}" data-lcs-mincount="${d.minCount}" data-lcs-maxcount="${d.maxCount}" data-lcs-maxletters="${d.maxLetters}" ` +
        `data-lcs-long="${wantLong}" data-lcs-longwant="${d.minLongCards || 0}" data-lcs-dotsmode="${d.dots ? 1 : 0}" data-lcs-cellmax="${d.cellMax}" data-lcs-arch="${d.arcH}">` +
        cardGrid({ cards, cols: d.cols, rows: d.rows }) + `</div>`,
      meta: { words: picks.map((e) => e.word), splits: picks.map((e) => e.split.join('-')), longCards: wantLong, longWanted: d.minLongCards || 0, pool: pool.length, longPool: longs.length },
    };
  },


  /**
   * The five faces (design §3). Never reached by the base's own difficulties;
   * every guard keys on the resolved config, never on a level index.
   */
  _buildFace(face, b, d, { theme, locale }, ctx) {
    const rng = ctx.rng;
    const loc = locale;
    const opts = faceOpts(face, d, b, loc);
    let pool = eligible(loc, theme, opts);
    const floor = Math.max(d.cards || d.bank || 0, d.minPool || 0);
    const refuse = (why) => { throw new Error(`${ID}/${face}: theme ${theme}/${loc} ${why} — REFUSED`); };
    const img = (e, px) => `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${esc(e.vocabKey)}" style="width:${px}px;height:${px}px;flex:none">`;
    const stamps = (e) => `data-lcs-word="${esc(e.word)}" data-lcs-vocab="${esc(e.vocabKey)}" data-lcs-split="${esc(e.split.join('|'))}" data-lcs-count="${e.count}" data-lcs-face="${face}"`;
    const rowStage = (e, extra, body) => `<div class="ws-card-stage" style="justify-content:flex-start;align-items:center;gap:${ROW_GAP}px;padding:0 0 0 ${ROW_BADGE}px" data-ws-content ${stamps(e)}${extra || ''}>${body}</div>`;
    const rootOpen = (extra) => `<div style="flex:1;display:flex;flex-direction:column;min-height:0" data-lcs-type="${ID}" data-lcs-face="${face}" ` +
      `data-lcs-cards="${d.cards || 0}" data-lcs-mincount="${d.minCount}" data-lcs-maxcount="${d.maxCount}" data-lcs-maxletters="${d.maxLetters}" data-lcs-pool="${opts.pool}"${extra || ''}>`;
    /** long words (count ≥ 3) first up to the target the pool can honour, then the rest — the base's own rule */
    const pickWithLong = (want) => {
      const longs = pool.filter((e) => e.count >= 3);
      const n = Math.min(want || 0, longs.length);
      const pl = n ? sampleEntries(rng, longs, n, ID) : [];
      const rest = pool.filter((e) => !pl.includes(e));
      return { picks: rng.shuffle(pl.concat(sampleEntries(rng, rest, d.cards - n, ID))), long: n, longPool: longs.length };
    };

    if (face === 'rewrite') {
      // lane capacity ≈ 16 glyphs at glyphH 28 (design OPEN 2): letters + (count − 1) hyphens ≤ 16 → maxLetters min(12, 17 − count)
      pool = pool.filter((e) => [...e.word].length <= Math.min(d.maxLetters, 17 - e.count));
      if (pool.length < floor) refuse(`has ${pool.length} eligible words < ${floor}`);
      const { picks, long, longPool } = pickWithLong(d.minLongCards);
      const cards = picks.map((e) => rowStage(e, ` data-lcs-hyphen="${esc(b.hyphen || '-')}"`,
        img(e, d.pic) + syllableModel({ word: e.word, fontPx: d.modelPx || 26, w: REWRITE_MODEL_W }) + hyphenLane({ w: REWRITE_LANE_W, h: d.laneH || 64, glyphH: d.glyphH })));
      return {
        bodyHtml: rootOpen(` data-lcs-long="${long}" data-lcs-longwant="${d.minLongCards || 0}" data-lcs-modelw="${REWRITE_MODEL_W}" data-lcs-lanew="${REWRITE_LANE_W}"`) + cardGrid({ cards, cols: d.cols, rows: d.rows }) + '</div>',
        meta: { face, words: picks.map((e) => e.word), splits: picks.map((e) => e.split.join(b.hyphen || '-')), longCards: long, pool: pool.length, longPool },
      };
    }

    if (face === 'cloze') {
      if (pool.length < floor) refuse(`has ${pool.length} eligible words (a 2-4 letter syllable, texPool) < ${floor}`);
      const picks = rng.shuffle(sampleEntries(rng, pool, d.cards, ID));
      const [lo, hi] = opts.blankLen;
      // the missing syllable is distinct across the page: the de/pt/sv/no draws printed the same
      // answer twice (no: tann-børste + tann-krem — the second copies the first; found by the
      // no Q1 landing panel, 2026-09-20). A card whose every eligible syllable is already an
      // answer on the page REFUSES the draw rather than repeating one.
      // A card whose every eligible syllable is already an answer is SWAPPED for the first
      // remaining pool word (alphabetical, no rng consumed — pages without a clash are
      // byte-identical to before) that has a fresh one; only an exhausted pool refuses.
      const usedSyl = new Set();
      const eligibleIdx = (e) => e.split.map((syl, i) => ([...syl].length >= lo && [...syl].length <= hi ? i : -1)).filter((i) => i >= 0);
      const freshIdx = (e) => eligibleIdx(e).filter((i) => !usedSyl.has(e.split[i].toLocaleLowerCase(loc)));
      const remaining = pool.filter((e) => !picks.includes(e)).sort((a, b) => a.word.localeCompare(b.word, loc));
      const chosen = [];
      const cards = picks.map((e0) => {
        let e = e0;
        if (!freshIdx(e).length) {
          const alt = remaining.find((r) => freshIdx(r).length && !picks.some((p) => p.vocabKey === r.vocabKey));
          if (!alt) refuse(`cloze: every eligible syllable of "${e.word}" is already the answer on another card and the pool has no substitute`);
          remaining.splice(remaining.indexOf(alt), 1);
          e = alt;
        }
        chosen.push(e);
        const n = [...e.word].length;
        const fresh = freshIdx(e);
        const bi = rng.pick(fresh);   // index 0 allowed (de: the child writes the capital)
        usedSyl.add(e.split[bi].toLocaleLowerCase(loc));
        const from = e.split.slice(0, bi).reduce((a, syl) => a + [...syl].length, 0);
        const len = [...e.split[bi]].length;
        const cell = cellFor(n - len + 4, d.cellMax);
        const wordSvg = syllableWord({ word: e.word, cell, fontPx: cell - 2, blank: { from, len } });
        return `<div class="ws-card-stage" style="padding:6px 0;flex-direction:column;justify-content:center;gap:0" data-ws-content ${stamps(e)} ` +
          `data-lcs-blank="${bi}" data-lcs-blankfrom="${from}" data-lcs-blanklen="${len}" data-lcs-cell="${cell}">` +
          img(e, d.pic).replace('flex:none', `flex:0 1 auto;min-height:${Math.max(44, Math.round(d.pic * 0.75))}px`) +
          `<div style="margin-top:6px;line-height:0" data-lcs-wordrow>${wordSvg}</div></div>`;
      });
      return {
        bodyHtml: rootOpen(` data-lcs-cellmax="${d.cellMax}" data-lcs-blanklo="${lo}" data-lcs-blankhi="${hi}"`) + cardGrid({ cards, cols: d.cols, rows: d.rows }) + '</div>',
        meta: { face, words: chosen.map((e) => e.word), splits: chosen.map((e) => e.split.join('-')), pool: pool.length },
      };
    }

    if (face === 'scramble') {
      const longs = pool.filter((e) => e.count >= 3);
      if (pool.length < floor) refuse(`has ${pool.length} eligible words (texPool) < ${floor}`);
      if (longs.length < (d.min3 || 0)) refuse(`has ${longs.length} three-syllable words < min3 ${d.min3}`);
      const { picks, long, longPool } = pickWithLong(d.min3);
      const cards = picks.map((e) => {
        // tiles = the syllables; tile 1 takes the display case (de keeps its capital), the rest are the stored split
        const toks = e.split.map((syl, i) => (i === 0 ? [...e.word].slice(0, [...syl].length).join('') : syl));
        // order ≠ identity AND the first tile is never the true first syllable (G1-249's rule: otherwise a
        // three-tile row is solved by swapping the last two); for count 2 that is exactly [1,0]
        let order, guard = 0;
        do { order = rng.shuffle(toks.map((_, k) => k)); guard++; } while (order[0] === 0 && guard < 60);
        if (order[0] === 0) order = order.slice(1).concat(order[0]);
        return rowStage(e, ` data-lcs-order="${order.join(',')}"`,
          img(e, d.pic) +
          `<div style="width:${SCRAMBLE_TILES_W}px;flex:none;min-width:0" data-lcs-tiles="${toks.length}">${wordTiles({ tokens: toks, order, fontPx: d.tilePx || 22, tileH: d.tileH })}</div>` +
          `<div style="width:${SCRAMBLE_LANE_W}px;flex:none;line-height:0" data-lcs-writerow>${writingRow({ w: SCRAMBLE_LANE_W, h: d.laneH || 64, glyphH: d.glyphH }).svg}</div>`);
      });
      return {
        bodyHtml: rootOpen(` data-lcs-long="${long}" data-lcs-min3="${d.min3 || 0}" data-lcs-tilesw="${SCRAMBLE_TILES_W}" data-lcs-lanew="${SCRAMBLE_LANE_W}"`) + cardGrid({ cards, cols: d.cols, rows: d.rows }) + '</div>',
        meta: { face, words: picks.map((e) => e.word), splits: picks.map((e) => e.split.join('-')), longCards: long, pool: pool.length, longPool },
      };
    }

    if (face === 'sort') {
      const per = d.perCol;
      const c2 = pool.filter((e) => e.count === 2), c3 = pool.filter((e) => e.count === 3);
      if (c2.length < per || c3.length < per) refuse(`has ${c2.length} two-syllable / ${c3.length} three-syllable words, needs ${per} of each`);
      // the bank is in the locale's collation order — and NEVER grouped by count (design §3): a
      // sample whose alphabetical order happens to put every 2-syllable word before (or after) every
      // 3-syllable word (1 draw in 35 at 4:4) is re-drawn, so the column can never be read off the
      // bank position; a pool that cannot avoid it (exactly 4:4, grouped) REFUSES
      let sorted = null;
      for (let t = 0; t < 30 && !sorted; t++) {
        const picks = sampleEntries(rng, c2, per, ID).concat(sampleEntries(rng, c3, per, ID));
        const cand = picks.slice().sort((x, y) => compare(x.word, y.word, loc));
        const cs = cand.map((e) => e.count);
        const mono = cs.every((v, i) => i === 0 || v >= cs[i - 1]) || cs.every((v, i) => i === 0 || v <= cs[i - 1]);
        if (!mono) sorted = cand;
      }
      if (!sorted) refuse('collates every sample grouped by syllable count (the column would be readable from the bank order)');
      const bankHtml = syllableSortBank({ words: sorted.map((e, i) => ({ word: e.word, vocabKey: e.vocabKey, src: fileUri(theme, e.noun), count: e.count, rank: i })), wordPx: d.wordPx || 18 });
      const labels = b.sortLabels || {};
      const cols = (d.cols || [2, 3]).map((n) => syllableSortColumn({ n, text: String(labels[n] != null ? labels[n] : n), rows: per, w: SORT_COL_W - 40, h: d.laneH || 64, glyphH: d.glyphH }));
      return {
        bodyHtml: rootOpen(` data-lcs-bank="${sorted.length}" data-lcs-percol="${per}" data-lcs-cols="${(d.cols || [2, 3]).join('|')}" data-lcs-labels="${esc((d.cols || [2, 3]).map((n) => String(labels[n] != null ? labels[n] : n)).join('|'))}"`) +
          // the columns stretch to the body's remaining height and the rulings spread evenly inside them
          // (measured: an 8-chip icon bank wraps to two lines ≈ 200 px, so a fixed 354 px column left ~200 px
          // of the page empty at the shipping chrome) — the ruling geometry (h 64, glyphH 28) never changes
          bankHtml + `<div style="display:flex;gap:${SORT_GAP}px;align-items:stretch;justify-content:center;flex:1 1 auto;min-height:0" data-lcs-sortcols>` +
          cols.map((c) => c.replace('class="ws-lane" style="', `class="ws-lane" style="width:${SORT_COL_W}px;flex:none;`)).join('') + '</div></div>',
        meta: { face, words: sorted.map((e) => e.word), counts: sorted.map((e) => e.count), pool: pool.length, c2: c2.length, c3: c3.length },
      };
    }

    if (face === 'kings') {
      if (!b.kings) refuse('bank says kings:false (silent-e / mute-e locale: the Vowel King face is refused by design)');
      if (pool.length < floor) refuse(`has ${pool.length} king-eligible words (texPool, one vowel run per syllable) < ${floor}`);
      const kingsOf = (e) => { let at = 0; return e.split.map((syl) => { const r = kingRuns(syl, opts.kings.vowels, opts.kings.extra)[0]; const k = { at: at + r.at, len: r.len }; at += [...syl].length; return k; }); };
      // the worked example: the bank's example word, approved, count 2-3, texPool, king-eligible — else REFUSE
      const ap = approvedByKey(loc);
      const ex = b.example && ap.get(b.example.vocabKey);
      if (!ex || !Array.isArray(ex.split) || ex.count < 2 || ex.count > 3 || !texAgreed(ex)) refuse(`example ${b.example && b.example.vocabKey} is not an approved 2-3 syllable texPool word`);
      const exEntry = { word: b.casing === 'keep' ? ex.word : ex.word.toLocaleLowerCase(loc), split: ex.split.map((x) => x.toLocaleLowerCase(loc)), count: ex.count };
      if (!exEntry.split.every((syl) => kingRuns(syl, opts.kings.vowels, opts.kings.extra).length === 1)) refuse(`example ${ex.word} is not king-eligible`);
      const banner = kingsExampleBanner({ word: exEntry.word, split: exEntry.split, kings: kingsOf(exEntry), cell: KINGS_EXAMPLE_CELL, arcH: KINGS_EXAMPLE_ARC });
      const picks = rng.shuffle(sampleEntries(rng, pool.filter((e) => e.vocabKey !== ex.key), d.cards, ID));
      const cards = picks.map((e) => {
        const n = [...e.word].length;
        const cell = cellFor(n, d.cellMax);
        const wordSvg = syllableWord({ word: e.word, cell, fontPx: cell - 2 });
        const arcs = syllableArcsForWord({ split: e.split, cell, h: d.arcH, mode: 'printed' });
        return `<div class="ws-card-stage" style="padding:6px 0;flex-direction:column;justify-content:center;gap:0" data-ws-content ${stamps(e)} ` +
          `data-lcs-cell="${cell}" data-lcs-kings="${kingsOf(e).map((k) => k.at + ':' + k.len).join('|')}" data-lcs-mark="${esc(b.mark)}">` +
          img(e, d.pic).replace('flex:none', `flex:0 1 auto;min-height:${Math.max(44, Math.round(d.pic * 0.75))}px`) +
          `<div style="margin-top:8px;line-height:0" data-lcs-wordrow>${wordSvg}</div>` +
          `<div style="margin-top:6px;line-height:0" data-lcs-arczone>${arcs}</div></div>`;
      });
      return {
        bodyHtml: rootOpen(` data-lcs-cellmax="${d.cellMax}" data-lcs-arch="${d.arcH}" data-lcs-vowels="${esc(opts.kings.vowels)}" data-lcs-vowelextra="${esc(opts.kings.extra.join('|'))}" data-lcs-example="${esc(exEntry.word)}"`) +
          banner + cardGrid({ cards, cols: d.cols, rows: d.rows }) + '</div>',
        meta: { face, words: picks.map((e) => e.word), splits: picks.map((e) => e.split.join('-')), example: exEntry.word, pool: pool.length },
      };
    }
    throw new Error(`${ID}: unknown face ${face}`);
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const root = document.querySelector('[data-lcs-type="G1-305"]');
      if (!root) return ['no G1-305 root'];
      if ((root.dataset.lcsFace || 'base') !== 'base') return verifyFace(root, lang);
      const want = +root.dataset.lcsCards, minC = +root.dataset.lcsMincount, maxC = +root.dataset.lcsMaxcount;
      const maxL = +root.dataset.lcsMaxletters, dotsMode = root.dataset.lcsDotsmode === '1', cellMax = +root.dataset.lcsCellmax;
      const stages = [...root.querySelectorAll('.ws-card-stage[data-lcs-face="base"]')];
      const cardsEl = [...root.querySelectorAll('.ws-card')];
      if (stages.length !== want) fails.push(`${stages.length} stages, want ${want}`);
      if (cardsEl.length !== want) fails.push(`${cardsEl.length} cards, want ${want}`);
      const seen = new Set();
      let longSeen = 0;
      stages.forEach((st, i) => {
        const tag = `card ${i + 1}`;
        const word = st.dataset.lcsWord || '';
        const split = (st.dataset.lcsSplit || '').split('|');
        const count = +st.dataset.lcsCount, cell = +st.dataset.lcsCell;
        const n = [...word].length;
        if (!word) fails.push(`${tag}: no word`);
        if (seen.has(word)) fails.push(`${tag}: duplicate word "${word}"`);
        seen.add(word);
        if (split.join('') !== word.toLocaleLowerCase(lang)) fails.push(`${tag}: split "${split.join('|')}" ≠ word "${word}"`);
        if (split.length !== count || count < 2) fails.push(`${tag}: count ${count} ≠ ${split.length} syllables`);
        if (count < minC || count > maxC) fails.push(`${tag}: count ${count} outside ${minC}-${maxC}`);
        if (n > maxL) fails.push(`${tag}: ${n} letters > ${maxL}`);
        if (count >= 3) longSeen++;
        if (!/^\p{L}+$/u.test(word)) fails.push(`${tag}: word is not letters only`);
        // de keeps the capital; every other locale prints lowercase
        const upper = /^\p{Lu}/u.test(word);
        if ((lang === 'de') !== upper) fails.push(`${tag}: case rule (${lang}) violated for "${word}"`);
        // the word svg: n cells of `cell`, one <text> per letter, letters === word
        const ws = st.querySelector('[data-lcs-prim="syllable-word"]');
        if (!ws) { fails.push(`${tag}: no word cells`); return; }
        if (+ws.dataset.lcsCells !== n) fails.push(`${tag}: ${ws.dataset.lcsCells} cells ≠ ${n} letters`);
        if (+ws.dataset.lcsCell !== cell) fails.push(`${tag}: cell stamp mismatch`);
        if (cell > cellMax || cell < 20) fails.push(`${tag}: cell ${cell} outside 20..${cellMax}`);
        if (n * cell > 296) fails.push(`${tag}: cells ${n}×${cell} exceed 296`);
        const texts = [...ws.querySelectorAll('text')];
        if (texts.map((t) => t.textContent).join('') !== word) fails.push(`${tag}: cell letters "${texts.map((t) => t.textContent).join('')}" ≠ "${word}"`);
        texts.forEach((t, k) => {
          const x = +t.getAttribute('x');
          if (Math.abs(x - (k + 0.5) * cell) > 0.51) fails.push(`${tag}: letter ${k} at x=${x}, want ${(k + 0.5) * cell}`);
          if (+t.getAttribute('font-size') !== cell - 2) fails.push(`${tag}: font ${t.getAttribute('font-size')} ≠ cell−2`);
        });
        if (ws.querySelector('rect, line, path')) fails.push(`${tag}: borders/marks inside the word cells`);
        if (ws.getBoundingClientRect().width > 302.6) fails.push(`${tag}: word svg wider than the card`);
        // the arc zone: blank mode, no <path>, no attribute leaking the count
        const az = st.querySelector('[data-lcs-arcmode]');
        if (!az) { fails.push(`${tag}: no arc zone`); return; }
        if (az.dataset.lcsArcmode !== 'blank') fails.push(`${tag}: arcmode ${az.dataset.lcsArcmode} (base must be blank)`);
        if (az.querySelector('path')) fails.push(`${tag}: a printed arc in the base`);
        if (+az.dataset.lcsArcs !== 0) fails.push(`${tag}: data-lcs-arcs=${az.dataset.lcsArcs} leaks the count`);
        if (!az.querySelector('[data-lcs-shelf]')) fails.push(`${tag}: no shelf line`);
        if (Math.abs(az.getBoundingClientRect().width - n * cell) > 0.6) fails.push(`${tag}: arc zone width ≠ word width`);
        const dots = [...az.querySelectorAll('circle')];
        if (dotsMode) {
          if (dots.length !== count) fails.push(`${tag}: ${dots.length} dots ≠ count ${count}`);
          const w = n * cell;
          let at = 0;
          const bounds = split.slice(0, -1).map((s) => (at += [...s].length) * cell);
          dots.forEach((c, k) => {
            const cx = +c.getAttribute('cx');
            if (Math.abs(cx - w * (k + 0.5) / count) > 1) fails.push(`${tag}: dot ${k + 1} at ${cx}, want ${w * (k + 0.5) / count}`);
            if (bounds.some((bx) => Math.abs(bx - cx) < 1)) fails.push(`${tag}: dot ${k + 1} sits on a syllable boundary`);
          });
        } else if (dots.length) fails.push(`${tag}: dots outside d1`);
        // visible text on the card is the word and nothing else; no separated form anywhere
        const card = st.closest('.ws-card');
        const vis = [...card.querySelectorAll('*')].filter((el) => el.children.length === 0 && el.tagName !== 'IMG' && !el.closest('.ws-card-badge'))
          .map((el) => el.textContent.trim()).filter(Boolean).join('');
        if (vis !== word) fails.push(`${tag}: visible text "${vis}" ≠ "${word}"`);
        const img = st.querySelector('img');
        if (!img || !img.complete || img.naturalWidth === 0) fails.push(`${tag}: picture broken`);
        // containment: nothing on the stage may be clipped by its card (overflow:hidden hides it from the page lint)
        const cr = card.getBoundingClientRect();
        [...st.querySelectorAll('img, svg')].forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.top < cr.top - 0.6 || r.bottom > cr.bottom + 0.6 || r.left < cr.left - 0.6 || r.right > cr.right + 0.6) {
            fails.push(`${tag}: <${el.tagName.toLowerCase()}> clipped by its card (${Math.round(r.bottom)} > ${Math.round(cr.bottom)})`);
          }
        });
      });
      // data-lcs-long is the FLOOR the build honoured (min(minLongCards, long pool)); the free picks may add more
      if (longSeen < +root.dataset.lcsLong) fails.push(`${longSeen} long cards rendered, floor stamp says ${root.dataset.lcsLong}`);
      // no text node anywhere in the body equals a word with a separator inserted
      const words = stages.map((s) => s.dataset.lcsWord);
      const body = document.querySelector('[data-lcs-body]');
      const nodes = [...body.querySelectorAll('*')].filter((el) => el.children.length === 0).map((el) => el.textContent.trim()).filter(Boolean);
      for (const w of words) {
        const low = w.toLocaleLowerCase(lang);
        for (const t of nodes) {
          const tl = t.toLocaleLowerCase(lang);
          if (tl !== low && tl.replace(/[\s\-|·/]/g, '') === low) fails.push(`separated form of "${w}" printed: "${t}"`);
        }
      }

      // ---------------------------------------------------------------- the faces (design §3)
      function verifyFace(root, lang) {
        const fails = [];
        const face = root.dataset.lcsFace;
        const want = +root.dataset.lcsCards, minC = +root.dataset.lcsMincount, maxC = +root.dataset.lcsMaxcount, maxL = +root.dataset.lcsMaxletters;
        const body = document.querySelector('[data-lcs-body]');
        const stages = [...root.querySelectorAll('.ws-card-stage[data-lcs-face="' + face + '"]')];
        const seen = new Set();
        const inCard = (tag, st) => {
          const card = st.closest('.ws-card, .ws-lane');
          const cr = card.getBoundingClientRect();
          [...st.querySelectorAll('img, svg, [data-lcs-model], .ws-tile')].forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;
            if (r.top < cr.top - 0.6 || r.bottom > cr.bottom + 0.6 || r.left < cr.left - 0.6 || r.right > cr.right + 0.6) {
              fails.push(`${tag}: <${el.tagName.toLowerCase()}> clipped by its card (${Math.round(r.right)}/${Math.round(r.bottom)} vs ${Math.round(cr.right)}/${Math.round(cr.bottom)})`);
            }
          });
        };
        const picOk = (tag, st) => { const im = st.querySelector('img'); if (!im || !im.complete || im.naturalWidth === 0) fails.push(`${tag}: picture broken`); };
        // common stamp checks for the word-bearing stages
        const wordChecks = (tag, st) => {
          const word = st.dataset.lcsWord || '';
          const split = (st.dataset.lcsSplit || '').split('|');
          const count = +st.dataset.lcsCount;
          if (!word) fails.push(`${tag}: no word`);
          if (seen.has(word)) fails.push(`${tag}: duplicate word "${word}"`);
          seen.add(word);
          if (split.join('') !== word.toLocaleLowerCase(lang)) fails.push(`${tag}: split "${split.join('|')}" ≠ word "${word}"`);
          if (split.length !== count || count < 2) fails.push(`${tag}: count ${count} ≠ ${split.length} syllables`);
          if (count < minC || count > maxC) fails.push(`${tag}: count ${count} outside ${minC}-${maxC}`);
          if ([...word].length > maxL) fails.push(`${tag}: ${[...word].length} letters > ${maxL}`);
          if (!/^\p{L}+$/u.test(word)) fails.push(`${tag}: word is not letters only`);
          if ((lang === 'de') !== /^\p{Lu}/u.test(word)) fails.push(`${tag}: case rule (${lang}) violated for "${word}"`);
          return { word, split, count };
        };
        const visibleText = (el, skipSel) => [...el.querySelectorAll('*')]
          .filter((n) => n.children.length === 0 && n.tagName !== 'IMG' && !n.closest('.ws-card-badge') && !(skipSel && n.closest(skipSel)))
          .map((n) => n.textContent.trim()).filter(Boolean);
        const noSeparatedForm = (words) => {
          const nodes = [...body.querySelectorAll('*')].filter((el) => el.children.length === 0).map((el) => el.textContent.trim()).filter(Boolean);
          for (const w of words) {
            const low = w.toLocaleLowerCase(lang);
            for (const t of nodes) { const tl = t.toLocaleLowerCase(lang); if (tl !== low && tl.replace(/[\s\-|·/]/g, '') === low) fails.push(`separated form of "${w}" printed: "${t}"`); }
          }
        };
        const noArcs = (tag, st) => { if (st.querySelector('[data-lcs-arcs], [data-lcs-arcmode]')) fails.push(`${tag}: an arc zone on the ${face} face`); };

        if (face === 'rewrite') {
          if (stages.length !== want) fails.push(`${stages.length} rows, want ${want}`);
          const modelW = +root.dataset.lcsModelw, laneW = +root.dataset.lcsLanew;
          let longSeen = 0;
          stages.forEach((st, i) => {
            const tag = `row ${i + 1}`;
            const { word, count } = wordChecks(tag, st);
            if (count >= 3) longSeen++;
            if ([...word].length > 17 - count) fails.push(`${tag}: ${[...word].length} letters + ${count - 1} hyphens exceed the lane capacity (17 − count)`);
            const model = st.querySelector('[data-lcs-model]');
            if (!model) { fails.push(`${tag}: no model`); return; }
            if (model.textContent !== word) fails.push(`${tag}: model "${model.textContent}" ≠ word "${word}"`);
            const mr = model.getBoundingClientRect();
            const range = document.createRange(); range.selectNodeContents(model);
            const inkW = range.getBoundingClientRect().width;
            if (inkW > modelW + 0.6) fails.push(`${tag}: model text ${inkW.toFixed(1)}px wider than its ${modelW}px column`);
            if (parseFloat(getComputedStyle(model).fontSize) < 22) fails.push(`${tag}: model font < 22px`);
            const lane = st.querySelector('[data-lcs-hyphen-lane]');
            const row = lane && lane.querySelector('[data-lcs-prim="writing-row"]');
            if (!row) { fails.push(`${tag}: no hyphen lane`); return; }
            if (Math.abs(row.getBoundingClientRect().width - laneW) > 0.6) fails.push(`${tag}: lane width ${row.getBoundingClientRect().width} ≠ ${laneW}`);
            if (row.querySelector('text, [data-lcs-tick], path')) fails.push(`${tag}: a tick or text in the hyphen lane (a boundary leak)`);
            if (mr.right > row.getBoundingClientRect().left + 0.6) fails.push(`${tag}: model overlaps the lane`);
            noArcs(tag, st);
            const vis = visibleText(st).join('');
            if (vis !== word) fails.push(`${tag}: visible text "${vis}" ≠ "${word}"`);
            picOk(tag, st); inCard(tag, st);
          });
          if (longSeen < +root.dataset.lcsLong) fails.push(`${longSeen} long rows rendered, floor stamp says ${root.dataset.lcsLong}`);
          if (root.querySelectorAll('[data-lcs-prim="writing-row"]').length !== want) fails.push(`${root.querySelectorAll('[data-lcs-prim="writing-row"]').length} writing rows, want ${want}`);
          noSeparatedForm(stages.map((s) => s.dataset.lcsWord));
        }

        if (face === 'cloze') {
          if (stages.length !== want) fails.push(`${stages.length} cards, want ${want}`);
          const cellMax = +root.dataset.lcsCellmax, lo = +root.dataset.lcsBlanklo, hi = +root.dataset.lcsBlankhi;
          stages.forEach((st, i) => {
            const tag = `card ${i + 1}`;
            const { word, split } = wordChecks(tag, st);
            const bi = +st.dataset.lcsBlank, from = +st.dataset.lcsBlankfrom, len = +st.dataset.lcsBlanklen, cell = +st.dataset.lcsCell;
            const n = [...word].length;
            if (!(bi >= 0 && bi < split.length)) { fails.push(`${tag}: blank index ${bi} out of range`); return; }
            const expFrom = split.slice(0, bi).reduce((a, syl) => a + [...syl].length, 0), expLen = [...split[bi]].length;
            if (from !== expFrom || len !== expLen) fails.push(`${tag}: blank stamp ${from}/${len} ≠ syllable ${bi} (${expFrom}/${expLen})`);
            if (len < lo || len > hi) fails.push(`${tag}: blank syllable of ${len} letters outside ${lo}-${hi}`);
            const ws = st.querySelector('[data-lcs-prim="syllable-word"]');
            if (!ws) { fails.push(`${tag}: no word cells`); return; }
            const cells = n - len + 4;
            if (+ws.dataset.lcsCells !== cells) fails.push(`${tag}: ${ws.dataset.lcsCells} cells ≠ ${cells}`);
            if (+ws.dataset.lcsCell !== cell || cell > cellMax || cell < 20) fails.push(`${tag}: cell ${ws.dataset.lcsCell}/${cell} outside 20..${cellMax}`);
            if (cells * cell > 296) fails.push(`${tag}: cells ${cells}×${cell} exceed 296`);
            const boxes = [...ws.querySelectorAll('[data-lcs-blank]')];
            if (boxes.length !== 1) { fails.push(`${tag}: ${boxes.length} blank boxes, want exactly 1`); return; }
            const bx = boxes[0];
            if (+bx.dataset.lcsBlank !== from) fails.push(`${tag}: box stamp ${bx.dataset.lcsBlank} ≠ from ${from}`);
            if (Math.abs(+bx.getAttribute('width') - (4 * cell - 4)) > 0.6 || Math.abs(+bx.getAttribute('x') - (from * cell + 2)) > 0.6) fails.push(`${tag}: blank box x=${bx.getAttribute('x')} w=${bx.getAttribute('width')} is not exactly 4 cells (${4 * cell - 4}) at cell ${from}`);
            if (bx.getAttribute('stroke-dasharray') == null) fails.push(`${tag}: blank box is not dashed`);
            const texts = [...ws.querySelectorAll('text')];
            const shown = texts.map((t) => t.textContent).join('');
            const exp = [...word].slice(0, from).join('') + [...word].slice(from + len).join('');
            if (shown !== exp) fails.push(`${tag}: visible letters "${shown}" ≠ "${exp}" (word minus the blank)`);
            texts.forEach((t, k) => {
              const x = +t.getAttribute('x'), col = k < from ? k : k + 4;
              if (Math.abs(x - (col + 0.5) * cell) > 0.51) fails.push(`${tag}: letter ${k} at x=${x}, want ${(col + 0.5) * cell}`);
              if (+t.getAttribute('font-size') !== cell - 2) fails.push(`${tag}: font ≠ cell−2`);
            });
            if (ws.getBoundingClientRect().width > 302.6) fails.push(`${tag}: word svg wider than the card`);
            noArcs(tag, st);
            const vis = visibleText(st).join('');
            if (vis !== exp) fails.push(`${tag}: visible text "${vis}" ≠ "${exp}"`);
            picOk(tag, st); inCard(tag, st);
          });
          noSeparatedForm(stages.map((s) => s.dataset.lcsWord));
          // the missing syllable itself is never printed on its card
          stages.forEach((st, i) => { const syl = st.dataset.lcsSplit.split('|')[+st.dataset.lcsBlank]; if (visibleText(st).some((t) => t.toLocaleLowerCase(lang) === syl)) fails.push(`card ${i + 1}: the missing syllable "${syl}" is printed`); });
          // the missing syllable is distinct across the page (a repeated answer can be copied from its sibling card)
          { const seenSyl = new Map(); stages.forEach((st, i) => { const syl = st.dataset.lcsSplit.split('|')[+st.dataset.lcsBlank].toLocaleLowerCase(lang); if (seenSyl.has(syl)) fails.push(`card ${i + 1}: the missing syllable "${syl}" is also the answer on card ${seenSyl.get(syl)}`); else seenSyl.set(syl, i + 1); }); }
        }

        if (face === 'scramble') {
          if (stages.length !== want) fails.push(`${stages.length} rows, want ${want}`);
          const tilesW = +root.dataset.lcsTilesw, laneW = +root.dataset.lcsLanew, min3 = +root.dataset.lcsMin3;
          let three = 0;
          stages.forEach((st, i) => {
            const tag = `row ${i + 1}`;
            const { word, split, count } = wordChecks(tag, st);
            if (count >= 3) three++;
            const order = (st.dataset.lcsOrder || '').split(',').map(Number);
            const tiles = [...st.querySelectorAll('[data-lcs-tile]')];
            if (tiles.length !== split.length) { fails.push(`${tag}: ${tiles.length} tiles for ${split.length} syllables`); return; }
            const idx = tiles.map((t) => +t.dataset.lcsTile);
            if (idx.join(',') !== order.join(',')) fails.push(`${tag}: rendered order ${idx} ≠ stamp ${order}`);
            if (idx.slice().sort((a, b) => a - b).join(',') !== split.map((_, k) => k).join(',')) fails.push(`${tag}: tile indices are not a permutation`);
            if (idx.every((v, k) => v === k)) fails.push(`${tag}: tiles in word order (identity)`);
            if (idx[0] === 0) fails.push(`${tag}: the first tile is the true first syllable`);
            // tile multiset === split (tile 1 carries the display case)
            const expTok = split.map((syl, k) => (k === 0 ? [...word].slice(0, [...syl].length).join('') : syl));
            tiles.forEach((t) => { const k = +t.dataset.lcsTile; if (t.textContent.trim() !== expTok[k]) fails.push(`${tag}: tile "${t.textContent.trim()}" ≠ syllable ${k} "${expTok[k]}"`); });
            if (tiles.map((t) => t.textContent.trim()).sort().join('|') !== expTok.slice().sort().join('|')) fails.push(`${tag}: tile multiset ≠ split`);
            tiles.forEach((t) => { if (parseFloat(getComputedStyle(t).fontSize) < 18) fails.push(`${tag}: tile font < 18px`); if (t.getBoundingClientRect().height < 40) fails.push(`${tag}: tile shorter than 40px`); });
            // one line inside the 280 slot: every tile shares the first tile's top, the row is no wider than the slot
            const tops = tiles.map((t) => Math.round(t.getBoundingClientRect().top));
            if (new Set(tops).size !== 1) fails.push(`${tag}: tiles wrapped to two lines (tops ${tops.join('/')})`);
            const slot = st.querySelector('[data-lcs-tiles]').getBoundingClientRect();
            const last = tiles[tiles.length - 1].getBoundingClientRect();
            if (last.right > slot.right + 0.6) fails.push(`${tag}: tiles overflow the ${tilesW}px slot by ${(last.right - slot.right).toFixed(1)}px`);
            const row = st.querySelector('[data-lcs-writerow] [data-lcs-prim="writing-row"]');
            if (!row) fails.push(`${tag}: no writing row`);
            else if (Math.abs(row.getBoundingClientRect().width - laneW) > 0.6 || row.querySelector('text')) fails.push(`${tag}: writing row wrong width or carries text`);
            noArcs(tag, st);
            const vis = visibleText(st);
            if (vis.join('|') !== tiles.map((t) => t.textContent.trim()).join('|')) fails.push(`${tag}: visible text beyond the tiles: ${vis.join('|')}`);
            picOk(tag, st); inCard(tag, st);
          });
          if (three < min3) fails.push(`${three} three-tile rows < min3 ${min3}`);
          noSeparatedForm(stages.map((s) => s.dataset.lcsWord));
        }

        if (face === 'sort') {
          const bankN = +root.dataset.lcsBank, per = +root.dataset.lcsPercol, cols = root.dataset.lcsCols.split('|').map(Number), labels = root.dataset.lcsLabels.split('|');
          const chips = [...root.querySelectorAll('[data-lcs-bank-word]')];
          if (chips.length !== bankN) fails.push(`${chips.length} bank chips, want ${bankN}`);
          const byCount = {};
          chips.forEach((c, i) => {
            const tag = `chip ${i + 1}`;
            const word = c.dataset.lcsBankWord, count = +c.dataset.lcsCount, rank = +c.dataset.lcsRank;
            if (seen.has(word)) fails.push(`${tag}: duplicate word "${word}"`);
            seen.add(word);
            byCount[count] = (byCount[count] || 0) + 1;
            if (!cols.includes(count)) fails.push(`${tag}: count ${count} has no column`);
            if (rank !== i) fails.push(`${tag}: rank ${rank} at position ${i} — the bank is not in collation order`);
            if ([...word].length > maxL) fails.push(`${tag}: ${[...word].length} letters > ${maxL}`);
            const txt = c.querySelector('span:last-child');
            if (!txt || txt.textContent.trim() !== word) fails.push(`${tag}: chip text ≠ word`);
            if (parseFloat(getComputedStyle(c).fontSize) < 16) fails.push(`${tag}: chip font < 16px`);
            const im = c.querySelector('img'); if (!im || !im.complete || im.naturalWidth === 0) fails.push(`${tag}: picture broken`);
            if (im && im.getBoundingClientRect().height < 44 - 0.6) fails.push(`${tag}: icon < 44px`);
          });
          cols.forEach((n) => { if ((byCount[n] || 0) !== per) fails.push(`${byCount[n] || 0} words of ${n} syllables in the bank, want ${per}`); });
          // grouped-by-count guard: the bank order must not be sorted by count (unless collation happens to agree — flagged for the node gate to re-derive)
          const counts = chips.map((c) => +c.dataset.lcsCount);
          if (counts.every((v, i) => i === 0 || v >= counts[i - 1]) && new Set(counts).size > 1 && chips.length > 2) fails.push(`bank chips grouped by count (${counts.join(',')})`);
          const colEls = [...root.querySelectorAll('[data-lcs-col]')];
          if (colEls.length !== cols.length) fails.push(`${colEls.length} columns, want ${cols.length}`);
          colEls.forEach((col, k) => {
            const n = +col.dataset.lcsCol, tag = `column ${n}`;
            if (n !== cols[k]) fails.push(`${tag}: order ≠ ${cols.join('|')}`);
            const numeral = col.querySelector('[data-lcs-col-numeral]');
            if (!numeral || numeral.textContent.trim() !== String(n)) fails.push(`${tag}: numeral chip ≠ ${n}`);
            if (numeral && numeral.getBoundingClientRect().height < 44 - 0.6) fails.push(`${tag}: numeral chip < 44px`);
            const lab = col.querySelector('[data-lcs-col-label]');
            if (!lab || lab.textContent.trim() !== labels[k]) fails.push(`${tag}: heading "${lab && lab.textContent.trim()}" ≠ sortLabels "${labels[k]}"`);
            if (lab && lab.scrollWidth > lab.clientWidth + 0.6) fails.push(`${tag}: heading clipped`);
            const rows = [...col.querySelectorAll('[data-lcs-ruling-row]')];
            if (rows.length !== per) fails.push(`${tag}: ${rows.length} rulings, want ${per}`);
            rows.forEach((r, j) => { if (r.querySelector('text')) fails.push(`${tag}: ruling ${j + 1} carries text`); const h = r.getBoundingClientRect().height; if (h < 56) fails.push(`${tag}: ruling ${j + 1} only ${h}px tall`); });
            const cr = col.getBoundingClientRect(), pr = body.getBoundingClientRect();
            if (cr.bottom > pr.bottom + 0.6 || cr.right > pr.right + 0.6) fails.push(`${tag}: column leaves the body`);
            rows.forEach((r) => { const rr = r.getBoundingClientRect(); if (rr.right > cr.right + 0.6 || rr.bottom > cr.bottom + 0.6) fails.push(`${tag}: ruling clipped by its column`); });
          });
          // no count is printed beside a word, no split anywhere
          const bankTexts = visibleText(root.querySelector('[data-lcs-bank-banner]'));
          if (bankTexts.length !== chips.length) fails.push(`bank prints ${bankTexts.length} texts for ${chips.length} chips`);
          noSeparatedForm(chips.map((c) => c.dataset.lcsBankWord));
          if (root.querySelector('[data-lcs-arcs], [data-lcs-prim="syllable-word"]')) fails.push('cells or arcs on the sort face');
        }

        if (face === 'kings') {
          if (stages.length !== want) fails.push(`${stages.length} cards, want ${want}`);
          const cellMax = +root.dataset.lcsCellmax, arcH = +root.dataset.lcsArch;
          const V = new Set([...(root.dataset.lcsVowels || '')]);
          const X = (root.dataset.lcsVowelextra || '').split('|').filter(Boolean);
          const runsOf = (syl) => {   // the spec's kingRuns, re-derived here from the stamped vowel list
            const ch = [...syl], runs = []; let i = 0, open = false;
            while (i < ch.length) {
              let len = 1, vowel = V.has(ch[i]);
              for (const x of X) { if (ch.slice(i, i + [...x].length).join('') === x) { len = [...x].length; vowel = true; break; } }
              if (vowel) { if (open) runs[runs.length - 1].len += len; else runs.push({ at: i, len }); open = true; } else open = false;
              i += len;
            }
            return runs;
          };
          const kingsOf = (split) => { let at = 0; return split.map((syl) => { const r = runsOf(syl); const k = r.length === 1 ? (at + r[0].at) + ':' + r[0].len : 'x'; at += [...syl].length; return k; }).join('|'); };
          const ex = root.querySelector('[data-lcs-kings-example]');
          if (!ex) fails.push('no worked-example banner');
          else {
            const exWord = ex.dataset.lcsKingsExample, exSplitAt = [...ex.querySelectorAll('[data-lcs-arc]')].length;
            if (exWord !== root.dataset.lcsExample) fails.push('example banner word ≠ root stamp');
            const dots = [...ex.querySelectorAll('[data-lcs-vowel-dot]')];
            if (dots.length !== exSplitAt || !dots.length) fails.push(`example: ${dots.length} vowel dots for ${exSplitAt} arcs`);
            if (ex.closest('.ws-card')) fails.push('the example sits on a card');
            const er = ex.getBoundingClientRect(), br = body.getBoundingClientRect();
            if (er.top < br.top - 0.6 || er.right > br.right + 0.6) fails.push('example banner leaves the body');
            [...ex.querySelectorAll('svg')].forEach((sv) => { const r = sv.getBoundingClientRect(); if (r.bottom > er.bottom + 0.6 || r.right > er.right + 0.6) fails.push('example banner clips its drawing'); });
            if (stages.some((st) => st.dataset.lcsWord === exWord)) fails.push('the example word is also on a card');
          }
          stages.forEach((st, i) => {
            const tag = `card ${i + 1}`;
            const { word, split, count } = wordChecks(tag, st);
            const cell = +st.dataset.lcsCell, n = [...word].length;
            const kings = st.dataset.lcsKings || '';
            if (kings !== kingsOf(split)) fails.push(`${tag}: kings "${kings}" ≠ re-derived "${kingsOf(split)}"`);
            if (/x/.test(kingsOf(split))) fails.push(`${tag}: a syllable of "${word}" has no single vowel run`);
            const ws = st.querySelector('[data-lcs-prim="syllable-word"]');
            if (!ws) { fails.push(`${tag}: no word cells`); return; }
            if (+ws.dataset.lcsCells !== n || +ws.dataset.lcsCell !== cell || cell > cellMax || cell < 20 || n * cell > 296) fails.push(`${tag}: cell geometry ${ws.dataset.lcsCells}×${ws.dataset.lcsCell} (cellMax ${cellMax})`);
            const texts = [...ws.querySelectorAll('text')];
            if (texts.map((t) => t.textContent).join('') !== word) fails.push(`${tag}: cell letters ≠ word`);
            texts.forEach((t, k) => { if (Math.abs(+t.getAttribute('x') - (k + 0.5) * cell) > 0.51) fails.push(`${tag}: letter ${k} off its cell`); });
            const az = st.querySelector('[data-lcs-arcmode]');
            if (!az) { fails.push(`${tag}: no arc zone`); return; }
            if (az.dataset.lcsArcmode !== 'printed') fails.push(`${tag}: arcmode ${az.dataset.lcsArcmode} (kings must be printed)`);
            if (+az.dataset.lcsArcs !== count) fails.push(`${tag}: ${az.dataset.lcsArcs} arcs ≠ count ${count}`);
            const paths = [...az.querySelectorAll('path')];
            if (paths.length !== count) fails.push(`${tag}: ${paths.length} <path> ≠ count ${count}`);
            let at = 0;
            split.forEach((syl, k) => {
              const len = [...syl].length, p = paths[k];
              if (!p) return;
              const m = /M\s*([\d.]+),[\d.]+\s*Q\s*[\d.]+,[\d.]+\s*([\d.]+),/.exec(p.getAttribute('d') || '');
              if (!m) { fails.push(`${tag}: arc ${k + 1} path unreadable`); at += len; return; }
              const x1 = +m[1], x2 = +m[2];
              if (Math.abs(x1 - (at * cell + 4)) > 0.6 || Math.abs(x2 - ((at + len) * cell - 4)) > 0.6) fails.push(`${tag}: arc ${k + 1} spans ${x1}..${x2}, want ${at * cell + 4}..${(at + len) * cell - 4}`);
              at += len;
            });
            if (az.getBoundingClientRect().height < arcH - 0.6) fails.push(`${tag}: arc zone squashed`);
            if (Math.abs(az.getBoundingClientRect().width - n * cell) > 0.6) fails.push(`${tag}: arc zone width ≠ word width`);
            if (st.querySelector('[data-lcs-vowel-dot], circle')) fails.push(`${tag}: a vowel dot on a card (only the example may show one)`);
            const vis = visibleText(st).join('');
            if (vis !== word) fails.push(`${tag}: visible text "${vis}" ≠ "${word}"`);
            picOk(tag, st); inCard(tag, st);
          });
          noSeparatedForm(stages.map((s) => s.dataset.lcsWord));
        }
        return fails;
      }
      return fails;
    });
  },
};
