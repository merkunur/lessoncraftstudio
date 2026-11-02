/**
 * G1-485 — Two-Circle Sort: Shapes and Colours (Sorting maker, 2026-11-02). The G1 face of G3-353's Venn diagram, sorted
 * by two attributes the generator itself draws — so every region is true by construction:
 *   left circle  = one SHAPE (any colour) — named above it with the shape's outline and its plural word ("Triangles")
 *   right circle = one COLOUR (any shape) — named above it with a swatch and the colour's word
 *   middle       = that shape in that colour; the box outside both circles = another shape in another colour
 * The shapes are numbered in a strip under the diagram; the child writes each number in its place (the key writes them
 * there, G3-353's keyNumbers; the screen asks each shape its region, G3-353's regionTargets).
 *   - every shape carries its colour WORD under it: the word is what survives a black-and-white printer (K-241 rule; the
 *     fill is support)
 *   - a square never meets a rectangle (a square IS one); no oval beside a circle — five shapes that are never each other
 *   - each region holds 1 … ⌈n/4⌉+1 shapes
 */
'use strict';
const { svgRoot, el, circle } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');
const { COLOR_WORDS } = require('../../data/color-words.js');
const { venn } = require('../g3/G3-353-venn-sort.js');

const SHAPES = ['circle', 'square', 'triangle', 'star', 'heart'];
const COLOURS = ['red', 'blue', 'yellow', 'green'];
const FILL = { red: tokens.codeColors.codeRed, blue: tokens.codeColors.codeBlue, yellow: tokens.codeColors.codeYellow, green: tokens.codeColors.codeGreen };
/** the left circle's name: the shape's plural (native-checked ×11) */
const SHAPE_PLURAL = {
  en: { circle: 'Circles', square: 'Squares', triangle: 'Triangles', star: 'Stars', heart: 'Hearts' },
  de: { circle: 'Kreise', square: 'Quadrate', triangle: 'Dreiecke', star: 'Sterne', heart: 'Herzen' },
  fr: { circle: 'Cercles', square: 'Carrés', triangle: 'Triangles', star: 'Étoiles', heart: 'Cœurs' },
  es: { circle: 'Círculos', square: 'Cuadrados', triangle: 'Triángulos', star: 'Estrellas', heart: 'Corazones' },
  pt: { circle: 'Círculos', square: 'Quadrados', triangle: 'Triângulos', star: 'Estrelas', heart: 'Corações' },
  it: { circle: 'Cerchi', square: 'Quadrati', triangle: 'Triangoli', star: 'Stelle', heart: 'Cuori' },
  nl: { circle: 'Cirkels', square: 'Vierkanten', triangle: 'Driehoeken', star: 'Sterren', heart: 'Harten' },
  sv: { circle: 'Cirklar', square: 'Kvadrater', triangle: 'Trianglar', star: 'Stjärnor', heart: 'Hjärtan' },
  da: { circle: 'Cirkler', square: 'Kvadrater', triangle: 'Trekanter', star: 'Stjerner', heart: 'Hjerter' },
  no: { circle: 'Sirkler', square: 'Kvadrater', triangle: 'Trekanter', star: 'Stjerner', heart: 'Hjerter' },
  fi: { circle: 'Ympyrät', square: 'Neliöt', triangle: 'Kolmiot', star: 'Tähdet', heart: 'Sydämet' },
};
/** the screen's words for the middle and outside: the SHAPES are feminine in es / pt / it / fr (G3-353's words agree with
 *  its masculine "pictures"; native review 2026-11-02) */
const REGION_OWN = { es: { both: 'las dos', out: 'ninguna' }, pt: { both: 'as duas', out: 'nenhuma' }, it: { both: 'entrambe', out: 'nessuna' }, fr: { out: 'aucune' } };
const loc2 = (locale) => String(locale || 'en').slice(0, 2);
const cap = (w, L) => w.charAt(0).toLocaleUpperCase(L) + w.slice(1);

