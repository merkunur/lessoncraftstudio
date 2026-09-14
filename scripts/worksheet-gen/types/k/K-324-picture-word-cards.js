/**
 * K-324 — Picture Word Cards (nt20-C; family key `picture-word-cards`, K,
 * readiness — no CCSS code on the base; `default_subject: letters`).
 * Design: docs/worksheet-gen/b3-designs/K-324-picture-word-cards.md §2/§5.
 *
 * A MATERIALS SHEET, not an exercise: eight white cards edge to edge, picture
 * above word, separated only by dashed cut lines drawn ONCE as an overlay.
 * The child cuts (one straight stroke per line); the teacher laminates and
 * runs the routine (name it, read it, pocket chart, word wall). Nothing is
 * answered in pencil, so verify() is STRUCTURAL: it re-derives every card's
 * word / picture / case / line count / font tier from the stamps and checks
 * the overlay against the grid — never an answer.
 *
 * Block = strip 30 (scissors, x 0) + sheet 674 x 692 = 722 = the body under
 * three-line chrome (README ruling); `flex:0 0 auto; margin:auto 0` so the
 * 92 px of slack under one-line chrome splits above and below and nothing
 * stretches (the overlay is fixed px, both derive from the same cellW/cellH).
 *
 * Difficulty is a CONFIG; guards key on `kind` / `cols`, never the level:
 *   kind    'word' | 'twin'    picture-over-word cards | 8 picture cards + 8 word cards (F2's twin)
 *   cards   4 | 8             entries drawn (twin: 8 pictures + the same 8 words, deranged)
 *   cols/rows                 the grid; cellW = 674/cols, cellH = 692/rows
 *   pad                       the card's inner padding = the 3 mm cut margin (d1 16, d2 12, twin 10)
 *   pic / pic2                picture px (pic2 = the two-line label case, d2 only: 84)
 *   cap / lineCap / maxLines  label rule: <= cap glyphs one line; multi-token 21..28 wraps to
 *                             <= maxLines lines of <= lineCap; a single token > cap is REFUSED
 *   bigPx / bigCap            d1: <= bigCap glyphs print at bigPx (32), else the base 26
 *   tiers                     twin word tiers [[maxGlyphsOfLongestLine, px], …] (26 / 22 / 20 / 18)
 * Pool, in order: entriesFor(theme, loc) (B2_EXCLUDE applied) → the case rule
 * on the display label (`e.gender` present → displayWord(w, loc), the de noun
 * capital; null → displayWord(w, loc, 'lower') — de `Wütend` → `wütend`; the
 * bank's `cardCase:'upper'` → toLocaleUpperCase) → bank `exclude` →
 * distinctByWord → labelLines (null = refuse) → sampleEntries (throws below
 * `cards`; refusals are recorded, never filled). A BW theme (localized marker)
 * is REFUSED by the spec itself (`themeAxis.excludeBw`).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { entriesFor, displayWord, distinctByWord, sampleEntries, fileUri } = require('../../lib/b2-common.js');
const C3 = require('../../templates/components-b3.js');
const tokens = require('../../primitives/_tokens.js');

const BANK = 'picture-word-cards';
const SHEET_W = 674;
const SHEET_H = 692;
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const CARD_CASES = ['lower', 'keep', 'upper'];
const glyphs = (s) => [...String(s)].length;

/** The display label for an entry under the locale's case rule + the bank's cardCase. */
function labelFor(e, loc, cardCase) {
  // gender-null entries (adjectives / verbs / colours) are ALWAYS lower, whatever the locale keeps
  let w = e.gender ? displayWord(e.singular, loc) : displayWord(e.singular, loc, 'lower');
  if (cardCase === 'upper') w = w.toLocaleUpperCase(loc);
  else if (cardCase === 'lower') w = displayWord(w, loc, 'lower');
  return w;
}

/**
 * Plate geometry for a resolved label: {px, lineH, pic}. Exported so the gate
 * re-derives the tier from the word and compares it with the stamped px.
 */
