/**
 * K-285 — Dot-to-Dot 1 to 20 (nt20-B; `dot-to-dot`, K, K.CC.A.1 / d3 K.CC.A.2).
 * One big hidden picture as numbered dots: find the coral dot 1, draw to 2,
 * to 3 … and a whale / rocket / star appears. A counting strip along the
 * bottom is the counting-sequence apparatus. d1 = "finish the picture" (dots
 * 1-10 numbered, the rest pre-printed in light ink) · d2 = 1…20 · d3 = the
 * counting-on window 11…30 (K.CC.A.2: count forward from a number other
 * than 1). The answer path is never drawn; every label placement is
 * collision-checked. Figure names are never printed (the reveal is the point).
 */
'use strict';
const dotFigure = require('../../primitives/dot-figure.js');
const { numberStrip } = require('../../templates/components-b2.js');
const { COLLATION } = require('../../data/b2/collation.js');
const { DOT_FIGURES } = require('../../data/b2/figures.js');

module.exports = {
  id: 'K-285',
  slug: 'dot-to-dot-1-to-20',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'dot-to-dot',
  themeAxis: { applicable: false },
  difficulty: {
    1: { count: 20, window: 10, startAt: 1, chip: 34 },
    2: { count: 20, window: null, startAt: 1, chip: 26 },
    3: { count: 20, window: null, startAt: 11, chip: 26 },
  },
  i18n: {
    en: {
      title: 'Dot-to-Dot 1 to 20',
      instruction: 'Start at the orange dot. Join the dots in number order to find the hidden picture.',
    },
  },

  // `locale` is destructured only because the alphabet face needs the locale's
  // own printed strip; the numeric faces ignore it.
  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const figure = d.figure ? DOT_FIGURES.find((f) => f.key === d.figure) : rng.pick(DOT_FIGURES);
    if (!figure) throw new Error(`K-285: unknown figure ${d.figure}`);
    // step comes from the CONFIG. `dotFigure` has always accepted it, has always
    // stamped `data-lcs-step`, and verify() has always checked both the figure
    // labels and the strip chips against `start + i*step` — the only thing pinning
    // this whole family to counting by ones was this literal. Defaulting to 1 keeps
    // every shipped coordinate byte-identical (b2-baseline: 0 drift).
    // letters:true joins the dots in ALPHABET order instead of number order —
    // a different ordering system, and a genuine pre-K/K printable genre. The
    // sequence comes from the locale's own PRINTED strip (COLLATION), not from
    // a-z, so Italian's 21 letters and the Nordic ae/oe/aa are honoured.
    const alpha = d.letters
      ? (COLLATION[loc] && COLLATION[loc].strip ? [...COLLATION[loc].strip] : null)
      : null;
    if (d.letters && (!alpha || alpha.length < d.count)) throw new Error(`K-285: ${loc} strip has ${alpha ? alpha.length : 0} letters < ${d.count}`);
    const fig = dotFigure({ figure, count: d.count, step: d.step || 1, startAt: d.startAt, window: d.window, size: 560, values: alpha ? alpha.slice(0, d.count) : null });
    const values = fig.labels;
    const strip = numberStrip({ values, chip: d.chip });
    return {
      bodyHtml:
        `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;gap:14px" data-ws-content>` +
        `<div class="ws-card" style="width:660px;align-items:center;justify-content:center;padding:6px">${fig.svg}</div>` +
        `<div class="ws-card" style="width:660px;padding:12px 10px;align-items:center">${strip}</div></div>`,
      meta: { figure: figure.key, labels: values },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const svg = document.querySelector('[data-lcs-prim="dot-figure"]');
      if (!svg) return ['no dot figure'];
      const count = +svg.dataset.lcsCount, step = +svg.dataset.lcsStep, start = +svg.dataset.lcsStart;
      const dots = [...svg.querySelectorAll('[data-lcs-dot]')].map((c) => ({ k: +c.dataset.lcsDot, x: +c.dataset.lcsX, y: +c.dataset.lcsY, el: c }));
      dots.sort((a, b) => a.k - b.k);
      if (dots.length !== count) fails.push(`${dots.length} dots, want ${count}`);
      dots.forEach((dd, i) => { if (dd.k !== i + 1) fails.push(`dot order broken at ${dd.k}`); });
      // labels: sequence and one-per-dot, no two labels equal
      const labels = [...svg.querySelectorAll('[data-lcs-label]')];
      if (labels.length !== count) fails.push(`${labels.length} labels, want ${count}`);
      const texts = labels.map((l) => l.textContent.trim());
      // ⚠ Both label checks coerce with unary + and yield NaN on letters, so an
      // alphabet page would report every label as wrong. In alpha mode the
      // sequence itself is the contract: the labels must be strictly ascending
      // in the locale's own collation, which is what joining a..t means.
      if (svg.dataset.lcsLabelmode === 'alpha') {
        for (let i = 1; i < texts.length; i++) {
          if (!(texts[i - 1].localeCompare(texts[i], document.documentElement.lang || 'en') < 0)) fails.push(`labels ${texts[i - 1]} -> ${texts[i]} are not in alphabet order`);
        }
      } else
      texts.forEach((t, i) => { if (+t !== start + i * step) fails.push(`label ${i + 1} reads ${t}, want ${start + i * step}`); });
      if (new Set(texts).size !== texts.length) fails.push('duplicate labels');
      // exactly one coral (ringed) start dot = dot 1
      const coral = dots.filter((dd) => dd.el.getAttribute('fill') === '#F2784B');
      if (coral.length !== 1 || coral[0].k !== 1) fails.push('start dot is not exactly dot 1');
      // rendered spacing ≥ 22 px, no self-intersection of the closed sequence
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
        const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
        if (dist < 22) fails.push(`dots ${i + 1},${j + 1} only ${dist.toFixed(0)}px apart`);
      }
      const seg = (a, b, c, dd) => {
        const cr = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
        const d1 = cr(c, dd, a), d2 = cr(c, dd, b), d3 = cr(a, b, c), d4 = cr(a, b, dd);
        return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0)) && d1 && d2 && d3 && d4;
      };
      // the drawn path (dots + pre-printed remainder) as one closed sequence
      const pre = svg.querySelector('[data-lcs-preprinted]');
      let seq = dots.map((dd) => ({ x: dd.x, y: dd.y }));
      if (pre) {
        const pts = pre.getAttribute('points').trim().split(/\s+/).map((p) => { const [x, y] = p.split(',').map(Number); return { x, y }; });
        // must start at the last numbered dot and end at dot 1
        const last = dots[dots.length - 1], first = dots[0];
        if (Math.hypot(pts[0].x - last.x, pts[0].y - last.y) > 1 || Math.hypot(pts[pts.length - 1].x - first.x, pts[pts.length - 1].y - first.y) > 1) fails.push('pre-printed remainder does not join the numbered dots');
        seq = seq.concat(pts.slice(1, -1));
      }
      const n = seq.length;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        if (j === i + 1 || (i === 0 && j === n - 1)) continue;
        if (seg(seq[i], seq[(i + 1) % n], seq[j], seq[(j + 1) % n])) fails.push(`path self-intersects at ${i + 1}/${j + 1}`);
      }
      // the answer path is never drawn: no polyline/path runs through two consecutive NUMBERED dots
      const near = (p, dd) => Math.hypot(p.x - dd.x, p.y - dd.y) < 2;
      for (const pl of svg.querySelectorAll('polyline')) {
        const pts = pl.getAttribute('points').trim().split(/\s+/).map((p) => { const [x, y] = p.split(',').map(Number); return { x, y }; });
        for (let k = 0; k + 1 < pts.length; k++) {
          const a = dots.find((dd) => near(pts[k], dd)), b = dots.find((dd) => near(pts[k + 1], dd));
          if (a && b && Math.abs(a.k - b.k) === 1) fails.push(`answer segment ${a.k}-${b.k} is drawn`);
        }
      }
      // labels: bboxes overlap no other label bbox, no dot circle; inside the stage
      const boxes = labels.map((l) => l.getBBox());
      const svgBox = svg.getBBox();
      const W = +svg.getAttribute('width'), H = +svg.getAttribute('height');
      boxes.forEach((b, i) => {
        if (b.x < 0 || b.y < 0 || b.x + b.width > W || b.y + b.height > H) fails.push(`label ${i + 1} outside stage`);
        for (let j = i + 1; j < boxes.length; j++) {
          const c = boxes[j];
          if (!(b.x + b.width < c.x || c.x + c.width < b.x || b.y + b.height < c.y || c.y + c.height < b.y)) fails.push(`labels ${i + 1},${j + 1} overlap`);
        }
        dots.forEach((dd) => {
          const r = +dd.el.getAttribute('r') + 2;
          if (dd.x + r > b.x && dd.x - r < b.x + b.width && dd.y + r > b.y && dd.y - r < b.y + b.height) fails.push(`label ${i + 1} overlaps dot ${dd.k}`);
        });
      });
      void svgBox;
      // strip chips = the label values
      const chips = [...document.querySelectorAll('[data-lcs-strip-value]')].map((c) => +c.dataset.lcsStripValue);
      if (chips.length !== count) fails.push(`strip has ${chips.length} chips`);
      if (svg.dataset.lcsLabelmode === 'alpha') {
        const rawChips = [...document.querySelectorAll('[data-lcs-strip-value]')].map((c) => String(c.dataset.lcsStripValue));
        const t2 = [...svg.querySelectorAll('[data-lcs-label]')].map((n) => n.textContent.trim());
        if (rawChips.join('|') !== t2.join('|')) fails.push('strip does not match the figure labels');
      } else
      chips.forEach((v, i) => { if (v !== start + i * step) fails.push(`strip chip ${i + 1} = ${v}`); });
      return fails;
    });
  },
};