/** a shape's path, centred on (cx, cy), fitting a box of side s */
function shapePath(kind, cx, cy, s) {
  const h = s / 2;
  if (kind === 'circle') return `M ${cx - h} ${cy} a ${h} ${h} 0 1 0 ${s} 0 a ${h} ${h} 0 1 0 ${-s} 0 Z`;
  if (kind === 'square') { const q = h * 0.86; return `M ${cx - q} ${cy - q} H ${cx + q} V ${cy + q} H ${cx - q} Z`; }
  if (kind === 'triangle') return `M ${cx} ${cy - h} L ${cx + h} ${cy + h * 0.78} L ${cx - h} ${cy + h * 0.78} Z`;
  if (kind === 'star') {
    let d = '';
    for (let k = 0; k < 10; k++) { const r = k % 2 ? h * 0.44 : h, a = -Math.PI / 2 + (k * Math.PI) / 5; d += (k ? ' L ' : 'M ') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + 0.06 * s + r * Math.sin(a)).toFixed(1); }
    return d + ' Z';
  }
  // heart
  const t = cy - h * 0.45;
  return `M ${cx} ${cy + h * 0.9} C ${cx - h * 1.25} ${cy + h * 0.05} ${cx - h * 0.75} ${t - h * 0.75} ${cx} ${t} C ${cx + h * 0.75} ${t - h * 0.75} ${cx + h * 1.25} ${cy + h * 0.05} ${cx} ${cy + h * 0.9} Z`;
}
const shapeSvg = (kind, fill, s, data) => svgRoot({ width: s, height: s, label: kind }, el('path', { d: shapePath(kind, s / 2, s / 2, s - 6), fill, stroke: tokens.color.ink, 'stroke-width': 2, 'stroke-linejoin': 'round' }), data);

