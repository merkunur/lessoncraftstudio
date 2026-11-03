/**
 * d2d-more — new label sequences on the Dot to Dot maker's proven scene dots (makers 2026-11-02, NEW-TEMPLATES §25; the
 * dots and the picture are K-285's d2d scenes, the lever is what the dots say):
 *   words  K-505 Number-Word Dot-to-Dot — the dots carry number WORDS (one, two, three …; lib/number-words.js, every
 *               language's own); the child reads them and joins them in order. Level 1 one to ten with the words in
 *               order under the picture, level 2 one to ten on a busier picture, no list, level 3 eleven to twenty.
 *   pairs  K-507 Capital and Small Letters — A a B b C c …: the child joins a capital, then its small letter, then the
 *               next capital (case pairs in motion; the locale's own alphabet order, data/b2/collation.js). Level 1 A–E
 *               with the sequence under the picture, level 2 A–J, level 3 the next ten pairs (K–T in English).
 *   parity K-506 Even Dots Only — the outline's dots carry the even numbers (2, 4, 6 …); odd-numbered DECOY dots sit
 *               on free paper away from the outline: a child who joins every number in turn draws a wrong picture.
 *               Level 1 joins 2–20 past four odd decoys, level 2 joins the ODD numbers 1–19 past five even decoys, level 3
 *               joins 22–40 past six odd decoys (2.OA.C.3, odd and even, inside the dot-to-dot).
 * A picture is offered only when every label finds free paper beside its own dot at the level's label size (the
 * d2dPool placement test, indexed for the maker by tools/build-d2d-index.js). The key joins the dots.
 */
'use strict';
const sceneDotFigure = require('../../primitives/scene-dot-figure.js');
const { d2d } = require('../k/K-285-dot-to-dot.js');
const { numberWord } = require('../../lib/number-words.js');
const { COLLATION } = require('../../data/b2/collation.js');

const LEVELS = {
  // words: ten dots a page (twenty word labels find no room: measured 2026-11-02, ≤ 6 pictures in any language); the
  // pictures are drawn without their background (heroOnly) so the words sit on free paper
  words: { 1: { n: 10, from: 1, band: 'lowHalf', offset: 0, labelPx: 15, strip: true, heroOnly: true }, 2: { n: 10, from: 1, band: 'highHalf', offset: 0, labelPx: 15, strip: false, heroOnly: true }, 3: { n: 10, from: 11, band: 'all', offset: 0, labelPx: 14, strip: false, heroOnly: true } },
  parity: { 1: { n: 10, from: 2, by: 2, decoys: 4, band: 'lowHalf', offset: 3, labelPx: 18, strip: false, heroOnly: true }, 2: { n: 10, from: 1, by: 2, decoys: 5, band: 'highHalf', offset: 1, labelPx: 18, strip: false, heroOnly: true }, 3: { n: 10, from: 22, by: 2, decoys: 6, band: 'all', offset: 5, labelPx: 18, strip: false, heroOnly: true } },
  pairs: { 1: { n: 10, from: 0, band: 'low', offset: 4, labelPx: 20, strip: true }, 2: { n: 20, from: 0, band: 'all', offset: 1, labelPx: 18, strip: false }, 3: { n: 20, from: 10, band: 'all', offset: 6, labelPx: 18, strip: false } },
};

function labelsFor(mode, d, loc) {
  if (mode === 'parity') return Array.from({ length: d.n }, (_, i) => String(d.from + i * d.by));
  if (mode === 'words') return Array.from({ length: d.n }, (_, i) => numberWord(d.from + i, loc).toLocaleLowerCase(loc));
  const alpha = COLLATION[loc] && COLLATION[loc].strip ? [...COLLATION[loc].strip] : null;
  if (!alpha || alpha.length < d.from + d.n / 2) throw new Error(`d2d-more: ${loc} has no ${d.from + d.n / 2}-letter alphabet`);
  const out = [];
  for (const c of alpha.slice(d.from, d.from + d.n / 2)) out.push(c.toLocaleUpperCase(loc), c);
  return out;
}
/** the sequence under the picture (level 1): the labels in order, small chips */
function strip(labels) {
  return `<div data-lcs-d2d-strip="1" style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px 8px;width:640px">` +
    labels.map((l, i) => `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;padding:0 8px;box-sizing:border-box;border:2px solid ${i === 0 ? '#F2784B' : '#C8BFAE'};border-radius:10px;background:#FFFFFF;font:700 18px/1 'Baloo 2',cursive;color:#3A3530">${l}</span>`).join('') + `</div>`;
}

/**
 * the parity page's decoys: dots with the OTHER parity's numbers (between the outline's own, never one of them), on free
 * paper — at least 38 px from every line the child draws, from every dot and number, outside the picture, inside the
 * frame — each with its number to its right. Throws when the level's count does not fit (the page takes the next picture).
 */
