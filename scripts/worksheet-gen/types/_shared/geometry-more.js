/**
 * More Shapes & Geometry templates (the maker, 2026-11-02):
 *   area-draw  G3-477 Rectangles of a Given Area — a grid on every card and an area (level 3: an area AND a perimeter);
 *              the child draws the rectangle(s). 3.MD.C.5-7 (area by unit squares), 3.MD.D.8 (same area, different
 *              perimeter). Level 1 one rectangle per area; level 2 TWO different rectangles of the same area; level 3
 *              the area and the perimeter together allow ONE rectangle (turned either way), so the key is the answer —
 *              on levels 1 and 2 the key draws one example (any rectangle of that area is right).
 *   net        G2-478 Nets to Cut and Fold — a net to cut out, fold and glue: level 1 a cube that becomes a die (its dots
 *              1-6, opposite faces adding up to 7), level 2 a box (rectangular prism), level 3 a square pyramid. Solid
 *              lines are cut, dashed lines are folded, the grey tabs are glued. Classroom material: no key, no screen.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const INK = tokens.color.ink, TEAL = tokens.color.teal, GRID = tokens.color.grid;
const f1 = (v) => Math.round(v * 10) / 10;
const loc2 = (l) => (l || 'en').slice(0, 2);

// the card labels of the area page (content words: reviewed with the page)
const LABELS = {
  en: { area: 'Area: {n} square units', perim: 'Perimeter: {n} units', example: 'Example' },
  de: { area: 'Flächeninhalt: {n} Kästchen', perim: 'Umfang: {n} Kästchenlängen', example: 'Beispiel' },
  fr: { area: 'Aire : {n} carreaux', perim: 'Périmètre : {n} côtés de carreau', example: 'Exemple' },
  es: { area: 'Área: {n} unidades cuadradas', perim: 'Perímetro: {n} unidades', example: 'Ejemplo' },
  pt: { area: 'Área: {n} quadradinhos', perim: 'Perímetro: {n} lados de quadradinho', example: 'Exemplo' },
  it: { area: 'Area: {n} quadretti', perim: 'Perimetro: {n} lati di quadretto', example: 'Esempio' },
  nl: { area: 'Oppervlakte: {n} hokjes', perim: 'Omtrek: {n} hokjeszijden', example: 'Voorbeeld' },
  sv: { area: 'Area: {n} rutor', perim: 'Omkrets: {n} rutsidor', example: 'Exempel' },
  da: { area: 'Areal: {n} tern', perim: 'Omkreds: {n} ternsider', example: 'Eksempel' },
  no: { area: 'Areal: {n} ruter', perim: 'Omkrets: {n} rutesider', example: 'Eksempel' },
  fi: { area: 'Pinta-ala: {n} ruutua', perim: 'Piiri: {n} ruudun sivua', example: 'Esimerkki' },
};

const AREA_LEVELS = {
  1: { cards: 4, cols: 2, gw: 9, gh: 7, cell: 26, two: false, perim: false, areas: [4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20] },
  2: { cards: 3, cols: 1, gw: 16, gh: 7, cell: 26, two: true, perim: false, areas: [6, 8, 10, 12, 16, 18, 20, 24] },
  3: { cards: 4, cols: 2, gw: 10, gh: 8, cell: 24, two: false, perim: true },
};
/** the rectangles (rows × cols, rows ≤ cols) of area n that fit a gw × gh grid either way round */
function fits(n, gw, gh) {
  const out = [];
  for (let a = 1; a * a <= n; a++) if (n % a === 0) { const b = n / a; if (a <= gh && b <= gw) out.push([a, b]); }
  return out;
}
/** two different rectangles of area n that fit side by side (a gap of one square) */
function twoFit(n, gw, gh) {
  const r = fits(n, gw, gh).filter(([a]) => a >= 2 || n <= 8);
  for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) if (r[i][1] + 1 + r[j][1] <= gw - 2) return [r[i], r[j]];
  return null;
}

