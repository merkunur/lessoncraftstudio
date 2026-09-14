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
 *
 * FACE KNOBS (design §3; nt20-C Phase 2, tools/b3var-rows/sound-boxes.js). Each
 * is an additive key on the resolved difficulty, read by `_buildWith` and by a
 * `verify()` branch, stamped `data-lcs-face` ONLY when declared; the base's
 * d1-d3 carry none of them and render byte-identically (tools/b3-baseline.js):
 *   countMode:true   Count the Sounds (K-329, K): no boxes — a dashed sound lane
 *                    (the child draws one dot per sound) + a numeral answer box.
 *   starter:true     First Sound Given (K-330, K): box 1 pre-printed with the
 *                    first grapheme in display case (de "Sch"); the rest as base.
 *   strip:6          Sound Strip (G1-312, G1): six rows, picture left, the SAME
 *                    six uniform boxes for every word (count hidden, no wide box
 *                    — a multigraph is written into one box).
 *   tiers:true       Syllables and Sounds (G1-313, G1): six rows, the shared
 *                    syllable arcs (primitives/syllable-arcs.js) over box
 *                    clusters grouped by syllable (inter-gap 22); the boundary is
 *                    PRINTED, so the pool is `cfg.texBoundary` only (README rule).
 *   mode:'blend'     Blend the Sounds (G1-314, G1): six rows, the graphemes
 *                    PRINTED in the boxes, three theme pictures to the right, the
 *                    child circles the one the sounds blend into.
 * Rows (G1 faces): cardGrid 1×6 → card 675 × ~106 under the worst legal chrome
 * (body 710 − 5 × 14 gaps), inner 647 × ~78 with stage padding 0 → picture 72
 * (design 80 does not fit the measured 78; G1 floor 44), a 20 px badge gap on
 * the left (G1-309 precedent), apparatus gap 16.
 * Design: docs/worksheet-gen/b3-designs/K-318-sound-boxes.md.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { soundBoxes, hakDots, soundLane } = require('../../templates/components-b3.js');
const { answerBox } = require('../../templates/components.js');
const { syllableArcs } = require('../../primitives/syllable-arcs.js');
const { entriesFor, displayWord, distinctByWord, sampleEntries, fileUri } = require('../../lib/b2-common.js');
const { bank } = require('../../lib/b3-common.js');
const { eligible } = require('../../lib/sound-boxes.js');

const CARD_INNER = 302;   // (675 − 14) / 2 − 12·2 padding − 2·2 border, page.css:119-137
const ROW_INNER = 647;    // 675 − 12·2 padding − 2·2 border (the G1 row faces)
const ROW_BADGE = 20;     // left padding of a numbered row stage (the 30 px badge sits in the card corner; G1-309 precedent)
const ROW_GAP = 16;       // picture → apparatus
const LANE_W = 230;       // Count face: lane svg 232 + 12 + answer box 56 = 300 ≤ 302
const LANE_H = 56;
const ARC_H = 22;         // Tiers face: arcs 22 + boxes 46 (+ 8 tie) = 76 ≤ 78 (the measured row inner)
const CHOICE_GAP = 12;    // Blend face: three pictures, gap 12; boxes → pictures 24

/** Which face a resolved difficulty declares (none = the base). */
function faceOf(d) {
  if (d.mode === 'blend') return 'blend';
  if (d.tiers) return 'tiers';
  if (d.strip) return 'strip';
  if (d.starter) return 'starter';
  if (d.countMode) return 'count';
  return 'base';
}

/**
 * The base's card sampling (verbatim from the shipped base path): d3 REQUIRES
 * minWideCards (a refusal when the pool cannot); d2 WANTS one (the instruction
 * names the tie arc once) but never refuses a theme whose locale has no
 * multigraph words. Shared by the base and the box-drawing faces.
 */
