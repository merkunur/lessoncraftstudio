/**
 * G1-512 — Which Number Sentence? (Word Problems maker 2026-11-02, NEW-TEMPLATES §50 T3; 1.OA.A.1 represent a story with
 * an equation; de "Rechengeschichte → Rechnung"): word problems, each with number sentences to choose from; the child
 * circles the one that tells the story — representation, not computing. The stories are the native add / sub frames of
 * the Word Problems engine (data/word-problems/frames.js + the Level Set's, lib/word-problems-levelset.js: the reviewed
 * nouns, {Q} agreement, fr elision). The wrong number sentences: the other operation, and one with a number that is not
 * in the story; never the turned-around sum (7 + 2 and 2 + 7 would both be right). The right one stands in each place
 * as often as the page allows. Each number sentence is a choice; the right one is ringed on the key.
 * Levels: 1 three stories within 10, two number sentences · 2 four stories within 20, three · 3 five stories within 20,
 * three.
 */
'use strict';
const W = require('../../lib/word-problems-levelset.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 3, max: 10, iconMax: 10, choices: 2, font: 22 }, 2: { n: 4, max: 20, iconMax: 20, choices: 3, font: 20 }, 3: { n: 5, max: 20, iconMax: 20, choices: 3, font: 18 } };
const MINUS = '−';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = {
  id: 'G1-512',
  slug: 'which-number-sentence',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 5, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Which Number Sentence?', instruction: 'Read each story. Circle the number sentence that tells the story.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = W.nounsFor(theme, L);
    if (pool.length < d.n) throw new Error(`G1-512: theme ${theme}/${L} has ${pool.length} nouns (< ${d.n})`);
    const nouns = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme), names = W.namesFor(L, false);   // a teacher's thing per story (maker)
    const kinds = rng.shuffle(Array.from({ length: d.n }, (_, i) => (i % 2 ? 'sub' : 'add')));
    const places = rng.shuffle(Array.from({ length: d.n }, (_, i) => i % d.choices));
    const used = new Set();
    const items = kinds.map((kind, i) => {
      let nums = null, g = 0;
      // never a doubles adding story: its other-operation choice would be "4 − 4" (a 0 on the page, review 2026-11-02)
      do { nums = W.drawG1(kind, d, rng); g++; } while ((!nums || used.has(kind + nums.n1 + '/' + nums.n2) || (kind === 'add' && nums.n1 === nums.n2)) && g < 400);
      if (!nums) throw new Error('G1-512: no numbers');
      used.add(kind + nums.n1 + '/' + nums.n2);
      // a NEW page's frames: no big thing in a bag or a basket, es asks "¿Cuántos…?" (lib/word-problems-levelset.js)
      const all = W.framesFor(L, kind).map((f) => W.newFrame(f, L)), fit = all.filter((f) => W.frameFits(f, nouns[i].noun, L));
      const list = fit.length ? fit : all;
      // two names a child tells apart at a glance (never Louis / Louise)
      const name = rng.pick(names), name2 = rng.pick(names.filter((x) => x !== name && x.slice(0, 4) !== name.slice(0, 4)));
      const story = W.fill(rng.pick(list), { name, name2, n1: nums.n1, n2: nums.n2, noun: nouns[i].text, gender: nouns[i].gender }, L);
      const { n1, n2 } = nums;
      const right = kind === 'add' ? `${n1} + ${n2}` : `${n1} ${MINUS} ${n2}`;
      // the other operation with the story's numbers (bigger number first), and a sentence with a number the story does
      // not have — on about half the stories with the story's operation, on the others with the other one, so counting
      // the + and − signs never finds the right one (review 2026-11-02)
      const otherOp = rng.int(0, 1) === 1;
      const wrongNum = kind === 'add'
        ? (otherOp ? `${Math.max(n1, n2) + 1} ${MINUS} ${Math.min(n1, n2)}` : `${n1} + ${n2 + 1}`)
        : (otherOp ? `${n1} + ${n2 + 1}` : `${n1} ${MINUS} ${n2 + 1}`);
      const wrong = kind === 'add' ? [`${Math.max(n1, n2)} ${MINUS} ${Math.min(n1, n2)}`, wrongNum] : [`${n1} + ${n2}`, wrongNum];
      const opts = wrong.slice(0, d.choices - 1);
      opts.splice(places[i], 0, right);
      return { kind, story, right, opts };
    });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const rows = items.map((it, i) => `<div data-lcs-story="${i + 1}"${slot.attr(ctx, 'pic', i)} data-lcs-kind="${it.kind}" style="display:flex;flex-direction:column;gap:8px;padding:8px 14px;border-radius:14px;background:${T.cream}">` +
      `<div style="font:600 ${d.font}px/1.4 'Nunito',sans-serif;color:${T.ink}">${i + 1}. ${esc(it.story)}</div>` +
      `<div class="ws-choices" style="display:flex;gap:14px;justify-content:center">${it.opts.map((o) => `<span data-lcs-pick="1"${mark && o === it.right ? ' data-lcs-correct="1"' : ''} style="padding:6px 18px;border:2.5px solid ${T.grid};border-radius:12px;background:#FFFFFF;font:700 28px/1.2 'Baloo 2',cursive;color:${T.ink};white-space:nowrap">${o}</span>`).join('')}</div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-which-sentence style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${rows.join('')}</div>`,
      meta: { stories: items.map((it) => `${it.story} → ${it.right}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-story]')];
      if (rows.length < 3) fails.push(`${rows.length} stories`);
      const root = document.querySelector('[data-lcs-which-sentence]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`story ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
