/**
 * info-text-g2b.js — two more Grade 2 pages on an informational text (English literacy year, Daily Teaching System
 * Part 12.3, 2026-11-16; unit "Reading to Learn: Information Texts", Grade 2).
 *
 *   diagram   What the Diagram Shows (RI.2.7: explain how specific images, e.g. a diagram, contribute to and clarify
 *             a text). Texts: key `g2d` of data/literacy/info-texts.en.json — two paragraphs (about 115 words) and a
 *             cycle diagram of four or five DRAWN stages (primitives/life-stage.js, plant-figure.js; the moon is
 *             drawn here on a dark sky) with a label under each stage, an arrow from each stage to the next and a
 *             long arrow from the last back to the first. The text tells what happens; the diagram holds the names
 *             of the stages, their order and their number (the text names only the labels listed in `textNames` and
 *             never says how many stages there are).
 *               level 1  five questions with three answers each (1 to 4 from the diagram, 5 from text and diagram)
 *               level 2  three before-and-after questions, "what does the diagram show that the text does not tell
 *                        you?" and the text-and-diagram question, all written
 *               level 3  one label and one arrow (never the long one) are missing: add them; one before-or-after
 *                        question, what the diagram adds, the text-and-diagram question and why the long arrow
 *                        leads back, all written
 *   steps     Steps in Order (RI.2.3: describe the connection between ... steps in technical procedures in a
 *             text). Texts: key `g2s` — an opening paragraph and four steps that begin with First, Next, Then and
 *             Finally (about 135 words), three library pictures.
 *               level 1  number four step statements 1 to 4; three questions with three answers each (the signal
 *                        word of a step named by what it tells, a detail, why one step must come before another)
 *               level 2  a flow chart of four boxes with two lines each; the first word of each step is given
 *               level 3  the flow chart without first words, and the why-question to write
 *   source    Text or Diagram? (RI.2.7, the other half: what does the diagram add to the text?). The `g2d` texts with
 *             their whole diagram and facts in a table: the child checks whether the fact is learned from the text
 *             or from the diagram (`facts`: three of each; a diagram fact is a name, an order or something a drawing shows).
 *               level 1  four facts          level 2  six facts
 *               level 3  four facts, one more fact of the diagram to write, and how the diagram helps to understand the text
 *   beforeafter  Before and After (RI.2.3: how the steps of a text hang together in time). The `g2s` texts and their
 *             four steps as short clauses (`clauses`).
 *               level 1  six sentences about two steps each (every pair once): circle before or after
 *               level 2  what happens in the step right before the second step / right after the third step (written),
 *                        and before or after to write into a sentence about the two middle steps
 *               level 3  three sentences to finish that begin "Before ..." or "After ..." (three lines each), and one
 *                        of the child's own
 *
 * English only. Themeless: a copy is another text (meta.items names the text). PDF only.
 * The bank is checked when this file loads (faultsOfDiagram, faultsOfSteps); no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/info-texts.en.json');
const { lifeStage, STAGE_IDS } = require('../../primitives/life-stage.js');
const { plantStage } = require('../../primitives/plant-figure.js');
const { litSideOf } = require('../../primitives/moon-phase.js');
const { placesFor, _parts } = require('./info-text.js');
const { W, esc, shuffle, line, choices, placed } = _parts;

const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
const textOf = (t) => t.paras.map((p) => p.join(' ')).join(' ');
const has = (text, word) => new RegExp('(^|[^A-Za-z])' + String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^A-Za-z]|$)', 'i').test(text);
const count = (text, re) => (text.match(re) || []).length;
const NUMBER = { 3: 'three', 4: 'four', 5: 'five', 6: 'six' };
const PLANT_STAGES = ['seed', 'sprout', 'seedling', 'young', 'flowering', 'fruiting'];
const SIGNALS = ['First', 'Next', 'Then', 'Finally'];
const ADDS_Q = 'What does the diagram show that the text does not tell you?';

/* ------------------------------------------------------------------ the bank's own checks */

/** the label a diagram question reads, and the label that answers it (null = the bank cannot check the question) */
function readsOf(t, x) {
  const st = t.diagram.stages, n = st.length, at = (label) => st.findIndex((s) => s.label === label);
  let m;
  if (/^How many (stages|phases) does the diagram show\?$/.test(x.q)) return { count: true, want: NUMBER[n] };
  // (2026-11-19, review en.review-1119-read: a diagram that shows SOME of the phases is asked "In this diagram, which phase
  // comes after the new moon?" — "right after the new moon" is a crescent in the sky, not the first quarter)
  if ((m = /comes right after the (.+)\?$/.exec(x.q)) || (m = /^In this diagram, which (?:stage|phase) comes after the (.+)\?$/.exec(x.q)) || (m = /arrow from the (.+) point to\?$/.exec(x.q))) { const i = at(m[1]); return i < 0 ? null : { from: i, to: (i + 1) % n, names: [i, (i + 1) % n], want: 'the ' + st[(i + 1) % n].label }; }
  if ((m = /comes just before the (.+)\?$/.exec(x.q))) { const i = at(m[1]); return i < 0 ? null : { from: (i - 1 + n) % n, to: i, names: [i, (i - 1 + n) % n], want: 'the ' + st[(i - 1 + n) % n].label }; }
  return null;
}
/** may the hardest level ask this question? (not when it names the stage without a label or reads the missing arrow) */
function usableAt3(t, x) {
  const b = t.diagram.blank, label = t.diagram.stages[b].label;
  if (x.from === 'both') return x.answer !== 'the ' + label && !has(x.q, label);
  const r = readsOf(t, x);
  return !!r && (r.count || (!r.names.includes(b) && r.from !== t.diagram.gap));
}

