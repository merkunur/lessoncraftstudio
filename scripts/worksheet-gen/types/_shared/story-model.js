/**
 * Story problems with a BAR MODEL and an EQUATION (Year pages Q, 2026-11-13).
 *   G1-567  Find the Missing Part              put-together stories, one part unknown        1.OA.A.1
 *   G1-568  What Happened in the Middle?       change stories, the change unknown            1.OA.A.1
 *   G2-509  Story Problems Within 100: Bar Model   end, change or part unknown, two-digit numbers   2.OA.A.1
 *
 * Three stories a page. Under each story stand
 *   - an empty BAR MODEL: one long bar (the whole) over two parts. The child writes the two numbers the story tells and
 *     a question mark for the number it asks;
 *   - an empty EQUATION frame: number, sign, number, equals, number. The child writes an equation with the unknown;
 *   - the ANSWER box with the picture of the thing (a picture, not a word: in eleven languages the word would have
 *     to agree with the number).
 * The key fills all three (the equation in the order the story tells it; "13 − 8 = 5" is as right as "8 + 5 = 13",
 * and the teacher note says so).
 *
 * The stories are the native frames of the story-problem engine (lib/word-problems-levelset.js) and, for the
 * put-together stories with a part unknown, data/word-problems/part-frames.json. Stories with two-digit numbers are told
 * in a PLACE only and keep the rules of fit of G2-506 (53 forks lie in a box, never in a child's hands; berries are not
 * told on a shelf). No two stories of a page share an answer or a pair of numbers, no answer is a number the story
 * prints, every answer is 2 or more, and a child is named in at most one story.
 * At level 1 the first story is WORKED (bar, equation and answer printed in ink), so that the page itself shows what goes
 * where. With two-digit numbers a take-away story is told with somebody who takes (nothing falls by itself).
 * One picture of the thing stands beside the story and one beside the answer: nothing is counted in a picture. Printed page only.
 */
'use strict';
const W = require('../../lib/word-problems-levelset.js');
const T = require('../../primitives/_tokens.js').color;
const { storyFit } = require('../g2/G2-506-story-problems-three-lines.js');
const PART = require('../../data/word-problems/part-frames.json');

const MINUS = '−';
/** what a kind of story knows and asks: { whole, parts: [left, right], eq: [a, sign, b, c] } with '?' for the unknown */
function model(p) {
  const q = '?';
  if (p.kind === 'part') return { whole: p.n3, parts: [p.n1, q], eq: [p.n1, '+', q, p.n3] };
  if (p.kind === 'addChange') return { whole: p.n3, parts: [p.n1, q], eq: [p.n1, '+', q, p.n3] };
  if (p.kind === 'subChange') return { whole: p.n1, parts: [q, p.n3], eq: [p.n1, MINUS, q, p.n3] };
  if (p.kind === 'add') return { whole: q, parts: [p.n1, p.n2], eq: [p.n1, '+', p.n2, q] };
  if (p.kind === 'sub') return { whole: p.n1, parts: [p.n2, q], eq: [p.n1, MINUS, p.n2, q] };
  throw new Error('story-model: unknown kind ' + p.kind);
}
function answerOf(p) {
  if (p.kind === 'part' || p.kind === 'addChange') return p.n3 - p.n1;
  if (p.kind === 'subChange') return p.n1 - p.n3;
  return p.kind === 'add' ? p.n1 + p.n2 : p.n1 - p.n2;
}
/** numbers for a story of a kind within `max` (10, 20 or 100): { n1, n2, n3 }. `tens`: whole tens only (10 to 90) */
function draw(kind, max, rng, tens) {
  if (tens) {
    const t = (lo, hi) => 10 * rng.int(lo, hi);
    if (kind === 'part' || kind === 'addChange') { const n3 = t(3, 9); return { n1: t(1, n3 / 10 - 1), n2: null, n3 }; }
    if (kind === 'subChange') { const n1 = t(3, 9); return { n1, n2: null, n3: t(1, n1 / 10 - 1) }; }
    if (kind === 'add') { const n1 = t(1, 8); return { n1, n2: t(1, 9 - n1 / 10), n3: null }; }
    const n1 = t(3, 9); return { n1, n2: t(1, n1 / 10 - 1), n3: null };
  }
  // within 20 the WHOLE is 11 to 20 (a page within 20 whose stories all stay under 10 is the easier page again)
  const big = max > 20, lo = big ? 11 : 2, low = max === 20 ? 11 : 5;
  if (kind === 'part' || kind === 'addChange') {
    const n3 = big ? rng.int(31, 99) : rng.int(low, max);
    const n1 = rng.int(lo, n3 - lo);
    return { n1, n2: null, n3 };
  }
  if (kind === 'subChange') { const n1 = big ? rng.int(31, 99) : rng.int(low, max); const c = rng.int(lo, n1 - lo); return { n1, n2: null, n3: n1 - c }; }
  if (kind === 'add') { const n1 = big ? rng.int(12, 78) : rng.int(2, max - 2); const n2 = rng.int(big ? lo : Math.max(lo, low - n1), (big ? 99 : max) - n1); return { n1, n2, n3: null }; }
  const n1 = big ? rng.int(31, 99) : rng.int(low, max); return { n1, n2: rng.int(lo, n1 - lo), n3: null };
}

