/**
 * info-text.js — three Grade 1 pages on ONE information text (English literacy year, Daily Teaching System Part 12.3,
 * 2026-11-15; unit "Reading to Learn: Information Texts"). The reading banks held stories only; these are the first
 * pages whose text informs (data/literacy/info-texts.en.json: about 60 words in two parts, each with a heading; one
 * word in bold in each part; a library picture with a caption; a three-word glossary).
 *
 *   details   Read the Facts (RI.1.1: ask and answer questions about key details in a text). Four questions, each
 *             answered by one sentence of the text.
 *               level 1  three answers under each question, the child circles one
 *               level 2  the child writes the answer on a line that begins with a sentence starter
 *               level 3  the child writes the answer and underlines the sentence of the text that tells it
 *   topic     Main Topic and Key Details (RI.1.2: identify the main topic and retell key details of a text).
 *               level 1  the child circles the main topic (of three: the topic, a detail, a thing only mentioned)
 *                        and copies one key detail
 *               level 2  the child writes the main topic and two key details
 *               level 3  the child writes the main topic and three key details in his or her own words
 *   features  Use the Text Features (RI.1.5: know and use text features — headings, glossaries … — to locate key
 *             facts or information in a text). The glossary is printed under the text. Find-it questions, each
 *             answered from a heading, a bold word, the glossary or the caption — not from the running text.
 *               level 1  five questions, three answers under each, the child circles one
 *               level 2  five questions, the child writes each answer
 *               level 3  four questions to write, and a second picture that needs a caption
 *
 *   label     Name the Text Features (RI.1.5, the "know" half: a child names a feature before using it). Numbered dots
 *             stand at parts of the text; the child writes each number in the box by the part's name.
 *               level 1  four parts: title, heading, picture, caption
 *               level 2  six parts: and a bold word and the glossary
 *               level 3  six parts, and three jobs ("It tells what a word means.") to give to the right part
 *
 * English only (the texts are written for the Common Core's Grade 1; another language gets its own texts with its own
 * curriculum's reading aims). Themeless: a copy is another text (meta.items names the text, so two copies of a level
 * never share one). PDF only. The answer key circles, prints the answer sentence in teal on the line (a key detail a
 * child words differently is right too: those lines are marked as samples) and underlines the telling sentences.
 */
'use strict';
const { writingRow } = require('../../primitives/trace-path.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/info-texts.en.json');

const W = 675;                                   // the page body's inner width (measured on the rendered page)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const sentencesOf = (t) => t.sections.flatMap((s) => s.sentences);
const wordsOf = (t) => sentencesOf(t).join(' ').split(/\s+/).filter(Boolean).length;
const stem = (w) => String(w).toLowerCase().replace(/(s|ed|ing)$/, '');

