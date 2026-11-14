/**
 * G2-506 — Story Problems Within 100: Question, Equation, Answer (Year pages O, 2026-11-13; 2.OA.A.1; de
 * "Sachaufgaben: Frage, Rechnung, Antwort", sv "räknehändelser 0–100"). Three one-step stories a page with two-digit
 * numbers. Under each story stand three labelled lines: the question, the equation, the answer. At level 1 every
 * question is printed; at level 2 the question of ONE story is missing and the child writes it; at level 3 the
 * questions of two stories are missing (never of the compare story: two amounts side by side take two honest questions). Level 1 has two put-together / add-to stories and one take-away story; levels
 * 2 and 3 have one add, one take-away and one compare story ("how many more").
 *
 * The stories are the native frames of the story-problem engine (lib/word-problems-levelset.js: the reviewed frames,
 * names and noun allow-list, {Q} agreement, fr elision), split at their last sentence: the story, and its question.
 * Only things that come by the dozen are counted (the engine's SMALL list: sweets, pencils, eggs …), and every story
 * is set in a PLACE (a table, a box, a shelf, a basket: the bank's place frames and data/word-problems/
 * within-100-frames.json), never in a child's hands: "Elias has 53 forks and buys 44 more" made the teacher-reviewer
 * smile, "there are 53 forks in a box" does not. A child is named in at most one story of a page. So 67 of
 * them is a believable number; a theme with fewer than three such things is refused. Nothing is counted in a picture:
 * one picture of the thing stands beside the story. No two stories of a page share an answer or a pair of numbers,
 * and no answer is a number the story prints. Printed page only.
 * A story whose question is missing may take more than one honest question (51 on Monday and 45 on Tuesday: how many
 * in all? how many more on Monday?): the instruction asks for "a question that fits", and the answer line of the key
 * shows the answer to the question of the story bank (native reader, 2026-11-13).
 */
'use strict';
const W = require('../../lib/word-problems-levelset.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { kinds: ['add', 'sub', 'add'], missing: 0 },
  2: { kinds: ['add', 'sub', 'compare'], missing: 1 },
  3: { kinds: ['compare', 'add', 'sub'], missing: 2 },
};
// the three line labels, in the words of each language's primary school (read by a native reader, 2026-11-13)
const LABELS = {
  en: ['Question', 'Equation', 'Answer'], de: ['Frage', 'Rechnung', 'Antwort'], es: ['Pregunta', 'Operación', 'Respuesta'],
  pt: ['Pergunta', 'Conta', 'Resposta'], fr: ['Question', 'Calcul', 'Réponse'], it: ['Domanda', 'Operazione', 'Risposta'],
  nl: ['Vraag', 'Som', 'Antwoord'], sv: ['Fråga', 'Uträkning', 'Svar'], da: ['Spørgsmål', 'Regnestykke', 'Svar'],
  no: ['Spørsmål', 'Regnestykke', 'Svar'], fi: ['Kysymys', 'Lasku', 'Vastaus'],
};
const MINUS = '−';
// the frames written for two-digit numbers (data/word-problems/within-100-frames.json explains why)
const BIG = require('../../data/word-problems/within-100-frames.json');
/** true when the first amount of a frame belongs to nobody: no name stands before it ("There are 53 forks in a box") */
const inPlace = (f) => { const i = f.indexOf('{n1}'); return i > 0 && !f.slice(0, i).includes('{name'); };
// what fits where (native reader, 2026-11-13): loose berries are not kept on a shelf; and where the story says the
// things LIE on a shelf or a table (de liegen, nl liggen, sv / da / no ligger), a thing that stands is told in a box
const BERRY = new Set(['raspberry', 'blackberry', 'blueberry', 'cherry']);
const STANDS = new Set(['cup', 'car', 'race_car', 'dinosaur']);
const SHELF = { en: /shelf/, de: /Regal/, es: /estante/, pt: /prateleira/, fr: /étagère/, it: /scaffale/, nl: /plank/, sv: /hylla/, da: /hylde/, no: /hyll[ea]/, fi: /[Hh]ylly/ };
const LIES_ON = { de: /(Regal|Tisch)/, nl: /(plank|tafel)/, sv: /(hylla|bord)/, da: /(hylde|bord)/, no: /(hyll[ea]|bord)/ };
const fitsHere = (f, noun, loc) => W.frameFits(f, noun, loc) && !(BERRY.has(noun) && SHELF[loc].test(f)) && !(STANDS.has(noun) && LIES_ON[loc] && LIES_ON[loc].test(f));

