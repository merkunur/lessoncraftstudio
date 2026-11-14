/**
 * G1-570 — Stories with Three Numbers (Year pages R, 2026-11-14; 1.OA.A.2: word problems that call for addition of
 * three whole numbers whose sum is less than or equal to 20; de "Sachaufgaben mit drei Summanden").
 *
 * Three stories a page, each with three amounts of one thing (on the table, in a box and in a basket; in the morning,
 * after lunch and in the evening; has some, gets more, gets more again). Under each story stand
 *   - a large empty box to DRAW the three groups in;
 *   - the frame  [ ] + [ ] + [ ] = [ ]  with the plus signs printed (the page is about adding three numbers; the
 *     operation is not the question) and the picture of the thing beside the answer.
 * Every amount is 2 to 9 (no "1 apples" in eleven languages).
 *   Level 1  totals 6 to 10.
 *   Level 2  totals 12 to 19, and in every story two of the numbers make ten (three different numbers).
 *   Level 3  totals 11 to 20: one story with two numbers that make ten, one with a double (and no ten), one with
 *            neither. The child has to look before adding.
 * No two stories of a page share an answer or the same three numbers, and a child is named in at most one story.
 * The key fills the frame in the order the story tells the numbers and rings the two boxes that make ten or the double.
 * The stories are data/word-problems/three-frames.json (native, read by a native reader); the things are the reviewed
 * noun allow-list of the story-problem engine. Nothing is counted in a picture: one picture of the thing stands beside
 * the story. Printed page only.
 */
'use strict';
const W = require('../../lib/word-problems-levelset.js');
const T = require('../../primitives/_tokens.js').color;
const { storyFit } = require('../g2/G2-506-story-problems-three-lines.js');
const FRAMES = require('../../data/word-problems/three-frames.json');

const hasTen = (n) => n[0] + n[1] === 10 || n[0] + n[2] === 10 || n[1] + n[2] === 10;
const hasDouble = (n) => n[0] === n[1] || n[0] === n[2] || n[1] === n[2];
/** every triple of numbers 2 to 9 (order matters: the story tells them in this order) of a sort */
function triples(sort) {
  const out = [];
  for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) for (let c = 2; c <= 9; c++) {
    const n = [a, b, c], sum = a + b + c;
    if (sort === 'small' && sum >= 6 && sum <= 10 && !(a === b && b === c)) out.push(n);   // (never 2 + 2 + 2: three amounts, not one amount three times)
    if (sort === 'ten' && hasTen(n) && !hasDouble(n) && sum <= 20) out.push(n);
    if (sort === 'double' && hasDouble(n) && !hasTen(n) && !(a === b && b === c) && sum >= 11 && sum <= 20) out.push(n);
    if (sort === 'plain' && !hasTen(n) && !hasDouble(n) && sum >= 11 && sum <= 20) out.push(n);
  }
  return out;
}
/** the two places of a triple to ring in the key: the pair that makes ten, else the double, else none */
function pairOf(n) {
  for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) if (n[i] + n[j] === 10) return [i, j];
  for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) if (n[i] === n[j]) return [i, j];
  return [];
}

