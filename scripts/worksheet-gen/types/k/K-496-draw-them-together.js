/**
 * K-496 — Draw Them All in One Picture (How to Draw maker 2026-11-02, NEW-TEMPLATES §30 T4): two or three small step
 * strips of drawings from ONE theme (farm, sea, vehicles, birds …) and one big picture to draw them all into — a
 * composition page, the themed "draw the farm" project page (G1-417 draws ONE figure into a printed scene).
 *
 * The figures are reviewed library lessons the maker ships (htd-faces pool) grouped by their theme family; a copy is a
 * pinned group (data/b7/htd-face-pins.json: "u1|u2|u3"), so consecutive copies change theme. Levels 1-2 draw a ground
 * line (a water line for the sea) in the big picture; level 3 leaves the whole picture to the child.
 * Levels: 1 two drawings · 2 three drawings · 3 three drawings, no ground line.
 */
'use strict';
const H = require('../../lib/htd-faces.js');
const C7 = require('../../templates/components-b7.js');
const Hd = require('../../lib/htd-steps.js');
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');

const D = { 1: { k: 2, cardPx: 84, ground: true }, 2: { k: 3, cardPx: 70, ground: true }, 3: { k: 3, cardPx: 70, ground: false } };
/** a lesson's theme family: "farm animals bw" / "farm bw" → farm, "sea life bw 2" → sea life */
const family = (u) => { const t = String(H.B.unitRecord(u).theme || '').toLowerCase().replace(/\s+bw(\s+\d+)?$/, '').trim(); return t === 'farm animals' ? 'farm' : t; };
const SEA = new Set(['sea life', 'beach']);
/** the candidate groups of a level: per family, its lessons in the face's order cut into groups of k; families interleaved */
function groups(level) {
  const k = D[level].k, by = new Map();
  for (const u of H.order('K-496')) { const f = family(u); if (!f) continue; if (!by.has(f)) by.set(f, []); by.get(f).push(u); }
  // a group never holds two drawings of one thing (two snowmen read as one figure twice): a lesson whose noun is already in
  // the group waits for the next one
  const noun = (u) => H.B.unitRecord(u).key || H.B.unitRecord(u).noun || u;
  const cut = (us) => {
    const out = [], rest = us.slice();
    while (rest.length) {
      const g = [];
      for (let i = 0; i < rest.length && g.length < k;) { if (g.some((x) => noun(x) === noun(rest[i]))) { i++; continue; } g.push(rest.splice(i, 1)[0]); }
      if (g.length < k) break;
      out.push(g.join('|'));
    }
    return out;
  };
  const lists = makeRng('K-496|groups|' + level).shuffle([...by.entries()]).map(([, us]) => cut(us)).filter((g) => g.length);
  const out = [];
  for (let i = 0; lists.some((l) => l[i]); i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
}
/** the ground of the big picture: a line across (a wavy water line for a sea family) */
function ground(w, h, sea) {
  const y = Math.round(h * 0.68);
  // whole waves only, centred inside the 12 px margins (a rounded-up count ran the line past the box, 2026-11-03)
  const waves = Math.floor((w - 24) / 60), x0 = Math.round((w - waves * 60) / 2);
  const d = sea ? Array.from({ length: waves }, (_, i) => `${i ? '' : `M ${x0} ${y}`} q 15 -12 30 0 t 30 0`).join(' ') : `M 12 ${y} L ${w - 12} ${y}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0" data-lcs-htd-ground="${sea ? 'water' : 'land'}"><path d="${d}" fill="none" stroke="${T.inkSoft}" stroke-width="3" stroke-linecap="round"/></svg>`;
}

module.exports = {
  id: 'K-496',
  slug: 'draw-them-all-in-one-picture',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'how-to-draw',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Draw Them All in One Picture',
      instruction: 'Follow the steps of each drawing. Then draw them all together in the big picture.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const key = !!(ctx && ctx.answerKey);
    const list = H.pinned('K-496', difficulty) || groups(difficulty);
    const units = H.nth(list, ctx).split('|');
    const Ss = units.map((u) => H.B.stepsFor(u));
    const extra = (ctx && ctx.chromeExtra) || 0;
    const strips = Ss.map((S, i) => `<div data-lcs-htd-figure="${i + 1}">${C7.htdStrip({ S, cardPx: d.cardPx, gap: 10, width: 639 })}</div>`).join('');
    const stripH = Ss.length * (d.cardPx + 6 + 22) + (Ss.length - 1) * 10;
    const boxH = 724 - extra - stripH - 16, boxW = 639;
    const sea = SEA.has(family(units[0]));
    // the key: the drawings standing in the picture, side by side on the ground (one correct example)
    let sample = '';
    if (key) {
      // each drawing as wide as its share allows and never taller than half the picture, standing on the ground line
      const w = Math.floor((boxW - 40) / Ss.length) - 16, maxH = Math.round(boxH * 0.55);
      sample = `<div data-lcs-key-sample="drawings" style="position:absolute;left:20px;right:20px;bottom:${Math.round(boxH * 0.32) - 4}px;display:flex;justify-content:space-around;align-items:flex-end">` +
        Ss.map((S) => { const vb = Hd.panelBox(S, { viewBox: 'bbox' }); const ww = Math.min(w, Math.floor(maxH * vb[2] / vb[3])); return C7.htdFullCard({ S, w: ww, frame: 'card' }).replace(/border:[^;]+;/, 'border:0;').replace('background:#FFFFFF', 'background:transparent'); }).join('') + `</div>`;
    }
    const box = `<div data-lcs-htd-box="${boxW}x${boxH}" data-lcs-htd-role="primary" style="position:relative;box-sizing:border-box;width:${boxW}px;height:${boxH}px;background:#FFFFFF;border:2.5px dashed ${T.coral};border-radius:12px;overflow:hidden">${d.ground ? ground(boxW - 5, boxH - 5, sea) : ''}${sample}</div>`;
    const body = `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:639px">${strips}<div style="height:6px"></div>${box}</div>`;
    return { bodyHtml: H.root('together', units.join('|'), body, `data-lcs-htd-figures="${units.length}"`), meta: { units: units.join('|'), family: family(units[0]) } };
  },

  pinOrder(level) { return groups(level); },
  /** the pin tool's test: every lesson loads and has at most five steps (a strip of five cards fits the lane) */
  pinFits(group, level) { const us = group.split('|'); return us.length === D[level].k && us.every((u) => H.B.stepsFor(u).steps.length <= 5); },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const R = document.querySelector('[data-lcs-htd-face]');
      const n = +R.dataset.lcsHtdFigures;
      if (document.querySelectorAll('[data-lcs-htd-figure]').length !== n) fails.push('a drawing strip is missing');
      const box = document.querySelector('[data-lcs-htd-box]').getBoundingClientRect(), pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      if (box.bottom > pg.bottom + 1) fails.push('the big picture leaves the page');
      if (box.height < 300) fails.push(`the big picture is only ${Math.round(box.height)} px tall`);
      document.querySelectorAll('[data-lcs-htd-strip]').forEach((s) => { const b = s.getBoundingClientRect(); if (b.right > pg.right + 1) fails.push('a strip leaves the page'); });
      return fails;
    });
  },
};
