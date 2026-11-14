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
// … and where hundreds of a thing are believable (a store, a market, a truck), for the face within 1,000 (G3-485)
const STORE = require('../../data/word-problems/two-step-store-frames.json');
// … and the stories in which one step multiplies or divides (G3-486)
const MULDIV = require('../../data/word-problems/two-step-muldiv-frames.json');
const { divGlyph, mulGlyph } = require('../_shared/notation.js');
// … and the labels of the face with an equation with a letter, an estimate and an answer (G3-487)
const LETTER = require('../../data/word-problems/letter-estimate-labels.json');
const round100 = (v) => Math.round(v / 100) * 100;
const slot = require('../../lib/slot.js');
const W = require('../../lib/word-problems-levelset.js');
const T = require('../../primitives/_tokens.js').color;
const { storyFit } = require('./G2-506-story-problems-three-lines.js');

const D = { 1: { n: 2, max: 20, steps: true, font: 21 }, 2: { n: 3, max: 20, steps: true, font: 19 }, 3: { n: 3, max: 50, steps: false, font: 20 } };
const MINUS = '−';
const LOOSE = new Set(['raspberry', 'blackberry', 'blueberry', 'cherry', 'strawberry', 'green_beans', 'feather']);
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
 *  shares a number or an answer with another.
 *  d.store (G3-485): three-digit numbers; every printed number and both results stay from 100 to 999; with d.tens
 *  every number is a whole ten (340 + 250), the page for children who still need the hundreds chart in their head */
function drawBig(kind, d, rng, drawn) {
  const [o1, o2] = STEPS[kind], step = d.tens ? 10 : 1, lo = d.store ? 100 : 10;
  const pick = (a, b) => step * rng.int(Math.ceil(a / step), Math.floor(b / step));
  for (let t = 0; t < 800; t++) {
    const n1 = d.store ? pick(d.tens ? 300 : 211, d.tens ? 700 : 789) : pick(d.tens ? 30 : 21, d.tens ? 80 : 89);
    const n2 = d.store ? pick(d.tens ? 110 : 112, d.tens ? 390 : 389) : pick(d.tens ? 10 : 11, d.tens ? 40 : 49);
    const n3 = d.store ? pick(d.tens ? 110 : 112, d.tens ? 390 : 389) : pick(d.tens ? 10 : 11, d.tens ? 40 : 49);
    const s1 = o1 === '+' ? n1 + n2 : n1 - n2, s2 = o2 === '+' ? s1 + n3 : s1 - n3;
    if (s1 < lo || s2 < lo || s1 > d.max || s2 > d.max) continue;
    // (three-digit numbers: no printed number ends in 0, whole tens are the easier page's; and on that page at most one
    // number of a story is a whole hundred: 300 + 200 is no three-digit sum to work out)
    if (d.store && !d.tens && [n1, n2, n3].some((v) => v % 10 === 0)) continue;
    if (d.store && d.tens && [n1, n2, n3].filter((v) => v % 100 === 0).length > 1) continue;
    // d.lines (G3-487, an estimate from numbers rounded to the hundred): no number stands halfway between two hundreds
    // (347 rounds one way in every head, 350 does not), the estimate is a three-digit number, and it lies within 100
    // of the answer, so "close to my estimate" is true of the right answer
    let extra = null;
    if (d.lines) {
      if ([n1, n2, n3].some((v) => Math.abs((v % 100) - 50) <= 5)) continue;
      const e1 = o1 === '+' ? round100(n1) + round100(n2) : round100(n1) - round100(n2), e2 = o2 === '+' ? e1 + round100(n3) : e1 - round100(n3);
      if (e1 < 100 || e2 < 100 || Math.abs(e2 - s2) > 100) continue;
      // the last card of the harder page prints a child's WRONG answer: one sign taken the wrong way, far from the estimate
      const wrongs = [o2 === '+' ? s1 - n3 : s1 + n3, o2 === '+' ? (o1 === '+' ? n1 - n2 : n1 + n2) + n3 : (o1 === '+' ? n1 - n2 : n1 + n2) - n3];
      const wrong = wrongs.find((w) => w >= 100 && w <= 1500 && Math.abs(w - e2) >= 200 && Math.abs(w - s2) >= 200);
      if (d.check && wrong === undefined) continue;
      extra = { est: e2, wrong };
    }
    if (new Set([n1, n2, n3, s1, s2]).size < 5) continue;
    // (with whole tens there are too few numbers for two stories to share none: there the stories differ in their
    // answer and in their first number)
    if (drawn.some((q) => q.s2 === s2 || (d.tens ? q.n1 === n1 : [q.n1, q.n2, q.n3].some((v) => [n1, n2, n3].includes(v))))) continue;
    return { n1, n2, n3, s1, s2, o1, o2, ...extra };
  }
  return null;
}

