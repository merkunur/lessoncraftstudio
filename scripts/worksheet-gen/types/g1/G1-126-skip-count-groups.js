/**
 * G1-126 — Skip-count the objects: equal icon groups of 2/5/10 with a running
 * count box beside each group (2, 4, 6, … pattern made tangible).
 *
 * REDESIGNED 2026-10-13 (operator: "almost completely blank … a terrible design"): the five groups sat in one row of
 * 116-px boxes in the middle of an empty page (8% of the page used). Now one ROW per group down the whole page — the
 * group's pictures big in a wide box, "+k" and the running-total box beside it — so the page reads like the count
 * itself: 5, 10, 15 … top to bottom. The published facts (noun, group size, totals, the rng order) are unchanged.
 *
 * Level Set 2026-10-13 (PDF + interactive + key): level 1 groups of 2 or 10 with the first TWO totals given; level 2 the
 * published page (groups of 5, the first total given) and copies in groups of 10 and 2; level 3 six groups of 10 or 5
 * with NO total given. The group size turns copy by copy.
 */
'use strict';
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons, answerBox } = require('../../templates/components.js');
const NCS = require('../../lib/number-charts-screen.js');
const { pageFill } = require('../../lib/page-fill.js');

const BODY_H = 760;   // the body measures 799-811 px (one / two instruction lines, 2026-10-13); a three-line instruction leaves ~775
const GIVEN = (v) => `<span class="ws-pattern-slot" style="width:104px;height:78px;font-family:'Baloo 2';font-weight:700;font-size:34px;color:#3A3530;background:#DDEBE8;border-color:#146B5E" data-lcs-given="${v}">${v}</span>`;

module.exports = {
  id: 'G1-126',
  slug: 'skip-counting-groups',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: true, minNouns: 2 },
  difficulty: {
    1: { v2: true, ks: [2, 10], groups: 5, given: 2 },
    2: { k: 5, ks: [5, 10, 2], groups: 5 },   // copy 1 (the published page) groups of 5
    3: { v2: true, ks: [10, 5], groups: 6, given: 0 },
  },
  interactive: NCS.interactiveFor('choice', 'groups'),
  i18n: {
    en: {
      title: 'Count in Groups',
      instruction: 'Each box holds the same amount. Skip count and write the running total.',
    },
  },
  levelSetWords(m) { return [`k${m.k}`, `g${m.groups}`, `n${m.noun}`]; },

  build(args, ctx) {
    const { theme, difficulty } = args;
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const noun = rng.pick(labelSafeNouns(theme));
    const k = d.ks ? d.ks[((Number(ctx.variant) || 1) - 1) % d.ks.length] : d.k;
    const given = d.given === undefined ? 1 : d.given;
    const G = d.groups;
    const gap = G > 5 ? 12 : 16;
    const rowH = Math.floor((BODY_H - (G - 1) * gap) / G);
    const boxW = 470, boxH = rowH - 8;
    const fit = fitIcons({ n: k, stageW: boxW - 28, stageH: boxH - 16, maxPx: k <= 2 ? 96 : 84, gapX: 10, gapY: 8 });
    const rows = [];
    for (let g = 1; g <= G; g++) {
      // the first total(s) are GIVEN (they anchor the pattern); the rest are blanks
      const total = g * k;
      const totalEl = g <= given ? GIVEN(total) : answerBox({ w: 104, h: 78, answer: total });
      rows.push(
        `<div style="display:flex;align-items:center;justify-content:center;gap:22px;height:${rowH}px" data-lcs-groupn="${k}">` +
        `<span class="ws-subgroup" data-lcs-frame style="flex:0 0 auto;width:${boxW}px;height:${boxH}px;display:flex;align-items:center;justify-content:center">` +
        iconRows({ theme, noun: noun.noun, n: k, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 10, gapY: 8 }) +
        `</span>` +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#F2784B;min-width:52px;text-align:center">+${k}</span>` +
        totalEl + `</div>`
      );
    }
    const b = {
      bodyHtml:
        `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;gap:${gap}px" data-lcs-k="${k}" data-lcs-given-n="${given}">${rows.join('')}</div>`,
      meta: { k, groups: G, noun: noun.noun },
    };
    if (ctx && (ctx.interactive || ctx.answerKey)) return this._screenOrKey(b, { k, G, given, noun: noun.noun, theme }, args, ctx);
    return b;
  },

  /** the key (every total written) or the screen (one card per empty total: the groups so far, tap the total) */
  _screenOrKey(b, { k, G, given, noun, theme }, args, ctx) {
    if (!ctx.interactive) return { bodyHtml: NCS.keyFill(b.bodyHtml).html, meta: b.meta };
    const { fileUri } = require('../../image-cache/resolve.js');
    const px = k <= 2 ? 34 : k <= 5 ? 26 : 22;
    const per = k <= 5 ? k : 5;
    const groupBox = () => {
      const imgs = Array.from({ length: k }, () => `<img src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`).join('');
      return `<span style="display:inline-grid;grid-template-columns:repeat(${per},${px}px);gap:3px;padding:6px;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:10px">${imgs}</span>`;
    };
    const qs = [];
    for (let g = given + 1; g <= G; g++) {
      const boxes = Array.from({ length: g }, groupBox).join('');
      const prompt = `<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;max-width:620px">${boxes}${NCS.op('=')}${NCS.cellBox(0, 80, 'ask')}</div>`;
      const ans = g * k;
      qs.push({ q: `grp:${k}:${g}`, prompt, ans, slips: [ans - k, ans + k, ans + 2 * k, ans - 2 * k], step: k, lo: 0 });
    }
    const loc = (args.locale || 'en').slice(0, 2);
    return { bodyHtml: NCS.choiceScreen(qs, NCS.saltOf({ ...ctx, locale: loc, theme }, qs)), meta: b.meta };
  },

  async verify(page) {
    const fails = await page.evaluate(() => {
      const fails = [];
      const wrap = document.querySelector('[data-lcs-k]');
      const k = parseInt(wrap.dataset.lcsK, 10);
      const groups = [...wrap.querySelectorAll('[data-lcs-groupn]')];
      groups.forEach((g, i) => {
        const icons = g.querySelectorAll('.ws-icon').length;
        if (icons !== k) fails.push(`group ${i + 1}: ${icons} icons != ${k}`);
        const tot = g.querySelector('[data-lcs-given],[data-lcs-answer]');
        const v = parseInt(tot.dataset.lcsGiven !== undefined ? tot.dataset.lcsGiven : tot.dataset.lcsAnswer, 10);
        if (v !== (i + 1) * k) fails.push(`group ${i + 1}: total ${v} != ${(i + 1) * k}`);
      });
      const givenN = parseInt(wrap.dataset.lcsGivenN, 10);
      if (givenN > 0 && !groups[0].querySelector('[data-lcs-given]')) fails.push('first total must be given as the anchor');
      // the pictures must be big enough to count (a group's pictures fill its box)
      const icon = wrap.querySelector('.ws-icon');
      if (icon && icon.getBoundingClientRect().width < 30) fails.push(`pictures too small to count (${Math.round(icon.getBoundingClientRect().width)}px)`);
      return fails;
    });
    // 2026-10-13: the page must USE the page (the old design covered 8% of it)
    const pf = await page.evaluate(pageFill);
    return fails.concat(pf.fails);
  },
};