module.exports = {
  id: 'G1-485',
  slug: 'two-circle-sort-shapes-colours',
  gradeBand: 'G1',
  assetClass: 'visual-logic',
  exerciseType: 'sorting-categories',
  themeAxis: { applicable: false },
  difficulty: {
    1: { items: 6 },
    2: { items: 8 },
    3: { items: 10 },
  },
  i18n: { en: { title: "Two-Circle Sort: Shapes and Colors", instruction: "Write each shape's number in its place. Left circle: the shape named above it. Right circle: the color named above it. Middle: both. The box outside the circles: neither." } },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, L = loc2(locale);
    if (!SHAPE_PLURAL[L] || !COLOR_WORDS[L]) throw new Error(`G1-485: no ${L} shape or colour words — REFUSED`);
    const shape = rng.pick(SHAPES), colour = rng.pick(COLOURS);
    const otherShapes = SHAPES.filter((s) => s !== shape), otherColours = COLOURS.filter((c) => c !== colour);
    // how many shapes each region gets: at least one, at most ⌈n/4⌉+1 (G3-353's rule)
    const count = { left: 1, both: 1, right: 1, out: 1 }, capN = Math.ceil(d.items / 4) + 1;
    for (let k = 4; k < d.items; k++) count[rng.pick(venn.REGIONS.filter((r) => count[r] < capN))]++;
    const items = [];
    for (const reg of venn.REGIONS) for (let k = 0; k < count[reg]; k++) {
      const s = reg === 'left' || reg === 'both' ? shape : rng.pick(otherShapes);
      const c = reg === 'both' || reg === 'right' ? colour : rng.pick(otherColours);
      items.push({ reg, shape: s, colour: c });
    }
    const order = rng.shuffle(items).map((it, i) => ({ ...it, n: i + 1 }));

    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const g = venn.geom();
    const shapeWord = SHAPE_PLURAL[L][shape], colourWord = cap(COLOR_WORDS[L][colour], L);
    const words = { left: shapeWord, right: colourWord, ...(venn.REGION_WORDS[L] || venn.REGION_WORDS.en), ...(REGION_OWN[L] || {}) };
    const t = tokens;
    const label = (x, anchor, word, ink) => el('text', { x, y: 30, 'font-family': t.font.display, 'font-size': 24, 'font-weight': 700, fill: ink, 'text-anchor': anchor, 'dominant-baseline': 'central', 'data-lcs-venn-label': anchor === 'start' ? 'left' : 'right' }, word);
    const colourWordW = colourWord.length * 13 + 8;   // the swatch sits left of the right-hand word
    const diagram = svgRoot({ width: g.w, height: g.h, label: 'venn diagram' }, [
      `<rect x="${g.box.x}" y="${g.box.y}" width="${g.box.w}" height="${g.box.h}" rx="14" fill="none" stroke="${t.color.ink}" stroke-width="2.5" data-lcs-venn-box="1"/>`,
      circle({ cx: g.cx1, cy: g.cy, r: g.r, fill: 'none', strokeColor: t.color.teal, strokeWidth: 4 }),
      circle({ cx: g.cx2, cy: g.cy, r: g.r, fill: 'none', strokeColor: t.color.coral, strokeWidth: 4 }),
      // the left name: the shape's outline (no colour: any colour belongs) + its plural word
      el('path', { d: shapePath(shape, 36, 30, 36), fill: 'none', stroke: t.color.teal, 'stroke-width': 3, 'stroke-linejoin': 'round', 'data-lcs-venn-icon': 1 }),
      label(66, 'start', shapeWord, t.color.teal),
      // the right name: a swatch of the colour + its word
      el('circle', { cx: g.w - 14 - colourWordW - 18, cy: 30, r: 15, fill: FILL[colour], stroke: t.color.ink, 'stroke-width': 2, 'data-lcs-venn-swatch': colour }),
      label(g.w - 14, 'end', colourWord, t.color.coral),
    ].join('') + (key ? venn.keyNumbers(g, order) : scr ? venn.regionTargets(g, words) : ''));
    const strip = order.map((it) =>
      `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:3px;width:86px" data-lcs-region="${it.reg}"${scr ? ` data-lcs-key-badge="${it.reg}"` : ''}>` +
      shapeSvg(it.shape, FILL[it.colour], 62, { 'data-lcs-shape': it.shape, 'data-lcs-colour': it.colour }) +
      `<span style="font-family:'Nunito';font-weight:800;font-size:14px;line-height:18px;color:${t.color.ink}" data-lcs-colour-word="${it.colour}">${COLOR_WORDS[L][it.colour]}</span>` +
      `<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:2px solid ${t.color.ink};border-radius:50%;font-family:'Baloo 2';font-weight:700;font-size:17px;color:${t.color.ink}" data-lcs-number="${it.n}">${it.n}</span></span>`).join('');

    return {
      bodyHtml:
        `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly" data-lcs-venn-shape="${shape}" data-lcs-venn-colour="${colour}">` +
        diagram +
        `<div style="display:flex;flex-wrap:wrap;gap:14px 10px;justify-content:center;max-width:660px">${strip}</div>` +
        `</div>`,
      meta: { shape, colour, items: order.map((it) => it.n + ':' + it.reg) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-venn-shape]');
      const S = root.dataset.lcsVennShape, C = root.dataset.lcsVennColour;
      const items = [...document.querySelectorAll('[data-lcs-region]')];
      const seen = { left: 0, both: 0, right: 0, out: 0 };
      items.forEach((it, i) => {
        const reg = it.dataset.lcsRegion; seen[reg]++;
        const svg = it.querySelector('svg[data-lcs-shape]');
        const isS = svg.dataset.lcsShape === S, isC = svg.dataset.lcsColour === C;
        const expect = { left: [true, false], both: [true, true], right: [false, true], out: [false, false] }[reg];
        if (isS !== expect[0] || isC !== expect[1]) fails.push(`shape ${i + 1}: shape/colour do not match region ${reg}`);
        const w = it.querySelector('[data-lcs-colour-word]');
        if (!w || w.dataset.lcsColourWord !== svg.dataset.lcsColour || !w.textContent.trim()) fails.push(`shape ${i + 1}: no colour word, or the wrong one`);
        if (['square', 'circle', 'triangle', 'star', 'heart'].indexOf(svg.dataset.lcsShape) < 0) fails.push(`shape ${i + 1}: unknown shape`);
        const num = it.querySelector('[data-lcs-number]');
        if (!num || num.textContent !== String(i + 1)) fails.push(`shape ${i + 1}: its number is not ${i + 1}`);
      });
      const cap = Math.ceil(items.length / 4) + 1;
      Object.entries(seen).forEach(([r, n]) => { if (n < 1) fails.push(`region ${r} has no shapes`); if (n > cap) fails.push(`region ${r} has ${n} shapes (at most ${cap})`); });
      // the circles' names: inside the diagram, apart; the swatch is the right circle's colour
      const svg = document.querySelector('[data-lcs-venn-box]').ownerSVGElement;
      const W = svg.viewBox.baseVal.width;
      const lab = [...document.querySelectorAll('[data-lcs-venn-label]')].map((t) => t.getBBox());
      const sw = document.querySelector('[data-lcs-venn-swatch]');
      if (lab.length !== 2) fails.push('the circles are not both named');
      else {
        if (lab.some((b) => b.x < 0 || b.x + b.width > W)) fails.push('a circle name runs off the diagram');
        if (lab[0].x + lab[0].width + 16 > lab[1].x) fails.push('the two circle names run into each other');
        const sb = sw.getBBox();
        if (sb.x + sb.width > lab[1].x - 2) fails.push('the colour swatch covers its word');
        if (sb.x < lab[0].x + lab[0].width + 6) fails.push('the colour swatch runs into the shape name');
      }
      if (!sw || sw.dataset.lcsVennSwatch !== C) fails.push('the swatch is not the right circle\'s colour');
      // the screen's tap areas each inside their region; the key's numbers each in their own region (G3-353's rules)
      const circles = [...svg.querySelectorAll('circle')].filter((c) => +c.getAttribute('r') > 100).map((c) => ({ x: +c.getAttribute('cx'), y: +c.getAttribute('cy'), r: +c.getAttribute('r') }));
      const boxEl = document.querySelector('[data-lcs-venn-box]');
      const B = { x: +boxEl.getAttribute('x'), y: +boxEl.getAttribute('y'), w: +boxEl.getAttribute('width'), h: +boxEl.getAttribute('height') };
      const where = (x, y) => {
        if (x <= B.x || x >= B.x + B.w || y <= B.y || y >= B.y + B.h || circles.length !== 2) return null;
        const [a, b] = circles.map((c) => Math.hypot(x - c.x, y - c.y) - c.r);
        if (Math.abs(a) < 2 || Math.abs(b) < 2) return null;
        return a < 0 && b < 0 ? 'both' : a < 0 ? 'left' : b < 0 ? 'right' : 'out';
      };
      for (const t of document.querySelectorAll('rect[data-lcs-pair]')) {
        const x = +t.getAttribute('x'), y = +t.getAttribute('y'), w = +t.getAttribute('width'), h = +t.getAttribute('height');
        if ([[x, y], [x + w, y], [x, y + h], [x + w, y + h], [x + w / 2, y + h / 2]].some(([px, py]) => where(px, py) !== t.dataset.lcsPair)) fails.push(`the ${t.dataset.lcsPair} tap area crosses into another region`);
      }
      const keyNums = [...document.querySelectorAll('[data-lcs-key-region]')];
      if (keyNums.length) {
        if (keyNums.length !== items.length) fails.push(`the key writes ${keyNums.length} numbers for ${items.length} shapes`);
        keyNums.forEach((t) => { const it = items[Number(t.textContent) - 1]; if (!it || it.dataset.lcsRegion !== t.dataset.lcsKeyRegion) fails.push(`key number ${t.textContent} is in the wrong region`); });
        keyNums.forEach((t) => { if (where(+t.getAttribute('x'), +t.getAttribute('y')) !== t.dataset.lcsKeyRegion) fails.push(`key number ${t.textContent} sits outside its region`); });
      }
      return fails;
    });
  },
};