function withDecoys(svg, f, d, rng) {
  const W = f.width, H = f.height, pts = f.points.slice(0, d.n), lp = d.labelPx;
  const seq = new Set(f.labels.map(String));
  const other = []; for (let v = d.from - 1; v <= d.from + (d.n - 1) * d.by + 1; v++) if (v > 0 && !seq.has(String(v)) && (v - d.from) % d.by !== 0) other.push(v);
  const want = rng.sample(other, Math.min(d.decoys, other.length)).sort((a, b) => a - b);
  // the existing numbers' places (read back from the figure) and the path segments
  const texts = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*data-lcs-label="\d+"[^>]*>([^<]*)<\/text>/g)].map((m) => ({ x: +m[1], y: +m[2], w: lp * 0.6 * m[3].length + 6 }));
  const segD = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L)); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
  const segs = pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
  const inside = (q) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > q[1]) !== (yj > q[1]) && q[0] < ((xj - xi) * (q[1] - yi)) / (yj - yi) + xi) c = !c; } return c; };
  const placed = [];
  const free = (q, w) => q[0] > 24 && q[0] + w + 16 < W - 14 && q[1] > 24 && q[1] < H - 24 && !inside(q) &&
    !f.covers({ x: q[0] - 14, y: q[1] - lp, w: w + 30, h: 2 * lp }) &&
    segs.every(([a, b]) => segD(q, a, b) >= 38 && segD([q[0] + 10 + w, q[1]], a, b) >= 30) &&
    pts.every((p) => Math.hypot(p[0] - q[0], p[1] - q[1]) >= 44) &&
    texts.every((t) => Math.abs(t.x - (q[0] + 10 + w / 2)) > (t.w + w) / 2 + 10 || Math.abs(t.y - q[1]) > lp + 10) &&
    placed.every((o) => Math.hypot(o.x - q[0], o.y - q[1]) >= 70);
  const cands = []; for (let y = 40; y < H - 30; y += 17) for (let x = 30; x < W - 60; x += 17) cands.push([x, y]);
  const order = rng.shuffle(cands);
  for (const v of want) {
    const w = lp * 0.55 * String(v).length + 4;
    const q = order.find((c) => free(c, w));
    if (!q) throw new Error('d2d-more: no free paper for decoy ' + v);
    placed.push({ x: q[0], y: q[1], v });
  }
  const parts = placed.map((o) => `<circle cx="${o.x}" cy="${o.y}" r="5" fill="#146B5E" data-lcs-decoy="${o.v}" data-lcs-x="${o.x}" data-lcs-y="${o.y}"/>` +
    `<text x="${o.x + 10 + (lp * 0.55 * String(o.v).length) / 2}" y="${o.y}" font-family="'Baloo 2',cursive" font-size="${lp}" font-weight="700" fill="#3A3530" text-anchor="middle" dominant-baseline="central" data-lcs-decoy-label="${o.v}">${o.v}</text>`).join('');
  return svg.replace(/<\/svg>\s*$/, parts + '</svg>');
}

