/**
 * G1-530 — Draw Your Own Map (Maps & Coordinates maker 2026-11-03, NEW-TEMPLATES §54 T3; making a map key — G1-379 reads
 * one; the social-studies map rows of every framework, fr "réaliser un plan", sv "rita en karta"): an empty map plate, a
 * compass rose (the language's letters) and a key with empty rows — the child draws a map of her room, the school or an
 * island and, in the key (data/b5 maps keyTitle: Legende, Légende, Teckenförklaring …), draws each symbol she used and
 * writes what it stands for. An open task: no answer key, no screen.
 * Levels: 1 an empty plate, three key rows · 2 an island outline with a road and a river (primitives/island-map.js, no
 * symbols placed), four key rows · 3 a lettered and numbered grid plate, five key rows.
 */
'use strict';
const { compassRose } = require('../../primitives/compass-rose.js');
const { islandMap } = require('../../primitives/island-map.js');
const B5 = require('../../lib/b5-common.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { plate: 'empty', rows: 3 }, 2: { plate: 'island', rows: 4 }, 3: { plate: 'grid', rows: 5 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'G1-530',
  slug: 'draw-your-own-map',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'maps',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Draw Your Own Map', instruction: 'Draw a map. In the key, draw each symbol you used and write what it means.' } },

  build({ difficulty, locale }) {
    const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2);
    const bank = B5.bank('maps', L);
    const W = 610, H = 420;
    let plate;
    if (d.plate === 'island') plate = `<div data-lcs-map-plate="island" style="width:${W}px">${islandMap({ w: W, symbols: [], footpaths: [], northArrow: null }).svg}</div>`;
    else if (d.plate === 'grid') {
      const n = 8, cell = Math.floor((H - 28) / n), gw = 28 + cell * n;
      const parts = [];
      for (let i = 0; i < n; i++) {
        parts.push(`<text x="${28 + i * cell + cell / 2}" y="20" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="18" fill="${T.teal}">${String.fromCharCode(65 + i)}</text>`);
        parts.push(`<text x="14" y="${28 + i * cell + cell / 2 + 6}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="18" fill="${T.teal}">${i + 1}</text>`);
      }
      for (let i = 0; i <= n; i++) parts.push(`<line x1="${28 + i * cell}" y1="28" x2="${28 + i * cell}" y2="${28 + n * cell}" stroke="${T.grid}" stroke-width="1.5"/><line x1="28" y1="${28 + i * cell}" x2="${28 + n * cell}" y2="${28 + i * cell}" stroke="${T.grid}" stroke-width="1.5"/>`);
      plate = `<svg data-lcs-map-plate="grid" width="${gw + 2}" height="${gw + 2}" viewBox="0 0 ${gw + 2} ${gw + 2}">${parts.join('')}<rect x="28" y="28" width="${n * cell}" height="${n * cell}" fill="none" stroke="${T.teal}" stroke-width="3"/></svg>`;
    } else plate = `<div data-lcs-map-plate="empty" style="width:${W}px;height:${H}px;box-sizing:border-box;border:3px solid ${T.teal};border-radius:14px;background:#FFFFFF"></div>`;
    const rose = compassRose({ px: 110, letters: bank.dirLetters, reference: true }).svg;
    const rows = Array.from({ length: d.rows }, () => `<div style="display:flex;align-items:flex-end;gap:12px"><span style="flex:0 0 52px;height:52px;box-sizing:border-box;border:2.5px solid ${T.grid};border-radius:10px;background:#FFFFFF"></span>` +
      `<span style="font:700 22px/1 'Baloo 2',cursive;color:${T.ink}">=</span><span style="flex:1;border-bottom:2.5px solid ${T.ink};height:40px"></span></div>`);
    const key = `<div data-lcs-map-key style="flex:1;display:flex;flex-direction:column;gap:${d.rows > 4 ? 8 : 12}px;padding:10px 16px;border:2.5px solid ${T.teal};border-radius:14px;background:${T.cream}">` +
      `<span style="font:700 22px/1 'Baloo 2',cursive;color:${T.teal}">${esc(bank.keyTitle)}</span>${rows.join('')}</div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-own-map style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:14px;min-height:0">${plate}` +
        `<div style="display:flex;align-items:center;gap:16px;align-self:stretch">${key}<div style="flex:0 0 auto">${rose}</div></div></div>`,
      meta: { plate: d.plate, rows: d.rows },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-own-map]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-map-plate], [data-lcs-map-key]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('a block leaves the page'); });
      return fails;
    });
  },
};
