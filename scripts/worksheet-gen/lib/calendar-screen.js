/**
 * calendar-screen.js — Level Set 2026-10-04 (Calendar, PDF + interactive): the SCREEN version and the ANSWER KEY of a
 * built G2-277 page (the base or one of its four variations), plus the robot's INDEPENDENT oracle. The builder hands
 * over `_ans` (outside meta): the month heading, the calendar drawing and the questions. New pages only.
 *
 *   screen: the month and the calendar on top (read, not tapped); one item per question card with three options —
 *           a number: the answer + typical slips (one day off when counting the start day, one row off = ±7, the
 *           other weekday count 4 / 5, the neighbouring month lengths); a weekday: the answer + the day before and
 *           the day after (the neighbouring columns). The right option never keeps one place.
 *   oracle: recomputes every answer with UTC date maths from the item's stamps (question kind, argument, year,
 *           month, the stickers as DRAWN on the calendar) and the locale's weekday names (data/b2/calendar.js) —
 *           never from the page's answers.
 *   key:    the printed page with every answer written centred in its own answer box (the measured gap-box rule).
 */
'use strict';
const { slotFor } = require('./answer-slots.js');
const { CALENDAR } = require('../data/b2/calendar.js');

const CORAL = '#F2784B', INK = '#1F2B2A';
const SCR_W = 660, OPT_H = 96;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const daysIn = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
const dow = (y, m, d) => new Date(Date.UTC(y, m, d)).getUTCDay();

/** the stickers as drawn on the calendar svg: { key: day } */
function drawnStickers(svg) {
  const out = {};
  for (const m of String(svg).matchAll(/<[^>]*data-lcs-sticker="([^"]+)"[^>]*>/g)) {
    const d = /data-lcs-day="(\d+)"/.exec(m[0]);
    if (d) out[m[1]] = +d[1];
  }
  return out;
}

/** the three options of a question: the answer + two typical slips, the answer at position `at` */
function optionsFor(q, A, loc, at) {
  const C = CALENDAR[loc];
  const days = daysIn(A.year, A.month);
  let d = [];
  if (q.slot === 'word') {
    const w = C.dayNames.indexOf(q.answer);
    if (w < 0) throw new Error(`calendar screen: "${q.answer}" is no ${loc} weekday name`);
    d = [C.dayNames[(w + 6) % 7], C.dayNames[(w + 1) % 7]];
  } else {
    const a = +q.answer;
    if (q.kind === 'countWeekday') d = a === 5 ? [4, 6] : [5, 3];
    else if (q.kind === 'daysInMonth') d = [28, 29, 30, 31].filter((x) => x !== a).sort((x, y) => Math.abs(x - a) - Math.abs(y - a));
    else if (q.kind === 'stickerDate') d = [a + 7 <= days ? a + 7 : a - 7, a + 1, a - 1];
    else if (q.kind === 'weekLater') d = [a + 1, a - 1, +q.arg];
    else d = [a + 1, a - 1, a + 2];   // after: counting the start day too, or one short
    d = d.filter((x) => Number.isInteger(x) && x > 0 && x !== a);
  }
  const o = [...new Set(d.map(String))].filter((x) => x !== String(q.answer)).slice(0, 2);
  if (o.length < 2) throw new Error(`calendar screen: ${q.kind} has ${o.length} wrong options`);
  o.splice(at, 0, String(q.answer));
  return o;
}