/**
 * @param {object} o  { id, slug, gradeBand, levels: { 1: { max, kinds }, 2: …, 3: … }, i18n }
 */
function makeStoryModelType(o) {
  return {
    id: o.id,
    slug: o.slug,
    gradeBand: o.gradeBand,
    assetClass: 'icon-placement',
    exerciseType: 'word-problems',
    themeAxis: { applicable: true, minNouns: 3 },
    difficulty: o.levels,
    i18n: o.i18n,
    levelSetWords(m) { return ((m && m.problems) || []).map((p) => p.vocabKey + ':' + p.frame); },

    build({ theme, difficulty, locale }, ctx) {
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
      const loc = (locale || 'en').slice(0, 2);
      const big = d.max > 20;
      const fit = Number(ctx.wpFit) || 0;   // a page that ran past the footer is rebuilt one step tighter (cli qaRetries)
      // the things: with two-digit numbers only things that come by the dozen
      const pool = W.nounsFor(theme, loc).filter((n) => !big || W.maxFor(n.noun, 100) === 100);
      if (pool.length < d.kinds.length) throw new Error(`${o.id}: theme ${theme}/${loc} has ${pool.length} things to count < ${d.kinds.length}`);
      const names = W.namesFor(loc, false);
      const framesOf = (kind, noun) => {
        const list = kind === 'part'
          ? [...PART[loc].place, ...(big ? [] : PART[loc].people)]
          : [...W.framesFor(loc, kind).map((f) => W.newFrame(f, loc)), ...((big && storyFit.BIG[loc] && storyFit.BIG[loc][kind]) || [])].filter((f) => !big || storyFit.inPlace(f))
            // with two-digit numbers nothing falls by itself: 45 figs do not fall off a shelf (native reader 2026-11-13);
            // a take-away story is told with somebody who takes
            .filter((f) => !big || (kind !== 'sub' && kind !== 'subChange') || f.includes('{name}'));
        // (a strawberry is a berry here: 14 loose strawberries do not sit on a shelf either)
        return list.filter((f) => storyFit.fitsHere(f, noun === 'strawberry' ? 'raspberry' : noun, loc));
      };
      let problems = null;
      for (let attempt = 0; attempt < 60 && !problems; attempt++) {
        const kinds = rng.shuffle(d.kinds), nouns = rng.sample(pool, kinds.length);
        if (new Set(nouns.map((n) => n.text)).size < nouns.length) continue;   // two things with one word (fr "ballons")
        const usedFrames = new Set(), usedNames = [], drawn = [];
        let ok = true;
        const list = kinds.map((kind, i) => {
          let nums = null;
          for (let t = 0; t < 400 && !nums; t++) {
            const n = draw(kind, d.max, rng, d.tens), p = { kind, ...n }, a = answerOf(p), told = [n.n1, n.n2, n.n3].filter((v) => v != null);
            if (a < 2 || told.includes(a) || new Set(told).size < told.length) continue;
            if (drawn.some((q) => q.answer === a || q.told.slice().sort().join() === told.slice().sort().join() || q.told.some((v) => told.includes(v)))) continue;
            nums = { ...n, answer: a, told };
          }
          if (!nums) { ok = false; return null; }
          drawn.push(nums);
          const frames = framesOf(kind, nouns[i].noun);
          if (!frames.length) { ok = false; return null; }
          const free = frames.filter((f) => !usedFrames.has(f));
          if (!free.length) { ok = false; return null; }                 // never two stories told in the same words
          const tpl = rng.pick(free); usedFrames.add(tpl);
          const freeNames = names.filter((n) => !usedNames.some((u) => u === n || u.slice(0, 4) === n.slice(0, 4)));
          const name = rng.pick(freeNames), name2 = rng.pick(freeNames.filter((n) => n !== name && n.slice(0, 4) !== name.slice(0, 4)));
          if (tpl.includes('{name}')) usedNames.push(name);
          if (tpl.includes('{name2}')) usedNames.push(name2);
          let sentence = W.fill(tpl, { name, name2, n1: nums.n1, n2: nums.n2, n3: nums.n3, noun: nouns[i].text, gender: nouns[i].gender }, loc);
          // es: "y" becomes "e" before a name in I- or Hi- ("Sofía e Iker"), never before "hie"
          if (loc === 'es') sentence = sentence.replace(/(^|\s)y (?=(?:I|Hi)(?!e))/g, '$1e ');
          return { kind, n1: nums.n1, n2: nums.n2, n3: nums.n3, answer: nums.answer, noun: nouns[i].noun, text: nouns[i].text, vocabKey: nouns[i].vocabKey, frame: kind + ':' + tpl.length + ':' + tpl.slice(0, 12), sentence };
        });
        if (ok) problems = list;
      }
      if (!problems) throw new Error(`${o.id}: no page of ${d.kinds.length} different stories for ${theme}/${loc} at level ${difficulty}`);

      const font = 18 - fit, cell = Math.max(36, 44 - 2 * fit);
      const num = (v, attr) => `<span ${attr || ''} style="font-family:'Baloo 2';font-weight:700;font-size:22px;line-height:1;color:${T.coral}">${v}</span>`;
      const box = (attr, inner, w) => `<span ${attr} style="width:${w || cell + 8}px;height:${cell}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.ink};border-radius:8px">${inner || ''}</span>`;
      const inked = (v) => `<span data-lcs-worked style="font-family:'Baloo 2';font-weight:700;font-size:22px;line-height:1;color:${T.ink}">${v}</span>`;
      const cards = problems.map((p, pi) => {
        // the first story of a level-1 page is WORKED (bar, equation, answer in ink): the page itself shows that the long
        // bar is the whole and where the question mark goes (native reader 2026-11-13)
        const worked = !!d.worked && pi === 0;
        const m = model(p), show = (v, bar) => (worked ? inked(v === '?' && !bar ? p.answer : v) : key ? num(v === '?' ? p.answer : v) : '');
        const barCell = (attr, v, extra) => `<span ${attr} style="flex:1 1 0;min-height:${cell - 4}px;height:${cell - 4}px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.teal};${extra || ''}">${show(v, true)}</span>`;
        const bar = `<span data-lcs-bar style="flex:0 0 auto;width:220px;display:flex;flex-direction:column">` +
          `<span style="display:flex">${barCell(`data-lcs-whole="${m.whole}"`, m.whole, 'border-radius:8px 8px 0 0;border-bottom-width:1px')}</span>` +
          `<span style="display:flex">${barCell(`data-lcs-part="${m.parts[0]}"`, m.parts[0], 'border-radius:0 0 0 8px;border-top-width:1px;border-right-width:1px')}${barCell(`data-lcs-part="${m.parts[1]}"`, m.parts[1], 'border-radius:0 0 8px 0;border-top-width:1px;border-left-width:1px')}</span></span>`;
        const sign = `<span data-lcs-sign="${m.eq[1]}" style="width:${cell - 8}px;height:${cell - 8}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.ink};border-radius:50%">${worked ? inked(m.eq[1]) : key ? num(m.eq[1]) : ''}</span>`;
        const equals = `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;line-height:1;color:${T.ink}">=</span>`;
        const eq = `<span data-lcs-eq="${m.eq.join(' ')}" style="flex:0 0 auto;display:flex;align-items:center;gap:7px">${box('data-lcs-eqbox', show(m.eq[0]))}${sign}${box('data-lcs-eqbox', show(m.eq[2]))}${equals}${box('data-lcs-eqbox', show(m.eq[3]))}</span>`;
        const answer = `<span style="flex:0 0 auto;display:flex;align-items:center;gap:8px;min-width:0"><span data-lcs-answer="${p.answer}" style="width:${cell + 14}px;height:${cell}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2.5px dashed ${T.grid};border-radius:8px">${worked ? inked(p.answer) : key ? num(p.answer, 'data-lcs-keytext') : ''}</span>` +
          `<span data-lcs-label style="flex:0 0 auto;display:inline-flex">${W.iconImg(theme, p.noun, 32)}</span></span>`;
        return `<div class="ws-card-stage"${worked ? ' data-lcs-example="1"' : ''} data-lcs-story="${p.kind}|${p.n1}|${p.n2 == null ? '' : p.n2}|${p.n3 == null ? '' : p.n3}|${p.answer}" style="flex:1 0 auto;flex-direction:column;align-items:stretch;justify-content:center;gap:${12 - fit}px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:12px 20px">` +
          `<div style="display:flex;align-items:center;gap:14px"><span data-lcs-thing style="flex:0 0 auto;display:inline-flex">${W.iconImg(theme, p.noun, 46)}</span>` +
          `<p style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.4;color:${T.ink};margin:0" data-lcs-sentence>${p.sentence}</p></div>` +
          `<div style="display:flex;align-items:center;justify-content:space-between;gap:14px">${bar}${eq}${answer}</div></div>`;
      });
      const bodyHtml = `<div data-ws-content data-lcs-model-page="${d.max}" data-lcs-tens="${d.tens ? 1 : 0}" style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:stretch">${cards.join('')}</div>`;
      return { bodyHtml, meta: { problems: problems.map(({ kind, n1, n2, n3, answer, vocabKey, frame }) => ({ kind, n1, n2, n3, answer, vocabKey, frame })) } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-model-page]'); if (!root) return ['no content'];
        const max = +root.dataset.lcsModelPage;
        const cards = [...document.querySelectorAll('[data-lcs-story]')];
        if (cards.length !== 3) fails.push(cards.length + ' stories');
        const has = (t, n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(t);
        const answers = new Set(), toldAll = [];
        cards.forEach((c, i) => {
          const P = 'story ' + (i + 1);
          const [kind, a, b, n3, ans] = c.dataset.lcsStory.split('|').map((v, k) => (k ? (v === '' ? null : +v) : v));
          const want = kind === 'part' || kind === 'addChange' ? n3 - a : kind === 'subChange' ? a - n3 : kind === 'add' ? a + b : a - b;
          if (want !== ans) fails.push(`${P}: the key says ${ans}, the story gives ${want}`);
          const told = [a, b, n3].filter((v) => v != null);
          for (const v of [...told, ans]) if (v < 2 || v > max) fails.push(`${P}: ${v} is outside 2 to ${max}`);
          if (told.includes(ans)) fails.push(`${P}: the answer is a number the story tells`);
          if (answers.has(ans)) fails.push(`${P}: an answer twice on the page`); answers.add(ans);
          if (told.some((v) => toldAll.includes(v))) fails.push(`${P}: a number of another story`); toldAll.push(...told);
          const story = (c.querySelector('[data-lcs-sentence]') || {}).textContent || '';
          for (const v of told) if (!has(story, v)) fails.push(`${P}: ${v} is not in the story`);
          if (has(story, ans)) fails.push(`${P}: the answer stands in the story`);
          if (/[{}]/.test(story)) fails.push(`${P}: unfilled slot`);
          if (!/[?？]\s*$/.test(story.trim())) fails.push(`${P}: the story does not end with its question`);
          // the bar: the whole is the sum of its parts, with the answer for the question mark
          const val = (v) => (v === '?' ? ans : +v);
          const whole = val(c.querySelector('[data-lcs-whole]').dataset.lcsWhole), parts = [...c.querySelectorAll('[data-lcs-part]')].map((e) => val(e.dataset.lcsPart));
          if (parts.length !== 2 || parts[0] + parts[1] !== whole) fails.push(`${P}: the bar says ${parts.join(' + ')} = ${whole}`);
          { const w = c.querySelector('[data-lcs-whole]').getBoundingClientRect(), pr = [...c.querySelectorAll('[data-lcs-part]')].map((e) => e.getBoundingClientRect());
            if (w.height < 30 || pr.some((r) => r.height < 30 || r.top < w.bottom - 3)) fails.push(`${P}: the bar is not a whole over two parts`);
            if (Math.abs(w.width - (pr[0].width + pr[1].width)) > 3) fails.push(`${P}: the parts are not as long as the whole`); }
          const marks = [c.querySelector('[data-lcs-whole]').dataset.lcsWhole, ...[...c.querySelectorAll('[data-lcs-part]')].map((e) => e.dataset.lcsPart)].filter((v) => v === '?').length;
          if (marks !== 1) fails.push(`${P}: ${marks} unknowns in the bar`);
          // the equation of the key is true
          const e = c.querySelector('[data-lcs-eq]').dataset.lcsEq.split(' '), x = val(e[0]), y = val(e[2]), z = val(e[3]);
          if ((e[1] === '+' ? x + y : x - y) !== z) fails.push(`${P}: the equation ${e.join(' ')} is not true`);
          if (c.querySelectorAll('[data-lcs-eqbox]').length !== 3 || !c.querySelector('[data-lcs-sign]')) fails.push(`${P}: the equation frame`);
          if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== ans) fails.push(`${P}: the answer box`);
          if (c.querySelectorAll('[data-lcs-label] img').length !== 1) fails.push(`${P}: no picture of the thing beside the answer`);
          if (c.querySelectorAll('[data-lcs-thing] img').length !== 1) fails.push(`${P}: one picture of the thing`);
          if (c.dataset.lcsExample) { if (i !== 0) fails.push(`${P}: only the first story is worked`); if (c.querySelectorAll('[data-lcs-worked]').length !== 8) fails.push(`${P}: the worked story shows ${c.querySelectorAll('[data-lcs-worked]').length} of its 8 entries`); }
          if (max > 20 && root.dataset.lcsTens === '1' && [...told, ans].some((v) => v % 10)) fails.push(`${P}: not whole tens`);
          const cr = c.getBoundingClientRect();
          c.querySelectorAll('*').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(`${P}: something runs out of it`); });
          // bar, equation and answer stand on ONE line (a wrapped answer box reads as a second task)
          const row = [c.querySelector('[data-lcs-bar]'), c.querySelector('[data-lcs-eq]'), c.querySelector('[data-lcs-answer]')].map((el) => el.getBoundingClientRect());
          if (row[1].top > row[0].bottom || row[2].top > row[0].bottom) fails.push(`${P}: the working line wraps`);
        });
        return [...new Set(fails)];
      });
    },
  };
}

module.exports = { makeStoryModelType, model, answerOf };
