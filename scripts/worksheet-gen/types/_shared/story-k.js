/**
 * story-k.js — four Kindergarten pages on ONE read-aloud story in four picture panels (English literacy year, Daily
 * Teaching System Part 12.3, 2026-11-17; the unit "Reading Stories" of Kindergarten). The stories are the key `k` of
 * data/literacy/stories.en.json: five stories of about 40 words; a panel holds two library pictures and one or two
 * short sentences. THE TEACHER READS: every answer is a picture to circle, a drawing, a number or a word.
 *
 *   who     Who Is in the Story, and Where? (RL.K.3: identify characters, settings, and major events)
 *             level 1  circle who the story is about, where it happens and what happens (three pictures each)
 *             level 2  three boxes to draw in: Who? Where? What happened?
 *             level 3  three bands: a box to draw in and beside it a row for one word
 *   retell  Retell the Story: Beginning, Middle, End (RL.K.2: retell familiar stories, including key details)
 *             level 1  three pictures of the story, mixed: 1, 2 and 3 in the boxes
 *             level 2  three boxes to draw in: Beginning, Middle, End
 *             level 3  three rows for First, Then, At the end (the child tells, the child or the teacher writes)
 *             (this page prints the panels WITHOUT their numbers: the child writes 1, 2 and 3)
 *   ask     Ask and Answer Questions About a Story (RL.K.1: ask and answer questions about key details)
 *             level 1  three who and where questions, three pictures each
 *             level 2  three what and how questions, three pictures each
 *             level 3  two what and how questions and a box for a question of the child's own (drawn or told)
 *   match   The Pictures and the Words (RL.K.7: the relationship between illustrations and the story)
 *             level 1  three sentences and their three pictures, mixed: a line from each sentence to its picture
 *             level 2  the four sentences and four pictures
 *             level 3  four sentences and three pictures: the child draws the picture that is missing
 *             (this page prints the sentences and the pictures apart, not the panels)
 *
 * Handwriting rows are about 3/4 in from top rule to baseline (Kindergarten ruling). No sentence names both pictures of
 * another panel (the matching page would have two right answers). Read by a US Kindergarten reviewer with the rendered
 * pages (2026-11-17, every finding applied).
 * English only. Themeless: a copy is another story. PDF only. The bank is checked when this file loads
 * (storyKFaultsOf); no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/stories.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line, placed } = _parts;

const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
const pk = (p) => (p ? p.theme + '/' + p.noun : '');
const pairKey = (pics) => pics.map(pk).sort().join(' + ');

/** What must be true of a Kindergarten story before any page prints it. Returns the list of faults (empty = sound). */
function storyKFaultsOf(t, all) {
  const f = [], id = t.id;
  const isPic = (p) => p && typeof p.theme === 'string' && typeof p.noun === 'string';
  if (!Array.isArray(t.panels) || t.panels.length !== 4) return [id + ': not four panels'];
  t.panels.forEach((p, i) => {
    if (!Array.isArray(p.pics) || p.pics.length !== 2 || !p.pics.every(isPic) || pk(p.pics[0]) === pk(p.pics[1])) f.push(`${id} panel ${i + 1}: not two different pictures`);
    if (typeof p.text !== 'string' || !/^[A-Z].*[.!]$/.test(p.text) || wordsIn(p.text) > 16 || p.text.length > 78) f.push(`${id} panel ${i + 1}: its text is no sentence, or longer than 16 words`);
  });
  if (f.length) return f;
  const total = wordsIn(t.panels.map((p) => p.text).join(' '));
  if (total < 30 || total > 70) f.push(`${id}: ${total} words (a Kindergarten read-aloud of four panels has 30 to 70)`);
  if (new Set(t.panels.map((p) => pairKey(p.pics))).size !== 4) f.push(id + ': two panels show the same two pictures');
  // the matching page: a sentence that names both pictures of ANOTHER panel has two right answers
  const nounsOf = (p) => p.pics.map((x) => x.noun.replace(/_/g, ' '));
  t.panels.forEach((p, i) => t.panels.forEach((o, j) => { if (i !== j && nounsOf(o).every((n) => new RegExp('\\b' + n + '\\b', 'i').test(p.text))) f.push(`${id}: the sentence of panel ${i + 1} names both pictures of panel ${j + 1} (${nounsOf(o).join(' + ')})`); }));
  const shown = new Set(t.panels.flatMap((p) => p.pics.map(pk)));
  if (!t.title || !t.hero || !/^[A-Z][a-z]{2,6}$/.test(t.hero.name || '') || !isPic(t.hero.picture) || !t.panels[0].pics.some((x) => pk(x) === pk(t.hero.picture)) || !t.panels[0].text.startsWith(t.hero.name + ' ')) f.push(id + ': no title, or the first panel does not begin with the character the story is about');
  if (!Array.isArray(t.whoWrong) || t.whoWrong.length !== 2 || !t.whoWrong.every(isPic) || pk(t.whoWrong[0]) === pk(t.whoWrong[1]) || t.whoWrong.some((x) => shown.has(pk(x)))) f.push(id + ': not two different animals that are NOT in the story');
  const pl = t.place || {};
  if (!/^[a-z]{3,8}$/.test(pl.word || '') || !isPic(pl.picture) || !Array.isArray(pl.wrong) || pl.wrong.length !== 2 || !pl.wrong.every(isPic) || new Set([pl.picture, ...pl.wrong].map(pk)).size !== 3 || pl.wrong.some((x) => shown.has(pk(x)))) f.push(id + ': no place with its picture and two wrong places that the story does not show');
  else if (!t.panels.some((p) => new RegExp('\\b' + pl.word + '\\b').test(p.text))) f.push(id + ': the story does not name its place (' + pl.word + ')');
  const b = t.bme || [];
  if (b.length !== 3 || b[0] >= b[1] || b[1] >= b[2] || b[2] !== 3 || b[0] < 0) f.push(id + ': beginning, middle and end are not three panels in order, the last one the end');
  if (!Array.isArray(t.frames) || t.frames.length !== 3 || t.frames.some((s) => typeof s !== 'string' || /[.!?]$/.test(s) || s.length > 46)) f.push(id + ': not three short ends for First, Then, At the end');
  const lb = t.labels || {};
  if (lb.who !== (t.hero || {}).name || lb.where !== pl.word || !/^[a-z]{3,8}$/.test(lb.what || '')) f.push(id + ': no one-word labels for who, where and what');
  for (const [kind, start] of [['easy', /^(Who|Where) /], ['hard', /^(What|How|Why) /]]) {
    const qs = t[kind] || [];
    if (qs.length !== 3) { f.push(`${id}: not three ${kind} questions`); continue; }
    qs.forEach((q) => { if (!start.test(q.q || '') || !/\?$/.test(q.q) || q.q.length > 52 || !isPic(q.right) || !Array.isArray(q.wrong) || q.wrong.length !== 2 || !q.wrong.every(isPic) || new Set([q.right, ...q.wrong].map(pk)).size !== 3) f.push(`${id}: "${q.q}" is no ${kind} question with one right picture and two different wrong ones`);
      else { if (!/^emotions\//.test(pk(q.right)) && !shown.has(pk(q.right)) && pk(q.right) !== pk(pl.picture)) f.push(`${id}: the answer of "${q.q}" is no picture of the story`);
        if (q.wrong.some((x) => /^emotions\//.test(pk(x)) !== /^emotions\//.test(pk(q.right)))) f.push(`${id}: "${q.q}" mixes faces and things`); } });
    if (new Set(qs.map((q) => pk(q.right))).size !== 3) f.push(`${id}: two ${kind} questions have the same answer`);
  }
  if (all && all.some((o) => o.id !== id && o.hero && pk(o.hero.picture) === pk(t.hero.picture))) f.push(id + ': another story is about the same animal');
  return f;
}
const STORIES = BANK.k || [];
{ const f = STORIES.flatMap((t) => storyKFaultsOf(t, STORIES)); if (f.length) throw new Error('stories.en.json (k): ' + f.join('; ')); }

const LEVELS = {
  who: { 1: { pic: 80, font: 17, opt: 78 }, 2: { pic: 84, font: 17.5, box: 290 }, 3: { pic: 64, font: 16, rowH: 128 } },
  retell: { 1: { pic: 100, font: 19, ev: 88 }, 2: { pic: 84, font: 17.5, box: 290 }, 3: { pic: 74, font: 17, rowH: 128 } },
  ask: { 1: { pic: 70, font: 16.5, opt: 76 }, 2: { pic: 70, font: 16.5, opt: 76 }, 3: { pic: 62, font: 16, opt: 58, own: 156 } },
  match: { 1: { rowHt: 214, font: 23, pic: 84 }, 2: { rowHt: 160, font: 20, pic: 80 }, 3: { rowHt: 160, font: 20, pic: 80 } },
};

/** the order in which the retelling page shows its three pictures: every story its own, never 1-2-3 */
const ORDERS = ['021', '120', '201', '210', '102'];
const img = (p, size) => `<img class="ws-icon" data-lcs-pic="${esc(pk(p))}" src="${fileUri(p.theme, p.noun)}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const pair = (pics, size) => `<span data-lcs-pair="${esc(pairKey(pics))}" style="display:inline-flex;align-items:center;gap:${Math.round(size * 0.1)}px">${pics.map((p) => img(p, size)).join('')}</span>`;
/** the story: its title and four numbered panels (two pictures, the words the teacher reads) */
function panelsBox(t, { pic, font }, badges = true) {
  const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
  return `<div data-lcs-storyk="${t.id}" data-lcs-hero="${esc(pk(t.hero.picture))}" data-lcs-words="${wordsIn(t.panels.map((p) => p.text).join(' '))}" style="flex:0 0 auto;padding:7px 12px 10px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div data-lcs-title style="font:700 26px/1.1 'Baloo 2',cursive;color:${T.ink};margin-bottom:5px">${esc(t.title)}</div>` +
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px 10px">` + t.panels.map((p, i) => `<div data-lcs-panel="${i + 1}" style="display:flex;flex-direction:column;gap:3px;padding:5px 9px 6px;border-radius:12px;background:${T.cream};min-width:0">` +
      `<div style="display:flex;align-items:center;gap:10px">${badges ? badge(i + 1) : ''}${pair(p.pics, pic)}</div><div data-lcs-ptext style="font:700 ${font}px/1.28 'Nunito',sans-serif;color:${T.ink}">${esc(p.text)}</div></div>`).join('') + `</div></div>`;
}
const cream = (attrs, inner, pad = 7, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:4px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 19, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${html}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const numBox = (want, key, size = 46) => `<span data-lcs-numbox data-lcs-want="${want}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:10px;background:#FFFFFF;font:800 ${Math.round(size * 0.6)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? want : ''}</span>`;
/** something to circle: one picture or a pair (the key rings the right one) */
const pick = (html, id, ok, key) => `<span data-lcs-pick="${esc(id)}"${ok ? ' data-lcs-ok="1"' : ''} style="display:inline-flex;align-items:center;padding:4px 10px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:18px;background:#FFFFFF">${html}</span>`;
const picks = (list, at, key, size) => `<div data-lcs-picks style="display:flex;justify-content:space-around;align-items:center">${list.map((p, i) => (Array.isArray(p) ? pick(pair(p, Math.round(size * 0.8)), pairKey(p), i === at, key) : pick(img(p, size), pk(p), i === at, key))).join('')}</div>`;
/** a box to draw in; the key shows what belongs there */
const drawBox = (name, h, keyHtml) => `<div data-lcs-draw="${esc(name)}" style="height:${h}px;display:flex;align-items:center;justify-content:center;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF">${keyHtml || ''}</div>`;

function makeStoryKType({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('story-k: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the stories are English stories (no ${locale} bank)`);
      if (!STORIES.length) throw new Error(`${id}: the bank holds no Kindergarten story`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(STORIES, 1)[0];
      const inner = W - 24;
      const mixed3 = (bad) => { let o; for (let n = 0; n < 60; n++) { o = shuffle([0, 1, 2], rng); if (!bad.includes(o.join(''))) break; } return o; };
      const rowPlaces = (n) => { let p; for (let k = 0; k < 80; k++) { p = Array.from({ length: n }, () => rng.int(0, 2)); if (new Set(p).size > 1 && !['012', '210'].includes(p.join(''))) break; } return p; };
      const colW = Math.floor((W - 2 * 10) / 3);
      const three = (cells) => `<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:10px">${cells.join('')}</div>`;
      let top = panelsBox(t, d, mode !== 'retell'), below = '', items = [];

      if (mode === 'who') {
        const mid = t.panels[t.bme[1]].pics;
        if (lv === 1) {
          const at = rowPlaces(3);
          const others = shuffle(STORIES.filter((o) => o.id !== t.id), rng).slice(0, 2).map((o) => o.panels[o.bme[1]].pics);
          below = cream('data-lcs-box="who"', label(`${num(1)}Who is the story about? Circle it.`) + picks(placed(t.hero.picture, shuffle(t.whoWrong, rng), at[0]), at[0], key, d.opt)) +
            cream('data-lcs-box="where"', label(`${num(2)}Where does the story happen? Circle it.`) + picks(placed(t.place.picture, shuffle(t.place.wrong, rng), at[1]), at[1], key, d.opt)) +
            cream('data-lcs-box="what"', label(`${num(3)}What happens in the story? Circle it.`) + picks(placed(mid, others, at[2]), at[2], key, d.opt));
        } else {
          const KEYPIC = { who: (z) => img(t.hero.picture, z), where: (z) => img(t.place.picture, z), what: (z) => pair(mid, Math.round(z * 0.72)) };
          const NAMES = [['who', 'Who?', t.labels.who], ['where', 'Where?', t.labels.where], ['what', 'What happens?', t.labels.what]];
          below = lv === 2
            ? three(NAMES.map(([k, name]) => cream(`data-lcs-box="${k}"`, label(name, 20, T.teal) + drawBox(k, d.box, key ? KEYPIC[k](96) : ''), 7)))
            : NAMES.map(([k, name, word]) => cream(`data-lcs-box="${k}"`, `<div style="display:flex;align-items:center;gap:10px"><span data-lcs-label style="flex:0 0 92px;font:700 19px/1.2 'Nunito',sans-serif;color:${T.teal}">${name}</span><div style="flex:0 0 176px">${drawBox(k, d.rowH, key ? KEYPIC[k](72) : '')}</div><div style="flex:1 1 auto;min-width:0">${line({ w: inner - 92 - 176 - 20, h: d.rowH, answer: key ? word : null, sample: true })}</div></div>`, 4)).join('');
        }
        items = [t.id + ': who, where, what'];
      }

      if (mode === 'retell') {
        const NAMES = ['Beginning', 'Middle', 'End'];
        const ev = t.bme.map((i) => t.panels[i].pics);
        if (lv === 1) {
          const order = [...ORDERS[STORIES.indexOf(t) % ORDERS.length]].map(Number);   // every story its own order, never 1-2-3
          below = cream('data-lcs-events="1"', label('What happens first, next, and last? Write 1, 2, and 3 in the boxes.') +
            `<div style="display:flex;justify-content:space-around;align-items:flex-end">${order.map((i) => `<div data-lcs-event="${i + 1}" style="display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px 10px;border-radius:16px;background:#FFFFFF">${pair(ev[i], d.ev)}${numBox(i + 1, key, 56)}</div>`).join('')}</div>` +
            label('Now tell the story to a partner: First ... Next ... Last ...', 18, T.teal), 12);
        } else {
          below = lv === 2
            ? three(NAMES.map((nm, i) => cream(`data-lcs-partbox="${i + 1}"`, label(nm, 20, T.teal) + drawBox(nm, d.box, key ? pair(ev[i], 66) : ''), 7)))
            : ['First', 'Then', 'At the end'].map((st, i) => cream(`data-lcs-frame="${i + 1}"`, `<div style="display:flex;align-items:flex-end;gap:10px"><span data-lcs-framelabel style="flex:0 0 124px;padding-bottom:24px;font:700 24px/1.1 'Nunito',sans-serif;color:${T.teal}">${st}</span><div style="flex:1 1 auto;min-width:0">${line({ w: inner - 134, h: d.rowH, answer: key ? t.frames[i] + '.' : null, sample: true })}</div></div>`, 4)).join('');
        }
        items = t.frames.map((s) => t.id + ': ' + s);
      }

      if (mode === 'ask') {
        const qs = lv === 1 ? t.easy : lv === 2 ? t.hard : shuffle([0, 1, 2], rng).slice(0, 2).sort((a, b) => a - b).map((i) => t.hard[i]);
        const at = qs.length === 3 ? rowPlaces(3) : shuffle([0, 1, 2], rng).slice(0, 2);
        below = qs.map((q, n) => cream(`data-lcs-question="${n + 1}"`, label(num(n + 1) + esc(q.q)) + picks(placed(q.right, shuffle(q.wrong, rng), at[n]), at[n], key, d.opt), 6)).join('') +
          (lv === 3 ? cream('data-lcs-own="1"', label(`${num(3)}Ask a question about the story. Tell it to a grown-up who writes it here, or draw what you want to know.`, 18) +
            `<div style="display:flex;align-items:stretch;gap:10px"><span style="flex:0 0 64px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:${T.teal};color:#FFFFFF;font:800 46px/1 'Baloo 2',cursive">?</span><div style="flex:1 1 auto">${drawBox('own', d.own, key ? `<span style="font:700 17px/1.2 'Nunito',sans-serif;color:${T.teal}">Answers will vary.</span>` : '')}</div></div>`, 6) : '');
        items = qs.map((q) => t.id + ': ' + q.q);
      }

      if (mode === 'match') {
        const idx = lv === 1 ? [0, rng.int(1, 2), 3] : [0, 1, 2, 3];   // level 1 keeps the first and the last sentence of the story
        const n = idx.length;
        let perm; for (let k = 0; k < 400; k++) { perm = shuffle(idx.map((_, i) => i), rng); if (perm.every((x, i) => x !== i) && (n < 4 || new Set(perm.map((x, i) => (x - i + n) % n)).size > 1)) break; }   // no picture straight across from its sentence; with four, not all the same number of rows away
        const missing = lv === 3 ? rng.int(0, n - 1) : -1;                                 // the sentence whose picture the child draws
        const H = d.rowHt, G = 12, LW = 300, GW = 176, RW = inner + 24 - LW - GW;   // two inches between the columns of dots: room for crossing crayon lines
        const yc = (i) => i * (H + G) + H / 2;
        const lines = key ? perm.map((s, j) => `<line data-lcs-keyline="${s}-${j}" x1="7" y1="${yc(s)}" x2="${GW - 7}" y2="${yc(j)}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>`).join('') : '';
        const dots = idx.map((_, i) => `<circle cx="7" cy="${yc(i)}" r="7" fill="${T.ink}"/><circle cx="${GW - 7}" cy="${yc(i)}" r="7" fill="${T.ink}"/>`).join('');
        const left = idx.map((p, i) => `<div data-lcs-sentence="${i}" data-lcs-of="${p}" style="height:${H}px;box-sizing:border-box;display:flex;align-items:center;gap:10px;padding:6px 12px;border-radius:14px;background:${T.cream}"><span style="flex:0 0 auto;color:${T.teal};font:800 ${d.font}px/1 'Nunito',sans-serif">${i + 1}.</span><span data-lcs-stext style="font:700 ${d.font}px/1.28 'Nunito',sans-serif;color:${T.ink}">${esc(t.panels[p].text)}</span></div>`).join('');
        const right = perm.map((s) => `<div data-lcs-picfor="${s}"${s === missing ? ' data-lcs-drawhere="1"' : ''} style="height:${H}px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-radius:14px;${s === missing ? `border:2.5px dashed ${T.teal};background:#FFFFFF` : `background:${T.cream}`}">` +
          (s === missing ? (key ? pair(t.panels[idx[s]].pics, Math.round(d.pic * 0.7)) : `<span style="font:700 17px/1.2 'Nunito',sans-serif;color:${T.teal}">Draw the picture.</span>`) : pair(t.panels[idx[s]].pics, d.pic)) + `</div>`).join('');
        top = `<div data-lcs-storyk="${t.id}" data-lcs-hero="${esc(pk(t.hero.picture))}" data-lcs-words="0" style="flex:0 0 auto;padding:6px 14px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF"><span data-lcs-title style="font:700 26px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(t.title)}</span></div>`;
        below = `<div data-lcs-match="${n}" style="flex:0 0 auto;display:grid;grid-template-columns:${LW}px ${GW}px ${RW}px;align-items:start">` +
          `<div style="display:flex;flex-direction:column;gap:${G}px">${left}</div>` +
          `<svg data-lcs-gutter width="${GW}" height="${n * H + (n - 1) * G}" viewBox="0 0 ${GW} ${n * H + (n - 1) * G}" style="display:block">${lines}${dots}</svg>` +
          `<div style="display:flex;flex-direction:column;gap:${G}px">${right}</div></div>`;
        items = idx.map((p) => t.id + ': ' + t.panels[p].text);
      }

      return {
        bodyHtml: `<div data-ws-content data-lcs-storykpage="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + top + below + `</div>`,
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-storykpage]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsStorykpage.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root), box = document.querySelector('[data-lcs-storyk]');
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 44) fails.push('a picture smaller than 44 px'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        root.querySelectorAll('[data-lcs-panel], [data-lcs-box], [data-lcs-events], [data-lcs-partbox], [data-lcs-frame], [data-lcs-question], [data-lcs-own], [data-lcs-sentence], [data-lcs-picfor]').forEach((c) => { const cb = R(c);
          c.querySelectorAll('img, span, [data-lcs-label], [data-lcs-line] svg, [data-lcs-draw]').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5 || r.left < cb.left - 0.5)) fails.push('something leaves its card'); }); });
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < 110) fails.push('a writing row lower than 110 px (Kindergarten ruling: about 3/4 in from top rule to baseline)'); });
        const boxes = [...document.querySelectorAll('[data-lcs-numbox]')];
        boxes.forEach((b) => { if (R(b).width < 42) fails.push('a box too small for a kindergartner'); if (!isKey && b.textContent.trim()) fails.push('a box is filled'); });
        const draws = [...document.querySelectorAll('[data-lcs-draw]')];
        if (!isKey) draws.forEach((dbox) => { if (dbox.querySelector('img')) fails.push('a box to draw in is filled'); });
        const sets = [...document.querySelectorAll('[data-lcs-picks]')];
        const place = sets.map((c, i) => { const all = [...c.querySelectorAll('[data-lcs-pick]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || new Set(all.map((e) => e.dataset.lcsPick)).size !== 3) fails.push(`pictures ${i + 1}: not three different with one right`);
          return all.findIndex((e) => e.dataset.lcsOk); });

        if (mode !== 'match') {
          const panels = [...box.querySelectorAll('[data-lcs-panel]')];
          if (panels.length !== 4) fails.push('the story is not four panels');
          panels.forEach((p, i) => { if (p.querySelectorAll('img').length !== 2) fails.push(`panel ${i + 1} does not show two pictures`); if (parseFloat(getComputedStyle(p.querySelector('[data-lcs-ptext]')).fontSize) < 16) fails.push(`panel ${i + 1}: the words are printed smaller than 16 px`); });
          const n = +box.dataset.lcsWords; if (n < 30 || n > 70) fails.push(`the story has ${n} words`);
        }
        if (mode === 'who') {
          const bx = [...document.querySelectorAll('[data-lcs-box]')];
          if (bx.map((b) => b.dataset.lcsBox).join() !== 'who,where,what') fails.push('not the three boxes who, where, what');
          if (lv === 1) {
            if (sets.length !== 3 || lines.length || draws.length) fails.push('level 1 is not three rows of pictures to circle');
            if (new Set(place).size < 2 || /^(012|210)$/.test(place.join(''))) fails.push('the right pictures stand all in one place, or as a staircase: ' + place.join(''));
            const ok = sets[0] && sets[0].querySelector('[data-lcs-ok]'); if (!ok || ok.dataset.lcsPick !== box.dataset.lcsHero) fails.push('the animal keyed is not the one the story is about');
            const inStory = new Set([...box.querySelectorAll('[data-lcs-panel] [data-lcs-pair]')].map((e) => e.dataset.lcsPair));
            const evOk = sets[2] && sets[2].querySelector('[data-lcs-ok]'); if (!evOk || !inStory.has(evOk.dataset.lcsPick)) fails.push('the event keyed is no panel of the story');
            if (sets[2]) [...sets[2].querySelectorAll('[data-lcs-pick]')].forEach((e) => { if (!e.dataset.lcsOk && inStory.has(e.dataset.lcsPick)) fails.push('a wrong event is a panel of the story'); });
            const heads = new Set([...box.querySelectorAll('img')].map((im) => im.dataset.lcsPic));
            if (sets[0]) [...sets[0].querySelectorAll('[data-lcs-pick]')].forEach((e) => { if (!e.dataset.lcsOk && heads.has(e.dataset.lcsPick)) fails.push('a wrong animal is in the story'); });
          } else {
            if (sets.length || draws.length !== 3 || lines.length !== (lv === 3 ? 3 : 0)) fails.push(`level ${lv}: ${draws.length} boxes to draw in and ${lines.length} rows`);
            draws.forEach((dbox) => { if (R(dbox).height < 110 || R(dbox).width < 150) fails.push('a box to draw in smaller than 150 by 110 px'); });
          }
        }
        if (mode === 'retell') {
          if (lv === 1) {
            const evs = [...document.querySelectorAll('[data-lcs-event]')], seq = evs.map((e) => e.dataset.lcsEvent).join('');
            if (evs.length !== 3 || [...seq].sort().join('') !== '123' || seq === '123') fails.push('the three pictures are not mixed: ' + seq);
            if (box.querySelector('[data-lcs-badge]')) fails.push('the panels carry numbers on the page that asks for 1, 2 and 3');
            evs.forEach((e) => { if (e.querySelector('[data-lcs-numbox]').dataset.lcsWant !== e.dataset.lcsEvent) fails.push('a box is keyed to another place'); });
            const order = [...box.querySelectorAll('[data-lcs-panel] [data-lcs-pair]')].map((e) => e.dataset.lcsPair);
            const at = evs.slice().sort((a, b) => a.dataset.lcsEvent - b.dataset.lcsEvent).map((e) => order.indexOf(e.querySelector('[data-lcs-pair]').dataset.lcsPair));
            if (at.some((x) => x < 0) || at[0] >= at[1] || at[1] >= at[2]) fails.push('the numbers do not follow the panels of the story');
            if (lines.length || draws.length || boxes.length !== 3) fails.push('level 1 is not three pictures to number');
          } else {
            if (box.querySelector('[data-lcs-badge]')) fails.push('the panels carry numbers on the retelling page');
            if (lv === 2) { const pb = [...document.querySelectorAll('[data-lcs-partbox]')];
              if (pb.length !== 3 || pb.map((p) => p.querySelector('[data-lcs-label]').textContent.trim()).join() !== 'Beginning,Middle,End' || draws.length !== 3 || lines.length) fails.push('not the three boxes Beginning, Middle, End');
              draws.forEach((dbox) => { if (R(dbox).height < 110) fails.push('a box to draw in lower than 110 px'); });
            } else { const fr = [...document.querySelectorAll('[data-lcs-framelabel]')].map((x) => x.textContent.trim());
              if (fr.join() !== 'First,Then,At the end' || lines.length !== 3 || draws.length) fails.push('level 3 is not three rows for First, Then, At the end');
              lines.forEach((l) => { if (R(l.querySelector('svg')).width < rb.width * 0.6) fails.push('a row for a sentence narrower than six tenths of the page'); }); }
          }
        }
        if (mode === 'ask') {
          const qs = [...document.querySelectorAll('[data-lcs-question]')], texts = qs.map((q) => q.querySelector('[data-lcs-label]').textContent.replace(/^\s*\d+\.\s*/, ''));
          if (qs.length !== (lv === 3 ? 2 : 3) || sets.length !== qs.length) fails.push(`level ${lv}: ${qs.length} questions`);
          if (lv === 1 ? !texts.every((x) => /^(Who|Where) /.test(x)) : !texts.every((x) => /^(What|How|Why) /.test(x))) fails.push('the questions are not of the kind of this level: ' + texts.join(' | '));
          if (new Set(place).size < 2 || /^(012|210)$/.test(place.join(''))) fails.push('the right pictures stand all in one place, or as a staircase: ' + place.join(''));
          const ownBox = document.querySelector('[data-lcs-own] [data-lcs-draw]'); if (lv === 3 && (!ownBox || R(ownBox).height < 150)) fails.push('the box for the question of the child is lower than 150 px');
          if ((lv === 3) !== !!document.querySelector('[data-lcs-own]') || lines.length) fails.push('the box for a question of the child\'s own is not where it belongs');
        }
        if (mode === 'match') {
          const m = document.querySelector('[data-lcs-match]'), n = m ? +m.dataset.lcsMatch : 0;
          const sents = [...document.querySelectorAll('[data-lcs-sentence]')], pics = [...document.querySelectorAll('[data-lcs-picfor]')], forS = pics.map((p) => +p.dataset.lcsPicfor);
          if (n !== (lv === 1 ? 3 : 4) || sents.length !== n || pics.length !== n || forS.slice().sort().join() !== sents.map((_, i) => i).join()) fails.push(`not ${n} sentences with a picture each`);
          if (forS.some((s, j) => s === j)) fails.push('a picture stands straight across from its sentence: ' + forS.join(''));
          sents.forEach((s, i) => { if (parseFloat(getComputedStyle(s.querySelector('[data-lcs-stext]')).fontSize) < 19) fails.push(`sentence ${i + 1} is printed smaller than 19 px`); const pc = pics.find((p) => +p.dataset.lcsPicfor === i); if (pc && Math.abs(R(s).height - R(pc).height) > 1) fails.push('a sentence and a picture are not of one height'); });
          const dh = pics.filter((p) => p.dataset.lcsDrawhere);
          if (dh.length !== (lv === 3 ? 1 : 0)) fails.push(`level ${lv}: ${dh.length} boxes for a picture to draw`);
          if (!isKey && dh.some((p) => p.querySelector('img'))) fails.push('the box for the missing picture shows it');
          if (new Set(pics.filter((p) => !p.dataset.lcsDrawhere).map((p) => p.querySelector('[data-lcs-pair]').dataset.lcsPair)).size !== n - dh.length) fails.push('two pictures are the same');
          const kl = document.querySelectorAll('[data-lcs-keyline]').length; if (kl !== (isKey ? n : 0)) fails.push(`${kl} lines are drawn`);
          const g = document.querySelector('[data-lcs-gutter]'); if (!g || Math.abs(R(g).height - (R(sents[n - 1]).bottom - R(sents[0]).top)) > 1.5) fails.push('the dots do not stand at the rows');
          if (g && R(g).width < 150) fails.push('the two columns of dots stand closer than 150 px (crossing crayon lines need room)');
          if (sents.length && (sents[0].dataset.lcsOf !== '0' || sents[n - 1].dataset.lcsOf !== '3')) fails.push('the first or the last sentence of the story is left out');
          if (n === 4 && new Set(forS.map((x, j) => (x - j + 4) % 4)).size === 1) fails.push('every picture stands the same number of rows from its sentence: ' + forS.join(''));
        }
        return fails;
      });
    },
  };
}

module.exports = { makeStoryKType, storyKFaultsOf, STORIES, LEVELS };
