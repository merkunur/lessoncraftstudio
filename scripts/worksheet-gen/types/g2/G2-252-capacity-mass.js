/**
 * G2-252 — Capacity & mass with real metric units (ml on graduated jugs,
 * g on a two-pan balance). Metric ONLY (CCSS 3.MD.A.2 itself is metric — no
 * oz/lb anywhere); whole numbers only, so no decimal notation at this band.
 * Balance cards weigh a THEME icon against unit weights on a level balance
 * (level ⇒ the object weighs exactly the sum — the honest reading).
 * de Größen Klasse 2-3 / Lgr22 volym och massa.
 * d1: 2 jugs + 2 balances, coarse scales · d2: 3+3 · d3: 3+3 finer scales.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const jug = require('../../primitives/jug.js');
const balance = require('../../primitives/balance.js');

const WEIGHTS = [500, 200, 200, 100, 100, 50]; // the schoolbook weight box

module.exports = {
  id: 'G2-252',
  slug: 'capacity-and-mass',
  gradeBand: 'G2',
  assetClass: 'measurement',
  exerciseType: 'measurement',
  themeAxis: { applicable: true, minNouns: 3 },
  difficulty: {
    1: { jugs: 2, balances: 2, cols: 2, rows: 2, jugMax: 500, jugStep: 100, weightsMax: 2 },
    2: { jugs: 3, balances: 3, cols: 3, rows: 2, jugMax: 1000, jugStep: 100, weightsMax: 3 },
    3: { jugs: 3, balances: 3, cols: 3, rows: 2, jugMax: 1000, jugStep: 50, weightsMax: 4 },
  },
  i18n: {
    en: {
      title: 'Measuring Jugs and Scales',
      instruction: 'Read each measuring jug and balance scale. Write the amount with its unit.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = labelSafeNouns(theme);
    if (nouns.length < this.themeAxis.minNouns) {
      throw new Error(`G2-252: theme ${theme} has ${nouns.length} nouns < 3`);
    }
    const pickNouns = rng.sample(nouns, d.balances);
    const usedJug = new Set();
    const cards = [];

    for (let i = 0; i < d.jugs; i++) {
      let v, guard = 0;
      do {
        // never completely full (visual-critic finding: a brim-full jug puts
        // the waterline above the top gradation — unreadable value)
        v = d.jugStep * rng.int(1, Math.floor(d.jugMax / d.jugStep) - 1);
        guard++;
      } while (usedJug.has(v) && guard < 60);
      usedJug.add(v);
      const jg = jug({ value: v, max: d.jugMax, step: d.jugStep, labelEvery: 2, unit: 'ml', w: 150, h: 226 });
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-kind="jug">` +
        jg.svg +
        `<div style="display:flex;align-items:center;gap:8px">` +
        answerBox({ w: 74, h: 46, answer: v }) +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#3A3530" data-lcs-unit="ml">ml</span>` +
        `</div></div>`
      );
    }

    const usedW = new Set();
    for (let i = 0; i < d.balances; i++) {
      let ws, sum, guard = 0;
      do {
        const k = rng.int(1, d.weightsMax);
        ws = rng.sample(WEIGHTS, k);
        sum = ws.reduce((a, b) => a + b, 0);
        guard++;
      } while (usedW.has(ws.slice().sort((a, b) => a - b).join(',')) && guard < 80);
      usedW.add(ws.slice().sort((a, b) => a - b).join(','));
      // 3-col grid ⇒ card inner width ≈ 200px — the balance must fit inside
      const bal = balance({ tilt: 'level', w: 198, h: 182, rightWeights: ws, unit: 'g' });
      const pr = bal.panRects.left;
      const iconPx = 44;
      const noun = pickNouns[i % pickNouns.length];
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-kind="balance" data-lcs-weightsum="${sum}">` +
        `<div style="position:relative;width:${bal.width}px;height:${bal.height}px">` +
        bal.svg +
        `<img class="ws-icon" src="${fileUri(theme, noun.noun)}" alt="" data-lcs-noun="${noun.vocabKey}" ` +
        `style="position:absolute;left:${(pr.x + pr.w / 2 - iconPx / 2).toFixed(1)}px;top:${(pr.y + pr.h - iconPx - 2).toFixed(1)}px;` +
        `width:${iconPx}px;height:${iconPx}px">` +
        `</div>` +
        `<div style="display:flex;align-items:center;gap:8px">` +
        answerBox({ w: 74, h: 46, answer: sum }) +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#3A3530" data-lcs-unit="g">g</span>` +
        `</div></div>`
      );
    }

    // interleave jug/balance so the page alternates textures
    const mixed = [];
    const a = cards.slice(0, d.jugs), b = cards.slice(d.jugs);
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i]) mixed.push(a[i]);
      if (b[i]) mixed.push(b[i]);
    }
    return { bodyHtml: cardGrid({ cards: mixed, cols: d.cols, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = document.querySelectorAll('[data-lcs-card]');
      if (!cards.length) fails.push('no cards');
      cards.forEach((card, i) => {
        const stage = card.querySelector('[data-lcs-kind]');
        const box = card.querySelector('[data-lcs-answer]');
        const unit = card.querySelector('[data-lcs-unit]');
        if (!box || !unit) { fails.push(`card ${i + 1}: missing box/unit`); return; }
        if (stage.dataset.lcsKind === 'jug') {
          const j = card.querySelector('[data-lcs-prim="jug"]');
          if (!j) { fails.push(`card ${i + 1}: no jug`); return; }
          if (+box.dataset.lcsAnswer !== +j.dataset.lcsValue) fails.push(`card ${i + 1}: answer != jug value`);
          if (unit.dataset.lcsUnit !== 'ml') fails.push(`card ${i + 1}: unit != ml`);
          if (+j.dataset.lcsValue % 1 !== 0) fails.push(`card ${i + 1}: non-integer value`);
        } else {
          const b = card.querySelector('[data-lcs-prim="balance"]');
          if (!b) { fails.push(`card ${i + 1}: no balance`); return; }
          if (b.dataset.lcsTilt !== 'level') fails.push(`card ${i + 1}: balance not level`);
          const ws = [...b.querySelectorAll('[data-lcs-weight]')].map((w) => +w.dataset.lcsWeight);
          const sum = ws.reduce((x, y) => x + y, 0);
          if (sum !== +stage.dataset.lcsWeightsum) fails.push(`card ${i + 1}: weights ${sum} != declared`);
          if (+box.dataset.lcsAnswer !== sum) fails.push(`card ${i + 1}: answer != ${sum}`);
          if (!card.querySelector('img[data-lcs-noun]')) fails.push(`card ${i + 1}: no object on the pan`);
        }
      });
      return fails;
    });
  },
};
