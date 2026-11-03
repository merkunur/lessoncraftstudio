/**
 * K-493 — Draw with Shapes (How to Draw maker 2026-11-02, NEW-TEMPLATES §30 T1): directed drawing for the youngest,
 * built from circles, ovals, triangles and rectangles. The step cards run down the rail; under each card the shapes that
 * step adds are named, with a small picture of each (one per shape drawn: two triangles = two little triangles) — the
 * geometry link (K.G.B.6: compose shapes into a picture). The child draws in the big box.
 *
 * Only the hand-drawn lessons (data/htdv, lib/htd-vector.js): every step is made of real shapes and lines of the
 * finished picture, so a named shape is exactly what the card shows. The shapes of a step come from
 * data/htdv/step-shapes.json (tools/htdv-step-shapes.js, read from the lesson's own parts); a step that only adds lines
 * (whiskers, a smile) shows no names.
 * Levels: 1 the shapes named + the first shapes dotted in the box · 2 named, an empty box · 3 an empty box, no names.
 */
'use strict';
const H = require('../../lib/htd-faces.js');
const Hd = require('../../lib/htd-steps.js');
const C7 = require('../../templates/components-b7.js');
const platform = require('../../lib/platform/index.js');
const path = require('path');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { names: true, guides: true }, 2: { names: true, guides: false }, 3: { names: false, guides: false } };
const WORDS = {
  en: { circle: 'circle', oval: 'oval', triangle: 'triangle', rectangle: 'rectangle', square: 'square', 'half-circle': 'half circle' },
  de: { circle: 'Kreis', oval: 'Oval', triangle: 'Dreieck', rectangle: 'Rechteck', square: 'Quadrat', 'half-circle': 'Halbkreis' },
  fr: { circle: 'cercle', oval: 'ovale', triangle: 'triangle', rectangle: 'rectangle', square: 'carré', 'half-circle': 'demi-cercle' },
  es: { circle: 'círculo', oval: 'óvalo', triangle: 'triángulo', rectangle: 'rectángulo', square: 'cuadrado', 'half-circle': 'semicírculo' },
  pt: { circle: 'círculo', oval: 'oval', triangle: 'triângulo', rectangle: 'retângulo', square: 'quadrado', 'half-circle': 'semicírculo' },
  it: { circle: 'cerchio', oval: 'ovale', triangle: 'triangolo', rectangle: 'rettangolo', square: 'quadrato', 'half-circle': 'semicerchio' },
  nl: { circle: 'cirkel', oval: 'ovaal', triangle: 'driehoek', rectangle: 'rechthoek', square: 'vierkant', 'half-circle': 'halve cirkel' },
  sv: { circle: 'cirkel', oval: 'oval', triangle: 'triangel', rectangle: 'rektangel', square: 'kvadrat', 'half-circle': 'halvcirkel' },
  da: { circle: 'cirkel', oval: 'oval', triangle: 'trekant', rectangle: 'rektangel', square: 'kvadrat', 'half-circle': 'halvcirkel' },
  no: { circle: 'sirkel', oval: 'oval', triangle: 'trekant', rectangle: 'rektangel', square: 'kvadrat', 'half-circle': 'halvsirkel' },
  fi: { circle: 'ympyrä', oval: 'soikio', triangle: 'kolmio', rectangle: 'suorakulmio', square: 'neliö', 'half-circle': 'puoliympyrä' },
};
const ICON = {
  circle: '<circle cx="10" cy="10" r="7.5"/>', oval: '<ellipse cx="10" cy="10" rx="8.5" ry="5.5"/>',
  triangle: '<path d="M10 2.5 L17.5 16.5 L2.5 16.5 Z"/>', rectangle: '<rect x="2" y="5" width="16" height="10" rx="1"/>',
  square: '<rect x="3.5" y="3.5" width="13" height="13" rx="1"/>', 'half-circle': '<path d="M2.5 14 A7.5 7.5 0 0 1 17.5 14 Z"/>',
};
const icon = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" data-lcs-htd-shape-icon="${s}" style="display:block;flex:0 0 20px"><g fill="none" stroke="${T.coral}" stroke-width="2.4" stroke-linejoin="round">${ICON[s]}</g></svg>`;
let _shapes = null;
function stepShapes(key) {
  if (!_shapes) _shapes = platform.readJson(path.join(__dirname, '..', '..', 'data', 'htdv', 'step-shapes.json'));
  const s = _shapes[key];
  if (!s) throw new Error(`K-493: no step shapes for ${key} (node tools/htdv-step-shapes.js)`);
  return s;
}
/** the drawn lessons, in the face's order (a hand-drawn lesson exists for these units only) */
const units = () => H.order('K-493', Object.keys(H.B.VECTOR));

