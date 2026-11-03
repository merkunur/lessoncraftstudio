/**
 * G1-527 — Our Week at School (Calendar maker 2026-11-03, NEW-TEMPLATES §53 T4; reading a table + the weekdays in order;
 * de "Stundenplan lesen", fr "l'emploi du temps", sv "schema"): a school week, Monday to Friday, one lesson a day — its
 * picture and its name (data/calendar/calendar-new.js subjects: art = a palette, music = a piano, PE = gymnastics,
 * reading, writing, swimming = goggles; the pictures opened on a contact sheet) — and questions read off the table: which
 * day has this lesson? what do we have on that day? The questions show the lesson as its picture (no subject word to
 * decline). Every question has one answer: a day-question names a lesson the week holds once.
 * Levels: 1 five lessons; circle the day or the lesson (three choices) · 2 five lessons; write the day, circle the lesson
 * · 3 one lesson on two days; write the day, circle the lesson, and count the days of the twice lesson.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const { CALENDAR } = require('../../data/b2/calendar.js');
const { CAL_NEW, SUBJECT_PICTURES, SUBJECT_THEME } = require('../../data/calendar/calendar-new.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { twice: false, dayAs: 'choice', qs: ['whichDay', 'whatDo', 'whichDay', 'whatDo'] }, 2: { twice: false, dayAs: 'write', qs: ['whichDay', 'whatDo', 'whichDay', 'whatDo'] },
  3: { twice: true, dayAs: 'write', qs: ['whichDay', 'whatDo', 'howMany', 'whichDay', 'whatDo'] } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// swimming is a weekly school subject in de fr nl and the Nordic schools, not in the US, Mexico, Brazil or Italy
const SUBJECTS_ALL = Object.keys(SUBJECT_PICTURES);
const subjectsFor = (L) => SUBJECTS_ALL.filter((s) => s !== 'swimming' || !['en', 'es', 'pt', 'it'].includes(L));

module.exports = {
  id: 'G1-527',
  slug: 'our-week-at-school',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'days-and-months',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Our Week at School', instruction: 'Read the timetable. Answer each question.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const C = CALENDAR[L], N = CAL_NEW[L], SUBJECTS = subjectsFor(L);
    const days = [1, 2, 3, 4, 5].map((i) => C.dayNames[i]);                     // Monday … Friday (Sunday-first names)
    const dayIn = (k) => (N.dayIn ? N.dayIn[k] : days[k]);
    // the week: five lessons (level 3: four, one of them on two days that are not neighbours)
    let week;
    if (!d.twice) week = rng.sample(SUBJECTS, 5);
    else {
      const four = rng.sample(SUBJECTS, 4);
      for (let t = 0; t < 200; t++) {
        const w = rng.shuffle([...four, four[0]]);
        const at = w.map((s, i) => (s === four[0] ? i : -1)).filter((i) => i >= 0);
        if (at[1] - at[0] > 1) { week = w; break; }
      }
      if (!week) throw new Error('G1-527: no week');
    }
    const once = SUBJECTS.filter((s) => week.filter((x) => x === s).length === 1);
    const twice = week.find((s) => week.filter((x) => x === s).length === 2);
    const pic = (s, px) => `<img class="ws-icon" src="${fileUri(SUBJECT_THEME, SUBJECT_PICTURES[s])}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;vertical-align:middle">`;
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // the table
    const table = `<div data-lcs-timetable style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:2px;background:${T.grid};border:3px solid ${T.teal};border-radius:12px;overflow:hidden">` +
      days.map((n) => `<div style="background:${T.teal};color:#FFFFFF;text-align:center;font:700 ${[...n].length > 9 ? 15 : 19}px/1.1 'Baloo 2',cursive;padding:9px 4px;overflow-wrap:anywhere">${esc(n.charAt(0).toLocaleUpperCase(L) + n.slice(1))}</div>`).join('') +
      week.map((s, i) => `<div data-lcs-tt-day="${i}" data-lcs-tt-subject="${s}" style="background:#FFFFFF;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 4px">${pic(s, 92)}<span style="font:700 ${[...N.subjects[s]].length > 12 ? 14 : 17}px/1.15 'Nunito',sans-serif;color:${T.ink};text-align:center;overflow-wrap:anywhere">${esc(N.subjects[s])}</span></div>`).join('') + '</div>';
    // the questions: day-questions on lessons the week holds once, lesson-questions on days whose lessons differ
    const pickOnce = rng.shuffle(once.filter((s) => week.includes(s)));
    // a lesson-question never asks the day of a day-question (on which day is swimming? / what is on Thursday? would
    // answer each other): the day-questions' days are taken first
    const nWhich = d.qs.filter((k) => k === 'whichDay').length;
    const whichDays = pickOnce.slice(0, nWhich).map((s) => week.indexOf(s));
    const pickDays = rng.shuffle([0, 1, 2, 3, 4].filter((i) => !whichDays.includes(i)));
    let oi = 0, di = 0;
    const chip = (inner, ok, label) => `<span class="ws-tt-choice"${mark && ok ? ' data-lcs-correct="1"' : ''} data-lcs-label="${esc(label)}" style="display:inline-flex;align-items:center;justify-content:center;min-width:64px;min-height:56px;padding:4px 10px;border:2.5px solid ${T.grid};border-radius:12px;background:#FFFFFF;font:700 17px/1.1 'Nunito',sans-serif;color:${T.ink}">${inner}</span>`;
    const choices = (items) => `<span style="display:inline-flex;gap:8px;flex-wrap:wrap">${items.join('')}</span>`;
    const qs = d.qs.map((k, qi) => {
      let text, answer;
      if (k === 'whichDay') {
        const s = pickOnce[oi++ % pickOnce.length], at = week.indexOf(s);
        text = N.tt.whichDay.replace('{pic}', pic(s, 34));
        if (d.dayAs === 'choice') {
          const others = rng.sample([0, 1, 2, 3, 4].filter((i) => i !== at), 2);
          // (fi: the essive, as the question asks «Minä päivänä …?» — maanantaina)
          answer = choices([at, ...others].sort((a, b) => a - b).map((i) => chip(esc(L === 'fi' ? dayIn(i) : days[i]), i === at, L === 'fi' ? dayIn(i) : days[i])));
        } else {
          // fi: the question is in the essive (Minä päivänä …?), so is the answer (perjantaina; perjantai accepted)
          const ans = L === 'fi' ? dayIn(at) : days[at], alts = L === 'fi' ? [days[at]] : [];
          answer = `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(ans)}"${alts.length ? ` data-lcs-alts="${esc(alts.join('|'))}"` : ''}` : ''} style="width:${30 + Math.max(...days.map((x, i) => [...(L === 'fi' ? dayIn(i) : x)].length)) * 14}px;height:48px"></span>`;
        }
      } else if (k === 'whatDo') {
        const at = pickDays[di++ % pickDays.length];
        const right = week[at], wrong = rng.sample(SUBJECTS.filter((s) => s !== right), 2);
        text = N.tt.whatDo.replace('{day}', esc(dayIn(at)));
        answer = choices(rng.shuffle([right, ...wrong]).map((s) => chip(pic(s, 50), s === right, N.subjects[s])));
      } else {
        text = N.tt.howMany.replace('{pic}', pic(twice, 34));
        answer = `<span class="ws-answerbox"${mark ? ' data-lcs-answer="2"' : ''} style="width:64px;height:48px"></span>`;
      }
      return `<div data-lcs-tt-q="${k}" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:8px 12px;border-radius:14px;background:${T.cream}">` +
        `<span style="flex:0 0 28px;height:28px;border-radius:14px;background:${T.teal};color:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;font:700 16px/1 'Baloo 2',cursive">${qi + 1}</span>` +
        `<span style="flex:1 1 260px;font:700 20px/1.3 'Nunito',sans-serif;color:${T.ink}">${text}</span>${answer}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-week-school style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:14px;min-height:0">${table}<div style="display:flex;flex-direction:column;gap:10px">${qs.join('')}</div></div>`,
      meta: { week, questions: d.qs },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cells = [...document.querySelectorAll('[data-lcs-tt-day]')];
      if (cells.length !== 5) fails.push(`${cells.length} days`);
      const root = document.querySelector('[data-lcs-week-school]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-tt-q], [data-lcs-timetable]').forEach((q, i) => { const r = q.getBoundingClientRect(); if (r.bottom > root.bottom + 1 || r.right > root.right + 1) fails.push(`block ${i + 1} leaves the page`); });
      document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
      return fails;
    });
  },
};
