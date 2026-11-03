/**
 * G1-496 — Syllable Puzzles (Syllables maker 2026-11-02, NEW-TEMPLATES §40 T1; RF.1.3.e / the syllable-building
 * practice of every locale; material): each picture word printed in its syllables on jigsaw pieces; the children cut
 * along the dashed lines, mix the pieces and build every word again, syllable by syllable (the picture is on the first
 * piece). The splits are the syllable SAFETY pipeline's (G1-305's eligible pool: approved words, the TeX-agreed pool
 * because the pieces PRINT the boundary, fr written syllables without a silent final e, da strict pool, the panels'
 * refused words and pictures). Every word's joins have their own shape (a round, pointed or square tab, high, middle
 * or low, bulging right or left), so a piece fits only its own word.
 * Levels: 1 five words of two syllables · 2 six words of two and three syllables · 3 six words of two to four syllables
 * (the counts spread over the page).
 */
'use strict';
const G305 = require('./G1-305-syllable-split.js');
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const W = 640;
const D = {
  1: { words: 5, minCount: 2, maxCount: 2, maxLetters: 9, h: 104 },
  2: { words: 6, minCount: 2, maxCount: 3, maxLetters: 11, h: 96 },
  3: { words: 6, minCount: 2, maxCount: 4, maxLetters: 12, h: 96 },
};
const SHAPES = ['round', 'point', 'square'], POS = [0.3, 0.5, 0.7], DIRS = [1, -1];

/** the joint at x: a straight cut with one tab of the word's own shape (s), place (p) and side (dir) */
function joint(x, h, s, p, dir) {
  const yb = h * p, r = Math.max(9, Math.round(h * 0.12)), dx = dir * r;
  const tab = s === 'round' ? `A ${r} ${r} 0 0 ${dir > 0 ? 1 : 0} ${x} ${yb + r}`
    : s === 'point' ? `L ${x + dx * 1.3} ${yb} L ${x} ${yb + r}`
      : `L ${x + dx} ${yb - r} L ${x + dx} ${yb + r} L ${x} ${yb + r}`;
  return `M ${x} 0 L ${x} ${yb - r} ${tab} L ${x} ${h}`;
}

module.exports = {
  id: 'G1-496',
  slug: 'syllable-puzzles',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'syllable-split',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Syllable Puzzles', instruction: 'Cut out the pieces along the dashed lines. Mix them up, then put each word back together, syllable by syllable.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const pool = G305.eligible(L, theme, { minCount: d.minCount, maxCount: d.maxCount, maxLetters: d.maxLetters, pool: 'tex', fresh: true });
    if (pool.length < d.words) throw new Error(`G1-496: theme ${theme}/${L} has ${pool.length} words of ${d.minCount}-${d.maxCount} syllables (< ${d.words})`);
    // a level that offers longer words has at least one (a page of only two-syllable words is level 1's)
    if (d.maxCount > 2 && !pool.some((e) => e.count >= 3)) throw new Error(`G1-496: theme ${theme}/${L} has no word of three syllables or more`);
    // the panel's casing (de keeps the noun's capital): the first piece carries it
    const cased = (e) => (e.word[0] !== e.word[0].toLocaleLowerCase(L) ? [e.split[0].charAt(0).toLocaleUpperCase(L) + e.split[0].slice(1), ...e.split.slice(1)] : e.split);
    // level 3 mixes the counts where the theme has them
    let picks = rng.sample(pool, d.words);
    if (d.minCount !== d.maxCount) {
      const by = {}; for (const e of rng.shuffle(pool.slice())) (by[e.count] = by[e.count] || []).push(e);
      const counts = Object.keys(by), out = [];
      for (let r = 0; out.length < d.words; r++) { let took = false; for (const c of counts) { const e = by[c][r]; if (e && out.length < d.words) { out.push(e); took = true; } } if (!took) break; }
      if (out.length === d.words) picks = rng.shuffle(out);
    }
    // every word its own join: shape × place × side, all different on the page
    const combos = rng.shuffle(SHAPES.flatMap((s) => POS.map((p) => DIRS.map((dir) => ({ s, p, dir })))).flat());
    const fs = Math.round(d.h * 0.42), picW = d.h + 8;
    const rows = picks.map((e, i) => {
      const c = combos[i % combos.length];
      const widths = e.split.map((syl) => Math.max(Math.round(d.h * 0.85), [...syl].length * Math.round(fs * 0.62) + 34));
      widths[0] += picW;
      const scale = Math.min(1, (W - 8) / widths.reduce((a, x) => a + x, 0));
      const ws = widths.map((x) => Math.round(x * scale)), total = ws.reduce((a, x) => a + x, 0);
      const x0 = Math.round((W - total) / 2);
      let x = x0;
      const cuts = [], texts = [];
      ws.forEach((wd, k) => {
        const tx = k === 0 ? x + picW * scale + (wd - picW * scale) / 2 : x + wd / 2;
        texts.push(`<text x="${Math.round(tx)}" y="${Math.round(d.h * 0.66)}" text-anchor="middle" font-family="'Baloo 2', cursive" font-weight="700" font-size="${Math.round(fs * Math.max(0.8, scale))}" fill="${T.ink}">${cased(e)[k]}</text>`);
        x += wd;
        if (k < ws.length - 1) cuts.push(joint(x, d.h, c.s, c.p, c.dir));
      });
      const dash = `stroke="${T.inkSoft}" stroke-width="2.4" stroke-dasharray="7 5" fill="none"`;
      const pic = `<image href="${fileUri(theme, e.noun)}" x="${x0 + 6}" y="${Math.round(d.h * 0.08)}" width="${Math.round(picW * scale - 12)}" height="${Math.round(d.h * 0.84)}" preserveAspectRatio="xMidYMid meet"/>`;
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${d.h + 4}" viewBox="0 -2 ${W} ${d.h + 4}" data-lcs-puzzle="${e.word}" data-lcs-split="${e.split.join('-')}" data-lcs-join="${c.s}-${c.p}-${c.dir}" style="flex:0 0 auto">` +
        `<rect x="${x0}" y="0" width="${total}" height="${d.h}" rx="10" fill="#FFFFFF" ${dash}/>` + pic + cuts.map((p) => `<path d="${p}" ${dash}/>`).join('') + texts.join('') + `</svg>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-puzzles style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;min-height:0">${rows.join('')}</div>`,
      meta: { words: picks.map((e) => cased(e).join('-')) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-puzzle]')];
      if (rows.length < 5) fails.push(`${rows.length} words`);
      const joins = rows.map((r) => r.dataset.lcsJoin);
      if (new Set(joins).size !== joins.length) fails.push('two words share a join shape');
      rows.forEach((r, i) => {
        const split = r.dataset.lcsSplit.split('-');
        if (split.join('').toLowerCase() !== r.dataset.lcsPuzzle.toLowerCase()) fails.push(`word ${i + 1}: the pieces do not spell it`);
        if (r.querySelectorAll('text').length !== split.length) fails.push(`word ${i + 1}: not one piece per syllable`);
        const R = r.getBoundingClientRect();
        r.querySelectorAll('text').forEach((t) => { const b = t.getBoundingClientRect(); if (b.right > R.right + 1 || b.left < R.left - 1) fails.push(`word ${i + 1}: a syllable leaves the page`); });
      });
      return [...new Set(fails)];
    });
  },
};
