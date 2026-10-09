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
const { pageFill, cardFill } = require('../../lib/page-fill.js');
const CARD_FLOOR = 0.25;
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
  interactive: require('../../lib/measurement-screen.js').interactiveFor('jugsScales'),
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

  // Level Set (2026-10-09, PDF + interactive): level 2 copy 1 is the published page; every other page gets a screen
  // version + key from the questions collected (S) while the page is drawn — the same drawing, the same facts
  build(args, ctx) {
    const published = Number(args.difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    const S = [];
    const b = this._build(args, ctx, S);
    if (published) return b;
    b.meta = { ...b.meta, mode: this.id, asks: S.map((x) => String(x.ask)) };
    if (ctx && (ctx.interactive || ctx.answerKey)) {
      return require('../../lib/measurement-screen.js').screenOrKey(b, S, { ...ctx, locale: (args.locale || 'en').slice(0, 2), theme: args.theme });
    }
    return b;
  },
  levelSetWords(m) { return (m.asks || []).map(String); },

  _build({ theme, difficulty }, ctx, S) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    // nt20-VAR: a jug-only page (balances:0) is THEMELESS — the theme rides
    // the balance-pan icons, and a themed slug over a page with no icons
    // would promise content the sheet doesn't show
    // 2026-10-09: EVERY page (the published ones too, operator ruling) puts on the pan only a light object whose real
    // weight the weights could be (data/light-objects.js — an apple at 200 g, never an elephant or an airplane at 350 g).
    // The published animals / vehicles pages moved to clothing / toys (their slugs kept).
    const LIGHT = d.balances > 0 ? require('../../data/light-objects.js')[theme] : null;
    let pickNouns = [];
    let lightNouns = [];
    if (d.balances > 0) {
      if (!LIGHT) throw new Error(`G2-252: theme ${theme} has no light objects for the balance`);
      lightNouns = labelSafeNouns(theme).filter((n) => LIGHT[n.noun]);
      if (lightNouns.length < 4) throw new Error(`G2-252: theme ${theme} has ${lightNouns.length} light objects < 4`);
    }
    const usedJug = new Set();
    const cards = [];
    // 2026-10-09: the jugs and balances fill their cards (were 150×226 / 198×182 whatever the grid, small in 2-column cards)
    const two = d.cols === 2;
    const JUG = two ? { w: 220, h: 330 } : { w: 180, h: 300 };
    const BAL = two ? { w: 300, h: 250 } : { w: 198, h: 230 };
    const iconPx = two ? 62 : 46;

    for (let i = 0; i < d.jugs; i++) {
      let v, guard = 0;
      do {
        // never completely full (visual-critic finding: a brim-full jug puts
        // the waterline above the top gradation — unreadable value)
        v = d.jugStep * rng.int(1, Math.floor(d.jugMax / d.jugStep) - 1);
        guard++;
      } while (usedJug.has(v) && guard < 60);
      usedJug.add(v);
      const le = d.labelEvery || 2;
      const jg = jug({ value: v, max: d.jugMax, step: d.jugStep, labelEvery: d.labelEvery || 2, unit: 'ml', w: JUG.w, h: JUG.h });
      const near = Math.round(v / (d.jugStep * le)) * d.jugStep * le;
      S.push({ kind: 'num', unit: 'ml', q: `jug:${v}`, ask: v, ans: v, step: d.jugStep, slips: [v + d.jugStep, v - d.jugStep, near !== v ? near : v + d.jugStep * le, v + d.jugStep * le],
        prompt: jug({ value: v, max: d.jugMax, step: d.jugStep, labelEvery: le, unit: 'ml', w: 170, h: 300 }).svg });
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-kind="jug" data-lcs-step="${d.jugStep}" data-lcs-labelevery="${d.labelEvery || 2}" data-lcs-jugmax="${d.jugMax}">` +
        jg.svg +
        `<div style="display:flex;align-items:center;gap:8px">` +
        answerBox({ w: 74, h: 46, answer: v }) +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#3A3530" data-lcs-unit="ml">ml</span>` +
        `</div></div>`
      );
    }

    const usedW = new Set(), usedLight = new Set();
    for (let i = 0; i < d.balances; i++) {
      let ws, sum, guard = 0, fits = [];
      do {
        const k = rng.int(d.weightsMin || 1, d.weightsMax);   // weightsMin: the level-3 tables (3-4 weights)
        ws = rng.sample(WEIGHTS, k);
        sum = ws.reduce((a, b) => a + b, 0);
        guard++;
        // a different object on every pan (2026-10-09: a pineapple came back at another weight on one page)
        if (LIGHT) fits = lightNouns.filter((n) => LIGHT[n.noun][0] <= sum && sum <= LIGHT[n.noun][1] && !usedLight.has(n.noun));
      } while ((usedW.has(ws.slice().sort((a, b) => a - b).join(',')) || (LIGHT && !fits.length)) && guard < (LIGHT ? 3000 : 80));
      if (LIGHT && !fits.length) throw new Error(`G2-252: theme ${theme}: no light object weighs ${sum} g`);
      const lightPick = LIGHT ? rng.pick(fits) : null;
      if (lightPick) usedLight.add(lightPick.noun);
      usedW.add(ws.slice().sort((a, b) => a - b).join(','));
      // 3-col grid ⇒ card inner width ≈ 200px — the balance must fit inside
      const bal = balance({ tilt: 'level', w: BAL.w, h: BAL.h, rightWeights: ws, unit: 'g' });
      const pr = bal.panRects.left;
      const noun = lightPick || pickNouns[i % pickNouns.length];
      const sm = Math.min(...ws);
      const balHtml = (B, ic) => `<div style="position:relative;width:${B.width}px;height:${B.height}px">${B.svg}` +
        `<img class="ws-icon" src="${fileUri(theme, noun.noun)}" alt="" style="position:absolute;left:${(B.panRects.left.x + B.panRects.left.w / 2 - ic / 2).toFixed(1)}px;top:${(B.panRects.left.y + B.panRects.left.h - ic - 2).toFixed(1)}px;width:${ic}px;height:${ic}px"></div>`;
      S.push({ kind: 'num', unit: 'g', q: `bal:${ws.join('+')}`, ask: sum, ans: sum, step: 50,
        slips: [ws.length > 1 ? sum - sm : sum + 100, sum + sm, Math.max(...ws), sum + 50, sum - 50],
        prompt: balHtml(balance({ tilt: 'level', w: 300, h: 230, rightWeights: ws, unit: 'g' }), 62) });
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-kind="balance" data-lcs-weightsum="${sum}"${lightPick ? ` data-lcs-real="${LIGHT[lightPick.noun].join('-')}"` : ''}>` +
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
    const fails0 = await page.evaluate(() => {
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
          if (+j.dataset.lcsValue % +stage.dataset.lcsStep !== 0 || +j.dataset.lcsValue >= +stage.dataset.lcsJugmax) fails.push(`card ${i + 1}: ${j.dataset.lcsValue} not on a mark below the brim`);
        } else {
          const b = card.querySelector('[data-lcs-prim="balance"]');
          if (!b) { fails.push(`card ${i + 1}: no balance`); return; }
          if (b.dataset.lcsTilt !== 'level') fails.push(`card ${i + 1}: balance not level`);
          const ws = [...b.querySelectorAll('[data-lcs-weight]')].map((w) => +w.dataset.lcsWeight);
          const sum = ws.reduce((x, y) => x + y, 0);
          if (sum !== +stage.dataset.lcsWeightsum) fails.push(`card ${i + 1}: weights ${sum} != declared`);
          if (+box.dataset.lcsAnswer !== sum) fails.push(`card ${i + 1}: answer != ${sum}`);
          if (!card.querySelector('img[data-lcs-noun]')) fails.push(`card ${i + 1}: no object on the pan`);
          if (stage.dataset.lcsReal) { const [lo, hi] = stage.dataset.lcsReal.split('-').map(Number); if (sum < lo || sum > hi) fails.push(`card ${i + 1}: the object weighs ${sum} g — it really weighs ${lo}-${hi} g`); }
        }
      });
      return fails;
    });
    // 2026-10-09: the page and every card must USE their space (the drawings were small in big cards)
    const pf = await page.evaluate(pageFill), cf = await page.evaluate(cardFill, CARD_FLOOR);
    return [...fails0, ...pf.fails, ...cf.fails];
  },
};
