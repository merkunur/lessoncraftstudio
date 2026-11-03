/**
 * K-563 — The Room from Above (Maps & Coordinates maker 2026-11-03, NEW-TEMPLATES §54 T4; the first plan-reading skill:
 * SLO "plattegrond", Lehrplan "Grundriss", programmes "plan de la classe"): a room drawn from above — walls, a door, a
 * window — with its furniture in top view (primitives/top-side-view.js, the K-377 drawings: bed, sofa, bookshelf, chair,
 * round table, lamp — the pairs a child confuses from above never on one page, data/b5/maps.js TOPSIDE_NEVER_TOGETHER);
 * beside it the same things seen from the side. The child draws a line from each thing to its place on the plan. No
 * word on the page: the plan's things carry a letter, and the key badges each side view with its letter.
 * Levels: 1 four things · 2 six things · 3 six things, the plan's things turned a quarter (the width no longer gives the
 * answer — read the shape).
 */
'use strict';
const { topSideView } = require('../../primitives/top-side-view.js');
const { MAPS } = require('../../data/b5/maps.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 4, turn: false }, 2: { n: 6, turn: false }, 3: { n: 6, turn: true } };
const ROOM = ['bed', 'sofa', 'bookshelf', 'chair', 'roundTable', 'lamp'];
// six places on the plan (a 3 × 2 layout inside the walls), each 120 × 120
const SLOTS = [[30, 44], [175, 44], [320, 44], [30, 230], [175, 230], [320, 230]];   // the door swings below the second row

module.exports = {
  id: 'K-563',
  slug: 'room-plan-from-above',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'maps',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'The Room from Above', instruction: 'Each thing is drawn from the side. Draw a line to the same thing in the room seen from above.' } },

  build({ difficulty }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng;
    const never = (MAPS.TOPSIDE_NEVER_TOGETHER || []).concat(MAPS.TOPSIDE_NEVER_TOGETHER_LS || []);
    let things;
    for (let t = 0; t < 200; t++) {
      const s = rng.sample(ROOM, d.n);
      if (!never.some(([a, b]) => s.includes(a) && s.includes(b))) { things = s; break; }
    }
    if (!things) throw new Error('K-563: no set of things');
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const slots = rng.sample(SLOTS, d.n);
    const letters = 'ABCDEF';
    // the plan: letters in reading order of the places (A top left …), so a letter tells nothing about the side views
    const placed = things.map((m, i) => ({ m, slot: slots[i] })).sort((a, b) => a.slot[1] - b.slot[1] || a.slot[0] - b.slot[0]).map((x, i) => ({ ...x, letter: letters[i] }));
    const letterOf = new Map(placed.map((x) => [x.m, x.letter]));
    const W = 470, H = 420;
    const plan = `<div data-lcs-room-plan style="position:relative;width:${W}px;height:${H}px;flex:0 0 auto;background:#FFFFFF;border:8px solid ${T.ink};box-sizing:content-box">` +
      // the door (a gap with its swing) and the window (a double line) on the walls
      `<svg width="${W}" height="${H}" style="position:absolute;left:0;top:0" aria-hidden="true"><rect x="${W - 86}" y="${H - 4}" width="56" height="12" fill="#FFFFFF"/><path d="M${W - 30},${H} A56,56 0 0 0 ${W - 86},${H - 56}" fill="none" stroke="${T.grid}" stroke-width="2.5" stroke-dasharray="6 5"/><line x1="${W - 86}" y1="${H}" x2="${W - 86}" y2="${H - 56}" stroke="${T.ink}" stroke-width="3"/>` +
      `<rect x="150" y="-8" width="170" height="8" fill="#FFFFFF"/><line x1="150" y1="-5" x2="320" y2="-5" stroke="${T.teal}" stroke-width="2.5"/><line x1="150" y1="-1" x2="320" y2="-1" stroke="${T.teal}" stroke-width="2.5"/></svg>` +
      placed.map(({ m, slot, letter }) => `<div data-lcs-pair="${letter}" data-lcs-label="${letter}" data-lcs-room-thing="${m}" style="position:absolute;left:${slot[0]}px;top:${slot[1]}px;width:120px;height:120px;display:flex;align-items:center;justify-content:center">` +
        topSideView({ model: m, view: 'top', box: 100, turn: d.turn ? rng.pick([90, 270]) : 0 }).svg +
        `<span style="position:absolute;left:0;top:0;width:26px;height:26px;border-radius:13px;background:${T.teal};color:#FFFFFF;display:flex;align-items:center;justify-content:center;font:700 15px/1 'Baloo 2',cursive">${letter}</span></div>`).join('') + '</div>';
    const sides = rng.shuffle(things.slice()).map((m, i) => `<div data-lcs-room-side="${m}"${mark ? ` data-lcs-key-badge="${letterOf.get(m)}"` : ''} style="display:flex;align-items:center;justify-content:center;width:120px;height:${d.n > 4 ? 100 : 130}px;border-radius:14px;background:${T.cream}">` +
      topSideView({ model: m, view: 'side', box: d.n > 4 ? 84 : 100 }).svg + '</div>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-room style="flex:1;display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:0;padding:0 6px">` +
        `<div style="display:flex;flex-direction:column;justify-content:space-evenly;align-self:stretch;gap:10px">${sides.join('')}</div>${plan}</div>`,
      meta: { things, letters: Object.fromEntries(letterOf) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const sides = [...document.querySelectorAll('[data-lcs-room-side]')].map((e) => e.dataset.lcsRoomSide);
      const plan = [...document.querySelectorAll('[data-lcs-room-thing]')].map((e) => e.dataset.lcsRoomThing);
      if (sides.length < 4) fails.push(`${sides.length} things`);
      if ([...sides].sort().join() !== [...plan].sort().join()) fails.push('the side views and the plan hold different things');
      const root = document.querySelector('[data-lcs-room]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-room-side], [data-lcs-room-plan]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('a block leaves the page'); });
      return fails;
    });
  },
};
