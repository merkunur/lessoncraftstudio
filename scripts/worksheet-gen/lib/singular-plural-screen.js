/**
 * singular-plural-screen.js — Level Set 2026-10-01: the SCREEN version (tap-spell) and the ANSWER KEY of a built
 * Singular and Plural page (K-287 and faces). New pages only — the published pages never reach this file.
 *
 * Screen: one item per row of the print page. The GIVEN form is shown with its picture(s) and count badge; the child
 * spells the MISSING form (plural on one→many faces, singular on the toSingular faces) from shuffled letter tiles,
 * one slot per letter (the cloze plural screen's mechanics, G1-350).
 * Key: the print page with the missing word written on the answer lane's EMPTY writing trio, seated on that trio's
 * own rules by the font's measured x-height (lib/key-on-row.js), never a guessed offset — measured by
 * qa/key-text-measure.js while the deck is generated.
 * Oracle: the expected word is recomputed from image-vocabulary (vocab key + direction), never from the page.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const FONT_METRICS = require('../primitives/font-metrics.json');
const { vocab, displayWord, fileUri } = require('./b2-common.js');
const { countBadge } = require('../templates/components-b2.js');

const SCR_W = 660, TILE = 100, SLOT = 74, CORAL = '#F2784B';
const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** A deterministic shuffle of a word's letters that never leaves them in spelling order (G1-350 tileOrder). */
function tileOrder(letters, seed) {
  const n = letters.length;
  const idx = letters.map((_, i) => i);
  let h = 2166136261; for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0; const j = h % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  if (n > 1 && idx.every((v, i) => letters[v] === letters[i])) idx.push(idx.shift());
  return idx;
}

/** The expected answer of a row: the vocab's own singular / plural, displayed the way the page displays it. */
function answerOf(vocabKey, target, loc) {
  const e = (vocab()[vocabKey] || {})[loc];
  if (!e) throw new Error(`singular-plural: no ${loc} vocab for "${vocabKey}"`);
  return displayWord(target === 'one' ? e[0] : e[1], loc);
}

function pics(theme, noun, key, n, px) {
  const im = `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" data-lcs-pic="${esc(key)}" style="width:${px}px;height:${px}px;object-fit:contain">`;
  return `<div style="position:relative;display:flex;gap:8px;align-items:flex-end;padding-left:${n > 1 ? 22 : 18}px;padding-top:8px">${countBadge(n)}${Array.from({ length: n }, () => im).join('')}</div>`;
}

function screenItem(row, theme, loc) {
  const target = row.toSing ? 'one' : 'many';
  const word = row.toSing ? row.sing : row.plur;
  const given = row.toSing ? row.plur : row.sing;
  const letters = [...String(word).normalize('NFC')];
  const order = tileOrder(letters, row.key + '|' + target + '|' + loc);
  const slots = letters.map((_, k) => `<span data-lcs-slot="${k}" style="display:inline-block;width:${SLOT}px;height:${SLOT}px;box-sizing:border-box;border:3px dashed ${CORAL};border-radius:12px;background:#FFF"></span>`).join('');
  const tiles = order.map((v) => `<span class="ws-achip" data-lcs-tile data-lcs-label="${esc(letters[v])}" style="width:${TILE}px;height:${TILE}px;box-sizing:border-box;font-size:44px">${esc(letters[v])}</span>`).join('');
  const givenPics = pics(theme, row.noun, row.key, row.toSing ? row.n : 1, row.toSing ? 76 : 96);
  const targetPics = pics(theme, row.noun, row.key, row.toSing ? 1 : row.n, row.toSing ? 96 : 76);
  const givenWord = `<span data-lcs-given style="font-family:'Nunito',sans-serif;font-weight:800;font-size:34px;color:${tokens.color.ink}">${esc(given)}</span>`;
  return `<div data-lcs-item data-ws-content data-lcs-vocab="${esc(row.key)}" data-lcs-target="${target}" data-lcs-word="${esc(word)}" style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap">${givenPics}${givenWord}<span style="font-size:34px;color:${CORAL}">→</span>${targetPics}</div>` +
    `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;max-width:600px">${slots}</div>` +
    `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;max-width:600px">${tiles}</div></div>`;
}