function gridSvg(d, samples, data) {
  const W = d.gw * d.cell, H = d.gh * d.cell, m = 2;
  let s = `<rect x="${m}" y="${m}" width="${W}" height="${H}" fill="#FFFFFF" stroke="${GRID}" stroke-width="2"/>`;
  for (let i = 1; i < d.gw; i++) s += `<line x1="${m + i * d.cell}" y1="${m}" x2="${m + i * d.cell}" y2="${m + H}" stroke="${GRID}" stroke-width="1.2"/>`;
  for (let j = 1; j < d.gh; j++) s += `<line x1="${m}" y1="${m + j * d.cell}" x2="${m + W}" y2="${m + j * d.cell}" stroke="${GRID}" stroke-width="1.2"/>`;
  for (const [r, c, rows, cols] of samples) s += `<rect x="${m + c * d.cell}" y="${m + r * d.cell}" width="${cols * d.cell}" height="${rows * d.cell}" fill="${tokens.color.coralSoft}" stroke="${tokens.color.coral}" stroke-width="3.5" data-lcs-key-sample="1" data-lcs-sample="${rows}x${cols}"/>`;
  return `<svg width="${W + 2 * m}" height="${H + 2 * m}" viewBox="0 0 ${W + 2 * m} ${H + 2 * m}" data-lcs-prim="area-grid" data-lcs-gw="${d.gw}" data-lcs-gh="${d.gh}"${data}>${s}</svg>`;
}

// ---------- nets ----------
const TAB = 30;   // glue tab depth (px): deep enough for a seven-year-old to cut (26 read as a sliver)
/** a glue tab on the edge p→q, on the side away from the face (outward normal given by the face's centre) */
function tab(p, q, centre) {
  const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy);
  let nx = -dy / L, ny = dx / L;
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
  if ((centre[0] - mx) * nx + (centre[1] - my) * ny > 0) { nx = -nx; ny = -ny; }
  const k = Math.min(TAB, L * 0.3), ux = dx / L, uy = dy / L;
  const a = [p[0] + nx * TAB + ux * k, p[1] + ny * TAB + uy * k], b = [q[0] + nx * TAB - ux * k, q[1] + ny * TAB - uy * k];
  return `<polygon points="${[p, a, b, q].map(([x, y]) => f1(x) + ',' + f1(y)).join(' ')}" fill="${tokens.color.inkSoft}" fill-opacity="0.4" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" data-lcs-tab="1"/>`;
}
const polyStr = (P) => P.map(([x, y]) => f1(x) + ',' + f1(y)).join(' ');
/** the die's dots on a face of side s at (x, y): n of the classic patterns */
function dots(n, x, y, s) {
  const r = s * 0.075, a = s * 0.27, c = s / 2;
  const P = { 1: [[c, c]], 2: [[a, a], [s - a, s - a]], 3: [[a, a], [c, c], [s - a, s - a]], 4: [[a, a], [s - a, a], [a, s - a], [s - a, s - a]],
    5: [[a, a], [s - a, a], [c, c], [a, s - a], [s - a, s - a]], 6: [[a, a], [s - a, a], [a, c], [s - a, c], [a, s - a], [s - a, s - a]] }[n];
  return P.map(([px, py]) => `<circle cx="${f1(x + px)}" cy="${f1(y + py)}" r="${f1(r)}" fill="${INK}" data-lcs-dot="${n}"/>`).join('');
}
/**
 * A net: faces (polygons), the fold edges (shared by two faces, dashed), the cut outline (every other face edge, solid)
 * and the tabs (on the cut edges listed). Everything in px; the caller centres it.
 */
