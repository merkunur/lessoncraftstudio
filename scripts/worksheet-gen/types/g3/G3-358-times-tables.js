/**
 * G3-358 — Multiplication tables drill (the "tabuada / Einmaleins / tafels"
 * query face — bare-fact fluency, distinct from the arrays-multiplication
 * concept family). CCSS 3.OA.C.7 / de kleines Einmaleins / nl de tafels.
 * Per-locale conventions honored at BUILD time (the locale reaches build):
 *  - operator glyph: middle dot (·) for de/sv/da/no/fi, × elsewhere
 *  - table mode row order: multiplier-first (1×4, 2×4 …) — the native
 *    "tafel van 4" / Einmaleins-Reihe column form everywhere it applies
 * d1: facts of the easy tables 2, 5, 10 · d2: mixed facts 2-10 (published) · d3: the box first, second or product.
 *
 * Level Set (2026-10-13, PDF + interactive + key). The per-table faces (G3-364..368 for 2, 5, 10, 3, 4 and the new
 * G3-402..405 for 6, 7, 8, 9) take their three levels from tableLevels(N) — never written into the variation files,
 * so a regenerated variation file cannot flatten them (Hundreds Chart lesson, 2026-10-08):
 *   L1 'ladder'  the table in order with the anchor facts ×1, ×5, ×10 already worked (a child counts on from them);
 *                copy plan up / down (seedVariant 1 / 2)
 *   L2 'table'   the published ladder (copy 1, facts unchanged) · copy plans: down, turned around (N × 1, N × 2 …)
 *   L3 'tmix'    the ten facts in a shuffled order, four of them asking the missing factor (☐ × N = 21 · N × ☐ = 21)
 * Every page draws its equations large in two columns (2026-10-13: 28-px equations covered 9-14% of their cards —
 * the Mental Math defect of the same nt20 batch, fixed the same way).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');

const DOT_LOCALES = new Set(['de', 'sv', 'da', 'no', 'fi']);
// sizes by card count: a 12-card page (2 × 6) has shorter cards than a 10-card table page (2 × 5) — each fills its
// cards (≥ 25%) without a box first in a card reaching the number badge
const SIZES = { 12: { fs: 48, box: { w: 84, h: 68 } }, 10: { fs: 58, box: { w: 100, h: 80 } } };
const pen = (FS, BOX) => ({
  BOX,
  NUM: (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS}px;color:#3A3530">${v}</span>`,
  OPX: (g) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS - 6}px;color:#146B5E">${g}</span>`,
  EQ: () => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS - 6}px;color:#8A8276">=</span>`,
  // an anchor fact the child counts on from: the product printed in a solid box where the others have an empty one
  GIVEN: (v) => `<span class="ws-givenbox" data-lcs-given="${v}" style="display:inline-flex;align-items:center;justify-content:center;` +
    `width:${BOX.w}px;height:${BOX.h}px;box-sizing:border-box;border-radius:12px;background:#E3F1EE;border:2px solid #9FCBC2;` +
    `font-family:'Baloo 2';font-weight:700;font-size:${FS - 4}px;color:#146B5E">${v}</span>`,
});

const ANCHORS = [1, 5, 10];

/** the three levels of the table of N (the per-table faces) */
function tableLevels(N) {
  return {
    1: { mode: 'ladder', table: N, cards: 10, cols: 2, rows: 5, anchors: ANCHORS, plans: ['up', 'down'] },
    // level 2 copy 1 = the published page: these first five keys are its original config, unchanged
    2: { mode: 'table', table: N, cards: 10, cols: 2, rows: 5, plans: ['up', 'down', 'turn'] },
    3: { mode: 'tmix', table: N, cards: 10, cols: 2, rows: 5, missing: 4 },
  };
}

