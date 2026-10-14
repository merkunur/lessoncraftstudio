#!/usr/bin/env node
/**
 * gc-figure-sheet.js — a contact sheet of pixel pictures in their real colours, so a person
 * can SEE every Grid Coordinates picture before it goes on a page (Level Set 2026-10-14).
 *
 *   node scripts/worksheet-gen/tools/level-set/gc-figure-sheet.js <out.png> [--published]
 *
 * Each tile: the picture on a grid, its key underneath. --published adds the 12 pictures the
 * live pages already use.
 */
'use strict';
const sharp = require('sharp');
const { LS_PIXEL_FIGURES } = require('../../data/b2/figures-levelset.js');
const { PIXEL_FIGURES, COLOR_LETTERS } = require('../../data/b2/figures.js');
const { SWATCH } = require('../../templates/components-b2.js');

const out = process.argv[2];
if (!out) { console.error('usage: gc-figure-sheet.js <out.png> [--published]'); process.exit(1); }
const figs = [...(process.argv.includes('--published') ? PIXEL_FIGURES.map((f) => ({ ...f, cls: 'live' })) : []), ...LS_PIXEL_FIGURES];
const CELL = 22, TILE = 9 * CELL + 30, COLS = 6;
const rows = Math.ceil(figs.length / COLS);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${COLS * TILE}" height="${rows * (TILE + 24)}"><rect width="100%" height="100%" fill="#fff"/>`;
figs.forEach((f, i) => {
  const x0 = (i % COLS) * TILE + 15, y0 = Math.floor(i / COLS) * (TILE + 24) + 10;
  const n = f.rows.length;
  f.rows.forEach((row, r) => [...row].forEach((ch, c) => {
    const fill = ch === '.' ? '#ffffff' : SWATCH[COLOR_LETTERS[ch]];
    svg += `<rect x="${x0 + c * CELL}" y="${y0 + r * CELL}" width="${CELL}" height="${CELL}" fill="${fill}" stroke="#ccc" stroke-width="1"/>`;
  }));
  svg += `<text x="${x0}" y="${y0 + n * CELL + 18}" font-family="sans-serif" font-size="15" fill="#222">${esc(f.key)} (${f.cls})</text>`;
});
svg += '</svg>';
sharp(Buffer.from(svg)).png().toFile(out).then(() => console.log(`${figs.length} pictures → ${out}`));
