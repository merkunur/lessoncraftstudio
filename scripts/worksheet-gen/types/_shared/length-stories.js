/**
 * length-stories.js — Length Story Problems (G2-518; Year pages AB, 2026-11-14; 2.MD.B.5: add and subtract within 100
 * to solve word problems involving lengths given in the same units, using drawings such as a bar or a ruler).
 * For the English Grade 2 lesson "Length story problems" of the year design (TYPE-WORK-LIST.math.md: no story told a
 * LENGTH; the story bank counts things).
 *
 * Three stories a page, each about one long thing (a ribbon, a roll of tape, a scarf, a garden hose, a fence),
 * every number in one unit: inches or feet in English, centimeters or meters in the other languages. Under each story,
 * as on the story pages with a bar model (story-model.js): an empty BAR (the whole over two parts; the child writes the
 * two lengths the story tells and a question mark for the one it asks), an EQUATION frame (number, sign, number,
 * equals, number) and the ANSWER box with the unit beside it.
 *   level 1  join, cut off, compare (how much longer) — lengths in whole tens; the first story is WORKED in ink
 *   level 2  join, cut off, compare — two-digit lengths within 100
 *   level 3  so much longer, so much shorter, how much was cut off (the unknown moves) — two-digit lengths
 * A thing has the lengths a real one has (a garden hose is 11 to 50 m or 25 to 99 feet, a scarf 70 to 99 cm or 40 to 80 inches), every told length is a
 * two-digit number (level 1: a whole ten), no answer is a number the story prints, and the three answers differ.
 * Frames: data/word-problems/length-frames.json (11 languages; each frame names its thing, so nothing has to agree).
 * Themeless: a copy is a new draw. PDF only.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { fileUri } = require('../../image-cache/resolve.js');
const W = require('../../lib/word-problems-levelset.js');
const LF = require('../../data/word-problems/length-frames.json');

const MINUS = '−';
/** the picture of each thing */
// (each picture read on a contact sheet 2026-11-14: the accessories ribbon is a bow, the Christmas one a strip with a bow;
// the library's 'rope' is a tool, so no story tells a rope)
const PIC = { ribbon: ['christmas', 'ribbon'], tape: ['classroom', 'tape'], scarf: ['accessories', 'scarf'], hose: ['around the house', 'hose'], fence: ['around the house', 'fence'] };
/** the length a real thing has, metric (cm or m) and US (inches or feet) */
const RANGE = {
  ribbon: { m: [11, 99], i: [11, 99] }, tape: { m: [11, 99], i: [11, 99] }, scarf: { m: [70, 99], i: [40, 80] },
  hose: { m: [11, 50], i: [25, 99] }, fence: { m: [11, 99], i: [11, 99] },
};
const LEVELS = {
  1: { kinds: ['add', 'sub', 'cmpDiff'], tens: true, worked: true },
  2: { kinds: ['add', 'sub', 'cmpDiff'] },
  3: { kinds: ['cmpMore', 'cmpLess', 'subChange'] },
};
/** what a kind of story knows and asks: whole over two parts, the equation; '?' for the unknown */
function model(p) {
  const q = '?';
  if (p.kind === 'add' || p.kind === 'cmpMore') return { whole: q, parts: [p.n1, p.n2], eq: [p.n1, '+', p.n2, q] };
  if (p.kind === 'sub' || p.kind === 'cmpDiff') return { whole: p.n1, parts: [p.n2, q], eq: [p.n1, MINUS, p.n2, q] };
  if (p.kind === 'cmpLess') return { whole: p.n1, parts: [q, p.n2], eq: [p.n1, MINUS, p.n2, q] };
  if (p.kind === 'subChange') return { whole: p.n1, parts: [q, p.n3], eq: [p.n1, MINUS, q, p.n3] };
  throw new Error('length-stories: unknown kind ' + p.kind);
}
function answerOf(p) {
  if (p.kind === 'add' || p.kind === 'cmpMore') return p.n1 + p.n2;
  if (p.kind === 'subChange') return p.n1 - p.n3;
  return p.n1 - p.n2;
}
/** the lengths of a story that are a whole THING (and must lie in its range), by kind */
function thingLengths(p, a) {
  if (p.kind === 'add') return [a];
  if (p.kind === 'sub') return [p.n1];
  if (p.kind === 'cmpDiff') return [p.n1, p.n2];
  if (p.kind === 'cmpMore' || p.kind === 'cmpLess') return [p.n1, a];
  return [p.n1, p.n3];   // subChange: the ribbon before and after
}