module.exports = {
  id: 'G3-358',
  slug: 'multiplication-tables-drill',
  gradeBand: 'G3',
  assetClass: 'numeral-charts',
  exerciseType: 'multiplication-tables',
  themeAxis: { applicable: false },
  interactive: require('../../lib/times-tables-screen.js').interactiveFor(),
  tableLevels,
  difficulty: {
    // level 1 (Level Set 2026-10-13): the easy tables 2, 5 and 10 mixed — the per-table faces own the in-order ladder
    1: { mode: 'easy', tables: [2, 5, 10], cards: 12, cols: 3, rows: 4 },
    2: { mode: 'mixed', cards: 12, cols: 3, rows: 4 },
    // level 3: the box a third each first factor / second factor / product
    3: { mode: 'missing', cards: 12, cols: 3, rows: 4 },
  },
  i18n: {
    en: {
      title: 'Times Tables Practice',
      instruction: 'Multiply. Write each product in the box.',
    },
  },

  build(args, ctx) {
    const S = [];
    const b = this._build(args, ctx, S);
    b.meta = { ...b.meta, asks: S.filter((x) => !x.given).map((x) => x.ask) };
    if (ctx && (ctx.interactive || ctx.answerKey)) {
      return require('../../lib/times-tables-screen.js').screenOrKey(b, S, { ...ctx, locale: (args.locale || 'en').slice(0, 2) });
    }
    return b;
  },
  // what makes a copy different: its questions (a fact and where its box is), and on the ladders the order it walks
  levelSetWords(m) { return (m.asks || []).map(String); },

  _build({ difficulty, locale }, ctx, S) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const glyph = DOT_LOCALES.has((locale || 'en').slice(0, 2)) ? '·' : '×';
    const plan = (d.plans || ['up'])[(Number((ctx && (ctx.seedVariant || ctx.variant)) || 1)) - 1];
    if (d.plans && !plan) throw new Error(`G3-358: level ${difficulty} has ${d.plans.length} copies (no plan for copy ${ctx.seedVariant || ctx.variant})`);
    const cards = [];
    const sz = SIZES[d.cards] || SIZES[12];
    const { BOX, NUM, OPX, EQ, GIVEN } = pen(sz.fs, sz.box);
    // one card: a × b = res, the box at pos ('a' | 'b' | 'res'), or the product given (pos 'given')
    const card = (a, b, pos, extra) => {
      const res = a * b;
      const ans = pos === 'a' ? a : pos === 'b' ? b : res;
      const slot = (v, p) => (p === pos ? answerBox({ w: BOX.w, h: BOX.h, answer: v }) : (p === 'res' && pos === 'given' ? GIVEN(v) : NUM(v)));
      const x = extra || {};
      if (pos === 'given') S.push({ given: true, nums: { a, b, res, pos } });
      else {
        const key = x.n ? (pos === 'res' ? `${x.k}@res` : `${x.k}@${a === x.n ? 'nfirst' : 'nsecond'}`) : `${Math.min(a, b)}x${Math.max(a, b)}@${pos}`;
        S.push({ q: `mt:${a}:${b}:${pos}:${x.n || ''}`, ask: (x.order ? x.order + '|' : '') + key, ans, nums: { a, b, res, pos, n: x.n || null, k: x.k || null } });
      }
      cards.push(
        `<div class="ws-card-stage" style="gap:12px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-pos="${pos}" data-lcs-mode="${d.mode}"` +
        (x.n ? ` data-lcs-n="${x.n}" data-lcs-k="${x.k}"` : '') + (x.order ? ` data-lcs-order="${x.order}"` : '') + `>` +
        slot(a, 'a') + OPX(glyph) + slot(b, 'b') + EQ() + slot(res, 'res') +
        `</div>`
      );
    };

    if (d.mode === 'table' || d.mode === 'ladder') {
      // nt20-VAR: d.table pins the table; the published page (level 2, copy 1) has no table pinned on the base face
      const N = d.table || rng.int(2, 9);
      const ks = Array.from({ length: 10 }, (_, i) => i + 1);
      if (plan === 'down') ks.reverse();
      for (const k of ks) {
        const pos = d.anchors && d.anchors.includes(k) ? 'given' : 'res';
        if (plan === 'turn') card(N, k, pos, { n: N, k, order: plan });
        else card(k, N, pos, { n: N, k, order: plan });
      }
    } else if (d.mode === 'tmix') {
      const N = d.table;
      const ks = rng.shuffle(Array.from({ length: 10 }, (_, i) => i + 1));
      // which cards ask the missing factor: d.missing of them, in shuffled places, half with N second (☐ × N) and half
      // with N first (N × ☐); the rest ask the product, half of them turned around (N × k)
      const forms = rng.shuffle([...Array(d.missing).fill('miss'), ...Array(10 - d.missing).fill('prod')]);
      let flip = rng.int(0, 1), flipP = rng.int(0, 1);
      ks.forEach((k, i) => {
        if (forms[i] === 'miss') { flip ^= 1; if (flip) card(N, k, 'b', { n: N, k }); else card(k, N, 'a', { n: N, k }); }
        else { flipP ^= 1; if (flipP) card(N, k, 'res', { n: N, k }); else card(k, N, 'res', { n: N, k }); }
      });
    } else if (d.mode === 'easy') {
      // the tables 2, 5, 10 × 2..10: no fact twice (6·5 = 5·6), each table about a third of the page, no multiplier
      // more than twice, the table's number first or second at random
      const facts = [];
      for (const t of d.tables) for (let m = 2; m <= 10; m++) if (!facts.some((f) => f.lo === Math.min(t, m) && f.hi === Math.max(t, m))) facts.push({ t, m, lo: Math.min(t, m), hi: Math.max(t, m) });
      let pick = null;
      for (let tries = 0; tries < 60 && !pick; tries++) {
        const all = rng.shuffle(facts), per = {}, mul = {}, out = [];
        for (const f of all) {
          if (out.length >= d.cards) break;
          if ((per[f.t] || 0) >= Math.ceil(d.cards / d.tables.length) || (mul[f.m] || 0) >= 2) continue;
          per[f.t] = (per[f.t] || 0) + 1; mul[f.m] = (mul[f.m] || 0) + 1; out.push(f);
        }
        if (out.length >= d.cards) pick = out;
      }
      if (!pick) throw new Error('G3-358: no varied easy-table page');
      for (const f of pick) { if (rng.int(0, 1)) card(f.t, f.m, 'res'); else card(f.m, f.t, 'res'); }
    } else {
      const used = new Set();
      // level 3: the box a third each in the first, the second and the product place, in a shuffled order
      const posList = d.mode === 'missing' ? rng.shuffle(Array.from({ length: d.cards }, (_, i) => ['a', 'b', 'res'][i % 3])) : null;
      for (let i = 0; i < d.cards; i++) {
        let a, b, guard = 0;
        // dedup UNORDERED (6·3 and 3·6 are one fact — visual-critic finding)
        do { a = rng.int(2, 10); b = rng.int(2, 10); guard++; }
        while (used.has(`${Math.min(a, b)}x${Math.max(a, b)}`) && guard < 150);
        used.add(`${Math.min(a, b)}x${Math.max(a, b)}`);
        card(a, b, posList ? posList[i] : 'res');
      }
    }
    // two columns: an equation drawn large needs the width (2026-10-13)
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(cards.length / 2) }), meta: {} };
  },

  async verify(page) {
    const fails0 = await page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-card]')];
      if (!cards.length) fails.push('no problems');
      const seen = new Set();
      const ks = [];
      cards.forEach((card, i) => {
        const st = card.querySelector('[data-lcs-a]');
        if (!st) { fails.push(`card ${i + 1}: no problem`); return; }
        const a = +st.dataset.lcsA, b = +st.dataset.lcsB, pos = st.dataset.lcsPos, mode = st.dataset.lcsMode;
        const boxes = [...card.querySelectorAll('[data-lcs-answer]')];
        const given = [...card.querySelectorAll('[data-lcs-given]')];
        if (pos === 'given') {
          if (boxes.length) fails.push(`card ${i + 1}: an anchor fact has an answer box`);
          if (given.length !== 1 || +given[0].dataset.lcsGiven !== a * b) fails.push(`card ${i + 1}: anchor product is not ${a * b}`);
          if (mode !== 'ladder') fails.push(`card ${i + 1}: a worked fact on a ${mode} page`);
        } else {
          if (given.length) fails.push(`card ${i + 1}: a worked product on a question card`);
          if (boxes.length !== 1) { fails.push(`card ${i + 1}: ${boxes.length} answer boxes`); return; }
          const want = pos === 'a' ? a : pos === 'b' ? b : a * b;
          if (+boxes[0].dataset.lcsAnswer !== want) fails.push(`card ${i + 1}: answer != ${want}`);
        }
        const printed = [...card.querySelectorAll('.ws-card-stage > span')].filter((s) => !s.hasAttribute('data-lcs-answer') && !s.hasAttribute('data-lcs-given'))
          .map((s) => s.textContent.trim()).filter((t) => /^\d+$/.test(t));
        if (printed.length !== 2) fails.push(`card ${i + 1}: ${printed.length} printed numerals`);
        if (st.dataset.lcsN) {
          const n = +st.dataset.lcsN, k = +st.dataset.lcsK;
          if (!((a === n && b === k) || (a === k && b === n))) fails.push(`card ${i + 1}: ${a} × ${b} is not ${k} × ${n}`);
          ks.push(k);
        } else {
          const key = `${Math.min(a, b)}x${Math.max(a, b)}`;
          if (seen.has(key)) fails.push(`card ${i + 1}: ${key} twice on the page`);
          seen.add(key);
        }
        const cr = card.getBoundingClientRect();
        for (const s of card.querySelectorAll('.ws-card-stage > span')) { const r = s.getBoundingClientRect(); if (r.right > cr.right + 0.5 || r.left < cr.left - 0.5) fails.push(`card ${i + 1}: the equation runs out of its card`); }
      });
      if (ks.length) {
        // a table page asks every fact ×1 … ×10 exactly once; a ladder walks them in order (up or down)
        if ([...ks].sort((x, y) => x - y).join() !== '1,2,3,4,5,6,7,8,9,10') fails.push(`table page facts ${ks.join()} are not ×1 … ×10 once each`);
        const st0 = cards[0].querySelector('[data-lcs-a]');
        const order = st0 && st0.dataset.lcsOrder;
        if (order === 'down' && ks.join() !== '10,9,8,7,6,5,4,3,2,1') fails.push('downward ladder out of order');
        if ((order === 'up' || order === 'turn' || (!order && /^(table|ladder)$/.test(st0.dataset.lcsMode))) && ks.join() !== '1,2,3,4,5,6,7,8,9,10') fails.push('table ladder out of order');
      }
      return fails;
    });
    const { pageFill, cardFill } = require('../../lib/page-fill.js');
    const pf = await page.evaluate(pageFill), cf = await page.evaluate(cardFill, 0.25);
    return [...fails0, ...pf.fails, ...cf.fails];
  },
};