/** What must be true of a text before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(t) {
  const f = [], S = sentencesOf(t), id = t.id;
  const n = wordsOf(t);
  if (n < 50 || n > 80) f.push(`${id}: ${n} words (a Grade 1 information text has 50 to 80)`);
  if (t.sections.length !== 2 || t.sections.some((s) => !s.heading || s.sentences.length < 3)) f.push(`${id}: not two parts with a heading and three sentences or more`);
  if (t.bold.length !== 2) f.push(`${id}: not two bold words`);
  t.sections.forEach((s, i) => {
    const here = t.bold.filter((b) => new RegExp('\\b' + b + '\\b').test(s.sentences.join(' ')));
    const first = t.bold.filter((b) => { const k = S.findIndex((x) => new RegExp('\\b' + b + '\\b').test(x)); return k >= 0 && sectionOf(t, k) === i; });
    if (first.length !== 1) f.push(`${id}: part ${i + 1} first shows ${first.length} bold words (${here.join(', ')}), not one`);
  });
  for (const b of t.bold) if (!t.glossary.some((g) => stem(g.word) === stem(b))) f.push(`${id}: the bold word "${b}" is not in the glossary`);
  if (t.glossary.length !== 3 || t.glossary.some((g) => !g.word || !g.meaning)) f.push(`${id}: the glossary has not three words with a meaning`);
  if (t.glossary.map((g) => g.word).join('|') !== t.glossary.map((g) => g.word).sort().join('|')) f.push(`${id}: the glossary is not in ABC order`);
  if (!t.caption || !/[.!]$/.test(t.caption)) f.push(`${id}: no caption sentence`);
  if (t.questions.length !== 4) f.push(`${id}: ${t.questions.length} questions`);
  t.questions.forEach((q, i) => {
    if (!/\?$/.test(q.q)) f.push(`${id} q${i + 1}: no question mark`);
    if (q.choices.length !== 3 || new Set(q.choices).size !== 3 || !(q.correct >= 0 && q.correct < 3)) f.push(`${id} q${i + 1}: not three different answers with one right`);
    if (!(q.sentence >= 1 && q.sentence <= S.length)) f.push(`${id} q${i + 1}: its sentence ${q.sentence} is not in the text`);
    if (!q.starter || !q.full || !q.full.startsWith(q.starter + ' ') || !/\.$/.test(q.full)) f.push(`${id} q${i + 1}: the answer sentence does not begin with the starter`);
    if (q.starter && q.full && q.full.slice(q.starter.length).trim().split(/\s+/).length < 1) f.push(`${id} q${i + 1}: the starter leaves nothing to write`);
  });
  if (new Set(t.questions.map((q) => q.sentence)).size !== t.questions.length) f.push(`${id}: two questions are answered by one sentence`);
  const tp = t.topic || {};
  if (!tp.right || !tp.detail || !tp.mentioned || new Set([tp.right, tp.detail, tp.mentioned]).size !== 3) f.push(`${id}: not three different topic choices`);
  if (!Array.isArray(t.details) || t.details.length !== 3) f.push(`${id}: not three key details`);
  const kinds = t.features.map((x) => x.kind).sort().join(',');
  if (kinds !== 'bold,caption,glossary,heading,heading') f.push(`${id}: the find-it questions are ${kinds}`);
  for (const x of t.features) {
    if (x.kind === 'heading' && !t.sections.some((s) => s.heading === x.answer)) f.push(`${id}: "${x.answer}" is no heading of the text`);
    if (x.kind === 'bold' && !t.bold.includes(x.answer)) f.push(`${id}: "${x.answer}" is not in bold`);
    if (x.kind === 'glossary' && !t.glossary.some((g) => g.meaning === x.answer)) f.push(`${id}: "${x.answer}" is no meaning of the glossary`);
  }
  if (t.features.filter((x) => x.kind === 'heading').map((x) => x.answer).sort().join('|') !== t.sections.map((s) => s.heading).sort().join('|')) f.push(`${id}: the two heading questions do not ask for the two headings`);
  if (!t.lure || t.bold.includes(t.lure) || !new RegExp('\\b' + t.lure + '\\b').test(S.join(' '))) f.push(`${id}: no plain word of the text as the wrong bold word`);
  if (!t.headLure || t.headLure === t.title || t.sections.some((x) => x.heading === t.headLure)) f.push(id + ': no third choice for the heading questions (a heading the text does not have)');
  if (!Array.isArray(t.capChoices) || t.capChoices.length !== 2) f.push(`${id}: not two wrong answers for the caption question`);
  if (!t.picture || !t.picture2 || !t.picture2.sample) f.push(`${id}: a picture or the second picture's sample caption is missing`);
  return f;
}
function sectionOf(t, k) { let n = 0; for (let i = 0; i < t.sections.length; i++) { n += t.sections[i].sentences.length; if (k < n) return i; } return -1; }

const TEXTS = BANK.g1;
{ const f = TEXTS.flatMap(faultsOf); if (f.length) throw new Error('info-texts.en.json: ' + f.join('; ')); }

const LEVELS = {
  details: { 1: { font: 22, rowH: 0, qFont: 21, pad: 7 }, 2: { font: 21, rowH: 58, qFont: 20 }, 3: { font: 20, rowH: 56, qFont: 20 } },
  topic: { 1: { font: 23, rowH: 66, details: 1, rows: 3 }, 2: { font: 21, rowH: 52, details: 2, rows: 2 }, 3: { font: 18, rowH: 42, details: 3, rows: 2 } },
  label: { 1: { font: 24, parts: 4, cols: 2, box: 72, gap: 26 }, 2: { font: 22, parts: 6, cols: 2, box: 58, gap: 16 }, 3: { font: 18, parts: 6, cols: 3, box: 44, gap: 10, jobs: true } },
  features: { 1: { font: 17, n: 5, qFont: 18 }, 2: { font: 17, n: 5, rowH: 43, qFont: 19 }, 3: { font: 17, n: 4, rowH: 40, qFont: 18 } },
};

/** the text in its box: title, the two parts (heading + sentences, one bold word each), the picture and its caption */
function textBox(t, { font, glossary, underline, badges }) {
  // a numbered dot at a part of the text (the naming page)
  const bd = (f) => (badges && badges.get(f) ? `<span data-lcs-badge="${f}|${badges.get(f)}" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:${T.coral};color:#FFFFFF;font:800 15px/1 'Nunito',sans-serif;font-style:normal;vertical-align:middle;margin:0 5px;-webkit-text-stroke:0">${badges.get(f)}</span>` : '');
  const done = new Set();
  let k = 0;
  const parts = t.sections.map((s, si) => {
    const sents = s.sentences.map((x) => {
      k++;
      let h = esc(x);
      for (const b of t.bold) {
        if (done.has(b)) continue;
        const re = new RegExp('\\b' + b + '\\b');
        if (re.test(h)) { h = h.replace(re, `${done.size ? '' : bd('bold')}<b data-lcs-bold="${esc(b)}" style="font-weight:800;-webkit-text-stroke:0.7px ${T.ink}">${esc(b)}</b>`); done.add(b); }
      }
      const u = underline && underline.get(k);
      return `<span data-lcs-sent="${k}"${u ? ` data-lcs-underlined="${u}" style="text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:2.5px;text-underline-offset:4px"` : ''}>${h}</span>` +
        (u ? `<sup style="font:800 12px/1 'Nunito',sans-serif;color:${T.teal}">${u}</sup>` : '');
    }).join(' ');
    return `<div data-lcs-part="${si + 1}"><div data-lcs-heading style="font:700 ${font + 2}px/1.25 'Baloo 2',cursive;color:${T.teal};margin-top:${si ? 6 : 0}px">${esc(s.heading)}${si ? '' : bd('heading')}</div>` +
      `<div style="font:700 ${font}px/1.45 'Nunito',sans-serif;color:${T.ink}">${sents}</div></div>`;
  }).join('');
  const pic = `<figure style="flex:0 0 150px;margin:0;display:flex;flex-direction:column;align-items:center;gap:4px;position:relative">` +
    (badges && badges.get('picture') ? `<span style="position:absolute;left:-8px;top:0">${bd('picture')}</span>` : '') +
    `<img class="ws-icon" data-lcs-pic="${esc(t.picture.theme + '/' + t.picture.noun)}" src="${fileUri(t.picture.theme, t.picture.noun)}" alt="" style="width:132px;height:132px;display:block;object-fit:contain">` +
    `<figcaption data-lcs-caption style="font:700 14px/1.3 'Nunito',sans-serif;font-style:italic;color:${T.ink};text-align:center">${bd('caption')}${esc(t.caption)}</figcaption></figure>`;
  const gl = glossary ? `<div data-lcs-glossary style="margin-top:8px;padding-top:6px;border-top:2px dashed ${T.teal};display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:4px 14px;align-items:start">` +
    `<div style="font:700 16px/1.3 'Baloo 2',cursive;color:${T.teal}">Glossary${bd('glossary')}</div>` +
    t.glossary.map((g) => `<div data-lcs-gloss="${esc(g.word)}" style="font:700 14px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="font-weight:800;-webkit-text-stroke:0.5px ${T.ink}">${esc(g.word)}</span><br>${esc(g.meaning)}</div>`).join('') + `</div>` : '';
  return `<div data-lcs-infotext="${t.id}" data-lcs-words="${wordsOf(t)}" style="flex:0 0 auto;padding:10px 16px 12px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div data-lcs-title style="font:700 26px/1.15 'Baloo 2',cursive;color:${T.ink};margin-bottom:2px">${esc(t.title)}${bd('title')}</div>` +
    `<div style="display:flex;gap:16px;align-items:flex-start"><div style="flex:1 1 auto;min-width:0">${parts}</div>${pic}</div>${gl}</div>`;
}

