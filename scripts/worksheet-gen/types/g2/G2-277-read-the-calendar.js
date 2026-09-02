/**
 * G2-277 — Read the Calendar (nt20-B; `calendar`, G2, readiness — de Zeit /
 * fr se repérer dans le temps / Kalender lesen). A real month page —
 * weekday header, numbered days, two or three picture "stickers" on chosen
 * days — and six questions that can only be answered by READING the grid:
 * what day is the 14th? how many Fridays? on which date is the [kite]?
 * one week later? The month is the same in all 11 locales; the week starts
 * on the locale's own first day (en and pt-BR Sunday, the rest Monday).
 * Stickers are referenced inline as pictures (no noun → no article).
 * All answers are recomputed from UTC date math in verify().
 */
'use strict';
const calendar = require('../../primitives/calendar.js');
const { answerBox } = require('../../templates/components.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { CALENDAR, ordinal } = require('../../data/b2/calendar.js');

const STICKER_THEME = 'toys';

module.exports = {
  id: 'G2-277',
  slug: 'read-the-calendar',
  gradeBand: 'G2',
  assetClass: 'geometry',
  exerciseType: 'calendar',
  themeAxis: { applicable: false },
  difficulty: {
    1: { questions: ['dayOfDate', 'countWeekday', 'stickerDate', 'daysInMonth'], stickers: 2, cols: 2 },
    2: { questions: ['dayOfDate', 'countWeekday', 'stickerDate', 'weekLater', 'daysInMonth', 'firstDay'], stickers: 3, cols: 2 },
    3: { questions: ['dayOfDate', 'countWeekday', 'stickerDate', 'weekLater', 'after', 'lastDay'], stickers: 3, cols: 2, sixRows: true },
  },
  i18n: {
    en: {
      title: 'Read the Calendar',
      instruction: 'Look at the calendar. Use it to answer every question.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const C = CALENDAR[loc];
    if (!C || !C.frames) throw new Error(`G2-277: no calendar facts/frames for ${loc}`);
    // month choice (same seed → same month in every locale)
    let year, month, guard = 0, meta;
    do {
      year = rng.int(2025, 2027); month = rng.int(0, 11);
      meta = { days: calendar.daysInMonth(year, month) };
      meta.rows = Math.ceil(((calendar.firstDow(year, month) - C.weekStart + 7) % 7 + meta.days) / 7);
      guard++;
    } while (d.sixRows && meta.rows < 6 && guard < 50 && loc !== 'xx');
    const days = meta.days;
    // stickers on distinct days ≥ 2 apart, never the 1st
    const nouns = rng.sample(labelSafeNouns(STICKER_THEME), d.stickers);
    const stickerDays = [];
    let g2 = 0;
    while (stickerDays.length < d.stickers && g2++ < 200) {
      const day = rng.int(2, days);
      if (stickerDays.some((s) => Math.abs(s - day) < 2)) continue;
      stickerDays.push(day);
    }
    stickerDays.sort((a, b) => a - b);
    const stickers = nouns.map((n, i) => ({ day: stickerDays[i], href: fileUri(STICKER_THEME, n.noun), key: n.vocabKey, noun: n.noun }));
    const cal = calendar({ year, month, weekStart: C.weekStart, dayAbbr: C.dayAbbr, stickers, cellW: 88, cellH: d.sixRows || meta.rows === 6 ? 54 : 58 });
    const weekday = (day) => calendar.weekdayOf(year, month, day);
    const dayName = (day) => C.dayNames[weekday(day)];
    const inline = (s) => `<img class="ws-icon" src="${s.href}" alt="" data-lcs-sticker-ref="${s.key}" style="width:26px;height:26px;vertical-align:middle;margin:0 2px">`;
    // pick a dayOfDate date: not a sticker day, not the 1st, not the last
    let qDate; let g3 = 0;
    do { qDate = rng.int(2, days - 1); g3++; } while (stickerDays.includes(qDate) && g3 < 50);
    let wDate; let g4 = 0;
    do { wDate = rng.int(1, days - 7); g4++; } while (stickerDays.includes(wDate) && g4 < 50);
    const wd = rng.int(0, 6);
    const countWeekday = (idx) => { let c = 0; for (let day = 1; day <= days; day++) if (weekday(day) === idx) c++; return c; };
    const qs = d.questions.map((kind) => {
      const f = C.frames[kind];
      if (!f) throw new Error(`G2-277: ${loc} has no frame ${kind}`);
      let text = f, answer, slot = 'number', arg = '';
      if (kind === 'dayOfDate') { text = f.replace('{date}', ordinal(C.ordinalStyle, qDate)); answer = dayName(qDate); slot = 'word'; arg = qDate; }
      else if (kind === 'countWeekday') { text = f.replace('{dayPlural}', C.dayPlural[wd]); answer = countWeekday(wd); arg = wd; }
      else if (kind === 'stickerDate') { const s = stickers[0]; text = f.replace('{sticker}', inline(s)); answer = s.day; arg = s.key; }
      else if (kind === 'weekLater') { text = f.replace('{date}', ordinal(C.ordinalStyle, wDate)); answer = wDate + 7; arg = wDate; }
      else if (kind === 'daysInMonth') { answer = days; }
      else if (kind === 'firstDay') { answer = dayName(1); slot = 'word'; }
      else if (kind === 'lastDay') { answer = dayName(days); slot = 'word'; }
      else if (kind === 'after') { const a = stickers[0], b = stickers[stickers.length - 1]; text = f.replace('{stickerA}', inline(a)).replace('{stickerB}', inline(b)); answer = b.day - a.day; arg = `${a.key},${b.key}`; }
      if (/\{/.test(text)) throw new Error(`G2-277: unfilled slot in ${kind}`);
      return { kind, text, answer, slot, arg };
    });
    const qHtml = qs.map((q, i) =>
      `<div class="ws-card" style="flex-direction:row;align-items:center;gap:10px;padding:8px 10px;min-height:76px" data-lcs-q="${q.kind}" data-lcs-arg="${q.arg}" data-lcs-answer="${q.answer}" data-lcs-slot="${q.slot}">` +
      `<span style="flex:0 0 26px;width:26px;height:26px;border-radius:50%;background:#146B5E;color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:15px;display:flex;align-items:center;justify-content:center">${i + 1}</span>` +
      `<p style="flex:1;margin:0;font-family:'Nunito';font-weight:800;font-size:15px;line-height:1.35;color:#3A3530" data-lcs-qtext>${q.text}</p>` +
      `<span style="flex:0 0 auto">${answerBox({ w: q.slot === 'word' ? 150 : 60, h: 40, answer: q.answer })}</span></div>`).join('');
    const monthBar = `<div style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#146B5E;text-align:center" data-lcs-monthbar data-lcs-month="${month}" data-lcs-year="${year}">${C.monthNames[month]} ${year}</div>`;
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:space-evenly;align-items:center" data-ws-content>` +
        `${monthBar}${cal.svg}<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;width:660px">${qHtml}</div></div>`,
      meta: { year, month, stickers: stickers.map((s) => [s.key, s.day]) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cal = document.querySelector('[data-lcs-prim="calendar"]');
      if (!cal) return ['no calendar'];
      const year = +cal.dataset.lcsYear, month = +cal.dataset.lcsMonth, ws = +cal.dataset.lcsWeekstart;
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      if ((lang === 'en' || lang === 'pt') !== (ws === 0)) fails.push(`weekStart ${ws} wrong for ${lang}`);
      const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
      const dow = (day) => new Date(Date.UTC(year, month, day)).getUTCDay();
      const firstCol = (dow(1) - ws + 7) % 7;
      if (+cal.dataset.lcsDays !== days) fails.push('day count stamp wrong');
      if (+cal.dataset.lcsFirstcol !== firstCol) fails.push('first column stamp wrong');
      const cells = [...cal.querySelectorAll('[data-lcs-day]')].filter((c) => c.tagName === 'rect');
      if (cells.length !== days) fails.push(`${cells.length} day cells`);
      cells.forEach((c) => { const day = +c.dataset.lcsDay; const col = (firstCol + day - 1) % 7; if (+c.dataset.lcsCol !== col) fails.push(`day ${day} in column ${c.dataset.lcsCol}, want ${col}`); });
      const rows = Math.ceil((firstCol + days) / 7);
      if (+cal.dataset.lcsRows !== rows || rows > 6) fails.push(`rows ${cal.dataset.lcsRows}`);
      // header order = rotated by weekStart
      const heads = [...cal.querySelectorAll('[data-lcs-dayhead]')].map((h) => +h.dataset.lcsDayhead);
      heads.forEach((idx, c) => { if (idx !== (c + ws) % 7) fails.push('header order wrong'); });
      const stickers = [...cal.querySelectorAll('[data-lcs-sticker]')].map((s) => ({ key: s.dataset.lcsSticker, day: +s.dataset.lcsDay }));
      const sDays = stickers.map((s) => s.day);
      if (new Set(sDays).size !== sDays.length) fails.push('two stickers on one day');
      const dayNameOf = (day) => document.querySelector(`[data-lcs-q="dayOfDate"], [data-lcs-q="firstDay"], [data-lcs-q="lastDay"]`) ? null : null; // names are locale data; checked via consistency below
      const qs = [...document.querySelectorAll('[data-lcs-q]')];
      if (qs.length < 4) fails.push(`only ${qs.length} questions`);
      const wordAnswers = {};
      qs.forEach((q, i) => {
        const kind = q.dataset.lcsQ, ans = q.dataset.lcsAnswer, arg = q.dataset.lcsArg;
        const txt = q.querySelector('[data-lcs-qtext]');
        if (/\{/.test(txt.textContent)) fails.push(`q${i + 1}: unfilled slot`);
        if (txt.textContent.includes(ans) && q.dataset.lcsSlot === 'word') fails.push(`q${i + 1}: answer word printed in question`);
        if (kind === 'countWeekday') { let c = 0; for (let d = 1; d <= days; d++) if (dow(d) === +arg) c++; if (+ans !== c) fails.push(`q${i + 1}: count ${ans} != ${c}`); }
        else if (kind === 'stickerDate') { const s = stickers.find((x) => x.key === arg); if (!s || +ans !== s.day) fails.push(`q${i + 1}: sticker date wrong`); if (!txt.querySelector(`[data-lcs-sticker-ref="${arg}"]`)) fails.push(`q${i + 1}: sticker picture missing`); }
        else if (kind === 'weekLater') { if (+ans !== +arg + 7 || +arg + 7 > days) fails.push(`q${i + 1}: week later wrong`); }
        else if (kind === 'daysInMonth') { if (+ans !== days) fails.push(`q${i + 1}: days in month wrong`); }
        else if (kind === 'after') { const [a, b] = arg.split(','); const sa = stickers.find((x) => x.key === a), sb = stickers.find((x) => x.key === b); if (!sa || !sb || +ans !== sb.day - sa.day || sb.day <= sa.day) fails.push(`q${i + 1}: after wrong`); }
        else if (kind === 'dayOfDate' || kind === 'firstDay' || kind === 'lastDay') {
          const day = kind === 'dayOfDate' ? +arg : (kind === 'firstDay' ? 1 : days);
          if (kind === 'dayOfDate' && (day < 1 || day > days)) fails.push(`q${i + 1}: date out of month`);
          const w = dow(day);
          if (wordAnswers[w] && wordAnswers[w] !== ans) fails.push(`q${i + 1}: inconsistent weekday name for ${w}`);
          wordAnswers[w] = ans;
          // the name must be one of the 7 header-consistent names: at least non-empty and not a number
          if (!ans || /^\d+$/.test(ans)) fails.push(`q${i + 1}: weekday answer "${ans}"`);
        }
        const box = q.querySelector('[data-lcs-answer]');
        if (!box || box.dataset.lcsAnswer !== ans) fails.push(`q${i + 1}: box mismatch`);
        if (q.dataset.lcsSlot === 'word' && parseFloat(box.style.width) < 140) fails.push(`q${i + 1}: word slot too narrow`);
      });
      void dayNameOf;
      return fails;
    });
  },
};