module.exports = {
  id: 'G1-570',
  slug: 'stories-with-three-numbers',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3 },
  difficulty: {
    1: { sorts: ['small', 'small', 'small'] },
    2: { sorts: ['ten', 'ten', 'ten'] },
    3: { sorts: ['ten', 'double', 'plain'] },
  },
  i18n: { en: { title: 'Stories with Three Numbers', instruction: 'Read each story. Draw it in the box. Write the three numbers. Look for two numbers that make ten, then add.' } },
  levelSetWords(m) { return ((m && m.problems) || []).map((p) => p.vocabKey + ':' + p.frame); },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const loc = (locale || 'en').slice(0, 2);
    const fit = Number(ctx.wpFit) || 0;   // a page that ran past the footer is rebuilt one step tighter (cli qaRetries)
    // no big thing (a child does not find 7 watermelons in the morning): the engine's test for a thing too big for a basket
    const pool = W.nounsFor(theme, loc).filter((n) => W.frameFits('in a basket', n.noun, 'en'));
    if (pool.length < 3) throw new Error(`G1-570: theme ${theme}/${loc} has ${pool.length} things to count < 3`);
    const names = W.namesFor(loc, false);
    let problems = null;
    for (let attempt = 0; attempt < 80 && !problems; attempt++) {
      const sorts = rng.shuffle(d.sorts), nouns = rng.sample(pool, 3);
      if (new Set(nouns.map((n) => n.text)).size < 3) continue;   // two things with one word (fr "ballons")
      const usedFrames = new Set(), usedNames = [], drawn = [];
      let ok = true;
      const list = sorts.map((sort, i) => {
        const all = triples(sort).filter((n) => !drawn.some((q) => q.sum === n[0] + n[1] + n[2] || q.n.slice().sort().join() === n.slice().sort().join()));
        if (!all.length) { ok = false; return null; }
        const n = rng.pick(all); drawn.push({ n, sum: n[0] + n[1] + n[2] });
        const free = FRAMES[loc].filter((f) => !usedFrames.has(f) && storyFit.fitsHere(f, nouns[i].noun === 'strawberry' ? 'raspberry' : nouns[i].noun, loc));
        if (!free.length) { ok = false; return null; }
        const tpl = rng.pick(free); usedFrames.add(tpl);
        const freeNames = names.filter((x) => !usedNames.some((u) => u === x || u.slice(0, 4) === x.slice(0, 4)));
        const name = rng.pick(freeNames);
        if (tpl.includes('{name}')) usedNames.push(name);
        const sentence = W.fill(tpl, { name, name2: name, n1: n[0], n2: n[1], n3: n[2], noun: nouns[i].text, gender: nouns[i].gender }, loc);
        return { sort, n, answer: n[0] + n[1] + n[2], noun: nouns[i].noun, vocabKey: nouns[i].vocabKey, frame: 'three:' + tpl.length + ':' + tpl.slice(0, 12), sentence };
      });
      if (ok) problems = list;
    }
    if (!problems) throw new Error(`G1-570: no page of three different stories for ${theme}/${loc} at level ${difficulty}`);

    const font = 18 - fit, cell = Math.max(36, 44 - 2 * fit);
    const num = (v, attr) => `<span ${attr || ''} style="font-family:'Baloo 2';font-weight:700;font-size:22px;line-height:1;color:${T.coral}">${v}</span>`;
    const sign = (s) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;line-height:1;color:${T.ink}">${s}</span>`;
    const cards = problems.map((p) => {
      const ring = key ? pairOf(p.n) : [];
      const box = (k) => `<span data-lcs-eqbox="${p.n[k]}"${ring.includes(k) ? ' data-lcs-ring' : ''} style="width:${cell + 8}px;height:${cell}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:${ring.includes(k) ? `3px solid ${T.coral}` : `2px solid ${T.ink}`};border-radius:8px">${key ? num(p.n[k]) : ''}</span>`;
      const answer = `<span data-lcs-answer="${p.answer}" style="width:${cell + 14}px;height:${cell}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2.5px dashed ${T.grid};border-radius:8px">${key ? num(p.answer, 'data-lcs-keytext') : ''}</span>`;
      const eq = `<span data-lcs-eq style="flex:0 0 auto;display:flex;align-items:center;gap:8px">${box(0)}${sign('+')}${box(1)}${sign('+')}${box(2)}${sign('=')}${answer}<span data-lcs-label style="flex:0 0 auto;display:inline-flex">${W.iconImg(theme, p.noun, 32)}</span></span>`;
      return `<div class="ws-card-stage" data-lcs-three="${p.sort}|${p.n.join('|')}|${p.answer}" style="flex:1 0 auto;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:${10 - fit}px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:12px 20px">` +
        `<div style="display:flex;align-items:center;gap:14px"><span data-lcs-thing style="flex:0 0 auto;display:inline-flex">${W.iconImg(theme, p.noun, 46)}</span>` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.4;color:${T.ink};margin:0" data-lcs-sentence>${p.sentence}</p></div>` +
        `<div style="flex:1 1 auto;display:flex;align-items:stretch;gap:14px"><div data-lcs-drawbox style="flex:1;min-width:0;background:${T.white};border:2.5px dashed ${T.grid};border-radius:12px;min-height:${Math.max(56, 84 - 12 * fit)}px"></div>` +
        `<div style="flex:0 0 auto;display:flex;align-items:flex-end">${eq}</div></div></div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-three-page="${difficulty}" style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:stretch">${cards.join('')}</div>`;
    return { bodyHtml, meta: { problems: problems.map(({ sort, n, answer, vocabKey, frame }) => ({ kind: 'three', sort, n1: n[0], n2: n[1], n3: n[2], answer, vocabKey, frame })) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-three-page]'); if (!root) return ['no content'];
      const level = +root.dataset.lcsThreePage;
      const cards = [...document.querySelectorAll('[data-lcs-three]')];
      if (cards.length !== 3) fails.push(cards.length + ' stories');
      const has = (t, n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(t);
      const ten = (n) => n[0] + n[1] === 10 || n[0] + n[2] === 10 || n[1] + n[2] === 10;
      const dbl = (n) => n[0] === n[1] || n[0] === n[2] || n[1] === n[2];
      const answers = new Set(), sets = new Set(), sorts = [];
      cards.forEach((c, i) => {
        const P = 'story ' + (i + 1);
        const parts = c.dataset.lcsThree.split('|'), sort = parts[0], n = parts.slice(1, 4).map(Number), ans = +parts[4];
        sorts.push(sort);
        if (n[0] + n[1] + n[2] !== ans) fails.push(`${P}: the key says ${ans}, the story gives ${n[0] + n[1] + n[2]}`);
        if (n.some((v) => v < 2 || v > 9)) fails.push(`${P}: an amount outside 2 to 9`);
        if (sort === 'small' && (ans < 6 || ans > 10)) fails.push(`${P}: total ${ans} is not 6 to 10`);
        if (sort !== 'small' && (ans < 11 || ans > 20)) fails.push(`${P}: total ${ans} is not 11 to 20`);
        if (sort === 'ten' && (!ten(n) || dbl(n))) fails.push(`${P}: no pair that makes ten, or a double beside it`);
        if (sort === 'double' && (!dbl(n) || ten(n))) fails.push(`${P}: no double, or a ten beside it`);
        if (sort === 'plain' && (ten(n) || dbl(n))) fails.push(`${P}: a ten or a double where none was meant`);
        if (answers.has(ans)) fails.push(`${P}: an answer twice on the page`); answers.add(ans);
        const k = n.slice().sort().join(); if (sets.has(k)) fails.push(`${P}: the same three numbers twice`); sets.add(k);
        const story = (c.querySelector('[data-lcs-sentence]') || {}).textContent || '';
        // the story tells its three numbers in the order of the frame, and not its answer
        let at = -1;
        for (const v of n) { const m = new RegExp(`(^|\\D)${v}(\\D|$)`).exec(story.slice(at + 1)); if (!m) { fails.push(`${P}: ${v} is not in the story in its place`); break; } at += 1 + m.index + m[1].length; }
        if (!n.includes(ans) && has(story, ans)) fails.push(`${P}: the answer stands in the story`);
        if (/[{}]/.test(story)) fails.push(`${P}: unfilled slot`);
        if (!/[?？]\s*$/.test(story.trim())) fails.push(`${P}: the story does not end with its question`);
        const boxes = [...c.querySelectorAll('[data-lcs-eqbox]')];
        if (boxes.length !== 3 || boxes.some((b, j) => +b.dataset.lcsEqbox !== n[j])) fails.push(`${P}: the frame is not ${n.join(' + ')}`);
        if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== ans) fails.push(`${P}: the answer box`);
        if (c.querySelectorAll('[data-lcs-label] img').length !== 1) fails.push(`${P}: no picture of the thing beside the answer`);
        if (c.querySelectorAll('[data-lcs-thing] img').length !== 1) fails.push(`${P}: one picture of the thing`);
        const draw = c.querySelector('[data-lcs-drawbox]').getBoundingClientRect();
        if (draw.height < 50 || draw.width < 150) fails.push(`${P}: the drawing box is ${Math.round(draw.width)} by ${Math.round(draw.height)}`);
        const rings = [...c.querySelectorAll('[data-lcs-ring]')].map((b) => +b.dataset.lcsEqbox);
        if (rings.length && !(rings.length === 2 && (rings[0] + rings[1] === 10 || rings[0] === rings[1]))) fails.push(`${P}: the key rings ${rings.join(' and ')}`);
        const cr = c.getBoundingClientRect();
        c.querySelectorAll('*').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(`${P}: something runs out of it`); });
        const eq = c.querySelector('[data-lcs-eq]').getBoundingClientRect();
        if (eq.left < draw.right - 1) fails.push(`${P}: the frame runs into the drawing box`);
      });
      const want = level === 1 ? 'small,small,small' : level === 2 ? 'ten,ten,ten' : 'double,plain,ten';
      if (sorts.slice().sort().join() !== want) fails.push(`level ${level} has the stories ${sorts.join(', ')}`);
      return [...new Set(fails)];
    });
  },
};
