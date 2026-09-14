/**
 * K-319 — Feelings: Match the Face to the Word (nt20-C; family key `feelings`
 * — ruled 2026-09-14: the THEME axis owns `emotions`, which stays the name of
 * the picture directory the faces come from; K; L.K.5).
 * Design: docs/worksheet-gen/b3-designs/K-319-emotions.md §2/§5 (read every
 * `emotions` family key there as `feelings`).
 *
 * The child READS A FEELING off a yellow face and connects it to the feeling
 * WORD: six faces down the left on WHITE tiles, six feeling words down the
 * right on cream tiles in a deranged order, a coral dot each side; one pencil
 * line per face. No numerals, no bank, no scene, no printed ring. The picture
 * is read first (K reads pictures before words); the word is the only text
 * decoded. Faces = `emotions/<noun>` via fileUri; words = the panel's
 * citation literals from data/b3/feelings.js (never image-vocabulary.js at
 * render — the vocab is a spelling cross-check in the gate).
 *
 * THEMELESS (`themeAxis:{applicable:false}`): the faces ARE the theme; the
 * enumerator emits one instance per (type, difficulty, locale). Fan lever =
 * the FEELING SET + the derangement per seed.
 *
 * Difficulty is a CONFIG; guards key on the resolved config, never the level:
 *   pairs        rows on the page (verify: 4 <= pairs <= 8)
 *   pool         feeling ids the page may draw (null = every `matchable` id);
 *                d1 keeps the two O-mouth faces (scared / surprised) apart
 *   picPx        face size (type floor 72 >= the K token floor 56)
 *   tileL/tileR  tile widths; itemH the tile height (6 × 108 + 5 × 12 = 708
 *                fits the 710 px .ws-match inner height at the 722 body floor)
 *   wordPx       the word size (Baloo 2 700)
 *   shuffleLeft  d3 shuffles the face column too (recorded as not a distinct move)
 * A locale whose bank has fewer `matchable` words than `pairs` THROWS (refusal).
 *
 * Answer hiding: tiles carry the feeling ID (data-lcs-face / data-lcs-word),
 * never the text on the face side; each word text appears once; verify()
 * re-derives the derangement and the id sets from the stamps.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { feelingMatch } = require('../../templates/components-b3.js');

const BANK = 'feelings';
/** The six faces a K child can read without the word (design §1 / §4; the gate asserts the bank agrees). */
const ACCEPTED = ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired'];

function derange(rng, n) {
  if (n < 2) return Array.from({ length: n }, (_, i) => i);
  let order;
  do { order = rng.shuffle(Array.from({ length: n }, (_, i) => i)); }
  while (order.some((v, i) => v === i));
  return order;
}