function makeD2dMoreType({ id, slug, mode, gradeBand, i18n }) {
  return {
    id, slug, gradeBand, assetClass: 'geometry', exerciseType: 'dot-to-dot',
    themeAxis: { applicable: false },
    difficulty: { 1: { n: LEVELS[mode][1].n }, 2: { n: LEVELS[mode][2].n }, 3: { n: LEVELS[mode][3].n } },
    i18n,
    levelSetWords: (m) => [m.scene],

    build({ difficulty, locale }, ctx) {
      const lv = Number(difficulty) || 2, d = LEVELS[mode][lv], loc = String(locale || 'en').slice(0, 2);
      const values = labelsFor(mode, d, loc);
      // the pool is measured with this page's own labels (their widths differ by language)
      const fig = { count: d.n, values, lite: true, labelPx: d.labelPx, width: d.strip ? 600 : 640, minGap: 22, ...(d.heroOnly ? { heroOnly: true } : {}) };
      const pool = d2d.d2dPool({ band: d.band }, d.n, fig, null);
      if (!pool.length) throw new Error(`${id}: no picture takes these ${d.n} labels in ${loc} — REFUSED`);
      const scene = d2d.fullScene(pool[(d.offset + d2d.copyOf(ctx) - 1) % pool.length]);
      const f = sceneDotFigure({ scene, ...fig });
      const key = !!(ctx && ctx.answerKey);
      let svg = key ? d2d.withPath(f, !/data-lcs-open="1"/.test(f.svg)) : f.svg;
      if (mode === 'parity') svg = withDecoys(svg, f, d, ctx.rng);
      return {
        bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;gap:10px" data-ws-content data-lcs-d2d-mode="${mode}" data-lcs-d2d-seq="${values.join('|')}">` +
          `<div class="ws-card" style="width:660px;align-items:center;justify-content:center;padding:4px">${svg}</div>` +
          (d.strip ? `<div class="ws-card" style="width:660px;padding:10px 8px;align-items:center">${strip(values)}</div>` : '') + `</div>`,
        meta: { scene: scene.id, labels: values },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const R = document.querySelector('[data-lcs-d2d-seq]'), svg = document.querySelector('[data-lcs-prim="dot-figure"]');
        if (!R || !svg) return ['no dot figure'];
        const seq = R.dataset.lcsD2dSeq.split('|');
        const dots = [...svg.querySelectorAll('[data-lcs-dot]')].map((c) => ({ k: +c.dataset.lcsDot, x: +c.dataset.lcsX, y: +c.dataset.lcsY, el: c })).sort((a, b) => a.k - b.k);
        const labels = [...svg.querySelectorAll('[data-lcs-label]')].sort((a, b) => +a.dataset.lcsLabel - +b.dataset.lcsLabel).map((l) => l.textContent.trim());
        if (dots.length !== seq.length || labels.length !== seq.length) fails.push(`${dots.length} dots, ${labels.length} labels for ${seq.length}`);
        if (labels.join('|') !== seq.join('|')) fails.push('the labels are not the sequence');
        if (new Set(labels).size !== labels.length) fails.push('two dots say the same');
        const coral = dots.filter((d) => d.el.getAttribute('fill') === '#F2784B');
        if (coral.length !== 1 || coral[0].k !== 1) fails.push('the start dot is not exactly dot 1');
        for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) if (Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y) < 22) fails.push(`dots ${i + 1},${j + 1} closer than 22 px`);
        // the labels' ink boxes overlap no other label and no dot (K-285's rule)
        const ctx2 = document.createElement('canvas').getContext('2d');
        // (the parity page's decoy numbers and dots are measured with the others)
        const boxes = [...svg.querySelectorAll('[data-lcs-label], [data-lcs-decoy-label]')].map((l) => {
          const bb = l.getBBox(), cs = getComputedStyle(l);
          ctx2.font = cs.fontWeight + ' ' + parseFloat(l.getAttribute('font-size') || cs.fontSize) + 'px ' + cs.fontFamily; ctx2.textBaseline = 'middle';
          const m = ctx2.measureText(l.textContent), y = +l.getAttribute('y');
          return { x: bb.x, w: bb.width, y: y - m.actualBoundingBoxAscent, h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent };
        });
        boxes.forEach((b, i) => {
          for (let j = i + 1; j < boxes.length; j++) { const c = boxes[j]; if (!(b.x + b.w < c.x || c.x + c.w < b.x || b.y + b.h < c.y || c.y + c.h < b.y)) fails.push(`labels ${i + 1},${j + 1} overlap`); }
          dots.concat([...svg.querySelectorAll('[data-lcs-decoy]')].map((c) => ({ k: 'decoy ' + c.dataset.lcsDecoy, x: +c.dataset.lcsX, y: +c.dataset.lcsY, el: c }))).forEach((d) => { const r = +d.el.getAttribute('r') + 2; if (d.x + r > b.x && d.x - r < b.x + b.w && d.y + r > b.y && d.y - r < b.y + b.h) fails.push(`label ${i + 1} overlaps dot ${d.k}`); });
        });
        // the parity page's decoys: the other parity, never on a line the child draws, apart from every dot
        const dec = [...svg.querySelectorAll('[data-lcs-decoy]')];
        if (R.dataset.lcsD2dMode === 'parity') {
          if (dec.length < 4) fails.push(`${dec.length} decoy dots`);
          const par = +seq[0] % 2;
          dec.forEach((c) => {
            const v = +c.dataset.lcsDecoy, x = +c.dataset.lcsX, y = +c.dataset.lcsY;
            if (v % 2 === par) fails.push(`decoy ${v} has the joined numbers' parity`);
            for (let i = 0; i < dots.length; i++) { const a = dots[i], b = dots[(i + 1) % dots.length], dx = b.x - a.x, dy = b.y - a.y, L = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / L)); if (Math.hypot(x - a.x - t * dx, y - a.y - t * dy) < 30) fails.push(`decoy ${v} sits on the path`); }
            dots.forEach((d) => { if (Math.hypot(d.x - x, d.y - y) < 40) fails.push(`decoy ${v} beside dot ${d.k}`); });
          });
        }
        const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        document.querySelectorAll('.ws-card').forEach((c) => { if (c.getBoundingClientRect().bottom > pg.bottom + 1) fails.push('a card leaves the page'); });
        return fails;
      });
    },
  };
}
module.exports = { makeD2dMoreType, LEVELS };