/** two-digit numbers for a story of a kind: { n1, n2, answer } */
function draw(kind, rng) {
  if (kind === 'add') { const n1 = rng.int(12, 78), n2 = rng.int(11, 99 - n1); return { n1, n2, answer: n1 + n2 }; }
  if (kind === 'sub') { const n1 = rng.int(31, 99), n2 = rng.int(11, n1 - 11); return { n1, n2, answer: n1 - n2 }; }
  const n1 = rng.int(25, 99), n2 = rng.int(11, n1 - 6); return { n1, n2, answer: n1 - n2 };   // compare: how many more
}

/** numbers within `max` (10 or 20) for the page with small numbers (G1-571): within 20 the larger amount is 11 to 20 */
function drawSmall(kind, max, rng) {
  const low = max === 20 ? 11 : 5;
  if (kind === 'add') { const sum = rng.int(low, max), n1 = rng.int(2, sum - 2); return { n1, n2: sum - n1, answer: sum }; }
  // two amounts side by side: the first question a 7-year-old writes is "how many in all?", so the SUM stays within
  // `max` too (19 and 2 gave 21 on a page called "within 20"; native reader 2026-11-14)
  if (kind === 'compare') { const n1 = rng.int(low, max - 2), n2 = rng.int(2, Math.min(n1 - 2, max - n1)); return { n1, n2, answer: n1 - n2 }; }
  const n1 = rng.int(low, max), n2 = rng.int(2, n1 - 2); return { n1, n2, answer: n1 - n2 };   // take away
}

