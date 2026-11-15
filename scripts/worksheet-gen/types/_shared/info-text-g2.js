/**
 * info-text-g2.js — two Grade 2 pages on ONE informational text of three parts (English literacy year, Daily Teaching
 * System Part 12.3, 2026-11-15; unit "Reading to Learn: Information Texts", Grade 2). The texts are the key `g2` of
 * data/literacy/info-texts.en.json: about 150 words in three parts (the pages 1 to 3 of a small book), each with a
 * heading and one bold word, two library pictures with captions, a four-word glossary and an index (word → page).
 *
 *   focus     Main Topic and Paragraph Focus (RI.2.2: identify the main topic of a multiparagraph text as well as the
 *             focus of specific paragraphs within the text). The three parts are printed as numbered paragraphs
 *             WITHOUT their headings and without bold words.
 *               level 1  circle the main topic (the topic, a detail, a choice that is too wide); then give each of
 *                        four statements the number of its paragraph (one statement fits no paragraph)
 *               level 2  write the main topic and what each paragraph is mostly about
 *               level 3  write the main topic, and for each paragraph a heading and what it is mostly about
 *   features  Use the Text Features (RI.2.5: know and use text features — captions, bold print, subheadings,
 *             glossaries, indexes — to locate key facts or information). The text is printed with everything.
 *               level 1  six find-it questions, three answers under each, circle one
 *               level 2  six find-it questions, write each answer
 *               level 3  four questions to write, one more entry for the index and one for the glossary
 *
 * English only. Themeless: a copy is another text (meta.items names the text). PDF only.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/info-texts.en.json');
const { placesFor, _parts } = require('./info-text.js');
const { W, esc, shuffle, stem, line, choices, placed } = _parts;

const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
const partText = (p) => p.sentences.join(' ');
const has = (text, word) => new RegExp('(^|[^A-Za-z])' + String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^A-Za-z]|$)', 'i').test(text);
const pk = (p) => p.theme + '/' + p.noun;

/** the two wrong answers of a find-it question (a caption question names its own) */
function wrongOf(t, f) {
  if (f.wrong) return f.wrong;
  if (f.kind === 'heading') return t.parts.map((p) => p.heading).filter((h) => h !== f.answer);
  if (f.kind === 'bold') return t.bold.filter((b) => b !== f.answer);
  if (f.kind === 'glossary') return t.glossary.map((g) => g.meaning).filter((m) => m !== f.answer).slice(0, 2);
  if (f.kind === 'index') return ['1', '2', '3'].filter((p) => p !== f.answer);
  return [];
}

