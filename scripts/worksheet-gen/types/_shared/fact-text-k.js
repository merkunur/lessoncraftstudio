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
 * English only (the texts are written to the Common Core's Kindergarten; another language gets its own texts).
 * Themeless: a copy is another text (meta.items names the text). PDF only. The answer key rings the right picture
 * and shows the pictures of the key details in the drawing boxes (samples: a child may draw another true fact).
 */
'use strict';
const { writingRow } = require('../../primitives/trace-path.js');
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/info-texts.en.json');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pk = (p) => p.theme + '/' + p.noun;
const words = (s) => String(s).split(/\s+/).filter(Boolean).length;

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
  for (const p of [t.picture, ...t.questions.flatMap((q) => [q.right, ...(q.wrong || [])]), ...tw]) { try { fileUri(p.theme, p.noun); } catch (e) { f.push(`${id}: no library picture ${pk(p)}`); } }
  return f;
}
const TEXTS = BANK.k || [];
{ const f = TEXTS.flatMap(faultsOf); if (f.length) throw new Error('info-texts.en.json (k): ' + f.join('; ')); }

const LEVELS = {
  facts: { 1: { font: 27, pic: 88 }, 2: { font: 27 }, 3: { font: 26 } },
  topic: { 1: { font: 28, pic: 104 }, 2: { font: 27, pic: 92 }, 3: { font: 26, pic: 84 } },
};

function textBox(t, font) {
  return `<div data-lcs-facttext="${t.id}" data-lcs-words="${words(t.sentences.join(' '))}" style="flex:0 0 auto;display:flex;gap:18px;align-items:center;padding:12px 18px 14px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div style="flex:1 1 auto;min-width:0"><div data-lcs-title style="font:700 30px/1.15 'Baloo 2',cursive;color:${T.teal};margin-bottom:4px">${esc(t.title)}</div>` +
    t.sentences.map((s, i) => `<div data-lcs-sent="${i + 1}" style="font:700 ${font}px/1.5 'Nunito',sans-serif;color:${T.ink}">${esc(s)}</div>`).join('') + `</div>` +
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
      const t = rng.sample(TEXTS, 1)[0];
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
        const sents = [...box.querySelectorAll('[data-lcs-sent]')];
        if (sents.length !== 4) fails.push(sents.length + ' sentences');
        sents.forEach((s, i) => { if (parseFloat(getComputedStyle(s).fontSize) < 24) fails.push('sentence ' + (i + 1) + ' is not in big print'); if (R(s).height > parseFloat(getComputedStyle(s).fontSize) * 1.5 * 2 + 2) fails.push('sentence ' + (i + 1) + ' runs over more than two lines'); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const big = box.querySelector('[data-lcs-pic]');
        if (!big || R(big).width < 140) fails.push('no big picture of the topic');
        // nothing leaves the page or its card
        [...root.children].forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); });
        document.querySelectorAll('[data-lcs-question], [data-lcs-topic], [data-lcs-detail], [data-lcs-morefact], [data-lcs-ownquestion]').forEach((c) => { const cb = R(c); c.querySelectorAll('img, svg, [data-lcs-draw], [data-lcs-label]').forEach((e) => { const r = R(e); if (r.width && (r.left < cb.left - 0.5 || r.right > cb.right + 0.5 || r.top < cb.top - 0.5 || r.bottom > cb.bottom + 0.5)) fails.push('something leaves its card'); }); });
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