function screenOrKey(built, ctx, loc) {
  const A = built._ans;
  if (!A || !A.qs) throw new Error('calendar screen: no answer data');
  const out = { bodyHtml: built.bodyHtml, meta: built.meta };
  if (ctx.interactive) {
    const st = drawnStickers(A.svg);
    const stamp = Object.entries(st).map(([k, v]) => `${k}:${v}`).join(',');
    const items = A.qs.map((q, i) => {
      const opts = optionsFor(q, A, loc, slotFor(q.kind + '|' + q.arg + '|' + i, 3));   // never i % 3 (a diagonal tell, 2026-10-06)
      const at = opts.indexOf(String(q.answer));
      const w = q.slot === 'word' ? 200 : 190;
      const px = q.slot === 'word' ? Math.max(20, Math.min(30, Math.floor((w - 24) / (0.6 * Math.max(...opts.map((x) => [...x].length)))))) : 40;
      const chips = opts.map((v, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(v)}"${j === at ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap">${esc(v)}</span>`).join('');
      const text = q.text.replace(/width:26px;height:26px/g, 'width:40px;height:40px');
      return `<div data-lcs-item data-lcs-word="${i + 1}" data-lcs-q="${q.kind}" data-lcs-arg="${esc(q.arg)}" data-lcs-year="${A.year}" data-lcs-month="${A.month}" data-lcs-stickers="${esc(stamp)}" data-ws-content ` +
        `style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
        `<p style="margin:0;font-family:Nunito,sans-serif;font-weight:800;font-size:26px;line-height:1.35;color:${INK};text-align:center">${text}</p>` +
        `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${chips}</div></div>`;
    });
    out.bodyHtml = `<div data-ws-content data-lcs-type="calendar" data-lcs-screen="read" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:4px">` +
      `${A.monthBar}${A.svg}${items.join('')}</div>`;
    return out;
  }
  // the answer key: every answer box carries its answer, centred (gap-box rule G); weekday names a size smaller
  const h = out.bodyHtml.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox');
  const css = [
    `[data-lcs-gapbox]{position:relative}`,
    `[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 22px 'Baloo 2',cursive;color:${CORAL};white-space:nowrap}`,
    `[data-lcs-slot="word"] [data-lcs-gapbox]::after{font-size:18px}`,
  ];
  out.bodyHtml = h + `<style data-lcs-key>${css.join('')}</style>`;
  return out;
}

/** the robot's oracle: the index of the option that answers each question, recomputed here */
function oracle(items, loc) {
  const C = CALENDAR[loc];
  return items.map((it) => {
    const M = it.meta || {};
    const y = +M['data-lcs-year'], m = +M['data-lcs-month'], kind = M['data-lcs-q'], arg = M['data-lcs-arg'];
    const st = Object.fromEntries((M['data-lcs-stickers'] || '').split(',').filter(Boolean).map((x) => { const i = x.lastIndexOf(':'); return [x.slice(0, i), +x.slice(i + 1)]; }));
    const days = daysIn(y, m);
    let want;
    if (kind === 'dayOfDate') want = C.dayNames[dow(y, m, +arg)];
    else if (kind === 'firstDay') want = C.dayNames[dow(y, m, 1)];
    else if (kind === 'lastDay') want = C.dayNames[dow(y, m, days)];
    else if (kind === 'countWeekday') { let c = 0; for (let d = 1; d <= days; d++) if (dow(y, m, d) === +arg) c++; want = c; }
    else if (kind === 'stickerDate') want = st[arg];
    else if (kind === 'weekLater') want = +arg + 7;
    else if (kind === 'daysInMonth') want = days;
    else if (kind === 'after') { const [a, b] = String(arg).split(','); want = st[b] - st[a]; }
    else throw new Error(`calendar oracle: kind ${kind}`);
    if (want === undefined || Number.isNaN(want)) throw new Error(`calendar oracle: ${kind} ${arg} unanswerable`);
    const L = it.options.map((o) => (typeof o === 'object' ? o.label : o));
    const hits = L.map((l, i) => (String(l) === String(want) ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`calendar oracle: ${kind} ${arg}: ${hits.length} options are ${want} (${L.join(', ')})`);
    return hits[0];
  });
}

function interactiveFor() {
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q', 'data-lcs-arg', 'data-lcs-year', 'data-lcs-month', 'data-lcs-stickers'], instructionKey: 'read', screenHeight: 4600,
    oracle: (items, l) => oracle(items, (l || 'en').slice(0, 2)),
  };
}

module.exports = { screenOrKey, oracle, interactiveFor, optionsFor, drawnStickers };