/** What must be true of a Grade 2 text before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(t) {
  const f = [], id = t.id;
  if (!Array.isArray(t.parts) || t.parts.length !== 3) return [id + ': not three parts'];
  const total = wordsIn(t.parts.map(partText).join(' '));
  if (total < 125 || total > 165) f.push(`${id}: ${total} words (a Grade 2 text has 125 to 165)`);
  t.parts.forEach((p, i) => {
    const n = wordsIn(partText(p));
    if (!p.heading || !p.focus || p.sentences.length < 3) f.push(`${id} page ${i + 1}: no heading, no focus or fewer than three sentences`);
    if (n < 38 || n > 60) f.push(`${id} page ${i + 1}: ${n} words (a part has 38 to 60)`);
    p.sentences.forEach((x) => { if (wordsIn(x) > 20) f.push(`${id} page ${i + 1}: a sentence of ${wordsIn(x)} words`); });
  });
  if (new Set(t.parts.map((p) => p.focus)).size !== 3 || !t.focusLure || t.parts.some((p) => p.focus === t.focusLure)) f.push(id + ': not three different focuses and one that fits no part');
  if (!Array.isArray(t.bold) || t.bold.length !== 3) f.push(id + ': not three bold words');
  else t.bold.forEach((b, i) => {
    const first = t.parts.findIndex((p) => has(partText(p), b));
    if (first !== i) f.push(`${id}: the bold word "${b}" first stands on page ${first + 1}, not on page ${i + 1}`);
    if (!t.glossary.some((g) => { const w = g.word.toLowerCase(), x = b.toLowerCase(); return w === x || w + 's' === x || w + 'es' === x || stem(w) === stem(x); })) f.push(`${id}: the bold word "${b}" is not in the glossary`);
  });
  const abc = (list) => list.map((x) => x.toLowerCase()).join('|') === list.map((x) => x.toLowerCase()).sort().join('|');
  if (!Array.isArray(t.glossary) || t.glossary.length !== 4 || t.glossary.some((g) => !g.word || !g.meaning) || !abc(t.glossary.map((g) => g.word))) f.push(id + ': the glossary is not four words with a meaning in ABC order');
  if (!Array.isArray(t.index) || t.index.length !== 4 || !abc(t.index.map((e) => e.word))) f.push(id + ': the index is not four words in ABC order');
  else for (const e of t.index) {
    const on = t.parts.map((p, i) => (has(partText(p), e.word) ? i + 1 : 0)).filter(Boolean);
    if (on.join() !== String(e.page)) f.push(`${id}: the index says "${e.word}" is on page ${e.page}; the word stands on page ${on.join(' and ') || 'none'}`);
    if ((t.pictures || []).some((p) => has(p.caption || '', e.word))) f.push(`${id}: the index word "${e.word}" also stands in a caption`);
  }
  if (!Array.isArray(t.pictures) || t.pictures.length !== 2 || t.pictures.some((p) => !p.caption || !/[.!]$/.test(p.caption)) || pk(t.pictures[0]) === pk(t.pictures[1])) f.push(id + ': not two different pictures with a caption each');
  const tp = t.topic || {};
  if (!tp.right || !tp.detail || !tp.wide || new Set([tp.right, tp.detail, tp.wide]).size !== 3) f.push(id + ': not three different main-topic choices');
  const kinds = (t.features || []).map((x) => x.kind).sort().join(',');
  if (kinds !== 'bold,caption,glossary,heading,heading,index') f.push(`${id}: the find-it questions are ${kinds}`);
  for (const x of t.features || []) {
    if (!/\?$/.test(x.q)) f.push(`${id}: "${x.q}" has no question mark`);
    const w = wrongOf(t, x);
    if (w.length !== 2 || new Set([x.answer, ...w]).size !== 3) f.push(`${id}: "${x.q}" has not one right and two different wrong answers`);
    if (x.kind === 'heading' && !t.parts.some((p) => p.heading === x.answer)) f.push(`${id}: "${x.answer}" is no heading of the text`);
    if (x.kind === 'bold') { const pg = (/page (\d)/.exec(x.q) || [])[1]; if (!pg || t.bold[pg - 1] !== x.answer) f.push(`${id}: "${x.answer}" is not the bold word of the page the question names`); }
    if (x.kind === 'glossary') { const w2 = (/word (\S+) mean/.exec(x.q) || [])[1]; const g = t.glossary.find((y) => y.word === w2); if (!g || g.meaning !== x.answer) f.push(`${id}: "${x.q}" is not answered by the glossary`); }
    if (x.kind === 'index') { const e = t.index.find((y) => has(x.q, y.word)); if (!e || String(e.page) !== String(x.answer)) f.push(`${id}: "${x.q}" is not answered by the index`); }
    if (x.kind === 'caption' && !/(first|second) picture/.test(x.q)) f.push(`${id}: the caption question does not say which picture`);
  }
  if (new Set((t.features || []).filter((x) => x.kind === 'heading').map((x) => x.answer)).size !== 2) f.push(id + ': the two heading questions ask for one heading');
  return f;
}
const TEXTS = BANK.g2 || [];
{ const f = TEXTS.flatMap(faultsOf); if (f.length) throw new Error('info-texts.en.json (g2): ' + f.join('; ')); }

const LEVELS = {
  focus: { 1: { font: 19.5 }, 2: { font: 17.5, rowH: 48 }, 3: { font: 15, rowH: 38 } },
  features: { 1: { font: 14.5, n: 6, lh: 1.33, tight: true }, 2: { font: 15, n: 6, rowH: 33 }, 3: { font: 15, n: 4, rowH: 33 } },
};

const tab = (n) => `<span data-lcs-pagetab="${n}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;margin-top:2px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 14px/1 'Nunito',sans-serif">${n}</span>`;

/** the text in its box. `full` = with headings, bold words, both pictures with captions, the glossary and the index */
function textBox(t, { font, full, lh = 1.4 }) {
  const parts = t.parts.map((p, i) => {
    let body = esc(partText(p));
    if (full) { const b = t.bold[i]; body = body.replace(new RegExp('(^|[^A-Za-z])(' + b + ')(?=[^A-Za-z]|$)'), (m0, a, w) => `${a}<b data-lcs-bold="${esc(b)}" style="font-weight:800;-webkit-text-stroke:0.7px ${T.ink}">${w}</b>`); }
    return `<div data-lcs-part="${i + 1}" style="display:flex;gap:8px;margin-top:${i ? 5 : 0}px">${tab(i + 1)}<div style="flex:1 1 auto;min-width:0">` +
      (full ? `<div data-lcs-heading style="font:700 ${font + 2}px/1.2 'Baloo 2',cursive;color:${T.teal}">${esc(p.heading)}</div>` : '') +
      `<div data-lcs-partbody style="font:700 ${font}px/${lh} 'Nunito',sans-serif;color:${T.ink}">${body}</div></div></div>`;
  }).join('');
  const fig = (p, n, cap) => `<figure data-lcs-fig="${n}" style="margin:0;display:flex;flex-direction:column;align-items:center;gap:2px">` +
    `<img class="ws-icon" data-lcs-pic="${esc(pk(p))}" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${cap ? 104 : 124}px;height:${cap ? 104 : 124}px;display:block;object-fit:contain">` +
    (cap ? `<figcaption data-lcs-caption style="font:700 12.5px/1.25 'Nunito',sans-serif;font-style:italic;color:${T.ink};text-align:center">${esc(p.caption)}</figcaption>` : '') + `</figure>`;
  const side = `<div style="flex:0 0 ${full ? 138 : 128}px;display:flex;flex-direction:column;justify-content:space-around;gap:6px">${fig(t.pictures[0], 1, full)}${full ? fig(t.pictures[1], 2, true) : ''}</div>`;
  const extras = full ? `<div style="margin-top:6px;padding-top:5px;border-top:2px dashed ${T.teal};display:flex;gap:14px;align-items:flex-start">` +
    `<div data-lcs-glossary style="flex:1 1 auto;min-width:0"><div style="font:700 15px/1.2 'Baloo 2',cursive;color:${T.teal}">Glossary</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 14px">` +
    t.glossary.map((g) => `<div data-lcs-gloss="${esc(g.word)}" style="font:700 12.5px/1.25 'Nunito',sans-serif;color:${T.ink}"><span style="font-weight:800;-webkit-text-stroke:0.5px ${T.ink}">${esc(g.word)}</span> ${esc(g.meaning)}</div>`).join('') + `</div></div>` +
    `<div data-lcs-index style="flex:0 0 150px"><div style="font:700 15px/1.2 'Baloo 2',cursive;color:${T.teal}">Index</div>` +
    t.index.map((e) => `<div data-lcs-indexword="${esc(e.word)}|${e.page}" style="display:flex;align-items:baseline;gap:4px;font:700 12.5px/1.3 'Nunito',sans-serif;color:${T.ink}"><span>${esc(e.word)}</span><span style="flex:1 1 auto;border-bottom:1.5px dotted ${T.ink};transform:translateY(-3px)"></span><span>${e.page}</span></div>`).join('') + `</div></div>` : '';
  return `<div data-lcs-info2text="${t.id}" data-lcs-words="${wordsIn(t.parts.map(partText).join(' '))}" style="flex:0 0 auto;padding:8px 14px 9px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    // the paragraph page prints no title: the title IS the main topic the page asks for
    (full ? `<div data-lcs-title style="font:700 23px/1.1 'Baloo 2',cursive;color:${T.ink};margin-bottom:3px">${esc(t.title)}</div>` : '') +
    `<div style="display:flex;gap:12px;align-items:stretch"><div style="flex:1 1 auto;min-width:0">${parts}</div>${side}</div>${extras}</div>`;
}
const cream = (attrs, inner, pad = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:3px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (text, px = 17, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${text}</div>`;
const numBox = (want, key, size = 34) => `<span data-lcs-numbox data-lcs-want="${want}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 ${Math.round(size * 0.58)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? (want || '–') : ''}</span>`;

function makeInfoText2Type({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('info-text-g2: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the informational texts are English texts (no ${locale} bank)`);
      if (!TEXTS.length) throw new Error(`${id}: the bank holds no Grade 2 text`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(TEXTS, 1)[0];
      const inner = W - 24;
      let below = '', items = [];

      if (mode === 'focus') {
        const tp = t.topic, cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        if (lv === 1) {
          const at = rng.int(0, 2);
          const topic = cream('data-lcs-topic="1"', label('What is the main topic of the whole text? Circle it.') + choices(placed(tp.right, shuffle([tp.detail, tp.wide], rng), at), at, key, { font: 17 }));
          // the four statements in an order that is neither the order of the paragraphs nor has the left-over one last
          let rows;
          for (let k = 0; k < 200; k++) { rows = shuffle([...t.parts.map((p, i) => ({ n: i + 1, text: p.focus })), { n: 0, text: t.focusLure }], rng); const seq = rows.map((r) => r.n).filter(Boolean).join(''); if (seq !== '123' && seq !== '321' && rows[3].n !== 0) break; }
          const match = cream('data-lcs-focusmatch="1"', label('What is each paragraph mostly about? Write the number of the paragraph in the box. One box stays empty.') +
            `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 18px;margin-top:2px">` + rows.map((r) => `<div data-lcs-focusrow="${r.n}" style="display:flex;align-items:center;gap:10px">${numBox(r.n || '', key)}<span style="font:700 16.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r.text)}</span></div>`).join('') + `</div>`, 8);
          below = topic + match;
        } else {
          const topic = `<div data-lcs-topic="1" style="display:flex;flex-direction:column;gap:2px;padding:5px 12px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">${label('Main topic', 16, T.teal)}` +
            line({ w: inner - 5, h: d.rowH, starter: lv === 2 ? 'The text is about' : null, answer: key ? (lv === 2 ? `The text is about ${tp.right}.` : cap(tp.right)) : null }) + `</div>`;
          const paras = t.parts.map((p, i) => cream(`data-lcs-para="${i + 1}"`,
            (lv === 3 ? `<div style="display:flex;align-items:flex-end;gap:8px">${label('A heading for paragraph ' + (i + 1) + ':', 15.5)}<div style="flex:1 1 auto;min-width:0">${line({ w: inner - 210, h: d.rowH, answer: key ? p.heading : null, sample: true })}</div></div>` : '') +
            label('Paragraph ' + (i + 1) + ' is mostly about', lv === 3 ? 15.5 : 16.5) + line({ w: inner, h: d.rowH, answer: key ? p.focus : null, sample: true }), lv === 3 ? 4 : 6)).join('');
          below = topic + paras;
        }
        items = [t.id + ': topic', ...t.parts.map((p) => t.id + ': ' + p.focus)];
      }

      if (mode === 'features') {
        let fs = t.features.slice();
        if (d.n === 4) fs = [rng.pick(fs.filter((x) => x.kind === 'heading')), ...fs.filter((x) => ['glossary', 'caption', 'index'].includes(x.kind))];
        for (let k = 0; k < 60; k++) { fs = shuffle(fs, rng); if (!fs.some((x, i) => i && x.kind === 'heading' && fs[i - 1].kind === 'heading')) break; }
        if (lv === 1) { const h = fs.filter((x) => x.kind === 'heading'), o = fs.filter((x) => x.kind !== 'heading'); fs = [h[0], o[0], o[1], h[1], o[2], o[3]]; }
        const at = placesFor(fs.length, rng);
        const show = (x, v) => (x.kind === 'index' ? 'page ' + v : v);
        const cellW = (inner - 14) / 2 - 24;
        const cells = fs.map((x, n) => {
          let q = x.q, right = show(x, x.answer), wrong = wrongOf(t, x).map((w) => show(x, w));
          if (lv === 1 && x.kind === 'glossary') { const g = t.glossary.find((y) => y.meaning === x.answer); q = `Which word of the glossary means "${x.answer}"?`; right = g.word; wrong = shuffle(t.glossary.filter((y) => y !== g).map((y) => y.word), rng).slice(0, 2); }
          const wide = lv === 1 && x.kind === 'heading';
          const short = wide || [right, ...wrong].join('').length <= 30;
          return cream(`data-lcs-question="${n + 1}" data-lcs-feature="${x.kind}"`,
            label(`<span style="color:${T.teal}">${n + 1}.</span> ${esc(q)}`, lv === 1 ? 14 : 14.5) +
            (lv === 1 ? choices(placed(right, shuffle(wrong, rng), at[n]), at[n], key, { column: !short, font: 13.5 })
              : line({ w: cellW, h: d.rowH, answer: key && x.kind !== 'glossary' ? right : null }) + (x.kind === 'glossary' ? line({ w: cellW, h: d.rowH, answer: key ? right : null }) : '')), lv === 1 ? 3 : 5, wide ? 'grid-column:1 / -1' : '');
        });
        if (lv === 3) {
          cells.push(cream('data-lcs-addindex="1"', label(`<span style="color:${T.teal}">5.</span> Add one more word to the index. Write the word and its page.`, 14.5) + line({ w: cellW, h: d.rowH }), 5));
          cells.push(cream('data-lcs-addgloss="1"', label(`<span style="color:${T.teal}">6.</span> Add one more word to the glossary. Write the word and what it means.`, 14.5) + line({ w: cellW, h: d.rowH }), 5));
        }
        below = `<div data-lcs-qgrid style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:${d.tight ? 4 : 6}px 14px;align-content:space-between">${cells.join('')}</div>`;
        items = fs.map((x) => t.id + ': ' + x.q);
      }

      return {
        bodyHtml: `<div data-ws-content data-lcs-info2="${mode}|${lv}" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` +
          textBox(t, { font: d.font, full: mode === 'features', lh: d.lh }) + below + `</div>`,
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-info2]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsInfo2.split('|'), lv = +lvS;
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root);
        const box = document.querySelector('[data-lcs-info2text]');
        const n = +box.dataset.lcsWords;
        if (n < 125 || n > 165) fails.push(`the text has ${n} words`);
        const parts = [...box.querySelectorAll('[data-lcs-part]')];
        if (parts.length !== 3) fails.push(parts.length + ' parts');
        if ([...box.querySelectorAll('[data-lcs-pagetab]')].map((e) => e.dataset.lcsPagetab).join('') !== '123') fails.push('the parts are not numbered 1, 2, 3');
        parts.forEach((p, i) => { if (parseFloat(getComputedStyle(p.querySelector('[data-lcs-partbody]')).fontSize) < 14.5) fails.push('part ' + (i + 1) + ' is printed too small'); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const heads = box.querySelectorAll('[data-lcs-heading]').length, bolds = box.querySelectorAll('[data-lcs-bold]').length;
        const caps = box.querySelectorAll('[data-lcs-caption]').length, gl = box.querySelectorAll('[data-lcs-gloss]').length, ix = box.querySelectorAll('[data-lcs-indexword]').length;
        if (mode === 'features') {
          if (heads !== 3 || bolds !== 3 || caps !== 2 || gl !== 4 || ix !== 4) fails.push(`the text has ${heads} headings, ${bolds} bold words, ${caps} captions, ${gl} glossary words, ${ix} index words`);
          parts.forEach((p, i) => { if (p.querySelectorAll('[data-lcs-bold]').length !== 1) fails.push('part ' + (i + 1) + ' has not one bold word'); });
          box.querySelectorAll('[data-lcs-bold]').forEach((b) => { if (parseFloat(getComputedStyle(b).webkitTextStrokeWidth) < 0.5) fails.push('a bold word is not printed bolder than the text'); });
          box.querySelectorAll('[data-lcs-fig]').forEach((f) => { const im = f.querySelector('img'), c = f.querySelector('[data-lcs-caption]'); if (!c || R(c).top < R(im).bottom - 1) fails.push('a caption is not under its picture'); });
        } else if (heads || bolds || caps || gl || ix || box.querySelector('[data-lcs-title]')) fails.push('the paragraph page prints the title, a heading, a bold word, a caption, a glossary or an index');
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
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).right > R(l.closest('[data-lcs-question], [data-lcs-para], [data-lcs-topic], [data-lcs-addindex], [data-lcs-addgloss]')).right + 0.5) fails.push('a writing line leaves its card'); });
        document.querySelectorAll('[data-lcs-question], [data-lcs-para], [data-lcs-topic], [data-lcs-focusmatch], [data-lcs-addindex], [data-lcs-addgloss]').forEach((c) => { const cb = R(c); c.querySelectorAll('[data-lcs-label], [data-lcs-choice], svg').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5)) fails.push('something leaves its card'); }); });
        if (mode === 'focus') {
          if (!document.querySelector('[data-lcs-topic]')) fails.push('no main topic');
          if (lv === 1) {
            const rows = [...document.querySelectorAll('[data-lcs-focusrow]')];
            const wants = rows.map((r) => r.dataset.lcsFocusrow);
            if (rows.length !== 4 || [...wants].sort().join('') !== '0123') fails.push('not the three focuses and one that fits no paragraph');
            const seq = wants.filter((w) => w !== '0').join('');
            if (seq === '123' || seq === '321') fails.push('the statements stand in the order of the paragraphs');
            if (wants[3] === '0') fails.push('the left-over statement stands last');
            rows.forEach((r) => { const b = r.querySelector('[data-lcs-numbox]'); if (!b || R(b).width < 30) fails.push('a box too small for a number'); if ((b.dataset.lcsWant || '0') !== (r.dataset.lcsFocusrow === '0' ? '0' : r.dataset.lcsFocusrow) && !(r.dataset.lcsFocusrow === '0' && b.dataset.lcsWant === '')) fails.push('a box is keyed to another paragraph'); });
            if (sets.length !== 1 || lines.length) fails.push('level 1 is one row of topics to circle and four boxes');
          } else {
            const paras = document.querySelectorAll('[data-lcs-para]').length;
            if (paras !== 3) fails.push(paras + ' paragraph boxes');
            if (lines.length !== (lv === 2 ? 4 : 7)) fails.push(lines.length + ' writing lines on level ' + lv);
            if (sets.length) fails.push('levels 2 and 3 have nothing to circle');
          }
        }
        if (mode === 'features') {
          const qs = [...document.querySelectorAll('[data-lcs-question]')];
          const want = lv === 3 ? 4 : 6;
          if (qs.length !== want) fails.push(qs.length + ' find-it questions');
          const kinds = qs.map((q) => q.dataset.lcsFeature);
          for (const k of ['heading', 'glossary', 'caption', 'index']) if (!kinds.includes(k)) fails.push('no question about the ' + k);
          if (lv < 3 && !kinds.includes('bold')) fails.push('no question about a bold word');
          if (kinds.some((k, i) => i && k === 'heading' && kinds[i - 1] === 'heading')) fails.push('the two heading questions stand together');
          if (lv === 1) {
            if (sets.length !== 6 || lines.length) fails.push('level 1 is six questions with answers to circle');
            const place = sets.map((c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk));
            if (new Set(place).size < 3) fails.push('the right answers do not use all three places: ' + place.join(''));
            if (place.some((x, i) => i >= 2 && x === place[i - 1] && x === place[i - 2])) fails.push('three right answers in one place in a row: ' + place.join(''));
            if (/^(012|210)/.test(place.join(''))) fails.push('the right answers begin as a staircase: ' + place.join(''));
          } else if (sets.length) fails.push('levels 2 and 3 have nothing to circle');
          if (lv === 2 && lines.length !== 7) fails.push(lines.length + ' writing lines on level 2');
          if (lv === 3 && (lines.length !== 7 || !document.querySelector('[data-lcs-addindex]') || !document.querySelector('[data-lcs-addgloss]'))) fails.push('level 3 is not four questions, an index entry and a glossary entry');
        }
        return fails;
      });
    },
  };
}

module.exports = { makeInfoText2Type, faultsOf, TEXTS, LEVELS, wrongOf };
