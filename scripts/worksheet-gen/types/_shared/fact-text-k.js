/**
 * fact-text-k.js — two Kindergarten pages on ONE fact text (English literacy year, Daily Teaching System Part 12.3,
 * 2026-11-15; unit "Reading to Learn: Fact Texts"). The text is four short sentences in big print with a big library
 * picture of its topic (data/literacy/info-texts.en.json, key `k`). The teacher reads the text and the questions
 * aloud; a child answers with a picture, not with writing.
 *
 *   facts   Find the Facts (RI.K.1: with prompting and support, ask and answer questions about key details in a text)
 *             level 1  four questions, three pictures under each, the child circles the one that answers
 *             level 2  four questions, the child DRAWS each answer in a box
 *             level 3  two questions to draw, one more fact of the text to draw, and a question of the child's own
 *                      about the topic (written, or told to the teacher who writes it)
 *   topic   What Is It All About? (RI.K.2: identify the main topic and retell key details of a text)
 *             level 1  circle the picture of what the WHOLE text is about (the topic and two details), then circle
 *                      one thing the text tells about it (a detail of the text and two things it never names)
 *             level 2  circle the main topic, then draw two things the text tells about it
 *             level 3  circle the main topic, then draw two things and write a word for each
 *
 *   pictures  Pictures That Teach (RI.K.7: with prompting and support, describe the relationship between illustrations
 *             and the text in which they appear). The sentences of the text stand one under the other, the pictures
 *             that go with them beside them in another order; the child draws a line from each sentence to its picture.
 *               level 1  three sentences and three pictures
 *               level 2  four sentences and four pictures
 *               level 3  four sentences, three pictures and an empty box: the child draws the picture that is missing
 *   change    First, Then (RI.K.3: with prompting and support, describe the connection between two events or pieces
 *             of information in a text). Only texts that tell a change (a caterpillar becomes a butterfly).
 *               level 1  three pictures to cut out (what comes first, what comes then, one that is no part of it);
 *                        the child glues two of them into the boxes First and Then
 *               level 2  the child draws what comes first and what comes then
 *               level 3  the child draws both and writes a word under each drawing
 *
 * English only (the texts are written to the Common Core's Kindergarten; another language gets its own texts).
 * Themeless: a copy is another text (meta.items names the text). PDF only. The answer key rings the right picture
 * and shows the pictures of the key details in the drawing boxes (samples: a child may draw another true fact).
 */
'use strict';
const { writingRow } = require('../../primitives/trace-path.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/info-texts.en.json');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pk = (p) => p.theme + '/' + p.noun;
const words = (s) => String(s).split(/\s+/).filter(Boolean).length;

// The picture cache is on the machines that BUILD pages (the PC, the makers' build). The server loads every type module
// for its content gates and has no cache: there the pictures are not looked up (the deploy of 2026-11-15 stopped on it).
let HAVE_PICTURES = true;
try { require('../../image-cache/resolve.js').manifest(); } catch (e) { HAVE_PICTURES = false; }