module.exports = {
  id: 'K-493',
  slug: 'draw-with-shapes',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'how-to-draw',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Draw with Shapes',
      instruction: 'Look at the steps. Each step adds new shapes in orange. Draw the picture in the big box, one step at a time.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = String(locale || 'en').slice(0, 2);
    const W = WORDS[loc] || WORDS.en;
    const unit = H.nth(units(), ctx);
    const S = H.B.vectorStepsFor(unit);
    const key = H.B.VECTOR[unit.replace(/^lsx-/, '')];
    const sh = stepShapes(key);
    if (sh.length !== S.steps.length) throw new Error(`K-493: ${key} has ${S.steps.length} steps and ${sh.length} shape lists`);
    const n = S.steps.length;
    const Hh = 724 - ((ctx && ctx.chromeExtra) || 0);
    // a row = card (cardPx + 6) + its names (one line of 24 px per kind of shape); the rows share the lane's height
    const lines = d.names ? sh.reduce((a, s) => a + s.length, 0) : 0;
    const cardPx = Math.min(150, Math.floor((Hh - (n - 1) * 14 - lines * 26 - n * 6) / n));
    const rows = S.steps.map((_, k) => {
      // every card shows what its step adds in orange — the last one too (the instruction says so; the finished picture is the last card's lines)
      const svg = Hd.stepSvg(S, k, { width: cardPx, height: cardPx, viewBox: 'bbox', lastInInk: false, shapes: false });
      const card = C7.htdCard({ svg, size: cardPx, n: k + 1, badge: 'digit', badgeAt: 'ladder', attrs: `data-lcs-htd-slot="${k + 1}"` });
      const tags = d.names && sh[k].length ? `<div data-lcs-htd-shapes="${k + 1}" style="display:flex;flex-direction:column;gap:2px;width:${cardPx + 6}px">` +
        sh[k].map((x) => `<div data-lcs-htd-shape="${x.shape}" data-lcs-htd-shape-n="${x.n}" style="display:flex;align-items:center;gap:3px;height:24px">${Array.from({ length: x.n }, () => icon(x.shape)).join('')}` +
          `<span style="margin-left:4px;font:800 16px/1 Nunito,sans-serif;color:${T.ink};white-space:nowrap">${W[x.shape]}</span></div>`).join('') + `</div>` : '';
      return `<div style="display:flex;flex-direction:column;gap:4px">${card}${tags}</div>`;
    }).join('');
    const col = `<div data-lcs-htd-ladder="${n}" style="display:flex;flex-direction:column;justify-content:space-between;height:${Hh}px;flex:0 0 auto">${rows}</div>`;
    const ladder = `<div style="display:flex;align-items:flex-start;flex:0 0 auto">${C7.htdRail({ orient: 'ladder', length: Hh })}${col}</div>`;
    const tagW = d.names ? Math.max(cardPx + 6, ...sh.map((s) => Math.max(0, ...s.map((x) => x.n * 23 + 10 + W[x.shape].length * 9)))) : cardPx + 6;
    const paperW = 639 - 16 - tagW - 18;
    const paper = C7.htdPaper({ w: paperW, h: Hh, role: 'primary', guides: d.guides ? { S } : null });
    const body = `<div class="ws-lane" style="box-sizing:border-box;width:675px;padding:2px 16px;display:flex;align-items:flex-start">` +
      `<div style="display:flex;align-items:flex-start;width:639px;height:${Hh}px;gap:18px">${ladder}${paper}</div></div>`;
    return { bodyHtml: H.root('shapes-named', unit, body, `data-lcs-htd-steps="${n}"`), meta: { unit, steps: n } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const R = document.querySelector('[data-lcs-htd-face]');
      if (!R) return ['no page root'];
      const n = +R.dataset.lcsHtdSteps;
      if (document.querySelectorAll('[data-lcs-htd-card]').length !== n) fails.push('a step card is missing');
      // every named shape shows as many little shapes as the lesson draws
      document.querySelectorAll('[data-lcs-htd-shape]').forEach((t) => { if (t.querySelectorAll('[data-lcs-htd-shape-icon]').length !== +t.dataset.lcsHtdShapeN) fails.push('a shape name with the wrong number of pictures'); });
      // nothing leaves the lane or the page
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-htd-card], [data-lcs-htd-shape], [data-lcs-htd-box]').forEach((e) => { const b = e.getBoundingClientRect(); if (b.right > pg.right + 1 || b.bottom > pg.bottom + 1) fails.push('apparatus outside the page'); });
      const box = document.querySelector('[data-lcs-htd-box]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-htd-shape] span').forEach((s) => { if (s.getBoundingClientRect().right > box.left - 4) fails.push('a shape name runs into the box'); });
      return fails;
    });
  },
};
