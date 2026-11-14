/** G2-296 — Read the Calendar: A First Look. nt20-B-VAR variation of G2-277. */
'use strict';
const base = require('./G2-277-read-the-calendar.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G2-296',
  slug: 'read-the-calendar-four-questions',
  // Level Set 2026-10-04: real easier / harder levels (level 2 = the published config); the screen version comes from the base
  difficulty: { 1: { ...D, questions: ['stickerDate', 'dayOfDate', 'daysInMonth', 'firstDay'] }, 2: D, 3: { ...D, questions: ['dayOfDate', 'countWeekday', 'stickerDate', 'lastDay'], sixRows: true, cellH: 54 } },
  i18n: { en: { title: "Read the Calendar: A First Look", instruction: "Look at the month. Answer each question by reading the calendar." } },

  /** THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md): six questions of the
   *  level, each a card with ITS OWN month beside it (on the worksheet one month stands above all the questions). Every
   *  card is the page's own draw (G2-277 build, one question of the level's list per card, in turn) and its calendar is
   *  drawn again by the same primitive at a card's size, with the same stickers on the same days. */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const { answerBox } = require('../../templates/components.js');
    const calendar = require('../../primitives/calendar.js');
    const { CALENDAR } = require('../../data/b2/calendar.js');
    const loc = (locale || 'en').slice(0, 2), C = CALENDAR[loc];
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const attr = (tag, k) => { const m = new RegExp('\\s' + k + '="([^"]*)"').exec(tag); return m ? m[1] : null; };
    const cards = [];
    for (let i = 0; i < 6; i++) {
      const one = { ...d, questions: [d.questions[i % d.questions.length]] };
      const b = base.build.call(Object.assign(Object.create(this), { difficulty: { check: one } }), { theme, difficulty: 'check', locale }, { ...(ctx || {}), interactive: false, answerKey: false });
      const a = b._ans, q = a.qs[0];
      // the stickers stay where a question asks about one (on a card of its own, a sticker no question names is noise)
      const stickers = !/sticker|after/i.test(q.kind) ? [] : (a.svg.match(/<image\b[^>]*>/g) || []).filter((t) => attr(t, 'data-lcs-sticker')).map((t) => ({ day: +attr(t, 'data-lcs-day'), href: attr(t, 'href'), key: attr(t, 'data-lcs-sticker') }));
      const cal = calendar({ year: a.year, month: a.month, weekStart: a.weekStart, dayAbbr: C.dayAbbr, stickers, cellW: 56, cellH: 38, headerH: 26 });
      cards.push(`<div class="ws-card-stage" style="gap:18px;justify-content:flex-start;align-items:center;padding:2px 4px" data-lcs-q="${q.kind}" data-lcs-arg="${q.arg}">` +
        `<div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:4px">${a.monthBar.replace('font-size:24px', 'font-size:18px')}${cal.svg}</div>` +
        `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:12px">` +
        `<p style="margin:0;font-family:'Nunito';font-weight:800;font-size:16px;line-height:1.4;color:#3A3530" data-lcs-qtext>${q.text}</p>` +
        `<div style="display:flex;justify-content:flex-end">${answerBox({ w: q.slot === 'word' ? 150 : 60, h: 40, answer: q.answer })}</div></div></div>`);
    }
    return { bodyHtml: checkGrid(cards), meta: {} };
  },
};