/** What must be true of a Kindergarten text before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(t) {
  const f = [], id = t.id;
  if (!Array.isArray(t.sentences) || t.sentences.length !== 4) return [id + ': not four sentences'];
  const n = words(t.sentences.join(' '));
  if (n < 18 || n > 34) f.push(`${id}: ${n} words (a Kindergarten fact text has 18 to 34)`);
  t.sentences.forEach((s, i) => { if (words(s) > 11) f.push(`${id} S${i + 1}: ${words(s)} words in one sentence`); if (!/[.!]$/.test(s)) f.push(`${id} S${i + 1}: no end mark`); });
  if (!t.picture || !t.title) f.push(id + ': no picture or title');
  if (!Array.isArray(t.questions) || t.questions.length !== 4) return f.concat(id + ': not four questions');
  const rights = t.questions.map((q) => pk(q.right));
  if (new Set(rights).size !== 4) f.push(id + ': two questions are answered by the same picture');
  t.questions.forEach((q, i) => {
    if (!/[?.]$/.test(q.q)) f.push(`${id} Q${i + 1}: no end mark`);
    if (!(q.sentence >= 1 && q.sentence <= 4)) f.push(`${id} Q${i + 1}: its sentence is not in the text`);
    if (!Array.isArray(q.wrong) || q.wrong.length !== 2 || new Set([pk(q.right), ...q.wrong.map(pk)]).size !== 3) f.push(`${id} Q${i + 1}: not three different pictures`);
    for (const w of q.wrong || []) if (rights.includes(pk(w)) || pk(w) === pk(t.picture)) f.push(`${id} Q${i + 1}: the wrong picture ${pk(w)} is a thing the text tells about`);
  });
  if (t.questions.some((q, i) => i && q.sentence < t.questions[i - 1].sentence)) f.push(id + ': the questions do not follow the text');
  const tw = (t.topic && t.topic.wrong) || [];
  if (!t.topic || pk(t.topic.right) !== pk(t.picture) || tw.length !== 2 || tw.some((w) => !rights.includes(pk(w)))) f.push(id + ': the main-topic pictures are not the topic and two details of the text');
  if (!Array.isArray(t.details) || t.details.length !== 2 || t.details.some((s) => !t.questions.some((q) => q.sentence === s))) f.push(id + ': not two key-detail sentences that a question asks about');
  const mt = t.match;
  if (mt && (!Array.isArray(mt.pics) || mt.pics.length !== 4 || new Set(mt.pics.map(pk)).size !== 4)) f.push(id + ': the matching page has not four different pictures');
  if (mt && (!Array.isArray(mt.leaveOut) || !mt.leaveOut.length || mt.leaveOut.some((n) => !(n >= 1 && n <= 4)))) f.push(id + ': the matching page does not say which picture may be the missing one');
  if (mt && mt.sentences && (mt.sentences.length !== 4 || mt.sentences.some((x) => words(x) > 11 || !/[.!]$/.test(x)))) f.push(id + ': the matching page has not four short sentences of its own');
  if (t.change && t.change.sentences && (t.change.sentences.length !== 4 || t.change.sentences.some((x) => words(x) > 11))) f.push(id + ': the first-then page has not four short sentences of its own');
  if (t.change) {
    const c = t.change, three = [c.first, c.then, c.other].map(pk);
    if (!c.question || !/\?$/.test(c.question)) f.push(id + ': the first-then page has no question that says which change is meant');
    if (new Set(three).size !== 3 || !c.firstWord || !c.thenWord) f.push(id + ': the change is not two different pictures with their words and a third picture');
    else if (((mt && mt.pics) || []).map(pk).includes(pk(c.other)) || pk(c.other) === pk(t.picture)) f.push(id + ': the picture that is no part of the change is a picture of the text');
  }
  if (HAVE_PICTURES) for (const p of [t.picture, ...t.questions.flatMap((q) => [q.right, ...(q.wrong || [])]), ...tw, ...((mt && mt.pics) || []), ...(t.change ? [t.change.first, t.change.then, t.change.other] : [])]) { try { fileUri(p.theme, p.noun); } catch (e) { f.push(`${id}: no library picture ${pk(p)}`); } }
  return f;
}
const TEXTS = BANK.k || [];
// the texts of the first batch: Find the Facts and What Is It All About? draw from these, so that their published pages
// stay what they are when the bank grows (a text added later carries `since`)
const FIRST = TEXTS.filter((t) => !t.since);
{ const f = TEXTS.flatMap(faultsOf); if (f.length) throw new Error('info-texts.en.json (k): ' + f.join('; ')); }

const LEVELS = {
  facts: { 1: { font: 27, pic: 88 }, 2: { font: 27 }, 3: { font: 26 } },
  topic: { 1: { font: 28, pic: 104 }, 2: { font: 27, pic: 92 }, 3: { font: 26, pic: 84 } },
  pictures: { 1: { n: 3, font: 27, pic: 112 }, 2: { n: 4, font: 26, pic: 100 }, 3: { n: 4, font: 26, pic: 100, missing: true } },
  change: { 1: { font: 25, pic: 116 }, 2: { font: 27 }, 3: { font: 26 } },
};

function textBox(t, font, sentences = t.sentences) {
  return `<div data-lcs-facttext="${t.id}" data-lcs-words="${words(sentences.join(' '))}" style="flex:0 0 auto;display:flex;gap:18px;align-items:center;padding:12px 18px 14px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div style="flex:1 1 auto;min-width:0"><div data-lcs-title style="font:700 30px/1.15 'Baloo 2',cursive;color:${T.teal};margin-bottom:4px">${esc(t.title)}</div>` +
    sentences.map((s, i) => `<div data-lcs-sent="${i + 1}" style="font:700 ${font}px/1.5 'Nunito',sans-serif;color:${T.ink}">${esc(s)}</div>`).join('') + `</div>` +
    `<img class="ws-icon" data-lcs-pic="${esc(pk(t.picture))}" src="${fileUri(t.picture.theme, t.picture.noun)}" alt="" style="flex:0 0 auto;width:156px;height:156px;display:block;object-fit:contain"></div>`;
}
const img = (p, size, attrs = '') => `<img class="ws-icon" ${attrs} src="${fileUri(p.theme, p.noun)}" alt="" style="width:${size}px;height:${size}px;display:block;object-fit:contain">`;
/** three pictures to circle one of; the key rings the right one */
function pictures(list, right, key, size) {
  return `<div data-lcs-choices style="display:flex;justify-content:space-evenly;align-items:center;gap:8px">` +
    list.map((p, i) => `<span data-lcs-choice="${esc(pk(p))}"${i === right ? ' data-lcs-ok="1"' : ''} style="display:inline-flex;padding:6px;border:3px solid ${key && i === right ? T.teal : 'transparent'};border-radius:50%">${img(p, size)}</span>`).join('') + `</div>`;
}
const placed = (right, wrong, at) => { const out = wrong.slice(); out.splice(at, 0, right); return out; };
const card = (attrs, label, inner, labelPx = 20) => `<div ${attrs} style="display:flex;flex-direction:column;gap:6px;padding:10px 12px;border-radius:14px;background:${T.cream};min-height:0;min-width:0">` +
  `<div data-lcs-label style="font:700 ${labelPx}px/1.25 'Nunito',sans-serif;color:${T.ink}">${label}</div>${inner}</div>`;