/** the two steps of the stories that multiply or divide (two-step-muldiv-frames.json): 'x' times, ':' divided by */
const MD = { M1: ['x', '+'], M2: ['x', '-'], M3: [':', '+'], M4: ['+', ':'], M5: ['-', ':'] };
const calc = (o, a, b) => (o === '+' ? a + b : o === 'x' ? a * b : o === ':' ? a / b : a - b);
/** numbers of a story that multiplies or divides: n1 ○ n2 = s1, s1 ○ n3 = s2, facts within 100 (d.easy: both factors
 *  from 2 to 5); the five numbers differ, the answer is no number of the story, and no two stories of a page share an
 *  answer or a fact */
function drawMD(kind, d, rng, drawn) {
  const lo = d.easy ? 2 : 3, hi = d.easy ? 5 : 9, [o1, o2] = MD[kind];
  for (let t = 0; t < 1200; t++) {
    const a = rng.int(lo, hi), b = rng.int(lo, hi), p = a * b;
    if (a === b || (!d.easy && p < 12)) continue;
    let n1, n2, n3;
    if (kind === 'M1') { n1 = a; n2 = b; n3 = rng.int(6, Math.min(40, 100 - p)); }           // a packs of b, and some at home
    else if (kind === 'M2') { n1 = a; n2 = b; n3 = rng.int(3, p - 3); }                       // a baskets of b, some taken out
    else if (kind === 'M3') { n1 = p; n2 = a; n3 = rng.int(2, 9); }                           // p shared into a baskets, more into one
    else if (kind === 'M4') { n1 = rng.int(5, p - 5); n2 = p - n1; n3 = a; }                  // two boxes, shared by a children
    else { n2 = rng.int(2, Math.min(15, 100 - p)); n1 = p + n2; n3 = a; }                     // some kept, the rest shared by a friends
    if (![n1, n2, n3].every((v) => Number.isInteger(v) && v >= 2)) continue;
    const s1 = calc(o1, n1, n2), s2 = calc(o2, s1, n3);
    if (!Number.isInteger(s1) || !Number.isInteger(s2) || s1 < 2 || s2 < 2 || s1 > 100 || s2 > 100) continue;
    if (new Set([n1, n2, n3, s1, s2]).size < 5) continue;
    const fact = [a, b].sort().join('x');
    if (drawn.some((q) => q.s2 === s2 || q.fact === fact)) continue;
    return { n1, n2, n3, s1, s2, o1, o2, fact };
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
    // d.store: the stories with hundreds of a thing (two-step-store-frames.json)
    const frames = d.muldiv ? MULDIV[L] : d.store ? STORE[L] : d.place ? (TWO_STEP[L] && PLACE[L] ? Object.assign({ B: TWO_STEP[L].B }, PLACE[L]) : null) : TWO_STEP[L];
    if (!frames) throw new Error(`${this.id}: no two-step stories for ${L}`);
    // … with two-digit numbers only of things that come by the dozen (53 forks, never 53 trains)
    // (… and by the hundred nothing that is sold by the punnet: no store counts 356 raspberries)
    // (… and a child does not buy packs of ladles: no kitchen thing in the stories with packs and friends)
    const pool = W.nounsFor(theme, L).filter((n) => !d.place || W.maxFor(n.noun, 100) === 100).filter((n) => !d.store || !LOOSE.has(n.noun)).filter((n) => !d.muldiv || !(storyFit.HOUSE.has(n.noun) || n.noun === 'blueberry'));   // (no blueberries in a red and a blue box)
    if (pool.length < d.n) throw new Error(`${this.id}: theme ${theme}/${L} has ${pool.length} nouns (< ${d.n})`);
    const names = W.namesFor(L, false);
    let nouns = null, kinds = null;
    if (d.place) {
      // the thing fits its place (no loose berries on a shelf, no cup that "lies" on a table: storyFit), and no two
      // things of the page share a word
      for (let t = 0; t < 80 && !nouns; t++) {
        // d.kinds (G3-486): one kind of each slot of the level, in a drawn order
        const ns = rng.sample(pool, d.n), ks = d.kinds ? rng.shuffle(d.kinds.map((o) => rng.pick(o))) : rng.sample(Object.keys(frames), d.n);
        if (new Set(ks).size < d.n) continue;
        if (new Set(ns.map((n) => n.text)).size < d.n) continue;
        if (ns.every((n, i) => storyFit.fitsHere(frames[ks[i]], n.noun === 'strawberry' ? 'raspberry' : n.noun, L))) { nouns = ns; kinds = ks; }
      }
      if (!nouns) throw new Error(`${this.id}: no ${d.n} things of ${theme}/${L} fit the places of the stories`);
    } else {
      nouns = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme);   // a teacher's thing per story (maker)
      kinds = rng.sample(Object.keys(frames), d.n);
    }
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // the faces of Grade 3 (long stories in some languages): a page that ran past the footer is rebuilt one step tighter (cli qaRetries)
    const fit = d.store || d.muldiv ? Number(ctx.wpFit) || 0 : 0;
    const box = (v) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;vertical-align:middle;width:70px;height:48px;margin:0 4px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
    const op = (o) => (o === '+' ? '+' : o === 'x' ? mulGlyph(L) : o === ':' ? divGlyph(L) : MINUS);
    const drawn = [], usedNames = [];
    const items = kinds.map((kind, i) => {
      // a big thing (trains, skateboards, kites) is never counted past 20 (lib/word-problems-levelset.js maxFor)
      const max = W.maxFor(nouns[i].noun, d.max);
      const nums = d.muldiv ? drawMD(kind, d, rng, drawn) : d.place ? drawBig(kind, d, rng, drawn) : draw(kind, max, rng);
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
    // (the child whose finished answer the last card of G3-487 prints; drawn after the stories, so no other page changes)
    // The printed answer is RIGHT on about two pages in five: were it always wrong, the tick would always be "no"
    // (native reader, 2026-11-14)
    if (d.check) { const last = items[items.length - 1]; last.name = rng.pick(names); last.claim = rng.int(1, 5) <= 2 ? last.s2 : last.wrong; }
    const eqStyle = `font:700 26px/1.2 'Baloo 2',cursive;color:${T.ink}`;
    // d.lines (G3-487): under each story three labelled lines (an equation with a letter, an estimate, the answer)
    // beside a dotted space to work in; d.eqGiven prints the equation and the frame of the estimate; d.check makes
    // the last card a finished wrong answer to test against an estimate and to put right
    const lab = LETTER[L];
    if (d.lines && !lab) throw new Error(`${this.id}: no labels for ${L}`);
    const linesOf = (it, last) => {
      const label = (t) => `<span data-lcs-label style="flex:0 0 auto;min-width:100px;font:800 15px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(t)}</span>`;
      const rule = `<span style="flex:1;align-self:flex-end;height:26px;border-bottom:2px solid #B9AE9C"></span>`;
      const sm = (v) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;vertical-align:middle;width:62px;height:38px;margin:0 3px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:9px;background:#FFFFFF"></span>`;
      const eq = `flex:0 0 auto;white-space:nowrap;font:700 22px/1.2 'Baloo 2',cursive;color:${T.ink}`;
      const row = (inner) => `<div style="display:flex;align-items:center;gap:10px;min-height:${(d.n > 2 ? 30 : 44) - 3 * fit}px">${inner}</div>`;
      const answer = `<span style="${eq}">${lab.letter} =</span>${sm(it.s2).replace("width:62px;height:38px", `width:84px;height:${(d.n > 2 ? 30 : 44) - 3 * fit}px`)}`;
      let rows;
      if (d.check && last) {
        const choice = (t) => `<span style="display:inline-flex;align-items:center;gap:6px;font:700 16px/1 'Nunito',sans-serif;color:${T.ink}"><span style="width:20px;height:20px;box-sizing:border-box;border:2.5px solid ${T.ink};border-radius:50%;background:#FFFFFF"></span>${esc(t)}</span>`;
        rows = [
          row(`<span data-lcs-says style="font:700 18px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(lab.says.replace('{name}', it.name).replace('{eq}', lab.letter + ' = ' + it.claim))}</span>`),
          row(label(lab.est) + rule),
          row(label(lab.ok) + choice(lab.yes) + choice(lab.no)),
          row(label(lab.ans) + answer),
        ];
      } else {
        rows = [
          row(label(lab.eq) + (d.eqGiven ? `<span style="${eq}">${it.n1} ${op(it.o1)} ${it.n2} ${op(it.o2)} ${it.n3} = ${lab.letter}</span>` : rule)),
          row(label(lab.est) + (d.eqGiven ? `<span style="${eq}">${sm(round100(it.n1))} ${op(it.o1)} ${sm(round100(it.n2))} ${op(it.o2)} ${sm(round100(it.n3))} = ${sm(it.est)}</span>` : rule)),
          row(label(lab.ans) + answer),
        ];
      }
      return `<div style="flex:1 1 auto;display:flex;gap:14px;align-items:stretch;min-height:0"><div style="flex:0 0 ${d.eqGiven ? 'auto' : '56%'};display:flex;flex-direction:column;justify-content:space-evenly;gap:4px;min-width:0">${rows.join('')}</div>` +
        `<div data-lcs-dots style="flex:1;min-width:0;background-color:${T.white};background-image:radial-gradient(circle,#C8BFAE 1.6px,transparent 1.8px);background-size:26px 24px;background-position:2px 2px;border:2px solid ${T.creamDeep};border-radius:12px"></div></div>`;
    };
    const rows = items.map((it, i) => `<div data-lcs-two-step="${i + 1}"${slot.attr(ctx, 'pic', i)} data-lcs-kind="${it.kind}"${d.lines ? ` data-lcs-est="${it.est}"${d.check && i === items.length - 1 ? ` data-lcs-claim="${it.claim}"` : ''}` : ''}${d.place ? ` data-lcs-nums="${[it.n1, it.o1, it.n2, it.o2, it.n3, it.s1, it.s2].join('|')}"` : ''} style="display:flex;flex-direction:column;gap:8px;padding:10px 14px;border-radius:14px;background:${T.cream}${d.place ? ';flex:1 1 0;min-height:0' : ''}">` +
      `<div style="font:600 ${d.font - fit}px/${fit ? 1.35 : 1.45} 'Nunito',sans-serif;color:${T.ink}">${i + 1}. ${esc(it.story)}</div>` +
      (d.lines ? linesOf(it, i === items.length - 1) : d.steps
        ? `<div style="display:flex;flex-wrap:wrap;gap:8px 28px;justify-content:center"><span style="${eqStyle}"><span data-lcs-step style="color:${T.teal}">a)</span> ${it.n1} ${op(it.o1)} ${it.n2} = ${box(it.s1)}</span>` +
          `<span style="${eqStyle}"><span data-lcs-step style="color:${T.teal}">b)</span> ${box(it.s1)} ${op(it.o2)} ${it.n3} = ${box(it.s2)}</span></div>`
        : d.place ? '' : `<div style="display:flex;justify-content:flex-end">${box(it.s2)}</div>`) +
      // the face told in a place: a dotted space to work in; where no steps are printed the answer box stands beside it
      (d.place && !d.lines ? `<div style="flex:1 1 auto;display:flex;gap:14px;align-items:stretch;min-height:40px"><div data-lcs-dots style="flex:1;min-width:0;background-color:${T.white};background-image:radial-gradient(circle,#C8BFAE 1.6px,transparent 1.8px);background-size:26px 24px;background-position:2px 2px;border:2px solid ${T.creamDeep};border-radius:12px"></div>${d.steps ? '' : `<div style="display:flex;align-items:center">${box(it.s2)}</div>`}</div>` : '') + '</div>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-two-steps${d.lines ? ` data-lcs-lines="${d.eqGiven ? 1 : 0}|${d.check ? 1 : 0}|${lab.letter}"` : ''}${d.place ? ` data-lcs-place="${d.max}|${d.tens ? 1 : 0}|${d.muldiv ? 2 : d.store ? 100 : 10}|${d.muldiv ? 1 : 0}"` : ''} style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">${rows.join('')}</div>`,
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
      // the face with an estimate (G3-487): the estimate is a whole hundred close to the answer, every card has its
      // labelled lines, and the card with a finished answer prints one that is far from the estimate
      const lines = document.querySelector('[data-lcs-two-steps]').dataset.lcsLines;
      if (lines !== undefined) {
        const [given, check, letter] = lines.split('|');
        rows.forEach((r, i) => {
          const P = 'story ' + (i + 1), e = +r.dataset.lcsEst, s2 = +(r.dataset.lcsNums || '').split('|')[6], w = r.dataset.lcsClaim;
          if (!(e >= 100) || e % 100 || Math.abs(e - s2) > 100) fails.push(`${P}: the estimate ${e} is no whole hundred within 100 of ${s2}`);
          if (r.querySelectorAll('[data-lcs-label]').length !== 3) fails.push(`${P}: ${r.querySelectorAll('[data-lcs-label]').length} labelled lines`);
          if (!r.textContent.includes(letter + ' =') && !r.textContent.includes('= ' + letter)) fails.push(`${P}: the letter ${letter} is not printed`);
          if (w !== undefined) {
            if (+w !== s2 && (Math.abs(+w - s2) < 200 || Math.abs(+w - e) < 200)) fails.push(`${P}: the printed answer ${w} is neither right nor far from ${s2}`);
            const says = r.querySelector('[data-lcs-says]'); if (!says || !says.textContent.includes(letter + ' = ' + w)) fails.push(`${P}: the finished answer is not printed`);
          }
          if (given === '1') {
            const bx = [...r.querySelectorAll('.ws-answerbox')].map((b) => b.getBoundingClientRect());
            if (bx.length !== 5) fails.push(`${P}: ${bx.length} boxes (four of the estimate and the answer)`);
            else if (bx.slice(0, 4).some((b) => Math.abs(b.top - bx[0].top) > 2)) fails.push(`${P}: the frame of the estimate breaks into two lines`);
          }
          // (the frame of the estimate ran under the dotted space on the easier page: US teacher-reviewer, 2026-11-14)
          { const dr = r.querySelector('[data-lcs-dots]'); const dl = dr ? dr.getBoundingClientRect().left : 0; if ([...r.querySelectorAll('.ws-answerbox')].some((b) => b.getBoundingClientRect().right > dl - 4)) fails.push(`${P}: a box runs under the dotted space`); }
          const dots = r.querySelector('[data-lcs-dots]'); if (!dots || dots.getBoundingClientRect().width < 150 || dots.getBoundingClientRect().height < 80) fails.push(`${P}: no room to work in`);
        });
        const withWrong = rows.filter((r) => r.dataset.lcsClaim !== undefined).length;
        if (withWrong !== (check === '1' ? 1 : 0)) fails.push(`${withWrong} card(s) with a finished answer`);
        if (check === '1' && rows[rows.length - 1].dataset.lcsClaim === undefined) fails.push('the card with a finished answer is not the last');
      }
      // the face told in a place (G2-511): the numbers of each story, stamped on its card
      const place = document.querySelector('[data-lcs-two-steps]').dataset.lcsPlace;
      if (place) {
        const [max, tens, min, md] = place.split('|').map(Number), answers = new Set(), told = [];
        const calc = (o, a, b) => (o === '+' ? a + b : o === 'x' ? a * b : o === ':' ? a / b : a - b);
        rows.forEach((r, i) => {
          const P = 'story ' + (i + 1), v = (r.dataset.lcsNums || '').split('|');
          const n1 = +v[0], o1 = v[1], n2 = +v[2], o2 = v[3], n3 = +v[4], s1 = +v[5], s2 = +v[6];
          if (calc(o1, n1, n2) !== s1 || calc(o2, s1, n3) !== s2) fails.push(`${P}: the steps do not give ${s2}`);
          if (md && ![o1, o2].some((o) => o === 'x' || o === ':')) fails.push(`${P}: no step multiplies or divides`);
          for (const x of [n1, n2, n3, s1, s2]) { if (x < min || x > max) fails.push(`${P}: ${x} is outside ${min} to ${max}`); if (tens && x % 10) fails.push(`${P}: ${x} is not a whole ten`); }
          if (new Set([n1, n2, n3, s1, s2]).size < 5) fails.push(`${P}: a number twice`);
          if (answers.has(s2)) fails.push(`${P}: an answer twice on the page`); answers.add(s2);
          // (the small numbers of a times table may meet again in another story: there the answers and the facts differ)
          if (!tens && !md && [n1, n2, n3].some((x) => told.includes(x))) fails.push(`${P}: a number of another story`); told.push(n1, n2, n3);
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