const rowSvg = (w, h) => writingRow({ w, h, glyphH: Math.round(h * 0.54), xHeight: true }).svg;
/** a writing line; `starter` is printed on it in ink, `answer` (the key) in teal */
function line({ w, h, starter, answer, sample }) {
  const base = rowSvg(w, h);
  const svg = answer ? seatOnRow(base, answer, { fill: T.teal }) : starter ? seatOnRow(base, starter, { fill: T.ink }) : base;
  return `<div data-lcs-line${starter && !answer ? ` data-lcs-startertext="${esc(starter)}"` : ''}${answer ? ` data-lcs-answer="${esc(answer)}"` : ''}${answer && sample ? ' data-lcs-key-sample="1"' : ''} style="line-height:0">${svg}</div>`;
}
/** answers to circle; the key rings the right one */
function choices(list, right, key, { column, font = 18 } = {}) {
  return `<div data-lcs-choices style="display:flex;${column ? 'flex-direction:column;align-items:flex-start;gap:1px' : 'flex-wrap:wrap;gap:2px 22px'};padding-left:22px">` +
    list.map((c, i) => `<span data-lcs-choice="${i}"${i === right ? ' data-lcs-ok="1"' : ''} style="font:700 ${font}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border:2.5px solid ${key && i === right ? T.teal : 'transparent'};border-radius:999px">${esc(c)}</span>`).join('') + `</div>`;
}
const qCard = (i, q, inner, attrs = '', qFont = 18, pad = 4) => `<div data-lcs-question="${i + 1}" ${attrs} style="display:flex;flex-direction:column;gap:2px;padding:${pad}px 12px ${pad + 1}px;border-radius:14px;background:${T.cream}">` +
  `<div style="font:700 ${qFont}px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">${i + 1}.</span> ${esc(q)}</div>${inner}</div>`;

