/**
 * G1-489 — Which Figure Can You Build? (Tangram maker 2026-11-02, NEW-TEMPLATES §36 T3; 1.G.A.2, area reasoning): each row
 * shows a set of tangram pieces and three shadows; the child circles the one shadow those pieces make — reasoning from the
 * pieces (how many, how big) before building.
 * One right answer by construction: the right shadow is a stored tangram tiling made of EXACTLY the pieces shown (the
 * bank's minis, sub-figures and figures, data/b4/tangram-figures.js, each validated by the lattice tiler), and the two
 * others cover a different AREA (the three areas all differ), so the shown pieces cannot cover them. The pieces and the
 * three shadows are drawn at ONE scale (the pieces true size in a column beside the shadows), so sizes can be compared by
 * eye. No size tell: each row draws the right shadow's size rank among the three (smallest / middle / biggest) at random
 * and picks the wrong shadows to match it where the pool allows, and a full seven-piece set (always the biggest) is never
 * asked. The right shadow's place is the row's shuffle.
 * Levels: 1 two or three pieces · 2 three or four · 3 four to six (two rows, the bigger figures as wrong shadows).
 */
'use strict';
const TG = require('../../primitives/tangram.js');
const { TANGRAM_FIGURES: FIG } = require('../../data/b4/tangram-figures.js');
const T = require('../../primitives/_tokens.js').color;

const AREA = { L: 0.25, M: 0.125, S: 0.0625, Q: 0.125, P: 0.125 };
const ORDER = { L: 0, M: 1, S: 2, Q: 3, P: 4 };
const D = {
  1: { rows: 3, S: 126, pieces: [2, 3], from: ['mini', 'sub'] },
  2: { rows: 3, S: 126, pieces: [3, 4], from: ['mini', 'sub'] },
  3: { rows: 2, S: 104, pieces: [4, 5, 6], from: ['mini', 'sub', 'figure'] },
};

let _all = null;
/** every stored tiling once: { kind, key, tans, classes, area } ('arrow' casts the tree's shadow — left out) */
function all() {
  if (_all) return _all;
  const out = [], seen = new Set();
  const add = (kind, key, tans) => { if (seen.has(key)) return; seen.add(key); const classes = tans.map((t) => TG.clsOf(t.id)).sort((a, b) => ORDER[a] - ORDER[b]); out.push({ kind, key, tans, classes, area: classes.reduce((s, c) => s + AREA[c], 0) }); };
  for (const k of Object.keys(FIG.MINIS)) { try { add('mini', k, FIG.mini(k).tans); } catch (e) { /* a refused mini */ } }
  for (const k of Object.keys(FIG.SUBS)) { try { add('sub', k, FIG.sub(k).tans); } catch (e) { /* a refused sub */ } }
  for (const k of Object.keys(FIG.FIGURES)) if (k !== 'arrow') add('figure', k, FIG.figure(k).tans);
  return (_all = out);
}