module.exports = {
  id: 'G2-506',
  slug: 'story-problems-question-equation-answer',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3 },
  difficulty: D,
  LABELS,
  // the rules of fit for stories with two-digit numbers, for the other pages that tell them (types/_shared/story-model.js)
  storyFit: { inPlace, fitsHere, BIG },
  i18n: { en: { title: 'Story Problems Within 100: Question, Equation, Answer', instruction: 'Read each story. If the question is missing, write it. Then write the equation and the answer.' } },
  levelSetWords(m) { return ((m && m.problems) || []).map((p) => p.vocabKey + ':' + p.frame); },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const loc = (locale || 'en').slice(0, 2);
    const L = LABELS[loc]; if (!L) throw new Error(`G2-506: no labels for ${loc}`);
    const fit = Number(ctx.wpFit) || 0;   // a page that ran past the footer is rebuilt one step tighter (cli qaRetries)
    // d.max (G1-571, numbers within 10 or 20): any thing of the story bank, told in a place or in a child's hands
    // (no big thing there: a child does not buy 17 pineapples and lose 15 — the engine's test for a thing too big for a basket)
    const pool = W.nounsFor(theme, loc).filter((n) => (d.max ? W.frameFits('in a basket', n.noun, 'en') : W.maxFor(n.noun, 100) === 100));
    if (pool.length < d.kinds.length) throw new Error(`${this.id}: theme ${theme}/${loc} has ${pool.length} things that come by the dozen < ${d.kinds.length}`);
    const names = W.namesFor(loc, false);
    let problems = null;
    for (let attempt = 0; attempt < 40; attempt++) {
    // (a page whose stories would be told twice in the same words — two things that stand, one box frame — draws
    // its things again)
    const nouns = rng.sample(pool, d.kinds.length);
    // two things with one word (fr "ballons": balls and balloons) are not told on one page
    if (new Set(nouns.map((n) => n.text)).size < nouns.length && attempt < 39) continue;
    const usedFrames = new Set(), drawn = [], usedNames = []; let twice = false;
    problems = d.kinds.map((kind, i) => {
      let nums = null;
      for (let t = 0; t < 400; t++) {
        const n = d.max ? drawSmall(kind, d.max, rng) : draw(kind, rng);
        if ([n.n1, n.n2].includes(n.answer) || n.n1 === n.n2) continue;
        if (drawn.some((q) => q.answer === n.answer || [q.n1, q.n2].sort().join() === [n.n1, n.n2].sort().join() || q.n1 === n.n1 || q.n2 === n.n2)) continue;
        nums = n; break;
      }
      if (!nums) throw new Error('G2-506: no numbers for ' + kind);
      drawn.push(nums);
      const noun = nouns[i];
      // only stories in which the things lie in a PLACE (the first amount is nobody's): the bank's place frames and
      // the frames written for two-digit numbers
      const all = [...W.framesFor(loc, kind).map((f) => W.newFrame(f, loc)), ...((BIG[loc] || {})[kind] || [])]
        .filter((f) => f.lastIndexOf('. ') > 0 && /\?\s*$/.test(f) && (d.max || inPlace(f)));
      const list = all.filter((f) => fitsHere(f, noun.noun, loc));
      if (!list.length) throw new Error(`G2-506: no frame of two sentences for ${kind}/${loc}/${noun.noun}`);
      const free = list.filter((f) => !usedFrames.has(f));
      if (!free.length) twice = true;
      const tpl = rng.pick(free.length ? free : list); usedFrames.add(tpl);
      // a child is named once on a page: two stories about Elias read as one story (teacher review 2026-11-13)
      const freeNames = names.filter((n) => !usedNames.some((u) => u === n || u.slice(0, 4) === n.slice(0, 4)));
      const name = rng.pick(freeNames);
      const name2 = rng.pick(freeNames.filter((n) => n !== name && n.slice(0, 4) !== name.slice(0, 4)));
      for (const n of [name, name2]) if (tpl.includes(n === name ? '{name}' : '{name2}')) usedNames.push(n);
      const sentence = W.fill(tpl, { name, name2, n1: nums.n1, n2: nums.n2, n3: null, noun: noun.text, gender: noun.gender }, loc);
      const cut = sentence.lastIndexOf('. ');
      if (cut < 0) throw new Error('G2-506: a story without a question sentence: ' + sentence);
      return { kind, ...nums, noun: noun.noun, vocabKey: noun.vocabKey, frame: kind + ':' + tpl.length + ':' + tpl.slice(0, 12), story: sentence.slice(0, cut + 1), question: sentence.slice(cut + 2), names: [tpl.includes('{name}') ? name : null, tpl.includes('{name2}') ? name2 : null].filter(Boolean) };
    });
    if (!twice) break;
    }
    // which stories lose their question: drawn, never the same place on every page
    // never a compare story: two amounts side by side take two honest questions (how many more? how many together?),
    // and the second one leaves the hundred; a story in which something comes or goes has one natural question
    // (d.anyQuestion, G1-571 level 3: the lesson is "make up a question", so the compare story loses its question too)
    const lost = new Set(rng.sample(problems.map((p, i) => (p.kind === 'compare' && !d.anyQuestion ? -1 : i)).filter((i) => i >= 0), d.missing));
    const font = 17 - fit, lineH = Math.max(26, 32 - 2 * fit);
    // (the label of a PRINTED question stands on the question's first line: a question of two lines kept its label on
    // the second one, and the first line read as story text — teacher review 2026-11-13)
    const label = (s, first) => `<span style="font-family:'Nunito';font-weight:800;font-size:14px;color:${T.teal};white-space:nowrap;${first ? 'align-self:baseline' : 'align-self:end;padding-bottom:3px'}">${s}${loc === 'fr' ? '\u00A0' : ''}:</span>`;
    const line = (extra, inner) => `<span ${extra || ''} style="display:flex;align-items:flex-end;min-width:0;height:${lineH}px;border-bottom:2px solid ${T.grid};font-family:'Baloo 2';font-weight:700;font-size:20px;color:${T.coral};line-height:1;padding:0 6px 2px">${inner || ''}</span>`;
    const cards = problems.map((p, i) => {
      const eq = key ? `${p.n1} ${p.kind === 'add' ? '+' : MINUS} ${p.n2} = ${p.answer}` : '';
      const q = lost.has(i)
        ? line('data-lcs-qline', key ? `<span data-lcs-key-sample="1" style="font-family:'Nunito';font-weight:700;font-size:14px">${p.question}</span>` : '')
        : `<span data-lcs-question style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.35;color:${T.ink};align-self:baseline">${p.question}</span>`;
      return `<div class="ws-card-stage" data-lcs-fra="${p.kind}|${p.n1}|${p.n2}|${p.answer}" data-lcs-names="${p.names.join('|')}" style="flex:1 0 auto;flex-direction:column;align-items:stretch;justify-content:center;gap:10px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:14px 20px">` +
        `<div style="display:flex;align-items:center;gap:14px"><span data-lcs-thing style="flex:0 0 auto;display:inline-flex">${W.iconImg(theme, p.noun, 46)}</span>` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.4;color:${T.ink};margin:0" data-lcs-sentence>${p.story}</p></div>` +
        `<div style="display:grid;grid-template-columns:auto 1fr;column-gap:12px;row-gap:${8 - fit}px;align-items:end">` +
        `${label(L[0], !lost.has(i))}${q}${label(L[1])}${line('data-lcs-eqline', eq)}${label(L[2])}${line(`data-lcs-answer="${p.answer}"`, key ? `<span data-lcs-keytext>${p.answer}</span>` : '')}` +
        `</div></div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-fra-page="${d.missing}"${d.max ? ` data-lcs-fra-max="${d.max}"` : ''} style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:stretch">${cards.join('')}</div>`;
    return { bodyHtml, meta: { problems: problems.map(({ kind, n1, n2, answer, vocabKey, frame }) => ({ kind, n1, n2, answer, vocabKey, frame })) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const box = document.querySelector('[data-lcs-fra-page]'); if (!box) return ['no content'];
      const missing = +box.dataset.lcsFraPage;
      const cards = [...document.querySelectorAll('[data-lcs-fra]')];
      if (cards.length !== 3) fails.push(cards.length + ' stories');
      const has = (t, n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(t);
      const answers = new Set(); let lost = 0;
      cards.forEach((c, i) => {
        const P = 'story ' + (i + 1);
        const [kind, a, b, ans] = c.dataset.lcsFra.split('|').map((v, k) => (k ? +v : v));
        const want = kind === 'add' ? a + b : a - b;
        const small = +box.dataset.lcsFraMax || 0;
        if (small) { if (want !== ans || [a, b, ans].some((v) => v < 2 || v > small)) fails.push(`${P}: ${a} and ${b} do not give ${ans} within ${small}`); }
        else if (want !== ans || ans < 1 || ans > 99 || a < 10 || b < 10 || a > 99) fails.push(`${P}: ${a} and ${b} do not give ${ans} within 100`);
        if (ans === a || ans === b) fails.push(`${P}: the answer is a printed number`);
        if (answers.has(ans)) fails.push(`${P}: an answer twice on the page`); answers.add(ans);
        const story = (c.querySelector('[data-lcs-sentence]') || {}).textContent || '';
        const q = c.querySelector('[data-lcs-question]'), ql = c.querySelector('[data-lcs-qline]');
        if (!!q === !!ql) fails.push(`${P}: a printed question OR a line for it`);
        if (ql) lost++;
        const whole = story + ' ' + (q ? q.textContent : '');
        if (!has(whole, a) || !has(whole, b)) fails.push(`${P}: a number is not in the story`);
        if (has(whole, ans)) fails.push(`${P}: the answer is in the story`);
        if (/[{}]/.test(whole)) fails.push(`${P}: unfilled slot`);
        if (/\?/.test(story)) fails.push(`${P}: the story still holds its question`);
        if (q && !/\?\s*$/.test(q.textContent)) fails.push(`${P}: the question does not end with a question mark`);
        const al = c.querySelector('[data-lcs-answer]');
        if (!al || +al.dataset.lcsAnswer !== ans) fails.push(`${P}: answer line != ${ans}`);
        if (!c.querySelector('[data-lcs-eqline]')) fails.push(`${P}: no equation line`);
        for (const l of c.querySelectorAll('[data-lcs-eqline],[data-lcs-answer],[data-lcs-qline]')) if (l.getBoundingClientRect().width < 300) fails.push(`${P}: a writing line shorter than 300 px`);
        if (c.querySelectorAll('[data-lcs-thing] img').length !== 1) fails.push(`${P}: one picture of the thing`);
        const cr = c.getBoundingClientRect();
        c.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(`${P}: something runs out of the card`); });
      });
      const seen = [];
      for (const c of cards) for (const n of (c.dataset.lcsNames || '').split('|').filter(Boolean)) { if (seen.includes(n)) fails.push('the name ' + n + ' stands in two stories'); seen.push(n); }
      if (lost !== missing) fails.push(`${lost} stories without a question, the level has ${missing}`);
      return [...new Set(fails)];
    });
  },
};