/** a box to draw in; the key shows a sample picture in it */
const drawBox = (sample, key, attrs = '') => `<div data-lcs-draw ${attrs} style="flex:1 1 auto;min-height:96px;display:flex;align-items:center;justify-content:center;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF">` +
  (key && sample ? `<span data-lcs-key-sample="1">${img(sample, 84)}</span>` : '') + `</div>`;
const row = (w, h) => `<div data-lcs-line style="line-height:0">${writingRow({ w, h, glyphH: Math.round(h * 0.54), xHeight: true }).svg}</div>`;
/** places for the right answers of n questions with three pictures each: every place is used, never a staircase */
function placesFor(n, rng) {
  for (let t = 0; t < 200; t++) {
    const p = Array.from({ length: n }, () => rng.int(0, 2));
    if (new Set(p).size < 3 || p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]) || /^(012|210)/.test(p.join(''))) continue;
    return p;
  }
  return [1, 0, 2, 1].slice(0, n);
}

function makeFactTextKType({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('fact-text-k: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the fact texts are English texts (no ${locale} bank)`);
      if (!TEXTS.length) throw new Error(`${id}: the bank holds no Kindergarten text`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const pool = mode === 'change' ? TEXTS.filter((x) => x.change) : mode === 'pictures' ? TEXTS.filter((x) => x.match) : FIRST;
      if (!pool.length) throw new Error(`${id}: the bank holds no text for this page`);
      const t = rng.sample(pool, 1)[0];
      const about = esc(t.title.toLowerCase());
      let below = '', items = [];

      if (mode === 'facts') {
        if (lv === 1) {
          const at = placesFor(4, rng);
          // a row per question: the question at the left, its three pictures at the right
          below = t.questions.map((q, n) => `<div data-lcs-question="${n + 1}" data-lcs-sentence="${q.sentence}" style="display:flex;align-items:center;gap:10px;padding:6px 14px;border-radius:14px;background:${T.cream};min-height:0;min-width:0">` +
            `<div data-lcs-label style="flex:0 0 40%;font:700 22px/1.25 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">${n + 1}.</span> ${esc(q.q)}</div>` +
            `<div style="flex:1 1 auto;min-width:0">${pictures(placed(q.right, shuffle(q.wrong, rng), at[n]), at[n], key, d.pic)}</div></div>`).join('');
          items = t.questions.map((q) => t.id + ': ' + q.q);
        } else {
          const qs = lv === 2 ? t.questions : shuffle(t.questions, rng).slice(0, 2).sort((a, b) => a.sentence - b.sentence);
          below = qs.map((q, n) => card(`data-lcs-question="${n + 1}" data-lcs-sentence="${q.sentence}"`, `<span style="color:${T.teal}">${n + 1}.</span> ${esc(q.draw || q.q)}`, drawBox(q.right, key))).join('');
          if (lv === 3) {
            const other = t.questions.find((q) => !qs.includes(q));
            below += card('data-lcs-morefact="1"', `<span style="color:${T.teal}">3.</span> Draw one more fact from the text.`, drawBox(other.right, key)) +
              card('data-lcs-ownquestion="1"', `<span style="color:${T.teal}">4.</span> Ask your own question about ${about}.`, `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly">${row(300, 54)}${row(300, 54)}</div>`);
          }
          items = qs.map((q) => t.id + ': ' + q.q);
        }
        below = lv === 1
          ? `<div data-lcs-grid style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:1fr;grid-template-rows:repeat(4,1fr);gap:8px">${below}</div>`
          : `<div data-lcs-grid style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:10px">${below}</div>`;
      }

      if (mode === 'topic') {
        const at = rng.int(0, 2);
        const topicCard = card('data-lcs-topic="1"', 'What is the whole text about? Circle the picture.', pictures(placed(t.topic.right, shuffle(t.topic.wrong, rng), at), at, key, d.pic), 21);
        const det = t.details.map((s) => t.questions.find((q) => q.sentence === s));
        let second;
        if (lv === 1) {
          const q = rng.pick(det);
          let at2 = rng.int(0, 2); if (at2 === at) at2 = (at2 + 1 + rng.int(0, 1)) % 3;        // never under the topic's place
          second = card(`data-lcs-detail="1" data-lcs-sentence="${q.sentence}"`, `Circle one thing the text tells about ${about}.`, pictures(placed(q.right, shuffle(q.wrong, rng), at2), at2, key, d.pic), 21);
        } else {
          const boxes = det.map((q, i) => `<div data-lcs-detailbox="${i + 1}" style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:4px">${drawBox(q.right, key)}${lv === 3 ? row(300, 50) : ''}</div>`).join('');
          second = card('data-lcs-detail="2"', `Draw two things the text tells about ${about}.${lv === 3 ? ' Write a word for each.' : ''}`, `<div style="flex:1 1 auto;min-height:0;display:flex;gap:12px">${boxes}</div>`, 21);
        }
        below = `<div data-lcs-stack style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:10px">${topicCard}<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column">${second.replace('min-height:0;min-width:0">', 'min-height:0;min-width:0;flex:1 1 auto">')}</div></div>`;
        items = [t.id + ': topic', ...t.details.map((s) => t.id + ': S' + s)];
      }

      if (mode === 'pictures') {
        // n sentences in the order of the text; their pictures beside them, none opposite its own sentence
        const all = (t.match.sentences || t.sentences).map((x, i) => ({ n: i + 1, text: x, pic: t.match.pics[i] }));
        const rowsS = d.n === 4 ? all : shuffle(all, rng).slice(0, 3).sort((a, b) => a.n - b.n);
        let rowsP;
        for (let k = 0; k < 200; k++) { rowsP = shuffle(rowsS, rng); if (rowsP.every((x, i) => x.n !== rowsS[i].n)) break; }
        const miss = d.missing ? rng.pick(t.match.leaveOut.filter((n) => rowsS.some((x) => x.n === n))) : 0;
        const yOf = (i) => ((i + 0.5) / d.n) * 100;
        const dot = `<span style="flex:0 0 auto;width:16px;height:16px;border-radius:50%;background:${T.ink}"></span>`;
        const left = rowsS.map((x, i) => `<div data-lcs-msent="${x.n}" style="grid-column:1;grid-row:${i + 1};display:flex;align-items:center;gap:10px;min-width:0"><div style="flex:1 1 auto;min-width:0;padding:10px 14px;border-radius:14px;background:${T.cream};font:700 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(x.text)}</div>${dot}</div>`).join('');
        const right = rowsP.map((x, i) => `<div data-lcs-mpic="${x.n}" style="grid-column:3;grid-row:${i + 1};display:flex;align-items:center;gap:10px;min-width:0">${dot}` +
          (x.n === miss ? `<div data-lcs-draw data-lcs-missing="1" style="flex:0 0 auto;width:${d.pic + 20}px;height:${d.pic + 8}px;display:flex;align-items:center;justify-content:center;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF">${key ? `<span data-lcs-key-sample="1">${img(x.pic, d.pic - 16)}</span>` : ''}</div>` : img(x.pic, d.pic, `data-lcs-shown="${esc(pk(x.pic))}"`)) + `</div>`).join('');
        const lines = key ? `<svg data-lcs-keylines viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none">` +
          rowsS.map((x, i) => `<line x1="60.5" y1="${yOf(i).toFixed(2)}" x2="71.5" y2="${yOf(rowsP.findIndex((p) => p.n === x.n)).toFixed(2)}" stroke="${T.teal}" stroke-width="3" vector-effect="non-scaling-stroke"/>`).join('') + `</svg>` : '';
        const head = `<div data-lcs-facttext="${t.id}" data-lcs-words="${words((t.match.sentences || t.sentences).join(' '))}" style="flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:6px 18px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
          `<div data-lcs-title style="font:700 32px/1.15 'Baloo 2',cursive;color:${T.teal}">${esc(t.title)}</div></div>`;
        const match = `<div data-lcs-match="${rowsS.map((x) => x.n).join(',')}|${rowsP.map((x) => x.n).join(',')}" data-lcs-mayleave="${t.match.leaveOut.join(',')}" style="flex:1 1 auto;min-height:0;position:relative;display:grid;grid-template-columns:60% 12% 28%;grid-template-rows:repeat(${d.n},1fr);row-gap:8px">${left}${right}${lines}</div>`;
        return {
          bodyHtml: `<div data-ws-content data-lcs-factk="${mode}|${lv}" style="flex:1 1 auto;display:flex;flex-direction:column;gap:10px;min-height:0">${head}${match}</div>`,
          meta: { text: t.id, items: rowsS.map((x) => t.id + ': S' + x.n) },
        };
      }

      if (mode === 'change') {
        const c = t.change;
        const arrow = `<svg width="74" height="44" viewBox="0 0 74 44" aria-hidden="true" style="flex:0 0 auto;align-self:center"><path d="M4 22h54" stroke="${T.teal}" stroke-width="6" stroke-linecap="round"/><path d="M48 8l16 14-16 14" fill="none" stroke="${T.teal}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        const label = (w) => `<div style="font:700 24px/1.1 'Baloo 2',cursive;color:${T.teal};text-align:center">${w}</div>`;
        const side = 138;
        const slot = (which, sample, word) => `<div data-lcs-step="${which}" style="flex:1 1 0;min-width:0;min-height:0;display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:4px">${label(which === 'first' ? 'First' : 'Then')}` +
          (lv === 1 ? `<div data-lcs-glue style="flex:0 0 auto;align-self:center;width:${side}px;height:${side}px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:12px;background:#FFFFFF">${key ? `<span data-lcs-key-sample="1">${img(sample, d.pic - 8)}</span>` : ''}</div>` : drawBox(sample, key)) +
          (lv === 3 ? `<div data-lcs-line style="line-height:0;align-self:center">${key ? seatOnRow(writingRow({ w: 250, h: 50, glyphH: 27, xHeight: true }).svg, word, { fill: T.teal }) : writingRow({ w: 250, h: 50, glyphH: 27, xHeight: true }).svg}</div>` : '') + `</div>`;
        // the question says WHICH change is meant: a text tells more than one thing that comes after another
        const steps = `<div data-lcs-steps style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:6px;padding:10px 14px;border-radius:14px;background:${T.cream}">` +
          `<div data-lcs-label data-lcs-changeq style="flex:0 0 auto;font:700 23px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(c.question)}</div>` +
          `<div style="flex:1 1 auto;min-height:0;display:flex;align-items:stretch;gap:10px">${slot('first', c.first, c.firstWord)}${arrow}${slot('then', c.then, c.thenWord)}</div></div>`;
        let cut = '';
        if (lv === 1) {
          let order; for (let k = 0; k < 50; k++) { order = shuffle([['first', c.first], ['then', c.then], ['other', c.other]], rng); if (order[0][0] !== 'first' || order[1][0] !== 'then') break; }
          cut = `<div data-lcs-cut style="flex:0 0 auto;display:flex;justify-content:space-evenly;align-items:center;padding:8px 10px;border-top:2.5px dashed ${T.ink}">` +
            order.map(([w, p]) => `<span data-lcs-cutpic="${w}" style="display:inline-flex;align-items:center;justify-content:center;width:${side}px;height:${side}px;border:2.5px dashed ${T.ink};border-radius:6px;background:#FFFFFF">${img(p, d.pic)}</span>`).join('') + `</div>`;
        }
        return {
          bodyHtml: `<div data-ws-content data-lcs-factk="${mode}|${lv}" style="flex:1 1 auto;display:flex;flex-direction:column;gap:10px;min-height:0">${textBox(t, d.font, c.sentences || t.sentences)}${steps}${cut}</div>`,
          meta: { text: t.id, items: [t.id + ': first ' + c.firstWord, t.id + ': then ' + c.thenWord] },
        };
      }

      return {
        bodyHtml: `<div data-ws-content data-lcs-factk="${mode}|${lv}" style="flex:1 1 auto;display:flex;flex-direction:column;gap:10px;min-height:0">${textBox(t, d.font)}${below}</div>`,
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-factk]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsFactk.split('|'), lv = +lvS;
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root);
        const box = document.querySelector('[data-lcs-facttext]');
        const n = +box.dataset.lcsWords;
        if (n < 18 || n > 34) fails.push(`the text has ${n} words`);
        const sents = mode === 'pictures' ? [] : [...box.querySelectorAll('[data-lcs-sent]')];
        if (mode !== 'pictures' && sents.length !== 4) fails.push(sents.length + ' sentences');
        sents.forEach((s, i) => { if (parseFloat(getComputedStyle(s).fontSize) < 24) fails.push('sentence ' + (i + 1) + ' is not in big print'); if (R(s).height > parseFloat(getComputedStyle(s).fontSize) * 1.5 * 2 + 2) fails.push('sentence ' + (i + 1) + ' runs over more than two lines'); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const big = box.querySelector('[data-lcs-pic]');
        if (mode !== 'pictures' && (!big || R(big).width < 140)) fails.push('no big picture of the topic');
        if (mode === 'pictures' && big) fails.push('the matching page shows the picture of the text beside its title: it is one of the pictures to match');
        // nothing leaves the page or its card
        [...root.children].forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); });
        document.querySelectorAll('[data-lcs-question], [data-lcs-topic], [data-lcs-detail], [data-lcs-morefact], [data-lcs-ownquestion], [data-lcs-steps], [data-lcs-cut]').forEach((c) => { const cb = R(c); c.querySelectorAll('img, svg, [data-lcs-draw], [data-lcs-label]').forEach((e) => { const r = R(e); if (r.width && (r.left < cb.left - 0.5 || r.right > cb.right + 0.5 || r.top < cb.top - 0.5 || r.bottom > cb.bottom + 0.5)) fails.push('something leaves its card'); }); });
        const sets = [...document.querySelectorAll('[data-lcs-choices]')];
        sets.forEach((c, i) => {
          const all = [...c.querySelectorAll('[data-lcs-choice]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1) fails.push(`pictures ${i + 1}: not three with one right`);
          if (new Set(all.map((e) => e.dataset.lcsChoice)).size !== 3) fails.push(`pictures ${i + 1}: one picture twice`);
          all.forEach((e) => { if (R(e.querySelector('img')).width < 70) fails.push(`pictures ${i + 1}: a picture too small to see`); });
          const xs = all.map((e) => R(e)); if (xs.some((r, k) => k && r.left < xs[k - 1].right - 0.5)) fails.push(`pictures ${i + 1}: two pictures overlap`);
        });
        const place = (c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk);
        const draws = [...document.querySelectorAll('[data-lcs-draw]')];
        draws.forEach((b) => { const r = R(b); if (r.height < 90 || r.width < 120) fails.push('a drawing box too small to draw in (' + Math.round(r.width) + ' × ' + Math.round(r.height) + ')'); });
        const isKey = sets.some((c) => [...c.querySelectorAll('[data-lcs-ok]')].some((e) => !/transparent|rgba\(0, 0, 0, 0\)/.test(getComputedStyle(e).borderTopColor))) || !!document.querySelector('[data-lcs-key-sample]');
        if (!isKey && draws.some((b) => b.querySelector('img'))) fails.push('a drawing box of the child already holds a picture');
        if (mode === 'facts') {
          const qs = [...document.querySelectorAll('[data-lcs-question]')];
          const order = qs.map((q) => +q.dataset.lcsSentence);
          if (order.some((x, i) => i && x < order[i - 1])) fails.push('the questions do not follow the text');
          if (lv === 1) {
            if (qs.length !== 4 || sets.length !== 4 || draws.length) fails.push('level 1 is not four questions with pictures to circle');
            const p = sets.map(place);
            if (new Set(p).size < 3) fails.push('the right pictures do not use all three places: ' + p.join(''));
            if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) fails.push('three right pictures in one place in a row: ' + p.join(''));
            if (/^(012|210)/.test(p.join(''))) fails.push('the right pictures begin as a staircase: ' + p.join(''));
          }
          if (lv === 2 && (qs.length !== 4 || draws.length !== 4 || sets.length)) fails.push('level 2 is not four questions with a box to draw in');
          if (lv === 3) {
            if (qs.length !== 2 || draws.length !== 3 || sets.length) fails.push('level 3 is not two questions and one more fact to draw');
            const own = document.querySelector('[data-lcs-ownquestion]');
            if (!own || own.querySelectorAll('[data-lcs-line]').length !== 2) fails.push('no two lines for the child\'s own question');
            if (!document.querySelector('[data-lcs-morefact]')) fails.push('no box for one more fact');
          }
        }
        if (mode === 'pictures') {
          const m = document.querySelector('[data-lcs-match]');
          const [sS, pS] = m.dataset.lcsMatch.split('|').map((x) => x.split(',').map(Number));
          const want = lv === 1 ? 3 : 4;
          const L = [...m.querySelectorAll('[data-lcs-msent]')], P = [...m.querySelectorAll('[data-lcs-mpic]')];
          if (L.length !== want || P.length !== want) fails.push(L.length + ' sentences and ' + P.length + ' pictures, ' + want + ' of each wanted');
          if (sS.some((x, i) => i && x <= sS[i - 1])) fails.push('the sentences do not follow the text');
          if ([...sS].sort().join() !== [...pS].sort().join()) fails.push('the pictures are not the pictures of these sentences');
          if (sS.some((x, i) => x === pS[i])) fails.push('a picture stands opposite its own sentence');
          L.forEach((e, i) => { if (parseFloat(getComputedStyle(e.firstElementChild).fontSize) < 24) fails.push('a sentence is not in big print'); const r = R(e), p = R(P[i]); if (Math.abs((r.top + r.bottom) / 2 - (p.top + p.bottom) / 2) > 2) fails.push('row ' + (i + 1) + ': sentence and picture are not on one line'); if (r.right > p.left + 0.5) fails.push('row ' + (i + 1) + ': the sentence runs into the picture'); });
          for (let i = 1; i < L.length; i++) if (R(L[i]).top < R(L[i - 1]).bottom - 0.5) fails.push('two sentences overlap');
          P.forEach((e) => { const r = R(e), mb = R(m); if (r.right > mb.right + 0.5 || r.bottom > mb.bottom + 0.5 || r.top < mb.top - 0.5) fails.push('a picture leaves the matching field'); });
          const shown = P.map((e) => (e.querySelector('[data-lcs-shown]') || {}).dataset).filter(Boolean).map((x) => x.lcsShown);
          if (new Set(shown).size !== shown.length) fails.push('one picture twice');
          const missing = m.querySelectorAll('[data-lcs-missing]').length;
          if (lv === 3 ? missing !== 1 : missing !== 0) fails.push(missing + ' empty boxes on level ' + lv);
          const mb = m.querySelector('[data-lcs-missing]');
          if (mb && !m.dataset.lcsMayleave.split(',').includes(mb.closest('[data-lcs-mpic]').dataset.lcsMpic)) fails.push('the missing picture is one whose absence leaves two answers');
          const kl = m.querySelectorAll('[data-lcs-keylines] line').length;
          if (isKey ? kl !== want : kl !== 0) fails.push(kl + ' answer lines');
          if (sets.length) fails.push('the matching page has no pictures to circle');
        }
        if (mode === 'change') {
          const st = [...document.querySelectorAll('[data-lcs-step]')];
          if (st.length !== 2 || st[0].dataset.lcsStep !== 'first' || st[1].dataset.lcsStep !== 'then' || R(st[0]).left > R(st[1]).left) fails.push('not First on the left and Then on the right');
          const cut = [...document.querySelectorAll('[data-lcs-cutpic]')];
          if (lv === 1) {
            if (cut.length !== 3 || new Set(cut.map((e) => e.dataset.lcsCutpic)).size !== 3) fails.push('level 1 is not three pictures to cut out');
            if (cut.length === 3 && cut[0].dataset.lcsCutpic === 'first' && cut[1].dataset.lcsCutpic === 'then') fails.push('the pictures to cut out already stand in the right order');
            const glue = [...document.querySelectorAll('[data-lcs-glue]')];
            if (glue.length !== 2) fails.push(glue.length + ' boxes to glue into');
            glue.forEach((g) => cut.forEach((c) => { if (Math.abs(R(g).width - R(c).width) > 1 || Math.abs(R(g).height - R(c).height) > 1) fails.push('a cut-out picture does not fit its box'); }));
            if (!isKey && glue.some((g) => g.querySelector('img'))) fails.push('a box to glue into already holds a picture');
            if (draws.length) fails.push('a drawing box on the cut-and-glue page');
          } else {
            if (cut.length || draws.length !== 2) fails.push('levels 2 and 3 are not two boxes to draw in');
            const rows = document.querySelectorAll('[data-lcs-line]').length;
            if (lv === 3 ? rows !== 2 : rows !== 0) fails.push(rows + ' writing lines on level ' + lv);
          }
          const cq = document.querySelector('[data-lcs-changeq]');
          if (!cq || !/\?$/.test(cq.textContent.trim())) fails.push('no question that says which change is meant');
          if (sets.length) fails.push('the first-then page has no pictures to circle');
        }
        if (mode === 'topic') {
          const tp = document.querySelector('[data-lcs-topic]');
          if (!tp || tp.querySelectorAll('[data-lcs-choice]').length !== 3) fails.push('no three pictures for the main topic');
          else if (tp.querySelector('[data-lcs-ok]').dataset.lcsChoice !== big.dataset.lcsPic) fails.push('the main topic is not the picture of the text');
          if (lv === 1) {
            if (sets.length !== 2 || draws.length) fails.push('level 1 is not two rows of pictures to circle');
            else if (place(sets[0]) === place(sets[1])) fails.push('the two right pictures stand one under the other');
          } else {
            if (sets.length !== 1 || draws.length !== 2) fails.push('levels 2 and 3 are not one row of pictures and two boxes to draw in');
            const rows = document.querySelectorAll('[data-lcs-line]').length;
            if (lv === 3 ? rows !== 2 : rows !== 0) fails.push(rows + ' writing lines on level ' + lv);
          }
        }
        return fails;
      });
    },
  };
}

module.exports = { makeFactTextKType, faultsOf, TEXTS, LEVELS };
