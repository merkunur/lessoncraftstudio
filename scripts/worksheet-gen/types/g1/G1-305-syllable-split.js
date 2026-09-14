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
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { syllableWord, syllableArcsForWord } = require('../../templates/components-b3.js');
const { entriesFor, displayWord, distinctByWord, sampleEntries, fileUri } = require('../../lib/b2-common.js');
const { approvedByKey, texAgreed, daStrict, bank } = require('../../lib/b3-common.js');
const { esc } = require('../../primitives/_svg.js');

const KEY = 'syllable-split';
const ID = 'G1-305';
const CELL_ROW_MAX = 296;   // cells never exceed this (3 px each side inside the stage)
const MUTE_E = /[^aeiouyéèêë]e$/u;   // fr final mute-e on the last syllable (design §2 filter step)

/**
 * The eligible entries of (theme, loc) for a resolved config — PURE, no rng.
 * Order: entriesFor → displayWord(casing) → letters only → approved by
 * vocabKey with word === display word (case-insensitive) → count/letters in
 * range → da strict pool → fr mute-e refusal → panel exclude → texPool when
 * the face prints a boundary → d1 dot/boundary coincidence → distinct by word.
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
  return distinctByWord(pool, (e) => e.word);
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

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const b = bank(KEY, loc);   // a missing locale block throws (refusal)
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

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const root = document.querySelector('[data-lcs-type="G1-305"]');
      if (!root) return ['no G1-305 root'];
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
      return fails;
    });
  },
};
