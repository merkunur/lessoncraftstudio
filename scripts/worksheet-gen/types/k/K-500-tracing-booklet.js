/**
 * K-500 — A Tracing Booklet (Picture Tracing maker 2026-11-02, NEW-TEMPLATES §31 T4): one sheet cut into four pages — a
 * cover with the theme's name and three pictures of that theme to trace — stapled into a little book.
 *
 * The three pictures are traced library drawings of ONE theme at the level's band (lib/pt-faces.js), three different
 * things; the cover prints the theme's name as the site names it (data/pt/booklet-themes.json, tools/pt-booklet-themes.js:
 * the catalogue's reviewed 11-language theme names) and the first picture small and solid to colour. Each page keeps the
 * band's rules. Copies walk the themes in turn (copy 1 animals, copy 2 vehicles …).
 * Levels: 1 PreK — thick dashes, simple drawings · 2 K · 3 G1 — fine dashes, detailed drawings.
 */
'use strict';
const P = require('../../lib/pt-faces.js');
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const THEMES = require('../../data/pt/booklet-themes.json');

const D = { 1: {}, 2: {}, 3: {} };
const _groups = new Map();
/** the level's booklets: per theme, its drawings in the face's order cut into threes (three different nouns); themes interleaved */
function booklets(level) {
  if (!_groups.has(level)) {
    const man = require('../../image-cache/resolve.js').manifest().themes;   // (the platform's manifest: the maker preloads it)
    const baseOf = (src) => { const t = src.split('/')[0]; return (man[t] && man[t].baseTheme) || t; };
    const noun = (src) => src.split('/')[1].replace(/_\d+$/, '');
    const by = new Map();
    for (const src of P.drawings('K-500', level)) { const b = baseOf(src); if (!THEMES[b]) continue; if (!by.has(b)) by.set(b, []); by.get(b).push(src); }
    const lists = makeRng('K-500|themes|' + level).shuffle([...by.entries()]).map(([b, srcs]) => {
      const out = [], rest = srcs.slice();
      while (rest.length) {
        const g = [];
        for (let i = 0; i < rest.length && g.length < 3;) { if (g.some((x) => noun(x) === noun(rest[i]))) { i++; continue; } g.push(rest.splice(i, 1)[0]); }
        if (g.length < 3) break;
        out.push({ base: b, srcs: g });
      }
      return out;
    }).filter((l) => l.length);
    const all = [];
    for (let i = 0; lists.some((l) => l[i]); i++) for (const l of lists) if (l[i]) all.push(l[i]);
    _groups.set(level, all);
  }
  return _groups.get(level);
}

module.exports = {
  id: 'K-500',
  slug: 'tracing-booklet',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'A Tracing Booklet',
      instruction: 'Trace the three pictures. Then cut along the dashed lines, put the cover on top and staple the pages into a little book.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const L = P.LEVEL[difficulty], loc = String(locale || 'en').slice(0, 2);
    const list = booklets(difficulty);
    const n = P.copyOf(ctx);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const cellW = 330, cellH = Math.floor((700 - extra) / 2);
    let pages = null, bk = null, err;
    for (let k = 0; k < Math.min(30, list.length) && !pages; k++) {
      bk = list[(n - 1 + k) % list.length];
      if (!bk.srcs.every(P.allowed)) continue;   // a booklet with a refused picture (lib/pt-faces.js allowed): the next one
      try { pages = bk.srcs.map((src) => P.composeFit({ W: cellW - 10, H: cellH - 10, band: L.band, style: L.style, occlusion: false, items: [{ src, x: (cellW - 10) / 2, y: cellH - 18, fitBox: [cellW - 40, cellH - 40], start: 'top' }] }, L.band)); }
      catch (e) { err = e; pages = null; if (!/pt-faces|pt-scene/.test(e.message)) throw e; }
    }
    if (!pages) throw new Error('K-500: no booklet fits (' + (err && err.message) + ')');
    const name = THEMES[bk.base].names[loc] || THEMES[bk.base].names.en;
    // the cover: the theme's name and the first picture small and solid (to colour), inside a frame
    const cover = P.composeFit({ W: cellW - 10, H: cellH - 110, band: L.band, style: L.style, occlusion: false, items: [{ src: bk.srcs[0], x: (cellW - 10) / 2, y: cellH - 124, fitBox: [180, cellH - 150], render: 'model' }] }, L.band);
    const cell = (inner, i) => `<div data-lcs-pt-page="${i + 1}" style="box-sizing:border-box;width:${cellW}px;height:${cellH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;${i % 2 === 0 ? `border-right:2px dashed ${T.inkSoft};` : ''}${i < 2 ? `border-bottom:2px dashed ${T.inkSoft};` : ''}">${inner}</div>`;
    const coverHtml = `<div data-lcs-pt-cover="${bk.base}" style="display:flex;flex-direction:column;align-items:center;gap:6px;width:${cellW - 30}px;height:${cellH - 30}px;box-sizing:border-box;border:3px solid ${T.teal};border-radius:16px;padding-top:14px">` +
      `<div style="font:700 ${name.length > 18 ? 26 : 34}px/1.1 'Baloo 2',cursive;color:${T.teal};text-align:center;padding:0 10px">${name}</div>${cover.svg.replace('data-lcs-prim="pt-scene"', 'data-lcs-prim="pt-cover"')}</div>`;
    const cells = [cell(coverHtml, 0)].concat(pages.map((o, i) => cell(o.svg, i + 1)));
    const body = `<div data-ws-content data-lcs-pt-face="booklet" data-lcs-pt-theme="${bk.base}" style="flex:1;display:flex;align-items:center;justify-content:center">` +
      `<div style="display:grid;grid-template-columns:${cellW}px ${cellW}px;grid-template-rows:${cellH}px ${cellH}px">${cells.join('')}</div></div>`;
    return { bodyHtml: body, meta: { theme: bk.base, pictures: bk.srcs.join('|') } };
  },

  async verify(page) {
    const f = await P.checkPage(page);
    const own = await page.evaluate(() => {
      const out = [];
      if (document.querySelectorAll('[data-lcs-pt-page]').length !== 4) out.push('the booklet does not have four pages');
      if (document.querySelectorAll('svg[data-lcs-prim="pt-scene"]').length !== 3) out.push('the booklet does not have three pictures to trace');
      const c = document.querySelector('[data-lcs-pt-cover]');
      if (!c || !c.textContent.trim()) out.push('the cover has no name');
      return out;
    });
    return f.concat(own);
  },
};
