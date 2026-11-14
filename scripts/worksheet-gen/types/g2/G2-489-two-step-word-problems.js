/**
 * G2-489 — Two-Step Word Problems (Word Problems maker 2026-11-02, NEW-TEMPLATES §50 T2; 2.OA.A.1 two-step problems;
 * de "Sachaufgaben", nl "verhaaltjessommen"): stories with two changes (gets some, then gives some away; takes some out,
 * then puts some in…); levels 1-2 give the two steps as number sentences with boxes (step a, step b starting from step
 * a's result; lettered a) and b), because the stories are numbered), level 3 one box for the answer. The stories are literals per locale (data/word-problems/two-step-
 * frames.js, four step pairs), filled by the Word Problems engine (lib/word-problems-levelset.js fill: the reviewed
 * nouns, {Q} agreement, fr elision); every number is 2 or more and no step goes below 1; a big thing (a train, a kite) is
 * never counted past 20 (W.maxFor). Every box is an answer box.
 * Levels: 1 two stories within 20, the steps given · 2 three stories within 20, the steps given · 3 three stories within
 * 50, one answer.
 */
'use strict';
const { TWO_STEP, STEPS } = require('../../data/word-problems/two-step-frames.js');
// the step pairs told in a PLACE, for the face with two-digit numbers (G2-511; the file says why)
const PLACE = require('../../data/word-problems/two-step-place-frames.json');
const slot = require('../../lib/slot.js');
const W = require('../../lib/word-problems-levelset.js');
const T = require('../../primitives/_tokens.js').color;
const { storyFit } = require('./G2-506-story-problems-three-lines.js');

const D = { 1: { n: 2, max: 20, steps: true, font: 21 }, 2: { n: 3, max: 20, steps: true, font: 19 }, 3: { n: 3, max: 50, steps: false, font: 20 } };
const MINUS = '−';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** the numbers of a step pair: every printed number ≥ 2, the result after each step ≥ 1, everything ≤ max */
function draw(kind, max, rng) {
  for (let t = 0; t < 400; t++) {
    const n1 = rng.int(4, max - 2), n2 = rng.int(2, Math.max(2, Math.floor(max / 2))), n3 = rng.int(2, Math.max(2, Math.floor(max / 2)));
    const [o1, o2] = STEPS[kind];
    const s1 = o1 === '+' ? n1 + n2 : n1 - n2;
    const s2 = o2 === '+' ? s1 + n3 : s1 - n3;
    if (s1 < 1 || s2 < 1 || s1 > max || s2 > max) continue;
    if ([n1, n2, n3].includes(s2)) continue;   // the answer is never a number printed in the story
    return { n1, n2, n3, s1, s2, o1, o2 };
  }
  return null;
}

/** two-digit numbers of a step pair for the face told in a place (d.place): every printed number is 11 or more
 *  (whole tens: 10 or more), both results stay from 10 to d.max, the five numbers differ, and no story of the page
 *  shares a number or an answer with another */
function drawBig(kind, d, rng, drawn) {
  const [o1, o2] = STEPS[kind], step = d.tens ? 10 : 1;
  const pick = (lo, hi) => step * rng.int(Math.ceil(lo / step), Math.floor(hi / step));
  for (let t = 0; t < 800; t++) {
    const n1 = pick(d.tens ? 30 : 21, d.tens ? 80 : 89), n2 = pick(d.tens ? 10 : 11, d.tens ? 40 : 49), n3 = pick(d.tens ? 10 : 11, d.tens ? 40 : 49);
    const s1 = o1 === '+' ? n1 + n2 : n1 - n2, s2 = o2 === '+' ? s1 + n3 : s1 - n3;
    if (s1 < 10 || s2 < 10 || s1 > d.max || s2 > d.max) continue;
    if (new Set([n1, n2, n3, s1, s2]).size < 5) continue;
    // (with whole tens there are too few numbers for two stories to share none: there the stories differ in their
    // answer and in their first number)
    if (drawn.some((q) => q.s2 === s2 || (d.tens ? q.n1 === n1 : [q.n1, q.n2, q.n3].some((v) => [n1, n2, n3].includes(v))))) continue;
    return { n1, n2, n3, s1, s2, o1, o2 };
  }
  return null;
}

