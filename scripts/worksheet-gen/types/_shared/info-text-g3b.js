/**
 * info-text-g3b.js — two Grade 3 pages on a text printed as a SMALL BOOK with its search tools (English literacy year,
 * Daily Teaching System Part 12.3, 2026-11-16; unit "Reading to Learn: Informational Texts", Grade 3; RI.3.5: use text
 * features and search tools to locate information relevant to a given topic efficiently). The texts are the key `g3`
 * of data/literacy/info-texts.en.json with their field `book`: each of the four paragraphs is a page (2 to 5) under
 * its heading; the book has a table of contents, one key word in bold on every page, a sidebar, a glossary and an
 * index (page 6). The pages of every index word are FOUND in the text, never typed.
 *
 * NAMES: teachers and anchor charts of Grade 3 say "text features" (the reviewer, 2026-11-16); the pages say so too.
 * Read 2026-11-16 by a US Grade 3 reviewer with the rendered pages; every finding applied.
 *
 *   find   Use the Text Features
 *            level 1  four questions, each names the tool to use; three answers to circle
 *            level 2  six questions, one for every tool, each names its tool; the answer is written (a page number,
 *                     a heading, a word)
 *            level 3  four questions that name no tool (index, glossary, sidebar, key word: the tools that are the ONE
 *                     way to their answer): the answer and the letter of the tool that gave it; then two more words
 *                     of one page for the index, with their page
 *   tool   Which Text Feature?
 *            level 1  five wishes ("You want to know what the word lens means."): the letter of the tool to use
 *                     (six tools are offered, one is left over: no wish asks for a heading, because the table of
 *                     contents tells the same and both would be right)
 *            level 2  three wishes: the letter of the tool, and what the tool gives
 *            level 3  three tools: a question of the child's own that the tool answers, and its answer
 *
 * Writing lines are the ruled lines of info-text-g3.js (rule()). English only. Themeless: a copy is another text.
 * PDF only. The bank is checked when this file loads (bookFaultsOf); no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const { placesFor, _parts } = require('./info-text.js');
const { W, esc, shuffle, choices, placed } = _parts;
const { TEXTS, _parts3 } = require('./info-text-g3.js');
const { wordsIn, partText, cream, label, num, numBox, rule, stack, grid, FULL } = _parts3;

const TOOLS = { contents: ['C', 'table of contents'], heading: ['H', 'heading'], keyword: ['K', 'key word in bold'], sidebar: ['S', 'sidebar'], glossary: ['G', 'glossary'], index: ['I', 'index'] };
const USE = { contents: 'Use the table of contents.', heading: 'Use the headings.', keyword: 'Use the key words in bold.', sidebar: 'Use the sidebar.', glossary: 'Use the glossary.', index: 'Use the index.' };
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasWord = (text, w) => new RegExp('(^|[^A-Za-z])' + reEsc(w) + '(s|es)?([^A-Za-z]|$)', 'i').test(text);
/** the pages (2 to 5) on which a word stands */
const pagesOf = (t, w) => t.parts.map((p, i) => (hasWord(partText(p), w) ? i + 2 : 0)).filter(Boolean);
const pagesText = (ps) => (ps.length === 1 ? String(ps[0]) : ps.length === 2 ? ps[0] + ' and ' + ps[1] : ps.slice(0, -1).join(', ') + ', and ' + ps[ps.length - 1]);

