/**
 * G1-525 — Our Birthday Graph (Calendar maker 2026-11-03, NEW-TEMPLATES §53 T2; 1.MD.C.4 organise data, 2.MD.D.10 bar
 * graphs + the months in order; the first-week-of-school routine): a bar graph of the twelve months, January to December
 * in the language's short forms (data/b2/calendar.js monthAbbr), one empty box per child — the class colours a box above
 * each child's birthday month (a class survey: one sheet holds the whole class); levels 2-3 add questions about the class's own
 * graph, answered on a line (the month of the «how many» question a write-in line, never a printed month that may be
 * empty; «fewest» asks for the months: a tie is right). The data is the
 * class's, so the page has no answer key and no screen (a printable to fill together).
 * Levels: 1 the graph, six boxes a month · 2 eight boxes a month + three questions (the most, the fewest, how many in a
 * month) · 3 ten boxes a month + four questions (… and how many children in all).
 */
'use strict';
const { CALENDAR } = require('../../data/b2/calendar.js');
const { CAL_NEW } = require('../../data/calendar/calendar-new.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { boxes: 6, qs: [] }, 2: { boxes: 8, qs: ['most', 'fewest', 'inMonth'] }, 3: { boxes: 10, qs: ['most', 'fewest', 'inMonth', 'total'] } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'G1-525',
  slug: 'birthday-graph',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'calendar',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Our Birthday Graph', instruction: "Ask your classmates their birthday month. Color one box above each child's month. Count the colored boxes in each month." } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const C = CALENDAR[L], N = CAL_NEW[L];
    const cell = d.boxes > 8 ? 34 : d.boxes > 6 ? 40 : 44, colW = 48;
    // de: the school's own short forms (März, Juni, Juli — Jun and Jul look alike)
    const abbr = L === 'de' ? ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'] : C.monthAbbr;
    const cols = abbr.map((ab, m) => `<div data-lcs-bday-month="${m}" style="display:flex;flex-direction:column;align-items:center;gap:6px;width:${colW}px">` +
      `<div style="display:flex;flex-direction:column-reverse;gap:3px">${Array.from({ length: d.boxes }, () => `<span style="display:block;width:${cell}px;height:${cell}px;box-sizing:border-box;border:2px solid ${T.grid};border-radius:6px;background:#FFFFFF"></span>`).join('')}</div>` +
      `<span style="font:700 ${[...ab].length > 4 ? 14 : 17}px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(ab.charAt(0).toLocaleUpperCase(L) + ab.slice(1))}</span></div>`);
    const graph = `<div data-lcs-bday-graph style="display:flex;justify-content:center;align-items:flex-end;gap:3px;padding:12px 10px;border:3px solid ${T.teal};border-radius:14px;background:${T.cream}">${cols.join('')}</div>`;
    // the month of the «how many» question is a write-in line: the class picks a month that has birthdays (a printed
    // month is often empty — a count of 0; native review 2026-11-03)
    // (fi: the question takes the month in the inessive — every month ends in -kuu, so the line is «______kuussa»)
    const monthWord = L === 'fi' ? '______kuussa' : '______';
    const qs = d.qs.map((k, i) => `<div data-lcs-bday-q="${k}" style="display:flex;align-items:flex-end;gap:12px">` +
      `<span style="flex:0 0 28px;height:28px;border-radius:14px;background:${T.teal};color:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;font:700 16px/1 'Baloo 2',cursive">${i + 1}</span>` +
      `<span style="flex:1;font:700 20px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(N.bday[k].replace('{month}', monthWord))}</span>` +
      `<span style="flex:0 0 170px;border-bottom:2.5px solid ${T.ink};height:30px"></span></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-birthday style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:18px;min-height:0">${graph}` +
        (qs.length ? `<div style="display:flex;flex-direction:column;gap:16px;padding:0 6px">${qs.join('')}</div>` : '') + '</div>',
      meta: { boxes: d.boxes, questions: d.qs },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cols = [...document.querySelectorAll('[data-lcs-bday-month]')];
      if (cols.length !== 12) fails.push(`${cols.length} months`);
      const root = document.querySelector('[data-lcs-birthday]').getBoundingClientRect();
      const g = document.querySelector('[data-lcs-bday-graph]').getBoundingClientRect();
      if (g.right > root.right + 1 || g.left < root.left - 1) fails.push('the graph is wider than the page');
      document.querySelectorAll('[data-lcs-bday-q]').forEach((q, i) => { const r = q.getBoundingClientRect(); if (r.bottom > root.bottom + 1 || r.right > root.right + 1) fails.push(`question ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