/** Seat `text` on the empty trio of the trace-lane svg (string) whose data-lcs-text is `laneText`. */
function seatInTrio(html, laneText, text, { center = false, w } = {}) {
  const openRe = new RegExp(`<svg[^>]*data-lcs-text="${laneText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*data-lcs-empty-slot="1"[^>]*>`);
  const m = openRe.exec(html);
  if (!m) throw new Error(`singular-plural key: no empty-trio lane for "${laneText}"`);
  const start = m.index, end = html.indexOf('</svg>', start);
  const svg = html.slice(start, end);
  const t0 = svg.lastIndexOf('data-lcs-empty-trio="1"');
  if (t0 < 0) throw new Error(`singular-plural key: lane "${laneText}" has no empty trio`);
  const gClose = svg.indexOf('</g>', t0);
  const trio = svg.slice(t0, gClose);
  const ys = [...trio.matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((x) => x[1] === x[2]).map((x) => +x[1]).sort((a, b) => a - b);
  if (ys.length !== 3) throw new Error(`singular-plural key: trio of "${laneText}" has ${ys.length} rules`);
  const width = w || +(/\bwidth="([\d.]+)"/.exec(svg) || [])[1];
  const [top, mid, base] = ys;
  const fm = FONT_METRICS['nunito-700'];
  const px = Math.round(((base - mid) / fm.xHeight) * 2) / 2;
  const room = width - 16;
  const fit = [...String(text)].length * px * 0.56 > room ? ` textLength="${room}" lengthAdjust="spacingAndGlyphs"` : '';
  const x = center ? (width / 2).toFixed(1) : '8';
  const t = `<text x="${x}" y="${base.toFixed(2)}"${center ? ' text-anchor="middle"' : ''} font-family="${esc(tokens.font.body)}" font-size="${px}" font-weight="700" fill="${CORAL}" data-lcs-starter="1" data-lcs-keytext="1"${fit}>${esc(text)}</text>`;
  void top;
  const newSvg = svg.slice(0, gClose) + t + svg.slice(gClose);
  return html.slice(0, start) + newSvg + html.slice(end);
}

/**
 * screenOrKey(built, ctx, loc, theme) — built.meta.rows: [{ key, noun, sing, plur, n, toSing }].
 */
function screenOrKey(built, ctx, loc, theme) {
  const rows = built.meta.rows;
  if (!Array.isArray(rows) || !rows.length) throw new Error('singular-plural: built page carries no rows');
  if (ctx.interactive) {
    const items = rows.map((r) => screenItem(r, theme, loc)).join('');
    return { bodyHtml: `<div data-ws-content data-lcs-type="singular-plural" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items}</div>`, meta: built.meta };
  }
  let html = built.bodyHtml;
  for (const r of rows) html = r.toSing ? seatInTrio(html, r.sing, r.sing, { center: true }) : seatInTrio(html, r.plur, r.plur);
  return { bodyHtml: html, meta: built.meta };
}

/** The robot gate's independent truth per screen item: the vocab's own form for (vocab key, target). */
function oracle(items, loc) {
  return items.map((it) => answerOf(it.meta['data-lcs-vocab'], it.meta['data-lcs-target'], (loc || 'en').slice(0, 2)));
}

/** The interactive declaration of a face; target 'many' (one→many faces) or 'one' (toSingular faces). */
function interactiveFor(target) {
  return {
    kind: 'tap-spell', item: '[data-lcs-item]', tile: '[data-lcs-tile]', slot: '[data-lcs-slot]',
    answerAttr: 'data-lcs-word', labelAttr: 'data-lcs-vocab', metaAttrs: ['data-lcs-vocab', 'data-lcs-target'],
    instructionKey: target, screenHeight: 6400,
    oracle: (items, l) => oracle(items, l),
  };
}

module.exports = { screenOrKey, seatInTrio, interactiveFor, oracle, answerOf, tileOrder };