module.exports = {
  id: 'K-319',
  slug: 'feelings',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'feelings',
  themeAxis: { applicable: false },
  difficulty: {
    1: { pairs: 4, pool: ['happy', 'sad', 'angry', 'tired'], picPx: 100, tileL: 180, tileR: 260, itemH: 168, wordPx: 30, shuffleLeft: false },
    2: { pairs: 6, pool: null, picPx: 80, tileL: 160, tileR: 260, itemH: 108, wordPx: 28, shuffleLeft: false },
    3: { pairs: 6, pool: null, picPx: 72, tileL: 160, tileR: 260, itemH: 108, wordPx: 26, shuffleLeft: true },
  },
  i18n: {
    en: {
      title: 'Feelings: Match the Face to the Word',
      instruction: 'Draw a line from each face to the feeling word that says how it feels.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank (the gate's poison seam); build() passes the real one. */
  _buildWith(bank, { difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-319: no difficulty ' + difficulty);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!(d.pairs >= 4 && d.pairs <= 8)) throw new Error(`K-319: pairs ${d.pairs} outside the K page rule 4..8`);
    if (d.picPx < 72) throw new Error(`K-319: picPx ${d.picPx} < the type floor 72`);

    // the pool: matchable faces, optionally narrowed by the config's id list
    const matchable = (bank.feelings || []).filter((f) => f.matchable === true);
    for (const f of matchable) {
      if (!ACCEPTED.includes(f.id)) throw new Error(`K-319: bank marks "${f.id}" matchable; only ${ACCEPTED.join('/')} are accepted faces`);
      if (!f.word || !f.face || !f.face.noun) throw new Error(`K-319: matchable "${f.id}" without a word or a face`);
    }
    const pool = d.pool ? matchable.filter((f) => d.pool.includes(f.id)) : matchable;
    if (pool.length < d.pairs) throw new Error(`K-319: ${loc} has ${pool.length} matchable feelings${d.pool ? ' in the pool ' + d.pool.join('/') : ''}, need ${d.pairs} (refuse)`);
    const chosen = pool.length === d.pairs ? pool.slice() : rng.sample(pool, d.pairs);
    const left = d.shuffleLeft ? rng.shuffle(chosen) : chosen;
    const seen = new Set();
    for (const f of left) {
      const w = f.word.toLocaleLowerCase(loc);
      if (seen.has(w)) throw new Error(`K-319: two feelings print the same word "${f.word}" in ${loc}`);
      seen.add(w);
    }
    const order = derange(rng, left.length);
    const right = order.map((i) => left[i]);

    const bodyHtml = feelingMatch({
      left: left.map((f) => ({ id: f.id, src: fileUri(f.face.theme, f.face.noun) })),
      right: right.map((f) => ({ id: f.id, word: f.word })),
      tileL: d.tileL, tileR: d.tileR, itemH: d.itemH, picPx: d.picPx, wordPx: d.wordPx,
    });
    return { bodyHtml, meta: { pairs: left.map((f) => f.id), order, words: right.map((f) => f.word) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const ACCEPTED = ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired'];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)\b/i;
      const root = document.querySelector('[data-ws-content][data-lcs-feelings]');
      if (!root) return ['no feelings root'];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const faces = [...root.querySelectorAll('[data-lcs-face]')];
      const words = [...root.querySelectorAll('[data-lcs-word]')];
      const left = faces.map((e) => e.dataset.lcsFace);
      const right = words.map((e) => e.dataset.lcsWord);
      const n = left.length;
      if (+root.dataset.lcsPairs !== n) fails.push(`pairs stamp ${root.dataset.lcsPairs} ≠ ${n} face tiles`);
      if (n < 4 || n > 8) fails.push(`${n} pairs outside 4..8`);
      if (right.length !== n) fails.push(`${right.length} word tiles ≠ ${n} face tiles`);
      left.forEach((id, i) => { if (!ACCEPTED.includes(id)) fails.push(`face ${i + 1}: "${id}" is not an accepted feeling`); });
      if (new Set(left).size !== n) fails.push('a feeling appears twice on the left');
      if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column is not a permutation of the left');
      left.forEach((id, i) => { if (right[i] === id) fails.push(`row ${i + 1}: "${id}" sits straight across from its word (fixed point)`); });
      // each word text once, never on the face side
      const texts = words.map((e) => e.textContent.trim());
      texts.forEach((t, i) => { if (!t) fails.push(`word tile ${i + 1}: empty`); });
      if (new Set(texts.map((t) => t.toLocaleLowerCase(lang))).size !== texts.length) fails.push('two word tiles print the same word');
      faces.forEach((e, i) => {
        if (e.textContent.trim()) fails.push(`face tile ${i + 1}: prints text`);
        const img = e.querySelectorAll('img');
        if (img.length !== 1) { fails.push(`face tile ${i + 1}: ${img.length} pictures`); return; }
        const im = img[0];
        if (!im.complete || im.naturalWidth === 0) fails.push(`face tile ${i + 1}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`face tile ${i + 1}: alt text names the answer`);
        const dir = decodeURIComponent(im.src).split('/').slice(-2, -1)[0] || '';
        if (BW.test(dir)) fails.push(`face tile ${i + 1}: picture from a B&W directory "${dir}"`);
        const noun = decodeURIComponent(im.src).split('/').pop().replace(/@3x\.webp$/, '');
        if (noun !== e.dataset.lcsFace) fails.push(`face tile ${i + 1}: picture "${noun}" ≠ stamped feeling "${e.dataset.lcsFace}"`);
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < 72 - 0.6) fails.push(`face tile ${i + 1}: icon ${Math.round(Math.min(r.width, r.height))} px < 72`);
      });
      // every word fits its tile (no clipped literal)
      words.forEach((e, i) => {
        const span = e.querySelector('span:not(.ws-match-dot)');
        if (span && span.scrollWidth > e.clientWidth + 0.6) fails.push(`word tile ${i + 1}: "${span.textContent.trim()}" wider than its tile`);
      });
      return fails;
    });
  },
};