function makeLengthStoriesType({ id, slug, gradeBand, i18n }) {
  return {
    id, slug, gradeBand,
    assetClass: 'icon-placement',
    exerciseType: 'word-problems',
    themeAxis: { applicable: false },
    interactive: false,
    difficulty: LEVELS,
    i18n,
    // one word for the whole page: its stories and numbers (two copies that share some numbers are different pages)
    levelSetWords(m) { return [((m && m.problems) || []).map((p) => p.kind + p.thing + p.n1 + '.' + (p.n2 == null ? p.n3 : p.n2)).join(' ')]; },

    build({ difficulty, locale }, ctx) {
      const lv = Number(difficulty) || 2, d = LEVELS[lv] || LEVELS[2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
      const L = (locale || 'en').slice(0, 2), F = LF[L];
      if (!F) throw new Error(`${id}: no length frames for ${L}`);
      const sys = L === 'en' ? 'i' : 'm';
      const names = W.namesFor(L, false);
      let problems = null;
      for (let attempt = 0; attempt < 80 && !problems; attempt++) {
        const kinds = rng.shuffle(d.kinds), used = { things: new Set(), answers: new Set(), told: new Set(), names: new Set() };
        const list = [];
        for (const kind of kinds) {
          const frames = F.frames.filter((f) => f.kind === kind && !used.things.has(f.thing));
          if (!frames.length) break;
          const f = rng.pick(frames), [lo, hi] = RANGE[f.thing][sys];
          let p = null;
          for (let t = 0; t < 600 && !p; t++) {
            const v = (a, b) => (d.tens ? 10 * rng.int(Math.ceil(a / 10), Math.floor(b / 10)) : rng.int(a, b));
            const min = d.tens ? 10 : 11;
            const q = { kind };
            if (kind === 'add' || kind === 'cmpMore') { q.n1 = v(min, hi - min); q.n2 = v(min, hi - q.n1); }
            else if (kind === 'subChange') { q.n1 = v(lo + min, hi); q.n3 = v(lo, q.n1 - min); }
            else { q.n1 = v(Math.max(lo, 2 * min), hi); q.n2 = v(kind === 'cmpDiff' ? lo : min, q.n1 - min); }
            const a = answerOf(q), told = [q.n1, q.n2, q.n3].filter((x) => x != null);
            if (!Number.isInteger(a) || a < (d.tens ? 10 : 5) || a > 99 || told.some((x) => x < min || x > 99)) continue;
            if (d.tens && [...told, a].some((x) => x % 10)) continue;
            if (thingLengths(q, a).some((x) => x < lo || x > hi)) continue;
            if (told.includes(a) || new Set(told).size < told.length || used.answers.has(a) || told.some((x) => used.told.has(x))) continue;
            p = { ...q, answer: a, told };
          }
          if (!p) break;
          const freeNames = names.filter((n) => !used.names.has(n));
          const name = rng.pick(freeNames);
          let sentence = W.fill(f.s, { name, name2: rng.pick(freeNames.filter((n) => n !== name)), n1: p.n1, n2: p.n2, n3: p.n3, noun: '', gender: null }, L);
          if (f.s.includes('{name}')) used.names.add(name);
          used.things.add(f.thing); used.answers.add(p.answer); p.told.forEach((x) => used.told.add(x));
          list.push({ ...p, thing: f.thing, size: f.size, unit: F.unit[f.size], sentence });
        }
        if (list.length === d.kinds.length) problems = list;
      }
      if (!problems) throw new Error(`${id}: no page of ${d.kinds.length} length stories in ${L} at level ${lv}`);

      const cell = 44;
      const num = (v, attr) => `<span ${attr || ''} style="font-family:'Baloo 2';font-weight:700;font-size:22px;line-height:1;color:${T.coral}">${v}</span>`;
      const inked = (v) => `<span data-lcs-worked style="font-family:'Baloo 2';font-weight:700;font-size:22px;line-height:1;color:${T.ink}">${v}</span>`;
      const box = (attr, inner) => `<span ${attr} style="width:${cell + 8}px;height:${cell}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.ink};border-radius:8px">${inner || ''}</span>`;
      const cards = problems.map((p, pi) => {
        const worked = !!d.worked && pi === 0;
        const m = model(p), show = (v, bar) => (worked ? inked(v === '?' && !bar ? p.answer : v) : key ? num(v === '?' && !bar ? p.answer : v) : '');
        const barCell = (attr, v, extra) => `<span ${attr} style="flex:1 1 0;height:${cell - 4}px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.teal};${extra || ''}">${show(v, true)}</span>`;
        const bar = `<span data-lcs-bar style="flex:0 0 auto;width:220px;display:flex;flex-direction:column">` +
          `<span style="display:flex">${barCell(`data-lcs-whole="${m.whole}"`, m.whole, 'border-radius:8px 8px 0 0;border-bottom-width:1px')}</span>` +
          `<span style="display:flex">${barCell(`data-lcs-part="${m.parts[0]}"`, m.parts[0], 'border-radius:0 0 0 8px;border-top-width:1px;border-right-width:1px')}${barCell(`data-lcs-part="${m.parts[1]}"`, m.parts[1], 'border-radius:0 0 8px 0;border-top-width:1px;border-left-width:1px')}</span></span>`;
        const sign = `<span data-lcs-sign="${m.eq[1]}" style="width:${cell - 8}px;height:${cell - 8}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.ink};border-radius:50%">${worked ? inked(m.eq[1]) : key ? num(m.eq[1]) : ''}</span>`;
        const equals = `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;line-height:1;color:${T.ink}">=</span>`;
        const eq = `<span data-lcs-eq="${m.eq.join(' ')}" style="flex:0 0 auto;display:flex;align-items:center;gap:7px">${box('data-lcs-eqbox', show(m.eq[0]))}${sign}${box('data-lcs-eqbox', show(m.eq[2]))}${equals}${box('data-lcs-eqbox', show(m.eq[3]))}</span>`;
        const answer = `<span style="flex:0 0 auto;display:flex;align-items:center;gap:6px"><span data-lcs-answer="${p.answer}" style="width:${cell + 14}px;height:${cell}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2.5px dashed ${T.grid};border-radius:8px">${worked ? inked(p.answer) : key ? num(p.answer, 'data-lcs-keytext') : ''}</span>` +
          `<span data-lcs-unit="${p.unit}" style="font-family:'Nunito';font-weight:800;font-size:20px;color:${T.ink}">${p.unit}</span></span>`;
        const [th, noun] = PIC[p.thing];
        return `<div class="ws-card-stage"${worked ? ' data-lcs-example="1"' : ''} data-lcs-story="${p.kind}|${p.n1}|${p.n2 == null ? '' : p.n2}|${p.n3 == null ? '' : p.n3}|${p.answer}|${p.thing}|${p.size}" style="flex:1 0 auto;flex-direction:column;align-items:stretch;justify-content:center;gap:12px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:12px 20px">` +
          `<div style="display:flex;align-items:center;gap:14px"><span data-lcs-thing style="flex:0 0 auto;display:inline-flex"><img class="ws-icon" src="${fileUri(th, noun)}" alt="" style="width:46px;height:46px"></span>` +
          `<p style="font-family:'Nunito';font-weight:800;font-size:18px;line-height:1.4;color:${T.ink};margin:0" data-lcs-sentence>${p.sentence}</p></div>` +
          `<div style="display:flex;align-items:center;justify-content:space-between;gap:14px">${bar}${eq}${answer}</div></div>`;
      });
      const bodyHtml = `<div data-ws-content data-lcs-length-page="${lv}|${L}" style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:stretch">${cards.join('')}</div>`;
      return { bodyHtml, meta: { problems: problems.map(({ kind, n1, n2, n3, answer, thing }) => ({ kind, n1, n2, n3, answer, thing })) } };
    },

    async verify(page) {
      return page.evaluate((UNIT) => {
        // the lengths real things have, kept HERE apart from the generator's RANGE: a check that read the generator's own
        // table would agree with any wrong number in it (poison 2026-11-14)
        const RANGE = { ribbon: { m: [11, 99], i: [11, 99] }, tape: { m: [11, 99], i: [11, 99] }, scarf: { m: [70, 99], i: [40, 80] }, hose: { m: [11, 50], i: [25, 99] }, fence: { m: [11, 99], i: [11, 99] } };
        const fails = [];
        const root = document.querySelector('[data-lcs-length-page]'); if (!root) return ['no content'];
        const [lvS, L] = root.dataset.lcsLengthPage.split('|'), lv = +lvS, sys = L === 'en' ? 'i' : 'm';
        const KINDS = { 1: 'add,cmpDiff,sub', 2: 'add,cmpDiff,sub', 3: 'cmpLess,cmpMore,subChange' };
        const cards = [...document.querySelectorAll('[data-lcs-story]')];
        if (cards.length !== 3) fails.push(cards.length + ' stories');
        const has = (t, n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(t);
        const answers = new Set(), toldAll = [], kinds = [], things = new Set();
        cards.forEach((c, i) => {
          const P = 'story ' + (i + 1);
          const f = c.dataset.lcsStory.split('|');
          const kind = f[0], a = +f[1], b = f[2] === '' ? null : +f[2], n3 = f[3] === '' ? null : +f[3], ans = +f[4], thing = f[5], size = f[6];
          kinds.push(kind); things.add(thing);
          const want = kind === 'add' || kind === 'cmpMore' ? a + b : kind === 'subChange' ? a - n3 : a - b;
          if (want !== ans) fails.push(`${P}: the key says ${ans}, the story gives ${want}`);
          const told = [a, b, n3].filter((v) => v != null);
          const min = lv === 1 ? 10 : 11;
          for (const v of told) if (v < min || v > 99) fails.push(`${P}: the told length ${v} is not a two-digit number`);
          if (ans < (lv === 1 ? 10 : 5) || ans > 99) fails.push(`${P}: the answer ${ans} is outside the page`);
          if (lv === 1 && [...told, ans].some((v) => v % 10)) fails.push(`${P}: not whole tens`);
          const [lo, hi] = RANGE[thing][sys];
          const objs = kind === 'add' ? [ans] : kind === 'sub' ? [a] : kind === 'cmpDiff' ? [a, b] : kind === 'subChange' ? [a, n3] : [a, ans];
          if (objs.some((v) => v < lo || v > hi)) fails.push(`${P}: a ${thing} of ${objs.join(' and ')} is not a length a ${thing} has`);
          if (told.includes(ans)) fails.push(`${P}: the answer is a number the story tells`);
          if (answers.has(ans)) fails.push(`${P}: an answer twice on the page`); answers.add(ans);
          if (told.some((v) => toldAll.includes(v))) fails.push(`${P}: a number of another story`); toldAll.push(...told);
          const story = (c.querySelector('[data-lcs-sentence]') || {}).textContent || '';
          for (const v of told) if (!has(story, v)) fails.push(`${P}: ${v} is not in the story`);
          if (has(story, ans)) fails.push(`${P}: the answer stands in the story`);
          if (/[{}]/.test(story)) fails.push(`${P}: unfilled slot`);
          if (!/[?]\s*$/.test(story.trim())) fails.push(`${P}: the story does not end with its question`);
          const unit = (c.querySelector('[data-lcs-unit]') || {}).textContent;
          if (unit !== UNIT[L][size]) fails.push(`${P}: the answer's unit is ${unit}, not ${UNIT[L][size]}`);
          const val = (v) => (v === '?' ? ans : +v);
          const whole = val(c.querySelector('[data-lcs-whole]').dataset.lcsWhole), parts = [...c.querySelectorAll('[data-lcs-part]')].map((e) => val(e.dataset.lcsPart));
          if (parts.length !== 2 || parts[0] + parts[1] !== whole) fails.push(`${P}: the bar says ${parts.join(' + ')} = ${whole}`);
          const marks = [c.querySelector('[data-lcs-whole]').dataset.lcsWhole, ...[...c.querySelectorAll('[data-lcs-part]')].map((e) => e.dataset.lcsPart)].filter((v) => v === '?').length;
          if (marks !== 1) fails.push(`${P}: ${marks} unknowns in the bar`);
          const e = c.querySelector('[data-lcs-eq]').dataset.lcsEq.split(' '), x = val(e[0]), y = val(e[2]), z = val(e[3]);
          if ((e[1] === '+' ? x + y : x - y) !== z) fails.push(`${P}: the equation ${e.join(' ')} is not true`);
          if (c.querySelectorAll('[data-lcs-eqbox]').length !== 3 || !c.querySelector('[data-lcs-sign]')) fails.push(`${P}: the equation frame`);
          if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== ans) fails.push(`${P}: the answer box`);
          const img = c.querySelector('[data-lcs-thing] img');
          if (!img || !img.complete || !img.naturalWidth) fails.push(`${P}: the picture of the ${thing} did not load`);
          if (c.dataset.lcsExample) { if (i !== 0 || lv !== 1) fails.push(`${P}: only the first story of the easier page is worked`); if (c.querySelectorAll('[data-lcs-worked]').length !== 8) fails.push(`${P}: the worked story shows ${c.querySelectorAll('[data-lcs-worked]').length} of its 8 entries`); }
          const cr = c.getBoundingClientRect();
          c.querySelectorAll('*').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(`${P}: something runs out of it`); });
          const row = [c.querySelector('[data-lcs-bar]'), c.querySelector('[data-lcs-eq]'), c.querySelector('[data-lcs-answer]')].map((el) => el.getBoundingClientRect());
          if (row[1].top > row[0].bottom || row[2].top > row[0].bottom) fails.push(`${P}: the working line wraps`);
        });
        if (kinds.slice().sort().join() !== KINDS[lv]) fails.push('the kinds of story ' + kinds.join(',') + ' are not the level\'s');
        if (things.size !== cards.length) fails.push('one thing in two stories');
        if (lv === 1 && !cards[0].dataset.lcsExample) fails.push('the easier page has no worked story');
        return [...new Set(fails)];
      }, Object.fromEntries(Object.entries(LF).filter(([k]) => k !== '$comment').map(([k, v]) => [k, v.unit])));
    },
  };
}

module.exports = { makeLengthStoriesType, model, answerOf, RANGE, LEVELS, PIC };
