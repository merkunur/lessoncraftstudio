/**
 * G2-493 — Coordinate Battleship (Maps & Coordinates maker 2026-11-03, NEW-TEMPLATES §54 T5; grid coordinates, the
 * G2-279 family's convention — letters across the top, numbers down the side, B3 = column B, row 3; nl "coördinaten",
 * pt "coordenadas em malha"): a game for two. Each child has two grids — her own, where she colours her ships, and her
 * partner's, where she marks every square she calls (a dot for a miss, a cross for a hit). The ships are pictures of
 * the chosen theme, one, two and three squares long, shown beside the grid. Game material: no answer key, no screen;
 * print one page for each player.
 * Levels: 1 two 5 × 5 grids, three ships · 2 two 6 × 6 grids, four ships · 3 two 8 × 8 grids, five ships (the grids one
 * above the other, the ships beside them).
 */
'use strict';
const slot = require('../../lib/slot.js');
const { fileUri } = require('../../lib/b2-common.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 5, ships: [1, 2, 3] }, 2: { n: 6, ships: [1, 2, 2, 3] }, 3: { n: 8, ships: [1, 2, 2, 3, 3] } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LABELS = {
  en: ['My ships', "My partner's ships"], de: ['Meine Schiffe', 'Die Schiffe meines Partners'], fr: ['Mes bateaux', 'Les bateaux de mon partenaire'],
  es: ['Mis barcos', 'Los barcos de mi compañero'], pt: ['Meus barcos', 'Os barcos do meu colega'], it: ['Le mie navi', 'Le navi del mio compagno'],
  nl: ['Mijn schepen', 'De schepen van mijn maatje'], sv: ['Mina skepp', 'Min kompis skepp'], da: ['Mine skibe', 'Min makkers skibe'],
  no: ['Mine skip', 'Makkerens skip'], fi: ['Omat laivani', 'Parini laivat'],
};

function grid(n, cell, title) {
  const parts = [];
  for (let i = 0; i < n; i++) {
    parts.push(`<text x="${24 + i * cell + cell / 2}" y="18" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="16" fill="${T.teal}">${String.fromCharCode(65 + i)}</text>`);
    parts.push(`<text x="12" y="${24 + i * cell + cell / 2 + 6}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="16" fill="${T.teal}">${i + 1}</text>`);
  }
  for (let i = 0; i <= n; i++) parts.push(`<line x1="${24 + i * cell}" y1="24" x2="${24 + i * cell}" y2="${24 + n * cell}" stroke="${T.grid}" stroke-width="1.5"/><line x1="24" y1="${24 + i * cell}" x2="${24 + n * cell}" y2="${24 + i * cell}" stroke="${T.grid}" stroke-width="1.5"/>`);
  const w = 26 + n * cell;
  return `<div data-lcs-bs-grid style="display:flex;flex-direction:column;align-items:center;gap:6px"><span class="ws-pill" style="font-size:17px;padding:2px 14px">${esc(title)}</span>` +
    `<svg width="${w}" height="${w}" viewBox="0 0 ${w} ${w}">${parts.join('')}<rect x="24" y="24" width="${n * cell}" height="${n * cell}" fill="none" stroke="${T.teal}" stroke-width="3"/></svg></div>`;
}

module.exports = {
  id: 'G2-493',
  slug: 'coordinate-battleship',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'grid-coordinates',
  themeAxis: { applicable: true, minNouns: 5, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Coordinate Battleship', instruction: "Color your ships on your grid. Take turns calling a square like B3. Mark your partner's grid: a dot for a miss, a cross for a hit." } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = labelSafeNouns(theme).filter((x) => !refusedPicture(theme, x.noun));
    if (pool.length < d.ships.length) throw new Error(`G2-493: theme ${theme} has too few pictures`);
    const pics = slot.pictures(ctx, rng.sample(pool, d.ships.length), pool, theme);   // a teacher's ship pictures (maker)
    // the two grids one above the other, the ships beside them: the page fills its body (two grids ≈ 2 × 340 px)
    const cell = d.n === 8 ? 35 : d.n === 6 ? 46 : 56;
    const [mine, theirs] = LABELS[L] || LABELS.en;
    const fleet = d.ships.map((len, i) => `<div data-lcs-bs-ship="${len}"${slot.attr(ctx, 'pic', i)} style="display:flex;align-items:center;gap:6px">` +
      Array.from({ length: len }, () => `<span style="display:inline-flex;align-items:center;justify-content:center;width:${cell}px;height:${cell}px;border:2px solid ${T.grid};border-radius:6px;background:#FFFFFF"><img class="ws-icon" src="${fileUri(theme, pics[i].noun)}" alt="" style="width:${cell - 8}px;height:${cell - 8}px;object-fit:contain"></span>`).join('') + '</div>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-battleship style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:14px;min-height:0">` +
        `<div style="display:flex;gap:26px;align-items:center;justify-content:center"><div style="display:flex;flex-direction:column;gap:18px">${grid(d.n, cell, mine)}${grid(d.n, cell, theirs)}</div>` +
        `<div data-lcs-bs-fleet style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;padding:14px 16px;border-radius:14px;background:${T.cream}">${fleet.join('')}</div></div></div>`,
      meta: { n: d.n, ships: d.ships },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      if (document.querySelectorAll('[data-lcs-bs-grid]').length !== 2) fails.push('not two grids');
      const root = document.querySelector('[data-lcs-battleship]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-bs-grid], [data-lcs-bs-fleet]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('a block leaves the page'); });
      return fails;
    });
  },
};
