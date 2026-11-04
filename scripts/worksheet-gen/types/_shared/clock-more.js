/**
 * clock-more.js — the new templates of the Telling Time maker (NEW-TEMPLATES §15, 2026-11-02). The analog face is
 * primitives/clock.js; a time in WORDS is lib/time-words.js only (never assembled here — the half-hour idiom inverts:
 * de "halb vier" = 3:30); the day's activities are data/time/routine.js. Five modes:
 *
 *   words    T1 · G1-477 Time in Words — draw a line from each clock to its time written in words (the letters on the
 *            words are what the key names). L1 o'clock and half past, 4 clocks · L2 + quarter past / to, 5 · L3 every
 *            five minutes, 6. Every page holds h:30 AND (h + 1):30 — "halb vier" must be told from "halb fünf".
 *            1.MD.B.3, 2.MD.C.7 in words.
 *   ampm     T5 · G2-474 Morning or Evening? — en-US: circle a.m. or p.m. for a moment of the day (2.MD.C.7 "using a.m.
 *            and p.m."); the ten 24-hour locales: circle 7:30 or 19:30 (the same idea in the clock they use). Only the
 *            moments whose NAME fixes the half of the day (breakfast, dinner, bedtime …: a toothbrush or a bus happens
 *            morning AND evening). L1 whole hours · L2 half hours · L3 quarter hours, 6 cards.
 *   sector   T6 · G1-479 Quarter Hours on the Clock — shade the part of the face the minute hand has passed since the
 *            full hour (a quarter, a half, three quarters): why "quarter past" is called that. The time in words under
 *            the clock (L1-L2). 1.MD.B.3 + 1.G.A.3.
 *   timeline T3 · G3-475 Elapsed Time on a Time Line — the start and the end on a time line with ticks; write the hours
 *            and the minutes that passed. L1 whole hours · L2 half hours · L3 quarter hours; never across 12 o'clock.
 *            3.MD.A.1.
 *   cutout   T4 · K-462 Make Your Own Clock — a big face and two hands to cut out and fix with a paper fastener
 *            (material, no key). L1 numerals · L2 + the minute ring (5 … 55) · L3 + the four quarters tinted.
 */