function plateFor(lines, d) {
  const longest = Math.max(...lines.map(glyphs));
  if (d.kind === 'twin') {
    const tier = d.tiers.find(([max]) => longest <= max);
    if (!tier) throw new Error(`K-324: no twin tier for ${longest} glyphs`);
    return { px: tier[1], lineH: tier[1] + 4, pic: d.pic };
  }
  if (lines.length === 2) {
    // d2: two lines at 24 (plate 58) and the picture drops to 84 (84 + 6 + 58 = 148 <= 149);
    // d1: two lines at 26 (plate 66) inside a 314 inner (220 + 6 + 66 = 292)
    return d.pic2 ? { px: 24, lineH: 26, pic: d.pic2 } : { px: 26, lineH: 30, pic: d.pic };
  }
  if (d.bigPx && longest <= d.bigCap) return { px: d.bigPx, lineH: d.bigPx + 6, pic: d.pic };
  return { px: 26, lineH: 30, pic: d.pic };
}

module.exports = {
  id: 'K-324',
  slug: 'picture-word-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-word-cards',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: {
    1: { kind: 'word', cards: 4, cols: 2, rows: 2, pad: 16, pic: 220, cap: 20, lineCap: 16, maxLines: 2, bigPx: 32, bigCap: 15 },
    2: { kind: 'word', cards: 8, cols: 2, rows: 4, pad: 12, pic: 104, pic2: 84, cap: 20, lineCap: 16, maxLines: 2 },
    3: { kind: 'twin', cards: 8, cols: 4, rows: 4, pad: 10, pic: 120, cap: 13, lineCap: 13, maxLines: 2, tiers: [[8, 26], [10, 22], [12, 20], [13, 18]] },
  },
  i18n: {
    en: {
      title: 'Picture Word Cards',
      instruction: 'Cut along the dotted lines to make the cards. Say the name of each picture, then read its word.',
    },
  },

  plateFor,
  labelFor,
  SHEET_W,
  SHEET_H,

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank — the gate's poison seam; build() passes the real one. */
  _buildWith(bank, { theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-324: no difficulty ' + difficulty);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!theme) throw new Error('K-324: a theme is required (themed cut-out cards)');
    if (BW_MARKER.test(String(theme))) throw new Error(`K-324: theme "${theme}" is a BW directory (excludeBw) — refuse`);
    if (!bank || typeof bank !== 'object') throw new Error(`K-324: no ${loc} bank block`);
    const cardCase = bank.cardCase || 'lower';
    if (!CARD_CASES.includes(cardCase)) throw new Error(`K-324: ${loc} cardCase "${cardCase}" not in ${CARD_CASES.join('|')}`);
    if (cardCase === 'keep' && loc !== 'de') throw new Error(`K-324: cardCase 'keep' is de only (${loc})`);
    if (!['word', 'twin'].includes(d.kind)) throw new Error(`K-324: unknown kind ${d.kind}`);
    if (d.cols * d.rows !== (d.kind === 'twin' ? d.cards * 2 : d.cards)) throw new Error(`K-324: ${d.cols}x${d.rows} grid ≠ ${d.cards} cards (${d.kind})`);
    const band = tokens.density[this.gradeBand] || tokens.density.K;
    if (d.pic < band.minElement || (d.pic2 && d.pic2 < band.minElement)) throw new Error(`K-324: picture ${d.pic}/${d.pic2} < the K element floor ${band.minElement}`);
    const exclude = new Set(Array.isArray(bank.exclude) ? bank.exclude : []);

    // pool, in order
    let pool = entriesFor(theme, loc)
      .filter((e) => !exclude.has(e.vocabKey))
      .map((e) => ({ ...e, word: labelFor(e, loc, cardCase), noun_: !!e.gender }));
    pool = distinctByWord(pool, (e) => e.word);
    const refused = [];
    pool = pool.map((e) => ({ ...e, lines: C3.labelLines(e.word, { cap: d.cap, lineCap: d.lineCap, maxLines: d.maxLines }) }))
      .filter((e) => { if (!e.lines) { refused.push(e.word); return false; } return true; });
    const picks = sampleEntries(rng, pool, d.cards, `K-324 ${theme}/${loc} (${d.kind}, ${refused.length} refused by the label rule)`);

    const cellW = SHEET_W / d.cols, cellH = SHEET_H / d.rows;
    const innerW = cellW - 2 * d.pad;
    const stamps = ` data-lcs-case="${cardCase}" data-lcs-cellw="${cellW}" data-lcs-cellh="${cellH}" data-lcs-pad="${d.pad}"`;
    let bodyHtml, meta;
    if (d.kind === 'word') {
      const cards = picks.map((e) => {
        const p = plateFor(e.lines, d);
        return C3.wordCard({
          src: fileUri(theme, e.noun), vocabKey: e.vocabKey, word: e.word, lines: e.lines,
          pic: p.pic, px: p.px, lineH: p.lineH, pad: d.pad, innerW, kind: 'word',
          extra: `data-lcs-noun="${e.noun_ ? 1 : 0}"`,
        });
      });
      bodyHtml = C3.cardSheet({ cards, cols: d.cols, rows: d.rows, w: SHEET_W, h: SHEET_H, kind: 'word', extra: stamps });
      meta = { kind: 'word', theme, words: picks.map((e) => e.word), vocab: picks.map((e) => e.vocabKey), refused };
    } else {
      // twin: rows 1-2 the pictures in draw order; rows 3-4 the words DERANGED
      // (types/_shared/lit-vocab-match.js:45-46 idiom): word slot i never names picture slot i
      let order;
      do { order = rng.shuffle(picks.map((_, i) => i)); }
      while (picks.length > 1 && order.some((v, i) => v === i));
      const pictures = picks.map((e) => ({ src: fileUri(theme, e.noun), vocabKey: e.vocabKey }));
      const words = order.map((k) => { const e = picks[k]; const p = plateFor(e.lines, d); return { vocabKey: e.vocabKey, word: e.word, lines: e.lines, px: p.px, lineH: p.lineH }; });
      bodyHtml = C3.twinSheet({ pictures, words, cols: d.cols, rows: d.rows, w: SHEET_W, h: SHEET_H, pic: d.pic, pad: d.pad, innerW, extra: stamps });
      meta = { kind: 'twin', theme, words: picks.map((e) => e.word), vocab: picks.map((e) => e.vocabKey), order, refused };
    }
    return { bodyHtml, meta };
  },

  async verify(page) {
    return page.evaluate(() => {
      const f = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const BW = /\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\/|%20|$)/i;
      const sheets = document.querySelectorAll('[data-lcs-sheet]');
      if (sheets.length !== 1) { f.push(`${sheets.length} sheets`); return f; }
      const sheet = sheets[0];
      const kind = sheet.dataset.lcsSheet;
      const cols = +sheet.dataset.lcsCols, rows = +sheet.dataset.lcsRows;
      const cardCase = sheet.dataset.lcsCase || 'lower';
      const pad = +sheet.dataset.lcsPad;
      const grid = sheet.querySelector('[data-lcs-grid]');
      if (!grid) { f.push('no grid'); return f; }
      const gr = grid.getBoundingClientRect();
      const cells = [...grid.querySelectorAll('[data-lcs-card]')];
      if (cells.length !== cols * rows) f.push(`${cells.length} cards ≠ ${cols}x${rows}`);
      if (document.querySelectorAll('[data-lcs-scissors]').length !== 1) f.push('scissors glyph count ≠ 1');
      // overlay
      const ov = grid.querySelectorAll('[data-lcs-cutlines]');
      if (ov.length !== 1) f.push(`${ov.length} cut overlays`);
      else {
        const o = ov[0].getBoundingClientRect();
        if (Math.abs(o.width - gr.width) > 0.6 || Math.abs(o.height - gr.height) > 0.6) f.push(`overlay ${o.width}x${o.height} ≠ sheet ${gr.width}x${gr.height}`);
        if (!ov[0].querySelector('[data-lcs-cut-frame]')) f.push('no cut frame');
        const vs = [...ov[0].querySelectorAll('[data-lcs-cut-v]')], hs = [...ov[0].querySelectorAll('[data-lcs-cut-h]')];
        if (vs.length !== cols - 1) f.push(`${vs.length} vertical cuts ≠ ${cols - 1}`);
        if (hs.length !== rows - 1) f.push(`${hs.length} horizontal cuts ≠ ${rows - 1}`);
        vs.forEach((l) => {
          const k = +l.dataset.lcsCutV, x = +l.getAttribute('x1');
          if (Math.abs(x - (k * gr.width) / cols) > 1 || +l.getAttribute('x2') !== x) f.push(`cut v${k} at ${x}`);
          if (+l.getAttribute('y1') !== 0 || Math.abs(+l.getAttribute('y2') - gr.height) > 0.6) f.push(`cut v${k} does not span the sheet`);
          if (!l.getAttribute('stroke-dasharray')) f.push(`cut v${k} not dashed`);
        });
        hs.forEach((l) => {
          const k = +l.dataset.lcsCutH, y = +l.getAttribute('y1');
          if (Math.abs(y - (k * gr.height) / rows) > 1 || +l.getAttribute('y2') !== y) f.push(`cut h${k} at ${y}`);
          if (+l.getAttribute('x1') !== 0 || Math.abs(+l.getAttribute('x2') - gr.width) > 0.6) f.push(`cut h${k} does not span the sheet`);
          if (!l.getAttribute('stroke-dasharray')) f.push(`cut h${k} not dashed`);
        });
      }
      // cards: geometry, background, no border, content inside the cut margin
      const cellW = gr.width / cols, cellH = gr.height / rows;
      const rects = cells.map((c) => c.getBoundingClientRect());
      cells.forEach((c, i) => {
        const r = rects[i];
        if (r.left < gr.left - 0.6 || r.right > gr.right + 0.6 || r.top < gr.top - 0.6 || r.bottom > gr.bottom + 0.6) f.push(`card ${i + 1} outside the sheet`);
        if (Math.abs(r.width - cellW) > 1 || Math.abs(r.height - cellH) > 1) f.push(`card ${i + 1} ${Math.round(r.width)}x${Math.round(r.height)} ≠ cell ${Math.round(cellW)}x${Math.round(cellH)}`);
        const cs = getComputedStyle(c);
        if (cs.backgroundColor !== 'rgb(255, 255, 255)') f.push(`card ${i + 1} background ${cs.backgroundColor} (must be white)`);
        if (parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0) f.push(`card ${i + 1} has a border (the cut line is the overlay)`);
        if (Math.abs(parseFloat(cs.paddingTop) - pad) > 0.6) f.push(`card ${i + 1} padding ${cs.paddingTop} ≠ ${pad}`);
        for (let j = 0; j < i; j++) {
          const q = rects[j];
          if (r.left < q.right - 0.6 && q.left < r.right - 0.6 && r.top < q.bottom - 0.6 && q.top < r.bottom - 0.6) f.push(`cards ${j + 1} and ${i + 1} overlap`);
        }
        [...c.querySelectorAll('img, .ws-wordplate')].forEach((el) => {
          const b = el.getBoundingClientRect();
          if (b.left < r.left + 10 - 0.6 || b.right > r.right - 10 + 0.6 || b.top < r.top + 10 - 0.6 || b.bottom > r.bottom - 10 + 0.6) f.push(`card ${i + 1}: content inside the 10 px cut margin`);
        });
      });
      const checkImg = (c, i, n) => {
        const imgs = c.querySelectorAll('img');
        if (imgs.length !== n) { f.push(`card ${i + 1}: ${imgs.length} pictures ≠ ${n}`); return; }
        imgs.forEach((img) => {
          if (!img.complete || img.naturalWidth === 0) f.push(`card ${i + 1}: picture broken`);
          const dir = decodeURIComponent(img.src).split('/').slice(-2, -1)[0] || '';
          if (BW.test(dir + '/')) f.push(`card ${i + 1}: BW directory "${dir}"`);
          if (img.dataset.lcsPic !== c.dataset.lcsVocab) f.push(`card ${i + 1}: picture ${img.dataset.lcsPic} ≠ vocab ${c.dataset.lcsVocab}`);
        });
      };
      const checkPlate = (c, i) => {
        const plates = c.querySelectorAll('.ws-wordplate');
        if (plates.length !== 1) { f.push(`card ${i + 1}: ${plates.length} plates`); return; }
        const p = plates[0];
        const lines = [...p.querySelectorAll('[data-lcs-line]')];
        const word = c.dataset.lcsWord;
        if (lines.map((l) => l.textContent).join(' ') !== word) f.push(`card ${i + 1}: plate text "${lines.map((l) => l.textContent).join(' ')}" ≠ word "${word}"`);
        if (+p.dataset.lcsLines !== lines.length) f.push(`card ${i + 1}: ${lines.length} lines ≠ stamp ${p.dataset.lcsLines}`);
        if (lines.length > 2) f.push(`card ${i + 1}: ${lines.length} lines`);
        const px = parseFloat(getComputedStyle(p).fontSize);
        if (Math.abs(px - +p.dataset.lcsPx) > 0.1) f.push(`card ${i + 1}: font ${px} ≠ stamp ${p.dataset.lcsPx}`);
        [p, ...lines].forEach((el) => { if (el.scrollWidth > el.clientWidth + 0.5) f.push(`card ${i + 1}: "${word}" overflows its plate (${el.scrollWidth} > ${el.clientWidth})`); });
        if (p.getBoundingClientRect().right > c.getBoundingClientRect().right - pad + 0.6) f.push(`card ${i + 1}: plate wider than the inner cell`);
        // case rule
        const first = [...word][0];
        const noun = c.dataset.lcsNoun;
        const isUpper = first !== first.toLocaleLowerCase(lang);
        if (cardCase === 'upper') {
          if ([...word].some((ch) => ch.toLocaleLowerCase(lang) === ch && ch.toLocaleUpperCase(lang) !== ch)) f.push(`card ${i + 1}: "${word}" is not all capitals`);
        } else if (lang === 'de' && cardCase === 'keep') {
          if (noun === '0' && isUpper) f.push(`card ${i + 1}: de non-noun "${word}" capitalised`);
          if (noun === '1' && !isUpper) f.push(`card ${i + 1}: de noun "${word}" lower-cased`);
        } else {
          if (cardCase === 'keep') f.push(`card ${i + 1}: cardCase keep outside de`);
          if (isUpper) f.push(`card ${i + 1}: "${word}" capitalised under cardCase lower`);
        }
      };
      const seenW = new Set(), seenK = new Set();
      if (kind === 'word') {
        cells.forEach((c, i) => {
          if (c.dataset.lcsCard !== 'word') f.push(`card ${i + 1}: kind ${c.dataset.lcsCard}`);
          if (!c.dataset.lcsWord || !c.dataset.lcsVocab) f.push(`card ${i + 1}: unstamped`);
          if (seenW.has(c.dataset.lcsWord)) f.push(`card ${i + 1}: duplicate word "${c.dataset.lcsWord}"`); seenW.add(c.dataset.lcsWord);
          if (seenK.has(c.dataset.lcsVocab)) f.push(`card ${i + 1}: duplicate vocab ${c.dataset.lcsVocab}`); seenK.add(c.dataset.lcsVocab);
          checkImg(c, i, 1);
          checkPlate(c, i);
        });
      } else if (kind === 'twin') {
        const pics = cells.filter((c) => /^p\d+$/.test(c.dataset.lcsTwin || ''));
        const words = cells.filter((c) => /^w\d+$/.test(c.dataset.lcsTwin || ''));
        if (pics.length * 2 !== cells.length || words.length !== pics.length) f.push(`twin: ${pics.length} picture cards / ${words.length} word cards`);
        const half = cells.length / 2;
        cells.forEach((c, i) => {
          const want = i < half ? 'p' + i : 'w' + (i - half);
          if (c.dataset.lcsTwin !== want) f.push(`card ${i + 1}: twin stamp ${c.dataset.lcsTwin} ≠ ${want}`);
        });
        pics.forEach((c, i) => { checkImg(c, i, 1); if (c.querySelector('.ws-wordplate') || c.dataset.lcsWord) f.push(`picture card ${i + 1} carries a word`); });
        words.forEach((c, i) => {
          checkImg(c, half + i, 0);
          if (seenW.has(c.dataset.lcsWord)) f.push(`word card ${i + 1}: duplicate word`); seenW.add(c.dataset.lcsWord);
          checkPlate(c, half + i);
        });
        const pk = pics.map((c) => c.dataset.lcsVocab), wk = words.map((c) => c.dataset.lcsVocab);
        if (new Set(pk).size !== pk.length) f.push('twin: duplicate picture vocab');
        if (pk.slice().sort().join('|') !== wk.slice().sort().join('|')) f.push('twin: word vocab multiset ≠ picture vocab multiset');
        wk.forEach((k, i) => { if (k === pk[i]) f.push(`twin: word slot ${i} names picture slot ${i} (identity)`); });
      } else f.push(`unknown sheet kind ${kind}`);
      // pictures at the K floor
      document.querySelectorAll('[data-lcs-card] img').forEach((img, i) => {
        const b = img.getBoundingClientRect();
        if (Math.min(b.width, b.height) < 56) f.push(`picture ${i + 1} ${Math.round(b.width)} px < 56`);
      });
      return f;
    });
  },
};
