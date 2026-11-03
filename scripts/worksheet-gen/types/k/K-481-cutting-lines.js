/**
 * K-481 — Cut Along the Lines (scissor skills; Pencil Control Lines maker 2026-11-02, NEW-TEMPLATES B4 T1). Paper only:
 * the child cuts with real scissors — no screen, no key.
 *
 * Levels (the order a child learns to cut): 1 four strips of straight and gently curved lines · 2 five strips of zigzags,
 * corners and points · 3 four simple shapes to cut out (circle, square, triangle, diamond), each holding a picture the
 * child keeps. Every strip starts at the scissors and ends at a picture (where the cut goes); the lines are heavy dashes,
 * the strips ≥ 24 mm apart (measured in verify: a scissors hand needs the room). Each copy changes the rhythm (turns per
 * line) and the order; the pictures are decoration from the chosen theme.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { cutLane, cutShape } = require('../../primitives/cut-line.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { distinctPictures } = require('../../lib/distinct-pictures.js');

const MM = 703 / 210;   // page px per mm (the A4 page is 703 px wide; Letter is narrower per mm — the floor holds for both)

module.exports = {
  id: 'K-481',
  slug: 'cutting-lines',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'pre-writing',
  themeAxis: { applicable: true, minNouns: 5, decorative: true },
  difficulty: {
    // n = the turns of each line (a copy moves it one either way, never below the shape's floor)
    1: { kind: 'strips', pool: ['line', 'wave', 'bumps', 'cups'], strips: 4, n: { line: 1, wave: 2, bumps: 3, cups: 3 }, amp: 16, laneH: 120, width: 4.5 },
    2: { kind: 'strips', pool: ['zigzag', 'castle', 'mountains', 'wave', 'bumps'], strips: 5, n: { zigzag: 5, castle: 3, mountains: 4, wave: 3, bumps: 4 }, amp: 24, laneH: 100, width: 4 },
    3: { kind: 'shapes', shapes: ['circle', 'square', 'triangle', 'diamond'], s: 290, width: 4 },
  },
  i18n: {
    en: {
      title: 'Cut Along the Lines',
      instruction: 'Cut along each dashed line, from the scissors to the picture.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = distinctPictures(theme, labelSafeNouns(theme));
    const need = d.kind === 'shapes' ? d.shapes.length : d.strips;
    if (nouns.length < need) throw new Error(`K-481: theme ${theme} has ${nouns.length} pictures < ${need}`);
    const picks = rng.sample(nouns, need);
    if (d.kind === 'shapes') {
      const shapes = rng.shuffle(d.shapes.slice());
      const cards = shapes.map((sh, i) => {
        const s = d.s, pic = Math.round(s * (sh === 'triangle' ? 0.34 : 0.42)), cy = sh === 'triangle' ? s * 0.62 : s / 2;
        const inner = `<image href="${fileUri(theme, picks[i].noun)}" x="${(s / 2 - pic / 2).toFixed(1)}" y="${(cy - pic / 2).toFixed(1)}" width="${pic}" height="${pic}" data-lcs-noun="${picks[i].vocabKey}"/>`;
        return `<div class="ws-card-stage" style="justify-content:center;align-items:center" data-lcs-cut-card="${sh}">${cutShape({ shape: sh, s, width: d.width, inner }).svg}</div>`;
      });
      return { bodyHtml: cardGrid({ cards, cols: 2, rows: 2, numbered: false }), meta: { shapes } };
    }
    const strokes = rng.shuffle(d.pool.slice()).slice(0, d.strips);
    const iconPx = 56;
    const laneW = 675 - 24 - iconPx - 12;
    const cards = strokes.map((key, i) => {
      // the rhythm changes by one turn either way from copy to copy (a straight line has none)
      const FLOOR = { line: 1, wave: 2, bumps: 2, cups: 2, zigzag: 4, castle: 3, mountains: 3 };
      const n = key === 'line' ? 1 : Math.max(FLOOR[key], d.n[key] + (((ctx.variant || 1) + i) % 3) - 1);
      const lane = cutLane({ stroke: key, w: laneW, h: d.laneH, n, amp: d.amp, width: d.width });
      return `<div class="ws-card-stage" style="flex-direction:row;gap:12px;justify-content:space-between;align-items:center" data-lcs-cut-strip="${key}">` +
        lane.svg + `<img class="ws-icon" src="${fileUri(theme, picks[i].noun)}" alt="" data-lcs-noun="${picks[i].vocabKey}" style="width:${iconPx}px;height:${iconPx}px;flex:0 0 auto"></div>`;
    });
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: strokes.length, numbered: false }), meta: { strokes } };
  },

  async verify(page) {
    return page.evaluate((MM) => {
      const fails = [];
      const strips = [...document.querySelectorAll('[data-lcs-cut-strip]')], shapes = [...document.querySelectorAll('[data-lcs-cut-card]')];
      if (!strips.length && !shapes.length) return ['no cutting strip or shape'];
      const one = (svg, tag) => {
        const lines = svg.querySelectorAll('path[data-lcs-cut-line]');
        if (lines.length !== 1) fails.push(`${tag}: ${lines.length} cut lines`);
        const ln = lines[0];
        if (ln && !ln.getAttribute('stroke-dasharray')) fails.push(`${tag}: the cut line is not dashed`);
        if (ln && parseFloat(ln.getAttribute('stroke-width')) < 3.5) fails.push(`${tag}: the cut line is thinner than 3.5 px`);
        if (svg.querySelectorAll('[data-lcs-scissors]').length !== 1) fails.push(`${tag}: needs exactly one scissors glyph`);
        return ln;
      };
      if (strips.length) {
        if (strips.length < 4) fails.push(`only ${strips.length} strips`);
        const keys = strips.map((s) => s.dataset.lcsCutStrip);
        if (new Set(keys).size !== keys.length) fails.push('a line shape repeats');
        const mids = [];
        strips.forEach((st, i) => {
          const svg = st.querySelector('svg[data-lcs-cut]');
          if (!svg) { fails.push(`strip ${i + 1}: no cutting line`); return; }
          const ln = one(svg, `strip ${i + 1}`);
          const sc = svg.querySelector('[data-lcs-scissors]').getBoundingClientRect(), lr = ln && ln.getBoundingClientRect();
          if (lr && sc.left > lr.left) fails.push(`strip ${i + 1}: the scissors are not at the start of the line`);
          const img = st.querySelector('img[data-lcs-noun]');
          if (!img || (lr && img.getBoundingClientRect().left < lr.right - 1)) fails.push(`strip ${i + 1}: no picture at the end of the line`);
          if (lr) mids.push((lr.top + lr.bottom) / 2);
        });
        // a scissors hand needs room: ≥ 24 mm from one cutting line to the next
        for (let i = 1; i < mids.length; i++) if (mids[i] - mids[i - 1] < 24 * MM) fails.push(`strips ${i} and ${i + 1}: lines only ${((mids[i] - mids[i - 1]) / MM).toFixed(1)} mm apart (24 at least)`);
      }
      shapes.forEach((c, i) => {
        const svg = c.querySelector('svg[data-lcs-cut]');
        if (!svg) { fails.push(`shape ${i + 1}: no outline`); return; }
        const ln = one(svg, `shape ${i + 1}`);
        const pic = svg.querySelector('image[data-lcs-noun]');
        if (!pic) fails.push(`shape ${i + 1}: no picture inside`);
        else if (ln) { const p = pic.getBoundingClientRect(), o = ln.getBoundingClientRect(); if (p.left < o.left || p.right > o.right || p.top < o.top || p.bottom > o.bottom) fails.push(`shape ${i + 1}: the picture is not inside the shape`); }
      });
      if (shapes.length && shapes.length !== 4) fails.push(`${shapes.length} shapes (4 expected)`);
      return fails;
    }, MM);
  },
};