function drawNet(faces, tabEdges, extra) {
  const key = (p, q) => [p, q].map(([x, y]) => f1(x) + ',' + f1(y)).sort().join('|');
  const edgeUse = new Map();
  faces.forEach((F) => F.forEach((p, i) => { const q = F[(i + 1) % F.length]; const k = key(p, q); edgeUse.set(k, (edgeUse.get(k) || 0) + 1); }));
  let tabs = '', fill = '', folds = '', cuts = '';
  const centreOf = (F) => [F.reduce((s, p) => s + p[0], 0) / F.length, F.reduce((s, p) => s + p[1], 0) / F.length];
  faces.forEach((F, fi) => {
    fill += `<polygon points="${polyStr(F)}" fill="#FFFFFF" stroke="none" data-lcs-face="${fi}"/>`;
    F.forEach((p, i) => {
      const q = F[(i + 1) % F.length], k = key(p, q);
      if (edgeUse.get(k) > 1) { if (!folds.includes(`data-lcs-e="${k}"`)) folds += `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${TEAL}" stroke-width="2.5" stroke-dasharray="9 6" data-lcs-fold="1" data-lcs-e="${k}"/>`; }
      else {
        const hasTab = tabEdges.some(([f, e]) => f === fi && e === i);
        if (hasTab) tabs += tab(p, q, centreOf(F));
        else cuts += `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${INK}" stroke-width="3" stroke-linecap="round" data-lcs-cut="1"/>`;
        if (hasTab) folds += `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${TEAL}" stroke-width="2.5" stroke-dasharray="9 6" data-lcs-fold="1" data-lcs-tabfold="1"/>`;
      }
    });
  });
  return tabs + fill + (extra || '') + folds + cuts;
}
const sq = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const NETS = {
  // cube: the cross (a column of four, one face either side of the second)
  1: (s) => {
    const x0 = s + TAB, y0 = TAB;
    const F = [sq(x0, y0, s, s), sq(x0, y0 + s, s, s), sq(x0, y0 + 2 * s, s, s), sq(x0, y0 + 3 * s, s, s), sq(x0 - s, y0 + s, s, s), sq(x0 + s, y0 + s, s, s)];
    // the die: faces 0-3 down the column, 4 left, 5 right; opposite pairs (0,2) (1,3) (4,5) add to 7
    const pips = [2, 1, 5, 6, 3, 4];
    // tabs: seven seams close a cube, one tab each (face 1 is the bottom, 3 the top): 0 top↔3 bottom, 0 left↔4 top, 0 right↔5 top,
    // 2 left↔4 bottom, 2 right↔5 bottom, 3 left↔4 left, 3 right↔5 right
    const tabs = [[0, 0], [0, 3], [0, 1], [4, 2], [5, 2], [4, 3], [3, 1]];
    return { faces: F, tabs, extra: F.map((f, i) => dots(pips[i], f[0][0], f[0][1], s)).join(''), pips, w: 3 * s + 2 * TAB, h: 4 * s + 2 * TAB, kind: 'cube' };
  },
  // box l × w × h: a band of four sides (l, w, l, w) of height h, the top and the bottom (l × w) on the first l side
  2: (s) => {
    const l = s, w = Math.round(s * 0.66), h = Math.round(s * 0.8), x0 = TAB, y0 = w + TAB;
    const F = [sq(x0, y0, l, h), sq(x0 + l, y0, w, h), sq(x0 + l + w, y0, l, h), sq(x0 + 2 * l + w, y0, w, h), sq(x0, y0 - w, l, w), sq(x0, y0 + h, l, w)];
    // seven seams, one tab each: the band closes (3 right ↔ 0 left), the top and the bottom close on the three other sides
    const tabs = [[3, 1], [1, 0], [2, 0], [3, 0], [1, 2], [2, 2], [3, 2]];
    return { faces: F, tabs, w: 2 * l + 2 * w + 2 * TAB, h: h + 2 * w + 2 * TAB, kind: 'box', dims: [l, w, h] };
  },
  // square pyramid: a square base and four triangles, one on each side
  3: (s) => {
    const t = Math.round(s * 0.95), x0 = t + TAB, y0 = t + TAB, c = s / 2;
    const B = sq(x0, y0, s, s);
    const F = [B, [[x0, y0], [x0 + s, y0], [x0 + c, y0 - t]], [[x0 + s, y0], [x0 + s, y0 + s], [x0 + s + t, y0 + c]], [[x0 + s, y0 + s], [x0, y0 + s], [x0 + c, y0 + s + t]], [[x0, y0 + s], [x0, y0], [x0 - t, y0 + c]]];
    return { faces: F, tabs: [[1, 1], [2, 1], [3, 1], [4, 1]], w: s + 2 * t + 2 * TAB, h: s + 2 * t + 2 * TAB, kind: 'pyramid' };
  },
};

