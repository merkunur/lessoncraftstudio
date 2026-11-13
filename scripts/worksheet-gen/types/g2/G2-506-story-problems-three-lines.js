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
 * Only things that come by the dozen are counted (the engine's SMALL list: sweets, pencils, eggs …), so that 67 of
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

/** two-digit numbers for a story of a kind: { n1, n2, answer } */
function draw(kind, rng) {
  if (kind === 'add') { const n1 = rng.int(12, 78), n2 = rng.int(11, 99 - n1); return { n1, n2, answer: n1 + n2 }; }
  if (kind === 'sub') { const n1 = rng.int(31, 99), n2 = rng.int(11, n1 - 11); return { n1, n2, answer: n1 - n2 }; }
  const n1 = rng.int(25, 99), n2 = rng.int(11, n1 - 6); return { n1, n2, answer: n1 - n2 };   // compare: how many more
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
  i18n: { en: { title: 'Story Problems Within 100: Question, Equation, Answer', instruction: 'Read each story. If the question is missing, write it. Then write the equation and the answer.' } },
  levelSetWords(m) { return ((m && m.problems) || []).map((p) => p.vocabKey + ':' + p.frame); },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const loc = (locale || 'en').slice(0, 2);
    const L = LABELS[loc]; if (!L) throw new Error(`G2-506: no labels for ${loc}`);
    const fit = Number(ctx.wpFit) || 0;   // a page that ran past the footer is rebuilt one step tighter (cli qaRetries)
    const pool = W.nounsFor(theme, loc).filter((n) => W.maxFor(n.noun, 100) === 100);
    if (pool.length < d.kinds.length) throw new Error(`G2-506: theme ${theme}/${loc} has ${pool.length} things that come by the dozen < ${d.kinds.length}`);
    const nouns = rng.sample(pool, d.kinds.length);
    const names = W.namesFor(loc, false);
    const usedFrames = new Set(), drawn = [];
    const problems = d.kinds.map((kind, i) => {
      let nums = null;
      for (let t = 0; t < 400; t++) {
        const n = draw(kind, rng);
        if ([n.n1, n.n2].includes(n.answer) || n.n1 === n.n2) continue;
        if (drawn.some((q) => q.answer === n.answer || [q.n1, q.n2].sort().join() === [n.n1, n.n2].sort().join() || q.n1 === n.n1 || q.n2 === n.n2)) continue;
        nums = n; break;
      }
      if (!nums) throw new Error('G2-506: no numbers for ' + kind);
      drawn.push(nums);
      const noun = nouns[i];
      const all = W.framesFor(loc, kind).map((f) => W.newFrame(f, loc)).filter((f) => f.lastIndexOf('. ') > 0 && /\?\s*$/.test(f));
      const fits = all.filter((f) => W.frameFits(f, noun.noun, loc));
      const list = fits.length ? fits : all;
      if (!list.length) throw new Error(`G2-506: no frame of two sentences for ${kind}/${loc}`);
      const free = list.filter((f) => !usedFrames.has(f));
      const tpl = rng.pick(free.length ? free : list); usedFrames.add(tpl);
      const name = rng.pick(names);
      const name2 = rng.pick(names.filter((n) => n !== name && n.slice(0, 4) !== name.slice(0, 4)));
      const sentence = W.fill(tpl, { name, name2, n1: nums.n1, n2: nums.n2, n3: null, noun: noun.text, gender: noun.gender }, loc);
      const cut = sentence.lastIndexOf('. ');
      if (cut < 0) throw new Error('G2-506: a story without a question sentence: ' + sentence);
      return { kind, ...nums, noun: noun.noun, vocabKey: noun.vocabKey, frame: kind + ':' + tpl.length + ':' + tpl.slice(0, 12), story: sentence.slice(0, cut + 1), question: sentence.slice(cut + 2) };
    });
    // which stories lose their question: drawn, never the same place on every page
    // never a compare story: two amounts side by side take two honest questions (how many more? how many together?),
    // and the second one leaves the hundred; a story in which something comes or goes has one natural question
    const lost = new Set(rng.sample(problems.map((p, i) => (p.kind === 'compare' ? -1 : i)).filter((i) => i >= 0), d.missing));
    const font = 17 - fit, lineH = Math.max(26, 32 - 2 * fit);
    const label = (s) => `<span style="font-family:'Nunito';font-weight:800;font-size:14px;color:${T.teal};white-space:nowrap;align-self:end;padding-bottom:3px">${s}${loc === 'fr' ? '\u00A0' : ''}:</span>`;
    const line = (extra, inner) => `<span ${extra || ''} style="display:flex;align-items:flex-end;min-width:0;height:${lineH}px;border-bottom:2px solid ${T.grid};font-family:'Baloo 2';font-weight:700;font-size:20px;color:${T.coral};line-height:1;padding:0 6px 2px">${inner || ''}</span>`;
    const cards = problems.map((p, i) => {
      const eq = key ? `${p.n1} ${p.kind === 'add' ? '+' : MINUS} ${p.n2} = ${p.answer}` : '';
      const q = lost.has(i)
        ? line('data-lcs-qline', key ? `<span data-lcs-key-sample="1" style="font-family:'Nunito';font-weight:700;font-size:14px">${p.question}</span>` : '')
        : `<span data-lcs-question style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.35;color:${T.ink};align-self:end">${p.question}</span>`;
      return `<div class="ws-card-stage" data-lcs-fra="${p.kind}|${p.n1}|${p.n2}|${p.answer}" style="flex:1 0 auto;flex-direction:column;align-items:stretch;justify-content:center;gap:10px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:14px 20px">` +
        `<div style="display:flex;align-items:center;gap:14px"><span data-lcs-thing style="flex:0 0 auto;display:inline-flex">${W.iconImg(theme, p.noun, 46)}</span>` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.4;color:${T.ink};margin:0" data-lcs-sentence>${p.story}</p></div>` +
        `<div style="display:grid;grid-template-columns:auto 1fr;column-gap:12px;row-gap:${8 - fit}px;align-items:end">` +
        `${label(L[0])}${q}${label(L[1])}${line('data-lcs-eqline', eq)}${label(L[2])}${line(`data-lcs-answer="${p.answer}"`, key ? `<span data-lcs-keytext>${p.answer}</span>` : '')}` +
        `</div></div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-fra-page="${d.missing}" style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:stretch">${cards.join('')}</div>`;
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
        if (want !== ans || ans < 1 || ans > 99 || a < 10 || b < 10 || a > 99) fails.push(`${P}: ${a} and ${b} do not give ${ans} within 100`);
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
      if (lost !== missing) fails.push(`${lost} stories without a question, the level has ${missing}`);
      return [...new Set(fails)];
    });
  },
};