module.exports = {
  id: 'G1-489',
  slug: 'which-tangram-can-you-build',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'tangram',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Which Figure Can You Build?', instruction: 'Look at the pieces in each row. Circle the one shadow you can build with exactly these pieces.' } },

  build({ difficulty }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng;
    const extra = (ctx && ctx.chromeExtra) || 0;
    const rowH = Math.floor((716 - extra - (d.rows - 1) * 14) / d.rows), colW = Math.ceil(d.S * 1.06) + 20, boxW = Math.floor((659 - colW - 3 * 14) / 3), boxH = rowH - 20;
    const fitT = (e) => TG.TRANSFORM_NAMES.filter((t) => { const q = TG.placeTans(TG.transformTiling(e.tans, t), d.S, { pad: 1.5 }); return q.w <= boxW - 14 && q.h <= boxH - 14; });
    const pool = all().filter((e) => d.from.includes(e.kind) && fitT(e).length);
    const targets = rng.shuffle(pool.filter((e) => d.pieces.includes(e.classes.length)));
    const used = new Set(), rows = [];
    // each row first draws the right shadow's size rank (0 smallest, 1 middle, 2 biggest — evenly, so no rank is a tell),
    // then takes the first unused target that rank fits: two wrong shadows of other areas (all three different)
    for (let guard = 0; rows.length < d.rows && guard < 12; guard++) {
      const rank = rng.int(0, 2);
      let row = null;
      for (const target of targets) {
        if (used.has(target.key)) continue;
        const others = pool.filter((e) => !used.has(e.key) && e.key !== target.key && Math.abs(e.area - target.area) > 1e-9);
        const smaller = rng.shuffle(others.filter((e) => e.area < target.area)), bigger = rng.shuffle(others.filter((e) => e.area > target.area));
        const want = rank === 0 ? [bigger, bigger] : rank === 1 ? [smaller, bigger] : [smaller, smaller];
        const pick = [];
        for (const list of want) { const e = list.find((x) => !pick.includes(x) && pick.every((q) => Math.abs(q.area - x.area) > 1e-9)); if (e) pick.push(e); }
        if (pick.length === 2) { row = { target, pick }; break; }
      }
      if (!row) continue;
      [row.target, ...row.pick].forEach((e) => used.add(e.key));
      rows.push({ target: row.target, choices: rng.shuffle([row.target, ...row.pick]) });
    }
    if (rows.length < d.rows) throw new Error(`G1-489: only ${rows.length} rows can be drawn`);
    const html = rows.map(({ target, choices }, r) => {
      // the pieces TRUE SIZE (the shadows' scale), in a column — a long row of pieces two to a line
      // packed greedily: a piece joins the line while the line still fits the column (the small ones pair up)
      const chips = target.classes.map((c) => TG.tanChip(c, d.S)), lines = [];
      for (const c of chips) { const l = lines[lines.length - 1]; if (l && l.w + 6 + c.width <= colW - 8) { l.items.push(c.html); l.w += 6 + c.width; } else lines.push({ items: [c.html], w: c.width }); }
      lines.forEach((l, k) => { lines[k] = l.items; });
      const strip = lines.map((l) => `<div style="display:flex;align-items:center;justify-content:center;gap:6px">${l.join('')}</div>`).join('');
      const boxes = choices.map((e) => {
        const t = rng.pick(fitT(e));
        const sil = TG.tangramFigure({ figure: e.key, tans: TG.transformTiling(e.tans, t), S: d.S, mode: 'silhouette', transform: t, stroke: 3, pad: 1.5 });
        return `<span class="ws-pattern-chip" data-lcs-choice="1" data-lcs-shape="${e.key}" data-lcs-area="${e.area}" data-lcs-classes="${e.classes.join('')}"${e === target ? ' data-lcs-correct="1"' : ''} style="width:${boxW}px;height:${boxH}px;border-radius:16px;background:#FFFFFF">${sil.html}</span>`;
      }).join('');
      return `<div class="ws-card" data-lcs-build-row="${r + 1}" data-lcs-pieces="${target.classes.join('')}" style="width:675px;height:${rowH}px;flex:0 0 auto;flex-direction:row;align-items:center;justify-content:space-between;gap:14px;padding:8px;background:#FFFFFF">` +
        `<div data-lcs-glyph-strip style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:${colW}px;height:${boxH}px;flex:0 0 auto;border-radius:16px;background:${T.cream}">${strip}</div>` +
        `<div style="display:flex;gap:14px;justify-content:center">${boxes}</div></div>`;
    }).join('');
    const body = `<div data-ws-content data-lcs-build-which="${difficulty}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:14px;min-height:0">${html}</div>`;
    return { bodyHtml: body, meta: { rows: rows.map((x) => x.target.key) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const AREA = { L: 0.25, M: 0.125, S: 0.0625, Q: 0.125, P: 0.125 };
      const rows = [...document.querySelectorAll('[data-lcs-build-row]')];
      if (rows.length < 2) fails.push(`${rows.length} rows`);
      const seen = new Set();
      rows.forEach((r, i) => {
        const pcs = r.dataset.lcsPieces, area = pcs.split('').reduce((s, c) => s + AREA[c], 0);
        const glyphs = [...r.querySelectorAll('[data-lcs-glyph-strip] [data-lcs-chip]')].map((g) => g.getAttribute('data-lcs-chip')).join('');
        // the pieces are drawn at the shadows' scale
        const sc = new Set([...r.querySelectorAll('[data-lcs-scale]')].map((x) => x.getAttribute('data-lcs-scale'))); if (sc.size !== 1) fails.push(`row ${i + 1}: the pieces and the shadows are drawn at different scales`);
        const st = r.querySelector('[data-lcs-glyph-strip]').getBoundingClientRect(); r.querySelectorAll('[data-lcs-glyph-strip] svg').forEach((g) => { const q = g.getBoundingClientRect(); if (q.right > st.right + 1 || q.bottom > st.bottom + 1 || q.left < st.left - 1 || q.top < st.top - 1) fails.push(`row ${i + 1}: a piece leaves its column`); });
        if (glyphs !== pcs) fails.push(`row ${i + 1}: the strip shows ${glyphs}, the pieces are ${pcs}`);
        const ch = [...r.querySelectorAll('[data-lcs-choice]')], right = ch.filter((c) => c.hasAttribute('data-lcs-correct'));
        if (ch.length !== 3 || right.length !== 1) { fails.push(`row ${i + 1}: ${ch.length} shadows, ${right.length} right`); return; }
        if (right[0].dataset.lcsClasses !== pcs) fails.push(`row ${i + 1}: the right shadow is not made of the pieces shown`);
        ch.forEach((c) => { if (c !== right[0] && Math.abs(+c.dataset.lcsArea - area) < 1e-9) fails.push(`row ${i + 1}: ${c.dataset.lcsShape} has the pieces' area (two right answers)`); });
        const areas = ch.map((c) => +c.dataset.lcsArea); if (new Set(areas.map((a) => a.toFixed(6))).size !== 3) fails.push(`row ${i + 1}: two shadows of one area`);
        ch.forEach((c) => { if (seen.has(c.dataset.lcsShape)) fails.push(`${c.dataset.lcsShape} twice on the page`); seen.add(c.dataset.lcsShape); const R = c.getBoundingClientRect(), s = c.querySelector('svg').getBoundingClientRect(); if (s.width > R.width + 1 || s.height > R.height + 1) fails.push(`row ${i + 1}: a shadow leaves its box`); });
      });
      return fails;
    });
  },
};
