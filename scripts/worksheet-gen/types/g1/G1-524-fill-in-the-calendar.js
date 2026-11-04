/**
 * G1-524 — Fill In the Calendar (Calendar maker 2026-11-03, NEW-TEMPLATES §53 T1; the classroom routine sheet; de
 * "Kalender ausfüllen", fr "compléter le calendrier", nl "kalender invullen"): a real month — its name and year, the
 * weekday header in the language's own first day (data/b2/calendar.js: en, pt-BR and es-MX start on Sunday, the eight
 * others on Monday) — with the dates left out; the child writes each date in its box. The teacher picks the month (a slot:
 * any month from January 2025 to December 2028); a new page draws one. All date math is UTC (primitives/calendar.js).
 * Each empty day is an answer box; the key prints the dates (and the weekday short forms on level 3).
 * Levels: 1 the first week printed, write the rest · 2 only the 1st printed · 3 only the 1st printed, and the weekday
 * short forms of the header written too.
 */
'use strict';
const calendar = require('../../primitives/calendar.js');
const { CALENDAR } = require('../../data/b2/calendar.js');
const { LABELS } = require('../../data/b2/labels.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { given: 'week' }, 2: { given: 'first' }, 3: { given: 'first', header: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const YEARS = [2025, 2026, 2027, 2028];

/** the heading of a month in the language (the month capitalised even where the language writes it small: Marts) */
function monthTitle(L, year, month) {
  const C = CALENDAR[L], tpl = (LABELS[L] && LABELS[L].calendar && LABELS[L].calendar.monthTitle) || '{month} {year}';
  const m = C.monthNames[month];
  return tpl.replace('{month}', m.charAt(0).toLocaleUpperCase(L) + m.slice(1)).replace('{year}', String(year));
}

module.exports = {
  id: 'G1-524',
  slug: 'fill-in-the-calendar',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'calendar',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Fill In the Calendar', instruction: 'Write the missing dates of the month in the calendar.' } },
  monthTitle,

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const C = CALENDAR[L];
    // the month: a slot over every month 2025-2028 (the teacher's choice), drawn on a new page
    const months = YEARS.flatMap((y) => Array.from({ length: 12 }, (_, m) => ({ y, m, word: monthTitle(L, y, m) })));
    const [pick] = slot.words(ctx, [rng.pick(months)], months, 'month', { derives: ['*'] });   // the month IS the page (its days follow it)
    const { y: year, m: month } = pick;
    const days = calendar.daysInMonth(year, month), firstCol = (calendar.firstDow(year, month) - C.weekStart + 7) % 7;
    const rows = Math.ceil((firstCol + days) / 7);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // the month fills the body (measured: 733 px; a 6-row month 46 + 6 × 94, a 5-row month 46 + 5 × 110)
    const cw = 88, ch = rows === 6 ? 94 : 110;
    const given = (day) => day === 1 || (d.given === 'week' && day <= 7);   // level 1: the first seven dates printed
    const head = Array.from({ length: 7 }, (_, c) => {
      const abbr = C.dayAbbr[(c + C.weekStart) % 7];
      if (!d.header) return `<div style="display:flex;align-items:center;justify-content:center;height:46px;background:${T.teal};color:#FFFFFF;font:700 20px/1 'Baloo 2',cursive">${esc(abbr)}</div>`;
      const alts = [abbr.charAt(0).toLocaleUpperCase(L) + abbr.slice(1), abbr.toLocaleLowerCase(L), abbr + '.'].filter((a, i, all) => a !== abbr && all.indexOf(a) === i);
      return `<div style="display:flex;align-items:center;justify-content:center;height:46px;background:${T.teal}"><span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(abbr)}" data-lcs-alts="${esc(alts.join('|'))}"` : ''} style="width:${cw - 14}px;height:36px;background:#FFFFFF"></span></div>`;
    });
    const cells = [];
    for (let i = 0; i < rows * 7; i++) {
      const day = i - firstCol + 1, inMonth = day >= 1 && day <= days;
      if (!inMonth) { cells.push(`<div style="height:${ch}px;background:${T.creamDeep || '#EFE4D2'}"></div>`); continue; }
      cells.push(`<div data-lcs-cal-day="${day}" style="height:${ch}px;background:#FFFFFF;display:flex;align-items:center;justify-content:center">` +
        (given(day)
          ? `<span style="font:700 30px/1 'Baloo 2',cursive;color:${T.ink}">${day}</span>`
          : `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${day}"` : ''} style="width:${cw - 16}px;height:${Math.min(70, ch - 16)}px"></span>`) + '</div>');
    }
    const grid = `<div data-lcs-cal-grid data-lcs-first-col="${firstCol}" data-lcs-days="${days}" style="display:grid;grid-template-columns:repeat(7,${cw}px);gap:2px;background:${T.grid};border:3px solid ${T.teal};border-radius:10px;overflow:hidden;width:max-content">${head.join('')}${cells.join('')}</div>`;
    const title = `<div data-lcs-month-title style="font:700 30px/1.1 'Baloo 2',cursive;color:${T.teal};text-align:center"${slot.attr(ctx, 'month', 0)}>${esc(monthTitle(L, year, month))}</div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-fill-calendar style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;min-height:0">${title}${grid}</div>`,
      meta: { year, month, firstCol, given: d.given },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const g = document.querySelector('[data-lcs-cal-grid]');
      const days = +g.dataset.lcsDays, cells = [...document.querySelectorAll('[data-lcs-cal-day]')];
      if (cells.length !== days) fails.push(`${cells.length} day cells for ${days} days`);
      if (cells.some((c, i) => +c.dataset.lcsCalDay !== i + 1)) fails.push('the days are not in order');
      if (!cells.some((c) => c.querySelector('.ws-answerbox'))) fails.push('nothing to write');
      const root = document.querySelector('[data-lcs-fill-calendar]').getBoundingClientRect(), r = g.getBoundingClientRect();
      if (r.right > root.right + 1 || r.bottom > root.bottom + 1 || r.left < root.left - 1) fails.push('the calendar leaves the page');
      return fails;
    });
  },
};
