/**
 * K-532 — Letter Hunt (Alphabet & Letters maker 2026-11-02, NEW-TEMPLATES §37 T3; RF.K.1.d): a sky full of balloons,
 * kites and signs, each carrying one small letter; the child finds every copy of the target letter and circles it
 * (K-229 is a plain grid of letters; here the letters are spread through a scene, the search-lens skill). Letters are
 * never rotated (a turned b reads as q). The other letters are the locale's own; level 3 mixes in the target's
 * look-alikes (b d p q, m n u w, a o e c, i j l, f t h, and the locale's dotted / ringed twins ä a, ö o, å a, ø o …),
 * levels 1-2 keep them out. Every object is a tap target: the targets are the correct ones (key: ringed).
 * Levels: 1 four to find among twelve · 2 six among eighteen · 3 eight among twenty-four, with look-alikes.
 */
'use strict';
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 12, hits: 4, lookAlikes: false, cols: 4 },
  2: { n: 18, hits: 6, lookAlikes: false, cols: 6 },
  3: { n: 24, hits: 8, lookAlikes: true, cols: 6 },
};
const GROUPS = ['bdpq', 'mnuw', 'aoec', 'ijl', 'fth', 'äaå', 'öoø', 'üu', 'ñn', 'æa'];
const FILLS = [[T.teal, '#FFFFFF'], [T.coral, '#FFFFFF'], [T.tealSoft, T.ink], [T.coralSoft, T.ink], [T.creamDeep, T.ink]];
const W = 660, H = 660;

/** one object of the scene, drawn round its letter (the letter is HTML text on top) */
function shape(kind, s, fill) {
  if (kind === 'balloon') return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s * 1.45}" viewBox="0 0 100 145" aria-hidden="true" style="position:absolute;left:0;top:0">` +
    `<path d="M50 100 C 52 115 44 125 50 143" fill="none" stroke="${T.inkSoft}" stroke-width="2.5"/><path d="M45 100 L55 100 L50 92 Z" fill="${fill}"/>` +
    `<ellipse cx="50" cy="48" rx="44" ry="48" fill="${fill}" stroke="${T.ink}" stroke-width="2.5"/></svg>`;
  if (kind === 'kite') return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s * 1.45}" viewBox="0 0 100 145" aria-hidden="true" style="position:absolute;left:0;top:0">` +
    `<path d="M50 98 C 40 112 60 120 48 143" fill="none" stroke="${T.inkSoft}" stroke-width="2.5"/><path d="M44 118 l8 -4 l-2 8 Z M47 134 l8 -3 l-2 8 Z" fill="${T.coral}"/>` +
    `<path d="M50 2 L96 48 L50 98 L4 48 Z" fill="${fill}" stroke="${T.ink}" stroke-width="2.5"/></svg>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s * 1.45}" viewBox="0 0 100 145" aria-hidden="true" style="position:absolute;left:0;top:0">` +
    `<rect x="45" y="80" width="10" height="64" fill="${T.inkSoft}"/><rect x="4" y="10" width="92" height="76" rx="10" fill="${fill}" stroke="${T.ink}" stroke-width="2.5"/></svg>`;
}

