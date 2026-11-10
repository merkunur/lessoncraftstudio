/**
 * K-497 — Step Cards: Cut, Order and Draw (How to Draw maker 2026-11-02, NEW-TEMPLATES §30 T5): the step cards of one
 * drawing printed out of order, each in a dashed cutting frame; the child cuts them out, puts them in order on the
 * numbered row, glues them, then draws the picture in the box. Sequencing with the hands (G1-418 orders the cards on the
 * page by writing numbers; this is the card game).
 *
 * The lessons' steps are built structure first, details last (lib/htd-steps.js: the outline, the big parts, the
 * features, the details), so the order is one order. The cards are shuffled with no card in its own place and never in
 * reverse (the copy's rng). Every card holds the drawing so far, so each card has more lines than the one before it — one
 * right order. Level 3 prints every card in black (no orange "new lines"): the child compares the cards to find the
 * order. (A card of only its new lines was tried and refused: the detail steps alone — an eye, a fin — have no order.)
 * The key: the cards in order on the row.
 * Levels: 1 four steps · 2 five steps · 3 five steps, every card in black.
 */
'use strict';
const H = require('../../lib/htd-faces.js');
const Hd = require('../../lib/htd-steps.js');
const C7 = require('../../templates/components-b7.js');
const T = require('../../primitives/_tokens.js').color;

// a card to cut = its picture + 24 px (card border, cutting gap, dashed frame); one row of cards beside the scissors: n × (px + 24) + (n − 1) × 8 ≤ 605
const D = { 1: { n: 4, cardPx: 120, black: false }, 2: { n: 5, cardPx: 88, black: false }, 3: { n: 5, cardPx: 88, black: true } };
const SCISSORS = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 20" data-lcs-cut-glyph="1" style="display:block"><g fill="none" stroke="${T.inkSoft}" stroke-width="2"><circle cx="5" cy="5" r="3.6"/><circle cx="5" cy="15" r="3.6"/><path d="M8 7 L24 15 M8 13 L24 5"/></g></svg>`;
/** a card's picture: the drawing up to step k, its new lines coral (levels 1-2) or everything in black (level 3) */
function cardSvg(S, k, px, black) {
  return Hd.stepSvg(S, k, { width: px, height: px, viewBox: 'bbox', lastInInk: true, shapes: false, ...(black ? { upTo: '#3A3530' } : {}) });
}
/** a shuffle with no card in its own place and not the reverse order */
function scramble(n, rng) {
  for (let t = 0; t < 200; t++) { const p = rng.shuffle(Array.from({ length: n }, (_, i) => i)); if (p.every((v, i) => v !== i) && !p.every((v, i) => v === n - 1 - i)) return p; }
  throw new Error('K-497: no scramble');
}

module.exports = {
  id: 'K-497',
  slug: 'step-cards-cut-order-draw',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'how-to-draw',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Step Cards: Cut, Order and Draw',
      instruction: 'Cut out the cards. Put the steps in order on the numbered row and glue them down. Then draw the picture in the box.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const list = H.pinned('K-497', difficulty) || H.order('K-497');
    const unit = H.pick(list, ctx, (n) => n === d.n);
    const S = H.B.stepsFor(unit);
    if (S.steps.length !== d.n) throw new Error(`K-497: ${unit} has ${S.steps.length} steps, the level wants ${d.n}`);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const px = extra ? Math.floor(d.cardPx * Math.max(0.75, 1 - extra / 500)) : d.cardPx;
    const perm = scramble(d.n, rng);
    // the cards to cut: no number on them (their order is the task); each in a dashed frame with a little gap around it
    const cut = perm.map((k, slot) => `<div data-lcs-cut="card" data-lcs-htd-cardstep="${key ? k + 1 : ''}" style="padding:7px;border:2px dashed ${T.inkSoft};border-radius:4px">${C7.htdCard({ svg: cardSvg(S, k, px, d.black), size: px, attrs: `data-lcs-htd-slot="${slot + 1}"` })}</div>`).join('');
    // the row to glue them on: numbered empty places (the key shows the cards in order)
    const place = (k) => `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><span style="font:700 20px/1 'Baloo 2',cursive;color:${T.teal}">${k + 1}</span>` +
      `<div data-lcs-htd-place="${k + 1}" style="width:${px + 6}px;height:${px + 6}px;box-sizing:border-box;border:2.5px solid ${T.teal};border-radius:12px;background:#FFFFFF;line-height:0">${key ? cardSvg(S, k, px, d.black) : ''}</div></div>`;
    const row = `<div data-lcs-htd-row="${d.n}"${key ? ' data-lcs-key-sample="order"' : ''} style="display:flex;gap:10px;justify-content:center">${Array.from({ length: d.n }, (_, k) => place(k)).join('')}</div>`;
    const cards = `<div style="display:flex;align-items:center;gap:8px">${SCISSORS}<div style="display:flex;gap:8px;justify-content:center">${cut}</div></div>`;
    const top = (px + 24) + 14 + (px + 30) + 14 + 4 + 14;
    const boxH = 716 - extra - top, boxW = Math.min(639, Math.round(boxH * 1.25));
    const box = C7.htdPaper({ w: boxW, h: boxH, role: 'primary' });
    const body = `<div style="display:flex;flex-direction:column;align-items:center;gap:14px;width:639px">${cards}${row}<div style="height:4px"></div>${box}</div>`;
    return { bodyHtml: H.root('cards', unit, body, `data-lcs-htd-steps="${d.n}" data-lcs-htd-perm="${perm.map((k) => k + 1).join('')}"${require('../../lib/fl-art.js').tap(ctx)}`), meta: { unit, perm: perm.map((k) => k + 1).join('') } };
  },

  /** the pin tool's test (tools/build-htd-face-pins.js): the lesson has exactly the level's number of steps */
  pinFits(unit, level) { return H.B.stepsFor(unit).steps.length === D[level].n; },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const R = document.querySelector('[data-lcs-htd-face]');
      const n = +R.dataset.lcsHtdSteps, perm = R.dataset.lcsHtdPerm.split('').map(Number);
      const cards = [...document.querySelectorAll('[data-lcs-cut="card"] [data-lcs-step]')].map((s) => +s.getAttribute('data-lcs-step'));
      if (cards.length !== n) fails.push(`${cards.length} cards to cut for ${n} steps`);
      if (cards.join('') !== perm.join('')) fails.push('the cards are not in the stamped order');
      if (perm.some((v, i) => v === i + 1)) fails.push('a card is already in its place');
      if ([...perm].sort().join('') !== Array.from({ length: n }, (_, i) => i + 1).join('')) fails.push('a step is missing or doubled');
      if (document.querySelectorAll('[data-lcs-htd-place]').length !== n) fails.push('the numbered row has the wrong number of places');
      document.querySelectorAll('[data-lcs-cut="card"]').forEach((c) => { if (c.querySelector('[data-lcs-htd-n]')) fails.push('a card to cut carries its step number'); });
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-cut], [data-lcs-htd-place], [data-lcs-htd-box]').forEach((e) => { const b = e.getBoundingClientRect(); if (b.right > pg.right + 1 || b.bottom > pg.bottom + 1) fails.push('apparatus outside the page'); });
      return fails;
    });
  },
};