module.exports = {
  id: 'G2-489',
  slug: 'two-step-word-problems',
  gradeBand: 'G2',
  assetClass: 'none',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Two-Step Word Problems', instruction: 'Read each story. Do the first step, then the second step. Write the numbers in the boxes.' } },

  build({ theme, difficulty, locale }, ctx) {
    const DD = this.difficulty || D;   // a face (G2-511) brings its own levels
    const d = DD[difficulty] || DD[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    // d.place: the stories told in a place (two-step-place-frames.json; B is the bank's own box frame)
    const frames = d.place ? (TWO_STEP[L] && PLACE[L] ? Object.assign({ B: TWO_STEP[L].B }, PLACE[L]) : null) : TWO_STEP[L];
    if (!frames) throw new Error(`${this.id}: no two-step stories for ${L}`);
    // … with two-digit numbers only of things that come by the dozen (53 forks, never 53 trains)
    const pool = W.nounsFor(theme, L).filter((n) => !d.place || W.maxFor(n.noun, 100) === 100);
    if (pool.length < d.n) throw new Error(`${this.id}: theme ${theme}/${L} has ${pool.length} nouns (< ${d.n})`);
    const names = W.namesFor(L, false);
    let nouns = null, kinds = null;
    if (d.place) {
      // the thing fits its place (no loose berries on a shelf, no cup that "lies" on a table: storyFit), and no two
      // things of the page share a word
      for (let t = 0; t < 80 && !nouns; t++) {
        const ns = rng.sample(pool, d.n), ks = rng.sample(Object.keys(frames), d.n);
        if (new Set(ns.map((n) => n.text)).size < d.n) continue;
        if (ns.every((n, i) => storyFit.fitsHere(frames[ks[i]], n.noun === 'strawberry' ? 'raspberry' : n.noun, L))) { nouns = ns; kinds = ks; }
      }
      if (!nouns) throw new Error(`${this.id}: no ${d.n} things of ${theme}/${L} fit the places of the stories`);
    } else {
      nouns = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme);   // a teacher's thing per story (maker)
      kinds = rng.sample(Object.keys(frames), d.n);
    }
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const box = (v) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;vertical-align:middle;width:70px;height:48px;margin:0 4px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
    const op = (o) => (o === '+' ? '+' : MINUS);
    const drawn = [], usedNames = [];
    const items = kinds.map((kind, i) => {
      // a big thing (trains, skateboards, kites) is never counted past 20 (lib/word-problems-levelset.js maxFor)
      const max = W.maxFor(nouns[i].noun, d.max);
      const nums = d.place ? drawBig(kind, d, rng, drawn) : draw(kind, max, rng);
      if (!nums) throw new Error(`${this.id}: no numbers for ${kind} within ${max}`);
      drawn.push(nums);
      let name, name2, name3;
      if (d.place) {   // a child is named in one story of the page only
        const free = names.filter((x) => !usedNames.some((u) => u === x || u.slice(0, 4) === x.slice(0, 4)));
        name = rng.pick(free); name2 = rng.pick(free.filter((x) => x !== name && x.slice(0, 4) !== name.slice(0, 4))); name3 = name2;
        if (frames[kind].includes('{name}')) usedNames.push(name);
        if (frames[kind].includes('{name2}')) usedNames.push(name2);
      } else { name = rng.pick(names); name2 = rng.pick(names.filter((x) => x !== name)); name3 = rng.pick(names.filter((x) => x !== name && x !== name2)); }
      const story = W.fill(frames[kind].split('{name3}').join(name3), { name, name2, n1: nums.n1, n2: nums.n2, n3: nums.n3, noun: nouns[i].text, gender: nouns[i].gender }, L);
      return { kind, story, ...nums };
    });
    const eqStyle = `font:700 26px/1.2 'Baloo 2',cursive;color:${T.ink}`;
    const rows = items.map((it, i) => `<div data-lcs-two-step="${i + 1}"${slot.attr(ctx, 'pic', i)} data-lcs-kind="${it.kind}"${d.place ? ` data-lcs-nums="${[it.n1, it.o1, it.n2, it.o2, it.n3, it.s1, it.s2].join('|')}"` : ''} style="display:flex;flex-direction:column;gap:8px;padding:10px 14px;border-radius:14px;background:${T.cream}${d.place ? ';flex:1 1 0;min-height:0' : ''}">` +
      `<div style="font:600 ${d.font}px/1.45 'Nunito',sans-serif;color:${T.ink}">${i + 1}. ${esc(it.story)}</div>` +
      (d.steps
        ? `<div style="display:flex;flex-wrap:wrap;gap:8px 28px;justify-content:center"><span style="${eqStyle}"><span data-lcs-step style="color:${T.teal}">a)</span> ${it.n1} ${op(it.o1)} ${it.n2} = ${box(it.s1)}</span>` +
          `<span style="${eqStyle}"><span data-lcs-step style="color:${T.teal}">b)</span> ${box(it.s1)} ${op(it.o2)} ${it.n3} = ${box(it.s2)}</span></div>`
        : d.place ? '' : `<div style="display:flex;justify-content:flex-end">${box(it.s2)}</div>`) +
      // the face told in a place: a dotted space to work in; where no steps are printed the answer box stands beside it
      (d.place ? `<div style="flex:1 1 auto;display:flex;gap:14px;align-items:stretch;min-height:40px"><div data-lcs-dots style="flex:1;min-width:0;background-color:${T.white};background-image:radial-gradient(circle,#C8BFAE 1.6px,transparent 1.8px);background-size:26px 24px;background-position:2px 2px;border:2px solid ${T.creamDeep};border-radius:12px"></div>${d.steps ? '' : `<div style="display:flex;align-items:center">${box(it.s2)}</div>`}</div>` : '') + '</div>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-two-steps${d.place ? ` data-lcs-place="${d.max}|${d.tens ? 1 : 0}"` : ''} style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">${rows.join('')}</div>`,
      meta: { stories: items.map((it) => `${it.story} → ${it.n1}${it.o1}${it.n2}=${it.s1}, ${it.s1}${it.o2}${it.n3}=${it.s2}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-two-step]')];
      if (rows.length < 2) fails.push(`${rows.length} stories`);
      const root = document.querySelector('[data-lcs-two-steps]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`story ${i + 1} leaves the page`); });
      // the steps are lettered: a step numbered "1." under story 2 reads as a problem number (US teacher-reviewer, 2026-11-14)
      rows.forEach((r, i) => { const t = [...r.querySelectorAll('[data-lcs-step]')].map((x) => x.textContent.trim()).join(' '); if (t && t !== 'a) b)') fails.push(`story ${i + 1}: the steps are labelled "${t}"`); });
      // the face told in a place (G2-511): the numbers of each story, stamped on its card
      const place = document.querySelector('[data-lcs-two-steps]').dataset.lcsPlace;
      if (place) {
        const [max, tens] = place.split('|').map(Number), answers = new Set(), told = [];
        rows.forEach((r, i) => {
          const P = 'story ' + (i + 1), v = (r.dataset.lcsNums || '').split('|');
          const n1 = +v[0], o1 = v[1], n2 = +v[2], o2 = v[3], n3 = +v[4], s1 = +v[5], s2 = +v[6];
          if ((o1 === '+' ? n1 + n2 : n1 - n2) !== s1 || (o2 === '+' ? s1 + n3 : s1 - n3) !== s2) fails.push(`${P}: the steps do not give ${s2}`);
          for (const x of [n1, n2, n3, s1, s2]) { if (x < 10 || x > max) fails.push(`${P}: ${x} is outside 10 to ${max}`); if (tens && x % 10) fails.push(`${P}: ${x} is not a whole ten`); }
          if (new Set([n1, n2, n3, s1, s2]).size < 5) fails.push(`${P}: a number twice`);
          if (answers.has(s2)) fails.push(`${P}: an answer twice on the page`); answers.add(s2);
          if (!tens && [n1, n2, n3].some((x) => told.includes(x))) fails.push(`${P}: a number of another story`); told.push(n1, n2, n3);
          const story = r.firstElementChild.textContent || '';
          const has = (n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(story.replace(/^\d+\.\s/, ''));
          for (const x of [n1, n2, n3]) if (!has(x)) fails.push(`${P}: ${x} is not in the story`);
          if (has(s2)) fails.push(`${P}: the answer stands in the story`);
          if (/[{}]/.test(story) || !/[?？]\s*$/.test(story.trim())) fails.push(`${P}: an unfilled slot, or no question at the end`);
        });
        if (rows.length !== 3 && !(rows.length === 2)) fails.push(rows.length + ' stories');
      }
      return fails;
    });
  },
};