function faultsOfDiagram(t) {
  const f = [], id = t.id;
  if (!Array.isArray(t.paras) || t.paras.length !== 2) return [id + ': not two paragraphs'];
  const text = textOf(t), n0 = wordsIn(text);
  if (n0 < 95 || n0 > 135) f.push(`${id}: ${n0} words (a text with a diagram has 95 to 135)`);
  t.paras.flat().forEach((s) => { if (wordsIn(s) > 20) f.push(`${id}: a sentence of ${wordsIn(s)} words`); });
  if (!/diagram/.test(t.paras[0].join(' '))) f.push(id + ': the first paragraph does not send the child to the diagram');
  const d = t.diagram || {}, st = d.stages || [], n = st.length;
  if (!d.title || (n !== 4 && n !== 5)) return [...f, id + ': the diagram has no title or not four or five stages'];
  if (new Set(st.map((s) => s.label)).size !== n) f.push(id + ': two stages share a label');
  if (has(text, NUMBER[n])) f.push(`${id}: the text says "${NUMBER[n]}" (how many stages there are is for the diagram to show)`);
  st.forEach((s) => {
    const a = s.art || {};
    const ok = (a.kind === 'life' && STAGE_IDS[a.animal] && STAGE_IDS[a.animal].includes(a.stage)) || (a.kind === 'plant' && PLANT_STAGES.includes(a.stage)) || (a.kind === 'moon' && [0, 2, 4, 6].includes(a.phase));
    if (!ok) f.push(`${id}: the stage "${s.label}" has no drawing`);
    if (s.label.length > 20) f.push(`${id}: the label "${s.label}" is too long for its place`);
    const named = (t.textNames || []).includes(s.label);
    if (named && !has(text, s.label)) f.push(`${id}: the text is said to name "${s.label}" and does not`);
    if (!named && has(text, s.label)) f.push(`${id}: the text names the stage "${s.label}" (the diagram is to tell it)`);
  });
  if (!Number.isInteger(d.blank) || !st[d.blank]) return [...f, id + ': no stage to leave without a label'];
  if (!Number.isInteger(d.gap) || d.gap < 0 || d.gap > n - 2 || (d.gap !== d.blank && d.gap !== d.blank - 1)) f.push(`${id}: the arrow left out on the hardest level is the arrow back to the first stage or not next to the stage without a label`);
  if (!has(text, st[d.blank].label)) f.push(`${id}: the label left out on the hardest level ("${st[d.blank].label}") is not in the text`);
  const qs = t.questions || [];
  if (qs.length !== 5 || qs.slice(0, 4).some((x) => x.from !== 'diagram') || qs[4].from !== 'both') return [...f, id + ': not four diagram questions and then one for text and diagram'];
  if (new Set(qs.map((x) => x.answer)).size !== 5) f.push(id + ': two questions have the same answer');
  for (const x of qs) {
    if (!/\?$/.test(x.q)) f.push(`${id}: "${x.q}" has no question mark`);
    if (!Array.isArray(x.wrong) || x.wrong.length !== 2 || new Set([x.answer, ...x.wrong]).size !== 3) f.push(`${id}: "${x.q}" has not one right and two different wrong answers`);
    if (x.from === 'diagram') {
      const r = readsOf(t, x);
      if (!r) f.push(`${id}: the bank cannot check "${x.q}" against the diagram`);
      else if (r.want !== x.answer) f.push(`${id}: "${x.q}" is answered "${x.answer}"; the diagram says "${r.want}"`);
      if (r && !r.count) for (const w of x.wrong || []) if (!st.some((s) => 'the ' + s.label === w)) f.push(`${id}: the wrong answer "${w}" is no stage of the diagram`);
    } else {
      const lab = st.find((s) => 'the ' + s.label === x.answer);
      if (!lab) f.push(`${id}: the text-and-diagram question is not answered by a label`);
      else if (has(text, lab.label)) f.push(`${id}: the text-and-diagram question is answered by the text alone ("${lab.label}")`);
      if (!/text/.test(x.q) || !/diagram/.test(x.q)) f.push(`${id}: the text-and-diagram question does not name both`);
    }
  }
  // a before-or-after question whose two stages are next to each other in the diagram but NOT in nature (the diagram shows
  // only some of the phases of the moon; a bean plant grows from a seedling into a young plant before it flowers) is true
  // only of the diagram, and says so: "In this diagram, which phase comes after the new moon?" (review en.review-1119-read:
  // "Which phase comes right after the new moon? — the first quarter" is false; a crescent comes next)
  const realAt = (a) => (a.kind === 'moon' ? a.phase : a.kind === 'plant' ? PLANT_STAGES.indexOf(a.stage) : (STAGE_IDS[a.animal] || []).indexOf(a.stage));
  for (const x of qs) {
    const r = x.from === 'diagram' && !/arrow/.test(x.q) && readsOf(t, x);
    if (!r || r.count || r.to === 0) continue;
    const gap = realAt(st[r.to].art) - realAt(st[r.from].art);
    if (gap !== 1 && !/^In this diagram, /.test(x.q)) f.push(`${id}: "${x.q}" is true only of the diagram (it leaves out what comes between in nature): ask "In this diagram, ..."`);
  }
  const kinds = qs.slice(0, 4).map((x) => readsOf(t, x));
  if (kinds.every(Boolean)) {
    if (kinds.filter((r) => r.count).length !== 1) f.push(id + ': not one how-many question among the four diagram questions');
    if (!qs.slice(0, 4).some((x) => !readsOf(t, x).count && usableAt3(t, x)) || !usableAt3(t, qs[4])) f.push(id + ': no before-or-after question (or no text-and-diagram question) is left for the hardest level');
  }
  if (!t.adds || t.adds.q !== ADDS_Q || !t.adds.sample || t.adds.sample.length > 62) f.push(id + ': no "what does the diagram show that the text does not tell" question with a sample answer of one line');
  if (!t.explain || !/\?$/.test(t.explain.q || '') || !t.explain.sample) f.push(id + ': no why-question with a sample answer');
  if (!t.helps || !/\.$/.test(t.helps) || t.helps.length > 62) f.push(id + ': no sample of how the diagram helps (one line)');
  // the facts of the page Text or Diagram?
  const fc = t.facts || {};
  if (!Array.isArray(fc.text) || fc.text.length !== 3 || !Array.isArray(fc.diagram) || fc.diagram.length !== 3) f.push(id + ': not three facts of the text and three of the diagram');
  else {
    const labels = st.map((s) => s.label), at = (l) => labels.indexOf(l);
    const hidden = (s) => labels.filter((l) => !(t.textNames || []).includes(l) && has(s, l));   // names only the diagram gives
    const all = [...fc.text, ...fc.diagram].map((x) => (typeof x === 'string' ? x : x.s));
    if (new Set(all).size !== 6 || all.some((x) => !/\.$/.test(x) || x.length > 66)) f.push(id + ': the six facts are not six different sentences of at most 66 letters');
    for (const x of fc.text) { if (typeof x !== 'string') f.push(id + ': a text fact is no plain sentence'); else if (hidden(x).length) f.push(`${id}: the text fact "${x}" names "${hidden(x)[0]}", which only the diagram tells`); }
    for (const x of fc.diagram) {
      const sx = typeof x === 'string' ? x : x.s, pic = typeof x !== 'string' && x.picture;
      let m, ok = null;
      if ((m = /^The (?:stage|phase) after the (.+) is called the (.+)\.$/.exec(sx))) ok = at(m[1]) >= 0 && at(m[2]) === (at(m[1]) + 1) % n;
      else if ((m = /^The (?:stage|phase) before the (.+) is called the (.+)\.$/.exec(sx))) ok = at(m[1]) >= 0 && at(m[2]) === (at(m[1]) - 1 + n) % n;
      else if ((m = /^The (.+) comes before the (.+)\.$/.exec(sx))) ok = at(m[1]) >= 0 && at(m[2]) === at(m[1]) + 1;
      else if ((m = /^The (.+) comes after the (.+)\.$/.exec(sx))) ok = at(m[2]) >= 0 && at(m[1]) === at(m[2]) + 1;
      if (ok === false) f.push(`${id}: the diagram fact "${sx}" is not what the diagram shows`);
      if (ok === null && !pic) f.push(`${id}: the bank cannot check the diagram fact "${sx}" (mark it \`picture\` if a drawing shows it)`);
      if (!pic && !hidden(sx).length) f.push(`${id}: the diagram fact "${sx}" names no stage that only the diagram tells`);
    }
  }
  return f;
}

function faultsOfSteps(t) {
  const f = [], id = t.id;
  if (!Array.isArray(t.paras) || t.paras.length < 5 || t.paras.length > 6) return [id + ': not an opening paragraph, four steps and at most one closing paragraph'];
  const text = textOf(t), n0 = wordsIn(text);
  if (n0 < 115 || n0 > 165) f.push(`${id}: ${n0} words (a how-it-is-made text has 115 to 165)`);
  t.paras.flat().forEach((s) => { if (wordsIn(s) > 22) f.push(`${id}: a sentence of ${wordsIn(s)} words`); });
  SIGNALS.forEach((s, i) => {
    if (!new RegExp('^' + s + ', ').test(t.paras[i + 1][0])) f.push(`${id}: step ${i + 1} does not begin with "${s}"`);
    if (count(text, new RegExp('(^|[^A-Za-z])' + s + '([^A-Za-z]|$)', 'gi')) !== 1) f.push(`${id}: the word "${s}" stands in the text more than once`);
  });
  if (!Array.isArray(t.steps) || t.steps.length !== 4 || new Set(t.steps).size !== 4) f.push(id + ': not four different step statements');
  else t.steps.forEach((s) => { if (!/\.$/.test(s) || s.length > 62) f.push(`${id}: the step "${s}" has no period or is longer than 62 letters`); if (SIGNALS.some((w) => has(s, w))) f.push(`${id}: the step "${s}" holds a signal word`); });
  if (!Array.isArray(t.pictures) || t.pictures.length !== 3 || new Set(t.pictures.map((p) => p.theme + '/' + p.noun)).size !== 3 || t.pictures.some((p) => !p.theme || !p.noun)) f.push(id + ': not three different pictures');
  const mc = t.mc || [];
  if (mc.map((x) => x.kind).join() !== 'signal,detail,before') f.push(id + ': the questions to circle are not signal, detail, before');
  for (const x of mc) {
    if (!/\?$/.test(x.q)) f.push(`${id}: "${x.q}" has no question mark`);
    if (!Array.isArray(x.wrong) || x.wrong.length !== 2 || new Set([x.answer, ...x.wrong]).size !== 3) f.push(`${id}: "${x.q}" has not one right and two different wrong answers`);
    if (x.kind === 'signal') {
      // the step is named by what it tells, never by its place (a question about "the first step" answers itself)
      if (![1, 2, 3, 4].includes(x.step) || SIGNALS[x.step - 1] !== x.answer) f.push(`${id}: "${x.q}" is not answered by the signal word of its step`);
      if (/(first|second|third|fourth|last) step/i.test(x.q)) f.push(`${id}: "${x.q}" names the place of the step`);
      if ((x.wrong || []).some((w) => !SIGNALS.includes(w))) f.push(`${id}: a wrong answer of the signal question is no signal word`);
    }
  }
  if (!Array.isArray(t.clauses) || t.clauses.length !== 4 || new Set(t.clauses).size !== 4 || t.clauses.some((c) => !/^[a-z]/.test(c) || /[.,]$/.test(c) || c.length > 48 || SIGNALS.some((w) => has(c, w)) || /(^|[^a-z])(before|after)([^a-z]|$)/i.test(c))) f.push(id + ': not four different step clauses (small first letter, no end mark, at most 48 letters, no signal word, no before or after)');
  if (!t.ownSample || !/(^|[^a-z])(before|after)([^a-z]|$)/.test(t.ownSample) || t.ownSample.length > 68) f.push(id + ': no sample of a sentence of the child\'s own with before or after (at most 68 letters)');
  if (!t.why || !/^Why must .+ before .+\?$/.test(t.why.q || '') || !t.why.sample) f.push(id + ': no "Why must ... before ...?" question with a sample answer');
  else if (mc[2] && mc[2].q !== t.why.q) f.push(id + ': the third question to circle is not the why-question of the text');
  // the steps whose paragraphs answer the why-question (the unit check prints them with it): steps of the text, in order,
  // one after another
  const ws = (t.why && t.why.steps) || [];
  if (!Array.isArray(ws) || ws.length < 2 || ws.some((n, i) => !Number.isInteger(n) || n < 1 || n > 4 || (i && n !== ws[i - 1] + 1))) f.push(id + ': the why-question names no run of steps (why.steps) that answer it');
  return f;
}

