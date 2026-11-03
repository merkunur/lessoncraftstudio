/**
 * K-495 — Mirror Drawing (How to Draw maker 2026-11-02, NEW-TEMPLATES §30 T3): the left half of a front-facing
 * drawing is printed beside a dashed mirror line; the child draws the right half so both sides look the same — symmetry
 * by drawing (G1-432 TRACES the other half; this page draws it).
 *
 * The drawings are the How to Draw lessons the maker ships whose subject faces front (a butterfly, a panda, a rocket …):
 * measured by tools/htd-symmetry.js (data/b7/htd-symmetry.json: the best vertical mirror axis and its overlap) and READ
 * on a contact sheet (2026-11-02, 25 at overlap ≥ 0.7, all front-facing; the published bear and its Level Set twin are
 * one drawing — one kept). The axis is the measured one. The target is the left half's own mirror image, never the
 * drawing's real right half: a koala's tail or a lighthouse door on one side is not something a child can mirror, and
 * the key (the left half + its mirror) is then right by construction.
 * Levels: 1 the other half is printed pale, to go over · 2 squares over both halves to copy by · 3 only the mirror line.
 */
'use strict';
const H = require('../../lib/htd-faces.js');
const Hd = require('../../lib/htd-steps.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { guide: 'pale' }, 2: { guide: 'grid' }, 3: { guide: 'none' } };
// the reviewed list: unit → its mirror axis (picture units), from data/b7/htd-symmetry.json (overlap ≥ 0.7), read 2026-11-02
const AXIS = { 'easter-bw-butterfly': 298.9, 'lsx-animals-bw-5-panda': 299.8, 'lsx-space-bw-rocket': 299.6, 'lsx-vehicles-bw-2-rocket': 299.9, 'lsx-toys-bw-teddy-bear': 300.1, 'lsx-animals-bw-bat': 298.6, 'lsx-zoo-animals-bw-bear-2': 304.6, 'lsx-animals-bw-5-penguin': 297.4, 'lsx-beach-bw-2-sandcastle': 293.8, 'lsx-animals-bw-4-koala': 301.2, 'lsx-farm-bw-donkey': 297.6, 'lsx-birds-bw-2-owl': 301.4, 'lsx-household-bw-plant': 301.8, 'lsx-toys-bw-drum': 301.1, 'lsx-animals-bw-5-bat': 295.6, 'lsx-beach-bw-lighthouse': 296.9, 'lsx-sea-life-bw-2-starfish': 300, 'lsx-animals-bw-frog': 301.4, 'lsx-animals-bw-bear-2': 297.9, 'lsx-beach-bw-2-crab': 300.9, 'lsx-christmas-bw-2-santa-claus': 300.8, 'lsx-sea-life-bw-crab': 302.9, 'lsx-christmas-bw-snowman': 298.5, 'lsx-vehicles-bw-2-hot-air-balloon': 298.4 };
const PALE = T.grid;   // the palette's light grey (a trace line)

module.exports = {
  id: 'K-495',
  slug: 'draw-the-other-half',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'how-to-draw',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Mirror Drawing',   // (G1-484 of Symmetry & Grid Copy is "Draw the Other Half": a title of its own)
      instruction: 'Half of the picture is drawn. Draw the other half so that both sides look the same, like in a mirror.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const key = !!(ctx && ctx.answerKey);
    const unit = H.nth(H.order('K-495', Object.keys(AXIS)), ctx);
    const S = H.B.stepsFor(unit), a = AXIS[unit];
    // the box: the drawing's box made symmetric about the axis (so both halves have the same room), + a margin
    const [x0, y0, x1, y1] = S.bbox, half = Math.max(a - x0, x1 - a) + 24;
    const vb = [a - half, y0 - 24, 2 * half, (y1 - y0) + 48];
    const extra = (ctx && ctx.chromeExtra) || 0;
    const k = Math.min(620 / vb[2], (700 - extra) / vb[3]);
    const w = Math.round(vb[2] * k), h = Math.round(vb[3] * k);
    const ink = T.ink;
    const left = `<g clip-path="url(#k495L)"><path d="${S.full}" fill="${ink}"/></g>`;
    const mirror = (fill) => `<g transform="matrix(-1 0 0 1 ${2 * a} 0)" data-lcs-htd-mirror="${fill === ink ? 'key' : 'pale'}"><g clip-path="url(#k495L)"><path d="${S.full}" fill="${fill}"/></g></g>`;
    let guide = '';
    if (d.guide === 'pale' && !key) guide = mirror(PALE);
    if (d.guide === 'grid') {
      // squares of a sixth of the half's width, from the axis outwards (the same squares on both sides)
      const c = half / 3, L = [];
      for (let i = -3; i <= 3; i++) if (i) L.push(`<line x1="${a + i * c}" y1="${vb[1]}" x2="${a + i * c}" y2="${vb[1] + vb[3]}"/>`);
      for (let y = vb[1] + c; y < vb[1] + vb[3] - 2; y += c) L.push(`<line x1="${vb[0]}" y1="${y}" x2="${vb[0] + vb[2]}" y2="${y}"/>`);
      guide = `<g stroke="${T.grid}" stroke-width="${(1.2 / k).toFixed(2)}" data-lcs-htd-symgrid="1">${L.join('')}</g>`;
    }
    const axis = `<line x1="${a}" y1="${vb[1] + 4}" x2="${a}" y2="${vb[1] + vb[3] - 4}" stroke="${T.coral}" stroke-width="${(3 / k).toFixed(2)}" stroke-dasharray="${(12 / k).toFixed(1)} ${(8 / k).toFixed(1)}" data-lcs-htd-axis="${a}"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map((v) => +v.toFixed(1)).join(' ')}" width="${w}" height="${h}" data-lcs-prim="htd-half" style="display:block">` +
      `<clipPath id="k495L"><rect x="${vb[0]}" y="${vb[1]}" width="${a - vb[0]}" height="${vb[3]}"/></clipPath>` +
      `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="#FFFFFF"/>${guide}${left}${key ? mirror(ink) : ''}${axis}</svg>`;
    const box = `<div data-lcs-htd-box="${w}x${h}" data-lcs-htd-role="primary"${key ? ' data-lcs-key-sample="half"' : ''} style="box-sizing:content-box;border:2.5px solid ${T.creamDeep};border-radius:14px;overflow:hidden;line-height:0">${svg}</div>`;
    return { bodyHtml: H.root('other-half', unit, box, `data-lcs-htd-guide="${d.guide}"`), meta: { unit, axis: a } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const svg = document.querySelector('svg[data-lcs-prim="htd-half"]');
      if (!svg) return ['no picture'];
      const axis = svg.querySelector('[data-lcs-htd-axis]'), vb = svg.viewBox.baseVal;
      if (!axis) fails.push('no mirror line');
      else { const a = +axis.getAttribute('data-lcs-htd-axis'); if (Math.abs((a - vb.x) - vb.width / 2) > 1) fails.push('the mirror line is not in the middle of the picture'); }
      const R = document.querySelector('[data-lcs-htd-face]'), g = R.dataset.lcsHtdGuide;
      if (g === 'pale' && !svg.querySelector('[data-lcs-htd-mirror]') && !document.querySelector('[data-lcs-key-sample]')) fails.push('level 1 has no pale half');
      if (g === 'grid' && !svg.querySelector('[data-lcs-htd-symgrid]')) fails.push('level 2 has no squares');
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect(), b = svg.getBoundingClientRect();
      if (b.bottom > pg.bottom + 1 || b.right > pg.right + 1) fails.push('the picture leaves the page');
      return fails;
    });
  },
};
