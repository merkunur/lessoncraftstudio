/**
 * G1-526 — Today's Date (Calendar maker 2026-11-03, NEW-TEMPLATES §53 T3; the morning-circle routine, de "das Datum
 * schreiben", fr "écrire la date", sv "skriva datum"): a tear-off calendar page shows today — the weekday, the day, the
 * month and the year; the child writes the date in numbers in the language's own order (en-US month first 10/14/2026, sv
 * ISO 2026-10-14, the others day first: de 14.10.2026, fr 14/10/2026, nl 14-10-2026; data/calendar/calendar-new.js
 * numeric), then in the sentence the class says (Heute ist Mittwoch, der 14. Oktober 2026), then yesterday's and
 * tomorrow's weekday and date. The names are data/b2/calendar.js (fi: the month partitive after the day, lokakuuta). The
 * day is never the 1st or the last days of a month (yesterday and tomorrow stay in the month). Each part is an answer box
 * (a day or month written 4 or 04 is right); the key prints the date.
 * Levels: 1 the date in numbers · 2 + the date sentence · 3 + yesterday and tomorrow.
 */
'use strict';
const calendar = require('../../primitives/calendar.js');
const { CALENDAR } = require('../../data/b2/calendar.js');
const { CAL_NEW } = require('../../data/calendar/calendar-new.js');
const T = require('../../primitives/_tokens.js').color;
const { monthTitle } = require('./G1-524-fill-in-the-calendar.js');

const D = { 1: { sentence: false, around: false }, 2: { sentence: true, around: false }, 3: { sentence: true, around: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'G1-526',
  slug: 'todays-date',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'calendar',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: "Today's Date", instruction: "Look at today's calendar page. Write the date in numbers." } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const C = CALENDAR[L], N = CAL_NEW[L];
    const year = rng.int(2025, 2028), month = rng.int(0, 11), day = rng.int(3, 26);
    const wd = (dd) => C.dayNames[calendar.weekdayOf(year, month, dd)];
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const box = (answer, w, alts) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(answer)}"${alts && alts.length ? ` data-lcs-alts="${esc(alts.join('|'))}"` : ''}` : ''} style="width:${Math.round(w)}px;height:48px;flex:0 0 auto"></span>`;
    const txt = (s) => `<span style="white-space:pre">${esc(s)}</span>`;
    const two = (n) => (n < 10 ? ['0' + n] : []);
    // sv writes the ISO date with two digits (2026-02-25): the padded form is the answer, 2 accepted
    const pad = L === 'sv' ? (n) => (n < 10 ? '0' + n : String(n)) : (n) => n;
    const alt2 = (n) => (L === 'sv' ? (n < 10 ? [String(n)] : []) : two(n));
    const wordBox = (w) => box(w, 30 + [...w].length * 15);
    // the date in numbers, in the language's order, its separators printed
    const numeric = (dd) => {
      const part = { d: box(pad(dd), 64, alt2(dd)), m: box(pad(month + 1), 64, alt2(month + 1)), y: box(year, 100) };
      // one unit: a date never breaks between its parts
      return `<span style="display:inline-flex;align-items:center;gap:4px;white-space:nowrap">${N.numeric.order.map((k) => part[k]).join(txt(' ' + N.numeric.sep + ' '))}</span>`;
    };
    const line = (inner, attr) => `<div ${attr} style="display:flex;align-items:center;flex-wrap:wrap;gap:8px 4px;font:700 24px/1.3 'Nunito',sans-serif;color:${T.ink}">${inner}</div>`;
    const rows = [line(numeric(day), 'data-lcs-date-row="numeric"')];
    if (d.sentence) {
      const monthWord = N.monthIn && N.monthIn.today ? N.monthIn.today(C.monthNames[month]) : C.monthNames[month];
      const parts = N.today.split(/(\{weekday\}|\{day\}|\{month\}|\{year\})/).filter(Boolean).map((p) => (
        p === '{weekday}' ? wordBox(wd(day)) : p === '{day}' ? box(day, 64, two(day)) : p === '{month}' ? wordBox(monthWord) : p === '{year}' ? box(year, 100) : txt(p)));
      rows.push(line(parts.join(''), 'data-lcs-date-row="sentence"'));
    }
    if (d.around) {
      for (const [k, dd] of [['yesterday', day - 1], ['tomorrow', day + 1]]) {
        rows.push(line(`<span class="ws-pill" style="flex:0 0 120px;box-sizing:border-box;text-align:center;font-size:18px;padding:3px 8px">${esc(N.labels[k])}</span>${wordBox(wd(dd))}${txt('   ')}${numeric(dd)}`, `data-lcs-date-row="${k}"`));
      }
    }
    // the tear-off page: weekday band, the day, month and year
    const leaf = `<div data-lcs-date-leaf style="width:230px;border:3px solid ${T.teal};border-radius:14px;overflow:hidden;background:#FFFFFF;text-align:center;flex:0 0 auto">` +
      `<div style="background:${T.teal};color:#FFFFFF;font:700 24px/1 'Baloo 2',cursive;padding:10px 6px">${esc(wd(day).charAt(0).toLocaleUpperCase(L) + wd(day).slice(1))}</div>` +
      `<div style="font:700 96px/1 'Baloo 2',cursive;color:${T.ink};padding:10px 0 2px">${day}</div>` +
      `<div style="font:700 24px/1.1 'Baloo 2',cursive;color:${T.teal};padding:0 6px 12px">${esc(monthTitle(L, year, month))}</div></div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-todays-date style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:20px;min-height:0">${leaf}` +
        `<div style="display:flex;flex-direction:column;gap:22px;align-self:stretch;padding:14px 18px;border-radius:16px;background:${T.cream}">${rows.join('')}</div></div>`,
      meta: { year, month, day },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-todays-date]').getBoundingClientRect();
      const rows = [...document.querySelectorAll('[data-lcs-date-row]')];
      if (!rows.length) fails.push('no date row');
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`); if (!r.querySelector('.ws-answerbox')) fails.push(`row ${i + 1}: nothing to write`); });
      return fails;
    });
  },
};
