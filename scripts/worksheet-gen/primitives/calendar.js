/**
 * calendar — month-grid primitive (SVG). nt20-B G2-277.
 *
 * Draws one real month: a weekday header row (teal fill, white abbreviations),
 * numbered day cells (white, light grid), leading/trailing empty cells in
 * creamDeep, and picture "stickers" (theme images) on chosen days. The week
 * starts on `weekStart` (0 = Sunday, 1 = Monday) — a per-locale fact (en and
 * pt-BR Sunday, the other nine Monday). Row count is computed from the
 * first-day column and the day count (4-6 rows; never a 7th).
 *
 * All date math is UTC so the page never depends on the render host's zone.
 *
 * { year, month (0-11), weekStart, dayAbbr:[7, Sunday-first order], stickers:[{day, href, key}],
 *   cellW=88, cellH=56, headerH=40 }
 *   → { svg, firstCol, days, rows, width, height }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, el, esc } = require('./_svg.js');

function daysInMonth(year, month) { return new Date(Date.UTC(year, month + 1, 0)).getUTCDate(); }
function firstDow(year, month) { return new Date(Date.UTC(year, month, 1)).getUTCDay(); } // 0 = Sunday
function weekdayOf(year, month, day) { return new Date(Date.UTC(year, month, day)).getUTCDay(); }

function calendar({ year, month, weekStart = 1, dayAbbr, stickers = [], cellW = 88, cellH = 56, headerH = 40 }) {
  const t = tokens;
  if (!Array.isArray(dayAbbr) || dayAbbr.length !== 7) throw new Error('calendar: dayAbbr must have 7 entries (Sunday-first order)');
  const days = daysInMonth(year, month);
  const firstCol = (firstDow(year, month) - weekStart + 7) % 7;
  const rows = Math.ceil((firstCol + days) / 7);
  const W = 7 * cellW + 4, H = headerH + rows * cellH + 4;
  const parts = [];
  // header
  parts.push(roundedRect({ x: 2, y: 2, w: W - 4, h: headerH, r: 8, fill: t.color.teal }));
  parts.push(el('rect', { x: 2, y: 2 + headerH - 10, width: W - 4, height: 10, fill: t.color.teal }));
  for (let c = 0; c < 7; c++) {
    const idx = (c + weekStart) % 7;
    parts.push(el('text', {
      x: 2 + c * cellW + cellW / 2, y: 2 + headerH / 2 + 1, 'font-family': t.font.display, 'font-size': 17, 'font-weight': 700,
      fill: t.color.white, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'data-lcs-dayhead': idx,
    }, esc(dayAbbr[idx])));
  }
  // cells
  const stickerByDay = new Map(stickers.map((s) => [s.day, s]));
  let day = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < 7; c++) {
      const x = 2 + c * cellW, y = 2 + headerH + r * cellH;
      const idx = r * 7 + c;
      const inMonth = idx >= firstCol && day <= days;
      parts.push(el('rect', {
        x, y, width: cellW, height: cellH, fill: inMonth ? t.color.white : t.color.creamDeep,
        stroke: t.color.grid, 'stroke-width': 1,
        ...(inMonth ? { 'data-lcs-day': day, 'data-lcs-col': c, 'data-lcs-row': r } : {}),
      }));
      if (inMonth) {
        parts.push(el('text', {
          x: x + 8, y: y + 8, 'font-family': t.font.display, 'font-size': 20, 'font-weight': 700,
          fill: t.color.ink, 'dominant-baseline': 'hanging',
        }, esc(day)));
        const s = stickerByDay.get(day);
        if (s) {
          const sz = Math.min(34, cellH - 18);
          parts.push(el('image', {
            href: s.href, x: x + cellW - sz - 5, y: y + cellH - sz - 4, width: sz, height: sz,
            'data-lcs-sticker': s.key, 'data-lcs-day': day, preserveAspectRatio: 'xMidYMid meet',
          }));
        }
        day++;
      }
    }
  }
  // frame
  parts.push(roundedRect({ x: 2, y: 2, w: W - 4, h: H - 4, r: 8, fill: 'none', strokeColor: t.color.teal, strokeWidth: 3 }));
  return {
    svg: svgRoot({ width: W, height: H, label: `calendar month grid` }, parts.join(''), {
      'data-lcs-prim': 'calendar', 'data-lcs-year': year, 'data-lcs-month': month, 'data-lcs-weekstart': weekStart,
      'data-lcs-days': days, 'data-lcs-firstcol': firstCol, 'data-lcs-rows': rows,
    }),
    firstCol, days, rows, width: W, height: H,
  };
}

module.exports = Object.assign(calendar, { daysInMonth, firstDow, weekdayOf });
