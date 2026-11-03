/**
 * K-549 — Read and Glue (Position Words maker 2026-11-02, NEW-TEMPLATES §44 T4; K.G.A.1 + RF.K.4 read with purpose;
 * hands-on): each row the grammar engine's sentence ("[ball] is under the circle.") and the shape with three dashed spots
 * around it — the one the sentence names and two others (in, on top of, under, next to; never two spots a child cannot
 * tell apart); the children cut the pictures from the strip at the bottom and glue each on its spot. On the screen the
 * child taps the right spot; the key rings it.
 * Levels: 1 three rows · 2 four rows · 3 five rows.
 */
'use strict';
const P = require('../_shared/position-scenes.js');
const { positionItems, sentenceHtml } = require('../_shared/position-items.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { rows: 3 }, 2: { rows: 4 }, 3: { rows: 5 } };
const SPOTS = ['in', 'on top of', 'under', 'next to'];

/** the spot of a relation around a shape box (x, y, s), for a sticker of size o */
function spot(prep, x, y, s, o) {
  switch (prep) {
    case 'in': return [x + s / 2 - o / 2, y + s / 2 - o / 2];
    case 'on top of': return [x + s / 2 - o / 2, y - o - 2];
    case 'under': return [x + s / 2 - o / 2, y + s + 8];
    case 'next to': return [x + s + 12, y + s / 2 - o / 2];
    default: throw new Error('K-549: no spot for ' + prep);
  }
}

module.exports = {
  id: 'K-549',
  slug: 'read-and-glue-positions',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'position-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Read and Glue', instruction: 'Cut out the pictures at the bottom. Read each sentence and glue the picture on the right spot.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const items = positionItems({ locale: L, level: 1, rows: d.rows, rng, preps: SPOTS, accept: (p, sh) => P.CONTAINERS.includes(sh) });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const H = d.rows <= 3 ? 190 : d.rows === 4 ? 150 : 124, s = Math.round(H * 0.42), o = Math.round(H * 0.24), W = 250;
    const rows = items.map((it) => {
      const x = Math.round(W / 2 - s / 2 - o / 2), y = Math.round((H - s) / 2);
      const others = rng.shuffle(SPOTS.filter((p) => p !== it.prep)).slice(0, 2);
      const spots = rng.shuffle([it.prep, ...others]).map((p) => { const [sx, sy] = spot(p, x, y, s, o); return `<span data-lcs-spot="${p}"${mark && p === it.prep ? ' data-lcs-correct="1"' : ''} style="position:absolute;left:${Math.round(sx)}px;top:${Math.round(sy)}px;width:${o}px;height:${o}px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:rgba(255,255,255,.55);z-index:3"></span>`; }).join('');
      const scene = `<div style="position:relative;width:${W}px;height:${H}px;flex:0 0 auto"><svg xmlns="http://www.w3.org/2000/svg" data-lcs-prim="pos-scene" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" style="position:absolute;left:0;top:0">${P.shapeSvg(it.shape, x, y, s)}</svg>${spots}</div>`;
      return `<div data-lcs-glue-row="${it.prep}" style="display:flex;align-items:center;gap:14px;padding:4px 12px;border-radius:14px;background:${T.cream}">` +
        `<div style="flex:1 1 auto;min-width:0;font:700 22px/1.4 'Baloo 2',cursive;color:${T.ink}">${sentenceHtml(it, `<span>${it.sent.expected}</span>`, 38)}</div>${scene}</div>`;
    });
    const strip = `<div data-lcs-glue-strip style="display:flex;justify-content:center;gap:0;padding-top:12px;border-top:2.5px dashed ${T.grid};flex:0 0 auto">` +
      rng.shuffle(items.slice()).map((it) => `<span style="display:inline-flex;padding:6px;border:2px dashed ${T.inkSoft};background:#FFFFFF"><img class="ws-icon" src="${it.src}" alt="" style="width:${o + 6}px;height:${o + 6}px"></span>`).join('') + `</div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-glue style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${rows.join('')}${strip}</div>`,
      meta: { rows: items.map((it) => `${it.key} ${it.prep} ${it.shape}`), sentences: items.map((it) => it.sent.prefix.replace('{img}', `[${it.key}]`) + `<${it.sent.expected}>` + it.sent.suffix), answers: items.map((it) => it.prep) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-glue-row]')];
      if (rows.length < 3) fails.push(`${rows.length} rows`);
      rows.forEach((r, i) => {
        const spots = [...r.querySelectorAll('[data-lcs-spot]')].map((x) => x.dataset.lcsSpot);
        if (spots.length !== 3 || !spots.includes(r.dataset.lcsGlueRow)) fails.push(`row ${i + 1}: the spots miss the sentence's place`);
        r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); });
      });
      const root = document.querySelector('[data-lcs-glue]').getBoundingClientRect(), st = document.querySelector('[data-lcs-glue-strip]').getBoundingClientRect();
      if (st.bottom > root.bottom + 1) fails.push('the sticker strip leaves the page');
      return fails;
    });
  },
};