/** What must be true of a text's book before any page prints it. Returns the list of faults (empty = sound). */
function bookFaultsOf(t) {
  const f = [], id = t.id, b = t.book;
  if (!b) return [id + ': no book'];
  const heads = t.parts.map((p) => p.heading);
  if (!Array.isArray(b.keys) || b.keys.length !== 4) f.push(id + ': not four key words');
  else b.keys.forEach((k, i) => {
    const n = partText(t.parts[i]).split(k.bold).length - 1;
    if (!k.bold || !k.word || !k.meaning || n < 1) f.push(`${id}: the key word "${k.bold}" does not stand on page ${i + 2}`);   // its FIRST place on the page is printed in bold
    if (k.meaning.length > 62) f.push(`${id}: the meaning of "${k.word}" is longer than 62 letters`);
  });
  if (new Set((b.keys || []).map((k) => k.word.toLowerCase())).size !== 4) f.push(id + ': two key words are the same');
  const sb = b.sidebar || {};
  if (!(sb.page >= 2 && sb.page <= 5) || !sb.title || !sb.text || sb.text.length > 125) f.push(id + ': no sidebar on a page 2 to 5 of at most 125 letters');
  const idx = b.index || [];
  if (idx.length !== 7 || new Set(idx.map((w) => w.toLowerCase())).size !== 7) f.push(id + ': not seven different index words');
  idx.forEach((w) => { if (!pagesOf(t, w).length) f.push(`${id}: the index word "${w}" stands on no page`); });
  if (!idx.some((w) => pagesOf(t, w).length > 1) || !idx.some((w) => pagesOf(t, w).length === 1)) f.push(id + ': the index needs a word on one page and a word on several');
  const find = b.find || [];
  if (find.length !== 8 || find.map((x) => x.tool).sort().join() !== 'contents,contents,glossary,heading,index,index,keyword,sidebar') f.push(id + ': not eight find-it questions (two for the contents, two for the index, one for every other tool)');
  find.forEach((x) => {
    if (!/\?$/.test(x.q) || !Array.isArray(x.wrong) || x.wrong.length !== 2 || new Set([x.answer, ...x.wrong]).size !== 3) f.push(`${id}: "${x.q}" has not one right and two different wrong answers`);
    const quoted = (/"([^"]+)"/.exec(x.q) || [])[1], pageNo = +(/page (\d)/.exec(x.q) || [])[1];
    if (x.tool === 'contents') {
      if (quoted ? x.answer !== String(heads.indexOf(quoted) + 2) || !heads.includes(quoted) : x.answer !== heads[pageNo - 2]) f.push(`${id}: "${x.q}" is keyed wrong`);
      if (!quoted && x.wrong.some((w) => !heads.includes(w))) f.push(`${id}: "${x.q}" offers a chapter that the book does not have`);
    }
    if (x.tool === 'index') { const w = idx.find((v) => hasWord(x.q, v)); if (!w || x.answer.replace(/ only$/, '') !== pagesText(pagesOf(t, w))) f.push(`${id}: "${x.q}" is keyed ${x.answer}; the index says ${w ? pagesText(pagesOf(t, w)) : 'nothing'}`); }
    if (x.tool === 'heading' && (!heads.includes(x.answer) || x.wrong.some((w) => !heads.includes(w)))) f.push(`${id}: "${x.q}" is not answered by a heading among headings`);
    if (x.tool === 'glossary') { const k = (b.keys || []).find((v) => v.word === x.answer); if (!k || quoted !== k.meaning || x.wrong.some((w) => !(b.keys || []).some((v) => v.word === w))) f.push(`${id}: "${x.q}" does not ask for a glossary word by its meaning`); }
    if (x.tool === 'sidebar' && !sb.text.toLowerCase().includes(x.answer.replace(/^(a|an|the) /, '').toLowerCase())) f.push(`${id}: the sidebar does not say "${x.answer}"`);
    if (x.tool === 'keyword' && (!(pageNo >= 2) || x.answer !== b.keys[pageNo - 2].bold || x.wrong.includes(b.keys[pageNo - 2].bold))) f.push(`${id}: "${x.q}" is keyed wrong`);
  });
  const wants = b.wants || [];
  if (wants.length !== 5 || wants.map((x) => x.tool).sort().join() !== 'contents,glossary,index,keyword,sidebar') f.push(id + ': not five wishes for five different tools (no wish for a heading: the contents tell the same)');
  wants.forEach((x) => {
    const quoted = (/"([^"]+)"/.exec(x.want) || [])[1];
    if (!/^You want to /.test(x.want) || !/\.$/.test(x.want) || !x.answer) f.push(`${id}: "${x.want}" is no wish with an answer`);
    // the wish for the table of contents is one that NO heading grants (a heading stands beside its page number, so a wish for the page of a chapter has two right features): all chapter names in one place
    if (x.tool === 'contents' && (!/all the chapters/.test(x.want) || x.answer !== heads.join(', '))) f.push(`${id}: "${x.want}" is no wish that only the table of contents grants`);
    if (x.tool === 'glossary' && !(b.keys || []).some((k) => (k.word === quoted || k.bold === quoted) && k.meaning === x.answer)) f.push(`${id}: "${x.want}" is not answered by the glossary`);
    if (x.tool === 'keyword') { const n = +(/page (\d)/.exec(x.want) || [])[1]; if (!(n >= 2 && n <= 5) || x.answer !== b.keys[n - 2].bold) f.push(`${id}: "${x.want}" is keyed wrong`); }
    if (x.tool === 'index') { const w = idx.find((v) => hasWord(x.want, v)); if (!w || x.answer !== pagesText(pagesOf(t, w))) f.push(`${id}: "${x.want}" is keyed ${x.answer}; the index says ${w ? pagesText(pagesOf(t, w)) : 'nothing'}`); }
  });
  return f;
}
{ const f = TEXTS.flatMap(bookFaultsOf); if (f.length) throw new Error('info-texts.en.json (g3 book): ' + f.join('; ')); }