module.exports = {
  id: 'K-532',
  slug: 'letter-hunt',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-knowledge',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Letter Hunt', instruction: 'Look at the letter in the box. Find that letter on the balloons, kites, and signs, and circle every one.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const alpha = A.alphabetOf(L);
    const groupOf = (ch) => GROUPS.find((g) => g.includes(ch)) || '';
    const twins = (ch) => [...groupOf(ch)].filter((x) => x !== ch && alpha.includes(x));
    // the target: a letter of the alphabet (at level 3 one with look-alikes in this alphabet); q and x are too rare to hunt
    const targets = alpha.filter((ch) => !'qx'.includes(ch) && (!d.lookAlikes || twins(ch).length >= 1));
    const target = rng.pick(targets);
    const near = twins(target);
    const others = alpha.filter((ch) => ch !== target && !near.includes(ch) && !twins(ch).includes(target));
    // the distractors: at level 3 half of them the target's look-alikes, the rest any other letters
    const nDis = d.n - d.hits, dis = [];
    if (d.lookAlikes) for (let k = 0; k < Math.ceil(nDis / 2); k++) dis.push(near[k % near.length]);
    while (dis.length < nDis) dis.push(rng.pick(others));
    const letters = rng.shuffle(Array(d.hits).fill(target).concat(dis));
    // a grid of cells with a seeded jitter inside each (no two objects touch); kinds and colours spread
    const rows = Math.ceil(d.n / d.cols), cw = W / d.cols, ch = H / rows;
    const s = Math.floor(Math.min(cw * 0.78, ch / 1.45 * 0.92));
    const kinds = ['balloon', 'kite', 'sign'];
    const objs = letters.map((x, i) => {
      const r = Math.floor(i / d.cols), c = i % d.cols;
      const jx = rng.int(0, Math.max(0, Math.floor(cw - s - 2))), jy = rng.int(0, Math.max(0, Math.floor(ch - s * 1.45 - 2)));
      const kind = kinds[(i + r) % 3], [fill, ink] = FILLS[rng.int(0, FILLS.length - 1)];
      // every shape is centred on y = 48 of its 145-unit box (0.48 s): the letter's line box is centred there
      const ly = s * 0.48, fs = Math.round(s * (kind === 'kite' ? 0.42 : 0.5));
      return `<div data-lcs-hunt-obj="${kind}" data-lcs-pick="1"${x === target ? ' data-lcs-correct="1"' : ''} data-lcs-letter="${x}" style="position:absolute;left:${Math.round(c * cw + jx)}px;top:${Math.round(r * ch + jy)}px;width:${s}px;height:${Math.round(s * 1.45)}px">` +
        `${shape(kind, s, fill)}<span style="position:absolute;left:0;width:${s}px;top:${Math.round(ly - fs * 0.55)}px;text-align:center;font:700 ${fs}px/1.1 'Baloo 2',cursive;color:${ink}">${x}</span></div>`;
    });
    const chip = `<div data-lcs-hunt-target="${target}" style="display:flex;align-items:center;justify-content:center;gap:14px;flex:0 0 auto;padding-bottom:10px">` +
      `<span style="display:inline-flex;align-items:center;justify-content:center;width:62px;height:62px;border-radius:16px;background:${T.teal};color:#FFFFFF;font:700 40px/1 'Baloo 2',cursive">${target}</span></div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-hunt="${difficulty}" style="flex:1;display:flex;flex-direction:column;align-items:center;min-height:0">${chip}` +
        `<div data-lcs-hunt-scene style="position:relative;width:${W}px;height:${H}px;border-radius:18px;background:${T.cream}">${objs.join('')}</div></div>`,
      meta: { target, hits: d.hits },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const t = document.querySelector('[data-lcs-hunt-target]').dataset.lcsHuntTarget, lv = +document.querySelector('[data-lcs-hunt]').dataset.lcsHunt;
      const objs = [...document.querySelectorAll('[data-lcs-hunt-obj]')];
      const hits = objs.filter((o) => o.dataset.lcsLetter === t);
      if (hits.length !== { 1: 4, 2: 6, 3: 8 }[lv]) fails.push(`${hits.length} copies of ${t} to find`);
      objs.forEach((o, i) => { if ((o.dataset.lcsLetter === t) !== o.hasAttribute('data-lcs-correct')) fails.push(`object ${i + 1}: marked wrongly`); if (o.querySelector('span').textContent !== o.dataset.lcsLetter) fails.push(`object ${i + 1}: shows ${o.querySelector('span').textContent}`); });
      // no two objects overlap; every object inside the scene
      const R = objs.map((o) => o.getBoundingClientRect()), S = document.querySelector('[data-lcs-hunt-scene]').getBoundingClientRect();
      R.forEach((a, i) => { if (a.left < S.left - 0.5 || a.right > S.right + 0.5 || a.bottom > S.bottom + 0.5) fails.push(`object ${i + 1} leaves the scene`); for (let j = i + 1; j < R.length; j++) { const b = R[j]; if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) fails.push(`objects ${i + 1} and ${j + 1} overlap`); } });
      // the letter sits on its shape (not on the string or the pole)
      objs.forEach((o, i) => { const l = o.querySelector('span').getBoundingClientRect(), r = o.getBoundingClientRect(); if (l.bottom > r.top + r.height * 0.66) fails.push(`object ${i + 1}: the letter is off its shape`); });
      return fails;
    });
  },
};
