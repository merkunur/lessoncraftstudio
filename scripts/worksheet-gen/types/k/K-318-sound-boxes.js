/**
 * K-318 — Sound Boxes (nt20-C; `sound-boxes`, K, L.K.2.d — Elkonin boxes).
 * "Say it slowly, write one sound in each box." Six cream cards (2×3): a theme
 * picture over a row of dashed coral boxes, ONE PER VERIFIED GRAPHEME of the
 * picture word. A multigraph (sh, oo, ck …) is a 1.5×-wide box with a teal tie
 * arc under it (one sound, more letters). The word is never printed; the
 * segmentation is the locale's literal bank (data/b3/sound-boxes.js), never
 * inferred. nl adds hak-stippen (one teal dot over each box) at d2; d1 dots
 * everywhere; d3 never.
 *   d1 — 4 cards, 2-3 sounds, no multigraph, boxes 60, picture 160 (the
 *        design's 128/52 left a 2×2 card 57 % empty — measured, see the build report)
 *   d2 — 6 cards, 3-5 sounds, ≤ 2 wide boxes, boxes 48, picture 104 (ships)
 *   d3 — 8 cards, 4-5 sounds, ≥ 2 cards with a wide box, boxes 44, picture 68
 *        (design 80; the body is 710 px under a 3-line title + 3-line instruction,
 *        so a rows-4 card holds 131 px: 68 + 8 + 54 = 130 — measured)
 * Distinct from K-224 (word printed minus one letter), K-231 (letter bank),
 * K-233 (syllable digit), G1-244 d2 (one box per LETTER plus a ruling).
 * Design: docs/worksheet-gen/b3-designs/K-318-sound-boxes.md.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { soundBoxes, hakDots } = require('../../templates/components-b3.js');
const { sampleEntries, fileUri } = require('../../lib/b2-common.js');
const { bank } = require('../../lib/b3-common.js');
const { eligible } = require('../../lib/sound-boxes.js');

const CARD_INNER = 302;   // (675 − 14) / 2 − 12·2 padding − 2·2 border, page.css:119-137

module.exports = {
  id: 'K-318',
  slug: 'sound-boxes',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sound-boxes',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, pic: 160, box: 60, gap: 12, minG: 2, maxG: 3, maxWide: 0, minWideCards: 0, dots: 'every', band: 'K' },
    2: { cards: 6, cols: 2, rows: 3, pic: 104, picWithDots: 96, box: 48, gap: 8, minG: 3, maxG: 5, maxWide: 2, minWideCards: 0, wantWide: 1, dots: 'locale', band: 'K', poolFloor: 8 },
    3: { cards: 8, cols: 2, rows: 4, pic: 68, box: 44, gap: 8, minG: 4, maxG: 5, maxWide: 2, minWideCards: 2, dots: 'never', band: 'G1' },
  },
  i18n: {
    en: {
      title: 'Sound Boxes',
      instruction: 'Say the picture word slowly. Write one sound in each box. A wide box with a curve under it holds two letters that make one sound.',
    },
  },

  /**
   * @param {object} o { theme, difficulty, locale }
   * @param {object} ctx { rng }
   */
  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(bank('sound-boxes', loc), { theme, difficulty, locale }, ctx);   // REFUSES when the locale block is absent
  },

  /** The gate's seam: build against an explicit locale block (a poisoned bank never touches data/). */
  _buildWith(cfg, { theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const pool = eligible({ theme, loc, cfg, d, inner: CARD_INNER });
    // the theme floor is the FACE pool after segmentation (design §1), enforced
    // at the shipping difficulty; d1/d3 keep the sample-or-throw guard only
    if (d.poolFloor && pool.length < d.poolFloor) {
      throw new Error(`K-318: theme ${theme}/${loc} has ${pool.length} segmentable nouns < ${d.poolFloor} (refused)`);
    }
    // wide cards: d3 REQUIRES minWideCards (a refusal when the pool cannot);
    // d2 WANTS one (the instruction names the tie arc once, so a page should
    // show one) but never refuses a theme whose locale has no multigraph words
    let picks;
    const wide = pool.filter((e) => e.wideCount > 0);
    const need = Math.min(d.cards, d.minWideCards || Math.min(d.wantWide || 0, wide.length));
    if (need) {
      const plain = pool.filter((e) => e.wideCount === 0);
      const w = sampleEntries(rng, wide, need, 'K-318 wide cards');
      const rest = sampleEntries(rng, [...plain, ...wide.filter((e) => !w.includes(e))], d.cards - w.length, 'K-318');
      picks = rng.shuffle([...w, ...rest]);
    } else {
      picks = sampleEntries(rng, pool, d.cards, 'K-318');
    }
    const dots = d.dots === 'every' || (d.dots === 'locale' && !!cfg.dots);
    const pic = dots && d.picWithDots ? d.picWithDots : d.pic;   // the dot row costs 12 + 8 px of the 191 px a d2 stage holds
    const cards = picks.map((e) => {
      const row = soundBoxes({ chunks: e.chunks, box: e.box, gap: d.gap });
      const dotRow = dots ? hakDots({ centers: row.centers, width: row.width }) : '';
      return `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;gap:8px;padding:4px 0" ` +
        `data-lcs-word="${e.word}" data-lcs-vocab="${e.vocabKey}" data-lcs-chunks="${e.chunks.join('|')}" data-lcs-face="base">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${e.vocabKey}" style="width:${pic}px;height:${pic}px">` +
        dotRow + row.svg + `</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;min-height:0" data-ws-content data-lcs-cards="${d.cards}" ` +
        `data-lcs-ming="${d.minG}" data-lcs-maxg="${d.maxG}" data-lcs-maxwide="${d.maxWide}" data-lcs-minwidecards="${d.minWideCards}" ` +
        `data-lcs-dots="${dots ? 1 : 0}" data-lcs-inner="${CARD_INNER}" data-lcs-band="${d.band}">${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
      meta: { words: picks.map((e) => e.word), chunks: picks.map((e) => e.chunks) },
    };
  },

  /** Browser-side re-derivation from the stamps (no modules in page.evaluate). */
  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const root = document.querySelector('[data-lcs-cards]');
      if (!root) return ['no root stamp'];
      const want = +root.dataset.lcsCards, minG = +root.dataset.lcsMing, maxG = +root.dataset.lcsMaxg;
      const maxWide = +root.dataset.lcsMaxwide, minWideCards = +root.dataset.lcsMinwidecards;
      const dotsOn = root.dataset.lcsDots === '1', inner = +root.dataset.lcsInner;
      const stages = [...root.querySelectorAll('.ws-card-stage[data-lcs-word]')];
      if (stages.length !== want) fails.push(`${stages.length} cards, want ${want}`);
      const seenW = new Set(), seenK = new Set();
      let wideCards = 0;
      stages.forEach((st, i) => {
        const tag = `card ${i + 1}`;
        const word = st.dataset.lcsWord, key = st.dataset.lcsVocab;
        const chunks = (st.dataset.lcsChunks || '').split('|').filter(Boolean);
        if (seenW.has(word)) fails.push(`${tag}: duplicate word "${word}"`); seenW.add(word);
        if (seenK.has(key)) fails.push(`${tag}: duplicate noun ${key}`); seenK.add(key);
        if (!/^\p{L}+$/u.test(word)) fails.push(`${tag}: suspicious word "${word}"`);
        if (st.dataset.lcsFace !== 'base') fails.push(`${tag}: face stamp "${st.dataset.lcsFace}"`);
        if (chunks.join('') !== word.toLocaleLowerCase(lang)) fails.push(`${tag}: chunks "${chunks.join('')}" != word "${word}"`);
        if (chunks.length < minG || chunks.length > maxG) fails.push(`${tag}: ${chunks.length} sounds outside ${minG}..${maxG}`);
        const wideChunks = chunks.filter((c) => [...c].length >= 2).length;
        if (wideChunks > maxWide) fails.push(`${tag}: ${wideChunks} wide boxes > ${maxWide}`);
        if (wideChunks) wideCards++;
        // the picture
        const imgs = st.querySelectorAll('img');
        if (imgs.length !== 1) fails.push(`${tag}: ${imgs.length} pictures`);
        else if (!imgs[0].complete || imgs[0].naturalWidth === 0) fails.push(`${tag}: picture broken`);
        // the boxes
        const svg = st.querySelector('svg[data-lcs-soundboxes]');
        if (!svg) { fails.push(`${tag}: no sound boxes`); return; }
        if (+svg.dataset.lcsSoundboxes !== chunks.length) fails.push(`${tag}: svg says ${svg.dataset.lcsSoundboxes} boxes, chunks ${chunks.length}`);
        const rects = [...svg.querySelectorAll('rect[data-lcs-box]')];
        if (rects.length !== chunks.length) fails.push(`${tag}: ${rects.length} boxes for ${chunks.length} sounds`);
        rects.forEach((r, j) => {
          const isWide = [...(chunks[j] || '')].length >= 2 ? '1' : '0';
          if (r.dataset.lcsWide !== isWide) fails.push(`${tag}: box ${j + 1} wide=${r.dataset.lcsWide}, chunk "${chunks[j]}"`);
          const h = r.getBoundingClientRect().height;
          if (h < 44) fails.push(`${tag}: box ${j + 1} is ${h.toFixed(1)}px tall (< 44)`);
        });
        const ties = svg.querySelectorAll('path[data-lcs-tie]').length;
        if (ties !== wideChunks) fails.push(`${tag}: ${ties} tie arcs for ${wideChunks} wide boxes`);
        if (svg.querySelector('text')) fails.push(`${tag}: text printed inside the boxes`);
        const sw = svg.getBoundingClientRect().width;
        if (sw > inner + 0.6) fails.push(`${tag}: box row ${sw.toFixed(1)}px > ${inner}`);
        const stw = st.getBoundingClientRect().width;
        if (sw > stw + 0.6) fails.push(`${tag}: box row ${sw.toFixed(1)}px wider than its stage ${stw.toFixed(1)}`);
        // nothing squashed or clipped: .ws-card is overflow:hidden, so a stack taller
        // than the card silently loses its bottom (the page-box lint cannot see it)
        const cardBox = st.closest('.ws-card').getBoundingClientRect();
        const svgBox = svg.getBoundingClientRect();
        if (svgBox.bottom > cardBox.bottom - 1) fails.push(`${tag}: boxes reach ${svgBox.bottom.toFixed(1)} past the card bottom ${cardBox.bottom.toFixed(1)}`);
        if (svgBox.top < cardBox.top + 1) fails.push(`${tag}: boxes above the card top`);
        if (Math.abs(svgBox.height - +svg.getAttribute('height')) > 0.6) fails.push(`${tag}: box row squashed to ${svgBox.height.toFixed(1)}px`);
        if (imgs[0]) { const ib = imgs[0].getBoundingClientRect(); if (ib.height < 56 - 0.6 && lang && root.dataset.lcsBand === 'K') fails.push(`${tag}: picture ${ib.height.toFixed(1)}px < 56`); if (Math.abs(ib.height - parseFloat(imgs[0].style.height)) > 0.6) fails.push(`${tag}: picture squashed`); }
        // no visible text anywhere on the card (the word is never printed)
        const txt = (st.innerText || '').trim();
        if (txt) fails.push(`${tag}: visible text "${txt.slice(0, 24)}"`);
        // dots
        const dots = st.querySelector('svg[data-lcs-hakdots]');
        if (dotsOn) {
          if (!dots) fails.push(`${tag}: dots expected`);
          else if (+dots.dataset.lcsHakdots !== chunks.length || dots.querySelectorAll('circle').length !== chunks.length) fails.push(`${tag}: dots != boxes`);
        } else if (dots) fails.push(`${tag}: dots present`);
      });
      if (wideCards < minWideCards) fails.push(`${wideCards} cards with a wide box < ${minWideCards}`);
      return fails;
    });
  },
};