'use strict';
const clock = require('../../primitives/clock.js');
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { timeWords } = require('../../lib/time-words.js');
const { slotFor } = require('../../lib/answer-slots.js');
const { ROUTINE, windowOf, labelOf } = require('../../data/time/routine.js');
const { fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const { makeRng } = require('../../lib/rng.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', CREAM = '#FBF3E4', SOFT = '#FBE3D8';
const BIG = (s, px = 30, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;line-height:1;color:${color};white-space:nowrap">${s}</span>`;
const fmt = (h, m) => `${h}:${String(m).padStart(2, '0')}`;   // machine values (data attributes) only
// a time the child READS is written the way the locale writes it (fi 7.30, fr 7 h 30 — 2026-11-04 native review): the
// clock family's own formatter (clock-tasks.js convKit), one rule for both families
const KIT = require('./clock-tasks.js').convKit();
const vt = (L, h, m) => KIT.clockTime(L, h, m);
const loc2 = (locale) => String(locale || 'en').slice(0, 2);

const LEVELS = {
  // extra: one worded time no clock shows (the last line is never forced); maxH 11 at level 3 ("halb zwölf" / half past
  // eleven is a real stumbling point) — native + pedagogy review 2026-11-02
  words: { 1: { pairs: 4, minutes: [0, 30], maxH: 10 }, 2: { pairs: 5, minutes: [0, 15, 30, 45], maxH: 10, extra: 1 }, 3: { pairs: 5, minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], maxH: 11, extra: 1 } },
  ampm: { 1: { cards: 6, step: 60 }, 2: { cards: 6, step: 30 }, 3: { cards: 6, step: 15 } },
  sector: { 1: { cards: 4, minutes: [15, 30], words: true }, 2: { cards: 4, minutes: [15, 30, 45], words: true }, 3: { cards: 6, minutes: [15, 30, 45], words: false } },
  timeline: { 1: { cards: 3, step: 60, maxSpan: 300, hoursOnly: true }, 2: { cards: 3, step: 15, maxSpan: 225 }, 3: { cards: 3, step: 5, spanHours: 4, maxLine: 5, startHour: 5 } },
  cutout: { 1: { ring: false, quarters: false }, 2: { ring: true, quarters: false }, 3: { ring: true, quarters: true } },
};

/** the units a time line's answer boxes carry (hours, minutes), the way a school page abbreviates them */
const UNITS = {
  en: ['hr', 'min'], de: ['h', 'min'], fr: ['h', 'min'], es: ['h', 'min'], pt: ['h', 'min'], it: ['h', 'min'],
  nl: ['uur', 'min'], sv: ['tim', 'min'], da: ['t', 'min'], no: ['t', 'min'], fi: ['h', 'min'],
};

/** a sector of a circle from minute a to minute b (0 = 12 o'clock, clockwise), as an SVG path */
function sectorPath(cx, cy, r, a, b) {
  const pt = (min) => { const t = (min / 60) * 2 * Math.PI - Math.PI / 2; return [cx + Math.cos(t) * r, cy + Math.sin(t) * r]; };
  const [x1, y1] = pt(a), [x2, y2] = pt(b);
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${b - a > 30 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

function makeClockMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: mode === 'ampm' ? 'picture-cards' : 'clocks',
    exerciseType: 'telling-time',
    themeAxis: { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng, locale = args.locale, L = loc2(locale);
      const key = !!(ctx && ctx.answerKey), scr = !!(ctx && ctx.screen);
      const content = (inner) => `<div data-ws-content data-lcs-clock-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'words') {
        // h:30 and (h + 1):30 on every page, then other times of the level; hours 1-10 (a 12 o'clock word is noon or
        // midnight, a choice this page does not make), every time and every worded time different
        const h0 = rng.int(1, d.maxH - 1);
        const times = [{ h: h0, m: 30 }, { h: h0 + 1, m: 30 }];
        for (let t = 0; t < 600 && times.length < d.pairs; t++) {
          const c = { h: rng.int(1, d.maxH), m: rng.pick(d.minutes) };
          if (times.some((x) => x.h === c.h && x.m === c.m)) continue;
          times.push(c);
        }
        if (times.length < d.pairs) throw new Error(`${id}: could not draw ${d.pairs} times`);
        // the extra worded time (d.extra): one hour off a clock on the page — the slip the page is for — never a page time
        const extras = [];
        for (let t = 0; t < 200 && extras.length < (d.extra || 0); t++) {
          const b = rng.pick(times), c = { h: b.h + rng.pick([-1, 1]), m: b.m };
          if (c.h < 1 || c.h > d.maxH || times.concat(extras).some((x) => x.h === c.h && x.m === c.m)) continue;
          extras.push(c);
        }
        const all = times.concat(extras);
        const words = all.map((t) => timeWords(t.h, t.m, L, { hourForm: 'word' }));
        if (new Set(words).size !== words.length) throw new Error(`${id}: two times share their words in ${L}`);
        const left = rng.shuffle(times.map((_, i) => i));
        let right = rng.shuffle(all.map((_, i) => i));
        for (let g = 0; g < 30 && right.some((v, i) => v === left[i]); g++) right = rng.shuffle(all.map((_, i) => i));
        const LET = 'ABCDEFGH';
        const letterOf = (ti) => LET[right.indexOf(ti)];
        const n = all.length;
        const size = n <= 4 ? 150 : n <= 5 ? 128 : 108;
        const rows = right.map((ri, k) => {
          const li = left[k], t = li == null ? null : times[li], r = all[ri];
          return `<div style="display:flex;align-items:center;justify-content:space-between;padding:0 18px">` +
            (t ? `<span style="display:inline-flex;align-items:center;gap:14px"${scr || key ? ` data-lcs-key-badge="${letterOf(li)}"` : ''} data-lcs-time="${fmt(t.h, t.m)}" data-lcs-label="${fmt(t.h, t.m)}">` +
            clock({ h: t.h, m: t.m, size }).svg + `<span style="width:14px;height:14px;border-radius:50%;background:${INK}"></span></span>` : `<span style="width:${size + 28}px"></span>`) +
            `<span style="display:inline-flex;align-items:center;gap:12px"${scr || key ? ` data-lcs-pair="${LET[k]}"` : ''} data-lcs-word-time="${fmt(r.h, r.m)}" data-lcs-label="${LET[k]}">` +
            `<span style="width:14px;height:14px;border-radius:50%;background:${INK}"></span>` +
            `<span style="display:inline-flex;align-items:center;width:300px;min-height:56px;padding:8px 16px;box-sizing:border-box;border:2.5px solid ${TEAL};border-radius:14px;background:#FFFFFF;font-family:'Nunito';font-weight:800;font-size:${n > 5 ? 21 : 23}px;line-height:1.2;color:${INK}" data-lcs-words>${words[ri]}</span>` +
            BIG(LET[k], 26, TEAL) + `</span></div>`;
        });
        return { bodyHtml: content(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly">${rows.join('')}</div>`), meta: { items: all.map((t) => fmt(t.h, t.m)) } };
      }

      if (mode === 'ampm') {
        // the six moments whose NAME fixes the half of the day (breakfast, school, lunch, dinner, pajamas, bedtime - a
        // toothbrush or a bus happens morning AND evening: two right answers), each once, in a shuffled order; the time in
        // its window at the level's step, never 12:xx (noon is neither a.m. nor p.m. for a 7-year-old, nor 12:30 vs 0:30)
        // exactly half before noon and half after ("always p.m." must not score): breakfast + school, dinner + pajamas +
        // bedtime, and lunch on the side that is short when its window has a time there; up to d.cards cards
        const slotsOf = (a, half) => { const [w0, w1] = windowOf(a, L); const out = []; for (let t = Math.ceil(w0 / d.step) * d.step; t <= w1; t += d.step) { const h = Math.floor(t / 60); if (h !== 12 && (half === 'am' ? h < 12 : h > 12)) out.push(t); } return out; };
        const one = ROUTINE.filter((a) => a.oneHalf);
        const amPool = one.filter((a) => a.part === 'am' && slotsOf(a, 'am').length), pmPool = one.filter((a) => a.part === 'pm' && slotsOf(a, 'pm').length);
        const lunch = one.find((a) => a.part === null);
        if (lunch && amPool.length < pmPool.length && slotsOf(lunch, 'am').length) amPool.push(lunch); else if (lunch && slotsOf(lunch, 'pm').length) pmPool.push(lunch);
        const k = Math.min(Math.floor(d.cards / 2), amPool.length, pmPool.length);
        if (k < 2) throw new Error(`${id}: ${L} has ${amPool.length} morning and ${pmPool.length} after-noon moments`);
        // tap-to-edit (lib/slot.js), one slot per card (role am0, am1 … / pm0 …): the card's time is drawn in the window of
        // the moment the page drew; a teacher may put there any moment of the same half of the day that happens at that
        // time (the pool) — the times, the options and the other cards never move with a swap
        const pickHalf = (pool, half) => rng.shuffle(pool).slice(0, k).map((orig, j) => ({ orig, pool, half, j }));
        const picked = rng.shuffle(pickHalf(amPool, 'am').concat(pickHalf(pmPool, 'pm')));
        const cards = [], items = [], onPage = new Set(), drawn = picked.map((p) => p.orig.id);
        picked.forEach(({ orig, pool, half, j }, i) => {
          const t = rng.pick(slotsOf(orig, half)), h24 = Math.floor(t / 60), m = t % 60, h12 = h24 % 12 || 12;
          const fits = pool.filter((x) => slotsOf(x, half).includes(t) && (x === orig || !drawn.includes(x.id)));   // not another card's
          const nm = slot.words(ctx, [labelOf(orig, L)], fits.map((x) => labelOf(x, L)), half + j)[0];
          const a = fits.find((x) => labelOf(x, L) === nm) || orig;
          if (onPage.has(a.id)) throw new Error(`${id}: "${nm}" is already on the page (the swap is refused)`);
          onPage.add(a.id);
          const isPm = h24 >= 12;
          let opts;
          if (L === 'en') opts = [{ s: 'a.m.', right: !isPm }, { s: 'p.m.', right: isPm }];
          else {
            // es-MX tells time in 12 hours (24-hour time is not Grade 2 there): the same time, a. m. or p. m.; elsewhere the
            // 12-hour reading against the 24-hour one, each written the locale's way
            const t12 = vt(L, h12, m);
            const a12 = L === 'es' ? `${t12} ${KIT.ap(L, false)}` : t12, a24 = L === 'es' ? `${t12} ${KIT.ap(L, true)}` : KIT.conv24(L, h24 >= 12 ? h24 : h24 + 12, m);
            const both = [{ s: a12, right: !isPm }, { s: a24, right: isPm }];
            opts = slotFor(`${L}|${args.difficulty}|${(ctx && ctx.variant) || 1}|${i}|ampm`, 2) ? both.reverse() : both;
          }
          items.push([labelOf(a, L), fmt(h24, m)]);   // the NAME as its own value: a swap changes only the name (own-input gate)
          const chip = (o) => `<span class="ws-chip" style="width:auto;min-width:96px;height:52px;padding:0 16px;font-size:26px;border-radius:26px" data-lcs-choice="${o.s}"${o.right ? ' data-lcs-correct="1"' : ''}>${o.s}</span>`;
          cards.push(`<div class="ws-card-stage" style="justify-content:space-between;align-items:center;gap:14px;padding:4px 18px 4px 40px" data-lcs-act="${a.id}" data-lcs-t24="${fmt(h24, m)}"${slot.attr(ctx, half + j, 0)}>` +
            `<span style="display:inline-flex;align-items:center;gap:14px;min-width:0"><img class="ws-icon" src="${fileUri(a.pic.theme, a.pic.noun)}" alt="" style="width:64px;height:64px;flex:0 0 auto">` +
            `<span style="display:inline-flex;flex-direction:column;gap:4px;min-width:0"><span style="font-family:'Nunito';font-weight:800;font-size:21px;line-height:1.15;color:${INK}" data-lcs-act-label>${labelOf(a, L)}</span>` +
            (L === 'en' ? BIG(fmt(h12, m), 30, TEAL) : '') + `</span></span>` +
            `<span class="ws-choices" style="display:inline-flex;gap:12px;flex:0 0 auto">${opts.map(chip).join('')}</span></div>`);
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: cards.length })), meta: { items } };   // the rows the page HAS (en draws 4 of 6: two empty rows left a third of the page blank, 2026-11-03)
      }

      if (mode === 'sector') {
        // the minute hand at a quarter, a half or three quarters past; the swept quarters are the answer (screen: tap the
        // quarters; key: the quarters shaded); each minute value on the page about equally often, hours all different
        const hours = rng.shuffle(Array.from({ length: 10 }, (_, k) => k + 1)).slice(0, d.cards);
        const ms = rng.shuffle(Array.from({ length: d.cards }, (_, k) => d.minutes[k % d.minutes.length]));
        const size = d.cards > 4 ? 170 : 200;
        const cards = hours.map((h, i) => {
          const m = ms[i], c = size / 2, r = c - 4;
          const swept = m / 15;
          const sectors = [0, 1, 2, 3].map((q) => {
            const on = q < swept;
            return `<path d="${sectorPath(c, c, r - 2, q * 15, (q + 1) * 15)}" fill="${key && on ? SOFT : 'none'}" stroke="none" class="ct-quarter" data-lcs-quarter="${q}"${key && on ? ' data-lcs-key-sample="1"' : ''}${scr ? ` data-lcs-pick="1"${on ? ' data-lcs-key-ring="1"' : ''}` : ''}/>`;
          }).join('');
          const lines = [0, 15, 30, 45].map((mm) => { const t = (mm / 60) * 2 * Math.PI - Math.PI / 2; return `<line x1="${c}" y1="${c}" x2="${(c + Math.cos(t) * (r - 2)).toFixed(2)}" y2="${(c + Math.sin(t) * (r - 2)).toFixed(2)}" stroke="${TEAL}" stroke-width="1.5" stroke-dasharray="5 5"/>`; }).join('');
          // the quarters sit UNDER the ticks, numerals and hands: inserted right after the face circle
          const svg = clock({ h, m, size }).svg.replace(/(<circle[^>]*\/>)/, `$1<g data-lcs-quarters>${sectors}${lines}</g>`);
          const w = d.words ? timeWords(h, m, L, { hourForm: 'word' }) : '';
          return `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-sector="${fmt(h, m)}">${svg}` +
            (w ? `<span style="font-family:'Nunito';font-weight:800;font-size:22px;line-height:1.2;color:${INK};text-align:center;max-width:300px" data-lcs-words>${w}</span>` : '') + `</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) })), meta: { items: hours.map((h, i) => fmt(h, ms[i])) } };
      }

      if (mode === 'timeline') {
        // a start and an end inside one half of the day (never across 12 o'clock), the span a multiple of the step, the
        // spans of a page all different; the line runs from the hour at or before the start to the hour at or after the end
        const cards = [], items = [], spans = new Set();
        const [uh, um] = UNITS[L] || UNITS.en;
        // level 3 deals the hours so no card's hours equal its own number: card k held k hours on a fifth of the cards
        // (settings-space card-index, 2026-11-02)
        let hoursDeal = null;
        if (d.spanHours) {
          do hoursDeal = rng.shuffle(Array.from({ length: d.spanHours }, (_, k) => k + 1)).slice(0, d.cards);
          while (hoursDeal.some((h, k) => h === k + 1));
        }
        for (let i = 0; i < d.cards; i++) {
          let s = null;
          for (let t = 0; t < 400 && !s; t++) {
            // level 3 starts at 5 o'clock or later: an early line printed the hours 1-4 that are its answers (settings-space echo)
            const start = rng.int(d.startHour || 1, 10) * 60 + rng.int(0, 59 / d.step | 0) * d.step;
            // level 3 deals the hours (three different ones of 1-4, one per card) and draws the minutes apart (5-55): spans
            // drawn as one number were 1 or 2 hours on most cards, and writing "2" in every box beat chance
            // (settings-space const-2, 2026-11-02)
            const span = hoursDeal ? hoursDeal[i] * 60 + rng.int(1, 59 / d.step | 0) * d.step : rng.int(1, Math.floor(d.maxSpan / d.step)) * d.step;
            const end = start + span;
            // a line of at most maxLine hours: its 5-minute ticks stay far enough apart to count
            if (d.maxLine && Math.ceil(end / 60) - Math.floor(start / 60) > d.maxLine) continue;
            // at least an hour (the hours box never 0) and never a whole hour from level 2 (the minutes box never 0). Level 2
            // counts in quarter hours (15 / 30 / 45), level 3 in 5 minutes on a line ticked every 5 minutes (2026-11-02: half
            // hours only made the minutes box 30 on every card — settings-space const-30 — and whole hours made it 0)
            if (end > 11 * 60 + 45 || spans.has(span) || span < 60 || (d.step < 30 && span % 60 === 0)) continue;
            s = { start, end, span };
          }
          if (!s) throw new Error(`${id}: could not draw ${d.cards} spans`);
          spans.add(s.span);
          const hS = Math.floor(s.start / 60), hE = Math.ceil(s.end / 60);
          const W = 560, x0 = 24, x1 = W - 24, px = (min) => x0 + ((min - hS * 60) / ((hE - hS) * 60)) * (x1 - x0);
          const tick = Math.min(d.step, 15);
          let svg = `<line x1="${x0}" y1="40" x2="${x1}" y2="40" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
          for (let t = hS * 60; t <= hE * 60; t += tick) {
            // hours tall, quarter hours middle, 5 minutes short (a ruler's three tick lengths)
            const full = t % 60 === 0, q = t % 15 === 0, half = full ? 12 : q ? 8 : 5;
            svg += `<line x1="${px(t).toFixed(1)}" y1="${40 - half}" x2="${px(t).toFixed(1)}" y2="${40 + half}" stroke="${INK}" stroke-width="${full ? 3 : q ? 1.8 : 1.2}"/>`;
            if (full) svg += `<text x="${px(t).toFixed(1)}" y="74" font-family="Baloo 2" font-weight="700" font-size="18" fill="${INK}" text-anchor="middle">${vt(L, Math.floor(t / 60), 0)}</text>`;
          }
          const mark = (t, col) => `<circle cx="${px(t).toFixed(1)}" cy="40" r="7" fill="${col}"/>`;
          svg += mark(s.start, TEAL) + mark(s.end, CORAL);
          if (key) svg += `<path d="M ${px(s.start).toFixed(1)} 34 Q ${((px(s.start) + px(s.end)) / 2).toFixed(1)} 2 ${px(s.end).toFixed(1)} 34" fill="none" stroke="${CORAL}" stroke-width="3" data-lcs-key-sample="1"/>`;
          const hAns = Math.floor(s.span / 60), mAns = s.span % 60;
          const sH = Math.floor(s.start / 60), sM = s.start % 60, eH = Math.floor(s.end / 60), eM = s.end % 60;
          items.push(`${fmt(sH, sM)}-${fmt(eH, eM)}`);
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:6px;padding:4px 12px 4px 40px" data-lcs-span="${s.span}" data-lcs-start="${fmt(sH, sM)}" data-lcs-end="${fmt(eH, eM)}">` +
            `<div style="display:flex;align-items:center;justify-content:space-between;width:100%">` +
            `<span style="display:inline-flex;align-items:center;gap:8px">${clock({ h: sH, m: sM, size: 84 }).svg}${BIG(vt(L, sH, sM), 26, TEAL)}</span>` +
            BIG('→', 26, CORAL) +
            `<span style="display:inline-flex;align-items:center;gap:8px">${BIG(vt(L, eH, eM), 26, CORAL)}${clock({ h: eH, m: eM, size: 84 }).svg}</span></div>` +
            `<svg width="${W}" height="82" viewBox="0 0 ${W} 82" data-lcs-prim="time-line" style="flex:0 0 auto">${svg}</svg>` +
            `<div style="display:flex;align-items:center;gap:10px">${answerBox({ w: 70, h: 50, answer: hAns })}${BIG(uh, 24)}${d.hoursOnly ? '' : answerBox({ w: 70, h: 50, answer: mAns }) + BIG(um, 24)}</div></div>`);
        }
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: cards.length })), meta: { items } };   // the rows the page HAS (en draws 4 of 6: two empty rows left a third of the page blank, 2026-11-03)
      }

      // cutout: a big face (no hands) and the two hands to cut out, with a dot where the fastener goes
      const size = 460, c = size / 2, r = c - 4;
      let face = clock({ h: 12, m: 0, size, hands: 'none', minuteRing: d.ring }).svg;
      if (d.quarters) {
        const tints = ['#FBE3D8', '#DDEBE8', '#FBE3D8', '#DDEBE8'];   // coralSoft / tealSoft (the palette)
        const q = [0, 1, 2, 3].map((k) => `<path d="${sectorPath(c, c, (d.ring ? r - size * 0.12 : r) - 2, k * 15, (k + 1) * 15)}" fill="${tints[k]}"/>`).join('');
        face = face.replace(/(<circle[^>]*\/>)/, `$1<g data-lcs-quarters>${q}</g>`);
      }
      const handSvg = (len, w, col, label) => `<svg width="${len + 40}" height="${w + 40}" viewBox="0 0 ${len + 40} ${w + 40}" data-lcs-hand="${label}">` +
        `<rect x="2" y="2" width="${len + 36}" height="${w + 36}" rx="${(w + 36) / 2}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="6 5"/>` +
        `<rect x="20" y="20" width="${len}" height="${w}" rx="${w / 2}" fill="${col}"/>` +
        `<circle cx="${20 + w / 2}" cy="${20 + w / 2}" r="4" fill="#FFFFFF"/></svg>`;
      const hands = `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:22px">${handSvg(Math.round(r * 0.6), 28, INK, 'hour')}${handSvg(Math.round(r * 0.85), 18, CORAL, 'minute')}</div>`;
      return {
        bodyHtml: content(`<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly" data-lcs-cutout="1">` +
          `<div style="border:2px dashed ${INK};border-radius:50%;padding:10px;line-height:0">${face}</div>${hands}</div>`),
        meta: { items: [`ring:${d.ring ? 1 : 0}`, `quarters:${d.quarters ? 1 : 0}`] },
      };
    },

    async verify(page) {
      return page.evaluate((mode) => {
        const fails = [];
        const ov = (el) => el.scrollWidth > el.clientWidth + 1;
        if (mode === 'words') {
          const clocks = [...document.querySelectorAll('[data-lcs-time]')], words = [...document.querySelectorAll('[data-lcs-word-time]')];
          if (clocks.length < 4 || words.length < clocks.length || words.length > clocks.length + 1) fails.push(`${clocks.length} clocks, ${words.length} worded times`);
          const wt = new Set(words.map((e) => e.dataset.lcsWordTime));
          if (wt.size !== words.length || clocks.some((e) => !wt.has(e.dataset.lcsTime))) fails.push('a clock has no worded time, or two worded times are the same');
          clocks.forEach((e, i) => { if (words[i] && words[i].dataset.lcsWordTime === e.dataset.lcsTime) fails.push(`row ${i + 1}: a straight line across`); });
          const halves = clocks.map((e) => e.dataset.lcsTime).filter((t) => t.endsWith(':30')).map((t) => +t.split(':')[0]);
          if (!halves.some((h) => halves.includes(h + 1))) fails.push('no h:30 beside (h + 1):30');
          document.querySelectorAll('[data-lcs-words]').forEach((w, i) => { if (!w.textContent.trim()) fails.push(`words ${i + 1} empty`); if (ov(w)) fails.push(`words ${i + 1} overflow`); });
          const badges = [...document.querySelectorAll('[data-lcs-key-badge]')];
          badges.forEach((b) => { const t = document.querySelector(`[data-lcs-pair="${b.dataset.lcsKeyBadge}"]`); if (!t || t.dataset.lcsWordTime !== b.dataset.lcsTime) fails.push(`the key joins ${b.dataset.lcsTime} to the wrong words`); });
        }
        if (mode === 'ampm') {
          const cards = [...document.querySelectorAll('[data-lcs-act]')];
          if (cards.length < 4) fails.push(`${cards.length} cards`);
          let pm = 0;
          cards.forEach((c, i) => {
            const h24 = +c.dataset.lcsT24.split(':')[0];
            if (h24 >= 12) pm++;
            const opts = [...c.querySelectorAll('[data-lcs-choice]')];
            if (opts.length !== 2) fails.push(`card ${i + 1}: ${opts.length} options`);
            const right = opts.filter((o) => o.hasAttribute('data-lcs-correct'));
            if (right.length && right.length !== 1) fails.push(`card ${i + 1}: ${right.length} right options`);
            const lab = c.querySelector('[data-lcs-act-label]');
            if (!lab || !lab.textContent.trim()) fails.push(`card ${i + 1}: no label`);
            if (lab && ov(lab)) fails.push(`card ${i + 1}: label overflow`);
          });
          if (pm * 2 !== cards.length) fails.push(`${pm} after noon of ${cards.length}`);
          cards.forEach((c, i) => { if (+c.dataset.lcsT24.split(':')[0] === 12) fails.push(`card ${i + 1}: a 12:xx time`); });
        }
        if (mode === 'sector') {
          document.querySelectorAll('[data-lcs-sector]').forEach((c, i) => {
            const m = +c.dataset.lcsSector.split(':')[1];
            if (![15, 30, 45].includes(m)) fails.push(`card ${i + 1}: minute ${m}`);
            const q = c.querySelectorAll('[data-lcs-quarter]');
            if (q.length !== 4) fails.push(`card ${i + 1}: ${q.length} quarters`);
            const rings = c.querySelectorAll('[data-lcs-key-ring]').length;
            if (rings && rings !== m / 15) fails.push(`card ${i + 1}: ${rings} quarters marked for :${m}`);
          });
        }
        if (mode === 'timeline') {
          document.querySelectorAll('[data-lcs-span]').forEach((c, i) => {
            const span = +c.dataset.lcsSpan;
            const [sh, sm] = c.dataset.lcsStart.split(':').map(Number), [eh, em] = c.dataset.lcsEnd.split(':').map(Number);
            if ((eh * 60 + em) - (sh * 60 + sm) !== span) fails.push(`card ${i + 1}: the span is not end − start`);
            if (eh > 11 || (eh === 11 && em > 45)) fails.push(`card ${i + 1}: the span runs past 12 o'clock`);
            const boxes = [...c.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
            const made = boxes.length === 1 ? boxes[0] * 60 : boxes[0] * 60 + boxes[1];
            if (!(boxes.length === 1 || boxes.length === 2) || made !== span || (boxes.length === 2 && (boxes[1] >= 60 || boxes[1] === 0)) || boxes[0] < 1) fails.push(`card ${i + 1}: the boxes do not make ${span} minutes`);
          });
        }
        if (mode === 'cutout') {
          if (document.querySelectorAll('[data-lcs-hand]').length !== 2) fails.push('two hands to cut out');
          if (!document.querySelector('[data-lcs-cutout] [data-lcs-prim="clock"]')) fails.push('no clock face');
        }
        return fails;
      }, mode);
    },
  };
}

module.exports = { makeClockMoreType, LEVELS, UNITS, sectorPath };