/** places for the right answers of n questions with three answers each: every place is used, never a staircase */
function placesFor(n, rng) {
  for (let t = 0; t < 200; t++) {
    const p = Array.from({ length: n }, () => rng.int(0, 2));
    if (new Set(p).size < 3) continue;
    if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue;                       // three in a row
    const d = p.slice(1).map((x, i) => x - p[i]);
    if (d.slice(0, 2).every((x) => x === 1) || d.slice(0, 2).every((x) => x === -1)) continue;           // 0-1-2 or 2-1-0 to begin
    return p;
  }
  return [1, 0, 2, 1, 0].slice(0, n);
}
const placed = (right, wrong, at) => { const out = wrong.slice(); out.splice(at, 0, right); return out; };

function makeInfoTextType({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('info-text: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G1', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the information texts are English texts (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(TEXTS, 1)[0];
      const inner = W - 24;                                        // a card's inner width
      let below = '', items = [], underline = null;

      if (mode === 'details') {
        const qs = shuffle(t.questions.map((q, i) => ({ q, i })), rng).sort((a, b) => a.q.sentence - b.q.sentence);   // in the order of the text
        const at = placesFor(qs.length, rng);
        if (lv === 3 && key) underline = new Map(qs.map((x, n) => [x.q.sentence, n + 1]));
        below = qs.map(({ q }, n) => {
          if (lv === 1) {
            const wrong = shuffle(q.choices.filter((_, c) => c !== q.correct), rng);
            return qCard(n, q.q, choices(placed(q.choices[q.correct], wrong, at[n]), at[n], key, { font: 21 }), `data-lcs-sentence="${q.sentence}"`, d.qFont, d.pad);
          }
          return qCard(n, q.q, line({ w: inner, h: d.rowH, starter: lv === 2 ? q.starter : null, answer: key ? q.full : null }), `data-lcs-sentence="${q.sentence}"`, d.qFont);
        }).join('');
        items = qs.map(({ q }) => t.id + ': ' + q.q);
      }

      if (mode === 'topic') {
        const tp = t.topic;
        const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        let topicCard;
        if (lv === 1) {
          const at = rng.int(0, 2);
          topicCard = `<div data-lcs-topic style="display:flex;flex-direction:column;gap:2px;padding:6px 12px;border-radius:14px;background:${T.cream}">` +
            `<div style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">What is this text mostly about?</div>` +
            choices(placed(tp.right, shuffle([tp.detail, tp.mentioned], rng), at), at, key, { font: 20 }) + `</div>`;
        } else {
          topicCard = `<div data-lcs-topic style="display:flex;flex-direction:column;gap:2px;padding:6px 12px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
            `<div style="font:700 18px/1.3 'Baloo 2',cursive;color:${T.teal}">Main topic</div>` +
            line({ w: inner - 5, h: d.rowH, starter: lv === 2 ? 'This text is about' : null, answer: key ? (lv === 2 ? `This text is about ${tp.right}.` : cap(tp.right)) : null }) + `</div>`;
        }
        const label = lv === 1 ? 'Copy one key detail from the text.' : null;
        const detailCards = Array.from({ length: d.details }, (_, n) => `<div data-lcs-detail="${n + 1}" style="display:flex;flex-direction:column;gap:2px;padding:6px 12px;border-radius:14px;background:${T.cream}">` +
          `<div style="font:700 18px/1.3 '${label ? 'Nunito' : 'Baloo 2'}',${label ? 'sans-serif' : 'cursive'};color:${label ? T.ink : T.teal}">${label || 'Key detail ' + (n + 1)}</div>` +
          line({ w: inner, h: d.rowH, answer: key ? t.details[n] : null, sample: true }) +
          Array.from({ length: d.rows - 1 }, () => line({ w: inner, h: d.rowH })).join('') + `</div>`).join('');
        below = topicCard + detailCards;
        items = [t.id + ': topic', ...t.details.slice(0, d.details).map((x) => t.id + ': ' + x)];
      }

      let badges = null;
      if (mode === 'label') {
        const NAME = { title: 'title', heading: 'heading', bold: 'bold word', picture: 'picture', caption: 'caption', glossary: 'glossary' };
        const parts = d.parts === 4 ? ['title', 'heading', 'picture', 'caption'] : ['title', 'heading', 'bold', 'picture', 'caption', 'glossary'];
        // the numbers stand at the parts in no order, and the names below follow neither the page nor the numbers
        const rising = (a) => a.every((x, i) => !i || x > a[i - 1]), falling = (a) => a.every((x, i) => !i || x < a[i - 1]);
        let nums, order;
        for (let n = 0; n < 200; n++) {
          nums = shuffle(parts.map((_, i) => i + 1), rng); order = shuffle(parts, rng);
          const want = order.map((f) => nums[parts.indexOf(f)]);
          if (!rising(nums) && !falling(nums) && !rising(want) && !falling(want) && order.join() !== parts.join()) break;
        }
        badges = new Map(parts.map((f, i) => [f, nums[i]]));
        const box = (f, extra = '') => `<span data-lcs-box="${f}" data-lcs-want="${badges.get(f)}"${extra} style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${d.box}px;height:${d.box}px;border:2.5px solid ${T.ink};border-radius:10px;background:#FFFFFF;font:800 ${Math.round(d.box * 0.55)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? badges.get(f) : ''}</span>`;
        below = `<div data-lcs-names style="display:grid;grid-template-columns:repeat(${d.cols},1fr);gap:${d.gap}px 16px;padding:${d.gap + 2}px 14px;border-radius:14px;background:${T.cream}">` +
          order.map((f) => `<div data-lcs-name="${f}" style="display:flex;align-items:center;gap:12px">${box(f)}<span style="font:700 ${d.cols === 3 ? 20 : 23}px/1.2 'Nunito',sans-serif;color:${T.ink}">${NAME[f]}</span></div>`).join('') + `</div>`;
        if (d.jobs) {
          const JOBS = shuffle([['heading', 'It tells what one part of the text is about.'], ['glossary', 'It tells what a word means.'], ['caption', 'It uses words to tell about the picture.']], rng);
          below += `<div data-lcs-jobs style="display:flex;flex-direction:column;gap:8px;padding:10px 14px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
            `<div style="font:700 18px/1.3 'Baloo 2',cursive;color:${T.teal}">Which part does this job? Write its number.</div>` +
            JOBS.map(([f, text]) => `<div data-lcs-job="${f}" style="display:flex;align-items:center;gap:12px">${box(f, ' data-lcs-jobbox="1"')}<span style="font:700 20px/1.25 'Nunito',sans-serif;color:${T.ink}">${text}</span></div>`).join('') + `</div>`;
        }
        items = parts.map((f) => t.id + ': ' + f);
      }

      if (mode === 'features') {
        let fs = t.features.slice();
        if (d.n === 4) { const drop = rng.pick(fs.filter((x) => x.kind === 'heading')); fs = fs.filter((x) => x !== drop); }
        // never the order heading, heading, bold, glossary, caption of the bank: mixed, and two heading questions apart
        for (let n = 0; n < 60; n++) { fs = shuffle(fs, rng); if (!fs.some((x, i) => i && x.kind === 'heading' && fs[i - 1].kind === 'heading')) break; }
        const at = placesFor(fs.length, rng);
        const wrongOf = (x) => x.kind === 'heading' ? [t.sections.find((s) => s.heading !== x.answer).heading, t.headLure]
          : x.kind === 'bold' ? [t.bold.find((b) => b !== x.answer), t.lure]
            : x.kind === 'glossary' ? t.glossary.filter((g) => g.meaning !== x.answer).map((g) => g.meaning)
              : t.capChoices;
        below = fs.map((x, n) => {
          if (lv === 1) {
            const long = x.kind === 'glossary' || [x.answer, ...wrongOf(x)].join('').length > 70;
            return qCard(n, x.q, choices(placed(x.answer, shuffle(wrongOf(x), rng), at[n]), at[n], key, { column: long, font: long ? 16 : 18 }), `data-lcs-feature="${x.kind}"`, d.qFont);
          }
          return qCard(n, x.q, line({ w: inner, h: d.rowH, answer: key ? x.answer : null }), `data-lcs-feature="${x.kind}"`, d.qFont);
        }).join('');
        if (lv === 3) {
          const p2 = t.picture2;
          below += `<div data-lcs-caption-task style="display:flex;align-items:center;gap:14px;padding:6px 12px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
            `<img class="ws-icon" data-lcs-pic2="${esc(p2.theme + '/' + p2.noun)}" src="${fileUri(p2.theme, p2.noun)}" alt="" style="flex:0 0 auto;width:84px;height:84px;display:block;object-fit:contain">` +
            `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px"><div style="font:700 18px/1.3 'Nunito',sans-serif;color:${T.ink}">Write a caption for this picture.</div>` +
            line({ w: inner - 103, h: 40, answer: key ? p2.sample : null, sample: true }) + `</div></div>`;
        }
        items = fs.map((x) => t.id + ': ' + x.q);
      }

      return {
        bodyHtml: `<div data-ws-content data-lcs-info="${mode}|${lv}" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:7px;min-height:0">` +
          textBox(t, { font: d.font, glossary: mode === 'features' || mode === 'label', underline, badges }) + below + `</div>`,
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-info]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsInfo.split('|'), lv = +lvS;
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root);
        const box = document.querySelector('[data-lcs-infotext]');
        const n = +box.dataset.lcsWords;
        if (n < 50 || n > 80) fails.push(`the text has ${n} words`);
        // the text: a title, two parts with a heading, one bold word in each, a picture that loaded, a caption
        const parts = [...box.querySelectorAll('[data-lcs-part]')];
        if (parts.length !== 2) fails.push(`${parts.length} parts`);
        parts.forEach((p, i) => { if (!p.querySelector('[data-lcs-heading]').textContent.trim()) fails.push(`part ${i + 1} has no heading`); const b = p.querySelectorAll('[data-lcs-bold]').length; if (b !== 1) fails.push(`part ${i + 1} has ${b} bold words`); });
        box.querySelectorAll('[data-lcs-bold]').forEach((b) => { if (parseFloat(getComputedStyle(b).webkitTextStrokeWidth) < 0.5) fails.push('a bold word is not printed bolder than the text'); });
        const im = box.querySelector('[data-lcs-pic]');
        if (!im || !im.complete || !im.naturalWidth) fails.push('the picture did not load');
        const cap = box.querySelector('[data-lcs-caption]');
        if (!cap || cap.textContent.trim().split(/\s+/).length < 3) fails.push('no caption under the picture');
        if (cap && im && R(cap).top < R(im).bottom - 1) fails.push('the caption is not under its picture');
        const gl = box.querySelectorAll('[data-lcs-gloss]').length;
        if (mode === 'features' || mode === 'label' ? gl !== 3 : gl !== 0) fails.push(`a glossary of ${gl} words on a ${mode} page`);
        // nothing leaves the page, no two blocks overlap, the stack fills the body
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        box.querySelectorAll('*').forEach((e) => { const r = R(e), b = R(box); if (r.width && (r.right > b.right + 0.5 || r.bottom > b.bottom + 0.5)) fails.push('something leaves the text box'); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        // the task
        const isKey = !!document.querySelector('[data-lcs-answer]') || [...document.querySelectorAll('[data-lcs-ok]')].some((e) => !/transparent|rgba\(0, 0, 0, 0\)/.test(getComputedStyle(e).borderTopColor));
        const qs = [...document.querySelectorAll('[data-lcs-question]')];
        const choiceSets = [...document.querySelectorAll('[data-lcs-choices]')];
        choiceSets.forEach((c, i) => {
          const all = [...c.querySelectorAll('[data-lcs-choice]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1) fails.push(`answers ${i + 1}: not three with one right`);
          if (new Set(all.map((e) => e.textContent.trim().toLowerCase())).size !== 3) fails.push(`answers ${i + 1}: two answers read the same`);
          all.forEach((e) => { const r = R(e), b = R(c.parentElement); if (r.right > b.right + 0.5) fails.push(`answers ${i + 1}: an answer leaves its card`); });
        });
        const place = (c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk);
        const inQ = choiceSets.filter((c) => c.closest('[data-lcs-question]')).map(place);
        if (inQ.length >= 4) {
          if (new Set(inQ).size < 3) fails.push('the right answers do not use all three places: ' + inQ.join(''));
          if (inQ.some((x, i) => i >= 2 && x === inQ[i - 1] && x === inQ[i - 2])) fails.push('three right answers in one place in a row: ' + inQ.join(''));
          if (/^(012|210)/.test(inQ.join(''))) fails.push('the right answers begin as a staircase: ' + inQ.join(''));
        }
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).right > R(l.parentElement).right + 0.5) fails.push('a writing line leaves its card'); });
        if (mode === 'details') {
          if (qs.length !== 4) fails.push(`${qs.length} questions`);
          const order = qs.map((q) => +q.dataset.lcsSentence);
          if (order.some((x, i) => i && x <= order[i - 1])) fails.push('the questions do not follow the text');
          if (lv === 1 && (choiceSets.length !== 4 || lines.length)) fails.push('level 1 is not four questions with answers to circle');
          if (lv > 1 && (choiceSets.length || lines.length !== 4)) fails.push('levels 2 and 3 are not four questions with a line each');
          if (!isKey && lv === 2 && lines.some((l) => !l.dataset.lcsStartertext)) fails.push('a line of level 2 has no sentence starter');
          if (!isKey && lv === 3 && lines.some((l) => l.dataset.lcsStartertext)) fails.push('a line of level 3 has a sentence starter');
          const ul = document.querySelectorAll('[data-lcs-underlined]').length;
          if (isKey && lv === 3 ? ul !== 4 : ul !== 0) fails.push(`${ul} underlined sentences`);
        }
        if (mode === 'topic') {
          const tp = document.querySelector('[data-lcs-topic]'), det = document.querySelectorAll('[data-lcs-detail]').length;
          if (!tp) fails.push('no main topic box');
          if (det !== lv) fails.push(`${det} key detail boxes on level ${lv}`);
          if (lv === 1 ? choiceSets.length !== 1 : choiceSets.length !== 0) fails.push('the topic is circled on level 1 only');
          if (lv > 1 && !tp.querySelector('[data-lcs-line]')) fails.push('no line for the main topic');
        }
        if (mode === 'label') {
          const want = lv === 1 ? 4 : 6;
          const dots = [...document.querySelectorAll('[data-lcs-badge]')].map((e) => { const [f, n] = e.dataset.lcsBadge.split('|'); return { e, f, n: +n }; });
          if (dots.length !== want) fails.push(dots.length + ' numbered dots, ' + want + ' wanted');
          if (dots.map((x) => x.n).sort((a, b) => a - b).join() !== Array.from({ length: want }, (_, i) => i + 1).join()) fails.push('the dots are not numbered 1 to ' + want);
          const at = { title: '[data-lcs-title]', heading: '[data-lcs-heading]', bold: '[data-lcs-part]', picture: 'figure', caption: '[data-lcs-caption]', glossary: '[data-lcs-glossary]' };
          for (const x of dots) {
            if (!x.e.closest(at[x.f])) fails.push('the dot of the ' + x.f + ' does not stand at it');
            if (x.f === 'bold' && !(x.e.nextElementSibling && x.e.nextElementSibling.matches('[data-lcs-bold]'))) fails.push('the dot of the bold word does not stand before a bold word');
            if (R(x.e).width < 20) fails.push('a dot too small to read');
          }
          const inOrder = dots.map((x) => x.n);
          if (inOrder.every((n, i) => !i || n > inOrder[i - 1])) fails.push('the dots count up in the order of the page');
          const names = [...document.querySelectorAll('[data-lcs-name]')];
          if (names.length !== want) fails.push(names.length + ' names for ' + want + ' dots');
          const wants = names.map((e) => +e.querySelector('[data-lcs-box]').dataset.lcsWant);
          names.forEach((e) => { const f = e.dataset.lcsName, d = dots.find((x) => x.f === f); if (!d || d.n !== +e.querySelector('[data-lcs-box]').dataset.lcsWant) fails.push('the key of "' + f + '" is not the number at that part'); if (!e.textContent.replace(/\d/g, '').trim()) fails.push('a box without a name'); });
          if (wants.every((n, i) => !i || n > wants[i - 1]) || wants.every((n, i) => !i || n < wants[i - 1])) fails.push('the answers below count up or down: ' + wants.join(''));
          const jobs = [...document.querySelectorAll('[data-lcs-job]')];
          if (lv === 3 ? jobs.length !== 3 : jobs.length !== 0) fails.push(jobs.length + ' jobs on level ' + lv);
          jobs.forEach((e) => { const d = dots.find((x) => x.f === e.dataset.lcsJob); if (!d || d.n !== +e.querySelector('[data-lcs-box]').dataset.lcsWant) fails.push('the key of a job is not the number of its part'); });
          if (new Set(jobs.map((e) => e.dataset.lcsJob)).size !== jobs.length) fails.push('two jobs of one part');
          document.querySelectorAll('[data-lcs-box]').forEach((b) => { const r = R(b); if (r.width < 40 || r.height < 40) fails.push('a box too small to write a number in'); });
          if (choiceSets.length || lines.length) fails.push('the naming page has neither choices nor writing lines');
        }
        if (mode === 'features') {
          const want = lv === 3 ? 4 : 5;
          if (qs.length !== want) fails.push(`${qs.length} find-it questions`);
          const kinds = qs.map((q) => q.dataset.lcsFeature);
          for (const k of ['heading', 'bold', 'glossary', 'caption']) if (!kinds.includes(k)) fails.push('no question about the ' + k);
          if (kinds.some((k, i) => i && k === 'heading' && kinds[i - 1] === 'heading')) fails.push('the two heading questions stand together');
          if (lv === 1 ? choiceSets.length !== 5 || lines.length : choiceSets.length) fails.push('level 1 circles, levels 2 and 3 write');
          const task = document.querySelector('[data-lcs-caption-task]');
          if ((lv === 3) !== !!task) fails.push('the caption task belongs to level 3 only');
          if (task) { const p = task.querySelector('img'); if (!p.complete || !p.naturalWidth) fails.push('the second picture did not load'); if (p.dataset.lcsPic2 === im.dataset.lcsPic) fails.push('the second picture is the first again'); }
        }
        return fails;
      });
    },
  };
}

module.exports = { makeInfoTextType, faultsOf, TEXTS, LEVELS, placesFor };