const LEVELS = {
  find: { 1: { font: 14.5, lh: 1.25 }, 2: { font: 14.5, lh: 1.22 }, 3: { font: 14.5, lh: 1.18 } },
  tool: { 1: { font: 14.5, lh: 1.25 }, 2: { font: 14.5, lh: 1.26, n: 3 }, 3: { font: 14.5, lh: 1.2, n: 3 } },
};

const pageTab = (n) => `<span data-lcs-pagetab="${n}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:36px;height:22px;margin-top:1px;border-radius:7px;background:${T.teal};color:#FFFFFF;font:800 12.5px/1 'Nunito',sans-serif">p. ${n}</span>`;
const strong = (text, attr) => `<b ${attr} style="font-weight:800;-webkit-text-stroke:0.6px ${T.ink}">${esc(text)}</b>`;
/** the text as a small book: title, table of contents, pages 2 to 5 (heading, key word in bold, the sidebar on its page), glossary and index */
function bookBox(t, { font, lh }) {
  const b = t.book;
  const toc = [...t.parts.map((p, i) => [p.heading, i + 2]), ['Glossary and Index', 6]].map(([h, n]) =>
    `<div data-lcs-toc="${n}" style="flex:1 1 28%;white-space:nowrap;display:flex;align-items:baseline;gap:5px;font:700 13.5px/1.3 'Nunito',sans-serif;color:${T.ink}"><span>${esc(h)}</span><span style="flex:1 1 auto;min-width:12px;border-bottom:1.5px dotted ${T.ink};opacity:.55;transform:translateY(-3px)"></span><span data-lcs-tocpage style="font-weight:800">${n}</span></div>`).join('');
  const pages = t.parts.map((p, i) => {
    const k = b.keys[i], text = partText(p), at = text.indexOf(k.bold);
    const body = esc(text.slice(0, at)) + strong(k.bold, `data-lcs-keyword="${i + 2}"`) + esc(text.slice(at + k.bold.length));
    const side = b.sidebar.page === i + 2 ? `<span data-lcs-sidebar style="float:right;width:186px;margin:2px 0 2px 10px;padding:4px 8px;border:2px dashed ${T.teal};border-radius:10px;background:${T.cream};font:700 12.5px/1.25 'Nunito',sans-serif;color:${T.ink}"><span style="display:block;font:700 13.5px/1.15 'Baloo 2',cursive;color:${T.teal}">${esc(b.sidebar.title)}</span>${esc(b.sidebar.text)}</span>` : '';
    return `<div data-lcs-part="${i + 2}" style="display:flex;gap:7px;margin-top:${i ? 3 : 0}px">${pageTab(i + 2)}<div data-lcs-partbody style="flex:1 1 auto;min-width:0;font:700 ${font}px/${lh} 'Nunito',sans-serif;color:${T.ink}">${side}<span data-lcs-heading style="font:700 ${font + 1}px/1 'Baloo 2',cursive;color:${T.teal};margin-right:7px">${esc(p.heading)}</span>${body}</div></div>`;
  }).join('');
  const gloss = b.keys.map((k) => `<div data-lcs-gloss="${esc(k.word)}" style="font:700 12.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${strong(k.word, '')}: ${esc(k.meaning)}</div>`).join('');
  const index = b.index.slice().sort((x, y) => x.toLowerCase().localeCompare(y.toLowerCase())).map((w) => `<span data-lcs-index="${esc(w)}" data-lcs-pages="${pagesOf(t, w).join(',')}" style="white-space:nowrap">${esc(w)} <b style="color:${T.teal}">${pagesOf(t, w).join(', ')}</b></span>`).join('');
  const small = (text) => `<div style="display:flex;align-items:center;gap:6px;font:700 14.5px/1.1 'Baloo 2',cursive;color:${T.teal}">${text}</div>`;
  return `<div data-lcs-book="${t.id}" data-lcs-words="${wordsIn(t.parts.map(partText).join(' '))}" style="flex:0 0 auto;padding:5px 12px 6px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div style="display:flex;align-items:center;gap:12px"><div data-lcs-title style="flex:0 0 auto;font:700 20px/1 'Baloo 2',cursive;color:${T.ink}">${esc(t.title)}</div>` +
    `<img class="ws-icon" data-lcs-pic="${esc(t.picture.theme + '/' + t.picture.noun)}" src="${fileUri(t.picture.theme, t.picture.noun)}" alt="" style="flex:0 0 auto;width:26px;height:26px;display:block;object-fit:contain"></div>` +
    `<div data-lcs-contents style="margin:1px 0 4px;padding:3px 10px 4px;border-radius:10px;background:${T.cream};display:flex;align-items:flex-start;gap:14px">${small('Contents')}<div style="flex:1 1 auto;display:flex;flex-wrap:wrap;gap:0 20px">${toc}</div></div>` +
    pages +
    `<div data-lcs-backmatter style="margin-top:4px;padding:3px 10px 4px;border-radius:10px;background:${T.cream}">` +
    `<div style="display:flex;align-items:flex-start;gap:12px">${small(pageTab(6) + 'Glossary')}<div data-lcs-glossary style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1.25fr;gap:0 16px">${gloss}</div></div>` +
    `<div data-lcs-indexbox style="display:flex;align-items:baseline;gap:12px;margin-top:2px">${small('Index')}<div style="flex:1 1 auto;display:flex;flex-wrap:wrap;gap:0 16px;font:700 12.5px/1.3 'Nunito',sans-serif;color:${T.ink}">${index}</div></div></div></div>`;
}
const legend = () => `<div data-lcs-legend style="flex:0 0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:3px 13px;font:700 13px/1.2 'Nunito',sans-serif;color:${T.ink}"><span style="font-weight:800;color:${T.teal}">Text features:</span>` +
  Object.values(TOOLS).map(([l, name]) => `<span data-lcs-tool="${l}" style="white-space:nowrap"><b style="display:inline-block;min-width:18px;padding:1px 3px;border:2px solid ${T.ink};border-radius:5px;text-align:center;font-weight:800;background:#FFFFFF">${l}</b> ${name}</span>`).join('') + `</div>`;
