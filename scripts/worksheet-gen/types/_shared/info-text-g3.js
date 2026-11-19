/**
 * info-text-g3.js — four Grade 3 pages on ONE informational text of four paragraphs (English literacy year, Daily
 * Teaching System Part 12.3, 2026-11-16; unit "Information Texts: Main Idea and Text Features", Grade 3). The texts are
 * the key `g3` of data/literacy/info-texts.en.json: about 230 words in four numbered paragraphs, each with a heading,
 * and one library picture.
 *
 *   evidence  Answer with Evidence (RI.3.1: ask and answer questions, referring explicitly to the text as the basis
 *             for the answers). Every answer is proved by one paragraph.
 *               level 1  five questions with three answers each; the paragraph to look in is named
 *               level 2  five questions: write the answer and the number of the paragraph that proves it
 *               level 3  three questions: the answer, the paragraph, and (on two lines) the sentence of the text that proves it
 *   ask       Ask and Answer (RI.3.1, the other half: ASK questions). A sentence of the text is an answer.
 *               level 1  four sentences of the text; circle the question each one answers (one wrong question asks
 *                        about the same paragraph, so no child matches by a repeated word)
 *               level 2  four sentences of the text; write the question each one answers (its first word is given)
 *               level 3  three questions of the child's own (first word given), their answers and paragraphs
 *   mainidea  Main Idea and Key Details (RI.3.2: determine the main idea, recount the key details and explain how
 *             they support it). The paragraphs are printed without their headings.
 *               level 1  circle the main idea (one sentence is too narrow, one too wide); check the three key
 *                        details among four sentences (one is not in the text)
 *               level 2  write the main idea and three key details
 *               level 3  write the main idea, three key details and a summary of three lines
 *   paras     The Main Idea of Each Paragraph (RI.3.2, the step before: what each paragraph is mostly about). The
 *             paragraphs are printed without their headings.
 *               level 1  give each of five statements the number of its paragraph (one fits none); choose the best
 *                        heading for two paragraphs
 *               level 2  write what each paragraph is mostly about
 *               level 3  write a heading for each paragraph and what it is mostly about
 *
 * WRITING LINES: one ruled baseline, the row as high as wide-ruled paper, as wide as the page (rule()); a first word
 * or "The text says:" is a small label at the start of the line. Read 2026-11-16 by a US Grade 3 reviewer with the
 * rendered pages; every finding applied.
 *
 * English only. Themeless: a copy is another text (meta.items names the text). PDF only.
 * The bank is checked when this file loads (faultsOf); no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/info-texts.en.json');
const { placesFor, _parts } = require('./info-text.js');
const { W, esc, shuffle, choices, placed } = _parts;

const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
const partText = (p) => p.sentences.join(' ');
const WORDS = ['Who', 'What', 'Where', 'When', 'Why', 'How'];

/** What must be true of a Grade 3 text before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(t) {
  const f = [], id = t.id;
  if (!Array.isArray(t.parts) || t.parts.length !== 4) return [id + ': not four paragraphs'];
  const total = wordsIn(t.parts.map(partText).join(' '));
  if (total < 200 || total > 265) f.push(`${id}: ${total} words (a Grade 3 text has 200 to 265)`);
  t.parts.forEach((p, i) => {
    const n = wordsIn(partText(p));
    if (!p.heading || !p.focus || p.sentences.length < 4) f.push(`${id} paragraph ${i + 1}: no heading, no focus or fewer than four sentences`);
    if (n < 45 || n > 72) f.push(`${id} paragraph ${i + 1}: ${n} words (a paragraph has 45 to 72)`);
    p.sentences.forEach((x) => { if (wordsIn(x) > 24) f.push(`${id} paragraph ${i + 1}: a sentence of ${wordsIn(x)} words`); });
  });
  if (new Set(t.parts.map((p) => p.focus)).size !== 4 || !t.focusLure || t.parts.some((p) => p.focus === t.focusLure)) f.push(id + ': not four different focuses and one that fits no paragraph');
  if (new Set(t.parts.map((p) => p.heading)).size !== 4) f.push(id + ': two paragraphs share a heading');
  if (!t.title || !t.picture || !t.picture.theme || !t.picture.noun) f.push(id + ': no title or no picture');
  const mi = t.mainIdea || {};
  if (!mi.right || !mi.narrow || !mi.wide || new Set([mi.right, mi.narrow, mi.wide]).size !== 3 || [mi.right, mi.narrow, mi.wide].some((x) => !/\.$/.test(x) || x.length > 110)) f.push(id + ': not three different main-idea sentences of at most 110 letters');
  if (!Array.isArray(t.details) || t.details.length !== 3 || new Set(t.details).size !== 3 || !t.notInText || t.details.includes(t.notInText) || [...(t.details || []), t.notInText].some((x) => !/\.$/.test(x) || x.length > 96)) f.push(id + ': not three key details and one sentence that is not in the text (at most 96 letters each)');
  if (!t.summary || t.summary.split(/(?<=[.!?])\s+/).length > 3) f.push(id + ': no summary of at most three sentences');
  const qs = t.questions || [];
  if (qs.length !== 5) f.push(id + ': not five questions');
  qs.forEach((x, i) => {
    if (!/\?$/.test(x.q)) f.push(`${id}: "${x.q}" has no question mark`);
    if (!Array.isArray(x.wrong) || x.wrong.length !== 2 || new Set([x.answer, ...x.wrong]).size !== 3) f.push(`${id}: "${x.q}" has not one right and two different wrong answers`);
    if (!(x.part >= 1 && x.part <= 4) || !t.parts[x.part - 1].sentences.includes(x.proof)) f.push(`${id}: the proof of "${x.q}" is no sentence of paragraph ${x.part}`);
    if (i && x.part < qs[i - 1].part) f.push(`${id}: the questions do not follow the text`);
    // the proving sentence stands in one paragraph only
    if (t.parts.filter((p) => p.sentences.includes(x.proof)).length !== 1) f.push(`${id}: the proof of "${x.q}" stands in more than one paragraph`);
  });
  if (new Set(qs.map((x) => x.part)).size !== 4) f.push(id + ': a paragraph proves no answer');
  if (new Set(qs.map((x) => x.proof)).size !== qs.length) f.push(id + ': two questions are proved by one sentence');
  const ask = t.ask || [];
  if (ask.length !== 4 || new Set(ask.map((a) => a.answer)).size !== 4 || new Set(ask.map((a) => a.q)).size !== 4) f.push(id + ': not four different sentences with four different questions');
  ask.forEach((a) => {
    if (!WORDS.includes(a.word) || !a.q.startsWith(a.word + ' ') || !/\?$/.test(a.q)) f.push(`${id}: "${a.q}" does not begin with its question word ${a.word}`);
    if (!t.parts.some((p) => p.sentences.includes(a.answer))) f.push(`${id}: the answer "${a.answer}" is no sentence of the text`);
    if (!a.lure || !/\?$/.test(a.lure) || !WORDS.some((w) => a.lure.startsWith(w + ' ')) || ask.some((b) => b.q === a.lure)) f.push(`${id}: "${a.q}" has no wrong question of its own about the same paragraph`);
    if (a.answer.length > 100) f.push(`${id}: the answer "${a.answer.slice(0, 30)}..." is longer than 100 letters`);
  });
  if (new Set(ask.map((a) => a.word)).size < 3) f.push(id + ': the four questions use fewer than three question words');
  return f;
}
const TEXTS = BANK.g3 || [];
{ const f = TEXTS.flatMap(faultsOf); if (f.length) throw new Error('info-texts.en.json (g3): ' + f.join('; ')); }

const LEVELS = {
  evidence: { 1: { font: 14.5, lh: 1.3 }, 2: { font: 14.6, lh: 1.33, rowH: 30 }, 3: { font: 14.5, lh: 1.3, rowH: 29, proofH: 28 } },
  ask: { 1: { font: 14.6, lh: 1.32, quote: 14, opt: 13.5 }, 2: { font: 15, lh: 1.38, rowH: 32 }, 3: { font: 14.6, lh: 1.34, rowH: 30 } },
  mainidea: { 1: { font: 15, lh: 1.38 }, 2: { font: 15.5, lh: 1.4, rowH: 37 }, 3: { font: 14.6, lh: 1.36, rowH: 29 } },
  paras: { 1: { font: 15, lh: 1.38 }, 2: { font: 15, lh: 1.36, rowH: 30 }, 3: { font: 14.6, lh: 1.34, rowH: 30 } },
};

const tab = (n) => `<span data-lcs-paratab="${n}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;margin-top:1px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 14px/1 'Nunito',sans-serif">${n}</span>`;
/** the text in its box: the title with the picture, then the four numbered paragraphs (with or without their headings) */
function textBox(t, { font, lh, headings, numbers = true }) {   // numbers:false = no paragraph numbers
  const parts = t.parts.map((p, i) => `<div data-lcs-part="${i + 1}" style="display:flex;gap:8px;margin-top:${i ? 4 : 0}px">${numbers ? tab(i + 1) : ''}<div style="flex:1 1 auto;min-width:0">` +
    `<div data-lcs-partbody style="font:700 ${font}px/${lh} 'Nunito',sans-serif;color:${T.ink}">` + (headings ? `<span data-lcs-heading style="font:700 ${font + 1}px/1 'Baloo 2',cursive;color:${T.teal};margin-right:7px">${esc(p.heading)}</span>` : '') + `${esc(partText(p))}</div></div></div>`).join('');
  return `<div data-lcs-info3text="${t.id}" data-lcs-words="${wordsIn(t.parts.map(partText).join(' '))}" style="flex:0 0 auto;padding:6px 14px 8px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:2px"><div data-lcs-title style="font:700 24px/1.1 'Baloo 2',cursive;color:${T.ink}">${esc(t.title)}</div>` +
    `<img class="ws-icon" data-lcs-pic="${esc(t.picture.theme + '/' + t.picture.noun)}" src="${fileUri(t.picture.theme, t.picture.noun)}" alt="" style="flex:0 0 auto;width:44px;height:44px;display:block;object-fit:contain"></div>${parts}</div>`;
}
const cream = (attrs, inner, pad = 5, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:3px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (text, px = 14.5, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${text}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const numBox = (want, key, size = 30) => `<span data-lcs-numbox data-lcs-want="${want}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 ${Math.round(size * 0.58)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? want : ''}</span>`;
const paraBox = (want, key) => `<span style="flex:0 0 auto;display:inline-flex;align-items:center;gap:5px;font:700 13.5px/1 'Nunito',sans-serif;color:${T.ink}">paragraph ${numBox(want, key)}</span>`;
const FULL = 'grid-column:1 / -1';
const grid = (cells, gap = 5) => `<div data-lcs-qgrid style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:${gap}px 14px;align-content:space-between">${cells.join('')}</div>`;
const RULE = '#8C8479';
/**
 * A ruled line of Grade 3 paper: ONE baseline, the row as high as wide-ruled paper (a row of 28 px on the page is
 * 11/32 inch on Letter paper; the three-rule handwriting row of the lower grades left a band of 3/16 inch, which the
 * reviewer measured as half of what a third grader writes on). `starter` is a small label at the start of the line
 * (never big letters across the row); `answer` (the key) is written on the line in teal, as small as it must be to fit.
 */
function rule({ w, h, starter, answer, sample }) {
  const own = answer && starter && answer.startsWith(starter) ? answer.slice(starter.length).trim() : answer;
  const room = w - (starter ? starter.length * 9 + 10 : 0) - 4;
  const px = own ? Math.max(9, Math.min(15, room / (own.length * 0.55))) : 0;
  return `<div data-lcs-line${starter && !answer ? ` data-lcs-startertext="${esc(starter)}"` : ''}${answer ? ` data-lcs-answer="${esc(answer)}"` : ''}${answer && sample ? ' data-lcs-key-sample="1"' : ''} style="box-sizing:border-box;width:100%;height:${h}px;border-bottom:1.5px solid ${RULE};display:flex;align-items:flex-end;gap:8px;padding-bottom:3px;overflow:hidden">` +
    (starter ? `<span data-lcs-starter style="flex:0 0 auto;font:800 15.5px/1 'Nunito',sans-serif;color:${T.ink}">${esc(starter)}</span>` : '') +
    (own ? `<span data-lcs-keytext style="flex:0 0 auto;white-space:nowrap;font:700 ${px.toFixed(1)}px/1 'Nunito',sans-serif;color:${T.teal}">${esc(own)}</span>` : '') + `</div>`;
}
/** a key sentence spread over lines of the given widths */
const spread = (text, widths, px = 14) => { const out = widths.map(() => ''); let i = 0; for (const wd of String(text).split(' ')) { if (i < widths.length - 1 && out[i] && (out[i] + ' ' + wd).length * px * 0.55 > widths[i]) i++; out[i] += (out[i] ? ' ' : '') + wd; } return out; };
const stack = (cells, gap = 4) => `<div data-lcs-qgrid style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:${gap}px">${cells.join('')}</div>`;
/** a label and the ruled line that continues it */
const labeled = (text, lineHtml, px = 15) => `<div style="display:flex;align-items:flex-end;gap:8px"><span data-lcs-label style="flex:0 0 auto;white-space:nowrap;padding-bottom:3px;font:700 ${px}px/1 'Nunito',sans-serif;color:${T.ink}">${text}</span><div style="flex:1 1 auto;min-width:0">${lineHtml}</div></div>`;
const CHECK = `<svg width="18" height="18" viewBox="0 0 20 20"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/** `texts` + `story: true`: the page prints a STORY of another bank (story-g3.js): four paragraphs, no headings */
function makeInfoText3Type({ id, slug, mode, i18n, texts, story, levels }) {
  const POOL = texts || TEXTS;
  const SAYS = story ? 'The story says:' : 'The text says:';
  const D = LEVELS[mode] && { ...LEVELS[mode], ...(levels || {}) };   // levels: sizes of its own for a shorter text (a story)
  if (!D) throw new Error('info-text-g3: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // the unit checks (Part 7.6): the page's task made small, one card a task (info3CheckPage below; not the main-idea page)
    ...(CHECK3_MODES.has(mode) ? { checkPage(args, ctx) { return info3CheckPage(mode, args, ctx, { POOL, story, D }); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the informational texts are English texts (no ${locale} bank)`);
      if (!POOL.length) throw new Error(`${id}: the bank holds no Grade 3 text`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(POOL, 1)[0];
      const inner = W - 24, cellW = (inner - 14) / 2 - 24;   // eslint-disable-line no-unused-vars
      let below = '', items = [];

      if (mode === 'evidence') {
        if (lv === 1) {
          const at = placesFor(5, rng);
          const cells = t.questions.map((x, k) => { const opts = placed(x.answer, shuffle(x.wrong, rng), at[k]); return cream(`data-lcs-question="${k + 1}" data-lcs-para="${x.part}"`, label(num(k + 1) + esc(x.q) + ` <span data-lcs-lookin style="color:${T.teal};white-space:nowrap">(paragraph ${x.part})</span>`) + choices(opts, at[k], key, { column: opts.join('').length > 44, font: 13.5 }), 4, k === 4 ? FULL : ''); });
          below = grid(cells);
        } else if (lv === 2) {
          const cells = t.questions.map((x, k) => cream(`data-lcs-question="${k + 1}" data-lcs-para="${x.part}"`, label(num(k + 1) + esc(x.q)) +
            `<div style="display:flex;align-items:flex-end;gap:10px"><div style="flex:1 1 auto;min-width:0">${rule({ w: inner - 118, h: d.rowH, answer: key ? x.answer : null })}</div>${paraBox(x.part, key)}</div>`, 4));
          below = stack(cells);
        } else {
          // three questions from three different paragraphs
          let three;
          for (let n = 0; n < 200; n++) { three = shuffle(t.questions, rng).slice(0, 3).sort((a, b) => t.questions.indexOf(a) - t.questions.indexOf(b)); if (new Set(three.map((x) => x.part)).size === 3) break; }
          const cells = three.map((x, k) => cream(`data-lcs-question="${k + 1}" data-lcs-para="${x.part}"`, label(num(k + 1) + esc(x.q)) +
            `<div style="display:flex;align-items:flex-end;gap:10px"><div style="flex:1 1 auto;min-width:0">${rule({ w: inner - 118, h: d.rowH, answer: key ? x.answer : null })}</div>${paraBox(x.part, key)}</div>` +
            (() => { const two = key ? spread(x.proof, [inner - 130, inner]) : [null, null]; return `<div data-lcs-proofline>${rule({ w: inner, h: d.proofH, starter: SAYS, answer: two[0] ? SAYS + ' ' + two[0] : null, sample: true })}${rule({ w: inner, h: d.proofH, answer: two[1] || null, sample: true })}</div>`; })(), 4));
          below = stack(cells, 5);
          items = three.map((x) => t.id + ': ' + x.q);
        }
        if (!items.length) items = t.questions.map((x) => t.id + ': ' + x.q);
      }

      if (mode === 'ask') {
        const quote = (a, n) => `<div data-lcs-answersent style="font:700 ${d.quote || 15}px/1.25 'Nunito',sans-serif;font-style:italic;color:${T.ink}">${n ? `<span style="font-style:normal;color:${T.teal}">${n}.</span> ` : ''}"${esc(a.answer)}"</div>`;
        if (lv === 1) {
          const at = placesFor(4, rng);
          const cells = t.ask.map((a, k) => { const wrong = shuffle([a.lure, rng.pick(t.ask.filter((b) => b !== a)).q], rng); return cream(`data-lcs-question="${k + 1}" data-lcs-askword="${a.word}" data-lcs-lure="${esc(a.lure)}"`, quote(a, k + 1) + choices(placed(a.q, wrong, at[k]), at[k], key, { column: true, font: d.opt || 13 }), 4); });
          below = grid(cells);
        } else if (lv === 2) {
          const cells = t.ask.map((a, k) => cream(`data-lcs-question="${k + 1}" data-lcs-askword="${a.word}"`, quote(a, k + 1) + rule({ w: inner, h: d.rowH, starter: a.word, answer: key ? a.q : null, sample: true }), 6));
          below = stack(cells, 6);
        } else {
          // three questions of the child's own: three different first words; the key shows three of the text's own
          const three = shuffle(t.ask, rng).slice(0, 3);
          const cells = three.map((a, k) => cream(`data-lcs-ownq="${k + 1}" data-lcs-askword="${a.word}"`, label(num(k + 1) + `Ask a question about the ${story ? 'story' : 'text'}. Begin with <b>${a.word}</b>. Then answer it.`) +
            rule({ w: inner, h: d.rowH, starter: a.word, answer: key ? a.q : null, sample: true }) +
            `<div style="display:flex;align-items:flex-end;gap:10px"><div style="flex:1 1 auto;min-width:0">${rule({ w: inner - 118, h: d.rowH, starter: 'Answer:', answer: key ? 'Answer: ' + a.answer : null, sample: true })}</div>${paraBox(t.parts.findIndex((p) => p.sentences.includes(a.answer)) + 1, key)}</div>`, 6));
          below = stack(cells, 6);
        }
        items = t.ask.map((a) => t.id + ': ' + a.q);
      }

      if (mode === 'mainidea') {
        const mi = t.mainIdea;
        if (lv === 1) {
          const at = rng.int(0, 2);
          const idea = cream('data-lcs-mainidea="1"', label('What is the main idea of the whole text? Circle the sentence.', 15.5) + choices(placed(mi.right, shuffle([mi.narrow, mi.wide], rng), at), at, key, { column: true, font: 15 }), 6);
          let rows;
          for (let n = 0; n < 100; n++) { rows = shuffle([...t.details.map((s) => ({ s, ok: 1 })), { s: t.notInText, ok: 0 }], rng); if (rows[3].ok) break; }
          const tick = (on) => `<span data-lcs-tick${on ? ' data-lcs-on="1"' : ''} style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;line-height:0">${key && on ? CHECK : ''}</span>`;
          const det = cream('data-lcs-details="1"', label('Three of these sentences are key details of the text. Check them. One sentence is not in the text.', 15.5) +
            rows.map((r) => `<div data-lcs-detail="${r.ok}" style="display:flex;align-items:center;gap:10px;min-height:34px">${tick(!!r.ok)}<span data-lcs-detailtext style="font:700 15px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r.s)}</span></div>`).join(''), 7);
          below = idea + det;
        } else {
          const idea = `<div data-lcs-mainidea="1" style="display:flex;flex-direction:column;gap:2px;padding:5px 12px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">${label('The main idea of the text', 15.5, T.teal)}` +
            rule({ w: inner - 5, h: d.rowH, answer: key ? mi.right : null, sample: true }) + rule({ w: inner - 5, h: d.rowH }) + `</div>`;
          const det = cream('data-lcs-details="1"', label('Three key details that support the main idea', 15.5) +
            t.details.map((s, k) => `<div data-lcs-detailline="${k + 1}" style="display:flex;align-items:flex-end;gap:8px"><span style="flex:0 0 auto;font:800 16px/1.6 'Nunito',sans-serif;color:${T.teal}">${k + 1}</span><div style="flex:1 1 auto;min-width:0">${rule({ w: inner - 26, h: d.rowH, answer: key ? s : null, sample: true })}</div></div>`).join(''), 6);
          const sum = lv === 3 ? cream('data-lcs-summary="1"', label('Write a summary of the text in your own words.', 15.5) + rule({ w: inner, h: d.rowH, answer: key ? t.summary.split(/(?<=[.!?])\s+/)[0] : null, sample: true }) + rule({ w: inner, h: d.rowH, answer: key ? (t.summary.split(/(?<=[.!?])\s+/)[1] || null) : null, sample: true }) + rule({ w: inner, h: d.rowH, answer: key ? (t.summary.split(/(?<=[.!?])\s+/)[2] || null) : null, sample: true }), 6) : '';
          below = idea + det + sum;
        }
        items = [t.id + ': main idea', ...t.details.map((s) => t.id + ': ' + s)];
      }

      if (mode === 'paras') {
        if (lv === 1) {
          let rows;
          for (let k = 0; k < 300; k++) { rows = shuffle([...t.parts.map((p, i) => ({ n: i + 1, text: p.focus })), { n: 0, text: t.focusLure }], rng); const seq = rows.map((r) => r.n).filter(Boolean).join(''); if (seq !== '1234' && seq !== '4321' && rows[4].n !== 0) break; }
          const match = cream('data-lcs-focusmatch="1"', label('What is each paragraph mostly about? Write the number of the paragraph in the box. One box stays empty.', 15.5) +
            `<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px 18px;margin-top:2px">` + rows.map((r) => `<div data-lcs-focusrow="${r.n}" style="display:flex;align-items:center;gap:10px">${numBox(r.n || '', key, 34)}<span style="font:700 15.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r.text)}</span></div>`).join('') + `</div>`, 7);
          // the best heading for two paragraphs (the other choices are headings of other paragraphs)
          const two = shuffle([0, 1, 2, 3], rng).slice(0, 2).sort();
          const at = two.map(() => rng.int(0, 2)); if (at[0] === at[1]) at[1] = (at[1] + 1) % 3;
          const heads = two.map((pi, k) => { const wrong = shuffle(t.parts.filter((_, i) => i !== pi).map((p) => p.heading), rng).slice(0, 2); return cream(`data-lcs-question="${k + 1}" data-lcs-headfor="${pi + 1}"`, label(`Which heading fits paragraph ${pi + 1} best?`, 15) + choices(placed(t.parts[pi].heading, wrong, at[k]), at[k], key, { column: true, font: 14.5 }), 5); });
          below = match + `<div data-lcs-qgrid style="flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;gap:6px 14px">${heads.join('')}</div>`;
        } else {
          below = t.parts.map((p, i) => cream(`data-lcs-para="${i + 1}"`,
            (lv === 3 ? `<div data-lcs-headline>${labeled('A heading for paragraph ' + (i + 1) + ':', rule({ w: inner - 200, h: d.rowH, answer: key ? p.heading : null, sample: true }))}</div>` : '') +
            labeled('Paragraph ' + (i + 1) + ' is mostly about', rule({ w: inner - 205, h: d.rowH, answer: key ? p.focus : null, sample: true }), lv === 3 ? 15 : 15.5) +
            (lv === 2 ? rule({ w: inner, h: d.rowH }) : ''), lv === 3 ? 5 : 6)).join('');
        }
        items = t.parts.map((p) => t.id + ': ' + p.focus);
      }

      return {
        bodyHtml: (story ? curly : String)(`<div data-ws-content data-lcs-info3="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''}${story ? ' data-lcs-story="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` +
          textBox(t, { font: d.font, lh: d.lh, headings: !story && (mode === 'evidence' || mode === 'ask') }) + below + `</div>`),
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-info3]');
        if (!root) return ['no page'];
        // a story prints typographic quotes and apostrophes, as the Grade 1 and 2 story pages do (review en.review-1119-read2)
        if (root.dataset.lcsStory === '1' && /["']/.test(root.textContent)) fails.push('a straight quote or apostrophe in the story: the story pages print typographic marks');
        const [mode, lvS] = root.dataset.lcsInfo3.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root);
        const box = document.querySelector('[data-lcs-info3text]');
        const n = +box.dataset.lcsWords;
        if (n < 200 || n > 265) fails.push(`the text has ${n} words`);
        const parts = [...box.querySelectorAll('[data-lcs-part]')];
        if (parts.length !== 4 || [...box.querySelectorAll('[data-lcs-paratab]')].map((e) => e.dataset.lcsParatab).join('') !== '1234') fails.push('the paragraphs are not four, numbered 1 to 4');
        parts.forEach((p, i) => { if (parseFloat(getComputedStyle(p.querySelector('[data-lcs-partbody]')).fontSize) < 14.5) fails.push('paragraph ' + (i + 1) + ' is printed too small'); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        if (!box.querySelector('[data-lcs-title]') || !box.querySelector('[data-lcs-pic]')) fails.push('no title or no picture');
        const heads = box.querySelectorAll('[data-lcs-heading]').length;
        if ((mode === 'evidence' || mode === 'ask') && root.dataset.lcsStory !== '1' ? heads !== 4 : heads !== 0) fails.push(`${heads} headings on the page ${mode}`);
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
        if (sets.length >= 4) {
          if (new Set(place).size < 3) fails.push('the right answers do not use all three places: ' + place.join(''));
          if (place.some((x, i) => i >= 2 && x === place[i - 1] && x === place[i - 2])) fails.push('three right answers in one place in a row: ' + place.join(''));
          if (/^(012|210)/.test(place.join(''))) fails.push('the right answers begin as a staircase: ' + place.join(''));
        }
        const CARDS = '[data-lcs-question], [data-lcs-ownq], [data-lcs-mainidea], [data-lcs-details], [data-lcs-summary], [data-lcs-focusmatch], [data-lcs-para]';
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const c = l.closest(CARDS), r = R(l); if (!c || r.right > R(c).right + 0.5 || r.bottom > R(c).bottom + 0.5) fails.push('a writing line leaves its card');
          if (r.height < 27.5) fails.push(`a writing line of ${Math.round(r.height)} px (wide-ruled paper is 28)`);
          if (r.width < rb.width * 0.5) fails.push(`a writing line of ${Math.round(100 * r.width / rb.width)} % of the page width`);
          if (l.querySelector('svg')) fails.push('a handwriting row of the lower grades');
          const st = l.querySelector('[data-lcs-starter]'); if (st && parseFloat(getComputedStyle(st).fontSize) > 16.5) fails.push('a starter in big letters');
          const kt = l.querySelector('[data-lcs-keytext]'); if (kt && (R(kt).right > r.right + 0.5 || parseFloat(getComputedStyle(kt).fontSize) < 9)) fails.push('a key answer does not fit its line'); });
        document.querySelectorAll(CARDS).forEach((c) => { const cb = R(c); c.querySelectorAll('[data-lcs-label], [data-lcs-choice], [data-lcs-numbox], [data-lcs-answersent], svg').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5)) fails.push('something leaves its card'); }); });
        const boxes = [...document.querySelectorAll('[data-lcs-numbox]')];
        boxes.forEach((b) => { if (R(b).width < 28) fails.push('a box too small for a number'); if (!isKey && b.textContent.trim()) fails.push('a number box is filled'); });

        if (mode === 'evidence') {
          const qs = [...document.querySelectorAll('[data-lcs-question]')];
          const paras = qs.map((q) => +q.dataset.lcsPara);
          if (paras.some((p, i) => i && p < paras[i - 1])) fails.push('the questions do not follow the text');
          if (lv === 1) {
            if (qs.length !== 5 || sets.length !== 5 || lines.length || boxes.length) fails.push('level 1 is not five questions with answers to circle');
            qs.forEach((q, i) => { const lk = q.querySelector('[data-lcs-lookin]'); if (!lk || lk.textContent.trim() !== '(paragraph ' + q.dataset.lcsPara + ')') fails.push(`question ${i + 1} does not name its paragraph`); });
          } else if (lv === 2) {
            if (qs.length !== 5 || sets.length || lines.length !== 5 || boxes.length !== 5) fails.push('level 2 is not five questions with a line and a paragraph box each');
            qs.forEach((q, i) => { if (R(q).width < rb.width - 2) fails.push(`question ${i + 1} is not as wide as the page`); });
            if (document.querySelector('[data-lcs-lookin]')) fails.push('level 2 names the paragraph to look in');
          } else {
            if (qs.length !== 3 || sets.length || lines.length !== 9 || boxes.length !== 3 || document.querySelectorAll('[data-lcs-proofline]').length !== 3) fails.push('level 3 is not three questions with an answer line, a paragraph box and two lines for the proving words');
            if (new Set(paras).size !== 3) fails.push('two questions of level 3 are proved by one paragraph');
          }
          if (lv > 1) qs.forEach((q, i) => { const b = q.querySelector('[data-lcs-numbox]'); if (!b || b.dataset.lcsWant !== q.dataset.lcsPara) fails.push(`the paragraph box of question ${i + 1} is keyed to another paragraph`); });
        }

        if (mode === 'ask') {
          const cards = [...document.querySelectorAll(lv === 3 ? '[data-lcs-ownq]' : '[data-lcs-question]')];
          const words = cards.map((c) => c.dataset.lcsAskword);
          if (lv < 3) {
            if (cards.length !== 4 || document.querySelectorAll('[data-lcs-answersent]').length !== 4) fails.push('not four sentences of the text');
            if (new Set([...document.querySelectorAll('[data-lcs-answersent]')].map((e) => e.textContent)).size !== 4) fails.push('a sentence stands twice');
            // (a story prints typographic marks, in its sentence boxes too: compared with straight ones)
            const st = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
            const all = st(box.textContent); document.querySelectorAll('[data-lcs-answersent]').forEach((e, i) => { if (!all.includes(st(e.textContent).replace(/^\d+\.\s*/, '').replace(/^"|"$/g, ''))) fails.push(`sentence ${i + 1} is no sentence of the text`); });
          }
          if (lv === 1 && (sets.length !== 4 || lines.length)) fails.push('level 1 is not four sentences with questions to circle');
          if (lv === 1) cards.forEach((c, i) => { const all = [...c.querySelectorAll('[data-lcs-choice]')].map((e) => e.textContent.trim()); if (!all.includes(c.dataset.lcsLure)) fails.push(`sentence ${i + 1} has no wrong question about its own paragraph`); });
          if (lv === 1) sets.forEach((c, i) => { const ok = c.querySelector('[data-lcs-ok]'); if (ok && !ok.textContent.trim().startsWith(words[i] + ' ')) fails.push(`the right question of sentence ${i + 1} does not begin with ${words[i]}`); });
          if (lv === 2) {
            if (sets.length || lines.length !== 4) fails.push('level 2 is not four sentences with a line each');
            if (!isKey) cards.forEach((c, i) => { const st = (c.querySelector('[data-lcs-startertext]') || { dataset: {} }).dataset.lcsStartertext; if (st !== words[i]) fails.push(`the line of sentence ${i + 1} does not begin with ${words[i]}`); });
          }
          if (lv === 3) {
            if (cards.length !== 3 || sets.length || lines.length !== 6 || boxes.length !== 3 || document.querySelector('[data-lcs-answersent]')) fails.push('level 3 is not three questions of the child\'s own with an answer line and a paragraph box each');
            if (new Set(words).size !== 3) fails.push('two questions of level 3 begin with the same word');
          }
        }

        if (mode === 'mainidea') {
          if (!document.querySelector('[data-lcs-mainidea]') || !document.querySelector('[data-lcs-details]')) fails.push('no main idea or no key details');
          if (lv === 1) {
            if (sets.length !== 1 || lines.length) fails.push('level 1 is not one main idea to circle and details to check');
            const rows = [...document.querySelectorAll('[data-lcs-detail]')];
            if (rows.length !== 4 || rows.filter((r) => r.dataset.lcsDetail === '1').length !== 3) fails.push('not three key details and one sentence that is not in the text');
            if (rows.length && rows[rows.length - 1].dataset.lcsDetail !== '1') fails.push('the sentence that is not in the text stands last');
            rows.forEach((r, i) => { const tk = r.querySelector('[data-lcs-tick]'); if (!tk || R(tk).width < 26 || !!tk.dataset.lcsOn !== (r.dataset.lcsDetail === '1')) fails.push(`the box of sentence ${i + 1} is keyed wrong`); if (tk && (isKey ? !!tk.querySelector('svg') !== !!tk.dataset.lcsOn : tk.querySelector('svg'))) fails.push('a check mark is printed where none belongs'); });
          } else {
            const want = lv === 2 ? 5 : 8;
            if (sets.length || lines.length !== want || document.querySelectorAll('[data-lcs-detailline]').length !== 3) fails.push(`level ${lv}: ${lines.length} writing lines (wanted ${want}) for the main idea, three details${lv === 3 ? ' and a summary' : ''}`);
            if (lv === 3 ? !document.querySelector('[data-lcs-summary]') : document.querySelector('[data-lcs-summary]')) fails.push('the summary is on the wrong level');
          }
        }

        if (mode === 'paras') {
          if (lv === 1) {
            const rows = [...document.querySelectorAll('[data-lcs-focusrow]')], wants = rows.map((r) => r.dataset.lcsFocusrow);
            if (rows.length !== 5 || [...wants].sort().join('') !== '01234') fails.push('not the four focuses and one that fits no paragraph');
            const seq = wants.filter((w) => w !== '0').join('');
            if (seq === '1234' || seq === '4321') fails.push('the statements stand in the order of the paragraphs');
            if (wants[4] === '0') fails.push('the left-over statement stands last');
            rows.forEach((r) => { const b = r.querySelector('[data-lcs-numbox]'); if (!b || b.dataset.lcsWant !== (r.dataset.lcsFocusrow === '0' ? '' : r.dataset.lcsFocusrow)) fails.push('a box is keyed to another paragraph'); });
            const hq = [...document.querySelectorAll('[data-lcs-headfor]')];
            if (hq.length !== 2 || sets.length !== 2 || lines.length || new Set(hq.map((h) => h.dataset.lcsHeadfor)).size !== 2) fails.push('level 1 is not five statements to number and two headings to choose');
            if (place.length === 2 && place[0] === place[1]) fails.push('both right headings stand in the same place');
          } else {
            if (document.querySelectorAll('[data-lcs-para]').length !== 4 || sets.length || lines.length !== 8 || document.querySelectorAll('[data-lcs-headline]').length !== (lv === 3 ? 4 : 0)) fails.push(`level ${lv}: not four paragraph boxes with two lines each${lv === 3 ? ', one of them for a heading' : ''}`);
          }
        }
        return fails;
      });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  task with its answer in its markup and the part of the text it is answered from printed on it (numbered paragraphs at
 *  the page's own size, without headings: review en.review-1119-read, the heading "From Station to Station" pointed to
 *  the paragraph a box asks for); the text's id is data-lcs-text (form B takes another text).
 *   evidence (G3-494, G3-502)  one of the page's five questions under TWO paragraphs: the one that proves the answer and
 *                      the one before or after it (one paragraph would print the number the box asks for). The answer is
 *                      written on the line and the number of the proving paragraph in the box (both data-lcs-answer).
 *   ask (G3-495, G3-503)       one of the page's four sentences in its box, under the paragraph it stands in (the words it
 *                      leans on: "They stand on coasts" is about the lighthouses), and the line that begins with the
 *                      question word; the key's question is a sample (data-lcs-key-sample).
 *   paras (G3-497)             one paragraph without its heading and "What is this paragraph mostly about? Circle it."
 *                      with three statements (the page's level-1 match made small; level 2 writes the focus in the
 *                      child's own words, which has no one wording): its focus, the focus of another paragraph chosen
 *                      for this paragraph by hand (CHECK3_OTHER; review en.review-1119-read2: "how the parents raise
 *                      the chick" could be defended for the father's egg), which shares no word of its own with it,
 *                      and a TOO NARROW detail that one sentence of this
 *                      paragraph tells (CHECK3_NARROW; review en.review-1119-read: with two wrong statements that share
 *                      no word with the paragraph, the one that repeats its words was right without judging). The right
 *                      one carries data-lcs-correct.
 *  The main idea and the key details (G3-496) need the whole text and stay out. */
/** The text a child reads with typographic marks (story-g1.js curly(), the same rule; review en.review-1119-read2: the
 *  Grade 3 story pages printed straight quotes beside the Grade 1 and 2 story pages): an apostrophe is ’; a double mark
 *  opens after a space or a bracket, or at the start of a text whose next character is a letter, and closes otherwise.
 *  Tags and their attributes stay as they are (the answers a check reads stand in attributes). */
function curly(html) {
  let out = '', i = 0, prev = ' ';
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), chars = [...html.slice(i, j < 0 ? html.length : j)];
    chars.forEach((ch, k) => {
      if (ch === "'") out += '’';
      else if (ch === '"') out += /[\s([—]/.test(prev) || (k === 0 && /[A-Za-z0-9]/.test(chars[1] || '')) ? '“' : '”';
      else out += ch;
      prev = ch;
    });
    i = j < 0 ? html.length : j;
  }
  return out;
}
const CHECK3_MODES = new Set(['evidence', 'ask', 'paras']);
/** a detail that ONE sentence of each paragraph tells, worded like a focus: too narrow to be what the paragraph is mostly
 *  about (a text without a list gives no card) */
/** the other paragraph's topic a card of each paragraph offers: one that a child cannot defend for it */
const CHECK3_OTHER = {
  lighthouses: ['what lighthouses are like today', 'what lighthouses are like today', 'what lighthouses are like today', 'why lighthouses were built'],
  'space-station': ['how everything floats on the station', 'what the space station is and who lives there', 'what the space station is and who lives there', 'what the space station is and who lives there'],
  'emperor-penguins': ['how the father takes care of the egg', 'how cold Antarctica gets', 'how the parents raise the chick', 'how cold Antarctica gets'],
  'pony-express': ['why the Pony Express ended', 'why the Pony Express ended', 'why the Pony Express ended', 'why the Pony Express was started'],
  'blue-whales': ['how a blue whale breathes', 'how a calf grows up', 'what a blue whale eats and how it catches its food', 'how a blue whale breathes'],
};
const CHECK3_NARROW = {
  lighthouses: ['where lighthouses stand', 'who invented a special lens', 'how often the lens was cleaned', 'how sailors tell one lighthouse from another'],
  'space-station': ['when the first crew arrived', 'what the straps and Velcro on the walls are for', 'how astronauts drink', 'how long astronauts exercise each day'],
  'emperor-penguins': ['how tall a grown emperor penguin is', 'where the mother goes to hunt', 'how many penguins press together in a huddle', 'when the young penguin grows waterproof feathers'],
  'pony-express': ['what the new mail service was called', 'how far a rider went to the next station', 'how long a letter took to cross the country', 'how long the Pony Express lasted'],
  'blue-whales': ["how much a blue whale's tongue weighs", 'how long krill are', 'how high the spray from a blowhole shoots', 'how long a calf is at birth'],
};
/** the part of a text a card of a check is answered from: its title and the paragraphs ps (indexes), numbered as on the
 *  page, at the page's size; heads: the headings the page prints (an information text on some pages; a story never) */
function checkExcerpt(t, ps, { font, lh, heads }) {
  const one = (i, first) => `<div data-lcs-part="${i + 1}" style="display:flex;gap:8px;margin-top:${first ? 0 : 4}px">${tab(i + 1)}<div style="flex:1 1 auto;min-width:0">` +
    `<div data-lcs-partbody style="font:700 ${font}px/${lh} 'Nunito',sans-serif;color:${T.ink}">` + (heads ? `<span data-lcs-heading style="font:700 ${font + 1}px/1 'Baloo 2',cursive;color:${T.teal};margin-right:7px">${esc(t.parts[i].heading)}</span>` : '') + `${esc(partText(t.parts[i]))}</div></div></div>`;
  return `<div data-lcs-excerpt data-lcs-parts="${ps.map((i) => i + 1).join(',')}" style="padding:4px 14px 7px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div data-lcs-title style="font:700 19px/1.2 'Baloo 2',cursive;color:${T.ink};margin-bottom:2px">${esc(t.title)}</div>` + ps.map((i, k) => one(i, !k)).join('') + `</div>`;
}
const CHECK3_STOP = new Set(['what', 'when', 'where', 'which', 'with', 'from', 'that', 'this', 'they', 'their', 'them', 'have', 'into', 'about', 'other', 'most', 'only', 'some', 'like', 'today', 'does', 'made']);
// (whales -> whale, not whal: the title's own words must match the paragraph's; boxes -> box)
const check3Stem = (w) => w.toLowerCase().replace(/'s$/, '').replace(/ies$/, 'y').replace(/(ches|shes|sses|xes)$/, (m) => m.slice(0, -2)).replace(/s$/, '');
function info3CheckPage(mode, { difficulty, locale }, ctx, { POOL, story, D }) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`info-text-g3 check: the texts are English texts (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const att = (s) => esc(s).replace(/"/g, '&quot;');
  const LW = W - 52;
  const heads = false;                                                   // (a heading pointed to the paragraph a box asks for)
  const answerLine = (answer, w, starter) => (key ? rule({ w, h: d.rowH || 30, starter, answer, sample: mode === 'ask' })
    : rule({ w, h: d.rowH || 30, starter }).replace('<div data-lcs-line', `<div data-lcs-line data-lcs-answer="${att(answer)}"`));
  const ask = (q) => `<div data-lcs-checkq style="font:700 16px/1.3 'Nunito',sans-serif;color:${T.ink}">${q}</div>`;
  const excerpt = (t, ps) => checkExcerpt(t, ps, { font: d.font, lh: d.lh, heads });
  const card = (t, inner) => `<div data-lcs-text="${att(t.id)}" style="display:flex;flex-direction:column;gap:5px;padding:0 4px">${inner}</div>`;
  const cards = [];
  for (const t of shuffle(POOL, rng)) {
    if (mode === 'evidence') for (const x of shuffle(t.questions, rng)) {     // (in a drawn order: the check keeps the first card it meets of each text)
      const i = x.part - 1;
      const two = i === 0 ? [0, 1] : i === 3 ? [2, 3] : (rng.int(0, 1) ? [i - 1, i] : [i, i + 1]);
      const box = numBox(x.part, key).replace('<span data-lcs-numbox', `<span data-lcs-answer="${x.part}" data-lcs-numbox`);
      cards.push(card(t, excerpt(t, two) + ask(esc(x.q)) +
        `<div style="display:flex;align-items:flex-end;gap:12px"><div style="flex:1 1 auto;min-width:0">${answerLine(x.answer, LW - 130)}</div><span style="flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;font:700 14.5px/1 'Nunito',sans-serif;color:${T.ink}">paragraph ${box}</span></div>`));
    }
    if (mode === 'ask') for (const a of shuffle(t.ask, rng)) {     // (in a drawn order: the check keeps the first card it meets of each text)
      const i = t.parts.findIndex((p) => p.sentences.includes(a.answer));
      const sent = `<div data-lcs-answersent style="padding:4px 12px;border-radius:12px;background:${T.cream};font:700 ${d.quote || d.font}px/1.3 'Nunito',sans-serif;font-style:italic;color:${T.ink}">` + '"' + esc(a.answer) + '"</div>';
      cards.push(card(t, excerpt(t, [i]) + sent + answerLine(a.q, LW, a.word)));
    }
    if (mode === 'paras') {
      const own = new Set((t.title.match(/[A-Za-z']+/g) || []).map(check3Stem));
      shuffle(t.parts.map((p, i) => [p, i]), rng).forEach(([p, i]) => {     // (in a drawn order: the check keeps the first card it meets of each text)
        // a wrong statement shares no word of its own with the paragraph (the topic's own words do not count): a
        // statement that names something the paragraph tells could be defended for it
        const inPara = new Set((partText(p).match(/[A-Za-z']+/g) || []).map(check3Stem));
        const apart = (s) => !(s.match(/[A-Za-z']+/g) || []).map(check3Stem).some((w) => w.length >= 4 && !CHECK3_STOP.has(w) && !own.has(w) && inPara.has(w));
        const narrow = (CHECK3_NARROW[t.id] || [])[i], other = (CHECK3_OTHER[t.id] || [])[i];
        if (other && (!apart(other) || other === p.focus)) throw new Error(`info-text-g3 check: the other topic of ${t.id} paragraph ${i + 1} shares a word with it`);
        const wrong = narrow && other ? [narrow, other] : [];
        if (wrong.length < 2) return;                                       // no other focus that is surely wrong, or no narrow detail: no card
        const at = rng.int(0, 2);
        cards.push(card(t, excerpt(t, [i]) + ask('What is this paragraph mostly about? Circle it.') +
          choices(placed(p.focus, shuffle(wrong, rng), at), at, key, { column: true, font: 15.5 }).replace(' data-lcs-ok="1"', ' data-lcs-ok="1" data-lcs-correct="1"')));
      });
    }
  }
  return { bodyHtml: (story ? curly : String)(`<div data-lcs-info3check="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''}${story ? ' data-lcs-story="1"' : ''}>` + checkGrid(cards, { cols: 1 }) + `</div>`), meta: {} };
}

module.exports = { makeInfoText3Type, faultsOf, TEXTS, LEVELS, _parts3: { wordsIn, partText, textBox, cream, label, num, numBox, rule, stack, grid, FULL, RULE, checkExcerpt, curly } };