function pickCards(rng, pool, d) {
  const wide = pool.filter((e) => e.wideCount > 0);
  const need = Math.min(d.cards, d.minWideCards || Math.min(d.wantWide || 0, wide.length));
  if (need) {
    const plain = pool.filter((e) => e.wideCount === 0);
    const w = sampleEntries(rng, wide, need, 'K-318 wide cards');
    const rest = sampleEntries(rng, [...plain, ...wide.filter((e) => !w.includes(e))], d.cards - w.length, 'K-318');
    return rng.shuffle([...w, ...rest]);
  }
  return sampleEntries(rng, pool, d.cards, 'K-318');
}

/** The display-case first grapheme (de keeps its capital: "Sch"). */
function starterText(e, loc) {
  return displayWord(e.word, loc).slice(0, [...e.chunks[0]].length);
}

function rootOpen(d, face, extra) {
  return `<div style="flex:1;display:flex;flex-direction:column;min-height:0" data-ws-content data-lcs-cards="${d.cards}" ` +
    `data-lcs-ming="${d.minG}" data-lcs-maxg="${d.maxG}" data-lcs-maxwide="${d.maxWide}" data-lcs-minwidecards="${d.minWideCards}" ` +
    `data-lcs-dots="0" data-lcs-band="${d.band}" data-lcs-face="${face}"${extra || ''}>`;
}

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
    const face = faceOf(d);
    if (face !== 'base') return this._buildFace(face, cfg, d, { theme, locale }, ctx);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const pool = eligible({ theme, loc, cfg, d, inner: CARD_INNER });
    // the theme floor is the FACE pool after segmentation (design §1), enforced
    // at the shipping difficulty; d1/d3 keep the sample-or-throw guard only
    if (d.poolFloor && pool.length < d.poolFloor) {
      throw new Error(`K-318: theme ${theme}/${loc} has ${pool.length} segmentable nouns < ${d.poolFloor} (refused)`);
    }
    const picks = pickCards(rng, pool, d);
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

  /** The five faces (design §3). Never reached by the base's own difficulties. */
  _buildFace(face, cfg, d, { theme, locale }, ctx) {
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const rowsLayout = face === 'strip' || face === 'tiers' || face === 'blend';
    // the width the apparatus may take: a K card's 302, or what a row leaves right of the picture / pictures
    // Blend: the boxes sit in a slot as wide as the widest legal row (maxG boxes, maxWide of them wide),
    // so the three pictures form aligned columns down the page instead of a ragged edge (measured on the
    // first render: every row's pictures started at a different x)
    const boxSlot = face === 'blend' ? (d.maxG - d.maxWide) * d.box + d.maxWide * Math.round(d.box * 1.5) + d.gap * (d.maxG - 1) + 2 : 0;
    const inner = !rowsLayout ? CARD_INNER
      : face === 'blend' ? boxSlot
        : ROW_INNER - ROW_BADGE - d.pic - ROW_GAP;
    if (face === 'blend' && ROW_BADGE + boxSlot + 2 * CHOICE_GAP + d.choices * d.pic + (d.choices - 1) * CHOICE_GAP > ROW_INNER) {
      throw new Error(`K-318/blend: box slot ${boxSlot} + ${d.choices} pictures do not fit the row`);
    }
    const pool = eligible({ theme, loc, cfg, d, inner });
    if (d.poolFloor && pool.length < d.poolFloor) {
      throw new Error(`K-318/${face}: theme ${theme}/${loc} has ${pool.length} segmentable nouns < ${d.poolFloor} (refused)`);
    }
    const picks = pickCards(rng, pool, d);
    const img = (noun, key, px) => `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" data-lcs-pic="${key}" style="width:${px}px;height:${px}px">`;
    const stampsOf = (e) => `data-lcs-word="${e.word}" data-lcs-vocab="${e.vocabKey}" data-lcs-chunks="${e.chunks.join('|')}" data-lcs-face="${face}"`;
    const kStage = (e, extra, body) => `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;gap:8px;padding:4px 0" ${stampsOf(e)}${extra || ''}>` +
      img(e.noun, e.vocabKey, d.pic) + body + `</div>`;
    const rowStage = (e, extra, body) => `<div class="ws-card-stage" style="justify-content:flex-start;gap:${ROW_GAP}px;padding:0 0 0 ${ROW_BADGE}px" ${stampsOf(e)}${extra || ''}>` +
      body + `</div>`;
    let cards, extraRoot = '', meta = { words: picks.map((e) => e.word), chunks: picks.map((e) => e.chunks) };

    if (face === 'count') {
      // no boxes, no dots: a dashed lane (one dot per sound, drawn by the child) + the numeral box
      cards = picks.map((e) => kStage(e, '',
        `<div style="display:flex;align-items:center;justify-content:center;gap:12px" data-lcs-countrow="${e.chunks.length}">` +
        soundLane({ w: LANE_W, h: LANE_H }) + answerBox({ w: LANE_H, h: LANE_H, answer: e.chunks.length }) + `</div>`));
      extraRoot = ` data-lcs-inner="${CARD_INNER}"`;
    } else if (face === 'starter') {
      cards = picks.map((e) => {
        const text = starterText(e, loc);
        const row = soundBoxes({ chunks: e.chunks, box: e.box, gap: d.gap, starter: { i: 0, text } });
        return kStage(e, ` data-lcs-starter="${text}"`, row.svg);
      });
      extraRoot = ` data-lcs-inner="${CARD_INNER}"`;
    } else if (face === 'strip') {
      cards = picks.map((e) => {
        const row = soundBoxes({ chunks: e.chunks, box: d.box, gap: d.gap, uniform: d.strip });
        return rowStage(e, ` data-lcs-strip="${d.strip}"`, img(e.noun, e.vocabKey, d.pic) + row.svg);
      });
      extraRoot = ` data-lcs-inner="${inner}" data-lcs-strip="${d.strip}"`;
    } else if (face === 'tiers') {
      cards = picks.map((e) => {
        const row = soundBoxes({ chunks: e.chunks, box: e.box, gap: d.gap, sylRows: e.rows, interGap: d.interGap || 22 });
        const arcs = syllableArcs({ spans: row.spans, w: row.width, h: ARC_H, mode: 'printed' });
        return rowStage(e, ` data-lcs-syl="${e.rows.map((r) => r.length).join('|')}"`,
          img(e.noun, e.vocabKey, d.pic) +
          `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0" data-lcs-tiers>${arcs}${row.svg}</div>`);
      });
      meta.syllables = picks.map((e) => e.rows.map((r) => r.join('')));
      extraRoot = ` data-lcs-inner="${inner}" data-lcs-minsyl="${d.minSyl}" data-lcs-maxsyl="${d.maxSyl}"`;
    } else if (face === 'blend') {
      // distractors: any theme noun with a picture (design: "need only a picture"), distinct from every
      // target and from each other — every picture on the page is a different noun (18 = 6 + 12)
      const targetKeys = new Set(picks.map((e) => e.vocabKey)), targetWords = new Set(picks.map((e) => e.word.toLocaleLowerCase(loc)));
      const foils = distinctByWord(entriesFor(theme, loc).map((x) => ({ ...x, word: displayWord(x.singular, loc) }))
        .filter((x) => !targetKeys.has(x.vocabKey) && !targetWords.has(x.word.toLocaleLowerCase(loc))), (x) => x.word.toLocaleLowerCase(loc));
      const need = d.cards * (d.choices - 1);
      const chosen = sampleEntries(rng, foils, need, `K-318/blend distractors (${theme}/${loc})`);
      // the target's slot: every position twice over six rows, shuffled (never a constant column)
      const slots = rng.shuffle(picks.map((_, i) => i % d.choices));
      cards = picks.map((e, i) => {
        const cap = cfg.capitalBox1 ? [displayWord(e.word, loc).slice(0, [...e.chunks[0]].length), ...e.chunks.slice(1)] : e.chunks;
        const row = soundBoxes({ chunks: cap, box: e.box, gap: d.gap, printed: true });
        const mine = chosen.slice(i * (d.choices - 1), (i + 1) * (d.choices - 1));
        const choices = [];
        for (let k = 0, f = 0; k < d.choices; k++) choices.push(k === slots[i] ? e : mine[f++]);
        return rowStage(e, ` data-lcs-target="${e.vocabKey}"`,
          `<div style="width:${boxSlot}px;flex:none;display:flex;align-items:center" data-lcs-boxslot="${boxSlot}">${row.svg}</div>` +
          `<div style="display:flex;align-items:center;gap:${CHOICE_GAP}px;margin-left:${2 * CHOICE_GAP - ROW_GAP}px" data-lcs-choices="${d.choices}">` +
          choices.map((c) => `<img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" data-lcs-choice="${c.vocabKey}" style="width:${d.pic}px;height:${d.pic}px">`).join('') + `</div>`);
      });
      meta.distractors = chosen.map((x) => x.word);
      extraRoot = ` data-lcs-inner="${inner}" data-lcs-choices="${d.choices}"`;
    }
    return { bodyHtml: rootOpen(d, face, extraRoot) + cardGrid({ cards, cols: d.cols, rows: d.rows }) + `</div>`, meta };
  },

  /** Browser-side re-derivation from the stamps (no modules in page.evaluate). */
  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const root = document.querySelector('[data-lcs-cards]');
      if (!root) return ['no root stamp'];
      const face = root.dataset.lcsFace || 'base';
      const want = +root.dataset.lcsCards, minG = +root.dataset.lcsMing, maxG = +root.dataset.lcsMaxg;
      const maxWide = +root.dataset.lcsMaxwide, minWideCards = +root.dataset.lcsMinwidecards;
      const dotsOn = root.dataset.lcsDots === '1', inner = +root.dataset.lcsInner;
      const picFloor = root.dataset.lcsBand === 'K' ? 56 : 44;
      const stages = [...root.querySelectorAll('.ws-card-stage[data-lcs-word]')];
      if (stages.length !== want) fails.push(`${stages.length} cards, want ${want}`);
      const seenW = new Set(), seenK = new Set(), seenPic = new Set();
      let wideCards = 0;
      const slots = [];
      let choiceX = null;
      // shared geometry checks: the box row inside its card, unsquashed, ≥ 44 tall, ≤ inner
      const rowChecks = (tag, st, svg, chunksLen) => {
        const rects = [...svg.querySelectorAll('rect[data-lcs-box]')];
        rects.forEach((r, j) => { const h = r.getBoundingClientRect().height; if (h < 44) fails.push(`${tag}: box ${j + 1} is ${h.toFixed(1)}px tall (< 44)`); });
        const sw = svg.getBoundingClientRect().width;
        if (sw > inner + 0.6) fails.push(`${tag}: box row ${sw.toFixed(1)}px > ${inner}`);
        const stw = st.getBoundingClientRect().width;
        if (sw > stw + 0.6) fails.push(`${tag}: box row ${sw.toFixed(1)}px wider than its stage ${stw.toFixed(1)}`);
        const cardBox = st.closest('.ws-card').getBoundingClientRect();
        const svgBox = svg.getBoundingClientRect();
        if (svgBox.bottom > cardBox.bottom - 1) fails.push(`${tag}: boxes reach ${svgBox.bottom.toFixed(1)} past the card bottom ${cardBox.bottom.toFixed(1)}`);
        if (svgBox.top < cardBox.top + 1) fails.push(`${tag}: boxes above the card top`);
        if (svgBox.right > cardBox.right - 1) fails.push(`${tag}: boxes reach ${svgBox.right.toFixed(1)} past the card right ${cardBox.right.toFixed(1)}`);
        if (Math.abs(svgBox.height - +svg.getAttribute('height')) > 0.6) fails.push(`${tag}: box row squashed to ${svgBox.height.toFixed(1)}px`);
        return rects;
      };
      const picChecks = (tag, st, imgs) => {
        imgs.forEach((im, k) => {
          if (!im.complete || im.naturalWidth === 0) { fails.push(`${tag}: picture ${k + 1} broken`); return; }
          const ib = im.getBoundingClientRect();
          if (ib.height < picFloor - 0.6) fails.push(`${tag}: picture ${k + 1} ${ib.height.toFixed(1)}px < ${picFloor}`);
          if (Math.abs(ib.height - parseFloat(im.style.height)) > 0.6) fails.push(`${tag}: picture ${k + 1} squashed`);
          const cardBox = st.closest('.ws-card').getBoundingClientRect();
          if (ib.top < cardBox.top || ib.bottom > cardBox.bottom || ib.right > cardBox.right) fails.push(`${tag}: picture ${k + 1} outside its card`);
        });
      };
      stages.forEach((st, i) => {
        const tag = `card ${i + 1}`;
        const word = st.dataset.lcsWord, key = st.dataset.lcsVocab;
        const chunks = (st.dataset.lcsChunks || '').split('|').filter(Boolean);
        if (seenW.has(word)) fails.push(`${tag}: duplicate word "${word}"`); seenW.add(word);
        if (seenK.has(key)) fails.push(`${tag}: duplicate noun ${key}`); seenK.add(key);
        if (!/^\p{L}+$/u.test(word)) fails.push(`${tag}: suspicious word "${word}"`);
        if (st.dataset.lcsFace !== face) fails.push(`${tag}: face stamp "${st.dataset.lcsFace}" (root ${face})`);
        if (chunks.join('') !== word.toLocaleLowerCase(lang)) fails.push(`${tag}: chunks "${chunks.join('')}" != word "${word}"`);
        if (chunks.length < minG || chunks.length > maxG) fails.push(`${tag}: ${chunks.length} sounds outside ${minG}..${maxG}`);
        const wideChunks = chunks.filter((c) => [...c].length >= 2).length;
        if (wideChunks > maxWide) fails.push(`${tag}: ${wideChunks} wide boxes > ${maxWide}`);
        if (wideChunks) wideCards++;
        const imgs = [...st.querySelectorAll('img')];
        const txt = (st.innerText || '').replace(/\s+/g, '');
        const svg = st.querySelector('svg[data-lcs-soundboxes]');

        if (face === 'base' || face === 'starter') {
          if (imgs.length !== 1) fails.push(`${tag}: ${imgs.length} pictures`);
          picChecks(tag, st, imgs.slice(0, 1));
          if (!svg) { fails.push(`${tag}: no sound boxes`); return; }
          if (+svg.dataset.lcsSoundboxes !== chunks.length) fails.push(`${tag}: svg says ${svg.dataset.lcsSoundboxes} boxes, chunks ${chunks.length}`);
          const rects = rowChecks(tag, st, svg, chunks.length);
          if (rects.length !== chunks.length) fails.push(`${tag}: ${rects.length} boxes for ${chunks.length} sounds`);
          rects.forEach((r, j) => {
            const isWide = [...(chunks[j] || '')].length >= 2 ? '1' : '0';
            if (r.dataset.lcsWide !== isWide) fails.push(`${tag}: box ${j + 1} wide=${r.dataset.lcsWide}, chunk "${chunks[j]}"`);
          });
          const ties = svg.querySelectorAll('path[data-lcs-tie]').length;
          if (ties !== wideChunks) fails.push(`${tag}: ${ties} tie arcs for ${wideChunks} wide boxes`);
          if (face === 'base') {
            if (svg.querySelector('text')) fails.push(`${tag}: text printed inside the boxes`);
            if (txt) fails.push(`${tag}: visible text "${txt.slice(0, 24)}"`);
          } else {
            // First Sound Given: exactly box 1 carries the first grapheme in display case, nothing else is visible
            const printed = [...svg.querySelectorAll('text[data-lcs-printed]')];
            const starter = st.dataset.lcsStarter || '';
            if (printed.length !== 1 || printed[0].dataset.lcsPrinted !== '0') fails.push(`${tag}: ${printed.length} printed boxes (want box 1 only)`);
            const t0 = printed[0] ? printed[0].textContent : '';
            if (t0 !== starter) fails.push(`${tag}: box 1 prints "${t0}", stamp says "${starter}"`);
            if (t0.toLocaleLowerCase(lang) !== chunks[0]) fails.push(`${tag}: box 1 prints "${t0}", first sound is "${chunks[0]}"`);
            if (word.slice(0, [...t0].length) !== t0) fails.push(`${tag}: starter "${t0}" is not the word's own first letters`);
            if (txt !== t0.replace(/\s+/g, '')) fails.push(`${tag}: visible text "${txt.slice(0, 24)}" beyond the starter`);
          }
          const dots = st.querySelector('svg[data-lcs-hakdots]');
          if (dotsOn) {
            if (!dots) fails.push(`${tag}: dots expected`);
            else if (+dots.dataset.lcsHakdots !== chunks.length || dots.querySelectorAll('circle').length !== chunks.length) fails.push(`${tag}: dots != boxes`);
          } else if (dots) fails.push(`${tag}: dots present`);
          return;
        }

        if (face === 'count') {
          if (imgs.length !== 1) fails.push(`${tag}: ${imgs.length} pictures`);
          picChecks(tag, st, imgs.slice(0, 1));
          if (svg) fails.push(`${tag}: sound boxes drawn on a Count card`);
          if (st.querySelector('svg[data-lcs-hakdots]')) fails.push(`${tag}: dots on a Count card`);
          const lane = st.querySelector('svg[data-lcs-soundlane]');
          if (!lane) fails.push(`${tag}: no sound lane`);
          else {
            if (lane.querySelector('line, circle, text')) fails.push(`${tag}: the lane carries a tick or a mark`);
            const lb = lane.getBoundingClientRect(), cb = st.closest('.ws-card').getBoundingClientRect();
            if (lb.height < 44) fails.push(`${tag}: lane ${lb.height.toFixed(1)}px tall (< 44)`);
            if (lb.bottom > cb.bottom - 1 || lb.top < cb.top + 1) fails.push(`${tag}: lane outside its card`);
          }
          const box = st.querySelector('.ws-answerbox[data-lcs-answer]');
          if (!box) fails.push(`${tag}: no answer box`);
          else {
            if (+box.dataset.lcsAnswer !== chunks.length) fails.push(`${tag}: answer ${box.dataset.lcsAnswer}, sounds ${chunks.length}`);
            if (box.textContent.trim()) fails.push(`${tag}: the answer box prints "${box.textContent.trim()}"`);
            const bb = box.getBoundingClientRect();
            if (bb.width < 44 || bb.height < 44) fails.push(`${tag}: answer box ${bb.width.toFixed(0)}×${bb.height.toFixed(0)} (< 44)`);
          }
          const rowEl = st.querySelector('[data-lcs-countrow]');
          if (rowEl) { const rw = rowEl.getBoundingClientRect().width; if (rw > inner + 0.6) fails.push(`${tag}: lane row ${rw.toFixed(1)}px > ${inner}`); }
          if (txt) fails.push(`${tag}: visible text "${txt.slice(0, 24)}"`);
          if (/\d/.test(st.innerHTML.replace(/<[^>]+>/g, ''))) fails.push(`${tag}: a digit is visible`);
          return;
        }

        if (face === 'strip') {
          const n = +root.dataset.lcsStrip;
          if (imgs.length !== 1) fails.push(`${tag}: ${imgs.length} pictures`);
          picChecks(tag, st, imgs.slice(0, 1));
          if (!svg) { fails.push(`${tag}: no strip`); return; }
          if (+svg.dataset.lcsStrip !== n || +svg.dataset.lcsSoundboxes !== n || +st.dataset.lcsStrip !== n) fails.push(`${tag}: strip is not ${n} boxes`);
          const rects = rowChecks(tag, st, svg, n);
          if (rects.length !== n) fails.push(`${tag}: ${rects.length} boxes on a ${n}-strip`);
          if (chunks.length > n) fails.push(`${tag}: ${chunks.length} sounds do not fit ${n} boxes`);
          if (rects.some((r) => r.dataset.lcsWide !== '0')) fails.push(`${tag}: a wide box on the strip (the count would leak)`);
          const w0 = rects.length ? +rects[0].getAttribute('width') : 0;
          if (rects.some((r) => +r.getAttribute('width') !== w0)) fails.push(`${tag}: strip boxes are not uniform`);
          if (svg.querySelector('path[data-lcs-tie], text')) fails.push(`${tag}: a tie or text on the strip`);
          if (txt) fails.push(`${tag}: visible text "${txt.slice(0, 24)}"`);
          return;
        }

        if (face === 'tiers') {
          const minSyl = +root.dataset.lcsMinsyl, maxSyl = +root.dataset.lcsMaxsyl;
          if (imgs.length !== 1) fails.push(`${tag}: ${imgs.length} pictures`);
          picChecks(tag, st, imgs.slice(0, 1));
          const syl = (st.dataset.lcsSyl || '').split('|').filter(Boolean).map(Number);
          if (syl.length < minSyl || syl.length > maxSyl) fails.push(`${tag}: ${syl.length} syllables outside ${minSyl}..${maxSyl}`);
          if (syl.reduce((a, b) => a + b, 0) !== chunks.length) fails.push(`${tag}: syllable sizes ${syl.join('+')} != ${chunks.length} sounds`);
          if (syl.some((s) => !(s >= 1))) fails.push(`${tag}: an empty syllable`);
          if (!svg) { fails.push(`${tag}: no sound boxes`); return; }
          if (svg.dataset.lcsSylboxes !== syl.join('|')) fails.push(`${tag}: boxes grouped ${svg.dataset.lcsSylboxes}, stamp ${syl.join('|')}`);
          const rects = rowChecks(tag, st, svg, chunks.length);
          if (rects.length !== chunks.length) fails.push(`${tag}: ${rects.length} boxes for ${chunks.length} sounds`);
          rects.forEach((r, j) => { const isWide = [...(chunks[j] || '')].length >= 2 ? '1' : '0'; if (r.dataset.lcsWide !== isWide) fails.push(`${tag}: box ${j + 1} wide=${r.dataset.lcsWide}, chunk "${chunks[j]}"`); });
          if (svg.querySelectorAll('path[data-lcs-tie]').length !== wideChunks) fails.push(`${tag}: tie arcs != wide boxes`);
          if (svg.querySelector('text')) fails.push(`${tag}: text printed inside the boxes`);
          const arcs = st.querySelector('svg[data-lcs-arcs]');
          if (!arcs) { fails.push(`${tag}: no syllable arcs`); return; }
          if (+arcs.dataset.lcsArcs !== syl.length || arcs.dataset.lcsArcmode !== 'printed') fails.push(`${tag}: ${arcs.dataset.lcsArcs} ${arcs.dataset.lcsArcmode} arcs for ${syl.length} syllables`);
          // every box centre sits under its own syllable's arc, and no arc covers a foreign box (measured in px)
          const paths = [...arcs.querySelectorAll('path[data-lcs-arc]')].map((p) => p.getBoundingClientRect());
          let j = 0;
          syl.forEach((count, s) => {
            const a = paths[s];
            for (let k = 0; k < count; k++, j++) {
              const r = rects[j]; if (!r || !a) continue;
              const rb = r.getBoundingClientRect(); const cx = rb.left + rb.width / 2;
              if (cx < a.left - 1 || cx > a.right + 1) fails.push(`${tag}: box ${j + 1} is not under arc ${s + 1}`);
            }
          });
          rects.forEach((r, k) => { const rb = r.getBoundingClientRect(); const cx = rb.left + rb.width / 2; const under = paths.filter((a) => cx >= a.left - 1 && cx <= a.right + 1).length; if (under !== 1) fails.push(`${tag}: box ${k + 1} lies under ${under} arcs`); });
          const ab = arcs.getBoundingClientRect(), sb = svg.getBoundingClientRect(), cb = st.closest('.ws-card').getBoundingClientRect();
          if (ab.bottom > sb.top + 0.6) fails.push(`${tag}: arcs overlap the boxes`);
          if (ab.top < cb.top + 1) fails.push(`${tag}: arcs above the card top`);
          if (txt) fails.push(`${tag}: visible text "${txt.slice(0, 24)}"`);
          return;
        }

        if (face === 'blend') {
          const nChoices = +root.dataset.lcsChoices;
          const target = st.dataset.lcsTarget;
          if (target !== key) fails.push(`${tag}: target ${target} != noun ${key}`);
          if (!svg) { fails.push(`${tag}: no sound boxes`); return; }
          const rects = rowChecks(tag, st, svg, chunks.length);
          if (rects.length !== chunks.length) fails.push(`${tag}: ${rects.length} boxes for ${chunks.length} sounds`);
          const printed = [...svg.querySelectorAll('text[data-lcs-printed]')];
          if (printed.length !== chunks.length) fails.push(`${tag}: ${printed.length} printed boxes for ${chunks.length} sounds`);
          const joined = printed.map((t) => t.textContent).join('');
          if (joined.toLocaleLowerCase(lang) !== word.toLocaleLowerCase(lang)) fails.push(`${tag}: boxes print "${joined}", word "${word}"`);
          if (joined !== word) fails.push(`${tag}: boxes print "${joined}" (display case "${word}")`);
          printed.forEach((t, j) => { if (t.textContent.toLocaleLowerCase(lang) !== chunks[j]) fails.push(`${tag}: box ${j + 1} prints "${t.textContent}", chunk "${chunks[j]}"`); });
          rects.forEach((r, j) => { const isWide = [...(chunks[j] || '')].length >= 2 ? '1' : '0'; if (r.dataset.lcsWide !== isWide) fails.push(`${tag}: box ${j + 1} wide=${r.dataset.lcsWide}, chunk "${chunks[j]}"`); });
          if (svg.querySelectorAll('path[data-lcs-tie]').length !== wideChunks) fails.push(`${tag}: tie arcs != wide boxes`);
          // each printed grapheme fits its own box
          printed.forEach((t, j) => { const tb = t.getBoundingClientRect(), rb = rects[j] && rects[j].getBoundingClientRect(); if (rb && (tb.left < rb.left || tb.right > rb.right)) fails.push(`${tag}: "${t.textContent}" overflows box ${j + 1}`); });
          if (txt !== word.replace(/\s+/g, '')) fails.push(`${tag}: visible text "${txt.slice(0, 24)}" != the printed word`);
          const choices = [...st.querySelectorAll('img[data-lcs-choice]')];
          if (choices.length !== nChoices) fails.push(`${tag}: ${choices.length} pictures, want ${nChoices}`);
          if (imgs.length !== nChoices) fails.push(`${tag}: ${imgs.length} images`);
          picChecks(tag, st, imgs);
          const hits = choices.filter((c) => c.dataset.lcsChoice === target);
          if (hits.length !== 1) fails.push(`${tag}: ${hits.length} pictures match the target`);
          const keys = choices.map((c) => c.dataset.lcsChoice);
          if (new Set(keys).size !== keys.length) fails.push(`${tag}: a picture repeats in the row`);
          keys.forEach((k) => { if (seenPic.has(k)) fails.push(`${tag}: picture ${k} already on the page`); seenPic.add(k); });
          slots.push(choices.findIndex((c) => c.dataset.lcsChoice === target));
          const cb = st.closest('.ws-card').getBoundingClientRect();
          choices.forEach((c, k) => { const b = c.getBoundingClientRect(); if (b.right > cb.right - 1) fails.push(`${tag}: picture ${k + 1} past the card right`); });
          // the boxes never touch the pictures
          const sb = svg.getBoundingClientRect(); const first = choices[0] && choices[0].getBoundingClientRect();
          if (first && first.left < sb.right + 8) fails.push(`${tag}: pictures ${(first.left - sb.right).toFixed(1)}px from the boxes (< 8)`);
          if (first) { if (choiceX == null) choiceX = first.left; else if (Math.abs(first.left - choiceX) > 0.6) fails.push(`${tag}: pictures start at ${first.left.toFixed(1)}, row 1 at ${choiceX.toFixed(1)} (ragged columns)`); }
          return;
        }
        fails.push(`${tag}: unknown face "${face}"`);
      });
      if (face === 'base' || face === 'starter') { if (wideCards < minWideCards) fails.push(`${wideCards} cards with a wide box < ${minWideCards}`); }
      if (face === 'blend' && slots.length > 1 && new Set(slots).size < 2) fails.push(`the answer is always picture ${slots[0] + 1} (a positional cue)`);
      return fails;
    });
  },
};