const DIAGRAMS = BANK.g2d || [];
const STEPS = BANK.g2s || [];
{
  const f = [...DIAGRAMS.flatMap(faultsOfDiagram), ...STEPS.flatMap(faultsOfSteps)];
  if (f.length) throw new Error('info-texts.en.json (g2d, g2s): ' + f.join('; '));
}

/* ------------------------------------------------------------------ the page */

const LEVELS = {
  diagram: { 1: { font: 16 }, 2: { font: 16, rowH: 34 }, 3: { font: 15, rowH: 31 } },
  steps: { 1: { font: 16 }, 2: { font: 17, rowH: 38 }, 3: { font: 14.8, rowH: 30 } },
  source: { 1: { font: 16.5, n: 4, rowH: 68, sFont: 17.5 }, 2: { font: 16, n: 6, rowH: 46, sFont: 16 }, 3: { font: 15.5, n: 4, rowH: 38, sFont: 15.5, lineH: 32 } },
  beforeafter: { 1: { font: 16, rowH: 48, sFont: 16 }, 2: { font: 15.5, rowH: 34 }, 3: { font: 15, rowH: 31 } },
};
const INNER = W - 33;                                   // the inside of the text box (border 2.5 + padding 14 on each side)

const cream = (attrs, inner, pad = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:3px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (text, px = 15, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${text}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const numBox = (want, key, size = 34) => `<span data-lcs-numbox data-lcs-want="${want}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 ${Math.round(size * 0.58)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? want : ''}</span>`;
const tabNo = (n) => `<span data-lcs-boxno="${n}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 15px/1 'Nunito',sans-serif">${n}</span>`;

function artOf(a, size, id) {
  if (a.kind === 'life') return lifeStage({ animal: a.animal, stage: a.stage, size, id }).svg;
  if (a.kind === 'plant') return plantStage({ stage: a.stage, w: Math.round(size * 0.82), id }).svg;
  return moonTile(a.phase, Math.round(size * 0.92));
}
/** one phase of the moon on a dark night sky: the lit part is light, the rest of the disc is as dark as the sky inside a
 *  thin rim (a new moon is "hardly seen"; a full moon is a bright circle). Northern hemisphere: the first quarter is lit on the right. */
function moonTile(phase, s) {
  const r = 34, side = litSideOf(phase, 'N');
  const lit = phase === 4 ? `<circle data-lcs-lit cx="0" cy="0" r="${r}" fill="${T.cream}"/>` : phase === 0 ? '' : `<path data-lcs-lit d="M 0 -${r} A ${r} ${r} 0 0 1 0 ${r} Z" fill="${T.cream}"${side === 'left' ? ' transform="scale(-1,1)"' : ''}/>`;
  return `<svg data-lcs-moon="${phase}" xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="-50 -50 100 100" style="display:block"><rect data-lcs-sky x="-48" y="-48" width="96" height="96" rx="12" fill="${T.ink}"/>${lit}<circle cx="0" cy="0" r="${r}" fill="none" stroke="${T.inkSoft}" stroke-width="1.6"/></svg>`;
}
/** a label of three words or more breaks before its last two ("plant with / a flower", "tadpole / with legs") */
const labelHtml = (l) => { const w = String(l).split(' '); return w.length >= 3 ? esc(w.slice(0, -2).join(' ')) + '<br>' + esc(w.slice(-2).join(' ')) : esc(l); };

/** the cycle diagram: the stages in a row, an arrow from each to the next and one from the last back to the first */
function diagramOf(t, { lv, key }) {
  const st = t.diagram.stages, n = st.length, blank = lv === 3 ? t.diagram.blank : -1, gap = lv === 3 ? t.diagram.gap : -1;
  const slot = INNER / n, size = n === 5 ? 92 : 104, band = size + 4, labH = 34, H = band + labH + 22;
  const cx = (i) => slot * (i + 0.5);
  const cells = st.map((s, i) => {
    const lab = i === blank
      ? `<div data-lcs-blanklabel="${esc(s.label)}" style="width:${Math.min(slot - 24, 132)}px;height:22px;margin:2px auto 0;border-bottom:2px solid ${T.ink};font:800 14px/22px 'Nunito',sans-serif;color:${T.teal};text-align:center">${key ? esc(s.label) : ''}</div>`
      : `<div data-lcs-stagelabel style="font:800 14px/1.15 'Nunito',sans-serif;color:${T.ink};text-align:center;padding:0 4px">${labelHtml(s.label)}</div>`;
    return `<div data-lcs-stage2="${i}" style="position:absolute;left:${(slot * i).toFixed(1)}px;top:0;width:${slot.toFixed(1)}px">` +
      `<div data-lcs-stageart style="height:${band}px;display:flex;align-items:center;justify-content:center;line-height:0">${artOf(s.art, size, `${t.id}-${i}`)}</div>${lab}</div>`;
  }).join('');
  const head = (x, y, dir, color) => (dir === 'right' ? `<polygon points="${x},${y} ${x - 9},${y - 5.5} ${x - 9},${y + 5.5}" fill="${color}"/>` : `<polygon points="${x},${y} ${x - 5.5},${y + 9} ${x + 5.5},${y + 9}" fill="${color}"/>`);
  const reach = size / 2 + 5;
  let arrows = '';
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n, miss = i === gap;
    if (miss && !key) continue;
    const color = miss ? T.teal : T.ink;
    const attrs = `data-lcs-arrow="${i}>${j}"${miss ? ' data-lcs-key-arrow="1"' : ''}`;
    if (j) {
      const x1 = cx(i) + reach, x2 = cx(j) - reach, y = band / 2;
      arrows += `<g ${attrs}><line x1="${x1.toFixed(1)}" y1="${y}" x2="${(x2 - 6).toFixed(1)}" y2="${y}" stroke="${color}" stroke-width="2.8" stroke-linecap="round"/>${head(+x2.toFixed(1), y, 'right', color)}</g>`;
    } else {
      const yTop = band + labH + 1, yR = H - 5, xa = cx(i), xb = cx(0);
      arrows += `<g ${attrs}><path d="M ${xa.toFixed(1)} ${yTop} V ${yR - 6} Q ${xa.toFixed(1)} ${yR} ${(xa - 6).toFixed(1)} ${yR} H ${(xb + 6).toFixed(1)} Q ${xb.toFixed(1)} ${yR} ${xb.toFixed(1)} ${yR - 6} V ${yTop + 8}" fill="none" stroke="${color}" stroke-width="2.8" stroke-linecap="round"/>${head(+xb.toFixed(1), yTop, 'up', color)}</g>`;
    }
  }
  return `<div data-lcs-diagram="${n}" data-lcs-blank="${blank}" data-lcs-gap="${gap}" style="position:relative;width:${INNER}px;height:${H}px">${cells}` +
    `<svg width="${INNER}" height="${H}" viewBox="0 0 ${INNER} ${H}" style="position:absolute;left:0;top:0;pointer-events:none;overflow:visible">${arrows}</svg></div>`;
}

function diagramBox(t, { font, lv, key }) {
  const paras = t.paras.map((p, i) => `<div data-lcs-para2="${i + 1}" style="font:700 ${font}px/1.38 'Nunito',sans-serif;color:${T.ink};margin-top:${i ? 5 : 0}px">${esc(p.join(' '))}</div>`).join('');
  return `<div data-lcs-dgtext="${t.id}" data-lcs-words="${wordsIn(textOf(t))}" style="flex:0 0 auto;padding:7px 14px 6px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div data-lcs-title style="font:700 23px/1.1 'Baloo 2',cursive;color:${T.ink};margin-bottom:2px">${esc(t.title)}</div>${paras}` +
    `<div style="margin-top:6px;padding-top:4px;border-top:2px dashed ${T.teal}"><div data-lcs-dgtitle style="font:700 16px/1.2 'Baloo 2',cursive;color:${T.teal};margin-bottom:2px">Diagram: ${esc(t.diagram.title)}</div>${diagramOf(t, { lv, key })}</div></div>`;
}

function stepsBox(t, { font }) {
  const paras = t.paras.map((p, i) => `<div data-lcs-para2="${i + 1}" style="font:700 ${font}px/1.36 'Nunito',sans-serif;color:${T.ink};margin-top:${i ? 4 : 0}px">${esc(p.join(' '))}</div>`).join('');
  const side = `<div style="flex:0 0 112px;display:flex;flex-direction:column;justify-content:space-around;align-items:center;gap:6px">` +
    t.pictures.map((p) => `<img class="ws-icon" data-lcs-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="width:100px;height:100px;display:block;object-fit:contain">`).join('') + `</div>`;
  return `<div data-lcs-sttext="${t.id}" data-lcs-words="${wordsIn(textOf(t))}" style="flex:0 0 auto;padding:7px 14px 8px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div data-lcs-title style="font:700 23px/1.1 'Baloo 2',cursive;color:${T.ink};margin-bottom:2px">${esc(t.title)}</div>` +
    `<div style="display:flex;gap:12px;align-items:stretch"><div style="flex:1 1 auto;min-width:0">${paras}</div>${side}</div></div>`;
}

const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const withSignal = (i, step) => SIGNALS[i] + ', ' + lower(step);
const downArrow = `<div data-lcs-flowarrow style="display:flex;justify-content:center;line-height:0"><svg width="18" height="11" viewBox="0 0 18 11"><polygon points="9,11 1,1 17,1" fill="${T.teal}"/></svg></div>`;

function makeInfoText2bType({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('info-text-g2b: unknown mode ' + mode);
  const POOL = mode === 'diagram' || mode === 'source' ? DIAGRAMS : STEPS;
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // the unit checks (Part 7.6): the page's task made small, one card a task (info2bCheckPage below)
    ...(mode === 'diagram' || mode === 'steps' ? { checkPage(args, ctx) { return info2bCheckPage(mode, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the informational texts are English texts (no ${locale} bank)`);
      if (!POOL.length) throw new Error(`${id}: the bank holds no text for this page`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(POOL, 1)[0];
      const inner = W - 24, cellW = (inner - 14) / 2 - 24;
      let top = '', below = '', items = [];

      if (mode === 'diagram') {
        top = diagramBox(t, { font: d.font, lv, key });
        const dq = t.questions.slice(0, 4), both = t.questions[4];
        const order = dq.filter((x) => !readsOf(t, x).count);        // the three questions about what comes before or after
        const FULL = 'grid-column:1 / -1';
        const qCard = (n, x, body, from, more = '', extra = '') => cream(`data-lcs-question="${n}" data-lcs-from="${from}"${extra}`, label(num(n) + esc(x.q), 14.5) + body, 4, more);
        let cells;
        if (lv === 1) {
          const qs = [...shuffle(dq, rng), both], at = placesFor(5, rng);
          cells = qs.map((x, k) => qCard(k + 1, x, choices(placed(x.answer, shuffle(x.wrong, rng), at[k]), at[k], key, { column: k < 4, font: 14 }), x.from, k < 4 ? '' : FULL));
          items = qs.map((x) => t.id + ': ' + x.q);
        } else if (lv === 2) {
          const qs = shuffle(order, rng);
          cells = [
            ...qs.map((x, k) => qCard(k + 1, x, line({ w: k < 2 ? cellW : inner, h: d.rowH, answer: key ? x.answer : null }), 'diagram', k < 2 ? '' : FULL)),
            qCard(4, t.adds, line({ w: inner, h: d.rowH, answer: key ? t.adds.sample : null, sample: true }), 'adds', FULL),
            qCard(5, both, line({ w: inner, h: d.rowH, answer: key ? both.answer : null }), 'both', FULL),
          ];
          items = [...qs.map((x) => t.id + ': ' + x.q), t.id + ': adds', t.id + ': ' + both.q];
        } else {
          const one = order.find((x) => usableAt3(t, x));
          const stamp = (x) => ` data-lcs-usable="${usableAt3(t, x) ? 1 : 0}"`;
          cells = [
            cream('data-lcs-addtask="1"', label(num(1) + 'One label and one arrow are missing in the diagram. Write the label on the line. Draw the missing arrow.', 14.5), 5, FULL),
            qCard(2, one, line({ w: inner, h: d.rowH, answer: key ? one.answer : null }), 'diagram', FULL, stamp(one)),
            qCard(3, t.adds, line({ w: inner, h: d.rowH, answer: key ? t.adds.sample : null, sample: true }), 'adds', FULL),
            qCard(4, both, line({ w: inner, h: d.rowH, answer: key ? both.answer : null }), 'both', FULL, stamp(both)),
            cream('data-lcs-explain="1"', label(num(5) + esc(t.explain.q), 14.5) + line({ w: inner, h: d.rowH, answer: key ? t.explain.sample : null, sample: true }) + line({ w: inner, h: d.rowH }), 4, FULL),
          ];
          items = [t.id + ': add', t.id + ': ' + one.q, t.id + ': adds', t.id + ': ' + both.q, t.id + ': ' + t.explain.q];
        }
        below = `<div data-lcs-qgrid style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:5px 14px;align-content:space-between">${cells.join('')}</div>`;
      }

      if (mode === 'steps') {
        top = stepsBox(t, { font: d.font });
        if (lv === 1) {
          let rows;
          for (let k = 0; k < 200; k++) { rows = shuffle(t.steps.map((s, i) => ({ n: i + 1, text: s })), rng); const seq = rows.map((r) => r.n).join(''); if (seq !== '1234' && seq !== '4321') break; }
          const strips = cream('data-lcs-strips="1"', label('Put the steps in order. Write 1, 2, 3, and 4 in the boxes.', 15.5) +
            `<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px 18px;margin-top:2px">` + rows.map((r) => `<div data-lcs-strip="${r.n}" style="display:flex;align-items:center;gap:10px">${numBox(r.n, key)}<span style="font:700 15.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r.text)}</span></div>`).join('') + `</div>`, 8);
          const at = placesFor(3, rng);
          const cells = t.mc.map((x, k) => {
            const opts = placed(x.answer, shuffle(x.wrong, rng), at[k]);
            const wide = x.kind === 'before';
            return cream(`data-lcs-question="${k + 1}" data-lcs-kind="${x.kind}"`, label(num(k + 1) + esc(x.q), 14.5) + choices(opts, at[k], key, { column: true, font: 14 }), 5, wide ? 'grid-column:1 / -1' : '');
          });
          below = strips + `<div data-lcs-qgrid style="flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;gap:6px 14px">${cells.join('')}</div>`;
          items = [t.id + ': order', ...t.mc.map((x) => t.id + ': ' + x.q)];
        } else {
          // a flow chart of four boxes with two lines each; level 2 prints the first word of each step
          const lineW = inner - 26 - 10;
          const boxes = t.steps.map((s, i) => cream(`data-lcs-flowbox="${i + 1}"`, `<div style="display:flex;align-items:center;gap:10px">${tabNo(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px">` +
            line({ w: lineW, h: d.rowH, starter: lv === 2 ? SIGNALS[i] + ',' : null, answer: key ? withSignal(i, s) : null, sample: true }) + line({ w: lineW, h: d.rowH }) + `</div></div>`, lv === 3 ? 3 : 4)).join(downArrow);
          const why = lv === 3 ? cream('data-lcs-why="1"', label(esc(t.why.q), 15) + line({ w: inner, h: d.rowH, answer: key ? t.why.sample : null, sample: true }) + line({ w: inner, h: d.rowH }), 5) : '';
          below = `<div data-lcs-flow style="flex:0 0 auto;display:flex;flex-direction:column;gap:2px">${boxes}</div>` + why;
          items = [t.id + ': steps', ...(lv === 3 ? [t.id + ': ' + t.why.q] : [])];
        }
      }

      if (mode === 'source') {
        top = diagramBox(t, { font: d.font, lv: 1, key });   // the whole diagram on every level
        const fs2 = (x) => (typeof x === 'string' ? x : x.s);
        const per = d.n / 2;
        // level 3 keeps the third fact of each kind as the sample of what the child writes
        const tx = (lv === 3 ? t.facts.text.slice(0, 2) : shuffle(t.facts.text, rng).slice(0, per)).map((s) => ({ s: fs2(s), w: 'text' }));
        const dg = (lv === 3 ? t.facts.diagram.slice(0, 2) : shuffle(t.facts.diagram, rng).slice(0, per)).map((s) => ({ s: fs2(s), w: 'diagram' }));
        // mixed: never three of one kind in a row, never text and diagram in turn
        let rows;
        for (let k = 0; k < 300; k++) { rows = shuffle([...tx, ...dg], rng); const seq = rows.map((r) => r.w[0]).join(''); if (!/ttt|ddd/.test(seq) && !/^(td)+$|^(dt)+$/.test(seq) && !/^(tt|dd)(tt|dd)$/.test(seq)) break; }
        const CHECK = `<svg width="20" height="20" viewBox="0 0 20 20"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        const tick = (on) => `<span style="display:flex;justify-content:center"><span data-lcs-tick${on ? ' data-lcs-on="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;line-height:0">${key && on ? CHECK : ''}</span></span>`;
        const COLS = 'display:grid;grid-template-columns:1fr 92px 104px;align-items:center;gap:0 6px';
        const head = (x) => `<span style="font:800 14px/1.15 'Nunito',sans-serif;color:${T.teal};text-align:center">${x}</span>`;
        const table = cream('data-lcs-facts="1"', `<div style="${COLS}">${label('Where do you learn each fact?', 15.5, T.teal)}${head('in the text')}${head('in the diagram')}</div>` +
          rows.map((r, k) => `<div data-lcs-fact="${r.w}" style="${COLS};min-height:${d.rowH}px;border-top:1.5px solid ${T.grid}"><span data-lcs-facttext style="font:700 ${d.sFont}px/1.25 'Nunito',sans-serif;color:${T.ink}">${num(k + 1)}${esc(r.s)}</span>${tick(r.w === 'text')}${tick(r.w === 'diagram')}</div>`).join(''), 7);
        const more = lv === 3
          ? cream('data-lcs-more="diagram"', label('Write one more fact that only the diagram tells you.', 15) + line({ w: inner, h: d.lineH, answer: key ? fs2(t.facts.diagram[2]) : null, sample: true }), 5) +
            cream('data-lcs-more="help"', label('How does the diagram help you understand the text? Write one way.', 15) + line({ w: inner, h: d.lineH, answer: key ? t.helps : null, sample: true }), 5)
          : '';
        below = table + more;
        items = [...rows.map((r) => t.id + ': ' + r.s), ...(lv === 3 ? [t.id + ': one more'] : [])];
      }

      if (mode === 'beforeafter') {
        top = stepsBox(t, { font: d.font });
        const C = t.clauses, cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        const noRun = (seq) => !/bbb|aaa/.test(seq) && !/^(ba)+b?$|^(ab)+a?$/.test(seq);
        if (lv === 1) {
          // every pair of two steps once: three told with "before", three with "after"
          const pairs = []; for (let i = 0; i < 4; i++) for (let k = i + 1; k < 4; k++) pairs.push([i, k]);
          let rows;
          for (let n = 0; n < 300; n++) {
            const flip = shuffle([0, 0, 0, 1, 1, 1], rng);
            rows = shuffle(pairs.map(([i, k], x) => (flip[x] ? { a: k, b: i, w: 'after' } : { a: i, b: k, w: 'before' })), rng);
            if (noRun(rows.map((r) => r.w[0]).join(''))) break;
          }
          const word = (w, on) => `<span data-lcs-word="${w}"${on ? ' data-lcs-right="1"' : ''} style="display:inline-block;font-weight:800;padding:0 9px;margin:0 2px;border:2.5px solid ${key && on ? T.teal : T.grid};border-radius:999px;background:#FFFFFF">${w}</span>`;
          below = cream('data-lcs-pairs="1"', label('Circle the word that makes each sentence true.', 15.5, T.teal) +
            rows.map((r, k) => `<div data-lcs-ba="${r.w}" data-lcs-pair="${r.a}${r.b}" style="font:700 ${d.sFont}px/1.9 'Nunito',sans-serif;color:${T.ink};min-height:${d.rowH}px;border-top:1.5px solid ${T.grid};padding-top:3px">${num(k + 1)}${esc(cap(C[r.a]))} ${word('before', r.w === 'before')}${word('after', r.w === 'after')} ${esc(C[r.b])}.</div>`).join(''), 7);
          items = rows.map((r) => `${t.id}: ${r.a} ${r.w} ${r.b}`);
        } else if (lv === 2) {
          // Two questions about the step NEXT to a step, and one sentence about the two middle steps. Only the clauses
          // of steps 2 and 3 are printed and the answers are steps 1 and 4, so no task prints the answer of another
          // (three questions about the three pairs of neighbors cannot be asked without that).
          const qs = shuffle([{ w: 'before', of: 1, ans: 0 }, { w: 'after', of: 2, ans: 3 }], rng);
          const mid = rng.int(0, 1) ? { a: 2, b: 1, w: 'after' } : { a: 1, b: 2, w: 'before' };
          const three = (sample) => line({ w: inner, h: d.rowH, answer: key ? sample : null, sample: true }) + line({ w: inner, h: d.rowH }) + line({ w: inner, h: d.rowH });
          below = `<div data-lcs-qlist style="flex:0 0 auto;display:flex;flex-direction:column;gap:7px">` +
            qs.map((q, k) => cream(`data-lcs-question="${k + 1}" data-lcs-ba="${q.w}" data-lcs-of="${q.of}" data-lcs-ans="${q.ans}"`, label(num(k + 1) + `${esc(cap(C[q.of]))}. What happens in the step right ${q.w} that?`, 15.5) + three(t.steps[q.ans]), 6)).join('') +
            cream(`data-lcs-cloze="${mid.w}" data-lcs-pair="${mid.a}${mid.b}"`, label(num(3) + 'Write before or after on the line.', 15.5) +
              `<div data-lcs-clozerow style="font:700 16px/2 'Nunito',sans-serif;color:${T.ink}">${esc(cap(C[mid.a]))} <span data-lcs-blankword style="display:inline-block;width:112px;height:26px;margin:0 4px;border-bottom:2.5px solid ${T.ink};vertical-align:baseline;text-align:center;font-weight:800;line-height:26px;color:${T.teal}">${key ? mid.w : ''}</span> ${esc(C[mid.b])}.</div>`, 6) + `</div>`;
          items = [...qs.map((q) => `${t.id}: right ${q.w} ${q.of}`), `${t.id}: cloze ${mid.a} ${mid.b}`];
        } else {
          // Finish the sentence that begins "Before ..." or "After ...": one for each pair of steps that follow each other,
          // never all three the same way round. Any earlier (or later) step makes a true sentence: the key shows the nearest.
          let qs;
          for (let n = 0; n < 300; n++) {
            qs = shuffle([0, 1, 2].map((i) => (rng.int(0, 1) ? { w: 'before', of: i + 1, ans: i } : { w: 'after', of: i, ans: i + 1 })), rng);
            if (new Set(qs.map((q) => q.w)).size === 2) break;
          }
          if (new Set(qs.map((q) => q.w)).size !== 2) { const q = qs[0]; qs[0] = q.w === 'before' ? { w: 'after', of: q.ans, ans: q.of } : { w: 'before', of: q.ans, ans: q.of }; }
          const lineW = inner - 26 - 10;
          const rows = (n, starter, sample) => line({ w: lineW, h: d.rowH, starter, answer: key ? sample : null, sample: true }) + Array.from({ length: n - 1 }, () => line({ w: lineW, h: d.rowH })).join('');
          const card = (k, body, attrs) => cream(attrs, `<div style="display:flex;align-items:center;gap:10px">${tabNo(k)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px">${body}</div></div>`, 4);
          below = `<div data-lcs-frames style="flex:0 0 auto;display:flex;flex-direction:column;gap:5px">` +
            qs.map((q, k) => { const W = cap(q.w); return card(k + 1, rows(3, `${W} ${C[q.of]},`, `${W} ${C[q.of]}, ${lower(t.steps[q.ans])}`), `data-lcs-frame="${q.w}" data-lcs-of="${q.of}" data-lcs-ans="${q.ans}"`); }).join('') +
            card(4, label('Write a sentence of your own about two steps. Use the word before or after.', 15) + rows(2, null, t.ownSample), 'data-lcs-own="1"') + `</div>`;
          items = [...qs.map((q) => `${t.id}: ${q.w} ${q.of}`), t.id + ': own'];
        }
      }

      return {
        bodyHtml: `<div data-ws-content data-lcs-info2b="${mode}|${lv}" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">${top}${below}</div>`,
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-info2b]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsInfo2b.split('|'), lv = +lvS;
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root);
        const isKey = !!document.querySelector('[data-lcs-answer]') || [...document.querySelectorAll('[data-lcs-ok]')].some((e) => !/transparent|rgba\(0, 0, 0, 0\)/.test(getComputedStyle(e).borderTopColor));
        const box = document.querySelector('[data-lcs-dgtext], [data-lcs-sttext]');
        if (!box) return ['no text'];
        const n = +box.dataset.lcsWords;
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        box.querySelectorAll('[data-lcs-para2]').forEach((p, i) => { if (parseFloat(getComputedStyle(p).fontSize) < 14.5) fails.push('paragraph ' + (i + 1) + ' is printed too small'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        box.querySelectorAll('*').forEach((e) => { const r = R(e), b = R(box); if (r.width && (r.right > b.right + 0.5 || r.bottom > b.bottom + 0.5)) fails.push('something leaves the text box'); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const sets = [...document.querySelectorAll('[data-lcs-choices]')];
        sets.forEach((c, i) => {
          const all = [...c.querySelectorAll('[data-lcs-choice]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1) fails.push(`answers ${i + 1}: not three with one right`);
          if (new Set(all.map((e) => e.textContent.trim().toLowerCase())).size !== 3) fails.push(`answers ${i + 1}: two answers read the same`);
          all.forEach((e) => { if (R(e).right > R(c.parentElement).right + 0.5) fails.push(`answers ${i + 1}: an answer leaves its card`); });
        });
        const place = sets.map((c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk));
        if (sets.length >= 3) {
          if (new Set(place).size < 3) fails.push('the right answers do not use all three places: ' + place.join(''));
          if (place.some((x, i) => i >= 2 && x === place[i - 1] && x === place[i - 2])) fails.push('three right answers in one place in a row: ' + place.join(''));
          if (/^(012|210)/.test(place.join(''))) fails.push('the right answers begin as a staircase: ' + place.join(''));
        }
        const CARDS = '[data-lcs-question], [data-lcs-addtask], [data-lcs-explain], [data-lcs-strips], [data-lcs-flowbox], [data-lcs-why], [data-lcs-facts], [data-lcs-more], [data-lcs-pairs], [data-lcs-frame], [data-lcs-own], [data-lcs-cloze]';
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'), c = l.closest(CARDS); if (!s || !c || R(s).right > R(c).right + 0.5) fails.push('a writing line leaves its card'); });
        document.querySelectorAll(CARDS).forEach((c) => { const cb = R(c); c.querySelectorAll('[data-lcs-label], [data-lcs-choice], svg').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5)) fails.push('something leaves its card'); }); });

        if (mode === 'diagram') {
          if (n < 95 || n > 135) fails.push(`the text has ${n} words`);
          if (box.querySelectorAll('[data-lcs-para2]').length !== 2) fails.push('not two paragraphs');
          const dg = box.querySelector('[data-lcs-diagram]');
          if (!dg || !box.querySelector('[data-lcs-dgtitle]')) return [...fails, 'no diagram with a title'];
          const N = +dg.dataset.lcsDiagram, blank = +dg.dataset.lcsBlank, gap = +dg.dataset.lcsGap;
          // the text never says how many stages there are (the diagram is to show it)
          const WORD = { 4: 'four', 5: 'five' }[N];
          if (new RegExp('(^|[^a-z])' + WORD + '([^a-z]|$)', 'i').test([...box.querySelectorAll('[data-lcs-para2]')].map((p) => p.textContent).join(' '))) fails.push('the text says how many stages the diagram shows');
          const stages = [...dg.querySelectorAll('[data-lcs-stage2]')];
          if (stages.length !== N) fails.push(stages.length + ' stages');
          const db = R(dg);
          stages.forEach((s, i) => {
            const art = s.querySelector('[data-lcs-stageart] svg'), lab = s.querySelector('[data-lcs-stagelabel]'), bl = s.querySelector('[data-lcs-blanklabel]');
            if (!art || R(art).width < 70) fails.push(`stage ${i + 1} has no drawing of 70 px`);
            if (i === blank ? !bl || lab : !lab || bl) fails.push(`stage ${i + 1}: the label is not as the level asks`);
            const e = lab || bl;
            if (e) { const r = R(e); if (r.top < R(art).bottom - 1) fails.push(`the label of stage ${i + 1} is not under its drawing`); if (r.bottom > db.bottom + 0.5) fails.push(`the label of stage ${i + 1} leaves the diagram`); }
            if (lab) { const rg = document.createRange(); rg.selectNodeContents(lab); const tr = rg.getBoundingClientRect(), sr = R(s); if (tr.left < sr.left - 0.5 || tr.right > sr.right + 0.5) fails.push(`the label of stage ${i + 1} is wider than its place`); if (tr.height > 36) fails.push(`the label of stage ${i + 1} has more than two lines`); }
            if (bl && (isKey ? !bl.textContent.trim() : bl.textContent.trim())) fails.push('the missing label is ' + (isKey ? 'not printed on the key' : 'printed'));
          });
          // a moon is drawn on a dark sky: the bright part is light, the new moon is dark
          dg.querySelectorAll('[data-lcs-moon]').forEach((m) => { const lit = m.querySelector('[data-lcs-lit]'); if (m.dataset.lcsMoon === '0' ? lit : !lit) fails.push('a moon is drawn with the wrong bright part'); if (!m.querySelector('[data-lcs-sky]')) fails.push('a moon without its dark sky'); });
          const arrows = [...dg.querySelectorAll('[data-lcs-arrow]')].map((a) => a.dataset.lcsArrow);
          const all = Array.from({ length: N }, (_, i) => i + '>' + ((i + 1) % N));
          const want = lv === 3 && !isKey ? all.filter((a) => !a.startsWith(gap + '>')) : all;
          if (lv === 3 && (gap < 0 || gap > N - 2)) fails.push('the missing arrow is the arrow back to the first stage');
          if (arrows.slice().sort().join() !== want.slice().sort().join()) fails.push('the arrows are ' + arrows.join(' ') + ' (wanted ' + want.join(' ') + ')');
          // an arrow touches no drawing
          dg.querySelectorAll('[data-lcs-arrow] line').forEach((ln) => { const r = R(ln); stages.forEach((s, i) => { const a = R(s.querySelector('[data-lcs-stageart] svg')); if (r.right > a.left + 1 && r.left < a.right - 1) fails.push(`an arrow runs into the drawing of stage ${i + 1}`); }); if (r.width < 8) fails.push('an arrow shorter than 8 px'); });
          if (lv === 3 ? blank < 0 : blank !== -1) fails.push('the missing label is on the wrong level');
          const qs = [...document.querySelectorAll('[data-lcs-question]')];
          const from = qs.map((q) => q.dataset.lcsFrom).join();
          const counts = qs.filter((q) => /How many (stages|phases)/.test(q.textContent)).length;
          if (lv === 1) {
            if (from !== 'diagram,diagram,diagram,diagram,both') fails.push('the questions are ' + from);
            if (sets.length !== 5 || lines.length) fails.push(`level 1: ${sets.length} sets to circle, ${lines.length} lines`);
            if (counts !== 1) fails.push('level 1 has not one how-many question');
          } else if (lv === 2) {
            if (from !== 'diagram,diagram,diagram,adds,both') fails.push('the questions are ' + from);
            if (sets.length || lines.length !== 5) fails.push(`level 2: ${sets.length} sets to circle, ${lines.length} lines`);
            if (counts) fails.push('level 2 asks how many stages there are');
          } else {
            if (from !== 'diagram,adds,both' || !document.querySelector('[data-lcs-addtask]') || !document.querySelector('[data-lcs-explain]')) fails.push('level 3 is not: add, a diagram question, what the diagram adds, the text-and-diagram question, the why-question');
            if (sets.length || lines.length !== 5) fails.push(`level 3: ${sets.length} sets to circle, ${lines.length} lines`);
            if (counts) fails.push('level 3 asks how many stages there are');
            const bl = dg.querySelector('[data-lcs-blanklabel]');
            const mine = qs.filter((q) => q.dataset.lcsFrom !== 'adds');
            if (bl) mine.forEach((q) => { if (new RegExp('(^|[^a-z])' + bl.dataset.lcsBlanklabel.toLowerCase() + '([^a-z]|$)').test(q.querySelector('[data-lcs-label]').textContent.toLowerCase())) fails.push('a question of level 3 names the stage without a label'); });
            if (mine.some((q) => q.dataset.lcsUsable !== '1')) fails.push('a question of level 3 reads the missing label or the missing arrow');
          }
        }

        if (mode === 'steps') {
          if (n < 115 || n > 165) fails.push(`the text has ${n} words`);
          const paras = [...box.querySelectorAll('[data-lcs-para2]')].map((p) => p.textContent);
          ['First,', 'Next,', 'Then,', 'Finally,'].forEach((s, i) => { if (!(paras[i + 1] || '').startsWith(s + ' ')) fails.push(`step ${i + 1} of the text does not begin with ${s}`); });
          if (box.querySelectorAll('img').length !== 3) fails.push('not three pictures');
          if (lv === 1) {
            const rows = [...document.querySelectorAll('[data-lcs-strip]')], seq = rows.map((r) => r.dataset.lcsStrip).join('');
            if (rows.length !== 4 || seq.split('').sort().join('') !== '1234') fails.push('not the four steps');
            if (seq === '1234' || seq === '4321') fails.push('the steps stand in their order');
            rows.forEach((r) => { const b = r.querySelector('[data-lcs-numbox]'); if (!b || R(b).width < 30 || b.dataset.lcsWant !== r.dataset.lcsStrip) fails.push('a step has no box of its number'); if (!isKey && b && b.textContent.trim()) fails.push('a box is filled'); });
            const qs = [...document.querySelectorAll('[data-lcs-question]')];
            if (qs.map((q) => q.dataset.lcsKind).join() !== 'signal,detail,before' || sets.length !== 3 || lines.length) fails.push('level 1 is not four steps to number and three questions to circle');
            // the signal question names its step by what the step tells, never by its place
            const sq = qs[0] && qs[0].querySelector('[data-lcs-label]').textContent;
            if (sq && /(first|second|third|fourth|last) step/i.test(sq)) fails.push('the signal question names the place of its step');
          } else {
            const boxes = [...document.querySelectorAll('[data-lcs-flowbox]')];
            if (boxes.length !== 4 || boxes.map((b) => b.querySelector('[data-lcs-boxno]').dataset.lcsBoxno).join('') !== '1234') fails.push('not four boxes numbered 1 to 4');
            if (document.querySelectorAll('[data-lcs-flowarrow]').length !== 3) fails.push('not three arrows between the boxes');
            boxes.forEach((b, i) => { if (i && R(b).top < R(boxes[i - 1]).bottom) fails.push('the boxes are not one under the other'); if (b.querySelectorAll('[data-lcs-line]').length !== 2) fails.push('a box has not two lines to write on'); });
            const starters = boxes.map((b) => (b.querySelector('[data-lcs-startertext]') || { dataset: {} }).dataset.lcsStartertext || '');
            if (!isKey && lv === 2 && starters.join('|') !== 'First,|Next,|Then,|Finally,') fails.push('the boxes of level 2 do not begin with First, Next, Then, Finally: ' + starters.join('|'));
            if (lv === 3 && starters.join('')) fails.push('a box of level 3 has a first word');
            if (sets.length) fails.push('levels 2 and 3 have nothing to circle');
            if (lv === 2 && (lines.length !== 8 || document.querySelector('[data-lcs-why]'))) fails.push(lines.length + ' lines on level 2');
            if (lv === 3 && (lines.length !== 10 || !document.querySelector('[data-lcs-why]'))) fails.push('level 3 is not four boxes and a why-question with two lines');
          }
        }
        if (mode === 'source') {
          if (n < 95 || n > 135) fails.push(`the text has ${n} words`);
          const dg = box.querySelector('[data-lcs-diagram]');
          if (!dg) return [...fails, 'no diagram'];
          const N = +dg.dataset.lcsDiagram;
          if (dg.querySelectorAll('[data-lcs-stagelabel]').length !== N || dg.querySelector('[data-lcs-blanklabel]') || dg.querySelectorAll('[data-lcs-arrow]').length !== N) fails.push('the diagram is not whole (every label, every arrow)');
          const rows = [...document.querySelectorAll('[data-lcs-fact]')];
          const want = lv === 2 ? 6 : 4;
          if (rows.length !== want) fails.push(rows.length + ' facts on level ' + lv);
          const seq = rows.map((r) => r.dataset.lcsFact[0]).join('');
          if (seq.split('t').length - 1 !== want / 2) fails.push('not as many facts of the text as of the diagram: ' + seq);
          if (/ttt|ddd/.test(seq)) fails.push('three facts of one kind in a row: ' + seq);
          if (/^(td)+$|^(dt)+$/.test(seq)) fails.push('text and diagram take turns: ' + seq);
          if (/^(tt|dd)(tt|dd)$/.test(seq)) fails.push('the facts stand in two blocks: ' + seq);
          if (new Set(rows.map((r) => r.querySelector('[data-lcs-facttext]').textContent)).size !== rows.length) fails.push('a fact stands twice');
          const labels = [...dg.querySelectorAll('[data-lcs-stagelabel]')].map((l) => l.textContent.trim().toLowerCase());
          const textAll = [...box.querySelectorAll('[data-lcs-para2]')].map((p) => p.textContent).join(' ').toLowerCase();
          const word = (hay, w) => new RegExp('(^|[^a-z])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z]|$)').test(hay);
          rows.forEach((r, i) => {
            const ticks = [...r.querySelectorAll('[data-lcs-tick]')];
            if (ticks.length !== 2 || ticks.filter((t) => t.dataset.lcsOn).length !== 1) fails.push(`fact ${i + 1} has not two boxes with one right`);
            else if ((ticks[0].dataset.lcsOn ? 'text' : 'diagram') !== r.dataset.lcsFact) fails.push(`fact ${i + 1}: the right box is the other one`);
            ticks.forEach((t) => { if (R(t).width < 26) fails.push('a box too small for a check mark'); if (isKey ? !!t.querySelector('svg') !== !!t.dataset.lcsOn : t.querySelector('svg')) fails.push('a check mark is printed where none belongs'); });
            // a fact said to be of the text names no stage that only the diagram names
            const s = r.querySelector('[data-lcs-facttext]').textContent.toLowerCase();
            const onlyDiagram = labels.filter((l) => !word(textAll, l) && word(s, l));
            if (r.dataset.lcsFact === 'text' && onlyDiagram.length) fails.push(`fact ${i + 1} is said to be of the text and names "${onlyDiagram[0]}"`);
            const st = r.querySelector('[data-lcs-facttext]'); if (R(st).right > R(ticks[0]).left - 2) fails.push(`fact ${i + 1} runs into its boxes`);
          });
          if (sets.length) fails.push('the page has nothing to circle');
          const more = [...document.querySelectorAll('[data-lcs-more]')].map((m) => m.dataset.lcsMore).join();
          if (lv === 3 ? more !== 'diagram,help' || lines.length !== 2 : more || lines.length) fails.push(`level ${lv}: ${lines.length} lines, more facts to write: ${more || 'none'}`);
        }

        if (mode === 'beforeafter') {
          if (n < 115 || n > 165) fails.push(`the text has ${n} words`);
          if (box.querySelectorAll('img').length !== 3) fails.push('not three pictures');
          if (sets.length) fails.push('the page uses no rows of three answers');
          if (lv === 1) {
            const rows = [...document.querySelectorAll('[data-lcs-ba]')];
            if (rows.length !== 6) fails.push(rows.length + ' sentences');
            const pairs = rows.map((r) => r.dataset.lcsPair.split('').map(Number));
            if (new Set(pairs.map(([a, b]) => Math.min(a, b) + '' + Math.max(a, b))).size !== 6) fails.push('not every pair of two steps once');
            rows.forEach((r, i) => {
              const [a, b] = pairs[i], words = [...r.querySelectorAll('[data-lcs-word]')];
              if ((a < b ? 'before' : 'after') !== r.dataset.lcsBa) fails.push(`sentence ${i + 1} is keyed to the wrong word`);
              if (words.map((w) => w.dataset.lcsWord).join() !== 'before,after' || words.filter((w) => w.dataset.lcsRight).length !== 1 || words.find((w) => w.dataset.lcsRight).dataset.lcsWord !== r.dataset.lcsBa) fails.push(`sentence ${i + 1} has not the words before and after with one right`);
              if (R(r).right > R(r.parentElement).right + 0.5) fails.push(`sentence ${i + 1} leaves its card`);
            });
            const seq = rows.map((r) => r.dataset.lcsBa[0]).join('');
            if (seq.split('b').length - 1 !== 3) fails.push('not three sentences with before and three with after: ' + seq);
            if (/bbb|aaa/.test(seq)) fails.push('three of one word in a row: ' + seq);
            if (/^(ba)+$|^(ab)+$/.test(seq)) fails.push('before and after take turns: ' + seq);
            if (lines.length) fails.push('level 1 has no writing lines');
          } else if (lv === 2) {
            const qs = [...document.querySelectorAll('[data-lcs-question]')];
            if (qs.length !== 2 || qs.map((q) => q.dataset.lcsBa).sort().join() !== 'after,before') fails.push('level 2 has not one right-before and one right-after question');
            qs.forEach((q, i) => {
              const of = +q.dataset.lcsOf, ans = +q.dataset.lcsAns, w = q.dataset.lcsBa;
              if (w === 'before' ? ans !== of - 1 : ans !== of + 1) fails.push(`question ${i + 1} is keyed to a step that is not the one right ${w}`);
              if (q.querySelectorAll('[data-lcs-line]').length !== 3) fails.push(`question ${i + 1} has not three lines`);
            });
            // no task prints the step that answers another one
            const printed = qs.map((q) => +q.dataset.lcsOf), answers = qs.map((q) => +q.dataset.lcsAns);
            const cz = document.querySelector('[data-lcs-cloze]');
            if (!cz) fails.push('no sentence with a word to write');
            else {
              const [a, b] = cz.dataset.lcsPair.split('').map(Number);
              printed.push(a, b);
              if ((a < b ? 'before' : 'after') !== cz.dataset.lcsCloze) fails.push('the sentence to finish is keyed to the wrong word');
              const bw = cz.querySelector('[data-lcs-blankword]');
              if (!bw || R(bw).width < 90) fails.push('no place of 90 px for the word');
              else if (isKey ? bw.textContent.trim() !== cz.dataset.lcsCloze : bw.textContent.trim()) fails.push('the word of the sentence is ' + (isKey ? 'not on the key' : 'printed'));
              if (R(cz.querySelector('[data-lcs-clozerow]')).right > R(cz).right + 0.5) fails.push('the sentence leaves its card');
            }
            if (answers.some((x) => printed.includes(x))) fails.push('a task prints the step that answers another task');
            if (new Set(answers).size !== answers.length) fails.push('two questions have the same answer');
            if (lines.length !== 6 || document.querySelector('[data-lcs-own]')) fails.push(lines.length + ' lines on level 2');
          } else {
            const qs = [...document.querySelectorAll('[data-lcs-frame]')];
            if (qs.length !== 3) fails.push(qs.length + ' sentences to finish');
            const ws = qs.map((q) => q.dataset.lcsFrame);
            if (new Set(ws).size !== 2) fails.push('the sentences all begin the same way: ' + ws.join());
            const pairSet = new Set();
            qs.forEach((q, i) => {
              const of = +q.dataset.lcsOf, ans = +q.dataset.lcsAns;
              if (ws[i] === 'before' ? ans !== of - 1 : ans !== of + 1) fails.push(`sentence ${i + 1} is keyed to a step that does not come right ${ws[i]}`);
              pairSet.add(Math.min(of, ans));
              if (q.querySelectorAll('[data-lcs-line]').length !== 3) fails.push(`sentence ${i + 1} has not three lines`);
              if (!isKey) { const st = (q.querySelector('[data-lcs-startertext]') || { dataset: {} }).dataset.lcsStartertext || ''; if (!new RegExp('^' + ws[i].charAt(0).toUpperCase() + ws[i].slice(1) + ' .+,$').test(st)) fails.push(`sentence ${i + 1} does not begin "${ws[i]} ...,": ${st}`); }
            });
            if (pairSet.size !== 3) fails.push('two sentences are about the same two steps');
            if (lines.length !== 11 || !document.querySelector('[data-lcs-own]')) fails.push('level 3 is not three sentences to finish (three lines each) and one of the child\'s own');
          }
        }
        return fails;
      });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  task with its answer in its markup and what it is answered from printed on it; the text's id is data-lcs-text (form B
 *  takes another text).
 *   diagram (G2-521)  the whole cycle diagram (its title, every stage with its label and arrow) and one of the page's
 *                     before-and-after questions about it, with the line (level 1: its three answers to circle). The
 *                     question about the text and the diagram together and "what does the diagram show that the text does
 *                     not tell?" need the whole text, or have no one wording, and stay out.
 *   steps (G2-522)    the steps the page's why-question links (the bank's why.steps), whole, with their signal words,
 *                     and the question "Why must ... before ...?" with its three answers to circle (review
 *                     en.review-1119-read: the first sentences of the steps and "Which word starts the step ...?" only
 *                     asked to find and copy a word). The flow chart of the level-2 page (the steps in the child's words)
 *                     has no one wording and stays out.
 *   FORMS: a page built for form A or B of a check reads only the texts that form gives the lesson (CHECK_TEXTS). */
/** the texts of each lesson's part in each form of the unit check (no text in both forms) */
const CHECK_TEXTS = { A: { diagram: ['frog-cycle', 'ladybug-cycle'], steps: ['bread', 'wool'] }, B: { diagram: ['butterfly-cycle', 'moon-phases'], steps: ['paper', 'orange-juice'] } };
/** the form a check page is built for: build-checks seeds its pages "check|<unit>|A…" or "…|B…"; none outside a check */
const checkFormOf = (ctx) => { const m = /^check\|[^|]+\|([AB])\d*\|/.exec(String((ctx && ctx.rng && ctx.rng.seed) || '')); return m ? m[1] : null; };
/** a diagram question the check asks in other words (review en.review-1119-read2: "Which stage comes right after the
 *  chrysalis?" is answered by the title word, the butterfly, without the diagram; the stage after the caterpillar needs it) */
const CHECK_DIAGRAM_Q = { 'butterfly-cycle|Which stage comes right after the chrysalis?': { q: 'Which stage comes right after the caterpillar?', answer: 'the chrysalis', wrong: ['the egg', 'the butterfly'] } };
function info2bCheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`info-text-g2b check: the informational texts are English texts (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = LEVELS[mode][lv] || LEVELS[mode][2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const att = (s) => esc(s).replace(/"/g, '&quot;');
  const LW = W - 40;
  const write = (answer, h) => (key ? line({ w: LW, h, answer }) : line({ w: LW, h }).replace('<div data-lcs-line', `<div data-lcs-line data-lcs-answer="${att(answer)}"`));
  const circle = (right, wrong, column) => { const at = rng.int(0, 2); return choices(placed(right, shuffle(wrong, rng), at), at, key, { column, font: 16 }).replace(' data-lcs-ok="1"', ' data-lcs-ok="1" data-lcs-correct="1"'); };
  const ask = (q) => `<div data-lcs-checkq style="font:700 17px/1.3 'Nunito',sans-serif;color:${T.ink};padding:0 6px">${esc(q)}</div>`;
  const card = (t, inner) => `<div data-lcs-text="${att(t.id)}" style="display:flex;flex-direction:column;gap:4px;padding:0">${inner}</div>`;
  const form = checkFormOf(ctx);
  // (outside a check, the texts of both forms: honey, whose two steps run past the card's height, and the bean are in none)
  const ofForm = (list) => list.filter((x) => (form ? CHECK_TEXTS[form][mode] : [...CHECK_TEXTS.A[mode], ...CHECK_TEXTS.B[mode]]).includes(x.id));
  const cards = [];
  if (mode === 'diagram') for (const t of shuffle(ofForm(DIAGRAMS), rng)) {
    const drawn = `<div data-lcs-excerpt style="padding:2px 0 0"><div data-lcs-title style="font:700 19px/1.2 'Baloo 2',cursive;color:${T.ink};padding:0 6px">${esc(t.title)}</div><div data-lcs-dgtitle style="font:700 16px/1.2 'Baloo 2',cursive;color:${T.teal};margin-bottom:2px;padding:0 6px">Diagram: ${esc(t.diagram.title)}</div>${diagramOf(t, { lv: 1, key: false })}</div>`;
    for (const q of t.questions.slice(0, 4)) {
      const x = CHECK_DIAGRAM_Q[t.id + '|' + q.q] || q;
      if (readsOf(t, q).count) continue;                                   // how many stages: the circle page only
      cards.push(card(t, drawn + ask(x.q) + (lv === 1 ? circle(x.answer, x.wrong, false) : write(x.answer, Math.max(d.rowH || 34, 34)))));
    }
  }
  // the steps the why-question links (the bank's why.steps), printed whole with their signal words, and the page's question
  // "Why must ... before ...?" with its three answers (review en.review-1119-read: the first words of the steps only made a
  // find-and-copy task, and left "the chips" and "the pulp" unexplained)
  if (mode === 'steps') for (const t of shuffle(ofForm(STEPS), rng)) {
    const x = t.mc.find((m) => m.kind === 'before');
    const paras = t.why.steps.map((n) => `<div data-lcs-step="${n}" style="font:700 ${d.font}px/1.34 'Nunito',sans-serif;color:${T.ink};margin-top:${n === t.why.steps[0] ? 0 : 3}px">${esc(t.paras[n].join(' '))}</div>`).join('');
    cards.push(card(t, `<div data-lcs-excerpt style="padding:5px 12px 7px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF"><div data-lcs-title style="font:700 21px/1.15 'Baloo 2',cursive;color:${T.ink};margin-bottom:2px">${esc(t.title)}</div>${paras}</div>` +
      ask(x.q) + circle(x.answer, x.wrong, false)));
  }
  return { bodyHtml: `<div data-lcs-info2bcheck="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''}>` + checkGrid(cards, { cols: 1 }) + `</div>`, meta: {} };
}

module.exports = { makeInfoText2bType, faultsOfDiagram, faultsOfSteps, readsOf, usableAt3, DIAGRAMS, STEPS, LEVELS };
