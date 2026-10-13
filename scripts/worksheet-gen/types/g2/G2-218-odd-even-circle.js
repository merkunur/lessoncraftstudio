/**
 * G2-218 — Odd or even (two-digit): circle all the ODD numbers in the grid.
 * Guaranteed mix: at least a third of each parity.
 *
 * REDESIGNED 2026-10-13 (Number Charts Level Set): the 4-column grid of 84-px cards floated in the middle of the page
 * (41% of it used). The cards now fill the body — the grid stretches to its height, the numerals grow with the card.
 * The numbers (the rng draw) are unchanged.
 * Level Set: level 1 twelve numbers up to 50, level 2 the published sixteen up to 99, level 3 twenty up to 999.
 * Screen: tap every odd number (tap-select); key: every odd number ringed.
 */
'use strict';
const NCS = require('../../lib/number-charts-screen.js');
const { pageFill } = require('../../lib/page-fill.js');

const CORAL = '#F2784B';
const BODY_H = 740;   // the body measures 799-811 px (2026-10-13); the grid keeps a margin for a long instruction

module.exports = {
  id: 'G2-218',
  slug: 'odd-and-even-numbers',
  gradeBand: 'G23',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: false },
  difficulty: {
    1: { count: 12, max: 50 },
    2: { count: 16, max: 99 },
    3: { count: 20, max: 999 },
  },
  interactive: NCS.interactiveFor('select', 'odd'),
  i18n: {
    en: {
      title: 'Odd Number Hunt',
      instruction: 'Circle every ODD number. Look at the last digit to decide.',
    },
  },
  levelSetWords(m) { return (m.asks || []).map(String); },

  build(args, ctx) {
    const { difficulty } = args;
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const third = Math.ceil(d.count / 3);
    const vals = new Set();
    // guarantee parity mix, then fill randomly
    while ([...vals].filter((v) => v % 2 === 1).length < third) vals.add(rng.int(5, d.max) | 1);
    while ([...vals].filter((v) => v % 2 === 0).length < third) vals.add((rng.int(5, d.max) | 1) - 1);
    let guard = 0;
    while (vals.size < d.count && guard++ < 300) vals.add(rng.int(10, d.max));
    const order = rng.shuffle([...vals]).slice(0, d.count);
    const cols = 4, rows = Math.ceil(order.length / cols);
    const gapY = rows <= 3 ? 40 : 22, gapX = 30;
    const cellH = Math.min(200, Math.floor((BODY_H - (rows - 1) * gapY) / rows));
    const fs = Math.round(Math.min(64, cellH * (d.max > 99 ? 0.4 : 0.48)));
    const ring = !!(ctx && ctx.answerKey && !ctx.interactive);
    const cells = order.map((v) =>
      `<span class="ws-pattern-slot" style="width:100%;height:${cellH}px;font-family:'Baloo 2';font-weight:700;font-size:${fs}px;color:#3A3530` +
      `${ring && v % 2 === 1 ? `;border:4px solid ${CORAL};border-radius:999px` : ''}" ` +
      `data-lcs-val="${v}"${v % 2 === 1 ? ' data-lcs-target="1"' : ''}>${v}</span>`).join('');
    const b = {
      bodyHtml:
        `<div data-ws-content style="flex:1 1 auto;display:flex;align-items:center;justify-content:center">` +
        `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:${gapY}px ${gapX}px;width:100%;max-width:640px">${cells}</div>` +
        `</div>`,
      meta: { odds: order.filter((v) => v % 2 === 1).length, asks: order.map(String) },
    };
    if (ctx && ctx.interactive) {
      const loc = (args.locale || 'en').slice(0, 2);
      const items = order.map((v) => ({ v, hit: v % 2 === 1, meta: { 'data-lcs-kind': 'odd' } }));
      return { bodyHtml: NCS.selectScreen(items, NCS.saltOf({ ...ctx, locale: loc }, items.map((x) => ({ q: x.v }))), { cols: 4, cell: d.max > 99 ? 140 : 130 }), meta: b.meta };
    }
    return b;
  },

  async verify(page) {
    const fails = await page.evaluate(() => {
      const fails = [];
      const cells = [...document.querySelectorAll('[data-lcs-val]')];
      cells.forEach((c) => {
        const v = parseInt(c.dataset.lcsVal, 10);
        const marked = !!c.dataset.lcsTarget;
        if ((v % 2 === 1) !== marked) fails.push(`${v}: parity mark wrong`);
        if (c.textContent.trim() !== String(v)) fails.push(`${v}: text mismatch`);
      });
      const odds = cells.filter((c) => c.dataset.lcsTarget).length;
      if (odds < 3 || cells.length - odds < 3) fails.push('parity mix too thin');
      return fails;
    });
    // 2026-10-13: the grid must use the page (it floated in the middle of it, 41%)
    if (await page.evaluate(() => !document.querySelector('[data-lcs-screen]'))) fails.push(...(await page.evaluate(pageFill)).fails);
    return fails;
  },
};
