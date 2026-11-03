/**
 * G2-489 — Two-Step Word Problems (Word Problems maker 2026-11-02, NEW-TEMPLATES §50 T2; 2.OA.A.1 two-step problems;
 * de "Sachaufgaben", nl "verhaaltjessommen"): stories with two changes (gets some, then gives some away; takes some out,
 * then puts some in…); levels 1-2 give the two steps as number sentences with boxes (step 1, step 2 starting from step
 * 1's result), level 3 one box for the answer. The stories are literals per locale (data/word-problems/two-step-
 * frames.js, four step pairs), filled by the Word Problems engine (lib/word-problems-levelset.js fill: the reviewed
 * nouns, {Q} agreement, fr elision); every number is 2 or more and no step goes below 1; a big thing (a train, a kite) is
 * never counted past 20 (W.maxFor). Every box is an answer box.
 * Levels: 1 two stories within 20, the steps given · 2 three stories within 20, the steps given · 3 three stories within
 * 50, one answer.
 */
'use strict';
const { TWO_STEP, STEPS } = require('../../data/word-problems/two-step-frames.js');
const W = require('../../lib/word-problems-levelset.js');
const T = require('../../primitives/_tokens.js').color;

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
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const frames = TWO_STEP[L];
    if (!frames) throw new Error(`G2-489: no two-step stories for ${L}`);
    const pool = W.nounsFor(theme, L);
    if (pool.length < d.n) throw new Error(`G2-489: theme ${theme}/${L} has ${pool.length} nouns (< ${d.n})`);
    const nouns = rng.sample(pool, d.n), names = W.namesFor(L, false);
    const kinds = rng.sample(Object.keys(frames), d.n);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const box = (v) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;vertical-align:middle;width:70px;height:48px;margin:0 4px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
    const op = (o) => (o === '+' ? '+' : MINUS);
    const items = kinds.map((kind, i) => {
      // a big thing (trains, skateboards, kites) is never counted past 20 (lib/word-problems-levelset.js maxFor)
      const max = W.maxFor(nouns[i].noun, d.max);
      const nums = draw(kind, max, rng);
      if (!nums) throw new Error(`G2-489: no numbers for ${kind} within ${max}`);
      const name = rng.pick(names), name2 = rng.pick(names.filter((x) => x !== name)), name3 = rng.pick(names.filter((x) => x !== name && x !== name2));
      const story = W.fill(frames[kind].split('{name3}').join(name3), { name, name2, n1: nums.n1, n2: nums.n2, n3: nums.n3, noun: nouns[i].text, gender: nouns[i].gender }, L);
      return { kind, story, ...nums };
    });
    const eqStyle = `font:700 26px/1.2 'Baloo 2',cursive;color:${T.ink}`;
    const rows = items.map((it, i) => `<div data-lcs-two-step="${i + 1}" data-lcs-kind="${it.kind}" style="display:flex;flex-direction:column;gap:8px;padding:10px 14px;border-radius:14px;background:${T.cream}">` +
      `<div style="font:600 ${d.font}px/1.45 'Nunito',sans-serif;color:${T.ink}">${i + 1}. ${esc(it.story)}</div>` +
      (d.steps
        ? `<div style="display:flex;flex-wrap:wrap;gap:8px 28px;justify-content:center"><span style="${eqStyle}"><span style="color:${T.teal}">1.</span> ${it.n1} ${op(it.o1)} ${it.n2} = ${box(it.s1)}</span>` +
          `<span style="${eqStyle}"><span style="color:${T.teal}">2.</span> ${box(it.s1)} ${op(it.o2)} ${it.n3} = ${box(it.s2)}</span></div>`
        : `<div style="display:flex;justify-content:flex-end">${box(it.s2)}</div>`) + '</div>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-two-steps style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">${rows.join('')}</div>`,
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
      return fails;
    });
  },
};