function makeGeometryMoreType({ id, slug, mode, gradeBand, i18n }) {
  const area = mode === 'area-draw';
  return {
    id, slug, gradeBand, assetClass: area ? 'geometry' : 'manipulatives', exerciseType: 'geometry',
    themeAxis: { applicable: false },
    difficulty: area ? AREA_LEVELS : { 1: { level: 1 }, 2: { level: 2 }, 3: { level: 3 } },
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, rng = ctx.rng, L = LABELS[loc2(args.locale)] || LABELS.en;
      const key = !!(ctx && ctx.answerKey);
      if (area) {
        const d = AREA_LEVELS[lv];
        let items;
        if (d.perim) {
          // one rectangle per area AND perimeter (rows × cols, rows ≤ cols, both ≥ 2), all different on a page
          const pairs = [];
          for (let a = 2; a <= d.gh; a++) for (let b = a; b <= d.gw; b++) if (a * b <= 40) pairs.push([a, b]);
          items = rng.sample(pairs, d.cards).map(([a, b]) => ({ n: a * b, p: 2 * (a + b), rects: [[a, b]] }));
        } else {
          const ok = d.areas.filter((n) => (d.two ? twoFit(n, d.gw, d.gh) : fits(n, d.gw, d.gh).length));
          // the key's example: a rectangle at least two squares tall where one fits
          const example = (n) => { const f = fits(n, d.gw, d.gh), g = f.filter(([a]) => a >= 2); return rng.pick(g.length ? g : f); };
          items = rng.sample(ok, d.cards).map((n) => ({ n, rects: d.two ? twoFit(n, d.gw, d.gh) : [example(n)] }));
        }
        const cards = items.map((it) => {
          let c = 1;
          const samples = key ? it.rects.map(([a, b]) => { const s = [1, c, a, b]; c += b + 1; return s; }) : [];
          const lab = (t, n) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:23px;color:${INK}">${t.replace('{n}', n)}</span>`;
          return `<div class="ws-card-stage" style="flex-direction:column;gap:8px;padding:6px 10px 6px 36px" data-lcs-area="${it.n}"${it.p ? ` data-lcs-perim="${it.p}"` : ''} data-lcs-two="${d.two ? 1 : 0}">` +
            `<div style="display:flex;gap:22px;flex-wrap:wrap;justify-content:center">${lab(L.area, it.n)}${it.p ? lab(L.perim, it.p) : ''}</div>` +
            gridSvg(d, samples, '') +
            (key && !it.p ? `<span style="font-family:'Nunito';font-weight:800;font-size:17px;color:${tokens.color.coral}" data-lcs-example>${L.example}</span>` : '') + `</div>`;
        });
        return { bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${cardGrid({ cards, cols: d.cols, rows: Math.ceil(d.cards / d.cols) })}</div>`,
          meta: { items: items.map((it) => (it.p ? it.n + '/' + it.p : String(it.n))) } };
      }
      // net
      const s = lv === 1 ? 150 : lv === 2 ? 170 : 165;
      const net = NETS[lv](s);
      const svg = `<svg width="${f1(net.w)}" height="${f1(net.h)}" viewBox="0 0 ${f1(net.w)} ${f1(net.h)}" data-lcs-prim="net" data-lcs-net="${net.kind}"${net.pips ? ` data-lcs-pips="${net.pips.join('')}"` : ''}>${drawNet(net.faces, net.tabs, net.extra)}</svg>`;
      // the legend: a solid line = cut, a dashed line = fold, a grey tab = glue (pictures, no words)
      const leg = `<div style="display:flex;gap:28px;justify-content:center;align-items:center" data-lcs-net-legend>` +
        `<svg width="150" height="44" viewBox="0 0 150 44"><line x1="8" y1="22" x2="58" y2="22" stroke="${INK}" stroke-width="3"/><path d="M78 12 l20 10 l-20 10 M78 32 l20 -10" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="74" cy="12" r="6" fill="none" stroke="${INK}" stroke-width="2.5"/><circle cx="74" cy="32" r="6" fill="none" stroke="${INK}" stroke-width="2.5"/></svg>` +
        `<svg width="120" height="44" viewBox="0 0 120 44"><line x1="8" y1="22" x2="112" y2="22" stroke="${TEAL}" stroke-width="2.5" stroke-dasharray="9 6"/></svg>` +
        `<svg width="90" height="44" viewBox="0 0 90 44"><polygon points="10,36 24,8 66,8 80,36" fill="${tokens.color.inkSoft}" fill-opacity="0.4" stroke="${INK}" stroke-width="2.5"/></svg></div>`;
      return {
        bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:10px;min-height:0" data-lcs-net-page="${net.kind}">${svg}${leg}</div>`,
        meta: { items: [net.kind] },
      };
    },

    async verify(page) {
      return page.evaluate((isArea) => {
        const fails = [];
        if (isArea) {
          document.querySelectorAll('[data-lcs-area]').forEach((c, i) => {
            const n = +c.dataset.lcsArea, p = c.dataset.lcsPerim ? +c.dataset.lcsPerim : null, two = c.dataset.lcsTwo === '1';
            const g = c.querySelector('[data-lcs-prim="area-grid"]'), gw = +g.dataset.lcsGw, gh = +g.dataset.lcsGh;
            // something must fit: the rectangle(s) the card asks for exist on this grid
            const fit = []; for (let a = 1; a <= gh; a++) if (n % a === 0 && n / a <= gw) fit.push([a, n / a]);
            if (!fit.length) fails.push(`card ${i + 1}: no rectangle of area ${n} fits the grid`);
            if (p != null) { const u = [...new Set(fit.filter(([a, b]) => 2 * (a + b) === p).map(([a, b]) => Math.min(a, b) + 'x' + Math.max(a, b)))]; if (u.length !== 1) fails.push(`card ${i + 1}: ${u.length} rectangles have area ${n} and perimeter ${p}`); }
            if (two && new Set(fit.map(([a, b]) => Math.min(a, b) + 'x' + Math.max(a, b))).size < 2) fails.push(`card ${i + 1}: only one rectangle has area ${n}`);
            const ss = [...c.querySelectorAll('[data-lcs-sample]')].map((e) => e.dataset.lcsSample.split('x').map(Number));
            ss.forEach(([a, b]) => { if (a * b !== n) fails.push(`card ${i + 1}: the key's ${a}×${b} is not ${n} squares`); if (p != null && 2 * (a + b) !== p) fails.push(`card ${i + 1}: the key's ${a}×${b} has perimeter ${2 * (a + b)}`); });
            if (two && ss.length && (ss.length !== 2 || ss[0][0] === ss[1][0])) fails.push(`card ${i + 1}: the key does not show two different rectangles`);
            const gb = g.getBoundingClientRect(); c.querySelectorAll('[data-lcs-sample]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > gb.right + 1 || r.bottom > gb.bottom + 1) fails.push(`card ${i + 1}: a key rectangle leaves the grid`); });
          });
          if (!document.querySelector('[data-lcs-area]')) fails.push('no cards');
        } else {
          const svg = document.querySelector('[data-lcs-prim="net"]');
          if (!svg) return ['no net'];
          const faces = svg.querySelectorAll('[data-lcs-face]').length, kind = svg.dataset.lcsNet;
          const want = { cube: 6, box: 6, pyramid: 5 }[kind];
          if (faces !== want) fails.push(`${kind}: ${faces} faces, not ${want}`);
          if (kind === 'cube') { const pips = svg.dataset.lcsPips.split('').map(Number); if ([0, 1, 4].some((i) => pips[i] + pips[{ 0: 2, 1: 3, 4: 5 }[i]] !== 7)) fails.push('opposite faces of the die do not add up to 7'); for (let n = 1; n <= 6; n++) if (svg.querySelectorAll(`[data-lcs-dot="${n}"]`).length !== n) fails.push(`the ${n} face has ${svg.querySelectorAll(`[data-lcs-dot="${n}"]`).length} dots`); }
          if (!svg.querySelector('[data-lcs-fold]') || !svg.querySelector('[data-lcs-cut]') || !svg.querySelector('[data-lcs-tab]')) fails.push('the net lacks cut lines, folds or tabs');
          // a tab must not lie on a face (it could not be cut out): the tab's middle, in no face polygon
          const P = (e) => e.getAttribute('points').trim().split(/\s+/).map((q) => q.split(',').map(Number));
          const inside = (pt, Q) => { let r = false; for (let i = 0, j = Q.length - 1; i < Q.length; j = i++) if ((Q[i][1] > pt[1]) !== (Q[j][1] > pt[1]) && pt[0] < ((Q[j][0] - Q[i][0]) * (pt[1] - Q[i][1])) / (Q[j][1] - Q[i][1]) + Q[i][0]) r = !r; return r; };
          const facePolys = [...svg.querySelectorAll('[data-lcs-face]')].map(P);
          svg.querySelectorAll('[data-lcs-tab]').forEach((t, i) => { const Q = P(t); const c = [Q.reduce((s, q) => s + q[0], 0) / Q.length, Q.reduce((s, q) => s + q[1], 0) / Q.length]; if (facePolys.some((F) => inside(c, F))) fails.push(`tab ${i + 1} lies on a face`); });
          const pb = document.querySelector('[data-lcs-page]').getBoundingClientRect(), nb = svg.getBoundingClientRect();
          if (nb.left < pb.left || nb.right > pb.right || nb.bottom > pb.bottom) fails.push('the net leaves the page');
        }
        return fails;
      }, area);
    },
  };
}

module.exports = { makeGeometryMoreType, NETS, AREA_LEVELS, fits, twoFit, LABELS };