const toolBox = (want, key) => `<span style="flex:0 0 auto;display:inline-flex;align-items:center;gap:5px;font:700 13.5px/1 'Nunito',sans-serif;color:${T.ink}">feature ${numBox(want, key)}</span>`;

function makeInfoText3bType({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('info-text-g3b: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the informational texts are English texts (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(TEXTS, 1)[0], b = t.book;
      const inner = W - 24;
      const byTool = (tool) => b.find.filter((x) => x.tool === tool);
      let below = '', items = [];

      if (mode === 'find') {
        const use = (x) => `<b data-lcs-use="${x.tool}" style="font-weight:800;color:${T.teal}">${USE[x.tool]}</b> `;
        if (lv === 1) {
          // the contents, the index and two of the other four tools
          const four = [rng.pick(byTool('contents')), rng.pick(byTool('index')), ...shuffle(['heading', 'glossary', 'sidebar', 'keyword'], rng).slice(0, 2).map((x) => byTool(x)[0])];
          const qs = shuffle(four, rng), at = placesFor(4, rng);
          below = grid(qs.map((x, k) => { const opts = placed(x.answer, shuffle(x.wrong, rng), at[k]); return cream(`data-lcs-question="${k + 1}" data-lcs-qtool="${x.tool}"`, label(num(k + 1) + use(x) + esc(x.q), 13.5) + choices(opts, at[k], key, { column: opts.join('').length > 40, font: 13 }), 3); }), 4);
          items = qs.map((x) => t.id + ': ' + x.q);
        } else if (lv === 2) {
          const six = shuffle(Object.keys(TOOLS).map((tool) => rng.pick(byTool(tool))), rng);
          below = grid(six.map((x, k) => cream(`data-lcs-question="${k + 1}" data-lcs-qtool="${x.tool}"`, label(num(k + 1) + use(x) + esc(x.q), 13.5) + rule({ w: (inner - 14) / 2 - 24, h: 28, answer: key ? x.answer : null }), 4)), 4);
          items = six.map((x) => t.id + ': ' + x.q);
        } else {
          const plain = (x) => x.q.replace('Which word in the glossary means', 'Which word means').replace(/^Which word is printed in bold on page (\d)\?$/, 'Which word on page $1 stands out from all the other words?');
          const four = shuffle(['index', 'glossary', 'sidebar', 'keyword'].map((tool) => rng.pick(byTool(tool))), rng).map((x) => ({ ...x, q: plain(x) }));
          const cells = four.map((x, k) => cream(`data-lcs-question="${k + 1}" data-lcs-qtool="${x.tool}"`, label(num(k + 1) + esc(x.q), 13.5) +
            `<div style="display:flex;align-items:flex-end;gap:8px"><div style="flex:1 1 auto;min-width:0">${rule({ w: (inner - 14) / 2 - 110, h: 28, answer: key ? x.answer : null })}</div>${toolBox(TOOLS[x.tool][0], key)}</div>`, 3));
          const pg = rng.int(2, 5);
          const pair = (n) => `<div style="flex:1 1 0;display:flex;align-items:flex-end;gap:8px"><div style="flex:1 1 auto;min-width:0">${rule({ w: 180, h: 28, starter: 'word', answer: key && n === 1 ? 'word (answers will vary)' : null, sample: true })}</div><span style="flex:0 0 auto;font:700 13.5px/1 'Nunito',sans-serif;color:${T.ink};display:inline-flex;align-items:center;gap:5px">page ${numBox(pg, key)}</span></div>`;
          cells.push(cream(`data-lcs-addindex="${pg}"`, label(`<b style="color:${T.teal}">Add to the index.</b> Write two important words from page ${pg} that the index does not list yet, each with its page number.`, 13.5) + `<div style="display:flex;gap:22px">${pair(1)}${pair(2)}</div>`, 3, FULL));
          below = legend() + grid(cells, 3);
          items = four.map((x) => t.id + ': ' + x.q);
        }
      }

      if (mode === 'tool') {
        if (lv === 1) {
          let rows; for (let n = 0; n < 50; n++) { rows = shuffle(b.wants, rng); if (rows.map((x) => TOOLS[x.tool][0]).join('') !== 'GCISK') break; }
          below = legend() + cream('data-lcs-wants="1"', label('Which text feature would you use? Write its letter in the box. One feature is left over.', 14.5) +
            rows.map((x, k) => `<div data-lcs-wish="${TOOLS[x.tool][0]}" style="display:flex;align-items:center;gap:10px;min-height:31px">${numBox(TOOLS[x.tool][0], key)}<span style="font:700 14.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${num(k + 1)}${esc(x.want)}</span></div>`).join(''), 6);
          items = rows.map((x) => t.id + ': ' + x.want);
        } else if (lv === 2) {
          const rows = shuffle(b.wants, rng).slice(0, d.n);
          below = legend() + stack(rows.map((x, k) => cream(`data-lcs-wish="${TOOLS[x.tool][0]}"`, label(num(k + 1) + esc(x.want), 13.5) +
            `<div style="display:flex;align-items:flex-end;gap:10px">${toolBox(TOOLS[x.tool][0], key)}<div style="flex:1 1 auto;min-width:0">${rule({ w: inner - 110, h: 28, answer: key ? x.answer : null, sample: true })}</div></div>`, 4)), 4);
          items = rows.map((x) => t.id + ': ' + x.want);
        } else {
          const three = shuffle(['contents', 'index', 'glossary', 'sidebar', 'heading'], rng).slice(0, d.n);
          below = stack(three.map((tool, k) => { const x = rng.pick(byTool(tool)); return cream(`data-lcs-ownq="${k + 1}" data-lcs-qtool="${tool}"`, label(num(k + 1) + `A question for the <b style="font-weight:800;color:${T.teal}">${tool === 'heading' ? 'headings' : TOOLS[tool][1]}</b>:`, 14) + rule({ w: inner, h: 28, answer: key ? x.q : null, sample: true }) + rule({ w: inner, h: 28, starter: 'Answer:', answer: key ? 'Answer: ' + x.answer : null, sample: true }), 3); }), 3);
          items = three.map((tool) => t.id + ': a question for the ' + tool);
        }
      }

      return {
        bodyHtml: `<div data-ws-content data-lcs-info3b="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px;min-height:0">` + bookBox(t, { font: d.font, lh: d.lh }) + below + `</div>`,
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-info3b]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsInfo3b.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root), book = document.querySelector('[data-lcs-book]'), bb = R(book);
        // ---- the book
        const parts = [...book.querySelectorAll('[data-lcs-part]')];
        if (parts.map((p) => p.dataset.lcsPart).join('') !== '2345' || [...book.querySelectorAll('[data-lcs-part] > [data-lcs-pagetab]')].map((e) => e.textContent.trim()).join('|') !== 'p. 2|p. 3|p. 4|p. 5') fails.push('the book has not the pages 2 to 5');
        parts.forEach((p) => { const n = p.dataset.lcsPart, body = p.querySelector('[data-lcs-partbody]');
          if (parseFloat(getComputedStyle(body).fontSize) < 14.5) fails.push('page ' + n + ' is printed too small');
          if (!p.querySelector('[data-lcs-heading]')) fails.push('page ' + n + ' has no heading');
          const kw = p.querySelectorAll('[data-lcs-keyword]'); if (kw.length !== 1 || kw[0].dataset.lcsKeyword !== n || +getComputedStyle(kw[0]).fontWeight < 800) fails.push('page ' + n + ' has not one key word in bold'); });
        const toc = [...book.querySelectorAll('[data-lcs-toc]')];
        if (toc.map((e) => e.dataset.lcsToc).join('') !== '23456' || toc.some((e) => e.querySelector('[data-lcs-tocpage]').textContent.trim() !== e.dataset.lcsToc)) fails.push('the table of contents does not name the pages 2 to 6');
        toc.slice(0, 4).forEach((e, i) => { if (e.firstElementChild.textContent.trim() !== parts[i].querySelector('[data-lcs-heading]').textContent.trim()) fails.push('the table of contents names another heading than page ' + (i + 2)); });
        const sb = [...book.querySelectorAll('[data-lcs-sidebar]')];
        if (sb.length !== 1 || !sb[0].closest('[data-lcs-part]')) fails.push('not one sidebar on a page');
        else { const s = R(sb[0]), p = R(sb[0].closest('[data-lcs-part]')); if (s.bottom > p.bottom + 0.5 || s.right > p.right + 0.5 || s.width < 150) fails.push('the sidebar leaves its page'); }
        const gl = [...book.querySelectorAll('[data-lcs-gloss]')], kws = [...book.querySelectorAll('[data-lcs-keyword]')].map((e) => e.textContent.trim().toLowerCase());
        if (gl.length !== 4) fails.push('the glossary has not four words');
        gl.forEach((g) => { const w = g.dataset.lcsGloss.toLowerCase(); if (!kws.some((k) => k === w || k.startsWith(w.slice(0, Math.max(3, w.length - 1))))) fails.push('the glossary word ' + w + ' is no key word of a page'); });
        const ix = [...book.querySelectorAll('[data-lcs-index]')], names = ix.map((e) => e.dataset.lcsIndex.toLowerCase());
        if (ix.length !== 7 || names.join() !== names.slice().sort((a, b) => a.localeCompare(b)).join()) fails.push('the index has not seven words in ABC order');
        ix.forEach((e) => { const w = e.dataset.lcsIndex, re = new RegExp('(^|[^A-Za-z])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(s|es)?([^A-Za-z]|$)', 'i');
          const found = parts.filter((p) => { const c = p.querySelector('[data-lcs-partbody]').cloneNode(true); c.querySelectorAll('[data-lcs-sidebar], [data-lcs-heading]').forEach((x) => x.remove()); return re.test(c.textContent); }).map((p) => p.dataset.lcsPart).join(',');
          if (!found || found !== e.dataset.lcsPages || e.querySelector('b').textContent.replace(/\s/g, '') !== found) fails.push(`the index sends "${w}" to ${e.dataset.lcsPages}; it stands on ${found || 'no page'}`); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        book.querySelectorAll('*').forEach((e) => { const r = R(e); if (r.width && (r.right > bb.right + 0.5 || r.bottom > bb.bottom + 0.5)) fails.push('something leaves the book'); });
        // ---- the page
        const blocks = [...root.children];
        blocks.forEach((bl, i) => { const r = R(bl); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        const used = blocks.reduce((s, bl) => s + R(bl).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const sets = [...document.querySelectorAll('[data-lcs-choices]')];
        sets.forEach((c, i) => { const all = [...c.querySelectorAll('[data-lcs-choice]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || new Set(all.map((e) => e.textContent.trim().toLowerCase())).size !== 3) fails.push(`answers ${i + 1}: not three different with one right`);
          all.forEach((e) => { if (R(e).right > R(c.parentElement).right + 0.5) fails.push(`answers ${i + 1}: an answer leaves its card`); }); });
        const place = sets.map((c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk));
        if (sets.length >= 4 && (new Set(place).size < 3 || place.some((x, i) => i >= 2 && x === place[i - 1] && x === place[i - 2]) || /^(012|210)/.test(place.join('')))) fails.push('the right answers stand in a pattern: ' + place.join(''));
        const CARDS = '[data-lcs-question], [data-lcs-ownq], [data-lcs-wish], [data-lcs-wants], [data-lcs-addindex]';
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const c = l.closest(CARDS), r = R(l); if (!c || r.right > R(c).right + 0.5 || r.bottom > R(c).bottom + 0.5) fails.push('a writing line leaves its card');
          if (r.height < 27.5) fails.push(`a writing line of ${Math.round(r.height)} px (wide-ruled paper is 28)`);
          if (r.width < 150) fails.push(`a writing line of ${Math.round(r.width)} px`);
          const kt = l.querySelector('[data-lcs-keytext]'); if (kt && (R(kt).right > r.right + 0.5 || parseFloat(getComputedStyle(kt).fontSize) < 9)) fails.push('a key answer does not fit its line'); });
        document.querySelectorAll(CARDS).forEach((c) => { const cb = R(c); c.querySelectorAll('[data-lcs-label], [data-lcs-choice], [data-lcs-numbox]').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5)) fails.push('something leaves its card'); }); });
        const boxes = [...document.querySelectorAll('[data-lcs-numbox]')];
        boxes.forEach((bx) => { if (R(bx).width < 28) fails.push('a box too small for a letter'); if (!isKey && bx.textContent.trim()) fails.push('a box is filled'); });
        const leg = document.querySelector('[data-lcs-legend]');
        const legendOk = leg && [...leg.querySelectorAll('[data-lcs-tool]')].map((e) => e.dataset.lcsTool).join('') === 'CHKSGI';
        const qs = [...document.querySelectorAll('[data-lcs-question]')], tools = qs.map((q) => q.dataset.lcsQtool);

        if (mode === 'find') {
          if (lv === 1) {
            if (qs.length !== 4 || sets.length !== 4 || lines.length || boxes.length || leg) fails.push('level 1 is not four questions with answers to circle');
            if (new Set(tools).size !== 4 || !tools.includes('contents') || !tools.includes('index')) fails.push('level 1 does not ask four tools, the contents and the index among them');
          }
          if (lv === 2) {
            if (qs.length !== 6 || sets.length || lines.length !== 6 || boxes.length || leg) fails.push('level 2 is not six questions with a line each');
            if (new Set(tools).size !== 6) fails.push('level 2 does not ask every tool once');
          }
          if (lv < 3) qs.forEach((q, i) => { const u = q.querySelector('[data-lcs-use]'); if (!u || u.dataset.lcsUse !== q.dataset.lcsQtool || !/^Use the /.test(u.textContent)) fails.push(`question ${i + 1} does not name its tool`); });
          if (lv === 3) {
            const add = document.querySelector('[data-lcs-addindex]');
            if (qs.length !== 4 || sets.length || lines.length !== 6 || boxes.length !== 6 || !legendOk || !add) fails.push('level 3 is not four questions with a line and a tool box each, the six tools and two words for the index');
            if ([...tools].sort().join() !== 'glossary,index,keyword,sidebar') fails.push('level 3 does not ask the four tools that are the one way to their answer');
            qs.forEach((q, i) => { if (/glossary|in bold|index|sidebar|heading|contents/i.test(q.querySelector('[data-lcs-label]').textContent)) fails.push(`question ${i + 1} of level 3 names a tool`); });
            if (document.querySelector('[data-lcs-use]')) fails.push('level 3 names the tool to use');
            const letter = { contents: 'C', heading: 'H', keyword: 'K', sidebar: 'S', glossary: 'G', index: 'I' };
            qs.forEach((q, i) => { const bx = q.querySelector('[data-lcs-numbox]'); if (!bx || bx.dataset.lcsWant !== letter[q.dataset.lcsQtool]) fails.push(`the tool box of question ${i + 1} is keyed wrong`); });
            if (add) add.querySelectorAll('[data-lcs-numbox]').forEach((bx) => { if (bx.dataset.lcsWant !== add.dataset.lcsAddindex) fails.push('the page box of the new index word is keyed to another page'); });
          }
        }
        if (mode === 'tool') {
          const wants = [...document.querySelectorAll('[data-lcs-wish]')], letters = wants.map((w) => w.dataset.lcsWish);
          if (lv < 3 && !legendOk) fails.push('the six tools are not listed');
          if (lv === 1) {
            if (wants.length !== 5 || new Set(letters).size !== 5 || letters.includes('H') || sets.length || lines.length || boxes.length !== 5) fails.push('level 1 is not five wishes for five different tools with a box each');
            if (letters.join('') === 'GCISK') fails.push('the wishes stand in the order of the bank');
          }
          if (lv === 2 && (wants.length !== 3 || new Set(letters).size !== 3 || sets.length || lines.length !== 3 || boxes.length !== 3)) fails.push('level 2 is not three wishes with a tool box and a line each');
          if (lv < 3) wants.forEach((w, i) => { const bx = w.querySelector('[data-lcs-numbox]'); if (!bx || bx.dataset.lcsWant !== w.dataset.lcsWish) fails.push(`the box of wish ${i + 1} is keyed wrong`); });
          if (lv === 3) {
            const own = [...document.querySelectorAll('[data-lcs-ownq]')];
            if (own.length !== 3 || new Set(own.map((o) => o.dataset.lcsQtool)).size !== 3 || sets.length || lines.length !== 6 || boxes.length) fails.push('level 3 is not three tools with a line for a question and a line for its answer');
          }
        }
        return fails;
      });
    },
  };
}

module.exports = { makeInfoText3bType, bookFaultsOf, pagesOf, pagesText, LEVELS, TOOLS };
